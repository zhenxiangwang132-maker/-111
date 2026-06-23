const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { execFile, spawn } = require("child_process");
const { Readable } = require("stream");

const PORT = 3000;
const ROOT = __dirname;
const VIDEOS_DIR = path.join(ROOT, "videos");
const LEGACY_VIDEOS_DIR = path.resolve(ROOT, "..", "videos");
const VIDEO_FOLDERS_FILE = path.join(ROOT, "video-folders.txt");
const COOKIES_FILE = path.join(ROOT, "cookies.txt");
const METADATA_FILE = path.join(ROOT, "douyin_metadata.json");
const DOUYIN_SIDE_DATA_FILE = path.join(ROOT, "douyin_side_data.json");
const DOUYIN_SYNC_STATE_FILE = path.join(ROOT, "douyin_sync_state.json");
const DOUYIN_COOKIE_JOB_FILE = path.join(ROOT, "douyin_cookie_job.json");
const AGENT_CONFIG_FILE = path.join(ROOT, "agent-config.json");
const AGENT_MEMORY_FILE = path.join(ROOT, "agent_memory.json");
const AGENT_LOG_FILE = path.join(ROOT, "agent_call_logs.json");
const STOCK_PROFILE_FILE = path.join(ROOT, "stock_profiles.json");
const TRANSCRIPTS_DIR = path.join(ROOT, "transcripts");
const OCR_FRAMES_DIR = path.join(ROOT, "ocr_frames");
const OCR_TITLE_CACHE_FILE = path.join(ROOT, "ocr_titles.json");
const OCR_TITLE_SCRIPT = path.join(ROOT, "tools", "ocr_video_title.py");
const OCR_PDF_SCRIPT = path.join(ROOT, "tools", "ocr_pdf_document.py");
const INSTITUTIONAL_PROBE_SCRIPT = path.join(ROOT, "tools", "institutional_probe.py");
const INSTITUTIONAL_DATA_SCRIPT = path.join(ROOT, "tools", "institutional_data.py");
const QMT_BRIDGE_CODES_FILE = path.join(ROOT, "qmt_bridge_codes.json");
const QMT_BRIDGE_QUOTES_FILE = path.join(ROOT, "qmt_bridge_quotes.json");
const QMT_BRIDGE_STRATEGY_FILE = path.join(ROOT, "tools", "qmt_bridge_strategy.py");
const QMT_BRIDGE_QMT_STRATEGY_FILE = path.join(os.homedir(), "国信iQuant策略交易平台", "python", "xiaoke_qmt_bridge.py");
const DOCUMENTS_DIR = path.join(ROOT, "documents");
const DOCUMENT_METADATA_FILE = path.join(ROOT, "documents_metadata.json");
const ANNOUNCEMENTS_DIR = path.join(ROOT, "announcements");
const ANNOUNCEMENT_CACHE_FILE = path.join(ROOT, "announcement_cache.json");
const A_SHARE_UNIVERSE_CACHE_FILE = path.join(ROOT, "a_share_universe_cache.json");
const SECTOR_QUOTE_CACHE_FILE = path.join(ROOT, "sector_quote_cache.json");
const DOCUMENT_TEXT_LIMIT = 160000;
const DOCUMENT_CLIENT_TEXT_LIMIT = 80000;
const DOCUMENT_OCR_DEFAULT_PAGES = 60;
const VIDEO_EXTS = [".mp4", ".webm", ".mov", ".m4v", ".mkv", ".avi", ".flv", ".wmv"];
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];
const DOCUMENT_EXTS = [".pdf", ".doc", ".docx"];
const douyinCache = new Map();
let marketIndexCache = { at: 0, data: [] };
let institutionalCapabilityCache = { at: 0, hasProvider: false, result: null };

function decodeTencentQuote(buffer) {
  try {
    return new TextDecoder("gb18030").decode(buffer);
  } catch {
    return buffer.toString("binary");
  }
}

if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });
if (!fs.existsSync(TRANSCRIPTS_DIR)) fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
if (!fs.existsSync(OCR_FRAMES_DIR)) fs.mkdirSync(OCR_FRAMES_DIR, { recursive: true });
if (!fs.existsSync(DOCUMENTS_DIR)) fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
if (!fs.existsSync(ANNOUNCEMENTS_DIR)) fs.mkdirSync(ANNOUNCEMENTS_DIR, { recursive: true });

function pythonToolInvocation() {
  const configured = String(process.env.PYTHON_BIN || "").trim();
  if (configured) {
    const extraArgs = String(process.env.PYTHON_BIN_ARGS || "").split(/\s+/).filter(Boolean);
    return { command: configured, args: extraArgs };
  }
  if (process.platform === "win32") {
    return { command: "py", args: ["-3.11"] };
  }
  return { command: "python3.11", args: [] };
}

function execPythonTool(scriptPath, args, options, callback) {
  const py = pythonToolInvocation();
  execFile(py.command, [...py.args, scriptPath, ...(args || [])], options, callback);
}

function readMetadata() {
  try {
    if (!fs.existsSync(METADATA_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(METADATA_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeMetadata(items) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function readDocumentMetadata() {
  try {
    if (!fs.existsSync(DOCUMENT_METADATA_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(DOCUMENT_METADATA_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeDocumentMetadata(items) {
  fs.writeFileSync(DOCUMENT_METADATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function readAnnouncementCache() {
  try {
    if (!fs.existsSync(ANNOUNCEMENT_CACHE_FILE)) return {};
    const data = JSON.parse(fs.readFileSync(ANNOUNCEMENT_CACHE_FILE, "utf8"));
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function writeAnnouncementCache(cache) {
  fs.writeFileSync(ANNOUNCEMENT_CACHE_FILE, JSON.stringify(cache || {}, null, 2), "utf8");
}

function readMarketCache(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return data && Array.isArray(data.items) ? data : null;
  } catch {
    return null;
  }
}

function writeMarketCache(filePath, items) {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ at: new Date().toISOString(), items: items || [] }), "utf8");
  } catch {}
}

function sanitizeFilename(filename) {
  const fallback = "document";
  const base = path.basename(String(filename || fallback)).replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").trim();
  return base || fallback;
}

function uniqueDocumentFilename(filename) {
  const safe = sanitizeFilename(filename);
  const ext = path.extname(safe).toLowerCase();
  const stem = path.basename(safe, ext).slice(0, 80) || "document";
  let candidate = `${Date.now()}_${stem}${ext}`;
  let index = 1;
  while (fs.existsSync(path.join(DOCUMENTS_DIR, candidate))) {
    candidate = `${Date.now()}_${stem}_${index}${ext}`;
    index += 1;
  }
  return candidate;
}

function documentTypeFromExt(ext) {
  if (ext === ".pdf") return "PDF";
  if (ext === ".doc" || ext === ".docx") return "Word";
  return "文档";
}

function documentItemForClient(item) {
  const fileName = item.savedName || item.fileName || "";
  return {
    id: item.id,
    title: item.title || (item.originalName || fileName).replace(/\.[^.]+$/, ""),
    topic: item.topic || "书籍",
    date: item.date || (item.importedAt || "").slice(0, 10) || "",
    author: item.author || "本地文档",
    documentType: item.documentType || documentTypeFromExt(path.extname(fileName).toLowerCase()),
    fileName,
    originalName: item.originalName || fileName,
    size: item.size || 0,
    mimeType: item.mimeType || mimeType(path.extname(fileName).toLowerCase()),
    importedAt: item.importedAt || "",
    url: `/api/local-document/${encodeURIComponent(fileName)}`,
    transcript: item.summary || "本地文档已导入，可补充读书笔记、摘要或后续接入文档解析。",
    confidence: item.confidence || "待读"
  };
}

function getLocalDocuments() {
  return readDocumentMetadata()
    .filter(item => item && item.savedName && fs.existsSync(path.join(DOCUMENTS_DIR, item.savedName)))
    .map(documentItemForClient)
    .sort((a, b) => new Date(b.importedAt || b.date || 0) - new Date(a.importedAt || a.date || 0));
}

function documentItemForClient(item) {
  const fileName = item.savedName || item.fileName || "";
  const extractedText = String(item.extractedText || "");
  return {
    id: item.id,
    title: item.title || (item.originalName || fileName).replace(/\.[^.]+$/, ""),
    topic: item.topic || "书籍",
    date: item.date || (item.importedAt || "").slice(0, 10) || "",
    author: item.author || "本地文档",
    documentType: item.documentType || documentTypeFromExt(path.extname(fileName).toLowerCase()),
    fileName,
    originalName: item.originalName || fileName,
    size: item.size || 0,
    mimeType: item.mimeType || mimeType(path.extname(fileName).toLowerCase()),
    importedAt: item.importedAt || "",
    url: `/api/local-document/${encodeURIComponent(fileName)}`,
    transcript: extractedText ? extractedText.slice(0, DOCUMENT_CLIENT_TEXT_LIMIT) : (item.summary || "本地文档已导入，可点击“学习书籍”提取正文并生成读书总结。"),
    summary: item.summary || "",
    extractedAt: item.extractedAt || "",
    extractedTextLength: extractedText.length,
    hasExtractedText: extractedText.length > 0,
    extractionMode: item.extractionMode || "",
    ocrPagesRead: item.ocrPagesRead || 0,
    ocrStartPage: item.ocrStartPage || 0,
    ocrEndPage: item.ocrEndPage || 0,
    pageCount: item.pageCount || 0,
    confidence: item.confidence || "待读"
  };
}

function importDocumentFile(payload) {
  const originalName = sanitizeFilename(payload.filename || payload.name || "");
  const ext = path.extname(originalName).toLowerCase();
  if (!DOCUMENT_EXTS.includes(ext)) {
    throw new Error("只支持导入 PDF、Word（.doc / .docx）文件。");
  }
  const raw = String(payload.dataBase64 || "").replace(/^data:[^,]+,/, "");
  if (!raw) throw new Error("没有收到文件内容。");
  const buffer = Buffer.from(raw, "base64");
  if (!buffer.length) throw new Error("文件内容为空。");
  const savedName = uniqueDocumentFilename(originalName);
  fs.writeFileSync(path.join(DOCUMENTS_DIR, savedName), buffer);
  const now = new Date().toISOString();
  const item = {
    id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    originalName,
    savedName,
    title: String(payload.title || originalName.replace(/\.[^.]+$/, "")).trim(),
    topic: String(payload.topic || "书籍").trim() || "书籍",
    author: String(payload.author || "本地文档").trim() || "本地文档",
    documentType: documentTypeFromExt(ext),
    mimeType: payload.mimeType || mimeType(ext),
    size: buffer.length,
    date: now.slice(0, 10),
    importedAt: now,
    confidence: "待读"
  };
  const items = readDocumentMetadata();
  items.unshift(item);
  writeDocumentMetadata(items);
  return documentItemForClient(item);
}

function normalizeDocumentText(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[\t\f\v]+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .trim();
}

function makeDocumentSummary(text, title = "") {
  const clean = normalizeDocumentText(text);
  const paragraphs = clean
    .split(/\n{2,}|(?<=[。！？.!?])\s+/)
    .map(part => part.trim())
    .filter(part => part.length >= 18);
  const keywords = ["核心", "原则", "方法", "矛盾", "规律", "实践", "认识", "趋势", "风险", "系统", "投资", "交易", "价值", "价格", "市场", "周期", "战略", "战争", "哲学"];
  const picked = paragraphs
    .map(part => ({ part, score: keywords.reduce((n, key) => n + (part.includes(key) ? 1 : 0), 0) }))
    .filter(row => row.score > 0)
    .sort((a, b) => b.score - a.score || b.part.length - a.part.length)
    .slice(0, 12)
    .map(row => row.part);
  const lines = [...new Set([...paragraphs.slice(0, 10), ...picked])].slice(0, 14);
  return [
    `书名：${title || "未命名文档"}`,
    `正文长度：约 ${clean.length} 字`,
    "",
    "读书摘要：",
    ...lines.map((line, index) => `${index + 1}. ${line.slice(0, 260)}`)
  ].join("\n");
}

function shouldUseDocumentOcr(text) {
  const clean = String(text || "");
  const cjkCount = (clean.match(/[\u4e00-\u9fff]/g) || []).length;
  const latinWordCount = (clean.match(/[A-Za-z]{4,}/g) || []).length;
  const pageMarkerCount = (clean.match(/\b\d+\s+of\s+\d+\b/gi) || []).length;
  const usefulRatio = clean.length ? (cjkCount + latinWordCount * 3) / clean.length : 0;
  return clean.length < 500
    || pageMarkerCount >= 12
    || (clean.length > 1000 && usefulRatio < 0.08 && cjkCount < 200);
}

function runPdfOcrDocument(filePath, options = {}) {
  const startPage = Math.max(1, Number(options.startPage || 1));
  const maxPages = Math.max(1, Math.min(600, Number(options.maxPages || DOCUMENT_OCR_DEFAULT_PAGES)));
  return new Promise((resolve, reject) => {
    execFile("python", [
      OCR_PDF_SCRIPT,
      filePath,
      "--start-page", String(startPage),
      "--max-pages", String(maxPages)
    ], { maxBuffer: 64 * 1024 * 1024, env: { ...process.env, PYTHONIOENCODING: "utf-8" } }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || "PDF OCR failed").trim()));
        return;
      }
      try {
        const parsed = JSON.parse(stdout || "{}");
        if (!parsed.success) throw new Error(parsed.error || "PDF OCR failed");
        resolve(parsed);
      } catch (parseError) {
        reject(new Error((stderr || parseError.message || "PDF OCR output parse failed").trim()));
      }
    });
  });
}

function runInstitutionalProbe(options = {}) {
  return new Promise((resolve, reject) => {
    const args = [INSTITUTIONAL_PROBE_SCRIPT];
    if (options.connect) args.push("--connect");
    execPythonTool(args[0], args.slice(1), {
      cwd: ROOT,
      timeout: options.connect ? 120000 : 30000,
      maxBuffer: 2 * 1024 * 1024,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" }
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || "Institutional probe failed.").trim()));
        return;
      }
      try {
        resolve(JSON.parse(stdout || "{}"));
      } catch (parseError) {
        reject(new Error((stderr || parseError.message || "Institutional probe output parse failed.").trim()));
      }
    });
  });
}

async function hasInstitutionalProvider() {
  const now = Date.now();
  if (institutionalCapabilityCache.result && now - institutionalCapabilityCache.at < 120000) {
    return institutionalCapabilityCache.hasProvider;
  }
  try {
    const result = await runInstitutionalProbe({ connect: false });
    const hasProvider = (result.providers || []).some(item => item && item.importOk);
    institutionalCapabilityCache = { at: now, hasProvider, result };
    return hasProvider;
  } catch {
    institutionalCapabilityCache = { at: now, hasProvider: false, result: null };
    return false;
  }
}

function runInstitutionalData(type, keys = []) {
  return new Promise((resolve, reject) => {
    const cleanKeys = [...new Set((keys || []).map(normalizeStockBriefKey).filter(Boolean))];
    if (!cleanKeys.length) {
      resolve({ success: true, type, rows: [], attempts: [], source: "" });
      return;
    }
    execPythonTool(INSTITUTIONAL_DATA_SCRIPT, [
      "--type", type,
      "--keys", cleanKeys.join(",")
    ], {
      cwd: ROOT,
      timeout: Number(process.env.INSTITUTIONAL_TIMEOUT_MS || 120000),
      maxBuffer: 4 * 1024 * 1024,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" }
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || "Institutional data query failed.").trim()));
        return;
      }
      try {
        resolve(JSON.parse(stdout || "{}"));
      } catch (parseError) {
        reject(new Error((stderr || parseError.message || "Institutional data output parse failed.").trim()));
      }
    });
  });
}

function normalizeInstitutionalQuote(row = {}) {
  const key = normalizeStockBriefKey(row.key || row.code || row.symbol);
  if (!key) return null;
  return {
    key,
    name: row.name || key,
    symbol: row.symbol || key.replace(/^(sh|sz|bj|hk|us)/i, ""),
    price: row.price,
    change: row.change,
    pct: row.pct,
    turnoverRate: row.turnoverRate || "",
    pe: row.pe || "",
    pb: row.pb || "",
    amplitude: row.amplitude || "",
    circulatingMarketCap: row.circulatingMarketCap || "",
    marketCap: row.marketCap || "",
    updatedAt: row.updatedAt || new Date().toISOString(),
    source: row.source || "机构终端",
    provider: row.source || "机构终端"
  };
}

function yiFromInstitutional(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return value || "";
  if (Math.abs(num) >= 100000000) return `${(num / 100000000).toFixed(2)}亿`;
  if (Math.abs(num) >= 10000) return `${(num / 10000).toFixed(2)}亿`;
  return `${num.toFixed(2)}亿`;
}

function normalizeInstitutionalFinancial(row = {}) {
  const key = normalizeStockBriefKey(row.key || row.code || row.symbol);
  if (!key) return null;
  return {
    key,
    name: row.name || "",
    reportDate: String(row.reportDate || "").replace(/\s+00:00:00$/, ""),
    revenue: yiFromInstitutional(row.revenue),
    netProfit: yiFromInstitutional(row.netProfit),
    grossMargin: roundMetric(row.grossMargin),
    netMargin: roundMetric(row.netMargin),
    roe: roundMetric(row.roe),
    revenueGrowth: roundMetric(row.revenueGrowth),
    profitGrowth: roundMetric(row.profitGrowth),
    eps: roundMetric(row.eps),
    bps: roundMetric(row.bps),
    source: row.source || "机构终端",
    updatedAt: row.updatedAt || new Date().toISOString()
  };
}

async function getInstitutionalRows(type, keys = []) {
  if (!await hasInstitutionalProvider()) {
    const attempts = institutionalCapabilityCache.result && Array.isArray(institutionalCapabilityCache.result.providers)
      ? institutionalCapabilityCache.result.providers.map(item => ({ provider: item.id, ok: false, error: item.error || item.status || "SDK not importable" }))
      : [];
    return { rows: [], source: "", attempts };
  }
  try {
    const result = await runInstitutionalData(type, keys);
    const normalizer = type === "financials" ? normalizeInstitutionalFinancial : normalizeInstitutionalQuote;
    return {
      rows: (result.rows || []).map(normalizer).filter(Boolean),
      source: result.source || "",
      attempts: result.attempts || []
    };
  } catch (error) {
    return { rows: [], source: "", attempts: [{ provider: "institutional", ok: false, error: error.message }] };
  }
}

function findDocumentItem(items, payload) {
  const id = String((payload && payload.id) || "");
  const fileName = String((payload && (payload.fileName || payload.savedName)) || "");
  return items.find(item => item.id === id)
    || items.find(item => item.savedName === fileName || item.fileName === fileName)
    || null;
}

async function extractDocumentFile(payload) {
  const items = readDocumentMetadata();
  const item = findDocumentItem(items, payload || {});
  if (!item) throw new Error("没有找到这本书的导入记录。");
  const fileName = item.savedName || item.fileName || "";
  const filePath = path.join(DOCUMENTS_DIR, fileName);
  const ext = path.extname(filePath).toLowerCase();
  if (!fs.existsSync(filePath)) throw new Error("文档文件不存在，请重新导入。");

  let text = "";
  let pageCount = 0;
  let extractionMode = "text";
  let ocrInfo = null;
  if (ext === ".pdf") {
    const { PDFParse } = require("pdf-parse");
    const parser = new PDFParse({ data: fs.readFileSync(filePath) });
    try {
      const result = await parser.getText();
      text = result.text || "";
      pageCount = Number(result.total || result.pages || 0);
    } finally {
      if (parser && typeof parser.destroy === "function") await parser.destroy();
    }
    if (shouldUseDocumentOcr(text)) {
      ocrInfo = await runPdfOcrDocument(filePath, {
        startPage: payload.startPage || 1,
        maxPages: payload.maxPages || DOCUMENT_OCR_DEFAULT_PAGES
      });
      if (normalizeDocumentText(ocrInfo.text).length) {
        text = ocrInfo.text || "";
        pageCount = ocrInfo.totalPages || pageCount;
        extractionMode = "ocr";
      }
    }
  } else if (ext === ".docx") {
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ path: filePath });
    text = result.value || "";
  } else {
    throw new Error("旧版 .doc 暂不支持自动提取正文，请转成 .docx 或 PDF 后导入。");
  }

  const clean = normalizeDocumentText(text);
  if (!clean) throw new Error("没有从文档中识别到可用文字，可能是扫描版图片 PDF，需要 OCR。");
  const clipped = clean.slice(0, DOCUMENT_TEXT_LIMIT);
  const summary = makeDocumentSummary(clipped, item.title || item.originalName || fileName);
  Object.assign(item, {
    extractedText: clipped,
    extractedAt: new Date().toISOString(),
    extractedTextLength: clean.length,
    extractedTextLimit: DOCUMENT_TEXT_LIMIT,
    pageCount,
    extractionMode,
    ocrPagesRead: ocrInfo ? ocrInfo.pagesRead : 0,
    ocrStartPage: ocrInfo ? ocrInfo.startPage : 0,
    ocrEndPage: ocrInfo ? ocrInfo.endPage : 0,
    summary,
    confidence: clean.length > DOCUMENT_TEXT_LIMIT ? "已读部分" : "已读"
  });
  writeDocumentMetadata(items);
  return {
    document: documentItemForClient(item),
    text: clipped,
    textLength: clean.length,
    returnedLength: clipped.length,
    truncated: clean.length > clipped.length,
    summary,
    pageCount,
    extractionMode,
    ocr: ocrInfo ? {
      pagesRead: ocrInfo.pagesRead,
      startPage: ocrInfo.startPage,
      endPage: ocrInfo.endPage,
      totalPages: ocrInfo.totalPages
    } : null
  };
}

function splitSectorCells(value) {
  return String(value || "")
    .replace(/\r/g, "\n")
    .split(/[、,，;；\n]+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function normalizeSectorHeader(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function parseSectorMapMatrix(rows) {
  const matrix = (rows || []).map(row => Array.isArray(row) ? row.map(cell => String(cell || "").trim()) : []);
  const headerIndex = matrix.findIndex(row => row.some(cell => /板块|强弱|分类|核心|细化|上游|中游|下游/.test(String(cell || ""))));
  const header = matrix[Math.max(0, headerIndex)] || [];
  const findCol = patterns => {
    const index = header.findIndex(cell => patterns.some(pattern => pattern.test(normalizeSectorHeader(cell))));
    return index >= 0 ? index : -1;
  };
  const sectorCol = findCol([/板块/, /主题/]);
  const strengthCol = findCol([/强弱/, /强度/]);
  const categoryCol = findCol([/分类/, /细分/, /方向/]);
  const coreCol = findCol([/核心/, /标的/, /股票/]);
  const detailCol = findCol([/细化/, /备注/, /规则/]);
  const layerCol = (() => {
    const explicit = findCol([/位置/, /链条/, /产业链/, /上下游/]);
    if (explicit >= 0) return explicit;
    const used = new Set([sectorCol, strengthCol, categoryCol, coreCol, detailCol].filter(index => index >= 0));
    const candidate = header.findIndex((_, index) => !used.has(index) && index > strengthCol && index < categoryCol);
    return candidate >= 0 ? candidate : 2;
  })();
  const warnings = [];
  if (sectorCol < 0 || categoryCol < 0 || coreCol < 0) {
    warnings.push("没有完整识别到“板块 / 分类 / 核心”列，已按表格位置尽量解析。");
  }

  const groups = [];
  const groupMap = new Map();
  let currentSector = "";
  let currentStrength = "";
  let currentLayer = "";
  const dataRows = matrix.slice(headerIndex >= 0 ? headerIndex + 1 : 0);
  dataRows.forEach(row => {
    const sector = row[sectorCol >= 0 ? sectorCol : 0] || "";
    const strength = row[strengthCol >= 0 ? strengthCol : 1] || "";
    const layer = row[layerCol >= 0 ? layerCol : 2] || "";
    const category = row[categoryCol >= 0 ? categoryCol : 3] || "";
    const core = row[coreCol >= 0 ? coreCol : 4] || "";
    const detail = row[detailCol >= 0 ? detailCol : 5] || "";
    if (sector) currentSector = sector;
    if (strength) currentStrength = strength;
    if (layer) currentLayer = layer;
    if (!currentSector || (!category && !core)) return;
    const sectorName = currentSector;
    if (!groupMap.has(sectorName)) {
      const group = { name: sectorName, strength: currentStrength, items: [], children: [] };
      groupMap.set(sectorName, group);
      groups.push(group);
    }
    const top = groupMap.get(sectorName);
    top.strength = currentStrength || top.strength || "";
    const layerName = currentLayer || "未分层";
    let layerGroup = top.children.find(item => item.name === layerName);
    if (!layerGroup) {
      layerGroup = { name: layerName, items: [], children: [] };
      top.children.push(layerGroup);
    }
    const categoryName = category || "未分类";
    let categoryGroup = layerGroup.children.find(item => item.name === categoryName);
    if (!categoryGroup) {
      categoryGroup = { name: categoryName, items: [], children: [] };
      layerGroup.children.push(categoryGroup);
    }
    const stocks = splitSectorCells(core);
    stocks.forEach(name => {
      if (categoryGroup.items.some(item => item.name === name)) return;
      categoryGroup.items.push({
        name,
        sector: categoryName,
        desc: [sectorName, layerName, categoryName, detail].filter(Boolean).join(" / "),
        status: "ok"
      });
    });
  });

  return {
    groups,
    warnings,
    stats: {
      sectors: groups.length,
      branches: groups.reduce((sum, group) => sum + (group.children || []).length, 0),
      categories: groups.reduce((sum, group) => sum + (group.children || []).reduce((n, child) => n + (child.children || []).length, 0), 0),
      stocks: groups.reduce((sum, group) => sum + countParsedSectorItems(group), 0)
    }
  };
}

function countParsedSectorItems(group) {
  return (group.items || []).length + (group.children || []).reduce((sum, child) => sum + countParsedSectorItems(child), 0);
}

function textToSectorMatrix(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map(line => line.split(/\t| {2,}|\|/).map(cell => cell.trim()))
    .filter(row => row.some(Boolean));
}

async function parseSectorMapPayload(payload) {
  const originalName = sanitizeFilename(payload.filename || payload.name || "sector-map.txt");
  const ext = path.extname(originalName).toLowerCase();
  const raw = String(payload.dataBase64 || "").replace(/^data:[^,]+,/, "");
  const buffer = raw ? Buffer.from(raw, "base64") : Buffer.from(String(payload.text || ""), "utf8");
  let matrix = [];
  let text = String(payload.text || "");
  const warnings = [];

  if ([".xlsx", ".xls", ".csv"].includes(ext)) {
    const XLSX = require("xlsx");
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const firstSheet = workbook.SheetNames[0];
    if (!firstSheet) throw new Error("Excel里没有可读取的工作表。");
    matrix = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1, defval: "" });
  } else if (ext === ".pdf") {
    const { PDFParse } = require("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      text = result.text || "";
    } finally {
      if (parser && typeof parser.destroy === "function") await parser.destroy();
    }
    if (!normalizeDocumentText(text)) warnings.push("PDF文字层较少，可能是扫描图。请先在书籍页OCR，或导入Excel版产业链表。");
    matrix = textToSectorMatrix(text);
  } else if (IMAGE_EXTS.includes(ext)) {
    warnings.push("图片OCR入口已预留；当前请优先导入Excel/CSV/PDF文字版，或把OCR后的文字粘贴到文本框。");
    matrix = textToSectorMatrix(text);
  } else {
    text = text || buffer.toString("utf8");
    matrix = textToSectorMatrix(text);
  }

  const parsed = parseSectorMapMatrix(matrix);
  return {
    success: true,
    filename: originalName,
    rows: matrix.length,
    groups: parsed.groups,
    stats: parsed.stats,
    warnings: [...warnings, ...parsed.warnings].filter(Boolean)
  };
}

function readOcrTitleCache() {
  try {
    if (!fs.existsSync(OCR_TITLE_CACHE_FILE)) return {};
    const data = JSON.parse(fs.readFileSync(OCR_TITLE_CACHE_FILE, "utf8"));
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function writeOcrTitleCache(data) {
  fs.writeFileSync(OCR_TITLE_CACHE_FILE, JSON.stringify(data, null, 2), "utf8");
}

async function getMarketIndexes() {
  const now = Date.now();
  if (marketIndexCache.data.length && now - marketIndexCache.at < 30 * 1000) {
    return marketIndexCache.data;
  }
  const indexes = [
    { key: "sh000001", name: "\u4e0a\u8bc1\u6307\u6570", symbol: "000001", market: "SH" },
    { key: "sz399001", name: "\u6df1\u8bc1\u6210\u6307", symbol: "399001", market: "SZ" },
    { key: "sz399006", name: "\u521b\u4e1a\u677f\u6307", symbol: "399006", market: "SZ" },
    { key: "sh000688", name: "\u79d1\u521b50", symbol: "000688", market: "SH" },
    { key: "sh000300", name: "\u6caa\u6df1300", symbol: "000300", market: "SH" }
  ];
  const url = "https://qt.gtimg.cn/q=" + indexes.map(item => "s_" + item.key).join(",");
  const response = await fetch(url, {
    headers: {
      "Referer": "https://gu.qq.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const text = decodeTencentQuote(buffer);
  const rows = [];
  const regex = /v_s_(sh|sz)(\d+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text))) {
    const key = match[1] + match[2];
    const meta = indexes.find(item => item.key === key);
    if (!meta) continue;
    const parts = match[3].split("~");
    rows.push({
      ...meta,
      price: Number(parts[3] || 0),
      change: Number(parts[4] || 0),
      pct: Number(parts[5] || 0),
      updatedAt: new Date().toISOString(),
      source: "\u817e\u8baf\u884c\u60c5"
    });
  }
  marketIndexCache = { at: now, data: rows };
  return rows;
}

async function getMarketQuotes(keys) {
  const cleanKeys = [...new Set((keys || []).map(key => String(key || "").trim()).filter(Boolean))];
  if (!cleanKeys.length) return [];
  const query = cleanKeys.map(key => key.startsWith("s_") ? key : key).join(",");
  const url = "https://qt.gtimg.cn/q=" + query;
  const response = await fetch(url, {
    headers: {
      "Referer": "https://gu.qq.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const text = decodeTencentQuote(buffer);
  const rows = [];
  const regex = /v_([a-zA-Z0-9_]+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text))) {
    const key = match[1];
    const parts = match[2].split("~");
    if (parts.length < 6) continue;
    const isSimpleIndex = key.startsWith("s_");
    rows.push({
      key,
      name: parts[1] || key,
      symbol: parts[2] || key,
      price: Number(parts[3] || 0),
      change: Number(parts[isSimpleIndex ? 4 : 31] || 0),
      pct: Number(parts[isSimpleIndex ? 5 : 32] || 0),
      turnoverRate: Number(parts[38] || 0),
      pe: Number(parts[39] || 0) || "",
      amplitude: Number(parts[43] || 0),
      circulatingMarketCap: Number(parts[44] || 0) || "",
      marketCap: Number(parts[45] || 0) || "",
      pb: Number(parts[46] || 0) || "",
      updatedAt: new Date().toISOString(),
      source: "\u817e\u8baf\u884c\u60c5"
    });
  }
  return rows;
}

async function getMarketQuotesWithInstitutional(keys) {
  const cleanKeys = [...new Set((keys || []).map(normalizeStockBriefKey).filter(Boolean))];
  if (!cleanKeys.length) return [];
  const institutional = await getInstitutionalRows("quotes", cleanKeys);
  const institutionalRows = institutional.rows || [];
  const institutionalMap = new Map(institutionalRows.map(item => [item.key, item]));
  const missingKeys = cleanKeys.filter(key => !institutionalMap.has(key));
  let fallbackRows = [];
  if (missingKeys.length) {
    try {
      fallbackRows = await getMarketQuotes(missingKeys);
    } catch {
      fallbackRows = [];
    }
  }
  const fallbackMap = new Map(fallbackRows.map(item => [normalizeStockBriefKey(item.key), item]));
  return cleanKeys.map(key => {
    const institutionalRow = institutionalMap.get(key);
    if (institutionalRow) {
      const fallback = fallbackMap.get(key) || {};
      return {
        ...fallback,
        ...institutionalRow,
        quoteSource: institutionalRow.source || "机构终端",
        fallbackQuoteSource: fallback.source || ""
      };
    }
    const fallback = fallbackMap.get(key);
    return fallback ? { ...fallback, quoteSource: fallback.source || "腾讯行情" } : null;
  }).filter(Boolean);
}

function normalizeStockBriefKey(key) {
  const raw = String(key || "").trim();
  if (!raw) return "";
  if (/^(sh|sz|bj|hk|us|s_)/i.test(raw)) return raw;
  if (/^6\d{5}$/.test(raw) || /^9\d{5}$/.test(raw)) return "sh" + raw;
  if (/^[03]\d{5}$/.test(raw)) return "sz" + raw;
  if (/^8\d{5}$/.test(raw)) return "bj" + raw;
  return raw;
}

function qmtCodeFromQuoteKey(key) {
  const raw = String(key || "").trim();
  if (!raw) return "";
  const qmtMatch = raw.match(/^(\d{6})\.(SH|SZ|BJ)$/i);
  if (qmtMatch) return `${qmtMatch[1]}.${qmtMatch[2].toUpperCase()}`;
  let match = raw.match(/^s_?(sh|sz|bj)(\d{6})$/i);
  if (!match) match = normalizeStockBriefKey(raw).match(/^(sh|sz|bj)(\d{6})$/i);
  if (!match) return "";
  return `${match[2]}.${match[1].toUpperCase()}`;
}

function readQmtBridgeCodes() {
  try {
    if (!fs.existsSync(QMT_BRIDGE_CODES_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(QMT_BRIDGE_CODES_FILE, "utf8"));
    const rows = Array.isArray(data) ? data : (Array.isArray(data.codes) ? data.codes : []);
    return [...new Set(rows.map(qmtCodeFromQuoteKey).filter(Boolean))];
  } catch {
    return [];
  }
}

function writeQmtBridgeCodes(items = []) {
  const profileCodes = (readStockProfiles().items || []).map(item => item.key || item.quoteKey || item.code || "");
  const inputCodes = (items || []).flatMap(item => {
    if (typeof item === "string") return [item];
    if (!item || typeof item !== "object") return [];
    return [item.quoteKey, item.key, item.code, item.symbol].filter(Boolean);
  });
  const codes = [...new Set([...inputCodes, ...profileCodes].map(qmtCodeFromQuoteKey).filter(Boolean))];
  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    codes
  };
  fs.writeFileSync(QMT_BRIDGE_CODES_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function readQmtBridgeStatus() {
  const codes = readQmtBridgeCodes();
  const strategyInstalled = fs.existsSync(QMT_BRIDGE_QMT_STRATEGY_FILE);
  const hasQuotes = fs.existsSync(QMT_BRIDGE_QUOTES_FILE);
  let quotePayload = null;
  let quoteCount = 0;
  let updatedAt = "";
  let ageSeconds = null;
  let error = "";
  if (hasQuotes) {
    try {
      quotePayload = JSON.parse(fs.readFileSync(QMT_BRIDGE_QUOTES_FILE, "utf8"));
      const quotes = quotePayload && typeof quotePayload.quotes === "object" ? quotePayload.quotes : {};
      quoteCount = Object.keys(quotes || {}).length;
      updatedAt = quotePayload.updatedAt || "";
      const mtime = fs.statSync(QMT_BRIDGE_QUOTES_FILE).mtimeMs;
      ageSeconds = Math.max(0, Math.round((Date.now() - mtime) / 1000));
    } catch (exc) {
      error = exc.message || String(exc);
    }
  }
  return {
    success: true,
    codes,
    codeCount: codes.length,
    codesFile: QMT_BRIDGE_CODES_FILE,
    quotesFile: QMT_BRIDGE_QUOTES_FILE,
    strategySourceFile: QMT_BRIDGE_STRATEGY_FILE,
    qmtStrategyFile: QMT_BRIDGE_QMT_STRATEGY_FILE,
    strategyInstalled,
    hasQuotes,
    quoteCount,
    updatedAt,
    ageSeconds,
    stale: !hasQuotes || ageSeconds == null || ageSeconds > 30,
    error
  };
}

function eastmoneyRowToQuoteKey(row = {}) {
  const code = String(row.Code || row.UnifiedCode || "").trim();
  if (!/^\d{6}$/.test(code)) return "";
  const marketText = String(row.SecurityTypeName || row.MarketType || row.QuoteID || "");
  const quoteId = String(row.QuoteID || "");
  if (/^(8|4)\d{5}$/.test(code) || /北|京|BJ/i.test(marketText)) return "bj" + code;
  if (/^6\d{5}$/.test(code) || quoteId.startsWith("1.")) return "sh" + code;
  return "sz" + code;
}

async function searchEastmoneyStocks(query, limit = 6) {
  const q = String(query || "").trim();
  if (!q) return [];
  const url = `https://searchapi.eastmoney.com/api/suggest/get?input=${encodeURIComponent(q)}&type=14&token=44c9d251add88e27b65ed86506f6e5da`;
  const response = await fetch(url, {
    headers: {
      Referer: "https://www.eastmoney.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await response.json().catch(() => ({}));
  const rows = data && data.QuotationCodeTable && Array.isArray(data.QuotationCodeTable.Data)
    ? data.QuotationCodeTable.Data
    : [];
  return rows
    .filter(row => row && row.Classify === "AStock")
    .map(row => ({
      key: eastmoneyRowToQuoteKey(row),
      code: String(row.Code || row.UnifiedCode || ""),
      name: String(row.Name || ""),
      pinyin: String(row.PinYin || ""),
      market: String(row.SecurityTypeName || ""),
      quoteId: String(row.QuoteID || ""),
      source: "东方财富搜索"
    }))
    .filter(item => item.key && item.name)
    .slice(0, Math.max(1, Number(limit) || 6));
}

async function resolveStockBriefKeys(keys = []) {
  const resolved = [];
  const seen = new Set();
  for (const raw of keys || []) {
    const normalized = normalizeStockBriefKey(raw);
    if (!normalized) continue;
    const looksLikeQuoteKey = /^(sh|sz|bj)\d{6}$/i.test(normalized);
    if (looksLikeQuoteKey) {
      if (!seen.has(normalized)) {
        resolved.push({ original: raw, key: normalized, source: "输入代码" });
        seen.add(normalized);
      }
      continue;
    }
    try {
      const hits = await searchEastmoneyStocks(normalized, 1);
      const hit = hits[0];
      if (hit && !seen.has(hit.key)) {
        resolved.push({ original: raw, key: hit.key, name: hit.name, market: hit.market, source: hit.source });
        seen.add(hit.key);
        continue;
      }
    } catch {
      // Keep the original token below so local profiles can still match.
    }
    if (!seen.has(normalized)) {
      resolved.push({ original: raw, key: normalized, source: "原始输入" });
      seen.add(normalized);
    }
  }
  return resolved;
}

function emptyStockProfiles() {
  return { version: 1, updatedAt: new Date().toISOString(), items: [] };
}

function readStockProfiles() {
  try {
    if (!fs.existsSync(STOCK_PROFILE_FILE)) return emptyStockProfiles();
    const data = JSON.parse(fs.readFileSync(STOCK_PROFILE_FILE, "utf8"));
    return {
      version: data.version || 1,
      updatedAt: data.updatedAt || "",
      items: Array.isArray(data.items) ? data.items : []
    };
  } catch {
    return emptyStockProfiles();
  }
}

function writeStockProfiles(data) {
  const payload = {
    version: data.version || 1,
    updatedAt: new Date().toISOString(),
    items: Array.isArray(data.items) ? data.items : []
  };
  fs.writeFileSync(STOCK_PROFILE_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function numberOrBlank(value) {
  const text = String(value == null ? "" : value).trim();
  if (!text) return "";
  const num = Number(text.replace(/[,，%]/g, ""));
  return Number.isFinite(num) ? num : text;
}

function normalizeStockProfilePayload(payload = {}) {
  const key = normalizeStockBriefKey(payload.key || payload.quoteKey || payload.code || payload.symbol || payload.name);
  if (!key) throw new Error("缺少股票代码或标的名称。");
  return {
    key,
    name: String(payload.name || "").trim(),
    sector: String(payload.sector || "").trim(),
    pe: numberOrBlank(payload.pe),
    pb: numberOrBlank(payload.pb),
    marketCap: String(payload.marketCap || "").trim(),
    grossMargin: numberOrBlank(payload.grossMargin),
    revenueGrowth: numberOrBlank(payload.revenueGrowth),
    profitGrowth: numberOrBlank(payload.profitGrowth),
    dataSource: String(payload.dataSource || "手动录入").trim(),
    note: String(payload.note || "").trim(),
    updatedAt: new Date().toISOString()
  };
}

function upsertStockProfile(payload = {}) {
  const profile = normalizeStockProfilePayload(payload);
  const data = readStockProfiles();
  const idx = data.items.findIndex(item => item.key === profile.key);
  if (idx >= 0) data.items[idx] = { ...data.items[idx], ...profile };
  else data.items.unshift(profile);
  return writeStockProfiles(data);
}

function stockProfileMap() {
  return new Map(readStockProfiles().items.map(item => [normalizeStockBriefKey(item.key), item]));
}

function stockKeyToEastmoneySecucode(key) {
  const clean = normalizeStockBriefKey(key);
  const match = clean.match(/^(sh|sz|bj)(\d{6})$/i);
  if (!match) return "";
  const suffix = match[1].toLowerCase() === "sh" ? "SH" : match[1].toLowerCase() === "bj" ? "BJ" : "SZ";
  return `${match[2]}.${suffix}`;
}

function stockKeyToEastmoneySecid(key) {
  const clean = normalizeStockBriefKey(key);
  const match = clean.match(/^(sh|sz|bj)(\d{6})$/i);
  if (!match) return "";
  const market = match[1].toLowerCase() === "sh" ? "1" : "0";
  return `${market}.${match[2]}`;
}

function roundMetric(value, digits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return Number(num.toFixed(digits));
}

function movingAverage(values = [], index, window) {
  const size = Number(window || 0);
  if (!size || index + 1 < size) return null;
  let sum = 0;
  for (let i = index - size + 1; i <= index; i += 1) {
    const value = Number(values[i]);
    if (!Number.isFinite(value)) return null;
    sum += value;
  }
  return sum / size;
}

function maxPrevious(rows = [], index, window, field) {
  const start = Math.max(0, index - window);
  if (index - start < window) return null;
  const vals = rows.slice(start, index).map(row => Number(row[field])).filter(Number.isFinite);
  return vals.length ? Math.max(...vals) : null;
}

function minPrevious(rows = [], index, window, field) {
  const start = Math.max(0, index - window);
  if (index - start < window) return null;
  const vals = rows.slice(start, index).map(row => Number(row[field])).filter(Number.isFinite);
  return vals.length ? Math.min(...vals) : null;
}

function maxDrawdownFromEquity(equity = []) {
  let peak = 1;
  let maxDd = 0;
  equity.forEach(point => {
    const value = Number(point.value || 0);
    if (value > peak) peak = value;
    if (peak > 0) maxDd = Math.min(maxDd, (value - peak) / peak);
  });
  return maxDd * 100;
}

function annualizedReturn(totalReturnPct, days) {
  const dayCount = Math.max(1, Number(days || 1));
  const total = 1 + Number(totalReturnPct || 0) / 100;
  if (total <= 0) return -100;
  return (Math.pow(total, 252 / dayCount) - 1) * 100;
}

function mean(values = []) {
  const rows = values.filter(Number.isFinite);
  return rows.length ? rows.reduce((sum, value) => sum + value, 0) / rows.length : 0;
}

function standardDeviation(values = []) {
  const rows = values.filter(Number.isFinite);
  if (rows.length < 2) return 0;
  const avg = mean(rows);
  const variance = rows.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / (rows.length - 1);
  return Math.sqrt(variance);
}

function tradingDayDistance(dateIndex, startDate, endDate) {
  const start = dateIndex.get(startDate);
  const end = dateIndex.get(endDate);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return Math.max(1, end - start + 1);
}

async function getEastmoneyKline(key, options = {}) {
  const secid = stockKeyToEastmoneySecid(key);
  if (!secid) throw new Error("无法识别股票代码。");
  const end = String(options.end || "20500101").replace(/[^\d]/g, "") || "20500101";
  const days = Math.max(60, Math.min(1200, Number(options.days || 360)));
  const begYear = new Date().getFullYear() - Math.ceil(days / 220) - 1;
  const beg = String(options.beg || `${begYear}0101`).replace(/[^\d]/g, "");
  const params = new URLSearchParams({
    secid,
    fields1: "f1,f2,f3,f4,f5,f6",
    fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61",
    klt: "101",
    fqt: String(options.fqt || 1),
    beg,
    end
  });
  const response = await fetch(`https://push2his.eastmoney.com/api/qt/stock/kline/get?${params.toString()}`, {
    headers: {
      Referer: "https://quote.eastmoney.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await response.json().catch(() => ({}));
  const rows = data && data.data && Array.isArray(data.data.klines) ? data.data.klines : [];
  return rows.map(line => {
    const parts = String(line || "").split(",");
    return {
      date: parts[0],
      open: Number(parts[1]),
      close: Number(parts[2]),
      high: Number(parts[3]),
      low: Number(parts[4]),
      volume: Number(parts[5]),
      amount: Number(parts[6]),
      amplitude: Number(parts[7]),
      pct: Number(parts[8]),
      change: Number(parts[9]),
      turnoverRate: Number(parts[10])
    };
  }).filter(row => row.date && Number.isFinite(row.close)).slice(-days);
}

async function getTencentKline(key, options = {}) {
  const clean = normalizeStockBriefKey(key);
  const match = clean.match(/^(sh|sz)(\d{6})$/i);
  if (!match) throw new Error("腾讯日线暂只支持沪深股票代码。");
  const symbol = match[1].toLowerCase() + match[2];
  const days = Math.max(60, Math.min(1200, Number(options.days || 360)));
  const fq = Number(options.fqt || 1) === 0 ? "" : "qfq";
  const response = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${symbol},day,,,${days},${fq}`, {
    headers: {
      Referer: "https://gu.qq.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await response.json().catch(() => ({}));
  const box = data && data.data && data.data[symbol] ? data.data[symbol] : {};
  const rows = box.qfqday || box.day || [];
  return rows.map(parts => ({
    date: parts[0],
    open: Number(parts[1]),
    close: Number(parts[2]),
    high: Number(parts[3]),
    low: Number(parts[4]),
    volume: Number(parts[5]),
    amount: "",
    amplitude: "",
    pct: "",
    change: "",
    turnoverRate: ""
  })).filter(row => row.date && Number.isFinite(row.close)).slice(-days);
}

async function getHistoricalKline(key, options = {}) {
  try {
    const rows = await getEastmoneyKline(key, options);
    if (rows.length) return { rows, source: "东方财富历史日线" };
  } catch {}
  const rows = await getTencentKline(key, options);
  return { rows, source: "腾讯复权日线" };
}

function backtestSignal(rows, index, options = {}) {
  const strategy = options.strategy || "ma_cross";
  const closes = rows.map(row => row.close);
  const shortWindow = Math.max(2, Number(options.short || 5));
  const longWindow = Math.max(shortWindow + 1, Number(options.long || 20));
  if (strategy === "breakout") {
    const lookback = Math.max(5, Number(options.lookback || 20));
    const high = maxPrevious(rows, index, lookback, "high");
    const low = minPrevious(rows, index, lookback, "low");
    if (high !== null && rows[index].close > high) return "buy";
    if (low !== null && rows[index].close < low) return "sell";
    return "hold";
  }
  const shortNow = movingAverage(closes, index, shortWindow);
  const longNow = movingAverage(closes, index, longWindow);
  const shortPrev = movingAverage(closes, index - 1, shortWindow);
  const longPrev = movingAverage(closes, index - 1, longWindow);
  if ([shortNow, longNow, shortPrev, longPrev].some(value => value === null)) return "hold";
  if (shortPrev <= longPrev && shortNow > longNow) return "buy";
  if (shortPrev >= longPrev && shortNow < longNow) return "sell";
  return "hold";
}

function calculateBacktestDiagnostics(rows = [], equity = [], trades = [], options = {}) {
  const dateIndex = new Map(rows.map((row, index) => [row.date, index]));
  const dailyReturns = [];
  for (let i = 1; i < equity.length; i += 1) {
    const prev = Number(equity[i - 1].value);
    const now = Number(equity[i].value);
    if (Number.isFinite(prev) && prev > 0 && Number.isFinite(now)) {
      dailyReturns.push(now / prev - 1);
    }
  }
  const negativeReturns = dailyReturns.filter(value => value < 0);
  const dailyAvg = mean(dailyReturns);
  const dailyVol = standardDeviation(dailyReturns);
  const downsideVol = standardDeviation(negativeReturns);
  const annualVolatility = dailyVol * Math.sqrt(252) * 100;
  const sharpe = dailyVol ? (dailyAvg / dailyVol) * Math.sqrt(252) : 0;
  const sortino = downsideVol ? (dailyAvg / downsideVol) * Math.sqrt(252) : 0;
  const exits = trades.filter(item => ["sell", "stop", "close"].includes(item.side));
  const wins = exits.filter(item => Number(item.pnlPct) > 0);
  const losses = exits.filter(item => Number(item.pnlPct) <= 0);
  const grossProfit = wins.reduce((sum, item) => sum + Number(item.pnlPct || 0), 0);
  const grossLoss = Math.abs(losses.reduce((sum, item) => sum + Number(item.pnlPct || 0), 0));
  const holdDays = exits.map(item => tradingDayDistance(dateIndex, item.entryDate, item.date)).filter(Boolean);
  const exposureDays = equity.filter(item => Number(item.position || 0) > 0).length;
  let consecutiveLoss = 0;
  let maxConsecutiveLosses = 0;
  exits.forEach(item => {
    if (Number(item.pnlPct || 0) <= 0) {
      consecutiveLoss += 1;
      maxConsecutiveLosses = Math.max(maxConsecutiveLosses, consecutiveLoss);
    } else {
      consecutiveLoss = 0;
    }
  });
  const bestTrade = exits.reduce((best, item) => Number(item.pnlPct || -Infinity) > Number(best.pnlPct || -Infinity) ? item : best, {});
  const worstTrade = exits.reduce((worst, item) => Number(item.pnlPct || Infinity) < Number(worst.pnlPct || Infinity) ? item : worst, {});
  const maxDrawdown = maxDrawdownFromEquity(equity);
  const totalReturn = equity.length ? (Number(equity[equity.length - 1].value || 1) - 1) * 100 : 0;
  return {
    maxDrawdown: roundMetric(maxDrawdown),
    annualVolatility: roundMetric(annualVolatility),
    sharpe: roundMetric(sharpe),
    sortino: roundMetric(sortino),
    calmar: maxDrawdown < 0 ? roundMetric(annualizedReturn(totalReturn, rows.length) / Math.abs(maxDrawdown)) : 0,
    exposurePct: equity.length ? roundMetric(exposureDays / equity.length * 100) : 0,
    avgWin: wins.length ? roundMetric(mean(wins.map(item => Number(item.pnlPct)))) : 0,
    avgLoss: losses.length ? roundMetric(mean(losses.map(item => Number(item.pnlPct)))) : 0,
    payoffRatio: losses.length && mean(losses.map(item => Math.abs(Number(item.pnlPct)))) ? roundMetric(mean(wins.map(item => Number(item.pnlPct))) / mean(losses.map(item => Math.abs(Number(item.pnlPct))))) : 0,
    profitFactor: grossLoss ? roundMetric(grossProfit / grossLoss) : (grossProfit ? 99 : 0),
    avgHoldDays: holdDays.length ? roundMetric(mean(holdDays), 1) : 0,
    bestTradePct: bestTrade.pnlPct !== undefined ? roundMetric(bestTrade.pnlPct) : 0,
    worstTradePct: worstTrade.pnlPct !== undefined ? roundMetric(worstTrade.pnlPct) : 0,
    stopCount: exits.filter(item => item.side === "stop").length,
    maxConsecutiveLosses,
    sampleDays: rows.length
  };
}

function runBacktestOnKlines(rows = [], options = {}) {
  const feeRate = Math.max(0, Number(options.fee || 0.0005));
  const stopLossPct = Math.max(0, Number(options.stopLoss || 8));
  let cash = 1;
  let shares = 0;
  let entryPrice = 0;
  let entryDate = "";
  const trades = [];
  const equity = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const price = Number(row.close);
    if (!Number.isFinite(price) || price <= 0) continue;
    const valueBefore = cash + shares * price;
    let signal = backtestSignal(rows, i, options);
    if (shares > 0 && stopLossPct > 0 && entryPrice > 0 && ((price - entryPrice) / entryPrice) * 100 <= -stopLossPct) {
      signal = "stop";
    }
    if (signal === "buy" && shares <= 0 && cash > 0) {
      shares = (cash * (1 - feeRate)) / price;
      cash = 0;
      entryPrice = price;
      entryDate = row.date;
      trades.push({ side: "buy", date: row.date, price });
    } else if ((signal === "sell" || signal === "stop") && shares > 0) {
      cash = shares * price * (1 - feeRate);
      const pnlPct = entryPrice > 0 ? ((price - entryPrice) / entryPrice) * 100 - feeRate * 200 : 0;
      shares = 0;
      trades.push({ side: signal === "stop" ? "stop" : "sell", date: row.date, price, entryDate, pnlPct: roundMetric(pnlPct) });
      entryPrice = 0;
      entryDate = "";
    }
    const value = cash + shares * price;
    equity.push({ date: row.date, value, signal, price, valueBefore, position: shares > 0 ? 1 : 0 });
  }
  const last = rows[rows.length - 1];
  if (last && shares > 0) {
    const price = Number(last.close);
    cash = shares * price * (1 - feeRate);
    const pnlPct = entryPrice > 0 ? ((price - entryPrice) / entryPrice) * 100 - feeRate * 200 : 0;
    trades.push({ side: "close", date: last.date, price, entryDate, pnlPct: roundMetric(pnlPct) });
    shares = 0;
    if (equity.length) equity[equity.length - 1].value = cash;
  }
  const startPrice = rows[0] ? rows[0].close : 0;
  const endPrice = rows[rows.length - 1] ? rows[rows.length - 1].close : 0;
  const totalReturn = (cash - 1) * 100;
  const buyHoldReturn = startPrice ? ((endPrice - startPrice) / startPrice) * 100 : 0;
  const exits = trades.filter(item => ["sell", "stop", "close"].includes(item.side));
  const wins = exits.filter(item => Number(item.pnlPct) > 0).length;
  const lastSignal = equity.length ? equity[equity.length - 1].signal : "hold";
  const diagnostics = calculateBacktestDiagnostics(rows, equity, trades, options);
  const benchmarkEquity = rows.map(row => ({
    date: row.date,
    value: startPrice ? row.close / startPrice : 1
  })).slice(-120);
  return {
    totalReturn: roundMetric(totalReturn),
    annualizedReturn: roundMetric(annualizedReturn(totalReturn, rows.length)),
    buyHoldReturn: roundMetric(buyHoldReturn),
    excessReturn: roundMetric(totalReturn - buyHoldReturn),
    maxDrawdown: roundMetric(diagnostics.maxDrawdown ?? maxDrawdownFromEquity(equity)),
    tradeCount: exits.length,
    winRate: exits.length ? roundMetric(wins / exits.length * 100) : 0,
    ...diagnostics,
    lastSignal,
    startDate: rows[0] ? rows[0].date : "",
    endDate: rows[rows.length - 1] ? rows[rows.length - 1].date : "",
    equity: equity.slice(-120),
    benchmarkEquity,
    trades: trades.slice(-20)
  };
}

async function runStockBacktest(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const items = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      const result = runBacktestOnKlines(rows, options);
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        strategy: options.strategy || "ma_cross",
        params: {
          short: Number(options.short || 5),
          long: Number(options.long || 20),
          lookback: Number(options.lookback || 20),
          stopLoss: Number(options.stopLoss || 8),
          fee: Number(options.fee || 0.0005),
          days: Number(options.days || 360)
        },
        source: history.source || "历史日线",
        ...result
      });
    } catch (error) {
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        strategy: options.strategy || "ma_cross",
        source: "历史日线",
        error: error.message || "回测失败"
      });
    }
  }
  return {
    success: true,
    source: [...new Set(items.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    items,
    generatedAt: new Date().toISOString(),
    note: "轻量回测仅用于复盘假设验证，不考虑停牌、滑点、涨跌停无法成交、分红送转等完整交易细节。"
  };
}

function predictionFeatures(rows = [], index, options = {}) {
  const closes = rows.map(row => Number(row.close));
  const close = closes[index];
  if (!Number.isFinite(close) || close <= 0) return null;
  const ma5 = movingAverage(closes, index, 5);
  const ma20 = movingAverage(closes, index, 20);
  const ma60 = movingAverage(closes, index, 60);
  const prev20 = closes[index - 20];
  const prev60 = closes[index - 60];
  if (![ma5, ma20, ma60, prev20, prev60].every(value => Number.isFinite(value) && value > 0)) return null;
  const dailyReturns = [];
  for (let i = Math.max(1, index - 20); i <= index; i += 1) {
    const prev = closes[i - 1];
    const now = closes[i];
    if (Number.isFinite(prev) && prev > 0 && Number.isFinite(now)) dailyReturns.push(now / prev - 1);
  }
  const high20 = maxPrevious(rows, index, 20, "high");
  const low20 = minPrevious(rows, index, 20, "low");
  const prev3 = closes[index - 3];
  const prev5 = closes[index - 5];
  const prev10 = closes[index - 10];
  const high5 = maxPrevious(rows, index, 5, "high");
  const low5 = minPrevious(rows, index, 5, "low");
  const high10 = maxPrevious(rows, index, 10, "high");
  const momentum20 = (close / prev20 - 1) * 100;
  const momentum60 = (close / prev60 - 1) * 100;
  const momentum3 = Number.isFinite(prev3) && prev3 > 0 ? (close / prev3 - 1) * 100 : 0;
  const momentum5 = Number.isFinite(prev5) && prev5 > 0 ? (close / prev5 - 1) * 100 : 0;
  const momentum10 = Number.isFinite(prev10) && prev10 > 0 ? (close / prev10 - 1) * 100 : 0;
  const maSpread = (ma5 / ma20 - 1) * 100;
  const trendSpread = (ma20 / ma60 - 1) * 100;
  const volatility20 = standardDeviation(dailyReturns) * Math.sqrt(252) * 100;
  const drawdown20 = high20 ? (close / high20 - 1) * 100 : 0;
  const rebound20 = low20 ? (close / low20 - 1) * 100 : 0;
  return {
    close,
    momentum3: roundMetric(momentum3),
    momentum5: roundMetric(momentum5),
    momentum10: roundMetric(momentum10),
    momentum20: roundMetric(momentum20),
    momentum60: roundMetric(momentum60),
    maSpread: roundMetric(maSpread),
    trendSpread: roundMetric(trendSpread),
    volatility20: roundMetric(volatility20),
    drawdown20: roundMetric(drawdown20),
    rebound20: roundMetric(rebound20),
    breakout5: high5 ? close >= high5 : false,
    breakdown5: low5 ? close <= low5 : false,
    breakout10: high10 ? close >= high10 : false,
    breakout20: high20 ? close >= high20 : false
  };
}

function predictionSignalFromFeatures(features = {}, options = {}) {
  const horizon = Math.max(3, Math.min(60, Number(options.horizon || 10)));
  const profile = horizon <= 3
    ? { m3: 1.7, m5: 1.1, m10: 0.25, m20: 0.08, m60: 0.02, ma: 0.75, trend: 0.2, breakout: 5, risk: 0.8, up: 60, down: 40 }
    : horizon <= 5
      ? { m3: 1.1, m5: 1.15, m10: 0.45, m20: 0.18, m60: 0.05, ma: 0.9, trend: 0.35, breakout: 6, risk: 0.85, up: 59, down: 41 }
      : horizon <= 10
        ? { m3: 0.25, m5: 0.45, m10: 0.75, m20: 0.45, m60: 0.18, ma: 1.1, trend: 0.75, breakout: 7, risk: 1, up: 58, down: 42 }
        : { m3: -0.15, m5: 0.1, m10: 0.35, m20: 0.65, m60: 0.32, ma: 0.9, trend: 1.05, breakout: 8, risk: 1.1, up: 57, down: 43 };
  const score = 50
    + Math.max(-12, Math.min(12, Number(features.momentum3 || 0) * profile.m3))
    + Math.max(-14, Math.min(14, Number(features.momentum5 || 0) * profile.m5))
    + Math.max(-14, Math.min(14, Number(features.momentum10 || 0) * profile.m10))
    + Math.max(-18, Math.min(18, Number(features.momentum20 || 0) * profile.m20))
    + Math.max(-14, Math.min(14, Number(features.momentum60 || 0) * profile.m60))
    + Math.max(-12, Math.min(12, Number(features.maSpread || 0) * profile.ma))
    + Math.max(-10, Math.min(10, Number(features.trendSpread || 0) * profile.trend))
    + (horizon <= 5 && features.breakout5 ? profile.breakout : 0)
    + (horizon > 5 && horizon <= 10 && features.breakout10 ? profile.breakout : 0)
    + (horizon > 10 && features.breakout20 ? profile.breakout : 0)
    - Math.max(0, Math.min(14, (Number(features.volatility20 || 0) - (horizon <= 5 ? 50 : 42)) * profile.risk))
    - Math.max(0, Math.min(10, Math.abs(Math.min(0, Number(features.drawdown20 || 0))) - (horizon <= 5 ? 8 : 12)));
  const confidence = roundMetric(Math.max(0, Math.min(100, score)));
  const direction = confidence >= profile.up ? "up" : confidence <= profile.down ? "down" : "neutral";
  return { direction, confidence };
}

function predictionDirectionText(direction) {
  return {
    up: "未来偏强",
    down: "未来偏弱",
    neutral: "震荡/无明确优势"
  }[direction] || "震荡/无明确优势";
}

function actualDirectionFromReturn(futureReturn, threshold) {
  if (futureReturn >= threshold) return "up";
  if (futureReturn <= -threshold) return "down";
  return "neutral";
}

function runPredictionBacktestOnKlines(rows = [], options = {}) {
  const horizon = Math.max(3, Math.min(60, Number(options.horizon || 10)));
  const autoThreshold = horizon <= 3 ? 1 : horizon <= 5 ? 1.5 : horizon <= 10 ? 2 : 3;
  const threshold = Math.max(0.5, Math.min(15, Number(options.threshold || autoThreshold)));
  const minLookback = Math.max(70, Number(options.minLookback || 70));
  const records = [];
  for (let i = minLookback; i < rows.length - horizon; i += 1) {
    const features = predictionFeatures(rows, i, options);
    if (!features) continue;
    const signal = predictionSignalFromFeatures(features, { ...options, horizon });
    const futureClose = Number(rows[i + horizon]?.close);
    const futureReturn = features.close > 0 && Number.isFinite(futureClose) ? ((futureClose - features.close) / features.close) * 100 : null;
    if (!Number.isFinite(futureReturn)) continue;
    const actualDirection = actualDirectionFromReturn(futureReturn, threshold);
    const counted = signal.direction !== "neutral";
    records.push({
      date: rows[i].date,
      price: roundMetric(features.close),
      futureDate: rows[i + horizon]?.date || "",
      direction: signal.direction,
      directionText: predictionDirectionText(signal.direction),
      confidence: signal.confidence,
      actualDirection,
      actualDirectionText: predictionDirectionText(actualDirection),
      futureReturn: roundMetric(futureReturn),
      hit: counted ? signal.direction === actualDirection : actualDirection === "neutral",
      counted,
      features
    });
  }
  const countedRecords = records.filter(item => item.counted);
  const upRecords = countedRecords.filter(item => item.direction === "up");
  const downRecords = countedRecords.filter(item => item.direction === "down");
  const hits = countedRecords.filter(item => item.hit).length;
  const upHits = upRecords.filter(item => item.hit).length;
  const downHits = downRecords.filter(item => item.hit).length;
  const falsePositive = upRecords.filter(item => item.actualDirection !== "up").length;
  const latestFeatures = predictionFeatures(rows, rows.length - 1, options);
  const latestSignal = latestFeatures ? predictionSignalFromFeatures(latestFeatures, { ...options, horizon }) : {};
  const avgFuture = countedRecords.length ? mean(countedRecords.map(item => Number(item.futureReturn))) : 0;
  const avgUpFuture = upRecords.length ? mean(upRecords.map(item => Number(item.futureReturn))) : 0;
  const conclusion = countedRecords.length < 20
    ? "样本不足，只能作提示。"
    : (hits / countedRecords.length >= 0.58
      ? "方向预测有一定历史优势，但仍需结合公告、财务和市场环境复核。"
      : "方向预测优势不明显，不能单独作为观察依据。");
  return {
    horizon,
    threshold,
    sampleCount: records.length,
    predictedCount: countedRecords.length,
    hitRate: countedRecords.length ? roundMetric(hits / countedRecords.length * 100) : 0,
    upHitRate: upRecords.length ? roundMetric(upHits / upRecords.length * 100) : 0,
    downHitRate: downRecords.length ? roundMetric(downHits / downRecords.length * 100) : 0,
    falsePositiveRate: upRecords.length ? roundMetric(falsePositive / upRecords.length * 100) : 0,
    avgFutureReturn: roundMetric(avgFuture),
    avgPredictedUpReturn: roundMetric(avgUpFuture),
    latestPrediction: latestFeatures ? {
      date: rows[rows.length - 1]?.date || "",
      price: roundMetric(latestFeatures.close),
      direction: latestSignal.direction || "neutral",
      directionText: predictionDirectionText(latestSignal.direction),
      confidence: latestSignal.confidence ?? 50,
      horizon,
      threshold,
      features: latestFeatures
    } : null,
    records: records.slice(-24),
    conclusion
  };
}

async function runPredictionBacktest(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const items = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      const result = runPredictionBacktestOnKlines(rows, options);
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        source: history.source || "历史日线",
        ...result
      });
    } catch (error) {
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        source: "历史日线",
        error: error.message || "预测回测失败"
      });
    }
  }
  return {
    success: true,
    source: [...new Set(items.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    items,
    generatedAt: new Date().toISOString(),
    note: "预测回测只检验历史方向信号是否有统计优势，不执行买卖，也不代表未来收益。"
  };
}

function backtestProfessionalScore(result = {}) {
  if (result.error) return -9999;
  const annual = Number(result.annualizedReturn || 0);
  const drawdown = Math.abs(Number(result.maxDrawdown || 0));
  const sharpe = Number(result.sharpe || 0);
  const profitFactor = Number(result.profitFactor || 0);
  const trades = Number(result.tradeCount || 0);
  const tradePenalty = trades < 2 ? 18 : 0;
  return roundMetric(annual * 0.35 + sharpe * 18 + Math.min(30, profitFactor * 6) - drawdown * 0.8 - tradePenalty);
}

function optimizationParamGrid(options = {}) {
  const strategy = options.strategy || "ma_cross";
  if (strategy === "breakout") {
    return [10, 15, 20, 30, 40, 60].map(lookback => ({ ...options, strategy, lookback }));
  }
  const shorts = [3, 5, 8, 10, 13];
  const longs = [20, 30, 45, 60, 90];
  const rows = [];
  shorts.forEach(short => {
    longs.forEach(long => {
      if (long > short) rows.push({ ...options, strategy: "ma_cross", short, long });
    });
  });
  return rows;
}

async function runStockBacktestOptimization(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const grid = optimizationParamGrid(options);
  const items = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      const candidates = grid.map(params => {
        const result = runBacktestOnKlines(rows, params);
        return {
          strategy: params.strategy,
          short: params.short,
          long: params.long,
          lookback: params.lookback,
          stopLoss: Number(params.stopLoss || 8),
          totalReturn: result.totalReturn,
          annualizedReturn: result.annualizedReturn,
          excessReturn: result.excessReturn,
          maxDrawdown: result.maxDrawdown,
          sharpe: result.sharpe,
          sortino: result.sortino,
          calmar: result.calmar,
          profitFactor: result.profitFactor,
          tradeCount: result.tradeCount,
          winRate: result.winRate,
          exposurePct: result.exposurePct,
          score: backtestProfessionalScore(result)
        };
      }).sort((a, b) => b.score - a.score);
      const best = candidates[0] || null;
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        source: history.source || "历史日线",
        best,
        top: candidates.slice(0, 8),
        tested: candidates.length,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        error: error.message || "参数优化失败",
        top: []
      });
    }
  }
  return {
    success: true,
    source: [...new Set(items.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    items,
    generatedAt: new Date().toISOString(),
    note: "参数优化用于检查策略敏感性；最优参数可能过拟合，必须结合样本外和人工复盘。"
  };
}

function walkforwardJudgement(train = {}, test = {}) {
  if (!test || test.error) return "样本外失败";
  const testReturn = Number(test.totalReturn || 0);
  const testSharpe = Number(test.sharpe || 0);
  const testDd = Math.abs(Number(test.maxDrawdown || 0));
  const trainReturn = Number(train.totalReturn || 0);
  const decay = trainReturn ? testReturn / Math.abs(trainReturn) : 0;
  if (testReturn > 0 && testSharpe >= 1 && testDd <= 25) return "样本外通过";
  if (testReturn > 0 && testDd <= 35) return "样本外一般";
  if (decay < 0 || testReturn <= 0) return "过拟合风险高";
  return "需人工复核";
}

async function runStockWalkforward(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const trainRatio = Math.max(0.5, Math.min(0.85, Number(options.trainRatio || 0.7)));
  const grid = optimizationParamGrid(options);
  const items = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      if (rows.length < 120) throw new Error("样本太短，至少需要约 120 个交易日。");
      const splitIndex = Math.max(60, Math.min(rows.length - 40, Math.floor(rows.length * trainRatio)));
      const trainRows = rows.slice(0, splitIndex);
      const testRows = rows.slice(splitIndex);
      const candidates = grid.map(params => {
        const train = runBacktestOnKlines(trainRows, params);
        return { params, train, score: backtestProfessionalScore(train) };
      }).sort((a, b) => b.score - a.score);
      const chosen = candidates[0];
      const test = runBacktestOnKlines(testRows, chosen.params);
      const full = runBacktestOnKlines(rows, chosen.params);
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        source: history.source || "历史日线",
        split: {
          trainRatio: roundMetric(trainRatio * 100),
          trainStart: trainRows[0] ? trainRows[0].date : "",
          trainEnd: trainRows[trainRows.length - 1] ? trainRows[trainRows.length - 1].date : "",
          testStart: testRows[0] ? testRows[0].date : "",
          testEnd: testRows[testRows.length - 1] ? testRows[testRows.length - 1].date : "",
          trainDays: trainRows.length,
          testDays: testRows.length
        },
        params: {
          strategy: chosen.params.strategy,
          short: chosen.params.short,
          long: chosen.params.long,
          lookback: chosen.params.lookback,
          stopLoss: Number(chosen.params.stopLoss || 8),
          fee: Number(chosen.params.fee || 0.0005)
        },
        train: {
          score: chosen.score,
          totalReturn: chosen.train.totalReturn,
          annualizedReturn: chosen.train.annualizedReturn,
          maxDrawdown: chosen.train.maxDrawdown,
          sharpe: chosen.train.sharpe,
          profitFactor: chosen.train.profitFactor,
          tradeCount: chosen.train.tradeCount
        },
        test: {
          totalReturn: test.totalReturn,
          annualizedReturn: test.annualizedReturn,
          maxDrawdown: test.maxDrawdown,
          sharpe: test.sharpe,
          sortino: test.sortino,
          calmar: test.calmar,
          profitFactor: test.profitFactor,
          tradeCount: test.tradeCount,
          winRate: test.winRate,
          excessReturn: test.excessReturn
        },
        full: {
          totalReturn: full.totalReturn,
          annualizedReturn: full.annualizedReturn,
          maxDrawdown: full.maxDrawdown,
          sharpe: full.sharpe,
          profitFactor: full.profitFactor
        },
        judgement: walkforwardJudgement(chosen.train, test),
        topTrain: candidates.slice(0, 5).map(row => ({
          strategy: row.params.strategy,
          short: row.params.short,
          long: row.params.long,
          lookback: row.params.lookback,
          score: row.score,
          annualizedReturn: row.train.annualizedReturn,
          maxDrawdown: row.train.maxDrawdown,
          sharpe: row.train.sharpe
        }))
      });
    } catch (error) {
      items.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        error: error.message || "样本外验证失败"
      });
    }
  }
  return {
    success: true,
    source: [...new Set(items.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    items,
    generatedAt: new Date().toISOString(),
    note: "Walk-forward 使用训练段选择参数、验证段检验参数韧性；仍需警惕样本过短和行情阶段差异。"
  };
}

function buildReturnMap(rows = []) {
  const map = new Map();
  for (let i = 1; i < rows.length; i += 1) {
    const prev = Number(rows[i - 1].close);
    const now = Number(rows[i].close);
    if (rows[i].date && Number.isFinite(prev) && prev > 0 && Number.isFinite(now)) {
      map.set(rows[i].date, now / prev - 1);
    }
  }
  return map;
}

function intersectDateMaps(maps = []) {
  if (!maps.length) return [];
  let dates = [...maps[0].keys()];
  for (let i = 1; i < maps.length; i += 1) {
    dates = dates.filter(date => maps[i].has(date));
  }
  return dates.sort();
}

function portfolioMetricsFromEquity(equity = []) {
  const dailyReturns = equity.map(point => Number(point.returnPct) / 100).filter(Number.isFinite);
  const negativeReturns = dailyReturns.filter(value => value < 0);
  const totalReturn = equity.length ? (Number(equity[equity.length - 1].value || 1) - 1) * 100 : 0;
  const dailyAvg = mean(dailyReturns);
  const dailyVol = standardDeviation(dailyReturns);
  const downsideVol = standardDeviation(negativeReturns);
  const positiveDays = dailyReturns.filter(value => value > 0).length;
  return {
    totalReturn: roundMetric(totalReturn),
    annualizedReturn: roundMetric(annualizedReturn(totalReturn, equity.length)),
    maxDrawdown: roundMetric(maxDrawdownFromEquity(equity)),
    annualVolatility: roundMetric(dailyVol * Math.sqrt(252) * 100),
    sharpe: roundMetric(dailyVol ? (dailyAvg / dailyVol) * Math.sqrt(252) : 0),
    sortino: roundMetric(downsideVol ? (dailyAvg / downsideVol) * Math.sqrt(252) : 0),
    winRate: dailyReturns.length ? roundMetric(positiveDays / dailyReturns.length * 100) : 0,
    positiveDays,
    negativeDays: dailyReturns.filter(value => value < 0).length,
    flatDays: dailyReturns.filter(value => value === 0).length,
    sampleDays: equity.length
  };
}

function equityFromReturnMap(returnMap, dates = []) {
  let value = 1;
  return (dates || []).map(date => {
    const dailyReturn = Number(returnMap.get(date) || 0);
    value *= (1 + (Number.isFinite(dailyReturn) ? dailyReturn : 0));
    return {
      date,
      value,
      returnPct: roundMetric((Number.isFinite(dailyReturn) ? dailyReturn : 0) * 100, 4)
    };
  });
}

function equalWeightEquityFromHistories(histories = [], dates = []) {
  let value = 1;
  return (dates || []).map(date => {
    const returns = histories
      .map(history => history.returnMap.get(date))
      .filter(Number.isFinite);
    const dailyReturn = returns.length ? mean(returns) : 0;
    value *= (1 + dailyReturn);
    return {
      date,
      value,
      returnPct: roundMetric(dailyReturn * 100, 4),
      count: returns.length
    };
  });
}

async function rotationBenchmarkResults(histories = [], dates = [], options = {}, strategyMetrics = {}) {
  const benchmarks = [];
  const equalWeightEquity = equalWeightEquityFromHistories(histories, dates);
  if (equalWeightEquity.length) {
    const metrics = portfolioMetricsFromEquity(equalWeightEquity);
    benchmarks.push({
      key: "equal_weight_buy_hold",
      name: "成分等权买入持有",
      source: "同池标的历史日线",
      startDate: equalWeightEquity[0]?.date || "",
      endDate: equalWeightEquity[equalWeightEquity.length - 1]?.date || "",
      ...metrics,
      excessReturn: roundMetric(Number(strategyMetrics.totalReturn || 0) - Number(metrics.totalReturn || 0)),
      equity: equalWeightEquity.slice(-180)
    });
  }
  const indexBenchmarks = [
    { key: "sh000300", name: "沪深300" },
    { key: "sz399006", name: "创业板指" },
    { key: "sh000001", name: "上证指数" }
  ];
  for (const item of indexBenchmarks) {
    try {
      const history = await getHistoricalKline(item.key, options);
      const rows = history.rows || [];
      if (rows.length < 60) throw new Error("指数样本不足");
      const returnMap = buildReturnMap(rows);
      const availableDates = dates.filter(date => returnMap.has(date));
      if (availableDates.length < Math.min(40, dates.length)) throw new Error("共同交易日不足");
      const equity = equityFromReturnMap(returnMap, dates);
      const metrics = portfolioMetricsFromEquity(equity);
      benchmarks.push({
        key: item.key,
        name: item.name,
        source: history.source || "指数历史日线",
        startDate: equity[0]?.date || "",
        endDate: equity[equity.length - 1]?.date || "",
        ...metrics,
        excessReturn: roundMetric(Number(strategyMetrics.totalReturn || 0) - Number(metrics.totalReturn || 0)),
        equity: equity.slice(-180)
      });
    } catch (error) {
      benchmarks.push({
        key: item.key,
        name: item.name,
        error: error.message || "基准数据拉取失败"
      });
    }
  }
  return benchmarks;
}

async function runPortfolioBacktest(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const histories = [];
  const errors = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      if (rows.length < 60) throw new Error("历史样本不足，至少需要约 60 个交易日。");
      histories.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        rows,
        source: history.source || "历史日线",
        returnMap: buildReturnMap(rows)
      });
    } catch (error) {
      errors.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        error: error.message || "组合回测数据拉取失败"
      });
    }
  }
  if (!histories.length) {
    return {
      success: true,
      source: "历史日线",
      mode: "equal_weight_common_dates",
      portfolio: null,
      items: errors,
      errors,
      generatedAt: new Date().toISOString(),
      note: "没有足够历史日线可计算组合回测。"
    };
  }
  const dates = intersectDateMaps(histories.map(item => item.returnMap));
  if (dates.length < 40) {
    return {
      success: true,
      source: [...new Set(histories.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
      mode: "equal_weight_common_dates",
      portfolio: null,
      items: histories.map(item => ({ key: item.key, name: item.name, source: item.source, sampleDays: item.rows.length })).concat(errors),
      errors,
      generatedAt: new Date().toISOString(),
      note: "组合共同交易日不足，无法形成稳定回测。可减少标的或增加回测区间。"
    };
  }
  let value = 1;
  const equity = dates.map(date => {
    const returns = histories.map(item => item.returnMap.get(date)).filter(Number.isFinite);
    const dailyReturn = returns.length ? mean(returns) : 0;
    value *= (1 + dailyReturn);
    return {
      date,
      value,
      returnPct: roundMetric(dailyReturn * 100, 4),
      count: returns.length
    };
  });
  const metrics = portfolioMetricsFromEquity(equity);
  const items = histories.map(item => {
    const first = item.rows[0];
    const last = item.rows[item.rows.length - 1];
    const buyHoldReturn = first && Number(first.close) > 0 && last
      ? ((Number(last.close) - Number(first.close)) / Number(first.close)) * 100
      : 0;
    return {
      key: item.key,
      name: item.name,
      source: item.source,
      weight: roundMetric(100 / histories.length),
      sampleDays: item.rows.length,
      startDate: first ? first.date : "",
      endDate: last ? last.date : "",
      buyHoldReturn: roundMetric(buyHoldReturn)
    };
  }).concat(errors);
  return {
    success: true,
    source: [...new Set(histories.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    mode: "equal_weight_common_dates",
    portfolio: {
      count: histories.length,
      startDate: dates[0] || "",
      endDate: dates[dates.length - 1] || "",
      weightPct: histories.length ? roundMetric(100 / histories.length) : 0,
      ...metrics,
      equity: equity.slice(-160)
    },
    items,
    errors,
    generatedAt: new Date().toISOString(),
    note: "组合回测采用共同交易日等权日收益近似，不考虑停牌、真实调仓滑点、冲击成本、分红送转和仓位限制；只用于复盘假设验证。"
  };
}

function metricNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function boundedScore(value, min, max, lowScore = 0, highScore = 100) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 50;
  const clamped = Math.max(min, Math.min(max, num));
  return lowScore + ((clamped - min) / (max - min)) * (highScore - lowScore);
}

function rotationAnnouncementPenalty(brief = {}) {
  const text = (brief.latestAnnouncements || [])
    .map(item => [item.riskTag, item.title, item.summary, ...(item.riskPoints || [])].filter(Boolean).join(" "))
    .join(" ");
  if (/监管|处罚|立案|问询|诉讼|仲裁|减持|质押|亏损|退市|风险|异常|警示/.test(text)) return 18;
  if (/提示|更正|变更|担保|关联交易|延期|波动/.test(text)) return 8;
  return 0;
}

function rotationBacktestScore(backtest = {}) {
  if (!backtest || backtest.error) return 35;
  const annual = metricNumber(backtest.annualizedReturn) || 0;
  const sharpe = metricNumber(backtest.sharpe) || 0;
  const excess = metricNumber(backtest.excessReturn) || 0;
  const drawdown = Math.abs(metricNumber(backtest.maxDrawdown) || 0);
  return Math.max(0, Math.min(100,
    boundedScore(annual, -30, 80, 0, 35) +
    boundedScore(sharpe, -0.5, 2.5, 0, 25) +
    boundedScore(excess, -30, 60, 0, 20) +
    boundedScore(30 - drawdown, 0, 30, 0, 20)
  ));
}

function rotationWalkforwardScore(walk = {}) {
  if (!walk || walk.error) return 35;
  const judgement = String(walk.judgement || "");
  const testReturn = metricNumber(walk.test && walk.test.totalReturn) || 0;
  const testSharpe = metricNumber(walk.test && walk.test.sharpe) || 0;
  const testDd = Math.abs(metricNumber(walk.test && walk.test.maxDrawdown) || 0);
  let base = 45;
  if (/通过/.test(judgement)) base = 82;
  else if (/一般|复核/.test(judgement)) base = 62;
  else if (/过拟合|风险/.test(judgement)) base = 28;
  return Math.max(0, Math.min(100, base + Math.min(12, testReturn / 3) + Math.min(8, testSharpe * 4) - Math.min(18, testDd / 2)));
}

function rotationBriefScore(brief = {}) {
  const pct = metricNumber(brief.pct);
  const pe = metricNumber(brief.pe);
  const pb = metricNumber(brief.pb);
  const roe = metricNumber(brief.roe);
  const gross = metricNumber(brief.grossMargin);
  const net = metricNumber(brief.netMargin);
  const revenueGrowth = metricNumber(brief.revenueGrowth);
  const profitGrowth = metricNumber(brief.profitGrowth);
  const momentum = pct === null ? 45 : boundedScore(pct, -8, 8, 20, 90);
  const valuation = Math.max(0, Math.min(100,
    (pe === null ? 48 : boundedScore(80 - pe, 0, 80, 10, 80)) * 0.65 +
    (pb === null ? 48 : boundedScore(15 - pb, 0, 15, 10, 80)) * 0.35
  ));
  const quality = Math.max(0, Math.min(100,
    (roe === null ? 48 : boundedScore(roe, -5, 30, 15, 90)) * 0.45 +
    (gross === null ? 48 : boundedScore(gross, 0, 70, 20, 85)) * 0.3 +
    (net === null ? 48 : boundedScore(net, -10, 35, 10, 85)) * 0.25
  ));
  const growth = Math.max(0, Math.min(100,
    (revenueGrowth === null ? 48 : boundedScore(revenueGrowth, -30, 80, 10, 90)) * 0.45 +
    (profitGrowth === null ? 48 : boundedScore(profitGrowth, -50, 120, 10, 90)) * 0.55
  ));
  const riskPenalty = rotationAnnouncementPenalty(brief);
  return {
    momentum: roundMetric(momentum),
    valuation: roundMetric(valuation),
    quality: roundMetric(quality),
    growth: roundMetric(growth),
    riskPenalty
  };
}

function rotationDecision(score, riskLevel = "") {
  const total = Number(score || 0);
  if (/高/.test(riskLevel)) return "高风险观察，不进核心仓";
  if (total >= 78) return "优先观察/候选核心";
  if (total >= 65) return "观察池靠前";
  if (total >= 52) return "小仓验证或等待确认";
  return "暂不轮动";
}

function riskLevelFromItem(item = {}) {
  const drawdown = Math.abs(metricNumber(item.maxDrawdown) || metricNumber(item.backtest && item.backtest.maxDrawdown) || 0);
  const ann = Number(item.riskPenalty || 0);
  const score = Number(item.rotationScore || 0);
  if (ann >= 18 || drawdown >= 35 || score < 45) return "高";
  if (ann >= 8 || drawdown >= 22 || score < 62) return "中";
  return "低";
}

function allocateRotationWeights(items = [], options = {}) {
  const maxWeight = Math.max(5, Math.min(60, Number(options.maxWeight || 25)));
  const minCash = Math.max(0, Math.min(80, Number(options.minCash || 15)));
  const investable = Math.max(0, 100 - minCash);
  const candidates = items.filter(item => Number(item.rotationScore || 0) > 0);
  const rawSum = candidates.reduce((sum, item) => sum + Math.max(0, Number(item.rotationScore || 0) - 40), 0) || 1;
  let remaining = investable;
  const allocated = candidates.map(item => {
    const raw = Math.max(0, Number(item.rotationScore || 0) - 40) / rawSum * investable;
    const riskLevel = riskLevelFromItem(item);
    const riskCap = riskLevel === "高" ? Math.min(maxWeight, 8) : riskLevel === "中" ? Math.min(maxWeight, 16) : maxWeight;
    const weight = Math.min(raw, riskCap, remaining);
    remaining -= weight;
    return {
      ...item,
      riskLevel,
      suggestedWeight: roundMetric(weight),
      maxAllowedWeight: riskCap,
      positionNote: riskLevel === "高" ? "只适合观察或极小仓验证" : riskLevel === "中" ? "控制仓位，等待确认" : "可作为组合候选"
    };
  });
  const byKey = new Map(allocated.map(item => [item.key, item]));
  return {
    items: items.map(item => byKey.get(item.key) || { ...item, riskLevel: riskLevelFromItem(item), suggestedWeight: 0, maxAllowedWeight: 0, positionNote: "评分不足，暂不配置" }),
    cashWeight: roundMetric(100 - allocated.reduce((sum, item) => sum + Number(item.suggestedWeight || 0), 0)),
    maxWeight,
    minCash
  };
}

async function runRotationStrategy(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const topN = Math.max(1, Math.min(12, Number(options.topN || 5)));
  if (!cleanKeys.length) {
    return { success: true, source: "", items: [], selected: [], generatedAt: new Date().toISOString(), note: "没有输入轮动标的。" };
  }
  const [briefs, backtest, walkforward] = await Promise.all([
    getStockBriefs(cleanKeys, { includeAnnouncements: true, announcementLimit: 2 }),
    runStockBacktest(cleanKeys, { ...options, strategy: options.strategy || "ma_cross" }),
    runStockWalkforward(cleanKeys, { ...options, strategy: options.strategy || "ma_cross", trainRatio: options.trainRatio || 0.7 })
  ]);
  const briefMap = new Map(briefs.map(item => [item.key, item]));
  const backtestMap = new Map((backtest.items || []).map(item => [item.key, item]));
  const walkMap = new Map((walkforward.items || []).map(item => [item.key, item]));
  const items = cleanKeys.map(key => {
    const brief = briefMap.get(key) || { key };
    const bt = backtestMap.get(key) || {};
    const wf = walkMap.get(key) || {};
    const briefScore = rotationBriefScore(brief);
    const btScore = rotationBacktestScore(bt);
    const wfScore = rotationWalkforwardScore(wf);
    const total = Math.max(0, Math.min(100,
      briefScore.momentum * 0.16 +
      briefScore.valuation * 0.12 +
      briefScore.quality * 0.18 +
      briefScore.growth * 0.14 +
      btScore * 0.22 +
      wfScore * 0.18 -
      briefScore.riskPenalty
    ));
    const riskLevel = riskLevelFromItem({
      rotationScore: total,
      riskPenalty: briefScore.riskPenalty,
      maxDrawdown: bt.maxDrawdown
    });
    return {
      key,
      name: brief.name || bt.name || wf.name || key,
      sector: brief.sector || "",
      price: brief.price,
      pct: brief.pct,
      pe: brief.pe,
      pb: brief.pb,
      roe: brief.roe,
      revenueGrowth: brief.revenueGrowth,
      profitGrowth: brief.profitGrowth,
      quoteSource: brief.quoteSource || brief.source || "",
      financialSource: brief.financialSource || "",
      rotationScore: roundMetric(total),
      riskLevel,
      decision: rotationDecision(total, riskLevel),
      components: {
        ...briefScore,
        backtest: roundMetric(btScore),
        walkforward: roundMetric(wfScore)
      },
      backtest: bt.error ? { error: bt.error } : {
        totalReturn: bt.totalReturn,
        annualizedReturn: bt.annualizedReturn,
        excessReturn: bt.excessReturn,
        maxDrawdown: bt.maxDrawdown,
        sharpe: bt.sharpe,
        profitFactor: bt.profitFactor,
        lastSignal: bt.lastSignal
      },
      walkforward: wf.error ? { error: wf.error } : {
        judgement: wf.judgement,
        testReturn: wf.test && wf.test.totalReturn,
        testAnnualizedReturn: wf.test && wf.test.annualizedReturn,
        testMaxDrawdown: wf.test && wf.test.maxDrawdown,
        testSharpe: wf.test && wf.test.sharpe
      },
      announcements: (brief.latestAnnouncements || []).slice(0, 2).map(item => ({
        title: item.title,
        date: item.date,
        riskTag: item.riskTag,
        riskPoints: item.riskPoints || []
      }))
    };
  }).sort((a, b) => Number(b.rotationScore || 0) - Number(a.rotationScore || 0));
  const allocated = allocateRotationWeights(items.slice(0, topN), options);
  const selectedMap = new Map(allocated.items.map(item => [item.key, item]));
  const merged = items.map(item => selectedMap.get(item.key) || { ...item, suggestedWeight: 0, maxAllowedWeight: 0 });
  return {
    success: true,
    source: [...new Set([
      ...(briefs || []).flatMap(item => [item.quoteSource || item.source, item.financialSource, item.announcementSource].filter(Boolean)),
      backtest.source,
      walkforward.source
    ].filter(Boolean))].join(" / "),
    strategy: options.strategy || "ma_cross",
    topN,
    cashWeight: allocated.cashWeight,
    maxWeight: allocated.maxWeight,
    minCash: allocated.minCash,
    items: merged,
    selected: merged.filter(item => Number(item.suggestedWeight || 0) > 0),
    generatedAt: new Date().toISOString(),
    note: "轮动评分由行情/财务/公告风险、轻量回测、样本外验证合成，只用于复盘和观察池排序。"
  };
}

async function runRiskPlan(keys = [], options = {}) {
  const rotation = await runRotationStrategy(keys, options);
  const selectedKeys = (rotation.selected || []).map(item => item.key);
  const portfolio = selectedKeys.length ? await runPortfolioBacktest(selectedKeys, options) : null;
  const portfolioBox = portfolio && portfolio.portfolio ? portfolio.portfolio : null;
  const portfolioRisk = portfolioBox
    ? (Math.abs(Number(portfolioBox.maxDrawdown || 0)) > Number(options.riskBudget || 25) ? "组合回撤超预算" : "组合回撤在预算内")
    : "组合样本不足";
  return {
    success: true,
    rotation,
    portfolio,
    riskBudget: Number(options.riskBudget || 25),
    maxWeight: Number(options.maxWeight || 25),
    minCash: Number(options.minCash || 15),
    portfolioRisk,
    rules: [
      `单股权重不超过 ${Number(options.maxWeight || 25)}%`,
      `现金或等待仓位至少 ${Number(options.minCash || 15)}%`,
      `组合最大回撤预算 ${Number(options.riskBudget || 25)}%`,
      "高风险公告或样本外失败的标的只进入观察，不进入核心仓"
    ],
    generatedAt: new Date().toISOString(),
    note: "风控仓位是复盘辅助，不是实盘指令；真实交易还需要成交、流动性、停牌和个人风险承受能力复核。"
  };
}

function quantReportMarkdown(riskPlan = {}, rotationBacktest = null, rotationMatrix = null) {
  const rotation = riskPlan.rotation || {};
  const portfolio = riskPlan.portfolio && riskPlan.portfolio.portfolio ? riskPlan.portfolio.portfolio : null;
  const selected = rotation.selected || [];
  const watch = (rotation.items || []).filter(item => !selected.some(sel => sel.key === item.key)).slice(0, 5);
  const backtestPortfolio = rotationBacktest && rotationBacktest.portfolio ? rotationBacktest.portfolio : null;
  const latestPeriod = rotationBacktest && Array.isArray(rotationBacktest.periods) ? rotationBacktest.periods.slice(-1)[0] : null;
  const benchmarks = rotationBacktest && Array.isArray(rotationBacktest.benchmarks)
    ? rotationBacktest.benchmarks.filter(item => !item.error)
    : [];
  const bestMatrix = rotationMatrix && rotationMatrix.best ? rotationMatrix.best : null;
  const lines = [
    "# 小可量化复盘报告",
    "",
    `生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`,
    "",
    "## 1. 轮动结论",
    selected.length
      ? selected.map(item => `- ${item.name || item.key}：评分 ${item.rotationScore}，建议权重 ${item.suggestedWeight}%；判断：${item.decision}`).join("\n")
      : "- 暂无进入组合的标的。",
    "",
    "## 2. 风控仓位",
    `- 现金仓位：${rotation.cashWeight ?? riskPlan.minCash}%`,
    `- 单股上限：${riskPlan.maxWeight}%`,
    `- 回撤预算：${riskPlan.riskBudget}%`,
    `- 组合风险：${riskPlan.portfolioRisk}`,
    "",
    "## 3. 组合回测",
    portfolio
      ? [
          `- 区间：${portfolio.startDate} 至 ${portfolio.endDate}`,
          `- 组合收益：${portfolio.totalReturn}%`,
          `- 年化收益：${portfolio.annualizedReturn}%`,
          `- 最大回撤：${portfolio.maxDrawdown}%`,
          `- 夏普：${portfolio.sharpe}`,
          `- Sortino：${portfolio.sortino}`
        ].join("\n")
      : "- 组合共同交易日不足，暂未形成稳定回测。",
    "",
    "## 4. 历史轮动与基准对比",
    backtestPortfolio
      ? [
          `- 轮动区间：${backtestPortfolio.startDate} 至 ${backtestPortfolio.endDate}`,
          `- 轮动收益：${backtestPortfolio.totalReturn}%；年化：${backtestPortfolio.annualizedReturn}%；最大回撤：${backtestPortfolio.maxDrawdown}%；夏普：${backtestPortfolio.sharpe}`,
          `- 换仓次数：${backtestPortfolio.rebalanceCount}`,
          benchmarks.length
            ? `- 基准对比：${benchmarks.map(item => `${item.name}收益${item.totalReturn}%，轮动超额${item.excessReturn}%，回撤${item.maxDrawdown}%`).join("；")}`
            : "- 暂无可用基准对比。",
          latestPeriod
            ? `- 最近换仓归因：${latestPeriod.date}，${latestPeriod.attribution || "组合结构稳定"}。新进：${(latestPeriod.entered || []).map(item => `${item.name || item.key}(${item.reason || "-"})`).join("；") || "无"}；调出：${(latestPeriod.exited || []).map(item => `${item.name || item.key}(${item.reason || "-"})`).join("；") || "无"}`
            : "- 暂无换仓归因。"
        ].join("\n")
      : "- 历史轮动回测样本不足，暂未形成基准对比。",
    "",
    "## 5. 参数矩阵",
    bestMatrix
      ? [
          `- 已测试参数组：${rotationMatrix.count || (rotationMatrix.results || []).length}`,
          `- 当前最佳：Top${bestMatrix.topN} / ${bestMatrix.rebalancePeriod === "weekly" ? "周度" : bestMatrix.rebalancePeriod === "quarterly" ? "季度" : "月度"} / ${bestMatrix.rotationLookback}日回看`,
          `- 矩阵分：${bestMatrix.matrixScore}；收益：${bestMatrix.totalReturn}%；回撤：${bestMatrix.maxDrawdown}%；夏普：${bestMatrix.sharpe}`,
          `- 指数超额：${bestMatrix.indexExcessReturn}%；等权超额：${bestMatrix.equalWeightExcessReturn}%；判断：${bestMatrix.judgement}`,
          `- 前五参数：${(rotationMatrix.results || []).slice(0, 5).map(item => `Top${item.topN}/${item.rebalancePeriod}/${item.rotationLookback}日=${item.matrixScore}分`).join("；")}`
        ].join("\n")
      : "- 参数矩阵尚未形成稳定结果。",
    "",
    "## 6. 观察池",
    watch.length
      ? watch.map(item => `- ${item.name || item.key}：评分 ${item.rotationScore}；风险 ${item.riskLevel}；${item.decision}`).join("\n")
      : "- 无额外观察项。",
    "",
    "## 7. 下一次观察条件",
    [
      "- 优先复核参数矩阵 Top1 与 Top5 是否集中在同一换仓周期和回看窗口；如果差异过大，说明策略稳定性不足。",
      "- 观察轮动收益是否同时跑赢宽基指数和同池等权买入持有；只跑赢指数但输给同池等权，说明择时/换仓价值不足。",
      "- 对最近新进标的复核公告风险、估值拥挤度和高位回撤，一旦回撤接近预算，应先降级为观察。",
      "- 对调出标的记录原因，后续如果重新入选，需要确认是趋势修复还是短期反弹。"
    ].join("\n"),
    "",
    "## 8. 局限",
    "- 当前使用公开行情/财务 fallback 或本机可用机构端，结果需要人工复核。",
    "- 回测未完整处理停牌、涨跌停不可成交、滑点、冲击成本和分红送转。",
    "- 本报告只用于复盘，不构成投资建议。"
  ];
  return lines.join("\n");
}

async function runQuantReport(keys = [], options = {}) {
  const riskPlan = await runRiskPlan(keys, options);
  const rotationBacktest = await runHistoricalRotationBacktest(keys, options).catch(error => ({
    success: false,
    error: error.message || "历史轮动回测失败",
    portfolio: null,
    periods: []
  }));
  const rotationMatrix = await runRotationParameterMatrix(keys, options).catch(error => ({
    success: false,
    error: error.message || "参数矩阵失败",
    results: []
  }));
  return {
    success: true,
    ...riskPlan,
    rotationBacktest,
    rotationMatrix,
    report: quantReportMarkdown(riskPlan, rotationBacktest, rotationMatrix),
    generatedAt: new Date().toISOString()
  };
}

function historicalWindowReturns(history, dates = [], endIndex, lookback) {
  const returns = [];
  for (let i = Math.max(1, endIndex - lookback + 1); i <= endIndex; i += 1) {
    const value = history.returnMap.get(dates[i]);
    if (Number.isFinite(value)) returns.push(value);
  }
  return returns;
}

function historicalCloseAt(history, date) {
  const row = history.closeMap.get(date);
  return row && Number.isFinite(row.close) ? row.close : null;
}

function historicalWindowDrawdown(history, dates = [], endIndex, lookback) {
  const prices = [];
  for (let i = Math.max(0, endIndex - lookback + 1); i <= endIndex; i += 1) {
    const close = historicalCloseAt(history, dates[i]);
    if (Number.isFinite(close)) prices.push({ value: close });
  }
  if (prices.length < 2 || !prices[0].value) return 0;
  const base = prices[0].value;
  return Math.abs(maxDrawdownFromEquity(prices.map(item => ({ value: item.value / base }))));
}

function rotationReasonFromCandidate(candidate = {}) {
  const reasons = [];
  if (Number(candidate.longMomentum) >= 30) reasons.push(`中期动量强 ${candidate.longMomentum}%`);
  else if (Number(candidate.longMomentum) >= 10) reasons.push(`中期动量占优 ${candidate.longMomentum}%`);
  else if (Number(candidate.longMomentum) < 0) reasons.push(`中期动量偏弱 ${candidate.longMomentum}%`);
  if (Number(candidate.shortMomentum) >= 12) reasons.push(`短期延续 ${candidate.shortMomentum}%`);
  else if (Number(candidate.shortMomentum) < -5) reasons.push(`短期转弱 ${candidate.shortMomentum}%`);
  if (Number(candidate.volatility) <= 35) reasons.push(`波动可控 ${candidate.volatility}%`);
  else if (Number(candidate.volatility) >= 65) reasons.push(`波动偏高 ${candidate.volatility}%`);
  if (Number(candidate.drawdown) <= 15) reasons.push(`回撤较低 ${candidate.drawdown}%`);
  else if (Number(candidate.drawdown) >= 30) reasons.push(`回撤偏大 ${candidate.drawdown}%`);
  return reasons.slice(0, 3).join("；") || `综合评分 ${candidate.score ?? "-"} 分`;
}

function rotationExitReason(candidate, selected = []) {
  if (!candidate) return "本期缺少可用历史数据或已跌出评分池";
  const cutoff = selected.length ? Number(selected[selected.length - 1].score || 0) : 0;
  const reasons = [];
  if (cutoff && Number(candidate.score || 0) < cutoff) reasons.push(`评分 ${candidate.score} 低于入选线 ${roundMetric(cutoff)}`);
  if (Number(candidate.longMomentum) < 0) reasons.push(`中期动量转弱 ${candidate.longMomentum}%`);
  if (Number(candidate.shortMomentum) < -5) reasons.push(`短期回落 ${candidate.shortMomentum}%`);
  if (Number(candidate.drawdown) >= 30) reasons.push(`阶段回撤偏大 ${candidate.drawdown}%`);
  if (Number(candidate.volatility) >= 65) reasons.push(`波动偏高 ${candidate.volatility}%`);
  return reasons.slice(0, 3).join("；") || "综合排名被更强标的替代";
}

function summarizeRotationNames(items = [], max = 4) {
  return (items || [])
    .slice(0, max)
    .map(item => item.name || item.key)
    .filter(Boolean)
    .join("、");
}

function scoreHistoricalRotationCandidate(history, dates = [], index, options = {}) {
  const lookback = Math.max(20, Number(options.rotationLookback || 60));
  const shortLookback = Math.max(10, Math.min(30, Number(options.shortLookback || 20)));
  const closeNow = historicalCloseAt(history, dates[index]);
  const closeLong = historicalCloseAt(history, dates[Math.max(0, index - lookback)]);
  const closeShort = historicalCloseAt(history, dates[Math.max(0, index - shortLookback)]);
  if (!Number.isFinite(closeNow) || !Number.isFinite(closeLong) || closeLong <= 0) return null;
  const longMomentum = (closeNow / closeLong - 1) * 100;
  const shortMomentum = Number.isFinite(closeShort) && closeShort > 0 ? (closeNow / closeShort - 1) * 100 : longMomentum;
  const returns = historicalWindowReturns(history, dates, index, lookback);
  const volatility = standardDeviation(returns) * Math.sqrt(252) * 100;
  const drawdown = historicalWindowDrawdown(history, dates, index, lookback);
  const score = Math.max(0, Math.min(100,
    boundedScore(longMomentum, -30, 80, 5, 42) +
    boundedScore(shortMomentum, -20, 45, 5, 28) +
    boundedScore(55 - volatility, 0, 55, 0, 18) +
    boundedScore(35 - drawdown, 0, 35, 0, 12)
  ));
  const candidate = {
    key: history.key,
    name: history.name,
    score: roundMetric(score),
    longMomentum: roundMetric(longMomentum),
    shortMomentum: roundMetric(shortMomentum),
    volatility: roundMetric(volatility),
    drawdown: roundMetric(drawdown),
    components: {
      longMomentum: roundMetric(boundedScore(longMomentum, -30, 80, 5, 42)),
      shortMomentum: roundMetric(boundedScore(shortMomentum, -20, 45, 5, 28)),
      volatilityControl: roundMetric(boundedScore(55 - volatility, 0, 55, 0, 18)),
      drawdownControl: roundMetric(boundedScore(35 - drawdown, 0, 35, 0, 12))
    }
  };
  candidate.reason = rotationReasonFromCandidate(candidate);
  return candidate;
}

function rebalanceIntervalFromPeriod(period) {
  if (period === "weekly") return 5;
  if (period === "quarterly") return 60;
  return 20;
}

function buildHistoryCloseMap(rows = []) {
  return new Map(rows.map(row => [row.date, { close: Number(row.close), high: Number(row.high), low: Number(row.low) }]));
}

function calculateTurnover(prevWeights = {}, nextWeights = {}) {
  const keys = new Set([...Object.keys(prevWeights || {}), ...Object.keys(nextWeights || {})]);
  let diff = 0;
  keys.forEach(key => {
    diff += Math.abs(Number(prevWeights[key] || 0) - Number(nextWeights[key] || 0));
  });
  return diff / 2;
}

function historicalRotationWeights(candidates = [], options = {}) {
  const topN = Math.max(1, Math.min(12, Number(options.topN || 5)));
  const maxWeight = Math.max(5, Math.min(60, Number(options.maxWeight || 25)));
  const minCash = Math.max(0, Math.min(80, Number(options.minCash || 15)));
  const selected = candidates
    .filter(item => item && Number(item.score) > 0)
    .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))
    .slice(0, topN);
  const investable = Math.max(0, 100 - minCash);
  const equalWeight = selected.length ? Math.min(maxWeight, investable / selected.length) : 0;
  const weights = {};
  selected.forEach(item => {
    weights[item.key] = equalWeight / 100;
  });
  const invested = Object.values(weights).reduce((sum, value) => sum + value, 0);
  return {
    selected: selected.map(item => ({ ...item, weight: roundMetric((weights[item.key] || 0) * 100) })),
    weights,
    cashWeight: roundMetric((1 - invested) * 100),
    investedWeight: roundMetric(invested * 100)
  };
}

async function runHistoricalRotationBacktest(keys = [], options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const resolvedMap = new Map(resolved.map(item => [item.key, item]));
  const histories = [];
  const errors = [];
  for (const key of cleanKeys) {
    try {
      const history = await getHistoricalKline(key, options);
      const rows = history.rows || [];
      if (rows.length < 90) throw new Error("历史样本不足，至少需要约 90 个交易日。");
      histories.push({
        key,
        name: (resolvedMap.get(key) || {}).name || key,
        source: history.source || "历史日线",
        rows,
        returnMap: buildReturnMap(rows),
        closeMap: buildHistoryCloseMap(rows)
      });
    } catch (error) {
      errors.push({ key, name: (resolvedMap.get(key) || {}).name || key, error: error.message || "历史数据拉取失败" });
    }
  }
  if (histories.length < 2) {
    return {
      success: true,
      source: histories.map(item => item.source).join(" / ") || "历史日线",
      portfolio: null,
      periods: [],
      errors,
      generatedAt: new Date().toISOString(),
      note: "历史轮动至少需要 2 个可用标的。"
    };
  }
  const dates = intersectDateMaps(histories.map(item => item.returnMap));
  const lookback = Math.max(20, Number(options.rotationLookback || 60));
  if (dates.length < lookback + 40) {
    return {
      success: true,
      source: [...new Set(histories.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
      portfolio: null,
      periods: [],
      errors,
      generatedAt: new Date().toISOString(),
      note: "共同交易日不足，无法进行历史轮动回测。"
    };
  }
  const interval = rebalanceIntervalFromPeriod(options.rebalancePeriod || "monthly");
  const feeRate = Math.max(0, Number(options.fee || 0.0005));
  let value = 1;
  let currentWeights = {};
  let lastRebalanceIndex = -Infinity;
  const equity = [];
  const periods = [];
  for (let i = lookback; i < dates.length; i += 1) {
    const date = dates[i];
    if (i === lookback || i - lastRebalanceIndex >= interval) {
      const candidates = histories
        .map(history => scoreHistoricalRotationCandidate(history, dates, i, options))
        .filter(Boolean)
        .sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
      const next = historicalRotationWeights(candidates, options);
      const turnover = calculateTurnover(currentWeights, next.weights);
      const prevWeights = { ...currentWeights };
      const previousKeys = new Set(Object.keys(prevWeights));
      const nextKeys = new Set(Object.keys(next.weights));
      const candidateMap = new Map(candidates.map(item => [item.key, item]));
      const entered = next.selected
        .filter(item => !previousKeys.has(item.key))
        .map(item => ({
          key: item.key,
          name: item.name,
          weight: item.weight,
          score: item.score,
          reason: item.reason || rotationReasonFromCandidate(item)
        }));
      const kept = next.selected
        .filter(item => previousKeys.has(item.key))
        .map(item => ({
          key: item.key,
          name: item.name,
          previousWeight: roundMetric(Number(prevWeights[item.key] || 0) * 100),
          weight: item.weight,
          score: item.score,
          reason: item.reason || rotationReasonFromCandidate(item)
        }));
      const exited = [...previousKeys]
        .filter(key => !nextKeys.has(key))
        .map(key => {
          const candidate = candidateMap.get(key);
          return {
            key,
            name: candidate?.name || (resolvedMap.get(key) || {}).name || key,
            previousWeight: roundMetric(Number(prevWeights[key] || 0) * 100),
            score: candidate?.score ?? "",
            reason: rotationExitReason(candidate, next.selected)
          };
        });
      const rejected = candidates
        .filter(item => !nextKeys.has(item.key))
        .slice(0, 5)
        .map(item => ({
          key: item.key,
          name: item.name,
          score: item.score,
          reason: rotationExitReason(item, next.selected)
        }));
      if (turnover > 0 && feeRate > 0) value *= Math.max(0, 1 - turnover * feeRate);
      currentWeights = next.weights;
      lastRebalanceIndex = i;
      const attribution = [
        entered.length ? `新进：${summarizeRotationNames(entered)}` : "",
        kept.length ? `保留：${summarizeRotationNames(kept)}` : "",
        exited.length ? `调出：${summarizeRotationNames(exited)}` : "",
        rejected.length && !entered.length && !exited.length ? `未入选：${summarizeRotationNames(rejected, 3)}` : ""
      ].filter(Boolean).join("；") || "本期组合结构基本稳定";
      periods.push({
        date,
        selected: next.selected,
        leaders: candidates.slice(0, 8),
        entered,
        kept,
        exited,
        rejected,
        attribution,
        cashWeight: next.cashWeight,
        investedWeight: next.investedWeight,
        turnover: roundMetric(turnover * 100)
      });
    }
    const dailyReturn = histories.reduce((sum, history) => {
      const weight = Number(currentWeights[history.key] || 0);
      const ret = history.returnMap.get(date);
      return sum + (Number.isFinite(ret) ? weight * ret : 0);
    }, 0);
    value *= (1 + dailyReturn);
    equity.push({
      date,
      value,
      returnPct: roundMetric(dailyReturn * 100, 4),
      count: Object.keys(currentWeights).length
    });
  }
  const metrics = portfolioMetricsFromEquity(equity);
  const benchmarkDates = equity.map(point => point.date);
  const benchmarks = await rotationBenchmarkResults(histories, benchmarkDates, options, metrics);
  const bestBenchmark = benchmarks
    .filter(item => !item.error && Number.isFinite(Number(item.excessReturn)))
    .sort((a, b) => Number(b.excessReturn || 0) - Number(a.excessReturn || 0))[0] || null;
  const selectedCounts = {};
  periods.forEach(period => {
    (period.selected || []).forEach(item => {
      selectedCounts[item.key] = (selectedCounts[item.key] || 0) + 1;
    });
  });
  const items = histories.map(history => {
    const first = history.rows[0];
    const last = history.rows[history.rows.length - 1];
    const buyHoldReturn = first && Number(first.close) > 0 && last
      ? ((Number(last.close) - Number(first.close)) / Number(first.close)) * 100
      : 0;
    return {
      key: history.key,
      name: history.name,
      source: history.source,
      selectedPeriods: selectedCounts[history.key] || 0,
      buyHoldReturn: roundMetric(buyHoldReturn)
    };
  }).concat(errors);
  return {
    success: true,
    source: [...new Set(histories.map(item => item.source).filter(Boolean))].join(" / ") || "历史日线",
    mode: "historical_rotation",
    rebalancePeriod: options.rebalancePeriod || "monthly",
    rotationLookback: lookback,
    topN: Math.max(1, Math.min(12, Number(options.topN || 5))),
    portfolio: {
      count: histories.length,
      startDate: equity[0] ? equity[0].date : "",
      endDate: equity[equity.length - 1] ? equity[equity.length - 1].date : "",
      rebalanceCount: periods.length,
      ...metrics,
      equity: equity.slice(-180)
    },
    benchmarks,
    benchmarkSummary: bestBenchmark ? `相对${bestBenchmark.name}超额 ${bestBenchmark.excessReturn}%` : "",
    attributionSummary: periods.length ? periods[periods.length - 1].attribution : "",
    periods: periods.slice(-30),
    items,
    errors,
    generatedAt: new Date().toISOString(),
    note: "历史轮动回测按固定周期重新评分换仓，评分基于历史动量、波动和回撤；未完整处理停牌、涨跌停不可成交、真实滑点、分红送转和冲击成本。"
  };
}

function rotationMatrixScore(item = {}) {
  const total = Number(item.totalReturn || 0);
  const sharpe = Number(item.sharpe || 0);
  const drawdown = Math.abs(Number(item.maxDrawdown || 0));
  const excess = Number(item.indexExcessReturn || item.bestIndexExcessReturn || 0);
  const stability = Number(item.stabilityScore || 0);
  const score =
    boundedScore(total, -40, 180, 0, 24) +
    boundedScore(excess, -40, 120, 0, 24) +
    boundedScore(sharpe, -0.5, 2.5, 0, 20) +
    boundedScore(45 - drawdown, 0, 45, 0, 20) +
    boundedScore(stability, 0, 100, 0, 12);
  return roundMetric(Math.max(0, Math.min(100, score)));
}

function summarizeRotationMatrixResult(result = {}, params = {}) {
  const portfolio = result.portfolio || {};
  const benchmarks = Array.isArray(result.benchmarks) ? result.benchmarks : [];
  const equalWeight = benchmarks.find(item => item.key === "equal_weight_buy_hold" && !item.error) || null;
  const indexBenchmarks = benchmarks.filter(item => item.key !== "equal_weight_buy_hold" && !item.error);
  const bestIndex = indexBenchmarks
    .slice()
    .sort((a, b) => Number(b.excessReturn || 0) - Number(a.excessReturn || 0))[0] || null;
  const avgIndexExcess = indexBenchmarks.length
    ? mean(indexBenchmarks.map(item => Number(item.excessReturn || 0)).filter(Number.isFinite))
    : 0;
  const stabilityScore = roundMetric(
    Math.max(0, Math.min(100,
      Number(portfolio.sharpe || 0) * 18 +
      Math.max(-30, Math.min(45, avgIndexExcess)) +
      Math.max(0, 35 - Math.abs(Number(portfolio.maxDrawdown || 0))) +
      Math.min(15, Number(portfolio.rebalanceCount || 0) / 2)
    ))
  );
  const item = {
    topN: Number(params.topN || result.topN || 5),
    rebalancePeriod: params.rebalancePeriod || result.rebalancePeriod || "monthly",
    rotationLookback: Number(params.rotationLookback || result.rotationLookback || 60),
    totalReturn: portfolio.totalReturn,
    annualizedReturn: portfolio.annualizedReturn,
    maxDrawdown: portfolio.maxDrawdown,
    sharpe: portfolio.sharpe,
    sortino: portfolio.sortino,
    winRate: portfolio.winRate,
    rebalanceCount: portfolio.rebalanceCount,
    equalWeightExcessReturn: equalWeight ? equalWeight.excessReturn : "",
    bestIndexName: bestIndex ? bestIndex.name : "",
    bestIndexExcessReturn: bestIndex ? bestIndex.excessReturn : "",
    indexExcessReturn: roundMetric(avgIndexExcess),
    stabilityScore,
    latestAttribution: result.attributionSummary || "",
    latestHoldings: ((result.periods || []).slice(-1)[0]?.selected || []).map(stock => stock.name || stock.key).join("、")
  };
  item.matrixScore = rotationMatrixScore(item);
  item.judgement = Number(item.matrixScore || 0) >= 70
    ? "稳定性较好"
    : Number(item.matrixScore || 0) >= 45
      ? "可观察"
      : "需谨慎";
  return item;
}

async function runRotationParameterMatrix(keys = [], options = {}) {
  const topNs = [3, 5, 8];
  const periods = ["weekly", "monthly", "quarterly"];
  const lookbacks = [40, 60, 90];
  const results = [];
  const errors = [];
  for (const topN of topNs) {
    for (const rebalancePeriod of periods) {
      for (const rotationLookback of lookbacks) {
        const params = {
          ...options,
          topN,
          rebalancePeriod,
          rotationLookback,
          includeMatrix: false
        };
        try {
          const result = await runHistoricalRotationBacktest(keys, params);
          if (!result.portfolio) {
            errors.push({
              topN,
              rebalancePeriod,
              rotationLookback,
              error: result.note || "该参数组合无法形成回测"
            });
            continue;
          }
          results.push(summarizeRotationMatrixResult(result, params));
        } catch (error) {
          errors.push({
            topN,
            rebalancePeriod,
            rotationLookback,
            error: error.message || "参数组合回测失败"
          });
        }
      }
    }
  }
  const sorted = results.sort((a, b) => Number(b.matrixScore || 0) - Number(a.matrixScore || 0));
  const best = sorted[0] || null;
  const periodStats = periods.map(period => {
    const rows = sorted.filter(item => item.rebalancePeriod === period);
    return {
      rebalancePeriod: period,
      count: rows.length,
      avgScore: roundMetric(mean(rows.map(item => Number(item.matrixScore || 0)).filter(Number.isFinite))),
      avgReturn: roundMetric(mean(rows.map(item => Number(item.totalReturn || 0)).filter(Number.isFinite))),
      avgDrawdown: roundMetric(mean(rows.map(item => Math.abs(Number(item.maxDrawdown || 0))).filter(Number.isFinite)))
    };
  });
  const topNStats = topNs.map(topN => {
    const rows = sorted.filter(item => Number(item.topN) === topN);
    return {
      topN,
      count: rows.length,
      avgScore: roundMetric(mean(rows.map(item => Number(item.matrixScore || 0)).filter(Number.isFinite))),
      avgReturn: roundMetric(mean(rows.map(item => Number(item.totalReturn || 0)).filter(Number.isFinite))),
      avgDrawdown: roundMetric(mean(rows.map(item => Math.abs(Number(item.maxDrawdown || 0))).filter(Number.isFinite)))
    };
  });
  return {
    success: true,
    mode: "rotation_parameter_matrix",
    source: "历史轮动回测参数矩阵",
    grid: {
      topNs,
      rebalancePeriods: periods,
      rotationLookbacks: lookbacks
    },
    count: sorted.length,
    best,
    results: sorted,
    periodStats,
    topNStats,
    errors,
    generatedAt: new Date().toISOString(),
    note: "参数矩阵用于寻找相对稳定的轮动设置；评分综合收益、指数超额、夏普、回撤和换仓稳定性，仍需人工复核数据源、滑点和极端行情。"
  };
}

function parseBacktestOptions(url) {
  const thresholdParam = url.searchParams.get("threshold");
  return {
    strategy: ["ma_cross", "breakout"].includes(url.searchParams.get("strategy")) ? url.searchParams.get("strategy") : "ma_cross",
    short: Number(url.searchParams.get("short") || 5),
    long: Number(url.searchParams.get("long") || 20),
    lookback: Number(url.searchParams.get("lookback") || 20),
    stopLoss: Number(url.searchParams.get("stopLoss") || 8),
    days: Number(url.searchParams.get("days") || 360),
    fee: Number(url.searchParams.get("fee") || 0.0005),
    trainRatio: Number(url.searchParams.get("trainRatio") || 0.7),
    horizon: Number(url.searchParams.get("horizon") || 10),
    threshold: thresholdParam === null || thresholdParam === "" ? undefined : Number(thresholdParam),
    topN: Number(url.searchParams.get("topN") || 5),
    maxWeight: Number(url.searchParams.get("maxWeight") || 25),
    minCash: Number(url.searchParams.get("minCash") || 15),
    riskBudget: Number(url.searchParams.get("riskBudget") || 25),
    rebalancePeriod: ["weekly", "monthly", "quarterly"].includes(url.searchParams.get("rebalancePeriod")) ? url.searchParams.get("rebalancePeriod") : "monthly",
    rotationLookback: Number(url.searchParams.get("rotationLookback") || 60),
    shortLookback: Number(url.searchParams.get("shortLookback") || 20)
  };
}

function yuanToYi(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return `${(num / 100000000).toFixed(2)}亿`;
}

async function getEastmoneyFinancial(key) {
  const secucode = stockKeyToEastmoneySecucode(key);
  if (!secucode) return null;
  const params = new URLSearchParams({
    reportName: "RPT_F10_FINANCE_MAINFINADATA",
    columns: "ALL",
    filter: `(SECUCODE="${secucode}")`,
    pageNumber: "1",
    pageSize: "1",
    sortColumns: "REPORT_DATE",
    sortTypes: "-1"
  });
  const response = await fetch(`https://datacenter-web.eastmoney.com/api/data/v1/get?${params.toString()}`, {
    headers: {
      Referer: "https://data.eastmoney.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await response.json().catch(() => ({}));
  const row = data && data.result && Array.isArray(data.result.data) ? data.result.data[0] : null;
  if (!row) return null;
  return {
    key: normalizeStockBriefKey(key),
    secucode,
    name: row.SECURITY_NAME_ABBR || "",
    reportDate: String(row.REPORT_DATE_NAME || row.REPORT_DATE || "").replace(/\s+00:00:00$/, ""),
    reportType: row.REPORT_TYPE || "",
    revenue: yuanToYi(row.TOTALOPERATEREVE),
    netProfit: yuanToYi(row.PARENTNETPROFIT),
    grossMargin: roundMetric(row.XSMLL),
    netMargin: roundMetric(row.XSJLL),
    roe: roundMetric(row.ROEJQ),
    revenueGrowth: roundMetric(row.TOTALOPERATEREVETZ),
    profitGrowth: roundMetric(row.PARENTNETPROFITTZ),
    eps: roundMetric(row.EPSJB),
    bps: roundMetric(row.BPS),
    source: "东方财富财务",
    updatedAt: new Date().toISOString()
  };
}

async function getEastmoneyFinancials(keys) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  const rows = [];
  for (const key of cleanKeys) {
    try {
      const item = await getEastmoneyFinancial(key);
      if (item) rows.push(item);
    } catch {
      // Keep partial results if one symbol fails.
    }
  }
  return rows;
}

async function getFinancialsWithInstitutional(keys) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const cleanKeys = [...new Set(resolved.map(item => item.key).filter(Boolean))];
  if (!cleanKeys.length) return [];
  const institutional = await getInstitutionalRows("financials", cleanKeys);
  const institutionalRows = institutional.rows || [];
  const institutionalMap = new Map(institutionalRows.map(item => [item.key, item]));
  const missingKeys = cleanKeys.filter(key => !institutionalMap.has(key));
  let fallbackRows = [];
  if (missingKeys.length) {
    fallbackRows = await getEastmoneyFinancials(missingKeys);
  }
  const fallbackMap = new Map(fallbackRows.map(item => [item.key, item]));
  return cleanKeys.map(key => {
    const institutionalRow = institutionalMap.get(key);
    if (institutionalRow) {
      const fallback = fallbackMap.get(key) || {};
      return {
        ...fallback,
        ...institutionalRow,
        financialSource: institutionalRow.source || "机构终端",
        fallbackFinancialSource: fallback.source || ""
      };
    }
    const fallback = fallbackMap.get(key);
    return fallback ? { ...fallback, financialSource: fallback.source || "东方财富财务" } : null;
  }).filter(Boolean);
}

function historicalPct(rows = [], offset = 1) {
  if (!Array.isArray(rows) || rows.length <= offset) return null;
  const latest = Number(rows[rows.length - 1]?.close);
  const base = Number(rows[Math.max(0, rows.length - 1 - offset)]?.close);
  if (!Number.isFinite(latest) || !Number.isFinite(base) || base === 0) return null;
  return Math.round((latest / base - 1) * 10000) / 100;
}

function indicatorSma(values = [], period = 5, endOffset = 0) {
  const end = values.length - Math.max(0, endOffset);
  const start = Math.max(0, end - period);
  const slice = values.slice(start, end).filter(Number.isFinite);
  return slice.length === period ? slice.reduce((sum, value) => sum + value, 0) / period : null;
}

function indicatorEmaSeries(values = [], period = 12) {
  if (!values.length) return [];
  const alpha = 2 / (period + 1);
  const output = [Number(values[0])];
  for (let i = 1; i < values.length; i += 1) output.push(Number(values[i]) * alpha + output[i - 1] * (1 - alpha));
  return output;
}

function indicatorRsi(rows = [], period = 6) {
  if (rows.length <= period) return null;
  let gains = 0;
  let losses = 0;
  for (let i = rows.length - period; i < rows.length; i += 1) {
    const change = Number(rows[i].close) - Number(rows[i - 1].close);
    if (change >= 0) gains += change;
    else losses -= change;
  }
  if (losses === 0) return gains > 0 ? 100 : 50;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function calculateTechnicalIndicators(rows = [], quote = {}) {
  const clean = (rows || []).filter(row => Number.isFinite(Number(row.close)) && Number.isFinite(Number(row.high)) && Number.isFinite(Number(row.low)));
  if (clean.length < 35) throw new Error("历史样本不足，至少需要35个交易日");
  const closes = clean.map(row => Number(row.close));
  const volumes = clean.map(row => Number(row.volume) || 0);
  const latest = clean[clean.length - 1];
  const previous = clean[clean.length - 2];
  const ema12 = indicatorEmaSeries(closes, 12);
  const ema26 = indicatorEmaSeries(closes, 26);
  const difSeries = ema12.map((value, index) => value - ema26[index]);
  const deaSeries = indicatorEmaSeries(difSeries, 9);
  const dif = difSeries[difSeries.length - 1];
  const dea = deaSeries[deaSeries.length - 1];
  const prevDif = difSeries[difSeries.length - 2];
  const prevDea = deaSeries[deaSeries.length - 2];
  let k = 50;
  let d = 50;
  let prevK = k;
  let prevD = d;
  clean.forEach((row, index) => {
    const window = clean.slice(Math.max(0, index - 8), index + 1);
    const high = Math.max(...window.map(item => Number(item.high)));
    const low = Math.min(...window.map(item => Number(item.low)));
    const rsv = high === low ? 50 : (Number(row.close) - low) / (high - low) * 100;
    prevK = k; prevD = d;
    k = k * 2 / 3 + rsv / 3;
    d = d * 2 / 3 + k / 3;
  });
  const ma5 = indicatorSma(closes, 5);
  const ma10 = indicatorSma(closes, 10);
  const ma20 = indicatorSma(closes, 20);
  const ma60 = indicatorSma(closes, 60);
  const prevMa5 = indicatorSma(closes, 5, 1);
  const prevMa10 = indicatorSma(closes, 10, 1);
  const prevMa20 = indicatorSma(closes, 20, 1);
  const prevMa60 = indicatorSma(closes, 60, 1);
  const bollWindow = closes.slice(-20);
  const bollMid = bollWindow.reduce((sum, value) => sum + value, 0) / bollWindow.length;
  const variance = bollWindow.reduce((sum, value) => sum + (value - bollMid) ** 2, 0) / bollWindow.length;
  const bollStd = Math.sqrt(variance);
  const avgVolume5 = indicatorSma(volumes.slice(0, -1), 5);
  const avgVolume10 = indicatorSma(volumes.slice(0, -1), 10);
  const price = Number(quote.price) || Number(latest.close);
  return {
    price,
    ma5, ma10, ma20, ma60,
    prevMa5, prevMa10, prevMa20, prevMa60,
    return5: historicalPct(clean, 5), return10: historicalPct(clean, 10), return20: historicalPct(clean, 20), return60: historicalPct(clean, 60),
    dif, dea, macd: (dif - dea) * 2, prevDif, prevDea, prevMacd: (prevDif - prevDea) * 2,
    macdGoldenCross: prevDif <= prevDea && dif > dea,
    macdDeadCross: prevDif >= prevDea && dif < dea,
    k, d, j: 3 * k - 2 * d, prevK, prevD,
    kdjGoldenCross: prevK <= prevD && k > d,
    kdjDeadCross: prevK >= prevD && k < d,
    rsi6: indicatorRsi(clean, 6), rsi12: indicatorRsi(clean, 12), rsi24: indicatorRsi(clean, 24),
    bollMid, bollUpper: bollMid + 2 * bollStd, bollLower: bollMid - 2 * bollStd,
    bollWidth: bollMid ? bollStd * 4 / bollMid * 100 : null,
    volumeRatio5: avgVolume5 ? Number(latest.volume) / avgVolume5 : null,
    volumeRatio10: avgVolume10 ? Number(latest.volume) / avgVolume10 : null,
    high20: Math.max(...clean.slice(-20).map(row => Number(row.high))),
    low20: Math.min(...clean.slice(-20).map(row => Number(row.low))),
    latestVolume: Number(latest.volume) || 0,
    previousClose: Number(previous.close),
    asOf: latest.date
  };
}

function naturalFieldDefinition(raw = "") {
  const name = String(raw || "").toUpperCase().replace(/\s+/g, "");
  const map = {
    "股价": ["price", "base"], "现价": ["price", "base"], "收盘价": ["price", "base"], "涨幅": ["pct", "base"], "当日涨幅": ["pct", "base"],
    "换手率": ["turnoverRate", "base"], "量比": ["volumeRatio", "base"], "成交额": ["amount", "base"], "市值": ["marketCap", "base"],
    "PE": ["pe", "base"], "市盈率": ["pe", "base"], "PB": ["pb", "base"], "市净率": ["pb", "base"], "ROE": ["roe", "base"],
    "5日涨幅": ["return5", "technical"], "5日涨跌幅": ["return5", "technical"], "10日涨幅": ["return10", "technical"], "10日涨跌幅": ["return10", "technical"],
    "20日涨幅": ["return20", "technical"], "20日涨跌幅": ["return20", "technical"], "60日涨幅": ["return60", "technical"], "60日涨跌幅": ["return60", "technical"],
    "RSI": ["rsi6", "technical"], "RSI6": ["rsi6", "technical"], "RSI12": ["rsi12", "technical"], "RSI24": ["rsi24", "technical"],
    "K": ["k", "technical"], "D": ["d", "technical"], "J": ["j", "technical"], "DIF": ["dif", "technical"], "DEA": ["dea", "technical"], "MACD": ["macd", "technical"],
    "MA5": ["ma5", "technical"], "5日线": ["ma5", "technical"], "MA10": ["ma10", "technical"], "10日线": ["ma10", "technical"],
    "MA20": ["ma20", "technical"], "20日线": ["ma20", "technical"], "MA60": ["ma60", "technical"], "60日线": ["ma60", "technical"],
    "BOLL中轨": ["bollMid", "technical"], "布林中轨": ["bollMid", "technical"], "BOLL上轨": ["bollUpper", "technical"], "布林上轨": ["bollUpper", "technical"],
    "BOLL下轨": ["bollLower", "technical"], "布林下轨": ["bollLower", "technical"]
  };
  return map[name] || null;
}

function naturalOperator(text = "") {
  if (/^(?:>=|≥|不低于|大于等于|至少)$/.test(text)) return ">=";
  if (/^(?:<=|≤|不高于|小于等于|至多)$/.test(text)) return "<=";
  if (/^(?:>|大于|高于|超过)$/.test(text)) return ">";
  if (/^(?:<|小于|低于|不足)$/.test(text)) return "<";
  if (/^(?:=|等于)$/.test(text)) return "=";
  return "";
}

function parseNaturalStockQuery(query = "") {
  const text = String(query || "").replace(/[，；;。\n]+/g, "、").replace(/\s+/g, "");
  const conditions = [];
  const consumed = [];
  const add = condition => {
    const key = JSON.stringify(condition);
    if (!conditions.some(item => JSON.stringify(item) === key)) conditions.push(condition);
  };
  const directFields = [
    ["股价", "price", "base"], ["现价", "price", "base"], ["收盘价", "price", "base"], ["价格", "price", "base"],
    ["涨跌幅", "pct", "base"], ["涨幅", "pct", "base"], ["当日涨幅", "pct", "base"],
    ["换手率", "turnoverRate", "base"], ["量比", "volumeRatio", "base"], ["成交额", "amount", "base"],
    ["市值", "marketCap", "base"], ["总市值", "marketCap", "base"], ["PE", "pe", "base"], ["市盈率", "pe", "base"],
    ["PB", "pb", "base"], ["市净率", "pb", "base"], ["ROE", "roe", "base"], ["毛利率", "grossMargin", "base"],
    ["净利率", "netMargin", "base"], ["营收增速", "revenueGrowth", "base"], ["营业收入增速", "revenueGrowth", "base"],
    ["利润增速", "profitGrowth", "base"], ["净利润增速", "profitGrowth", "base"], ["负债率", "debtRatio", "base"],
    ["5日涨幅", "return5", "technical"], ["5日涨跌幅", "return5", "technical"],
    ["10日涨幅", "return10", "technical"], ["10日涨跌幅", "return10", "technical"],
    ["20日涨幅", "return20", "technical"], ["20日涨跌幅", "return20", "technical"],
    ["60日涨幅", "return60", "technical"], ["60日涨跌幅", "return60", "technical"],
    ["RSI", "rsi6", "technical"], ["RSI6", "rsi6", "technical"], ["RSI12", "rsi12", "technical"], ["RSI24", "rsi24", "technical"],
    ["K", "k", "technical"], ["D", "d", "technical"], ["J", "j", "technical"], ["DIF", "dif", "technical"], ["DEA", "dea", "technical"], ["MACD", "macd", "technical"],
    ["MA5", "ma5", "technical"], ["5日线", "ma5", "technical"], ["MA10", "ma10", "technical"], ["10日线", "ma10", "technical"],
    ["MA20", "ma20", "technical"], ["20日线", "ma20", "technical"], ["MA60", "ma60", "technical"], ["60日线", "ma60", "technical"],
    ["BOLL中轨", "bollMid", "technical"], ["布林中轨", "bollMid", "technical"], ["BOLL上轨", "bollUpper", "technical"],
    ["布林上轨", "bollUpper", "technical"], ["BOLL下轨", "bollLower", "technical"], ["布林下轨", "bollLower", "technical"]
  ];
  const directFieldMap = new Map(directFields.map(([label, field, scope]) => [label.toUpperCase(), { field, scope }]));
  const directFieldPattern = directFields.map(([label]) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((a, b) => b.length - a.length).join("|");
  const directOperatorMap = { ">": ">", ">=": ">=", "<": "<", "<=": "<=", "=": "=", "大于": ">", "高于": ">", "超过": ">", "小于": "<", "低于": "<", "不高于": "<=", "不低于": ">=", "大于等于": ">=", "小于等于": "<=", "至少": ">=", "至多": "<=", "等于": "=" };
  const directComparePattern = new RegExp(`(${directFieldPattern})(>=|<=|>|<|=|大于等于|小于等于|不低于|不高于|大于|小于|高于|低于|超过|至少|至多|等于)(-?\\d+(?:\\.\\d+)?)(%|亿|万|元|倍)?`, "gi");
  let directMatch;
  while ((directMatch = directComparePattern.exec(text))) {
    const def = directFieldMap.get(String(directMatch[1] || "").toUpperCase());
    const op = directOperatorMap[directMatch[2]];
    if (def && op) {
      add({ type: "compare", field: def.field, scope: def.scope, op, value: Number(directMatch[3]), label: directMatch[0] });
      consumed.push(directMatch[0]);
    }
  }
  const comparePattern = /(BOLL中轨|BOLL上轨|BOLL下轨|布林中轨|布林上轨|布林下轨|RSI(?:6|12|24)?|MACD|DIF|DEA|MA(?:5|10|20|60)|(?:5|10|20|60)日线|(?:5|10|20|60)日涨跌?幅|股价|现价|收盘价|当日涨幅|涨幅|换手率|量比|成交额|市值|PE|PB|ROE|市盈率|市净率|K|D|J)(>=|<=|≥|≤|>|<|=|不低于|不高于|大于等于|小于等于|大于|小于|高于|低于|超过|至少|至多|等于)(-?\d+(?:\.\d+)?)(%|亿|元|倍)?/gi;
  let match;
  while ((match = comparePattern.exec(text))) {
    const def = naturalFieldDefinition(match[1]);
    const op = naturalOperator(match[2]);
    if (def && op) {
      add({ type: "compare", field: def[0], scope: def[1], op, value: Number(match[3]), label: match[0] });
      consumed.push(match[0]);
    }
  }
  const rangePattern = /(RSI(?:6|12|24)?|(?:5|10|20|60)日涨跌?幅|股价|现价|换手率|量比|市值|PE|PB|ROE)(?:在|介于)?(-?\d+(?:\.\d+)?)%?(?:到|至|~|-)(-?\d+(?:\.\d+)?)%?(?:之间)?/gi;
  while ((match = rangePattern.exec(text))) {
    const def = naturalFieldDefinition(match[1]);
    if (def) {
      add({ type: "range", field: def[0], scope: def[1], min: Number(match[2]), max: Number(match[3]), label: match[0] });
      consumed.push(match[0]);
    }
  }
  const keywordConditions = [
    ["MACD金叉", "macdGoldenCross"], ["MACD死叉", "macdDeadCross"], ["MACD红柱", "macdPositive"], ["MACD绿柱", "macdNegative"],
    ["KDJ金叉", "kdjGoldenCross"], ["KDJ死叉", "kdjDeadCross"], ["均线多头排列", "maBull"], ["多头排列", "maBull"], ["均线空头排列", "maBear"], ["空头排列", "maBear"],
    ["站上5日线", "aboveMa5"], ["站上10日线", "aboveMa10"], ["站上20日线", "aboveMa20"], ["站上60日线", "aboveMa60"],
    ["跌破5日线", "belowMa5"], ["跌破10日线", "belowMa10"], ["跌破20日线", "belowMa20"], ["跌破60日线", "belowMa60"],
    ["突破BOLL上轨", "aboveBollUpper"], ["突破布林上轨", "aboveBollUpper"], ["站上BOLL中轨", "aboveBollMid"], ["站上布林中轨", "aboveBollMid"], ["跌破BOLL下轨", "belowBollLower"], ["跌破布林下轨", "belowBollLower"],
    ["近20日新高", "high20"], ["20日新高", "high20"], ["近20日新低", "low20"], ["20日新低", "low20"], ["放量", "volumeExpansion"], ["缩量", "volumeContraction"]
  ];
  keywordConditions.forEach(([keyword, signal]) => {
    if (text.toUpperCase().includes(keyword.toUpperCase())) {
      add({ type: "signal", field: signal, scope: "technical", label: keyword });
      consumed.push(keyword);
    }
  });
  const crossPattern = /(MA|)(5|10|20|60)日?线?(上穿|下穿)(MA|)(5|10|20|60)日?线?/gi;
  while ((match = crossPattern.exec(text))) {
    add({ type: "cross", fast: Number(match[2]), direction: match[3] === "上穿" ? "up" : "down", slow: Number(match[5]), scope: "technical", label: match[0] });
    consumed.push(match[0]);
  }
  if (/排除ST|不要ST|非ST/i.test(text)) {
    add({ type: "excludeSt", scope: "base", label: "排除ST/退市" });
    consumed.push("排除ST", "不要ST", "非ST");
  }
  const fragments = text.split("、").filter(Boolean);
  const unparsed = fragments.filter(fragment => !consumed.some(value => fragment.includes(value) || value.includes(fragment)) && !/^(并且|且|同时|筛选|选出|股票|A股)+$/i.test(fragment));
  return { query: String(query || "").trim(), logic: "AND", conditions, unparsed };
}

function compareNaturalValue(actual, op, expected) {
  const value = Number(actual);
  if (!Number.isFinite(value)) return false;
  if (op === ">") return value > expected;
  if (op === ">=") return value >= expected;
  if (op === "<") return value < expected;
  if (op === "<=") return value <= expected;
  return value === expected;
}

function naturalConditionPass(item = {}, condition = {}) {
  const technical = item.technical || {};
  const source = condition.scope === "technical" ? technical : item;
  if (condition.type === "compare") return compareNaturalValue(source[condition.field], condition.op, condition.value);
  if (condition.type === "range") {
    const value = Number(source[condition.field]);
    return Number.isFinite(value) && value >= Math.min(condition.min, condition.max) && value <= Math.max(condition.min, condition.max);
  }
  if (condition.type === "excludeSt") return !/(?:ST|退)/i.test(String(item.name || ""));
  if (condition.type === "cross") {
    const fast = technical[`ma${condition.fast}`];
    const slow = technical[`ma${condition.slow}`];
    const prevFast = technical[`prevMa${condition.fast}`];
    const prevSlow = technical[`prevMa${condition.slow}`];
    return condition.direction === "up" ? prevFast <= prevSlow && fast > slow : prevFast >= prevSlow && fast < slow;
  }
  if (condition.type !== "signal") return true;
  const signals = {
    macdGoldenCross: technical.macdGoldenCross, macdDeadCross: technical.macdDeadCross, macdPositive: technical.macd > 0, macdNegative: technical.macd < 0,
    kdjGoldenCross: technical.kdjGoldenCross, kdjDeadCross: technical.kdjDeadCross,
    maBull: technical.ma5 > technical.ma10 && technical.ma10 > technical.ma20 && technical.ma20 > technical.ma60,
    maBear: technical.ma5 < technical.ma10 && technical.ma10 < technical.ma20 && technical.ma20 < technical.ma60,
    aboveMa5: technical.price > technical.ma5, aboveMa10: technical.price > technical.ma10, aboveMa20: technical.price > technical.ma20, aboveMa60: technical.price > technical.ma60,
    belowMa5: technical.price < technical.ma5, belowMa10: technical.price < technical.ma10, belowMa20: technical.price < technical.ma20, belowMa60: technical.price < technical.ma60,
    aboveBollUpper: technical.price > technical.bollUpper, aboveBollMid: technical.price > technical.bollMid, belowBollLower: technical.price < technical.bollLower,
    high20: technical.price >= technical.high20 * 0.995, low20: technical.price <= technical.low20 * 1.005,
    volumeExpansion: technical.volumeRatio5 >= 1.5, volumeContraction: technical.volumeRatio5 <= 0.7
  };
  return Boolean(signals[condition.field]);
}

function naturalScreenWarnings(parsed = {}, source = "") {
  const warnings = [];
  const conditions = Array.isArray(parsed.conditions) ? parsed.conditions : [];
  const unparsed = Array.isArray(parsed.unparsed) ? parsed.unparsed.filter(Boolean) : [];
  if (unparsed.length) {
    warnings.push(`暂未精确支持：${unparsed.join("、")}。竞价金额、昨日换手、涨停次数、复杂区间公式，需要本地日线/分时仓库后才能做到同花顺级别。`);
  }
  const fieldLabels = {
    volumeRatio: "实时量比",
    amount: "成交额",
    marketCap: "市值",
    roe: "ROE",
    grossMargin: "毛利率",
    netMargin: "净利率",
    revenueGrowth: "营收增速",
    profitGrowth: "利润增速",
    debtRatio: "负债率",
    pct60: "60日涨幅"
  };
  if (/新浪|Sina/i.test(String(source || ""))) {
    const missingLabels = conditions
      .filter(condition => condition.scope === "base" && Object.prototype.hasOwnProperty.call(fieldLabels, condition.field))
      .map(condition => fieldLabels[condition.field] || condition.field);
    if (missingLabels.length) {
      warnings.push(`当前行情源回退到新浪，${[...new Set(missingLabels)].join("、")}等字段可能缺失，筛选会偏严格。建议稍后重试东方财富源，或先删除这些字段。`);
    }
  }
  if (conditions.some(condition => condition.scope === "technical")) {
    warnings.push("MACD/KDJ/RSI/BOLL/均线等技术条件会先按基础条件缩小候选，再分批计算日线，避免一次请求全市场导致页面卡死。");
  }
  return warnings;
}

function enhanceNaturalParsed(parsed = {}, query = "") {
  const text = String(query || "").replace(/[，,；;\n]+/g, "、").replace(/\s+/g, "");
  // The newer parser below is unit-aware. Starting from an empty list avoids
  // legacy matches like "180万" being interpreted as 180亿 before normalization.
  const conditions = [];
  const consumed = [];
  const add = condition => {
    const key = `${condition.type}|${condition.field || ""}|${condition.scope || ""}|${condition.op || ""}|${condition.value ?? ""}|${condition.min ?? ""}|${condition.max ?? ""}|${condition.fast ?? ""}|${condition.slow ?? ""}|${condition.direction || ""}`;
    if (!conditions.some(item => `${item.type}|${item.field || ""}|${item.scope || ""}|${item.op || ""}|${item.value ?? ""}|${item.min ?? ""}|${item.max ?? ""}|${item.fast ?? ""}|${item.slow ?? ""}|${item.direction || ""}` === key)) {
      conditions.push(condition);
    }
  };
  const fields = [
    ["股价", "price", "base"], ["现价", "price", "base"], ["收盘价", "price", "base"], ["价格", "price", "base"],
    ["涨跌幅", "pct", "base"], ["涨幅", "pct", "base"], ["当日涨幅", "pct", "base"],
    ["换手率", "turnoverRate", "base"], ["量比", "volumeRatio", "base"], ["成交额", "amount", "base"],
    ["市值", "marketCap", "base"], ["总市值", "marketCap", "base"], ["PE", "pe", "base"], ["市盈率", "pe", "base"],
    ["PB", "pb", "base"], ["市净率", "pb", "base"], ["ROE", "roe", "base"], ["毛利率", "grossMargin", "base"],
    ["净利率", "netMargin", "base"], ["营收增速", "revenueGrowth", "base"], ["营业收入增速", "revenueGrowth", "base"],
    ["利润增速", "profitGrowth", "base"], ["净利润增速", "profitGrowth", "base"], ["负债率", "debtRatio", "base"],
    ["5日涨幅", "return5", "technical"], ["5日涨跌幅", "return5", "technical"],
    ["10日涨幅", "return10", "technical"], ["10日涨跌幅", "return10", "technical"],
    ["20日涨幅", "return20", "technical"], ["20日涨跌幅", "return20", "technical"],
    ["60日涨幅", "return60", "technical"], ["60日涨跌幅", "return60", "technical"],
    ["RSI", "rsi6", "technical"], ["RSI6", "rsi6", "technical"], ["RSI12", "rsi12", "technical"], ["RSI24", "rsi24", "technical"],
    ["K", "k", "technical"], ["D", "d", "technical"], ["J", "j", "technical"], ["DIF", "dif", "technical"], ["DEA", "dea", "technical"], ["MACD", "macd", "technical"],
    ["MA5", "ma5", "technical"], ["5日线", "ma5", "technical"], ["MA10", "ma10", "technical"], ["10日线", "ma10", "technical"],
    ["MA20", "ma20", "technical"], ["20日线", "ma20", "technical"], ["MA60", "ma60", "technical"], ["60日线", "ma60", "technical"],
    ["BOLL中轨", "bollMid", "technical"], ["布林中轨", "bollMid", "technical"], ["BOLL上轨", "bollUpper", "technical"],
    ["布林上轨", "bollUpper", "technical"], ["BOLL下轨", "bollLower", "technical"], ["布林下轨", "bollLower", "technical"]
  ];
  const map = new Map(fields.map(([label, field, scope]) => [label.toUpperCase(), { field, scope }]));
  const fieldPattern = fields.map(([label]) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((a, b) => b.length - a.length).join("|");
  const opMap = { ">": ">", ">=": ">=", "<": "<", "<=": "<=", "=": "=", "大于": ">", "高于": ">", "超过": ">", "小于": "<", "低于": "<", "不高于": "<=", "不低于": ">=", "大于等于": ">=", "小于等于": "<=", "至少": ">=", "至多": "<=", "等于": "=" };
  const normalizeNaturalNumber = (field, value, unit = "") => {
    let number = Number(value);
    if (!Number.isFinite(number)) return number;
    if ((field === "amount" || field === "marketCap") && unit === "万") number /= 10000;
    if ((field === "amount" || field === "marketCap") && unit === "元") number /= 100000000;
    return number;
  };
  const comparePattern = new RegExp(`(${fieldPattern})(>=|<=|>|<|=|大于等于|小于等于|不低于|不高于|大于|小于|高于|低于|超过|至少|至多|等于)(-?\\d+(?:\\.\\d+)?)(%|亿|万|元|倍)?`, "gi");
  let match;
  while ((match = comparePattern.exec(text))) {
    const def = map.get(String(match[1] || "").toUpperCase());
    const op = opMap[match[2]];
    if (def && op) {
      add({ type: "compare", field: def.field, scope: def.scope, op, value: normalizeNaturalNumber(def.field, match[3], match[4]), label: match[0] });
      consumed.push(match[0]);
    }
  }
  const rangePattern = new RegExp(`(${fieldPattern})(?:在|介于)?(-?\\d+(?:\\.\\d+)?)%?(?:到|至|~|-)(-?\\d+(?:\\.\\d+)?)%?(?:之间)?`, "gi");
  while ((match = rangePattern.exec(text))) {
    const def = map.get(String(match[1] || "").toUpperCase());
    if (def) {
      add({ type: "range", field: def.field, scope: def.scope, min: Number(match[2]), max: Number(match[3]), label: match[0] });
      consumed.push(match[0]);
    }
  }
  const keywordConditions = [
    ["MACD金叉", "macdGoldenCross"], ["MACD死叉", "macdDeadCross"], ["MACD红柱", "macdPositive"], ["MACD绿柱", "macdNegative"],
    ["KDJ金叉", "kdjGoldenCross"], ["KDJ死叉", "kdjDeadCross"], ["均线多头排列", "maBull"], ["多头排列", "maBull"], ["均线空头排列", "maBear"], ["空头排列", "maBear"],
    ["站上5日线", "aboveMa5"], ["站上10日线", "aboveMa10"], ["站上20日线", "aboveMa20"], ["站上60日线", "aboveMa60"],
    ["跌破5日线", "belowMa5"], ["跌破10日线", "belowMa10"], ["跌破20日线", "belowMa20"], ["跌破60日线", "belowMa60"],
    ["突破BOLL上轨", "aboveBollUpper"], ["突破布林上轨", "aboveBollUpper"], ["BOLL上轨上方", "aboveBollUpper"], ["布林上轨上方", "aboveBollUpper"],
    ["站上BOLL中轨", "aboveBollMid"], ["站上布林中轨", "aboveBollMid"], ["BOLL中轨上方", "aboveBollMid"], ["布林中轨上方", "aboveBollMid"],
    ["跌破BOLL下轨", "belowBollLower"], ["跌破布林下轨", "belowBollLower"], ["BOLL下轨下方", "belowBollLower"], ["布林下轨下方", "belowBollLower"],
    ["20日新高", "high20"], ["近20日新高", "high20"], ["20日新低", "low20"], ["近20日新低", "low20"], ["放量", "volumeExpansion"], ["缩量", "volumeContraction"]
  ];
  keywordConditions.forEach(([keyword, signal]) => {
    if (text.toUpperCase().includes(keyword.toUpperCase())) {
      add({ type: "signal", field: signal, scope: "technical", label: keyword });
      consumed.push(keyword);
    }
  });
  const crossPattern = /(MA|)(5|10|20|60)日?线?(上穿|下穿)(MA|)(5|10|20|60)日?线?/gi;
  while ((match = crossPattern.exec(text))) {
    add({ type: "cross", fast: Number(match[2]), direction: match[3] === "上穿" ? "up" : "down", slow: Number(match[5]), scope: "technical", label: match[0] });
    consumed.push(match[0]);
  }
  if (/排除ST|不要ST|非ST/i.test(text)) {
    add({ type: "excludeSt", scope: "base", label: "排除 ST / 退市" });
    consumed.push("排除ST", "不要ST", "非ST");
  }
  const fragments = text.split("、").filter(Boolean);
  const unparsed = fragments.filter(fragment => !consumed.some(value => fragment.includes(value) || value.includes(fragment)) && !/^(并且|且|同时|筛选|选股|股票|A股)+$/i.test(fragment));
  return { ...parsed, query: String(query || "").trim(), logic: "AND", conditions, unparsed: [...new Set(unparsed)] };
}

async function runNaturalStockScreen(query = "", options = {}) {
  const parsed = enhanceNaturalParsed(parseNaturalStockQuery(query), query);
  if (!parsed.conditions.length) throw new Error("没有识别出可执行条件，请加入数值比较或MACD/KDJ/RSI/BOLL/均线条件。	");
  let universe = [];
  let source = "";
  try {
    universe = await getEastmoneyAShareUniverse(Boolean(options.force));
    source = universe[0]?.source || "东方财富A股快照";
  } catch (error) {
    universe = await getSinaAShareUniverse();
    source = universe[0]?.source || "新浪A股行情";
  }
  const baseConditions = parsed.conditions.filter(condition => condition.scope === "base");
  const technicalConditions = parsed.conditions.filter(condition => condition.scope === "technical");
  let baseMatched = universe.filter(item => baseConditions.every(condition => naturalConditionPass(item, condition)));
  baseMatched.sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));
  const scanLimit = Math.max(30, Math.min(500, Number(options.scanLimit || 240)));
  const technicalPool = technicalConditions.length ? baseMatched.slice(0, scanLimit) : baseMatched;
  const rows = new Array(technicalPool.length);
  let cursor = 0;
  const concurrency = Math.max(1, Math.min(8, Number(options.concurrency || 6)));
  const worker = async () => {
    while (cursor < technicalPool.length) {
      const index = cursor++;
      const item = technicalPool[index];
      if (!technicalConditions.length) { rows[index] = item; continue; }
      try {
        const history = await getHistoricalKline(item.key, { days: 180, fqt: 1 });
        const technical = calculateTechnicalIndicators(history.rows || [], item);
        const enriched = { ...item, technical, technicalSource: history.source || "前复权历史日线" };
        if (technicalConditions.every(condition => naturalConditionPass(enriched, condition))) rows[index] = enriched;
      } catch (error) {
        rows[index] = null;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, technicalPool.length || 1) }, worker));
  const matched = rows.filter(Boolean).slice(0, Math.max(10, Math.min(200, Number(options.limit || 80))));
  const warnings = naturalScreenWarnings(parsed, source);
  return {
    success: true, query, parsed, items: matched, universeCount: universe.length, baseMatchedCount: baseMatched.length,
    technicalScannedCount: technicalPool.length, matchedCount: matched.length, source,
    technicalSource: technicalConditions.length ? "东方财富/腾讯前复权历史日线" : "未使用历史日线",
    warnings,
    asOf: new Date().toISOString(),
    note: technicalConditions.length && baseMatched.length > scanLimit ? `为避免限流，技术指标在成交额靠前的${scanLimit}只初筛股票中计算。` : "所有初筛候选均已执行技术指标计算。"
  };
}

function auditFieldMeta(value, source, asOf, options = {}) {
  const present = value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  return {
    source: source || "未取得来源",
    asOf: asOf || "",
    cached: Boolean(options.cached),
    status: present ? "available" : "missing",
    missingReason: present ? "" : (options.missingReason || "上游数据源未返回该字段")
  };
}

function candidateTradingFlags(item = {}) {
  const name = String(item.name || "");
  const pct = Math.abs(Number(item.pct));
  const limitPct = /ST/i.test(name) ? 5 : /^(?:sz30|sh688)/i.test(item.key || "") ? 20 : 10;
  return {
    adjustment: "前复权",
    corporateActionHandling: "历史收益使用前复权价格；现金分红和送转仍需公告复核",
    limitStatus: Number.isFinite(pct) && pct >= limitPct - 0.05 ? "疑似涨跌停" : "正常波动",
    delistingRisk: /(?:ST|退)/i.test(name) ? "名称含ST/退市风险标记" : "未见名称风险标记",
    pointInTimeUniverse: "当前股票池，不包含已退市历史成分；回测仍存在幸存者偏差"
  };
}

async function auditAShareCandidates(items = [], options = {}) {
  const candidates = (Array.isArray(items) ? items : []).slice(0, 60);
  const concurrency = Math.max(1, Math.min(6, Number(options.concurrency || 4)));
  const results = new Array(candidates.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < candidates.length) {
      const index = cursor++;
      const original = candidates[index] || {};
      const key = normalizeStockBriefKey(original.key || original.code || "");
      if (!key) {
        results[index] = { ...original, auditStatus: "failed", auditError: "无法识别股票代码" };
        continue;
      }
      try {
        const [financialRows, history] = await Promise.all([
          getFinancialsWithInstitutional([key]),
          getHistoricalKline(key, { days: 300 })
        ]);
        const financial = financialRows[0] || {};
        const rows = history.rows || [];
        const merged = {
          ...original,
          key,
          roe: financial.roe ?? original.roe ?? null,
          grossMargin: financial.grossMargin ?? original.grossMargin ?? null,
          netMargin: financial.netMargin ?? original.netMargin ?? null,
          revenueGrowth: financial.revenueGrowth ?? original.revenueGrowth ?? null,
          profitGrowth: financial.profitGrowth ?? original.profitGrowth ?? null,
          debtRatio: financial.debtRatio ?? original.debtRatio ?? null,
          revenue: financial.revenue ?? original.revenue ?? null,
          netProfit: financial.netProfit ?? original.netProfit ?? null,
          reportDate: financial.reportDate || original.reportDate || "",
          pct20: historicalPct(rows, 20),
          pct60: historicalPct(rows, 60),
          pct120: historicalPct(rows, 120),
          historyStart: rows[0]?.date || "",
          historyEnd: rows[rows.length - 1]?.date || "",
          historyCount: rows.length,
          latestVolume: Number(rows[rows.length - 1]?.volume),
          financialSource: financial.financialSource || financial.source || "",
          historySource: history.source || "历史日线",
          auditStatus: "verified",
          auditedAt: new Date().toISOString()
        };
        const quoteSource = original.source || original.quoteSource || "全市场行情快照";
        const quoteAsOf = original.updatedAt || original.asOf || merged.auditedAt;
        const financialSource = merged.financialSource || "东方财富财务";
        const historySource = merged.historySource || "历史日线";
        merged.fieldMeta = {
          price: auditFieldMeta(merged.price, quoteSource, quoteAsOf),
          pct: auditFieldMeta(merged.pct, quoteSource, quoteAsOf),
          amount: auditFieldMeta(merged.amount, quoteSource, quoteAsOf),
          turnoverRate: auditFieldMeta(merged.turnoverRate, quoteSource, quoteAsOf),
          pe: auditFieldMeta(merged.pe, quoteSource, quoteAsOf),
          pb: auditFieldMeta(merged.pb, quoteSource, quoteAsOf),
          marketCap: auditFieldMeta(merged.marketCap, quoteSource, quoteAsOf),
          roe: auditFieldMeta(merged.roe, financialSource, merged.reportDate),
          grossMargin: auditFieldMeta(merged.grossMargin, financialSource, merged.reportDate),
          netMargin: auditFieldMeta(merged.netMargin, financialSource, merged.reportDate),
          revenueGrowth: auditFieldMeta(merged.revenueGrowth, financialSource, merged.reportDate),
          profitGrowth: auditFieldMeta(merged.profitGrowth, financialSource, merged.reportDate),
          debtRatio: auditFieldMeta(merged.debtRatio, financialSource, merged.reportDate),
          pct20: auditFieldMeta(merged.pct20, historySource, merged.historyEnd),
          pct60: auditFieldMeta(merged.pct60, historySource, merged.historyEnd),
          pct120: auditFieldMeta(merged.pct120, historySource, merged.historyEnd)
        };
        merged.tradingControl = candidateTradingFlags(merged);
        const auditFields = ["roe", "grossMargin", "revenueGrowth", "profitGrowth", "debtRatio", "pct20", "pct60", "pct120"];
        const present = auditFields.filter(field => merged[field] !== null && merged[field] !== undefined && merged[field] !== "" && Number.isFinite(Number(merged[field]))).length;
        merged.auditCoverage = Math.round(present / auditFields.length * 100);
        results[index] = merged;
      } catch (error) {
        results[index] = { ...original, key, auditStatus: "failed", auditError: error.message || "深度复核失败", auditedAt: new Date().toISOString() };
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, candidates.length || 1) }, worker));
  const latestMarketDate = results.reduce((latest, item) => item?.historyEnd && item.historyEnd > latest ? item.historyEnd : latest, "");
  results.forEach(item => {
    if (!item || item.auditStatus !== "verified") return;
    item.tradingControl = {
      ...(item.tradingControl || {}),
      latestMarketDate,
      suspensionStatus: item.latestVolume === 0
        ? "最新交易日零成交，疑似停牌"
        : (latestMarketDate && item.historyEnd < latestMarketDate ? `日线停留在${item.historyEnd}，疑似停牌或数据缺失` : "交易日线正常")
    };
  });
  return results;
}

function stripHtmlTags(text = "") {
  return String(text || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function formatCninfoDate(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  const d = new Date(num);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function announcementRiskTag(title = "") {
  const text = String(title || "");
  if (/澄清|风险|异常|问询|监管|处罚|诉讼|仲裁|立案|调查|违规/.test(text)) return "风险/监管";
  if (/减持|质押|冻结|担保|债务|亏损/.test(text)) return "股东/财务风险";
  if (/业绩预告|业绩快报|年度报告|季度报告|半年度报告|审计/.test(text)) return "财报/业绩";
  if (/股东会|董事会|监事会|分红|权益分派/.test(text)) return "治理/分红";
  return "普通公告";
}

function announcementCacheKey(url = "") {
  return crypto.createHash("sha1").update(String(url || "")).digest("hex");
}

function announcementFileName(url = "", title = "") {
  const hash = announcementCacheKey(url).slice(0, 12);
  const stem = sanitizeFilename(title || "announcement").replace(/\.[^.]+$/, "").slice(0, 80) || "announcement";
  return `${hash}_${stem}.pdf`;
}

function normalizeAnnouncementText(text = "") {
  return normalizeDocumentText(String(text || ""))
    .replace(/第\s*\d+\s*页\s*共\s*\d+\s*页/g, " ")
    .replace(/证券代码[:：]\s*\d{6}\s*证券简称[:：]\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractRiskSentences(text = "", maxItems = 5) {
  const clean = normalizeAnnouncementText(text);
  if (!clean) return [];
  const parts = clean.split(/[。；;！？\n]/).map(item => item.trim()).filter(Boolean);
  const riskPattern = /风险|不确定|可能|不得|禁止|问询|监管|处罚|诉讼|仲裁|澄清|传闻|减持|质押|冻结|担保|亏损|下滑|终止|失败|无法|重大影响|异常/;
  const hits = parts.filter(item => riskPattern.test(item)).slice(0, maxItems);
  return hits.length ? hits : parts.slice(0, Math.min(3, maxItems));
}

function summarizeAnnouncementText(text = "", title = "") {
  const clean = normalizeAnnouncementText(text);
  const risks = extractRiskSentences(clean, 4);
  const lead = clean.slice(0, 420);
  return {
    summary: lead ? `${title ? title + "：" : ""}${lead}${clean.length > 420 ? "..." : ""}` : "",
    riskPoints: risks,
    textLength: clean.length
  };
}

async function downloadAnnouncementPdf(url, title = "") {
  const safeUrl = String(url || "").trim();
  if (!/^https?:\/\/.+\.pdf/i.test(safeUrl)) throw new Error("公告链接不是可识别的 PDF。");
  const fileName = announcementFileName(safeUrl, title);
  const filePath = path.join(ANNOUNCEMENTS_DIR, fileName);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) return { fileName, filePath, cached: true };
  const response = await fetch(safeUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "http://www.cninfo.com.cn/"
    }
  });
  if (!response.ok) throw new Error(`公告 PDF 下载失败：HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (!buffer.length) throw new Error("公告 PDF 内容为空。");
  fs.writeFileSync(filePath, buffer);
  return { fileName, filePath, cached: false };
}

async function extractAnnouncementPdf(url, title = "", options = {}) {
  const safeUrl = String(url || "").trim();
  if (!safeUrl) throw new Error("缺少公告 PDF 链接。");
  const cache = readAnnouncementCache();
  const cacheKey = announcementCacheKey(safeUrl);
  if (cache[cacheKey] && !options.force) return cache[cacheKey];
  const saved = await downloadAnnouncementPdf(safeUrl, title);
  let text = "";
  let pageCount = 0;
  try {
    const { PDFParse } = require("pdf-parse");
    const parser = new PDFParse({ data: fs.readFileSync(saved.filePath) });
    try {
      const result = await parser.getText();
      text = result.text || "";
      pageCount = Number(result.total || result.pages || 0);
    } finally {
      if (parser && typeof parser.destroy === "function") await parser.destroy();
    }
  } catch (error) {
    text = "";
  }
  const clean = normalizeAnnouncementText(text);
  const summary = summarizeAnnouncementText(clean, title);
  const payload = {
    url: safeUrl,
    title,
    fileName: saved.fileName,
    filePath: saved.filePath,
    pageCount,
    extractionMode: clean.length ? "text" : "empty",
    extractedAt: new Date().toISOString(),
    text: clean.slice(0, Math.max(1000, Math.min(30000, Number(options.textLimit) || 10000))),
    textLength: clean.length,
    summary: summary.summary,
    riskPoints: summary.riskPoints,
    needsOcr: clean.length < 80,
    source: "巨潮资讯公告 PDF"
  };
  cache[cacheKey] = payload;
  writeAnnouncementCache(cache);
  return payload;
}

async function queryCninfoAnnouncements(searchKey, limit = 5) {
  const q = String(searchKey || "").trim();
  if (!q) return [];
  const params = new URLSearchParams({
    stock: "",
    tabName: "fulltext",
    pageSize: String(Math.max(1, Math.min(20, Number(limit) || 5))),
    pageNum: "1",
    column: "",
    category: "",
    plate: "",
    seDate: "",
    searchkey: q,
    secid: "",
    sortName: "",
    sortType: "",
    isHLtitle: "true"
  });
  const response = await fetch("http://www.cninfo.com.cn/new/hisAnnouncement/query", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "http://www.cninfo.com.cn/",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });
  const data = await response.json().catch(() => ({}));
  const rows = Array.isArray(data.announcements) ? data.announcements : [];
  return rows.map(row => {
    const title = stripHtmlTags(row.announcementTitle || row.shortTitle || "");
    const secName = stripHtmlTags(row.secName || row.tileSecName || "");
    const adjunctUrl = String(row.adjunctUrl || "");
    return {
      key: normalizeStockBriefKey(row.secCode || ""),
      code: String(row.secCode || ""),
      name: secName,
      orgId: String(row.orgId || ""),
      title,
      date: formatCninfoDate(row.announcementTime),
      url: adjunctUrl ? `http://static.cninfo.com.cn/${adjunctUrl}` : "",
      type: String(row.adjunctType || "PDF"),
      sizeKb: row.adjunctSize || "",
      riskTag: announcementRiskTag(title),
      source: "巨潮资讯公告"
    };
  }).filter(item => item.code && item.title);
}

async function getStockAnnouncements(keys = [], limit = 4, options = {}) {
  const resolved = await resolveStockBriefKeys(keys || []);
  const rows = [];
  const seen = new Set();
  for (const item of resolved) {
    const code = String(item.key || "").replace(/^(sh|sz|bj)/i, "");
    const searches = [code, item.name, item.original].filter(Boolean);
    let hits = [];
    for (const search of searches) {
      hits = await queryCninfoAnnouncements(search, Math.max(6, limit * 2)).catch(() => []);
      hits = hits.filter(row => !code || row.code === code);
      if (hits.length) break;
    }
    for (const row of hits.slice(0, limit)) {
      const id = `${row.code}_${row.date}_${row.title}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const enriched = { ...row, key: item.key, resolvedName: item.name || row.name || item.original };
      if (options.includeText && row.url) {
        try {
          const extracted = await extractAnnouncementPdf(row.url, row.title, { textLimit: options.textLimit || 8000 });
          enriched.summary = extracted.summary || "";
          enriched.riskPoints = extracted.riskPoints || [];
          enriched.textLength = extracted.textLength || 0;
          enriched.extractionMode = extracted.extractionMode || "";
          enriched.needsOcr = !!extracted.needsOcr;
          enriched.text = options.includeFullText ? extracted.text : "";
          enriched.pdfCached = true;
        } catch (error) {
          enriched.summary = "";
          enriched.riskPoints = [];
          enriched.extractError = error.message || "公告 PDF 解析失败";
        }
      }
      rows.push(enriched);
    }
  }
  return rows;
}

function stockBriefStage(pct) {
  const value = Number(pct || 0);
  if (value >= 5) return "强势拉升，优先观察承接和是否放量过热";
  if (value >= 1.5) return "偏强运行，适合结合题材与历史观点复盘";
  if (value <= -5) return "大幅回撤，先检查风险边界和趋势破坏";
  if (value <= -1.5) return "偏弱震荡，先看支撑与资金是否继续流出";
  return "窄幅震荡，适合等待方向选择";
}

async function getStockBriefs(keys) {
  const cleanKeys = [...new Set((keys || []).map(normalizeStockBriefKey).filter(Boolean))];
  if (!cleanKeys.length) return [];
  const quotes = await getMarketQuotes(cleanKeys);
  const byKey = new Map(quotes.map(item => [item.key, item]));
  return cleanKeys.map(key => {
    const quote = byKey.get(key) || byKey.get(key.replace(/^s_/, "")) || null;
    const pct = quote ? Number(quote.pct || 0) : 0;
    return {
      key,
      name: quote ? quote.name : key,
      symbol: quote ? quote.symbol : key.replace(/^(sh|sz|bj|hk|us)/i, ""),
      price: quote ? quote.price : null,
      change: quote ? quote.change : null,
      pct: quote ? quote.pct : null,
      stage: quote ? stockBriefStage(pct) : "缺少实时行情，先基于本地知识库复盘",
      source: quote ? quote.source : "本地标的档案",
      updatedAt: quote ? quote.updatedAt : new Date().toISOString(),
      dataQuality: quote ? "行情已同步；财报和估值需后续接入正式数据源复核" : "仅本地档案，未取得行情"
    };
  });
}

async function getStockBriefs(keys, options = {}) {
  const cleanKeys = [...new Set((keys || []).map(normalizeStockBriefKey).filter(Boolean))];
  if (!cleanKeys.length) return [];
  const resolved = await resolveStockBriefKeys(cleanKeys);
  const resolvedKeys = resolved.map(item => item.key);
  const byResolvedKey = new Map(resolved.map(item => [item.key, item]));
  const quotes = await getMarketQuotesWithInstitutional(resolvedKeys);
  const byKey = new Map(quotes.map(item => [item.key, item]));
  const profiles = stockProfileMap();
  const financialRows = await getFinancialsWithInstitutional(resolvedKeys);
  const financials = new Map(financialRows.map(item => [item.key, item]));
  const announcementRows = options.includeAnnouncements ? await getStockAnnouncements(resolvedKeys, options.announcementLimit || 4, {
    includeText: !!options.includeAnnouncementText,
    textLimit: options.announcementTextLimit || 8000
  }) : [];
  const announcementsByKey = new Map();
  announcementRows.forEach(item => {
    if (!announcementsByKey.has(item.key)) announcementsByKey.set(item.key, []);
    announcementsByKey.get(item.key).push(item);
  });
  return resolvedKeys.map(key => {
    const resolvedInfo = byResolvedKey.get(key) || {};
    const quote = byKey.get(key) || byKey.get(key.replace(/^s_/, "")) || null;
    const profile = profiles.get(key) || {};
    const financial = financials.get(key) || {};
    const announcements = announcementsByKey.get(key) || [];
    const pct = quote ? Number(quote.pct || 0) : 0;
    const quoteSource = quote ? (quote.quoteSource || quote.source || "腾讯行情") : "";
    const financialSource = financial.financialSource || financial.source || "";
    const sourceChain = [resolvedInfo.source || "", quoteSource, financialSource, announcements.length ? "巨潮资讯公告" : ""].filter(Boolean);
    const hasInstitutionalQuote = /Wind|iFinD|Choice|机构/.test(quoteSource);
    const hasInstitutionalFinancial = /Wind|iFinD|Choice|机构/.test(financialSource);
    return {
      key,
      originalKey: resolvedInfo.original || key,
      resolvedSource: resolvedInfo.source || "",
      name: profile.name || financial.name || resolvedInfo.name || (quote ? quote.name : key),
      symbol: quote ? quote.symbol : key.replace(/^(sh|sz|bj|hk|us)/i, ""),
      sector: profile.sector || resolvedInfo.market || "",
      price: quote ? quote.price : null,
      change: quote ? quote.change : null,
      pct: quote ? quote.pct : null,
      pe: profile.pe || (quote && quote.pe) || "",
      pb: profile.pb || (quote && quote.pb) || "",
      marketCap: profile.marketCap || (quote && quote.marketCap ? `${quote.marketCap}亿` : ""),
      circulatingMarketCap: quote && quote.circulatingMarketCap ? `${quote.circulatingMarketCap}亿` : "",
      turnoverRate: quote && quote.turnoverRate ? quote.turnoverRate : "",
      amplitude: quote && quote.amplitude ? quote.amplitude : "",
      grossMargin: profile.grossMargin || financial.grossMargin || "",
      revenueGrowth: profile.revenueGrowth || financial.revenueGrowth || "",
      profitGrowth: profile.profitGrowth || financial.profitGrowth || "",
      netMargin: financial.netMargin || "",
      roe: financial.roe || "",
      revenue: financial.revenue || "",
      netProfit: financial.netProfit || "",
      eps: financial.eps || "",
      bps: financial.bps || "",
      financialReportDate: financial.reportDate || "",
      financialSource,
      quoteSource,
      fallbackQuoteSource: quote ? (quote.fallbackQuoteSource || "") : "",
      fallbackFinancialSource: financial.fallbackFinancialSource || "",
      latestAnnouncements: announcements,
      announcementSource: announcements.length ? "巨潮资讯公告" : "",
      profileNote: profile.note || (financial.reportDate ? `${financial.reportDate}：营收 ${financial.revenue || "-"}，归母净利 ${financial.netProfit || "-"}，ROE ${financial.roe || "-"}%` : ""),
      profileSource: profile.dataSource || sourceChain.join(" / "),
      profileUpdatedAt: profile.updatedAt || "",
      hasProfile: Boolean(profile.key || financial.source),
      stage: quote ? stockBriefStage(pct) : "缺少实时行情，先基于本地知识库复盘",
      source: quote ? quote.source : "本地标的档案",
      updatedAt: quote ? quote.updatedAt : new Date().toISOString(),
      dataQuality: quote
        ? (financialSource
            ? `行情来自${quoteSource || "行情接口"}；财务摘要来自${financialSource}，${hasInstitutionalQuote || hasInstitutionalFinancial ? "机构终端字段仍需人工复核口径" : "仍需人工复核"}`
            : (profile.key ? `行情来自${quoteSource || "行情接口"}；估值/财务来自本地股票档案，仍需人工复核` : `行情来自${quoteSource || "行情接口"}；财报和估值需后续接入正式数据源复核`))
        : (financialSource ? `财务摘要来自${financialSource}，未取得实时行情` : (profile.key ? "本地股票档案，未取得实时行情" : "仅本地档案，未取得行情")),
      institutionalReady: hasInstitutionalQuote || hasInstitutionalFinancial
    };
  });
}

async function checkDataSource(name, type, fn) {
  const started = Date.now();
  try {
    const rows = await fn();
    const count = Array.isArray(rows) ? rows.length : 0;
    return {
      name,
      type,
      ok: count > 0,
      count,
      latencyMs: Date.now() - started,
      message: count > 0 ? "可用" : "已连接但没有返回样本数据"
    };
  } catch (error) {
    return {
      name,
      type,
      ok: false,
      count: 0,
      latencyMs: Date.now() - started,
      message: error.message || "检测失败"
    };
  }
}

async function buildDataSourceHealth() {
  const institutional = await runInstitutionalProbe({ connect: false }).catch(error => ({
    success: false,
    error: error.message,
    providers: []
  }));
  const institutionalReady = (institutional.providers || []).some(item => item && item.importOk);
  const publicSources = await Promise.all([
    checkDataSource("腾讯行情", "quote", () => getMarketQuotes(["sh000001", "sz300308"])),
    checkDataSource("东方财富财务", "financial", () => getEastmoneyFinancials(["sz300308"])),
    checkDataSource("巨潮资讯公告", "announcement", () => getStockAnnouncements(["sz300308"], 1, { includeText: false }))
  ]);
  const publicReady = publicSources.some(item => item.ok);
  return {
    success: true,
    checkedAt: new Date().toISOString(),
    mode: institutionalReady ? "institutional-ready" : (publicReady ? "public-fallback" : "degraded"),
    modeText: institutionalReady ? "机构终端增强模式" : (publicReady ? "无机构账号公开数据模式" : "数据源降级模式"),
    institutionalReady,
    publicReady,
    qmtBridge: readQmtBridgeStatus(),
    institutional,
    publicSources,
    accountGuidance: [
      {
        id: "wind",
        name: "Wind",
        status: "需要本人/机构申请授权后安装终端与 WAPI SDK",
        url: "https://www.wind.com.cn/portal/zh/WFT/index.html"
      },
      {
        id: "ifind",
        name: "iFinD",
        status: "通常需要试用或机构账号，安装客户端/SDK 后可接入",
        url: "https://partners.51ifind.com/"
      },
      {
        id: "choice",
        name: "Choice",
        status: "可从东方财富 Choice 官方入口注册/下载，量化接口仍可能需要授权",
        url: "https://choice.eastmoney.com/product/download_center.html"
      }
    ],
    fallbackChain: [
      "行情：机构终端优先，失败回退腾讯行情",
      "财务：机构终端优先，失败回退东方财富财务",
      "公告：优先巨潮资讯公告 PDF 摘要",
      "观点：本地视频、书籍 OCR、用户记忆、我的策略"
    ]
  };
}

function buildInvestmentDataQuality() {
  const marketCache = readMarketCache(A_SHARE_UNIVERSE_CACHE_FILE);
  const sectorCache = readMarketCache(SECTOR_QUOTE_CACHE_FILE);
  const marketItems = marketCache?.items || [];
  const sectorItems = sectorCache?.items || [];
  const hasValue = value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  const coverage = (items, fields) => {
    if (!items.length || !fields.length) return 0;
    const available = items.reduce((total, item) => total + fields.filter(field => hasValue(item[field])).length, 0);
    return Math.round(available / (items.length * fields.length) * 100);
  };
  const transcriptCount = fs.existsSync(TRANSCRIPTS_DIR)
    ? fs.readdirSync(TRANSCRIPTS_DIR).filter(name => /\.txt$/i.test(name)).length
    : 0;
  const documentCount = readDocumentMetadata().length;
  const quoteFields = ["price", "pct", "amount", "turnoverRate", "pe", "pb", "marketCap"];
  const financialFields = ["roe", "grossMargin", "revenueGrowth", "profitGrowth", "debtRatio", "netMargin"];
  const trendFields = ["pct60", "pctYtd"];
  const quoteCoverage = coverage(marketItems, quoteFields);
  const financialCoverage = coverage(marketItems, financialFields);
  const trendCoverage = coverage(marketItems, trendFields);
  const score = Math.round(quoteCoverage * 0.45 + financialCoverage * 0.3 + trendCoverage * 0.15 + (sectorItems.length ? 10 : 0));
  return {
    success: true,
    checkedAt: new Date().toISOString(),
    score,
    grade: score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : "D",
    market: {
      count: marketItems.length,
      updatedAt: marketCache?.at || null,
      source: marketItems[0]?.source || "尚无成功缓存",
      quoteCoverage,
      financialCoverage,
      trendCoverage
    },
    sectors: {
      count: sectorItems.length,
      updatedAt: sectorCache?.at || null,
      source: sectorItems[0]?.source || "尚无成功缓存"
    },
    knowledge: {
      transcripts: transcriptCount,
      documents: documentCount,
      douyinMetadata: readMetadata().length
    },
    qmt: readQmtBridgeStatus(),
    methodology: {
      adjustment: "候选深度复核使用前复权日线",
      suspension: "以最新共同交易日和零成交量识别疑似停牌",
      limit: "按主板10%、创业板/科创板20%、ST 5%近似识别涨跌停",
      delisting: "名称风险标记可识别；完整退市历史仍需正式历史证券主表",
      universe: "当前筛选使用现存A股股票池，不是历史时点成分股"
    },
    warnings: [
      financialCoverage < 70 ? "全市场财务字段覆盖不足，财务条件只能标记待复核。" : "",
      trendCoverage < 70 ? "60日/年内趋势字段覆盖不足，需补历史行情。" : "",
      !sectorItems.length ? "尚无板块行情快照。" : ""
    ].filter(Boolean)
  };
}

function normalizeDouyinMetadata(info, shareUrl, parseError = "") {
  const id = info && (info.id || info.display_id) ? String(info.id || info.display_id) : (shareUrl.match(/\/video\/(\d+)/) || [])[1] || String(Date.now());
  const timestamp = info && info.timestamp ? new Date(info.timestamp * 1000).toISOString() : new Date().toISOString();
  return {
    id: "meta_" + id,
    source: "douyin",
    originalUrl: shareUrl,
    title: (info && (info.title || info.fulltitle)) || "抖音视频（待补充）",
    author: (info && (info.uploader || info.channel || info.creator)) || "抖音",
    description: (info && info.description) || "",
    thumbnail: (info && info.thumbnail) || "",
    duration: (info && info.duration) || 0,
    publishedAt: timestamp.slice(0, 10),
    likes: (info && (info.like_count || info.likes)) || 0,
    comments: (info && (info.comment_count || info.comments)) || 0,
    shares: (info && (info.repost_count || info.share_count)) || 0,
    tags: (info && Array.isArray(info.tags) ? info.tags : []),
    parseError,
    importedAt: new Date().toISOString()
  };
}

function upsertMetadata(item) {
  const items = readMetadata();
  const idx = items.findIndex(existing => existing.id === item.id || existing.originalUrl === item.originalUrl);
  if (idx >= 0) items[idx] = { ...items[idx], ...item };
  else items.unshift(item);
  writeMetadata(items);
  return item;
}

function metadataCsv(items) {
  const columns = ["title", "author", "publishedAt", "likes", "comments", "shares", "duration", "originalUrl", "description"];
  const esc = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [columns.join(","), ...items.map(item => columns.map(col => esc(item[col])).join(","))].join("\n");
}

function getVideoDirs() {
  const dirs = [VIDEOS_DIR, LEGACY_VIDEOS_DIR];
  if (fs.existsSync(VIDEO_FOLDERS_FILE)) {
    const extra = fs.readFileSync(VIDEO_FOLDERS_FILE, "utf8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
    dirs.push(...extra);
  }
  return [...new Set(dirs.map(dir => path.resolve(dir)))].filter(dir => fs.existsSync(dir));
}

function isAllowedVideoPath(filePath) {
  const resolved = path.resolve(filePath);
  return getVideoDirs().some(dir => resolved === dir || resolved.startsWith(dir + path.sep));
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}

async function getEastmoneySectorQuotes(names = []) {
  const wanted = [...new Set((names || []).map(name => String(name || "").trim()).filter(Boolean))];
  const params = new URLSearchParams({
    pn: "1",
    pz: "100",
    po: "1",
    np: "1",
    fltt: "2",
    invt: "2",
    fid: "f3",
    fs: "m:90+t:2,m:90+t:3",
    fields: "f12,f14,f2,f3,f6,f8,f20,f24,f25,f104,f105,f128,f136"
  });
  const response = await fetch(`https://82.push2.eastmoney.com/api/qt/clist/get?${params.toString()}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://quote.eastmoney.com/"
    }
  });
  if (!response.ok) throw new Error(`东方财富板块接口失败 ${response.status}`);
  const data = await response.json();
  const rows = Array.isArray(data?.data?.diff) ? data.data.diff : [];
  const normalized = rows.map(row => ({
    code: String(row.f12 || ""),
    name: String(row.f14 || ""),
    price: row.f2,
    pct: Number(row.f3),
    amount: Number(row.f6),
    turnoverRate: Number(row.f8),
    marketCap: row.f20,
    pct60: Number(row.f24),
    pctYtd: Number(row.f25),
    upCount: Number(row.f104),
    downCount: Number(row.f105),
    leader: String(row.f128 || ""),
    leaderPct: Number(row.f136),
    source: "东方财富板块"
  })).filter(row => row.name);
  writeMarketCache(SECTOR_QUOTE_CACHE_FILE, normalized);
  if (!wanted.length) return normalized.slice(0, 200);
  return wanted.map(name => {
    const compact = name.replace(/\s+/g, "");
    const matched = normalized.find(row => row.name === name)
      || normalized.find(row => row.name.includes(compact) || compact.includes(row.name))
      || normalized.find(row => compact.includes(row.name.replace(/概念|板块|指数|ETF/gi, "")));
    return matched ? { ...matched, query: name } : { name, query: name, source: "未匹配东方财富板块" };
  });
}

async function getSinaSectorQuotes(names = []) {
  const response = await fetch("https://vip.stock.finance.sina.com.cn/q/view/newSinaHy.php", {
    headers: { Referer: "https://finance.sina.com.cn/", "User-Agent": "Mozilla/5.0" }
  });
  if (!response.ok) throw new Error(`新浪行业板块接口失败 ${response.status}`);
  const text = decodeTencentQuote(Buffer.from(await response.arrayBuffer()));
  const jsonText = text.slice(text.indexOf("{")).replace(/;\s*$/, "");
  const payload = JSON.parse(jsonText || "{}");
  const normalized = Object.values(payload).map(value => {
    const parts = String(value || "").split(",");
    return {
      code: parts[0] || "", name: parts[1] || "", price: Number(parts[3]), pct: Number(parts[5]),
      amount: Number(parts[7]), turnoverRate: null, marketCap: null, pct60: null, pctYtd: null,
      upCount: null, downCount: null, leaderCode: parts[8] || "", leaderPct: Number(parts[9]),
      leader: parts[12] || "", source: "新浪财经行业板块实时行情"
    };
  }).filter(row => row.name && Number.isFinite(row.pct));
  if (!normalized.length) throw new Error("新浪行业板块返回空数据");
  writeMarketCache(SECTOR_QUOTE_CACHE_FILE, normalized);
  const wanted = [...new Set((names || []).map(name => String(name || "").trim()).filter(Boolean))];
  if (!wanted.length) return normalized;
  return wanted.map(name => {
    const matched = normalized.find(row => row.name === name)
      || normalized.find(row => row.name.includes(name) || name.includes(row.name));
    return matched ? { ...matched, query: name } : { name, query: name, source: "新浪行业板块未匹配" };
  });
}

let aShareUniverseCache = { at: 0, items: [] };

function aShareMarketName(code = "") {
  if (/^688/.test(code)) return "科创板";
  if (/^30/.test(code)) return "创业板";
  if (/^[48]/.test(code)) return "北交所";
  return "主板";
}

function aShareQuoteKey(code = "") {
  if (/^6/.test(code)) return "sh" + code;
  if (/^[48]/.test(code)) return "bj" + code;
  return "sz" + code;
}

async function getEastmoneyAShareUniverse(force = false) {
  if (!force && aShareUniverseCache.items.length && Date.now() - aShareUniverseCache.at < 5 * 60 * 1000) return aShareUniverseCache.items;
  const fetchPage = async pn => {
    const params = new URLSearchParams({
      pn: String(pn), pz: "100", po: "1", np: "1", fltt: "2", invt: "2", fid: "f6",
      fs: "m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23",
      fields: "f12,f14,f2,f3,f6,f8,f9,f10,f20,f21,f23,f24,f25,f37,f40,f41,f45,f46,f49,f57"
    });
    const response = await fetch(`https://82.push2.eastmoney.com/api/qt/clist/get?${params.toString()}`, {
      headers: { Referer: "https://quote.eastmoney.com/", "User-Agent": "Mozilla/5.0" }
    });
    if (!response.ok) throw new Error(`东方财富 A 股列表接口失败 ${response.status}`);
    return response.json().catch(() => ({}));
  };
  const first = await fetchPage(1);
  const total = Number(first?.data?.total || 0);
  const rows = Array.isArray(first?.data?.diff) ? [...first.data.diff] : [];
  const pageCount = Math.max(1, Math.ceil(total / 100));
  for (let start = 2; start <= pageCount; start += 8) {
    const pages = [];
    for (let page = start; page < Math.min(start + 8, pageCount + 1); page += 1) pages.push(page);
    const payloads = await Promise.all(pages.map(fetchPage));
    payloads.forEach(data => { if (Array.isArray(data?.data?.diff)) rows.push(...data.data.diff); });
  }
  const items = rows.map(row => {
    const code = String(row.f12 || "");
    const revenue = Number(row.f40);
    const netProfit = Number(row.f45);
    return {
      key: aShareQuoteKey(code), code, name: String(row.f14 || ""), market: aShareMarketName(code),
      price: Number(row.f2), pct: Number(row.f3), amount: Number(row.f6) / 100000000,
      turnoverRate: Number(row.f8), pe: Number(row.f9), volumeRatio: Number(row.f10),
      marketCap: Number(row.f20) / 100000000, circulatingMarketCap: Number(row.f21) / 100000000,
      pb: Number(row.f23), pct60: Number(row.f24), pctYtd: Number(row.f25), roe: Number(row.f37),
      revenue: Number.isFinite(revenue) ? revenue / 100000000 : null,
      revenueGrowth: Number(row.f41), netProfit: Number.isFinite(netProfit) ? netProfit / 100000000 : null,
      profitGrowth: Number(row.f46), grossMargin: Number(row.f49), debtRatio: Number(row.f57),
      netMargin: Number.isFinite(revenue) && revenue !== 0 && Number.isFinite(netProfit) ? netProfit / revenue * 100 : null,
      source: "东方财富 A 股行情/财务快照"
    };
  }).filter(item => /^\d{6}$/.test(item.code) && item.name && Number.isFinite(item.price) && item.price > 0);
  aShareUniverseCache = { at: Date.now(), items };
  writeMarketCache(A_SHARE_UNIVERSE_CACHE_FILE, items);
  return items;
}

async function getSinaAShareUniverse() {
  const endpoint = "https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData";
  const headers = { Referer: "https://finance.sina.com.cn/", "User-Agent": "Mozilla/5.0" };
  const countResponse = await fetch("https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeStockCount?node=hs_a", { headers });
  if (!countResponse.ok) throw new Error(`新浪 A 股数量接口失败 ${countResponse.status}`);
  const count = Number(String(await countResponse.text()).replace(/\D/g, "")) || 5600;
  const pageCount = Math.ceil(count / 100);
  const fetchPage = async page => {
    const params = new URLSearchParams({ page: String(page), num: "100", sort: "amount", asc: "0", node: "hs_a", symbol: "", _s_r_a: "page" });
    const response = await fetch(`${endpoint}?${params.toString()}`, { headers });
    if (!response.ok) throw new Error(`新浪 A 股行情接口失败 ${response.status}`);
    const data = await response.json().catch(() => []);
    return Array.isArray(data) ? data : [];
  };
  const rows = [];
  for (let start = 1; start <= pageCount; start += 10) {
    const pages = Array.from({ length: Math.min(10, pageCount - start + 1) }, (_, index) => start + index);
    const payloads = await Promise.all(pages.map(fetchPage));
    payloads.forEach(items => rows.push(...items));
  }
  const items = rows.map(row => {
    const code = String(row.code || "");
    return {
      key: String(row.symbol || aShareQuoteKey(code)), code, name: String(row.name || ""), market: aShareMarketName(code),
      price: Number(row.trade), pct: Number(row.changepercent), amount: Number(row.amount) / 100000000,
      turnoverRate: Number(row.turnoverratio), pe: Number(row.per), pb: Number(row.pb),
      marketCap: Number(row.mktcap) / 10000, circulatingMarketCap: Number(row.nmc) / 10000,
      pct60: null, pctYtd: null, roe: null, revenue: null, revenueGrowth: null, netProfit: null,
      profitGrowth: null, grossMargin: null, debtRatio: null, netMargin: null,
      source: "新浪财经 A 股实时行情（财务指标待复核）"
    };
  }).filter(item => /^\d{6}$/.test(item.code) && item.name && Number.isFinite(item.price) && item.price > 0);
  if (!items.length) throw new Error("新浪 A 股行情返回空数据");
  aShareUniverseCache = { at: Date.now(), items };
  writeMarketCache(A_SHARE_UNIVERSE_CACHE_FILE, items);
  return items;
}

function screenRuleNumber(rules, key) {
  if (rules[key] === "" || rules[key] === null || rules[key] === undefined) return null;
  const value = Number(rules[key]);
  return Number.isFinite(value) ? value : null;
}

function aShareStrategyScore(item = {}) {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const quality = clamp(item.roe, 0, 20) / 20 * 20 + clamp(item.grossMargin, 0, 50) / 50 * 10 + clamp(item.netMargin, 0, 20) / 20 * 10;
  const growth = (clamp(item.revenueGrowth, -20, 50) + 20) / 70 * 12 + (clamp(item.profitGrowth, -30, 80) + 30) / 110 * 18;
  const momentum = (clamp(item.pct60, -30, 60) + 30) / 90 * 15 + (clamp(item.pct, -5, 8) + 5) / 13 * 5;
  const liquidity = clamp(Math.log10(Math.max(1, item.amount)), 0, 2) / 2 * 5;
  const valuation = item.pe > 0 && item.pe <= 60 ? 5 : item.pe > 60 && item.pe <= 100 ? 2 : 0;
  return Math.round(Math.max(0, Math.min(100, quality + growth + momentum + liquidity + valuation)));
}

function screenAShareUniverse(items = [], rules = {}) {
  const market = String(rules.market || "all");
  const tests = [
    ["price", "priceMin", "min"], ["price", "priceMax", "max"], ["pct", "pctMin", "min"], ["pct", "pctMax", "max"],
    ["turnoverRate", "turnoverMin", "min"], ["turnoverRate", "turnoverMax", "max"], ["pe", "peMin", "min"], ["pe", "peMax", "max"],
    ["pb", "pbMax", "max"], ["marketCap", "marketCapMin", "min"], ["marketCap", "marketCapMax", "max"],
    ["amount", "amountMin", "min"], ["pct60", "pct60Min", "min"], ["pct60", "pct60Max", "max"],
    ["roe", "roeMin", "min"], ["grossMargin", "grossMarginMin", "min"], ["revenueGrowth", "revenueGrowthMin", "min"],
    ["profitGrowth", "profitGrowthMin", "min"], ["debtRatio", "debtRatioMax", "max"]
  ];
  const matched = items.filter(item => {
    if (rules.excludeSt !== false && /(?:ST|退)/i.test(item.name)) return false;
    if (market !== "all" && item.market !== market) return false;
    return tests.every(([field, ruleKey, direction]) => {
      const threshold = screenRuleNumber(rules, ruleKey);
      if (threshold === null) return true;
      const rawValue = item[field];
      if (rawValue === null || rawValue === undefined || rawValue === "") return true;
      const value = Number(rawValue);
      if (!Number.isFinite(value)) return true;
      return direction === "min" ? value >= threshold : value <= threshold;
    });
  }).map(item => {
    const reasons = [];
    if (Number(item.roe) >= 10) reasons.push(`ROE ${item.roe.toFixed(2)}%`);
    if (Number(item.revenueGrowth) > 0 && Number(item.profitGrowth) > 0) reasons.push("营收利润双增长");
    if (Number(item.pct60) > 0) reasons.push(`60日 ${item.pct60.toFixed(2)}%`);
    if (Number(item.pe) > 0 && Number(item.pe) <= 40) reasons.push(`PE ${item.pe.toFixed(2)}`);
    const missingChecks = tests.filter(([field, ruleKey]) => {
      if (screenRuleNumber(rules, ruleKey) === null) return false;
      const value = item[field];
      return value === null || value === undefined || value === "" || !Number.isFinite(Number(value));
    }).map(([, ruleKey]) => ruleKey);
    if (missingChecks.length) reasons.push(`待复核 ${missingChecks.length} 项财务/趋势条件`);
    return { ...item, strategyScore: aShareStrategyScore(item), reasons, missingChecks };
  });
  const sortBy = String(rules.sortBy || "strategyScore");
  const lowerFirst = ["pe", "pb", "debtRatio"].includes(sortBy);
  matched.sort((a, b) => lowerFirst ? (Number(a[sortBy]) || 0) - (Number(b[sortBy]) || 0) : (Number(b[sortBy]) || 0) - (Number(a[sortBy]) || 0));
  return matched.slice(0, Math.max(10, Math.min(200, Number(rules.limit || 50))));
}

function readRequestBody(req, limit = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > limit) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function readAgentConfig() {
  try {
    if (!fs.existsSync(AGENT_CONFIG_FILE)) return {};
    return JSON.parse(fs.readFileSync(AGENT_CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeAgentConfig(config) {
  fs.writeFileSync(AGENT_CONFIG_FILE, JSON.stringify(config, null, 2), "utf8");
}

function readAgentLogs() {
  try {
    if (!fs.existsSync(AGENT_LOG_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(AGENT_LOG_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeAgentLogs(logs) {
  fs.writeFileSync(AGENT_LOG_FILE, JSON.stringify((logs || []).slice(-300), null, 2), "utf8");
}

function appendAgentLog(entry = {}) {
  const provider = entry.provider || {};
  const logs = readAgentLogs();
  logs.push({
    id: crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(12).toString("hex"),
    at: new Date().toISOString(),
    ok: Boolean(entry.ok),
    kind: entry.kind || "chat",
    provider: provider.id || entry.providerId || "",
    providerName: provider.name || entry.providerName || "",
    model: provider.model || entry.model || "",
    endpoint: String(provider.endpoint || entry.endpoint || "").startsWith("cli:") ? "cli:codebuddy" : (provider.endpoint || entry.endpoint ? "http" : ""),
    route: entry.route || "",
    responsePath: provider.responsePath || entry.responsePath || "",
    durationMs: Number(entry.durationMs || 0),
    contextItems: Number(entry.contextItems || 0),
    answerLength: Number(entry.answerLength || 0),
    error: entry.error ? String(entry.error).slice(0, 500) : ""
  });
  writeAgentLogs(logs);
}

function clearAgentLogs() {
  writeAgentLogs([]);
}

function classifyAgentLogIssue(log = {}) {
  const text = String(log.error || "").toLowerCase();
  if (!log.ok && /api key|key|密钥|ck_|sk_|unauthorized|401|403/.test(text)) {
    return { type: "key", label: "密钥问题", advice: "重新粘贴完整 API Key，确认没有星号、省略号或多余空格。" };
  }
  if (!log.ok && /endpoint|url|enotfound|econnrefused|404|405/.test(text)) {
    return { type: "endpoint", label: "接口地址问题", advice: "检查 endpoint 是否为完整 chat/completions 地址；OpenAI-compatible 通常以 /v1/chat/completions 结尾。" };
  }
  if (!log.ok && /timeout|abort|timed out|超时/.test(text)) {
    return { type: "timeout", label: "模型超时", advice: "降低上下文长度，或换更快的供应商；本地会先走快速模拟兜底。" };
  }
  if (!log.ok && /json|parse|path|content|解析/.test(text)) {
    return { type: "parse", label: "返回格式问题", advice: "在配置弹窗点“测试解析”，用建议路径填入返回内容路径。" };
  }
  if (!log.ok) {
    return { type: "unknown", label: "未知调用错误", advice: "打开调用日志看原始错误，再用测试解析确认供应商返回结构。" };
  }
  if (Number(log.durationMs || 0) > 20000) {
    return { type: "slow", label: "响应偏慢", advice: "建议压缩上下文或改用更快模型；超过 25 秒前端会走本地兜底。" };
  }
  return { type: "ok", label: "正常", advice: "最近调用正常。" };
}

function buildAgentDiagnostics() {
  const providers = agentProviders();
  const logs = readAgentLogs();
  const recent = logs.slice(-80);
  const failures = recent.filter(log => !log.ok);
  const slow = recent.filter(log => log.ok && Number(log.durationMs || 0) > 20000);
  const providerHealth = providers
    .filter(provider => provider.id !== "mock")
    .map(provider => {
      const providerLogs = recent.filter(log => log.provider === provider.id);
      const last = providerLogs[providerLogs.length - 1] || null;
      const issues = [];
      if (!provider.configured) issues.push("未配置完整 key/endpoint");
      if (!provider.model) issues.push("缺模型名");
      if (!provider.responsePath) issues.push("缺返回路径");
      if (last && !last.ok) issues.push(classifyAgentLogIssue(last).label);
      if (last && last.ok && Number(last.durationMs || 0) > 20000) issues.push("最近响应偏慢");
      return {
        id: provider.id,
        name: provider.name,
        configured: Boolean(provider.configured),
        model: provider.model || provider.defaultModel || "",
        endpoint: String(provider.endpoint || "").startsWith("cli:") ? "cli:codebuddy" : (provider.endpoint ? "http" : ""),
        responsePath: provider.responsePath || provider.defaultResponsePath || "",
        calls: providerLogs.length,
        failures: providerLogs.filter(log => !log.ok).length,
        lastAt: last ? last.at : "",
        lastDurationMs: last ? last.durationMs : 0,
        issues
      };
    });
  const issueCounts = recent.reduce((acc, log) => {
    const issue = classifyAgentLogIssue(log);
    if (issue.type !== "ok") acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {});
  const topIssueType = Object.entries(issueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  const issueCatalog = {
    key: "优先检查 API Key 是否完整。",
    endpoint: "优先检查 endpoint 地址。",
    timeout: "优先降低上下文或换更快模型。",
    parse: "优先测试解析并修正返回路径。",
    slow: "最近响应偏慢，建议压缩上下文。",
    unknown: "查看最近失败日志定位具体错误。"
  };
  const unconfigured = providerHealth.filter(item => !item.configured);
  const summary = failures.length
    ? `最近 ${recent.length} 次调用里有 ${failures.length} 次失败，主要建议：${issueCatalog[topIssueType] || "查看失败日志。"}`
    : slow.length
    ? `最近 ${recent.length} 次调用没有失败，但有 ${slow.length} 次响应偏慢。`
    : recent.length
    ? `最近 ${recent.length} 次调用整体正常。`
    : "还没有调用记录，建议先用配置弹窗的“测试解析”跑一次。";
  const suggestions = [
    unconfigured.length ? `未配置供应商：${unconfigured.map(item => item.name).join("、")}。只配置你常用的即可。` : "",
    issueCatalog[topIssueType] || "",
    "新接模型时顺序固定：套用预设 -> 填 key -> 测试解析 -> 保存。"
  ].filter(Boolean);
  return {
    success: true,
    generatedAt: new Date().toISOString(),
    summary,
    suggestions,
    stats: {
      recentCalls: recent.length,
      failures: failures.length,
      slowCalls: slow.length,
      configuredProviders: providerHealth.filter(item => item.configured).length
    },
    providerHealth,
    recentIssues: recent.slice(-12).reverse().map(log => ({ ...log, diagnosis: classifyAgentLogIssue(log) }))
  };
}

function emptyAgentMemory() {
  return { conversations: [], memories: [], preferences: [], stockFocus: [] };
}

function readAgentMemory() {
  try {
    if (!fs.existsSync(AGENT_MEMORY_FILE)) return emptyAgentMemory();
    const data = JSON.parse(fs.readFileSync(AGENT_MEMORY_FILE, "utf8"));
    return {
      conversations: Array.isArray(data.conversations) ? data.conversations : [],
      memories: Array.isArray(data.memories) ? data.memories : [],
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      stockFocus: Array.isArray(data.stockFocus) ? data.stockFocus : []
    };
  } catch {
    return emptyAgentMemory();
  }
}

function writeAgentMemory(data) {
  const normalized = {
    conversations: Array.isArray(data.conversations) ? data.conversations.slice(-240) : [],
    memories: Array.isArray(data.memories) ? data.memories.slice(-200) : [],
    preferences: Array.isArray(data.preferences) ? data.preferences.slice(-100) : [],
    stockFocus: Array.isArray(data.stockFocus) ? data.stockFocus.slice(-120) : []
  };
  fs.writeFileSync(AGENT_MEMORY_FILE, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

function makeMemoryId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeMemoryType(type) {
  if (type === "preference") return "preferences";
  if (type === "stock_focus" || type === "stockFocus") return "stockFocus";
  if (type === "conversation") return "conversations";
  return "memories";
}

function addAgentMemory(payload = {}) {
  const text = String(payload.text || "").trim();
  if (!text) throw new Error("Memory text is empty.");
  const data = readAgentMemory();
  const bucket = normalizeMemoryType(payload.type);
  const existing = data[bucket].find(item => item && item.text === text);
  if (existing) {
    existing.at = new Date().toISOString();
    existing.source = String(payload.source || existing.source || "manual").slice(0, 80);
    if (Array.isArray(payload.tags) && payload.tags.length) {
      existing.tags = [...new Set([...(existing.tags || []), ...payload.tags.map(String)])].slice(0, 12);
    }
    writeAgentMemory(data);
    return existing;
  }
  const item = {
    id: makeMemoryId(bucket),
    type: payload.type || "memory",
    text: text.slice(0, 5000),
    source: String(payload.source || "manual").slice(0, 80),
    tags: Array.isArray(payload.tags) ? payload.tags.map(String).slice(0, 12) : [],
    at: new Date().toISOString()
  };
  data[bucket].push(item);
  writeAgentMemory(data);
  return item;
}

function deleteAgentMemory(id) {
  const data = readAgentMemory();
  let removed = false;
  for (const key of ["conversations", "memories", "preferences", "stockFocus"]) {
    const before = data[key].length;
    data[key] = data[key].filter(item => item && item.id !== id);
    removed = removed || before !== data[key].length;
  }
  writeAgentMemory(data);
  return removed;
}

function appendAgentConversation(payload = {}) {
  const user = String(payload.user || "").trim();
  const assistant = String(payload.assistant || "").trim();
  if (!user && !assistant) return null;
  const data = readAgentMemory();
  const item = {
    id: makeMemoryId("conversation"),
    at: new Date().toISOString(),
    user: user.slice(0, 8000),
    assistant: assistant.slice(0, 12000),
    provider: payload.provider || "",
    route: payload.route || "",
    contextSummary: payload.contextSummary || ""
  };
  data.conversations.push(item);
  writeAgentMemory(data);
  return item;
}

function searchTokens(value) {
  const text = String(value || "").toLowerCase();
  const ascii = text.match(/[a-z0-9_]{2,}/g) || [];
  const chinese = (text.match(/[\u4e00-\u9fa5]{2,}/g) || []).flatMap(part => {
    const tokens = [part];
    for (let i = 0; i < part.length - 1; i += 1) tokens.push(part.slice(i, i + 2));
    return tokens;
  });
  return [...new Set([...ascii, ...chinese])].slice(0, 80);
}

function scoreTextByTokens(value, tokens) {
  const text = String(value || "").toLowerCase();
  return tokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
}

function summarizeContextItems(context = []) {
  return (Array.isArray(context) ? context : [])
    .map(item => String(item && item.content ? item.content : "").trim())
    .filter(Boolean)
    .slice(-8)
    .join("\n\n")
    .slice(0, 4000);
}

function searchAgentContext(query, context = []) {
  const data = readAgentMemory();
  const tokens = searchTokens(query);
  const pick = (items, fields, limit) => {
    return (items || [])
      .map(item => {
        const haystack = fields.map(field => item && item[field]).join("\n");
        return { item, score: scoreTextByTokens(haystack, tokens) };
      })
      .filter(row => row.score > 0)
      .sort((a, b) => b.score - a.score || String(b.item.at || "").localeCompare(String(a.item.at || "")))
      .slice(0, limit)
      .map(row => row.item);
  };
  const recentConversations = [...data.conversations].slice(-6).reverse();
  return {
    query,
    contextSummary: summarizeContextItems(context),
    recentConversations,
    matchedConversations: pick(data.conversations, ["user", "assistant"], 6),
    memories: pick(data.memories, ["text"], 12),
    preferences: pick(data.preferences, ["text"], 8),
    stockFocus: pick(data.stockFocus, ["text"], 10)
  };
}

function knowledgeBackupPayload() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    agentMemory: readAgentMemory()
  };
}

function restoreKnowledgeBackup(payload = {}) {
  const memory = payload.agentMemory || payload.memory || payload;
  const restored = writeAgentMemory({
    conversations: Array.isArray(memory.conversations) ? memory.conversations : [],
    memories: Array.isArray(memory.memories) ? memory.memories : [],
    preferences: Array.isArray(memory.preferences) ? memory.preferences : [],
    stockFocus: Array.isArray(memory.stockFocus) ? memory.stockFocus : []
  });
  return { agentMemory: restored };
}

function configValue(config, provider, key, envName, fallback = "") {
  return process.env[envName] || (config[provider] && config[provider][key]) || fallback;
}

function isUsableApiKey(value) {
  const key = String(value || "").trim();
  return key.length >= 20 && !key.includes("*");
}

function responsePathFor(config, providerId, fallback = "choices.0.message.content") {
  return String((config[providerId] && config[providerId].responsePath) || fallback || "").trim();
}

function agentProviders() {
  const config = readAgentConfig();
  const list = [
    { id: "mock", name: "本地模拟", model: "local-rule", configured: true, responsePath: "answer", templateHelp: "本地规则模拟，不需要 API Key。" },
    { id: "openai", name: "OpenAI", keyEnv: "OPENAI_API_KEY", modelEnv: "OPENAI_MODEL", defaultModel: "gpt-4o-mini", endpoint: "https://api.openai.com/v1/chat/completions", responsePath: "choices.0.message.content", templateHelp: "OpenAI Chat Completions 兼容格式，通常只需要填写 sk_... key。" },
    { id: "compatible", name: "OpenAI-compatible", keyEnv: "CUSTOM_AGENT_API_KEY", modelEnv: "CUSTOM_AGENT_MODEL", endpointEnv: "CUSTOM_AGENT_API_URL", defaultModel: "gpt-4o-mini", endpoint: "", responsePath: "choices.0.message.content", templateHelp: "通用 OpenAI-compatible 模板。适合第三方兼容接口：填 key、endpoint 和模型名，返回路径通常保持 choices.0.message.content。" },
    { id: "deepseek", name: "DeepSeek", keyEnv: "DEEPSEEK_API_KEY", modelEnv: "DEEPSEEK_MODEL", defaultModel: "deepseek-chat", endpoint: "https://api.deepseek.com/chat/completions", responsePath: "choices.0.message.content", templateHelp: "DeepSeek 官方 OpenAI-compatible 接口。" },
    { id: "doubao", name: "豆包/火山方舟", keyEnv: "ARK_API_KEY", modelEnv: "DOUBAO_MODEL", defaultModel: "doubao-seed-1-6", endpoint: "https://ark.cn-beijing.volces.com/api/v3/chat/completions", responsePath: "choices.0.message.content", templateHelp: "火山方舟兼容 Chat Completions，填 ARK_API_KEY 和模型名即可。" },
    { id: "qwen", name: "通义千问", keyEnv: "DASHSCOPE_API_KEY", modelEnv: "QWEN_MODEL", defaultModel: "qwen-plus", endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", responsePath: "choices.0.message.content", templateHelp: "DashScope OpenAI-compatible 模式。" },
    { id: "zhipu", name: "智谱 GLM", keyEnv: "ZHIPU_API_KEY", modelEnv: "ZHIPU_MODEL", defaultModel: "glm-4-flash", endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions", responsePath: "choices.0.message.content", templateHelp: "智谱 GLM Chat Completions 接口。" },
    { id: "moonshot", name: "Moonshot Kimi", keyEnv: "MOONSHOT_API_KEY", modelEnv: "MOONSHOT_MODEL", defaultModel: "moonshot-v1-8k", endpoint: "https://api.moonshot.cn/v1/chat/completions", responsePath: "choices.0.message.content", templateHelp: "Moonshot Kimi OpenAI-compatible 接口。" },
    { id: "siliconflow", name: "硅基流动", keyEnv: "SILICONFLOW_API_KEY", modelEnv: "SILICONFLOW_MODEL", defaultModel: "Qwen/Qwen2.5-7B-Instruct", endpoint: "https://api.siliconflow.cn/v1/chat/completions", responsePath: "choices.0.message.content", templateHelp: "硅基流动 OpenAI-compatible 接口。" },
    { id: "codebuddy", name: "CodeBuddy CLI", keyEnv: "CODEBUDDY_API_KEY", modelEnv: "CODEBUDDY_MODEL", defaultModel: "CodeBuddy CLI", endpoint: "cli:codebuddy", responsePath: "answer", templateHelp: "本机 CLI 模式，endpoint 固定 cli:codebuddy，返回路径 answer。" },
    { id: "workbuddy", name: "WorkBuddy/自定义", keyEnv: "WORKBUDDY_API_KEY", modelEnv: "WORKBUDDY_MODEL", endpointEnv: "WORKBUDDY_API_URL", defaultModel: "custom-model", endpoint: "", responsePath: "choices.0.message.content", templateHelp: "自定义 HTTP 接口默认按 OpenAI-compatible 解析；如果是 ck_ key 且 endpoint 留空，会自动走 CodeBuddy CLI。" }
  ];
  return list.map(item => {
    const apiKey = item.keyEnv ? configValue(config, item.id, "apiKey", item.keyEnv) : "";
    const model = item.modelEnv ? configValue(config, item.id, "model", item.modelEnv, item.defaultModel) : item.model;
    let endpoint = item.endpointEnv ? configValue(config, item.id, "endpoint", item.endpointEnv, item.endpoint) : (config[item.id] && config[item.id].endpoint) || item.endpoint;
    const usableApiKey = isUsableApiKey(apiKey);
    const looksLikeCodeBuddyKey = /^ck_/i.test(apiKey);
    if (item.id === "workbuddy" && looksLikeCodeBuddyKey && !endpoint) {
      endpoint = "cli:codebuddy";
    }
    return {
      id: item.id,
      name: item.name,
      model: item.id === "workbuddy" && endpoint === "cli:codebuddy" ? "CodeBuddy CLI" : model,
      endpoint,
      responsePath: responsePathFor(config, item.id, item.responsePath),
      defaultModel: item.defaultModel || item.model || "",
      defaultEndpoint: item.endpoint || "",
      defaultResponsePath: item.responsePath || "choices.0.message.content",
      templateHelp: item.templateHelp || "",
      configured: item.id === "mock" || Boolean(usableApiKey && endpoint),
      keyEnv: item.keyEnv || "",
      modelEnv: item.modelEnv || "",
      endpointEnv: item.endpointEnv || ""
    };
  });
}

function mockAgentAnswer(message) {
  const text = String(message || "");
  if (/风险|回撤|止损/.test(text)) {
    return "先把风险拆成三层：题材热度、业绩兑现、交易位置。任何一层不舒服，都不要用重仓去赌。";
  }
  if (/科创|芯片|半导体/.test(text)) {
    return "科创芯片要先分清核心和边缘：核心看承接和趋势，边缘看情绪和轮动。越热闹越要等分歧，别在一致性最强的时候冲动。";
  }
  if (/有色|黄金|铜|资源/.test(text)) {
    return "有色板块更适合用周期视角看：价格、库存、美元和风险偏好一起观察。强趋势里不要轻易预判顶，但也别忽视高位波动。";
  }
  return "我的建议是先找确定性，再找弹性。核心标的只在分歧中观察承接，边缘题材只做记录，不追情绪。";
}

function execCodeBuddy(command, args, env) {
  return new Promise((resolve, reject) => {
    execFile(command, args, {
      timeout: 120000,
      maxBuffer: 4 * 1024 * 1024,
      env
    }, (error, stdout, stderr) => {
      if (error) {
        error.cliStderr = stderr;
        reject(error);
        return;
      }
      resolve((stdout || "").trim());
    });
  });
}

async function runCodeBuddyCli(message, apiKey) {
  const prompt = [
    "???? Agent????????????????????????????????",
    "?????????????????",
    "",
    message
  ].join("\n");
  const env = {
    ...process.env,
    CODEBUDDY_API_KEY: apiKey,
    CODEBUDDY_INTERNET_ENVIRONMENT: process.env.CODEBUDDY_INTERNET_ENVIRONMENT || "internal"
  };
  const commands = [
    { command: process.env.CODEBUDDY_BIN || "codebuddy", args: ["-p", prompt] },
    { command: path.join(process.env.LOCALAPPDATA || "", "codebuddy", "bin", "codebuddy.exe"), args: ["-p", prompt] },
    { command: process.platform === "win32" ? "npx.cmd" : "npx", args: ["-y", "@tencent-ai/codebuddy-code", "-p", prompt] }
  ];
  let lastError = null;
  for (const item of commands) {
    try {
      const answer = await execCodeBuddy(item.command, item.args, env);
      return answer || "CodeBuddy CLI ???????";
    } catch (error) {
      lastError = error;
      if (error.code !== "ENOENT") break;
    }
  }
  const detail = (lastError && (lastError.cliStderr || lastError.message)) || "CodeBuddy CLI ????";
  if (lastError && lastError.code === "ENOENT") {
    throw new Error("???? CodeBuddy CLI?????? npx ???????? Node/npm ??????");
  }
  throw new Error(detail.trim());
}

async function callOpenAICompatible(providerId, message, context = []) {
  const config = readAgentConfig();
  const provider = agentProviders().find(item => item.id === providerId) || agentProviders()[0];
  if (provider.id === "mock") return { provider, answer: mockAgentAnswer(message, context) };
  const providerConfig = config[provider.id] || {};
  const apiKey = process.env[provider.keyEnv] || providerConfig.apiKey || "";
  const endpoint = provider.endpoint || providerConfig.endpoint || "";
  if (provider.id === "codebuddy" || provider.endpoint === "cli:codebuddy") {
    if (!isUsableApiKey(apiKey)) {
      return { provider, answer: `\u5f53\u524d\u9009\u62e9\u7684\u662f ${provider.name}\uff0c\u4f46\u8fd8\u6ca1\u6709\u914d\u7f6e\u5b8c\u6574 API Key\u3002\u8bf7\u70b9\u201c\u914d\u7f6e\u201d\uff0c\u7c98\u8d34\u5b8c\u6574\u7684 ck_... \u5bc6\u94a5\uff1b\u5e26\u661f\u53f7\u7684\u5c55\u793a\u503c\u4e0d\u80fd\u7528\u4e8e\u8c03\u7528\u3002\n\n\u6211\u5148\u7528\u672c\u5730\u6a21\u62df\u56de\u7b54\uff1a\n\n${mockAgentAnswer(message)}` };
    }
    const answer = await runCodeBuddyCli(message, apiKey);
    return { provider, answer };
  }
  if (!apiKey || !endpoint) {
    return { provider, answer: `当前选择的是 ${provider.name}，但还没有配置 API Key。请在 agent-config.json 或环境变量 ${provider.keyEnv} 中配置；我先用本地模拟回答：\n\n${mockAgentAnswer(message)}` };
  }
  const messages = [
    { role: "system", content: "你是小可 Agent，一个中文投资课堂助理。你帮助用户整理本地视频素材、归纳题材逻辑、做复盘和风险提示。不要承诺收益，不给确定性买卖指令，重点给出结构化观察和风险边界。" },
    ...context.slice(-8),
    { role: "user", content: message }
  ];
  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature: 0.4,
      stream: false
    })
  });
  const data = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    const detail = data.error && (data.error.message || data.error.code) ? `${data.error.message || data.error.code}` : `HTTP ${upstream.status}`;
    throw new Error(`${provider.name} 调用失败：${detail}`);
  }
  const answer = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "";
  return { provider, answer: answer || "模型没有返回内容。" };
}

async function callOpenAICompatible(providerId, message, context = []) {
  const config = readAgentConfig();
  const provider = agentProviders().find(item => item.id === providerId) || agentProviders()[0];
  if (provider.id === "mock") return { provider, answer: mockAgentAnswer(message, context) };
  const providerConfig = config[provider.id] || {};
  const apiKey = process.env[provider.keyEnv] || providerConfig.apiKey || "";
  const endpoint = provider.endpoint || providerConfig.endpoint || "";
  if (provider.id === "codebuddy" || provider.endpoint === "cli:codebuddy") {
    if (!isUsableApiKey(apiKey)) {
      return { provider, answer: `当前选择的是 ${provider.name}，但还没有配置完整 API Key。请点“配置”，粘贴完整的 ck_... 密钥；带星号的展示值不能用于调用。\n\n我先用本地模拟回答：\n\n${mockAgentAnswer(message, context)}` };
    }
    const answer = await runCodeBuddyCli(message, apiKey);
    return { provider, answer };
  }
  if (!apiKey || !endpoint) {
    return { provider, answer: `当前选择的是 ${provider.name}，但还没有配置 API Key。请在 agent-config.json 或环境变量 ${provider.keyEnv} 中配置；我先用本地模拟回答：\n\n${mockAgentAnswer(message, context)}` };
  }
  const messages = [
    { role: "system", content: "你是小可课堂的 M-Model 投资知识库 Agent。回答必须优先使用用户提供的本地视频、文档、结构化分析、历史对话和长期记忆。固定输出时尽量包含：核心观点、相关标的/板块、操作建议、风险边界、哲学/心法。不要编造实时行情、确定收益或确定性买卖指令；缺数据就明确说缺数据，并把回答定位为复盘辅助和风险提示。" },
    ...context.slice(-16),
    { role: "user", content: message }
  ];
  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature: 0.35,
      stream: false
    })
  });
  const data = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    const detail = data.error && (data.error.message || data.error.code) ? `${data.error.message || data.error.code}` : `HTTP ${upstream.status}`;
    throw new Error(`${provider.name} 调用失败：${detail}`);
  }
  const answer = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "";
  return { provider, answer: answer || "模型没有返回内容。" };
}

async function callOpenAICompatible(providerId, message, context = []) {
  const config = readAgentConfig();
  const provider = agentProviders().find(item => item.id === providerId) || agentProviders()[0];
  if (provider.id === "mock") return { provider, answer: mockAgentAnswer(message, context) };
  const providerConfig = config[provider.id] || {};
  const apiKey = process.env[provider.keyEnv] || providerConfig.apiKey || "";
  const endpoint = provider.endpoint || providerConfig.endpoint || "";
  if (provider.id === "codebuddy" || provider.endpoint === "cli:codebuddy") {
    if (!isUsableApiKey(apiKey)) {
      return { provider, answer: `当前选择的是 ${provider.name}，但还没有配置完整 API Key。请点“配置”，粘贴完整的 ck_... 密钥；带星号的展示值不能用于调用。\n\n我先用本地模拟回答：\n\n${mockAgentAnswer(message, context)}` };
    }
    const answer = await runCodeBuddyCli(message, apiKey);
    return { provider, answer };
  }
  if (!apiKey || !endpoint) {
    return { provider, answer: `当前选择的是 ${provider.name}，但还没有配置 API Key。请在 agent-config.json 或环境变量 ${provider.keyEnv} 中配置；我先用本地模拟回答：\n\n${mockAgentAnswer(message, context)}` };
  }
  const messages = [
    { role: "system", content: "你是小可课堂的 M-Model 投资知识库 Agent。你必须优先使用上下文里的【回答证据包】、本地视频、文档、结构化分析、历史对话和长期记忆。回答尽量包含：核心观点、相关标的/板块、操作建议、风险边界、哲学/心法。引用素材时用 [1]、[2] 这种编号；如果证据包没有直接来源，要明确说缺少直接素材。不要编造实时行情、确定收益或确定性买卖指令；缺数据就明确说缺数据，并把回答定位为复盘辅助和风险提示。" },
    ...context.slice(-18),
    { role: "user", content: message }
  ];
  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature: 0.3,
      stream: false
    })
  });
  const data = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    const detail = data.error && (data.error.message || data.error.code) ? `${data.error.message || data.error.code}` : `HTTP ${upstream.status}`;
    throw new Error(`${provider.name} 调用失败：${detail}`);
  }
  const answer = extractAgentAnswer(data, providerConfig.responsePath || provider.responsePath || "choices.0.message.content");
  return { provider, answer: normalizeAgentAnswer(answer) || "模型没有返回内容。" };
}

function normalizeAgentAnswer(answer) {
  if (typeof answer === "string") return answer;
  if (answer === null || answer === undefined) return "";
  if (Array.isArray(answer)) {
    return answer.map(part => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object") return part.text || part.content || part.message || JSON.stringify(part);
      return String(part ?? "");
    }).filter(Boolean).join("\n");
  }
  if (typeof answer === "object") {
    return answer.text || answer.content || answer.message || answer.output || JSON.stringify(answer, null, 2);
  }
  return String(answer);
}

function valueAtPath(source, pathText = "") {
  if (!pathText) return undefined;
  const parts = String(pathText)
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .map(part => part.trim())
    .filter(Boolean);
  let current = source;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = current[part];
  }
  return current;
}

const AGENT_RESPONSE_FALLBACK_PATHS = [
  "choices.0.message.content",
  "choices.0.text",
  "output_text",
  "answer",
  "content",
  "message",
  "text",
  "data.answer",
  "data.content",
  "data.text",
  "result.answer",
  "result.content",
  "result.output",
  "response.answer",
  "response.content"
];

function scanAgentResponsePaths(data, preferredPath = "") {
  const paths = [
    String(preferredPath || "").trim(),
    ...AGENT_RESPONSE_FALLBACK_PATHS
  ].filter(Boolean);
  const seen = new Set();
  return paths
    .filter(pathText => {
      if (seen.has(pathText)) return false;
      seen.add(pathText);
      return true;
    })
    .map(pathText => {
      const value = valueAtPath(data, pathText);
      const parsed = normalizeAgentAnswer(value);
      return {
        path: pathText,
        found: value !== undefined && value !== null && value !== "",
        preview: parsed ? parsed.slice(0, 260) : ""
      };
    });
}

function extractAgentAnswer(data, responsePath = "") {
  const preferred = valueAtPath(data, responsePath);
  if (preferred !== undefined && preferred !== null && preferred !== "") return preferred;
  for (const pathText of AGENT_RESPONSE_FALLBACK_PATHS) {
    const value = valueAtPath(data, pathText);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return data;
}

function agentParsePayload(provider, endpoint, model, responsePath, raw, ok = true, error = "") {
  const candidates = scanAgentResponsePaths(raw, responsePath);
  const best = candidates.find(item => item.found && item.preview) || null;
  const parsed = normalizeAgentAnswer(best ? valueAtPath(raw, best.path) : extractAgentAnswer(raw, responsePath));
  return {
    provider,
    endpoint,
    model,
    responsePath,
    suggestedPath: best ? best.path : "",
    candidates,
    raw,
    parsed,
    ok,
    error
  };
}

async function testAgentParse(payload = {}) {
  const config = readAgentConfig();
  const providerId = String(payload.provider || "workbuddy").trim();
  const provider = agentProviders().find(item => item.id === providerId) || agentProviders().find(item => item.id === "workbuddy") || agentProviders()[0];
  const current = config[provider.id] || {};
  const apiKey = String(payload.apiKey || current.apiKey || process.env[provider.keyEnv] || "").trim();
  const endpoint = String(payload.endpoint || current.endpoint || provider.endpoint || "").trim();
  const model = String(payload.model || current.model || provider.model || provider.defaultModel || "custom-model").trim();
  const responsePath = String(
    Object.prototype.hasOwnProperty.call(payload, "responsePath")
      ? payload.responsePath
      : (current.responsePath || provider.responsePath || "choices.0.message.content")
  ).trim();
  const message = String(payload.message || "请用一句话回复：小可 Agent 解析测试成功。").trim();

  if (provider.id === "mock") {
    const raw = { answer: mockAgentAnswer(message, []) };
    return agentParsePayload(provider, "local", "local-rule", responsePath, raw, true);
  }
  if (provider.endpoint === "cli:codebuddy" || endpoint === "cli:codebuddy" || provider.id === "codebuddy") {
    if (!isUsableApiKey(apiKey)) throw new Error("CodeBuddy/CLI 测试需要完整 ck_... 密钥。");
    const output = await runCodeBuddyCli(message, apiKey);
    const raw = { answer: output };
    return agentParsePayload(provider, "cli:codebuddy", "CodeBuddy CLI", responsePath || "answer", raw, true);
  }
  if (!apiKey) throw new Error("请先填写 API Key，或保存已有密钥。");
  if (!endpoint) throw new Error("请先填写 endpoint。");

  const messages = [
    { role: "system", content: "你是小可 Agent 的接口解析测试助手。只需要简短回复测试是否成功。" },
    { role: "user", content: message }
  ];
  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model, messages, temperature: 0.1, stream: false })
  });
  const text = await upstream.text();
  let raw;
  try {
    raw = JSON.parse(text || "{}");
  } catch {
    raw = { text };
  }
  if (!upstream.ok) {
    const detail = raw.error && (raw.error.message || raw.error.code) ? `${raw.error.message || raw.error.code}` : `HTTP ${upstream.status}`;
    return agentParsePayload(provider, endpoint, model, responsePath, raw, false, detail);
  }
  return agentParsePayload(provider, endpoint, model, responsePath, raw, true);
}

function extractContextBlocks(context = [], marker = "") {
  return (Array.isArray(context) ? context : [])
    .map(item => String(item && item.content ? item.content : "").replace(/`n/g, "\n"))
    .filter(text => !marker || text.includes(marker));
}

function parseStockCardsFromContext(context = []) {
  const block = extractContextBlocks(context, "\u3010\u5b9e\u65f6\u6807\u7684\u6570\u636e\u5361\u3011").join("\n\n");
  if (!block) return [];
  return block.split(/\n\s*\n/).map(part => {
    const get = label => {
      const match = part.match(new RegExp(label + "[:：]\\s*([^\\n]+)"));
      return match ? match[1].trim() : "";
    };
    const name = get("\u6807\u7684");
    if (!name) return null;
    return {
      name,
      code: get("\u4ee3\u7801"),
      sector: get("\u677f\u5757"),
      price: get("\u73b0\u4ef7"),
      pct: get("\u6da8\u8dcc\u5e45"),
      pe: get("PE"),
      pb: get("PB"),
      marketCap: get("\u5e02\u503c"),
      grossMargin: get("\u6bdb\u5229\u7387"),
      revenueGrowth: get("\u8425\u6536\u589e\u901f"),
      profitGrowth: get("\u5229\u6da6\u589e\u901f"),
      stage: get("\u9636\u6bb5\u5224\u65ad"),
      desc: get("\u672c\u5730\u6863\u6848"),
      profileNote: get("\u8d22\u52a1\u5907\u6ce8"),
      dataQuality: get("\u6570\u636e\u8d28\u91cf")
    };
  }).filter(Boolean);
}

function parseEvidenceFromContext(context = []) {
  const block = extractContextBlocks(context, "\u3010\u56de\u7b54\u8bc1\u636e\u5305\u3011").join("\n\n");
  const rows = [];
  const regex = /(?:^|\n)\[(\d+)\]\s*([^\n]+)(?:\n|$)([\s\S]*?)(?=\n\[\d+\]\s|$)/g;
  let match;
  while ((match = regex.exec(block))) {
    const detail = match[3] || "";
    const summary = (detail.match(/\u6838\u5fc3\u89c2\u70b9[:：]\s*([^\n]+)/) || [])[1] || "";
    const risk = (detail.match(/\u98ce\u9669\u8fb9\u754c[:：]\s*([^\n]+)/) || [])[1] || "";
    rows.push({
      no: match[1],
      title: match[2].trim(),
      summary: summary.trim(),
      risk: risk.trim()
    });
  }
  return rows.slice(0, 4);
}

function smartMockAgentAnswer(message, context = []) {
  const text = String(message || "");
  const stocks = parseStockCardsFromContext(context);
  const evidence = parseEvidenceFromContext(context);
  const sources = evidence.length ? evidence.map(item => `[${item.no}] ${item.title}`).join("；") : "未检索到足够直接素材";
  if (stocks.length) {
    const stockLines = stocks.map(item => `- ${item.name}${item.code && item.code !== "-" ? `（${item.code}）` : ""}：${item.price && item.price !== "-" ? `现价 ${item.price}，涨跌幅 ${item.pct || "-"}` : "行情待同步"}；阶段：${item.stage || "待观察"}。`).join("\n");
    const financeLines = stocks.map(item => {
      const metrics = [
        item.pe && `PE ${item.pe}`,
        item.pb && `PB ${item.pb}`,
        item.marketCap && `市值 ${item.marketCap}`,
        item.grossMargin && `毛利率 ${item.grossMargin}`,
        item.revenueGrowth && `营收增速 ${item.revenueGrowth}`,
        item.profitGrowth && `利润增速 ${item.profitGrowth}`
      ].filter(Boolean).join("；");
      return `- ${item.name}：${metrics || "暂无本地估值/财务档案"}${item.profileNote ? `；备注：${item.profileNote}` : ""}`;
    }).join("\n");
    const evidenceLines = evidence.length
      ? evidence.map(item => `- [${item.no}] ${item.summary || item.title}${item.risk ? `；风险：${item.risk}` : ""}`).join("\n")
      : "- 本次没有匹配到足够强的历史视频/书籍证据，只能先按本地档案和行情做低置信度复盘。";
    return [
      "数据前提",
      stockLines,
      "",
      "估值/财务档案",
      financeLines,
      `引用来源：${sources}。没有接入正式 PE/PB、财报和资金流时，不编造估值结论。`,
      "",
      "市场阶段",
      "先按“价格位置 + 题材强弱 + 历史观点”看，不直接给买卖指令。若是上涨后分歧，重点看承接；若是下跌回撤，先确认趋势是否被破坏；若窄幅震荡，就等方向选择。",
      "",
      "核心矛盾",
      evidenceLines,
      "",
      "观察清单",
      "1. 价格是否重新站回关键均线或前期平台。",
      "2. 板块同方向个股是否共振，而不是单只票孤立异动。",
      "3. 成交量是健康换手还是放量滞涨。",
      "4. 你的仓位是否允许继续观察，避免用重仓赌不确定性。",
      "",
      "风险边界",
      "若跌破前一轮承接区、板块共振消失、或新素材与原判断冲突，就把它从“机会观察”降级为“风险复盘”。以上只用于复盘辅助，不构成投资建议。"
    ].join("\n");
  }
  if (/书|PDF|文档|总结|学习/.test(text)) {
    return "我会先确认这本书是否已经完成正文提取或 OCR，再按“核心概念、论证结构、可迁移到投资复盘的原则、容易误用的地方、读书笔记”来总结。扫描版 PDF 建议先用“学习书籍”读取前 60 页，必要时再点“全书 OCR”。";
  }
  return [
    "我会按小可 M-Model 的固定框架处理：先找数据前提，再找历史素材和长期记忆，最后输出观察清单和风险边界。",
    "当前如果你问具体股票，我会优先识别标的、拉行情卡、检索模型先生视频/书籍证据，并明确哪些结论缺少正式数据。",
    "这只是复盘辅助，不给确定性买卖指令。"
  ].join("\n");
}

function mockAgentAnswer(message, context = []) {
  return smartMockAgentAnswer(message, context);
}

function parseStockCardsFromContext(context = []) {
  const block = extractContextBlocks(context, "\u3010\u5b9e\u65f6\u6807\u7684\u6570\u636e\u5361\u3011").join("\n\n");
  if (!block) return [];
  return block.split(/\n\s*\n/).map(part => {
    const get = label => {
      const match = part.match(new RegExp(label + "[:：]\\s*([^\\n]+)"));
      return match ? match[1].trim() : "";
    };
    const name = get("\u6807\u7684");
    if (!name) return null;
    return {
      name,
      code: get("\u4ee3\u7801"),
      sector: get("\u677f\u5757"),
      price: get("\u73b0\u4ef7"),
      pct: get("\u6da8\u8dcc\u5e45"),
      pe: get("PE"),
      pb: get("PB"),
      marketCap: get("\u5e02\u503c"),
      circulatingMarketCap: get("\u6d41\u901a\u5e02\u503c"),
      turnoverRate: get("\u6362\u624b\u7387"),
      amplitude: get("\u632f\u5e45"),
      grossMargin: get("\u6bdb\u5229\u7387"),
      netMargin: get("\u51c0\u5229\u7387"),
      roe: get("ROE"),
      revenueGrowth: get("\u8425\u6536\u589e\u901f"),
      profitGrowth: get("\u5229\u6da6\u589e\u901f"),
      revenue: get("\u8425\u6536"),
      netProfit: get("\u5f52\u6bcd\u51c0\u5229"),
      financialReportDate: get("\u8d22\u62a5\u671f"),
      latestAnnouncements: get("\u6700\u65b0\u516c\u544a"),
      announcementSummary: get("\u516c\u544a\u6458\u8981"),
      announcementRiskPoints: get("\u516c\u544a\u98ce\u9669\u70b9"),
      announcementSource: get("\u516c\u544a\u6765\u6e90"),
      stage: get("\u9636\u6bb5\u5224\u65ad"),
      desc: get("\u672c\u5730\u6863\u6848"),
      profileNote: get("\u8d22\u52a1\u5907\u6ce8"),
      dataQuality: get("\u6570\u636e\u8d28\u91cf")
    };
  }).filter(Boolean);
}

function smartMockAgentAnswer(message, context = []) {
  const text = String(message || "");
  const stocks = parseStockCardsFromContext(context);
  const evidence = parseEvidenceFromContext(context);
  const ideaSourceText = evidence.length
    ? evidence.map(item => `[${item.no}] ${item.title}`).join("；")
    : "缺少直接视频/书籍证据";

  if (stocks.length) {
    const quoteLines = stocks.map(item => {
      const quoteMetrics = [
        item.price && item.price !== "-" && `现价 ${item.price}`,
        item.pct && item.pct !== "-" && `涨跌幅 ${item.pct}`,
        item.pe && item.pe !== "-" && `PE ${item.pe}`,
        item.pb && item.pb !== "-" && `PB ${item.pb}`,
        item.marketCap && item.marketCap !== "-" && `市值 ${item.marketCap}`,
        item.turnoverRate && item.turnoverRate !== "-" && `换手率 ${item.turnoverRate}`,
        item.amplitude && item.amplitude !== "-" && `振幅 ${item.amplitude}`
      ].filter(Boolean).join("；");
      return `- ${item.name}${item.code && item.code !== "-" ? `（${item.code}）` : ""}：${quoteMetrics || "腾讯行情暂未同步到可用字段"}`;
    }).join("\n");

    const financeLines = stocks.map(item => {
      const financeMetrics = [
        item.financialReportDate && item.financialReportDate !== "-" && `财报期 ${item.financialReportDate}`,
        item.revenue && item.revenue !== "-" && `营收 ${item.revenue}`,
        item.netProfit && item.netProfit !== "-" && `归母净利 ${item.netProfit}`,
        item.grossMargin && item.grossMargin !== "-" && `毛利率 ${item.grossMargin}`,
        item.netMargin && item.netMargin !== "-" && `净利率 ${item.netMargin}`,
        item.roe && item.roe !== "-" && `ROE ${item.roe}`,
        item.revenueGrowth && item.revenueGrowth !== "-" && `营收增速 ${item.revenueGrowth}`,
        item.profitGrowth && item.profitGrowth !== "-" && `利润增速 ${item.profitGrowth}`
      ].filter(Boolean).join("；");
      return `- ${item.name}：${financeMetrics || "东方财富财务暂未匹配到可用字段"}${item.profileNote ? `；本地备注：${item.profileNote}` : ""}`;
    }).join("\n");

    const evidenceLines = evidence.length
      ? evidence.map(item => `- [${item.no}] ${item.summary || item.title}${item.risk ? `；风险：${item.risk}` : ""}`).join("\n")
      : "- 本轮没有匹配到足够强的本地视频/书籍证据，观点层只能标为低置信度。";
    const announcementLines = stocks.map(item => {
      const text = item.latestAnnouncements && item.latestAnnouncements !== "-" ? item.latestAnnouncements : "";
      const summary = item.announcementSummary && item.announcementSummary !== "-" ? `；摘要：${item.announcementSummary}` : "";
      const risks = item.announcementRiskPoints && item.announcementRiskPoints !== "-" ? `；风险点：${item.announcementRiskPoints}` : "";
      return `- ${item.name}：${text || "本轮未拉到公告标题，公告层缺少直接证据"}${summary}${risks}`;
    }).join("\n");

    return [
      "数据前提",
      "行情来源：腾讯行情。",
      quoteLines,
      "",
      "财务来源：东方财富财务。",
      financeLines,
      "",
      "公告来源：巨潮资讯公告。",
      announcementLines,
      "说明：公告层目前使用标题级证据；若要做最终判断，需要打开 PDF 原文核验。",
      "",
      `观点来源：${ideaSourceText}。`,
      "",
      "核心观点",
      "当前应先按“证据链复盘”处理：行情和财务说明客观状态，公告提供事件约束，视频/书籍/记忆提供框架；若四者不能共振，就不要把它升级成高置信判断。",
      "",
      "数据支撑",
      "先看价格、估值、市值、利润质量和增速是否互相支持。如果 PE/PB 很高但增速和行业景气无法继续验证，就把它归为预期较满；如果估值高但基本面仍在加速，则重点观察回撤承接和板块共振。",
      "",
      "主要矛盾",
      evidenceLines,
      "",
      "预期差/观察条件",
      "1. 行情是否重新站稳关键均线或前期平台。",
      "2. 同板块是否出现共振，而不是单只股票孤立表现。",
      "3. 财务增速、毛利率、净利率是否继续支持市场给出的估值。",
      "4. 最近公告是否出现澄清、问询、减持、质押、业绩预告等会改变判断的事件。",
      "5. 本地视频/书籍观点是否能解释当前阶段，而不是事后硬套。",
      "",
      "风险边界",
      "若板块共振消失、关键平台跌破、财务质量走弱，或本地证据与当前行情冲突，就把结论降级为风险复盘。以上只用于学习和复盘辅助，不构成投资建议。",
      "",
      "来源标注",
      "行情：腾讯行情；财务：东方财富财务；公告：巨潮资讯公告；观点：本地视频/书籍/记忆。缺少直接证据的部分已在上文标明。"
    ].join("\n");
  }

  if (/书|PDF|文档|总结|学习/.test(text)) {
    return [
      "我会先确认这本书是否已经完成正文提取或 OCR。",
      "书籍总结会按：核心概念、论证结构、可迁移到投资复盘的原则、容易误用的地方、读书笔记输出。",
      "如果扫描版 PDF 只识别出页码，说明需要 OCR；完成 OCR 后再沉淀为读书记忆，Agent 才能在股票问题里引用它。"
    ].join("\n");
  }

  return [
    "我会按小可 M-Model 的证据链框架处理：先找行情和财务，再检索视频、书籍、记忆，最后输出观察清单和风险边界。",
    "具体股票问题会优先调用腾讯行情、东方财富财务和本地知识库；没有来源就标注缺少直接证据。",
    "这只是复盘辅助，不给确定性买卖指令。"
  ].join("\n");
}

function mockAgentAnswer(message, context = []) {
  return smartMockAgentAnswer(message, context);
}

function parseStockCardsFromContext(context = []) {
  const text = extractContextBlocks(context).join("\n\n");
  if (!text) return [];
  const rows = text
    .split(/(?=\u6807\u7684[:：])/)
    .filter(part => /\u6807\u7684[:：]/.test(part));
  return rows.map(part => {
    const get = label => {
      const match = part.match(new RegExp(label + "[:：]\\s*([^\\n]+)"));
      return match ? match[1].trim() : "";
    };
    const name = get("\u6807\u7684");
    if (!name) return null;
    return {
      name,
      code: get("\u4ee3\u7801"),
      sector: get("\u677f\u5757"),
      price: get("\u73b0\u4ef7"),
      pct: get("\u6da8\u8dcc\u5e45"),
      pe: get("PE"),
      pb: get("PB"),
      marketCap: get("\u5e02\u503c"),
      circulatingMarketCap: get("\u6d41\u901a\u5e02\u503c"),
      turnoverRate: get("\u6362\u624b\u7387"),
      amplitude: get("\u632f\u5e45"),
      grossMargin: get("\u6bdb\u5229\u7387"),
      netMargin: get("\u51c0\u5229\u7387"),
      roe: get("ROE"),
      revenueGrowth: get("\u8425\u6536\u589e\u901f"),
      profitGrowth: get("\u5229\u6da6\u589e\u901f"),
      revenue: get("\u8425\u6536"),
      netProfit: get("\u5f52\u6bcd\u51c0\u5229"),
      financialReportDate: get("\u8d22\u62a5\u671f"),
      latestAnnouncements: get("\u6700\u65b0\u516c\u544a"),
      announcementSource: get("\u516c\u544a\u6765\u6e90"),
      stage: get("\u9636\u6bb5\u5224\u65ad"),
      desc: get("\u672c\u5730\u6863\u6848"),
      profileNote: get("\u8d22\u52a1\u5907\u6ce8"),
      dataQuality: get("\u6570\u636e\u8d28\u91cf")
    };
  }).filter(Boolean);
}

function isDouyinUrl(value) {
  return /(douyin\.com|v\.douyin|iesdouyin)/i.test(value || "");
}

function cleanYtDlpError(message) {
  const text = String(message || "").replace(/\s+/g, " ").trim();
  if (/Fresh cookies|cookies/i.test(text)) {
    return "Douyin requires fresh browser cookies. Open Douyin in Edge/Chrome, confirm the video plays, close that browser, then try again.";
  }
  if (/DPAPI|cookie database|decrypt/i.test(text)) {
    return "Could not read browser cookies. Close Edge/Chrome completely, then try again. If it still fails, download the video manually into the videos folder.";
  }
  return text || "Douyin parse failed.";
}

function findUp(startDir, relativePath, maxDepth = 8) {
  let current = path.resolve(startDir);
  for (let i = 0; i < maxDepth; i += 1) {
    const candidate = path.join(current, relativePath);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return "";
}

function readFactsForDir(dir) {
  const factsPath = findUp(dir, path.join("data", ".appdata", "facts.json")) || findUp(dir, path.join(".appdata", "facts.json"));
  if (!factsPath) return null;
  try {
    const facts = JSON.parse(fs.readFileSync(factsPath, "utf8"));
    facts.__root = path.dirname(path.dirname(factsPath));
    return facts;
  } catch {
    return null;
  }
}

function classifyVideo(text) {
  const value = String(text || "");
  const rules = [
    ["科创芯片", /科创|芯片|半导体|光刻|中芯|寒武纪|算力|存储|长鑫|海光|澜起|兆易|晶圆/],
    ["有色金属", /有色|黄金|铜|铝|锂|钴|稀土|紫金|矿|资源/],
    ["AI应用", /AI|人工智能|大模型|算力|智能体|Agent/],
    ["机器人", /机器人|具身|宇树|灵巧手/],
    ["商业航天", /航天|卫星|SpaceX|火箭|低空/],
    ["交易系统", /交易|系统|执行|仓位|止损|回撤|买点|卖点|持仓|趋势|周期/],
    ["投资哲学", /哲学|辩证|规律|认知|心态|客观|主观|耐心|逻辑|反脆弱|中庸/],
    ["宏观周期", /宏观|周期|流动性|利率|美元|通胀|政策|牛市|熊市/]
  ];
  const hit = rules.find(([, regex]) => regex.test(value));
  return hit ? hit[0] : "模型先生";
}

function compactCount(value) {
  const num = Number(value || 0);
  if (num >= 10000) return `${(num / 10000).toFixed(num >= 100000 ? 0 : 1)}万`;
  return String(num);
}

function findCoverForVideo(filePath, id, facts) {
  const sameDir = path.dirname(filePath);
  const candidates = [
    path.join(sameDir, `${id}.jpg`),
    path.join(path.dirname(sameDir), "封面", `${id}.jpg`)
  ];
  if (facts && facts.__root) {
    const authorId = facts.videos && facts.videos[id] && facts.videos[id].authorId;
    if (authorId) candidates.push(path.join(facts.__root, "关注", authorId, "封面", `${id}.jpg`));
  }
  return candidates.find(file => fs.existsSync(file)) || "";
}

function readLocalLibraryInfo(filePath, factsCache, ocrTitles = {}) {
  const id = path.basename(filePath, path.extname(filePath));
  const dir = path.dirname(filePath);
  if (!factsCache.has(dir)) factsCache.set(dir, readFactsForDir(dir));
  const facts = factsCache.get(dir);
  if (!facts || !facts.videos || !facts.videos[id]) return { sourceId: id };

  const video = facts.videos[id] || {};
  const author = facts.authors && facts.authors[video.authorId] ? facts.authors[video.authorId] : {};
  const description = String((facts.videoDescriptions && facts.videoDescriptions[id]) || "").trim();
  const publishedAt = video.createTime ? new Date(video.createTime * 1000).toISOString().slice(0, 10) : "";
  const ocrTitle = String(ocrTitles[id] || "").trim();
  const title = ocrTitle || description || `${publishedAt || "未知日期"}｜${compactCount(video.diggCount)}赞｜模型先生视频`;
  const topic = classifyVideo(title);
  const coverPath = findCoverForVideo(filePath, id, facts);

  return {
    sourceId: id,
    title,
    topic,
    author: (author.nicknames && author.nicknames[0]) || "模型先生",
    likes: Number(video.diggCount || 0),
    comments: Number(video.commentCount || 0),
    shares: Number(video.shareCount || 0),
    collects: Number(video.collectCount || 0),
    publishedAt,
    transcript: description || ocrTitle || "本地库暂无标题描述，可在详情页播放视频后补充转录。",
    focus: topic,
    confidence: description ? "本地库" : "待补充",
    originalUrl: `https://www.douyin.com/video/${id}`,
    thumbnailPath: coverPath,
    sizeLabel: video.size || ""
  };
}

function getLocalVideos() {
  const videos = [];
  const factsCache = new Map();
  const ocrTitles = readOcrTitleCache();
  const visit = dir => {
    try {
      fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          visit(filePath);
          return;
        }
        if (!entry.isFile() || !VIDEO_EXTS.includes(path.extname(entry.name).toLowerCase())) return;
        const stat = fs.statSync(filePath);
        const info = readLocalLibraryInfo(filePath, factsCache, ocrTitles);
        videos.push({
          filename: entry.name,
          sourceDir: dir,
          sourceId: info.sourceId,
          title: info.title || entry.name.replace(/\.[^.]+$/, ""),
          topic: info.topic || "本地素材",
          author: info.author || "本地视频",
          likes: info.likes || 0,
          comments: info.comments || 0,
          shares: info.shares || 0,
          collects: info.collects || 0,
          publishedAt: info.publishedAt || "",
          transcript: info.transcript || "",
          focus: info.focus || info.topic || "本地素材",
          confidence: info.confidence || "待确认",
          originalUrl: info.originalUrl || "",
          thumbnail: info.thumbnailPath ? `/api/local-video-file?path=${encodeURIComponent(info.thumbnailPath)}` : "",
          sizeLabel: info.sizeLabel || "",
          size: stat.size,
          mtime: stat.mtime.toISOString(),
          url: `/api/local-video-file?path=${encodeURIComponent(filePath)}`
        });
      });
    } catch {
      // Ignore unreadable folders and keep scanning the rest.
    }
  };
  for (const dir of getVideoDirs()) {
    visit(dir);
  }
  return videos.sort((a, b) => {
    const dateA = a.publishedAt || a.mtime;
    const dateB = b.publishedAt || b.mtime;
    return new Date(dateB) - new Date(dateA);
  });
}

function getLocalVideoByName(filename) {
  for (const dir of getVideoDirs()) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath) && VIDEO_EXTS.includes(path.extname(filePath).toLowerCase())) {
      return filePath;
    }
  }
  return "";
}

function mimeType(ext) {
  return {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".m4v": "video/mp4",
    ".mkv": "video/x-matroska",
    ".avi": "video/x-msvideo",
    ".flv": "video/x-flv",
    ".wmv": "video/x-ms-wmv",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }[ext] || "application/octet-stream";
}

function safeTranscriptName(filePath) {
  const hash = require("crypto").createHash("md5").update(path.resolve(filePath)).digest("hex").slice(0, 12);
  const base = path.basename(filePath, path.extname(filePath)).replace(/[^\w\u4e00-\u9fa5.-]+/g, "_").slice(0, 80) || "video";
  return `${base}_${hash}`;
}

function resolveVideoPathFromPayload(payload) {
  const directPath = String(payload.path || "").trim();
  if (directPath && isAllowedVideoPath(directPath) && fs.existsSync(directPath)) return path.resolve(directPath);
  const videoUrl = String(payload.videoUrl || "").trim();
  if (videoUrl) {
    const parsed = new URL(videoUrl, "http://localhost");
    if (parsed.pathname === "/api/local-video-file") {
      const filePath = parsed.searchParams.get("path");
      if (filePath && isAllowedVideoPath(filePath) && fs.existsSync(filePath)) return path.resolve(filePath);
    }
    if (parsed.pathname.startsWith("/api/local-video/")) {
      const filename = decodeURIComponent(parsed.pathname.replace("/api/local-video/", ""));
      const filePath = getLocalVideoByName(filename);
      if (filePath) return path.resolve(filePath);
    }
  }
  return "";
}

const SERVER_TRADITIONAL_MAP = {
  "說":"说","説":"说","個":"个","這":"这","沒":"没","專":"专","實":"实","長":"长","從":"从","數":"数","較":"较","點":"点","買":"买","賣":"卖","漲":"涨","跌":"跌","盤":"盘","後":"后","裡":"里","為":"为","對":"对","標":"标","題":"题","轉":"转","錄":"录","語":"语","視":"视","頻":"频","塊":"块","價":"价","風":"风","險":"险","與":"与","萬":"万","贊":"赞","財":"财","經":"经","證":"证","券":"券","龍":"龙","頭":"头","線":"线","別":"别","類":"类","儲":"储","國":"国","際":"际","華":"华","東":"东","體":"体","網":"网","進":"进","過":"过","還":"还","選":"选","邏":"逻","輯":"辑","預":"预","測":"测","壓":"压","勝":"胜","務":"务","動":"动","勢":"势","創":"创","剛":"刚","鋼":"钢","韓":"韩","細":"细","賽":"赛","終":"终","於":"于","確":"确","嗎":"吗","啟":"启","庫":"库","書":"书","圖":"图","產":"产","業":"业","鏈":"链","應":"应"
};

function serverToSimplifiedChinese(text) {
  let mapped = "";
  for (const ch of String(text || "")) mapped += SERVER_TRADITIONAL_MAP[ch] || ch;
  return [
    ["歡", "欢"],
    ["緒", "绪"],
    ["樂", "乐"],
    ["獨", "独"],
    ["尋", "寻"],
    ["兒", "儿"],
    ["並", "并"],
    ["牆", "墙"],
    ["寬", "宽"],
    ["嚴", "严"],
    ["科双新片", "科创芯片"],
    ["科雙新片", "科创芯片"],
    ["中印国际", "中芯国际"],
    ["金钢", "金刚"],
    ["韩国际", "寒武纪"],
    ["长江长新存储", "长鑫存储"],
    ["长新存储", "长鑫存储"]
  ].reduce((acc, [from, to]) => acc.split(from).join(to), mapped);
}

function normalizeTranscriptText(text) {
  let value = serverToSimplifiedChinese(text)
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*([，。！？；：、,.!?;:])\s*/g, "$1")
    .trim();
  if (!value) return "";
  const parts = value.split("\n").map(part => {
    let cleaned = part.trim();
    while (cleaned.endsWith("，") || cleaned.endsWith(",")) cleaned = cleaned.slice(0, -1);
    return cleaned;
  }).filter(Boolean);
  const joined = [];
  for (const part of parts) {
    if (!joined.length) {
      joined.push(part);
    } else {
      const prev = joined[joined.length - 1];
      joined[joined.length - 1] = prev + (/[。！？；!?;]$/.test(prev) ? "" : "，") + part;
    }
  }
  value = joined.join("");
  value = value
    .replace(/,/g, "，")
    .replace(/\?/g, "？")
    .replace(/!/g, "！")
    .replace(/;+/g, "；")
    .replace(/(之前呢|然后呢|所以呢|但是呢|这个呢|第一个呢|第二个呢|第三个呢|第四个呢|但是|所以)(?![，。！？；：、])/g, "$1，")
    .replace(/(四大金刚|三大金刚|双雄|龙头|核心|主线)(?=第[一二三四五六七八九十]个)/g, "$1，")
    .replace(/(明确说|明说|讲清楚|说清楚)(?=因为|但是|所以)/g, "$1，")
    .replace(/因为，我/g, "因为我")
    .replace(/([，。！？；、])\1+/g, "$1")
    .replace(/，([。！？；])/g, "$1")
    .replace(/([。！？；])，/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (value && !/[。！？]$/.test(value)) value += "。";
  return value;
}

function normalizeOcrTitle(text) {
  return serverToSimplifiedChinese(text)
    .replace(/\s+/g, "")
    .replace(/[|｜]/g, "")
    .replace(/模型先生视频/g, "")
    .replace(/模型先生/g, "")
    .replace(/[。！？；：，、,.!?;:]+$/g, "")
    .trim();
}

function frameNameForVideo(filePath) {
  const hash = require("crypto").createHash("md5").update(path.resolve(filePath)).digest("hex").slice(0, 12);
  return path.join(OCR_FRAMES_DIR, `${hash}.jpg`);
}

function extractOcrFrame(filePath) {
  return new Promise((resolve, reject) => {
    const outFile = frameNameForVideo(filePath);
    const args = [
      "-y",
      "-ss", "00:00:01",
      "-i", filePath,
      "-frames:v", "1",
      "-vf", "crop=iw:ih*0.55:0:ih*0.18,scale=1200:-1",
      outFile
    ];
    execFile(process.env.FFMPEG_BIN || "ffmpeg", args, { timeout: 45000, maxBuffer: 12 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || "ffmpeg frame extraction failed").trim()));
        return;
      }
      if (!fs.existsSync(outFile)) {
        reject(new Error("ffmpeg did not produce an OCR frame."));
        return;
      }
      resolve(outFile);
    });
  });
}

function runFrameOcr(imagePath) {
  return new Promise((resolve, reject) => {
    execPythonTool(OCR_TITLE_SCRIPT, [imagePath], {
      timeout: 90000,
      maxBuffer: 12 * 1024 * 1024,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" }
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || "OCR failed").trim()));
        return;
      }
      try {
        resolve(JSON.parse(stdout || "{}"));
      } catch {
        reject(new Error("OCR returned invalid JSON."));
      }
    });
  });
}

async function extractVideoTitleByOcr(filePath, options = {}) {
  const id = String(options.id || path.basename(filePath, path.extname(filePath))).replace(/^local_/, "");
  const cache = readOcrTitleCache();
  if (!options.force && cache[id]) {
    return { title: cache[id], cached: true, id };
  }
  const framePath = await extractOcrFrame(filePath);
  const result = await runFrameOcr(framePath);
  const title = normalizeOcrTitle(result.title || "");
  if (!title) throw new Error("没有识别到画面标题。可以换一帧或手动填写标题。");
  cache[id] = title;
  writeOcrTitleCache(cache);
  return { title, cached: false, id, rows: result.rows || [], framePath };
}

function runWhisperTranscription(filePath) {
  return new Promise((resolve, reject) => {
    const name = safeTranscriptName(filePath);
    const outFile = path.join(TRANSCRIPTS_DIR, `${name}.txt`);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) {
      const rawTranscript = fs.readFileSync(outFile, "utf8").trim();
      const transcript = normalizeTranscriptText(rawTranscript);
      if (!transcript) {
        fs.unlinkSync(outFile);
      } else {
        if (transcript !== rawTranscript) fs.writeFileSync(outFile, transcript, "utf8");
        resolve({ transcript, cached: true, transcriptFile: outFile });
        return;
      }
    }
    const args = [
      filePath,
      "--model", process.env.XIAOKE_WHISPER_MODEL || "base",
      "--language", process.env.XIAOKE_WHISPER_LANGUAGE || "Chinese",
      "--task", "transcribe",
      "--output_format", "txt",
      "--output_dir", TRANSCRIPTS_DIR,
      "--verbose", "False"
    ];
    execFile(process.env.WHISPER_BIN || "whisper", args, {
      timeout: Number(process.env.XIAOKE_WHISPER_TIMEOUT_MS || 900000),
      maxBuffer: 24 * 1024 * 1024,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" }
    }, (error, stdout, stderr) => {
      if (error) {
        const detail = (stderr || stdout || error.message || "").trim();
        reject(new Error(detail || "Whisper transcription failed."));
        return;
      }
      const defaultOut = path.join(TRANSCRIPTS_DIR, `${path.basename(filePath, path.extname(filePath))}.txt`);
      const sourceOut = fs.existsSync(defaultOut) ? defaultOut : outFile;
      if (sourceOut !== outFile && fs.existsSync(sourceOut)) fs.copyFileSync(sourceOut, outFile);
      if (!fs.existsSync(outFile)) {
        reject(new Error("Whisper finished but did not produce a txt file."));
        return;
      }
      const rawTranscript = fs.readFileSync(outFile, "utf8").trim();
      const transcript = normalizeTranscriptText(rawTranscript);
      if (!transcript) {
        reject(new Error("转写完成，但没有识别到语音文字。这个视频可能没有音轨、音量太低，或文件不是完整视频。"));
        return;
      }
      if (transcript !== rawTranscript) fs.writeFileSync(outFile, transcript, "utf8");
      resolve({ transcript, cached: false, transcriptFile: outFile });
    });
  });
}

function runYtDlp(args, timeout = 90000) {
  return new Promise((resolve, reject) => {
    execFile("yt-dlp", args, { timeout, maxBuffer: 30 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(cleanYtDlpError(stderr || error.message)));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function runWithCookieFallback(baseArgs, timeout) {
  const attempts = [];
  if (fs.existsSync(COOKIES_FILE)) attempts.push(["--cookies", COOKIES_FILE, ...baseArgs]);
  attempts.push(baseArgs);
  attempts.push(["--cookies-from-browser", "edge", ...baseArgs]);
  attempts.push(["--cookies-from-browser", "chrome", ...baseArgs]);
  const errors = [];
  for (const args of attempts) {
    try {
      return await runYtDlp(args, timeout);
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(errors.find(Boolean) || "yt-dlp failed.");
}

function extractBestVideoUrl(info) {
  if (info.requested_downloads && info.requested_downloads[0] && info.requested_downloads[0].url) {
    return info.requested_downloads[0].url;
  }
  if (info.url && /^https?:\/\//.test(info.url)) return info.url;
  const formats = Array.isArray(info.formats) ? info.formats : [];
  const playable = formats
    .filter(format => format.url && (format.vcodec || "none") !== "none")
    .sort((a, b) => ((b.height || 0) + (b.tbr || 0) / 100) - ((a.height || 0) + (a.tbr || 0) / 100));
  return playable[0] ? playable[0].url : "";
}

async function resolveDouyin(shareUrl) {
  const cached = douyinCache.get(shareUrl);
  if (cached && Date.now() - cached.cachedAt < 15 * 60 * 1000) return cached;

  const stdout = await runWithCookieFallback([
    "--dump-single-json",
    "--no-playlist",
    "--no-warnings",
    shareUrl
  ], 60000);
  const info = JSON.parse(stdout);
  const videoUrl = extractBestVideoUrl(info);
  if (!videoUrl) throw new Error("Could not find a playable video stream.");
  const result = {
    videoUrl,
    title: info.title || info.fulltitle || "Douyin video",
    description: info.description || "",
    cover: info.thumbnail || "",
    duration: info.duration || 0,
    cachedAt: Date.now()
  };
  douyinCache.set(shareUrl, result);
  return result;
}

async function getDouyinMetadata(shareUrl) {
  try {
    const stdout = await runWithCookieFallback([
      "--dump-single-json",
      "--no-playlist",
      "--no-warnings",
      "--skip-download",
      shareUrl
    ], 60000);
    const info = JSON.parse(stdout);
    return upsertMetadata(normalizeDouyinMetadata(info, shareUrl));
  } catch (error) {
    return upsertMetadata(normalizeDouyinMetadata(null, shareUrl, error.message));
  }
}

function douyinCookieHeader() {
  if (!fs.existsSync(COOKIES_FILE)) return "";
  try {
    return fs.readFileSync(COOKIES_FILE, "utf8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"))
      .map(line => {
        const parts = line.split(/\t+/);
        if (parts.length >= 7) return `${parts[5]}=${parts[6]}`;
        const match = line.match(/^([^=\s]+)=([^;\s]+)/);
        return match ? `${match[1]}=${match[2]}` : "";
      })
      .filter(Boolean)
      .join("; ");
  } catch {
    return "";
  }
}

async function douyinInfoForComments(shareUrl) {
  const stdout = await runWithCookieFallback([
    "--dump-single-json",
    "--no-playlist",
    "--no-warnings",
    "--skip-download",
    shareUrl
  ], 60000);
  return JSON.parse(stdout);
}

function douyinAwemeIdFromInfo(info, shareUrl) {
  const candidates = [
    info && info.id,
    info && info.display_id,
    shareUrl
  ].filter(Boolean).map(String);
  for (const value of candidates) {
    const match = value.match(/(?:video\/|modal_id=|aweme_id=)?(\d{10,})/);
    if (match) return match[1];
  }
  return "";
}

function normalizeDouyinComment(comment) {
  const user = comment.user || {};
  const reply = Array.isArray(comment.reply_comment) && comment.reply_comment[0]
    ? comment.reply_comment[0]
    : null;
  const replyUser = reply && reply.user ? reply.user : {};
  return {
    id: String(comment.cid || comment.id || ""),
    user: user.nickname || user.unique_id || "@用户",
    text: comment.text || comment.content || "",
    likes: Number(comment.digg_count || comment.like_count || 0),
    time: comment.create_time ? new Date(Number(comment.create_time) * 1000).toISOString().slice(0, 16).replace("T", " ") : "",
    region: comment.ip_label || comment.label_text || "",
    reply: reply ? (reply.text || reply.content || "") : "",
    replyUser: reply ? (replyUser.nickname || replyUser.unique_id || "") : "",
    replyCount: Number(comment.reply_comment_total || comment.reply_comment_count || 0)
  };
}

async function getDouyinComments(shareUrl, limit = 30) {
  const info = await douyinInfoForComments(shareUrl);
  const awemeId = douyinAwemeIdFromInfo(info, shareUrl);
  if (!awemeId) throw new Error("没有识别到抖音作品 ID。请确认原链接是抖音视频详情页。");
  const params = new URLSearchParams({
    aweme_id: awemeId,
    cursor: "0",
    count: String(Math.max(1, Math.min(50, Number(limit) || 30))),
    item_type: "0"
  });
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
    "Referer": `https://www.douyin.com/video/${awemeId}`,
    "Accept": "application/json, text/plain, */*"
  };
  const cookie = douyinCookieHeader();
  if (cookie) headers.Cookie = cookie;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(`https://www.douyin.com/aweme/v1/web/comment/list/?${params.toString()}`, {
      headers,
      signal: controller.signal,
      redirect: "follow"
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`抖音评论接口返回 ${response.status}`);
    const data = JSON.parse(text);
    const raw = Array.isArray(data.comments) ? data.comments : [];
    const comments = raw.map(normalizeDouyinComment).filter(item => item.text).sort((a, b) => b.likes - a.likes);
    const interactions = comments
      .filter(item => item.reply || item.replyCount > 0)
      .map(item => ({
        ...item,
        text: item.reply ? `${item.text}\n博主/作者回复：${item.reply}` : item.text
      }));
    return {
      awemeId,
      title: info.title || info.fulltitle || "",
      comments,
      interactions,
      source: cookie ? "抖音 Web 评论接口 / cookies.txt" : "抖音 Web 评论接口"
    };
  } finally {
    clearTimeout(timer);
  }
}

async function saveDouyin(shareUrl) {
  const outputTemplate = "%(title).80s_%(id)s.%(ext)s";
  const stdout = await runWithCookieFallback([
    "--no-playlist",
    "--no-warnings",
    "--restrict-filenames",
    "--merge-output-format", "mp4",
    "--print", "after_move:filepath",
    "-P", VIDEOS_DIR,
    "-o", outputTemplate,
    shareUrl
  ], 180000);

  const lines = stdout.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const filePath = [...lines].reverse().find(line => fs.existsSync(line)) || "";
  if (!filePath) throw new Error("Download finished but no saved file was found.");
  const filename = path.basename(filePath);
  const stat = fs.statSync(filePath);
  return {
    filename,
    size: stat.size,
    mtime: stat.mtime.toISOString(),
    url: `/api/local-video/${encodeURIComponent(filename)}`
  };
}

function readDouyinSideData() {
  try {
    if (!fs.existsSync(DOUYIN_SIDE_DATA_FILE)) return { comments: {}, interactions: {}, updatedAt: "" };
    const data = JSON.parse(fs.readFileSync(DOUYIN_SIDE_DATA_FILE, "utf8"));
    return data && typeof data === "object" ? {
      comments: data.comments && typeof data.comments === "object" ? data.comments : {},
      interactions: data.interactions && typeof data.interactions === "object" ? data.interactions : {},
      updatedAt: data.updatedAt || ""
    } : { comments: {}, interactions: {}, updatedAt: "" };
  } catch {
    return { comments: {}, interactions: {}, updatedAt: "" };
  }
}

function writeDouyinSideData(data) {
  const payload = {
    comments: data.comments || {},
    interactions: data.interactions || {},
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(DOUYIN_SIDE_DATA_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function readDouyinSyncState() {
  try {
    if (!fs.existsSync(DOUYIN_SYNC_STATE_FILE)) return null;
    return JSON.parse(fs.readFileSync(DOUYIN_SYNC_STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function writeDouyinSyncState(state) {
  const payload = { ...(state || {}), updatedAt: new Date().toISOString() };
  fs.writeFileSync(DOUYIN_SYNC_STATE_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function compactDouyinError(error) {
  const text = String(error && error.message ? error.message : error || "").replace(/\s+/g, " ").trim();
  if (/login|cookie|cookies|403|401|verify|captcha|risk|风控|验证/i.test(text)) {
    return "抖音限制访问或登录态失效：请先打开抖音确认能播放该视频，再运行“导出抖音Cookies.bat”更新 cookies.txt。";
  }
  if (/yt-dlp|not recognized|ENOENT/i.test(text)) {
    return "没有找到 yt-dlp，请先安装或把 yt-dlp 加入 PATH。";
  }
  if (/timeout|aborted/i.test(text)) return "抖音接口超时，请稍后重试或减少抓取数量。";
  return text || "抖音抓取失败。";
}

function getDouyinCookieValue(name) {
  const cookie = douyinCookieHeader();
  const found = cookie.split(/;\s*/).find(item => item.startsWith(`${name}=`));
  return found ? found.slice(name.length + 1) : "";
}

function extractDouyinIdFromText(value = "") {
  const text = String(value || "");
  const direct = text.match(/(?:video\/|modal_id=|aweme_id=)(\d{10,})/);
  if (direct) return direct[1];
  const loose = text.match(/\b(\d{15,25})\b/);
  return loose ? loose[1] : "";
}

async function stableDouyinInfo(shareUrl) {
  try {
    return await douyinInfoForComments(shareUrl);
  } catch (error) {
    const id = extractDouyinIdFromText(shareUrl);
    if (!id) throw error;
    return { id, display_id: id, webpage_url: `https://www.douyin.com/video/${id}` };
  }
}

function stableDouyinAuthorNames(info = {}) {
  return [
    info.uploader,
    info.channel,
    info.creator,
    info.uploader_id,
    info.channel_id
  ].filter(Boolean).map(item => String(item).trim()).filter(Boolean);
}

function stableNormalizeDouyinComment(comment, ownerNames = []) {
  const user = comment.user || {};
  const secUid = String(user.sec_uid || user.secUid || user.uid || user.unique_id || "");
  const nickname = String(user.nickname || user.unique_id || user.short_id || "@用户");
  const text = String(comment.text || comment.content || "").trim();
  const owner = ownerNames.some(name => name && (nickname === name || secUid === name || nickname.includes(name)));
  return {
    id: String(comment.cid || comment.id || ""),
    user: nickname,
    userId: secUid,
    text,
    likes: Number(comment.digg_count || comment.like_count || 0),
    time: comment.create_time ? new Date(Number(comment.create_time) * 1000).toISOString().slice(0, 16).replace("T", " ") : "",
    region: comment.ip_label || comment.label_text || "",
    replyCount: Number(comment.reply_comment_total || comment.reply_comment_count || 0),
    isAuthor: owner
  };
}

async function fetchDouyinJson(url, referer, timeout = 30000) {
  const msToken = getDouyinCookieValue("msToken");
  const finalUrl = new URL(url);
  if (msToken && !finalUrl.searchParams.get("msToken")) finalUrl.searchParams.set("msToken", msToken);
  const cookie = douyinCookieHeader();
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
    "Referer": referer || "https://www.douyin.com/",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty"
  };
  if (cookie) headers.Cookie = cookie;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(finalUrl.toString(), { headers, signal: controller.signal, redirect: "follow" });
    const text = await response.text();
    if (!response.ok) throw new Error(`抖音接口返回 ${response.status}: ${text.slice(0, 120)}`);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`抖音返回内容不是 JSON: ${text.slice(0, 120)}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

async function fetchDouyinCommentPage(awemeId, cursor, count) {
  const params = new URLSearchParams({
    aweme_id: awemeId,
    cursor: String(cursor || 0),
    count: String(Math.max(1, Math.min(50, Number(count) || 30))),
    item_type: "0"
  });
  const url = `https://www.douyin.com/aweme/v1/web/comment/list/?${params.toString()}`;
  return fetchDouyinJson(url, `https://www.douyin.com/video/${awemeId}`);
}

async function fetchDouyinReplyPage(awemeId, commentId, cursor = 0, count = 20) {
  const params = new URLSearchParams({
    item_id: awemeId,
    comment_id: commentId,
    cursor: String(cursor || 0),
    count: String(Math.max(1, Math.min(50, Number(count) || 20))),
    item_type: "0"
  });
  const url = `https://www.douyin.com/aweme/v1/web/comment/list/reply/?${params.toString()}`;
  return fetchDouyinJson(url, `https://www.douyin.com/video/${awemeId}`);
}

function debugJsonRequest(method, url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(body || "{}"));
        } catch (error) {
          reject(new Error(`CDP response is not JSON: ${body.slice(0, 120)}`));
        }
      });
    });
    req.setTimeout(8000, () => req.destroy(new Error("CDP request timed out")));
    req.on("error", reject);
    req.end();
  });
}

async function ensureDouyinDebugBrowser() {
  try {
    await debugJsonRequest("GET", "http://127.0.0.1:9222/json/version");
    return;
  } catch {
    const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
    const profileDir = path.join(ROOT, "douyin_edge_profile");
    fs.mkdirSync(profileDir, { recursive: true });
    const child = spawn(edgePath, [
      "--remote-debugging-port=9222",
      `--user-data-dir=${profileDir}`,
      "--no-first-run",
      "--new-window",
      "https://www.douyin.com"
    ], { detached: true, stdio: "ignore" });
    child.unref();
    for (let i = 0; i < 20; i += 1) {
      try {
        await debugJsonRequest("GET", "http://127.0.0.1:9222/json/version");
        return;
      } catch {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    throw new Error("无法连接抖音专用浏览器，请先点“打开登录窗口/导出Cookies”。");
  }
}

function cdpSession(webSocketDebuggerUrl) {
  const WebSocketImpl = global.WebSocket || require("ws");
  const ws = new WebSocketImpl(webSocketDebuggerUrl);
  let seq = 1;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
      return;
    }
    listeners.forEach(fn => fn(data));
  };
  const opened = new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  return {
    async send(method, params = {}) {
      await opened;
      const id = seq++;
      ws.send(JSON.stringify({ id, method, params }));
      return new Promise(resolve => pending.set(id, resolve));
    },
    onEvent(fn) {
      listeners.push(fn);
    },
    close() {
      try { ws.close(); } catch {}
    }
  };
}

function readDouyinCookiesForCdp() {
  try {
    if (!fs.existsSync(COOKIES_FILE)) return [];
    const rows = fs.readFileSync(COOKIES_FILE, "utf8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
    return rows.map(line => {
      const parts = line.split("\t");
      if (parts.length < 7) return null;
      const [domain, , cookiePath, secure, expires, name, ...valueParts] = parts;
      const value = valueParts.join("\t");
      if (!name || !value) return null;
      const cleanDomain = String(domain || "").replace(/^\./, "") || "douyin.com";
      const cookie = {
        name,
        value,
        domain: cleanDomain.includes("douyin.com") ? domain : cleanDomain,
        path: cookiePath || "/",
        secure: String(secure).toUpperCase() === "TRUE"
      };
      const expiry = Number(expires || 0);
      if (expiry > 0) cookie.expires = expiry;
      return cookie;
    }).filter(Boolean);
  } catch {
    return [];
  }
}

async function getDouyinDebugPage(videoUrl) {
  await ensureDouyinDebugBrowser();
  try {
    const target = await debugJsonRequest("PUT", `http://127.0.0.1:9222/json/new?${encodeURIComponent(videoUrl)}`);
    if (target && target.webSocketDebuggerUrl) return target;
  } catch {
    // Some Edge builds disable /json/new; fall through to an existing tab.
  }
  const tabs = await debugJsonRequest("GET", "http://127.0.0.1:9222/json");
  const page = (Array.isArray(tabs) ? tabs : []).find(tab => tab.type === "page" && tab.webSocketDebuggerUrl)
    || (Array.isArray(tabs) ? tabs : []).find(tab => tab.webSocketDebuggerUrl);
  if (!page) throw new Error("没有找到可控制的抖音浏览器页面。");
  return page;
}

function collectDouyinCommentsFromPayload(payload, ownerNames = [], bucket) {
  const rows = Array.isArray(payload.comments) ? payload.comments : [];
  rows.forEach(row => {
    const normalized = stableNormalizeDouyinComment(row, ownerNames);
    if (!normalized.text) return;
    if (!bucket.comments.some(item => item.id && item.id === normalized.id)) bucket.comments.push(normalized);
  });
}

async function stableGetDouyinCommentsViaBrowser(shareUrl, options = {}, meta = {}) {
  const limit = Math.max(1, Math.min(200, Number(options.limit || 50)));
  const awemeId = meta.awemeId || extractDouyinIdFromText(shareUrl);
  const videoUrl = awemeId ? `https://www.douyin.com/video/${awemeId}` : shareUrl;
  const ownerNames = meta.ownerNames || [];
  const page = await getDouyinDebugPage(videoUrl);
  const cdp = cdpSession(page.webSocketDebuggerUrl);
  const bucket = { comments: [], interactions: [] };

  cdp.onEvent(async event => {
    if (event.method !== "Network.responseReceived") return;
    const response = event.params && event.params.response ? event.params.response : {};
    const url = response.url || "";
    if (!/\/aweme\/v1\/web\/comment\/list\//.test(url)) return;
    try {
      const bodyResult = await cdp.send("Network.getResponseBody", { requestId: event.params.requestId });
      const payload = JSON.parse(bodyResult.result ? bodyResult.result.body : bodyResult.body || "{}");
      collectDouyinCommentsFromPayload(payload, ownerNames, bucket);
    } catch {
      // Network bodies may expire quickly; DOM fallback below still runs.
    }
  });

  try {
    await cdp.send("Page.enable");
    await cdp.send("Network.enable");
    await cdp.send("Runtime.enable");
    const cookies = readDouyinCookiesForCdp();
    if (cookies.length) {
      try {
        await cdp.send("Network.setCookies", { cookies });
      } catch {
        // If CDP rejects a stale cookie shape, keep going with the browser session.
      }
    }
    await cdp.send("Page.navigate", { url: videoUrl });
    await new Promise(resolve => setTimeout(resolve, 6000));
    for (let i = 0; i < 8 && bucket.comments.length < limit; i += 1) {
      await cdp.send("Runtime.evaluate", {
        expression: `
          (() => {
            const scrollers = Array.from(document.querySelectorAll('[class*=comment], [data-e2e*=comment], div')).filter(el => el.scrollHeight > el.clientHeight + 80);
            const target = scrollers.sort((a,b) => b.scrollHeight - a.scrollHeight)[0] || document.scrollingElement;
            target.scrollTop = target.scrollTop + Math.max(400, target.clientHeight || 600);
            window.scrollBy(0, 500);
            return true;
          })()
        `,
        awaitPromise: true
      });
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    if (!bucket.comments.length) {
      try {
        const tabs = await debugJsonRequest("GET", "http://127.0.0.1:9222/json");
        const captchaTab = (Array.isArray(tabs) ? tabs : []).find(tab => /rc-verifycenter|nocaptcha|captcha|verify/i.test(`${tab.title || ""} ${tab.url || ""}`));
        if (captchaTab) {
          throw new Error("检测到抖音验证码/风控验证窗口。请在弹出的专用 Edge 抖音窗口里完成验证，确认能看到评论区后再点抓取。");
        }
      } catch (verifyError) {
        if (/验证码|验证窗口|captcha|nocaptcha|verify/i.test(String(verifyError && verifyError.message || verifyError))) throw verifyError;
      }
      const domResult = await cdp.send("Runtime.evaluate", {
        expression: `
          (() => Array.from(document.querySelectorAll('[data-e2e*=comment], [class*=comment]')).slice(0, 80).map((el, idx) => ({
            id: 'dom_' + idx,
            text: (el.innerText || '').trim(),
            likes: Number(((el.innerText || '').match(/(\\d+)\\s*(赞|like)/i) || [0,0])[1] || 0)
          })).filter(x => x.text && x.text.length > 3))()
        `,
        returnByValue: true
      });
      const value = domResult.result && domResult.result.result ? domResult.result.result.value : [];
      (Array.isArray(value) ? value : []).forEach(row => {
        bucket.comments.push({
          id: row.id,
          user: "@页面评论",
          text: String(row.text || "").slice(0, 500),
          likes: Number(row.likes || 0),
          time: "",
          region: "",
          replyCount: 0,
          isAuthor: false
        });
      });
    }
  } finally {
    cdp.close();
  }

  const sorted = bucket.comments
    .sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0))
    .slice(0, limit);
  const interactions = sorted.filter(row => row.isAuthor).slice(0, 30);
  if (!sorted.length) {
    throw new Error("浏览器页面也没有抓到评论。请在专用抖音窗口手动打开该视频并确认评论区可见，没有验证码后再试。");
  }
  return {
    awemeId,
    title: meta.title || "",
    author: ownerNames[0] || "",
    comments: sorted.slice(0, 50),
    interactions,
    source: "抖音专用浏览器页面 / Network+DOM",
    fetchedAt: new Date().toISOString(),
    cookieReady: hasUsableDouyinCookies()
  };
}

async function stableGetDouyinComments(shareUrl, options = {}) {
  const limit = Math.max(1, Math.min(200, Number(options.limit || 50)));
  const info = await stableDouyinInfo(shareUrl);
  const awemeId = douyinAwemeIdFromInfo(info, shareUrl) || extractDouyinIdFromText(shareUrl);
  if (!awemeId) throw new Error("没有识别到抖音作品 ID，请使用抖音视频详情页或分享链接。");

  const ownerNames = stableDouyinAuthorNames(info);
  const comments = [];
  let cursor = 0;
  let hasMore = true;
  try {
    for (let page = 0; page < 4 && comments.length < limit && hasMore; page += 1) {
      const data = await fetchDouyinCommentPage(awemeId, cursor, Math.min(50, limit - comments.length));
      const raw = Array.isArray(data.comments) ? data.comments : [];
      comments.push(...raw.map(row => stableNormalizeDouyinComment(row, ownerNames)).filter(row => row.text));
      cursor = Number(data.cursor || data.next_cursor || 0);
      hasMore = !!data.has_more && raw.length > 0;
      if (hasMore) await new Promise(resolve => setTimeout(resolve, 900));
    }
  } catch (error) {
    return stableGetDouyinCommentsViaBrowser(shareUrl, options, {
      awemeId,
      ownerNames,
      title: info.title || info.fulltitle || ""
    });
  }

  const sorted = comments
    .sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0))
    .slice(0, limit);

  const interactions = [];
  const replyCandidates = sorted.filter(row => row.replyCount > 0 && row.id).slice(0, 12);
  for (const comment of replyCandidates) {
    try {
      const replies = await fetchDouyinReplyPage(awemeId, comment.id, 0, 20);
      const rows = (Array.isArray(replies.comments) ? replies.comments : [])
        .map(row => stableNormalizeDouyinComment(row, ownerNames))
        .filter(row => row.text);
      const authorRows = rows.filter(row => row.isAuthor || ownerNames.some(name => row.user && row.user.includes(name)));
      authorRows.forEach(reply => {
        interactions.push({
          id: `${comment.id}_${reply.id}`,
          user: comment.user,
          text: comment.text,
          likes: comment.likes,
          time: reply.time || comment.time,
          region: comment.region,
          reply: reply.text,
          replyUser: reply.user || "博主",
          sourceCommentId: comment.id
        });
      });
      await new Promise(resolve => setTimeout(resolve, 650));
    } catch {
      // Reply endpoints are often stricter than top-level comments; keep top comments even if replies fail.
    }
  }

  return {
    awemeId,
    title: info.title || info.fulltitle || "",
    author: ownerNames[0] || "",
    comments: sorted.slice(0, 50),
    interactions: interactions.slice(0, 30),
    source: fs.existsSync(COOKIES_FILE) ? "抖音 Web 评论接口 / cookies.txt" : "抖音 Web 评论接口",
    fetchedAt: new Date().toISOString(),
    cookieReady: fs.existsSync(COOKIES_FILE)
  };
}

async function stableGetDouyinCommentsAndPersist(shareUrl, options = {}) {
  const result = await stableGetDouyinComments(shareUrl, options);
  const key = String(options.videoId || result.awemeId || shareUrl);
  if (key) {
    const side = readDouyinSideData();
    side.comments[key] = result.comments;
    side.interactions[key] = result.interactions;
    writeDouyinSideData(side);
  }
  return result;
}

function buildDouyinCaptureStatus() {
  const side = readDouyinSideData();
  const sync = readDouyinSyncState();
  const cookieJob = readDouyinCookieJob();
  const cookieInfo = readDouyinCookieInfo();
  return {
    success: true,
    cookiesReady: cookieInfo.exists,
    cookiesLoginReady: cookieInfo.loginReady,
    cookieCount: cookieInfo.count,
    cookieLoginNames: cookieInfo.loginNames,
    cookiesFile: COOKIES_FILE,
    sideDataFile: DOUYIN_SIDE_DATA_FILE,
    savedCommentVideos: Object.keys(side.comments || {}).length,
    savedInteractionVideos: Object.keys(side.interactions || {}).length,
    sync: sync || { status: "idle" },
    cookieJob
  };
}

function readDouyinCookieJob() {
  try {
    return JSON.parse(fs.readFileSync(DOUYIN_COOKIE_JOB_FILE, "utf8"));
  } catch {
    return { status: "idle" };
  }
}

function writeDouyinCookieJob(job) {
  fs.writeFileSync(DOUYIN_COOKIE_JOB_FILE, JSON.stringify(job || { status: "idle" }, null, 2), "utf8");
}

function hasUsableDouyinCookies() {
  if (!fs.existsSync(COOKIES_FILE)) return false;
  try {
    const text = fs.readFileSync(COOKIES_FILE, "utf8");
    return parseDouyinCookieInfo(text).loginReady;
  } catch {
    return false;
  }
}

function parseDouyinCookieInfo(text = "") {
  const names = [];
  String(text || "").split(/\r?\n/).forEach(line => {
    if (!line || line.startsWith("#")) return;
    const parts = line.split("\t");
    const name = parts.length >= 7 ? parts[5] : (line.match(/(?:^|;\s*)([^=\s;]+)=/) || [])[1];
    if (name && !names.includes(name)) names.push(name);
  });
  const loginNames = names.filter(name => /^(sessionid|sessionid_ss|sid_guard|sid_tt|uid_tt|uid_tt_ss|passport_auth_status|n_mh)$/i.test(name));
  return {
    exists: !!String(text || "").trim(),
    count: names.length,
    names: names.slice(0, 30),
    loginNames,
    loginReady: loginNames.length > 0
  };
}

function readDouyinCookieInfo() {
  if (!fs.existsSync(COOKIES_FILE)) return parseDouyinCookieInfo("");
  try {
    return parseDouyinCookieInfo(fs.readFileSync(COOKIES_FILE, "utf8"));
  } catch {
    return parseDouyinCookieInfo("");
  }
}

function startDouyinCookieJob() {
  const current = readDouyinCookieJob();
  if (current.status === "running" && Date.now() - Number(current.startedAt || 0) < 10 * 60 * 1000) {
    return current;
  }
  const job = {
    status: "running",
    startedAt: Date.now(),
    updatedAt: Date.now(),
    message: "Opened a dedicated Douyin login window. Log in there; cookies.txt will be saved automatically.",
    cookiesFile: COOKIES_FILE
  };
  writeDouyinCookieJob(job);
  const out = fs.openSync(path.join(ROOT, "douyin-cookie.out.log"), "a");
  const err = fs.openSync(path.join(ROOT, "douyin-cookie.err.log"), "a");
  const child = spawn(process.execPath, ["export-douyin-cookies.js", "--auto"], {
    cwd: ROOT,
    detached: true,
    stdio: ["ignore", out, err],
    windowsHide: false
  });
  child.unref();
  setTimeout(() => {
    const next = hasUsableDouyinCookies()
      ? { ...job, status: "done", updatedAt: Date.now(), message: "cookies.txt saved. Refresh capture status." }
      : { ...job, pid: child.pid, updatedAt: Date.now() };
    writeDouyinCookieJob(next);
  }, 3000);
  return { ...job, pid: child.pid };
}

let douyinSyncJob = readDouyinSyncState() || { status: "idle" };

function normalizeDouyinEntryUrl(entry = {}) {
  const raw = entry.webpage_url || entry.original_url || entry.url || "";
  if (/^https?:\/\//.test(raw) && isDouyinUrl(raw)) return raw;
  const id = extractDouyinIdFromText(raw) || extractDouyinIdFromText(entry.id || entry.display_id || "");
  return id ? `https://www.douyin.com/video/${id}` : "";
}

async function listDouyinProfileVideos(profileUrl, limit = 20) {
  const safeLimit = Math.max(1, Math.min(50, Number(limit) || 20));
  const stdout = await runWithCookieFallback([
    "--dump-single-json",
    "--flat-playlist",
    "--playlist-end", String(safeLimit),
    "--no-warnings",
    "--skip-download",
    profileUrl
  ], 90000);
  const info = JSON.parse(stdout);
  const entries = Array.isArray(info.entries) ? info.entries : [];
  return entries.map(entry => ({
    url: normalizeDouyinEntryUrl(entry),
    title: entry.title || entry.fulltitle || "",
    id: entry.id || entry.display_id || ""
  })).filter(item => item.url);
}

function updateDouyinSyncJob(patch) {
  douyinSyncJob = { ...(douyinSyncJob || {}), ...(patch || {}), updatedAt: new Date().toISOString() };
  writeDouyinSyncState(douyinSyncJob);
  return douyinSyncJob;
}

async function runDouyinSyncJob(options = {}) {
  const sourceUrl = String(options.url || "").trim();
  const limit = Math.max(1, Math.min(50, Number(options.limit || 20)));
  const download = options.download !== false;
  const comments = !!options.comments;
  updateDouyinSyncJob({
    status: "running",
    sourceUrl,
    limit,
    download,
    comments,
    startedAt: new Date().toISOString(),
    finishedAt: "",
    total: 0,
    done: 0,
    saved: 0,
    failed: 0,
    commentsFailed: 0,
    current: "",
    errors: []
  });
  try {
    let items = [];
    if (isDouyinUrl(sourceUrl) && /\/video\//.test(sourceUrl)) {
      items = [{ url: sourceUrl }];
    } else {
      items = await listDouyinProfileVideos(sourceUrl, limit);
    }
    updateDouyinSyncJob({ total: items.length });
    for (const item of items.slice(0, limit)) {
      updateDouyinSyncJob({ current: item.title || item.url });
      try {
        let itemWorked = false;
        if (download) {
          try {
            await saveDouyin(item.url);
            itemWorked = true;
          } catch (downloadError) {
            const errors = [...(douyinSyncJob.errors || []), {
              url: item.url,
              step: "download",
              error: compactDouyinError(downloadError)
            }].slice(-20);
            updateDouyinSyncJob({ errors });
          }
        }
        try {
          await getDouyinMetadata(item.url);
          itemWorked = true;
        } catch (metadataError) {
          const errors = [...(douyinSyncJob.errors || []), {
            url: item.url,
            step: "metadata",
            error: compactDouyinError(metadataError)
          }].slice(-20);
          updateDouyinSyncJob({ errors });
        }
        if (comments) {
          try {
            await stableGetDouyinCommentsAndPersist(item.url, { limit: 50 });
            itemWorked = true;
          } catch (commentError) {
            const errors = [...(douyinSyncJob.errors || []), {
              url: item.url,
              step: "comments",
              error: compactDouyinError(commentError)
            }].slice(-20);
            updateDouyinSyncJob({
              commentsFailed: Number(douyinSyncJob.commentsFailed || 0) + 1,
              errors
            });
          }
        }
        updateDouyinSyncJob({
          done: (douyinSyncJob.done || 0) + 1,
          saved: (douyinSyncJob.saved || 0) + (itemWorked ? 1 : 0),
          failed: (douyinSyncJob.failed || 0) + (itemWorked ? 0 : 1)
        });
      } catch (error) {
        const errors = [...(douyinSyncJob.errors || []), { url: item.url, error: compactDouyinError(error) }].slice(-20);
        updateDouyinSyncJob({ done: (douyinSyncJob.done || 0) + 1, failed: (douyinSyncJob.failed || 0) + 1, errors });
      }
      await new Promise(resolve => setTimeout(resolve, 2500));
    }
    updateDouyinSyncJob({ status: "done", current: "", finishedAt: new Date().toISOString() });
  } catch (error) {
    updateDouyinSyncJob({
      status: "failed",
      current: "",
      finishedAt: new Date().toISOString(),
      errors: [...(douyinSyncJob.errors || []), { url: sourceUrl, error: compactDouyinError(error) }].slice(-20)
    });
  }
}

function startDouyinSyncJob(options = {}) {
  if (douyinSyncJob && douyinSyncJob.status === "running") return douyinSyncJob;
  const sourceUrl = String(options.url || "").trim();
  if (!sourceUrl || !isDouyinUrl(sourceUrl)) throw new Error("请填写抖音博主主页、合集或视频链接。");
  runDouyinSyncJob(options);
  return douyinSyncJob;
}

function serveStatic(req, res) {
  const pathname = decodeURIComponent(req.url.split("?")[0]);
  const requestPath = pathname === "/" ? "/index.html" : pathname;
  if (requestPath.startsWith("/api/")) {
    res.writeHead(404);
    res.end("API not found");
    return;
  }
  const filePath = path.join(ROOT, requestPath);
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const type = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".ico": "image/x-icon"
  }[ext] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  fs.createReadStream(filePath)
    .on("error", () => {
      if (!res.headersSent) res.writeHead(500);
      res.end("Read failed");
    })
    .pipe(res);
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, "http://localhost");

  if (req.method === "GET" && requestUrl.pathname === "/api/knowledge-backup") {
    sendJson(res, 200, { success: true, backup: knowledgeBackupPayload() });
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/knowledge-restore") {
    readRequestBody(req, 20 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        sendJson(res, 200, { success: true, restored: restoreKnowledgeBackup(payload.backup || payload) });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.method === "GET" && requestUrl.pathname === "/api/agent-memory") {
    sendJson(res, 200, { success: true, memory: readAgentMemory(), memoryFile: AGENT_MEMORY_FILE });
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/agent-memory") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        if (payload.action === "clear") {
          const memory = writeAgentMemory(emptyAgentMemory());
          sendJson(res, 200, { success: true, memory });
          return;
        }
        if (payload.action === "delete") {
          const removed = deleteAgentMemory(String(payload.id || ""));
          sendJson(res, 200, { success: true, removed, memory: readAgentMemory() });
          return;
        }
        const item = addAgentMemory(payload);
        sendJson(res, 200, { success: true, item, memory: readAgentMemory() });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.method === "GET" && requestUrl.pathname === "/api/agent-history") {
    const limit = Math.max(1, Math.min(100, Number(requestUrl.searchParams.get("limit") || 30)));
    const conversations = readAgentMemory().conversations.slice(-limit).reverse();
    sendJson(res, 200, { success: true, conversations });
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/agent-search-context") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        sendJson(res, 200, { success: true, result: searchAgentContext(payload.query || "", payload.context || []) });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/agent-chat") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const startedAt = Date.now();
        return callOpenAICompatible(payload.provider || "mock", payload.message || "", payload.context || [])
          .then(result => {
            appendAgentLog({
              ok: true,
              kind: "chat",
              provider: result.provider,
              route: payload.route || "",
              durationMs: Date.now() - startedAt,
              contextItems: Array.isArray(payload.context) ? payload.context.length : 0,
              answerLength: String(result.answer || "").length
            });
            appendAgentConversation({
              user: payload.message || "",
              assistant: result.answer || "",
              provider: result.provider && result.provider.id,
              route: payload.route || "",
              contextSummary: summarizeContextItems(payload.context || [])
            });
            return result;
          })
          .catch(error => {
            appendAgentLog({
              ok: false,
              kind: "chat",
              providerId: payload.provider || "mock",
              route: payload.route || "",
              durationMs: Date.now() - startedAt,
              contextItems: Array.isArray(payload.context) ? payload.context.length : 0,
              error: error.message
            });
            throw error;
          });
      })
      .then(result => sendJson(res, 200, { success: true, provider: result.provider, answer: result.answer }))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/agent-test-parse") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const startedAt = Date.now();
        return testAgentParse(payload)
          .then(result => {
            appendAgentLog({
              ok: Boolean(result.ok),
              kind: "parse-test",
              provider: result.provider,
              endpoint: result.endpoint,
              model: result.model,
              responsePath: result.responsePath,
              durationMs: Date.now() - startedAt,
              answerLength: String(result.parsed || "").length,
              error: result.error || ""
            });
            return result;
          })
          .catch(error => {
            appendAgentLog({
              ok: false,
              kind: "parse-test",
              providerId: payload.provider || "",
              durationMs: Date.now() - startedAt,
              error: error.message
            });
            throw error;
          });
      })
      .then(result => sendJson(res, 200, { success: true, result }))
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (requestUrl.pathname === "/api/agent-logs") {
    if (req.method === "GET") {
      const limit = Math.max(1, Math.min(300, Number(requestUrl.searchParams.get("limit") || 80)));
      sendJson(res, 200, { success: true, logs: readAgentLogs().slice(-limit).reverse(), logFile: AGENT_LOG_FILE });
      return;
    }
    if (req.method === "POST") {
      readRequestBody(req)
        .then(body => {
          const payload = JSON.parse(body || "{}");
          if (payload.action === "clear") clearAgentLogs();
          sendJson(res, 200, { success: true, logs: readAgentLogs() });
        })
        .catch(error => sendJson(res, 400, { success: false, error: error.message }));
      return;
    }
  }

  if (req.method === "GET" && requestUrl.pathname === "/api/agent-diagnostics") {
    sendJson(res, 200, buildAgentDiagnostics());
    return;
  }

  if (req.method === "POST" && req.url === "/api/agent-config") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const provider = String(payload.provider || "").trim();
        if (!provider || provider === "mock") throw new Error("请选择需要配置的模型供应商。");
        const config = readAgentConfig();
        const current = config[provider] || {};
        const apiKey = String(payload.apiKey || current.apiKey || "").trim();
        const endpoint = String(payload.endpoint || "").trim();
        if (apiKey && !isUsableApiKey(apiKey)) {
          throw new Error("\u8fd9\u4e2a API Key \u770b\u8d77\u6765\u4e0d\u5b8c\u6574\u6216\u5305\u542b\u661f\u53f7\uff0c\u8bf7\u7c98\u8d34\u5b8c\u6574\u5bc6\u94a5\u3002");
        }
        config[provider] = {
          ...current,
          apiKey,
          model: String(payload.model || current.model || "").trim(),
          responsePath: Object.prototype.hasOwnProperty.call(payload, "responsePath")
            ? String(payload.responsePath || "").trim()
            : String(current.responsePath || "").trim()
        };
        if (Object.prototype.hasOwnProperty.call(payload, "endpoint")) {
          config[provider].endpoint = endpoint;
        }
        if (provider === "workbuddy" && /^ck_/i.test(apiKey) && !endpoint) {
          config[provider].endpoint = "cli:codebuddy";
          config[provider].model = "CodeBuddy CLI";
        }
        writeAgentConfig(config);
        sendJson(res, 200, { success: true, providers: agentProviders() });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.url === "/api/agent-providers") {
    sendJson(res, 200, { success: true, providers: agentProviders(), configFile: AGENT_CONFIG_FILE });
    return;
  }

  if (req.url.startsWith("/api/sector-quotes")) {
    const url = new URL(req.url, "http://localhost");
    const names = (url.searchParams.get("names") || "").split(",");
    getEastmoneySectorQuotes(names)
      .then(items => sendJson(res, 200, { success: true, items, source: "东方财富板块", cached: false }))
      .catch(error => {
        getSinaSectorQuotes(names)
          .then(items => sendJson(res, 200, { success: true, items, source: "新浪财经行业板块", cached: false, warning: error.message }))
          .catch(fallbackError => {
            const cached = readMarketCache(SECTOR_QUOTE_CACHE_FILE);
            const wanted = names.map(name => String(name || "").trim()).filter(Boolean);
            const rows = cached?.items || [];
            const items = wanted.length
              ? wanted.map(name => rows.find(row => row.name === name || row.name.includes(name) || name.includes(row.name)) || { name, query: name, source: "缓存未匹配" })
              : rows.slice(0, 200);
            sendJson(res, items.length ? 200 : 502, { success: Boolean(items.length), error: `${error.message}；${fallbackError.message}`, items, source: items.length ? "板块最近成功缓存" : "板块行情", cached: Boolean(items.length), asOf: cached?.at || null });
          });
      });
    return;
  }

  if (req.method === "POST" && req.url === "/api/a-share-screen") {
    (async () => {
      const body = await readRequestBody(req);
      const payload = JSON.parse(body || "{}");
      const rules = payload.rules || {};
      let universe = [];
      let cached = false;
      let upstreamError = "";
      try {
        universe = await getEastmoneyAShareUniverse(Boolean(payload.force));
      } catch (error) {
        upstreamError = error.message;
        try {
          universe = await getSinaAShareUniverse();
        } catch (fallbackError) {
          const saved = readMarketCache(A_SHARE_UNIVERSE_CACHE_FILE);
          universe = saved?.items || [];
          cached = universe.length > 0;
          upstreamError = `${upstreamError}；${fallbackError.message}`;
        }
      }
      if (!universe.length) throw new Error(upstreamError || "A 股全市场数据暂不可用");
      const items = screenAShareUniverse(universe, rules);
      sendJson(res, 200, {
        success: true,
        universeCount: universe.length,
        matchedCount: items.length,
        items,
        rules,
        asOf: new Date().toISOString(),
        source: cached ? "A 股最近成功缓存" : (universe[0]?.source || "东方财富 A 股行情/财务快照"),
        cached,
        warning: upstreamError,
        note: "策略分仅用于候选排序，不代表上涨概率或投资评级。"
      });
    })().catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/a-share-candidate-audit") {
    (async () => {
      const body = await readRequestBody(req, 2 * 1024 * 1024);
      const payload = JSON.parse(body || "{}");
      const auditedItems = await auditAShareCandidates(payload.items || [], payload.options || {});
      const verified = auditedItems.filter(item => item.auditStatus === "verified").length;
      const failed = auditedItems.length - verified;
      const coverage = auditedItems.length
        ? Math.round(auditedItems.reduce((sum, item) => sum + Number(item.auditCoverage || 0), 0) / auditedItems.length)
        : 0;
      const items = screenAShareUniverse(auditedItems, { ...(payload.rules || {}), limit: Math.max(10, auditedItems.length) });
      sendJson(res, 200, {
        success: true,
        items,
        auditedCount: auditedItems.length,
        verified,
        failed,
        coverage,
        asOf: new Date().toISOString(),
        source: "东方财富财务 / 东方财富或腾讯历史日线",
        note: "深度复核只补全候选股，不对全市场逐股请求，避免限流和页面卡顿。"
      });
    })().catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/a-share-natural-screen") {
    (async () => {
      const body = await readRequestBody(req, 2 * 1024 * 1024);
      const payload = JSON.parse(body || "{}");
      const query = String(payload.query || "").trim();
      if (!query) throw new Error("请输入自然语言选股条件。");
      const result = await runNaturalStockScreen(query, payload.options || {});
      sendJson(res, 200, result);
    })().catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url === "/api/market-indexes") {
    getMarketIndexes()
      .then(items => sendJson(res, 200, { success: true, items }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: marketIndexCache.data }));
    return;
  }

  if (req.url.startsWith("/api/market-quotes")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    getMarketQuotesWithInstitutional(keys)
      .then(items => sendJson(res, 200, { success: true, items }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url.startsWith("/api/sector-quotes")) {
    const url = new URL(req.url, "http://localhost");
    const names = (url.searchParams.get("names") || "").split(",");
    getEastmoneySectorQuotes(names)
      .then(items => sendJson(res, 200, { success: true, items, source: "东方财富板块" }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [], source: "东方财富板块" }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/a-share-screen") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        return getEastmoneyAShareUniverse(Boolean(payload.force)).then(universe => ({ universe, rules: payload.rules || {} }));
      })
      .then(({ universe, rules }) => {
        const items = screenAShareUniverse(universe, rules);
        sendJson(res, 200, {
          success: true,
          universeCount: universe.length,
          matchedCount: items.length,
          items,
          rules,
          asOf: new Date().toISOString(),
          source: "东方财富 A 股行情/财务快照",
          note: "策略分仅用于候选排序，不代表上涨概率或投资评级。"
        });
      })
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url.startsWith("/api/institutional-probe")) {
    const url = new URL(req.url, "http://localhost");
    const connect = ["1", "true", "yes"].includes(String(url.searchParams.get("connect") || "").toLowerCase());
    runInstitutionalProbe({ connect })
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, providers: [] }));
    return;
  }

  if (req.url.startsWith("/api/data-source-health")) {
    buildDataSourceHealth()
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/investment-data-quality")) {
    sendJson(res, 200, buildInvestmentDataQuality());
    return;
  }

  if (req.url.startsWith("/api/institutional-data")) {
    const url = new URL(req.url, "http://localhost");
    const type = url.searchParams.get("type") === "financials" ? "financials" : "quotes";
    const keys = (url.searchParams.get("keys") || "").split(",");
    getInstitutionalRows(type, keys)
      .then(result => sendJson(res, 200, { success: true, ...result }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, rows: [] }));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/qmt-bridge/status")) {
    sendJson(res, 200, readQmtBridgeStatus());
    return;
  }

  if (req.method === "POST" && req.url === "/api/qmt-bridge/sync-codes") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const result = writeQmtBridgeCodes(payload.items || payload.codes || []);
        sendJson(res, 200, { success: true, ...readQmtBridgeStatus(), synced: result.codes.length });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/qmt-bridge/install-strategy") {
    try {
      if (!fs.existsSync(QMT_BRIDGE_STRATEGY_FILE)) throw new Error("桥接策略源文件不存在。");
      fs.mkdirSync(path.dirname(QMT_BRIDGE_QMT_STRATEGY_FILE), { recursive: true });
      fs.copyFileSync(QMT_BRIDGE_STRATEGY_FILE, QMT_BRIDGE_QMT_STRATEGY_FILE);
      sendJson(res, 200, { success: true, ...readQmtBridgeStatus() });
    } catch (error) {
      sendJson(res, 500, { success: false, error: error.message });
    }
    return;
  }

  if (req.url.startsWith("/api/stock-brief")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    const includeAnnouncements = ["1", "true", "yes"].includes(String(url.searchParams.get("announcements") || "").toLowerCase());
    const announcementLimit = Number(url.searchParams.get("announcementLimit") || 4);
    const includeAnnouncementText = ["1", "true", "yes"].includes(String(url.searchParams.get("announcementText") || "").toLowerCase());
    const announcementTextLimit = Number(url.searchParams.get("announcementTextLimit") || 8000);
    getStockBriefs(keys, { includeAnnouncements, announcementLimit, includeAnnouncementText, announcementTextLimit })
      .then(items => sendJson(res, 200, { success: true, items }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url.startsWith("/api/stock-kline")) {
    const url = new URL(req.url, "http://localhost");
    const key = url.searchParams.get("key") || url.searchParams.get("symbol") || "";
    getHistoricalKline(key, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, { success: true, key: normalizeStockBriefKey(key), rows: result.rows || [], source: result.source || "历史日线" }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, rows: [] }));
    return;
  }

  if (req.url === "/api/stock-backtest" || req.url.startsWith("/api/stock-backtest?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runStockBacktest(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url === "/api/stock-backtest-optimize" || req.url.startsWith("/api/stock-backtest-optimize?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runStockBacktestOptimization(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url === "/api/stock-backtest-walkforward" || req.url.startsWith("/api/stock-backtest-walkforward?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runStockWalkforward(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url === "/api/prediction-backtest" || req.url.startsWith("/api/prediction-backtest?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runPredictionBacktest(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url === "/api/portfolio-backtest" || req.url.startsWith("/api/portfolio-backtest?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runPortfolioBacktest(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [], portfolio: null }));
    return;
  }

  if (req.url === "/api/rotation-strategy" || req.url.startsWith("/api/rotation-strategy?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runRotationStrategy(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [], selected: [] }));
    return;
  }

  if (req.url === "/api/risk-plan" || req.url.startsWith("/api/risk-plan?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runRiskPlan(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, rotation: null, portfolio: null }));
    return;
  }

  if (req.url === "/api/quant-report" || req.url.startsWith("/api/quant-report?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runQuantReport(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, report: "" }));
    return;
  }

  if (req.url === "/api/rotation-backtest" || req.url.startsWith("/api/rotation-backtest?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runHistoricalRotationBacktest(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, portfolio: null, periods: [] }));
    return;
  }

  if (req.url === "/api/rotation-matrix" || req.url.startsWith("/api/rotation-matrix?")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    runRotationParameterMatrix(keys, parseBacktestOptions(url))
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, results: [] }));
    return;
  }

  if (req.url.startsWith("/api/stock-search")) {
    const url = new URL(req.url, "http://localhost");
    const query = url.searchParams.get("q") || url.searchParams.get("query") || "";
    const limit = Number(url.searchParams.get("limit") || 6);
    searchEastmoneyStocks(query, limit)
      .then(items => sendJson(res, 200, { success: true, items, source: "东方财富搜索" }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.url.startsWith("/api/stock-announcements")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    const limit = Number(url.searchParams.get("limit") || 5);
    const includeText = ["1", "true", "yes"].includes(String(url.searchParams.get("text") || "").toLowerCase());
    const includeFullText = ["1", "true", "yes"].includes(String(url.searchParams.get("fullText") || "").toLowerCase());
    getStockAnnouncements(keys, limit, { includeText, includeFullText, textLimit: Number(url.searchParams.get("textLimit") || 8000) })
      .then(items => sendJson(res, 200, { success: true, items, source: "巨潮资讯公告" }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/announcement-extract") {
    readRequestBody(req, 2 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        return extractAnnouncementPdf(payload.url || "", payload.title || "", {
          force: !!payload.force,
          textLimit: Number(payload.textLimit || 12000)
        });
      })
      .then(result => sendJson(res, 200, { success: true, result }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/stock-financials")) {
    const url = new URL(req.url, "http://localhost");
    const keys = (url.searchParams.get("keys") || "").split(",");
    getFinancialsWithInstitutional(keys)
      .then(items => sendJson(res, 200, { success: true, items, source: [...new Set(items.map(item => item.financialSource || item.source || "东方财富财务"))].join(" / ") || "东方财富财务" }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message, items: [] }));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/stock-profiles")) {
    sendJson(res, 200, { success: true, profiles: readStockProfiles(), profileFile: STOCK_PROFILE_FILE });
    return;
  }

  if (req.method === "POST" && req.url === "/api/stock-profiles") {
    readRequestBody(req)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        if (payload.action === "clear") {
          sendJson(res, 200, { success: true, profiles: writeStockProfiles(emptyStockProfiles()) });
          return;
        }
        const profiles = upsertStockProfile(payload);
        sendJson(res, 200, { success: true, profiles });
      })
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.url === "/api/local-videos") {
    sendJson(res, 200, { success: true, videos: getLocalVideos() });
    return;
  }

  if (req.url === "/api/local-documents") {
    sendJson(res, 200, { success: true, documents: getLocalDocuments(), documentsDir: DOCUMENTS_DIR });
    return;
  }

  if (req.url === "/api/metadata-videos") {
    sendJson(res, 200, { success: true, items: readMetadata(), metadataFile: METADATA_FILE });
    return;
  }

  if (req.url === "/api/export-metadata.csv") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=douyin_metadata.csv"
    });
    res.end("\ufeff" + metadataCsv(readMetadata()));
    return;
  }

  if (req.url === "/api/import-status") {
    sendJson(res, 200, {
      success: true,
      videosDir: VIDEOS_DIR,
      videoDirs: getVideoDirs(),
      metadataFile: METADATA_FILE,
      documentsDir: DOCUMENTS_DIR,
      cookiesFile: COOKIES_FILE,
      hasCookiesFile: fs.existsSync(COOKIES_FILE),
      transcriptsDir: TRANSCRIPTS_DIR
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/import-document") {
    readRequestBody(req, 120 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        return importDocumentFile(payload);
      })
      .then(document => sendJson(res, 200, { success: true, document, documentsDir: DOCUMENTS_DIR }))
      .catch(error => sendJson(res, 400, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/extract-document") {
    readRequestBody(req, 2 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        return extractDocumentFile(payload);
      })
      .then(result => sendJson(res, 200, { success: true, ...result }))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/parse-sector-map") {
    readRequestBody(req, 120 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        return parseSectorMapPayload(payload);
      })
      .then(result => sendJson(res, 200, result))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/transcribe-video") {
    readRequestBody(req, 2 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const filePath = resolveVideoPathFromPayload(payload);
        if (!filePath) throw new Error("只能转写本地视频。请先从素材库打开本地视频，再点提取语音文字。");
        return runWhisperTranscription(filePath);
      })
      .then(result => sendJson(res, 200, { success: true, ...result }))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/ocr-video-title") {
    readRequestBody(req, 2 * 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const filePath = resolveVideoPathFromPayload(payload);
        if (!filePath) throw new Error("只能识别本地视频画面标题。请先从素材库打开本地视频。");
        return extractVideoTitleByOcr(filePath, { id: payload.id, force: !!payload.force });
      })
      .then(result => sendJson(res, 200, { success: true, ...result }))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/douyin-parse")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const shareUrl = parsed.searchParams.get("url");
    if (!shareUrl) return sendJson(res, 400, { success: false, error: "Missing url parameter." });
    if (!isDouyinUrl(shareUrl)) return sendJson(res, 400, { success: false, error: "This is not a Douyin link." });
    resolveDouyin(shareUrl)
      .then(result => sendJson(res, 200, { success: true, ...result, videoUrl: `/api/douyin-stream?url=${encodeURIComponent(shareUrl)}` }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/douyin-meta")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const shareUrl = parsed.searchParams.get("url");
    if (!shareUrl) return sendJson(res, 400, { success: false, error: "Missing url parameter." });
    if (!isDouyinUrl(shareUrl)) return sendJson(res, 400, { success: false, error: "This is not a Douyin link." });
    getDouyinMetadata(shareUrl)
      .then(item => sendJson(res, 200, { success: true, item }))
      .catch(error => sendJson(res, 500, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/douyin-capture-status")) {
    sendJson(res, 200, buildDouyinCaptureStatus());
    return;
  }

  if (req.method === "POST" && req.url === "/api/douyin-cookie-login") {
    try {
      const job = startDouyinCookieJob();
      sendJson(res, 200, { success: true, job, status: buildDouyinCaptureStatus() });
    } catch (error) {
      sendJson(res, 500, { success: false, error: compactDouyinError(error) });
    }
    return;
  }

  if (req.url.startsWith("/api/douyin-sync-status")) {
    sendJson(res, 200, { success: true, job: douyinSyncJob || readDouyinSyncState() || { status: "idle" } });
    return;
  }

  if (req.url.startsWith("/api/douyin-side-data")) {
    sendJson(res, 200, { success: true, ...readDouyinSideData() });
    return;
  }

  if (req.method === "POST" && req.url === "/api/douyin-sync") {
    readRequestBody(req, 1024 * 1024)
      .then(body => {
        const payload = JSON.parse(body || "{}");
        const job = startDouyinSyncJob(payload);
        sendJson(res, 200, { success: true, job });
      })
      .catch(error => sendJson(res, 400, { success: false, error: compactDouyinError(error) }));
    return;
  }

  if (req.url.startsWith("/api/douyin-comments")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const shareUrl = parsed.searchParams.get("url");
    const limit = Number(parsed.searchParams.get("limit") || 30);
    const videoId = parsed.searchParams.get("videoId") || "";
    if (!shareUrl) return sendJson(res, 400, { success: false, error: "Missing url parameter." });
    if (!isDouyinUrl(shareUrl)) return sendJson(res, 400, { success: false, error: "This is not a Douyin link." });
    stableGetDouyinCommentsAndPersist(shareUrl, { limit, videoId })
      .then(result => sendJson(res, 200, { success: true, ...result }))
      .catch(error => {
        const detail = String(error && error.message ? error.message : error || "").replace(/\s+/g, " ").slice(0, 600);
        sendJson(res, 502, {
          success: false,
          error: compactDouyinError(error),
          detail,
          status: buildDouyinCaptureStatus(),
          hint: "Douyin comments require a real logged-in browser session. If cookiesLoginReady is false, open the dedicated Douyin login window and finish login/verification, then retry."
        });
      });
    return;
  }

  if (req.url.startsWith("/api/douyin-save")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const shareUrl = parsed.searchParams.get("url");
    if (!shareUrl) return sendJson(res, 400, { success: false, error: "Missing url parameter." });
    if (!isDouyinUrl(shareUrl)) return sendJson(res, 400, { success: false, error: "This is not a Douyin link." });
    saveDouyin(shareUrl)
      .then(video => sendJson(res, 200, { success: true, video }))
      .catch(error => sendJson(res, 502, { success: false, error: error.message }));
    return;
  }

  if (req.url.startsWith("/api/douyin-stream")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const shareUrl = parsed.searchParams.get("url");
    if (!shareUrl) {
      res.writeHead(400);
      res.end("Missing url parameter.");
      return;
    }
    resolveDouyin(shareUrl).then(async result => {
      const headers = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15",
        "Referer": "https://www.douyin.com/",
        "Accept": "*/*"
      };
      if (req.headers.range) headers.Range = req.headers.range;
      const upstream = await fetch(result.videoUrl, { headers, redirect: "follow" });
      if (!upstream.ok && upstream.status !== 206) {
        res.writeHead(502);
        res.end(`Video upstream failed: ${upstream.status}`);
        return;
      }
      const responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": upstream.headers.get("content-type") || "video/mp4",
        "Accept-Ranges": upstream.headers.get("accept-ranges") || "bytes",
        "Cache-Control": "public, max-age=600"
      };
      const contentLength = upstream.headers.get("content-length");
      const contentRange = upstream.headers.get("content-range");
      if (contentLength) responseHeaders["Content-Length"] = contentLength;
      if (contentRange) responseHeaders["Content-Range"] = contentRange;
      res.writeHead(req.headers.range ? 206 : 200, responseHeaders);
      Readable.fromWeb(upstream.body).pipe(res);
    }).catch(error => {
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" });
      res.end("Douyin parse failed: " + error.message);
    });
    return;
  }

  if (req.url.startsWith("/api/local-video/")) {
    const filename = decodeURIComponent(req.url.replace("/api/local-video/", ""));
    const filePath = getLocalVideoByName(filename);
    if (!filePath || !fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const range = req.headers.range;
    if (range) {
      const [startText, endText] = range.replace("bytes=", "").split("-");
      const start = Number.parseInt(startText, 10);
      const end = endText ? Number.parseInt(endText, 10) : stat.size - 1;
      res.writeHead(206, {
        "Content-Type": mimeType(ext),
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes"
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": mimeType(ext),
        "Content-Length": stat.size,
        "Accept-Ranges": "bytes"
      });
      fs.createReadStream(filePath).pipe(res);
    }
    return;
  }

  if (req.url.startsWith("/api/local-document/")) {
    const filename = decodeURIComponent(req.url.replace("/api/local-document/", ""));
    const safe = sanitizeFilename(filename);
    const filePath = path.join(DOCUMENTS_DIR, safe);
    const ext = path.extname(filePath).toLowerCase();
    if (!fs.existsSync(filePath) || !DOCUMENT_EXTS.includes(ext)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      "Content-Type": mimeType(ext),
      "Content-Length": stat.size,
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(safe)}`
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (req.url.startsWith("/api/local-video-file")) {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const filePath = parsed.searchParams.get("path");
    if (!filePath || !isAllowedVideoPath(filePath) || !fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const range = req.headers.range;
    if (range) {
      const [startText, endText] = range.replace("bytes=", "").split("-");
      const start = Number.parseInt(startText, 10);
      const end = endText ? Number.parseInt(endText, 10) : stat.size - 1;
      res.writeHead(206, {
        "Content-Type": mimeType(ext),
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes"
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": mimeType(ext),
        "Content-Length": stat.size,
        "Accept-Ranges": "bytes"
      });
      fs.createReadStream(filePath).pipe(res);
    }
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  const videos = getLocalVideos();
  console.log("\n========================================");
  console.log("  Model Dashboard local server");
  console.log("========================================");
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Videos: ${VIDEOS_DIR}`);
  console.log(`  Found ${videos.length} local videos`);
  console.log("========================================\n");
});
