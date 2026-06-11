import argparse
import json
import os
import sys
import tempfile

import pypdfium2 as pdfium
from rapidocr_onnxruntime import RapidOCR

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass


def row_sort_key(row):
    box = row.get("box") or []
    if not box:
        return (0, 0)
    return (min(point[1] for point in box), min(point[0] for point in box))


def ocr_page(ocr, page, scale):
    image = page.render(scale=scale).to_pil()
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp:
        temp_path = temp.name
    try:
        image.save(temp_path)
        result, _ = ocr(temp_path)
    finally:
        try:
            os.remove(temp_path)
        except OSError:
            pass

    rows = []
    for item in result or []:
        box, text, score = item
        text = str(text or "").strip()
        if not text:
            continue
        if float(score or 0) < 0.45:
            continue
        rows.append({"text": text, "score": float(score or 0), "box": box})
    rows.sort(key=row_sort_key)
    return "\n".join(row["text"] for row in rows).strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf_path")
    parser.add_argument("--start-page", type=int, default=1)
    parser.add_argument("--max-pages", type=int, default=60)
    parser.add_argument("--scale", type=float, default=1.8)
    args = parser.parse_args()

    if not os.path.exists(args.pdf_path):
        print(json.dumps({"success": False, "error": "PDF not found"}, ensure_ascii=False))
        return 2

    doc = pdfium.PdfDocument(args.pdf_path)
    total_pages = len(doc)
    start = max(1, args.start_page)
    end = min(total_pages, start + max(1, args.max_pages) - 1)
    ocr = RapidOCR()
    pages = []

    for page_no in range(start, end + 1):
        page = doc[page_no - 1]
        try:
            text = ocr_page(ocr, page, args.scale)
        finally:
            page.close()
        pages.append({"page": page_no, "text": text})

    text = "\n\n".join(f"第 {item['page']} 页\n{item['text']}" for item in pages if item["text"]).strip()
    print(json.dumps({
        "success": True,
        "totalPages": total_pages,
        "startPage": start,
        "endPage": end,
        "pagesRead": len(pages),
        "text": text,
        "textLength": len(text),
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
