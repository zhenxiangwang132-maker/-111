import argparse
import contextlib
import io
import importlib
import json
import os
import sys
import tempfile
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QMT_BRIDGE_QUOTES_FILE = Path(os.environ.get("QMT_BRIDGE_QUOTES_FILE", str(ROOT / "qmt_bridge_quotes.json")))


def qmt_auto_paths():
    candidates = []
    home = Path.home()
    known_roots = [
        home / "国信iQuant策略交易平台",
        home / "iQuant策略交易平台",
        home / "MiniQMT",
        home / "迅投QMT",
    ]
    for root in known_roots:
        bin_dir = root / "bin.x64"
        site_packages = bin_dir / "Lib" / "site-packages"
        if site_packages.is_dir():
            candidates.append(str(site_packages))
        if bin_dir.is_dir():
            candidates.append(str(bin_dir))
    return candidates


def configured_sdk_paths():
    raw_values = [
        os.environ.get("INSTITUTIONAL_SDK_PATHS", ""),
        os.environ.get("WINDPY_PATH", ""),
        os.environ.get("IFINDPY_PATH", ""),
        os.environ.get("EMQUANTAPI_PATH", ""),
        os.environ.get("QMT_SITE_PACKAGES", ""),
        os.environ.get("QMT_PATH", ""),
    ]
    paths = []
    for raw in raw_values:
        for part in raw.split(os.pathsep):
            clean = part.strip().strip('"')
            if clean and os.path.isdir(clean) and clean not in paths:
                paths.append(clean)
    for clean in qmt_auto_paths():
        if clean and os.path.isdir(clean) and clean not in paths:
            paths.append(clean)
    return paths


for sdk_path in configured_sdk_paths():
    if sdk_path not in sys.path:
        sys.path.insert(0, sdk_path)
    if os.name == "nt" and sdk_path.lower().endswith("bin.x64") and hasattr(os, "add_dll_directory"):
        try:
            os.add_dll_directory(sdk_path)
        except Exception:
            pass


def normalize_key(key):
    raw = str(key or "").strip()
    if not raw:
        return ""
    low = raw.lower()
    if low.startswith(("sh", "sz", "bj")) and len(low) >= 8:
        return low[:2] + low[-6:]
    if raw.endswith((".SH", ".SZ", ".BJ")):
        code, suffix = raw.split(".", 1)
        return suffix.lower() + code[-6:]
    if raw.isdigit() and len(raw) == 6:
        if raw.startswith(("6", "9")):
            return "sh" + raw
        if raw.startswith(("0", "3")):
            return "sz" + raw
        if raw.startswith("8"):
            return "bj" + raw
    return raw


def terminal_code(key):
    clean = normalize_key(key)
    if len(clean) == 8 and clean[:2] in ("sh", "sz", "bj"):
        suffix = {"sh": "SH", "sz": "SZ", "bj": "BJ"}[clean[:2]]
        return clean[2:] + "." + suffix
    return clean


def qmt_terminal_code(key):
    clean = normalize_key(key)
    if len(clean) == 8 and clean[:2] in ("sh", "sz", "bj"):
        suffix = {"sh": "SH", "sz": "SZ", "bj": "BJ"}[clean[:2]]
        return clean[2:] + "." + suffix
    return terminal_code(clean)


def normalize_from_terminal_code(key):
    return normalize_key(key)


def to_float(value):
    if value in (None, "", "--", "None"):
        return None
    try:
        return float(str(value).replace(",", ""))
    except Exception:
        return None


def quote_value(item, names):
    return first_value(item, names)


def first_value(row, names):
    for name in names:
        if isinstance(row, dict) and name in row:
            return row.get(name)
    return None


def qmt_bridge_rows(keys, data_type):
    if data_type != "quotes":
        raise RuntimeError("QMT bridge currently provides quote data only.")
    if not QMT_BRIDGE_QUOTES_FILE.exists():
        raise RuntimeError("QMT bridge quote file not found: " + str(QMT_BRIDGE_QUOTES_FILE))
    payload = json.loads(QMT_BRIDGE_QUOTES_FILE.read_text(encoding="utf-8"))
    quotes = payload.get("quotes") if isinstance(payload, dict) else {}
    if not isinstance(quotes, dict):
        raise RuntimeError("QMT bridge quote file has no quotes dict.")
    rows = []
    for key in keys:
        code = qmt_terminal_code(key)
        item = quotes.get(code) or quotes.get(code.upper()) or quotes.get(code.lower()) or quotes.get(normalize_key(code)) or {}
        clean = normalize_key(code)
        price = to_float(quote_value(item, ["lastPrice", "last_price", "price", "last"]))
        previous = to_float(quote_value(item, ["lastClose", "preClose", "pre_close", "last_close", "preClosePrice"]))
        change = to_float(quote_value(item, ["change", "chg", "diff"]))
        pct = to_float(quote_value(item, ["pct", "changeRatio", "chgRatio"]))
        if change is None and price is not None and previous not in (None, 0):
            change = price - previous
        if pct is None and price is not None and previous not in (None, 0):
            pct = (price - previous) / previous * 100
        if price is None and not item:
            continue
        rows.append({
            "key": clean,
            "name": clean,
            "symbol": clean[-6:],
            "price": price,
            "change": change,
            "pct": pct,
            "high": to_float(quote_value(item, ["high", "highPrice"])),
            "low": to_float(quote_value(item, ["low", "lowPrice"])),
            "amount": to_float(quote_value(item, ["amount", "turnover", "money"])),
            "volume": to_float(quote_value(item, ["volume", "vol"])),
            "source": "QMT bridge",
            "updatedAt": payload.get("updatedAt") or datetime.now().isoformat(timespec="seconds"),
        })
    return rows


def call_with_captured_output(func, *args):
    sys.stdout.flush()
    sys.stderr.flush()
    old_stdout = os.dup(1)
    old_stderr = os.dup(2)
    value = None
    error = None
    with tempfile.TemporaryFile(mode="w+b") as tmp:
        try:
            os.dup2(tmp.fileno(), 1)
            os.dup2(tmp.fileno(), 2)
            try:
                value = func(*args)
            except Exception as exc:
                error = exc
            sys.stdout.flush()
            sys.stderr.flush()
        finally:
            os.dup2(old_stdout, 1)
            os.dup2(old_stderr, 2)
            os.close(old_stdout)
            os.close(old_stderr)
        tmp.seek(0)
        captured = tmp.read().decode("utf-8", errors="ignore").strip()
    if error:
        if captured:
            raise RuntimeError(captured + " " + str(error))
        raise error
    return value, captured


def qmt_call_full_tick(get_full_tick, codes):
    noise = io.StringIO()
    try:
        with contextlib.redirect_stdout(noise), contextlib.redirect_stderr(noise):
            raw, native_noise = call_with_captured_output(get_full_tick, codes)
    except Exception as exc:
        extra = (noise.getvalue().strip() + " " + (locals().get("native_noise") or "")).strip()
        if extra:
            raise RuntimeError(extra + " " + str(exc))
        raise
    extra = (noise.getvalue().strip() + " " + (native_noise or "")).strip()
    if not isinstance(raw, dict):
        detail = extra or str(raw)
        raise RuntimeError("QMT get_full_tick did not return a quote dict. " + detail)
    return raw


def qmt_rows(keys, data_type):
    if data_type != "quotes":
        raise RuntimeError("QMT/xtquant currently provides quote data only in this app. Financials still use Wind/iFinD/Choice/Eastmoney.")
    module = importlib.import_module("xtquant.xtdata")
    get_full_tick = getattr(module, "get_full_tick", None)
    if not callable(get_full_tick):
        raise RuntimeError("xtquant.xtdata.get_full_tick was not found.")
    codes = [qmt_terminal_code(key) for key in keys]
    raw = qmt_call_full_tick(get_full_tick, codes) or {}
    rows = []
    for code in codes:
        item = raw.get(code) or raw.get(code.upper()) or raw.get(code.lower()) or {}
        key = normalize_key(code)
        price = to_float(first_value(item, ["lastPrice", "last_price", "price", "last"]))
        previous = to_float(first_value(item, ["lastClose", "preClose", "pre_close", "last_close", "preClosePrice"]))
        pct = to_float(first_value(item, ["pct", "changeRatio", "chgRatio"]))
        change = to_float(first_value(item, ["change", "chg", "diff"]))
        if change is None and price is not None and previous not in (None, 0):
            change = price - previous
        if pct is None and price is not None and previous not in (None, 0):
            pct = (price - previous) / previous * 100
        high = to_float(first_value(item, ["high", "highPrice"]))
        low = to_float(first_value(item, ["low", "lowPrice"]))
        amount = to_float(first_value(item, ["amount", "turnover", "money"]))
        volume = to_float(first_value(item, ["volume", "vol"]))
        rows.append({
            "key": key,
            "name": key,
            "symbol": key[-6:],
            "price": price,
            "change": change,
            "pct": pct,
            "high": high,
            "low": low,
            "amount": amount,
            "volume": volume,
            "source": "QMT/xtquant",
            "updatedAt": datetime.now().isoformat(timespec="seconds"),
        })
    return rows


def wind_error_ok(result):
    return getattr(result, "ErrorCode", 0) in (0, "0", None)


def wind_rows(keys, data_type):
    module = importlib.import_module("WindPy")
    w = getattr(module, "w")
    start = w.start()
    if not wind_error_ok(start):
        raise RuntimeError("Wind start failed: " + str(start))
    codes = [terminal_code(key) for key in keys]
    rows = []
    try:
        if data_type == "quotes":
            fields = "sec_name,rt_last,rt_chg,rt_pct_chg,pe_ttm,pb_lf,mkt_cap_ard,float_mv,turn,rt_high,rt_low"
            result = w.wsq(",".join(codes), fields)
            if not wind_error_ok(result):
                result = w.wss(",".join(codes), fields)
            if not wind_error_ok(result):
                raise RuntimeError("Wind quote query failed: " + str(result))
            data = getattr(result, "Data", []) or []
            fields_list = [f.lower() for f in (getattr(result, "Fields", []) or fields.split(","))]
            for idx, code in enumerate(codes):
                row = {fields_list[i]: (data[i][idx] if i < len(data) and idx < len(data[i]) else None) for i in range(len(fields_list))}
                key = normalize_key(code)
                rows.append({
                    "key": key,
                    "name": row.get("sec_name") or key,
                    "symbol": key[-6:],
                    "price": to_float(row.get("rt_last")),
                    "change": to_float(row.get("rt_chg")),
                    "pct": to_float(row.get("rt_pct_chg")),
                    "pe": to_float(row.get("pe_ttm")),
                    "pb": to_float(row.get("pb_lf")),
                    "marketCap": to_float(row.get("mkt_cap_ard")),
                    "circulatingMarketCap": to_float(row.get("float_mv")),
                    "turnoverRate": to_float(row.get("turn")),
                    "source": "Wind WAPI",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
        else:
            fields = "sec_name,report_period,total_oper_rev,np_belongto_parcomsh,grossprofitmargin,netprofitmargin,roe_avg,fa_orgr_ttm,profit_ttm_yoy,eps_basic,bps"
            result = w.wss(",".join(codes), fields, "rptDate=latest")
            if not wind_error_ok(result):
                raise RuntimeError("Wind financial query failed: " + str(result))
            data = getattr(result, "Data", []) or []
            fields_list = [f.lower() for f in (getattr(result, "Fields", []) or fields.split(","))]
            for idx, code in enumerate(codes):
                row = {fields_list[i]: (data[i][idx] if i < len(data) and idx < len(data[i]) else None) for i in range(len(fields_list))}
                rows.append({
                    "key": normalize_key(code),
                    "name": row.get("sec_name") or "",
                    "reportDate": str(row.get("report_period") or ""),
                    "revenue": to_float(row.get("total_oper_rev")),
                    "netProfit": to_float(row.get("np_belongto_parcomsh")),
                    "grossMargin": to_float(row.get("grossprofitmargin")),
                    "netMargin": to_float(row.get("netprofitmargin")),
                    "roe": to_float(row.get("roe_avg")),
                    "revenueGrowth": to_float(row.get("fa_orgr_ttm")),
                    "profitGrowth": to_float(row.get("profit_ttm_yoy")),
                    "eps": to_float(row.get("eps_basic")),
                    "bps": to_float(row.get("bps")),
                    "source": "Wind WAPI",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
    finally:
        try:
            w.close()
        except Exception:
            pass
    return rows


def choice_rows(keys, data_type):
    module = importlib.import_module("EmQuantAPI")
    c = getattr(module, "c")
    user = os.environ.get("CHOICE_USER")
    password = os.environ.get("CHOICE_PASSWORD")
    start = c.start(user, password) if user and password else c.start()
    if getattr(start, "ErrorCode", 0) not in (0, "0", None):
        raise RuntimeError("Choice start failed: " + str(start))
    codes = [terminal_code(key) for key in keys]
    try:
        if data_type == "quotes":
            fields = "NAME,NOW,CHANGE,PCTCHANGE,PE,PB,TOTALMV,FLOATMV,TURN"
            result = c.css(",".join(codes), fields, "")
        else:
            fields = "NAME,REPORTDATE,TOTALOPERATEREVE,PARENTNETPROFIT,GROSSMARGIN,NETMARGIN,ROE,YOYOR,YOYPNI,EPS,BPS"
            result = c.css(",".join(codes), fields, "ReportDate=Latest")
        if getattr(result, "ErrorCode", 0) not in (0, "0", None):
            raise RuntimeError("Choice query failed: " + str(result))
        indicators = [f.upper() for f in fields.split(",")]
        data = getattr(result, "Data", {}) or {}
        rows = []
        for code in codes:
            values = data.get(code) or data.get(code.upper()) or []
            row = {indicators[i]: (values[i] if i < len(values) else None) for i in range(len(indicators))}
            key = normalize_key(code)
            if data_type == "quotes":
                rows.append({
                    "key": key,
                    "name": row.get("NAME") or key,
                    "symbol": key[-6:],
                    "price": to_float(row.get("NOW")),
                    "change": to_float(row.get("CHANGE")),
                    "pct": to_float(row.get("PCTCHANGE")),
                    "pe": to_float(row.get("PE")),
                    "pb": to_float(row.get("PB")),
                    "marketCap": to_float(row.get("TOTALMV")),
                    "circulatingMarketCap": to_float(row.get("FLOATMV")),
                    "turnoverRate": to_float(row.get("TURN")),
                    "source": "Choice/EmQuantAPI",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
            else:
                rows.append({
                    "key": key,
                    "name": row.get("NAME") or "",
                    "reportDate": str(row.get("REPORTDATE") or ""),
                    "revenue": to_float(row.get("TOTALOPERATEREVE")),
                    "netProfit": to_float(row.get("PARENTNETPROFIT")),
                    "grossMargin": to_float(row.get("GROSSMARGIN")),
                    "netMargin": to_float(row.get("NETMARGIN")),
                    "roe": to_float(row.get("ROE")),
                    "revenueGrowth": to_float(row.get("YOYOR")),
                    "profitGrowth": to_float(row.get("YOYPNI")),
                    "eps": to_float(row.get("EPS")),
                    "bps": to_float(row.get("BPS")),
                    "source": "Choice/EmQuantAPI",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
        return rows
    finally:
        try:
            c.stop()
        except Exception:
            pass


def ifind_rows(keys, data_type):
    module = importlib.import_module("iFinDPy")
    login = getattr(module, "THS_iFinDLogin", None)
    logout = getattr(module, "THS_iFinDLogout", None)
    query = getattr(module, "THS_BD", None)
    if not callable(query):
        raise RuntimeError("iFinDPy THS_BD was not found.")
    user = os.environ.get("IFIND_USER")
    password = os.environ.get("IFIND_PASSWORD")
    if callable(login) and user and password:
        login_result = login(user, password)
        if str(login_result).strip() not in ("0", "0.0"):
            raise RuntimeError("iFinD login returned " + str(login_result))
    codes = [terminal_code(key) for key in keys]
    try:
        if data_type == "quotes":
            indicators = "ths_stock_short_name_stock;ths_close_price_stock;ths_chg_stock;ths_chg_ratio_stock;ths_pe_ttm_stock;ths_pb_stock;ths_total_mv_stock;ths_float_mv_stock;ths_turnover_ratio_stock"
        else:
            indicators = "ths_stock_short_name_stock;ths_report_date_stock;ths_operating_revenue_stock;ths_np_parent_company_owners_stock;ths_gross_profit_ratio_stock;ths_net_profit_ratio_stock;ths_roe_avg_stock;ths_operating_revenue_yoy_stock;ths_np_parent_company_owners_yoy_stock;ths_eps_stock;ths_bps_stock"
        result = query(";".join(codes), indicators, "", "")
        data = getattr(result, "data", None) or getattr(result, "Data", None) or {}
        rows = []
        if isinstance(data, dict):
            records = data.get("tables") or data.get("data") or []
        else:
            records = data if isinstance(data, list) else []
        for idx, code in enumerate(codes):
            record = records[idx] if idx < len(records) and isinstance(records[idx], dict) else {}
            values = list(record.values()) if record else []
            key = normalize_key(code)
            if data_type == "quotes":
                rows.append({
                    "key": key,
                    "name": values[0] if len(values) > 0 else key,
                    "symbol": key[-6:],
                    "price": to_float(values[1] if len(values) > 1 else None),
                    "change": to_float(values[2] if len(values) > 2 else None),
                    "pct": to_float(values[3] if len(values) > 3 else None),
                    "pe": to_float(values[4] if len(values) > 4 else None),
                    "pb": to_float(values[5] if len(values) > 5 else None),
                    "marketCap": to_float(values[6] if len(values) > 6 else None),
                    "circulatingMarketCap": to_float(values[7] if len(values) > 7 else None),
                    "turnoverRate": to_float(values[8] if len(values) > 8 else None),
                    "source": "iFinD",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
            else:
                rows.append({
                    "key": key,
                    "name": values[0] if len(values) > 0 else "",
                    "reportDate": str(values[1] if len(values) > 1 else ""),
                    "revenue": to_float(values[2] if len(values) > 2 else None),
                    "netProfit": to_float(values[3] if len(values) > 3 else None),
                    "grossMargin": to_float(values[4] if len(values) > 4 else None),
                    "netMargin": to_float(values[5] if len(values) > 5 else None),
                    "roe": to_float(values[6] if len(values) > 6 else None),
                    "revenueGrowth": to_float(values[7] if len(values) > 7 else None),
                    "profitGrowth": to_float(values[8] if len(values) > 8 else None),
                    "eps": to_float(values[9] if len(values) > 9 else None),
                    "bps": to_float(values[10] if len(values) > 10 else None),
                    "source": "iFinD",
                    "updatedAt": datetime.now().isoformat(timespec="seconds"),
                })
        return rows
    finally:
        try:
            if callable(logout):
                logout()
        except Exception:
            pass


def provider_available(provider):
    if provider == "qmt_bridge":
        return QMT_BRIDGE_QUOTES_FILE.exists()
    module_name = {"qmt": "xtquant.xtdata", "wind": "WindPy", "ifind": "iFinDPy", "choice": "EmQuantAPI"}[provider]
    try:
        importlib.import_module(module_name)
        return True
    except Exception:
        return False


def provider_unavailable_reason(provider):
    if provider == "qmt_bridge":
        return "QMT bridge quote file not found: " + str(QMT_BRIDGE_QUOTES_FILE)
    if provider != "qmt":
        return "SDK not importable"
    has_qmt_path = any(("国信iquant" in path.lower() or "miniqmt" in path.lower() or "xtquant" in path.lower()) for path in configured_sdk_paths())
    if has_qmt_path:
        return "QMT SDK path found, but current Python cannot import xtquant. Use compatible Python/strategy environment."
    return "QMT/xtquant SDK not importable"


def run_provider(provider, keys, data_type):
    if provider == "qmt_bridge":
        return qmt_bridge_rows(keys, data_type)
    if provider == "qmt":
        return qmt_rows(keys, data_type)
    if provider == "wind":
        return wind_rows(keys, data_type)
    if provider == "ifind":
        return ifind_rows(keys, data_type)
    if provider == "choice":
        return choice_rows(keys, data_type)
    raise RuntimeError("Unknown provider: " + provider)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--type", choices=["quotes", "financials"], required=True)
    parser.add_argument("--keys", required=True)
    parser.add_argument("--provider", default=os.environ.get("INSTITUTIONAL_PROVIDER", "auto"))
    args = parser.parse_args()
    keys = [normalize_key(item) for item in args.keys.split(",") if normalize_key(item)]
    providers = ["qmt_bridge", "qmt", "wind", "ifind", "choice"] if args.provider == "auto" else [args.provider]
    attempts = []
    rows = []
    chosen = ""
    for provider in providers:
        if not provider_available(provider):
            attempts.append({"provider": provider, "ok": False, "error": provider_unavailable_reason(provider)})
            continue
        try:
            rows = run_provider(provider, keys, args.type)
            chosen = provider
            attempts.append({"provider": provider, "ok": True, "rows": len(rows)})
            break
        except Exception as exc:
            attempts.append({"provider": provider, "ok": False, "error": str(exc)})
    print(json.dumps({
        "success": True,
        "type": args.type,
        "provider": chosen,
        "source": {"qmt_bridge": "QMT bridge", "qmt": "QMT/xtquant", "wind": "Wind WAPI", "ifind": "iFinD", "choice": "Choice/EmQuantAPI"}.get(chosen, ""),
        "keys": keys,
        "rows": rows,
        "attempts": attempts,
        "configuredPaths": configured_sdk_paths(),
        "checkedAt": datetime.now().isoformat(timespec="seconds"),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
