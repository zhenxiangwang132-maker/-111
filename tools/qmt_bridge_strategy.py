# coding:gbk
import json
import os
import time


OUTPUT_FILE = r"C:\WatchlistApp\mm_app\qmt_bridge_quotes.json"
CODES_FILE = r"C:\WatchlistApp\mm_app\qmt_bridge_codes.json"
DEFAULT_CODES = ["603598.SH", "688256.SH", "300502.SZ", "300308.SZ", "300502.SZ", "600519.SH", "000001.SZ"]
WRITE_INTERVAL_SECONDS = 5


def _load_codes():
    try:
        if os.path.exists(CODES_FILE):
            with open(CODES_FILE, "r") as f:
                data = json.load(f)
            if isinstance(data, dict):
                data = data.get("codes") or data.get("items") or []
            if isinstance(data, list):
                return [str(item).strip() for item in data if str(item).strip()]
    except Exception as exc:
        print("qmt bridge load codes failed:", exc)
    return DEFAULT_CODES


def init(ContextInfo):
    ContextInfo.qmtBridgeCodes = _load_codes()
    ContextInfo.qmtBridgeLastWrite = 0
    print("qmt bridge ready:", ContextInfo.qmtBridgeCodes)


def handlebar(ContextInfo):
    now = time.time()
    if now - getattr(ContextInfo, "qmtBridgeLastWrite", 0) < WRITE_INTERVAL_SECONDS:
        return
    codes = _load_codes()
    try:
        quotes = ContextInfo.get_full_tick(codes) or {}
        payload = {
            "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "codes": codes,
            "quotes": quotes,
        }
        tmp_file = OUTPUT_FILE + ".tmp"
        with open(tmp_file, "w") as f:
            json.dump(payload, f)
        os.replace(tmp_file, OUTPUT_FILE)
        ContextInfo.qmtBridgeCodes = codes
        ContextInfo.qmtBridgeLastWrite = now
    except Exception as exc:
        print("qmt bridge write failed:", exc)
