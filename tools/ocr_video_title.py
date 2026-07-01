import json
import sys

try:
    from rapidocr_onnxruntime import RapidOCR
except ModuleNotFoundError:
    RapidOCR = None

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "missing image path"}, ensure_ascii=False))
        return 2

    image_path = sys.argv[1]
    if RapidOCR is None:
        print(json.dumps({
            "success": False,
            "error": "OCR依赖缺失：请安装 rapidocr-onnxruntime，或重启服务后再试。"
        }, ensure_ascii=False))
        return 3

    ocr = RapidOCR()
    result, _ = ocr(image_path)
    rows = []
    for item in result or []:
        box, text, score = item
        if not text:
            continue
        rows.append({"text": str(text).strip(), "score": float(score or 0), "box": box})

    rows.sort(key=lambda row: (min(point[1] for point in row["box"]), min(point[0] for point in row["box"])))
    title = "".join(row["text"].replace(" ", "") for row in rows if row["score"] >= 0.45).strip()
    print(json.dumps({"success": True, "title": title, "rows": rows}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
