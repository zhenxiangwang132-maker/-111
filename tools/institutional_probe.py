import argparse
import contextlib
import io
import importlib
import json
import os
import sys
import tempfile
import traceback
from datetime import datetime
from pathlib import Path


PROVIDERS = [
    {
        "id": "wind",
        "name": "Wind WAPI",
        "module": "WindPy",
        "env": [],
        "hint": "Install Wind terminal/WAPI, make sure WindPy is on PYTHONPATH, then keep the licensed Wind client available.",
    },
    {
        "id": "ifind",
        "name": "iFinD",
        "module": "iFinDPy",
        "env": ["IFIND_USER", "IFIND_PASSWORD"],
        "hint": "Install the iFinD Python SDK and set IFIND_USER / IFIND_PASSWORD if your SDK requires explicit login.",
    },
    {
        "id": "choice",
        "name": "Choice/EmQuantAPI",
        "module": "EmQuantAPI",
        "env": ["CHOICE_USER", "CHOICE_PASSWORD"],
        "hint": "Install EmQuantAPI from the Choice terminal package and set CHOICE_USER / CHOICE_PASSWORD if needed.",
    },
    {
        "id": "qmt",
        "name": "QMT/xtquant",
        "module": "xtquant.xtdata",
        "env": ["QMT_USERDATA_PATH"],
        "hint": "Open MiniQMT/iQuant first. If xtquant is not importable, set QMT_SITE_PACKAGES or INSTITUTIONAL_SDK_PATHS to the QMT Lib/site-packages path.",
    },
]


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


def env_state(keys):
    return {key: bool(os.environ.get(key)) for key in keys}


def safe_text(value):
    if value is None:
        return ""
    try:
        return str(value)
    except Exception:
        return repr(value)


def result_base(provider):
    return {
        "id": provider["id"],
        "name": provider["name"],
        "module": provider["module"],
        "installed": False,
        "importOk": False,
        "connectOk": False,
        "status": "not_installed",
        "message": provider["hint"],
        "credentials": env_state(provider["env"]),
        "error": "",
    }


def qmt_sdk_found():
    return any(("xtquant" in path.lower() or "国信iquant" in path.lower() or "miniqmt" in path.lower()) for path in configured_sdk_paths())


def probe_wind(module, connect):
    if not connect:
        return {"status": "imported", "connectOk": False, "message": "WindPy is importable. Click connect to test w.start()."}
    w = getattr(module, "w", None)
    if w is None:
        return {"status": "connect_failed", "connectOk": False, "message": "WindPy imported, but object w was not found."}
    start_result = w.start()
    code = getattr(start_result, "ErrorCode", None)
    ok = code in (0, "0", None)
    try:
        w.close()
    except Exception:
        pass
    return {
        "status": "connected" if ok else "connect_failed",
        "connectOk": bool(ok),
        "message": "w.start() returned " + safe_text(start_result),
    }


def probe_ifind(module, connect):
    if not connect:
        return {"status": "imported", "connectOk": False, "message": "iFinDPy is importable. Click connect to test login when credentials are configured."}
    user = os.environ.get("IFIND_USER")
    password = os.environ.get("IFIND_PASSWORD")
    login = getattr(module, "THS_iFinDLogin", None)
    logout = getattr(module, "THS_iFinDLogout", None)
    if not callable(login):
        return {"status": "connect_failed", "connectOk": False, "message": "iFinDPy imported, but THS_iFinDLogin was not found."}
    if not user or not password:
        return {"status": "login_required", "connectOk": False, "message": "Set IFIND_USER and IFIND_PASSWORD, then test again."}
    login_result = login(user, password)
    ok = safe_text(login_result).strip() in ("0", "0.0") or getattr(login_result, "errorcode", None) in (0, "0")
    try:
        if callable(logout):
            logout()
    except Exception:
        pass
    return {
        "status": "connected" if ok else "connect_failed",
        "connectOk": bool(ok),
        "message": "THS_iFinDLogin returned " + safe_text(login_result),
    }


def probe_choice(module, connect):
    if not connect:
        return {"status": "imported", "connectOk": False, "message": "EmQuantAPI is importable. Click connect to test c.start()."}
    c = getattr(module, "c", None)
    if c is None:
        return {"status": "connect_failed", "connectOk": False, "message": "EmQuantAPI imported, but object c was not found."}
    user = os.environ.get("CHOICE_USER")
    password = os.environ.get("CHOICE_PASSWORD")
    if user and password:
        start_result = c.start(user, password)
    else:
        start_result = c.start()
    code = getattr(start_result, "ErrorCode", None)
    ok = code in (0, "0", None)
    try:
        c.stop()
    except Exception:
        pass
    return {
        "status": "connected" if ok else "connect_failed",
        "connectOk": bool(ok),
        "message": "c.start() returned " + safe_text(start_result),
    }


def qmt_userdata_path():
    configured = os.environ.get("QMT_USERDATA_PATH")
    candidates = [configured] if configured else []
    candidates.append(str(Path.home() / "国信iQuant策略交易平台" / "userdata_mini"))
    candidates.append(str(Path.home() / "iQuant策略交易平台" / "userdata_mini"))
    for item in candidates:
        if item and os.path.isdir(item):
            return item
    return configured or ""


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


def probe_qmt(module, connect):
    userdata = qmt_userdata_path()
    has_userdata = bool(userdata and os.path.isdir(userdata))
    message = "xtquant.xtdata is importable."
    if has_userdata:
        message += " userdata_mini found: " + userdata
    else:
        message += " QMT_USERDATA_PATH/userdata_mini was not found."
    if not connect:
        return {
            "status": "imported",
            "connectOk": False,
            "message": message + " Keep QMT running, then click connect to test the quote service.",
        }
    get_full_tick = getattr(module, "get_full_tick", None)
    if not callable(get_full_tick):
        return {"status": "connect_failed", "connectOk": False, "message": "xtquant.xtdata imported, but get_full_tick was not found."}
    try:
        noise = io.StringIO()
        with contextlib.redirect_stdout(noise), contextlib.redirect_stderr(noise):
            sample, native_noise = call_with_captured_output(get_full_tick, ["000001.SZ"])
        ok = isinstance(sample, dict)
        detail = safe_text(sample)[:500] or (noise.getvalue().strip() + " " + (native_noise or "")).strip()[:500]
        return {
            "status": "connected" if ok else "connect_failed",
            "connectOk": bool(ok),
            "message": "get_full_tick(['000001.SZ']) returned " + detail,
        }
    except Exception as exc:
        extra = noise.getvalue().strip() if "noise" in locals() else ""
        return {
            "status": "connect_failed",
            "connectOk": False,
            "message": "QMT quote service test failed. Keep MiniQMT/iQuant open and make sure market data is authenticated. " + (extra + " " if extra else "") + safe_text(exc),
        }


def probe_provider(provider, connect):
    item = result_base(provider)
    try:
        module = importlib.import_module(provider["module"])
        item["installed"] = True
        item["importOk"] = True
        item["status"] = "imported"
        item["message"] = provider["module"] + " imported."
        if provider["id"] == "wind":
            item.update(probe_wind(module, connect))
        elif provider["id"] == "ifind":
            item.update(probe_ifind(module, connect))
        elif provider["id"] == "choice":
            item.update(probe_choice(module, connect))
        elif provider["id"] == "qmt":
            item.update(probe_qmt(module, connect))
    except ModuleNotFoundError as exc:
        item["error"] = safe_text(exc)
        if provider["id"] == "qmt" and qmt_sdk_found():
            item["installed"] = True
            item["status"] = "python_incompatible"
            item["message"] = "QMT/xtquant SDK path was found, but the current Python cannot load its binary module. Use a Python version supported by this xtquant package, or export quotes from the QMT strategy environment."
    except Exception as exc:
        item["status"] = "connect_failed" if connect else "import_failed"
        item["error"] = safe_text(exc)
        item["message"] = traceback.format_exc(limit=3)
    return item


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--connect", action="store_true")
    args = parser.parse_args()
    payload = {
        "success": True,
        "checkedAt": datetime.now().isoformat(timespec="seconds"),
        "python": sys.executable,
        "connect": bool(args.connect),
        "configuredPaths": configured_sdk_paths(),
        "providers": [probe_provider(provider, args.connect) for provider in PROVIDERS],
    }
    print(json.dumps(payload, ensure_ascii=False))


if __name__ == "__main__":
    main()
