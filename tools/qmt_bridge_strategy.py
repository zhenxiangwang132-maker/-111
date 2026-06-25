# coding:utf-8
import json
import os
import time
import datetime


ROOT_DIR = r"C:\WatchlistApp\mm_app"
OUTPUT_FILE = os.path.join(ROOT_DIR, "qmt_bridge_quotes.json")
CODES_FILE = os.path.join(ROOT_DIR, "qmt_bridge_codes.json")
DAILY_DIR = os.path.join(ROOT_DIR, "qmt_data", "daily")
DAILY_INDEX_FILE = os.path.join(ROOT_DIR, "qmt_data", "daily_index.json")

DEFAULT_CODES = ["603598.SH", "688256.SH", "300502.SZ", "300308.SZ", "600519.SH", "000001.SZ"]
WRITE_INTERVAL_SECONDS = 5
DAILY_WRITE_INTERVAL_SECONDS = 600
DAILY_COUNT = 360
DAILY_BATCH_SIZE = 80


def _atomic_write(path, payload):
    folder = os.path.dirname(path)
    if folder and not os.path.exists(folder):
        os.makedirs(folder)
    tmp_file = path + ".tmp"
    with open(tmp_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
    os.replace(tmp_file, path)


def _safe_name(code):
    return "".join(ch if ch.isalnum() or ch in ".-_" else "_" for ch in str(code or ""))


def _load_codes():
    try:
        if os.path.exists(CODES_FILE):
            with open(CODES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict):
                data = data.get("codes") or data.get("items") or []
            if isinstance(data, list):
                seen = set()
                codes = []
                for item in data:
                    code = str(item).strip()
                    if code and code not in seen:
                        seen.add(code)
                        codes.append(code)
                if codes:
                    return codes
    except Exception as exc:
        print("qmt bridge load codes failed:", exc)
    return DEFAULT_CODES


def _json_safe(value):
    if value is None:
        return None
    try:
        # pandas / numpy scalar support without importing heavy modules.
        if hasattr(value, "item"):
            value = value.item()
    except Exception:
        pass
    if isinstance(value, (datetime.datetime, datetime.date)):
        return value.strftime("%Y%m%d")
    if isinstance(value, bytes):
        try:
            return value.decode("utf-8")
        except Exception:
            return value.decode("gbk", errors="ignore")
    if isinstance(value, (str, int, float, bool)):
        return value
    return str(value)


def _date_text(value):
    value = _json_safe(value)
    text = str(value or "").strip()
    if not text:
        return ""
    if text.endswith(".0"):
        text = text[:-2]
    digits = "".join(ch for ch in text if ch.isdigit())
    if len(digits) >= 8:
        return digits[:8]
    return text


def _to_float(value):
    value = _json_safe(value)
    if value in (None, ""):
        return None
    try:
        return float(value)
    except Exception:
        return None


def _rows_from_table(table):
    if table is None:
        return []
    try:
        if hasattr(table, "to_dict"):
            try:
                table = table.reset_index()
            except Exception:
                pass
            return table.to_dict("records")
    except Exception:
        pass
    if isinstance(table, list):
        return table
    if isinstance(table, dict):
        keys = list(table.keys())
        if not keys:
            return []
        values = [table.get(key) for key in keys]
        if all(isinstance(value, list) for value in values):
            size = max(len(value) for value in values) if values else 0
            rows = []
            for index in range(size):
                row = {}
                for key, value in zip(keys, values):
                    row[key] = value[index] if index < len(value) else None
                rows.append(row)
            return rows
        return [table]
    return []


def _pick(row, names):
    for name in names:
        if name in row:
            return row.get(name)
    lower = {str(key).lower(): key for key in row.keys()}
    for name in names:
        key = lower.get(str(name).lower())
        if key is not None:
            return row.get(key)
    return None


def _normalize_daily_row(row):
    if not isinstance(row, dict):
        return None
    date = _date_text(_pick(row, ["date", "time", "datetime", "index", "交易日期", "日期"]))
    open_price = _to_float(_pick(row, ["open", "Open", "OPEN", "开盘价", "开盘"]))
    high = _to_float(_pick(row, ["high", "High", "HIGH", "最高价", "最高"]))
    low = _to_float(_pick(row, ["low", "Low", "LOW", "最低价", "最低"]))
    close = _to_float(_pick(row, ["close", "Close", "CLOSE", "收盘价", "收盘"]))
    if not date or open_price is None or high is None or low is None or close is None:
        return None
    volume = _to_float(_pick(row, ["volume", "vol", "Volume", "VOL", "成交量"]))
    amount = _to_float(_pick(row, ["amount", "Amount", "AMOUNT", "成交额"]))
    return {
        "date": date,
        "open": open_price,
        "high": high,
        "low": low,
        "close": close,
        "volume": volume or 0,
        "amount": amount or 0,
    }


def _chunked(items, size):
    for index in range(0, len(items), size):
        yield items[index:index + size]


def _fetch_daily_bars(ContextInfo, codes):
    if not codes:
        return {}
    merged = {}
    for batch in _chunked(codes, DAILY_BATCH_SIZE):
        try:
            data = ContextInfo.get_market_data_ex([], batch, period="1d", count=DAILY_COUNT, dividend_type="front") or {}
        except Exception:
            data = ContextInfo.get_market_data_ex([], batch, period="1d", count=DAILY_COUNT) or {}
        if isinstance(data, dict):
            merged.update(data)
    return merged


def _write_daily_bars(ContextInfo, codes):
    try:
        data = _fetch_daily_bars(ContextInfo, codes)
        index_items = {}
        for code in codes:
            table = data.get(code) if isinstance(data, dict) else None
            rows = [_normalize_daily_row(row) for row in _rows_from_table(table)]
            rows = [row for row in rows if row]
            if not rows:
                continue
            payload = {
                "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "code": code,
                "period": "1d",
                "dividendType": "front",
                "rows": rows,
            }
            _atomic_write(os.path.join(DAILY_DIR, _safe_name(code) + ".json"), payload)
            index_items[code] = {"count": len(rows), "updatedAt": payload["updatedAt"]}
        _atomic_write(DAILY_INDEX_FILE, {
            "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "count": len(index_items),
            "items": index_items,
        })
        print("qmt daily warehouse wrote:", len(index_items))
    except Exception as exc:
        print("qmt bridge daily write failed:", exc)


def init(ContextInfo):
    ContextInfo.qmtBridgeCodes = _load_codes()
    ContextInfo.qmtBridgeLastWrite = 0
    ContextInfo.qmtBridgeLastDailyWrite = 0
    print("qmt bridge ready:", ContextInfo.qmtBridgeCodes)


def handlebar(ContextInfo):
    now = time.time()
    codes = _load_codes()
    if now - getattr(ContextInfo, "qmtBridgeLastWrite", 0) >= WRITE_INTERVAL_SECONDS:
        try:
            quotes = ContextInfo.get_full_tick(codes) or {}
            _atomic_write(OUTPUT_FILE, {
                "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "codes": codes,
                "quotes": quotes,
            })
            ContextInfo.qmtBridgeCodes = codes
            ContextInfo.qmtBridgeLastWrite = now
        except Exception as exc:
            print("qmt bridge write failed:", exc)

    if now - getattr(ContextInfo, "qmtBridgeLastDailyWrite", 0) >= DAILY_WRITE_INTERVAL_SECONDS:
        _write_daily_bars(ContextInfo, codes)
        ContextInfo.qmtBridgeLastDailyWrite = now
