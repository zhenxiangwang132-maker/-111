# coding:utf-8
import json
import os
import time
import datetime


ROOT_DIR = r"C:\WatchlistApp\mm_app"
BRIDGE_VERSION = "2026-06-27.0130-refresh-daily"
OUTPUT_FILE = os.path.join(ROOT_DIR, "qmt_bridge_quotes.json")
CODES_FILE = os.path.join(ROOT_DIR, "qmt_bridge_codes.json")
DEBUG_FILE = os.path.join(ROOT_DIR, "qmt_bridge_debug.json")
DEBUG_LOG_FILE = os.path.join(ROOT_DIR, "qmt_bridge_debug.log")
DAILY_DIR = os.path.join(ROOT_DIR, "qmt_data", "daily")
DAILY_INDEX_FILE = os.path.join(ROOT_DIR, "qmt_data", "daily_index.json")
DAILY_ATTEMPTS_FILE = os.path.join(ROOT_DIR, "qmt_data", "daily_attempts.json")

DEFAULT_CODES = ["603598.SH", "688256.SH", "300502.SZ", "300308.SZ", "600519.SH", "000001.SZ"]
WRITE_INTERVAL_SECONDS = 5
DAILY_WRITE_INTERVAL_SECONDS = 5
DAILY_COUNT = 360
DAILY_BATCH_SIZE = 10
DAILY_BATCHES_PER_HANDLEBAR = 40
DAILY_MAX_SECONDS_PER_HANDLEBAR = 25
EMPTY_RETRY_SECONDS = 60


def _atomic_write(path, payload):
    folder = os.path.dirname(path)
    if folder and not os.path.exists(folder):
        os.makedirs(folder)
    tmp_file = path + ".tmp"
    with open(tmp_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
    os.replace(tmp_file, path)


def _debug(stage, **payload):
    data = {
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "stage": stage,
    }
    data.update(payload)
    try:
        _atomic_write(DEBUG_FILE, data)
    except Exception:
        pass
    try:
        folder = os.path.dirname(DEBUG_LOG_FILE)
        if folder and not os.path.exists(folder):
            os.makedirs(folder)
        with open(DEBUG_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(json.dumps(data, ensure_ascii=False) + "\n")
    except Exception:
        pass


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


def _rows_from_market_data_dict(data, code):
    if not isinstance(data, dict):
        return []
    rows = []
    fields = ["open", "high", "low", "close", "volume", "amount"]
    field_map = {field: data.get(field) for field in fields if field in data}
    if not field_map:
        return []
    first_values = next(iter(field_map.values()), None)
    try:
        indexes = list(first_values.index)
    except Exception:
        indexes = list(range(len(first_values))) if hasattr(first_values, "__len__") else []
    for index in indexes:
        row = {"date": index}
        for field, values in field_map.items():
            try:
                row[field] = values.loc[index]
            except Exception:
                try:
                    row[field] = values[index]
                except Exception:
                    row[field] = None
        rows.append(row)
    return rows


def _table_summary(table):
    summary = {"type": str(type(table))}
    try:
        if hasattr(table, "shape"):
            summary["shape"] = str(table.shape)
        if hasattr(table, "columns"):
            summary["columns"] = [str(item) for item in list(table.columns)[:20]]
        if hasattr(table, "index"):
            summary["indexSample"] = [str(item) for item in list(table.index)[:3]]
        rows = _rows_from_table(table)
        summary["rowCount"] = len(rows)
        if rows:
            summary["firstRow"] = {str(k): _json_safe(v) for k, v in list(rows[0].items())[:20]}
    except Exception as exc:
        summary["error"] = str(exc)
    return summary


def _table_row_count(table):
    try:
        return len(_rows_from_table(table))
    except Exception:
        return 0


def _market_data_total_rows(data, batch):
    if not data:
        return 0
    if isinstance(data, dict):
        if "__market_data__" in data:
            market_data = data.get("__market_data__")
            if isinstance(market_data, dict):
                return len(_rows_from_market_data_dict(market_data, batch[0] if batch else ""))
            return _table_row_count(market_data)
        return sum(_table_row_count(table) for table in data.values())
    return _table_row_count(data)


def _try_download_history(ContextInfo, codes):
    start_time = (datetime.datetime.now() - datetime.timedelta(days=DAILY_COUNT * 2)).strftime("%Y%m%d")
    end_time = datetime.datetime.now().strftime("%Y%m%d")
    downloader = globals().get("download_history_data")
    downloaded = 0
    if callable(downloader):
        for code in codes:
            try:
                downloader(code, "1d", start_time, end_time)
                downloaded += 1
            except Exception as exc:
                _debug("download_history_failed", code=code, error=str(exc))
    context_downloader = getattr(ContextInfo, "download_history_data", None)
    if callable(context_downloader):
        for code in codes:
            try:
                context_downloader(code, "1d", start_time, end_time)
                downloaded += 1
            except Exception as exc:
                _debug("context_download_history_failed", code=code, error=str(exc))
    if downloaded:
        _debug("download_history_done", count=downloaded, startTime=start_time, endTime=end_time)
    return downloaded


def _fetch_daily_bars_one_by_one(ContextInfo, codes):
    fields = ["open", "high", "low", "close", "volume", "amount"]
    result = {}
    for code in codes:
        table = None
        try:
            table = ContextInfo.get_market_data(fields, stock_code=[code], period="1d", count=DAILY_COUNT, skip_paused=False, dividend_type="front")
        except Exception as exc:
            _debug("single_get_market_data_front_failed", code=code, error=str(exc))
            try:
                table = ContextInfo.get_market_data(fields, stock_code=[code], period="1d", count=DAILY_COUNT, skip_paused=False)
            except Exception as fallback_exc:
                _debug("single_get_market_data_failed", code=code, error=str(fallback_exc))
        if table is not None:
            result[code] = table
    return result


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
    date = _date_text(_pick(row, ["date", "time", "datetime", "index", "trading_day", "stime"]))
    open_price = _to_float(_pick(row, ["open", "Open", "OPEN"]))
    high = _to_float(_pick(row, ["high", "High", "HIGH"]))
    low = _to_float(_pick(row, ["low", "Low", "LOW"]))
    close = _to_float(_pick(row, ["close", "Close", "CLOSE"]))
    if not date or open_price is None or high is None or low is None or close is None:
        return None
    volume = _to_float(_pick(row, ["volume", "vol", "Volume", "VOL"]))
    amount = _to_float(_pick(row, ["amount", "Amount", "AMOUNT"]))
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
        _try_download_history(ContextInfo, batch[:10])
        data = {}
        last_error = ""
        fields = ["open", "high", "low", "close", "volume", "amount"]
        start_time = (datetime.datetime.now() - datetime.timedelta(days=DAILY_COUNT * 2)).strftime("%Y%m%d")
        end_time = datetime.datetime.now().strftime("%Y%m%d")
        attempts = [
            ("get_market_data_single_loop", lambda: _fetch_daily_bars_one_by_one(ContextInfo, batch)),
            ("get_market_data_ex_front_fields", lambda: ContextInfo.get_market_data_ex(fields, batch, period="1d", count=DAILY_COUNT, dividend_type="front")),
            ("get_market_data_ex_front_empty", lambda: ContextInfo.get_market_data_ex([], batch, period="1d", count=DAILY_COUNT, dividend_type="front")),
            ("get_market_data_ex_front_range", lambda: ContextInfo.get_market_data_ex(fields, batch, period="1d", start_time=start_time, end_time=end_time, dividend_type="front")),
            ("get_market_data_ex_range", lambda: ContextInfo.get_market_data_ex(fields, batch, period="1d", start_time=start_time, end_time=end_time)),
            ("get_market_data_ex_fields", lambda: ContextInfo.get_market_data_ex(fields, batch, period="1d", count=DAILY_COUNT)),
            ("get_market_data_ex_empty", lambda: ContextInfo.get_market_data_ex([], batch, period="1d", count=DAILY_COUNT)),
            ("get_market_data_front_range", lambda: ContextInfo.get_market_data(fields, stock_code=batch, period="1d", start_time=start_time, end_time=end_time, skip_paused=False, dividend_type="front")),
            ("get_market_data_range", lambda: ContextInfo.get_market_data(fields, stock_code=batch, period="1d", start_time=start_time, end_time=end_time, skip_paused=False)),
            ("get_market_data_front", lambda: ContextInfo.get_market_data(fields, stock_code=batch, period="1d", count=DAILY_COUNT, skip_paused=False, dividend_type="front")),
            ("get_market_data_plain", lambda: ContextInfo.get_market_data(fields, stock_code=batch, period="1d", count=DAILY_COUNT, skip_paused=False)),
        ]
        for name, getter in attempts:
            try:
                _debug("daily_fetch_attempt", method=name, batchSize=len(batch), firstCode=batch[0] if batch else "")
                data = getter() or {}
                if data:
                    if not isinstance(data, dict):
                        data = {"__market_data__": data}
                    total_rows = _market_data_total_rows(data, batch)
                    sample_code = ""
                    sample_summary = {}
                    if isinstance(data, dict):
                        for key, table in data.items():
                            sample_code = key
                            sample_summary = _table_summary(table)
                            break
                    if total_rows > 0:
                        _debug("daily_fetch_ok", method=name, batchSize=len(batch), keys=len(data) if isinstance(data, dict) else 0, rows=total_rows, sampleCode=sample_code, sample=sample_summary)
                        break
                    _debug("daily_fetch_empty", method=name, batchSize=len(batch), keys=len(data) if isinstance(data, dict) else 0, sampleCode=sample_code, sample=sample_summary)
                    data = {}
            except Exception as exc:
                last_error = str(exc)
                _debug("daily_fetch_failed", method=name, error=last_error, batchSize=len(batch))
        if not data and last_error:
            print("qmt bridge daily fetch failed:", last_error)
        if isinstance(data, dict):
            if "__market_data__" in data:
                market_data = data.get("__market_data__")
                for code in batch:
                    merged[code] = _rows_from_market_data_dict(market_data, code)
            else:
                merged.update(data)
    return merged


def _write_daily_bars(ContextInfo, codes):
    try:
        _debug("daily_write_start", codeCount=len(codes), firstCode=codes[0] if codes else "")
        data = _fetch_daily_bars(ContextInfo, codes)
        index_items = {}
        attempt_items = _load_daily_attempt_items()
        try:
            if os.path.exists(DAILY_INDEX_FILE):
                with open(DAILY_INDEX_FILE, "r", encoding="utf-8") as f:
                    saved_index = json.load(f)
                if isinstance(saved_index, dict) and isinstance(saved_index.get("items"), dict):
                    index_items.update(saved_index.get("items"))
        except Exception:
            pass

        wrote = 0
        for code in codes:
            table = data.get(code) if isinstance(data, dict) else None
            rows = [_normalize_daily_row(row) for row in _rows_from_table(table)]
            rows = [row for row in rows if row]
            if not rows:
                attempt_items[code] = {
                    "status": "empty",
                    "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
                }
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
            if code in attempt_items:
                del attempt_items[code]
            wrote += 1
        sample_code = ""
        sample_summary = {}
        if isinstance(data, dict):
            for key, table in data.items():
                sample_code = key
                sample_summary = _table_summary(table)
                break
        _atomic_write(DAILY_INDEX_FILE, {
            "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "count": len(index_items),
            "items": index_items,
        })
        _save_daily_attempt_items(attempt_items)
        _debug("daily_write_done", batchWrote=wrote, total=len(index_items), fetchedKeys=len(data) if isinstance(data, dict) else 0, sampleCode=sample_code, sample=sample_summary)
        print("qmt daily warehouse wrote batch:", wrote, "total:", len(index_items))
    except Exception as exc:
        _debug("daily_write_failed", error=str(exc), codeCount=len(codes))
        print("qmt bridge daily write failed:", exc)


def _load_daily_index_items():
    try:
        if os.path.exists(DAILY_INDEX_FILE):
            with open(DAILY_INDEX_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict) and isinstance(data.get("items"), dict):
                return data.get("items")
    except Exception:
        pass
    return {}


def _load_daily_attempt_items():
    try:
        if os.path.exists(DAILY_ATTEMPTS_FILE):
            with open(DAILY_ATTEMPTS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict) and isinstance(data.get("items"), dict):
                return data.get("items")
    except Exception:
        pass
    return {}


def _save_daily_attempt_items(items):
    _atomic_write(DAILY_ATTEMPTS_FILE, {
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "count": len(items),
        "items": items,
    })


def _parse_time_text(text):
    try:
        return time.mktime(time.strptime(str(text or ""), "%Y-%m-%dT%H:%M:%S"))
    except Exception:
        return 0


def _is_recent_empty_attempt(item):
    if not isinstance(item, dict):
        return False
    ts = _parse_time_text(item.get("updatedAt"))
    return ts > 0 and time.time() - ts < EMPTY_RETRY_SECONDS


def _is_fresh_daily_entry(item):
    if not isinstance(item, dict):
        return False
    updated_at = str(item.get("updatedAt") or "")
    today = time.strftime("%Y-%m-%d")
    return updated_at.startswith(today)


def _next_daily_batch(codes, cursor, size):
    if not codes:
        return [], 0
    existing = _load_daily_index_items()
    attempted = _load_daily_attempt_items()
    total = len(codes)
    selected = []
    index = cursor if 0 <= cursor < total else 0
    checked = 0
    while checked < total and len(selected) < size:
        code = codes[index]
        has_file = code in existing and os.path.exists(os.path.join(DAILY_DIR, _safe_name(code) + ".json"))
        has_fresh_file = has_file and _is_fresh_daily_entry(existing.get(code))
        has_recent_empty_attempt = _is_recent_empty_attempt(attempted.get(code))
        if not has_fresh_file and not has_recent_empty_attempt:
            selected.append(code)
        index = (index + 1) % total
        checked += 1
    if not selected:
        index = 0
    return selected, index


def _run_daily_batches(ContextInfo, codes):
    started = time.time()
    cursor = int(getattr(ContextInfo, "qmtBridgeDailyCursor", 0) or 0)
    total_wrote_before = len(_load_daily_index_items())
    ran = 0
    for _ in range(DAILY_BATCHES_PER_HANDLEBAR):
        if time.time() - started >= DAILY_MAX_SECONDS_PER_HANDLEBAR:
            break
        batch, next_cursor = _next_daily_batch(codes, cursor, DAILY_BATCH_SIZE)
        if not batch:
            print("qmt daily warehouse no pending codes")
            _debug("daily_no_pending_codes", cursor=cursor, total=len(codes))
            break
        _write_daily_bars(ContextInfo, batch)
        cursor = next_cursor
        ran += 1
        ContextInfo.qmtBridgeDailyCursor = cursor
    total_wrote_after = len(_load_daily_index_items())
    print("qmt daily warehouse handlebar batches:", ran, "added:", total_wrote_after - total_wrote_before, "total:", total_wrote_after)
    _debug("daily_handlebar_done", batches=ran, added=total_wrote_after - total_wrote_before, total=total_wrote_after, cursor=cursor)


def init(ContextInfo):
    ContextInfo.qmtBridgeCodes = _load_codes()
    ContextInfo.qmtBridgeLastWrite = 0
    ContextInfo.qmtBridgeLastDailyWrite = 0
    ContextInfo.qmtBridgeDailyCursor = 0
    _debug("init", version=BRIDGE_VERSION, codeCount=len(ContextInfo.qmtBridgeCodes))
    print("xiaoke qmt bridge version:", BRIDGE_VERSION)
    print("qmt bridge ready:", ContextInfo.qmtBridgeCodes)
    try:
        first_batch = ContextInfo.qmtBridgeCodes[:DAILY_BATCH_SIZE]
        if first_batch:
            try:
                ContextInfo.set_universe(first_batch)
                _debug("set_universe_done", count=len(first_batch))
            except Exception as exc:
                _debug("set_universe_failed", error=str(exc), count=len(first_batch))
    except Exception as exc:
        _debug("init_daily_failed", error=str(exc))
        print("qmt bridge init universe failed:", exc)


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
        _run_daily_batches(ContextInfo, codes)
        ContextInfo.qmtBridgeLastDailyWrite = now

