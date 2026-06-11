import json
import os
import re
import sys
import urllib.parse
import urllib.request

import cv2
from rapidocr_onnxruntime import RapidOCR


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_FILE = os.path.join(ROOT, "ocr_titles.json")


def read_json(path, fallback):
    try:
        if not os.path.exists(path):
            return fallback
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, type(fallback)) else fallback
    except Exception:
        return fallback


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def video_path_from_url(url):
    parsed = urllib.parse.urlparse(url or "")
    query = urllib.parse.parse_qs(parsed.query)
    values = query.get("path") or []
    return values[0] if values else ""


def is_generic_title(title):
    text = str(title or "")
    return (
        "模型先生视频" in text
        or "待补标题" in text
        or bool(re.match(r"^20\d{2}-\d{2}-\d{2}", text))
        or bool(re.match(r"^dy_\d+_", text))
    )


def normalize_title(text):
    text = re.sub(r"\s+", "", str(text or ""))
    text = re.sub(r"[|｜]+$", "", text)
    text = text.replace("模型先生视频", "").replace("模型先生", "")
    text = text.strip(" ，,。.;；:：-_")
    return text[:60]


def frame_for_ocr(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return None
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0
    target = min(max(int(fps), 0), max(int(frame_count) - 1, 0))
    cap.set(cv2.CAP_PROP_POS_FRAMES, target)
    ok, frame = cap.read()
    cap.release()
    if not ok or frame is None:
        return None
    h, w = frame.shape[:2]
    y1 = int(h * 0.18)
    y2 = min(h, int(h * 0.73))
    cropped = frame[y1:y2, 0:w]
    if cropped.size == 0:
        cropped = frame
    scale = 1200 / max(cropped.shape[1], 1)
    if scale > 1:
        cropped = cv2.resize(cropped, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    return cropped


def fetch_local_videos():
    with urllib.request.urlopen("http://localhost:3000/api/local-videos", timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data.get("videos") if isinstance(data, dict) else []


def main():
    force = "--force" in sys.argv
    cache = read_json(CACHE_FILE, {})
    videos = fetch_local_videos()
    targets = []
    for video in videos:
        source_id = str(video.get("sourceId") or os.path.splitext(video.get("filename") or "")[0]).strip()
        if not source_id:
            continue
        if not force and cache.get(source_id):
            continue
        if not force and not is_generic_title(video.get("title")):
            continue
        path = video_path_from_url(video.get("url"))
        if path and os.path.exists(path):
            targets.append((source_id, path, video.get("title") or ""))

    ocr = RapidOCR()
    ok_count = 0
    fail_count = 0
    for index, (source_id, path, old_title) in enumerate(targets, start=1):
        try:
            frame = frame_for_ocr(path)
            if frame is None:
                fail_count += 1
                print(f"[{index}/{len(targets)}] FAIL {source_id}: cannot read frame", flush=True)
                continue
            result, _ = ocr(frame)
            rows = []
            for item in result or []:
                box, text, score = item
                if text and float(score or 0) >= 0.45:
                    rows.append((box, str(text), float(score or 0)))
            rows.sort(key=lambda row: (min(point[1] for point in row[0]), min(point[0] for point in row[0])))
            title = normalize_title("".join(row[1] for row in rows))
            if not title:
                fail_count += 1
                print(f"[{index}/{len(targets)}] EMPTY {source_id}: {old_title}", flush=True)
                continue
            cache[source_id] = title
            ok_count += 1
            print(f"[{index}/{len(targets)}] OK {source_id}: {title}", flush=True)
            if ok_count % 10 == 0:
                write_json(CACHE_FILE, cache)
        except Exception as exc:
            fail_count += 1
            print(f"[{index}/{len(targets)}] FAIL {source_id}: {exc}", flush=True)

    write_json(CACHE_FILE, cache)
    print(json.dumps({"success": True, "total": len(targets), "ok": ok_count, "fail": fail_count}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
