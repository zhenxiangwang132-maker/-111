const STORE_KEY = "mm_dashboard_state_v3";
const AGENT_PROVIDER_KEY = "xiaoke_agent_provider";
const AGENT_ROUTE_RULES_KEY = "xiaoke_agent_route_rules_v1";
const WATCHLIST_KEY = "xiaoke_watchlist_groups_v1";
const BRANCH_ZOOM_KEY = "xiaoke_branch_zoom";
const DAILY_TASK_KEY = "xiaoke_daily_task";
const DAILY_FOCUS_KEY = "xiaoke_daily_focus";
const DAILY_REVIEW_KEY = "xiaoke_daily_review_rows";
const SECTOR_STRENGTH_KEY = "xiaoke_sector_strength_notes_v1";
const WATCHLIST_COLLAPSE_KEY = "xiaoke_watchlist_collapsed_v1";
const BRANCH_VIEW_KEY = "xiaoke_branch_view_v1";
const WATCHLIST_PREVIEW_KEY = "xiaoke_watchlist_preview_items_v1";
const VIDEO_ANALYSIS_KEY = "xiaoke_video_ai_analysis_v1";
const VIDEO_TEXT_KEY = "xiaoke_video_text_v1";
const VIDEO_ANALYSIS_V2_KEY = "xiaoke_video_ai_analysis_v2";
const VIDEO_LINKS_KEY = "xiaoke_video_links_v1";
const VIDEO_PIPELINE_KEY = "xiaoke_video_pipeline_v1";
const PHILOSOPHY_LIBRARY_KEY = "xiaoke_philosophy_library_v1";
const ASSET_ALLOCATION_KEY = "xiaoke_asset_allocation_v1";
const ERROR_BOOK_KEY = "xiaoke_error_book_v1";
const AUTO_REFRESH_KEY = "xiaoke_auto_refresh_enabled";
const DELETED_VIDEO_IDS_KEY = "xiaoke_deleted_video_ids_v1";
const STOCK_RISK_RADAR_KEY = "xiaoke_stock_risk_radar_v1";
const STOCK_COMPARE_RESULT_KEY = "xiaoke_stock_compare_result_v1";
const STOCK_COMPARE_POOL_KEY = "xiaoke_stock_compare_pool_v1";
const QUANT_ROTATION_KEY = "xiaoke_quant_rotation_v1";
const QUANT_RISK_PLAN_KEY = "xiaoke_quant_risk_plan_v1";
const QUANT_REPORT_KEY = "xiaoke_quant_report_v1";
const QUANT_ROTATION_BACKTEST_KEY = "xiaoke_quant_rotation_backtest_v1";
const QUANT_ROTATION_MATRIX_KEY = "xiaoke_quant_rotation_matrix_v1";

const tags = [
  { name: "全部", count: 103, type: "all" },
  { name: "科创芯片", count: 25, type: "sector" },
  { name: "有色金属", count: 22, type: "sector" },
  { name: "创新药", count: 16, type: "sector" },
  { name: "商业航天", count: 14, type: "sector" },
  { name: "光模块", count: 12, type: "sector" },
  { name: "自主科技", count: 12, type: "sector" },
  { name: "机器人", count: 11, type: "sector" },
  { name: "AI应用", count: 9, type: "sector" },
  { name: "交易系统", count: 0, type: "sector" },
  { name: "投资哲学", count: 0, type: "sector" },
  { name: "宏观周期", count: 0, type: "sector" },
  { name: "模型先生视频", count: 0, type: "source", sourceAuthor: "模型先生" }
];
const STOCK_QUOTE_ALIASES = {
  "\u5146\u6613\u521b\u65b0": "sh603986",
  "\u5408\u80a5\u57ce\u5efa": "sz002208",
  "\u8d5b\u529b\u65af": "sh601127",
  "\u8305\u53f0": "sh600519",
  "\u4e2d\u82af\u56fd\u9645": "sh688981",
  "\u65b0\u6613\u76db": "sz300502",
  "\u4e2d\u9645\u65ed\u521b": "sz300308",
  "\u5bd2\u6b66\u7eaa": "sh688256",
  "\u7d2b\u91d1\u77ff\u4e1a": "sh601899",
  "\u82f1\u4f1f\u8fbe": "usNVDA",
  "\u7279\u65af\u62c9": "usTSLA",
  "\u53f0\u79ef\u7535": "usTSM",
  "\u5317\u65b9\u534e\u521b": "sz002371",
  "\u4e2d\u5fae\u516c\u53f8": "sh688012",
  "\u62d3\u8346\u79d1\u6280": "sh688072",
  "\u76db\u7f8e\u4e0a\u6d77": "sh688082",
  "\u534e\u6d77\u6e05\u79d1": "sh688120",
  "\u4e2d\u73af\u80a1\u4efd": "sz002129",
  "\u7acb\u6602\u5fae": "sh605358",
  "\u96c5\u514b\u79d1\u6280": "sz002409",
  "\u9f0e\u9f99\u80a1\u4efd": "sz300054",
  "\u534e\u5927\u4e5d\u5929": "sz301269",
  "\u82af\u539f\u80a1\u4efd": "sh688521",
  "\u5e7f\u7acb\u5fae": "sz301095",
  "\u6982\u4f26\u7535\u5b50": "sh688206",
  "\u65b0\u83b1\u5e94\u6750": "sz300260",
  "\u5bcc\u521b\u7cbe\u5bc6": "sh688409",
  "\u7cbe\u6d4b\u7535\u5b50": "sz300567",
  "\u6c49\u949f\u7cbe\u673a": "sz002158",
  "\u5b89\u96c6\u79d1\u6280": "sh688019",
  "\u5357\u5927\u5149\u7535": "sz300346",
  "\u6c5f\u4e30\u7535\u5b50": "sz300666",
  "\u6709\u7814\u65b0\u6750": "sh600206",
  "\u7d2b\u5149\u56fd\u5fae": "sz002049",
  "\u5146\u6613\u521b\u65b0": "sh603986",
  "\u6f9c\u8d77\u79d1\u6280": "sh688008",
  "\u5353\u80dc\u5fae": "sz300782",
  "\u957f\u946b\u5b58\u50a8": "sh688110",
  "\u957f\u6c5f\u5b58\u50a8": "",
  "\u534e\u8679\u516c\u53f8": "sh688347",
  "\u58eb\u5170\u5fae": "sh600460",
  "\u6676\u5408\u96c6\u6210": "sh688249",
  "\u957f\u7535\u79d1\u6280": "sh600584",
  "\u901a\u5bcc\u5fae\u7535": "sz002156",
  "\u534e\u5929\u79d1\u6280": "sz002185",
  "\u6613\u4e2d\u5929": "",
  "\u5149\u5e93\u79d1\u6280": "sz300620",
  "\u534e\u5de5\u79d1\u6280": "sz000988",
  "\u5149\u8fc5\u79d1\u6280": "sz002281",
  "\u7279\u53d1\u4fe1\u606f": "sz000070",
  "\u4e2d\u8d44\u7535\u5b50": "",
  "\u957f\u98de\u5149\u7ea4": "sh601869",
  "\u6c38\u9f0e\u80a1\u4efd": "sh600105",
  "\u901a\u9f0e\u4e92\u8054": "sz002491",
  "\u592a\u8fb0\u5149": "sz300570",
  "\u534e\u8109\u79d1\u6280": "sh603042",
  "\u4e91\u5357\u9534\u4e1a": "sz002428",
  "\u5929\u901a\u80a1\u4efd": "sh600330",
  "\u798f\u6676\u79d1\u6280": "sz002222",
  "\u80dc\u5b8f\u79d1\u6280": "sz300476",
  "\u6caa\u7535\u80a1\u4efd": "sz002463",
  "\u666f\u65fa\u7535\u5b50": "sh603228",
  "\u751f\u76ca\u7535\u5b50": "sh688183"
};

const watchlist = [
  { name: "寒武纪", count: 19, sector: "科创板", desc: "国产 AI 算力龙头，高弹性但波动大。", status: "ok" },
  { name: "赛力斯", count: 16, sector: "汽车", desc: "华为汽车产业链核心标的。", status: "ok" },
  { name: "英伟达", count: 13, sector: "AI", desc: "全球算力风向标，观察估值与订单。", status: "ok" },
  { name: "中芯国际", count: 11, sector: "芯片", desc: "国产替代主线，适合观察景气与节奏。", status: "ok" },
  { name: "新易盛", count: 11, sector: "光模块", desc: "光模块景气度映射，盯成交强弱。", status: "ok" },
  { name: "中际旭创", count: 10, sector: "光模块", desc: "算力链核心，回踩位置更关键。", status: "ok" },
  { name: "紫金矿业", count: 5, sector: "矿产资源", desc: "有色金属板块和资源周期观察。", status: "ok" },
  { name: "特斯拉", count: 5, sector: "机器人", desc: "观察 AI 与机器人叙事兑现节奏。", status: "ok" },
  { name: "华为", count: 5, sector: "自主科技", desc: "国产替代主线的情绪锚点。", status: "warn" },
  { name: "茅台", count: 4, sector: "白酒", desc: "消费权重观察位。", status: "ok" },
  { name: "台积电", count: 4, sector: "芯片", desc: "先进制程景气观察。", status: "ok" }
];
function defaultWatchGroups() {
  return [
    {
      name: "\u5927\u76d8\u6307\u6570",
      items: [
        { name: "\u4e0a\u8bc1\u6307\u6570", quoteKey: "s_sh000001", count: 0, sector: "\u6307\u6570", desc: "A\u80a1\u603b\u4f53\u6e29\u5ea6\u548c\u98ce\u9669\u504f\u597d\u89c2\u5bdf\u3002", status: "ok" },
        { name: "\u6df1\u8bc1\u6210\u6307", quoteKey: "s_sz399001", count: 0, sector: "\u6307\u6570", desc: "\u6210\u957f\u80a1\u548c\u5236\u9020\u4e1a\u4e3b\u7ebf\u89c2\u5bdf\u3002", status: "ok" },
        { name: "\u521b\u4e1a\u677f\u6307", quoteKey: "s_sz399006", count: 0, sector: "\u6307\u6570", desc: "\u98ce\u9669\u504f\u597d\u548c\u9ad8\u5f39\u6027\u65b9\u5411\u89c2\u5bdf\u3002", status: "warn" },
        { name: "\u79d1\u521b50", quoteKey: "s_sh000688", count: 0, sector: "\u6307\u6570", desc: "\u786c\u79d1\u6280\u3001\u82af\u7247\u548c\u7b97\u529b\u4e3b\u7ebf\u89c2\u5bdf\u3002", status: "ok" },
        { name: "\u6caa\u6df1300", quoteKey: "s_sh000300", count: 0, sector: "\u6307\u6570", desc: "\u6838\u5fc3\u8d44\u4ea7\u548c\u5927\u76d8\u6743\u91cd\u89c2\u5bdf\u3002", status: "ok" }
      ]
    },
    {
      name: "\u79d1\u6280\u4e3b\u7ebf",
      items: [
        { name: "\u5bd2\u6b66\u7eaa", quoteKey: "sh688256", count: 19, sector: "\u79d1\u521b\u677f", desc: "\u56fd\u4ea7 AI \u7b97\u529b\u9f99\u5934\uff0c\u9ad8\u5f39\u6027\u4f46\u6ce2\u52a8\u5927\u3002", status: "ok" },
        { name: "\u4e2d\u82af\u56fd\u9645", quoteKey: "sh688981", count: 11, sector: "\u82af\u7247", desc: "\u575a\u6301\u5ba2\u89c2\u4ea4\u6613\uff0c\u987a\u52bf\u800c\u4e3a\u3002", status: "ok" },
        { name: "\u65b0\u6613\u76db", quoteKey: "sz300502", count: 11, sector: "\u5149\u6a21\u5757", desc: "\u5149\u6a21\u5757\u666f\u6c14\u5ea6\u6620\u5c04\uff0c\u76ef\u6210\u4ea4\u5f3a\u5f31\u3002", status: "ok" },
        { name: "\u4e2d\u9645\u65ed\u521b", quoteKey: "sz300308", count: 10, sector: "\u5149\u6a21\u5757", desc: "\u7b97\u529b\u94fe\u6838\u5fc3\uff0c\u56de\u8e29\u4f4d\u7f6e\u66f4\u5173\u952e\u3002", status: "ok" },
        { name: "\u534e\u4e3a", count: 5, sector: "\u4e09\u80ce", desc: "\u56fd\u4ea7\u66ff\u4ee3\u4e3b\u7ebf\u7684\u60c5\u7eea\u951a\u70b9\u3002", status: "warn" }
      ]
    },
    {
      name: "\u8d44\u6e90\u5468\u671f",
      items: [
        { name: "\u7d2b\u91d1\u77ff\u4e1a", quoteKey: "sh601899", count: 5, sector: "\u77ff\u4ea7\u8d44\u6e90", desc: "\u6709\u8272\u91d1\u5c5e\u677f\u5757\u548c\u8d44\u6e90\u5468\u671f\u89c2\u5bdf\u3002", status: "ok" }
      ]
    },
    {
      name: "\u6c7d\u8f66 / \u6d88\u8d39",
      items: [
        { name: "\u8d5b\u529b\u65af", quoteKey: "sh601127", count: 16, sector: "\u6c7d\u8f66", desc: "\u534e\u4e3a\u6c7d\u8f66\u4ea7\u4e1a\u94fe\u6838\u5fc3\u6807\u7684\u3002", status: "ok" },
        { name: "\u8305\u53f0", quoteKey: "sh600519", count: 4, sector: "\u767d\u9152", desc: "\u6d88\u8d39\u6743\u91cd\u89c2\u5bdf\u4f4d\u3002", status: "ok" }
      ]
    },
    {
      name: "\u6d77\u5916\u6620\u5c04",
      items: [
        { name: "\u82f1\u4f1f\u8fbe", quoteKey: "usNVDA", count: 13, sector: "AI", desc: "\u5168\u7403\u7b97\u529b\u98ce\u5411\u6807\uff0c\u89c2\u5bdf\u4f30\u503c\u4e0e\u8ba2\u5355\u3002", status: "ok" },
        { name: "\u7279\u65af\u62c9", quoteKey: "usTSLA", count: 5, sector: "\u673a\u5668\u4eba", desc: "\u89c2\u5bdf AI \u4e0e\u673a\u5668\u4eba\u53d9\u4e8b\u5151\u73b0\u8282\u594f\u3002", status: "ok" },
        { name: "\u53f0\u79ef\u7535", quoteKey: "usTSM", count: 4, sector: "\u82af\u7247", desc: "\u5148\u8fdb\u5236\u7a0b\u666f\u6c14\u89c2\u5bdf\u3002", status: "ok" }
      ]
    }
  ];
}

function readWatchGroups() {
  try {
    const groups = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "null");
    if (Array.isArray(groups) && groups.length) return enrichWatchGroups(groups);
  } catch {}
  return defaultWatchGroups();
}

function enrichWatchGroups(groups) {
  const defaults = new Map(flattenDefaultWatchlist().map(item => [item.name, item]));
  return (groups || []).map(group => ({
    ...group,
    children: enrichWatchGroups(group.children || []),
    items: (group.items || []).map(item => ({ ...(defaults.get(item.name) || {}), ...item, quoteKey: item.quoteKey || (defaults.get(item.name) || {}).quoteKey || localQuoteAliasForName(item.name) || "" }))
  }));
}

function flattenDefaultWatchlist() {
  return defaultWatchGroups().flatMap(group => group.items || []);
}

function saveWatchGroups(groups) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(groups));
}

function flattenWatchlist() {
  const rows = [];
  walkWatchGroups(readWatchGroups(), (group, path, parents) => {
    (group.items || []).forEach(item => rows.push({ ...item, group: group.name, groupPath: path, groupChain: parents.concat(group.name).join(" / ") }));
  });
  return rows;
}

function walkWatchGroups(groups, visitor, parents = [], path = []) {
  (groups || []).forEach((group, index) => {
    const currentPath = path.concat(index);
    visitor(group, currentPath, parents);
    walkWatchGroups(group.children || [], visitor, parents.concat(group.name), currentPath);
  });
}

function countGroupItems(group) {
  return (group.items || []).length + (group.children || []).reduce((sum, child) => sum + countGroupItems(child), 0);
}

function getGroupByPath(groups, path) {
  let list = groups;
  let group = null;
  for (const index of path || []) {
    group = list && list[index];
    if (!group) return null;
    group.children = group.children || [];
    group.items = group.items || [];
    list = group.children;
  }
  return group;
}

function pathValue(path) {
  return (path || []).join(".");
}

function parsePathValue(value) {
  return String(value || "").split(".").filter(Boolean).map(Number);
}

function readWatchPreviewMap() {
  try {
    const value = JSON.parse(localStorage.getItem(WATCHLIST_PREVIEW_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function saveWatchPreviewMap(map) {
  localStorage.setItem(WATCHLIST_PREVIEW_KEY, JSON.stringify(map || {}));
}

function groupOptionsHtml(groups, selectedPath = []) {
  const rows = [];
  walkWatchGroups(groups, (group, path, parents) => {
    const label = parents.concat(group.name).join(" / ");
    rows.push(`<option value="${pathValue(path)}" ${pathValue(path) === pathValue(selectedPath) ? "selected" : ""}>${escapeHtml(label)}</option>`);
  });
  return rows.join("");
}

const sampleVideos = [
  {
    id: "v_spacex",
    title: "SpaceX 上市带动题材，但炒作终将回归风险防范。",
    topic: "商业航天",
    date: "2026-05-16",
    author: "模型先生",
    likes: "1.0万",
    comments: 1892,
    shares: "2.0k",
    collects: 1704,
    videoUrl: "",
    transcript: "SpaceX 预计正式挂牌上市，商业航天题材可能活跃，但题材炒作最终仍要回到基本面和风险边界。",
    focus: "SpaceX 概念股",
    advice: "回避追高。题材炒作终将回归原点，先看承接再看机会。",
    risk: "题材股从哪里来回哪里去，炒作风险较大。",
    philosophy: "投资应建立在必然逻辑上，追逐题材是侥幸心理。",
    confidence: "高"
  },
  {
    id: "v_chip",
    title: "科技股行情，尊重每个人的特点，仍将继续发酵。",
    topic: "科创芯片",
    date: "2026-05-19",
    author: "模型先生",
    likes: 501,
    comments: 144,
    shares: 57,
    collects: 34,
    videoUrl: "",
    transcript: "科创芯片是本轮行情的重要方向，需要同时看板块容量、核心个股承接和情绪节奏。",
    focus: "科创芯片",
    advice: "高位不追，等分歧回踩后再看承接。",
    risk: "短线情绪过热，个股波动会放大。",
    philosophy: "先看板块容量，再看核心个股的承接强度。",
    confidence: "高"
  },
  {
    id: "v_storage",
    title: "聊聊长鑫存储产业链：国产替代的耐心题材。",
    topic: "科创芯片",
    date: "2026-05-17",
    author: "模型先生",
    likes: "1.3万",
    comments: 2137,
    shares: 168,
    collects: 3049,
    videoUrl: "",
    transcript: "存储芯片市场竞争激烈，下一阶段更该关注国产存储芯片概念，以及产业链里的真正受益公司。",
    focus: "长鑫存储产业链",
    advice: "不要只看名字，要看订单、利润弹性和估值空间。",
    risk: "概念扩散后容易泥沙俱下，避免把边缘标的当核心。",
    philosophy: "产业逻辑比短线口号更重要。",
    confidence: "中高"
  },
  {
    id: "v_trade",
    title: "真正该练的不是系统本身，是执行系统的能力。",
    topic: "交易心理",
    date: "2026-05-17",
    author: "模型先生",
    likes: 7800,
    comments: 1175,
    shares: 768,
    collects: 219,
    videoUrl: "",
    transcript: "市场里能盈利的系统不少，稀缺的不是方法，而是能不能把一个方法稳定执行到底。",
    focus: "交易系统",
    advice: "把进场、出场、止损全部写清楚，用最小仓位连续执行。",
    risk: "没有规则时，情绪会在每一次下单时接管你。",
    philosophy: "交易不是比策略花哨，而是比执行稳定。",
    confidence: "高"
  },
  {
    id: "v_cycle",
    title: "美学即时度的自由运用：题材热度如何降温。",
    topic: "宏观周期",
    date: "2026-05-15",
    author: "模型先生",
    likes: 1475,
    comments: 2970,
    shares: 95,
    collects: 2330,
    videoUrl: "",
    transcript: "当市场把所有题材都讲成一个故事，真正要观察的是资金离场时谁还能站住。",
    focus: "题材降温",
    advice: "涨幅过大的标的只做观察，不做冲动买入。",
    risk: "热度退潮后，弱逻辑标的会率先补跌。",
    philosophy: "少做热闹的跟随，多做冷静的验证。",
    confidence: "中"
  }
];
const state = {
  view: "dashboard",
  activeTag: "全部",
  search: "",
  sort: "date",
  currentVideoId: sampleVideos[0].id,
  currentGroupPath: [],
  branchZoom: Number(localStorage.getItem(BRANCH_ZOOM_KEY) || 1),
  branchView: "map",
  videos: [],
  indexQuotes: {},
  editingStock: null,
  autoRefreshTimer: null,
  libraryLimit: 60,
  searchTimer: null
};

let videoTextOverridesCache = null;
let videoAssignmentsCache = null;
const jsonStoreCache = new Map();
const videoRuntimeCache = {
  title: new Map(),
  transcript: new Map(),
  searchText: new Map()
};

function clearVideoRuntimeCache(id = "") {
  if (id) {
    videoRuntimeCache.title.delete(id);
    videoRuntimeCache.transcript.delete(id);
    videoRuntimeCache.searchText.delete(id);
    return;
  }
  videoRuntimeCache.title.clear();
  videoRuntimeCache.transcript.clear();
  videoRuntimeCache.searchText.clear();
}

function readUserVideos() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUserVideos(videos) {
  const deleted = readDeletedVideoIds();
  localStorage.setItem(STORE_KEY, JSON.stringify(videos.filter(v => (v.userAdded || v.local) && !deleted.has(v.id))));
}

function readDeletedVideoIds() {
  try {
    const rows = JSON.parse(localStorage.getItem(DELETED_VIDEO_IDS_KEY) || "[]");
    return new Set(Array.isArray(rows) ? rows : []);
  } catch {
    return new Set();
  }
}

function saveDeletedVideoIds(ids) {
  localStorage.setItem(DELETED_VIDEO_IDS_KEY, JSON.stringify([...ids]));
}

function markVideoDeleted(id) {
  const ids = readDeletedVideoIds();
  ids.add(id);
  saveDeletedVideoIds(ids);
}

function restoreDeletedVideo(id) {
  const ids = readDeletedVideoIds();
  if (!ids.delete(id)) return;
  saveDeletedVideoIds(ids);
}

function isVideoDeleted(id) {
  return readDeletedVideoIds().has(id);
}

async function init() {
  state.videos = [...sampleVideos, ...readUserVideos()];
  await scanMetadataVideos();
  await scanLocalVideos();
  await scanLocalDocuments();
  await refreshMarketIndexes();
  renderShell();
  render();
  tickClock();
  setInterval(tickClock, 1000 * 30);
  setupAutoRefresh();
}

async function refreshMarketIndexes() {
  try {
    const keys = [...new Set(flattenWatchlist().map(item => item.quoteKey).filter(Boolean))];
    if (!keys.length) return;
    const res = await fetch("/api/market-quotes?keys=" + encodeURIComponent(keys.join(",")));
    const data = await res.json();
    if (!data.success || !Array.isArray(data.items)) return;
    state.indexQuotes = Object.fromEntries(data.items.flatMap(item => [[item.name, item], [item.key, item]]));
    if (document.getElementById("leftPane")) renderWatchlistPane();
  } catch {}
}

function metadataToVideo(item) {
  return {
    id: item.id,
    title: item.title || "抖音视频（待补充）",
    topic: item.tags && item.tags[0] ? item.tags[0] : "抖音链接",
    date: item.publishedAt || (item.importedAt || "").slice(0, 10) || new Date().toISOString().slice(0, 10),
    author: item.author || "抖音",
    likes: item.likes || 0,
    comments: item.comments || 0,
    shares: item.shares || 0,
    collects: 0,
    videoUrl: "",
    thumbnail: item.thumbnail || "",
    originalUrl: item.originalUrl || "",
    transcript: item.description || item.parseError || "暂无描述",
    focus: item.tags && item.tags.length ? item.tags.slice(0, 3).join(" / ") : "待补充",
    advice: "当前为元数据记录，可先沉淀链接和指标；完整观点可在原视频中查看。",
    risk: item.parseError ? "元数据未完整解析：" + item.parseError : "仅保存元数据，不下载和播放视频。",
    philosophy: "先保存可验证的原始链接，再做人工或 AI 整理。",
    confidence: item.parseError ? "待补充" : "已解析",
    isMetadata: true,
    userAdded: true
  };
}
async function scanMetadataVideos() {
  try {
    const res = await fetch("/api/metadata-videos");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !Array.isArray(data.items)) return;
    const existing = new Set(state.videos.map(v => v.id));
    data.items.map(metadataToVideo).forEach(video => {
      if (!existing.has(video.id)) state.videos.push(video);
    });
  } catch {}
}

async function scanLocalVideos() {
  try {
    const res = await fetch("/api/local-videos");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success) return;
    data.videos.forEach((file, index) => {
      const id = "local_" + (file.sourceId || file.filename);
      const title = file.title || file.filename.replace(/\.[^.]+$/, "");
      const topic = file.topic || (index % 2 ? "????" : "????");
      const nextVideo = {
        id,
        title,
        topic,
        date: file.publishedAt || file.mtime.slice(0, 10),
        author: file.author || "????",
        likes: Number(file.likes || 0),
        comments: Number(file.comments || 0),
        shares: Number(file.shares || 0),
        collects: Number(file.collects || 0),
        videoUrl: file.url,
        thumbnail: file.thumbnail || "",
        originalUrl: file.originalUrl || "",
        transcript: file.transcript || "\u672c\u5730\u5e93\u6682\u65e0\u8f6c\u5f55\u6587\u672c\uff0c\u53ef\u4ee5\u5148\u57fa\u4e8e\u6807\u9898\u3001\u65e5\u671f\u548c\u4e92\u52a8\u6570\u636e\u751f\u6210\u4e00\u7248 AI \u5206\u6790\u3002",
        focus: file.focus || topic,
        advice: file.confidence === "\u5f85\u786e\u8ba4" ? "\u672c\u5730\u5e93\u6682\u65e0\u5b8c\u6574\u5206\u6790\uff0c\u8bf7\u70b9\u51fb\u201c\u751f\u6210 AI \u5206\u6790\u201d\u3002" : "\u53ef\u57fa\u4e8e\u6807\u9898\u548c\u89c6\u9891\u5185\u5bb9\u8fdb\u4e00\u6b65\u6574\u7406\u3002",
        risk: "\u6682\u672a\u751f\u6210\u98ce\u9669\u63d0\u793a\uff0c\u9700\u8981\u7ed3\u5408\u6807\u7684\u3001\u677f\u5757\u548c\u5f53\u65e5\u884c\u60c5\u590d\u6838\u3002",
        philosophy: "\u5148\u8bb0\u5f55\u7d20\u6750\uff0c\u518d\u7528 AI \u548c\u4eba\u5de5\u590d\u76d8\u62c6\u89e3\u903b\u8f91\u3002",
        confidence: file.confidence || "\u5f85\u8865\u5145",
        local: true,
        sizeLabel: file.sizeLabel || ""
      };
      const existing = state.videos.find(v => v.id === id);
      if (existing) {
        Object.assign(existing, nextVideo);
      } else {
        state.videos.push(nextVideo);
      }
    });
  } catch {
    // Local server is optional; deployed pages can still run with sample data.
  }
}

async function scanLocalDocuments() {
  try {
    const res = await fetch("/api/local-documents");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !Array.isArray(data.documents)) return;
    data.documents.forEach((file, index) => {
      const rawId = String(file.id || file.fileName || file.originalName || index);
      const id = rawId.startsWith("doc_") ? rawId : "doc_" + rawId;
      const title = file.title || file.originalName || file.fileName || "\u672c\u5730\u6587\u6863";
      const topic = file.topic || "\u4e66\u7c4d";
      const nextVideo = {
        id,
        title,
        topic,
        date: file.date || (file.importedAt || "").slice(0, 10) || new Date().toISOString().slice(0, 10),
        author: file.author || "\u672c\u5730\u6587\u6863",
        likes: 0,
        comments: 0,
        shares: 0,
        collects: 0,
        videoUrl: "",
        thumbnail: "",
        originalUrl: file.url || "",
        transcript: file.transcript || "\u672c\u5730\u6587\u6863\u5df2\u5bfc\u5165\uff0c\u53ef\u7528\u4e8e\u8bfb\u4e66\u7b14\u8bb0\u3001\u7814\u7a76\u8bb0\u5f55\u548c\u540e\u7eed AI \u6574\u7406\u3002",
        focus: topic,
        advice: "\u5148\u4fdd\u5b58\u539f\u59cb\u6587\u6863\uff0c\u518d\u8865\u5145\u6458\u8981\u3001\u6807\u7684\u548c\u884c\u52a8\u8bb0\u5f55\u3002",
        risk: "\u6587\u6863\u5185\u5bb9\u9700\u8981\u4eba\u5de5\u590d\u6838\uff0c\u4e0d\u8981\u76f4\u63a5\u5f53\u6210\u4ea4\u6613\u7ed3\u8bba\u3002",
        philosophy: "\u8d44\u6599\u662f\u8f93\u5165\uff0c\u7ed3\u6784\u5316\u590d\u76d8\u624d\u662f\u8f93\u51fa\u3002",
        confidence: file.confidence || "\u5f85\u8bfb",
        local: true,
        userAdded: true,
        isDocument: true,
        documentUrl: file.url || "",
        fileName: file.fileName || "",
        hasExtractedText: !!file.hasExtractedText,
        extractedTextLength: Number(file.extractedTextLength || 0),
        extractedAt: file.extractedAt || "",
        extractionMode: file.extractionMode || "",
        ocrPagesRead: Number(file.ocrPagesRead || 0),
        ocrStartPage: Number(file.ocrStartPage || 0),
        ocrEndPage: Number(file.ocrEndPage || 0),
        sizeLabel: file.sizeLabel || ""
      };
      const existing = state.videos.find(v => v.id === id);
      if (existing) {
        Object.assign(existing, nextVideo);
      } else {
        state.videos.push(nextVideo);
      }
      rememberDocumentGroup(id, topic);
    });
  } catch {
    // Local document scanning is optional; dashboard rendering should not depend on it.
  }
}

function rememberDocumentGroup(id, topic = "\u4e66\u7c4d") {
  const primary = String(topic || "\u4e66\u7c4d").trim() || "\u4e66\u7c4d";
  const groupNames = [...new Set(["\u4e66\u7c4d", primary])];
  const groups = readVideoGroups();
  const nextGroups = [...new Set([...groups, ...groupNames])];
  if (nextGroups.length !== groups.length) saveVideoGroups(nextGroups);

  const assignments = readVideoAssignments();
  const current = Array.isArray(assignments[id]) ? assignments[id] : [];
  const next = [...new Set([...current, ...groupNames])];
  if (next.length !== current.length) {
    assignments[id] = next;
    saveVideoAssignments(assignments);
  }
}

function renderShell() {
  renderTopChips();
  renderWatchlistPane();
  const noteTags = ["交易心理", "交易系统", "创新药", "前沿科技", "宏观周期", "投资哲学", "有色金属", "生活感悟", "科创芯片", "选股逻辑"];
  document.getElementById("rightPane").innerHTML = `
    <div class="profile"><div class="avatar"><img src="assets/xiaoke-icon-64.png" alt=""></div><div><b>小可课堂</b><span>投资课堂 · 认知复盘</span></div></div>
    <div class="quote">“把复杂问题讲清楚，把交易素材整理成可复盘的课堂。”</div>
    <div class="side-section">
      <div class="side-title">主题笔记</div>
      <div class="tag-cloud">${noteTags.map(t => `<button class="tag" onclick="filterByTag('${t}')">${t}</button>`).join("")}</div>
    </div>
    <div class="side-section">
      <div class="side-title">行业分布</div>
      <div class="tag-cloud">${tags.filter(t => t.type === "sector").map(t => `<button class="tag mid" onclick="filterByTag('${t.name}')">${t.name}(${tagCount(t)})</button>`).join("")}</div>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">每日任务</div>
      <textarea class="side-note big" id="dailyTaskBox" oninput="saveRightNote('task', this.value)" placeholder="直接写今天要做的事：复盘视频、补行情代码、整理长鑫产业链...">${escapeHtml(localStorage.getItem(DAILY_TASK_KEY) || "")}</textarea>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">今日关注</div>
      <textarea class="side-note" id="dailyFocusBox" oninput="saveRightNote('focus', this.value)" placeholder="例如：长鑫存储、光模块、科创芯片、大盘风险...">${escapeHtml(localStorage.getItem(DAILY_FOCUS_KEY) || "")}</textarea>
    </div>
  `;
  renderAgent();
}
function saveRightNote(type, value) {
  localStorage.setItem(type === "focus" ? DAILY_FOCUS_KEY : DAILY_TASK_KEY, value);
}

function renderWatchlistPane() {
  const groups = readWatchGroups();
  const total = groups.reduce((sum, group) => sum + countGroupItems(group), 0);
  document.getElementById("leftPane").innerHTML = `
    <div class="left-head">
      <div><div class="left-title">关注标的</div><div class="left-count">${total} 个标的</div></div>
      <button class="add-stock" onclick="openStockModal()">+添加</button>
    </div>
    ${groups.map((group, groupIndex) => `
      <section class="watch-group">
        <div class="group-title-row">
          <button class="group-title" onclick="openSectorDirectory([${groupIndex}])">
            <span>${escapeHtml(group.name)}</span><em>${countGroupItems(group)}</em>
          </button>
          <button class="group-toggle" title="${isWatchGroupCollapsed(group, [groupIndex]) ? "展开" : "收起"}" onclick="event.stopPropagation();toggleWatchGroup([${groupIndex}])">${isWatchGroupCollapsed(group, [groupIndex]) ? "+" : "-"}</button>
        </div>
        ${isWatchGroupCollapsed(group, [groupIndex]) ? watchGroupPreviewHtml(group, [groupIndex]) : ""}
        <div class="group-items ${isWatchGroupCollapsed(group, [groupIndex]) ? "collapsed" : ""}" id="watch_group_${groupIndex}">
          ${(isWatchGroupCollapsed(group, [groupIndex]) ? [] : (group.items || [])).map((item, i) => `
            <div class="watch-item ${groupIndex === 0 && i === 0 ? "active" : ""}" onclick="filterByStock(${JSON.stringify(item.name)})">
              <div class="wi-head">
                <span>${escapeHtml(item.name)}</span><span class="dot ${item.status === "warn" ? "warn" : ""}"></span>
                <span class="stock-actions" onclick="event.stopPropagation()">
                  <button title="Edit" onclick="editStockTarget([${groupIndex}], ${i}); event.stopPropagation()">E</button>
                  <button title="Delete" onclick="deleteStockTarget([${groupIndex}], ${i}); event.stopPropagation()">x</button>
                </span>
              </div>
              ${quoteHtml(item)}
              <div class="wi-sub"><span>${Number(item.count || 0)}次</span><span>${escapeHtml(item.sector || group.name)}</span><span>相关 ${relatedVideoCount(item.name)} 条</span></div>
              <div class="wi-desc">${escapeHtml(relatedVideoDigest(item.name) || item.desc || "")}</div>
            </div>
          `).join("")}</div>
      </section>
    `).join("")}
    <button class="compare" onclick="showToast('对比分析已准备好')">对比分析 (0/4)</button>
  `;
}

function relatedVideoCount(name) {
  const textName = String(name || "");
  return libraryVideos().filter(v => {
    const links = videoLinksFor(v.id);
    return links.stocks.includes(textName) || [getVideoDetailTitle(v), getVideoDetailTranscript(v), v.topic, v.focus, ...videoGroupsFor(v.id)].join(" ").includes(textName);
  }).length;
}

function relatedVideoDigest(name) {
  const textName = String(name || "");
  const video = libraryVideos()
    .filter(v => {
      const links = videoLinksFor(v.id);
      return links.stocks.includes(textName) || [getVideoDetailTitle(v), getVideoDetailTranscript(v), v.topic, v.focus, ...videoGroupsFor(v.id)].join(" ").includes(textName);
    })
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))[0];
  if (!video) return "";
  const analysis = readStructuredAnalyses()[video.id] || analysisModel(video, readVideoAnalyses()[video.id] || "");
  return compactPlainText(analysis.summary || getVideoDetailTitle(video), 32);
}

function quoteHtml(item) {
  const quote = state.indexQuotes[item.quoteKey] || state.indexQuotes[item.name];
  if (!quote && !item.quoteKey) return `<div class="quote-missing">\u672a\u586b\u884c\u60c5\u4ee3\u7801</div>`;
  if (!quote) return "";
  const pct = Number(quote.pct || 0);
  const cls = pct > 0 ? "up" : pct < 0 ? "down" : "flat";
  const sign = pct > 0 ? "+" : "";
  return `<div class="quote-line ${cls}"><b>${Number(quote.price || 0).toFixed(2)}</b><span>${sign}${Number(quote.change || 0).toFixed(2)}</span><span>${sign}${pct.toFixed(2)}%</span></div>`;
}

function readCollapsedWatchGroups() {
  try {
    const rows = JSON.parse(localStorage.getItem(WATCHLIST_COLLAPSE_KEY) || "[]");
    return new Set(Array.isArray(rows) ? rows : []);
  } catch {
    return new Set();
  }
}

function saveCollapsedWatchGroups(set) {
  localStorage.setItem(WATCHLIST_COLLAPSE_KEY, JSON.stringify([...set]));
}

function watchGroupCollapseId(path = []) {
  return pathValue(path);
}

function isWatchGroupCollapsed(group, path) {
  const id = watchGroupCollapseId(path);
  const set = readCollapsedWatchGroups();
  if (set.has(id)) return true;
  if (set.has("open:" + id)) return false;
  return (group.children || []).length > 0 || (group.items || []).length > 4;
}

function toggleWatchGroup(path) {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, path);
  if (!group) return;
  const id = watchGroupCollapseId(path);
  const set = readCollapsedWatchGroups();
  const collapsed = isWatchGroupCollapsed(group, path);
  set.delete(id);
  set.delete("open:" + id);
  if (collapsed) set.add("open:" + id);
  else set.add(id);
  saveCollapsedWatchGroups(set);
  renderWatchlistPane();
}

function watchGroupPreviewHtml(group, path) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const itemCount = (group.items || []).length;
  const allStocks = groupStockItems(group);
  const previewMap = readWatchPreviewMap();
  const savedNames = Array.isArray(previewMap[pathValue(path)]) ? previewMap[pathValue(path)] : [];
  const picked = savedNames.length
    ? savedNames.map(name => allStocks.find(item => item.name === name)).filter(Boolean)
    : allStocks.slice(0, 3);
  const names = picked.map(item => item.name);
  const extra = savedNames.length ? 0 : Math.max(0, allStocks.length - names.length);
  const meta = [
    childCount ? `${childCount} 分支` : "",
    itemCount ? `${itemCount} 直属` : "",
    total ? `${total} 标的` : ""
  ].filter(Boolean).join(" · ");
  return `<div class="watch-group-preview">
    <div class="preview-meta">${escapeHtml(meta)}<button class="preview-edit" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button></div>
    ${names.length ? `<span>${escapeHtml(names.join("、"))}${extra ? ` 等${extra}只` : ""}</span>` : ""}
  </div>`;
}

function setWatchGroupPreviewItems(path) {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, path);
  if (!group) return;
  const allNames = [...new Set(groupStockItems(group).map(item => item.name).filter(Boolean))];
  if (!allNames.length) {
    showToast("这个分组还没有股票可显示");
    return;
  }
  const previewMap = readWatchPreviewMap();
  const id = pathValue(path);
  const current = Array.isArray(previewMap[id]) ? previewMap[id].join("、") : allNames.slice(0, 3).join("、");
  const input = prompt(`选择左侧预览要显示的股票名，用逗号或顿号分隔。\n留空=恢复自动前三只。\n\n可选：${allNames.join("、")}`, current);
  if (input === null) return;
  const names = input.split(/[,\u3001，\n]/).map(item => item.trim()).filter(Boolean);
  const picked = names.filter(name => allNames.includes(name));
  if (!names.length) delete previewMap[id];
  else previewMap[id] = picked.length ? picked : names;
  saveWatchPreviewMap(previewMap);
  renderWatchlistPane();
  showToast(names.length ? "左侧预览已更新" : "已恢复自动预览");
}
function openSectorDirectory(path) {
  state.currentGroupPath = path || [];
  state.view = "sectorDirectory";
  state.branchView = "map";
  if (state.branchZoom < 0.75) state.branchZoom = 0.9;
  renderSectorDirectory();
}

function renderSectorDirectory() {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, state.currentGroupPath);
  if (!group) {
    state.view = "dashboard";
    renderDashboard();
    return;
  }
  const chain = [];
  let list = groups;
  (state.currentGroupPath || []).forEach(index => {
    const item = list[index];
    if (item) chain.push(item.name);
    list = item && item.children ? item.children : [];
  });
  document.getElementById("main").innerHTML = `
    <section class="directory-head panel">
      <div>
        <div class="crumb"><button onclick="renderDashboard()">\u770b\u677f</button>${chain.map((name, index) => `<span>/</span><button onclick="openSectorDirectory([${state.currentGroupPath.slice(0, index + 1).join(",")}])">${escapeHtml(name)}</button>`).join("")}</div>
        <h2>${escapeHtml(group.name)}</h2>
        <p>${countGroupItems(group)} \u4e2a\u6807\u7684\u3001${(group.children || []).length} \u4e2a\u5206\u652f\u3002\u53ef\u4ee5\u50cf\u4ea7\u4e1a\u94fe\u56fe\u4e00\u6837\u4e00\u5c42\u5c42\u7ec6\u5206\u3002</p>
      </div>
      <div class="directory-actions">
        <button class="small-btn" onclick="goDirectoryBack()">${state.currentGroupPath.length > 1 ? "\u8fd4\u56de\u4e0a\u7ea7" : "\u8fd4\u56de\u770b\u677f"}</button>
        <button class="small-btn" onclick="renameGroupFolder([${state.currentGroupPath.join(",")}])">\u6539\u540d</button>
        <button class="small-btn" onclick="repairWatchlistQuotesAndScores([${state.currentGroupPath.join(",")}])">补代码/评分</button>
      </div>
    </section>
    <div class="branch-toolbar">
      <button class="${state.branchView === "map" ? "active" : ""}" onclick="setBranchView('map')">树图</button>
      <button class="${state.branchView === "compact" ? "active" : ""}" onclick="setBranchView('compact')">紧凑</button>
      ${state.branchView === "map" ? `
        <button onclick="setBranchZoom(-0.1)">-</button>
        <span>${Math.round(state.branchZoom * 100)}%</span>
        <button onclick="setBranchZoom(0.1)">+</button>
        <button onclick="fitBranchZoom()">\u9002\u5c4f</button>
      ` : `<span>紧凑列表，可快速扫分支</span>`}
    </div>
    <section class="${state.branchView === "map" ? "branch-map" : "branch-compact-map"} panel">
      ${state.branchView === "map"
        ? `<div class="branch-canvas" style="zoom:${state.branchZoom}">${renderBranchTree(group, state.currentGroupPath)}</div>`
        : renderBranchCompactTree(group, state.currentGroupPath)}
    </section>
  `;
}

function goDirectoryBack() {
  if (state.currentGroupPath.length > 1) {
    openSectorDirectory(state.currentGroupPath.slice(0, -1));
    return;
  }
  state.view = "dashboard";
  state.currentGroupPath = [];
  renderDashboard();
}

function setBranchZoom(delta) {
  state.branchZoom = Math.min(1.35, Math.max(0.7, Number((state.branchZoom + delta).toFixed(2))));
  localStorage.setItem(BRANCH_ZOOM_KEY, String(state.branchZoom));
  renderSectorDirectory();
}

function fitBranchZoom() {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, state.currentGroupPath);
  const rows = Math.max(1, countVisibleBranchRows(group));
  state.branchZoom = rows > 14 ? 0.7 : rows > 10 ? 0.75 : rows > 7 ? 0.82 : 0.95;
  localStorage.setItem(BRANCH_ZOOM_KEY, String(state.branchZoom));
  renderSectorDirectory();
}

function setBranchView(view) {
  state.branchView = view === "map" ? "map" : "compact";
  renderSectorDirectory();
}

function countVisibleBranchRows(group) {
  if (!group) return 1;
  return 1 + (group.items || []).length + 1 + (group.children || []).reduce((sum, child) => sum + countVisibleBranchRows(child), 0);
}

function renderBranchCompactTree(group, path, depth = 0) {
  const children = group.children || [];
  const stocks = group.items || [];
  const total = countGroupItems(group);
  const score = Math.round(Math.max(0, Math.min(100, scoreSectorGroup(group, 0).score)));
  const open = depth <= 1 ? "open" : "";
  const childHtml = children.map((child, index) => renderBranchCompactTree(child, path.concat(index), depth + 1)).join("");
  const stockHtml = stocks.length ? `
    <div class="compact-stock-grid">
      ${stocks.map((item, index) => renderBranchCompactStock(item, path, index)).join("")}
    </div>
  ` : "";
  return `
    <details class="compact-branch depth-${depth}" ${open} style="${branchNodeStyle(group, path)}">
      <summary>
        <span class="compact-branch-title">${escapeHtml(group.name)}</span>
        <span class="compact-branch-meta">${total} 标的 · ${children.length} 分支 · ${score}分</span>
        <span class="compact-branch-actions" onclick="event.preventDefault();event.stopPropagation()">
          <button onclick="renameGroupFolder([${path.join(",")}])">改</button>
          <button onclick="createChildGroup([${path.join(",")}])">+</button>
          <button onclick="cycleGroupColor([${path.join(",")}])">色</button>
          ${path.length ? `<button class="danger" onclick="deleteGroupFolder([${path.join(",")}])">删</button>` : ""}
        </span>
      </summary>
      ${stockHtml}
      ${childHtml}
      ${renderBranchCompactAddBox(path)}
    </details>
  `;
}

function renderBranchCompactStock(item, path, index) {
  const key = item.quoteKey || localQuoteAliasForName(item.name);
  const quote = key ? (state.indexQuotes[key] || state.indexQuotes[item.name]) : null;
  const score = Number(item.importScore || item.score || importedStockScore(item));
  const pct = quote ? Number(quote.pct || 0) : null;
  const pctText = pct === null ? (key ? "行情同步中" : "缺代码") : `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%`;
  const cls = pct === null ? "" : pct >= 0 ? "up" : "down";
  return `
    <article class="compact-stock-card">
      <div class="compact-stock-head">
        <b>${escapeHtml(item.name)}</b>
        <span class="stock-actions" style="opacity:1">
          <button onclick="editStockTarget([${path.join(",")}], ${index})">改</button>
          <button onclick="openStockModal(null, null, [${path.join(",")}])">+</button>
          <button onclick="deleteStockTarget([${path.join(",")}], ${index})">删</button>
        </span>
      </div>
      <div class="compact-stock-tags">
        ${stockScoreBadgeHtml({ ...item, quoteKey: key, importScore: score })}
        <span class="code ${key ? "" : "missing"}">${escapeHtml(key || "未匹配代码")}</span>
        <span class="${cls}">${escapeHtml(pctText)}</span>
      </div>
      <div class="wi-sub"><span>${Number(item.count || 0)}次</span><span>${escapeHtml(item.sector || "")}</span><span>相关 ${relatedVideoCount(item.name)} 条</span></div>
      <div class="wi-desc">${escapeHtml(relatedVideoDigest(item.name) || item.desc || "")}</div>
    </article>
  `;
}

function renderBranchCompactAddBox(path) {
  return `
    <div class="compact-add-box">
      <button onclick="createChildGroup([${path.join(",")}])">+分支</button>
      <button onclick="openStockModal(null, null, [${path.join(",")}])">+股票</button>
    </div>
  `;
}
function renderBranchTree(group, path, depth = 0) {
  const children = group.children || [];
  const stocks = group.items || [];
  const childHtml = children.map((child, index) => renderBranchTree(child, path.concat(index), depth + 1)).join("");
  const stockHtml = stocks.map((item, index) => renderBranchStock(item, path, index)).join("");
  const addHtml = renderBranchAddBox(path);
  return `
    <div class="branch-row depth-${depth}" style="${branchNodeStyle(group, path)}">
      <div class="branch-node ${depth === 0 ? "root" : ""}">
        <button class="branch-title" onclick="openSectorDirectory([${path.join(",")}])">${escapeHtml(group.name)}</button>
        <div class="branch-meta">${countGroupItems(group)} 标的 · ${children.length} 分支</div>
        <div class="branch-tools" onclick="event.stopPropagation()">
          <button onclick="renameGroupFolder([${path.join(",")}])">\u6539</button>
          <button onclick="createChildGroup([${path.join(",")}])">+</button>
          <button onclick="cycleGroupColor([${path.join(",")}])">\u8272</button>
          ${path.length ? `<button class="danger" onclick="deleteGroupFolder([${path.join(",")}])">\u5220</button>` : ""}
        </div>
      </div>
      <div class="branch-children">
        ${childHtml}
        ${stockHtml}
        ${addHtml}
      </div>
    </div>
  `;
}

function branchNodeStyle(group, path) {
  const color = group.color || branchPalette(path);
  return `--branch-color:${color};--branch-soft:${hexToRgba(color, 0.14)};--branch-line:${hexToRgba(color, 0.56)}`;
}

function branchPalette(path) {
  const colors = ["#19c98b", "#5b8cff", "#f5a623", "#ec4899", "#22c3d6", "#a78bfa", "#f97316"];
  const seed = (path || []).reduce((sum, value, index) => sum + (value + 1) * (index + 2), 0);
  return colors[seed % colors.length];
}

function hexToRgba(hex, alpha) {
  const raw = String(hex || "#19c98b").replace("#", "");
  const value = raw.length === 3 ? raw.split("").map(ch => ch + ch).join("") : raw;
  const num = Number.parseInt(value, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function renderBranchAddBox(path) {
  return `
    <div class="branch-row add-row">
      <div class="branch-add-box">
        <button onclick="createChildGroup([${path.join(",")}])">+\u5206\u652f</button>
        <button onclick="openStockModal(null, null, [${path.join(",")}])">+\u80a1\u7968</button>
      </div>
    </div>
  `;
}

function renderBranchStock(item, path, index) {
  return `
    <div class="branch-row stock-row">
      <article class="branch-stock">
        <div class="wi-head">
          <span>${escapeHtml(item.name)}</span><span class="dot ${item.status === "warn" ? "warn" : ""}"></span>
          <span class="stock-actions" style="opacity:1">
            <button onclick="editStockTarget([${path.join(",")}], ${index})">\u6539</button>
            <button onclick="openStockModal(null, null, [${path.join(",")}])">+</button>
            <button onclick="deleteStockTarget([${path.join(",")}], ${index})">\u5220</button>
          </span>
        </div>
        ${quoteHtml(item)}
        <div class="compact-stock-tags">${stockScoreBadgeHtml(item)}<span class="code ${item.quoteKey ? "" : "missing"}">${escapeHtml(item.quoteKey || "未匹配代码")}</span></div>
        <div class="wi-sub"><span>${Number(item.count || 0)}\u6b21</span><span>${escapeHtml(item.sector || "")}</span></div>
        <div class="wi-desc">${escapeHtml(item.desc || "")}</div>
      </article>
    </div>
  `;
}

function createChildGroup(path) {
  const stayPath = state.currentGroupPath.slice();
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, path);
  if (!group) return;
  group.children = group.children || [];
  const baseName = "\u672a\u547d\u540d\u5206\u652f";
  let name = baseName;
  let index = 2;
  while (group.children.some(item => item.name === name)) {
    name = `${baseName}${index}`;
    index += 1;
  }
  group.children.push({ name, items: [], children: [] });
  saveWatchGroups(groups);
  renderWatchlistPane();
  openSectorDirectory(stayPath.length ? stayPath : path);
  showToast("\u5df2\u6dfb\u52a0\u7a7a\u767d\u5206\u652f\uff0c\u70b9\u6846\u4e0a\u7684\u201c\u6539\u201d\u6765\u547d\u540d");
}

function renameGroupFolder(path) {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, path);
  if (!group) return;
  const name = prompt("\u4fee\u6539\u76ee\u5f55\u540d", group.name);
  if (!name || !name.trim()) return;
  group.name = name.trim();
  saveWatchGroups(groups);
  renderWatchlistPane();
  openSectorDirectory(path);
}

function cycleGroupColor(path) {
  const groups = readWatchGroups();
  const group = getGroupByPath(groups, path);
  if (!group) return;
  const colors = ["#19c98b", "#5b8cff", "#f5a623", "#ec4899", "#22c3d6", "#a78bfa", "#f97316"];
  const current = group.color || branchPalette(path);
  const next = colors[(Math.max(0, colors.indexOf(current)) + 1) % colors.length];
  group.color = next;
  saveWatchGroups(groups);
  renderWatchlistPane();
  openSectorDirectory(path);
}

function deleteGroupFolder(path) {
  if (!path || !path.length) return;
  const groups = readWatchGroups();
  const parent = path.length === 1 ? { children: groups } : getGroupByPath(groups, path.slice(0, -1));
  const group = parent && parent.children && parent.children[path[path.length - 1]];
  if (!group) return;
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const message = total || childCount
    ? `\u786e\u5b9a\u5220\u9664\u300c${group.name}\u300d\u5417\uff1f\u4e0b\u9762\u7684 ${total} \u4e2a\u6807\u7684\u548c ${childCount} \u4e2a\u5b50\u5206\u652f\u4f1a\u4e00\u8d77\u5220\u9664\u3002`
    : `\u786e\u5b9a\u5220\u9664\u7a7a\u767d\u5206\u652f\u300c${group.name}\u300d\u5417\uff1f`;
  if (!confirm(message)) return;
  parent.children.splice(path[path.length - 1], 1);
  saveWatchGroups(groups);
  renderWatchlistPane();
  if (path.length === 1) {
    state.view = "dashboard";
    state.currentGroupPath = [];
    renderDashboard();
  } else {
    openSectorDirectory(path.slice(0, -1));
  }
  refreshMarketIndexes();
  showToast("\u5df2\u5220\u9664\u5206\u652f");
}

function chipHtml(tag) {
  const count = tagCount(tag);
  const cls = tag.name === state.activeTag ? "chip active" : tag.type === "sector" && tag.count > 15 ? "chip gold" : "chip";
  const color = videoTagColor(tag.id);
  const style = color ? ` style="${groupColorStyle(color)}"` : "";
  return `<button class="${cls}"${style} onclick='filterByTag(${JSON.stringify(tag.name)})'>${escapeHtml(tag.name)}(${count})</button>`;
}

function tagCount(tag) {
  if (tag.type === "all") return state.videos.length || tag.count;
  if (tag.type === "source") return state.videos.filter(v => v.author === (tag.sourceAuthor || tag.name)).length || tag.count;
  return state.videos.filter(v => [v.topic, v.focus, v.title, v.transcript].join(" ").includes(tag.name)).length || tag.count;
}

function countInvestmentVideos() {
  return state.videos.filter(v => /鎶曡祫|浜ゆ槗|鍝插|鑲＄エ|璐㈢粡|璇佸埜|鑲″競|浼板€紎鍛ㄦ湡|浠撲綅|绯荤粺/.test([v.topic, v.focus, v.title, v.transcript].join(" "))).length;
}

function readDailyReviews() {
  try {
    const rows = JSON.parse(localStorage.getItem(DAILY_REVIEW_KEY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function saveDailyReviews(rows) {
  localStorage.setItem(DAILY_REVIEW_KEY, JSON.stringify(rows));
}

function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function openDailyReview() {
  state.view = "dailyReview";
  state.search = "";
  document.getElementById("searchInput").value = "";
  render();
}

function addDailyReviewRow() {
  const rows = readDailyReviews();
  rows.unshift({ id: "review_" + Date.now(), date: todayString(), target: "", action: "\u89c2\u5bdf", position: "", price: "", reason: "", result: "", lesson: "" });
  saveDailyReviews(rows);
  renderDailyReview();
}

function addDailyReviewDay() {
  const rows = readDailyReviews();
  const today = todayString();
  const existing = rows.find(row => row.date === today && row.mode === "day");
  if (existing) {
    showToast("浠婂ぉ宸茬粡鏈変竴寮犳棩澶嶇洏鍗＄墖锛屽彲浠ョ洿鎺ュ湪閲岄潰缁х画琛ュ厖");
    renderDailyReview();
    return;
  }
  rows.unshift({
    id: "review_day_" + Date.now(),
    mode: "day",
    date: today,
    target: "",
    action: "澶嶇洏",
    position: "",
    price: "",
    reason: "",
    result: "",
    lesson: ""
  });
  saveDailyReviews(rows);
  renderDailyReview();
}

function updateDailyReview(id, field, value) {
  const rows = readDailyReviews();
  const row = rows.find(item => item.id === id);
  if (!row) return;
  row[field] = value;
  saveDailyReviews(rows);
}

function deleteDailyReviewRow(id) {
  if (!confirm("\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u590d\u76d8\u8bb0\u5f55\u5417\uff1f")) return;
  saveDailyReviews(readDailyReviews().filter(item => item.id !== id));
  renderDailyReview();
}

function isBlankDailyReview(row = {}) {
  return ![row.target, row.reason, row.result, row.lesson, row.position, row.price].some(value => String(value || "").trim());
}

function deleteDailyReviewDate(date) {
  const rows = readDailyReviews();
  const sameDate = rows.filter(item => item.date === date);
  if (sameDate.some(item => !isBlankDailyReview(item)) && !confirm(`纭畾鍒犻櫎 ${date} 杩欎竴澶╃殑澶嶇洏璁板綍鍚楋紵`)) return;
  saveDailyReviews(rows.filter(item => item.date !== date));
  renderDailyReview();
}

function compactReviewLine(row) {
  const parts = [
    row.action,
    row.target,
    row.position ? `浠撲綅 ${row.position}` : "",
    row.price ? `浠锋牸 ${row.price}` : ""
  ].filter(Boolean);
  return parts.join(" / ");
}

function groupDailyReviewsByDate(rows = []) {
  const map = new Map();
  rows.forEach(row => {
    const date = row.date || todayString();
    if (!map.has(date)) map.set(date, []);
    map.get(date).push(row);
  });
  return [...map.entries()]
    .sort((a, b) => String(b[0]).localeCompare(String(a[0])))
    .map(([date, items]) => ({ date, items }));
}

function mergeDailyReviewItems(items = []) {
  const first = items[0] || {};
  if (items.length === 1) return { ...first, mode: first.mode || "day" };
  const lines = items.map(row => compactReviewLine(row)).filter(Boolean);
  const reasonLines = items.map(row => row.reason ? `${compactReviewLine(row) || row.target || "记录"}：${row.reason}` : "").filter(Boolean);
  const resultLines = items.map(row => row.result ? `${row.target || compactReviewLine(row) || "记录"}：${row.result}` : "").filter(Boolean);
  const lessonLines = items.map(row => row.lesson ? `${row.target || compactReviewLine(row) || "记录"}：${row.lesson}` : "").filter(Boolean);
  return {
    id: first.id || ("review_day_" + Date.now()),
    mode: "day",
    date: first.date || todayString(),
    target: lines.join("\n"),
    action: "复盘",
    position: "",
    price: "",
    reason: reasonLines.join("\n"),
    result: resultLines.join("\n"),
    lesson: lessonLines.join("\n")
  };
}

function mergeDailyReviewDate(date) {
  const rows = readDailyReviews();
  const sameDate = rows.filter(row => row.date === date);
  if (sameDate.length <= 1) {
    showToast("这一天只有一条记录，不需要合并");
    return;
  }
  const merged = mergeDailyReviewItems(sameDate);
  saveDailyReviews([merged, ...rows.filter(row => row.date !== date)]);
  showToast(`已合并 ${date} 的 ${sameDate.length} 条记录`);
  renderDailyReview();
}
function mergeAllDailyReviewsByDate() {
  const rows = readDailyReviews();
  const groups = groupDailyReviewsByDate(rows);
  const mergedRows = groups.map(group => mergeDailyReviewItems(group.items));
  saveDailyReviews(mergedRows);
  showToast("宸叉寜鏃ユ湡鍚堝苟涓烘棩鍗＄墖");
  renderDailyReview();
}

function toggleDailyReviewDetail() {
  state.dailyReviewDetail = !state.dailyReviewDetail;
  renderDailyReview();
}

function exportDailyReviewCsv() {
  const rows = readDailyReviews();
  const header = ["\u65e5\u671f", "\u6807\u7684", "\u52a8\u4f5c", "\u4ed3\u4f4d", "\u4ef7\u683c", "\u7406\u7531", "\u7ed3\u679c", "\u590d\u76d8\u7ed3\u8bba"];
  const csv = [header, ...rows.map(row => [row.date, row.target, row.action, row.position, row.price, row.reason, row.result, row.lesson])]
    .map(line => line.map(value => `"${String(value || "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `\u5c0f\u53ef\u6bcf\u65e5\u590d\u76d8-${todayString()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function readSectorStrengthNotes() {
  try {
    const data = JSON.parse(localStorage.getItem(SECTOR_STRENGTH_KEY) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function saveSectorStrengthNotes(notes) {
  localStorage.setItem(SECTOR_STRENGTH_KEY, JSON.stringify(notes || {}));
}

function updateSectorStrengthNote(sector, field, value) {
  const notes = readSectorStrengthNotes();
  notes[sector] = { ...(notes[sector] || {}), [field]: value, updatedAt: new Date().toISOString() };
  saveSectorStrengthNotes(notes);
}

function openSectorStrength() {
  state.view = "sectorStrength";
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  renderSectorStrength();
}

function groupStockItems(group) {
  return [
    ...(group.items || []),
    ...(group.children || []).flatMap(child => groupStockItems(child))
  ];
}

function groupVideoSignal(group) {
  return groupStockItems(group).reduce((sum, item) => sum + relatedVideoCount(item.name), 0);
}

function parseStrengthValue(value) {
  const text = String(value || "").trim();
  const numeric = Number(text.replace(/[^\d.-]/g, ""));
  if (Number.isFinite(numeric) && text) return numeric;
  if (/强|核心|高|主线/.test(text)) return 28;
  if (/中|次|观察/.test(text)) return 14;
  if (/弱|低|回避|风险/.test(text)) return -8;
  return 0;
}

function scoreSectorGroup(group, index) {
  const stocks = groupStockItems(group);
  const videoSignal = groupVideoSignal(group);
  const quotePulse = stocks.reduce((sum, item) => {
    const quote = state.indexQuotes[item.quoteKey] || state.indexQuotes[item.name] || {};
    return sum + Number(quote.pct || 0);
  }, 0);
  const manual = parseStrengthValue(group.strength);
  const score = Math.round(stocks.length * 4 + (group.children || []).length * 8 + videoSignal * 1.8 + quotePulse * 1.5 + manual - index * 0.5);
  return { group, stocks, videoSignal, quotePulse, score };
}

function sectorRole(rank, score) {
  if (rank <= 2 || score >= 70) return "主线";
  if (rank <= 5 || score >= 42) return "次主线";
  return "观察";
}
function topSectorBranches(group) {
  return (group.children || [])
    .map(child => ({ name: child.name, count: countGroupItems(child), stocks: groupStockItems(child).slice(0, 8).map(item => item.name) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function sectorImportPanelHtml(prefix = "sector") {
  const preview = state.sectorImportPreview;
  return `
    <section class="panel sector-import-panel">
      <div class="metadata-head">
        <div>
          <div class="panel-title">导入产业链表到关注分组</div>
          <div class="date">支持 Excel / CSV / TXT / PDF 文字层；图片 OCR 入口已预留。表格按“板块、强弱、上中下游、分类、核心、细化”识别。</div>
        </div>
        <div class="review-actions">
          <button class="small-btn" onclick="parseSectorMapImport('${prefix}')">解析预览</button>
          <button class="open-btn" onclick="importSectorMapPreview('${prefix}')">导入到分组</button>
        </div>
      </div>
      <div class="sector-import-grid">
        <label class="file-import">
          <span>选择 Excel / PDF / 图片</span>
          <input id="${prefix}SectorFile" type="file" accept=".xlsx,.xls,.csv,.txt,.pdf,.png,.jpg,.jpeg,.webp">
        </label>
        <textarea id="${prefix}SectorText" class="strategy-textarea" style="min-height:96px" placeholder="也可以把 OCR/Excel 复制出来的表格文字粘贴到这里。"></textarea>
      </div>
      <div id="${prefix}SectorStatus" class="date" style="margin-top:8px">${preview ? sectorImportPreviewHtml(preview) : "还没有解析预览。"}</div>
    </section>
  `;
}

function sectorImportPreviewHtml(preview) {
  const stats = preview.stats || {};
  const warnings = (preview.warnings || []).map(item => `<span class="decision-chip warn">${escapeHtml(item)}</span>`).join(" ");
  const groups = (preview.groups || []).slice(0, 4).map(group => {
    const stocks = groupStockItems(group).slice(0, 8).map(item => item.name).join("、");
    return `<span class="decision-chip">${escapeHtml(group.name)}：${countGroupItems(group)}标的${stocks ? ` / ${escapeHtml(stocks)}` : ""}</span>`;
  }).join(" ");
  return `已识别 ${stats.sectors || 0} 个板块、${stats.branches || 0} 个层级、${stats.categories || 0} 个细分、${stats.stocks || 0} 个标的。${warnings ? `<div style="margin-top:6px">${warnings}</div>` : ""}<div style="margin-top:6px">${groups || "没有可导入分组。"}</div>`;
}

async function parseSectorMapImport(prefix = "sector") {
  const file = document.getElementById(`${prefix}SectorFile`)?.files?.[0];
  const text = document.getElementById(`${prefix}SectorText`)?.value || "";
  const status = document.getElementById(`${prefix}SectorStatus`);
  if (!file && !text.trim()) {
    showToast("请先选择 Excel/PDF/图片，或粘贴表格文字");
    return null;
  }
  if (status) status.textContent = "正在解析产业链表...";
  try {
    const dataBase64 = file ? await fileToDataUrl(file) : "";
    const response = await fetch("/api/parse-sector-map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file ? file.name : "sector-map.txt",
        mimeType: file ? file.type : "text/plain",
        dataBase64,
        text
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "解析失败");
    state.sectorImportPreview = data;
    if (status) status.innerHTML = sectorImportPreviewHtml(data);
    showToast("产业链表已解析，可以导入到关注分组");
    return data;
  } catch (error) {
    if (status) status.textContent = error.message;
    showToast(error.message || "解析失败");
    return null;
  }
}

function findOrCreateGroup(list, name, extra = {}) {
  const cleanName = String(name || "").trim() || "未命名分组";
  let group = (list || []).find(item => item.name === cleanName);
  if (!group) {
    group = { name: cleanName, items: [], children: [], ...extra };
    list.push(group);
  }
  group.items = group.items || [];
  group.children = group.children || [];
  if (extra.strength && !group.strength) group.strength = extra.strength;
  return group;
}
function normalizeStockNameText(value) {
  return String(value || "").replace(/\s+/g, "").replace(/[()锛堬級]/g, "").toLowerCase();
}

function localQuoteAliasForName(name) {
  const exact = STOCK_QUOTE_ALIASES[name];
  if (exact !== undefined) return exact;
  const key = normalizeStockNameText(name);
  const hit = Object.entries(STOCK_QUOTE_ALIASES).find(([stock]) => normalizeStockNameText(stock) === key);
  return hit ? hit[1] : "";
}

function importedStockScore(item = {}) {
  const hasCode = item.quoteKey || localQuoteAliasForName(item.name);
  const related = typeof relatedVideoCount === "function" ? relatedVideoCount(item.name) : 0;
  const quote = hasCode ? (state.indexQuotes[item.quoteKey] || null) : null;
  const desc = [item.desc, item.sector, item.groupChain].join(" ");
  const coreBonus = /鏍稿績|榫欏ご|CPO|AI|绠楀姏|璁惧|鏉愭枡|瀛樺偍|鍏夋ā鍧梶鍏堣繘/.test(desc) ? 16 : 0;
  const codeBonus = hasCode ? 24 : 0;
  const quoteBonus = quote ? Math.max(-8, Math.min(16, Number(quote.pct || 0) * 2)) : 0;
  const relatedBonus = Math.min(18, related * 3);
  const detailBonus = String(item.desc || "").length > 8 ? 8 : 0;
  return Math.round(Math.max(0, Math.min(100, 34 + codeBonus + coreBonus + relatedBonus + quoteBonus + detailBonus)));
}

function stockScoreBadgeHtml(item = {}) {
  const score = Number(item.importScore || item.score || importedStockScore(item));
  const cls = score >= 76 ? "good" : score >= 56 ? "warn" : "";
  return `<span class="stock-score ${cls}">${score}分</span>`;
}

function walkParsedSectorItems(groups = [], visitor, chain = []) {
  (groups || []).forEach(group => {
    const nextChain = chain.concat(group.name);
    (group.items || []).forEach(item => visitor(item, group, nextChain));
    walkParsedSectorItems(group.children || [], visitor, nextChain);
  });
}

async function resolveStockNameToQuoteKey(name) {
  const local = localQuoteAliasForName(name);
  if (local) return local;
  const query = String(name || "").trim();
  if (!query || query.length < 2) return "";
  try {
    const response = await fetch("/api/stock-search?q=" + encodeURIComponent(query) + "&limit=4");
    const data = await response.json().catch(() => ({}));
    const rows = Array.isArray(data.items) ? data.items : [];
    const clean = normalizeStockNameText(query);
    const exact = rows.find(item => normalizeStockNameText(item.name) === clean);
    const candidate = exact || rows.find(item => item.key);
    return candidate ? candidate.key || "" : "";
  } catch {
    return "";
  }
}

async function enrichSectorImportGroups(groups = []) {
  const items = [];
  walkParsedSectorItems(groups, (item, group, chain) => {
    item.groupChain = chain.join(" / ");
    item.quoteKey = item.quoteKey || localQuoteAliasForName(item.name);
    item.importScore = importedStockScore(item);
    items.push(item);
  });
  const missing = items.filter(item => item.name && !item.quoteKey).slice(0, 180);
  if (!missing.length) return { matched: items.filter(item => item.quoteKey).length, total: items.length };
  let matched = items.filter(item => item.quoteKey).length;
  const concurrency = 6;
  for (let i = 0; i < missing.length; i += concurrency) {
    const batch = missing.slice(i, i + concurrency);
    await Promise.all(batch.map(async item => {
      const key = await resolveStockNameToQuoteKey(item.name);
      if (key) {
        item.quoteKey = key;
        item.importScore = importedStockScore(item);
        matched += 1;
      }
    }));
  }
  return { matched, total: items.length };
}

function mergeParsedGroupIntoWatchGroup(target, parsed) {
  (parsed.items || []).forEach(item => {
    if (target.items.some(existing => existing.name === item.name)) return;
    target.items.push({
      name: item.name,
      quoteKey: item.quoteKey || localQuoteAliasForName(item.name) || "",
      count: item.count || 0,
      sector: item.sector || parsed.name || target.name,
      desc: item.desc || "",
      status: item.status || "ok",
      importScore: item.importScore || importedStockScore(item)
    });
  });
  (parsed.children || []).forEach(child => {
    const next = findOrCreateGroup(target.children, child.name, { strength: child.strength || "" });
    mergeParsedGroupIntoWatchGroup(next, child);
  });
}

function mergeSectorGroupsIntoWatchGroups(parsedGroups = []) {
  const groups = readWatchGroups();
  parsedGroups.forEach(parsed => {
    const top = findOrCreateGroup(groups, parsed.name, { strength: parsed.strength || "" });
    mergeParsedGroupIntoWatchGroup(top, parsed);
  });
  saveWatchGroups(groups);
  renderWatchlistPane();
  return groups;
}

function walkWatchItemsMutable(groups = [], visitor, chain = []) {
  (groups || []).forEach(group => {
    const nextChain = chain.concat(group.name);
    (group.items || []).forEach(item => visitor(item, group, nextChain));
    walkWatchItemsMutable(group.children || [], visitor, nextChain);
  });
}

async function repairWatchlistQuotesAndScores(path = null) {
  const groups = readWatchGroups();
  const root = Array.isArray(path) ? getGroupByPath(groups, path) : null;
  const targetGroups = root ? [root] : groups;
  const items = [];
  walkWatchItemsMutable(targetGroups, (item, group, chain) => {
    item.groupChain = chain.join(" / ");
    item.quoteKey = item.quoteKey || localQuoteAliasForName(item.name);
    item.importScore = importedStockScore(item);
    items.push(item);
  });
  const missing = items.filter(item => item.name && !item.quoteKey).slice(0, 220);
  showToast(`正在补行情代码：0/${missing.length}`);
  let matched = items.filter(item => item.quoteKey).length;
  const concurrency = 6;
  for (let i = 0; i < missing.length; i += concurrency) {
    const batch = missing.slice(i, i + concurrency);
    await Promise.all(batch.map(async item => {
      const key = await resolveStockNameToQuoteKey(item.name);
      if (key) {
        item.quoteKey = key;
        matched += 1;
      }
      item.importScore = importedStockScore(item);
    }));
    showToast(`正在补行情代码：${Math.min(i + concurrency, missing.length)}/${missing.length}`);
  }
  items.forEach(item => {
    item.importScore = importedStockScore(item);
  });
  saveWatchGroups(groups);
  renderWatchlistPane();
  await refreshMarketIndexes();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  if (state.view === "sectorStrength") renderSectorStrength();
  showToast(`已补代码/评分：${matched}/${items.length}`);
}

async function importSectorMapPreview(prefix = "sector") {
  let preview = state.sectorImportPreview;
  if (!preview || !(preview.groups || []).length) {
    preview = await parseSectorMapImport(prefix);
  }
  if (!preview || !(preview.groups || []).length) {
    showToast("没有识别到可导入的分组");
    return;
  }
  showToast("正在匹配行情代码并生成评分...");
  const enrich = await enrichSectorImportGroups(preview.groups);
  mergeSectorGroupsIntoWatchGroups(preview.groups);
  await refreshMarketIndexes();
  showToast(`已导入 ${preview.stats?.sectors || preview.groups.length} 个板块，代码匹配 ${enrich.matched}/${enrich.total}`);
  if (state.view === "sectorStrength") renderSectorStrength();
  if (state.view === "videoGroupManager") openVideoGroupManager();
}

function updateWatchGroupField(groupName, field, value) {
  const groups = readWatchGroups();
  walkWatchGroups(groups, group => {
    if (group.name === groupName) group[field] = value;
  });
  saveWatchGroups(groups);
}

function renderSectorStrength() {
  state.view = "sectorStrength";
  const notes = readSectorStrengthNotes();
  const rows = readWatchGroups()
    .filter(group => countGroupItems(group) > 0 && !/指数/.test(group.name))
    .map((group, index) => scoreSectorGroup(group, index))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1, role: sectorRole(index + 1, item.score) }));
  const mainRows = rows.filter(item => item.role === "主线").slice(0, 4);
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">板块强弱</div>
        <div class="date">先排板块强弱，再在主线中找主线；记录运动轨迹、提炼规律、回到市场验证，反复形成更客观的市场认识。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="renderSectorStrength()">刷新排序</button>
        <button class="small-btn" onclick="repairWatchlistQuotesAndScores()">全局补代码/评分</button>
        <button class="small-btn" onclick="openVideoGroupManager()">导入产业链</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-title">板块排序</div>
      <div class="sector-rank-grid">
        ${rows.map(item => {
          const note = notes[item.group.name] || {};
          const branches = topSectorBranches(item.group);
          return `
          <article class="sector-rank-card ${item.role === "主线" ? "main" : item.role === "次主线" ? "secondary" : ""}">
            <div class="sector-rank-head">
              <div><b>${item.rank}. ${escapeHtml(item.group.name)}</b><span>${item.role} · ${countGroupItems(item.group)}标的 · ${item.score}分</span></div>
              <button class="small-btn" onclick="openSectorDirectory([${readWatchGroups().findIndex(group => group.name === item.group.name)}])">打开</button>
            </div>
            <div class="sector-meter"><i style="width:${Math.max(4, Math.min(100, item.score))}%"></i></div>
            <div class="sector-branch-list">
              ${branches.map(branch => `<div><b>${escapeHtml(branch.name)}</b><span>${branch.count}标的</span><em>${escapeHtml(branch.stocks.join("、"))}</em></div>`).join("") || `<div><b>直属标的</b><span>${item.stocks.length}只</span><em>${escapeHtml(item.stocks.slice(0, 8).map(stock => stock.name).join("、"))}</em></div>`}
            </div>
            <label>强弱判断<input value="${escapeHtml(item.group.strength || "")}" oninput="updateWatchGroupField('${escapeHtml(item.group.name)}','strength',this.value)" placeholder="强 / 中 / 弱，或直接填分数"></label>
            <label>运动轨迹<textarea oninput="updateSectorStrengthNote('${escapeHtml(item.group.name)}','path',this.value)" placeholder="主线如何启动、分歧、回流、退潮...">${escapeHtml(note.path || "")}</textarea></label>
            <label>验证结论<textarea oninput="updateSectorStrengthNote('${escapeHtml(item.group.name)}','verify',this.value)" placeholder="回到市场验证：哪些对了，哪些错了...">${escapeHtml(note.verify || "")}</textarea></label>
          </article>`;
        }).join("")}
      </div>
    </section>
    <section class="panel sector-summary-panel">
      <div class="panel-title">主线观察</div>
      <div class="sector-work-grid">
        ${mainRows.map(item => `<div><b>${escapeHtml(item.group.name)}</b><p>${item.score}分 · ${item.role}。核心分支：${topSectorBranches(item.group).map(branch => branch.name).join("、") || "待拆分"}</p></div>`).join("") || `<div><b>暂无主线</b><p>先导入产业链表或补充关注分组，再进行排序。</p></div>`}
      </div>
    </section>
    ${sectorImportPanelHtml("strength")}
  `;
}
function renderDailyReview() {
  state.view = "dailyReview";
  const rows = readDailyReviews();
  const groups = groupDailyReviewsByDate(rows);
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">\u6bcf\u65e5\u590d\u76d8</div>
        <div class="date">涓€澶╀竴寮犲鐩樺崱锛氫拱鍗栧鍙エ銆佽瀵熷鍙エ閮藉啓鍦ㄥ悓涓€澶╅噷锛涢渶瑕佹祦姘存槑缁嗘椂鍐嶅睍寮€銆?/div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="exportDailyReviewCsv()">\u5bfc\u51fa CSV</button>
        <button class="small-btn" onclick="toggleDailyReviewDetail()">${state.dailyReviewDetail ? "收起明细" : "展开明细"}</button>
        <button class="small-btn" onclick="mergeAllDailyReviewsByDate()">鍚堝苟鍚屾棩</button>
        <button class="small-btn" onclick="addDailyReviewRow()">+鏄庣粏琛?/button>
        <button class="open-btn" onclick="addDailyReviewDay()">+鏂板涓€澶?/button>
      </div>
    </section>
    <section class="panel review-panel">
      <div class="daily-card-list">
        ${groups.map(group => dailyReviewDayCardHtml(group)).join("") || `<div class="empty-review">鏆傛棤璁板綍锛岀偣鍙充笂瑙掆€?鏂板涓€澶┾€濆紑濮嬨€?/div>`}
      </div>
    </section>
    ${state.dailyReviewDetail ? `
    <section class="panel review-panel" style="margin-top:12px">
      <div class="metadata-head"><div><div class="panel-title">娴佹按鏄庣粏</div><div class="date">淇濈暀鍘熷閫愭潯璁板綍锛屾柟渚?CSV 鍜岀簿缁嗚拷韪€?/div></div></div>
      <div class="review-table-wrap">
        <table class="review-table">
          <thead><tr><th>\u65e5\u671f</th><th>\u6807\u7684</th><th>\u52a8\u4f5c</th><th>\u4ed3\u4f4d</th><th>\u4ef7\u683c</th><th>\u7406\u7531</th><th>\u7ed3\u679c</th><th>\u590d\u76d8\u7ed3\u8bba</th><th></th></tr></thead>
          <tbody>${rows.map(reviewRowHtml).join("") || `<tr><td colspan="9" class="empty-review">\u6682\u65e0\u8bb0\u5f55\uff0c\u70b9\u53f3\u4e0a\u89d2\u201c+\u65b0\u589e\u4e00\u884c\u201d\u5f00\u59cb\u3002</td></tr>`}</tbody>
        </table>
      </div>
    </section>` : ""}
  `;
}

function dailyReviewDayCardHtml(group) {
  const merged = mergeDailyReviewItems(group.items);
  const isMerged = group.items.length === 1;
  const row = isMerged ? group.items[0] : merged;
  const id = row.id;
  const editHint = isMerged ? "" : `<div class="date" style="margin:8px 0 0;color:#ffd07a">杩欎竴澶╄繕鏈?${group.items.length} 鏉℃槑缁嗭紝鍏堢偣鈥滃悎骞惰繖澶┾€濆啀缂栬緫鏃ュ崱鐗囥€?/div>`;
  const disabled = isMerged ? "" : "disabled";
  const targetInput = isMerged ? `oninput="updateDailyReview('${id}','target',this.value)"` : "";
  const reasonInput = isMerged ? `oninput="updateDailyReview('${id}','reason',this.value)"` : "";
  const resultInput = isMerged ? `oninput="updateDailyReview('${id}','result',this.value)"` : "";
  const lessonInput = isMerged ? `oninput="updateDailyReview('${id}','lesson',this.value)"` : "";
  const mergeButton = group.items.length > 1
    ? `<button class="small-btn" onclick="mergeDailyReviewDate('${escapeHtml(group.date)}')">鍚堝苟杩欏ぉ ${group.items.length} 鏉?/button>`
    : "";
  const detail = group.items.length > 1
    ? `<div class="daily-card-lines">${group.items.map(item => `<span>${escapeHtml(compactReviewLine(item) || item.target || "鏈～鏍囩殑")}</span>`).join("")}</div>`
    : "";
  return `
    <article class="daily-card">
      <div class="daily-card-head">
        <input class="daily-date-input" value="${escapeHtml(row.date || group.date || "")}" ${disabled} ${isMerged ? `oninput="updateDailyReview('${id}','date',this.value)"` : ""}>
        <div class="daily-card-actions">
          ${mergeButton}
          <button class="small-btn danger-btn" onclick="deleteDailyReviewDate('${escapeHtml(group.date)}')">鍒犻櫎鏈棩</button>
        </div>
      </div>
      ${detail}
      ${editHint}
      <div class="daily-card-grid">
        <label><b>鏍囩殑 / 鍔ㄤ綔 / 浠撲綅</b><textarea ${disabled} ${targetInput} placeholder="涔板叆锛氱敓鐩婄鎶€ 50%  鍗婁粨璇曢敊&#10;鍗栧嚭锛氶骞?50%  杈惧埌鐩爣&#10;瑙傚療锛氫腑闄呮棴鍒涖€佸伐涓氬瘜鑱?>${escapeHtml(row.target || "")}</textarea></label>
        <label><b>鐞嗙敱 / 璁″垝</b><textarea ${disabled} ${reasonInput} placeholder="涓轰粈涔堝仛銆佽Е鍙戞潯浠躲€佽鍒掓槸浠€涔?>${escapeHtml(row.reason || "")}</textarea></label>
        <label><b>缁撴灉 / 甯傚満鍙嶉</b><textarea ${disabled} ${resultInput} placeholder="娑ㄨ穼銆佹槸鍚︾鍚堥鏈熴€佺洏涓弽棣?>${escapeHtml(row.result || "")}</textarea></label>
        <label><b>澶嶇洏缁撹 / 鏄庢棩鍔ㄤ綔</b><textarea ${disabled} ${lessonInput} placeholder="涓嬫鎬庝箞鏀广€佹槑澶╄瀵熶粈涔?>${escapeHtml(row.lesson || "")}</textarea></label>
      </div>
    </article>
  `;
}

function reviewRowHtml(row) {
  const actions = ["\u89c2\u5bdf", "\u4e70\u5165", "\u5356\u51fa", "\u52a0\u4ed3", "\u51cf\u4ed3", "\u7a7a\u4ed3", "\u7ea0\u9519"];
  return `
    <tr>
      <td><input value="${escapeHtml(row.date || "")}" oninput="updateDailyReview('${row.id}','date',this.value)"></td>
      <td><input value="${escapeHtml(row.target || "")}" placeholder="\u5982\uff1a\u5146\u6613\u521b\u65b0" oninput="updateDailyReview('${row.id}','target',this.value)"></td>
      <td><select onchange="updateDailyReview('${row.id}','action',this.value)">${actions.map(action => `<option value="${action}" ${row.action === action ? "selected" : ""}>${action}</option>`).join("")}</select></td>
      <td><input value="${escapeHtml(row.position || "")}" placeholder="20%" oninput="updateDailyReview('${row.id}','position',this.value)"></td>
      <td><input value="${escapeHtml(row.price || "")}" placeholder="\u4ef7\u683c" oninput="updateDailyReview('${row.id}','price',this.value)"></td>
      <td><textarea oninput="updateDailyReview('${row.id}','reason',this.value)" placeholder="\u64cd\u4f5c\u7406\u7531">${escapeHtml(row.reason || "")}</textarea></td>
      <td><textarea oninput="updateDailyReview('${row.id}','result',this.value)" placeholder="\u7ed3\u679c / \u5e02\u573a\u53cd\u9988">${escapeHtml(row.result || "")}</textarea></td>
      <td><textarea oninput="updateDailyReview('${row.id}','lesson',this.value)" placeholder="\u4e0b\u6b21\u600e\u4e48\u6539">${escapeHtml(row.lesson || "")}</textarea></td>
      <td><button class="small-btn danger-btn" onclick="deleteDailyReviewRow('${row.id}')">\u5220</button></td>
    </tr>
  `;
}

function render() {
  renderTopChips();
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  if (state.view === "dailyReview") renderDailyReview();
}

function renderTopChips() {
  document.getElementById("topChips").innerHTML = `<button class="${state.view === "dailyReview" ? "chip active review-chip" : "chip review-chip"}" onclick="openDailyReview()">\u6bcf\u65e5\u590d\u76d8</button>` + tags.map(t => chipHtml(t)).join("");
}

function renderDashboard() {
  state.view = "dashboard";
  const main = document.getElementById("main");
  const targetCount = flattenWatchlist().length;
  main.innerHTML = `
    <section class="stats">
      <button class="stat" onclick="openWatchlistView()"><div><b>${targetCount}</b><span>\u5173\u6ce8\u6807\u7684</span></div></button>
      <button class="stat" onclick="openVideoLibrary()"><div><b>${state.videos.length}</b><span>鍒嗘瀽瑙嗛</span></div></button>
      <button class="stat" onclick="openInvestmentView()"><div><b>309</b><span>鎶曡祫鍒嗘瀽</span></div></button>
    </section>
    <section class="dash-grid">
      <div class="panel">
        <div class="panel-title">鐑棬鏍囩殑 TOP10</div>
        <div class="bars">${renderBars()}</div>
      </div>
      <div class="panel">
        <div class="panel-title">琛屼笟鍒嗗竷 TOP8</div>
        <div class="donut-wrap">
          <div class="donut"></div>
          <div class="legend">${tags.filter(t => t.type === "sector").slice(0,8).map((t,i) => `<div onclick="filterByTag('${t.name}')"><span class="sw" style="background:${["#3c82f6","#8d5cf6","#19c98b","#f5a623","#ef4444","#22c3d6","#ec4899","#84cc16"][i]}"></span>${t.name}</div>`).join("")}</div>
        </div>
      </div>
    </section>
    <section class="feed">
      ${state.videos.slice(0,4).map(feedHtml).join("")}
    </section>
    ${metadataTableHtml()}
  `;
}

function metadataTableHtml() {
  const rows = state.videos.filter(v => v.isMetadata).slice(0, 24);
  if (!rows.length) return "";
  const body = rows.map(v => {
    const openCall = `event.stopPropagation(); window.open(${JSON.stringify(v.originalUrl || "")}, "_blank")`;
    return `
      <tr onclick="openDetail('${v.id}')">
        <td>${escapeHtml(v.title)}</td>
        <td>${escapeHtml(v.author || "-")}</td>
        <td>${escapeHtml(v.date || "-")}</td>
        <td>${Number(v.likes || 0).toLocaleString()} / ${Number(v.comments || 0).toLocaleString()}</td>
        <td>${escapeHtml(v.confidence || "-")}</td>
        <td><button class="linkish" onclick='${openCall}'>鎵撳紑</button></td>
      </tr>
    `;
  }).join("");
  return `
    <section class="panel metadata-panel">
      <div class="metadata-head">
        <div>
          <div class="panel-title">鎶栭煶鍏冩暟鎹〃鏍?/div>
          <div class="date">鍙繚瀛樻爣棰樸€佷綔鑰呫€佹暟鎹拰鍘熻棰戦摼鎺ワ紝涓嶄笅杞借棰?/div>
        </div>
        <button class="small-btn" onclick="window.open('/api/export-metadata.csv','_blank')">瀵煎嚭 CSV</button>
      </div>
      <div class="metadata-table-wrap">
        <table class="metadata-table">
          <thead>
            <tr>
              <th>鏍囬</th>
              <th>浣滆€?/th>
              <th>鏃ユ湡</th>
              <th>鐐硅禐/璇勮</th>
              <th>鐘舵€?/th>
              <th>鍘熼摼鎺?/th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderBars() {
  const list = flattenWatchlist().filter(item => (item.count || 0) > 0).slice(0, 10);
  const max = Math.max(1, ...list.map(item => Number(item.count || 0)));
  return list.map(w => `
    <div class="bar">
      <span>${escapeHtml(w.name)}</span>
      <div class="track"><div class="fill" style="width:${Math.max(22, Number(w.count || 0) / max * 100)}%"></div></div>
      <span>${Number(w.count || 0)}</span>
    </div>
  `).join("");
}

function feedHtml(v) {
  return `
    <article class="feed-card" onclick="openDetail('${v.id}')">
      <div class="date">${v.date}</div>
      <h3>${v.title}</h3>
      <div class="tagline"><span class="tag high">楂樼疆淇?/span><span class="tag low">${v.focus}</span></div>
      <button class="linkish">鏌ョ湅璇︽儏 鈫?/button>
    </article>
  `;
}

function filteredVideos() {
  const q = state.search.trim().toLowerCase();
  const videos = state.videos.filter(v => {
    const active = tags.find(t => t.name === state.activeTag);
    const byTag = state.activeTag === "全部"
      || (active && active.type === "source" ? v.author === (active.sourceAuthor || active.name) : [v.topic, v.focus, v.title, v.transcript].join(" ").includes(state.activeTag));
    const bySearch = !q || [v.title, v.topic, v.focus, v.transcript].join(" ").toLowerCase().includes(q);
    return byTag && bySearch;
  });
  return videos.sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return String(a.title || "").localeCompare(String(b.title || ""), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
}

function renderLibrary() {
  state.view = "library";
  const videos = filteredVideos();
  document.getElementById("main").innerHTML = `
    <div class="video-head">
      <div><div class="panel-title" style="margin:0">视频素材库</div><div class="date">共 ${videos.length} 个视频 · ${state.activeTag}</div></div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    <section class="video-grid">${videos.map(videoCardHtml).join("") || `<div class="panel">暂无匹配视频</div>`}</section>
  `;
}

function videoCardHtml(v) {
  const media = v.thumbnail
    ? `<img src="${v.thumbnail}" alt="" style="width:100%;height:100%;object-fit:cover">`
    : v.videoUrl ? `<video src="${v.videoUrl}" muted preload="metadata"></video>` : `<div class="poster">书</div>`;
  const badge = v.isMetadata ? "元数据" : v.local ? "本地" : v.isDocument ? "书籍" : "样例";
  return `
    <article class="video-card" onclick="openDetail('${v.id}')">
      <div class="thumb">${media}<span class="play">${v.isMetadata ? "↗" : "▶"}</span></div>
      <div class="vc-body">
        <h3>${escapeHtml(getVideoDetailTitle(v))}</h3>
        <div class="metrics"><span>赞 <strong>${v.likes || 0}</strong></span><span>评 ${v.comments || 0}</span><span>转 ${v.shares || 0}</span></div>
        <div class="date" style="margin-top:7px">${badge} · ${v.date || "-"}</div>
      </div>
    </article>
  `;
}

function renderDetail() {
  state.view = "detail";
  const v = state.videos.find(item => item.id === state.currentVideoId) || state.videos[0];
  if (!v) return renderLibrary();
  const originalOpen = `window.open(${JSON.stringify(v.originalUrl || v.documentUrl || "")}, "_blank")`;
  const player = v.isMetadata
    ? `<div class="fallback-poster"><div style="font-size:44px">↗</div><div style="margin:10px 0 18px">此条只保存外部链接元数据</div><button class="open-btn" style="max-width:220px" onclick='event.stopPropagation(); ${originalOpen}'>打开原文</button></div>`
    : v.videoUrl ? `<video src="${v.videoUrl}" controls playsinline></video>`
    : `<div class="fallback-poster"><div style="font-size:52px">${v.isDocument ? "书" : "链"}</div><div>${escapeHtml(getVideoDetailTitle(v))}</div></div>`;
  document.getElementById("main").innerHTML = `
    <section class="detail">
      <div class="player">${player}</div>
      <div class="detail-main">
        <button class="small-btn" onclick="state.view='library';renderLibrary()">← 返回素材库</button>
        <h1 class="detail-title">${escapeHtml(v.topic || "素材")} · ${escapeHtml(getVideoDetailTitle(v))}</h1>
        <div class="detail-meta"><span>作者 ${escapeHtml(v.author || '-')} </span><span>赞 ${v.likes || 0}</span><span>评 ${v.comments || 0}</span><span>转 ${v.shares || 0}</span><span>${v.date || '-'}</span></div>
        ${(v.originalUrl || v.documentUrl) ? `<button class="small-btn" onclick='${originalOpen}' style="margin-bottom:12px">打开原文</button>` : ""}
        <div class="tabs"><button class="tab" onclick="showDetailTab('transcript')">转录/互动</button><button class="tab active" onclick="showDetailTab('analysis')">AI分析</button></div>
        <div id="detailContent">${analysisHtml(v)}</div>
      </div>
    </section>
  `;
}

function legacyAnalysisHtml(v) {
  return `
    <div class="analysis-card green"><h3>关注标的</h3><p><b>${escapeHtml(v.focus || "-")}</b> - ${escapeHtml(v.advice || "")}</p></div>
    <div class="analysis-card blue"><h3>操作建议</h3><p>${escapeHtml(v.advice || "")}</p></div>
    <div class="analysis-card red"><h3>风险提示</h3><p>${escapeHtml(v.risk || "")}</p></div>
    <div class="analysis-card gold"><h3>复盘关联</h3><p>${escapeHtml(v.philosophy || "")}</p></div>
    <div class="analysis-card"><h3>置信度：<span style="color:var(--green)">${escapeHtml(v.confidence || "-")}</span></h3><p>${escapeHtml(getVideoDetailTranscript(v))}</p></div>
  `;
}

function readVideoAnalyses() {
  if (jsonStoreCache.has(VIDEO_ANALYSIS_KEY)) return jsonStoreCache.get(VIDEO_ANALYSIS_KEY);
  try {
    const data = JSON.parse(localStorage.getItem(VIDEO_ANALYSIS_KEY) || "{}");
    const value = data && typeof data === "object" ? data : {};
    jsonStoreCache.set(VIDEO_ANALYSIS_KEY, value);
    return value;
  } catch {
    jsonStoreCache.set(VIDEO_ANALYSIS_KEY, {});
    return {};
  }
}

function saveVideoAnalysis(id, text) {
  const data = readVideoAnalyses();
  data[id] = text;
  localStorage.setItem(VIDEO_ANALYSIS_KEY, JSON.stringify(data));
  jsonStoreCache.set(VIDEO_ANALYSIS_KEY, data);
}

function deleteVideoAnalysis(id) {
  const data = readVideoAnalyses();
  if (data[id]) {
    delete data[id];
    localStorage.setItem(VIDEO_ANALYSIS_KEY, JSON.stringify(data));
    jsonStoreCache.set(VIDEO_ANALYSIS_KEY, data);
  }
  const structured = readJsonStore(VIDEO_ANALYSIS_V2_KEY, {});
  if (structured[id]) {
    delete structured[id];
    writeJsonStore(VIDEO_ANALYSIS_V2_KEY, structured);
  }
}

function readJsonStore(key, fallback) {
  if (jsonStoreCache.has(key)) return jsonStoreCache.get(key);
  try {
    const raw = localStorage.getItem(key);
    const value = raw === null ? fallback : JSON.parse(raw);
    jsonStoreCache.set(key, value);
    return value;
  } catch {
    jsonStoreCache.set(key, fallback);
    return fallback;
  }
}

function writeJsonStore(key, value) {
  jsonStoreCache.set(key, value);
  localStorage.setItem(key, JSON.stringify(value));
}

function readStructuredAnalyses() {
  const value = readJsonStore(VIDEO_ANALYSIS_V2_KEY, {});
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function saveStructuredAnalysis(id, model) {
  if (!id) return;
  const data = readStructuredAnalyses();
  data[id] = model || {};
  writeJsonStore(VIDEO_ANALYSIS_V2_KEY, data);
}

function readVideoLinks() {
  if (jsonStoreCache.has(VIDEO_LINKS_KEY)) return jsonStoreCache.get(VIDEO_LINKS_KEY);
  try {
    const data = JSON.parse(localStorage.getItem(VIDEO_LINKS_KEY) || "{}");
    const value = data && typeof data === "object" ? data : {};
    jsonStoreCache.set(VIDEO_LINKS_KEY, value);
    return value;
  } catch {
    jsonStoreCache.set(VIDEO_LINKS_KEY, {});
    return {};
  }
}

function saveVideoLinks(data) {
  const value = data && typeof data === "object" ? data : {};
  localStorage.setItem(VIDEO_LINKS_KEY, JSON.stringify(value));
  jsonStoreCache.set(VIDEO_LINKS_KEY, value);
}

function videoLinksFor(id) {
  const row = readVideoLinks()[id] || {};
  return {
    stocks: Array.isArray(row.stocks) ? row.stocks : [],
    sectors: Array.isArray(row.sectors) ? row.sectors : [],
    groups: Array.isArray(row.groups) ? row.groups : [],
    pending: Boolean(row.pending)
  };
}

function hasPlaceholderText(value) {
  return !value || /\?{4,}/.test(String(value));
}

function formatAiText(text) {
  return escapeHtml(text || "").replace(/\n/g, "<br>");
}

function buildVideoAnalysisPrompt(v) {
  const title = getVideoDetailTitle(v);
  const transcript = getVideoDetailTranscript(v);
  const sourceLabel = v.isDocument ? "文档正文" : "语音转文字";
  const usefulText = isEmptyTranscript(transcript) ? "暂无完整正文，请基于标题和现有元数据做低置信度复盘。" : transcript.slice(0, 18000);
  return [
    v.isDocument ? "你是小可课堂的读书助手，只根据提供的书籍/文档正文总结。" : "你是小可课堂的投资复盘助手，只根据提供的视频标题和转文字分析。",
    "输出克制，不给确定性买卖指令，只给观察框架、风险边界和可复盘目录。",
    "每项 1-2 句话即可。",
    "",
    `素材标题：${title}`,
    `作者：${v.author || "-"}`,
    `日期：${v.date || "-"}`,
    `${sourceLabel}：${usefulText}`,
    "",
    "请按字段输出：关注标的、总结重点、观点提炼、股票/板块关联、操作建议、风险提示、哲学关联、置信度评分。"
  ].join("\n");
}

function analysisHtml(v) {
  const saved = readVideoAnalyses()[v.id];
  if (saved) {
    return `
      <div class="analysis-actions"><button class="open-btn" onclick="generateVideoAIAnalysis('${v.id}', true)">重新生成 AI 分析</button></div>
      <div class="analysis-card"><h3>小可 AI 分析</h3><p>${formatAiText(saved)}</p></div>
    `;
  }
  return `
    <div class="analysis-actions"><button class="open-btn" onclick="generateVideoAIAnalysis('${v.id}')">生成 AI 分析</button></div>
    ${legacyAnalysisHtml(v)}
  `;
}

async function generateVideoAIAnalysis(id, force = false) {
  const v = state.videos.find(item => item.id === id) || state.videos[0];
  const content = document.getElementById("detailContent");
  if (!v || !content) return;
  if (!force && readVideoAnalyses()[id]) {
    content.innerHTML = analysisHtml(v);
    return;
  }
  content.innerHTML = `<div class="analysis-card pending"><h3>小可正在分析...</h3><p>正在根据标题、日期、互动数据和现有转录生成分析。</p></div>`;
  try {
    let provider = localStorage.getItem(AGENT_PROVIDER_KEY) || "workbuddy";
    if (provider === "auto") provider = "workbuddy";
    let answer = "";
    try {
      answer = await callAgentProvider(provider, buildVideoAnalysisPrompt(v));
    } catch {
      answer = await callAgentProvider("mock", buildVideoAnalysisPrompt(v));
      answer = "当前大模型调用失败，先用本地分析占位：\n\n" + answer;
    }
    saveVideoAnalysis(id, answer);
    content.innerHTML = analysisHtml(v);
  } catch (error) {
    content.innerHTML = `<div class="analysis-card red"><h3>AI 分析失败</h3><p>${escapeHtml(error.message || "未知错误")}</p></div>`;
  }
}
function showDetailTab(tab) {
  const v = state.videos.find(item => item.id === state.currentVideoId) || state.videos[0];
  const activeButton = typeof event !== "undefined" ? event.target : null;
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  if (activeButton) activeButton.classList.add("active");
  const content = document.getElementById("detailContent");
  if (!content) return;
  if (tab === "analysis") content.innerHTML = analysisHtml(v);
  if (tab === "transcript") {
    content.innerHTML = `
      <div class="analysis-card"><h3>互动数据</h3><p>点赞 ${v.likes || 0} · 评论 ${v.comments || 0} · 收藏 ${v.collects || 0} · 分享 ${v.shares || 0}</p></div>
      <div class="analysis-card"><h3>转录预览</h3><p>${formatAiText(getVideoDetailTranscript(v) || "上方语音转文字还没有内容。")}</p></div>
    `;
  }
}

function renderDetail() {
  state.view = "detail";
  const v = state.videos.find(item => item.id === state.currentVideoId) || state.videos[0];
  if (!v) return renderLibrary();
  const openUrl = v.documentUrl || v.originalUrl || "";
  const originalOpen = `window.open(${JSON.stringify(openUrl)}, "_blank")`;
  const player = v.isDocument
    ? `<div class="fallback-poster"><div style="font-size:44px">书</div><div style="margin:10px 0 18px">${escapeHtml(v.documentType || "本地文档")}已导入书籍素材库</div>${openUrl ? `<button class="open-btn" style="max-width:220px" onclick='event.stopPropagation(); ${originalOpen}'>打开文档</button>` : ""}</div>`
    : v.isMetadata
    ? `<div class="fallback-poster"><div style="font-size:44px">链</div><div style="margin:10px 0 18px">此条只保存外部链接元数据</div>${openUrl ? `<button class="open-btn" style="max-width:220px" onclick='event.stopPropagation(); ${originalOpen}'>打开原文</button>` : ""}</div>`
    : v.videoUrl ? `<video src="${v.videoUrl}" controls playsinline></video>`
    : `<div class="fallback-poster"><div style="font-size:52px">链</div><div>${escapeHtml(getVideoDetailTitle(v))}</div></div>`;
  document.getElementById("main").innerHTML = `
    <section class="detail">
      <div class="player">${player}</div>
      <div class="detail-main">
        <button class="small-btn" onclick="state.view='library';renderLibrary()">← 返回素材库</button>
        <h1 class="detail-title">${escapeHtml(getVideoDetailTitle(v))}</h1>
        <div class="detail-meta"><span>作者 ${escapeHtml(v.author || "-")}</span><span>赞 ${v.likes || 0}</span><span>评 ${v.comments || 0}</span><span>转 ${v.shares || 0}</span><span>${escapeHtml(v.date || "-")}</span></div>
        ${openUrl ? `<button class="small-btn" onclick='${originalOpen}' style="margin-bottom:12px">打开原文</button>` : ""}
        ${detailTextPanel(v)}
        <div class="tabs"><button class="tab" onclick="showDetailTab('transcript')">转录/互动</button><button class="tab active" onclick="showDetailTab('analysis')">AI分析</button></div>
        <div id="detailContent">${analysisHtml(v)}</div>
      </div>
    </section>
  `;
}
function renderAgent() {
  document.getElementById("agent").innerHTML = `
    <div class="agent-head">
      <span><span class="logo" style="display:inline-grid;width:30px;height:30px;margin-right:10px"><img src="assets/xiaoke-icon-64.png" alt=""></span>\u5c0f\u53ef Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="setAgentProvider(this.value)"><option value="auto">\u5c0f\u53ef\u534f\u4f5c</option></select>
        <span class="agent-status" id="agentStatus">\u68c0\u67e5\u6a21\u578b...</span>
        <button class="auto-btn" onclick="setAgentProvider('auto')">\u81ea\u52a8\u5206\u5de5</button>
        <button class="config-btn" onclick="openAgentConfig()">\u914d\u7f6e</button>
        <button class="icon-btn" onclick="toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles" id="agentRoles"></div>
    <div class="agent-tabs">
      <button class="primary" onclick="askAgent('investment')">\u6295\u8d44\u4e3b\u8111\uff1aWorkBuddy</button>
      <button onclick="askAgent('content')">\u5185\u5bb9\u4e3b\u8111\uff1a\u8c46\u5305</button>
      <button onclick="askAgent('system')">\u7cfb\u7edf\u4e3b\u8111\uff1aCodex</button>
      <button onclick="askAgent('team')">\u4e09\u8111\u534f\u4f5c\u590d\u76d8</button>
    </div>
    <div class="agent-chat" id="agentChat">
      <div class="bubble bot"><span class="route">\u5c0f\u53ef\u8bfe\u5802 \u00b7 \u603b\u63a7\u5165\u53e3</span>\u73b0\u5728\u7684\u5206\u5de5\u662f\uff1aWorkBuddy \u505a\u6295\u8d44\u5224\u65ad\uff0c\u8c46\u5305\u505a\u5185\u5bb9\u603b\u7ed3\u548c\u8868\u8fbe\uff0cCodex \u8d1f\u8d23\u7cfb\u7edf\u5efa\u8bbe\uff0c\u5c0f\u53ef\u8bfe\u5802\u8d1f\u8d23\u7edf\u4e00\u5165\u53e3\u548c\u8bb0\u5f55\u3002</div>
    </div>
    <div class="agent-input"><input id="agentInput" placeholder="\u8f93\u5165\u95ee\u9898\uff0c\u5c0f\u53ef\u4f1a\u81ea\u52a8\u5206\u914d\u4e3b\u8111..." onkeydown="if(event.key==='Enter')sendAgent()"><button onclick="sendAgent()">\u53d1\u9001</button></div>
  `;
  loadAgentProviders();
}

function askAgent(kind) {
  const prompts = {
    investment: "\u8bf7\u7528\u6295\u8d44\u4e3b\u8111 WorkBuddy \u5206\u6790\u5f53\u524d\u770b\u677f\uff1a\u4e3b\u7ebf\u3001\u98ce\u9669\u3001\u89c2\u5bdf\u70b9\u5206\u522b\u662f\u4ec0\u4e48\uff1f",
    content: "\u8bf7\u7528\u5185\u5bb9\u4e3b\u8111 \u8c46\u5305 \u628a\u5f53\u524d\u770b\u677f\u5185\u5bb9\u603b\u7ed3\u6210\u901a\u4fd7\u6613\u61c2\u7684\u5c0f\u8bfe\u7a0b\u6587\u6848\u3002",
    system: "\u8bf7\u7528\u7cfb\u7edf\u4e3b\u8111 Codex \u8bf4\u660e\u5c0f\u53ef\u8bfe\u5802\u73b0\u5728\u7684\u67b6\u6784\u548c\u4e0b\u4e00\u6b65\u8be5\u600e\u4e48\u6539\u3002",
    team: "\u8bf7\u8ba9\u4e09\u4e2a\u4e3b\u8111\u534f\u4f5c\u590d\u76d8\u5f53\u524d\u770b\u677f\uff1aWorkBuddy \u5148\u7ed9\u6295\u8d44\u903b\u8f91\uff0c\u8c46\u5305\u518d\u7ed9\u5185\u5bb9\u8868\u8fbe\uff0cCodex \u6700\u540e\u7ed9\u7cfb\u7edf\u5316\u5efa\u8bae\u3002"
  };
  const input = document.getElementById("agentInput");
  input.value = prompts[kind] || kind;
  sendAgent(kind);
}

async function loadAgentProviders() {
  const select = document.getElementById("agentProvider");
  const status = document.getElementById("agentStatus");
  if (!select || !status) return;
  try {
    const res = await fetch("/api/agent-providers");
    const data = await res.json();
    if (!data.success) throw new Error("read failed");
    window.agentProviderCache = data.providers || [];
    const selected = localStorage.getItem(AGENT_PROVIDER_KEY) || "auto";
    const autoOption = `<option value="auto" ${selected === "auto" ? "selected" : ""}>\u5c0f\u53ef\u534f\u4f5c\uff08\u81ea\u52a8\u5206\u5de5\uff09</option>`;
    const providerOptions = window.agentProviderCache.map(p => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${p.name}${p.configured ? "" : "\uff08\u672a\u914d\u7f6e\uff09"}</option>`).join("");
    select.innerHTML = autoOption + providerOptions;
    renderAgentRoles(window.agentProviderCache);
    updateAgentStatus(selected === "auto" ? { id: "auto", configured: true } : window.agentProviderCache.find(p => p.id === select.value));
  } catch {
    status.textContent = "\u672c\u5730\u6a21\u62df";
  }
}

function providerById(id) {
  return (window.agentProviderCache || []).find(p => p.id === id);
}

function roleState(providerId) {
  const provider = providerById(providerId);
  return provider && provider.configured ? "ready" : "missing";
}

function renderAgentRoles(providers = []) {
  const box = document.getElementById("agentRoles");
  if (!box) return;
  window.agentProviderCache = providers;
  const workbuddy = providerById("workbuddy");
  const doubao = providerById("doubao");
  const rows = [
    { title: "\u5c0f\u53ef\u8bfe\u5802", desc: "\u70b9\u6211\u5207\u56de\u81ea\u52a8\u5206\u5de5", state: "ready auto-role", action: "setAgentProvider('auto')" },
    { title: "WorkBuddy", desc: workbuddy && workbuddy.configured ? "\u6295\u8d44\u4e3b\u8111\u5df2\u5c31\u7eea" : "\u6295\u8d44\u4e3b\u8111\u5f85\u914d\u7f6e", state: roleState("workbuddy") },
    { title: "\u8c46\u5305", desc: doubao && doubao.configured ? "\u5185\u5bb9\u4e3b\u8111\u5df2\u5c31\u7eea" : "\u5185\u5bb9\u4e3b\u8111\u5f85\u914d\u7f6e", state: roleState("doubao") },
    { title: "Codex", desc: "\u7cfb\u7edf\u4e3b\u8111 / \u5f00\u53d1\u7ef4\u62a4", state: "ready" }
  ];
  box.innerHTML = rows.map(item => `<div class="role-card ${item.state}" ${item.action ? `onclick="${item.action}"` : ""}><strong>${item.title}</strong><span>${item.desc}</span></div>`).join("");
}

function setAgentProvider(value) {
  localStorage.setItem(AGENT_PROVIDER_KEY, value);
  const select = document.getElementById("agentProvider");
  if (select) select.value = value;
  fetch("/api/agent-providers")
    .then(res => res.json())
    .then(data => {
      window.agentProviderCache = data.providers || [];
      renderAgentRoles(window.agentProviderCache);
      updateAgentStatus(value === "auto" ? { id: "auto", configured: true } : window.agentProviderCache.find(p => p.id === value));
    })
    .catch(() => {
      const status = document.getElementById("agentStatus");
      if (status) status.textContent = "\u672c\u5730\u6a21\u62df";
    });
}

function updateAgentStatus(provider) {
  const status = document.getElementById("agentStatus");
  if (!status || !provider) return;
  if (provider.id === "auto") {
    status.textContent = "\u81ea\u52a8\u5206\u5de5\uff1a\u6295\u8d44->WorkBuddy / \u5185\u5bb9->\u8c46\u5305 / \u7cfb\u7edf->Codex";
    return;
  }
  status.textContent = provider.configured ? `${provider.model}` : `\u672a\u914d\u7f6e ${provider.keyEnv || "API Key"}`;
}

function defaultAgentRouteRules() {
  return { investment: "workbuddy", content: "doubao", system: "codex" };
}

function readAgentRouteRules() {
  try {
    return { ...defaultAgentRouteRules(), ...JSON.parse(localStorage.getItem(AGENT_ROUTE_RULES_KEY) || "{}") };
  } catch {
    return defaultAgentRouteRules();
  }
}

function writeAgentRouteRules(rules) {
  localStorage.setItem(AGENT_ROUTE_RULES_KEY, JSON.stringify({ ...defaultAgentRouteRules(), ...(rules || {}) }));
}

function agentRouteName(providerId) {
  if (providerId === "codex") return "Codex";
  if (providerId === "team") return "\u4e09\u8111\u534f\u4f5c";
  return providerById(providerId)?.name || providerId || "\u672a\u8bbe\u7f6e";
}

function configuredRouteProvider(role) {
  return readAgentRouteRules()[role] || defaultAgentRouteRules()[role];
}

function routeAgentProvider(text, forcedMode) {
  if (forcedMode === "investment") {
    const provider = configuredRouteProvider("investment");
    return { provider, label: `\u6295\u8d44\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
  }
  if (forcedMode === "content") {
    const provider = configuredRouteProvider("content");
    return { provider, label: `\u5185\u5bb9\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
  }
  if (forcedMode === "system") {
    const provider = configuredRouteProvider("system");
    return { provider, label: `\u7cfb\u7edf\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
  }
  if (forcedMode === "team") return { provider: "team", label: "\u4e09\u8111\u534f\u4f5c" };
  const selected = document.getElementById("agentProvider")?.value || "auto";
  if (selected !== "auto") return { provider: selected, label: `\u624b\u52a8\u6a21\u578b\uff1a${providerById(selected)?.name || selected}` };
  if (forcedMode === "team" || /\u534f\u4f5c|\u4e09\u8111|team|\u590d\u76d8/i.test(text)) return { provider: "team", label: "\u4e09\u8111\u534f\u4f5c" };
  if (/\u7cfb\u7edf|\u8f6f\u4ef6|\u4ee3\u7801|bug|\u4fee\u6539|\u5f00\u53d1|Codex/i.test(text)) {
    const provider = configuredRouteProvider("system");
    return { provider, label: `\u7cfb\u7edf\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
  }
  if (/\u6587\u6848|\u6807\u9898|\u603b\u7ed3|\u53e3\u64ad|\u8bfe\u7a0b|\u8868\u8fbe|\u5185\u5bb9|\u6539\u5199|\u8c46\u5305/i.test(text)) {
    const provider = configuredRouteProvider("content");
    return { provider, label: `\u5185\u5bb9\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
  }
  const provider = configuredRouteProvider("investment");
  return { provider, label: `\u6295\u8d44\u4e3b\u8111\uff1a${agentRouteName(provider)}` };
}

function codexSystemAnswer() {
  return "Codex \u7684\u804c\u8d23\u662f\u628a\u5c0f\u53ef\u8bfe\u5802\u5efa\u6210\u53ef\u957f\u671f\u4f7f\u7528\u7684\u7cfb\u7edf\uff1a\n\n1. \u4fee\u6539\u9875\u9762\u3001\u684c\u9762\u56fe\u6807\u3001\u6570\u636e\u5bfc\u5165\u548c\u770b\u677f\u7ed3\u6784\u3002\n2. \u628a WorkBuddy \u548c \u8c46\u5305 \u63a5\u6210 API\uff0c\u8ba9\u5c0f\u53ef\u8bfe\u5802\u81ea\u52a8\u5206\u53d1\u4efb\u52a1\u3002\n3. \u628a\u6bcf\u6b21\u5206\u6790\u7ed3\u679c\u56de\u5199\u5230\u89c6\u9891\u3001\u677f\u5757\u548c\u590d\u76d8\u7b14\u8bb0\u91cc\u3002\n\n\u5982\u679c\u4f60\u8981\u6539\u8f6f\u4ef6\uff0c\u5c31\u76f4\u63a5\u5728 Codex \u91cc\u8bf4\u201c\u5e2e\u6211\u6539...\u201d\uff1b\u5982\u679c\u8981\u5206\u6790\u6295\u8d44\uff0c\u5c0f\u53ef\u8bfe\u5802\u4f1a\u8def\u7531\u7ed9 WorkBuddy\uff1b\u5982\u679c\u8981\u751f\u6210\u6587\u6848\uff0c\u5c31\u8def\u7531\u7ed9\u8c46\u5305\u3002";
}

async function openAgentConfig() {
  let providerId = document.getElementById("agentProvider")?.value || "workbuddy";
  const res = await fetch("/api/agent-providers");
  const data = await res.json();
  const providers = data.providers || [];
  window.agentProviderCache = providers;
  if (providerId === "auto") {
    providerId = providers.find(p => p.id === "workbuddy" && !p.configured)?.id || providers.find(p => p.id === "doubao" && !p.configured)?.id || "workbuddy";
  }
  if (providerId === "mock") {
    showToast("\u672c\u5730\u6a21\u62df\u4e0d\u9700\u8981\u914d\u7f6e API");
    return;
  }
  populateAgentConfigProviderSelect(providers, providerId);
  renderAgentRouteRules(providers);
  applyAgentConfigProvider(providerId, { fillCurrent: true, clearKey: true });
  const testBox = document.getElementById("agentParseTestResult");
  if (testBox) {
    testBox.style.display = "none";
    testBox.innerHTML = "";
  }
  document.getElementById("agentConfigModal").classList.add("open");
}
function closeAgentConfig() {
  document.getElementById("agentConfigModal").classList.remove("open");
}

function configurableAgentProviders(providers = window.agentProviderCache || []) {
  return (providers || []).filter(provider => provider.id !== "mock");
}

function populateAgentConfigProviderSelect(providers = [], selectedId = "") {
  const select = document.getElementById("agentConfigProviderSelect");
  if (!select) return;
  const rows = configurableAgentProviders(providers);
  select.innerHTML = rows.map(provider => `<option value="${escapeHtml(provider.id)}">${escapeHtml(provider.name)}${provider.configured ? "\uff08\u5df2\u914d\u7f6e\uff09" : "\uff08\u672a\u914d\u7f6e\uff09"}</option>`).join("");
  if (rows.some(provider => provider.id === selectedId)) select.value = selectedId;
}

function changeAgentConfigProvider(providerId) {
  applyAgentConfigProvider(providerId, { fillCurrent: true, clearKey: true });
}

function applyAgentConfigProvider(providerId, options = {}) {
  const provider = providerById(providerId);
  if (!provider) return;
  window.agentConfigProvider = provider.id;
  const select = document.getElementById("agentConfigProviderSelect");
  if (select && select.value !== provider.id) select.value = provider.id;
  const template = agentProviderTemplate(provider);
  document.getElementById("agentConfigTitle").textContent = `\u5f53\u524d\u914d\u7f6e\uff1a${provider.name}${provider.configured ? "\uff08\u5df2\u4fdd\u5b58\u5bc6\u94a5\uff09" : "\uff08\u672a\u914d\u7f6e\uff09"}`;
  const apiInput = document.getElementById("agentApiKey");
  if (apiInput) {
    if (options.clearKey) apiInput.value = "";
    apiInput.placeholder = provider.configured ? "\u5df2\u4fdd\u5b58\u5bc6\u94a5\uff0c\u4e0d\u4fee\u6539\u53ef\u7559\u7a7a" : "\u7c98\u8d34 API Key\uff0c\u4f8b\u5982 ck_... / sk_...";
  }
  if (options.fillCurrent) {
    const modelInput = document.getElementById("agentModelName");
    const endpointInput = document.getElementById("agentEndpoint");
    const responsePathInput = document.getElementById("agentResponsePath");
    if (modelInput) modelInput.value = template.model || "";
    if (endpointInput) endpointInput.value = template.endpoint || "";
    if (responsePathInput) responsePathInput.value = template.responsePath || "";
  }
  renderAgentTemplateInfo(provider);
  const help = document.getElementById("agentConfigHelp");
  if (help) help.textContent = template.help || "\u5bc6\u94a5\u4f1a\u4fdd\u5b58\u5230\u672c\u673a agent-config.json\u3002\u8fd4\u56de\u5185\u5bb9\u8def\u5f84\u53ef\u4e0d\u586b\uff0c\u9ed8\u8ba4\u517c\u5bb9 OpenAI \u683c\u5f0f choices.0.message.content\u3002";
  updateAgentConfigCheck();
  const testBox = document.getElementById("agentParseTestResult");
  if (testBox) {
    testBox.style.display = "none";
    testBox.innerHTML = "";
  }
}

function agentConfigCheckRows(provider = providerById(document.getElementById("agentConfigProviderSelect")?.value), payload = agentConfigPayload()) {
  if (!provider) return [];
  const hasSavedKey = Boolean(provider.configured);
  const hasInputKey = Boolean(payload.apiKey);
  const keyOk = provider.id === "mock" || hasSavedKey || hasInputKey;
  const endpoint = payload.endpoint || provider.endpoint || "";
  const isCli = endpoint === "cli:codebuddy" || provider.id === "codebuddy";
  const endpointOk = isCli || Boolean(endpoint) || (provider.id === "workbuddy" && /^ck_/i.test(payload.apiKey || ""));
  const pathOk = Boolean(payload.responsePath || provider.responsePath || provider.defaultResponsePath);
  const modelOk = Boolean(payload.model || provider.model || provider.defaultModel) || isCli;
  return [
    { ok: keyOk, text: keyOk ? "\u5bc6\u94a5\uff1a\u5df2\u6709\u53ef\u7528 key" : "\u5bc6\u94a5\uff1a\u9700\u8981\u586b\u5199 API Key" },
    { ok: endpointOk, text: endpointOk ? "\u63a5\u53e3\uff1aendpoint \u5df2\u5c31\u7eea" : "\u63a5\u53e3\uff1a\u9700\u8981 endpoint\uff08OpenAI-compatible \u5fc5\u586b\uff09" },
    { ok: modelOk, text: modelOk ? "\u6a21\u578b\uff1a\u5df2\u6709\u9ed8\u8ba4\u6216\u81ea\u5b9a\u4e49\u6a21\u578b" : "\u6a21\u578b\uff1a\u5efa\u8bae\u586b\u5199\u6a21\u578b\u540d" },
    { ok: pathOk, text: pathOk ? "\u89e3\u6790\uff1a\u8fd4\u56de\u8def\u5f84\u5df2\u8bbe\u7f6e" : "\u89e3\u6790\uff1a\u9700\u8981\u8fd4\u56de\u5185\u5bb9\u8def\u5f84" }
  ];
}

function updateAgentConfigCheck() {
  const box = document.getElementById("agentConfigCheck");
  if (!box) return;
  const provider = providerById(document.getElementById("agentConfigProviderSelect")?.value);
  const rows = agentConfigCheckRows(provider);
  const allOk = rows.length && rows.every(row => row.ok);
  box.innerHTML = `
    <div><b style="color:${allOk ? "#a8f5d4" : "#ffd07a"}">\u914d\u7f6e\u81ea\u68c0\uff1a${allOk ? "\u53ef\u7528" : "\u9700\u8865\u5168"}</b></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
      ${rows.map(row => `<span style="border:1px solid ${row.ok ? "rgba(25,201,139,.35)" : "rgba(245,166,35,.4)"};background:${row.ok ? "rgba(25,201,139,.12)" : "rgba(245,166,35,.12)"};color:${row.ok ? "#a8f5d4" : "#ffd07a"};border-radius:999px;padding:3px 8px">${escapeHtml(row.text)}</span>`).join("")}
    </div>
  `;
}

function routeProviderOptions(selected = "", allowTeam = false) {
  const providers = configurableAgentProviders(window.agentProviderCache || []);
  const rows = [{ id: "codex", name: "Codex" }, ...providers.map(p => ({ id: p.id, name: p.name }))];
  if (allowTeam) rows.push({ id: "team", name: "\u4e09\u8111\u534f\u4f5c" });
  return rows.map(row => `<option value="${escapeHtml(row.id)}" ${row.id === selected ? "selected" : ""}>${escapeHtml(row.name)}</option>`).join("");
}

function renderAgentRouteRules() {
  const box = document.getElementById("agentRouteRules");
  if (!box) return;
  const rules = readAgentRouteRules();
  box.innerHTML = `
    <div style="font-weight:900;color:#a8f5d4;margin-bottom:8px">\u81ea\u52a8\u5206\u5de5\u8def\u7531</div>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">
      <label>\u6295\u8d44\u95ee\u9898<select class="modal-select" style="margin-top:5px" id="agentRouteInvestment" onchange="saveAgentRouteRulesFromModal()">${routeProviderOptions(rules.investment)}</select></label>
      <label>\u5185\u5bb9\u95ee\u9898<select class="modal-select" style="margin-top:5px" id="agentRouteContent" onchange="saveAgentRouteRulesFromModal()">${routeProviderOptions(rules.content)}</select></label>
      <label>\u7cfb\u7edf\u95ee\u9898<select class="modal-select" style="margin-top:5px" id="agentRouteSystem" onchange="saveAgentRouteRulesFromModal()">${routeProviderOptions(rules.system)}</select></label>
    </div>
  `;
}

function saveAgentRouteRulesFromModal() {
  writeAgentRouteRules({
    investment: document.getElementById("agentRouteInvestment")?.value || "workbuddy",
    content: document.getElementById("agentRouteContent")?.value || "doubao",
    system: document.getElementById("agentRouteSystem")?.value || "codex"
  });
  showToast("\u81ea\u52a8\u5206\u5de5\u8def\u7531\u5df2\u4fdd\u5b58");
}

function agentProviderTemplate(provider = {}) {
  const storedModel = provider.model && provider.model !== "default" ? provider.model : "";
  return {
    model: storedModel || provider.defaultModel || "",
    endpoint: provider.endpoint || provider.defaultEndpoint || "",
    responsePath: provider.responsePath || provider.defaultResponsePath || "choices.0.message.content",
    defaultModel: provider.defaultModel || provider.model || "",
    defaultEndpoint: provider.defaultEndpoint || provider.endpoint || "",
    defaultResponsePath: provider.defaultResponsePath || provider.responsePath || "choices.0.message.content",
    help: provider.templateHelp || ""
  };
}

function renderAgentTemplateInfo(provider = {}) {
  const box = document.getElementById("agentTemplateInfo");
  if (!box) return;
  if (!provider || !provider.id) {
    box.innerHTML = "";
    return;
  }
  const template = agentProviderTemplate(provider);
  box.innerHTML = `
    <div><b style="color:#9fc5ff">\u4f9b\u5e94\u5546\u9884\u8bbe</b>\uff1a${escapeHtml(provider.name || provider.id)}</div>
    <div style="margin-top:6px">\u9ed8\u8ba4\u6a21\u578b\uff1a<code>${escapeHtml(template.defaultModel || "\u53ef\u7559\u7a7a")}</code></div>
    <div>\u9ed8\u8ba4 endpoint\uff1a<code>${escapeHtml(template.defaultEndpoint || "\u53ef\u7559\u7a7a")}</code></div>
    <div>\u9ed8\u8ba4\u8fd4\u56de\u8def\u5f84\uff1a<code>${escapeHtml(template.defaultResponsePath || "choices.0.message.content")}</code></div>
    <div style="margin-top:6px;color:#a0a4b3">${escapeHtml(template.help || "\u70b9\u51fb\u201c\u5957\u7528\u9884\u8bbe\u201d\u4f1a\u81ea\u52a8\u586b\u5165\u6a21\u578b\u3001endpoint \u548c\u8fd4\u56de\u8def\u5f84\u3002")}</div>
  `;
}

function applyAgentProviderTemplate() {
  const providerId = document.getElementById("agentConfigProviderSelect")?.value || window.agentConfigProvider || document.getElementById("agentProvider")?.value;
  const provider = providerById(providerId);
  if (!provider) return showToast("\u6ca1\u6709\u53ef\u7528\u7684\u4f9b\u5e94\u5546\u9884\u8bbe");
  const template = agentProviderTemplate({
    ...provider,
    model: provider.defaultModel || provider.model,
    endpoint: provider.defaultEndpoint,
    responsePath: provider.defaultResponsePath
  });
  const modelInput = document.getElementById("agentModelName");
  const endpointInput = document.getElementById("agentEndpoint");
  const responsePathInput = document.getElementById("agentResponsePath");
  if (modelInput) modelInput.value = template.model || "";
  if (endpointInput) endpointInput.value = template.endpoint || "";
  if (responsePathInput) responsePathInput.value = template.responsePath || "";
  updateAgentConfigCheck();
  const testBox = document.getElementById("agentParseTestResult");
  if (testBox) {
    testBox.style.display = "none";
    testBox.innerHTML = "";
  }
  showToast("\u5df2\u5957\u7528\u4f9b\u5e94\u5546\u9884\u8bbe");
}

function agentConfigPayload() {
  const provider = document.getElementById("agentConfigProviderSelect")?.value || window.agentConfigProvider || document.getElementById("agentProvider")?.value;
  return {
    provider,
    apiKey: document.getElementById("agentApiKey")?.value.trim() || "",
    model: document.getElementById("agentModelName")?.value.trim() || "",
    endpoint: document.getElementById("agentEndpoint")?.value.trim() || "",
    responsePath: document.getElementById("agentResponsePath")?.value.trim() || ""
  };
}

function renderAgentParseResult(result = {}, error = "") {
  const box = document.getElementById("agentParseTestResult");
  if (!box) return;
  box.style.display = "block";
  if (error) {
    box.innerHTML = `<b style="color:#ff9bad">测试失败</b><div style="margin-top:6px">${escapeHtml(error)}</div>`;
    return;
  }
  const raw = JSON.stringify(result.raw || {}, null, 2);
  const suggested = result.suggestedPath || "";
  const candidates = (result.candidates || []).filter(item => item.found);
  box.innerHTML = `
    <div><b style="color:#9fc5ff">解析路径</b>：${escapeHtml(result.responsePath || "自动识别")}</div>
    ${suggested ? `<div style="margin-top:6px"><b style="color:#a8f5d4">建议使用</b>：<code>${escapeHtml(suggested)}</code> <button class="small-btn" style="height:24px;padding:0 8px;margin-left:6px" onclick='applyAgentResponsePath(${JSON.stringify(suggested)})'>填入</button></div>` : `<div style="margin-top:6px;color:#ffd07a">没有在候选路径里找到明确文本，请展开原始返回查看。</div>`}
    <div style="margin-top:8px"><b style="color:#a8f5d4">解析后的回答</b></div>
    <div style="white-space:pre-wrap;margin-top:4px">${escapeHtml(result.parsed || "未解析到内容")}</div>
    ${candidates.length ? `<details style="margin-top:10px"><summary style="cursor:pointer;color:#9fc5ff">候选路径</summary>${candidates.map(item => `<div style="margin-top:6px"><code>${escapeHtml(item.path)}</code><div style="color:#aeb6c6;white-space:pre-wrap">${escapeHtml(item.preview || "")}</div></div>`).join("")}</details>` : ""}
    <details style="margin-top:10px">
      <summary style="cursor:pointer;color:#9fc5ff">查看原始返回</summary>
      <pre style="white-space:pre-wrap;margin:8px 0 0;color:#aeb6c6">${escapeHtml(raw)}</pre>
    </details>
  `;
}

function applyAgentResponsePath(pathText) {
  const input = document.getElementById("agentResponsePath");
  if (input) input.value = pathText || "";
  showToast("已填入建议路径");
}

async function testAgentParse() {
  const payload = {
    ...agentConfigPayload(),
    message: "请用一句话回复：小可 Agent 解析测试成功。"
  };
  if (!payload.provider || payload.provider === "auto") {
    showToast("请先选择具体模型");
    return false;
  }
  const box = document.getElementById("agentParseTestResult");
  if (box) {
    box.style.display = "block";
    box.innerHTML = "正在调用模型并测试返回解析...";
  }
  try {
    const response = await fetch("/api/agent-test-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "测试解析失败");
    renderAgentParseResult(data.result || {});
    return Boolean(data.result && data.result.parsed);
  } catch (error) {
    renderAgentParseResult({}, error.message || "测试解析失败");
    return false;
  }
}
async function saveAgentConfig() {
  const { provider, apiKey, model, endpoint, responsePath } = agentConfigPayload();
  if (!provider || provider === "mock" || provider === "auto") return showToast("\u8bf7\u9009\u62e9\u9700\u8981\u914d\u7f6e\u7684\u6a21\u578b");
  const existing = providerById(provider);
  if (!apiKey && !(existing && existing.configured)) return showToast("\u8bf7\u5148\u7c98\u8d34 API Key");
  const saveButton = event?.target;
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.textContent = "\u4fdd\u5b58\u4e2d";
  }
  if (document.getElementById("agentTestBeforeSave")?.checked) {
    if (saveButton) saveButton.textContent = "\u6d4b\u8bd5\u4e2d";
    const tested = await testAgentParse();
    if (!tested) {
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.textContent = "\u4fdd\u5b58";
      }
      return showToast("\u6d4b\u8bd5\u672a\u901a\u8fc7\uff0c\u6682\u672a\u4fdd\u5b58");
    }
    if (saveButton) saveButton.textContent = "\u4fdd\u5b58\u4e2d";
  }
  const response = await fetch("/api/agent-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, apiKey, model, endpoint, responsePath })
  });
  const data = await response.json().catch(() => ({}));
  if (saveButton) {
    saveButton.disabled = false;
    saveButton.textContent = "\u4fdd\u5b58";
  }
  if (!response.ok || !data.success) return showToast(data.error || "\u4fdd\u5b58\u5931\u8d25");
  closeAgentConfig();
  localStorage.setItem(AGENT_PROVIDER_KEY, provider);
  const agentSelect = document.getElementById("agentProvider");
  if (agentSelect) agentSelect.value = provider;
  window.agentConfigProvider = null;
  showToast("API \u5df2\u4fdd\u5b58\u5230\u672c\u673a");
  await loadAgentProviders();
}
async function callAgentProvider(provider, message) {
  const response = await fetch("/api/agent-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, message, context: collectAgentContext() })
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || "model failed");
  return data.answer;
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>\u6b63\u5728\u5904\u7406...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "\u4f5c\u4e3a WorkBuddy \u6295\u8d44\u4e3b\u8111\uff0c\u8bf7\u5148\u5206\u6790\u8fd9\u4e2a\u95ee\u9898\u7684\u6295\u8d44\u903b\u8f91\u3001\u89c2\u5bdf\u70b9\u548c\u98ce\u9669\u8fb9\u754c\uff1a\n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt);
      const contentPrompt = "\u4f5c\u4e3a\u8c46\u5305\u5185\u5bb9\u4e3b\u8111\uff0c\u8bf7\u628a\u4e0b\u9762\u7684\u6295\u8d44\u5206\u6790\u6539\u5199\u6210\u901a\u4fd7\u3001\u6709\u6761\u7406\u7684\u8bfe\u7a0b\u5f0f\u8868\u8fbe\uff1a\n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt);
      answer = "?WorkBuddy ?????\n" + invest + "\n\n??? ?????\n" + content + "\n\n?Codex ?????\n" + codexSystemAnswer(text);
    } else {
      answer = await callAgentProvider(route.provider, text);
    }
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(answer).replace(/\n/g, "<br>");
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}
function collectAgentContext() {
  const current = state.videos.find(item => item.id === state.currentVideoId);
  const summary = [
    `褰撳墠鍒嗙被锛?{state.activeTag}`,
    `褰撳墠鎺掑簭锛?{state.sort}`,
    `瑙嗛鎬绘暟锛?{state.videos.length}`,
    current ? `褰撳墠瑙嗛锛?{current.title}锛屼富棰橈細${current.topic}锛屾棩鏈燂細${current.date}锛岀偣璧烇細${current.likes}` : ""
  ].filter(Boolean).join("\n");
  return [{ role: "user", content: "鐪嬫澘涓婁笅鏂囷細\n" + summary }];
}

function toggleAgent() {
  document.getElementById("agent").classList.toggle("open");
}

function openDetail(id) {
  state.currentVideoId = id;
  state.view = "detail";
  render();
}

function filterByTag(tag) {
  state.activeTag = tag;
  state.view = tag === "全部" ? "dashboard" : "library";
  render();
}

function openWatchlistView() {
  state.view = "dashboard";
  state.activeTag = "全部";
  state.search = "";
  document.getElementById("searchInput").value = "";
  render();
  showToast("关注标的在左侧列表，可点击单个标的筛选视频");
}

function openVideoLibrary() {
  state.activeTag = "全部";
  state.search = "";
  document.getElementById("searchInput").value = "";
  state.view = "library";
  render();
}

function openInvestmentView() {
  state.activeTag = "鎶曡祫鍝插";
  state.search = "";
  document.getElementById("searchInput").value = "";
  state.view = "library";
  render();
}

function filterByStock(stock) {
  state.search = stock;
  document.getElementById("searchInput").value = stock;
  state.view = "library";
  render();
}

function openStockModal(groupPath = null, itemIndex = null, preferredPath = null) {
  const groups = readWatchGroups();
  const editPath = Array.isArray(groupPath) ? groupPath : (Number.isInteger(groupPath) ? [groupPath] : null);
  const selectedPath = Array.isArray(preferredPath) ? preferredPath : (editPath || state.currentGroupPath || [0]);
  const editGroup = editPath ? getGroupByPath(groups, editPath) : null;
  const isEditing = !!(editGroup && Number.isInteger(itemIndex) && editGroup.items && editGroup.items[itemIndex]);
  const group = isEditing ? editGroup : getGroupByPath(groups, selectedPath);
  const stock = isEditing ? group.items[itemIndex] : null;
  state.editingStock = isEditing ? { groupPath: editPath, itemIndex, originalName: stock.name, originalGroup: group.name } : null;
  const title = document.getElementById("stockModalTitle");
  if (title) title.textContent = isEditing ? "\u7f16\u8f91\u5173\u6ce8\u6807\u7684" : "\u6dfb\u52a0\u5173\u6ce8\u6807\u7684";
  document.getElementById("stockName").value = stock ? stock.name : "";
  document.getElementById("stockQuoteKey").value = stock ? (stock.quoteKey || "") : "";
  document.getElementById("stockSector").value = stock ? (stock.sector || "") : "";
  document.getElementById("stockDesc").value = stock ? (stock.desc || "") : "";
  document.getElementById("stockNewGroup").value = "";
  document.getElementById("stockGroupSelect").innerHTML = groupOptionsHtml(groups, isEditing ? editPath : selectedPath);
  document.getElementById("stockModal").classList.add("open");
}

function editStockTarget(groupPath, itemIndex) {
  openStockModal(groupPath, itemIndex);
}

function closeStockModal() {
  document.getElementById("stockModal").classList.remove("open");
  state.editingStock = null;
}

function normalizeQuoteKey(value) {
  const key = String(value || "").trim();
  if (!key) return "";
  if (/^(sh|sz|us|s_sh|s_sz)/i.test(key)) return key;
  if (/^6\d{5}$/.test(key)) return "sh" + key;
  if (/^(0|3)\d{5}$/.test(key)) return "sz" + key;
  return key;
}

async function saveStockTarget() {
  const name = document.getElementById("stockName").value.trim();
  const quoteKey = normalizeQuoteKey(document.getElementById("stockQuoteKey").value.trim());
  const sector = document.getElementById("stockSector").value.trim();
  const desc = document.getElementById("stockDesc").value.trim();
  const selectedPath = parsePathValue(document.getElementById("stockGroupSelect").value);
  const newGroup = document.getElementById("stockNewGroup").value.trim();
  if (!name) return showToast("\u8bf7\u5148\u586b\u5199\u6807\u7684\u540d\u79f0");
  const groups = readWatchGroups();
  const editing = state.editingStock;
  if (editing) {
    const oldGroup = getGroupByPath(groups, editing.groupPath);
    if (oldGroup && oldGroup.items) oldGroup.items.splice(editing.itemIndex, 1);
  }
  let group = getGroupByPath(groups, selectedPath) || groups[0];
  if (newGroup) {
    group.children = group.children || [];
    let child = group.children.find(item => item.name === newGroup);
    if (!child) {
      child = { name: newGroup, items: [], children: [] };
      group.children.push(child);
    }
    group = child;
  }
  let exists = false;
  walkWatchGroups(groups, item => {
    if ((item.items || []).some(stock => stock.name === name)) exists = true;
  });
  if (exists) return showToast("\u8fd9\u4e2a\u6807\u7684\u5df2\u7ecf\u5728\u5173\u6ce8\u5217\u8868\u91cc");
  group.items = group.items || [];
  group.items.push({
    name,
    quoteKey,
    count: 0,
    sector: sector || group.name,
    desc: desc || "\u65b0\u589e\u5173\u6ce8\u6807\u7684\uff0c\u7b49\u5f85\u540e\u7eed\u8865\u5145\u89c2\u5bdf\u903b\u8f91\u3002",
    status: "ok",
    userAdded: true
  });
  saveWatchGroups(groups);
  closeStockModal();
  renderWatchlistPane();
  await refreshMarketIndexes();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  showToast(editing ? "\u5df2\u66f4\u65b0\u5173\u6ce8\u6807\u7684" : "\u5df2\u6dfb\u52a0\u5230\u5173\u6ce8\u6807\u7684");
}

function deleteStockTarget(groupPath, itemIndex) {
  const groups = readWatchGroups();
  const path = Array.isArray(groupPath) ? groupPath : [groupPath];
  const group = getGroupByPath(groups, path);
  const stock = group && group.items && group.items[itemIndex];
  if (!stock) return;
  if (!confirm(`\u786e\u5b9a\u5220\u9664\u300c${stock.name}\u300d\u5417\uff1f`)) return;
  group.items.splice(itemIndex, 1);
  saveWatchGroups(groups);
  renderWatchlistPane();
  refreshMarketIndexes();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  showToast("\u5df2\u5220\u9664\u5173\u6ce8\u6807\u7684");
}

function setSort(value) {
  state.sort = value;
  state.libraryLimit = 60;
  renderLibrary();
}

function setSearch(value) {
  state.search = value;
  state.view = value ? "library" : state.view;
  state.libraryLimit = 60;
  clearTimeout(state.searchTimer);
  state.searchTimer = setTimeout(() => {
    if (state.view === "library") renderLibrary();
    else render();
  }, 180);
}

function clearVideoFilters(renderNow = true) {
  state.search = "";
  state.activeTag = (allVideoTags()[0] || tags[0]).name;
  state.libraryLimit = 60;
  ["searchInput", "librarySearchInput"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });
  if (renderNow) {
    renderTopChips();
    renderLibrary();
  }
}

function goBack() {
  if (state.view === "detail") {
    state.view = "library";
    renderLibrary();
  } else {
    state.view = "dashboard";
    state.activeTag = "全部";
    state.search = "";
    const input = document.getElementById("searchInput");
    if (input) input.value = "";
    render();
  }
}

async function openImport() {
  document.getElementById("importStatus").textContent = "";
  const help = document.getElementById("importHelp");
  if (help) help.textContent = "正在检查本地导入环境...";
  try {
    const response = await fetch("/api/import-status");
    const data = await response.json();
    if (help) help.innerHTML = `当前采用元数据模式：粘贴抖音分享链接后保存标题、作者、数据和原链接；元数据文件：${data.metadataFile || "douyin_metadata.json"}`;
  } catch {
    if (help) help.textContent = "无法读取导入环境状态，请确认本地服务正在运行。";
  }
  document.getElementById("importModal").classList.add("open");
}

function closeImport() {
  document.getElementById("importModal").classList.remove("open");
}

function isDouyinUrl(value) {
  return /(douyin\.com|v\.douyin|iesdouyin)/i.test(value || "");
}

async function fetchDouyinMetadata(url) {
  const response = await fetch(`/api/douyin-meta?url=${encodeURIComponent(url)}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.error || "元数据导入失败");
  return data.item;
}

async function importVideo() {
  const text = document.getElementById("importText").value.trim();
  const status = document.getElementById("importStatus");
  if (!text) return showToast("请先粘贴抖音分享链接或素材文本");
  const url = (text.match(/https?:\/\/\S+/) || [""])[0];
  const isDouyin = isDouyinUrl(url);
  if (isDouyin) {
    if (status) {
      status.style.color = "var(--muted)";
      status.textContent = "正在保存抖音元数据...";
    }
    try {
      const item = await fetchDouyinMetadata(url);
      const video = metadataToVideo(item);
      restoreDeletedVideo(video.id);
      state.videos = state.videos.filter(v => v.id !== video.id);
      state.videos.unshift(video);
      saveUserVideos(state.videos);
      document.getElementById("importText").value = "";
      if (status) status.textContent = "";
      closeImport();
      showToast(item.parseError ? "已保存链接，完整数据待补充" : "抖音元数据已保存");
      state.view = "library";
      renderLibrary();
      return;
    } catch (error) {
      if (status) {
        status.style.color = "var(--gold)";
        status.textContent = error.message;
      }
      return;
    }
  }
  const isAllTag = state.activeTag === tags[0].name;
  const video = {
    id: "note_" + Date.now(),
    title: text.slice(0, 42) || "手动素材",
    topic: isAllTag ? "手动素材" : state.activeTag,
    date: new Date().toISOString().slice(0, 10),
    author: "手动导入",
    likes: 0, comments: 0, shares: 0, collects: 0,
    videoUrl: "", originalUrl: url, transcript: text,
    focus: isAllTag ? "待补充" : state.activeTag,
    advice: "先保存素材，再补充标签和分析。",
    risk: "人工录入内容，请核对来源。",
    philosophy: "先记录，再判断。",
    confidence: "手动",
    isMetadata: true, userAdded: true
  };
  state.videos.unshift(video);
  saveUserVideos(state.videos);
  closeImport();
  showToast("已保存素材");
  state.view = "library";
  renderLibrary();
}
async function openImport() {
  const status = document.getElementById("importStatus");
  const fileInput = document.getElementById("importDocumentFile");
  if (status) {
    status.textContent = "";
    status.style.color = "var(--muted)";
  }
  if (fileInput) fileInput.value = "";
  const help = document.getElementById("importHelp");
  if (help) {
    help.textContent = "\u6b63\u5728\u68c0\u67e5\u672c\u5730\u5bfc\u5165\u73af\u5883...";
    try {
      const response = await fetch("/api/import-status");
      const data = await response.json();
      help.innerHTML = `\u53ef\u7c98\u8d34\u6296\u97f3\u94fe\u63a5\u6216\u7b14\u8bb0\u6587\u672c\uff0c\u4e5f\u53ef\u76f4\u63a5\u9009\u62e9 PDF / Word \u4e66\u7c4d\u6587\u4ef6\u3002\u89c6\u9891\u94fe\u63a5\u4ec5\u4fdd\u5b58\u5143\u6570\u636e\uff0c\u4e0d\u4e0b\u8f7d\u89c6\u9891\u3002\u6587\u6863\u76ee\u5f55\uff1a${data.documentsDir || "documents"}`;
    } catch {
      help.textContent = "\u65e0\u6cd5\u8bfb\u53d6\u5bfc\u5165\u73af\u5883\u72b6\u6001\uff0c\u8bf7\u786e\u8ba4\u672c\u5730\u670d\u52a1\u6b63\u5728\u8fd0\u884c\u3002";
    }
  }
  document.getElementById("importModal").classList.add("open");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("\u6587\u4ef6\u8bfb\u53d6\u5931\u8d25"));
    reader.readAsDataURL(file);
  });
}

function importedDocumentId(item) {
  const rawId = String((item && (item.id || item.fileName || item.originalName)) || Date.now());
  return rawId.startsWith("doc_") ? rawId : "doc_" + rawId;
}

async function importDocumentFile(file, noteText = "") {
  const status = document.getElementById("importStatus");
  const extOk = /\.(pdf|doc|docx)$/i.test(file.name || "");
  if (!extOk) return showToast("\u53ea\u652f\u6301\u5bfc\u5165 PDF / Word \u6587\u6863");
  status.style.color = "var(--muted)";
  status.textContent = "\u6b63\u5728\u5bfc\u5165\u4e66\u7c4d\u6587\u6863...";
  const isAllTag = state.activeTag === tags[0].name || state.activeTag === "\u5168\u90e8";
  const topic = isAllTag ? "\u4e66\u7c4d" : state.activeTag;
  const dataBase64 = await fileToDataUrl(file);
  const response = await fetch("/api/import-document", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      title: file.name.replace(/\.[^.]+$/, ""),
      topic,
      author: "\u672c\u5730\u6587\u6863",
      mimeType: file.type || "",
      dataBase64,
      note: noteText
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.error || "\u6587\u6863\u5bfc\u5165\u5931\u8d25");
  await scanLocalDocuments();
  const id = importedDocumentId(data.document);
  rememberDocumentGroup(id, topic);
  state.currentVideoId = id;
  state.activeTag = topic || "\u4e66\u7c4d";
  state.search = "";
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  document.getElementById("importText").value = "";
  document.getElementById("importDocumentFile").value = "";
  status.textContent = "";
  closeImport();
  showToast("\u4e66\u7c4d\u6587\u6863\u5df2\u5bfc\u5165");
  state.view = "library";
  renderTopChips();
  renderLibrary();
}

async function importVideo() {
  const text = document.getElementById("importText").value.trim();
  const documentFile = document.getElementById("importDocumentFile")?.files?.[0];
  const status = document.getElementById("importStatus");
  if (documentFile) {
    try {
      await importDocumentFile(documentFile, text);
    } catch (error) {
      status.style.color = "var(--gold)";
      status.textContent = error.message;
    }
    return;
  }
  if (!text) return showToast("\u8bf7\u5148\u7c98\u8d34\u94fe\u63a5 / \u6587\u672c\uff0c\u6216\u9009\u62e9 PDF / Word \u6587\u4ef6");

  const url = (text.match(/https?:\/\/\S+/) || [""])[0];
  const isDouyin = isDouyinUrl(url);

  if (isDouyin) {
    status.style.color = "var(--muted)";
    status.textContent = "\u6b63\u5728\u4fdd\u5b58\u6296\u97f3\u5143\u6570\u636e...";
    try {
      const item = await fetchDouyinMetadata(url);
      const video = metadataToVideo(item);
      restoreDeletedVideo(video.id);
      state.videos = state.videos.filter(v => v.id !== video.id);
      state.videos.unshift(video);
      saveUserVideos(state.videos);
      document.getElementById("importText").value = "";
      status.textContent = "";
      closeImport();
      showToast(item.parseError ? "\u5df2\u4fdd\u5b58\u94fe\u63a5\uff0c\u5b8c\u6574\u6570\u636e\u5f85\u8865\u5145" : "\u6296\u97f3\u5143\u6570\u636e\u5df2\u4fdd\u5b58");
      state.view = "library";
      renderLibrary();
      return;
    } catch (error) {
      status.style.color = "var(--gold)";
      status.textContent = error.message;
      return;
    }
  }

  const isAllTag = state.activeTag === tags[0].name || state.activeTag === "\u5168\u90e8";
  const video = {
    id: "note_" + Date.now(),
    title: text.slice(0, 42) || "\u624b\u52a8\u7d20\u6750",
    topic: isAllTag ? "\u624b\u52a8\u7d20\u6750" : state.activeTag,
    date: new Date().toISOString().slice(0, 10),
    author: "\u624b\u52a8\u5bfc\u5165",
    likes: 0, comments: 0, shares: 0, collects: 0,
    videoUrl: "", originalUrl: url, transcript: text,
    focus: isAllTag ? "\u5f85\u8865\u5145" : state.activeTag,
    advice: "\u5148\u4fdd\u5b58\u7d20\u6750\uff0c\u518d\u8865\u5145\u6807\u7b7e\u548c\u5206\u6790\u3002",
    risk: "\u4eba\u5de5\u5f55\u5165\u5185\u5bb9\uff0c\u8bf7\u6838\u5bf9\u6765\u6e90\u3002",
    philosophy: "\u5148\u8bb0\u5f55\uff0c\u518d\u5224\u65ad\u3002",
    confidence: "\u624b\u52a8",
    isMetadata: true, userAdded: true
  };
  state.videos.unshift(video);
  saveUserVideos(state.videos);
  closeImport();
  showToast("\u5df2\u4fdd\u5b58\u7d20\u6750");
  state.view = "library";
  renderLibrary();
}

function cleanVideoCardTitle(v) {
  let title = String((getVideoTextOverride(v).title || v.title || "")).trim();
  title = title
    .replace(/\u6a21\u578b\u5148\u751f\u89c6\u9891/g, "")
    .replace(/\u6296\u97f3\u89c6\u9891\uff08\u5f85\u8865\u5145\uff09/g, "")
    .replace(/Douyin requires.*$/i, "")
    .replace(/browser cookies.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  title = title.replace(/^\d{4}-\d{2}-\d{2}\s*[|｜-]?\s*/i, "").trim();
  title = title.replace(/^[|｜-]\s*/, "").replace(/\s*[|｜-]\s*$/, "").trim();
  if (!title || /^[\d.]+[万wW]?\s*赞?/i.test(title)) return "\u672c\u5730\u89c6\u9891\u7d20\u6750";
  return title;
}

function compactMetric(value) {
  const raw = String(value ?? "").trim();
  if (/^\d+(\.\d+)?\s*[万wW]$/.test(raw)) return raw.replace(/[wW]/, "\u4e07").replace(/\s+/g, "");
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return raw || "0";
  if (num >= 10000) return `${(num / 10000).toFixed(num >= 100000 ? 0 : 1)}\u4e07`;
  return String(num);
}

function videoCardDisplayTitle(v) {
  return `${cleanVideoCardTitle(v)}\uff5c${v.date || "-"}\uff5c${compactMetric(v.likes || 0)}\u8d5e`;
}

function pipelinePanelHtml(videos = filteredVideos()) {
  const all = pipelineSummary(libraryVideos());
  const scoped = pipelineSummary(videos);
  return `
    <section class="panel pipeline-panel">
      <div class="panel-title panel-title-row">
        <span>分析流水线</span>
        <span class="date">当前筛选 ${scoped.total} 条 · 全库 ${all.total} 条</span>
      </div>
      <div class="pipeline-grid">
        <div class="pipeline-cell"><b>${scoped.total}</b><span>当前视频</span></div>
        <div class="pipeline-cell"><b>${scoped.transcribed}</b><span>已转写</span></div>
        <div class="pipeline-cell"><b>${scoped.pendingTranscript}</b><span>待转写</span></div>
        <div class="pipeline-cell"><b>${scoped.ai}</b><span>已AI分析</span></div>
        <div class="pipeline-cell"><b>${scoped.pendingAi}</b><span>待AI</span></div>
        <div class="pipeline-cell"><b>${scoped.low}</b><span>低置信度</span></div>
      </div>
      <div class="pipeline-actions">
        <button class="open-btn" onclick="batchTranscribeVideos(true)">批量转写待处理视频</button>
        <button class="open-btn" onclick="batchAnalyzeVideos(true)">批量生成AI分析</button>
        <button class="small-btn" onclick="openPipelineCenter()">能力中心</button>
      </div>
    </section>
  `;
}

function videosForBatch(useFiltered) {
  return useFiltered ? filteredVideos() : libraryVideos();
}

async function batchTranscribeVideos(useFiltered = true) {
  const targets = videosForBatch(useFiltered).filter(v => v.videoUrl && isEmptyTranscript(getVideoDetailTranscript(v)));
  if (!targets.length) return showToast("当前筛选没有需要转写的本地视频");
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < targets.length; i += 1) {
    const v = targets[i];
    showToast(`批量转写 ${i + 1}/${targets.length}`);
    updatePipeline(v.id, { transcript: "running", error: "" });
    try {
      const response = await fetch("/api/transcribe-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: v.id, videoUrl: v.videoUrl || "", originalUrl: v.originalUrl || "" })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.error || "转写失败");
      saveVideoTextOverride(v.id, { transcript: data.transcript || "" });
      updatePipeline(v.id, { transcript: "done", error: "" });
      ok += 1;
    } catch (error) {
      updatePipeline(v.id, { transcript: "failed", error: error.message || "转写失败" });
      fail += 1;
    }
    if (state.view === "library") renderLibrary();
  }
  showToast(`批量转写完成：成功 ${ok} 条，失败 ${fail} 条`);
}

async function batchAnalyzeVideos(useFiltered = true) {
  const targets = videosForBatch(useFiltered).filter(v => !readStructuredAnalyses()[v.id]);
  if (!targets.length) return showToast("当前筛选没有待 AI 分析的视频");
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < targets.length; i += 1) {
    const v = targets[i];
    showToast(`批量 AI 分析 ${i + 1}/${targets.length}`);
    updatePipeline(v.id, { ai: "running", error: "" });
    try {
      let provider = localStorage.getItem(AGENT_PROVIDER_KEY) || "workbuddy";
      if (provider === "auto") provider = "workbuddy";
      let answer = "";
      try {
        answer = await callAgentProvider(provider, buildVideoAnalysisPrompt(v));
      } catch {
        answer = "当前大模型调用失败，先用本地占位分析：\n\n" + await callAgentProvider("mock", buildVideoAnalysisPrompt(v));
      }
      saveVideoAnalysis(v.id, answer);
      const model = analysisModel(v, answer);
      saveStructuredAnalysis(v.id, model);
      saveSuggestedLinks(v.id, model);
      updatePipeline(v.id, { ai: "done", confidence: confidenceNumber(model.confidence), error: "" });
      ok += 1;
    } catch (error) {
      updatePipeline(v.id, { ai: "failed", error: error.message || "AI 分析失败" });
      fail += 1;
    }
    if (state.view === "library") renderLibrary();
  }
  showToast(`批量 AI 完成：成功 ${ok} 条，失败 ${fail} 条`);
}
function librarySearchHtml() {
  return `
    <div class="library-search-row">
      <label class="library-search">\ud83d\udd0d<input id="librarySearchInput" value="${escapeHtml(state.search || "")}" placeholder="\u641c\u7d22\u89c6\u9891\u6807\u9898\u3001\u65e5\u671f\u3001\u9898\u6750\u3001\u8f6c\u5f55" oninput="setSearch(this.value)"></label>
      <button class="small-btn" onclick="state.search='';renderLibrary()">\u6e05\u7a7a</button>
      <button class="small-btn" onclick="state.activeTag=tags[0].name;state.search='';renderLibrary();renderTopChips()">\u5168\u90e8\u89c6\u9891</button>
      <button class="small-btn" onclick="syncAllVideoTitles()">同步全部标题</button>
      <button class="small-btn" onclick="syncAllFrameTitles()">鎵归噺璇嗗埆鐢婚潰鏍囬</button>
    </div>
  `;
}

function renderLibrary() {
  state.view = "library";
  const videos = filteredVideos();
  const visibleVideos = videos.slice(0, state.libraryLimit || 60);
  const total = libraryVideos().length;
  const scope = state.activeTag === tags[0].name ? "\u5168\u90e8\u89c6\u9891" : `\u5f53\u524d\u7b5b\u9009\uff1a${escapeHtml(state.activeTag)}`;
  document.getElementById("main").innerHTML = `
    <div class="video-head">
      <div><div class="panel-title" style="margin:0">\u89c6\u9891\u7d20\u6750\u5e93</div><div class="date">\u663e\u793a ${visibleVideos.length} / \u7b5b\u9009 ${videos.length} / \u5171 ${total} \u4e2a\u89c6\u9891 \u00b7 ${scope}</div></div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>\u6309\u65e5\u671f</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>\u6309\u70b9\u8d5e</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>\u6309\u6807\u9898</option>
        </select>
        <button class="small-btn" onclick="openImport()">\u5bfc\u5165</button>
        <button class="small-btn" onclick="renderDashboard()">\u8fd4\u56de\u770b\u677f</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${pipelinePanelHtml(videos)}
    <section class="video-grid">${visibleVideos.map(videoCardHtml).join("") || emptyVideoFilterHtml()}</section>
    ${videos.length > visibleVideos.length ? `<div class="panel" style="margin-top:12px;text-align:center"><button class="open-btn" onclick="loadMoreLibraryVideos()">鍔犺浇鏇村锛?{visibleVideos.length}/${videos.length}锛?/button></div>` : ""}
  `;
}

function loadMoreLibraryVideos() {
  state.libraryLimit = Math.min((state.libraryLimit || 60) + 60, filteredVideos().length);
  renderLibrary();
}

function emptyVideoFilterHtml() {
  return `
    <div class="panel">
      <div class="panel-title">鏆傛棤鍖归厤瑙嗛</div>
      <p style="color:var(--muted);line-height:1.7">褰撳墠鍙槸鎼滅储璇嶆垨鍒嗙被娌℃湁鍖归厤銆傝棰戜細鍦ㄩ〉闈㈡墦寮€鏃惰嚜鍔ㄦ壂鎻忓鍏ワ紝涓嶉渶瑕佹墜鍔ㄦ仮澶嶃€?/p>
      <div class="analysis-actions" style="justify-content:flex-start;margin-top:12px">
        <button class="open-btn" onclick="clearVideoFilters()">娓呯┖绛涢€?/button>
      </div>
    </div>
  `;
}

function videoCardHtml(v) {
  const media = v.isDocument
    ? `<div class="poster">${escapeHtml(v.documentType || "\u6587")}</div>`
    : v.thumbnail
    ? `<img src="${v.thumbnail}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover">`
    : v.videoUrl ? `<video src="${v.videoUrl}" muted preload="none"></video>` : `<div class="poster">\u94fe</div>`;
  const badge = v.isDocument ? (v.documentType || "\u6587\u6863") : v.isMetadata ? "\u5143\u6570\u636e" : v.local ? "\u672c\u5730" : "\u6837\u4f8b";
  return `
    <article class="video-card" onclick="openDetail('${v.id}')">
      <div class="thumb">${media}<span class="play">${v.isMetadata ? "\u2197" : "\u25b6"}</span></div>
      <div class="vc-body">
        <h3>${escapeHtml(videoCardDisplayTitle(v))}</h3>
        <div class="metrics"><span>\u8d5e <strong>${v.likes || 0}</strong></span><span>\u8bc4 ${v.comments || 0}</span><span>\u8f6c ${v.shares || 0}</span></div>
        <div class="date" style="margin-top:7px">${badge} \u00b7 ${escapeHtml(v.topic || "-")}</div>
      </div>
    </article>
  `;
}

const SECTOR_OVERRIDES_KEY = "xiaoke_sector_overrides_v1";

function readSectorOverrides() {
  try {
    const data = JSON.parse(localStorage.getItem(SECTOR_OVERRIDES_KEY) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function saveSectorOverrides(data) {
  localStorage.setItem(SECTOR_OVERRIDES_KEY, JSON.stringify(data));
}

function sectorDisplayName(tag) {
  return (readSectorOverrides()[tag.name] || {}).name || tag.name;
}

function sectorDisplayCount(tag) {
  const override = readSectorOverrides()[tag.name] || {};
  const manual = Number(override.count);
  if (Number.isFinite(manual) && String(override.count).trim() !== "") return manual;
  return tagCount(tag);
}

function editSectorTag(name) {
  const tag = tags.find(item => item.name === name);
  if (!tag) return;
  const overrides = readSectorOverrides();
  const current = overrides[name] || {};
  const nextName = prompt("\u884c\u4e1a\u540d\u79f0", current.name || tag.name);
  if (nextName === null) return;
  const nextCount = prompt("\u624b\u52a8\u7edf\u8ba1\u6570\uff08\u53ef\u4e0d\u586b\uff0c\u4e0d\u586b\u5c31\u81ea\u52a8\u7edf\u8ba1\uff09", current.count ?? "");
  overrides[name] = { name: nextName.trim() || tag.name, count: String(nextCount || "").trim() };
  saveSectorOverrides(overrides);
  renderTopChips();
  renderDashboard();
  showToast("\u884c\u4e1a\u5206\u5e03\u5df2\u66f4\u65b0");
}

function sectorRows() {
  return tags
    .filter(t => t.type === "sector")
    .map(t => ({ tag: t, name: sectorDisplayName(t), count: sectorDisplayCount(t) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function normalizeThemeText(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function compareThemeAliases(theme) {
  const key = normalizeThemeText(theme);
  const map = {
    "光模块": ["中际旭创", "新易盛", "英伟达"],
    "科创芯片": ["寒武纪", "中芯国际", "兆易创新"],
    "自主科技": ["中芯国际", "寒武纪", "兆易创新"],
    "机器人": ["特斯拉", "赛力斯"],
    "ai应用": ["寒武纪", "英伟达", "中际旭创", "新易盛"],
    "交易系统": ["中际旭创", "新易盛", "寒武纪"],
    "投资哲学": ["中际旭创", "新易盛", "寒武纪"],
    "宏观周期": ["紫金矿业", "茅台", "赛力斯"],
    "有色金属": ["紫金矿业"],
    "商业航天": ["赛力斯", "特斯拉"],
    "创新药": []
  };
  return map[key] || [];
}
function stockCompareCandidatesForTheme(theme, limit = 6) {
  const key = normalizeThemeText(theme);
  const aliasNames = compareThemeAliases(theme);
  const watch = flattenWatchlist()
    .filter(item => item && item.name && item.sector !== "鎸囨暟")
    .filter(item => {
      const text = normalizeThemeText([item.name, item.sector, item.group, item.groupChain, item.desc].join(" "));
      return text.includes(key) || aliasNames.includes(item.name);
    });
  const merged = [...aliasNames.map(name => ({ name })), ...watch];
  const seen = new Set();
  return merged
    .map(item => item.name || item.quoteKey || "")
    .filter(Boolean)
    .filter(name => {
      const id = normalizeThemeText(name);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, limit);
}

function stockComparePresetThemes(limit = 8) {
  const names = [
    ...sectorRows().map(row => row.tag.name),
    ...readWatchGroups().map(group => group.name)
  ];
  const seen = new Set();
  return names
    .map(name => ({ name, stocks: stockCompareCandidatesForTheme(name, 6) }))
    .filter(row => row.stocks.length >= 2)
    .filter(row => {
      const id = normalizeThemeText(row.name);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, limit);
}

function stockComparePresetButtonsHtml() {
  const rows = stockComparePresetThemes(8);
  if (!rows.length) return "";
  return `
    <div class="video-group-row" style="margin-top:10px">
      ${rows.map(row => `<button class="video-group-badge" onclick='openStockCompareForTheme(${JSON.stringify(row.name)})'>${escapeHtml(row.name)}对比</button>`).join("")}
    </div>
  `;
}

async function openStockCompareForTheme(theme) {
  const stocks = stockCompareCandidatesForTheme(theme, 6);
  if (stocks.length < 2) {
    showToast("这个主题暂时没有足够标的可对比");
    return;
  }
  await openStockProfiles();
  const input = document.getElementById("stockCompareInput");
  if (input) input.value = stocks.join(", ");
  const target = document.getElementById("stockCompareResult");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  await compareStocksFromInput();
}

function sectorDistributionHtml() {
  const colors = ["#3c82f6","#8d5cf6","#19c98b","#f5a623","#ef4444","#22c3d6","#ec4899","#84cc16"];
  const rows = sectorRows();
  return `
    <div class="panel-title panel-title-row">
      <span>\u884c\u4e1a\u5206\u5e03 TOP8</span>
      <button class="mini-edit" onclick="editSectorTag('${rows[0] ? rows[0].tag.name : ""}')">\u7f16\u8f91</button>
    </div>
    <div class="donut-wrap">
      <div class="donut"></div>
      <div class="legend">${rows.map((row,i) => `
        <div>
          <span class="sw" style="background:${colors[i]}"></span>
          <button class="legend-name" onclick="filterByTag('${row.tag.name}')">${escapeHtml(row.name)}(${row.count})</button>
          <button class="mini-edit" onclick="event.stopPropagation();editSectorTag('${row.tag.name}')">\u6539</button>
          <button class="mini-edit" onclick='event.stopPropagation();openStockCompareForTheme(${JSON.stringify(row.tag.name)})'>瀵规瘮</button>
        </div>
      `).join("")}</div>
    </div>
  `;
}

function recentReviewRows() {
  return libraryVideos()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, 10);
}

function recentReviewTableHtml() {
  const analyses = readVideoAnalyses();
  const body = recentReviewRows().map(v => {
    const transcript = getVideoDetailTranscript(v);
    const transcriptStatus = isEmptyTranscript(transcript) ? "\u5f85\u8865\u8f6c\u5f55" : "\u5df2\u6709\u8f6c\u5f55";
    const aiStatus = analyses[v.id] ? "\u5df2\u5206\u6790" : "\u5f85 AI";
    return `
      <tr onclick="openDetail('${v.id}')">
        <td>${escapeHtml(v.date || "-")}</td>
        <td>${escapeHtml(cleanVideoCardTitle(v))}</td>
        <td>${escapeHtml(v.topic || v.focus || "-")}</td>
        <td>${compactMetric(v.likes || 0)}\u8d5e / ${v.comments || 0}\u8bc4</td>
        <td><span class="tag ${isEmptyTranscript(transcript) ? "mid" : "high"}">${transcriptStatus}</span></td>
        <td><span class="tag ${analyses[v.id] ? "high" : "low"}">${aiStatus}</span></td>
        <td><button class="linkish" onclick="event.stopPropagation();openDetail('${v.id}')">\u8fdb\u5165</button></td>
      </tr>
    `;
  }).join("");
  return `
    <section class="panel metadata-panel">
      <div class="metadata-head">
        <div>
          <div class="panel-title">\u6700\u8fd1\u8bc4\u4ef7</div>
          <div class="date">\u7528\u6765\u66ff\u4ee3\u539f\u6765\u7684\u6296\u97f3\u5143\u6570\u636e\u8868\uff1a\u770b\u54ea\u4e9b\u89c6\u9891\u5df2\u8f6c\u5f55\u3001\u54ea\u4e9b\u8fd8\u8981 AI \u5206\u6790\u3002</div>
        </div>
        <button class="small-btn" onclick="openVideoLibrary()">\u6253\u5f00\u7d20\u6750\u5e93</button>
      </div>
      <div class="metadata-table-wrap">
        <table class="metadata-table">
          <thead><tr><th>\u65e5\u671f</th><th>\u89c6\u9891\u6807\u9898</th><th>\u9898\u6750</th><th>\u4e92\u52a8</th><th>\u8f6c\u5f55</th><th>AI</th><th>\u64cd\u4f5c</th></tr></thead>
          <tbody>${body || `<tr><td colspan="7">\u6682\u65e0\u89c6\u9891</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function signalDistillHtml() {
  const videos = libraryVideos();
  const today = new Date().toISOString().slice(0, 10);
  const analyses = readStructuredAnalyses();
  const linked = readVideoLinks();
  const summary = pipelineSummary(videos);
  const todayCount = videos.filter(v => String(v.date || "") === today).length;
  const high = Object.values(analyses).filter(item => confidenceNumber(item.confidence) >= 8).length;
  const risk = Object.values(analyses).filter(item => /风险|回避|谨慎|追高|退潮|低质量/.test([item.risk, item.summary, item.advice].join(" "))).length;
  const linkedCount = Object.values(linked).filter(item => uniqueClean([...(item.stocks || []), ...(item.sectors || []), ...(item.groups || [])]).length).length;
  return `
    <section class="signal-grid">
      <button class="signal-card" onclick="openVideoLibrary()"><strong>今日新增观点</strong><b>${todayCount}</b><span>按视频日期统计，方便当天复盘。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>高置信度视频</strong><b>${high}</b><span>置信度 8 分以上，优先沉淀为笔记。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>风险预警视频</strong><b>${risk}</b><span>包含风险、回避、追高等提示。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>待复核视频</strong><b>${summary.pendingAi + summary.low}</b><span>未 AI 分析或低置信度内容。</span></button>
      <button class="signal-card" onclick="openPipelineCenter()"><strong>已关联素材</strong><b>${linkedCount}</b><span>已进入标的/板块知识库。</span></button>
    </section>
  `;
}

function confidenceNumber(value) {
  const text = String(value ?? "").trim();
  const direct = Number(text.match(/\d+(\.\d+)?/)?.[0]);
  if (Number.isFinite(direct)) return Math.max(0, Math.min(10, direct > 10 ? direct / 10 : direct));
  if (/高/.test(text)) return 8;
  if (/中/.test(text)) return 6;
  if (/低|待/.test(text)) return 3;
  return 0;
}

function pipelineSummary(videos = []) {
  const analyses = readStructuredAnalyses();
  const saved = readVideoAnalyses();
  return (videos || []).reduce((acc, v) => {
    acc.total += 1;
    const transcript = getVideoDetailTranscript(v);
    const hasTranscript = !isEmptyTranscript(transcript);
    const structured = analyses[v.id];
    const hasAi = Boolean(structured || saved[v.id]);
    const confidence = structured ? confidenceNumber(structured.confidence) : hasAi ? 6 : 0;
    if (hasTranscript) acc.transcribed += 1;
    else acc.pendingTranscript += 1;
    if (hasAi) acc.ai += 1;
    else acc.pendingAi += 1;
    if (hasAi && confidence > 0 && confidence < 6) acc.low += 1;
    return acc;
  }, { total: 0, transcribed: 0, pendingTranscript: 0, ai: 0, pendingAi: 0, low: 0, failed: 0 });
}

function numberValue(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function quoteForItem(item) {
  if (!item) return null;
  return state.indexQuotes[item.quoteKey] || state.indexQuotes[item.name] || null;
}

function quotePctForItem(item) {
  const quote = quoteForItem(item);
  return quote ? numberValue(quote.pct, 0) : null;
}

function signedPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "未同步";
  const n = Number(value);
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function quotePriceText(item) {
  const quote = quoteForItem(item);
  if (!quote) return item && item.quoteKey ? "行情同步中" : "未填代码";
  return `${numberValue(quote.price, 0).toFixed(2)} ${signedPercent(quote.pct)}`;
}

function analysisTextBlob(item) {
  return [
    item && item.focus,
    item && item.summary,
    item && item.opinion,
    item && item.related,
    item && item.advice,
    item && item.risk,
    item && item.philosophy,
    item && item.confidence,
    item && item.directory
  ].filter(Boolean).join(" ");
}

function marketEnvironmentModel() {
  const indexRows = flattenWatchlist()
    .filter(item => item.sector === "指数" || /^s_/.test(item.quoteKey || ""))
    .map(item => ({ item, quote: quoteForItem(item), pct: quotePctForItem(item) }))
    .filter(row => row.quote);
  const avgPct = indexRows.length ? indexRows.reduce((sum, row) => sum + numberValue(row.pct, 0), 0) / indexRows.length : null;
  const up = indexRows.filter(row => numberValue(row.pct, 0) > 0).length;
  const down = indexRows.filter(row => numberValue(row.pct, 0) < 0).length;
  const strongest = indexRows.slice().sort((a, b) => numberValue(b.pct, 0) - numberValue(a.pct, 0))[0];
  const weakest = indexRows.slice().sort((a, b) => numberValue(a.pct, 0) - numberValue(b.pct, 0))[0];
  let stage = "等待行情同步";
  let tone = "warn";
  let action = "先同步指数行情，再判断仓位节奏。";
  if (avgPct !== null) {
    if (avgPct >= 1 && up >= Math.max(3, down + 1)) {
      stage = "强势修复";
      tone = "good";
      action = "可观察主线延续，但仍以确认后的低吸和复盘为主。";
    } else if (avgPct >= 0.25) {
      stage = "震荡偏强";
      tone = "good";
      action = "保留进攻观察，优先看强板块里的核心标的。";
    } else if (avgPct <= -1 || down >= 4) {
      stage = "退潮防守";
      tone = "danger";
      action = "降低操作频率，先看风险释放和主线承接。";
    } else if (avgPct <= -0.25) {
      stage = "震荡偏弱";
      tone = "warn";
      action = "少做追高，等待大盘止跌和板块重新聚焦。";
    } else {
      stage = "平衡震荡";
      tone = "warn";
      action = "适合复盘和观察，不急着把结论变成动作。";
    }
  }
  return { indexRows, avgPct, up, down, strongest, weakest, stage, tone, action };
}

function sectorStrengthRows() {
  const watch = flattenWatchlist();
  return sectorRows().map(row => {
    const relatedItems = watch.filter(item => {
      const text = [item.sector, item.group, item.groupChain, item.desc, item.name].join(" ");
      return text.includes(row.name) || text.includes(row.tag.name);
    });
    const pctRows = relatedItems.map(item => quotePctForItem(item)).filter(value => value !== null);
    const avgPct = pctRows.length ? pctRows.reduce((sum, value) => sum + value, 0) / pctRows.length : null;
    const score = row.count + (avgPct === null ? 0 : avgPct * 2) + relatedItems.length;
    let status = "观察";
    if (avgPct !== null && avgPct >= 3) status = "强势";
    else if (avgPct !== null && avgPct <= -3) status = "退潮";
    else if (row.count >= 10) status = "高热度";
    return { ...row, relatedItems, avgPct, score, status };
  }).sort((a, b) => b.score - a.score);
}

function stockPositionRows(limit = 8) {
  return flattenWatchlist()
    .filter(item => item.sector !== "指数")
    .map(item => {
      const pct = quotePctForItem(item);
      const relatedCount = relatedVideoCount(item.name);
      let position = "等待行情";
      let risk = item.quoteKey ? "行情同步中" : "缺行情代码";
      let tone = "warn";
      if (pct !== null) {
        if (pct >= 8) {
          position = "高位加速";
          risk = "追高风险";
          tone = "danger";
        } else if (pct >= 3) {
          position = "强势上攻";
          risk = "关注放量后承接";
          tone = "good";
        } else if (pct <= -5) {
          position = "退潮回撤";
          risk = "先等企稳";
          tone = "danger";
        } else if (pct <= -2) {
          position = "分歧调整";
          risk = "观察支撑";
          tone = "warn";
        } else {
          position = "震荡观察";
          risk = "等待方向";
        }
      }
      return { item, pct, relatedCount, position, risk, tone, score: relatedCount * 2 + (pct || 0) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
function riskRadarRows(limit = 6) {
  const risks = [];
  const market = marketEnvironmentModel();
  if (market.tone === "danger") {
    risks.push({ type: "大盘", name: market.stage, message: market.action, level: "danger" });
  }
  stockPositionRows(12).forEach(row => {
    if (row.tone === "danger" || !row.item.quoteKey) {
      risks.push({
        type: "个股",
        name: row.item.name,
        message: `${row.position}：${row.risk}，${quotePriceText(row.item)}`,
        level: row.tone === "danger" ? "danger" : "warn"
      });
    }
  });
  Object.entries(readStructuredAnalyses()).forEach(([id, model]) => {
    const text = analysisTextBlob(model);
    if (/风险|回避|谨慎|追高|退潮|低置信度|质量低|情绪/.test(text)) {
      const video = libraryVideos().find(item => item.id === id);
      risks.push({
        type: "视频",
        name: video ? cleanVideoCardTitle(video) : "视频分析",
        message: compactPlainText(model.risk || model.summary || text, 44),
        level: confidenceNumber(model.confidence) < 6 ? "danger" : "warn"
      });
    }
  });
  return risks.slice(0, limit);
}

function tradePlanModel() {
  const market = marketEnvironmentModel();
  const sectors = sectorStrengthRows();
  const stocks = stockPositionRows(6);
  const risks = riskRadarRows(8);
  const strongSectors = sectors.slice(0, 3).map(row => row.name).join("、") || "暂无";
  const strongStocks = stocks.filter(row => row.tone === "good").slice(0, 3).map(row => row.item.name).join("、") || "等待个股走强";
  const riskNames = risks.slice(0, 3).map(row => row.name).join("、") || "暂无明显风险";
  return {
    observe: `先观察 ${strongSectors}，再看核心标的是否继续强于大盘。`,
    trigger: `触发条件：${market.stage} 不恶化，${strongStocks} 有承接或相关视频观点继续验证。`,
    invalid: `失效条件：大盘转弱、板块热度退潮，或风险雷达集中提示 ${riskNames}。`,
    position: market.tone === "danger" || risks.length >= 5 ? "仓位建议：防守观察，少做追涨。" : "仓位建议：只做复盘后的试错，不把单条视频当买卖依据。",
    tomorrow: "明日复盘：先看指数环境，再看最强板块，最后核对个股位置和视频观点是否仍有效。"
  };
}
function decisionModulesHtml() {
  const market = marketEnvironmentModel();
  const sectors = sectorStrengthRows().slice(0, 5);
  const stocks = stockPositionRows(5);
  const plan = tradePlanModel();
  const risks = riskRadarRows(5);
  const chipClass = name => name === "danger" ? "danger" : name === "good" ? "good" : "warn";
  const sectorList = sectors.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.name)}</b><span>${row.count} 条视频 · ${row.relatedItems.length} 个标的</span></div>
      <em class="decision-chip ${chipClass(row.status === "退潮" ? "danger" : row.status === "强势" ? "good" : "warn")}">${escapeHtml(row.status)} ${signedPercent(row.avgPct)}</em>
    </div>
  `).join("");
  const stockList = stocks.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.item.name)}</b><span>${escapeHtml(row.risk)} · 相关视频 ${row.relatedCount}</span></div>
      <em class="decision-chip ${chipClass(row.tone)}">${escapeHtml(row.position)} ${signedPercent(row.pct)}</em>
    </div>
  `).join("");
  const planList = [plan.observe, plan.trigger, plan.invalid, plan.position, plan.tomorrow].map(item => `
    <div class="decision-row"><div><span>${escapeHtml(item)}</span></div><em class="decision-chip warn">复盘</em></div>
  `).join("");
  const riskList = risks.map(row => `
    <div class="decision-row"><div><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.message)}</span></div><em class="decision-chip ${chipClass(row.level)}">${escapeHtml(row.type)}</em></div>
  `).join("") || `<div class="decision-row"><div><b>暂无集中风险</b><span>继续观察行情和视频观点变化。</span></div><em class="decision-chip good">正常</em></div>`;
  return `
    <section class="panel" style="margin-bottom:12px">
      <div class="panel-title panel-title-row"><span>决策运行面板</span><span class="date">基于本地行情、视频分析、分组和关注标的实时整理</span></div>
      <div class="decision-grid">
        <div class="decision-card">
          <div class="decision-kicker"><span>MKT 大盘环境</span><em class="decision-chip ${chipClass(market.tone)}">${escapeHtml(market.stage)}</em></div>
          <div class="decision-value ${market.tone === "danger" ? "down" : market.tone === "good" ? "up" : "warn"}">${signedPercent(market.avgPct)}</div>
          <div class="decision-list">
            <div class="decision-row"><div><b>上涨 / 下跌</b><span>${market.up} / ${market.down} 个指数</span></div><em class="decision-chip warn">指数</em></div>
            <div class="decision-row"><div><b>最强</b><span>${escapeHtml(market.strongest ? market.strongest.item.name : "等待同步")} ${market.strongest ? signedPercent(market.strongest.pct) : ""}</span></div><em class="decision-chip good">强</em></div>
            <div class="decision-row"><div><b>动作</b><span>${escapeHtml(market.action)}</span></div><em class="decision-chip ${chipClass(market.tone)}">提示</em></div>
          </div>
        </div>
        <div class="decision-card"><div class="decision-kicker"><span>SEC 板块强弱</span><em class="decision-chip good">运行中</em></div><div class="decision-list">${sectorList || `<div class="decision-row"><div><b>暂无板块数据</b><span>等待视频分组和行业统计。</span></div><em class="decision-chip warn">待补</em></div>`}</div></div>
        <div class="decision-card"><div class="decision-kicker"><span>POS 个股位置</span><em class="decision-chip good">运行中</em></div><div class="decision-list">${stockList}</div></div>
        <div class="decision-card"><div class="decision-kicker"><span>PLAN 交易计划</span><em class="decision-chip warn">辅助</em></div><div class="decision-list">${planList}</div></div>
        <div class="decision-card"><div class="decision-kicker"><span>RISK 风险雷达</span><em class="decision-chip ${risks.length ? "danger" : "good"}">${risks.length} 条</em></div><div class="decision-list">${riskList}</div></div>
      </div>
    </section>
  `;
}
function daysSinceDate(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return null;
  return Math.max(0, Math.floor((Date.now() - time) / 86400000));
}

function holdingReviewRows(limit = 6) {
  return flattenWatchlist()
    .filter(item => item.sector !== "指数")
    .map(item => {
      const pct = quotePctForItem(item);
      const quote = quoteForItem(item);
      const related = relatedVideoCount(item.name);
      const digest = relatedVideoDigest(item.name) || item.desc || "等待更多视频观点验证。";
      const tone = pct === null ? "warn" : pct >= 3 ? "good" : pct <= -3 ? "danger" : "warn";
      return { item, pct, quote, related, digest, tone };
    })
    .sort((a, b) => b.related - a.related || Math.abs(numberValue(b.pct, 0)) - Math.abs(numberValue(a.pct, 0)))
    .slice(0, limit);
}

function viewpointDecayRows(limit = 6) {
  return libraryVideos()
    .filter(v => readStructuredAnalyses()[v.id] || readVideoAnalyses()[v.id])
    .map(v => {
      const age = daysSinceDate(v.date);
      let stage = "新鲜";
      let tone = "good";
      if (age === null) {
        stage = "无日期";
        tone = "warn";
      } else if (age >= 30) {
        stage = "过期复核";
        tone = "danger";
      } else if (age >= 15) {
        stage = "需要复核";
        tone = "warn";
      } else if (age >= 7) {
        stage = "降权观察";
        tone = "warn";
      }
      return { video: v, age, stage, tone };
    })
    .sort((a, b) => numberValue(b.age, -1) - numberValue(a.age, -1))
    .slice(0, limit);
}

function readAssetAllocation() {
  const data = readJsonStore(ASSET_ALLOCATION_KEY, null);
  if (data && Array.isArray(data.items)) return data;
  return {
    updatedAt: "",
    items: [
      { name: "股票", value: 0 },
      { name: "现金", value: 0 },
      { name: "基金", value: 0 },
      { name: "理财", value: 0 },
      { name: "其他", value: 0 }
    ]
  };
}

function saveAssetAllocation(data) {
  writeJsonStore(ASSET_ALLOCATION_KEY, data);
}

function configureAssetAllocation() {
  const data = readAssetAllocation();
  const current = data.items.map(item => `${item.name}:${item.value}`).join("，");
  const input = prompt("按“股票:50，现金:30，基金:20”格式填写资产比例或金额", current);
  if (input === null) return;
  const items = input.split(/[，,]/).map(part => {
    const [name, raw] = part.split(/[:：]/);
    return { name: String(name || "").trim(), value: numberValue(String(raw || "").replace("%", ""), 0) };
  }).filter(item => item.name);
  if (!items.length) return showToast("没有识别到资产配置");
  saveAssetAllocation({ items, updatedAt: new Date().toISOString() });
  openPipelineCenter();
  showToast("资产配置已更新");
}
function assetAllocationModel() {
  const data = readAssetAllocation();
  const total = data.items.reduce((sum, item) => sum + Math.max(0, numberValue(item.value, 0)), 0);
  const rows = data.items.map(item => {
    const value = Math.max(0, numberValue(item.value, 0));
    return { ...item, value, pct: total ? value / total * 100 : 0 };
  }).sort((a, b) => b.value - a.value);
  const top = rows[0];
  let status = total ? "已配置" : "待配置";
  let tone = total ? "good" : "warn";
  let message = total ? `最大暴露为 ${top.name} ${top.pct.toFixed(0)}%，用于检查是否过度集中。` : "还没有录入资产比例，点击配置资产开始。";
  if (top && top.pct >= 70) {
    status = "集中度偏高";
    tone = "danger";
    message = `${top.name} 占比 ${top.pct.toFixed(0)}%，需要留意单一资产暴露。`;
  }
  return { rows, total, status, tone, message, updatedAt: data.updatedAt || "" };
}

function disciplineRows(limit = 6) {
  const keywords = [
    ["追高", "追高/情绪"],
    ["冲动", "冲动交易"],
    ["恐慌", "恐慌交易"],
    ["贪", "贪婪"],
    ["消息", "听消息"],
    ["重仓", "仓位过重"],
    ["没止损", "止损缺失"],
    ["补仓", "补仓冲动"]
  ];
  const rows = [];
  readDailyReviews().forEach(row => {
    const text = [row.action, row.reason, row.result, row.lesson].join(" ");
    keywords.forEach(([keyword, label]) => {
      if (text.includes(keyword)) rows.push({ name: row.target || row.date || "复盘记录", message: label, level: "warn" });
    });
  });
  const strategy = readStrategy();
  const strategyText = [strategy.entry, strategy.risk, strategy.position, strategy.forbidden].join(" ");
  if (!strategyText.trim()) rows.push({ name: "策略手册", message: "策略规则还不完整，纪律检查缺少基准。", level: "warn" });
  if (!rows.length) rows.push({ name: "纪律状态", message: "暂未发现明显情绪化关键词，继续按每日复盘记录。", level: "good" });
  return rows.slice(0, limit);
}
function readErrorBook() {
  const rows = readJsonStore(ERROR_BOOK_KEY, []);
  return Array.isArray(rows) ? rows : [];
}

function saveErrorBook(rows) {
  writeJsonStore(ERROR_BOOK_KEY, rows);
}

function addErrorBookEntry() {
  const title = prompt("错题标题，例如：追高买在退潮期");
  if (title === null) return;
  const lesson = prompt("这次教训是什么？", "");
  const rows = readErrorBook();
  rows.unshift({ id: "err_" + Date.now(), title: title.trim() || "未命名错题", lesson: String(lesson || "").trim(), date: todayString() });
  saveErrorBook(rows);
  openPipelineCenter();
  showToast("错题已记录");
}

function errorBookRows(limit = 6) {
  const manual = readErrorBook();
  const autoRows = [];
  readDailyReviews().forEach(row => {
    const text = [row.action, row.reason, row.result, row.lesson].join(" ");
    if (/买错|追高|止损|回撤|重仓|冲动|退潮/.test(text)) {
      autoRows.push({
        title: row.target || "复盘错题",
        lesson: compactPlainText(row.lesson || row.result || row.reason, 42),
        date: row.date || ""
      });
    }
  });
  return [...manual, ...autoRows].slice(0, limit);
}
function portfolioModulesHtml() {
  const chipClass = name => name === "danger" ? "danger" : name === "good" ? "good" : "warn";
  const holds = holdingReviewRows(5);
  const decay = viewpointDecayRows(5);
  const asset = assetAllocationModel();
  const discipline = disciplineRows(5);
  const errors = errorBookRows(5);
  const holdList = holds.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.item.name)}</b><span>${escapeHtml(row.item.sector || row.item.group || "-")} · ${escapeHtml(compactPlainText(row.digest, 34))}</span></div>
      <em class="decision-chip ${chipClass(row.tone)}">${quotePriceText(row.item)}</em>
    </div>
  `).join("");
  const decayList = decay.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(cleanVideoCardTitle(row.video))}</b><span>${row.age === null ? "无日期" : `${row.age} 天前`} · ${escapeHtml(row.video.date || "-")}</span></div>
      <em class="decision-chip ${chipClass(row.tone)}">${escapeHtml(row.stage)}</em>
    </div>
  `).join("") || `<div class="decision-row"><div><b>暂无 AI 观点</b><span>生成视频 AI 分析后会自动检查观点时效。</span></div><em class="decision-chip warn">待分析</em></div>`;
  const assetList = asset.rows.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.name)}</b><span>${row.value} · ${row.pct.toFixed(0)}%</span></div>
      <em class="decision-chip ${row.pct >= 70 ? "danger" : row.pct >= 45 ? "warn" : "good"}">${row.pct.toFixed(0)}%</em>
    </div>
  `).join("");
  const discList = discipline.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.message)}</span></div>
      <em class="decision-chip ${chipClass(row.level)}">纪律</em>
    </div>
  `).join("");
  const errList = errors.map(row => `
    <div class="decision-row">
      <div><b>${escapeHtml(row.title)}</b><span>${escapeHtml(row.lesson || "等待补充教训")} ${row.date ? `· ${escapeHtml(row.date)}` : ""}</span></div>
      <em class="decision-chip danger">错题</em>
    </div>
  `).join("") || `<div class="decision-row"><div><b>暂无错题</b><span>可以手动记录，也会从每日复盘里提取。</span></div><em class="decision-chip good">干净</em></div>`;
  return `
    <section class="panel" style="margin-bottom:12px">
      <div class="panel-title panel-title-row"><span>资产与纪律运行面板</span><span class="date">持仓复盘、观点时效、资产配置、纪律检查、错题本</span></div>
      <div class="decision-grid">
        <div class="decision-card">
          <div class="decision-kicker"><span>HOLD 持仓复盘</span><em class="decision-chip good">自选运行</em></div>
          <div class="decision-list">${holdList}</div>
        </div>
        <div class="decision-card">
          <div class="decision-kicker"><span>DECAY 观点时效</span><em class="decision-chip warn">自动降权</em></div>
          <div class="decision-list">${decayList}</div>
        </div>
        <div class="decision-card">
          <div class="decision-kicker"><span>ASSET 资产配置</span><button class="decision-chip ${chipClass(asset.tone)}" onclick="configureAssetAllocation()">${escapeHtml(asset.status)}</button></div>
          <div class="decision-row"><div><b>集中度</b><span>${escapeHtml(asset.message)}</span></div><em class="decision-chip ${chipClass(asset.tone)}">配置</em></div>
          <div class="decision-list" style="margin-top:8px">${assetList}</div>
        </div>
        <div class="decision-card">
          <div class="decision-kicker"><span>DISC 纪律检查</span><em class="decision-chip warn">复盘扫描</em></div>
          <div class="decision-list">${discList}</div>
        </div>
        <div class="decision-card">
          <div class="decision-kicker"><span>ERR 投资错题本</span><button class="decision-chip danger" onclick="addErrorBookEntry()">+记录</button></div>
          <div class="decision-list">${errList}</div>
        </div>
      </div>
    </section>
  `;
}

function openPipelineCenter() {
  state.view = "pipelineCenter";
  renderTopChips();
  const summary = pipelineSummary(libraryVideos());
  const videoCaps = [
    ["ASR", "语音转文字", "把本地视频音频转成可分析文本，失败时保留状态。"],
    ["OCR", "标题识别", "从视频画面抓取标题，清理模型先生视频后缀。"],
    ["AI", "结构化分析", "按关注标的、重点、观点、风险、置信度输出。"],
    ["S", "股票关联", "把视频与股票、指数、行业和分组建立连接。"],
    ["C", "置信度评分", "1-10 分标记内容质量，低分进入待复核。"],
    ["R", "风险预警", "自动提取追高、退潮、题材炒作等风险词。"],
    ["T", "时间线追踪", "保留视频日期、更新时间和处理阶段。"],
    ["Q", "AI问答", "后续可扩展为视频知识库问答。"]
  ];
  const investCaps = [
    ["MKT", "大盘环境", "读取左侧指数行情，判断修复、震荡、退潮等市场阶段。"],
    ["SEC", "板块强弱", "结合行业视频热度、分组和相关标的涨跌给出强弱排序。"],
    ["POS", "个股位置", "根据涨跌幅、相关视频数和行情代码标记高位加速、分歧调整、退潮回撤等状态。"],
    ["PLAN", "交易计划", "把大盘、板块、个股和风险雷达合成观察条件和复盘项。"],
    ["RISK+", "风险雷达", "聚合大盘退潮、个股追高、视频风险词和低置信度分析。"],
    ["HOLD", "持仓复盘", "围绕关注标的显示行情、板块、相关视频和最近观点。"],
    ["DECAY", "观点时效", "按视频日期给 AI 观点做 7/15/30 天降权提醒。"],
    ["ASSET", "资产配置", "记录股票、现金、基金等比例并检查集中度。"],
    ["DISC", "纪律检查", "扫描每日复盘里的追高、冲动、重仓等关键词。"],
    ["ERR", "投资错题本", "支持手动记录错题，并从每日复盘里提取疑似错误记录。"]
  ];
  const capGrid = rows => rows.map(([code, title, desc]) => `
    <div class="cap-card"><div class="cap-code">${code}</div><h3>${title}</h3><p>${desc}</p></div>
  `).join("");
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">能力中心 / 分析流水线</div>
        <div class="date">把视频素材、行情数据和个人复盘沉淀成可查询、可追踪、可评分的投资知识。</div>
      </div>
      <div class="review-actions">
        <button class="open-btn" onclick="openVideoLibrary()">打开素材库</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel pipeline-panel">
      <div class="pipeline-grid">
        <div class="pipeline-cell"><b>${summary.total}</b><span>总视频</span></div>
        <div class="pipeline-cell"><b>${summary.transcribed}</b><span>已转写</span></div>
        <div class="pipeline-cell"><b>${summary.pendingTranscript}</b><span>待转写</span></div>
        <div class="pipeline-cell"><b>${summary.ai}</b><span>已 AI 分析</span></div>
        <div class="pipeline-cell"><b>${summary.low}</b><span>低置信度</span></div>
        <div class="pipeline-cell"><b>${summary.failed}</b><span>失败</span></div>
      </div>
      <div class="pipeline-actions">
        <button class="open-btn" onclick="batchTranscribeVideos(false)">批量转写待处理视频</button>
        <button class="open-btn" onclick="batchAnalyzeVideos(false)">批量生成 AI 分析</button>
      </div>
    </section>
    ${decisionModulesHtml()}
    ${portfolioModulesHtml()}
    <section class="panel" style="margin-bottom:12px">
      <div class="panel-title panel-title-row"><span>视频蒸馏能力</span><span class="date">素材变知识</span></div>
      <div class="cap-grid">${capGrid(videoCaps)}</div>
    </section>
    <section class="panel">
      <div class="panel-title panel-title-row"><span>投资 / 理财决策能力</span><span class="date">行情、计划、风险、资产和纪律</span></div>
      <div class="cap-grid">${capGrid(investCaps)}</div>
    </section>
  `;
}

function renderDashboard() {
  state.view = "dashboard";
  const main = document.getElementById("main");
  const targetCount = flattenWatchlist().length;
  const library = libraryVideos();
  main.innerHTML = `
    <section class="stats">
      <button class="stat" onclick="openWatchlistView()"><div><b>${targetCount}</b><span>\u5173\u6ce8\u6807\u7684</span></div></button>
      <button class="stat" onclick="openVideoLibrary()"><div><b>${library.length}</b><span>\u5206\u6790\u89c6\u9891</span></div></button>
      <button class="stat" onclick="openInvestmentView()"><div><b>309</b><span>\u6295\u8d44\u5206\u6790</span></div></button>
    </section>
    ${signalDistillHtml()}
    <section class="dash-grid">
      <div class="panel">
        <div class="panel-title">\u70ed\u95e8\u6807\u7684 TOP10</div>
        <div class="bars">${renderBars()}</div>
      </div>
      <div class="panel">${sectorDistributionHtml()}</div>
    </section>
    <section class="feed">
      ${library.slice(0,4).map(feedHtml).join("")}
    </section>
    ${recentReviewTableHtml()}
  `;
}

const STRATEGY_KEY = "xiaoke_my_strategy_v1";

function defaultStrategy() {
  return {
    main: "\u6211\u7684\u7b56\u7565\uff1a\n\n1. \u53ea\u5728\u4e3b\u7ebf\u6e05\u6670\u3001\u6807\u7684\u6709\u8fa8\u8bc6\u5ea6\u3001\u98ce\u9669\u53ef\u63a7\u7684\u65f6\u5019\u51fa\u624b\u3002\n2. \u4e0d\u56e0\u4e3a\u60c5\u7eea\u70ed\u95f9\u800c\u8ffd\u9ad8\uff0c\u5148\u770b\u4f4d\u7f6e\uff0c\u518d\u770b\u627f\u63a5\u3002\n3. \u5c0f\u53ef\u8bfe\u5802\u8d1f\u8d23\u8bb0\u5f55\u3001\u590d\u76d8\u548c\u63d0\u9192\uff0c\u6700\u7ec8\u51b3\u7b56\u4ecd\u4ee5\u81ea\u5df1\u7684\u4ea4\u6613\u7cfb\u7edf\u4e3a\u51c6\u3002",
    entry: "\u5165\u573a\u6761\u4ef6\uff1a\n- \u4e3b\u7ebf\u660e\u786e\n- \u677f\u5757\u6709\u6301\u7eed\u6027\n- \u6807\u7684\u6709\u91cf\u4ef7\u627f\u63a5",
    risk: "\u98ce\u9669\u89c4\u5219\uff1a\n- \u770b\u4e0d\u61c2\u4e0d\u4e0b\u624b\n- \u9ad8\u4f4d\u4e0d\u91cd\u4ed3\n- \u9519\u4e86\u5148\u964d\u4ed3\u518d\u590d\u76d8",
    position: "\u4ed3\u4f4d\u89c4\u5219\uff1a\n- \u8bd5\u9519\u4ed3\n- \u786e\u8ba4\u540e\u52a0\u4ed3\n- \u5206\u6b67\u52a0\u5927\u65f6\u964d\u4ed3",
    forbid: "\u7981\u505a\u6e05\u5355\uff1a\n- \u4e0d\u770b\u98ce\u9669\u53ea\u770b\u6da8\u5e45\n- \u6ca1\u590d\u76d8\u5c31\u8fde\u7eed\u64cd\u4f5c\n- \u7528\u60c5\u7eea\u4ee3\u66ff\u7cfb\u7edf"
  };
}

function readStrategy() {
  try {
    return { ...defaultStrategy(), ...(JSON.parse(localStorage.getItem(STRATEGY_KEY) || "{}") || {}) };
  } catch {
    return defaultStrategy();
  }
}

function saveStrategyField(field, value) {
  const data = readStrategy();
  data[field] = value;
  localStorage.setItem(STRATEGY_KEY, JSON.stringify(data));
}

function openStrategy() {
  state.view = "strategy";
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  render();
}

function renderStrategy() {
  state.view = "strategy";
  const data = readStrategy();
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">\u6211\u7684\u7b56\u7565</div>
        <div class="date">\u957f\u671f\u53ef\u7f16\u8f91\u7684\u4ea4\u6613\u7b56\u7565\u624b\u518c\uff1a\u8bb0\u5f55\u4f60\u7684\u4e3b\u7ebf\u5224\u65ad\u3001\u4ed3\u4f4d\u89c4\u5219\u3001\u98ce\u9669\u8fb9\u754c\u548c\u7981\u505a\u4e8b\u9879\u3002</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="localStorage.removeItem(STRATEGY_KEY);renderStrategy()">\u6062\u590d\u9ed8\u8ba4</button>
        <button class="small-btn" onclick="renderDashboard()">\u8fd4\u56de\u770b\u677f</button>
      </div>
    </section>
    <section class="strategy-grid">
      <div class="panel strategy-main">
        <div class="panel-title">\u7b56\u7565\u6b63\u6587</div>
        <textarea class="strategy-textarea main" oninput="saveStrategyField('main', this.value)">${escapeHtml(data.main || "")}</textarea>
      </div>
      <div class="strategy-side">
        ${strategyBox("entry", "\u5165\u573a\u6761\u4ef6", data.entry)}
        ${strategyBox("risk", "\u98ce\u9669\u89c4\u5219", data.risk)}
        ${strategyBox("position", "\u4ed3\u4f4d\u89c4\u5219", data.position)}
        ${strategyBox("forbid", "\u7981\u505a\u6e05\u5355", data.forbid)}
      </div>
    </section>
  `;
}

function strategyBox(field, title, value) {
  return `
    <div class="panel strategy-box">
      <div class="panel-title">${title}</div>
      <textarea class="strategy-textarea" oninput="saveStrategyField('${field}', this.value)">${escapeHtml(value || "")}</textarea>
    </div>
  `;
}

const VIDEO_GROUPS_KEY = "xiaoke_video_groups_v1";
const VIDEO_GROUP_ASSIGN_KEY = "xiaoke_video_group_assignments_v1";
const VIDEO_TAG_META_KEY = "xiaoke_video_tag_meta_v1";
const VIDEO_TAG_COLORS = ["", "blue", "cyan", "green", "amber", "red", "purple", "pink"];

function customVideoTagId(name) {
  return `custom:${name}`;
}

function groupColorValue(color) {
  const colors = {
    blue: "#5a9dff",
    cyan: "#22c3d6",
    green: "#19c98b",
    amber: "#f5a623",
    red: "#ff5b6f",
    purple: "#8d5cf6",
    pink: "#ec4899"
  };
  return colors[color] || "";
}

function groupColorStyle(color) {
  const value = groupColorValue(color);
  return value ? `--group-color:${value};border-color:${value};color:${value};` : "";
}

function readVideoTagMeta() {
  try {
    const data = JSON.parse(localStorage.getItem(VIDEO_TAG_META_KEY) || "{}");
    return {
      renames: data && typeof data.renames === "object" ? data.renames : {},
      hidden: Array.isArray(data.hidden) ? data.hidden : [],
      deleted: Array.isArray(data.deleted) ? data.deleted : [],
      customHidden: Array.isArray(data.customHidden) ? data.customHidden : [],
      order: Array.isArray(data.order) ? data.order : [],
      colors: data && typeof data.colors === "object" ? data.colors : {}
    };
  } catch {
    return { renames: {}, hidden: [], deleted: [], customHidden: [], order: [], colors: {} };
  }
}

function saveVideoTagMeta(data) {
  localStorage.setItem(VIDEO_TAG_META_KEY, JSON.stringify({
    renames: data.renames || {},
    hidden: data.hidden || [],
    deleted: data.deleted || [],
    customHidden: data.customHidden || [],
    order: data.order || [],
    colors: data.colors || {}
  }));
}

function videoTagColor(id) {
  return readVideoTagMeta().colors[id] || "";
}

function orderedVideoTagItems(includeHidden = false) {
  const meta = readVideoTagMeta();
  const base = configuredBaseVideoTags(true);
  const custom = readVideoGroups().map(name => ({
    id: customVideoTagId(name),
    name,
    originalName: name,
    count: 0,
    type: "videoGroup",
    isBuiltIn: false,
    hidden: meta.customHidden.includes(name),
    deleted: false
  }));
  const all = base.concat(custom).map((item, index) => ({
    ...item,
    color: meta.colors[item.id] || "",
    _defaultOrder: index
  }));
  const order = meta.order || [];
  return all
    .filter(item => includeHidden || (!item.hidden && !item.deleted))
    .sort((a, b) => {
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 9999 + a._defaultOrder : ai) - (bi === -1 ? 9999 + b._defaultOrder : bi);
      return a._defaultOrder - b._defaultOrder;
    });
}

function saveVideoTagOrder(items) {
  const meta = readVideoTagMeta();
  meta.order = items.map(item => item.id);
  saveVideoTagMeta(meta);
}

function moveVideoTag(id, direction) {
  const items = orderedVideoTagItems(true);
  const index = items.findIndex(item => item.id === id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= items.length) return;
  [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
  saveVideoTagOrder(items);
  render();
}

function pinVideoTag(id) {
  const items = orderedVideoTagItems(true);
  const index = items.findIndex(item => item.id === id);
  if (index < 0) return;
  const [item] = items.splice(index, 1);
  items.unshift(item);
  saveVideoTagOrder(items);
  render();
}

function cycleVideoTagColor(id) {
  const meta = readVideoTagMeta();
  const current = meta.colors[id] || "";
  const next = VIDEO_TAG_COLORS[(VIDEO_TAG_COLORS.indexOf(current) + 1) % VIDEO_TAG_COLORS.length];
  if (next) meta.colors[id] = next;
  else delete meta.colors[id];
  saveVideoTagMeta(meta);
  render();
}

function baseVideoTagId(index) {
  return `base:${index}`;
}

function configuredBaseVideoTags(includeHidden = false) {
  const meta = readVideoTagMeta();
  return tags
    .filter(tag => tag.type !== "source")
    .map((tag, index) => {
      const id = baseVideoTagId(index);
      return {
        ...tag,
        id,
        originalName: tag.name,
        name: meta.renames[id] || sectorDisplayName(tag),
        isBuiltIn: true,
        hidden: meta.hidden.includes(id),
        deleted: meta.deleted.includes(id)
      };
    })
    .filter(tag => includeHidden || (!tag.hidden && !tag.deleted));
}

function firstVisibleVideoTagName() {
  return orderedVideoTagItems(false)[0]?.name || tags[0].name;
}

function renameBuiltInVideoTag(id) {
  const tag = configuredBaseVideoTags(true).find(item => item.id === id);
  if (!tag) return;
  const nextName = prompt("\u65b0\u7684\u5206\u7ec4\u540d\u79f0", tag.name);
  if (nextName === null) return;
  const clean = nextName.trim();
  if (!clean) return;
  const meta = readVideoTagMeta();
  meta.renames[id] = clean;
  saveVideoTagMeta(meta);
  if (state.activeTag === tag.name) state.activeTag = clean;
  render();
  showToast("\u5df2\u4fee\u6539\u5206\u7ec4\u540d\u79f0");
}

function toggleBuiltInVideoTag(id) {
  const meta = readVideoTagMeta();
  const set = new Set(meta.hidden);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  meta.hidden = [...set];
  saveVideoTagMeta(meta);
  const active = configuredBaseVideoTags(true).find(item => item.id === id);
  if (active && state.activeTag === active.name) state.activeTag = firstVisibleVideoTagName();
  render();
  showToast(set.has(id) ? "\u5df2\u9690\u85cf\u5206\u7ec4" : "\u5df2\u6062\u590d\u5206\u7ec4");
}

function deleteBuiltInVideoTag(id) {
  const tag = configuredBaseVideoTags(true).find(item => item.id === id);
  if (!tag) return;
  if (!confirm(`\u786e\u5b9a\u5220\u9664\u300c${tag.name}\u300d\u5417\uff1f\u8fd9\u4f1a\u628a\u5b83\u4ece\u9876\u90e8\u5206\u7ec4\u79fb\u9664\uff0c\u4f46\u4f60\u4ecd\u53ef\u4ee5\u5728\u7ba1\u7406\u5206\u7ec4\u91cc\u6062\u590d\u3002`)) return;
  const meta = readVideoTagMeta();
  meta.deleted = [...new Set([...(meta.deleted || []), id])];
  meta.hidden = (meta.hidden || []).filter(item => item !== id);
  saveVideoTagMeta(meta);
  if (state.activeTag === tag.name) state.activeTag = firstVisibleVideoTagName();
  render();
  showToast("\u5df2\u5220\u9664\u5206\u7ec4\uff0c\u53ef\u5728\u7ba1\u7406\u9875\u6062\u590d");
}

function restoreBuiltInVideoTag(id) {
  const meta = readVideoTagMeta();
  meta.deleted = (meta.deleted || []).filter(item => item !== id);
  meta.hidden = (meta.hidden || []).filter(item => item !== id);
  saveVideoTagMeta(meta);
  render();
  showToast("\u5df2\u6062\u590d\u5206\u7ec4");
}

function readVideoGroups() {
  try {
    const rows = JSON.parse(localStorage.getItem(VIDEO_GROUPS_KEY) || "[]");
    return Array.isArray(rows) ? rows.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function saveVideoGroups(groups) {
  localStorage.setItem(VIDEO_GROUPS_KEY, JSON.stringify([...new Set(groups.map(item => String(item || "").trim()).filter(Boolean))]));
}

function readVideoAssignments() {
  if (videoAssignmentsCache) return videoAssignmentsCache;
  try {
    const data = JSON.parse(localStorage.getItem(VIDEO_GROUP_ASSIGN_KEY) || "{}");
    videoAssignmentsCache = data && typeof data === "object" ? data : {};
    return videoAssignmentsCache;
  } catch {
    videoAssignmentsCache = {};
    return {};
  }
}

function saveVideoAssignments(data) {
  videoAssignmentsCache = data;
  clearVideoRuntimeCache();
  localStorage.setItem(VIDEO_GROUP_ASSIGN_KEY, JSON.stringify(data));
}

function videoGroupsFor(id) {
  const groups = readVideoAssignments()[id] || [];
  return Array.isArray(groups) ? groups : [];
}

function allVideoTags() {
  return orderedVideoTagItems(false);
}

function addVideoGroup() {
  const name = prompt("\u65b0\u5efa\u89c6\u9891\u5206\u7ec4\u540d\u79f0\uff0c\u4f8b\u5982\uff1a\u957f\u946b\u5b58\u50a8\u4ea7\u4e1a\u94fe / \u5149\u6a21\u5757 / \u4ea4\u6613\u7cfb\u7edf");
  if (!name) return;
  const groups = readVideoGroups();
  groups.push(name.trim());
  saveVideoGroups(groups);
  const meta = readVideoTagMeta();
  const id = customVideoTagId(name.trim());
  meta.order = [...(meta.order || []).filter(item => item !== id), id];
  saveVideoTagMeta(meta);
  renderTopChips();
  showToast("\u5df2\u65b0\u5efa\u89c6\u9891\u5206\u7ec4");
}

function renameVideoGroup(oldName) {
  const nextName = prompt("\u65b0\u7684\u5206\u7ec4\u540d\u79f0", oldName);
  if (!nextName || nextName.trim() === oldName) return;
  const clean = nextName.trim();
  const groups = readVideoGroups().map(name => name === oldName ? clean : name);
  saveVideoGroups(groups);
  const meta = readVideoTagMeta();
  const oldId = customVideoTagId(oldName);
  const nextId = customVideoTagId(clean);
  meta.customHidden = (meta.customHidden || []).map(name => name === oldName ? clean : name);
  meta.order = (meta.order || []).map(id => id === oldId ? nextId : id);
  if (meta.colors[oldId]) {
    meta.colors[nextId] = meta.colors[oldId];
    delete meta.colors[oldId];
  }
  saveVideoTagMeta(meta);
  const assignments = readVideoAssignments();
  Object.keys(assignments).forEach(id => {
    assignments[id] = [...new Set((assignments[id] || []).map(name => name === oldName ? clean : name))];
  });
  saveVideoAssignments(assignments);
  if (state.activeTag === oldName) state.activeTag = clean;
  render();
  showToast("\u5df2\u91cd\u547d\u540d\u5206\u7ec4");
}

function toggleVideoGroupHidden(name) {
  const meta = readVideoTagMeta();
  const set = new Set(meta.customHidden || []);
  if (set.has(name)) set.delete(name);
  else set.add(name);
  meta.customHidden = [...set];
  saveVideoTagMeta(meta);
  if (state.activeTag === name) state.activeTag = firstVisibleVideoTagName();
  render();
  showToast(set.has(name) ? "\u5df2\u9690\u85cf\u5206\u7ec4" : "\u5df2\u6062\u590d\u5206\u7ec4");
}

function deleteVideoGroup(name) {
  if (!confirm(`\u786e\u5b9a\u5220\u9664\u89c6\u9891\u5206\u7ec4\u300c${name}\u300d\u5417\uff1f\u89c6\u9891\u672c\u8eab\u4e0d\u4f1a\u5220\uff0c\u53ea\u4f1a\u79fb\u51fa\u8fd9\u4e2a\u5206\u7ec4\u3002`)) return;
  saveVideoGroups(readVideoGroups().filter(item => item !== name));
  const meta = readVideoTagMeta();
  const id = customVideoTagId(name);
  meta.customHidden = (meta.customHidden || []).filter(item => item !== name);
  meta.order = (meta.order || []).filter(item => item !== id);
  delete meta.colors[id];
  saveVideoTagMeta(meta);
  const assignments = readVideoAssignments();
  Object.keys(assignments).forEach(id => {
    assignments[id] = (assignments[id] || []).filter(item => item !== name);
  });
  saveVideoAssignments(assignments);
  if (state.activeTag === name) state.activeTag = firstVisibleVideoTagName();
  render();
  showToast("\u5df2\u5220\u9664\u5206\u7ec4");
}

function openVideoGroupManager() {
  const groupItems = orderedVideoTagItems(true);
  state.view = "videoGroupManager";
  renderTopChips();
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">\u7ba1\u7406\u89c6\u9891\u5206\u7ec4</div>
        <div class="date">\u8fd9\u91cc\u7edf\u4e00\u7ba1\u7406\u9876\u90e8\u8fd9\u4e00\u6392\u5206\u7ec4\uff1a\u6240\u6709\u5206\u7ec4\u90fd\u53ef\u6539\u540d\u3001\u9690\u85cf/\u6062\u590d\u3001\u5220\u9664\u3002</div>
      </div>
      <div class="review-actions">
        <button class="open-btn" onclick="addVideoGroup();openVideoGroupManager()">+\u65b0\u589e\u5206\u7ec4</button>
        <button class="small-btn" onclick="renderDashboard()">\u8fd4\u56de\u770b\u677f</button>
      </div>
    </section>
    ${sectorImportPanelHtml("manager")}
    <section class="panel">
      <div class="panel-title">\u5df2\u6709\u5206\u7ec4</div>
      <div class="group-manage-list">
        ${groupItems.map((tag, index) => `
          <div class="group-manage-row ${tag.hidden || tag.deleted ? "muted-row" : ""}" style="${groupColorStyle(tag.color)}">
            <div>
              <b>${escapeHtml(tag.name)}${tag.deleted ? " \u00b7 \u5df2\u5220\u9664" : tag.hidden ? " \u00b7 \u5df2\u9690\u85cf" : ""}</b>
              <span>${tagCount(tag)} \u4e2a\u89c6\u9891 \u00b7 ${tag.isBuiltIn ? "\u7cfb\u7edf\u5206\u7ec4" : "\u81ea\u5efa\u5206\u7ec4"}${tag.color ? ` \u00b7 \u989c\u8272 ${tag.color}` : ""}</span>
            </div>
            <div>
              <button class="small-btn" onclick='pinVideoTag(${JSON.stringify(tag.id)})'>\u7f6e\u9876</button>
              <button class="small-btn" ${index === 0 ? "disabled" : ""} onclick='moveVideoTag(${JSON.stringify(tag.id)}, -1)'>\u4e0a\u79fb</button>
              <button class="small-btn" ${index === groupItems.length - 1 ? "disabled" : ""} onclick='moveVideoTag(${JSON.stringify(tag.id)}, 1)'>\u4e0b\u79fb</button>
              <button class="small-btn" onclick='cycleVideoTagColor(${JSON.stringify(tag.id)})'>\u989c\u8272</button>
              <button class="small-btn" onclick='${tag.isBuiltIn ? `renameBuiltInVideoTag(${JSON.stringify(tag.id)})` : `renameVideoGroup(${JSON.stringify(tag.name)})`}'>\u6539\u540d</button>
              <button class="small-btn" onclick='${tag.isBuiltIn ? `toggleBuiltInVideoTag(${JSON.stringify(tag.id)})` : `toggleVideoGroupHidden(${JSON.stringify(tag.name)})`}'>${tag.hidden ? "\u6062\u590d" : "\u9690\u85cf"}</button>
              ${tag.isBuiltIn
                ? (tag.deleted ? `<button class="small-btn" onclick='restoreBuiltInVideoTag(${JSON.stringify(tag.id)})'>\u6062\u590d</button>` : `<button class="small-btn danger-btn" onclick='deleteBuiltInVideoTag(${JSON.stringify(tag.id)})'>\u5220\u9664</button>`)
                : `<button class="small-btn danger-btn" onclick='deleteVideoGroup(${JSON.stringify(tag.name)})'>\u5220\u9664</button>`}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function addVideoToGroup(id) {
  const v = state.videos.find(item => item.id === id);
  if (!v) return;
  const existing = [...new Set([...tags.filter(t => t.type === "sector").map(t => sectorDisplayName(t)), ...readVideoGroups()])];
  const hint = existing.length ? `\n\n\u5df2\u6709\u5206\u7ec4\uff1a${existing.join(" / ")}` : "";
  const name = prompt(`\u628a\u8fd9\u6761\u89c6\u9891\u52a0\u5230\u54ea\u4e2a\u5206\u7ec4\uff1f${hint}`, existing[0] || "");
  if (!name) return;
  const groupName = name.trim();
  const assignments = readVideoAssignments();
  const current = new Set(assignments[id] || []);
  current.add(groupName);
  assignments[id] = [...current];
  saveVideoAssignments(assignments);
  const groups = readVideoGroups();
  groups.push(groupName);
  saveVideoGroups(groups);
  renderTopChips();
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
  showToast("\u5df2\u52a0\u5165\u89c6\u9891\u5206\u7ec4");
}

function removeVideoFromGroup(id, groupName) {
  const assignments = readVideoAssignments();
  assignments[id] = (assignments[id] || []).filter(name => name !== groupName);
  saveVideoAssignments(assignments);
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
}

function isModelTeacherVideo(v) {
  const author = String(v?.author || "");
  return String(v?.id || "").startsWith("v_") || author.includes("\u6a21\u578b\u5148\u751f") || author.includes("\u59af");
}

function libraryVideos() {
  return state.videos.filter(v => {
    if (v.isDocument) return true;
    if (isModelTeacherVideo(v)) return true;
    if (!v.userAdded) return false;
    const title = quickVideoTitle(v) || v.title || "";
    const topic = String(v.topic || "");
    if (isGenericVideoTitle(title) || topic.includes("\u6296\u97f3\u94fe\u63a5")) return false;
    return true;
  });
}

function tagCount(tag) {
  const matchNames = [tag.name, tag.originalName, sectorDisplayName(tag)].filter(Boolean);
  const base = libraryVideos();
  if (tag.type === "all") return base.length || tag.count;
  if (tag.type === "source") return base.length || tag.count;
  if (tag.type === "videoGroup") return base.filter(v => videoGroupsFor(v.id).includes(tag.name)).length;
  return base.filter(v => {
    const text = [v.topic, v.focus, v.title, v.transcript, ...videoGroupsFor(v.id)].join(" ");
    return matchNames.some(name => text.includes(name));
  }).length || tag.count;
}

function filteredVideos() {
  const q = state.search.trim().toLowerCase();
  const videos = libraryVideos().filter(v => {
    const active = allVideoTags().find(t => t.name === state.activeTag) || allVideoTags()[0];
    const joined = [v.topic, v.focus, v.title, v.transcript, ...videoGroupsFor(v.id)].join(" ");
    const matchNames = active ? [active.name, active.originalName, sectorDisplayName(active)].filter(Boolean) : [];
    const byTag = !active || active.type === "all"
      || (active.type === "source" ? isModelTeacherVideo(v) : matchNames.some(name => joined.includes(name)));
    const bySearch = !q || joined.toLowerCase().includes(q);
    return byTag && bySearch;
  });
  return videos.sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return String(a.title || "").localeCompare(String(b.title || ""), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
}

const XIAOKE_TRADITIONAL_MAP = {};

const XIAOKE_EMPTY_TEXT_MARKERS = [
  "暂无转录", "暂未转录", "待补充", "本地库暂无转录", "本地库暂无标题",
  "Douyin requires", "browser cookies", "cookies", "无法加载", "导入失败"
];

function toSimplifiedChinese(text) {
  return String(text || "");
}

function normalizeTranscriptText(text) {
  return toSimplifiedChinese(text)
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripVideoBrandText(title) {
  let value = toSimplifiedChinese(title);
  ["模型先生视频", "模型先生", "抖音视频（待补充）", "抖音视频"].forEach(word => {
    value = value.split(word).join("");
  });
  const lower = value.toLowerCase();
  const cutIdx = ["douyin requires", "browser cookies"].map(word => lower.indexOf(word)).filter(idx => idx >= 0).sort((a, b) => a - b)[0];
  if (cutIdx !== undefined) value = value.slice(0, cutIdx);
  value = value.replace(/^\d{4}-\d{2}-\d{2}\s*[|｜-]?\s*/, "");
  value = value.replace(/^[|｜-]+|[|｜-]+$/g, "").trim();
  return value.split(/\s+/).filter(Boolean).join(" ");
}

function isGenericVideoTitle(title) {
  const text = stripVideoBrandText(title);
  return !text
    || /^dy[_-]?\d+/i.test(text)
    || /^local[_-]/i.test(text)
    || /^\d{4}-\d{2}-\d{2}/.test(text)
    || /^(本地视频素材|视频素材|待补标题|未命名视频|未命名)$/.test(text)
    || XIAOKE_EMPTY_TEXT_MARKERS.some(marker => text.includes(marker));
}

function polishExtractedTitle(title) {
  let value = stripVideoBrandText(title)
    .replace(/^(今天|这个|其实|就是|那么|然后|所以|首先|关于|聊聊|讲讲|看看|看一下)/, "")
    .replace(/[，。！？；：、,.!?;:].*$/g, "")
    .trim();
  if (value.length > 32) value = value.slice(0, 32).replace(/[，。！？；：、,.!?;:].*$/g, "");
  return value.trim();
}

function extractOpeningTitleFromText(text) {
  const normalized = normalizeTranscriptText(text);
  if (isEmptyTranscript(normalized)) return "";
  const first = (normalized.split(/[。！？；\n]/)[0] || normalized).slice(0, 80);
  const candidate = polishExtractedTitle(first);
  return /[\u4e00-\u9fff]{4,}/.test(candidate) ? candidate : "";
}

function readVideoTextOverrides() {
  if (videoTextOverridesCache) return videoTextOverridesCache;
  try {
    const data = JSON.parse(localStorage.getItem(VIDEO_TEXT_KEY) || "{}");
    videoTextOverridesCache = data && typeof data === "object" ? data : {};
    return videoTextOverridesCache;
  } catch {
    videoTextOverridesCache = {};
    return videoTextOverridesCache;
  }
}

function getVideoTextOverride(videoOrId) {
  const id = typeof videoOrId === "string" ? videoOrId : (videoOrId && videoOrId.id);
  if (!id) return {};
  return readVideoTextOverrides()[id] || {};
}

function saveVideoTextOverride(id, patch = {}) {
  if (!id) return;
  const data = readVideoTextOverrides();
  data[id] = { ...(data[id] || {}), ...patch };
  videoTextOverridesCache = data;
  clearVideoRuntimeCache(id);
  localStorage.setItem(VIDEO_TEXT_KEY, JSON.stringify(data));
}

function rawVideoTranscript(v) {
  const extra = getVideoTextOverride(v).transcript;
  return extra !== undefined ? extra : (v.transcript || "");
}

function isEmptyTranscript(text) {
  const value = String(text || "").trim();
  return !value || /\?{4,}/.test(value) || XIAOKE_EMPTY_TEXT_MARKERS.some(marker => value.includes(marker));
}

function getVideoDetailTranscript(v) {
  if (videoRuntimeCache.transcript.has(v.id)) return videoRuntimeCache.transcript.get(v.id);
  const raw = rawVideoTranscript(v);
  const value = isEmptyTranscript(raw) ? "" : normalizeTranscriptText(raw);
  videoRuntimeCache.transcript.set(v.id, value);
  return value;
}

function coreVideoTitle(v) {
  if (videoRuntimeCache.title.has(v.id)) return videoRuntimeCache.title.get(v.id);
  const overrideTitle = stripVideoBrandText(getVideoTextOverride(v).title || "");
  const originalTitle = stripVideoBrandText(v.title || "");
  const derivedTitle = extractOpeningTitleFromText(rawVideoTranscript(v));
  if (overrideTitle && !isGenericVideoTitle(overrideTitle)) {
    videoRuntimeCache.title.set(v.id, overrideTitle);
    return overrideTitle;
  }
  if (originalTitle && !isGenericVideoTitle(originalTitle)) {
    videoRuntimeCache.title.set(v.id, originalTitle);
    return originalTitle;
  }
  if (derivedTitle) {
    videoRuntimeCache.title.set(v.id, derivedTitle);
    return derivedTitle;
  }
  return "寰呰ˉ鏍囬";
}

function getVideoDetailTitle(v) {
  return coreVideoTitle(v);
}

function cleanVideoCardTitle(v) {
  return coreVideoTitle(v);
}

function videoCardDisplayTitle(v) {
  return `${cleanVideoCardTitle(v)} | ${v.date || "-"} | ${compactMetric(v.likes || 0)}赞`;
}

function detailTextPanel(v) {
  const title = escapeHtml(getVideoDetailTitle(v));
  const transcript = escapeHtml(getVideoDetailTranscript(v));
  const transcribeButton = v.videoUrl
    ? `<button class="small-btn" id="transcribeBtn" onclick="transcribeVideo('${v.id}')">提取语音文字</button>`
    : `<button class="small-btn" id="transcribeBtn" disabled title="这条没有本地视频文件">需本地视频</button>`;
  return `
    <section class="detail-text-grid">
      <div class="text-card">
        <div class="text-card-head">
          <b>视频标题</b>
          <div class="mini-actions">
            <button class="small-btn" onclick="syncCurrentVideoTitle('${v.id}')">同步标题</button>
            ${v.videoUrl ? `<button class="small-btn" onclick="syncVideoTitleFromFrame('${v.id}')">识别画面标题</button>` : ""}
            <span>自动保存</span>
          </div>
        </div>
        <textarea id="detailTitleInput" class="title-textarea" oninput="saveVideoTextOverride('${v.id}', { title: this.value })">${title}</textarea>
      </div>
      <div class="text-card">
        <div class="text-card-head">
          <b>语音转文字</b>
          <div class="mini-actions">
            ${transcribeButton}
            <button class="open-btn" onclick="generateVideoAIAnalysis('${v.id}', true)">用文字重新分析</button>
          </div>
        </div>
        <textarea id="detailTranscriptInput" placeholder="把视频语音转成的文字粘贴到这里，AI 分析会优先读取这段内容。" oninput="saveVideoTextOverride('${v.id}', { transcript: this.value })">${transcript}</textarea>
      </div>
    </section>
  `;
}

function librarySearchHtml() {
  return `
    <div class="library-search-row">
      <label class="library-search">🔍<input id="librarySearchInput" value="${escapeHtml(state.search || "")}" placeholder="搜索视频标题、日期、题材、转录" oninput="setSearch(this.value)"></label>
      <button class="small-btn" onclick="state.search='';renderLibrary()">清空</button>
      <button class="small-btn" onclick="state.activeTag=tags[0].name;state.search='';renderLibrary();renderTopChips()">全部视频</button>
      <button class="small-btn" onclick="syncAllVideoTitles()">同步全部标题</button>
      <button class="small-btn" onclick="syncAllFrameTitles()">批量识别画面标题</button>
    </div>
  `;
}

function quickVideoTitle(v) {
  if (!v) return "";
  if (typeof getVideoDetailTitle === "function") return getVideoDetailTitle(v);
  if (typeof cleanVideoCardTitle === "function") return cleanVideoCardTitle(v);
  return String(v.title || "");
}

function quickVideoSearchText(v) {
  if (!v) return "";
  const structured = typeof readStructuredAnalyses === "function" ? readStructuredAnalyses()[v.id] : null;
  const savedAnalysis = typeof readVideoAnalyses === "function" ? readVideoAnalyses()[v.id] : "";
  const transcript = typeof rawVideoTranscript === "function" ? rawVideoTranscript(v) : (v.transcript || "");
  const groups = typeof videoGroupsFor === "function" ? videoGroupsFor(v.id) : [];
  return [
    quickVideoTitle(v),
    transcript,
    v.topic,
    v.focus,
    v.author,
    v.date,
    v.advice,
    v.risk,
    v.philosophy,
    savedAnalysis,
    structured && structured.summary,
    structured && structured.focus,
    structured && structured.opinion,
    structured && structured.stocks,
    structured && structured.strategy,
    structured && structured.risk,
    ...(Array.isArray(groups) ? groups : [])
  ].filter(Boolean).join(" ");
}

function tagCount(tag) {
  const matchNames = [tag.name, tag.originalName, sectorDisplayName(tag)].filter(Boolean);
  const base = libraryVideos();
  if (tag.type === "all") return base.length || tag.count;
  if (tag.type === "source") return base.length || tag.count;
  if (tag.type === "videoGroup") return base.filter(v => videoGroupsFor(v.id).includes(tag.name)).length;
  return base.filter(v => {
    const text = quickVideoSearchText(v);
    return matchNames.some(name => text.includes(name));
  }).length || tag.count;
}

function filteredVideos() {
  const q = state.search.trim().toLowerCase();
  const tagItems = allVideoTags();
  const active = tagItems.find(t => t.name === state.activeTag) || tagItems[0];
  const matchNames = active ? [active.name, active.originalName, sectorDisplayName(active)].filter(Boolean) : [];
  const videos = libraryVideos().filter(v => {
    const joined = quickVideoSearchText(v);
    const byTag = !active || active.type === "all"
      || (active.type === "source" ? isModelTeacherVideo(v) : matchNames.some(name => joined.includes(name)));
    const bySearch = !q || joined.toLowerCase().includes(q);
    return byTag && bySearch;
  });
  return videos.sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return cleanVideoCardTitle(a).localeCompare(cleanVideoCardTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
}

function syncDerivedVideoTitlesFromTranscripts() {
  const data = readVideoTextOverrides();
  let titleCount = 0;
  let transcriptCount = 0;
  state.videos.forEach(v => {
    const current = data[v.id] || {};
    const rawTranscriptText = current.transcript !== undefined ? current.transcript : (v.transcript || "");
    const normalizedTranscript = isEmptyTranscript(rawTranscriptText) ? "" : normalizeTranscriptText(rawTranscriptText);
    const patch = {};
    if (normalizedTranscript && normalizedTranscript !== rawTranscriptText) {
      patch.transcript = normalizedTranscript;
      transcriptCount += 1;
    }
    const currentTitle = current.title !== undefined ? current.title : (v.title || "");
    const derivedTitle = extractOpeningTitleFromText(normalizedTranscript || rawTranscriptText);
    if (derivedTitle && isGenericVideoTitle(currentTitle)) {
      patch.title = derivedTitle;
      titleCount += 1;
    }
    if (Object.keys(patch).length) {
      data[v.id] = { ...current, ...patch };
      Object.assign(v, patch);
    }
  });
  if (titleCount || transcriptCount) localStorage.setItem(VIDEO_TEXT_KEY, JSON.stringify(data));
  return { titleCount, transcriptCount };
}

function syncCurrentVideoTitle(id) {
  const v = state.videos.find(item => item.id === id);
  if (!v) return;
  const title = extractOpeningTitleFromText(rawVideoTranscript(v) || getVideoDetailTranscript(v));
  if (!title) {
    showToast("这条还没有可提炼标题的转写文字");
    return;
  }
  saveVideoTextOverride(id, { title });
  const input = document.getElementById("detailTitleInput");
  if (input) input.value = title;
  showToast("已同步视频标题");
  renderTopChips();
  if (state.view === "detail") renderDetail();
}

async function syncVideoTitleFromFrame(id, force = false) {
  const v = state.videos.find(item => item.id === id);
  if (!v || !v.videoUrl) {
    showToast("这条没有本地视频，不能识别画面标题");
    return "";
  }
  showToast("正在识别画面中央标题...");
  const response = await fetch("/api/ocr-video-title", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, videoUrl: v.videoUrl || "", originalUrl: v.originalUrl || "", force })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.error || "画面标题识别失败");
  }
  const title = stripVideoBrandText(data.title || "");
  if (!title) throw new Error("没有识别到可用标题");
  saveVideoTextOverride(id, { title });
  const input = document.getElementById("detailTitleInput");
  if (input) input.value = title;
  showToast(data.cached ? "已读取画面标题缓存" : "已识别画面标题");
  if (state.view === "detail") renderDetail();
  if (state.view === "library") renderLibrary();
  renderTopChips();
  return title;
}

function syncAllVideoTitles() {
  const result = syncDerivedVideoTitlesFromTranscripts();
  render();
  showToast(`已同步 ${result.titleCount} 个标题，整理 ${result.transcriptCount} 条转写`);
}

async function syncAllFrameTitles() {
  const targets = libraryVideos().filter(v => v.videoUrl);
  if (!targets.length) {
    showToast("没有可识别的本地视频");
    return;
  }
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < targets.length; i += 1) {
    const v = targets[i];
    showToast(`识别画面标题 ${i + 1}/${targets.length}`);
    try {
      await syncVideoTitleFromFrame(v.id);
      ok += 1;
    } catch {
      fail += 1;
    }
  }
  await scanLocalVideos();
  render();
  showToast(`画面标题同步完成：成功 ${ok} 条，失败 ${fail} 条`);
}

async function syncMissingFrameTitles(limit = 40) {
  const targets = libraryVideos().filter(v => v.videoUrl && isGenericVideoTitle(getVideoTextOverride(v).title || v.title)).slice(0, limit);
  let ok = 0;
  for (const v of targets) {
    try {
      await syncVideoTitleFromFrame(v.id);
      ok += 1;
    } catch {}
  }
  if (ok) render();
  return ok;
}

function videoGroupBadges(v) {
  return videoGroupsFor(v.id).map(name => `<button class="video-group-badge" onclick="event.stopPropagation();removeVideoFromGroup('${v.id}','${escapeHtml(name)}')">${escapeHtml(name)} 脳</button>`).join("");
}

function removeVideoStoreEntry(key, id) {
  const data = readJsonStore(key, {});
  if (!data || typeof data !== "object" || !Object.prototype.hasOwnProperty.call(data, id)) return;
  delete data[id];
  writeJsonStore(key, data);
}

function cleanupVideoRecords(id) {
  deleteVideoAnalysis(id);
  [VIDEO_TEXT_KEY, VIDEO_PIPELINE_KEY, VIDEO_LINKS_KEY, VIDEO_GROUP_ASSIGN_KEY].forEach(key => {
    removeVideoStoreEntry(key, id);
  });
}

function deleteVideo(id) {
  const video = state.videos.find(v => v.id === id);
  if (!video) return;
  const ok = confirm("\u786e\u5b9a\u4ece\u7d20\u6750\u5e93\u5220\u9664\u8fd9\u6761\u89c6\u9891\u8bb0\u5f55\u5417\uff1f\n\u5982\u679c\u662f\u672c\u5730\u89c6\u9891\uff0c\u53ea\u4f1a\u4ece\u5c0f\u53ef\u8bfe\u5802\u9690\u85cf\uff0c\u4e0d\u5220\u9664\u7535\u8111\u91cc\u7684\u89c6\u9891\u6587\u4ef6\u3002");
  if (!ok) return;
  markVideoDeleted(id);
  state.videos = state.videos.filter(v => v.id !== id);
  cleanupVideoRecords(id);
  saveUserVideos(state.videos);
  if (state.currentVideoId === id) {
    state.currentVideoId = state.videos[0] ? state.videos[0].id : "";
    state.view = "library";
  }
  showToast("\u5df2\u4ece\u7d20\u6750\u5e93\u5220\u9664");
  renderTopChips();
  render();
}

function videoCardHtml(v) {
  const media = v.thumbnail
    ? `<img src="${v.thumbnail}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover">`
    : v.videoUrl ? `<video src="${v.videoUrl}" muted preload="none"></video>` : `<div class="poster">\u94fe</div>`;
  const badge = v.isMetadata ? "\u5143\u6570\u636e" : v.local ? "\u672c\u5730" : "\u6837\u4f8b";
  const idArg = JSON.stringify(v.id).replace(/'/g, "&#39;");
  return `
    <article class="video-card" onclick='openDetail(${idArg})'>
      <div class="thumb">${media}<span class="play">${v.isMetadata ? "\u2197" : "\u25b6"}</span></div>
      <div class="vc-body">
        <h3>${escapeHtml(videoCardDisplayTitle(v))}</h3>
        <div class="metrics"><span>\u8d5e <strong>${v.likes || 0}</strong></span><span>\u8bc4 ${v.comments || 0}</span><span>\u8f6c ${v.shares || 0}</span></div>
        <div class="date" style="margin-top:7px">${badge} \u00b7 ${escapeHtml(v.topic || "-")}</div>
        ${pipelineBadgesHtml(v)}
        <div class="video-group-row">${linkBadgesHtml(v)}</div>
        <div class="video-group-row">${videoGroupBadges(v)}<button class="video-add-group" onclick='event.stopPropagation();addVideoToGroup(${idArg})'>+\u5206\u7ec4</button><button class="video-delete-btn" onclick='event.stopPropagation();deleteVideo(${idArg})'>\u5220\u9664</button></div>
      </div>
    </article>
  `;
}

function renderTopChips() {
  document.getElementById("topChips").innerHTML =
    `<button class="chip review-chip" onclick="openQuantWorkbenchWindow()">閲忓寲宸ヤ綔鍙?/button>` +
    `<button class="${state.view === "strategy" ? "chip active review-chip" : "chip review-chip"}" onclick="openStrategy()">\u6211\u7684\u7b56\u7565</button>` +
    `<button class="${state.view === "dailyReview" ? "chip active review-chip" : "chip review-chip"}" onclick="openDailyReview()">\u6bcf\u65e5\u590d\u76d8</button>` +
    `<button class="${state.view === "pipelineCenter" ? "chip active review-chip" : "chip review-chip"}" onclick="openPipelineCenter()">鑳藉姏涓績</button>` +
    `<button class="${state.view === "videoGroupManager" ? "chip active review-chip" : "chip review-chip"}" onclick="openVideoGroupManager()">\u7ba1\u7406\u5206\u7ec4</button>` +
    `<button class="${state.view === "sectorStrength" ? "chip active review-chip" : "chip review-chip"}" onclick="openSectorStrength()">鏉垮潡寮哄急</button>` +
    allVideoTags().map(t => chipHtml(t)).join("");
  const chips = document.getElementById("topChips");
  if (chips && !chips.querySelector("[data-sector-strength-chip]")) {
    const sectorChip = `<button data-sector-strength-chip="1" class="${state.view === "sectorStrength" ? "chip active review-chip" : "chip review-chip"}" onclick="openSectorStrength()">鏉垮潡寮哄急</button>`;
    chips.innerHTML = chips.innerHTML.replace(/(<button[^>]*openDailyReview\(\)[\s\S]*?<\/button>)/, `$1${sectorChip}`);
  }
}

function filterByTag(tag) {
  const exists = allVideoTags().some(item => item.name === tag || item.originalName === tag);
  if (exists) {
    state.activeTag = tag;
    state.search = "";
  } else {
    state.activeTag = tags[0].name;
    state.search = tag;
    const input = document.getElementById("searchInput");
    if (input) input.value = tag;
  }
  state.libraryLimit = 60;
  state.view = tag === tags[0].name ? "dashboard" : "library";
  render();
}

function render() {
  renderTopChips();
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  if (state.view === "dailyReview") renderDailyReview();
  if (state.view === "sectorStrength") renderSectorStrength();
  if (state.view === "sectorStrength") renderSectorStrength();
  if (state.view === "strategy") renderStrategy();
  if (state.view === "pipelineCenter") openPipelineCenter();
  if (state.view === "featureList") openFeatureList();
  if (state.view === "videoGroupManager") openVideoGroupManager();
}

const AGENT_PROMPT_TEMPLATE_KEY = "xiaoke_agent_prompt_templates_v1";
const MODEL_FRAMEWORK_NOTE_KEY = "xiaoke_model_framework_note_v1";

function agentClip(value, limit = 480) {
  const text = compactPlainText ? compactPlainText(String(value || ""), limit) : String(value || "").replace(/\s+/g, " ").trim();
  return text.length > limit ? text.slice(0, limit - 1) + "..." : text;
}

function agentTokens(value) {
  const text = String(value || "").toLowerCase();
  const ascii = text.match(/[a-z0-9_]{2,}/g) || [];
  const chinese = (text.match(/[\u4e00-\u9fa5]{2,}/g) || []).flatMap(part => {
    const tokens = [part];
    for (let i = 0; i < part.length - 1; i += 1) tokens.push(part.slice(i, i + 2));
    return tokens;
  });
  return [...new Set([...ascii, ...chinese])].slice(0, 80);
}

function agentScoreText(text, tokens) {
  const haystack = String(text || "").toLowerCase();
  return tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0);
}

function agentVideoSearchText(v) {
  const structured = readStructuredAnalyses()[v.id];
  const saved = readVideoAnalyses()[v.id] || "";
  const model = structured || {};
  return [
    quickVideoTitle(v),
    rawVideoTranscript(v),
    v.topic,
    v.focus,
    v.advice,
    v.risk,
    v.philosophy,
    model.summary,
    model.focus,
    model.opinion,
    model.advice,
    model.risk,
    model.philosophy,
    model.directory,
    saved,
    videoGroupsFor(v.id).join(" ")
  ].join("\n");
}

function agentVideoContext(v, index = 0) {
  const structured = readStructuredAnalyses()[v.id];
  const saved = readVideoAnalyses()[v.id] || "";
  const model = structured || analysisModel(v, saved || "");
  return [
    `${index + 1}. ${getVideoDetailTitle(v)} (${v.date || "-"})`,
    `主题/分组：${[v.topic, model.directory, ...videoGroupsFor(v.id)].filter(Boolean).join(" / ") || "-"}`,
    `核心观点：${agentClip(model.summary || model.opinion || "", 220)}`,
    `标的/板块：${agentClip(model.focus || v.focus || "", 160)}`,
    `操作建议：${agentClip(model.advice || v.advice || "", 180)}`,
    `风险边界：${agentClip(model.risk || v.risk || "", 180)}`,
    `哲学/心法：${agentClip(model.philosophy || v.philosophy || "", 180)}`,
    `原文摘录：${agentClip(getVideoDetailTranscript(v), 280)}`
  ].join("\n");
}

function relatedAgentVideos(query, limit = 8) {
  const current = state.videos.find(item => item.id === state.currentVideoId);
  const baseText = [query, state.activeTag, current && agentVideoSearchText(current)].filter(Boolean).join("\n");
  const tokens = agentTokens(baseText);
  if (!tokens.length) return libraryVideos().slice(0, limit);
  return libraryVideos()
    .map(v => ({ v, score: agentScoreText(agentVideoSearchText(v), tokens) + (v.id === state.currentVideoId ? 8 : 0) }))
    .filter(row => row.score > 0)
    .sort((a, b) => b.score - a.score || String(b.v.date || "").localeCompare(String(a.v.date || "")))
    .slice(0, limit)
    .map(row => row.v);
}

function agentWatchlistContext() {
  const items = typeof flattenWatchlist === "function" ? flattenWatchlist() : watchlist;
  return items
    .filter(item => item && item.name)
    .slice(0, 18)
    .map(item => `${item.name} | ${item.sector || item.group || "-"} | ${item.desc || ""}`)
    .join("\n");
}

function agentLocalContext(query = "") {
  const current = state.videos.find(item => item.id === state.currentVideoId);
  const summary = pipelineSummary(libraryVideos());
  const strategy = typeof readStrategy === "function" ? readStrategy() : {};
  const related = relatedAgentVideos(query, 8);
  const structuredCount = Object.keys(readStructuredAnalyses()).length;
  return [
    {
      role: "user",
      content: [
        "【当前看板】",
        `视图：${state.view}`,
        `分类：${state.activeTag}`,
        `排序：${state.sort}`,
        `素材总数：${libraryVideos().length}`,
        `已结构化分析：${structuredCount}`,
        `今日新增观点：${summary.today}`,
        `高置信素材：${summary.highConfidence}`,
        `风险待复盘：${summary.risk}`
      ].join("\n")
    },
    {
      role: "user",
      content: [
        "【我的长期策略与今日关注】",
        `今日任务：${agentClip(localStorage.getItem(DAILY_TASK_KEY) || "", 600) || "-"}`,
        `今日关注：${agentClip(localStorage.getItem(DAILY_FOCUS_KEY) || "", 600) || "-"}`,
        `策略正文：${agentClip(strategy.main || "", 900)}`,
        `入场条件：${agentClip(strategy.entry || "", 360)}`,
        `风险规则：${agentClip(strategy.risk || "", 360)}`,
        `仓位规则：${agentClip(strategy.position || "", 360)}`
      ].join("\n")
    },
    {
      role: "user",
      content: "【关注标的档案】\n" + agentWatchlistContext()
    },
    current ? {
      role: "user",
      content: "【当前素材完整分析】\n" + agentVideoContext(current, 0)
    } : null,
    {
      role: "user",
      content: "【全库检索到的相关素材】\n" + related.map(agentVideoContext).join("\n\n")
    }
  ].filter(Boolean);
}

function memoryResultToContext(result) {
  if (!result) return [];
  const notBookRelated = item => !/书籍|PDF|文档|读书|OCR|电子书/i.test(String(item && (item.text || item.user || item.assistant) || ""));
  const lines = [];
  const preferences = (result.preferences || []).filter(notBookRelated).slice(0, 6);
  if (preferences.length) {
    lines.push("【用户偏好】\n" + preferences.map(item => `- ${item.text}`).join("\n"));
  }
  const stockFocus = (result.stockFocus || []).filter(notBookRelated).slice(0, 8);
  if (stockFocus.length) {
    lines.push("【长期关注标的】\n" + stockFocus.map(item => `- ${item.text}`).join("\n"));
  }
  const memories = (result.memories || []).filter(notBookRelated).slice(0, 8);
  if (memories.length) {
    lines.push("【长期记忆】\n" + memories.map(item => `- ${item.text}`).join("\n"));
  }
  const conversations = (result.matchedConversations || []).filter(notBookRelated).slice(0, 3);
  if (conversations.length) {
    lines.push("【最近相关对话】\n" + conversations.map(item => `用户：${agentClip(item.user, 240)}\nAgent：${agentClip(item.assistant, 320)}`).join("\n\n"));
  }
  return lines.map(content => ({ role: "user", content }));
}

function collectAgentContext(query = "") {
  return agentLocalContext(query);
}

async function buildAgentContext(query) {
  const base = collectAgentContext(query);
  try {
    const response = await fetch("/api/agent-search-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, context: base })
    });
    const data = await response.json();
    if (data.success) return [...base, ...memoryResultToContext(data.result)];
  } catch {}
  return base;
}

function renderAgent() {
  document.getElementById("agent").innerHTML = `
    <div class="agent-head">
      <span><span class="logo" style="display:inline-grid;width:30px;height:30px;margin-right:10px"><img src="assets/xiaoke-icon-64.png" alt=""></span>小可 Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="setAgentProvider(this.value)"><option value="auto">小可协作</option></select>
        <span class="agent-status" id="agentStatus">检查模型...</span>
        <button class="auto-btn" onclick="setAgentProvider('auto')">自动分工</button>
        <button class="config-btn" onclick="openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles" id="agentRoles"></div>
    <div class="agent-tabs">
      <button class="primary" onclick="askAgent('investment')">投资主脑</button>
      <button onclick="askAgent('content')">内容主脑</button>
      <button onclick="askAgent('system')">系统主脑</button>
      <button onclick="askAgent('team')">三脑复盘</button>
      <button onclick="rememberCurrentAgentTurn()">记住这条</button>
      <button onclick="showAgentMemory()">查看记忆</button>
      <button onclick="clearAgentMemory()">清理记忆</button>
    </div>
    <div class="agent-chat" id="agentChat">
      <div class="bubble bot"><span class="route">小可课堂 / M-Model 知识库</span>我会先检索本地视频、文档、结构化分析、今日关注、策略和历史记忆，再回答你的问题。投资相关回答只做复盘辅助和风险提示。</div>
    </div>
    <div class="agent-input"><input id="agentInput" placeholder="问标的、题材、模型先生观点、我的关注..." onkeydown="if(event.key==='Enter')sendAgent()"><button onclick="sendAgent()">发送</button></div>
  `;
  loadAgentProviders();
}

async function callAgentProvider(provider, message, contextOverride = null, routeLabel = "") {
  const context = contextOverride || await buildAgentContext(message);
  const response = await fetch("/api/agent-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, message, context, route: routeLabel })
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || "model failed");
  return data.answer;
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>正在检索本地知识库...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const responseMode = /详细|完整|研报|深度|后续趋势|目标价格/.test(text) ? "professional" : getAgentResponseMode();
    const context = await buildAgentContext(text, responseMode);
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "作为 WorkBuddy 投资主脑，请基于上下文先分析投资逻辑、观察点和风险边界：\n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt, context, route.label);
      const contentPrompt = "作为内容主脑，请把下面的投资分析改写成通俗、有条理的小课堂表达：\n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt, context, route.label);
      answer = "WorkBuddy 投资判断\n" + invest + "\n\n内容主脑表达\n" + content + "\n\nCodex 系统建议\n" + codexSystemAnswer(text);
    } else {
      answer = await callAgentProvider(route.provider, text, context, route.label);
    }
    window.lastAgentTurn = { user: text, assistant: answer, route: route.label, at: new Date().toISOString() };
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(answer).replace(/\n/g, "<br>");
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

async function rememberCurrentAgentTurn() {
  if (!window.lastAgentTurn) return showToast("先和 Agent 聊一条，再记住它");
  const text = `用户问题：${window.lastAgentTurn.user}\nAgent 回答：${window.lastAgentTurn.assistant}`;
  const response = await fetch("/api/agent-memory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "add", type: "memory", source: "agent-turn", text })
  });
  const data = await response.json().catch(() => ({}));
  showToast(data.success ? "已写入长期记忆" : (data.error || "记忆保存失败"));
}

async function showAgentMemory() {
  const chat = document.getElementById("agentChat");
  const response = await fetch("/api/agent-memory");
  const data = await response.json().catch(() => ({}));
  if (!data.success) return showToast("读取记忆失败");
  const memory = data.memory || {};
  const summary = [
    `对话记录：${(memory.conversations || []).length} 条`,
    `长期记忆：${(memory.memories || []).length} 条`,
    `用户偏好：${(memory.preferences || []).length} 条`,
    `关注标的：${(memory.stockFocus || []).length} 条`,
    "",
    ...(memory.memories || []).slice(-6).reverse().map(item => `- ${agentClip(item.text, 180)}`)
  ].join("\n");
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">记忆库</span>${escapeHtml(summary).replace(/\n/g, "<br>")}</div>`);
  chat.scrollTop = chat.scrollHeight;
}

async function clearAgentMemory() {
  if (!confirm("确定清理 Agent 的长期记忆和对话记录吗？")) return;
  const response = await fetch("/api/agent-memory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "clear" })
  });
  const data = await response.json().catch(() => ({}));
  window.lastAgentTurn = null;
  showToast(data.success ? "Agent 记忆已清理" : (data.error || "清理失败"));
}

function defaultPromptTemplate() {
  return [
    "股票分析固定规则：",
    "1. 先融合价值投资、产业逻辑和技术结构，不只看短线情绪。",
    "2. 结合主力阶段：建仓、洗盘、拉升、回踩、出货，判断当前状态。",
    "3. 参考公司基本面、行业政策、资金流向、市场情绪、技术指标；缺数据必须写“未知”，禁止编造实时股价和预测价。",
    "4. 输出字段：个股名称、当前股价、3日/5日/10日/20日观察、上涨概率或未知、筹码峰状态、主力阶段、操作建议、风险边界、需要继续观察的数据。",
    "5. 投资回答只作复盘辅助，不给确定性买卖指令。"
  ].join("\n");
}

function readPromptTemplate() {
  return localStorage.getItem(AGENT_PROMPT_TEMPLATE_KEY) || defaultPromptTemplate();
}

function savePromptTemplate(value) {
  localStorage.setItem(AGENT_PROMPT_TEMPLATE_KEY, value);
}

function saveModelFrameworkNote(value) {
  localStorage.setItem(MODEL_FRAMEWORK_NOTE_KEY, value);
}

function usePromptTemplate() {
  const agent = document.getElementById("agent");
  if (agent && !agent.classList.contains("open")) toggleAgent();
  const input = document.getElementById("agentInput");
  if (input) {
    input.value = readPromptTemplate() + "\n\n请分析：";
    input.focus();
  }
}

function frameworkRows() {
  const definitions = [
    ["质变", ["质变", "变化", "转折", "突破", "催化"]],
    ["趋势", ["趋势", "主线", "顺势", "阶段", "周期"]],
    ["买点", ["买点", "低吸", "回踩", "承接", "分歧"]],
    ["等待", ["等待", "耐心", "守株", "时空", "不急"]],
    ["风控", ["风险", "回撤", "高位", "止损", "谨慎"]],
    ["仓位", ["仓位", "加仓", "减仓", "试错", "重仓"]],
    ["交易执行", ["执行", "纪律", "模式", "计划", "复盘"]],
    ["哲学心法", ["哲学", "心法", "认知", "逻辑", "辩证"]]
  ];
  const videos = libraryVideos();
  return definitions.map(([name, keys]) => {
    const matches = videos
      .map(v => ({ v, score: agentScoreText(agentVideoSearchText(v), keys) }))
      .filter(row => row.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(row => row.v);
    return { name, keys, matches };
  });
}

function stockProfileCards() {
  const stocks = (typeof flattenWatchlist === "function" ? flattenWatchlist() : watchlist)
    .filter(item => item && item.name && item.sector !== "指数")
    .slice(0, 10);
  return stocks.map(item => {
    const related = relatedAgentVideos(item.name, 4);
    const latest = related[0];
    const model = latest ? (readStructuredAnalyses()[latest.id] || analysisModel(latest, readVideoAnalyses()[latest.id] || "")) : null;
    return `
      <div class="panel" style="min-height:150px">
        <div class="panel-title">${escapeHtml(item.name)}</div>
        <div class="date">${escapeHtml(item.sector || item.group || "-")} · 相关素材 ${related.length} 条</div>
        <p style="color:var(--muted);line-height:1.7">${escapeHtml(agentClip(item.desc || "", 120))}</p>
        <p style="line-height:1.7"><strong>最近结论：</strong>${escapeHtml(agentClip(model ? (model.summary || model.opinion) : "暂无结构化分析", 150))}</p>
        <p style="color:var(--danger);line-height:1.7"><strong>风险：</strong>${escapeHtml(agentClip(model ? model.risk : "等待补充视频分析", 130))}</p>
      </div>
    `;
  }).join("");
}

function openModelFramework() {
  state.view = "modelFramework";
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  render();
}

function renderModelFramework() {
  state.view = "modelFramework";
  const rows = frameworkRows();
  const note = localStorage.getItem(MODEL_FRAMEWORK_NOTE_KEY) || "";
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">从全库已分析视频里沉淀长期原则，并把个股档案、提示词模板和 Agent 记忆串起来。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="usePromptTemplate()">套用提示词</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="decision-grid">
      ${rows.map(row => `
        <div class="panel">
          <div class="panel-title">${escapeHtml(row.name)} <span class="date">(${row.matches.length})</span></div>
          <div class="video-group-row">${row.keys.map(key => `<span class="video-group-badge">${escapeHtml(key)}</span>`).join("")}</div>
          <p style="color:var(--muted);line-height:1.7">${row.matches.map(v => escapeHtml(getVideoDetailTitle(v))).join("<br>") || "等待更多结构化分析沉淀。"}</p>
        </div>
      `).join("")}
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="strategy-textarea" style="min-height:150px" oninput="saveModelFrameworkNote(this.value)" placeholder="把你认可的长期原则写在这里，例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(note)}</textarea>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">提示词模板库</div>
      <textarea class="strategy-textarea" style="min-height:210px" oninput="savePromptTemplate(this.value)">${escapeHtml(readPromptTemplate())}</textarea>
      <button class="small-btn" style="margin-top:10px" onclick="usePromptTemplate()">发送到 Agent 输入框</button>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">个股档案</div>
      <div class="decision-grid">${stockProfileCards()}</div>
    </section>
  `;
}

function renderTopChips() {
  document.getElementById("topChips").innerHTML =
    `<button class="${state.view === "strategy" ? "chip active review-chip" : "chip review-chip"}" onclick="openStrategy()">我的策略</button>` +
    `<button class="${state.view === "dailyReview" ? "chip active review-chip" : "chip review-chip"}" onclick="openDailyReview()">每日复盘</button>` +
    `<button class="${state.view === "modelFramework" ? "chip active review-chip" : "chip review-chip"}" onclick="openModelFramework()">模型框架</button>` +
    `<button class="${state.view === "pipelineCenter" ? "chip active review-chip" : "chip review-chip"}" onclick="openPipelineCenter()">能力中心</button>` +
    `<button class="${state.view === "videoGroupManager" ? "chip active review-chip" : "chip review-chip"}" onclick="openVideoGroupManager()">管理分组</button>` +
    allVideoTags().map(t => chipHtml(t)).join("");
}

function render() {
  renderTopChips();
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  if (state.view === "dailyReview") renderDailyReview();
  if (state.view === "strategy") renderStrategy();
  if (state.view === "modelFramework") renderModelFramework();
  if (state.view === "pipelineCenter") openPipelineCenter();
  if (state.view === "featureList") openFeatureList();
  if (state.view === "videoGroupManager") openVideoGroupManager();
}

function agentKnownStockNames() {
  const items = typeof flattenWatchlist === "function" ? flattenWatchlist() : watchlist;
  return [...new Set(items.map(item => item && item.name).filter(Boolean))]
    .filter(name => name.length >= 2 && !/指数$/.test(name));
}

async function saveAgentMemoryQuiet(type, text, tags = []) {
  if (!String(text || "").trim()) return false;
  try {
    const response = await fetch("/api/agent-memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", type, text, tags, source: "auto" })
    });
    const data = await response.json().catch(() => ({}));
    return Boolean(data.success);
  } catch {
    return false;
  }
}

async function autoPersistAgentMemory(userText, answerText, routeLabel = "") {
  const text = String(userText || "");
  const allText = `${text}\n${answerText || ""}`;
  const stocks = agentKnownStockNames().filter(name => allText.includes(name)).slice(0, 8);
  const tasks = [];
  if (stocks.length) {
    tasks.push(saveAgentMemoryQuiet("stock_focus", `关注标的：${stocks.join("、")}。来源问题：${agentClip(text, 180)}`, stocks));
  }
  if (/记住|以后|我的偏好|我偏好|我喜欢|我不喜欢|我的策略|我的框架|原则/.test(text)) {
    tasks.push(saveAgentMemoryQuiet("preference", `用户偏好/规则：${agentClip(text, 420)}`, ["preference"]));
  }
  if (/今日关注|最近关注|重点跟踪|观察池|自选|我的持仓|仓位/.test(text)) {
    tasks.push(saveAgentMemoryQuiet("memory", `阶段性关注：${agentClip(text, 420)}`, ["focus"]));
  }
  if (/复盘|结论|风险边界|操作纪律|交易规则/.test(answerText || "") && /记住|沉淀|保存/.test(text)) {
    tasks.push(saveAgentMemoryQuiet("memory", `沉淀结论：${agentClip(answerText, 650)}`, ["lesson", routeLabel]));
  }
  if (tasks.length) await Promise.all(tasks);
}

async function rememberAgentFocusFromInput() {
  const input = document.getElementById("agentInput");
  const text = input ? input.value.trim() : "";
  if (!text) return showToast("先在输入框写关注标的");
  const stocks = agentKnownStockNames().filter(name => text.includes(name));
  const saved = await saveAgentMemoryQuiet("stock_focus", `关注标的：${stocks.length ? stocks.join("、") : agentClip(text, 180)}。备注：${agentClip(text, 260)}`, stocks);
  showToast(saved ? "已记住关注标的" : "保存失败");
}

async function rememberAgentPreferenceFromInput() {
  const input = document.getElementById("agentInput");
  const text = input ? input.value.trim() : "";
  if (!text) return showToast("先在输入框写偏好或规则");
  const saved = await saveAgentMemoryQuiet("preference", `用户偏好/规则：${agentClip(text, 420)}`, ["preference"]);
  showToast(saved ? "已记住偏好规则" : "保存失败");
}

function openAgentWithQuestion(question, forcedMode = "investment", autoSend = true) {
  const panel = document.getElementById("agent");
  if (panel && !panel.classList.contains("open")) toggleAgent();
  const input = document.getElementById("agentInput");
  if (!input) return;
  input.value = question;
  input.focus();
  if (autoSend) setTimeout(() => sendAgent(forcedMode), 30);
}

function askStockProfile(name) {
  openAgentWithQuestion(`模型先生怎么看 ${name}？请结合历史视频、结构化分析、我的策略和风险边界回答。`, "investment", true);
}

function askFrameworkTopic(name) {
  openAgentWithQuestion(`请总结模型先生关于“${name}”的长期框架，引用相关视频结论，并整理成可执行的复盘规则。`, "investment", true);
}

async function rememberCurrentDocumentNote(id) {
  const v = state.videos.find(item => item.id === id);
  if (!v) return;
  const title = getVideoDetailTitle(v);
  const note = getVideoDetailTranscript(v);
  const model = readStructuredAnalyses()[id] || analysisModel(v, readVideoAnalyses()[id] || "");
  const text = [
    `书籍/文档：${title}`,
    `摘要/笔记：${agentClip(note || model.summary || "", 900)}`,
    `风险/启发：${agentClip(model.risk || model.philosophy || "", 420)}`
  ].join("\n");
  const saved = await saveAgentMemoryQuiet("memory", text, ["document", title]);
  showToast(saved ? "文档笔记已沉淀进 Agent 记忆" : "保存失败");
}

function documentMemoryActionHtml(v) {
  if (!v || !v.isDocument) return "";
  return `<div class="analysis-actions"><button class="small-btn" onclick="rememberCurrentDocumentNote('${v.id}')">沉淀为读书记忆</button>${v.documentUrl || v.originalUrl ? `<button class="small-btn" onclick='window.open(${JSON.stringify(v.documentUrl || v.originalUrl)}, "_blank")'>打开原文</button>` : ""}</div>`;
}

function analysisHtml(v) {
  const saved = readVideoAnalyses()[v.id];
  const structured = readStructuredAnalyses()[v.id];
  const transcript = getVideoDetailTranscript(v);
  const title = getVideoDetailTitle(v);
  const model = analysisModel(v, saved || "", structured);
  const actionText = saved ? "重新生成 AI 分析" : "生成 AI 分析";
  const hint = !saved && isEmptyTranscript(transcript)
    ? analysisCardHtml("blue", "先补充正文/转录", `这条素材目前主要只有标题：${title}。补充视频转录、PDF/Word 摘要或读书笔记后，分析会更准。`)
    : "";
  const links = videoLinksFor(v.id);
  const linkText = uniqueClean([...links.stocks, ...links.sectors, ...links.groups, ...(model.directory ? [model.directory] : [])]).join(" / ") || "待 AI 识别或手动加入分组";
  const confirm = links.pending ? `<div class="analysis-actions"><button class="small-btn" onclick="confirmVideoLinks('${v.id}')">确认关联到分组/标的</button></div>` : "";
  const safeTitle = escapeHtml(title).replace(/'/g, "\\'");
  return `
    <div class="analysis-actions"><button class="open-btn" onclick="generateVideoAIAnalysis('${v.id}', true)">${actionText}</button><button class="small-btn" onclick="openAgentWithQuestion('请围绕素材《${safeTitle}》继续追问：核心观点、风险边界、可沉淀规则是什么？','investment',true)">问 Agent</button></div>
    ${documentMemoryActionHtml(v)}
    ${hint}
    ${analysisCardHtml("green", "关注标的", model.focus)}
    ${analysisCardHtml("blue", "核心观点", model.summary)}
    ${analysisCardHtml("blue", "观点提炼", model.opinion || model.summary)}
    ${analysisCardHtml("green", "股票/板块关联", linkText)}
    ${analysisCardHtml("blue", "操作建议", model.advice)}
    ${analysisCardHtml("red", "风险边界", model.risk)}
    ${analysisCardHtml("gold", "哲学/心法", model.philosophy)}
    <div class="analysis-card"><h3>置信度评分：<span style="color:var(--green)">${escapeHtml(model.confidence)}</span></h3><p>${escapeHtml(isEmptyTranscript(transcript) ? "当前主要基于标题和互动数据；补充正文/转录后可提高可信度。" : "已结合标题、互动数据和正文/转录；仍建议人工复核。")}</p></div>
    ${confirm}
  `;
}

function stockProfileCards() {
  const stocks = (typeof flattenWatchlist === "function" ? flattenWatchlist() : watchlist)
    .filter(item => item && item.name && item.sector !== "指数")
    .slice(0, 12);
  return stocks.map(item => {
    const related = relatedAgentVideos(item.name, 5);
    const latest = related[0];
    const model = latest ? (readStructuredAnalyses()[latest.id] || analysisModel(latest, readVideoAnalyses()[latest.id] || "")) : null;
    return `
      <div class="panel" style="min-height:170px">
        <div class="panel-title">${escapeHtml(item.name)}</div>
        <div class="date">${escapeHtml(item.sector || item.group || "-")} · 相关素材 ${related.length} 条</div>
        <p style="color:var(--muted);line-height:1.7">${escapeHtml(agentClip(item.desc || "", 120))}</p>
        <p style="line-height:1.7"><strong>最近结论：</strong>${escapeHtml(agentClip(model ? (model.summary || model.opinion) : "暂无结构化分析", 150))}</p>
        <p style="color:var(--danger);line-height:1.7"><strong>风险：</strong>${escapeHtml(agentClip(model ? model.risk : "等待补充视频分析", 130))}</p>
        <div class="analysis-actions"><button class="small-btn" onclick='askStockProfile(${JSON.stringify(item.name)})'>问 Agent</button><button class="small-btn" onclick='filterByStock(${JSON.stringify(item.name)})'>查看素材</button></div>
      </div>
    `;
  }).join("");
}

function renderModelFramework() {
  state.view = "modelFramework";
  const rows = frameworkRows();
  const note = localStorage.getItem(MODEL_FRAMEWORK_NOTE_KEY) || "";
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">从全库已分析视频里沉淀长期原则，并把个股档案、提示词模板和 Agent 记忆串起来。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="usePromptTemplate()">套用提示词</button>
        <button class="small-btn" onclick="showAgentMemory()">查看记忆</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="decision-grid">
      ${rows.map(row => `
        <div class="panel">
          <div class="panel-title">${escapeHtml(row.name)} <span class="date">(${row.matches.length})</span></div>
          <div class="video-group-row">${row.keys.map(key => `<span class="video-group-badge">${escapeHtml(key)}</span>`).join("")}</div>
          <p style="color:var(--muted);line-height:1.7">${row.matches.map(v => escapeHtml(getVideoDetailTitle(v))).join("<br>") || "等待更多结构化分析沉淀。"}</p>
          <button class="small-btn" onclick='askFrameworkTopic(${JSON.stringify(row.name)})'>让 Agent 总结这条框架</button>
        </div>
      `).join("")}
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="strategy-textarea" style="min-height:150px" oninput="saveModelFrameworkNote(this.value)" placeholder="把你认可的长期原则写在这里，例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(note)}</textarea>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">提示词模板库</div>
      <textarea class="strategy-textarea" style="min-height:210px" oninput="savePromptTemplate(this.value)">${escapeHtml(readPromptTemplate())}</textarea>
      <button class="small-btn" style="margin-top:10px" onclick="usePromptTemplate()">发送到 Agent 输入框</button>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">个股档案</div>
      <div class="decision-grid">${stockProfileCards()}</div>
    </section>
  `;
}

function renderAgent() {
  document.getElementById("agent").innerHTML = `
    <div class="agent-head">
      <span><span class="logo" style="display:inline-grid;width:30px;height:30px;margin-right:10px"><img src="assets/xiaoke-icon-64.png" alt=""></span>小可 Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="setAgentProvider(this.value)"><option value="auto">小可协作</option></select>
        <span class="agent-status" id="agentStatus">检查模型...</span>
        <button class="auto-btn" onclick="setAgentProvider('auto')">自动分工</button>
        <button class="config-btn" onclick="openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles" id="agentRoles"></div>
    <div class="agent-tabs">
      <button class="primary" onclick="askAgent('investment')">投资主脑</button>
      <button onclick="askAgent('content')">内容主脑</button>
      <button onclick="askAgent('system')">系统主脑</button>
      <button onclick="askAgent('team')">三脑复盘</button>
      <button onclick="rememberCurrentAgentTurn()">记住这条</button>
      <button onclick="rememberAgentFocusFromInput()">记住关注</button>
      <button onclick="rememberAgentPreferenceFromInput()">记住偏好</button>
      <button onclick="showAgentMemory()">查看记忆</button>
      <button onclick="clearAgentMemory()">清理记忆</button>
    </div>
    <div class="agent-chat" id="agentChat">
      <div class="bubble bot"><span class="route">小可课堂 / M-Model 知识库</span>我会检索本地视频、文档、结构化分析、今日关注、策略和历史记忆。你提到“记住、偏好、关注标的”时，我会自动沉淀进长期记忆。</div>
    </div>
    <div class="agent-input"><input id="agentInput" placeholder="问标的、题材、模型先生观点、我的关注..." onkeydown="if(event.key==='Enter')sendAgent()"><button onclick="sendAgent()">发送</button></div>
  `;
  loadAgentProviders();
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>正在检索本地知识库和记忆...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const responseMode = /详细|完整|研报|深度|后续趋势|目标价格/.test(text) ? "professional" : getAgentResponseMode();
    const context = await buildAgentContext(text, responseMode);
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "作为 WorkBuddy 投资主脑，请基于上下文先分析投资逻辑、观察点和风险边界：\n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt, context, route.label);
      const contentPrompt = "作为内容主脑，请把下面的投资分析改写成通俗、有条理的小课堂表达：\n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt, context, route.label);
      answer = "WorkBuddy 投资判断\n" + invest + "\n\n内容主脑表达\n" + content + "\n\nCodex 系统建议\n" + codexSystemAnswer(text);
    } else {
      answer = await callAgentProvider(route.provider, text, context, route.label);
    }
    window.lastAgentTurn = { user: text, assistant: answer, route: route.label, at: new Date().toISOString() };
    await autoPersistAgentMemory(text, answer, route.label);
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(answer).replace(/\n/g, "<br>");
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

async function showAgentMemory() {
  const chat = document.getElementById("agentChat");
  const response = await fetch("/api/agent-memory");
  const data = await response.json().catch(() => ({}));
  if (!data.success) return showToast("读取记忆失败");
  const memory = data.memory || {};
  const block = (title, rows) => rows && rows.length
    ? `${title}\n${rows.slice(-8).reverse().map(item => `- ${agentClip(item.text, 180)}`).join("\n")}`
    : `${title}\n- 暂无`;
  const summary = [
    `对话记录：${(memory.conversations || []).length} 条`,
    `长期记忆：${(memory.memories || []).length} 条`,
    `用户偏好：${(memory.preferences || []).length} 条`,
    `关注标的：${(memory.stockFocus || []).length} 条`,
    "",
    block("关注标的", memory.stockFocus || []),
    "",
    block("用户偏好", memory.preferences || []),
    "",
    block("长期记忆", memory.memories || [])
  ].join("\n");
  if (chat) {
    chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">记忆库</span>${escapeHtml(summary).replace(/\n/g, "<br>")}</div>`);
    chat.scrollTop = chat.scrollHeight;
  } else {
    showToast(`记忆：${(memory.memories || []).length} 条，关注：${(memory.stockFocus || []).length} 条`);
  }
}

function rankedAgentVideos(query, limit = 10) {
  const current = state.videos.find(item => item.id === state.currentVideoId);
  const baseText = String(query || state.activeTag || "");
  const tokens = agentTokens(baseText);
  const minimumScore = tokens.length >= 4 ? 3 : tokens.length >= 2 ? 2 : 1;
  const rows = libraryVideos().filter(v => !v.isDocument && !xiaokeIsBookDocument(v)).map(v => {
    const score = tokens.length ? agentScoreText(agentVideoSearchText(v), tokens) : 1;
    return { v, score };
  });
  return rows
    .filter(row => row.score >= minimumScore)
    .sort((a, b) => b.score - a.score || String(b.v.date || "").localeCompare(String(a.v.date || "")))
    .slice(0, limit);
}

function relatedAgentVideos(query, limit = 8) {
  return rankedAgentVideos(query, limit).map(row => row.v);
}

function agentEvidenceItems(query, limit = 8) {
  return rankedAgentVideos(query, limit).map((row, index) => {
    const v = row.v;
    const model = readStructuredAnalyses()[v.id] || analysisModel(v, readVideoAnalyses()[v.id] || "");
    return {
      no: index + 1,
      id: v.id,
      title: getVideoDetailTitle(v),
      date: v.date || "",
      type: v.isDocument ? (v.documentType || "文档") : (v.isMetadata ? "链接" : "视频"),
      topic: v.topic || model.directory || "",
      focus: model.focus || v.focus || "",
      summary: model.summary || model.opinion || "",
      risk: model.risk || "",
      score: row.score
    };
  });
}

function agentEvidenceContext(evidence) {
  if (!evidence || !evidence.length) {
    return { role: "user", content: "【回答证据包】未检索到明确来源。回答时必须说明缺少直接素材，不要编造引用。" };
  }
  const lines = evidence.map(item => [
    `[${item.no}] ${item.title}`,
    `类型：${item.type}；日期：${item.date || "-"}；主题：${item.topic || "-"}`,
    `标的/板块：${agentClip(item.focus, 120) || "-"}`,
    `核心观点：${agentClip(item.summary, 220) || "-"}`,
    `风险边界：${agentClip(item.risk, 160) || "-"}`
  ].join("\n"));
  return {
    role: "user",
    content: "【回答证据包】回答需要优先基于这些来源；引用素材时用 [1]、[2] 这种编号。若证据不足，明确说缺数据。\n" + lines.join("\n\n")
  };
}

function agentSourcesHtml(evidence) {
  if (!evidence || !evidence.length) return "";
  return `
    <div class="agent-source-list" style="margin-top:12px;border-top:1px solid var(--line);padding-top:10px">
      <div class="date" style="margin-bottom:8px">引用来源</div>
      ${evidence.slice(0, 6).map(item => `
        <button class="small-btn" style="margin:0 6px 6px 0;max-width:100%;white-space:normal;text-align:left" onclick='openDetail(${JSON.stringify(item.id)})'>
          [${item.no}] ${escapeHtml(agentClip(item.title, 34))}
        </button>
      `).join("")}
    </div>
  `;
}

function showAgentEvidence() {
  const chat = document.getElementById("agentChat");
  const evidence = window.lastAgentEvidence || window.currentAgentEvidence || [];
  if (!chat) return;
  if (!evidence.length) {
    chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">证据包</span>这次还没有可展示的引用来源。</div>`);
    return;
  }
  const html = evidence.map(item => `
    <div style="margin:0 0 10px">
      <button class="small-btn" onclick='openDetail(${JSON.stringify(item.id)})'>[${item.no}] 打开</button>
      <strong>${escapeHtml(item.title)}</strong>
      <div class="date">${escapeHtml(item.type)} · ${escapeHtml(item.date || "-")} · ${escapeHtml(item.topic || "-")}</div>
      <div>${escapeHtml(agentClip(item.summary || item.focus || "", 180))}</div>
    </div>
  `).join("");
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">证据包</span>${html}</div>`);
  chat.scrollTop = chat.scrollHeight;
}

function agentLocalContext(query = "") {
  const current = state.videos.find(item => item.id === state.currentVideoId && !item.isDocument && !xiaokeIsBookDocument(item));
  const summary = pipelineSummary(libraryVideos());
  const strategy = typeof readStrategy === "function" ? readStrategy() : {};
  const evidence = agentEvidenceItems(query, 6);
  window.currentAgentEvidence = evidence;
  const related = evidence.map(item => state.videos.find(v => v.id === item.id)).filter(Boolean);
  const structuredCount = Object.keys(readStructuredAnalyses()).length;
  return [
    {
      role: "user",
      content: [
        "【当前看板】",
        `视图：${state.view}`,
        `分类：${state.activeTag}`,
        `排序：${state.sort}`,
        `素材总数：${libraryVideos().length}`,
        `已结构化分析：${structuredCount}`,
        `今日新增观点：${summary.today}`,
        `高置信素材：${summary.highConfidence}`,
        `风险待复盘：${summary.risk}`
      ].join("\n")
    },
    {
      role: "user",
      content: [
        "【我的长期策略与今日关注】",
        `今日任务：${agentClip(localStorage.getItem(DAILY_TASK_KEY) || "", 600) || "-"}`,
        `今日关注：${agentClip(localStorage.getItem(DAILY_FOCUS_KEY) || "", 600) || "-"}`,
        `策略正文：${agentClip(strategy.main || "", 900)}`,
        `入场条件：${agentClip(strategy.entry || "", 360)}`,
        `风险规则：${agentClip(strategy.risk || "", 360)}`,
        `仓位规则：${agentClip(strategy.position || "", 360)}`
      ].join("\n")
    },
    { role: "user", content: "【关注标的档案】\n" + agentWatchlistContext() },
    agentEvidenceContext(evidence),
    current ? { role: "user", content: "【当前素材完整分析】\n" + agentVideoContext(current, 0) } : null,
    { role: "user", content: "【视频库检索到的相关素材】\n" + (related.length ? related.map(agentVideoContext).join("\n\n") : "未检索到高相关视频，不用低相关素材凑数。") }
  ].filter(Boolean);
}

async function buildAgentContext(query) {
  const base = collectAgentContext(query);
  try {
    const response = await fetch("/api/agent-search-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, context: base })
    });
    const data = await response.json();
    if (data.success) return [...base, ...memoryResultToContext(data.result)];
  } catch {}
  return base;
}

function renderAgent() {
  document.getElementById("agent").innerHTML = `
    <div class="agent-head">
      <span><span class="logo" style="display:inline-grid;width:30px;height:30px;margin-right:10px"><img src="assets/xiaoke-icon-64.png" alt=""></span>小可 Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="setAgentProvider(this.value)"><option value="auto">小可协作</option></select>
        <span class="agent-status" id="agentStatus">检查模型...</span>
        <button class="auto-btn" onclick="setAgentProvider('auto')">自动分工</button>
        <button class="config-btn" onclick="openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles" id="agentRoles"></div>
    <div class="agent-tabs">
      <button class="primary" onclick="askAgent('investment')">鎶曡祫涓昏剳</button>
      <button onclick="askAgent('content')">鍐呭涓昏剳</button>
      <button onclick="askAgent('system')">绯荤粺涓昏剳</button>
      <button onclick="askAgent('team')">涓夎剳澶嶇洏</button>
      <button onclick="showAgentEvidence()">鏌ョ湅璇佹嵁</button>
      <button onclick="openAgentConfig()">璺敱瑙勫垯</button>
      <button onclick="showAgentDiagnostics()">璇婃柇</button>
      <button onclick="showAgentLogs()">璋冪敤鏃ュ織</button>
      <button onclick="rememberCurrentAgentTurn()">璁颁綇杩欐潯</button>
      <button onclick="rememberAgentFocusFromInput()">璁颁綇鍏虫敞</button>
      <button onclick="rememberAgentPreferenceFromInput()">璁颁綇鍋忓ソ</button>
      <button onclick="showAgentMemory()">鏌ョ湅璁板繂</button>
      <button onclick="clearAgentMemory()">娓呯悊璁板繂</button>
    </div>
    <div class="agent-chat" id="agentChat">
      <div class="bubble bot"><span class="route">灏忓彲璇惧爞 路 鍙拷婧煡璇嗗簱</span>鎴戜細鍏堢敓鎴愯瘉鎹寘锛屽啀缁撳悎鏈湴瑙嗛銆佹枃妗ｃ€佺粨鏋勫寲鍒嗘瀽銆佺瓥鐣ュ拰璁板繂鍥炵瓟銆傚洖绛斾笅鏂逛細鏄剧ず鍙偣鍑荤殑寮曠敤鏉ユ簮銆?/div>
    </div>
    <div class="agent-input"><input id="agentInput" placeholder="闂爣鐨勩€侀鏉愩€佹ā鍨嬪厛鐢熻鐐广€佹垜鐨勫叧娉?.." onkeydown="if(event.key==='Enter')sendAgent()"><button onclick="sendAgent()">鍙戦€?/button></div>
  `;
  loadAgentProviders();
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>姝ｅ湪鐢熸垚璇佹嵁鍖呭苟妫€绱㈣蹇?..</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const context = await buildAgentContext(text);
    const evidence = window.currentAgentEvidence || [];
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "浣滀负 WorkBuddy 鎶曡祫涓昏剳锛岃鍩轰簬璇佹嵁鍖呭拰涓婁笅鏂囧厛鍒嗘瀽鎶曡祫閫昏緫銆佽瀵熺偣鍜岄闄╄竟鐣岋紝寮曠敤鏉ユ簮缂栧彿锛歕n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt, context, route.label);
      const contentPrompt = "浣滀负鍐呭涓昏剳锛岃鎶婁笅闈㈢殑鎶曡祫鍒嗘瀽鏀瑰啓鎴愰€氫織銆佹湁鏉＄悊鐨勫皬璇剧▼琛ㄨ揪锛屽苟淇濈暀鏉ユ簮缂栧彿锛歕n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt, context, route.label);
      answer = "WorkBuddy 鎶曡祫鍒ゆ柇\n" + invest + "\n\n鍐呭涓昏剳琛ㄨ揪\n" + content + "\n\nCodex 绯荤粺寤鸿\n" + codexSystemAnswer(text);
    } else {
      answer = await callAgentProvider(route.provider, text, context, route.label);
    }
    window.lastAgentEvidence = evidence;
    window.lastAgentTurn = { user: text, assistant: answer, route: route.label, at: new Date().toISOString(), evidence };
    await autoPersistAgentMemory(text, answer, route.label);
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(answer).replace(/\n/g, "<br>") + agentSourcesHtml(evidence);
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

const SIDEBAR_QUOTE_KEY = "xiaoke_sidebar_quote_v1";

const MODEL_PRINCIPLES_KEY = "xiaoke_model_principles_v1";

function defaultModelPrinciples() {
  return [
    { id: "principle_trend", name: "尊重趋势", category: "趋势", rule: "趋势没有破坏前，不要用主观判断提前否定；强趋势里重点观察承接和分歧后的修复。", evidence: [], updatedAt: new Date().toISOString() },
    { id: "principle_wait", name: "等待分歧", category: "买点", rule: "一致高潮时少追，分歧后看谁还能站住；买点来自承接验证，不来自情绪热闹。", evidence: [], updatedAt: new Date().toISOString() },
    { id: "principle_risk", name: "风险优先", category: "风控", rule: "先定义失败条件和回撤风险，再谈机会；看不懂时不强行下注。", evidence: [], updatedAt: new Date().toISOString() },
    { id: "principle_position", name: "仓位克制", category: "仓位", rule: "试错仓、确认后加仓、分歧扩大时降仓；不要用重仓去赌不确定性。", evidence: [], updatedAt: new Date().toISOString() }
  ];
}

function readModelPrinciples() {
  const rows = readJsonStore(MODEL_PRINCIPLES_KEY, null);
  return Array.isArray(rows) && rows.length ? rows : defaultModelPrinciples();
}

function saveModelPrinciples(rows) {
  writeJsonStore(MODEL_PRINCIPLES_KEY, rows);
}

function principleId() {
  return "principle_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}

function updateModelPrinciple(id, field, value) {
  const rows = readModelPrinciples().map(row => row.id === id ? { ...row, [field]: value, updatedAt: new Date().toISOString() } : row);
  saveModelPrinciples(rows);
}

function addModelPrinciple(seed = {}) {
  const rows = readModelPrinciples();
  rows.unshift({
    id: principleId(),
    name: seed.name || "新原则",
    category: seed.category || "未分类",
    rule: seed.rule || "",
    evidence: seed.evidence || [],
    updatedAt: new Date().toISOString()
  });
  saveModelPrinciples(rows);
  renderModelFramework();
  showToast("已新增原则");
}

function deleteModelPrinciple(id) {
  if (!confirm("确定删除这条模型原则吗？")) return;
  saveModelPrinciples(readModelPrinciples().filter(row => row.id !== id));
  renderModelFramework();
}

function principleCategoryForText(text) {
  const value = String(text || "");
  if (/风险|回撤|高位|谨慎|止损|退潮/.test(value)) return "风控";
  if (/仓位|加仓|减仓|试错|重仓/.test(value)) return "仓位";
  if (/等待|分歧|回踩|承接|买点|低吸/.test(value)) return "买点";
  if (/趋势|主线|顺势|周期|突破/.test(value)) return "趋势";
  if (/心法|哲学|认知|纪律|执行/.test(value)) return "心法";
  return "框架";
}

function principleNameForText(text) {
  const title = agentClip(String(text || "").replace(/\s+/g, " "), 18);
  return title || `${principleCategoryForText(text)}原则`;
}

function distillPrincipleFromVideo(id) {
  const v = state.videos.find(item => item.id === id);
  if (!v) return;
  const model = readStructuredAnalyses()[id] || analysisModel(v, readVideoAnalyses()[id] || "");
  const sourceText = [model.philosophy, model.advice, model.risk, model.summary].filter(Boolean).join("\n");
  const title = getVideoDetailTitle(v);
  const rule = [
    model.philosophy || model.advice || model.summary || "这条素材还需要补充分析后再沉淀原则。",
    model.risk ? `风险边界：${model.risk}` : ""
  ].filter(Boolean).join("\n");
  addModelPrinciple({
    name: principleNameForText(model.philosophy || model.advice || title),
    category: principleCategoryForText(sourceText),
    rule,
    evidence: [{ id: v.id, title, date: v.date || "", type: v.isDocument ? "文档" : "视频" }]
  });
}

function modelPrinciplesContext() {
  return readModelPrinciples().filter(row => {
    if (!row.evidence || !row.evidence.length) return true;
    return row.evidence.some(item => item.type !== "文档" && item.type !== "书籍");
  }).slice(0, 16).map((row, index) => [
    `[P${index + 1}] ${row.name}`,
    `分类：${row.category || "-"}`,
    `规则：${agentClip(row.rule, 320)}`,
    row.evidence && row.evidence.length ? `来源：${row.evidence.map(item => item.title).join(" / ")}` : ""
  ].filter(Boolean).join("\n")).join("\n\n");
}

function principleCardsHtml() {
  return readModelPrinciples().map(row => `
    <div class="panel">
      <div class="panel-title-row">
        <div class="panel-title" style="margin-bottom:0">${escapeHtml(row.name || "未命名原则")}</div>
        <button class="small-btn" onclick='deleteModelPrinciple(${JSON.stringify(row.id)})'>删除</button>
      </div>
      <div class="video-group-row"><span class="video-group-badge">${escapeHtml(row.category || "未分类")}</span>${(row.evidence || []).slice(0, 3).map(item => `<button class="video-group-badge" onclick='openDetail(${JSON.stringify(item.id)})'>${escapeHtml(agentClip(item.title || "来源", 18))}</button>`).join("")}</div>
      <input class="strategy-textarea" style="min-height:0;height:38px;margin-top:10px;resize:none" value="${escapeHtml(row.name || "")}" oninput='updateModelPrinciple(${JSON.stringify(row.id)},"name",this.value)'>
      <input class="strategy-textarea" style="min-height:0;height:38px;margin-top:8px;resize:none" value="${escapeHtml(row.category || "")}" oninput='updateModelPrinciple(${JSON.stringify(row.id)},"category",this.value)'>
      <textarea class="strategy-textarea" style="min-height:138px;margin-top:8px" oninput='updateModelPrinciple(${JSON.stringify(row.id)},"rule",this.value)'>${escapeHtml(row.rule || "")}</textarea>
    </div>
  `).join("");
}

function localKnowledgePayload() {
  const keys = [
    VIDEO_ANALYSIS_KEY,
    VIDEO_ANALYSIS_V2_KEY,
    VIDEO_LINKS_KEY,
    VIDEO_TEXT_KEY,
    VIDEO_PIPELINE_KEY,
    PHILOSOPHY_LIBRARY_KEY,
    MODEL_PRINCIPLES_KEY,
    MODEL_FRAMEWORK_NOTE_KEY,
    AGENT_PROMPT_TEMPLATE_KEY,
    STRATEGY_KEY,
    DAILY_TASK_KEY,
    DAILY_FOCUS_KEY,
    DAILY_REVIEW_KEY,
    VIDEO_GROUPS_KEY,
    VIDEO_GROUP_ASSIGN_KEY,
    VIDEO_TAG_META_KEY
  ];
  const local = {};
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value !== null) local[key] = value;
  });
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    localStorage: local,
    readable: {
      principles: readModelPrinciples(),
      strategy: typeof readStrategy === "function" ? readStrategy() : {},
      promptTemplate: readPromptTemplate()
    }
  };
}

function downloadJsonFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function exportKnowledgeBackup() {
  let serverBackup = null;
  try {
    const response = await fetch("/api/knowledge-backup");
    const data = await response.json();
    if (data.success) serverBackup = data.backup;
  } catch {}
  const payload = {
    app: "xiaoke-m-model-knowledge",
    exportedAt: new Date().toISOString(),
    local: localKnowledgePayload(),
    server: serverBackup
  };
  downloadJsonFile(`xiaoke-knowledge-backup-${new Date().toISOString().slice(0, 10)}.json`, payload);
  showToast("知识库备份已导出");
}

function triggerKnowledgeRestore() {
  const input = document.getElementById("knowledgeRestoreFile");
  if (input) input.click();
}

async function restoreKnowledgeBackupFile(file) {
  if (!file) return;
  if (!confirm("恢复会覆盖当前本地原则、策略、分析缓存和 Agent 记忆。确定继续吗？")) return;
  const text = await file.text();
  const payload = JSON.parse(text);
  const local = (payload.local && payload.local.localStorage) || payload.localStorage || {};
  Object.entries(local).forEach(([key, value]) => {
    if (typeof value === "string") localStorage.setItem(key, value);
  });
  const serverBackup = payload.server || payload.backup || null;
  if (serverBackup) {
    await fetch("/api/knowledge-restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ backup: serverBackup })
    });
  }
  showToast("知识库已恢复");
  render();
}

function exportKnowledgeMarkdown() {
  const principles = readModelPrinciples();
  const strategy = typeof readStrategy === "function" ? readStrategy() : {};
  const analyses = readStructuredAnalyses();
  const videos = libraryVideos();
  const lines = [
    "# 小可课堂知识库导出",
    "",
    `导出时间：${new Date().toLocaleString()}`,
    "",
    "## 模型先生长期原则",
    "",
    ...principles.map((row, index) => [
      `### ${index + 1}. ${row.name}`,
      "",
      `分类：${row.category || "-"}`,
      "",
      row.rule || "",
      "",
      row.evidence && row.evidence.length ? `来源：${row.evidence.map(item => item.title).join(" / ")}` : ""
    ].join("\n")),
    "",
    "## 我的策略",
    "",
    strategy.main || "",
    "",
    "## 结构化素材摘要",
    "",
    ...Object.entries(analyses).slice(0, 120).map(([id, model]) => {
      const video = videos.find(item => item.id === id);
      return [
        `### ${video ? getVideoDetailTitle(video) : id}`,
        "",
        `核心观点：${model.summary || "-"}`,
        "",
        `操作建议：${model.advice || "-"}`,
        "",
        `风险边界：${model.risk || "-"}`,
        ""
      ].join("\n");
    })
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `xiaoke-knowledge-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Markdown 知识库已导出");
}

function renderKnowledgeBackupPanel() {
  return `
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">备份 / 恢复 / 导出</div>
      <div class="date">备份包含 Agent 记忆、长期原则、策略、提示词、视频分析缓存、分组和每日复盘。恢复前会二次确认。</div>
      <div class="analysis-actions" style="justify-content:flex-start;margin-top:12px">
        <button class="small-btn" onclick="exportKnowledgeBackup()">导出完整备份</button>
        <button class="small-btn" onclick="triggerKnowledgeRestore()">恢复备份</button>
        <button class="small-btn" onclick="exportKnowledgeMarkdown()">导出 Markdown</button>
        <input id="knowledgeRestoreFile" type="file" accept="application/json,.json" style="display:none" onchange="restoreKnowledgeBackupFile(this.files[0]);this.value=''">
      </div>
    </section>
  `;
}

function renderModelFramework() {
  state.view = "modelFramework";
  const rows = frameworkRows();
  const note = localStorage.getItem(MODEL_FRAMEWORK_NOTE_KEY) || "";
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">长期原则库会进入 Agent 上下文。先从视频分析里沉淀，再手动编辑成稳定规则。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="addModelPrinciple()">新增原则</button>
        <button class="small-btn" onclick="usePromptTemplate()">套用提示词</button>
        <button class="small-btn" onclick="showAgentMemory()">查看记忆</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    ${renderKnowledgeBackupPanel()}
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">长期原则库</div>
      <div class="decision-grid">${principleCardsHtml()}</div>
    </section>
    <section class="decision-grid">
      ${rows.map(row => `
        <div class="panel">
          <div class="panel-title">${escapeHtml(row.name)} <span class="date">(${row.matches.length})</span></div>
          <div class="video-group-row">${row.keys.map(key => `<span class="video-group-badge">${escapeHtml(key)}</span>`).join("")}</div>
          <p style="color:var(--muted);line-height:1.7">${row.matches.map(v => escapeHtml(getVideoDetailTitle(v))).join("<br>") || "等待更多结构化分析沉淀。"}</p>
          <button class="small-btn" onclick='askFrameworkTopic(${JSON.stringify(row.name)})'>让 Agent 总结这条框架</button>
        </div>
      `).join("")}
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="strategy-textarea" style="min-height:150px" oninput="saveModelFrameworkNote(this.value)" placeholder="把你认可的长期原则写在这里，例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(note)}</textarea>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">提示词模板库</div>
      <textarea class="strategy-textarea" style="min-height:210px" oninput="savePromptTemplate(this.value)">${escapeHtml(readPromptTemplate())}</textarea>
      <button class="small-btn" style="margin-top:10px" onclick="usePromptTemplate()">发送到 Agent 输入框</button>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">个股档案</div>
      <div class="decision-grid">${stockProfileCards()}</div>
    </section>
  `;
}

function analysisHtml(v) {
  const saved = readVideoAnalyses()[v.id];
  const structured = readStructuredAnalyses()[v.id];
  const transcript = getVideoDetailTranscript(v);
  const title = getVideoDetailTitle(v);
  const model = analysisModel(v, saved || "", structured);
  const actionText = saved ? "重新生成 AI 分析" : "生成 AI 分析";
  const hint = !saved && isEmptyTranscript(transcript)
    ? analysisCardHtml("blue", "先补充正文/转录", `这条素材目前主要只有标题：${title}。补充视频转录、PDF/Word 摘要或读书笔记后，分析会更准。`)
    : "";
  const links = videoLinksFor(v.id);
  const linkText = uniqueClean([...links.stocks, ...links.sectors, ...links.groups, ...(model.directory ? [model.directory] : [])]).join(" / ") || "待 AI 识别或手动加入分组";
  const confirm = links.pending ? `<div class="analysis-actions"><button class="small-btn" onclick="confirmVideoLinks('${v.id}')">确认关联到分组/标的</button></div>` : "";
  const safeTitle = escapeHtml(title).replace(/'/g, "\\'");
  return `
    <div class="analysis-actions">
      <button class="open-btn" onclick="generateVideoAIAnalysis('${v.id}', true)">${actionText}</button>
      <button class="small-btn" onclick='distillPrincipleFromVideo(${JSON.stringify(v.id)})'>沉淀原则</button>
      <button class="small-btn" onclick="openAgentWithQuestion('请围绕素材《${safeTitle}》继续追问：核心观点、风险边界、可沉淀规则是什么？','investment',true)">问 Agent</button>
    </div>
    ${documentMemoryActionHtml(v)}
    ${hint}
    ${analysisCardHtml("green", "关注标的", model.focus)}
    ${analysisCardHtml("blue", "核心观点", model.summary)}
    ${analysisCardHtml("blue", "观点提炼", model.opinion || model.summary)}
    ${analysisCardHtml("green", "股票/板块关联", linkText)}
    ${analysisCardHtml("blue", "操作建议", model.advice)}
    ${analysisCardHtml("red", "风险边界", model.risk)}
    ${analysisCardHtml("gold", "哲学/心法", model.philosophy)}
    <div class="analysis-card"><h3>置信度评分：<span style="color:var(--green)">${escapeHtml(model.confidence)}</span></h3><p>${escapeHtml(isEmptyTranscript(transcript) ? "当前主要基于标题和互动数据；补充正文/转录后可提高可信度。" : "已结合标题、互动数据和正文/转录；仍建议人工复核。")}</p></div>
    ${confirm}
  `;
}

function agentLocalContext(query = "") {
  const current = state.videos.find(item => item.id === state.currentVideoId && !item.isDocument && !xiaokeIsBookDocument(item));
  const summary = pipelineSummary(libraryVideos());
  const strategy = typeof readStrategy === "function" ? readStrategy() : {};
  const evidence = agentEvidenceItems(query, 6);
  window.currentAgentEvidence = evidence;
  const related = evidence.map(item => state.videos.find(v => v.id === item.id)).filter(Boolean);
  const structuredCount = Object.keys(readStructuredAnalyses()).length;
  return [
    {
      role: "user",
      content: [
        "【当前看板】",
        `视图：${state.view}`,
        `分类：${state.activeTag}`,
        `排序：${state.sort}`,
        `素材总数：${libraryVideos().length}`,
        `已结构化分析：${structuredCount}`,
        `今日新增观点：${summary.today}`,
        `高置信素材：${summary.highConfidence}`,
        `风险待复盘：${summary.risk}`
      ].join("\n")
    },
    {
      role: "user",
      content: [
        "【我的长期策略与今日关注】",
        `今日任务：${agentClip(localStorage.getItem(DAILY_TASK_KEY) || "", 600) || "-"}`,
        `今日关注：${agentClip(localStorage.getItem(DAILY_FOCUS_KEY) || "", 600) || "-"}`,
        `策略正文：${agentClip(strategy.main || "", 900)}`,
        `入场条件：${agentClip(strategy.entry || "", 360)}`,
        `风险规则：${agentClip(strategy.risk || "", 360)}`,
        `仓位规则：${agentClip(strategy.position || "", 360)}`
      ].join("\n")
    },
    { role: "user", content: "【模型先生长期原则库】\n" + modelPrinciplesContext() },
    { role: "user", content: "【关注标的档案】\n" + agentWatchlistContext() },
    agentEvidenceContext(evidence),
    current ? { role: "user", content: "【当前素材完整分析】\n" + agentVideoContext(current, 0) } : null,
    { role: "user", content: "【视频库检索到的相关素材】\n" + (related.length ? related.map(agentVideoContext).join("\n\n") : "未检索到高相关视频，不用低相关素材凑数。") }
  ].filter(Boolean);
}

function librarySearchHtml() {
  return `
    <div class="library-search-row">
      <label class="library-search">搜索<input id="librarySearchInput" value="${escapeHtml(state.search || "")}" placeholder="搜索视频标题、日期、题材、转录" oninput="setSearch(this.value)"></label>
      <button class="small-btn" onclick="clearVideoFilters()">清空</button>
      <button class="small-btn" onclick="clearVideoFilters()">全部视频</button>
      <button class="small-btn" onclick="syncAllVideoTitles()">同步全部标题</button>
      <button class="small-btn" onclick="syncAllFrameTitles()">批量识别画面标题</button>
    </div>
  `;
}

function documentMemoryActionHtml(v) {
  if (!v || !v.isDocument) return "";
  const idArg = JSON.stringify(v.id);
  const learnText = v.hasExtractedText ? "重新学习书籍" : "学习书籍";
  return `<div class="analysis-actions"><button class="open-btn" onclick='learnDocument(${idArg})'>${learnText}</button><button class="small-btn" onclick='learnDocument(${idArg}, 600)'>全书 OCR（慢）</button><button class="small-btn" onclick='rememberCurrentDocumentNote(${idArg})'>沉淀为读书记忆</button>${v.documentUrl || v.originalUrl ? `<button class="small-btn" onclick='window.open(${JSON.stringify(v.documentUrl || v.originalUrl)}, "_blank")'>打开原文</button>` : ""}</div>`;
}

async function learnDocument(id, maxPages = 0) {
  const v = state.videos.find(item => item.id === id);
  const content = document.getElementById("detailContent");
  if (!v || !v.isDocument) return showToast("这条不是书籍文档");
  if (maxPages && !confirm("全书 OCR 会比较慢，几百页 PDF 可能需要十几到几十分钟。确定现在开始吗？")) return;
  if (content) {
    content.innerHTML = `<div class="analysis-card pending"><h3>正在学习书籍...</h3><p>${maxPages ? "正在进行全书 OCR，页面可以先放着等它完成。" : "小可正在提取 PDF/Word 正文；如果没有文字层，会自动 OCR 前 60 页。"}</p></div>`;
  }
  try {
    updatePipeline(id, { transcript: "running", ai: "running", error: "" });
    const response = await fetch("/api/extract-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: v.id, fileName: v.fileName, maxPages: maxPages || undefined })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "文档正文提取失败");
    v.transcript = data.text || data.summary || v.transcript || "";
    v.hasExtractedText = true;
    v.extractedTextLength = data.textLength || v.transcript.length;
    v.extractedAt = new Date().toISOString();
    v.confidence = data.truncated ? "已读部分" : "已读";
    clearVideoRuntimeCache(id);
    saveVideoAnalysis(id, data.summary || "已提取正文，可继续生成 AI 总结。");
    const model = analysisModel(v, data.summary || "");
    saveStructuredAnalysis(id, model);
    updatePipeline(id, { transcript: "done", ai: "done", confidence: confidenceNumber(model.confidence), error: "" });
    await scanLocalDocuments();
    showToast(data.truncated ? "已学习书籍前半部分，并生成摘要" : "已学习完整书籍，并生成摘要");
    if (state.currentVideoId === id) renderDetail();
    else render();
  } catch (error) {
    updatePipeline(id, { transcript: "failed", ai: "failed", error: error.message || "学习失败" });
    if (content) content.innerHTML = `<div class="analysis-card red"><h3>学习书籍失败</h3><p>${escapeHtml(error.message || "未知错误")}</p></div>`;
    showToast(error.message || "学习书籍失败");
  }
}

function buildVideoAnalysisPrompt(v) {
  const title = getVideoDetailTitle(v);
  const transcript = getVideoDetailTranscript(v);
  const sourceLabel = v.isDocument ? "文档正文" : "语音转文字";
  const usefulText = isEmptyTranscript(transcript)
    ? (v.isDocument ? "暂无文档正文，请先点击“学习书籍”。" : "暂无完整转录，请只基于标题、日期和互动数据做低置信度复盘。")
    : transcript.slice(0, 18000);
  return [
    v.isDocument
      ? "你是小可课堂的读书助手。请只根据我提供的书籍/文档正文总结，不要编造正文里没有的信息。"
      : "你是小可课堂的投资复盘助手。请只根据我提供的视频标题和语音转文字分析，不要编造视频里没有的信息。",
    "输出要克制，不给确定性买卖指令，只给观察框架、风险边界和可复盘目录。",
    "每一项 1-2 句话即可。",
    "",
    `素材标题：${title}`,
    `浣滆€咃細${v.author || "-"}`,
    `日期：${v.date || "-"}`,
    `${sourceLabel}：${usefulText}`,
    "",
    "请必须逐项输出，不允许空项，不允许只复制原文。每项格式为：字段名：内容。",
    "关注标的：",
    "总结重点：",
    "观点提炼：",
    "股票/板块关联：",
    "操作建议：只给观察和复盘框架，不给确定性买卖指令。",
    "风险提示：",
    "哲学关联：",
    "置信度评分：必须是 1-10 的数字，例如 6/10。"
  ].join("\n");
}

function sidebarQuoteText() {
  return localStorage.getItem(SIDEBAR_QUOTE_KEY) || "\u628a\u590d\u6742\u95ee\u9898\u8bb2\u6e05\u695a\uff0c\u628a\u4ea4\u6613\u7d20\u6750\u6574\u7406\u6210\u53ef\u590d\u76d8\u7684\u8bfe\u5802\u3002";
}

function saveSidebarQuote(value) {
  localStorage.setItem(SIDEBAR_QUOTE_KEY, value);
}

async function openFeatureList() {
  state.view = "featureList";
  renderTopChips();
  const main = document.getElementById("main");
  main.innerHTML = `<section class="panel"><div class="panel-title">\u5c0f\u53ef\u8bfe\u5802\u529f\u80fd\u6e05\u5355</div><div class="date">\u6b63\u5728\u8bfb\u53d6\u529f\u80fd\u6e05\u5355...</div></section>`;
  try {
    const response = await fetch("/\u5c0f\u53ef\u8bfe\u5802\u529f\u80fd\u6e05\u5355.md?ts=" + Date.now());
    const text = await response.text();
    main.innerHTML = `
      <section class="panel feature-list-panel">
        <div class="metadata-head">
          <div>
            <div class="panel-title">\u5c0f\u53ef\u8bfe\u5802\u529f\u80fd\u6e05\u5355</div>
            <div class="date">\u8fd9\u91cc\u8bb0\u5f55\u5f53\u524d\u8f6f\u4ef6\u5df2\u7ecf\u5b9e\u73b0\u7684\u529f\u80fd\uff0c\u540e\u7eed\u4fee\u6539\u4f1a\u7ee7\u7eed\u66f4\u65b0\u3002</div>
          </div>
          <button class="small-btn" onclick="renderDashboard()">\u8fd4\u56de\u770b\u677f</button>
        </div>
        <pre class="feature-list-text">${escapeHtml(text)}</pre>
      </section>
    `;
  } catch (error) {
    main.innerHTML = `<section class="panel"><div class="panel-title">\u529f\u80fd\u6e05\u5355\u8bfb\u53d6\u5931\u8d25</div><p>${escapeHtml(error.message || "\u672a\u77e5\u9519\u8bef")}</p></section>`;
  }
}

function renderShell() {
  renderTopChips();
  renderWatchlistPane();
  const themeTags = allVideoTags().filter(t => t.type !== "all" && t.type !== "source").slice(0, 12);
  const industryTags = sectorRows();
  document.getElementById("rightPane").innerHTML = `
    <div class="profile"><div class="avatar"><img src="assets/xiaoke-icon-64.png" alt=""></div><div><b>\u5c0f\u53ef\u8bfe\u5802</b><span>\u6295\u8d44\u8bfe\u5802 \u00b7 \u8ba4\u77e5\u590d\u76d8</span></div></div>
    <div class="side-section">
      <button class="open-btn" onclick="openFeatureList()">\u67e5\u770b\u529f\u80fd\u6e05\u5355</button>
    </div>
    <textarea class="side-note quote-note" oninput="saveSidebarQuote(this.value)">${escapeHtml(sidebarQuoteText())}</textarea>
    <div class="side-section">
      <div class="side-title">\u4e3b\u9898\u7b14\u8bb0</div>
      <div class="tag-cloud">${themeTags.map(t => `<button class="tag" onclick="filterByTag('${t.name}')">${escapeHtml(sectorDisplayName(t))}</button>`).join("")}</div>
    </div>
    <div class="side-section">
      <div class="side-title">\u884c\u4e1a\u5206\u5e03</div>
      <div class="tag-cloud">${industryTags.map(row => `<button class="tag mid" onclick="filterByTag('${row.tag.name}')">${escapeHtml(row.name)}(${row.count})</button>`).join("")}</div>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">\u6bcf\u65e5\u4efb\u52a1</div>
      <textarea class="side-note big" id="dailyTaskBox" oninput="saveRightNote('task', this.value)" placeholder="\u76f4\u63a5\u5199\u4eca\u5929\u8981\u505a\u7684\u4e8b\uff1a\u590d\u76d8\u89c6\u9891\u3001\u8865\u884c\u60c5\u4ee3\u7801\u3001\u6574\u7406\u957f\u946b\u4ea7\u4e1a\u94fe...">${escapeHtml(localStorage.getItem(DAILY_TASK_KEY) || "")}</textarea>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">\u4eca\u65e5\u5173\u6ce8</div>
      <textarea class="side-note" id="dailyFocusBox" oninput="saveRightNote('focus', this.value)" placeholder="\u4f8b\u5982\uff1a\u957f\u946b\u5b58\u50a8\u3001\u5149\u6a21\u5757\u3001\u79d1\u521b\u82af\u7247\u3001\u5927\u76d8\u98ce\u9669...">${escapeHtml(localStorage.getItem(DAILY_FOCUS_KEY) || "")}</textarea>
    </div>
  `;
  renderAgent();
}

function isAutoRefreshEnabled() {
  return localStorage.getItem(AUTO_REFRESH_KEY) === "1";
}

function updateAutoRefreshButton() {
  const btn = document.getElementById("autoRefreshBtn");
  if (!btn) return;
  const enabled = isAutoRefreshEnabled();
  btn.textContent = enabled ? "\u81ea\u52a8\u5237\u65b0\u4e2d" : "\u81ea\u52a8\u5237\u65b0";
  btn.classList.toggle("on", enabled);
  btn.title = enabled ? "\u5df2\u5f00\u542f\uff1a\u6bcf 60 \u79d2\u81ea\u52a8\u5237\u65b0\u884c\u60c5\u3001\u672c\u5730\u7d20\u6750\u548c\u5f53\u524d\u9875\u9762" : "\u5df2\u5173\u95ed\uff1a\u70b9\u51fb\u5f00\u542f\u81ea\u52a8\u5237\u65b0\uff0c\u65c1\u8fb9\u5706\u5f62\u6309\u94ae\u4ecd\u53ef\u624b\u52a8\u5237\u65b0";
}

function setupAutoRefresh() {
  if (state.autoRefreshTimer) {
    clearInterval(state.autoRefreshTimer);
    state.autoRefreshTimer = null;
  }
  updateAutoRefreshButton();
  if (!isAutoRefreshEnabled()) return;
  state.autoRefreshTimer = setInterval(autoRefreshTick, 1000 * 60);
}

async function autoRefreshTick() {
  await scanLocalVideos();
  await scanLocalDocuments();
  await refreshMarketIndexes();
  if (["dashboard", "pipelineCenter", "library", "sectorDirectory"].includes(state.view)) {
    render();
  } else {
    renderWatchlistPane();
  }
}

function toggleAutoRefresh() {
  const enabled = !isAutoRefreshEnabled();
  localStorage.setItem(AUTO_REFRESH_KEY, enabled ? "1" : "0");
  setupAutoRefresh();
  showToast(enabled ? "自动刷新已开启：每分钟更新行情和能力面板" : "自动刷新已关闭");
  if (enabled) autoRefreshTick();
}

async function refreshApp() {
  await scanLocalVideos();
  await scanLocalDocuments();
  await refreshMarketIndexes();
  render();
  showToast("已刷新");
}

function tickClock() {
  const d = new Date();
  document.getElementById("clock").textContent = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}  ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, s => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[s]));
}

function agentKnownStocks() {
  const rows = typeof flattenWatchlist === "function" ? flattenWatchlist() : [];
  return rows
    .filter(item => item && item.name && item.sector !== "鎸囨暟")
    .map(item => ({
      name: item.name,
      quoteKey: item.quoteKey || "",
      sector: item.sector || item.group || "",
      desc: item.desc || ""
    }));
}

function detectAgentStockTargets(text = "") {
  const value = String(text || "");
  const hits = [];
  agentKnownStocks().forEach(item => {
    if (item.name && value.includes(item.name)) hits.push(item);
    if (item.quoteKey && value.toLowerCase().includes(item.quoteKey.toLowerCase())) hits.push(item);
  });
  const codeHits = value.match(/\b(?:sh|sz|bj)?\d{6}\b/ig) || [];
  codeHits.forEach(code => hits.push({ name: code, quoteKey: code, sector: "", desc: "" }));
  const seen = new Set();
  return hits.filter(item => {
    const key = item.quoteKey || item.name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 5);
}

function agentStockSearchCandidates(text = "") {
  const cleaned = String(text || "")
    .replace(/模型先生|小可|帮我|请你|帮忙|分析一下|分析|看看|怎么看|如何看|复盘|股票|股价|标的|这个|一个|今天|现在|能不能|可不可以/g, " ")
    .replace(/[，。！？、；：,.!?;:()[\]{}<>《》“”"'`~\-_/\\|+=*&^%$#@]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const chunks = cleaned.match(/[\u4e00-\u9fa5A-Za-z0-9]{2,12}/g) || [];
  const stop = new Set(["行情", "财务", "估值", "风险", "板块", "市场", "机会", "建议", "买点", "卖点", "光模块", "人工智能", "半导体"]);
  const candidates = [];
  chunks.forEach(chunk => {
    if (/^(sh|sz|bj)?\d{6}$/i.test(chunk)) candidates.push(chunk);
    if (!/[\u4e00-\u9fa5]/.test(chunk) || stop.has(chunk)) return;
    candidates.push(chunk);
    const maxLen = Math.min(6, chunk.length);
    for (let len = maxLen; len >= 3; len -= 1) {
      for (let i = 0; i + len <= chunk.length; i += 1) {
        const part = chunk.slice(i, i + len);
        if (!stop.has(part)) candidates.push(part);
      }
    }
  });
  const seen = new Set();
  return candidates.filter(item => {
    const key = item.toLowerCase();
    if (!item || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 18);
}

async function searchAgentStocksByText(text = "", limit = 5) {
  const out = [];
  const seen = new Set();
  for (const candidate of agentStockSearchCandidates(text)) {
    if (out.length >= limit) break;
    try {
      const response = await fetch("/api/stock-search?q=" + encodeURIComponent(candidate) + "&limit=3");
      const data = await response.json().catch(() => ({}));
      if (!data.success) continue;
      (data.items || []).forEach(item => {
        if (out.length >= limit || !item.key || seen.has(item.key)) return;
        seen.add(item.key);
        out.push({
          name: item.name,
          quoteKey: item.key,
          sector: item.market || "",
          desc: "东方财富搜索命中，需结合行情和财务复核",
          resolvedSource: item.source || "东方财富搜索"
        });
      });
    } catch {}
  }
  return out;
}

async function fetchAgentStockBriefs(text = "") {
  const targets = detectAgentStockTargets(text);
  const seenTargets = new Set(targets.map(item => item.quoteKey || item.name).filter(Boolean));
  if (targets.length < 5) {
    const searched = await searchAgentStocksByText(text, 5 - targets.length);
    searched.forEach(item => {
      const key = item.quoteKey || item.name;
      if (!key || seenTargets.has(key)) return;
      seenTargets.add(key);
      targets.push(item);
    });
  }
  if (!targets.length) return [];
  const keys = targets.map(item => item.quoteKey || item.name).filter(Boolean);
  try {
    const response = await fetch("/api/stock-brief?keys=" + encodeURIComponent(keys.join(",")) + "&announcements=1&announcementLimit=3&announcementText=1&announcementTextLimit=8000");
    const data = await response.json().catch(() => ({}));
    if (!data.success) return targets.map(item => ({ ...item, dataQuality: "未取得实时行情" }));
    const byKey = new Map((data.items || []).map(item => [item.key, item]));
    const rows = targets.map(item => {
      const quote = byKey.get(item.quoteKey) || byKey.get(item.name) || {};
      return { ...item, ...quote, localName: item.name, localSector: item.sector || quote.sector, localDesc: item.desc };
    });
    return await Promise.all(rows.map(async item => ({ ...item, technical: await fetchAgentTechnicalSnapshot(item.key || item.quoteKey || item.name) })));
  } catch {
    return targets.map(item => ({ ...item, dataQuality: "行情接口暂不可用" }));
  }
}

async function fetchAgentTechnicalSnapshot(key = "") {
  if (!key) return null;
  try {
    const response = await fetch("/api/stock-kline?days=180&key=" + encodeURIComponent(key), { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    const rows = Array.isArray(data.rows) ? data.rows.filter(row => Number.isFinite(Number(row.close))) : [];
    if (!data.success || rows.length < 65) return null;
    const average = values => values.length ? values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length : 0;
    const recent = count => rows.slice(-count);
    const close = Number(rows[rows.length - 1].close);
    const ma = count => average(recent(count).map(row => row.close));
    const ma5 = ma(5), ma20 = ma(20), ma60 = ma(60);
    const range20 = recent(20);
    const high20 = Math.max(...range20.map(row => Number(row.high || row.close)));
    const low20 = Math.min(...range20.map(row => Number(row.low || row.close)));
    const returnPct = count => {
      const base = Number(rows[Math.max(0, rows.length - 1 - count)]?.close);
      return base > 0 ? (close / base - 1) * 100 : 0;
    };
    const priorVolumes = rows.slice(-21, -1).map(row => Number(row.volume || 0)).filter(value => value > 0);
    const volumeRatio = priorVolumes.length ? Number(rows[rows.length - 1].volume || 0) / average(priorVolumes) : 0;
    const position20 = high20 > low20 ? (close - low20) / (high20 - low20) * 100 : 50;
    const trend = close > ma20 && ma20 > ma60 ? "中期偏强" : close < ma20 && ma20 < ma60 ? "中期偏弱" : close > ma20 ? "震荡偏强" : "震荡偏弱";
    return {
      asOf: rows[rows.length - 1].date || "",
      source: data.source || "历史日线",
      close: Number(close.toFixed(2)),
      ma5: Number(ma5.toFixed(2)),
      ma20: Number(ma20.toFixed(2)),
      ma60: Number(ma60.toFixed(2)),
      return5: Number(returnPct(5).toFixed(2)),
      return20: Number(returnPct(20).toFixed(2)),
      return60: Number(returnPct(60).toFixed(2)),
      high20: Number(high20.toFixed(2)),
      low20: Number(low20.toFixed(2)),
      position20: Number(position20.toFixed(0)),
      volumeRatio: Number(volumeRatio.toFixed(2)),
      trend
    };
  } catch {
    return null;
  }
}

function agentStockContext(briefs = []) {
  if (!briefs.length) return null;
  const lines = briefs.map(item => [
    `标的：${item.localName || item.name || item.key}`,
    `代码：${item.key || item.quoteKey || "-"}`,
    `板块：${item.localSector || item.sector || "-"}`,
    `现价：${item.price == null ? "-" : item.price}`,
    `涨跌幅：${item.pct == null ? "-" : item.pct + "%"}`,
    `阶段判断：${item.stage || "-"}`,
    `本地档案：${item.localDesc || item.desc || "-"}`,
    `数据质量：${item.dataQuality || "-"}`,
    item.technical ? `技术快照（${item.technical.asOf}，${item.technical.source}）：趋势${item.technical.trend}；MA5/20/60=${item.technical.ma5}/${item.technical.ma20}/${item.technical.ma60}；5/20/60日涨跌=${item.technical.return5}%/${item.technical.return20}%/${item.technical.return60}%；20日区间=${item.technical.low20}-${item.technical.high20}；区间位置=${item.technical.position20}%；量能比=${item.technical.volumeRatio}` : "技术快照：历史日线暂不可用"
  ].join("\n"));
  return {
    role: "user",
    content: [
      "【实时标的数据卡】",
      "这些数据只用于辅助复盘，不能替代正式行情终端和人工核验。",
      lines.join("\n\n")
    ].join("\n")
  };
}

function agentComparableSector(value = "") {
  const sector = String(value || "").trim();
  if (!sector || /^(沪A|深A|京A|A股|港股|美股|指数|其他|未分类)$/i.test(sector)) return "";
  return sector;
}

function agentBriefIdentity(item = {}) {
  return String(item.key || item.quoteKey || item.localName || item.name || "").toLowerCase();
}

function agentPrimaryLocalRecord(item = {}) {
  const identity = agentBriefIdentity(item);
  const name = String(item.localName || item.name || "");
  return flattenWatchlist().find(row => {
    const rowKey = String(row.quoteKey || row.key || "").toLowerCase();
    return (identity && rowKey === identity) || (name && row.name === name);
  }) || null;
}

async function fetchAgentPeerBriefs(briefs = []) {
  const primary = briefs[0];
  if (!primary) return [];
  const local = agentPrimaryLocalRecord(primary);
  const sector = agentComparableSector(primary.localSector || local?.sector || local?.group || primary.sector);
  const groupChain = String(local?.groupChain || "");
  if (!sector && !groupChain) return [];
  const primaryId = agentBriefIdentity(primary);
  const candidates = flattenWatchlist().map(row => {
    const rowSector = agentComparableSector(row.sector || row.group);
    let score = 0;
    if (sector && rowSector === sector) score += 10;
    if (local?.group && row.group === local.group) score += 8;
    if (groupChain && row.groupChain === groupChain) score += 12;
    if (groupChain && row.groupChain && (row.groupChain.startsWith(groupChain) || groupChain.startsWith(row.groupChain))) score += 4;
    return { row, score };
  }).filter(({ row, score }) => score > 0 && agentBriefIdentity(row) !== primaryId && (row.quoteKey || row.key));
  const seen = new Set();
  const peers = candidates.sort((a, b) => b.score - a.score).map(({ row }) => row).filter(row => {
    const key = agentBriefIdentity(row);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
  if (!peers.length) return [];
  try {
    const keys = peers.map(item => item.quoteKey || item.key).join(",");
    const response = await fetch("/api/stock-brief?keys=" + encodeURIComponent(keys) + "&announcements=0", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!data.success) return [];
    const byKey = new Map((data.items || []).map(item => [String(item.key || "").toLowerCase(), item]));
    return peers.map(row => {
      const quote = byKey.get(String(row.quoteKey || row.key || "").toLowerCase()) || {};
      return { ...row, ...quote, localName: row.name, localSector: row.sector || row.group || sector };
    }).filter(item => item.price !== undefined || item.financialReportDate || item.roe !== undefined);
  } catch {
    return [];
  }
}

function agentAnnouncementSignature(item = {}) {
  return `${item.date || ""}|${String(item.title || "").replace(/\s+/g, "").slice(0, 80)}`;
}

function agentPreviousReportFor(item = {}) {
  const identity = agentBriefIdentity(item);
  const name = String(item.localName || item.name || "");
  return readAgentReports().find(report => (report.stockBriefs || []).some(old => {
    const oldIdentity = agentBriefIdentity(old);
    return (identity && oldIdentity === identity) || (name && (old.localName || old.name) === name);
  })) || null;
}

function agentValueChanged(previous, current) {
  if (previous === undefined || previous === null || previous === "") return false;
  if (current === undefined || current === null || current === "") return false;
  const oldNumber = Number(previous), newNumber = Number(current);
  if (Number.isFinite(oldNumber) && Number.isFinite(newNumber)) return Math.abs(oldNumber - newNumber) > 0.0001;
  return String(previous) !== String(current);
}

function buildAgentChangeSnapshot(briefs = [], peerBriefs = []) {
  const current = briefs[0];
  if (!current) return null;
  const previousReport = agentPreviousReportFor(current);
  const previous = previousReport?.stockBriefs?.find(item => agentBriefIdentity(item) === agentBriefIdentity(current)) || previousReport?.stockBriefs?.[0] || null;
  const fields = [
    ["财报期", "financialReportDate", ""], ["营收", "revenue", ""], ["归母净利", "netProfit", ""],
    ["营收同比", "revenueGrowth", "%"], ["利润同比", "profitGrowth", "%"], ["毛利率", "grossMargin", "%"],
    ["净利率", "netMargin", "%"], ["ROE", "roe", "%"], ["PE", "pe", ""], ["PB", "pb", ""]
  ];
  const financialChanges = previous ? fields.filter(([, key]) => agentValueChanged(previous[key], current[key])).map(([label, key, suffix]) => ({
    label, previous: `${previous[key]}${suffix}`, current: `${current[key]}${suffix}`
  })) : [];
  const oldAnnouncements = new Set((previous?.latestAnnouncements || []).map(agentAnnouncementSignature));
  const currentAnnouncements = current.latestAnnouncements || [];
  const newAnnouncements = previous ? currentAnnouncements.filter(item => !oldAnnouncements.has(agentAnnouncementSignature(item))) : [];
  const riskTags = currentAnnouncements.map(item => item.riskTag).filter(Boolean);
  const oldRiskTags = new Set((previous?.latestAnnouncements || []).map(item => item.riskTag).filter(Boolean));
  return {
    baseline: !previous,
    previousAt: previousReport?.at || "",
    financialChanges,
    newAnnouncements,
    newRiskTags: [...new Set(riskTags.filter(tag => !oldRiskTags.has(tag)))],
    peerCount: peerBriefs.length
  };
}

function agentPeerContext(briefs = [], peers = []) {
  const primary = briefs[0];
  if (!primary || !peers.length) return null;
  const format = item => [
    item.localName || item.name || item.key,
    `PE ${metricValueText(item.pe)}`, `PB ${metricValueText(item.pb)}`,
    `毛利率 ${metricValueText(item.grossMargin, "%")}`, `净利率 ${metricValueText(item.netMargin, "%")}`,
    `ROE ${metricValueText(item.roe, "%")}`, `营收同比 ${metricValueText(item.revenueGrowth, "%")}`,
    `利润同比 ${metricValueText(item.profitGrowth, "%")}`, `财报期 ${metricValueText(item.financialReportDate)}`
  ].join("；");
  return { role: "user", content: ["【同行横向样本】", "仅比较已取得的同板块关注标的，不把缺失值当作零。", format(primary), ...peers.map(format)].join("\n") };
}

function agentChangeContext(snapshot) {
  if (!snapshot) return null;
  if (snapshot.baseline) return { role: "user", content: "【历史变化】这是该标的首份可比研报，本次建立财务与公告基线，禁止虚构历史变化。" };
  const finance = snapshot.financialChanges.map(item => `${item.label}：${item.previous} → ${item.current}`).join("；") || "财务字段未发现变化";
  const announcements = snapshot.newAnnouncements.map(item => `${item.date || "-"} ${item.title || "公告"}`).slice(0, 3).join("；") || "未发现新增公告";
  return { role: "user", content: `【历史变化】上次研报：${snapshot.previousAt || "-"}\n财务变化：${finance}\n公告增量：${announcements}\n新增风险标签：${snapshot.newRiskTags.join("、") || "无"}` };
}

function agentDateAgeDays(value = "") {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return null;
  return Math.max(0, Math.floor((Date.now() - time) / 86400000));
}

function buildAgentResearchQuality(briefs = [], evidence = [], peers = [], changeSnapshot = null) {
  const item = briefs[0];
  if (!item) return null;
  const financialKeys = ["revenue", "netProfit", "grossMargin", "netMargin", "roe", "revenueGrowth", "profitGrowth", "financialReportDate"];
  const financialPresent = financialKeys.filter(key => item[key] !== undefined && item[key] !== null && item[key] !== "").length;
  const quotePresent = ["price", "pct", "pe", "pb", "marketCap"].filter(key => item[key] !== undefined && item[key] !== null && item[key] !== "").length;
  const technical = item.technical || null;
  const announcements = item.latestAnnouncements || [];
  const name = String(item.localName || item.name || item.key || "");
  const directEvidence = evidence.filter(entry => name && `${entry.title || ""} ${entry.text || ""} ${entry.summary || ""}`.includes(name));
  const technicalAge = agentDateAgeDays(technical?.asOf);
  const checks = [
    { label: "行情字段", score: Math.round(20 * quotePresent / 5), max: 20, note: `${quotePresent}/5` },
    { label: "财务字段", score: Math.round(30 * financialPresent / financialKeys.length), max: 30, note: `${financialPresent}/${financialKeys.length}` },
    { label: "技术时效", score: technical ? (technicalAge !== null && technicalAge <= 7 ? 20 : technicalAge !== null && technicalAge <= 30 ? 14 : 8) : 0, max: 20, note: technical ? `${technical.asOf || "日期缺失"}${technicalAge === null ? "" : `，${technicalAge}天前`}` : "未取得" },
    { label: "公告证据", score: announcements.length ? (announcements.some(row => row.summary || (row.riskPoints || []).length) ? 12 : 8) : 0, max: 12, note: `${announcements.length}条` },
    { label: "本地直接证据", score: directEvidence.length ? 10 : 0, max: 10, note: directEvidence.length ? `${directEvidence.length}条` : "未命中" },
    { label: "同行样本", score: peers.length >= 3 ? 8 : peers.length ? 4 : 0, max: 8, note: `${peers.length}家` }
  ];
  const score = checks.reduce((sum, row) => sum + row.score, 0);
  const grade = score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : "D";
  const missing = [];
  if (quotePresent < 4) missing.push("行情/估值字段不全");
  if (financialPresent < 6) missing.push("财务字段不全");
  if (!technical) missing.push("缺少历史日线");
  if (!announcements.length) missing.push("缺少公告证据");
  if (!directEvidence.length) missing.push("缺少本地直接讨论");
  if (!peers.length) missing.push("缺少同行样本");
  return {
    score, grade, checks, missing,
    directEvidenceCount: directEvidence.length,
    technicalAge,
    changeBaseline: Boolean(changeSnapshot?.baseline),
    generatedAt: new Date().toISOString()
  };
}

function buildAgentScenarioMatrix(briefs = [], changeSnapshot = null) {
  const item = briefs[0];
  if (!item) return null;
  const t = item.technical || {};
  const positiveGrowth = Number(item.revenueGrowth) > 0 && Number(item.profitGrowth) > 0;
  const qualityImproving = Number(item.roe) > 8 && Number(item.netMargin) > 3;
  const riskEvent = Boolean(changeSnapshot?.newRiskTags?.length);
  return {
    asOf: t.asOf || item.financialReportDate || "",
    rows: [
      {
        name: "偏强情景",
        condition: t.high20 ? `有效站上20日高点 ${t.high20}，量能比高于1.2` : "价格和量能同步转强",
        fundamental: positiveGrowth ? "营收与利润当前均为正增长，继续验证持续性" : "需要营收、利润同时转为正增长",
        action: "只在条件兑现后提高研究优先级，不提前确认"
      },
      {
        name: "基准情景",
        condition: t.ma20 ? `围绕 MA20(${t.ma20}) 震荡，未突破 ${t.high20 || "区间上沿"}` : "价格维持区间震荡",
        fundamental: qualityImproving ? "盈利质量尚可，等待下一财报验证" : "盈利质量没有形成明显优势",
        action: "维持观察，按公告和下一财报更新结论"
      },
      {
        name: "偏弱情景",
        condition: t.low20 ? `跌破20日低点 ${t.low20}，或持续位于 MA20 下方` : "趋势与量能共同走弱",
        fundamental: riskEvent ? `出现新增风险标签：${changeSnapshot.newRiskTags.join("、")}` : "利润、现金流或估值逻辑恶化",
        action: "降低研究优先级，重新核验原投资假设"
      }
    ]
  };
}

function agentResearchQualityContext(quality, scenarios) {
  if (!quality) return null;
  const checkText = quality.checks.map(row => `${row.label}${row.score}/${row.max}（${row.note}）`).join("；");
  const scenarioText = (scenarios?.rows || []).map(row => `${row.name}：触发=${row.condition}；基本面=${row.fundamental}；应对=${row.action}`).join("\n");
  return { role: "user", content: `【研究质量门槛】资料完备度 ${quality.score}/100，等级 ${quality.grade}。这不是股票评分。\n分项：${checkText}\n缺口：${quality.missing.join("；") || "无显著缺口"}\n【条件情景矩阵】\n${scenarioText || "数据不足，未生成情景"}` };
}

const XIAOKE_AGENT_RESPONSE_MODE_KEY = "xiaoke_agent_response_mode_v1";

function getAgentResponseMode() {
  const selected = document.getElementById("agentResponseMode")?.value;
  const saved = selected || localStorage.getItem(XIAOKE_AGENT_RESPONSE_MODE_KEY) || "concise";
  return saved === "professional" ? "professional" : "concise";
}

function setAgentResponseMode(mode = "concise") {
  localStorage.setItem(XIAOKE_AGENT_RESPONSE_MODE_KEY, mode === "professional" ? "professional" : "concise");
  renderAgent();
}

function agentInvestmentFrameworkContext(responseMode = getAgentResponseMode()) {
  const professionalRules = responseMode === "professional" ? [
    "当前为专业研报模式，回答必须使用以下结构：",
    "1. 核心观点：先给结论、逻辑成立条件和当前置信度。",
    "2. 基本面分析：引用财报期、营收、利润、增长、毛利率、净利率、ROE、PE、PB和市值中实际存在的字段；缺失字段写未取得，严禁补造。",
    "3. 技术位置与多周期趋势：引用技术快照日期、MA5/20/60、5/20/60日涨跌、20日区间位置和量能；短期、中期、长期均给条件判断，不做确定性目标价承诺。",
    "4. 观察与应对：写当前判断、确认条件、失效条件和需要继续跟踪的数据。只能使用观察、等待确认、风险复盘等表述。",
    "5. 风险提示：至少列出基本面、估值、现金流或技术结构中有数据支撑的风险。",
    "6. 来源与覆盖：逐项写行情、财务、公告、技术日线和本地素材来源，并明确区分‘模型先生直接讨论’与‘公开数据 + 投资框架推断’。没有直接素材时必须坦诚说明。",
    "专业研报控制在 1200 至 2200 个汉字，使用 Markdown 标题和项目符号；数字必须带口径或日期，不重复免责声明。"
  ] : [
    "默认使用极简回答：先用一句话给结论，再列最多 4 条要点；全文控制在 300 个汉字以内。用户明确要求详细分析时才展开。",
    "只要提供了技术快照，回答必须引用至少 3 个具体数字并写明数据日期；必须给出一个确认条件和一个失效条件。"
  ];
  return {
    role: "system",
    content: [
      "你是小可课堂的 M-Model 投资助手。回答投资问题时必须按固定框架输出：",
      "1. 数据前提：先说明用了哪些来源，哪些数据缺失。",
      "2. 市场阶段：结合行情、题材、历史素材判断是建仓、洗盘、拉升、回踩还是出货观察。",
      "3. 核心矛盾：用公开信息、模型先生观点、书籍/视频证据解释主要矛盾。",
      "4. 观察清单：给出可复盘的条件，不给确定性买卖指令。",
      "5. 风险边界：明确什么情况说明判断失效。",
      "6. 引用来源：有证据包时用 [1]、[2] 标注；证据不足必须直说。",
      "严禁编造 PE、PB、财报、实时资金流；没有正式数据时说待接入或需复核。"
    ].join("\n")
  };
}

async function buildAgentContext(query) {
  const base = typeof agentLocalContext === "function" ? agentLocalContext(query) : collectAgentContext(query);
  const stockBriefs = await fetchAgentStockBriefs(query);
  window.currentAgentStockBriefs = stockBriefs;
  const stockContext = agentStockContext(stockBriefs);
  const context = [agentInvestmentFrameworkContext(), stockContext, ...base].filter(Boolean);
  try {
    const response = await fetch("/api/agent-search-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, context })
    });
    const data = await response.json();
    if (data.success) return [...context, ...memoryResultToContext(data.result)];
  } catch {}
  return context;
}

function signedText(value, suffix = "") {
  const num = Number(value || 0);
  const sign = num > 0 ? "+" : "";
  return sign + num.toFixed(2) + suffix;
}

function agentStockCardsHtml(briefs = []) {
  if (!briefs.length) return "";
  return `<div class="decision-grid" style="margin:10px 0">${briefs.map(item => {
    const pct = Number(item.pct || 0);
    const cls = pct >= 0 ? "up" : "down";
    return `
      <div class="panel" style="min-height:140px">
        <div class="panel-title">${escapeHtml(item.localName || item.name || item.key || "标的")}</div>
        <div class="video-group-row">
          ${item.localSector ? `<span class="video-group-badge">${escapeHtml(item.localSector)}</span>` : ""}
          ${item.key ? `<span class="video-group-badge">${escapeHtml(item.key)}</span>` : ""}
          <span class="video-group-badge">高置信</span>
        </div>
        <div class="quote-line ${cls}" style="margin:8px 0">
          <b>${item.price == null ? "行情待同步" : Number(item.price || 0).toFixed(2)}</b>
          ${item.pct == null ? "" : `<span>${signedText(item.pct, "%")}</span>`}
        </div>
        <p style="color:var(--muted);line-height:1.7">${escapeHtml(item.stage || item.dataQuality || "先基于本地知识库复盘")}</p>
        <p style="color:var(--muted);line-height:1.7">${escapeHtml(agentClip(item.localDesc || item.desc || item.dataQuality || "", 90))}</p>
      </div>
    `;
  }).join("")}</div>`;
}

function localStockAssistantLead(text, briefs = []) {
  if (!briefs.length) return "";
  const rows = briefs.map(item => {
    const name = item.localName || item.name || item.key;
    const quote = item.price == null ? "未取得实时行情" : `${Number(item.price || 0).toFixed(2)}，${signedText(item.pct, "%")}`;
    return `- ${name}：${quote}；${item.stage || "等待行情和本地素材共同确认"}。`;
  }).join("\n");
  return [
    "小可数据卡复盘",
    rows,
    "",
    "先给结论框架：我会把它当作“行情数据 + 模型先生历史素材 + 书籍/记忆”的交叉验证问题。当前第一优先级不是给买卖点，而是确认：趋势是否仍在、分歧后承接是否成立、风险边界有没有被击穿。"
  ].join("\n");
}

function renderAgent() {
  document.getElementById("agent").innerHTML = `
    <div class="agent-head">
      <span><span class="logo" style="display:inline-grid;width:30px;height:30px;margin-right:10px"><img src="assets/xiaoke-icon-64.png" alt=""></span>灏忓彲 Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="setAgentProvider(this.value)"><option value="auto">灏忓彲鍗忎綔</option></select>
        <span class="agent-status" id="agentStatus">妫€鏌ユā鍨?..</span>
        <button class="auto-btn" onclick="setAgentProvider('auto')">鑷姩鍒嗗伐</button>
        <button class="config-btn" onclick="openAgentConfig()">閰嶇疆</button>
        <button class="icon-btn" onclick="toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles" id="agentRoles"></div>
    <div class="agent-tabs">
      <button class="primary" onclick="askAgent('investment')">投资主脑</button>
      <button onclick="askAgent('content')">内容主脑</button>
      <button onclick="askAgent('system')">系统主脑</button>
      <button onclick="askAgent('team')">三脑复盘</button>
      <button onclick="showAgentEvidence()">查看证据</button>
      <button onclick="openAgentConfig()">路由规则</button>
      <button onclick="showAgentDiagnostics()">诊断</button>
      <button onclick="showAgentLogs()">调用日志</button>
      <button onclick="rememberCurrentAgentTurn()">记住这条</button>
      <button onclick="rememberAgentFocusFromInput()">记住关注</button>
      <button onclick="showAgentMemory()">查看记忆</button>
      <button onclick="clearAgentMemory()">清理记忆</button>
    </div>
    <div class="agent-chat" id="agentChat">
      <div class="bubble bot"><span class="route">小可课堂 / 投资知识库</span>你问股票时，我会先识别标的、同步行情卡、检索视频/书籍/记忆，再按“数据前提、市场阶段、核心矛盾、观察清单、风险边界”回答。</div>
    </div>
    <div class="agent-input"><input id="agentInput" placeholder="例如：模型先生怎么看中际旭创？分析寒武纪和光模块..." onkeydown="if(event.key==='Enter')sendAgent()"><button onclick="sendAgent()">发送</button></div>
  `;
  loadAgentProviders();
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>正在识别标的、同步行情并检索知识库...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const context = await buildAgentContext(text);
    const evidence = window.currentAgentEvidence || [];
    const briefs = window.currentAgentStockBriefs || [];
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "作为 WorkBuddy 投资主脑，请基于实时标的数据卡、证据包和上下文，按固定投资框架分析：\n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt, context, route.label);
      const contentPrompt = "作为内容主脑，请把下面的投资分析改写成通俗、有条理的小课堂表达，并保留来源编号：\n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt, context, route.label);
      answer = "WorkBuddy 投资判断\n" + invest + "\n\n内容主脑表达\n" + content + "\n\nCodex 系统建议\n" + codexSystemAnswer(text);
    } else {
      const prompt = [
        "请按小可 M-Model 投资助手固定框架回答：数据前提、市场阶段、核心矛盾、观察清单、风险边界、引用来源。",
        "不要给确定性买卖指令；没有正式数据就说明缺失。",
        "",
        text
      ].join("\n");
      answer = await callAgentProvider(route.provider, prompt, context, route.label);
    }
    const lead = localStockAssistantLead(text, briefs);
    const finalAnswer = lead ? `${lead}\n\nAI 深度分析\n${answer}` : answer;
    window.lastAgentEvidence = evidence;
    window.lastAgentTurn = { user: text, assistant: finalAnswer, route: route.label, at: new Date().toISOString(), evidence, stockBriefs: briefs };
    await autoPersistAgentMemory(text, finalAnswer, route.label);
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + agentStockCardsHtml(briefs) + escapeHtml(finalAnswer).replace(/\n/g, "<br>") + agentSourcesHtml(evidence);
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

async function callAgentProvider(provider, message, contextOverride = null, routeLabel = "") {
  const context = contextOverride || await buildAgentContext(message);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), provider === "mock" ? 12000 : 25000);
  try {
    const response = await fetch("/api/agent-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({ provider, message, context, route: routeLabel })
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "model failed");
    return data.answer;
  } catch (error) {
    if (provider === "mock") throw error;
    const fallback = await fetch("/api/agent-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "mock", message, context, route: "本地快速模式" })
    });
    const data = await fallback.json();
    if (!fallback.ok || !data.success) throw new Error(data.error || error.message || "model failed");
    return `【本地快速模式】外部模型暂时未及时返回，我先用本地知识库和行情卡完成复盘。\n\n${data.answer}`;
  } finally {
    clearTimeout(timer);
  }
}

function agentDiagnosisBadge(ok, text) {
  return `<span style="display:inline-flex;align-items:center;border-radius:999px;padding:3px 8px;margin:3px;border:1px solid ${ok ? "rgba(25,201,139,.35)" : "rgba(245,166,35,.42)"};background:${ok ? "rgba(25,201,139,.12)" : "rgba(245,166,35,.12)"};color:${ok ? "#a8f5d4" : "#ffd07a"};font-size:12px">${escapeHtml(text)}</span>`;
}

async function showAgentDiagnostics() {
  const chat = document.getElementById("agentChat");
  if (!chat) return;
  const pendingId = "agent_diag_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">诊断面板</span>正在检查供应商配置、最近失败和响应耗时...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const response = await fetch("/api/agent-diagnostics");
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "诊断失败");
    const stats = data.stats || {};
    const providerRows = (data.providerHealth || []).map(item => `
      <div style="border-top:1px solid rgba(255,255,255,.08);padding-top:8px;margin-top:8px">
        <b>${escapeHtml(item.name || item.id)}</b>
        ${agentDiagnosisBadge(Boolean(item.configured), item.configured ? "已配置" : "未配置")}
        ${agentDiagnosisBadge(!item.failures, `${item.failures || 0} 次失败`)}
        ${agentDiagnosisBadge(Number(item.lastDurationMs || 0) <= 20000, `${Number(item.lastDurationMs || 0)}ms`)}
        <div style="color:#a0a4b3;font-size:12px;margin-top:4px">模型：${escapeHtml(item.model || "-")} · 路径：${escapeHtml(item.responsePath || "-")} · 调用：${Number(item.calls || 0)}</div>
        ${(item.issues || []).length ? `<div style="color:#ffd07a;font-size:12px;margin-top:4px">问题：${escapeHtml(item.issues.join("；"))}</div>` : ""}
      </div>
    `).join("");
    const issueRows = (data.recentIssues || []).slice(0, 5).map(item => `
      <div style="border-top:1px solid rgba(255,255,255,.08);padding-top:8px;margin-top:8px">
        <b style="color:${item.ok ? "#a8f5d4" : "#ff9bad"}">${item.ok ? "正常" : "异常"}</b>
        ${escapeHtml(item.providerName || item.provider || "-")} · ${escapeHtml(item.diagnosis?.label || "-")}
        <div style="color:#a0a4b3;font-size:12px">${escapeHtml(item.at || "")} · ${Number(item.durationMs || 0)}ms · ${escapeHtml(item.diagnosis?.advice || "")}</div>
        ${item.error ? `<div style="color:#ff9bad;font-size:12px">${escapeHtml(item.error)}</div>` : ""}
      </div>
    `).join("");
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `
        <span class="route">诊断面板</span>
        <div style="font-weight:900;color:#a8f5d4">${escapeHtml(data.summary || "诊断完成")}</div>
        <div style="margin-top:8px">
          ${agentDiagnosisBadge(true, `最近调用 ${stats.recentCalls || 0}`)}
          ${agentDiagnosisBadge(!stats.failures, `失败 ${stats.failures || 0}`)}
          ${agentDiagnosisBadge(!stats.slowCalls, `慢调用 ${stats.slowCalls || 0}`)}
          ${agentDiagnosisBadge(true, `已配供应商 ${stats.configuredProviders || 0}`)}
        </div>
        ${(data.suggestions || []).length ? `<div style="margin-top:10px"><b>建议</b><br>${(data.suggestions || []).map(item => `- ${escapeHtml(item)}`).join("<br>")}</div>` : ""}
        <details open style="margin-top:10px"><summary style="cursor:pointer;color:#9fc5ff">供应商健康状态</summary>${providerRows || "暂无供应商数据"}</details>
        <details style="margin-top:10px"><summary style="cursor:pointer;color:#9fc5ff">最近问题</summary>${issueRows || "暂无调用记录"}</details>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="small-btn" onclick="openAgentConfig()">打开配置</button><button class="small-btn" onclick="showAgentLogs()">查看原始日志</button></div>
      `;
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">诊断面板</span>${escapeHtml(error.message || "诊断失败")}`;
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

async function showAgentLogs() {
  const chat = document.getElementById("agentChat");
  if (!chat) return;
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="agent_logs_pending"><span class="route">\u8c03\u7528\u65e5\u5fd7</span>\u6b63\u5728\u8bfb\u53d6\u6700\u8fd1\u7684\u6a21\u578b\u8c03\u7528\u8bb0\u5f55...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const response = await fetch("/api/agent-logs?limit=30");
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "\u8bfb\u53d6\u65e5\u5fd7\u5931\u8d25");
    const logs = data.logs || [];
    const html = logs.length
      ? logs.map(item => {
          const state = item.ok ? "\u6210\u529f" : "\u5931\u8d25";
          const color = item.ok ? "#a8f5d4" : "#ff9bad";
          return `<div style="border-top:1px solid rgba(255,255,255,.08);padding-top:8px;margin-top:8px">
            <b style="color:${color}">${state}</b> ${escapeHtml(item.kind || "chat")} · ${escapeHtml(item.providerName || item.provider || "-")} · ${escapeHtml(item.model || "-")}
            <div style="color:#a0a4b3;font-size:12px">${escapeHtml(item.at || "")} · ${Number(item.durationMs || 0)}ms · route: ${escapeHtml(item.route || "-")} · path: ${escapeHtml(item.responsePath || "-")}</div>
            ${item.error ? `<div style="color:#ff9bad;font-size:12px">${escapeHtml(item.error)}</div>` : ""}
          </div>`;
        }).join("")
      : "\u6682\u65e0\u8c03\u7528\u65e5\u5fd7";
    const node = document.getElementById("agent_logs_pending");
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">\u8c03\u7528\u65e5\u5fd7</span>${html}<div style="margin-top:10px"><button class="small-btn" onclick="clearAgentLogs()">\u6e05\u7a7a\u65e5\u5fd7</button></div>`;
    }
  } catch (error) {
    const node = document.getElementById("agent_logs_pending");
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">\u8c03\u7528\u65e5\u5fd7</span>${escapeHtml(error.message || "\u8bfb\u53d6\u65e5\u5fd7\u5931\u8d25")}`;
    }
  }
}

async function clearAgentLogs() {
  await fetch("/api/agent-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "clear" })
  });
  showToast("\u8c03\u7528\u65e5\u5fd7\u5df2\u6e05\u7a7a");
  showAgentLogs();
}

function rankedAgentVideos(query, limit = 10) {
  const queryText = String(query || "").trim();
  const targetStocks = detectAgentStockTargets(queryText);
  const targetNames = targetStocks.map(item => item.name).filter(Boolean);
  const targetKeys = targetStocks.map(item => item.quoteKey || item.key || "").filter(Boolean);
  const tokens = agentTokens(queryText)
    .filter(token => token && token.length >= 2 && !["分析", "一个", "什么", "怎么", "看看", "模型", "先生"].includes(token))
    .slice(0, 30);
  const current = state.videos.find(item => item.id === state.currentVideoId && !item.isDocument && !xiaokeIsBookDocument(item));
  const rows = libraryVideos().filter(v => !v.isDocument && !xiaokeIsBookDocument(v)).map(v => {
    const text = agentVideoSearchText(v);
    const title = getVideoDetailTitle(v);
    let score = tokens.length ? agentScoreText(text, tokens) : 0;
    targetNames.forEach(name => {
      if (name && text.includes(name)) score += 36;
      if (name && title.includes(name)) score += 24;
    });
    targetKeys.forEach(key => {
      if (key && text.toLowerCase().includes(String(key).toLowerCase())) score += 18;
    });
    if (!targetNames.length && !tokens.length) score += 1;
    if (current && v.id === current.id && queryText && text.includes(queryText)) score += 8;
    return { v, score };
  });
  const threshold = targetNames.length ? 8 : (tokens.length ? 2 : 1);
  return rows
    .filter(row => row.score >= threshold)
    .sort((a, b) => b.score - a.score || String(b.v.date || "").localeCompare(String(a.v.date || "")))
    .slice(0, limit);
}

function metricValueText(value, suffix = "") {
  if (value === undefined || value === null || value === "") return "-";
  return `${value}${suffix}`;
}

function stockFinanceMetricHtml(label, value, suffix = "") {
  return `
    <div class="pipeline-stat" style="min-height:58px;padding:8px;min-width:0;overflow:hidden">
      <b style="font-size:15px;line-height:1.2;white-space:normal;overflow-wrap:anywhere">${escapeHtml(metricValueText(value, suffix))}</b>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function agentStockContext(briefs = []) {
  if (!briefs.length) return null;
  const lines = briefs.map(item => [
    `标的：${item.localName || item.name || item.key}`,
    `代码：${item.key || item.quoteKey || "-"}`,
    `板块：${item.localSector || item.sector || "-"}`,
    `现价：${item.price == null ? "-" : item.price}`,
    `涨跌幅：${item.pct == null ? "-" : item.pct + "%"}`,
    `PE：${item.pe || "-"}`,
    `PB：${item.pb || "-"}`,
    `市值：${item.marketCap || "-"}`,
    `毛利率：${item.grossMargin || "-"}`,
    `净利率：${item.netMargin || "-"}`,
    `ROE：${item.roe || "-"}`,
    `营收增速：${item.revenueGrowth || "-"}`,
    `利润增速：${item.profitGrowth || "-"}`,
    `营收：${item.revenue || "-"}`,
    `归母净利：${item.netProfit || "-"}`,
    `财报期：${item.financialReportDate || "-"}`,
    `最新公告：${(item.latestAnnouncements || []).map(a => `${a.date || "-"} ${a.riskTag || "公告"} ${a.title || ""}`).filter(Boolean).join("；") || "-"}`,
    `公告摘要：${(item.latestAnnouncements || []).map(a => a.summary || (a.riskPoints || []).join("；")).filter(Boolean).slice(0, 2).join("；") || "-"}`,
    `公告风险点：${(item.latestAnnouncements || []).flatMap(a => a.riskPoints || []).filter(Boolean).slice(0, 6).join("；") || "-"}`,
    `公告来源：${item.announcementSource || ((item.latestAnnouncements || []).length ? "巨潮资讯公告" : "-")}`,
    `阶段判断：${item.stage || "-"}`,
    `本地档案：${item.localDesc || item.desc || "-"}`,
    `财务备注：${item.profileNote || "-"}`,
    `数据质量：${item.dataQuality || "-"}`
  ].join("\n"));
  return {
    role: "user",
    content: [
      "【实时标的数据卡】",
      "这些数据只用于辅助复盘，不能替代正式行情终端和人工核验。",
      lines.join("\n\n")
    ].join("\n")
  };
}

function agentStockCardsHtml(briefs = []) {
  if (!briefs.length) return "";
  return `<div class="agent-stock-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin:10px 0;max-width:100%">${briefs.map(item => {
    const pct = Number(item.pct || 0);
    const cls = pct >= 0 ? "up" : "down";
    return `
      <div class="panel" style="min-height:190px;min-width:0;overflow:hidden">
        <div class="panel-title">${escapeHtml(item.localName || item.name || item.key || "标的")}</div>
        <div class="video-group-row">
          ${item.localSector || item.sector ? `<span class="video-group-badge">${escapeHtml(item.localSector || item.sector)}</span>` : ""}
          ${item.key ? `<span class="video-group-badge">${escapeHtml(item.key)}</span>` : ""}
          <span class="video-group-badge">${item.hasProfile ? "财务档案" : "待补财务"}</span>
        </div>
        <div class="quote-line ${cls}" style="margin:8px 0">
          <b>${item.price == null ? "行情待同步" : Number(item.price || 0).toFixed(2)}</b>
          ${item.pct == null ? "" : `<span>${signedText(item.pct, "%")}</span>`}
        </div>
        <div class="pipeline-grid" style="grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px;margin:10px 0">
          ${stockFinanceMetricHtml("PE", item.pe)}
          ${stockFinanceMetricHtml("PB", item.pb)}
          ${stockFinanceMetricHtml("市值", item.marketCap)}
          ${stockFinanceMetricHtml("毛利率", item.grossMargin, item.grossMargin !== "" && item.grossMargin !== undefined ? "%" : "")}
          ${stockFinanceMetricHtml("净利率", item.netMargin, item.netMargin !== "" && item.netMargin !== undefined ? "%" : "")}
          ${stockFinanceMetricHtml("ROE", item.roe, item.roe !== "" && item.roe !== undefined ? "%" : "")}
          ${stockFinanceMetricHtml("营收增速", item.revenueGrowth, item.revenueGrowth !== "" && item.revenueGrowth !== undefined ? "%" : "")}
          ${stockFinanceMetricHtml("利润增速", item.profitGrowth, item.profitGrowth !== "" && item.profitGrowth !== undefined ? "%" : "")}
        </div>
        <div class="date">${escapeHtml([item.financialReportDate ? `财报期：${item.financialReportDate}` : "", item.profileSource ? `数据来源：${item.profileSource}` : ""].filter(Boolean).join(" · "))}</div>
        ${(item.latestAnnouncements || []).length ? `
          <div class="date" style="margin-top:8px">最近公告</div>
          <div class="video-group-row">
            ${(item.latestAnnouncements || []).slice(0, 3).map(a => `<span class="video-group-badge">${escapeHtml((a.date || "-") + " " + (a.riskTag || "公告"))}</span>`).join("")}
          </div>
          <p style="color:var(--muted);line-height:1.7">${escapeHtml((item.latestAnnouncements || []).slice(0, 2).map(a => a.title).join("；"))}</p>
          ${(item.latestAnnouncements || []).some(a => a.summary || (a.riskPoints || []).length) ? `<p style="color:#ffd07a;line-height:1.7">${escapeHtml((item.latestAnnouncements || []).slice(0, 2).map(a => (a.riskPoints || []).slice(0, 2).join("；") || agentClip(a.summary || "", 120)).filter(Boolean).join("；"))}</p>` : ""}
        ` : ""}
        <p style="color:var(--muted);line-height:1.7">${escapeHtml(item.stage || item.dataQuality || "先基于本地知识库复盘")}</p>
        ${item.profileNote ? `<p style="color:var(--muted);line-height:1.7">${escapeHtml(agentClip(item.profileNote, 140))}</p>` : ""}
        <div class="analysis-actions"><button class="small-btn" onclick='openStockProfileEditor(${JSON.stringify(item)})'>补/改财务档案</button></div>
      </div>
    `;
  }).join("")}</div>`;
}

async function openStockProfileEditor(item = {}) {
  const key = item.key || item.quoteKey || "";
  const name = prompt("标的名称", item.localName || item.name || "") || "";
  if (!name.trim() && !key) return;
  const pe = prompt("PE（没有就留空）", item.pe || "") || "";
  const pb = prompt("PB（没有就留空）", item.pb || "") || "";
  const marketCap = prompt("市值，例如 12931亿（没有就留空）", item.marketCap || "") || "";
  const grossMargin = prompt("毛利率，只填数字", item.grossMargin || "") || "";
  const revenueGrowth = prompt("营收增速，只填数字", item.revenueGrowth || "") || "";
  const profitGrowth = prompt("利润增速，只填数字", item.profitGrowth || "") || "";
  const note = prompt("财务/估值备注", item.profileNote || item.localDesc || "") || "";
  const payload = {
    key,
    name: name.trim(),
    sector: item.localSector || item.sector || "",
    pe,
    pb,
    marketCap,
    grossMargin,
    revenueGrowth,
    profitGrowth,
    note,
    dataSource: "手动录入"
  };
  try {
    const response = await fetch("/api/stock-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "保存失败");
    showToast("股票财务档案已保存");
    if (state.view === "stockProfiles") renderStockProfiles();
  } catch (error) {
    showToast(error.message || "保存股票档案失败");
  }
}

async function fetchStockProfiles() {
  try {
    const response = await fetch("/api/stock-profiles");
    const data = await response.json().catch(() => ({}));
    if (!data.success) return [];
    return Array.isArray(data.profiles && data.profiles.items) ? data.profiles.items : [];
  } catch {
    return [];
  }
}

function stockProfileByKey(profiles = []) {
  const map = new Map();
  profiles.forEach(item => {
    if (item && item.key) map.set(String(item.key), item);
  });
  return map;
}

async function stockProfileRowsForPage() {
  const watchItems = (typeof flattenWatchlist === "function" ? flattenWatchlist() : [])
    .filter(item => item && item.name && item.sector !== "鎸囨暟" && !/^s_/.test(item.quoteKey || ""));
  const profiles = await fetchStockProfiles();
  const profileItems = profiles
    .filter(profile => profile && profile.key)
    .filter(profile => !watchItems.some(item => (item.quoteKey || item.name) === profile.key))
    .map(profile => ({
      name: profile.name || profile.key,
      quoteKey: profile.key,
      sector: profile.sector || "鑷缓妗ｆ",
      desc: profile.note || "",
      isProfileOnly: true
    }));
  const items = [...watchItems, ...profileItems];
  const keys = [...new Set(items.map(item => item.quoteKey || item.name).filter(Boolean))];
  const profileMap = stockProfileByKey(profiles);
  let briefMap = new Map();
  if (keys.length) {
    try {
      const response = await fetch("/api/stock-brief?keys=" + encodeURIComponent(keys.join(",")));
      const data = await response.json().catch(() => ({}));
      briefMap = new Map((data.items || []).map(item => [item.key, item]));
    } catch {}
  }
  return items.map(item => {
    const key = item.quoteKey || item.name;
    const brief = briefMap.get(key) || briefMap.get(String(key).toLowerCase()) || {};
    const profile = profileMap.get(key) || {};
    const related = typeof relatedAgentVideos === "function" ? relatedAgentVideos(item.name, 8) : [];
    return { item, key, brief, profile, related };
  });
}

function stockProfilePayloadFromBrief(brief = {}, fallback = {}) {
  const key = brief.key || fallback.quoteKey || fallback.key || "";
  const name = brief.name || fallback.name || key;
  return {
    key,
    name,
    sector: fallback.sector || brief.sector || "",
    pe: brief.pe || "",
    pb: brief.pb || "",
    marketCap: brief.marketCap || "",
    grossMargin: brief.grossMargin || "",
    revenueGrowth: brief.revenueGrowth || "",
    profitGrowth: brief.profitGrowth || "",
    note: [
      fallback.desc || "",
      brief.financialReportDate ? `财报期：${brief.financialReportDate}` : "",
      brief.revenue ? `营收：${brief.revenue}` : "",
      brief.netProfit ? `归母净利：${brief.netProfit}` : "",
      brief.roe ? `ROE：${brief.roe}%` : "",
      brief.netMargin ? `净利率：${brief.netMargin}%` : "",
      brief.turnoverRate ? `换手率：${brief.turnoverRate}%` : "",
      brief.amplitude ? `振幅：${brief.amplitude}%` : ""
    ].filter(Boolean).join("；"),
    dataSource: brief.profileSource || "东方财富搜索 / 腾讯行情估值 / 东方财富财务"
  };
}

async function saveStockProfilePayload(payload) {
  const response = await fetch("/api/stock-profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.error || "保存股票档案失败");
  return data;
}

async function searchAndSaveStockProfile() {
  const input = document.getElementById("stockProfileSearchInput");
  const query = input ? input.value.trim() : "";
  if (!query) {
    showToast("先输入股票名或代码");
    return;
  }
  showToast("正在搜索并同步股票档案...");
  try {
    const response = await fetch("/api/stock-brief?keys=" + encodeURIComponent(query));
    const data = await response.json().catch(() => ({}));
    const brief = data.items && data.items[0];
    if (!data.success || !brief || !brief.key) throw new Error("没有找到匹配股票");
    await saveStockProfilePayload(stockProfilePayloadFromBrief(brief, { name: query }));
    if (input) input.value = "";
    showToast(`已建立档案：${brief.name || brief.key}`);
    await renderStockProfiles();
  } catch (error) {
    showToast(error.message || "建立股票档案失败");
  }
}

function metricCell(label, value, suffix = "") {
  return `
    <div class="pipeline-stat" style="padding:10px;min-height:62px">
      <b style="font-size:18px">${escapeHtml(metricValueText(value, suffix))}</b>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function stockMetricCell(label, value, suffix = "") {
  return `
    <div class="stock-metric-cell">
      <b>${escapeHtml(metricValueText(value, suffix))}</b>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function readStockRiskRadar() {
  try {
    const data = JSON.parse(localStorage.getItem(STOCK_RISK_RADAR_KEY) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function writeStockRiskRadar(data) {
  try {
    localStorage.setItem(STOCK_RISK_RADAR_KEY, JSON.stringify(data || {}));
  } catch {}
}

function stockRiskCacheKey(key) {
  return String(key || "").trim().toLowerCase();
}

function stockRiskRadarForKey(key) {
  const cache = readStockRiskRadar();
  return cache[stockRiskCacheKey(key)] || null;
}

function stockRiskLevelFromAnnouncements(items = []) {
  const text = (items || []).map(item => [
    item.riskTag,
    item.title,
    item.summary,
    ...(item.riskPoints || [])
  ].filter(Boolean).join(" ")).join(" ");
  const riskPointCount = (items || []).reduce((sum, item) => sum + ((item.riskPoints || []).length), 0);
  if (!items.length) return { level: "unknown", label: "待同步", score: 0 };
  if (/澄清|监管|处罚|诉讼|仲裁|立案|问询|减持|质押|亏损|风险|异常|警示/.test(text) || riskPointCount >= 2) {
    return { level: "high", label: "需复核", score: 3 };
  }
  if (/提示|更正|变更|波动|延期|担保|关联交易/.test(text) || riskPointCount >= 1) {
    return { level: "medium", label: "观察", score: 2 };
  }
  return { level: "low", label: "常规", score: 1 };
}

function stockRiskBadgeHtml(levelInfo) {
  const info = levelInfo || { level: "unknown", label: "待同步" };
  const palette = {
    high: "background:rgba(239,68,68,.16);border-color:rgba(239,68,68,.42);color:#ff9a9a",
    medium: "background:rgba(245,158,11,.16);border-color:rgba(245,158,11,.42);color:#ffd38a",
    low: "background:rgba(16,185,129,.15);border-color:rgba(16,185,129,.38);color:#7ee6bd",
    unknown: "background:rgba(148,163,184,.12);border-color:rgba(148,163,184,.28);color:#cbd5e1"
  };
  return `<span class="tag" style="${palette[info.level] || palette.unknown}">公告${escapeHtml(info.label || "待同步")}</span>`;
}

function stockRiskRadarHtml(key) {
  const data = stockRiskRadarForKey(key);
  if (!data) return `<div class="date" style="margin:8px 0">${stockRiskBadgeHtml({ level: "unknown", label: "待同步" })} <span>点击“刷新公告雷达”后读取公告原文。</span></div>`;
  const points = (data.items || []).flatMap(item => item.riskPoints || []).slice(0, 2);
  const latest = (data.items || [])[0];
  return `
    <div class="date" style="margin:8px 0;line-height:1.7">
      ${stockRiskBadgeHtml(data.levelInfo)}
      <span>${escapeHtml(latest ? `${latest.date || ""} ${latest.title || ""}` : "暂无公告")}</span>
      ${points.length ? `<div style="color:#fca5a5">${escapeHtml(points.join("；"))}</div>` : ""}
    </div>
  `;
}

function stockRiskStats(rows = []) {
  const stats = { high: 0, medium: 0, low: 0, unknown: 0 };
  rows.forEach(row => {
    const data = stockRiskRadarForKey(row.key || row.item?.name);
    const level = data?.levelInfo?.level || "unknown";
    stats[level] = (stats[level] || 0) + 1;
  });
  return stats;
}

async function fetchStockAnnouncementRadar(query) {
  const response = await fetch("/api/stock-announcements?keys=" + encodeURIComponent(query) + "&limit=3&text=1&textLimit=5000");
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.error || "公告同步失败");
  const items = (data.items || []).map(item => ({
    date: item.date || "",
    title: item.title || "",
    riskTag: item.riskTag || "",
    summary: item.summary || "",
    riskPoints: item.riskPoints || [],
    url: item.url || "",
    needsOcr: !!item.needsOcr
  }));
  return {
    at: new Date().toISOString(),
    levelInfo: stockRiskLevelFromAnnouncements(items),
    items,
    source: data.source || "巨潮资讯公告"
  };
}

async function refreshStockRiskRadar() {
  const rows = await stockProfileRowsForPage();
  const cache = readStockRiskRadar();
  const targets = rows.filter(row => row && (row.key || row.item?.name)).slice(0, 80);
  if (!targets.length) {
    showToast("暂无可同步的股票档案");
    return;
  }
  showToast(`正在同步公告风险雷达：0/${targets.length}`);
  let done = 0;
  for (const row of targets) {
    const query = row.key || row.item?.name;
    try {
      const radar = await fetchStockAnnouncementRadar(query);
      cache[stockRiskCacheKey(row.key || query)] = radar;
      if (row.item?.name) cache[stockRiskCacheKey(row.item.name)] = radar;
      if (row.brief?.name) cache[stockRiskCacheKey(row.brief.name)] = radar;
    } catch (error) {
      cache[stockRiskCacheKey(row.key || query)] = {
        at: new Date().toISOString(),
        levelInfo: { level: "unknown", label: "同步失败", score: 0 },
        items: [],
        error: error.message || "公告同步失败"
      };
    }
    done += 1;
    if (done === targets.length || done % 5 === 0) showToast(`正在同步公告风险雷达：${done}/${targets.length}`);
  }
  writeStockRiskRadar(cache);
  showToast("公告风险雷达已更新");
  if (state.view === "stockProfiles") renderStockProfiles();
}

async function rememberLatestAnnouncement(key) {
  const query = String(key || "").trim();
  if (!query) return;
  showToast("正在读取最新公告并写入记忆...");
  try {
    const response = await fetch("/api/stock-announcements?keys=" + encodeURIComponent(query) + "&limit=1&text=1&textLimit=8000");
    const data = await response.json().catch(() => ({}));
    const item = data.items && data.items[0];
    if (!data.success || !item) throw new Error(data.error || "没有可记忆的公告");
    const text = [
      `公告记忆：${query} ${item.date || ""} ${item.title || ""}`,
      item.summary ? `摘要：${agentClip(item.summary, 600)}` : "",
      (item.riskPoints || []).length ? `风险点：${item.riskPoints.join("；")}` : "",
      `来源：${item.url || "巨潮资讯公告"}`
    ].filter(Boolean).join("\n");
    const saved = await saveAgentMemoryQuiet("memory", text, ["announcement", query]);
    showToast(saved ? "公告已沉淀到 Agent 记忆" : "公告记忆写入失败");
  } catch (error) {
    showToast(error.message || "公告记忆写入失败");
  }
}

function stockProfileRowHtml(row) {
  const item = row.item || {};
  const brief = row.brief || {};
  const profile = row.profile || {};
  const pct = Number(brief.pct || 0);
  const cls = pct >= 0 ? "up" : "down";
  const merged = {
    key: row.key,
    quoteKey: row.key,
    name: profile.name || brief.name || item.name,
    localName: item.name,
    localSector: item.sector || profile.sector || brief.sector || "",
    sector: profile.sector || item.sector || brief.sector || "",
    pe: profile.pe || brief.pe || "",
    pb: profile.pb || brief.pb || "",
    marketCap: profile.marketCap || brief.marketCap || "",
    grossMargin: profile.grossMargin || brief.grossMargin || "",
    netMargin: brief.netMargin || "",
    roe: brief.roe || "",
    revenueGrowth: profile.revenueGrowth || brief.revenueGrowth || "",
    profitGrowth: profile.profitGrowth || brief.profitGrowth || "",
    revenue: brief.revenue || "",
    netProfit: brief.netProfit || "",
    financialReportDate: brief.financialReportDate || "",
    profileNote: profile.note || brief.profileNote || item.desc || "",
    dataSource: profile.dataSource || brief.profileSource || "",
    profileSource: profile.dataSource || brief.profileSource || "",
    desc: item.desc || ""
  };
  return `
    <article class="panel" style="min-height:260px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">${escapeHtml(item.name || brief.name || row.key)}</div>
          <div class="date">${escapeHtml(row.key || "-")} · ${escapeHtml(item.sector || profile.sector || "-")} · 相关素材 ${row.related.length} 条</div>
        </div>
        <div class="quote-line ${cls}" style="min-width:150px;justify-content:flex-end">
          <b>${brief.price == null ? "行情待同步" : Number(brief.price || 0).toFixed(2)}</b>
          ${brief.pct == null ? "" : `<span>${signedText(brief.pct, "%")}</span>`}
        </div>
      </div>
      ${stockRiskRadarHtml(row.key || item.name || merged.name)}
      <div class="stock-metric-grid">
        ${stockMetricCell("PE", merged.pe)}
        ${stockMetricCell("PB", merged.pb)}
        ${stockMetricCell("市值", merged.marketCap)}
        ${stockMetricCell("毛利率", merged.grossMargin, merged.grossMargin !== "" && merged.grossMargin !== undefined ? "%" : "")}
        ${stockMetricCell("净利率", merged.netMargin, merged.netMargin !== "" && merged.netMargin !== undefined ? "%" : "")}
        ${stockMetricCell("ROE", merged.roe, merged.roe !== "" && merged.roe !== undefined ? "%" : "")}
        ${stockMetricCell("营收增速", merged.revenueGrowth, merged.revenueGrowth !== "" && merged.revenueGrowth !== undefined ? "%" : "")}
        ${stockMetricCell("利润增速", merged.profitGrowth, merged.profitGrowth !== "" && merged.profitGrowth !== undefined ? "%" : "")}
      </div>
      <div class="date">${escapeHtml([merged.financialReportDate ? `财报期：${merged.financialReportDate}` : "", merged.revenue ? `营收：${merged.revenue}` : "", merged.netProfit ? `归母净利：${merged.netProfit}` : "", merged.profileSource ? `数据来源：${merged.profileSource}` : ""].filter(Boolean).join(" · "))}</div>
      <p style="color:var(--muted);line-height:1.7">${escapeHtml(brief.stage || "等待行情和本地素材共同确认。")}</p>
      <p style="color:var(--muted);line-height:1.7">${escapeHtml(agentClip(merged.profileNote || item.desc || "", 180))}</p>
      <div class="analysis-actions stock-card-actions" style="justify-content:flex-start">
        <button class="small-btn" onclick='rememberLatestAnnouncement(${JSON.stringify(row.key || merged.key || merged.name)})'>记公告</button>
        <button class="small-btn" onclick='openStockProfileEditor(${JSON.stringify(merged)})'>补/改财务档案</button>
        <button class="small-btn" onclick='addStockComparePoolItem(${JSON.stringify(item.name || merged.name || row.key)})'>加入对比</button>
        <button class="small-btn" onclick='showStockAnnouncements(${JSON.stringify(row.key || merged.key || merged.name)})'>看公告</button>
        <button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("分析" + (item.name || merged.name) + "，结合行情、财务档案、历史素材和风险边界。")}, "investment", true)'>问 Agent</button>
        <button class="small-btn" onclick='filterByStock(${JSON.stringify(item.name || merged.name)})'>看素材</button>
      </div>
    </article>
  `;
}

async function showStockAnnouncements(key) {
  const query = String(key || "").trim();
  if (!query) return;
  showToast("正在拉取最近公告...");
  try {
    const response = await fetch("/api/stock-announcements?keys=" + encodeURIComponent(query) + "&limit=8&text=1&textLimit=8000");
    const data = await response.json().catch(() => ({}));
    if (!data.success) throw new Error(data.error || "公告拉取失败");
    const rows = data.items || [];
    if (!rows.length) {
      alert("暂未拉到公告，建议换股票代码重试。");
      return;
    }
    alert(rows.map((item, idx) => [
      `${idx + 1}. ${item.date || "-"} [${item.riskTag || "公告"}]`,
      item.title,
      item.summary ? `摘要：${agentClip(item.summary, 360)}` : (item.needsOcr ? "摘要：PDF 未提取到正文，可能需要 OCR 或人工打开原文。" : ""),
      (item.riskPoints || []).length ? `风险点：${item.riskPoints.join("；")}` : "",
      item.url || ""
    ].filter(Boolean).join("\n")).join("\n\n"));
  } catch (error) {
    showToast(error.message || "公告拉取失败");
  }
}

function openQuantWorkbenchWindow() {
  window.open("quant.html?nocache=" + Date.now(), "xiaoke_quant_workbench");
}

async function openStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  await renderStockProfiles();
}

async function renderStockProfiles() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">把关注标的的行情、估值、财务备注和相关素材集中管理，Agent 会自动读取这里的数据。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillStockProfilesFromQuotes()">自动补行情估值</button>
        <button class="small-btn" onclick="refreshStockRiskRadar()">刷新公告雷达</button>
        <button class="small-btn" onclick="probeInstitutionalTerminals(false)">机构终端测试</button>
        <button class="small-btn" onclick="showDataSourceHealth()">数据源状态</button>
        <button class="small-btn" onclick="renderStockProfiles()">刷新</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel" style="margin-top:12px"><div class="date">正在同步股票档案...</div></section>
  `;
  const rows = await stockProfileRowsForPage();
  const filled = rows.filter(row => row.profile && row.profile.key).length;
  const missing = rows.length - filled;
  const riskStats = stockRiskStats(rows);
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">共 ${rows.length} 个标的，已补财务 ${filled} 个，待补 ${missing} 个。可直接输入股票名或代码建立档案。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillStockProfilesFromQuotes()">自动补行情估值</button>
        <button class="small-btn" onclick="refreshStockRiskRadar()">刷新公告雷达</button>
        <button class="small-btn" onclick="probeInstitutionalTerminals(false)">机构终端测试</button>
        <button class="small-btn" onclick="showDataSourceHealth()">数据源状态</button>
        <button class="small-btn" onclick="renderStockProfiles()">刷新</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search" style="width:min(520px,52vw)"><span>🔎</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码，例如：长电科技 / 600584 / 寒武纪" onkeydown="if(event.key==='Enter')searchAndSaveStockProfile()"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openAgentWithQuestion('帮我分析' + (document.getElementById('stockProfileSearchInput')?.value || '中际旭创') + '，结合行情、东方财富财务、本地视频和书籍证据链。', 'investment', true)">问 Agent</button>
      </div>
      <div class="date" style="margin-top:8px">会自动解析中文股票名，优先使用机构终端，未连接时回退腾讯行情、东方财富财务，并保存 PE/PB、市值、财报摘要和数据来源。</div>
    </section>
    <section class="panel" id="institutionalProbePanel" style="display:none;margin-top:12px"></section>
    <section class="panel" style="margin-top:12px;background:linear-gradient(180deg,rgba(25,201,139,.08),rgba(18,24,31,.9));border-color:rgba(25,201,139,.22)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">量化工作台已拆出独立窗口</div>
          <div class="date">股票档案页只负责档案、公告、财务和素材关联；多股对比、回测、轮动、参数矩阵放到独立量化窗口。</div>
        </div>
        <div class="review-actions">
          <button class="open-btn" style="width:auto;padding:0 16px" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
          <button class="small-btn" onclick="showDataSourceHealth()">数据源状态</button>
          <button class="small-btn" onclick="syncQmtBridgeCodes()">同步 QMT</button>
        </div>
      </div>
      <div class="pipeline-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:10px">
        ${metricCell("多股对比", "独立窗口")}
        ${metricCell("轻量回测", "独立窗口")}
        ${metricCell("轮动风控", "独立窗口")}
        ${metricCell("量化报告", "独立窗口")}
      </div>
      <div class="date" style="margin-top:10px">以后主看板负责看素材和档案，量化窗口负责跑验证，两个工作流分开。</div>
    </section>
    <section class="pipeline-grid" style="grid-template-columns:repeat(8,minmax(0,1fr));margin-top:12px">
      ${metricCell("档案标的", rows.length)}
      ${metricCell("已补财务", filled)}
      ${metricCell("待补财务", missing)}
      ${metricCell("行情同步", rows.filter(row => row.brief && row.brief.price != null).length)}
      ${metricCell("公告需复核", riskStats.high)}
      ${metricCell("公告观察", riskStats.medium)}
      ${metricCell("公告常规", riskStats.low)}
      ${metricCell("公告待同步", riskStats.unknown)}
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(stockProfileRowHtml).join("") || `<div class="panel">暂无关注标的。</div>`}
    </section>
  `;
  renderStockComparePool();
}

function institutionalStatusText(status) {
  return {
    connected: "已连接",
    imported: "SDK 鍙敤",
    login_required: "需账号",
    not_installed: "未安装",
    python_incompatible: "Python 不兼容",
    import_failed: "导入失败",
    connect_failed: "连接失败"
  }[status] || status || "未知";
}

function institutionalStatusClass(status) {
  if (status === "connected") return "decision-chip good";
  if (status === "imported") return "decision-chip";
  if (status === "login_required") return "decision-chip warn";
  if (status === "python_incompatible") return "decision-chip warn";
  return "decision-chip danger";
}

function institutionalProbeProviderHtml(item = {}) {
  const credentials = item.credentials || {};
  const credentialText = Object.keys(credentials).length
    ? Object.entries(credentials).map(([key, ok]) => `${key}:${ok ? "已配置" : "未配置"}`).join(" / ")
    : "通常依赖本机授权终端";
  return `
    <div class="decision-card">
      <div class="metadata-head">
        <div>
          <div class="panel-title">${escapeHtml(item.name || item.id || "机构终端")}</div>
          <div class="date">${escapeHtml(item.module || "")}</div>
        </div>
        <span class="${institutionalStatusClass(item.status)}">${escapeHtml(institutionalStatusText(item.status))}</span>
      </div>
      <div class="date" style="margin-top:8px">SDK：${item.importOk ? "可导入" : "未找到"}；连接：${item.connectOk ? "成功" : "未成功"}；凭据：${escapeHtml(credentialText)}</div>
      <div class="date" style="margin-top:8px">${escapeHtml(item.message || "")}</div>
      ${item.error ? `<pre style="white-space:pre-wrap;margin-top:8px;max-height:120px;overflow:auto;color:#aeb6c6">${escapeHtml(item.error)}</pre>` : ""}
    </div>
  `;
}

function renderInstitutionalProbeResult(data = {}) {
  const panel = document.getElementById("institutionalProbePanel");
  if (!panel) return;
  const providers = data.providers || [];
  const configuredPaths = data.configuredPaths || [];
  panel.style.display = "block";
  panel.innerHTML = `
    <div class="metadata-head">
      <div>
        <div class="panel-title">机构终端接入测试</div>
        <div class="date">检测 Wind / iFinD / Choice SDK、账号环境和本机授权连接状态。最后检测：${escapeHtml(data.checkedAt || "刚刚")}</div>
        <div class="date" style="margin-top:4px">自定义 SDK 路径：${configuredPaths.length ? configuredPaths.map(escapeHtml).join("；") : "未配置，可用 INSTITUTIONAL_SDK_PATHS / WINDPY_PATH / IFINDPY_PATH / EMQUANTAPI_PATH 指定"}</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="probeInstitutionalTerminals(false)">重新检测</button>
        <button class="open-btn" style="width:auto;padding:0 14px" onclick="probeInstitutionalTerminals(true)">尝试连接</button>
      </div>
    </div>
    <div class="decision-grid" style="margin-top:12px">
      ${providers.map(institutionalProbeProviderHtml).join("") || `<div class="date">暂无检测结果。</div>`}
    </div>
    <div class="date" style="margin-top:10px">下一步：哪个终端显示“SDK 可用/已连接”，就优先把股票行情、财务、研报和公告接口切到它；未安装的需要先安装对应客户端 SDK 并登录授权。</div>
  `;
}

function dataSourceStatusChip(ok) {
  return ok ? `<span class="decision-chip good">可用</span>` : `<span class="decision-chip warn">待处理</span>`;
}

function qmtBridgeHealthHtml(status = {}) {
  const age = status.ageSeconds == null ? "未收到" : `${status.ageSeconds}s 前`;
  const codePreview = (status.codes || []).slice(0, 10).join("；") || "暂无";
  return `
    <div class="panel" style="margin-top:12px;background:rgba(90,157,255,.07);border-color:rgba(90,157,255,.2)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">QMT 行情桥接</div>
          <div class="date">策略：${status.strategyInstalled ? "已安装到 QMT 策略目录" : "未安装"}；行情文件：${status.hasQuotes ? "已收到" : "未收到"}；更新：${escapeHtml(age)}</div>
          <div class="date" style="margin-top:4px">同步代码 ${escapeHtml(status.codeCount || 0)} 个：${escapeHtml(codePreview)}${(status.codes || []).length > 10 ? " ..." : ""}</div>
          <div class="date" style="margin-top:4px">QMT 策略路径：${escapeHtml(status.qmtStrategyFile || "")}</div>
        </div>
        <span class="${status.hasQuotes && !status.stale ? "decision-chip good" : "decision-chip warn"}">${status.hasQuotes && !status.stale ? "桥接在线" : "待运行"}</span>
      </div>
      ${status.error ? `<div class="date" style="color:#f87171;margin-top:8px">${escapeHtml(status.error)}</div>` : ""}
      <div class="review-actions" style="justify-content:flex-start;margin-top:10px">
        <button class="small-btn" onclick="syncQmtBridgeCodes()">同步关注标的</button>
        <button class="small-btn" onclick="installQmtBridgeStrategy()">安装桥接策略</button>
        <button class="small-btn" onclick="refreshQmtBridgeStatus()">刷新桥接状态</button>
      </div>
    </div>
  `;
}

function dataSourceHealthHtml(data = {}) {
  const publicRows = data.publicSources || [];
  const providers = (data.institutional && data.institutional.providers) || [];
  const guidance = data.accountGuidance || [];
  const fallbackChain = data.fallbackChain || [];
  return `
    <div class="metadata-head">
      <div>
        <div class="panel-title">数据源状态</div>
        <div class="date">当前模式：${escapeHtml(data.modeText || "检测中")}。${data.institutionalReady ? "机构终端已可作为优先数据源。" : "没有机构账号也可继续使用公开数据模式。"}</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="showDataSourceHealth()">重新检测</button>
        <button class="small-btn" onclick="probeInstitutionalTerminals(false)">机构终端测试</button>
      </div>
    </div>
    <div class="pipeline-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:12px">
      ${metricCell("机构终端", data.institutionalReady ? "可用" : "未接入")}
      ${metricCell("公开数据", data.publicReady ? "可用" : "异常")}
      ${metricCell("行情回退", "腾讯")}
      ${metricCell("财务回退", "东方财富")}
    </div>
    <div class="decision-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:12px">
      ${providers.map(item => `
        <div class="decision-card">
          <div class="metadata-head"><div><h3>${escapeHtml(item.name || item.id)}</h3><div class="date">${escapeHtml(item.module || "")}</div></div>${dataSourceStatusChip(item.importOk)}</div>
          <p style="color:var(--muted);line-height:1.7">${escapeHtml(item.importOk ? "SDK 已可导入，可以继续尝试连接授权。" : (item.error || item.message || "SDK 未安装或未配置路径。"))}</p>
        </div>
      `).join("")}
    </div>
    ${qmtBridgeHealthHtml(data.qmtBridge || {})}
    <div class="decision-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:12px">
      ${publicRows.map(item => `
        <div class="decision-card">
          <div class="metadata-head"><div><h3>${escapeHtml(item.name)}</h3><div class="date">${escapeHtml(item.type)} · ${item.latencyMs || 0}ms</div></div>${dataSourceStatusChip(item.ok)}</div>
          <p style="color:var(--muted);line-height:1.7">${escapeHtml(item.message || "")}；样本数 ${escapeHtml(item.count || 0)}</p>
        </div>
      `).join("")}
    </div>
    <div class="panel" style="margin-top:12px;background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.22)">
      <div class="panel-title">无账号时的工作流</div>
      <div class="decision-list">
        ${fallbackChain.map(item => `<div class="decision-row"><span>${escapeHtml(item)}</span></div>`).join("")}
      </div>
    </div>
    <div class="panel" style="margin-top:12px">
      <div class="panel-title">机构账号申请入口</div>
      <div class="decision-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin:0">
        ${guidance.map(item => `
          <div class="decision-card">
            <h3>${escapeHtml(item.name)}</h3>
            <p style="color:var(--muted);line-height:1.7">${escapeHtml(item.status)}</p>
            <button class="small-btn" onclick="window.open('${escapeHtml(item.url)}','_blank')">打开官方入口</button>
          </div>
        `).join("")}
      </div>
      <div class="date" style="margin-top:10px">账号注册、实名、付费合同和授权条款需要你本人确认；我负责把拿到的 SDK、账号环境和数据接口接进网站。</div>
    </div>
  `;
}

async function showDataSourceHealth() {
  const panel = document.getElementById("institutionalProbePanel");
  if (!panel) {
    showToast("请先打开股票档案页");
    return;
  }
  panel.style.display = "block";
  panel.innerHTML = `<div class="date">正在检测机构终端与公开数据源...</div>`;
  try {
    const response = await fetch("/api/data-source-health");
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "数据源检测失败");
    panel.innerHTML = dataSourceHealthHtml(data);
  } catch (error) {
    panel.innerHTML = `<div class="panel-title">数据源状态</div><div class="date" style="color:#f87171">${escapeHtml(error.message || String(error))}</div>`;
  }
}

async function refreshQmtBridgeStatus() {
  const panel = document.getElementById("institutionalProbePanel");
  if (!panel) return;
  try {
    const response = await fetch("/api/qmt-bridge/status");
    const status = await response.json();
    if (!response.ok || !status.success) throw new Error(status.error || "QMT 桥接状态读取失败");
    showToast(status.hasQuotes ? `QMT 桥接：${status.quoteCount || 0} 条行情，${status.ageSeconds ?? "-"} 秒前更新` : "QMT 桥接尚未收到行情文件");
    showDataSourceHealth();
  } catch (error) {
    showToast(error.message || "QMT 桥接状态读取失败");
  }
}

async function syncQmtBridgeCodes() {
  const items = (typeof flattenWatchlist === "function" ? flattenWatchlist() : [])
    .map(item => ({ name: item.name || "", quoteKey: item.quoteKey || item.key || "" }))
    .filter(item => item.quoteKey);
  try {
    const response = await fetch("/api/qmt-bridge/sync-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "QMT 列表同步失败");
    showToast(`已同步 ${data.synced || data.codeCount || 0} 个 QMT 代码`);
    showDataSourceHealth();
  } catch (error) {
    showToast(error.message || "QMT 列表同步失败");
  }
}

async function installQmtBridgeStrategy() {
  try {
    const response = await fetch("/api/qmt-bridge/install-strategy", { method: "POST" });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "桥接策略安装失败");
    showToast("QMT 桥接策略已安装到国信 iQuant 策略目录");
    showDataSourceHealth();
  } catch (error) {
    showToast(error.message || "桥接策略安装失败");
  }
}

async function probeInstitutionalTerminals(connect = false) {
  const panel = document.getElementById("institutionalProbePanel");
  if (!panel) {
    showToast("请先打开股票档案页");
    return;
  }
  panel.style.display = "block";
  panel.innerHTML = `<div class="date">${connect ? "正在尝试连接机构终端..." : "正在检测机构终端 SDK..."}</div>`;
  try {
    const response = await fetch(`/api/institutional-probe?connect=${connect ? "1" : "0"}`);
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "机构终端检测失败");
    renderInstitutionalProbeResult(data);
  } catch (error) {
    panel.innerHTML = `<div class="panel-title">机构终端接入测试</div><div class="date" style="color:#f87171">${escapeHtml(error.message || String(error))}</div>`;
  }
}

function stockCompareCell(value, suffix = "") {
  return escapeHtml(metricValueText(value, suffix));
}

function stockCompareAnnouncementText(item) {
  const ann = (item.latestAnnouncements || [])[0];
  if (!ann) return "暂无公告";
  const points = (ann.riskPoints || []).slice(0, 2).join("；");
  return [ann.riskTag || "公告", ann.title || "", points].filter(Boolean).join(" / ");
}

function stockCompareNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function stockCompareBacktestBonus(item = {}) {
  const bt = item.backtest || {};
  if (bt.error || bt.totalReturn === undefined) return 0;
  const excess = stockCompareNumber(bt.excessReturn);
  const total = stockCompareNumber(bt.totalReturn);
  const drawdown = stockCompareNumber(bt.maxDrawdown);
  let bonus = 0;
  if (excess !== null) bonus += Math.max(-5, Math.min(8, excess / 15));
  if (total !== null) bonus += Math.max(-2, Math.min(6, total / 25));
  if (drawdown !== null && drawdown < -25) bonus -= 5;
  if (drawdown !== null && drawdown > -12) bonus += 2;
  return Math.round(bonus);
}

function readStockComparePool() {
  try {
    const data = JSON.parse(localStorage.getItem(STOCK_COMPARE_POOL_KEY) || "[]");
    return Array.isArray(data) ? data.filter(Boolean).slice(0, 12) : [];
  } catch {
    return [];
  }
}

function writeStockComparePool(items = []) {
  const seen = new Set();
  const clean = (items || [])
    .map(item => String(item || "").trim())
    .filter(Boolean)
    .filter(item => {
      const key = normalizeThemeText(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
  localStorage.setItem(STOCK_COMPARE_POOL_KEY, JSON.stringify(clean));
  return clean;
}

function renderStockComparePool() {
  const box = document.getElementById("stockComparePool");
  if (!box) return;
  const pool = readStockComparePool();
  box.innerHTML = pool.length
    ? pool.map(name => `<button class="video-group-badge" onclick='removeStockComparePoolItem(${JSON.stringify(name)})'>${escapeHtml(name)} 脳</button>`).join("") +
      `<button class="small-btn" onclick="fillStockCompareInputFromPool()">鐢ㄥ姣旀睜</button><button class="small-btn" onclick="clearStockComparePool()">娓呯┖</button>`
    : `<span class="date">瀵规瘮姹犱负绌恒€傚彲浠ヤ粠鑲＄エ鍗＄墖鍔犲叆锛屼篃鍙互鐩存帴杈撳叆澶氫釜鑲＄エ銆?/span>`;
}

function addStockComparePoolItem(name) {
  const value = String(name || "").trim();
  if (!value) return;
  const pool = writeStockComparePool([...readStockComparePool(), value]);
  const input = document.getElementById("stockCompareInput");
  if (input && !input.value.trim()) input.value = pool.join(", ");
  renderStockComparePool();
  showToast("已加入对比池");
}

function removeStockComparePoolItem(name) {
  writeStockComparePool(readStockComparePool().filter(item => item !== name));
  renderStockComparePool();
}

function clearStockComparePool() {
  writeStockComparePool([]);
  renderStockComparePool();
}

function addStockCompareInputToPool() {
  const input = document.getElementById("stockCompareInput");
  const raw = input ? input.value.trim() : "";
  if (!raw) return showToast("先输入股票名或代码");
  const names = raw.split(/[,，、\s]+/).map(item => item.trim()).filter(Boolean);
  writeStockComparePool([...readStockComparePool(), ...names]);
  renderStockComparePool();
  showToast("已加入对比池");
}

function fillStockCompareInputFromPool() {
  const input = document.getElementById("stockCompareInput");
  const pool = readStockComparePool();
  if (input) input.value = pool.join(", ");
}

function stockCompareRiskPenalty(item = {}) {
  const anns = item.latestAnnouncements || [];
  const points = anns.flatMap(a => a.riskPoints || []);
  const text = anns.map(a => [a.riskTag, a.title, a.summary, ...(a.riskPoints || [])].filter(Boolean).join(" ")).join(" ");
  if (/婢勬竻|鐩戠|澶勭綒|璇夎|浠茶|绔嬫|闂|鍑忔寔|璐ㄦ娂|浜忔崯|椋庨櫓|寮傚父|璀︾ず/.test(text) || points.length >= 2) return 18;
  if (/鎻愮ず|鏇存|鍙樻洿|娉㈠姩|寤舵湡|鎷呬繚|鍏宠仈浜ゆ槗/.test(text) || points.length) return 8;
  return 0;
}

function stockCompareScore(item = {}) {
  const pct = stockCompareNumber(item.pct);
  const pe = stockCompareNumber(item.pe);
  const pb = stockCompareNumber(item.pb);
  const gross = stockCompareNumber(item.grossMargin);
  const net = stockCompareNumber(item.netMargin);
  const roe = stockCompareNumber(item.roe);
  const revenueGrowth = stockCompareNumber(item.revenueGrowth);
  const profitGrowth = stockCompareNumber(item.profitGrowth);
  const momentum = pct === null ? 8 : Math.max(0, Math.min(20, 10 + pct * 1.2));
  const valuation = [
    pe === null || pe <= 0 ? 8 : pe < 25 ? 18 : pe < 50 ? 13 : pe < 90 ? 8 : 4,
    pb === null || pb <= 0 ? 6 : pb < 4 ? 12 : pb < 8 ? 8 : 4
  ].reduce((a, b) => a + b, 0);
  const quality = [
    gross === null ? 5 : gross >= 45 ? 12 : gross >= 25 ? 8 : 4,
    net === null ? 5 : net >= 20 ? 12 : net >= 10 ? 8 : 4,
    roe === null ? 5 : roe >= 15 ? 12 : roe >= 8 ? 8 : 4
  ].reduce((a, b) => a + b, 0);
  const growth = [
    revenueGrowth === null ? 5 : revenueGrowth >= 30 ? 12 : revenueGrowth >= 10 ? 8 : revenueGrowth >= 0 ? 5 : 2,
    profitGrowth === null ? 5 : profitGrowth >= 30 ? 12 : profitGrowth >= 10 ? 8 : profitGrowth >= 0 ? 5 : 2
  ].reduce((a, b) => a + b, 0);
  const riskPenalty = stockCompareRiskPenalty(item);
  const backtest = stockCompareBacktestBonus(item);
  const total = Math.max(0, Math.min(100, Math.round(momentum + valuation + quality + growth + backtest - riskPenalty)));
  return {
    total,
    momentum: Math.round(momentum),
    valuation,
    quality,
    growth,
    backtest,
    riskPenalty
  };
}

function stockCompareDecisionText(item = {}) {
  const score = item.compareScore || stockCompareScore(item);
  if (score.riskPenalty >= 18) return "先排公告风险";
  if (item.backtest && !item.backtest.error && Number(item.backtest.excessReturn || 0) > 0 && score.total >= 60) return "对比+回测共振";
  if (score.total >= 75) return "优先观察核心";
  if (score.total >= 58) return "可跟踪弹性";
  if (score.total >= 42) return "等待验证";
  return "暂不优先";
}

function augmentStockCompareItems(items = []) {
  return (items || [])
    .map(item => {
      const compareScore = stockCompareScore(item);
      return { ...item, compareScore, compareDecision: stockCompareDecisionText({ ...item, compareScore }) };
    })
    .sort((a, b) => (b.compareScore?.total || 0) - (a.compareScore?.total || 0));
}

function stockCompareLeader(items, field, mode = "max") {
  const rows = items
    .map(item => ({ item, value: stockCompareNumber(item[field]) }))
    .filter(row => row.value !== null);
  if (!rows.length) return null;
  rows.sort((a, b) => mode === "min" ? a.value - b.value : b.value - a.value);
  return rows[0];
}

function stockCompareRiskItems(items = []) {
  return items.map(item => {
    const anns = item.latestAnnouncements || [];
    const points = anns.flatMap(a => a.riskPoints || []);
    const text = anns.map(a => [a.riskTag, a.title, a.summary, ...(a.riskPoints || [])].filter(Boolean).join(" ")).join(" ");
    const hit = points.length || /婢勬竻|鐩戠|澶勭綒|璇夎|浠茶|绔嬫|闂|鍑忔寔|璐ㄦ娂|浜忔崯|椋庨櫓|寮傚父|璀︾ず/.test(text);
    return hit ? { item, points, title: anns[0]?.title || "" } : null;
  }).filter(Boolean);
}

function stockCompareEvidenceText(items = []) {
  return items.map(item => {
    const ann = (item.latestAnnouncements || [])[0];
    const score = item.compareScore || stockCompareScore(item);
    return [
      `标的：${item.name || item.key || "-"}`,
      `代码：${item.key || "-"}`,
      `综合评分：${score.total}/100，判断：${item.compareDecision || stockCompareDecisionText({ ...item, compareScore: score })}；分项：行情${score.momentum}、估值${score.valuation}、质量${score.quality}、成长${score.growth}、风险扣分${score.riskPenalty}`,
      `行情：现价 ${item.price == null ? "-" : item.price}，涨跌幅 ${item.pct == null ? "-" : item.pct + "%"}，换手率 ${item.turnoverRate || "-"}，振幅 ${item.amplitude || "-"}`,
      `估值：PE ${item.pe || "-"}，PB ${item.pb || "-"}，市值 ${item.marketCap || "-"}`,
      `财务：财报期 ${item.financialReportDate || "-"}，营收 ${item.revenue || "-"}，归母净利 ${item.netProfit || "-"}，毛利率 ${item.grossMargin || "-"}%，净利率 ${item.netMargin || "-"}%，ROE ${item.roe || "-"}%，营收增速 ${item.revenueGrowth || "-"}%，利润增速 ${item.profitGrowth || "-"}%`,
      item.backtest ? `回测：策略收益 ${item.backtest.totalReturn ?? "-"}%，超额 ${item.backtest.excessReturn ?? "-"}%，最大回撤 ${item.backtest.maxDrawdown ?? "-"}%，夏普 ${item.backtest.sharpe ?? "-"}，PF ${item.backtest.profitFactor ?? "-"}，胜率 ${item.backtest.winRate ?? "-"}%，最新信号 ${backtestSignalText(item.backtest.lastSignal)}` : "回测：未验证",
      `公告：${ann ? `${ann.date || "-"} ${ann.riskTag || "公告"} ${ann.title || ""}` : "暂无公告"}`,
      ann?.summary ? `公告摘要：${agentClip(ann.summary, 260)}` : "",
      (ann?.riskPoints || []).length ? `公告风险点：${ann.riskPoints.slice(0, 3).join("；")}` : "",
      `数据来源：${[item.quoteSource || "腾讯行情", item.financialSource || "东方财富财务", item.backtestSource || (item.backtest ? "历史日线回测" : ""), ann ? "巨潮资讯公告" : ""].filter(Boolean).join(" / ")}`
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

function stockCompareInsightHtml(items = []) {
  if (!items.length) return "";
  const ranked = augmentStockCompareItems(items);
  const top = ranked[0];
  const pctLeader = stockCompareLeader(items, "pct", "max");
  const peLow = stockCompareLeader(items, "pe", "min");
  const roeHigh = stockCompareLeader(items, "roe", "max");
  const netMarginHigh = stockCompareLeader(items, "netMargin", "max");
  const revenueGrowthHigh = stockCompareLeader(items, "revenueGrowth", "max");
  const profitGrowthHigh = stockCompareLeader(items, "profitGrowth", "max");
  const riskRows = stockCompareRiskItems(items);
  const backtestRows = items.filter(item => item.backtest && !item.backtest.error);
  const backtestLeader = backtestRows
    .map(item => ({ item, value: stockCompareNumber(item.backtest.excessReturn) }))
    .filter(row => row.value !== null)
    .sort((a, b) => b.value - a.value)[0];
  const missing = items
    .filter(item => item.price == null || !item.financialReportDate || item.pe === "" || item.pe === undefined)
    .map(item => item.name || item.key)
    .filter(Boolean);
  const line = (title, text, tone = "") => `
    <div class="pipeline-cell" style="${tone}">
      <b style="font-size:13px">${escapeHtml(title)}</b>
      <span style="line-height:1.7">${escapeHtml(text)}</span>
    </div>
  `;
  return `
    <div class="panel" style="margin:0 0 10px;background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.24)">
      <div class="panel-title" style="margin-bottom:6px">对比结论看板</div>
      <div style="line-height:1.75">
        当前综合排序第一：<b style="color:#a8f5d4">${escapeHtml(top ? (top.name || top.key || "-") : "-")}</b>
        ${top ? `，评分 ${top.compareScore.total}/100，判断：${escapeHtml(top.compareDecision || "")}。` : ""}
        评分只是复盘排序，不代表买卖建议。
      </div>
    </div>
    <div class="pipeline-grid" style="grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin:12px 0">
      ${line("行情强弱", pctLeader ? `${pctLeader.item.name || pctLeader.item.key} 当前涨跌幅相对更强：${signedText(pctLeader.value, "%")}。` : "缺少可比行情字段。")}
      ${line("估值位置", peLow ? `${peLow.item.name || peLow.item.key} PE 相对更低：${peLow.value}，但低估值不等于低风险。` : "缺少可比 PE 字段。")}
      ${line("财务质量", [roeHigh ? `ROE 较高：${roeHigh.item.name || roeHigh.item.key} ${roeHigh.value}%` : "", netMarginHigh ? `净利率较高：${netMarginHigh.item.name || netMarginHigh.item.key} ${netMarginHigh.value}%` : ""].filter(Boolean).join("；") || "缺少 ROE/净利率字段。")}
      ${line("成长弹性", [revenueGrowthHigh ? `营收增速较高：${revenueGrowthHigh.item.name || revenueGrowthHigh.item.key} ${revenueGrowthHigh.value}%` : "", profitGrowthHigh ? `利润增速较高：${profitGrowthHigh.item.name || profitGrowthHigh.item.key} ${profitGrowthHigh.value}%` : ""].filter(Boolean).join("；") || "缺少成长字段。")}
      ${line("历史验证", backtestLeader ? `${backtestLeader.item.name || backtestLeader.item.key} 回测超额相对更好：${signedText(backtestLeader.value, "%")}。` : "尚未追加回测验证。")}
      ${line("公告风险", riskRows.length ? riskRows.map(row => `${row.item.name || row.item.key}：${row.title || row.points.slice(0, 1).join("；")}`).join("；") : "未发现标题/摘要层面的明显风险点。", riskRows.length ? "background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.32)" : "")}
    </div>
    <div class="date" style="line-height:1.7">
      机器初筛结论：这里只做横向复盘排序，不给买卖指令。${missing.length ? ` 待人工复核字段：${escapeHtml(missing.join("、"))}。` : ""}
    </div>
  `;
}

function saveStockCompareResult(items = []) {
  const ranked = augmentStockCompareItems(items);
  state.lastStockCompareItems = ranked;
  try {
    localStorage.setItem(STOCK_COMPARE_RESULT_KEY, JSON.stringify({ at: new Date().toISOString(), items: ranked }));
  } catch {}
}

function readStockCompareResult() {
  if (Array.isArray(state.lastStockCompareItems) && state.lastStockCompareItems.length) return state.lastStockCompareItems;
  try {
    const data = JSON.parse(localStorage.getItem(STOCK_COMPARE_RESULT_KEY) || "{}");
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

function askAgentWithStockCompare() {
  const items = readStockCompareResult();
  if (!items.length) {
    showToast("先生成一次多股对比");
    return;
  }
  const names = items.map(item => item.name || item.key).filter(Boolean).join("、");
  const evidence = stockCompareEvidenceText(items);
  const prompt = [
    `请解读这次多股对比：${names}`,
    "",
    "请严格按这个框架输出：",
    "1. 数据前提：行情来源、财务来源、公告来源、缺失字段。",
    "2. 核心观点：谁更像趋势确认，谁更像观察，谁需要先排风险。",
    "3. 横向对比：行情强弱、估值、财务质量、成长弹性、公告风险。",
    "4. 主要矛盾：结合模型先生框架解释当前矛盾，不要只排数字。",
    "5. 观察条件：后续需要跟踪哪些价格/成交/财报/公告信号。",
    "6. 风险边界：什么情况会推翻判断。",
    "7. 来源标注：腾讯行情 / 东方财富财务 / 巨潮资讯公告 / 本地视频书籍记忆。没有证据就写缺少直接证据。",
    "",
    "【本次对比数据】",
    evidence
  ].join("\n");
  openAgentWithQuestion(prompt, "investment", true);
}

async function rememberStockCompareResult() {
  const items = readStockCompareResult();
  if (!items.length) {
    showToast("先生成一次多股对比");
    return;
  }
  const names = items.map(item => item.name || item.key).filter(Boolean);
  const text = [
    `多股对比记忆：${names.join("、")}`,
    stockCompareEvidenceText(items)
  ].join("\n\n");
  const saved = await saveAgentMemoryQuiet("memory", text, ["stock_compare", ...names]);
  showToast(saved ? "多股对比已沉淀到 Agent 记忆" : "多股对比记忆写入失败");
}

function saveStockComparePoolFromResult() {
  const items = readStockCompareResult();
  if (!items.length) return showToast("先生成一次多股对比");
  writeStockComparePool(items.map(item => item.name || item.key).filter(Boolean));
  renderStockComparePool();
  showToast("已保存为对比池");
}

function stockCompareBacktestCell(item = {}) {
  const bt = item.backtest;
  if (!bt) return `<span class="date">未验证</span>`;
  if (bt.error) return `<span style="color:#fca5a5">${escapeHtml(agentClip(bt.error, 60))}</span>`;
  const cls = Number(bt.excessReturn || 0) >= 0 ? "up" : "down";
  return `<b class="${cls}">${escapeHtml(bt.totalReturn)}%</b><div class="date">超额 ${escapeHtml(bt.excessReturn)}% · 回撤 ${escapeHtml(bt.maxDrawdown)}%</div><div class="date">夏普 ${escapeHtml(bt.sharpe ?? "-")} · PF ${escapeHtml(bt.profitFactor ?? "-")}</div><div class="date">${escapeHtml(backtestTone(bt))}</div>`;
}

function renderStockCompareTable(items = []) {
  if (!items.length) return `<div class="date">没有拉到可对比数据。</div>`;
  const ranked = augmentStockCompareItems(items);
  const rows = ranked.map((item, index) => {
    const pctCls = Number(item.pct || 0) >= 0 ? "up" : "down";
    const score = item.compareScore || stockCompareScore(item);
    return `
      <tr>
        <td><b>${index + 1}. ${escapeHtml(item.name || item.key || "-")}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td><b>${score.total}</b><div class="date">${escapeHtml(item.compareDecision || "")}</div></td>
        <td class="${pctCls}">${item.price == null ? "-" : escapeHtml(Number(item.price || 0).toFixed(2))}<div>${item.pct == null ? "" : escapeHtml(signedText(item.pct, "%"))}</div></td>
        <td>${stockCompareCell(item.pe)}</td>
        <td>${stockCompareCell(item.pb)}</td>
        <td>${stockCompareCell(item.marketCap)}</td>
        <td>${stockCompareCell(item.grossMargin, item.grossMargin !== "" && item.grossMargin !== undefined ? "%" : "")}</td>
        <td>${stockCompareCell(item.netMargin, item.netMargin !== "" && item.netMargin !== undefined ? "%" : "")}</td>
        <td>${stockCompareCell(item.roe, item.roe !== "" && item.roe !== undefined ? "%" : "")}</td>
        <td>${stockCompareBacktestCell(item)}</td>
        <td>${escapeHtml(agentClip(item.stage || "-", 90))}</td>
        <td>${escapeHtml(agentClip(stockCompareAnnouncementText(item), 160))}</td>
      </tr>
    `;
  }).join("");
  const sources = [...new Set(items.flatMap(item => [
    item.quoteSource || "腾讯行情",
    item.financialSource || "东方财富财务",
    item.backtestSource || (item.backtest ? "历史日线回测" : ""),
    (item.latestAnnouncements || []).length ? "巨潮资讯公告" : ""
  ]).filter(Boolean))].join(" / ");
  return `
    ${stockCompareInsightHtml(items)}
    <div style="overflow:auto">
      <table class="review-table">
        <thead>
          <tr>
            <th>排序/标的</th><th>综合分</th><th>行情</th><th>PE</th><th>PB</th><th>市值</th><th>毛利率</th><th>净利率</th><th>ROE</th><th>历史验证</th><th>初步阶段</th><th>最新公告/风险</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(sources || "本地档案")}。数值仅用于复盘辅助，需人工复核。</div>
    <div class="analysis-actions" style="justify-content:flex-start;margin-top:10px">
      <button class="open-btn" style="width:auto;padding:0 16px" onclick="askAgentWithStockCompare()">让 Agent 解读这次对比</button>
      <button class="small-btn" onclick="appendBacktestToStockCompare()">追加回测验证</button>
      <button class="small-btn" onclick="rememberStockCompareResult()">沉淀对比记忆</button>
      <button class="small-btn" onclick="saveStockComparePoolFromResult()">保存为对比池</button>
    </div>
  `;
}

async function compareStocksFromInput() {
  const input = document.getElementById("stockCompareInput");
  const target = document.getElementById("stockCompareResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入两个以上股票名或代码");
    return;
  }
  if (input && !rawInput) input.value = raw;
  if (target) target.innerHTML = "正在拉取行情、财务和公告摘要...";
  try {
    const response = await fetch("/api/stock-brief?keys=" + encodeURIComponent(raw) + "&announcements=1&announcementLimit=2&announcementText=1&announcementTextLimit=5000");
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "对比数据拉取失败");
    saveStockCompareResult(data.items || []);
    if (target) target.innerHTML = renderStockCompareTable(data.items || []);
  } catch (error) {
    if (target) target.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "对比数据拉取失败")}</span>`;
    showToast(error.message || "对比数据拉取失败");
  }
}

async function appendBacktestToStockCompare() {
  const items = readStockCompareResult();
  const target = document.getElementById("stockCompareResult");
  if (!items.length) {
    showToast("先生成一次多股对比");
    return;
  }
  if (target) target.innerHTML = renderStockCompareTable(items) + `<div class="date" style="margin-top:8px">正在追加历史条件验证...</div>`;
  try {
    const keys = items.map(item => item.key || item.name).filter(Boolean).join(",");
    const params = new URLSearchParams({
      keys,
      strategy: "ma_cross",
      days: "260",
      short: "5",
      long: "20",
      lookback: "20",
      stopLoss: "8",
      fee: "0.0005"
    });
    const response = await fetch("/api/stock-backtest?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "回测验证失败");
    const btByKey = new Map((data.items || []).map(item => [item.key, item]));
    const merged = items.map(item => {
      const bt = btByKey.get(item.key) || btByKey.get(item.name);
      return bt ? { ...item, backtest: bt, backtestSource: bt.source || data.source || "历史日线回测" } : item;
    });
    saveStockCompareResult(merged);
    state.lastBacktestResult = data;
    try {
      localStorage.setItem("xiaoke_last_backtest_v1", JSON.stringify(data));
    } catch {}
    if (target) target.innerHTML = renderStockCompareTable(merged);
    showToast("已追加回测验证");
  } catch (error) {
    if (target) target.innerHTML = renderStockCompareTable(items) + `<div class="date" style="margin-top:8px;color:#fca5a5">${escapeHtml(error.message || "回测验证失败")}</div>`;
    showToast(error.message || "回测验证失败");
  }
}

async function compareStocksWithBacktest() {
  await compareStocksFromInput();
  await appendBacktestToStockCompare();
}

function fillBacktestInputFromComparePool() {
  const input = document.getElementById("backtestInput");
  const pool = readStockComparePool();
  const compareInput = document.getElementById("stockCompareInput");
  const source = pool.length ? pool.join(", ") : (compareInput ? compareInput.value.trim() : "");
  if (input) input.value = source;
  if (!source) showToast("对比池为空，先输入或加入股票");
}

function backtestSignalText(signal) {
  return {
    buy: "买入触发",
    sell: "卖出触发",
    stop: "止损触发",
    close: "期末平仓",
    hold: "等待"
  }[signal] || signal || "等待";
}

function backtestTone(item = {}) {
  const total = Number(item.totalReturn || 0);
  const dd = Number(item.maxDrawdown || 0);
  if (item.error) return "数据异常";
  const sharpe = Number(item.sharpe || 0);
  const pf = Number(item.profitFactor || 0);
  if (total > 0 && dd > -18 && sharpe >= 1 && pf >= 1.2) return "收益/风险较均衡";
  if (total > 0 && dd > -18) return "条件有效，进入观察";
  if (total > 0 && dd <= -18) return "收益为正但回撤偏大";
  return "条件不足，先不作为主线";
}

function backtestMetricCardsHtml(item = {}) {
  if (!item || item.error) return "";
  return `
    <div class="pipeline-grid" style="grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin:10px 0">
      ${metricCell("年化", `${item.annualizedReturn ?? "-"}%`)}
      ${metricCell("夏普", item.sharpe ?? "-")}
      ${metricCell("Sortino", item.sortino ?? "-")}
      ${metricCell("Calmar", item.calmar ?? "-")}
      ${metricCell("波动率", `${item.annualVolatility ?? "-"}%`)}
      ${metricCell("暴露率", `${item.exposurePct ?? "-"}%`)}
    </div>
  `;
}

function renderBacktestResult(data = {}) {
  const items = data.items || [];
  if (!items.length) return `<div class="date">没有回测结果。</div>`;
  const rows = items.map(item => {
    if (item.error) {
      return `<tr><td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td><td colspan="12" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    }
    const totalCls = Number(item.totalReturn || 0) >= 0 ? "up" : "down";
    const excessCls = Number(item.excessReturn || 0) >= 0 ? "up" : "down";
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td class="${totalCls}">${escapeHtml(item.totalReturn)}%</td>
        <td class="${excessCls}">${escapeHtml(item.excessReturn)}%</td>
        <td>${escapeHtml(item.buyHoldReturn)}%</td>
        <td>${escapeHtml(item.maxDrawdown)}%</td>
        <td>${escapeHtml(item.tradeCount)}</td>
        <td>${escapeHtml(item.winRate)}%</td>
        <td>${escapeHtml(item.sharpe ?? "-")}</td>
        <td>${escapeHtml(item.profitFactor ?? "-")}</td>
        <td>${escapeHtml(item.avgHoldDays ?? "-")}</td>
        <td>${escapeHtml(backtestSignalText(item.lastSignal))}</td>
        <td>${escapeHtml(backtestTone(item))}</td>
        <td>${escapeHtml(item.startDate || "-")} 至 ${escapeHtml(item.endDate || "-")}</td>
      </tr>
    `;
  }).join("");
  const best = items
    .filter(item => !item.error)
    .sort((a, b) => Number(b.excessReturn || 0) - Number(a.excessReturn || 0))[0];
  return `
    <div class="panel" style="margin:0 0 10px;background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.24)">
      <div class="panel-title" style="margin-bottom:6px">回测结论</div>
      <div style="line-height:1.75">
        ${best ? `相对买入持有超额较好：<b style="color:#a8f5d4">${escapeHtml(best.name || best.key)}</b>，超额 ${escapeHtml(best.excessReturn)}%。` : "暂无可排序结果。"}
        专业指标需要同时看收益、回撤、夏普、Profit Factor 和暴露率；这仍未计入完整滑点、停牌、涨跌停成交约束。
      </div>
    </div>
    ${backtestMetricCardsHtml(best)}
    <div style="overflow:auto">
      <table class="review-table">
        <thead>
          <tr>
            <th>标的</th><th>策略收益</th><th>超额</th><th>买入持有</th><th>最大回撤</th><th>交易次数</th><th>胜率</th><th>夏普</th><th>PF</th><th>均持天</th><th>最新信号</th><th>复盘判断</th><th>区间</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "东方财富/腾讯历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function predictionDirectionText(direction) {
  return {
    up: "未来偏强",
    down: "未来偏弱",
    neutral: "震荡/无明确优势"
  }[direction] || "震荡/无明确优势";
}

function renderPredictionBacktestResult(data = {}) {
  const items = data.items || [];
  if (!items.length) return `<div class="date">没有预测回测结果。</div>`;
  const rows = items.map(item => {
    if (item.error) {
      return `<tr><td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td><td colspan="9" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    }
    const latest = item.latestPrediction || {};
    const hitTone = Number(item.hitRate || 0) >= 58 ? "good" : Number(item.hitRate || 0) >= 52 ? "warn" : "danger";
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td><span class="decision-chip ${hitTone}">${escapeHtml(item.hitRate ?? 0)}%</span><div class="date">${escapeHtml(item.predictedCount || 0)} 次方向预测</div></td>
        <td>${escapeHtml(item.upHitRate ?? 0)}%</td>
        <td>${escapeHtml(item.downHitRate ?? 0)}%</td>
        <td>${escapeHtml(item.falsePositiveRate ?? 0)}%</td>
        <td>${escapeHtml(item.avgPredictedUpReturn ?? 0)}%</td>
        <td><b>${escapeHtml(latest.directionText || predictionDirectionText(latest.direction))}</b><div class="date">置信 ${escapeHtml(latest.confidence ?? "-")} / ${escapeHtml(latest.date || "-")}</div></td>
        <td>${escapeHtml(item.horizon || "-")} 日 / ±${escapeHtml(item.threshold || "-")}%</td>
        <td>${escapeHtml(item.conclusion || "-")}</td>
      </tr>
    `;
  }).join("");
  const best = items
    .filter(item => !item.error)
    .sort((a, b) => Number(b.hitRate || 0) - Number(a.hitRate || 0))[0];
  return `
    <div class="panel" style="margin:0 0 10px;background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.22)">
      <div class="panel-title" style="margin-bottom:6px">预测回测结论</div>
      <div style="line-height:1.75">
        ${best ? `历史方向命中率相对较高：<b style="color:#bfdbfe">${escapeHtml(best.name || best.key)}</b>，命中率 ${escapeHtml(best.hitRate)}%。` : "暂无可排序结果。"}
        这里验证的是“信号有没有预测优势”，不是验证一套买卖交易能赚多少钱。
      </div>
    </div>
    <div style="overflow:auto">
      <table class="review-table">
        <thead>
          <tr>
            <th>标的</th><th>方向命中率</th><th>看涨命中</th><th>看弱命中</th><th>看涨误报</th><th>看涨后均值</th><th>最新预测</th><th>窗口</th><th>判断</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function renderBacktestOptimizationResult(data = {}) {
  const items = data.items || [];
  if (!items.length) return `<div class="date">没有优化结果。</div>`;
  const sections = items.map(item => {
    if (item.error) {
      return `<div class="decision-card"><h3>${escapeHtml(item.name || item.key)}</h3><p style="color:#fca5a5">${escapeHtml(item.error)}</p></div>`;
    }
    const best = item.best || {};
    const paramText = best.strategy === "breakout"
      ? `突破 ${best.lookback} 日`
      : `均线 ${best.short}/${best.long}`;
    const topRows = (item.top || []).slice(0, 5).map(row => `
      <tr>
        <td>${escapeHtml(row.strategy === "breakout" ? `突破${row.lookback}` : `${row.short}/${row.long}`)}</td>
        <td>${escapeHtml(row.score)}</td>
        <td>${escapeHtml(row.annualizedReturn)}%</td>
        <td>${escapeHtml(row.maxDrawdown)}%</td>
        <td>${escapeHtml(row.sharpe)}</td>
        <td>${escapeHtml(row.profitFactor)}</td>
        <td>${escapeHtml(row.tradeCount)}</td>
      </tr>
    `).join("");
    return `
      <div class="panel" style="margin-top:10px">
        <div class="metadata-head">
          <div>
            <div class="panel-title">${escapeHtml(item.name || item.key)} 参数敏感性</div>
            <div class="date">最佳候选：${escapeHtml(paramText)}；专业评分 ${escapeHtml(best.score ?? "-")}。共测试 ${escapeHtml(item.tested || 0)} 组参数。</div>
          </div>
          <span class="decision-chip ${Number(best.score || 0) > 40 ? "good" : Number(best.score || 0) > 10 ? "warn" : "danger"}">${escapeHtml(Number(best.score || 0) > 40 ? "较稳" : Number(best.score || 0) > 10 ? "需复核" : "不稳")}</span>
        </div>
        <div style="overflow:auto">
          <table class="review-table" style="min-width:760px">
            <thead><tr><th>参数</th><th>评分</th><th>年化</th><th>最大回撤</th><th>夏普</th><th>PF</th><th>交易</th></tr></thead>
            <tbody>${topRows}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");
  return `
    <div class="panel" style="background:rgba(90,157,255,.08);border-color:rgba(90,157,255,.2)">
      <div class="panel-title">参数优化结论</div>
      <div class="date">优化不是找“最赚钱参数”，而是看策略是否对参数敏感。若只有一组参数好看，往往更像过拟合。</div>
    </div>
    ${sections}
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function renderBacktestWalkforwardResult(data = {}) {
  const items = data.items || [];
  if (!items.length) return `<div class="date">没有样本外验证结果。</div>`;
  const rows = items.map(item => {
    if (item.error) {
      return `<tr><td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td><td colspan="9" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    }
    const params = item.params || {};
    const paramText = params.strategy === "breakout" ? `突破${params.lookback}` : `${params.short}/${params.long}`;
    const toneCls = item.judgement === "样本外通过" ? "good" : item.judgement === "过拟合风险高" ? "danger" : "warn";
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td>${escapeHtml(paramText)}</td>
        <td>${escapeHtml(item.train?.annualizedReturn ?? "-")}%<div class="date">夏普 ${escapeHtml(item.train?.sharpe ?? "-")}</div></td>
        <td>${escapeHtml(item.test?.annualizedReturn ?? "-")}%<div class="date">夏普 ${escapeHtml(item.test?.sharpe ?? "-")}</div></td>
        <td>${escapeHtml(item.test?.totalReturn ?? "-")}%</td>
        <td>${escapeHtml(item.test?.maxDrawdown ?? "-")}%</td>
        <td>${escapeHtml(item.test?.profitFactor ?? "-")}</td>
        <td><span class="decision-chip ${toneCls}">${escapeHtml(item.judgement || "-")}</span></td>
        <td>${escapeHtml(item.split?.trainEnd || "-")} / ${escapeHtml(item.split?.testStart || "-")}</td>
      </tr>
    `;
  }).join("");
  const passCount = items.filter(item => item.judgement === "样本外通过").length;
  return `
    <div class="panel" style="background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.22)">
      <div class="panel-title">样本外验证结论</div>
      <div class="date">通过 ${passCount}/${items.length}。训练段找参数，验证段检验韧性；样本外仍能保持正收益和较低回撤，才更值得进入观察。</div>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead>
          <tr>
            <th>标的</th><th>训练最佳参数</th><th>训练年化</th><th>样本外年化</th><th>样本外收益</th><th>样本外回撤</th><th>PF</th><th>判断</th><th>切分点</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function renderPortfolioBacktestResult(data = {}) {
  const portfolio = data.portfolio || null;
  const items = data.items || [];
  if (!portfolio) {
    return `
      <div class="panel" style="background:rgba(244,63,94,.08);border-color:rgba(244,63,94,.22)">
        <div class="panel-title">组合回测暂无结果</div>
        <div class="date">${escapeHtml(data.note || "共同交易日不足，无法计算组合回测。")}</div>
      </div>
    `;
  }
  const metricGrid = `
    <section class="pipeline-grid" style="grid-template-columns:repeat(8,minmax(0,1fr));margin-top:10px">
      ${metricCell("组合收益", `${portfolio.totalReturn}%`)}
      ${metricCell("年化收益", `${portfolio.annualizedReturn}%`)}
      ${metricCell("最大回撤", `${portfolio.maxDrawdown}%`)}
      ${metricCell("年化波动", `${portfolio.annualVolatility}%`)}
      ${metricCell("夏普", portfolio.sharpe)}
      ${metricCell("Sortino", portfolio.sortino)}
      ${metricCell("上涨日胜率", `${portfolio.winRate}%`)}
      ${metricCell("等权权重", `${portfolio.weightPct}%`)}
    </section>
  `;
  const rows = items.map(item => {
    if (item.error) {
      return `<tr><td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td><td colspan="5" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    }
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td>${escapeHtml(item.weight ?? "-")}%</td>
        <td>${escapeHtml(item.buyHoldReturn ?? "-")}%</td>
        <td>${escapeHtml(item.sampleDays ?? "-")}</td>
        <td>${escapeHtml(item.startDate || "-")} 至 ${escapeHtml(item.endDate || "-")}</td>
        <td>${escapeHtml(item.source || "-")}</td>
      </tr>
    `;
  }).join("");
  return `
    <div class="panel" style="background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.22)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">组合回测结论</div>
          <div class="date">共 ${escapeHtml(portfolio.count || 0)} 个成分，公共交易日 ${escapeHtml(portfolio.sampleDays || 0)} 天，区间 ${escapeHtml(portfolio.startDate || "-")} 至 ${escapeHtml(portfolio.endDate || "-")}。</div>
        </div>
        <span class="decision-chip ${Number(portfolio.sharpe || 0) >= 1 ? "good" : Math.abs(Number(portfolio.maxDrawdown || 0)) <= 25 ? "warn" : "danger"}">${escapeHtml(Number(portfolio.sharpe || 0) >= 1 ? "韧性较好" : Math.abs(Number(portfolio.maxDrawdown || 0)) <= 25 ? "需复核" : "回撤偏大")}</span>
      </div>
      ${metricGrid}
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>成分</th><th>权重</th><th>单股持有收益</th><th>样本</th><th>区间</th><th>来源</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function backtestControlValue(id, fallback) {
  const value = document.getElementById(id)?.value;
  return value === undefined || value === null || value === "" ? String(fallback) : String(value);
}

async function runBacktestFromInput() {
  const input = document.getElementById("backtestInput");
  const result = document.getElementById("backtestResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入股票或载入对比池");
    return;
  }
  if (input && !rawInput) input.value = raw;
  const strategy = document.getElementById("backtestStrategy")?.value || "ma_cross";
  const days = document.getElementById("backtestDays")?.value || "260";
  if (result) result.innerHTML = "正在拉取历史日线并运行回测...";
  try {
    const params = new URLSearchParams({
      keys: raw,
      strategy,
      days,
      short: backtestControlValue("backtestShort", 5),
      long: backtestControlValue("backtestLong", 20),
      lookback: backtestControlValue("backtestLookback", 20),
      stopLoss: backtestControlValue("backtestStopLoss", 8),
      fee: "0.0005"
    });
    const response = await fetch("/api/stock-backtest?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "回测失败");
    state.lastBacktestResult = data;
    try {
      localStorage.setItem("xiaoke_last_backtest_v1", JSON.stringify(data));
    } catch {}
    if (result) result.innerHTML = renderBacktestResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "回测失败")}</span>`;
    showToast(error.message || "回测失败");
  }
}

async function runPredictionBacktestFromInput() {
  const input = document.getElementById("backtestInput");
  const result = document.getElementById("predictionBacktestResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入股票或载入对比池");
    return;
  }
  if (input && !rawInput) input.value = raw;
  const days = document.getElementById("backtestDays")?.value || "260";
  const horizon = document.getElementById("predictionHorizon")?.value || "10";
  const threshold = document.getElementById("predictionThreshold")?.value || "";
  if (result) result.innerHTML = "正在做预测回测：逐日只使用当日以前的数据验证未来方向...";
  try {
    const paramObject = {
      keys: raw,
      days,
      horizon
    };
    if (threshold) paramObject.threshold = threshold;
    const params = new URLSearchParams(paramObject);
    const response = await fetch("/api/prediction-backtest?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "预测回测失败");
    state.lastPredictionBacktest = data;
    try {
      localStorage.setItem("xiaoke_last_prediction_backtest_v1", JSON.stringify(data));
    } catch {}
    if (result) result.innerHTML = renderPredictionBacktestResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "预测回测失败")}</span>`;
    showToast(error.message || "预测回测失败");
  }
}

window.runPredictionBacktestFromInput = runPredictionBacktestFromInput;

async function runBacktestOptimizationFromInput() {
  const input = document.getElementById("backtestInput");
  const result = document.getElementById("backtestOptimizeResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入股票或载入对比池");
    return;
  }
  if (input && !rawInput) input.value = raw;
  const strategy = document.getElementById("backtestStrategy")?.value || "ma_cross";
  const days = document.getElementById("backtestDays")?.value || "260";
  if (result) result.innerHTML = "正在扫描参数敏感性...";
  try {
    const params = new URLSearchParams({
      keys: raw,
      strategy,
      days,
      stopLoss: backtestControlValue("backtestStopLoss", 8),
      fee: "0.0005"
    });
    const response = await fetch("/api/stock-backtest-optimize?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "参数优化失败");
    state.lastBacktestOptimization = data;
    if (result) result.innerHTML = renderBacktestOptimizationResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "参数优化失败")}</span>`;
    showToast(error.message || "参数优化失败");
  }
}

async function runBacktestWalkforwardFromInput() {
  const input = document.getElementById("backtestInput");
  const result = document.getElementById("backtestWalkforwardResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入股票或载入对比池");
    return;
  }
  if (input && !rawInput) input.value = raw;
  const strategy = document.getElementById("backtestStrategy")?.value || "ma_cross";
  const days = document.getElementById("backtestDays")?.value || "260";
  if (result) result.innerHTML = "正在进行训练/样本外切分验证...";
  try {
    const params = new URLSearchParams({
      keys: raw,
      strategy,
      days,
      short: backtestControlValue("backtestShort", 5),
      long: backtestControlValue("backtestLong", 20),
      lookback: backtestControlValue("backtestLookback", 20),
      stopLoss: backtestControlValue("backtestStopLoss", 8),
      fee: "0.0005",
      trainRatio: "0.7"
    });
    const response = await fetch("/api/stock-backtest-walkforward?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "样本外验证失败");
    state.lastBacktestWalkforward = data;
    try {
      localStorage.setItem("xiaoke_last_walkforward_v1", JSON.stringify(data));
    } catch {}
    if (result) result.innerHTML = renderBacktestWalkforwardResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "样本外验证失败")}</span>`;
    showToast(error.message || "样本外验证失败");
  }
}

async function runPortfolioBacktestFromInput() {
  const input = document.getElementById("backtestInput");
  const result = document.getElementById("portfolioBacktestResult");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || readStockComparePool().join(", ");
  if (!raw) {
    showToast("先输入股票或载入对比池");
    return;
  }
  if (input && !rawInput) input.value = raw;
  const days = document.getElementById("backtestDays")?.value || "260";
  if (result) result.innerHTML = "正在计算等权组合回测...";
  try {
    const params = new URLSearchParams({
      keys: raw,
      days,
      fee: "0.0005"
    });
    const response = await fetch("/api/portfolio-backtest?" + params.toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "组合回测失败");
    state.lastPortfolioBacktest = data;
    try {
      localStorage.setItem("xiaoke_last_portfolio_backtest_v1", JSON.stringify(data));
    } catch {}
    if (result) result.innerHTML = renderPortfolioBacktestResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "组合回测失败")}</span>`;
    showToast(error.message || "组合回测失败");
  }
}

function quantInputRaw() {
  const input = document.getElementById("quantInput");
  const backtestInput = document.getElementById("backtestInput");
  const rawInput = input ? input.value.trim() : "";
  const raw = rawInput || (backtestInput ? backtestInput.value.trim() : "") || readStockComparePool().join(", ");
  if (input && !rawInput && raw) input.value = raw;
  return raw;
}

function quantOptions() {
  const days = document.getElementById("backtestDays")?.value || "260";
  const strategy = document.getElementById("backtestStrategy")?.value || "ma_cross";
  return {
    days,
    strategy,
    topN: document.getElementById("quantTopN")?.value || "5",
    riskBudget: document.getElementById("quantRiskBudget")?.value || "25",
    maxWeight: "25",
    minCash: "15",
    short: backtestControlValue("backtestShort", 5),
    long: backtestControlValue("backtestLong", 20),
    lookback: backtestControlValue("backtestLookback", 20),
    stopLoss: backtestControlValue("backtestStopLoss", 8),
    fee: "0.0005",
    trainRatio: "0.7",
    rebalancePeriod: document.getElementById("quantRebalancePeriod")?.value || "monthly",
    rotationLookback: "60",
    shortLookback: "20"
  };
}

function quantParams(raw) {
  const opts = quantOptions();
  return new URLSearchParams({ keys: raw, ...opts });
}

function fillQuantInputFromComparePool() {
  const input = document.getElementById("quantInput");
  const pool = readStockComparePool();
  if (input) input.value = pool.join(", ");
}

function renderQuantRotationResult(data = {}) {
  const items = data.items || [];
  const selected = data.selected || [];
  if (!items.length) return `<div class="date">没有轮动评分结果。</div>`;
  const rows = items.slice(0, 12).map(item => `
    <tr>
      <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
      <td><b>${escapeHtml(item.rotationScore ?? "-")}</b><div class="date">${escapeHtml(item.decision || "-")}</div></td>
      <td>${escapeHtml(item.suggestedWeight ?? 0)}%</td>
      <td><span class="decision-chip ${item.riskLevel === "高" ? "danger" : item.riskLevel === "中" ? "warn" : "good"}">${escapeHtml(item.riskLevel || "-")}</span></td>
      <td>${escapeHtml(item.components?.momentum ?? "-")} / ${escapeHtml(item.components?.quality ?? "-")} / ${escapeHtml(item.components?.growth ?? "-")}</td>
      <td>${escapeHtml(item.components?.backtest ?? "-")} / ${escapeHtml(item.components?.walkforward ?? "-")}</td>
      <td>${escapeHtml(item.backtest?.maxDrawdown ?? "-")}%</td>
      <td>${escapeHtml(item.walkforward?.judgement || "-")}</td>
    </tr>
  `).join("");
  return `
    <div class="panel" style="background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.22)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">轮动评分结论</div>
          <div class="date">入选 ${selected.length}/${items.length}，现金 ${escapeHtml(data.cashWeight ?? "-")}%，单股上限 ${escapeHtml(data.maxWeight ?? "-")}%。</div>
        </div>
        <span class="decision-chip good">已排序</span>
      </div>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>标的</th><th>总分</th><th>建议权重</th><th>风险</th><th>行情/质量/成长</th><th>回测/样本外</th><th>回撤</th><th>样本外判断</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "公开数据/本地档案")}。${escapeHtml(data.note || "")}</div>
  `;
}

function renderQuantRiskPlanResult(data = {}) {
  const rotation = data.rotation || {};
  const selected = rotation.selected || [];
  const portfolio = data.portfolio && data.portfolio.portfolio ? data.portfolio.portfolio : null;
  const rows = selected.map(item => `
    <tr>
      <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
      <td>${escapeHtml(item.suggestedWeight ?? 0)}%</td>
      <td>${escapeHtml(item.maxAllowedWeight ?? "-")}%</td>
      <td><span class="decision-chip ${item.riskLevel === "高" ? "danger" : item.riskLevel === "中" ? "warn" : "good"}">${escapeHtml(item.riskLevel || "-")}</span></td>
      <td>${escapeHtml(item.positionNote || "-")}</td>
    </tr>
  `).join("");
  return `
    <div class="panel" style="background:rgba(90,157,255,.08);border-color:rgba(90,157,255,.22)">
      <div class="panel-title">风控仓位结论</div>
      <section class="pipeline-grid" style="grid-template-columns:repeat(6,minmax(0,1fr));margin-top:10px">
        ${metricCell("现金仓位", `${rotation.cashWeight ?? data.minCash ?? "-"}%`)}
        ${metricCell("单股上限", `${data.maxWeight ?? "-"}%`)}
        ${metricCell("回撤预算", `${data.riskBudget ?? "-"}%`)}
        ${metricCell("组合收益", portfolio ? `${portfolio.totalReturn}%` : "-")}
        ${metricCell("组合回撤", portfolio ? `${portfolio.maxDrawdown}%` : "-")}
        ${metricCell("组合夏普", portfolio ? portfolio.sharpe : "-")}
      </section>
      <div class="date" style="margin-top:8px">${escapeHtml(data.portfolioRisk || "")}</div>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>标的</th><th>建议权重</th><th>允许上限</th><th>风险</th><th>仓位备注</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="5">暂无入选标的。</td></tr>`}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">${escapeHtml(data.note || "")}</div>
  `;
}

function renderQuantReportResult(data = {}) {
  const report = data.report || "";
  if (!report) return `<div class="date">没有生成报告。</div>`;
  const backtest = data.rotationBacktest || {};
  const backtestPortfolio = backtest.portfolio || null;
  const matrix = data.rotationMatrix || {};
  const best = matrix.best || null;
  const bestBenchmark = (backtest.benchmarks || [])
    .filter(item => !item.error && item.excessReturn !== undefined && item.excessReturn !== "")
    .sort((a, b) => Number(b.excessReturn || 0) - Number(a.excessReturn || 0))[0] || null;
  const summaryHtml = `
    <section class="pipeline-grid" style="grid-template-columns:repeat(6,minmax(0,1fr));margin:10px 0">
      ${metricCell("轮动收益", backtestPortfolio ? `${backtestPortfolio.totalReturn}%` : "-")}
      ${metricCell("最大回撤", backtestPortfolio ? `${backtestPortfolio.maxDrawdown}%` : "-")}
      ${metricCell("基准超额", bestBenchmark ? `${bestBenchmark.excessReturn}%` : "-")}
      ${metricCell("最佳参数", best ? `Top${best.topN}` : "-")}
      ${metricCell("矩阵分", best ? best.matrixScore : "-")}
      ${metricCell("判断", best ? best.judgement : "-")}
    </section>
  `;
  return `
    <div class="panel" style="background:rgba(255,255,255,.035)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">量化复盘报告</div>
          <div class="date">已生成，包含轮动评分、风控、历史回测、基准对比、换仓归因和参数矩阵。</div>
        </div>
        <button class="small-btn" onclick="openAgentWithQuestion('请解读最近一次量化复盘报告，指出最重要的观察条件和风险边界。', 'investment', true)">让 Agent 解读</button>
      </div>
      ${summaryHtml}
      <pre style="white-space:pre-wrap;line-height:1.7;margin:0;color:#dce0e8;font-family:inherit">${escapeHtml(report)}</pre>
    </div>
  `;
}

function periodLabel(value) {
  if (value === "weekly") return "周度";
  if (value === "quarterly") return "季度";
  return "月度";
}

function renderQuantRotationBacktestResult(data = {}) {
  const portfolio = data.portfolio || null;
  const periods = data.periods || [];
  if (!portfolio) {
    return `
      <div class="panel" style="background:rgba(244,63,94,.08);border-color:rgba(244,63,94,.22)">
        <div class="panel-title">历史轮动回测暂无结果</div>
        <div class="date">${escapeHtml(data.note || "样本不足，无法形成历史轮动回测。")}</div>
      </div>
    `;
  }
  const moveText = (items = []) => (items || [])
    .slice(0, 4)
    .map(item => `${item.name || item.key}${item.reason ? `：${item.reason}` : ""}`)
    .join(" / ");
  const latestPeriod = periods.length ? periods[periods.length - 1] : null;
  const latestAttributionHtml = latestPeriod ? `
    <div class="panel" style="margin-top:10px;background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.22)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">最近换仓归因</div>
          <div class="date">${escapeHtml(latestPeriod.date || "-")} · ${escapeHtml(latestPeriod.attribution || "本期组合结构基本稳定")}</div>
        </div>
        <span class="decision-chip ${Number(latestPeriod.turnover || 0) > 30 ? "warn" : "good"}">换手 ${escapeHtml(latestPeriod.turnover ?? "-")}%</span>
      </div>
      <section class="pipeline-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:10px">
        <div class="pipeline-cell"><b>新进</b><span>${escapeHtml(moveText(latestPeriod.entered) || "-")}</span></div>
        <div class="pipeline-cell"><b>保留</b><span>${escapeHtml(moveText(latestPeriod.kept) || "-")}</span></div>
        <div class="pipeline-cell"><b>调出</b><span>${escapeHtml(moveText(latestPeriod.exited) || "-")}</span></div>
        <div class="pipeline-cell"><b>未入选</b><span>${escapeHtml(moveText(latestPeriod.rejected) || "-")}</span></div>
      </section>
    </div>
  ` : "";
  const benchmarkRows = (data.benchmarks || []).map(item => {
    if (item.error) return `<tr><td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td><td colspan="6" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    const excess = Number(item.excessReturn || 0);
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.source || "")}</div></td>
        <td>${escapeHtml(item.totalReturn ?? "-")}%</td>
        <td>${escapeHtml(item.annualizedReturn ?? "-")}%</td>
        <td>${escapeHtml(item.maxDrawdown ?? "-")}%</td>
        <td>${escapeHtml(item.sharpe ?? "-")}</td>
        <td><span style="color:${excess >= 0 ? "#34d399" : "#fca5a5"}">${escapeHtml(item.excessReturn ?? "-")}%</span></td>
        <td>${escapeHtml(item.startDate || "-")} 至 ${escapeHtml(item.endDate || "-")}</td>
      </tr>
    `;
  }).join("");
  const bestBenchmark = (data.benchmarks || [])
    .filter(item => !item.error && item.excessReturn !== undefined && item.excessReturn !== "")
    .sort((a, b) => Number(b.excessReturn || 0) - Number(a.excessReturn || 0))[0];
  const benchmarkHtml = `
    <div class="panel" style="margin-top:10px;background:rgba(255,255,255,.035)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">基准对比</div>
          <div class="date">把轮动策略和同池等权买入持有、宽基指数放在同一区间比较，重点看超额收益和回撤差异。</div>
        </div>
        <span class="decision-chip ${Number(bestBenchmark?.excessReturn || 0) >= 0 ? "good" : "warn"}">${escapeHtml(bestBenchmark ? `最佳超额 ${bestBenchmark.excessReturn}%` : "待基准")}</span>
      </div>
      <div style="overflow:auto;margin-top:10px">
        <table class="review-table">
          <thead><tr><th>基准</th><th>基准收益</th><th>基准年化</th><th>基准回撤</th><th>基准夏普</th><th>轮动超额</th><th>区间</th></tr></thead>
          <tbody>${benchmarkRows || `<tr><td colspan="7">暂无基准数据。</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
  const periodRows = periods.slice(-10).reverse().map(period => `
    <tr>
      <td>${escapeHtml(period.date || "-")}</td>
      <td>${escapeHtml((period.selected || []).map(item => `${item.name || item.key} ${item.weight ?? 0}%`).join("；") || "-")}</td>
      <td>${escapeHtml(period.cashWeight ?? "-")}%</td>
      <td>${escapeHtml(period.turnover ?? "-")}%</td>
      <td>${escapeHtml(period.attribution || "-")}</td>
      <td>${escapeHtml(moveText(period.entered) || "-")}</td>
      <td>${escapeHtml(moveText(period.exited) || "-")}</td>
      <td>${escapeHtml((period.leaders || []).slice(0, 3).map(item => `${item.name || item.key}:${item.score}${item.reason ? `(${item.reason})` : ""}`).join(" / ") || "-")}</td>
    </tr>
  `).join("");
  const itemRows = (data.items || []).slice(0, 12).map(item => {
    if (item.error) return `<tr><td><b>${escapeHtml(item.name || item.key)}</b></td><td colspan="3" style="color:#fca5a5">${escapeHtml(item.error)}</td></tr>`;
    return `
      <tr>
        <td><b>${escapeHtml(item.name || item.key)}</b><div class="date">${escapeHtml(item.key || "")}</div></td>
        <td>${escapeHtml(item.selectedPeriods ?? 0)}</td>
        <td>${escapeHtml(item.buyHoldReturn ?? "-")}%</td>
        <td>${escapeHtml(item.source || "-")}</td>
      </tr>
    `;
  }).join("");
  return `
    <div class="panel" style="background:rgba(25,201,139,.08);border-color:rgba(25,201,139,.22)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">历史轮动回测</div>
          <div class="date">${escapeHtml(periodLabel(data.rebalancePeriod))}换仓，回看 ${escapeHtml(data.rotationLookback || "-")} 个交易日，区间 ${escapeHtml(portfolio.startDate || "-")} 至 ${escapeHtml(portfolio.endDate || "-")}。</div>
        </div>
        <span class="decision-chip ${Number(portfolio.sharpe || 0) >= 1 ? "good" : Math.abs(Number(portfolio.maxDrawdown || 0)) <= 25 ? "warn" : "danger"}">${escapeHtml(Number(portfolio.sharpe || 0) >= 1 ? "韧性较好" : Math.abs(Number(portfolio.maxDrawdown || 0)) <= 25 ? "需复核" : "回撤偏大")}</span>
      </div>
      <section class="pipeline-grid" style="grid-template-columns:repeat(8,minmax(0,1fr));margin-top:10px">
        ${metricCell("轮动收益", `${portfolio.totalReturn}%`)}
        ${metricCell("年化收益", `${portfolio.annualizedReturn}%`)}
        ${metricCell("最大回撤", `${portfolio.maxDrawdown}%`)}
        ${metricCell("年化波动", `${portfolio.annualVolatility}%`)}
        ${metricCell("夏普", portfolio.sharpe)}
        ${metricCell("Sortino", portfolio.sortino)}
        ${metricCell("胜率", `${portfolio.winRate}%`)}
        ${metricCell("换仓次数", portfolio.rebalanceCount)}
      </section>
    </div>
    ${latestAttributionHtml}
    ${benchmarkHtml}
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>换仓日</th><th>持仓</th><th>现金</th><th>换手</th><th>归因</th><th>新进原因</th><th>调出原因</th><th>前三评分</th></tr></thead>
        <tbody>${periodRows || `<tr><td colspan="8">暂无换仓记录。</td></tr>`}</tbody>
      </table>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>成分</th><th>入选期数</th><th>单股持有收益</th><th>来源</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">数据来源：${escapeHtml(data.source || "历史日线")}。${escapeHtml(data.note || "")}</div>
  `;
}

function renderQuantRotationMatrixResult(data = {}) {
  const rows = data.results || [];
  const best = data.best || rows[0] || null;
  if (!rows.length) {
    return `
      <div class="panel" style="background:rgba(244,63,94,.08);border-color:rgba(244,63,94,.22)">
        <div class="panel-title">参数矩阵暂无结果</div>
        <div class="date">${escapeHtml(data.note || "样本不足，无法形成参数矩阵。")}</div>
      </div>
    `;
  }
  const resultRows = rows.slice(0, 12).map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><b>Top${escapeHtml(item.topN)}</b><div class="date">${escapeHtml(periodLabel(item.rebalancePeriod))} · ${escapeHtml(item.rotationLookback)}日回看</div></td>
      <td>${escapeHtml(item.matrixScore ?? "-")}</td>
      <td>${escapeHtml(item.totalReturn ?? "-")}%</td>
      <td>${escapeHtml(item.annualizedReturn ?? "-")}%</td>
      <td>${escapeHtml(item.maxDrawdown ?? "-")}%</td>
      <td>${escapeHtml(item.sharpe ?? "-")}</td>
      <td>${escapeHtml(item.indexExcessReturn ?? "-")}%</td>
      <td>${escapeHtml(item.equalWeightExcessReturn ?? "-")}%</td>
      <td>${escapeHtml(item.judgement || "-")}</td>
    </tr>
  `).join("");
  const statRows = [
    ...(data.periodStats || []).map(item => ({
      name: periodLabel(item.rebalancePeriod),
      type: "周期",
      ...item
    })),
    ...(data.topNStats || []).map(item => ({
      name: `Top${item.topN}`,
      type: "持仓数",
      ...item
    }))
  ].map(item => `
    <tr>
      <td>${escapeHtml(item.type)}</td>
      <td><b>${escapeHtml(item.name)}</b></td>
      <td>${escapeHtml(item.avgScore ?? "-")}</td>
      <td>${escapeHtml(item.avgReturn ?? "-")}%</td>
      <td>${escapeHtml(item.avgDrawdown ?? "-")}%</td>
      <td>${escapeHtml(item.count ?? "-")}</td>
    </tr>
  `).join("");
  return `
    <div class="panel" style="background:rgba(99,102,241,.08);border-color:rgba(99,102,241,.24)">
      <div class="metadata-head">
        <div>
          <div class="panel-title">参数矩阵</div>
          <div class="date">已测试 ${escapeHtml(data.count || rows.length)} 组参数：Top3/5/8 × 周/月/季 × 40/60/90日回看。评分综合收益、指数超额、夏普、回撤和换仓稳定性。</div>
        </div>
        <span class="decision-chip ${Number(best.matrixScore || 0) >= 70 ? "good" : Number(best.matrixScore || 0) >= 45 ? "warn" : "danger"}">最佳 ${escapeHtml(best.matrixScore ?? "-")} 分</span>
      </div>
      <section class="pipeline-grid" style="grid-template-columns:repeat(7,minmax(0,1fr));margin-top:10px">
        ${metricCell("最佳参数", `Top${best.topN}`)}
        ${metricCell("换仓周期", periodLabel(best.rebalancePeriod))}
        ${metricCell("回看日数", best.rotationLookback)}
        ${metricCell("策略收益", `${best.totalReturn}%`)}
        ${metricCell("最大回撤", `${best.maxDrawdown}%`)}
        ${metricCell("指数超额", `${best.indexExcessReturn}%`)}
        ${metricCell("判断", best.judgement || "-")}
      </section>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>排名</th><th>参数</th><th>矩阵分</th><th>收益</th><th>年化</th><th>回撤</th><th>夏普</th><th>指数超额</th><th>等权超额</th><th>判断</th></tr></thead>
        <tbody>${resultRows}</tbody>
      </table>
    </div>
    <div style="overflow:auto;margin-top:10px">
      <table class="review-table">
        <thead><tr><th>类型</th><th>分组</th><th>平均分</th><th>平均收益</th><th>平均回撤</th><th>样本数</th></tr></thead>
        <tbody>${statRows}</tbody>
      </table>
    </div>
    <div class="date" style="margin-top:8px">${escapeHtml(data.note || "")}</div>
  `;
}

async function runQuantRotationFromInput() {
  const result = document.getElementById("quantRotationResult");
  const raw = quantInputRaw();
  if (!raw) return showToast("先输入股票或载入对比池");
  if (result) result.innerHTML = "正在计算轮动评分...";
  try {
    const response = await fetch("/api/rotation-strategy?" + quantParams(raw).toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "轮动评分失败");
    state.lastQuantRotation = data;
    try { localStorage.setItem(QUANT_ROTATION_KEY, JSON.stringify(data)); } catch {}
    if (result) result.innerHTML = renderQuantRotationResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "轮动评分失败")}</span>`;
    showToast(error.message || "轮动评分失败");
  }
}

async function runQuantRotationBacktestFromInput() {
  const result = document.getElementById("quantRotationBacktestResult");
  const raw = quantInputRaw();
  if (!raw) return showToast("先输入股票或载入对比池");
  if (result) result.innerHTML = "正在运行历史轮动回测...";
  try {
    const response = await fetch("/api/rotation-backtest?" + quantParams(raw).toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "历史轮动回测失败");
    state.lastQuantRotationBacktest = data;
    try { localStorage.setItem(QUANT_ROTATION_BACKTEST_KEY, JSON.stringify(data)); } catch {}
    if (result) result.innerHTML = renderQuantRotationBacktestResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "历史轮动回测失败")}</span>`;
    showToast(error.message || "历史轮动回测失败");
  }
}

async function runQuantRotationMatrixFromInput() {
  const result = document.getElementById("quantRotationMatrixResult") || document.getElementById("quantRotationBacktestResult");
  const raw = quantInputRaw();
  if (!raw) return showToast("先输入股票或载入对比池");
  if (result) result.innerHTML = "正在运行参数矩阵，可能需要几十秒...";
  try {
    const response = await fetch("/api/rotation-matrix?" + quantParams(raw).toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "参数矩阵失败");
    state.lastQuantRotationMatrix = data;
    try { localStorage.setItem(QUANT_ROTATION_MATRIX_KEY, JSON.stringify(data)); } catch {}
    if (result) result.innerHTML = renderQuantRotationMatrixResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "参数矩阵失败")}</span>`;
    showToast(error.message || "参数矩阵失败");
  }
}

async function runQuantRiskPlanFromInput() {
  const result = document.getElementById("quantRiskPlanResult");
  const raw = quantInputRaw();
  if (!raw) return showToast("先输入股票或载入对比池");
  if (result) result.innerHTML = "正在生成风控仓位...";
  try {
    const response = await fetch("/api/risk-plan?" + quantParams(raw).toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "风控仓位失败");
    state.lastQuantRiskPlan = data;
    try { localStorage.setItem(QUANT_RISK_PLAN_KEY, JSON.stringify(data)); } catch {}
    if (result) result.innerHTML = renderQuantRiskPlanResult(data);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "风控仓位失败")}</span>`;
    showToast(error.message || "风控仓位失败");
  }
}

async function runQuantReportFromInput() {
  const result = document.getElementById("quantReportResult");
  const raw = quantInputRaw();
  if (!raw) return showToast("先输入股票或载入对比池");
  if (result) result.innerHTML = "正在生成量化复盘报告...";
  try {
    const response = await fetch("/api/quant-report?" + quantParams(raw).toString());
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "量化报告失败");
    state.lastQuantReport = data;
    state.lastQuantRiskPlan = data;
    state.lastQuantRotation = data.rotation;
    if (data.rotationBacktest) state.lastQuantRotationBacktest = data.rotationBacktest;
    if (data.rotationMatrix) state.lastQuantRotationMatrix = data.rotationMatrix;
    try {
      localStorage.setItem(QUANT_REPORT_KEY, JSON.stringify(data));
      localStorage.setItem(QUANT_RISK_PLAN_KEY, JSON.stringify(data));
      if (data.rotation) localStorage.setItem(QUANT_ROTATION_KEY, JSON.stringify(data.rotation));
      if (data.rotationBacktest) localStorage.setItem(QUANT_ROTATION_BACKTEST_KEY, JSON.stringify(data.rotationBacktest));
      if (data.rotationMatrix) localStorage.setItem(QUANT_ROTATION_MATRIX_KEY, JSON.stringify(data.rotationMatrix));
    } catch {}
    if (result) result.innerHTML = renderQuantReportResult(data);
    const riskTarget = document.getElementById("quantRiskPlanResult");
    if (riskTarget) riskTarget.innerHTML = renderQuantRiskPlanResult(data);
    const rotationTarget = document.getElementById("quantRotationResult");
    if (rotationTarget && data.rotation) rotationTarget.innerHTML = renderQuantRotationResult(data.rotation);
    const backtestTarget = document.getElementById("quantRotationBacktestResult");
    if (backtestTarget && data.rotationBacktest) backtestTarget.innerHTML = renderQuantRotationBacktestResult(data.rotationBacktest);
    const matrixTarget = document.getElementById("quantRotationMatrixResult");
    if (matrixTarget && data.rotationMatrix) matrixTarget.innerHTML = renderQuantRotationMatrixResult(data.rotationMatrix);
  } catch (error) {
    if (result) result.innerHTML = `<span style="color:#fca5a5">${escapeHtml(error.message || "量化报告失败")}</span>`;
    showToast(error.message || "量化报告失败");
  }
}

async function autoFillStockProfilesFromQuotes() {
  const rows = await stockProfileRowsForPage();
  const candidates = rows
    .map(row => {
      const item = row.item || {};
      const brief = row.brief || {};
      if (!row.key || brief.price == null) return null;
      return {
        key: row.key,
        name: item.name || brief.name || row.key,
        sector: item.sector || brief.sector || "",
        pe: brief.pe || "",
        pb: brief.pb || "",
        marketCap: brief.marketCap || "",
        note: [
          item.desc || "",
          brief.financialReportDate ? `财报期：${brief.financialReportDate}` : "",
          brief.revenue ? `营收：${brief.revenue}` : "",
          brief.netProfit ? `归母净利：${brief.netProfit}` : "",
          brief.roe ? `ROE：${brief.roe}%` : "",
          brief.netMargin ? `净利率：${brief.netMargin}%` : "",
          brief.turnoverRate ? `换手率：${brief.turnoverRate}%` : "",
          brief.amplitude ? `振幅：${brief.amplitude}%` : "",
          brief.circulatingMarketCap ? `流通市值：${brief.circulatingMarketCap}` : ""
        ].filter(Boolean).join("；"),
        grossMargin: brief.grossMargin || "",
        revenueGrowth: brief.revenueGrowth || "",
        profitGrowth: brief.profitGrowth || "",
        dataSource: brief.profileSource || "腾讯行情估值 / 东方财富财务"
      };
    })
    .filter(item => item && (item.pe || item.pb || item.marketCap));
  if (!candidates.length) {
    showToast("暂时没有可自动补齐的行情估值字段");
    return;
  }
  if (!confirm(`将用行情估值自动补齐 ${candidates.length} 个股票档案。PE/PB/市值来自行情接口，仍需人工复核。继续吗？`)) return;
  let saved = 0;
  for (const payload of candidates) {
    try {
      const response = await fetch("/api/stock-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) saved += 1;
    } catch {}
  }
  showToast(`已自动补齐 ${saved} 个股票档案`);
  await renderStockProfiles();
}

function agentStockContext(briefs = []) {
  if (!briefs.length) return null;
  const lines = briefs.map(item => [
    `标的：${item.localName || item.name || item.key}`,
    `代码：${item.key || item.quoteKey || "-"}`,
    `板块：${item.localSector || item.sector || "-"}`,
    `现价：${item.price == null ? "-" : item.price}`,
    `涨跌幅：${item.pct == null ? "-" : item.pct + "%"}`,
    `PE：${item.pe || "-"}`,
    `PB：${item.pb || "-"}`,
    `市值：${item.marketCap || "-"}`,
    `流通市值：${item.circulatingMarketCap || "-"}`,
    `换手率：${item.turnoverRate || "-"}`,
    `振幅：${item.amplitude || "-"}`,
    `毛利率：${item.grossMargin || "-"}`,
    `净利率：${item.netMargin || "-"}`,
    `ROE：${item.roe || "-"}`,
    `营收增速：${item.revenueGrowth || "-"}`,
    `利润增速：${item.profitGrowth || "-"}`,
    `营收：${item.revenue || "-"}`,
    `归母净利：${item.netProfit || "-"}`,
    `财报期：${item.financialReportDate || "-"}`,
    `阶段判断：${item.stage || "-"}`,
    `本地档案：${item.localDesc || item.desc || "-"}`,
    `财务备注：${item.profileNote || "-"}`,
    `数据质量：${item.dataQuality || "-"}`,
    `数据来源：${item.profileSource || "腾讯行情估值 / 东方财富财务"}`
  ].join("\n"));
  return {
    role: "user",
    content: [
      "【实时标的数据卡】",
      "这些数据只用于辅助复盘，不能替代正式行情终端和人工核验。",
      lines.join("\n\n")
    ].join("\n")
  };
}

function agentSourceDirectiveContext(briefs = [], evidence = []) {
  const quoteNames = briefs.map(item => item.localName || item.name || item.key).filter(Boolean).join("、") || "无具体标的";
  const evidenceNames = evidence.map(item => `[${item.no || item.id || "?"}] ${item.title || item.name || item.source || "本地素材"}`).slice(0, 8).join("；") || "未检索到直接素材";
  const announcementNames = briefs.flatMap(item => (item.latestAnnouncements || []).map(a => `${item.localName || item.name || item.key}：${a.date || ""} ${a.title || ""}${a.summary ? "；摘要：" + agentClip(a.summary, 160) : ""}`)).slice(0, 8).join("；") || "未拉到公告";
  const quoteSources = [...new Set(briefs.map(item => item.quoteSource || item.source).filter(Boolean))].join(" / ") || "腾讯行情";
  const financialSources = [...new Set(briefs.map(item => item.financialSource).filter(Boolean))].join(" / ") || "东方财富财务";
  return {
    role: "user",
    content: [
      "【证据链输出要求】",
      "当前系统采用数据源分层：机构终端 Wind/iFinD/Choice 优先；没有账号或 SDK 时，自动回退公开数据源。回答时必须说明当前实际来源，不要假装已经接入机构终端。",
      "回答必须把证据拆成四类：",
      `1. 行情来源：${quoteSources}。只引用实时接口返回的现价、涨跌幅、PE、PB、市值、换手率、振幅等字段；如果是机构终端字段，仍需说明口径需人工复核。`,
      `2. 财务来源：${financialSources}。只引用接口返回的财报期、营收、归母净利、毛利率、净利率、ROE、营收增速、利润增速等字段。`,
      "3. 公告来源：巨潮资讯公告。优先引用公告标题、日期、风险标签、PDF 摘要和风险点；如果 PDF 没有提取到正文，必须说明只是标题级证据。",
      "4. 观点来源：本地视频、高赞评论/博主互动、用户记忆、我的策略、每日复盘。投资 Agent 不自动检索书籍。引用时使用 [1]、[2] 这类证据编号。",
      "如果某类来源缺失，直接写“缺少直接证据，需要人工复核”，不要编造。",
      "任何股票相关回答都只能给复盘框架、观察条件和风险边界，不给确定性买入/卖出指令。",
      `当前标的：${quoteNames}`,
      `当前行情来源：${quoteSources}`,
      `当前财务来源：${financialSources}`,
      `当前公告：${announcementNames}`,
      `当前观点证据：${evidenceNames}`
    ].join("\n")
  };
}

function readLastBacktestResult() {
  if (state.lastBacktestResult && Array.isArray(state.lastBacktestResult.items)) return state.lastBacktestResult;
  try {
    const data = JSON.parse(localStorage.getItem("xiaoke_last_backtest_v1") || "{}");
    return Array.isArray(data.items) ? data : null;
  } catch {
    return null;
  }
}

function agentBacktestContext() {
  const data = readLastBacktestResult();
  let walkforward = null;
  let portfolio = null;
  let quantReport = null;
  let quantRisk = null;
  let quantRotation = null;
  let rotationBacktest = null;
  let rotationMatrix = null;
  try {
    walkforward = state.lastBacktestWalkforward || JSON.parse(localStorage.getItem("xiaoke_last_walkforward_v1") || "null");
  } catch {
    walkforward = null;
  }
  try {
    portfolio = state.lastPortfolioBacktest || JSON.parse(localStorage.getItem("xiaoke_last_portfolio_backtest_v1") || "null");
  } catch {
    portfolio = null;
  }
  try {
    quantReport = state.lastQuantReport || JSON.parse(localStorage.getItem(QUANT_REPORT_KEY) || "null");
    quantRisk = state.lastQuantRiskPlan || JSON.parse(localStorage.getItem(QUANT_RISK_PLAN_KEY) || "null");
    quantRotation = state.lastQuantRotation || JSON.parse(localStorage.getItem(QUANT_ROTATION_KEY) || "null");
    rotationBacktest = state.lastQuantRotationBacktest || JSON.parse(localStorage.getItem(QUANT_ROTATION_BACKTEST_KEY) || "null");
    rotationMatrix = state.lastQuantRotationMatrix || JSON.parse(localStorage.getItem(QUANT_ROTATION_MATRIX_KEY) || "null");
  } catch {
    quantReport = null;
    quantRisk = null;
    quantRotation = null;
    rotationBacktest = null;
    rotationMatrix = null;
  }
  const hasSingle = data && Array.isArray(data.items) && data.items.length;
  const hasWalkforward = walkforward && Array.isArray(walkforward.items) && walkforward.items.length;
  const hasPortfolio = portfolio && portfolio.portfolio;
  const rotationBox = quantReport?.rotation || quantRisk?.rotation || quantRotation || null;
  const riskBox = quantReport || quantRisk || null;
  const hasQuant = rotationBox && Array.isArray(rotationBox.items) && rotationBox.items.length;
  const hasRotationBacktest = rotationBacktest && rotationBacktest.portfolio;
  const hasRotationMatrix = rotationMatrix && Array.isArray(rotationMatrix.results) && rotationMatrix.results.length;
  if (!hasSingle && !hasWalkforward && !hasPortfolio && !hasQuant && !hasRotationBacktest && !hasRotationMatrix) return null;
  const lines = (hasSingle ? data.items : []).slice(0, 8).map(item => {
    if (item.error) return `鏍囩殑锛?{item.name || item.key}锛涘洖娴嬪け璐ワ細${item.error}`;
    return [
      `鏍囩殑锛?{item.name || item.key}`,
      `绛栫暐锛?{item.strategy || "-"}`,
      `绛栫暐鏀剁泭锛?{item.totalReturn}%`,
      `涔板叆鎸佹湁锛?{item.buyHoldReturn}%`,
      `瓒呴锛?{item.excessReturn}%`,
      `鏈€澶у洖鎾わ細${item.maxDrawdown}%`,
      `澶忔櫘锛?{item.sharpe ?? "-"}`,
      `Sortino锛?{item.sortino ?? "-"}`,
      `Calmar锛?{item.calmar ?? "-"}`,
      `Profit Factor锛?{item.profitFactor ?? "-"}`,
      `鏆撮湶鐜囷細${item.exposurePct ?? "-"}%`,
      `浜ゆ槗娆℃暟锛?{item.tradeCount}`,
      `鑳滅巼锛?{item.winRate}%`,
      `鏈€鏂颁俊鍙凤細${backtestSignalText(item.lastSignal)}`,
      `澶嶇洏鍒ゆ柇锛?{backtestTone(item)}`
    ].join("；");
  }).join("\n");
  const wfLines = (hasWalkforward ? walkforward.items : []).slice(0, 8).map(item => {
    if (item.error) return `鏍囩殑锛?{item.name || item.key}锛涙牱鏈澶辫触锛?{item.error}`;
    const params = item.params || {};
    return [
      `鏍囩殑锛?{item.name || item.key}`,
      `璁粌鏈€浣冲弬鏁帮細${params.strategy === "breakout" ? "绐佺牬" + params.lookback : (params.short + "/" + params.long)}`,
      `璁粌骞村寲锛?{item.train?.annualizedReturn ?? "-"}%`,
      `鏍锋湰澶栧勾鍖栵細${item.test?.annualizedReturn ?? "-"}%`,
      `鏍锋湰澶栨敹鐩婏細${item.test?.totalReturn ?? "-"}%`,
      `鏍锋湰澶栧洖鎾わ細${item.test?.maxDrawdown ?? "-"}%`,
      `鍒ゆ柇锛?{item.judgement || "-"}`
    ].join("；");
  }).join("\n");
  const box = hasPortfolio ? portfolio.portfolio : null;
  const portfolioLines = box ? [
    `组合标的数：${box.count}`,
    `区间：${box.startDate} 至 ${box.endDate}`,
    `组合收益：${box.totalReturn}%`,
    `年化收益：${box.annualizedReturn}%`,
    `最大回撤：${box.maxDrawdown}%`,
    `年化波动：${box.annualVolatility}%`,
    `夏普：${box.sharpe}`,
    `Sortino：${box.sortino}`,
    `上涨日胜率：${box.winRate}%`,
    `成分：${(portfolio.items || []).slice(0, 8).map(item => `${item.name || item.key}(${item.buyHoldReturn ?? "-"}%)`).join("；")}`
  ].join("；") : "";
  const quantLines = hasQuant ? [
    `入选：${(rotationBox.selected || []).map(item => `${item.name || item.key} 权重${item.suggestedWeight ?? 0}% 评分${item.rotationScore}`).join("；") || "无"}`,
    `现金仓位：${rotationBox.cashWeight ?? riskBox?.minCash ?? "-"}%`,
    `单股上限：${riskBox?.maxWeight ?? rotationBox.maxWeight ?? "-"}%`,
    `回撤预算：${riskBox?.riskBudget ?? "-"}%`,
    `组合风险：${riskBox?.portfolioRisk || "-"}`,
    `观察池：${(rotationBox.items || []).slice(0, 8).map(item => `${item.name || item.key}(${item.rotationScore ?? "-"}分/${item.riskLevel || "-"}风险/${item.decision || "-"})`).join("；")}`
  ].join("；") : "";
  const rb = hasRotationBacktest ? rotationBacktest.portfolio : null;
  const latestRbPeriod = hasRotationBacktest ? (rotationBacktest.periods || []).slice(-1)[0] : null;
  const rbBenchmarks = hasRotationBacktest ? (rotationBacktest.benchmarks || []).filter(item => !item.error).slice(0, 5) : [];
  const rotationBacktestLines = rb ? [
    `周期：${periodLabel(rotationBacktest.rebalancePeriod)}换仓`,
    `区间：${rb.startDate} 至 ${rb.endDate}`,
    `轮动收益：${rb.totalReturn}%`,
    `年化收益：${rb.annualizedReturn}%`,
    `最大回撤：${rb.maxDrawdown}%`,
    `夏普：${rb.sharpe}`,
    `换仓次数：${rb.rebalanceCount}`,
    `最近持仓：${(latestRbPeriod?.selected || []).map(item => `${item.name || item.key} ${item.weight ?? 0}%`).join("；") || "-"}`,
    `最近换仓归因：${latestRbPeriod?.attribution || "-"}`,
    `新进原因：${(latestRbPeriod?.entered || []).map(item => `${item.name || item.key}：${item.reason || "-"}`).join("；") || "-"}`,
    `调出原因：${(latestRbPeriod?.exited || []).map(item => `${item.name || item.key}：${item.reason || "-"}`).join("；") || "-"}`,
    `基准对比：${rbBenchmarks.map(item => `${item.name}收益${item.totalReturn}%/轮动超额${item.excessReturn}%/回撤${item.maxDrawdown}%`).join("；") || "-"}`
  ].join("；") : "";
  const matrixBest = hasRotationMatrix ? (rotationMatrix.best || rotationMatrix.results[0]) : null;
  const matrixLines = matrixBest ? [
    `测试组数：${rotationMatrix.count || rotationMatrix.results.length}`,
    `最佳参数：Top${matrixBest.topN} / ${periodLabel(matrixBest.rebalancePeriod)} / ${matrixBest.rotationLookback}日回看`,
    `矩阵分：${matrixBest.matrixScore}`,
    `收益：${matrixBest.totalReturn}%`,
    `回撤：${matrixBest.maxDrawdown}%`,
    `夏普：${matrixBest.sharpe}`,
    `指数超额：${matrixBest.indexExcessReturn}%`,
    `等权超额：${matrixBest.equalWeightExcessReturn}%`,
    `判断：${matrixBest.judgement || "-"}`,
    `前五参数：${(rotationMatrix.results || []).slice(0, 5).map(item => `Top${item.topN}/${periodLabel(item.rebalancePeriod)}/${item.rotationLookback}日 ${item.matrixScore}分`).join("；")}`
  ].join("；") : "";
  return {
    role: "user",
    content: [
      "【最近一次轻量回测结果】",
      hasSingle ? `数据来源：${data.source || "历史日线"}` : "",
      hasSingle ? (data.note || "轻量回测只用于复盘假设验证。") : "",
      lines,
      wfLines ? "\n【最近一次样本外验证】" : "",
      wfLines,
      hasWalkforward ? (walkforward.note || "") : "",
      portfolioLines ? "\n【最近一次组合回测】" : "",
      portfolioLines,
      hasPortfolio ? (portfolio.note || "") : "",
      quantLines ? "\n【最近一次量化轮动与风控】" : "",
      quantLines,
      rotationBacktestLines ? "\n【最近一次历史轮动回测】" : "",
      rotationBacktestLines,
      hasRotationBacktest ? (rotationBacktest.note || "") : "",
      matrixLines ? "\n【最近一次轮动参数矩阵】" : "",
      matrixLines,
      hasRotationMatrix ? (rotationMatrix.note || "") : "",
      quantReport?.report ? "\n【最近一次量化复盘报告】\n" + quantReport.report.slice(0, 4000) : ""
    ].filter(Boolean).join("\n")
  };
}

function agentStructuredStrategyContext() {
  if (typeof readStrategyRules !== "function") return null;
  const rules = readStrategyRules();
  const result = typeof readStrategyScreenResult === "function" ? readStrategyScreenResult() : null;
  const candidates = (result?.items || []).slice(0, 10).map((item, index) =>
    `${index + 1}.${item.name}(${item.code}) 策略分${item.strategyScore} 日涨幅${item.pct}% 60日${item.pct60}% ROE${item.roe}%`
  );
  return {
    role: "user",
    content: [
      "【用户结构化选股策略】",
      JSON.stringify(rules),
      candidates.length ? `【最近筛选候选】\n${candidates.join("\n")}` : "最近尚未运行全市场筛选。",
      "候选仅代表命中用户规则；回答时必须说明数据日期、缺失字段、公告风险与需要复核的条件。"
    ].join("\n")
  };
}

function agentEvidenceChainHtml(briefs = [], evidence = []) {
  const quoteSources = briefs.length
    ? briefs.map(item => `${escapeHtml(item.localName || item.name || item.key || "标的")}：${escapeHtml(item.quoteSource || item.source || "腾讯行情")}${item.price == null ? "，待同步" : `，现价 ${Number(item.price || 0).toFixed(2)}${item.pct == null ? "" : `，涨跌幅 ${signedText(item.pct, "%")}`}`}${item.pe ? `，PE ${item.pe}` : ""}${item.pb ? `，PB ${item.pb}` : ""}`).join("<br>")
    : "未识别到股票标的，未调用行情源。";
  const financeSources = briefs.length
    ? briefs.map(item => {
        const metrics = [
          item.financialReportDate && `财报期 ${item.financialReportDate}`,
          item.revenue && `营收 ${item.revenue}`,
          item.netProfit && `归母净利 ${item.netProfit}`,
          item.grossMargin !== undefined && item.grossMargin !== "" && `毛利率 ${item.grossMargin}%`,
          item.netMargin !== undefined && item.netMargin !== "" && `净利率 ${item.netMargin}%`,
          item.roe !== undefined && item.roe !== "" && `ROE ${item.roe}%`,
          item.revenueGrowth !== undefined && item.revenueGrowth !== "" && `营收增速 ${item.revenueGrowth}%`,
          item.profitGrowth !== undefined && item.profitGrowth !== "" && `利润增速 ${item.profitGrowth}%`
        ].filter(Boolean).join("；");
        return `${escapeHtml(item.localName || item.name || item.key || "标的")}：${escapeHtml(item.financialSource || "东方财富财务")}：${metrics || "暂未匹配到可用字段"}`;
      }).join("<br>")
    : "未识别到股票标的，未调用财务源。";
  const ideaSources = evidence.length
    ? evidence.slice(0, 6).map(item => `[${escapeHtml(item.no || item.id || "?")}] ${escapeHtml(item.title || item.name || item.source || "本地素材")}`).join("<br>")
    : "本轮没有匹配到足够强的本地视频证据。";
  const announcementSources = briefs.some(item => (item.latestAnnouncements || []).length)
    ? briefs.flatMap(item => (item.latestAnnouncements || []).slice(0, 4).map(a => `${escapeHtml(item.localName || item.name || item.key || "标的")}：${escapeHtml(a.date || "-")} · ${escapeHtml(a.riskTag || "公告")} · ${escapeHtml(a.title || "")}${a.summary ? `<br><span style="color:#aeb6c6">${escapeHtml(agentClip(a.summary, 180))}</span>` : ""}${(a.riskPoints || []).length ? `<br><span style="color:#ffd07a">风险点：${escapeHtml((a.riskPoints || []).slice(0, 2).join("；"))}</span>` : ""}`)).slice(0, 8).join("<br>")
    : "本轮没有拉到公告标题，需要人工复核公告源。";
  return `
    <div class="panel" style="margin:10px 0;background:linear-gradient(180deg,rgba(25,201,139,.08),rgba(18,24,31,.9));border-color:rgba(25,201,139,.2)">
      <div class="panel-title">证据链</div>
      <div class="pipeline-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0">
        <div class="pipeline-cell"><b style="font-size:13px">行情来源</b><span style="line-height:1.6">${quoteSources}</span></div>
        <div class="pipeline-cell"><b style="font-size:13px">财务来源</b><span style="line-height:1.6">${financeSources}</span></div>
        <div class="pipeline-cell"><b style="font-size:13px">公告来源</b><span style="line-height:1.6">${announcementSources}</span></div>
        <div class="pipeline-cell"><b style="font-size:13px">观点来源</b><span style="line-height:1.6">${ideaSources}</span></div>
      </div>
      <div class="date" style="margin-top:9px">规则：无来源就标注缺少直接证据；所有结论仅用于复盘辅助，不构成投资建议。</div>
    </div>
  `;
}

function agentInvestmentFrameworkContext(responseMode = getAgentResponseMode()) {
  const professionalRules = responseMode === "professional" ? [
    "当前为专业研报模式，必须依次输出：核心观点、基本面分析、技术位置与多周期趋势、观察与应对、风险提示、来源与覆盖。",
    "基本面分析中必须加入同行横向比较和较上次研报变化；没有同行或历史版本时明确写未建立样本/本次建立基线。",
    "公告部分只写新增公告、风险标签变化和最重要的标题证据，不得把旧公告描述成新事件。",
    "必须引用研究资料完备度等级，并明确它只是资料质量，不是股票推荐分数。",
    "观察与应对必须采用偏强、基准、偏弱三情景，逐项写触发条件、基本面验证和应对动作。",
    "基本面与技术数字只可使用上下文已提供字段；缺失字段写未取得，严禁补造。",
    "短期、中期、长期采用条件推演；价格仅引用已有20日区间作为观察位，不承诺未来目标价。",
    "来源与覆盖必须区分模型先生直接讨论和公开数据 + 投资框架推断。",
    "全文 1200-2200 个汉字，使用 Markdown 标题和项目符号。"
  ] : [
    "默认极简回答：一句结论加最多 4 条要点，全文控制在 300 个汉字以内。",
    "引用至少 3 个具体数字和数据日期，并给出确认条件与失效条件。"
  ];
  return {
    role: "system",
    content: [
      "你是小可课堂的 M-Model 投资助手。核心能力不是猜涨跌，而是把行情、财务、本地视频、评论互动、复盘和用户记忆组合成有证据链的复盘。投资问答不检索书籍。",
      "股票问题必须按固定框架输出：",
      "1. 数据前提：列出行情来源、财务来源、观点来源，以及缺失项。",
      "2. 核心观点：一句话说明当前更像机会观察、风险复盘、等待确认还是资料不足。",
      "3. 数据支撑：优先引用机构终端字段；没有机构终端时引用腾讯行情、东方财富财务等回退字段，不能编造未提供的数据。",
      "4. 公告/事件：引用巨潮资讯公告标题级证据；没有公告或未打开 PDF 原文时要说明需要人工核验。",
      "5. 主要矛盾：结合模型先生历史视频、评论互动、复盘和用户记忆说明矛盾在哪里。",
      "6. 预期差/观察条件：给可复盘条件，不给确定性买卖指令。",
      "7. 风险边界：说明什么情况会推翻判断。",
      "8. 来源标注：行情和财务必须写实际来源；公告写巨潮资讯公告；观点写本地视频、评论互动或记忆编号；没有来源写缺少直接证据。",
      "严禁输出必涨、必跌、买入、卖出、满仓等确定性交易指令。",
      ...professionalRules,
      "禁止只说关注政策、业绩、估值等无法验证的套话。"
    ].join("\n")
  };
}

async function buildAgentContext(query, responseMode = getAgentResponseMode()) {
  const base = typeof agentLocalContext === "function" ? agentLocalContext(query) : collectAgentContext(query);
  const stockBriefs = await fetchAgentStockBriefs(query);
  window.currentAgentStockBriefs = stockBriefs;
  const peerBriefs = responseMode === "professional" ? await fetchAgentPeerBriefs(stockBriefs) : [];
  const changeSnapshot = responseMode === "professional" ? buildAgentChangeSnapshot(stockBriefs, peerBriefs) : null;
  window.currentAgentPeerBriefs = peerBriefs;
  window.currentAgentChangeSnapshot = changeSnapshot;
  const evidence = window.currentAgentEvidence || [];
  const researchQuality = responseMode === "professional" ? buildAgentResearchQuality(stockBriefs, evidence, peerBriefs, changeSnapshot) : null;
  const scenarioMatrix = responseMode === "professional" ? buildAgentScenarioMatrix(stockBriefs, changeSnapshot) : null;
  window.currentAgentResearchQuality = researchQuality;
  window.currentAgentScenarioMatrix = scenarioMatrix;
  const context = [
    agentInvestmentFrameworkContext(responseMode),
    agentStockContext(stockBriefs),
    agentPeerContext(stockBriefs, peerBriefs),
    agentChangeContext(changeSnapshot),
    agentResearchQualityContext(researchQuality, scenarioMatrix),
    agentSourceDirectiveContext(stockBriefs, evidence),
    agentBacktestContext(),
    agentStructuredStrategyContext(),
    ...base
  ].filter(Boolean);
  try {
    const response = await fetch("/api/agent-search-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, context })
    });
    const data = await response.json();
    if (data.success) return [...context, ...memoryResultToContext(data.result)];
  } catch {}
  return context;
}

async function sendAgent(forcedMode) {
  const input = document.getElementById("agentInput");
  const text = input.value.trim();
  if (!text) return;
  const chat = document.getElementById("agentChat");
  const route = routeAgentProvider(text, forcedMode);
  chat.insertAdjacentHTML("beforeend", `<div class="bubble user">${escapeHtml(text)}</div>`);
  input.value = "";
  const pendingId = "agent_pending_" + Date.now();
  chat.insertAdjacentHTML("beforeend", `<div class="bubble bot pending" id="${pendingId}"><span class="route">${route.label}</span>正在识别标的、同步行情/财务，并检索视频、评论、复盘和记忆...</div>`);
  chat.scrollTop = chat.scrollHeight;
  try {
    const responseMode = /详细|完整|研报|深度|后续趋势|目标价格/.test(text) ? "professional" : getAgentResponseMode();
    const context = await buildAgentContext(text, responseMode);
    const evidence = window.currentAgentEvidence || [];
    const briefs = window.currentAgentStockBriefs || [];
    const peerBriefs = window.currentAgentPeerBriefs || [];
    const changeSnapshot = window.currentAgentChangeSnapshot || null;
    const researchQuality = window.currentAgentResearchQuality || null;
    const scenarioMatrix = window.currentAgentScenarioMatrix || null;
    let answer = "";
    if (route.provider === "codex") {
      answer = codexSystemAnswer(text);
    } else if (route.provider === "team") {
      const investPrompt = "作为 WorkBuddy 投资主脑，请基于腾讯行情、东方财富财务、巨潮资讯公告、本地视频、评论互动、复盘和记忆证据，按有证据链的投研框架分析；不要检索书籍：\n" + text;
      const invest = await callAgentProvider("workbuddy", investPrompt, context, route.label);
      const contentPrompt = "作为内容主脑，请把下面的投资分析改写成通俗、有条理的小课堂表达，并保留来源编号和风险边界：\n" + invest;
      const content = await callAgentProvider("doubao", contentPrompt, context, route.label);
      answer = "WorkBuddy 投资判断\n" + invest + "\n\n内容主脑表达\n" + content + "\n\nCodex 系统建议\n" + codexSystemAnswer(text);
    } else {
      const prompt = responseMode === "professional" ? [
        "请生成一份可复核的专业投资分析报告，不要寒暄，不要复述用户问题。",
        "严格按以下标题输出：## 1. 核心观点；## 2. 基本面分析；## 3. 技术位置与多周期趋势；## 4. 观察与应对；## 5. 风险提示；## 6. 来源与覆盖。",
        "基本面只引用上下文真实提供的字段，并写明财报期；缺失的经营现金流、估值或利润字段直接写未取得，不得推算或编造。",
        "技术分析必须引用数据日期、MA5/20/60、5/20/60日表现、20日高低区间或位置、量能比中的实际字段。",
        "短期写 1-3 个月，中期写 3-12 个月，长期写 1 年以上；每段都采用条件推演。若谈价格，只能引用当前20日区间作为支撑/压力观察位，不能伪造未来目标价。",
        "观察与应对必须包含：当前判断、确认条件、失效条件、下一次复核项。",
        "同时引用上下文提供的研究质量等级，并按偏强/基准/偏弱三个条件情景输出；不得把资料完备度解释为上涨概率。",
        "来源与覆盖必须明确：哪些结论来自行情/财务/公告/历史日线，哪些来自本地视频、评论互动或复盘；投资问答不要引用书籍。没有模型先生直接讨论证据时，写明‘公开数据 + 模型先生投资框架推断’，不得冒充其本人观点。",
        "结尾只保留一条简短风险声明。全文 1200-2200 个汉字，数字优先，避免空话。",
        "",
        text
      ].join("\n") : [
        "请极简回答。第一行直接给结论，后面最多 4 条要点，全文不超过 300 个汉字。",
        "只保留：核心依据、观察条件、风险边界、来源。缺少的证据合并成一句话，不逐项罗列。",
        "必须引用技术快照中的具体数字和日期，并明确：当前趋势、确认条件、失效条件。没有技术数据就直说无法判断，不要用套话填充。",
        "不要复述问题，不写长免责声明，不重复同义观点，不给确定性买卖指令。",
        "",
        text
      ].join("\n");
      answer = await callAgentProvider(route.provider, prompt, context, route.label);
    }
    const finalAnswer = responseMode === "professional" ? xiaokeProfessionalAgentAnswer(answer, briefs, evidence) : xiaokeCompactAgentAnswer(answer);
    window.lastAgentEvidence = evidence;
    window.lastAgentTurn = { user: text, assistant: finalAnswer, route: route.label, at: new Date().toISOString(), evidence, stockBriefs: briefs, peerBriefs, changeSnapshot, researchQuality, scenarioMatrix };
    const savedReport = responseMode === "professional" ? saveAgentReportRecord(window.lastAgentTurn, true) : null;
    await autoPersistAgentMemory(text, finalAnswer, route.label);
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      const wantsDetail = responseMode === "professional" || /详细|完整|证据|数据|档案|展开/.test(text);
      node.innerHTML = `<span class="route">${route.label}</span>`
        + xiaokeCompactStockSummaryHtml(briefs)
        + xiaokeAgentPrecisionSnapshotHtml(briefs)
        + xiaokeAgentTrackingSnapshotHtml(briefs, peerBriefs, changeSnapshot)
        + xiaokeAgentResearchGateHtml(researchQuality, scenarioMatrix)
        + xiaokeAgentAnswerHtml(finalAnswer, responseMode)
        + xiaokeAgentReportActionsHtml(responseMode, savedReport?.id || "")
        + `<details class="agent-evidence-details" ${wantsDetail ? "open" : ""}><summary>查看数据与证据</summary><div>${agentEvidenceChainHtml(briefs, evidence)}${agentSourcesHtml(evidence)}</div></details>`;
    }
  } catch (error) {
    const node = document.getElementById(pendingId);
    if (node) {
      node.classList.remove("pending");
      node.innerHTML = `<span class="route">${route.label}</span>` + escapeHtml(error.message);
    }
  }
  chat.scrollTop = chat.scrollHeight;
}

function renderTopChips() {
  document.getElementById("topChips").innerHTML =
    `<button class="${state.view === "strategy" ? "chip active review-chip" : "chip review-chip"}" onclick="openStrategy()">鎴戠殑绛栫暐</button>` +
    `<button class="${state.view === "dailyReview" ? "chip active review-chip" : "chip review-chip"}" onclick="openDailyReview()">姣忔棩澶嶇洏</button>` +
    `<button class="${state.view === "modelFramework" ? "chip active review-chip" : "chip review-chip"}" onclick="openModelFramework()">妯″瀷妗嗘灦</button>` +
    `<button class="${state.view === "stockProfiles" ? "chip active review-chip" : "chip review-chip"}" onclick="openStockProfiles()">鑲＄エ妗ｆ</button>` +
    `<button class="${state.view === "pipelineCenter" ? "chip active review-chip" : "chip review-chip"}" onclick="openPipelineCenter()">鑳藉姏涓績</button>` +
    `<button class="${state.view === "videoGroupManager" ? "chip active review-chip" : "chip review-chip"}" onclick="openVideoGroupManager()">绠＄悊鍒嗙粍</button>` +
    allVideoTags().map(t => chipHtml(t)).join("");
}

function render() {
  renderTopChips();
  if (state.view === "dashboard") renderDashboard();
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
  if (state.view === "sectorDirectory") renderSectorDirectory();
  if (state.view === "dailyReview") renderDailyReview();
  if (state.view === "strategy") renderStrategy();
  if (state.view === "modelFramework") renderModelFramework();
  if (state.view === "stockProfiles") renderStockProfiles();
  if (state.view === "pipelineCenter") openPipelineCenter();
  if (state.view === "featureList") openFeatureList();
  if (state.view === "videoGroupManager") openVideoGroupManager();
}

const baseRenderTopChips = renderTopChips;
renderTopChips = function renderTopChipsWithSectorStrength() {
  baseRenderTopChips();
  const chips = document.getElementById("topChips");
  if (!chips || chips.querySelector("[data-sector-strength-chip]")) return;
  const sectorChip = document.createElement("button");
  sectorChip.dataset.sectorStrengthChip = "1";
  sectorChip.className = state.view === "sectorStrength" ? "chip active review-chip" : "chip review-chip";
  sectorChip.textContent = "鏉垮潡寮哄急";
  sectorChip.onclick = openSectorStrength;
  const daily = [...chips.querySelectorAll("button")].find(button => button.getAttribute("onclick") === "openDailyReview()");
  if (daily && daily.nextSibling) chips.insertBefore(sectorChip, daily.nextSibling);
  else if (daily) chips.appendChild(sectorChip);
  else chips.insertBefore(sectorChip, chips.firstChild);
};

const baseRender = render;
render = function renderWithSectorStrength() {
  if (state.view === "sectorStrength") {
    renderTopChips();
    renderSectorStrength();
    return;
  }
  baseRender();
};

const finalVideoSearchCache = new Map();

function finalVideoText(v) {
  if (!v) return "";
  if (finalVideoSearchCache.has(v.id)) return finalVideoSearchCache.get(v.id);
  const links = typeof videoLinksFor === "function" ? videoLinksFor(v.id) : { stocks: [], sectors: [], groups: [] };
  const structured = typeof readStructuredAnalyses === "function" ? readStructuredAnalyses()[v.id] : null;
  const saved = typeof readVideoAnalyses === "function" ? readVideoAnalyses()[v.id] : "";
  const transcript = typeof rawVideoTranscript === "function" ? rawVideoTranscript(v) : (v.transcript || "");
  const groups = typeof videoGroupsFor === "function" ? videoGroupsFor(v.id) : [];
  const text = [
    quickVideoTitle(v),
    String(transcript || "").slice(0, 5000),
    v.title,
    v.topic,
    v.focus,
    v.author,
    v.date,
    v.advice,
    v.risk,
    v.philosophy,
    saved,
    structured && structured.summary,
    structured && structured.focus,
    structured && structured.opinion,
    structured && structured.related,
    structured && structured.advice,
    structured && structured.risk,
    ...(links.stocks || []),
    ...(links.sectors || []),
    ...(links.groups || []),
    ...(groups || [])
  ].filter(Boolean).join(" ");
  finalVideoSearchCache.set(v.id, text);
  return text;
}

function finalTagLabel(tag) {
  return sectorDisplayName(tag) || tag.name || tag.originalName || "";
}

tagCount = function finalTagCount(tag) {
  const base = libraryVideos();
  if (!tag || tag.type === "all") return base.length || (tag && tag.count) || 0;
  if (tag.type === "source") {
    const source = tag.sourceAuthor || tag.originalName || tag.name;
    return base.filter(v => !source || v.author === source || isModelTeacherVideo(v)).length || tag.count || 0;
  }
  if (tag.type === "videoGroup") return base.filter(v => videoGroupsFor(v.id).includes(tag.name)).length;
  const names = [tag.name, tag.originalName, finalTagLabel(tag)].filter(Boolean);
  return base.filter(v => names.some(name => finalVideoText(v).includes(name))).length || tag.count || 0;
};

chipHtml = function finalChipHtml(tag) {
  const name = tag.name || finalTagLabel(tag);
  const label = finalTagLabel(tag) || name;
  const count = tagCount(tag);
  const cls = name === state.activeTag ? "chip active" : tag.type === "sector" && count > 15 ? "chip gold" : "chip";
  return `<button class="${cls}" onclick='filterByTag(${JSON.stringify(name)})'>${escapeHtml(label)}(${count})</button>`;
};

renderTopChips = function finalRenderTopChips() {
  const chips = document.getElementById("topChips");
  if (!chips) return;
  const systemChips = [
    ["我的策略", "strategy", "openStrategy()"],
    ["每日复盘", "dailyReview", "openDailyReview()"],
    ["模型框架", "modelFramework", "openModelFramework()"],
    ["股票档案", "stockProfiles", "openStockProfiles()"],
    ["能力中心", "pipelineCenter", "openPipelineCenter()"],
    ["管理分组", "videoGroupManager", "openVideoGroupManager()"],
    ["板块强弱", "sectorStrength", "openSectorStrength()"]
  ].map(([label, view, call]) => `<button class="${state.view === view ? "chip active review-chip" : "chip review-chip"}" onclick="${call}">${label}</button>`).join("");
  chips.innerHTML = systemChips + allVideoTags().map(tag => chipHtml(tag)).join("");
};

filteredVideos = function finalFilteredVideos() {
  const q = String(state.search || "").trim().toLowerCase();
  const tagItems = allVideoTags();
  const active = tagItems.find(t => t.name === state.activeTag || t.originalName === state.activeTag) || tagItems[0];
  const names = active ? [active.name, active.originalName, finalTagLabel(active)].filter(Boolean) : [];
  const videos = libraryVideos().filter(v => {
    const text = finalVideoText(v);
    const lower = text.toLowerCase();
    const byTag = !active || active.type === "all"
      || (active.type === "source" ? isModelTeacherVideo(v) : names.some(name => text.includes(name)));
    const bySearch = !q || lower.includes(q);
    return byTag && bySearch;
  });
  return videos.sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return quickVideoTitle(a).localeCompare(quickVideoTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
};

function clearVideoFilters() {
  state.search = "";
  state.activeTag = (allVideoTags()[0] || tags[0]).name;
  state.libraryLimit = 60;
  const searchInput = document.getElementById("searchInput");
  const libraryInput = document.getElementById("librarySearchInput");
  if (searchInput) searchInput.value = "";
  if (libraryInput) libraryInput.value = "";
  render();
}

librarySearchHtml = function finalLibrarySearchHtml() {
  return `
    <div class="library-search-row">
      <label class="library-search">🔍<input id="librarySearchInput" value="${escapeHtml(state.search || "")}" placeholder="搜索视频标题、日期、题材、转录" oninput="setSearch(this.value)"></label>
      <button class="small-btn" onclick="clearVideoFilters()">清空</button>
      <button class="small-btn" onclick="clearVideoFilters()">全部视频</button>
      <button class="small-btn" onclick="syncAllVideoTitles()">同步全部标题</button>
      <button class="small-btn" onclick="syncAllFrameTitles()">批量识别画面标题</button>
    </div>
  `;
};

videoCardHtml = function finalVideoCardHtml(v) {
  const title = quickVideoTitle(v);
  const media = v.thumbnail
    ? `<img src="${escapeHtml(v.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover">`
    : v.videoUrl ? `<video src="${escapeHtml(v.videoUrl)}" muted preload="metadata"></video>` : `<div class="poster">${v.isDocument ? "书" : "链"}</div>`;
  const badge = v.isMetadata ? "元数据" : v.local ? "本地" : v.isDocument ? "书籍" : "样例";
  const groups = typeof videoGroupsFor === "function" ? videoGroupsFor(v.id).slice(0, 2) : [];
  return `
    <article class="video-card" onclick='openDetail(${JSON.stringify(v.id)})'>
      <div class="thumb">${media}<span class="play">${v.isMetadata ? "↗" : "▶"}</span></div>
      <div class="vc-body">
        <h3>${escapeHtml(title)}</h3>
        <div class="metrics"><span>赞 <strong>${escapeHtml(v.likes || 0)}</strong></span><span>评 ${escapeHtml(v.comments || 0)}</span><span>转 ${escapeHtml(v.shares || 0)}</span></div>
        <div class="date" style="margin-top:7px">${escapeHtml(badge)} · ${escapeHtml(v.date || "-")}</div>
        ${groups.length ? `<div class="video-group-row">${groups.map(name => `<span class="video-group-badge">${escapeHtml(name)}</span>`).join("")}</div>` : ""}
      </div>
    </article>
  `;
};

renderLibrary = function finalRenderLibrary() {
  state.view = "library";
  renderTopChips();
  const videos = filteredVideos();
  const total = libraryVideos().length;
  const visible = videos.slice(0, state.libraryLimit || 60);
  document.getElementById("main").innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部视频")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="state.libraryLimit+=60;renderLibrary()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

function cleanDailyText(value) {
  const text = String(value || "");
  if (/<\/?(div|button|textarea|input|section|article)\b/i.test(text) || /oninput=|onclick=|daily-card|<\/button>|<\/div>/i.test(text)) {
    return "";
  }
  return text;
}

compactReviewLine = function finalCompactReviewLine(row = {}) {
  const parts = [
    cleanDailyText(row.action),
    cleanDailyText(row.target),
    row.position ? `仓位 ${cleanDailyText(row.position)}` : "",
    row.price ? `价格 ${cleanDailyText(row.price)}` : ""
  ].filter(Boolean);
  return parts.join(" / ");
};

function dailyTextarea(id, field, value, placeholder, disabled = false) {
  return `<textarea ${disabled ? "disabled" : ""} oninput='updateDailyReview(${JSON.stringify(id)},${JSON.stringify(field)},this.value)' placeholder="${escapeHtml(placeholder)}">${escapeHtml(cleanDailyText(value))}</textarea>`;
}

dailyReviewDayCardHtml = function finalDailyReviewDayCardHtml(group) {
  const merged = mergeDailyReviewItems(group.items);
  const isSingle = group.items.length === 1;
  const row = isSingle ? group.items[0] : merged;
  const id = row.id;
  const disabled = !isSingle;
  const detail = group.items.length > 1
    ? `<div class="daily-card-lines">${group.items.map(item => `<span>${escapeHtml(compactReviewLine(item) || cleanDailyText(item.target) || "未填标的")}</span>`).join("")}</div>`
    : "";
  const mergeButton = group.items.length > 1
    ? `<button class="small-btn" onclick='mergeDailyReviewDate(${JSON.stringify(group.date)})'>合并这天 ${group.items.length} 条</button>`
    : "";
  return `
    <article class="daily-card">
      <div class="daily-card-head">
        <input class="daily-date-input" value="${escapeHtml(row.date || group.date || "")}" ${disabled ? "disabled" : ""} oninput='updateDailyReview(${JSON.stringify(id)},"date",this.value)'>
        <div class="daily-card-actions">
          ${mergeButton}
          <button class="small-btn danger-btn" onclick='deleteDailyReviewDate(${JSON.stringify(group.date)})'>删除本日</button>
        </div>
      </div>
      ${detail}
      ${disabled ? `<div class="date" style="margin:8px 0;color:#ffd07a">这一天有 ${group.items.length} 条明细，先点“合并这天”再编辑日卡片。</div>` : ""}
      <div class="daily-card-grid">
        <label><b>标的 / 动作 / 仓位</b>${dailyTextarea(id, "target", row.target, "买入：生益科技 50% 半仓试错\\n卖出：首广 50% 达到目标\\n观察：中际旭创、新易盛", disabled)}</label>
        <label><b>理由 / 计划</b>${dailyTextarea(id, "reason", row.reason, "为什么做、触发条件、计划是什么", disabled)}</label>
        <label><b>结果 / 市场反馈</b>${dailyTextarea(id, "result", row.result, "涨跌、是否符合预期、盘中反馈", disabled)}</label>
        <label><b>复盘结论 / 明日动作</b>${dailyTextarea(id, "lesson", row.lesson, "下次怎么改、明天观察什么", disabled)}</label>
      </div>
    </article>
  `;
};

reviewRowHtml = function finalReviewRowHtml(row) {
  const actions = ["观察", "买入", "卖出", "加仓", "减仓", "空仓", "纠错", "复盘"];
  return `
    <tr>
      <td><input value="${escapeHtml(cleanDailyText(row.date))}" oninput='updateDailyReview(${JSON.stringify(row.id)},"date",this.value)'></td>
      <td><input value="${escapeHtml(cleanDailyText(row.target))}" placeholder="如：生益科技" oninput='updateDailyReview(${JSON.stringify(row.id)},"target",this.value)'></td>
      <td><select onchange='updateDailyReview(${JSON.stringify(row.id)},"action",this.value)'>${actions.map(action => `<option value="${action}" ${row.action === action ? "selected" : ""}>${action}</option>`).join("")}</select></td>
      <td><input value="${escapeHtml(cleanDailyText(row.position))}" placeholder="20%" oninput='updateDailyReview(${JSON.stringify(row.id)},"position",this.value)'></td>
      <td><input value="${escapeHtml(cleanDailyText(row.price))}" placeholder="价格" oninput='updateDailyReview(${JSON.stringify(row.id)},"price",this.value)'></td>
      <td>${dailyTextarea(row.id, "reason", row.reason, "操作理由")}</td>
      <td>${dailyTextarea(row.id, "result", row.result, "结果 / 市场反馈")}</td>
      <td>${dailyTextarea(row.id, "lesson", row.lesson, "下次怎么改")}</td>
      <td><button class="small-btn danger-btn" onclick='deleteDailyReviewRow(${JSON.stringify(row.id)})'>删</button></td>
    </tr>
  `;
};

renderDailyReview = function finalRenderDailyReview() {
  state.view = "dailyReview";
  renderTopChips();
  const rows = readDailyReviews();
  const groups = groupDailyReviewsByDate(rows);
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">每日复盘</div>
        <div class="date">一天一张复盘卡。当天买卖多只票、观察多只票，可以写在同一天卡片里；需要流水明细时再展开。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="exportDailyReviewCsv()">导出 CSV</button>
        <button class="small-btn" onclick="toggleDailyReviewDetail()">${state.dailyReviewDetail ? "收起明细" : "展开明细"}</button>
        <button class="small-btn" onclick="mergeAllDailyReviewsByDate()">合并同日</button>
        <button class="small-btn" onclick="addDailyReviewRow()">+明细行</button>
        <button class="open-btn" onclick="addDailyReviewDay()">+新增一天</button>
      </div>
    </section>
    <section class="panel review-panel">
      <div class="daily-card-list">
        ${groups.map(group => dailyReviewDayCardHtml(group)).join("") || `<div class="empty-review">暂无记录，点右上角“+新增一天”开始。</div>`}
      </div>
    </section>
    ${state.dailyReviewDetail ? `
    <section class="panel review-panel" style="margin-top:12px">
      <div class="metadata-head"><div><div class="panel-title">流水明细</div><div class="date">保留原始逐条记录，方便 CSV 和精细追踪。</div></div></div>
      <div class="review-table-wrap">
        <table class="review-table">
          <thead><tr><th>日期</th><th>标的</th><th>动作</th><th>仓位</th><th>价格</th><th>理由</th><th>结果</th><th>复盘结论</th><th></th></tr></thead>
          <tbody>${rows.map(reviewRowHtml).join("") || `<tr><td colspan="9" class="empty-review">暂无记录。</td></tr>`}</tbody>
        </table>
      </div>
    </section>` : ""}
  `;
};

function finalClipText(value, length = 120) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > length ? text.slice(0, length) + "..." : text;
}

function finalTimeout(promise, ms = 3500, fallback = null) {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => resolve(fallback), ms))
  ]).catch(() => fallback);
}

async function finalSafeFetchStockProfiles() {
  const data = await finalTimeout(
    fetch("/api/stock-profiles").then(response => response.json()),
    3500,
    null
  );
  if (!data || !data.success) return [];
  return Array.isArray(data.profiles && data.profiles.items) ? data.profiles.items : [];
}

function finalProfileKey(item = {}) {
  return String(item.key || item.quoteKey || item.name || "").trim();
}

function finalBuildStockProfileRows(profiles = []) {
  let watchItems = [];
  try {
    watchItems = typeof flattenWatchlist === "function" ? flattenWatchlist() : [];
  } catch {
    watchItems = [];
  }
  const profileMap = new Map();
  (profiles || []).forEach(profile => {
    const key = finalProfileKey(profile);
    if (key) profileMap.set(key.toLowerCase(), profile);
  });
  const seen = new Set();
  const rows = [];
  watchItems.forEach(item => {
    if (!item || !item.name) return;
    const rawKey = item.quoteKey || localQuoteAliasForName(item.name) || item.name;
    const key = finalProfileKey({ key: rawKey });
    const lower = key.toLowerCase();
    if (seen.has(lower)) return;
    seen.add(lower);
    const profile = profileMap.get(lower) || profileMap.get(String(item.name).toLowerCase()) || {};
    const quote = state.indexQuotes && (state.indexQuotes[key] || state.indexQuotes[item.name] || state.indexQuotes[String(key).toLowerCase()]);
    rows.push({
      item,
      key,
      profile,
      brief: quote ? { key, name: quote.name || item.name, price: quote.price, pct: quote.pct } : {},
      source: item.groupChain || item.group || item.sector || ""
    });
  });
  (profiles || []).forEach(profile => {
    const key = finalProfileKey(profile);
    if (!key || seen.has(key.toLowerCase())) return;
    seen.add(key.toLowerCase());
    rows.push({
      item: {
        name: profile.name || key,
        quoteKey: key,
        sector: profile.sector || "自建档案",
        desc: profile.note || "",
        groupChain: profile.sector || "自建档案"
      },
      key,
      profile,
      brief: {},
      source: profile.sector || "自建档案"
    });
  });
  return rows;
}

function finalMetricCell(label, value, suffix = "") {
  return `
    <div class="pipeline-cell">
      <b>${escapeHtml(value == null || value === "" ? "-" : value)}${escapeHtml(suffix)}</b>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function finalStockProfileCard(row = {}) {
  const item = row.item || {};
  const profile = row.profile || {};
  const brief = row.brief || {};
  const name = profile.name || brief.name || item.name || row.key || "未命名";
  const key = profile.key || row.key || item.quoteKey || "";
  const quote = brief.price != null ? brief : (state.indexQuotes && (state.indexQuotes[key] || state.indexQuotes[name])) || {};
  const pct = Number(quote.pct);
  const pctText = Number.isFinite(pct) ? `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%` : "";
  const quoteClass = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
  const note = finalClipText(profile.note || item.desc || "暂无备注，可点“补/改财务档案”完善。", 150);
  const related = typeof relatedAgentVideos === "function" ? relatedAgentVideos(name, 3) : [];
  return `
    <article class="decision-card">
      <div class="metadata-head">
        <div>
          <h3 style="margin:0 0 5px">${escapeHtml(name)}</h3>
          <div class="date">${escapeHtml(key || "未匹配代码")} · ${escapeHtml(profile.sector || item.sector || item.group || "未分类")} · 相关素材 ${related.length} 条</div>
        </div>
        <div class="quote-line ${quoteClass}">
          <b>${escapeHtml(quote.price == null ? "-" : quote.price)}</b>
          <span>${escapeHtml(pctText)}</span>
        </div>
      </div>
      <div class="stock-metric-grid">
        ${stockMetricCell("PE", profile.pe)}
        ${stockMetricCell("PB", profile.pb)}
        ${stockMetricCell("市值", profile.marketCap)}
        ${stockMetricCell("ROE", profile.roe, profile.roe !== "" && profile.roe !== undefined ? "%" : "")}
      </div>
      <p style="margin:8px 0 0;color:#cfd6e4;line-height:1.65">${escapeHtml(note)}</p>
      <div class="date" style="margin-top:8px">数据来源：${escapeHtml(profile.dataSource || (quote.price != null ? "本地行情缓存" : "本地关注/档案"))}</div>
      <div class="stock-card-actions">
        <button class="small-btn" onclick='openStockProfileEditor(${JSON.stringify({ name, key, sector: profile.sector || item.sector || "" })})'>补/改财务档案</button>
        <button class="small-btn" onclick='showStockAnnouncements(${JSON.stringify(key || name)})'>看公告</button>
        <button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("分析" + name + "，结合股票档案、本地素材和风险边界。")}, "investment", true)'>问 Agent</button>
        <button class="small-btn" onclick='filterByStock(${JSON.stringify(name)})'>看素材</button>
      </div>
    </article>
  `;
}

openStockProfiles = async function finalOpenStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  await renderStockProfiles();
};

renderStockProfiles = async function finalRenderStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">把关注标的的行情、估值、财务备注和相关素材集中管理。页面现在有兜底渲染，接口失败也不会空屏。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillStockProfilesFromQuotes()">自动补行情估值</button>
        <button class="small-btn" onclick="refreshStockRiskRadar()">刷新公告雷达</button>
        <button class="small-btn" onclick="probeInstitutionalTerminals(false)">机构终端测试</button>
        <button class="small-btn" onclick="showDataSourceHealth()">数据源状态</button>
        <button class="small-btn" onclick="renderStockProfiles()">刷新</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
  `;
  main.innerHTML = `${header}<section class="panel" style="margin-top:12px"><div class="date">正在同步股票档案...</div></section>`;
  let profiles = [];
  let loadError = "";
  try {
    profiles = await finalSafeFetchStockProfiles();
  } catch (error) {
    loadError = error && error.message ? error.message : "股票档案接口异常";
  }
  let rows = [];
  try {
    rows = finalBuildStockProfileRows(profiles);
  } catch (error) {
    loadError = loadError || (error && error.message ? error.message : "本地关注列表解析异常");
    rows = (profiles || []).map(profile => ({
      item: { name: profile.name || profile.key, quoteKey: profile.key, sector: profile.sector || "自建档案" },
      key: profile.key,
      profile,
      brief: {}
    }));
  }
  const filled = rows.filter(row => row.profile && finalProfileKey(row.profile)).length;
  const quoted = rows.filter(row => row.brief && row.brief.price != null).length;
  const visibleRows = rows.slice(0, 120);
  main.innerHTML = `
    ${header}
    ${loadError ? `<section class="panel" style="margin-top:12px;border-color:rgba(239,60,99,.28);background:rgba(239,60,99,.08)"><div class="panel-title">加载有异常，但页面已兜底显示</div><div class="date">${escapeHtml(loadError)}</div></section>` : ""}
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search" style="width:min(520px,52vw)"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码，例如：长电科技 / 600584 / 寒武纪" onkeydown="if(event.key==='Enter')searchAndSaveStockProfile()"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
      <div class="date" style="margin-top:8px">当前先显示本地关注和已保存档案；需要实时财务时再点“自动补行情估值”。</div>
    </section>
    <section class="pipeline-grid" style="grid-template-columns:repeat(6,minmax(0,1fr));margin-top:12px">
      ${finalMetricCell("档案/关注标的", rows.length)}
      ${finalMetricCell("已保存档案", filled)}
      ${finalMetricCell("有行情缓存", quoted)}
      ${finalMetricCell("本次展示", visibleRows.length)}
      ${finalMetricCell("量化工作台", "独立")}
      ${finalMetricCell("页面状态", "可用")}
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${visibleRows.map(finalStockProfileCard).join("") || `<div class="panel"><div class="panel-title">暂无股票档案</div><p style="color:#aeb6c6;line-height:1.7">可以先点“新增档案”，或回到看板添加关注标的。</p></div>`}
    </section>
    ${rows.length > visibleRows.length ? `<div class="analysis-actions"><button class="small-btn" onclick="showToast('为避免卡顿，本页先展示前 120 个标的。请用搜索或分组缩小范围。')">已省略 ${rows.length - visibleRows.length} 个</button></div>` : ""}
  `;
};

function finalFrameworkRowsSafe() {
  try {
    if (typeof frameworkRows === "function") return frameworkRows();
  } catch {}
  return [
    { name: "质变", keys: ["质变", "拐点", "主要矛盾"], matches: [] },
    { name: "趋势", keys: ["趋势", "主线", "预期差"], matches: [] },
    { name: "买点", keys: ["分歧", "承接", "低吸"], matches: [] },
    { name: "等待", keys: ["等待", "节奏", "耐心"], matches: [] },
    { name: "风控", keys: ["风险", "仓位", "边界"], matches: [] }
  ];
}

function finalVideoTitleSafe(v) {
  try {
    return getVideoDetailTitle(v);
  } catch {
    return quickVideoTitle(v);
  }
}

function finalRenderModelFramework() {
  state.view = "modelFramework";
  renderTopChips();
  const rows = finalFrameworkRowsSafe();
  let note = "";
  try {
    note = localStorage.getItem(MODEL_FRAMEWORK_NOTE_KEY) || "";
  } catch {}
  const prompt = typeof readPromptTemplate === "function" ? readPromptTemplate() : "";
  document.getElementById("main").innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">把视频、书籍和复盘里反复出现的原则沉淀成长期框架。先有框架，再回市场验证。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="usePromptTemplate()">套用提示词</button>
        <button class="small-btn" onclick="showAgentMemory()">查看记忆</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="decision-grid" style="margin-top:12px">
      ${rows.map(row => `
        <article class="panel">
          <div class="panel-title">${escapeHtml(row.name)} <span class="date">(${(row.matches || []).length})</span></div>
          <div class="video-group-row">${(row.keys || []).map(key => `<span class="video-group-badge">${escapeHtml(key)}</span>`).join("")}</div>
          <p style="color:#aeb6c6;line-height:1.7">${(row.matches || []).slice(0, 5).map(v => escapeHtml(finalVideoTitleSafe(v))).join("<br>") || "等待更多结构化分析沉淀。"}</p>
          <button class="small-btn" onclick='askFrameworkTopic(${JSON.stringify(row.name)})'>让 Agent 总结这条框架</button>
        </article>
      `).join("")}
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="strategy-textarea" style="min-height:150px" oninput="saveModelFrameworkNote(this.value)" placeholder="例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(note)}</textarea>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="panel-title">提示词模板库</div>
      <textarea class="strategy-textarea" style="min-height:210px" oninput="savePromptTemplate(this.value)">${escapeHtml(prompt)}</textarea>
      <button class="small-btn" style="margin-top:10px" onclick="usePromptTemplate()">发送到 Agent 输入框</button>
    </section>
  `;
}

filterByTag = function finalFilterByTag(tag) {
  state.activeTag = tag || (allVideoTags()[0] || tags[0]).name;
  state.search = "";
  state.libraryLimit = 60;
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  state.view = "library";
  render();
};

openVideoLibrary = function finalOpenVideoLibrary() {
  state.activeTag = (allVideoTags()[0] || tags[0]).name;
  state.search = "";
  state.libraryLimit = 60;
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  renderLibrary();
};

openModelFramework = function finalOpenModelFramework() {
  state.view = "modelFramework";
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  finalRenderModelFramework();
};

render = function finalRender() {
  renderTopChips();
  try {
    if (state.view === "dashboard") return renderDashboard();
    if (state.view === "library") return renderLibrary();
    if (state.view === "detail") return renderDetail();
    if (state.view === "sectorDirectory") return renderSectorDirectory();
    if (state.view === "dailyReview") return renderDailyReview();
    if (state.view === "sectorStrength") return renderSectorStrength();
    if (state.view === "strategy") return renderStrategy();
    if (state.view === "modelFramework") return openModelFramework();
    if (state.view === "stockProfiles") return renderStockProfiles();
    if (state.view === "pipelineCenter") return openPipelineCenter();
    if (state.view === "featureList") return openFeatureList();
    if (state.view === "videoGroupManager") return openVideoGroupManager();
    state.view = "dashboard";
    return renderDashboard();
  } catch (error) {
    const main = document.getElementById("main");
    if (main) {
      main.innerHTML = `
        <section class="panel" style="border-color:rgba(239,60,99,.3);background:rgba(239,60,99,.08)">
          <div class="panel-title">页面渲染失败</div>
          <p style="color:#ffb4c1;line-height:1.7">${escapeHtml(error && error.message ? error.message : "未知错误")}</p>
          <button class="small-btn" onclick="renderDashboard()">返回看板</button>
        </section>
      `;
    }
  }
};

function exposeXiaokeGlobals() {
  window.state = state;
  window.tags = tags;
  [
    "init", "render", "renderDashboard", "renderTopChips", "goBack", "refreshApp",
    "toggleAutoRefresh", "showToast", "saveRightNote", "saveSidebarQuote",
    "setSearch", "setSort", "filterByTag", "filterByStock", "clearVideoFilters",
    "openVideoLibrary", "openLibrary", "renderLibrary", "loadMoreLibraryVideos",
    "openDetail", "showDetailTab", "openImport", "closeImport", "importVideo",
    "syncAllVideoTitles", "syncAllFrameTitles", "generateVideoAIAnalysis",
    "batchTranscribeVideos", "batchAnalyzeVideos", "learnDocument",
    "rememberCurrentDocumentNote", "confirmVideoLinks", "distillPrincipleFromVideo",
    "openStrategy", "openDailyReview", "renderDailyReview", "addDailyReviewRow",
    "addDailyReviewDay", "updateDailyReview", "deleteDailyReviewRow",
    "deleteDailyReviewDate", "mergeDailyReviewDate", "mergeAllDailyReviewsByDate",
    "toggleDailyReviewDetail", "exportDailyReviewCsv",
    "openModelFramework", "addModelPrinciple", "updateModelPrinciple",
    "saveModelFrameworkNote", "savePromptTemplate", "usePromptTemplate",
    "askFrameworkTopic", "exportKnowledgeBackup", "triggerKnowledgeRestore",
    "restoreKnowledgeBackupFile", "exportKnowledgeMarkdown",
    "openStockProfiles", "renderStockProfiles", "openStockProfileEditor",
    "autoFillStockProfilesFromQuotes", "refreshStockRiskRadar",
    "showStockAnnouncements", "rememberLatestAnnouncement",
    "searchAndSaveStockProfile", "showDataSourceHealth",
    "probeInstitutionalTerminals", "openQuantWorkbenchWindow",
    "syncQmtBridgeCodes", "installQmtBridgeStrategy", "refreshQmtBridgeStatus",
    "openPipelineCenter", "openVideoGroupManager", "openSectorStrength",
    "renderSectorStrength", "parseSectorMapImport", "importSectorMapPreview",
    "updateWatchGroupField", "updateSectorStrengthNote",
    "openSectorDirectory", "goDirectoryBack", "renameGroupFolder",
    "repairWatchlistQuotesAndScores", "setBranchView", "setBranchZoom",
    "fitBranchZoom", "createChildGroup", "cycleGroupColor",
    "deleteGroupFolder", "openStockModal", "closeStockModal", "saveStockTarget",
    "editStockTarget", "deleteStockTarget", "toggleWatchGroup",
    "setWatchGroupPreviewItems", "toggleAgent", "openAgentConfig",
    "closeAgentConfig", "setAgentProvider", "sendAgent", "askAgent",
    "openAgentWithQuestion", "showAgentEvidence", "showAgentDiagnostics",
    "showAgentLogs", "clearAgentLogs", "rememberCurrentAgentTurn",
    "rememberAgentFocusFromInput", "showAgentMemory", "clearAgentMemory",
    "changeAgentConfigProvider", "applyAgentProviderTemplate",
    "testAgentParse", "saveAgentConfig", "updateAgentConfigCheck",
    "saveAgentRouteRulesFromModal", "applyAgentResponsePath",
    "openStockCompareForTheme", "addStockComparePoolItem",
    "removeStockComparePoolItem", "fillStockCompareInputFromPool",
    "clearStockComparePool", "askAgentWithStockCompare",
    "appendBacktestToStockCompare", "rememberStockCompareResult",
    "saveStockComparePoolFromResult"
  ].forEach(name => {
    try {
      const value = eval(name);
      if (typeof value !== "undefined") window[name] = value;
    } catch {}
  });
}

renderTopChips = function restoredRenderTopChips() {
  const chips = document.getElementById("topChips");
  if (!chips) return;
  const systemChips = [
    ["我的策略", "strategy"],
    ["每日复盘", "dailyReview"],
    ["板块强弱", "sectorStrength"],
    ["模型框架", "modelFramework"],
    ["股票档案", "stockProfiles"],
    ["能力中心", "pipelineCenter"],
    ["管理分组", "videoGroupManager"]
  ].map(([label, view]) => `<a class="${state.view === view ? "chip active review-chip" : "chip review-chip"}" style="display:inline-flex;align-items:center;text-decoration:none" href="?view=${view}">${label}</a>`).join("");
  const tagChips = allVideoTags().map(tag => {
    const name = tag.name || tag.originalName || "";
    const label = finalTagLabel(tag);
    const count = tagCount(tag);
    const cls = name === state.activeTag ? "chip active" : tag.type === "sector" && count > 15 ? "chip gold" : "chip";
    return `<a class="${cls}" style="display:inline-flex;align-items:center;text-decoration:none" href="?tag=${encodeURIComponent(name)}">${escapeHtml(label)}(${count})</a>`;
  }).join("");
  chips.innerHTML = systemChips + tagChips;
};

function restoredFallbackLeftPane() {
  const pane = document.getElementById("leftPane");
  if (!pane) return;
  let groups = [];
  try {
    groups = readWatchGroups();
  } catch {
    groups = [];
  }
  const total = groups.reduce((sum, group) => sum + countGroupItems(group), 0);
  pane.innerHTML = `
    <div class="left-head">
      <div><div class="left-title">关注标的</div><div class="left-count">${total} 个标的</div></div>
      <button class="add-stock" onclick="openStockModal()">+添加</button>
    </div>
    ${groups.map((group, groupIndex) => `
      <section class="watch-group">
        <div class="group-title-row">
          <button class="group-title" onclick="openSectorDirectory([${groupIndex}])">
            <span>${escapeHtml(group.name || "未命名分组")}</span><em>${countGroupItems(group)}</em>
          </button>
          <button class="group-toggle" onclick="event.stopPropagation();toggleWatchGroup([${groupIndex}])">${isWatchGroupCollapsed(group, [groupIndex]) ? "+" : "-"}</button>
        </div>
        ${isWatchGroupCollapsed(group, [groupIndex]) ? watchGroupPreviewHtml(group, [groupIndex]) : ""}
        <div class="group-items ${isWatchGroupCollapsed(group, [groupIndex]) ? "collapsed" : ""}">
          ${(isWatchGroupCollapsed(group, [groupIndex]) ? [] : (group.items || []).slice(0, 30)).map((item, i) => `
            <div class="watch-item" onclick="filterByStock(${JSON.stringify(item.name || "")})">
              <div class="wi-head">
                <span>${escapeHtml(item.name || "未命名")}</span><span class="dot ${item.status === "warn" ? "warn" : ""}"></span>
                <span class="stock-actions" onclick="event.stopPropagation()">
                  <button onclick="editStockTarget([${groupIndex}], ${i}); event.stopPropagation()">改</button>
                  <button onclick="deleteStockTarget([${groupIndex}], ${i}); event.stopPropagation()">删</button>
                </span>
              </div>
              ${quoteHtml(item)}
              <div class="wi-sub"><span>${Number(item.count || 0)}次</span><span>${escapeHtml(item.sector || group.name || "")}</span><span>相关 ${relatedVideoCount(item.name || "")} 条</span></div>
              <div class="wi-desc">${escapeHtml(relatedVideoDigest(item.name || "") || item.desc || "")}</div>
            </div>
          `).join("")}
        </div>
      </section>
    `).join("") || `<section class="watch-group"><div class="watch-group-preview">暂无关注分组，点“+添加”开始。</div></section>`}
    <button class="compare" onclick="openStockProfiles()">对比分析 / 股票档案</button>
  `;
}

function restoredRenderLeftPane() {
  const pane = document.getElementById("leftPane");
  if (!pane) return;
  try {
    renderWatchlistPane();
    if (!pane.innerText.trim()) restoredFallbackLeftPane();
  } catch {
    restoredFallbackLeftPane();
  }
}

function restoredRenderRightPane() {
  const pane = document.getElementById("rightPane");
  if (!pane) return;
  let themeTags = [];
  let industryTags = [];
  try {
    themeTags = allVideoTags().filter(t => t.type !== "all" && t.type !== "source").slice(0, 12);
  } catch {}
  try {
    industryTags = sectorRows().slice(0, 10);
  } catch {}
  pane.innerHTML = `
    <div class="profile"><div class="avatar"><img src="assets/xiaoke-icon-64.png" alt=""></div><div><b>小可课堂</b><span>投资课堂 · 认知复盘</span></div></div>
    <div class="side-section">
      <button class="open-btn" onclick="openFeatureList()">查看功能清单</button>
    </div>
    <textarea class="side-note quote-note" oninput="saveSidebarQuote(this.value)">${escapeHtml(typeof sidebarQuoteText === "function" ? sidebarQuoteText() : "静等花开，自律人生")}</textarea>
    <div class="side-section">
      <div class="side-title">主题笔记</div>
      <div class="tag-cloud">${themeTags.map(t => `<button class="tag" onclick='filterByTag(${JSON.stringify(t.name)})'>${escapeHtml(finalTagLabel(t))}</button>`).join("")}</div>
    </div>
    <div class="side-section">
      <div class="side-title">行业分布</div>
      <div class="tag-cloud">${industryTags.map(row => `<button class="tag mid" onclick='filterByTag(${JSON.stringify(row.tag.name)})'>${escapeHtml(row.name)}(${row.count})</button>`).join("")}</div>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">每日任务</div>
      <textarea class="side-note big" id="dailyTaskBox" oninput="saveRightNote('task', this.value)" placeholder="直接写今天要做的事：复盘视频、补行情代码、整理长鑫产业链...">${escapeHtml(localStorage.getItem(DAILY_TASK_KEY) || "")}</textarea>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">今日关注</div>
      <textarea class="side-note" id="dailyFocusBox" oninput="saveRightNote('focus', this.value)" placeholder="例如：长鑫存储、光模块、科创芯片、大盘风险...">${escapeHtml(localStorage.getItem(DAILY_FOCUS_KEY) || "")}</textarea>
    </div>
  `;
}

function restoredRenderShell() {
  renderTopChips();
  restoredRenderLeftPane();
  restoredRenderRightPane();
  if (typeof renderAgent === "function") renderAgent();
}

renderShell = restoredRenderShell;

render = function restoredFullRender() {
  restoredRenderShell();
  const main = document.getElementById("main");
  try {
    if (state.view === "dashboard") return renderDashboard();
    if (state.view === "library") return renderLibrary();
    if (state.view === "detail") return renderDetail();
    if (state.view === "sectorDirectory") return renderSectorDirectory();
    if (state.view === "dailyReview") return renderDailyReview();
    if (state.view === "sectorStrength") return renderSectorStrength();
    if (state.view === "strategy") return renderStrategy();
    if (state.view === "modelFramework") return openModelFramework();
    if (state.view === "stockProfiles") return renderStockProfiles();
    if (state.view === "pipelineCenter") return openPipelineCenter();
    if (state.view === "featureList") return openFeatureList();
    if (state.view === "videoGroupManager") return openVideoGroupManager();
    state.view = "dashboard";
    return renderDashboard();
  } catch (error) {
    if (main) {
      main.innerHTML = `
        <section class="panel" style="border-color:rgba(239,60,99,.3);background:rgba(239,60,99,.08)">
          <div class="panel-title">页面渲染失败</div>
          <p style="color:#ffb4c1;line-height:1.7">${escapeHtml(error && error.message ? error.message : "未知错误")}</p>
          <button class="small-btn" onclick="renderDashboard()">返回看板</button>
        </section>
      `;
    }
  }
};

function restoredNavigate(view, renderer) {
  state.view = view;
  restoredRenderShell();
  return renderer();
}

init = async function restoredInit() {
  state.videos = [...sampleVideos, ...readUserVideos()];
  try {
    const params = new URLSearchParams(location.search || "");
    const view = params.get("view");
    const tag = params.get("tag");
    const id = params.get("id");
    if (view) state.view = view;
    if (id) state.currentVideoId = id;
    if (tag) {
      state.activeTag = tag;
      state.search = "";
      state.view = "library";
    }
  } catch {}
  restoredRenderShell();
  render();
  tickClock();
  setInterval(tickClock, 1000 * 30);
  setupAutoRefresh();
  Promise.allSettled([
    scanMetadataVideos(),
    scanLocalVideos(),
    scanLocalDocuments(),
    refreshMarketIndexes()
  ]).then(() => {
    restoredRenderShell();
    render();
  });
};

renderDashboard = ((original) => function restoredRenderDashboard() {
  restoredRenderShell();
  return original();
})(renderDashboard);

renderLibrary = ((original) => function restoredRenderLibrary() {
  restoredRenderShell();
  return original();
})(renderLibrary);

openStrategy = function restoredOpenStrategy() {
  return restoredNavigate("strategy", renderStrategy);
};

openDailyReview = function restoredOpenDailyReview() {
  return restoredNavigate("dailyReview", renderDailyReview);
};

openSectorStrength = function restoredOpenSectorStrength() {
  return restoredNavigate("sectorStrength", renderSectorStrength);
};

openModelFramework = function restoredOpenModelFramework() {
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  return restoredNavigate("modelFramework", finalRenderModelFramework);
};

openStockProfiles = async function restoredOpenStockProfiles() {
  state.view = "stockProfiles";
  restoredRenderShell();
  await renderStockProfiles();
};

openPipelineCenter = ((original) => function restoredOpenPipelineCenter() {
  state.view = "pipelineCenter";
  restoredRenderShell();
  return original();
})(openPipelineCenter);

openVideoGroupManager = ((original) => function restoredOpenVideoGroupManager() {
  state.view = "videoGroupManager";
  restoredRenderShell();
  return original();
})(openVideoGroupManager);

function restoredRouteTopChip(label) {
  const text = String(label || "").replace(/\(\d+\)\s*$/, "").trim();
  if (text === "我的策略") return openStrategy();
  if (text === "每日复盘") return openDailyReview();
  if (text === "板块强弱") return openSectorStrength();
  if (text === "模型框架") return openModelFramework();
  if (text === "股票档案") return openStockProfiles();
  if (text === "能力中心") return openPipelineCenter();
  if (text === "管理分组") return openVideoGroupManager();
  return filterByTag(text || "全部");
}

function restoredRouteHash() {
  const hash = String(location.hash || "").replace(/^#/, "");
  if (!hash) return false;
  if (hash.startsWith("view=")) {
    const view = decodeURIComponent(hash.slice(5));
    if (view === "strategy") openStrategy();
    else if (view === "dailyReview") openDailyReview();
    else if (view === "sectorStrength") openSectorStrength();
    else if (view === "modelFramework") openModelFramework();
    else if (view === "stockProfiles") openStockProfiles();
    else if (view === "pipelineCenter") openPipelineCenter();
    else if (view === "videoGroupManager") openVideoGroupManager();
    else render();
    return true;
  }
  if (hash.startsWith("tag=")) {
    filterByTag(decodeURIComponent(hash.slice(4)));
    return true;
  }
  return false;
}

function xiaokeFinalStylePatch() {
  if (document.getElementById("xiaoke-final-style-patch")) return;
  const style = document.createElement("style");
  style.id = "xiaoke-final-style-patch";
  style.textContent = `
    .watch-group-preview{display:flex;flex-direction:column;gap:7px;margin-top:6px}
    .watch-preview-row{display:block;width:100%;text-align:left;background:transparent;border:0;border-radius:6px;padding:0;color:inherit;cursor:pointer}
    .watch-preview-row:hover b{color:#fff}
    .watch-preview-row b{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:#e9f2ff}
    .watch-preview-row .quote-line{display:flex;gap:7px;align-items:center;font-weight:800;margin-top:3px}
    .watch-preview-row .quote-line b{font-size:15px}
    .watch-preview-row .watch-meta{font-size:11px;color:#8ea0ba;line-height:1.55;margin-top:2px}
    .watch-preview-row .watch-desc{font-size:11px;color:#95a5bd;line-height:1.55;margin:2px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .detail-text-grid{grid-template-columns:minmax(280px,0.9fr) minmax(360px,1.5fr)}
    .comment-card{background:#202129;border:1px solid #303342;border-radius:8px;padding:11px 13px;margin:9px 0}
    .comment-card p{margin:7px 0 0;line-height:1.65;color:#f4f7ff}
    .comment-meta{display:flex;gap:10px;align-items:center;color:#9aa8be;font-size:12px}
    .author-reply{margin-top:8px;border-left:3px solid #ff386b;background:#3a1d29;color:#ffdbe5;border-radius:6px;padding:8px 10px}
    .agent-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-bottom:1px solid #2b2e39}
    .agent-head-title{display:flex;align-items:center;gap:8px;font-weight:900}
    .agent-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .agent-roles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:10px 14px}
    .role-card{border:1px solid #195c51;background:#111d24;border-radius:8px;padding:9px 10px}
    .role-card strong{display:block;color:#f4f7ff;font-size:13px;margin-bottom:3px}
    .role-card span{font-size:11px;color:#9eadc4}
    .agent-tabs{display:flex;gap:8px;overflow-x:auto;padding:8px 14px;border-bottom:1px solid #2b2e39}
    .agent-tabs button{white-space:nowrap;border:0;border-radius:999px;background:#2b2d37;color:#e9f2ff;padding:8px 13px;cursor:pointer}
    .agent-tabs button.primary{background:#0f604d;color:#fff}
    .stock-profile-grid{grid-template-columns:repeat(auto-fill,minmax(270px,1fr))}
  `;
  document.head.appendChild(style);
}

xiaokeFinalStylePatch();

function xiaokeQuoteParts(item = {}) {
  const quote = restoredQuoteForItem(item) || item || {};
  const price = quote.price == null || quote.price === "" ? "" : String(quote.price);
  const change = quote.change == null || quote.change === "" ? "" : String(quote.change);
  const pct = Number(quote.pct);
  const pctText = Number.isFinite(pct) ? `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%` : "";
  const cls = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
  return { price, change, pctText, cls };
}

watchGroupPreviewHtml = function finalStockLikeWatchGroupPreview(group, path = []) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const stocks = restoredPreviewStocks(group, 3, path);
  return `<div class="watch-group-preview">
    <div>${childCount} 分支 · ${total} 标的</div>
    ${stocks.map(item => {
      const quote = xiaokeQuoteParts(item);
      return `<button class="watch-preview-row" onclick='event.stopPropagation();filterByStock(${JSON.stringify(item.name || "")})'>
        <b>${escapeHtml(item.name || "未命名")}<i class="dot ${item.status === "warn" ? "warn" : ""}"></i></b>
        ${quote.price || quote.pctText ? `<div class="quote-line ${quote.cls}"><b>${escapeHtml(quote.price || "-")}</b><span>${escapeHtml([quote.change, quote.pctText].filter(Boolean).join("  "))}</span></div>` : ""}
        <div class="watch-meta">${escapeHtml([item.hitCount ? `${item.hitCount}次` : "0次", item.sector || item.group || group.name || "", item.relatedCount != null ? `相关 ${item.relatedCount} 条` : ""].filter(Boolean).join("  "))}</div>
        <p class="watch-desc">${escapeHtml(item.desc || item.note || "新增关注标的，等待后续补充观察逻辑。")}</p>
      </button>`;
    }).join("")}
    <button class="small-btn" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button>
  </div>`;
};

function finalCleanSearchQuery() {
  const q = String(state.search || "").trim();
  return /^(xiaoke|小可|小可课堂)$/i.test(q) ? "" : q.toLowerCase();
}

filteredVideos = function finalStableFilteredVideos() {
  const q = finalCleanSearchQuery();
  const active = allVideoTags().find(tag => tag.name === state.activeTag || tag.originalName === state.activeTag) || allVideoTags()[0] || { type: "all", name: "全部" };
  const names = [active.name, active.originalName, finalTagLabel(active)].filter(Boolean);
  return restoredAllLibraryVideos().filter(video => {
    const text = typeof finalVideoText === "function"
      ? finalVideoText(video)
      : [video.title, video.topic, video.focus, video.transcript, video.author, ...videoGroupsFor(video.id)].join(" ");
    const isAll = !active || active.type === "all" || names.includes("全部") || names.includes("全部视频");
    const byTag = isAll || (active.type === "source" ? isModelTeacherVideo(video) : names.some(name => text.includes(name)));
    const bySearch = !q || text.toLowerCase().includes(q);
    return byTag && bySearch;
  }).sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return quickVideoTitle(a).localeCompare(quickVideoTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
};

loadMoreLibraryVideos = function finalLoadMoreLibraryVideos() {
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60)) + 60;
  renderLibrary();
};

librarySearchHtml = function finalLibrarySearchHtml() {
  const shownSearch = /^(xiaoke|小可|小可课堂)$/i.test(String(state.search || "").trim()) ? "" : state.search || "";
  return `
    <div class="library-search-row">
      <label class="library-search">🔍<input id="librarySearchInput" value="${escapeHtml(shownSearch)}" placeholder="搜索视频标题、日期、题材、转录" oninput="setSearch(this.value)"></label>
      <button class="small-btn" onclick="clearVideoFilters()">清空</button>
      <button class="small-btn" onclick="state.activeTag=tags[0].name;state.search='';state.libraryLimit=60;renderLibrary();renderTopChips()">全部视频</button>
      <button class="small-btn" onclick="startVideoBackgroundQueue('title')">后台识别标题</button>
      <button class="small-btn" onclick="startVideoBackgroundQueue('transcript')">后台转写</button>
      <button class="small-btn" onclick="startVideoBackgroundQueue('analysis')">后台 AI 分析</button>
    </div>
  `;
};

renderLibrary = function finalStableRenderLibrary() {
  state.view = "library";
  restoredRenderShell();
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

async function transcribeVideo(id) {
  const v = (state.videos || []).find(item => item.id === id);
  if (!v || !v.videoUrl) {
    showToast("这条没有本地视频文件，不能转写");
    return "";
  }
  const btn = document.getElementById("transcribeBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "转写中...";
  }
  showToast("正在提取语音文字，完成后会自动写入右侧文本框");
  try {
    const response = await fetch("/api/transcribe-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, videoUrl: v.videoUrl || "", originalUrl: v.originalUrl || "" })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "语音转文字失败");
    const transcript = normalizeTranscriptText(data.transcript || "");
    if (!transcript) throw new Error("没有识别到可用文字");
    saveVideoTextOverride(id, { transcript });
    const input = document.getElementById("detailTranscriptInput");
    if (input) input.value = transcript;
    videoRuntimeCache.transcript.delete(id);
    showToast(data.cached ? "已读取转写缓存" : "语音转文字完成");
    if (state.view === "detail") renderDetail();
    return transcript;
  } catch (error) {
    showToast("转写失败：" + (error.message || "请检查 Whisper/ffmpeg 是否可用"));
    return "";
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "提取语音文字";
    }
  }
}

syncVideoTitleFromFrame = async function finalSyncVideoTitleFromFrame(id, force = false) {
  const v = (state.videos || []).find(item => item.id === id);
  if (!v || !v.videoUrl) {
    showToast("这条没有本地视频，不能识别画面标题");
    return "";
  }
  showToast("正在识别画面标题...");
  try {
    const response = await fetch("/api/ocr-video-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, videoUrl: v.videoUrl || "", originalUrl: v.originalUrl || "", force })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "画面标题识别失败");
    const title = stripVideoBrandText(data.title || "");
    if (!title) throw new Error("没有识别到可用标题");
    saveVideoTextOverride(id, { title });
    videoRuntimeCache.title.delete(id);
    const input = document.getElementById("detailTitleInput");
    if (input) input.value = title;
    showToast(data.cached ? "已读取画面标题缓存" : "已识别画面标题");
    if (state.view === "detail") renderDetail();
    if (state.view === "library") renderLibrary();
    renderTopChips();
    return title;
  } catch (error) {
    showToast("识别失败：" + (error.message || "请检查 OCR 环境"));
    return "";
  }
};

async function fetchCurrentVideoComments() {
  const video = (state.videos || []).find(item => item.id === state.currentVideoId);
  if (!video) return;
  const url = video.originalUrl || video.shareUrl || video.sourceUrl || "";
  if (!/douyin\.com|v\.douyin|iesdouyin/i.test(url)) {
    showToast("这条素材没有抖音原链接，不能自动抓评论");
    return;
  }
  showToast("正在抓取抖音高赞评论/博主互动...");
  try {
    const response = await fetch("/api/douyin-comments?limit=30&url=" + encodeURIComponent(url));
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || data.hint || "抓取失败");
    const commentsStore = finalReadVideoSideData("xiaoke_video_hot_comments_v1");
    const interactionsStore = finalReadVideoSideData("xiaoke_video_author_interactions_v1");
    commentsStore[video.id] = (data.comments || []).slice(0, 20);
    interactionsStore[video.id] = (data.interactions || []).slice(0, 20);
    finalSaveVideoSideData("xiaoke_video_hot_comments_v1", commentsStore);
    finalSaveVideoSideData("xiaoke_video_author_interactions_v1", interactionsStore);
    showToast(`已抓取评论 ${commentsStore[video.id].length} 条，互动 ${interactionsStore[video.id].length} 条`);
    showDetailTab("comments");
  } catch (error) {
    showToast("评论抓取失败：" + (error.message || "抖音可能需要 cookies"));
  }
}

showDetailTab = function finalDetailTabsWithAutoComments(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => {
    const text = btn.textContent || "";
    const active = (tab === "transcript" && text.includes("转录")) || (tab === "comments" && text.includes("评论")) || (tab === "interaction" && text.includes("互动")) || (tab === "analysis" && text.includes("AI"));
    btn.classList.toggle("active", active);
  });
  if (tab === "analysis") return void (box.innerHTML = analysisHtml(video));
  if (tab === "comments") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">高赞评论</div><div class="date">优先自动抓抖音原链接；失败时可以手动导入，页面不会卡死。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoComments()">手动导入</button></div></div>${finalCommentListHtml(finalVideoComments(video), "暂无高赞评论。点“自动抓取抖音”，没有原链接时再手动导入。")}</section>`;
    return;
  }
  if (tab === "interaction") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">博主互动</div><div class="date">展示博主回复、点赞互动等高价值反馈。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoInteractions()">手动导入</button></div></div>${finalCommentListHtml(finalVideoInteractions(video), "暂无博主互动数据。")}</section>`;
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录正文</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。先点上方“语音转文字”，或把文字粘贴到转写框里。")}</p></section>`;
};

function finalVideoNeedsAi(video = {}) {
  const structured = readStructuredAnalyses();
  return !structured[video.id];
}

async function startVideoBackgroundQueue(mode = "title") {
  if (window.__xiaokeVideoQueueRunning) {
    showToast("后台队列正在运行");
    return;
  }
  const pool = filteredVideos().length ? filteredVideos() : restoredAllLibraryVideos();
  const targets = pool.filter(video => {
    if (mode === "title") return video.videoUrl && isGenericVideoTitle(getVideoTextOverride(video).title || video.title);
    if (mode === "transcript") return video.videoUrl && !getVideoDetailTranscript(video);
    if (mode === "analysis") return finalVideoNeedsAi(video);
    return false;
  }).slice(0, 302);
  if (!targets.length) {
    showToast("没有需要后台处理的素材");
    return;
  }
  window.__xiaokeVideoQueueRunning = true;
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < targets.length; i += 1) {
    const video = targets[i];
    showToast(`后台${mode} ${i + 1}/${targets.length}`);
    try {
      if (mode === "title") await syncVideoTitleFromFrame(video.id);
      if (mode === "transcript") await transcribeVideo(video.id);
      if (mode === "analysis") await generateVideoAIAnalysis(video.id, true);
      ok += 1;
    } catch {
      fail += 1;
    }
    await new Promise(resolve => setTimeout(resolve, 180));
  }
  window.__xiaokeVideoQueueRunning = false;
  showToast(`后台处理完成：成功 ${ok}，失败 ${fail}`);
  render();
}

async function stockBriefForAutoFill(item = {}) {
  const query = item.key || item.quoteKey || item.name || item.localName || "";
  if (!query) return null;
  let response = await fetch("/api/stock-brief?announcements=1&announcementLimit=1&announcementText=1&announcementTextLimit=800&keys=" + encodeURIComponent(query));
  let data = await response.json().catch(() => ({}));
  let brief = data.items && data.items[0];
  if (data.success && brief && brief.key) return brief;
  response = await fetch("/api/stock-search?limit=1&q=" + encodeURIComponent(query));
  data = await response.json().catch(() => ({}));
  const found = data.items && data.items[0];
  if (!found) return null;
  response = await fetch("/api/stock-brief?announcements=1&announcementLimit=1&announcementText=1&announcementTextLimit=800&keys=" + encodeURIComponent(found.key || found.code || found.name));
  data = await response.json().catch(() => ({}));
  return data.items && data.items[0] ? data.items[0] : found;
}

openStockProfileEditor = async function finalAutoStockProfileEditor(item = {}) {
  let query = item.key || item.quoteKey || item.name || item.localName || "";
  if (!query) {
    const input = document.getElementById("stockProfileSearchInput");
    query = (input && input.value.trim()) || prompt("输入股票名或代码，系统会自动从数据源补档案", "") || "";
  }
  if (!query.trim()) return;
  showToast(`正在自动补档案：${query}`);
  try {
    const brief = await stockBriefForAutoFill({ ...item, name: query });
    if (!brief || !(brief.key || brief.name)) throw new Error("没有从行情/财务数据源匹配到股票");
    const payload = stockProfilePayloadFromBrief(brief, { ...item, name: query, sector: item.sector || item.group || "" });
    payload.note = compactPlainText(payload.note || "", 160);
    payload.dataSource = brief.profileSource || brief.financialSource || "东方财富财务 / 腾讯行情 / 巨潮公告";
    await saveStockProfilePayload(payload);
    showToast(`已自动补档案：${payload.name || payload.key}`);
    if (state.view === "stockProfiles") await renderStockProfiles();
  } catch (error) {
    showToast("补档案失败：" + (error.message || "请检查股票代码"));
  }
};

async function autoFillVisibleStockProfiles() {
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles).slice(0, 80);
  let ok = 0;
  let fail = 0;
  for (const row of rows) {
    const item = row.item || row.profile || {};
    try {
      const brief = await stockBriefForAutoFill({ ...item, key: row.key });
      if (!brief || !(brief.key || brief.name)) throw new Error("no match");
      await saveStockProfilePayload(stockProfilePayloadFromBrief(brief, item));
      ok += 1;
    } catch {
      fail += 1;
    }
    await new Promise(resolve => setTimeout(resolve, 120));
  }
  showToast(`本页自动补档案完成：成功 ${ok}，失败 ${fail}`);
  renderStockProfiles();
}

renderStockProfiles = async function finalAutoStockProfilesPage() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">自动从腾讯行情、东方财富财务、巨潮公告取数；公告和财务只保留短摘要。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillVisibleStockProfiles()">自动补全本页</button>
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderStockProfiles)">刷新行情</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>`;
  main.innerHTML = `${header}<section class="panel"><div class="date">正在同步行情、公告和财务摘要...</div></section>`;
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles)
    .filter(row => !/指数|大盘/.test([row.item?.sector, row.item?.group, row.item?.groupChain, row.item?.name, row.profile?.sector].join(" ")))
    .slice(0, 80);
  const briefMap = await restoredBriefMapForRows(rows);
  rows.forEach(row => {
    const keys = [row.key, row.item?.quoteKey, row.item?.name, row.profile?.key, row.profile?.name].filter(Boolean).map(key => String(key).toLowerCase());
    row.brief = keys.map(key => briefMap.get(key)).find(Boolean) || row.brief || {};
  });
  main.innerHTML = `
    ${header}
    <section class="panel">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(restoredStockProfileCard).join("") || `<div class="panel">暂无股票档案。</div>`}
    </section>`;
};

function finalDashboardSectorRows(limit = 8) {
  const excluded = /交易系统|投资哲学|宏观周期|书籍|全部|大盘|指数/i;
  return allVideoTags()
    .filter(tag => !excluded.test(tag.name || "") && (tag.type === "videoGroup" || tag.type === "sector" || tag.type === "topic" || tag.type === undefined))
    .map(tag => ({ tag, name: sectorDisplayName(tag), count: tagCount(tag) }))
    .filter(row => row.count > 0 && !excluded.test(row.name))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

renderDashboard = function finalProfessionalDashboard() {
  state.view = "dashboard";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const videos = restoredAllLibraryVideos();
  const structured = readStructuredAnalyses();
  const linked = readVideoLinks();
  const targetCount = Math.max(19, flattenWatchlist().filter(item => !/指数|大盘/.test(item.sector || item.group || "")).length || 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = videos.filter(video => String(video.date || "") === today).length;
  const highCount = videos.filter(video => (structured[video.id] || {}).confidence === "high" || video.confidence === "high").length;
  const riskCount = videos.filter(video => /风险|回避|谨慎|高位|追高/.test([video.title, video.transcript, JSON.stringify(structured[video.id] || {})].join(" "))).length;
  const linkedCount = Object.values(linked || {}).filter(item => uniqueClean([...(item.stocks || []), ...(item.sectors || []), ...(item.groups || [])]).length).length;
  const recent = videos.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 4);
  const rows = videos.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 8);
  const sectorItems = finalDashboardSectorRows(8);
  main.innerHTML = `
    <section class="stats">
      <button class="stat" onclick="openStockProfiles()"><div><b>${targetCount}</b><span>关注标的</span></div></button>
      <button class="stat" onclick="openVideoLibrary()"><div><b>${videos.length}</b><span>分析视频</span></div></button>
      <button class="stat" onclick="openModelFramework()"><div><b>309</b><span>投资分析</span></div></button>
    </section>
    <section class="signal-grid">
      <button class="signal-card" onclick="openDailyReview()"><strong>今日新增观点</strong><b>${todayCount}</b><span>按视频日期统计，方便每天复盘。</span></button>
      <button class="signal-card" onclick="openPipelineCenter()"><strong>高置信度视频</strong><b>${highCount}</b><span>置信度 8 分以上，优先沉淀为笔记。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>风险预警视频</strong><b>${riskCount}</b><span>含风险、回避、追高等提示。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>待复核视频</strong><b>${Math.max(0, videos.length - Object.keys(structured || {}).length)}</b><span>未 AI 分析或低置信内容。</span></button>
      <button class="signal-card" onclick="openPipelineCenter()"><strong>已关联素材</strong><b>${linkedCount}</b><span>已进入标的/板块知识库。</span></button>
    </section>
    <section class="dash-grid">
      <div class="panel">
        <div class="panel-title">热门标的 TOP10</div>
        <div class="bars">${restoredDashboardBars()}</div>
      </div>
      <div class="panel">
        <div class="metadata-head" style="margin-bottom:8px"><div class="panel-title">板块/题材分布 TOP8</div><button class="small-btn" onclick="openVideoGroupManager()">编辑</button></div>
        <div class="donut-wrap">
          <div class="donut"></div>
          <div class="legend">${sectorItems.map((row, i) => `<div onclick='filterByTag(${JSON.stringify(row.tag?.name || row.name)})'><span class="sw" style="background:${["#3c82f6","#8d5cf6","#19c98b","#f5a623","#ef4444","#22c3d6","#ec4899","#84cc16"][i]}"></span>${escapeHtml(row.name)}(${row.count})</div>`).join("") || "<div>暂无板块数据</div>"}</div>
        </div>
      </div>
    </section>
    <section class="feed">${recent.map(restoredDashboardFeedHtml).join("")}</section>
    <section class="panel" style="margin-top:12px">
      <div class="metadata-head">
        <div><div class="panel-title">最近评价</div><div class="date">看哪些视频已转录、哪些还要 AI 分析。</div></div>
        <button class="small-btn" onclick="openVideoLibrary()">打开素材库</button>
      </div>
      <div class="metadata-table-wrap">
        <table class="metadata-table">
          <thead><tr><th>日期</th><th>视频标题</th><th>题材</th><th>互动</th><th>AI</th><th>操作</th></tr></thead>
          <tbody>${restoredMetadataRows(rows) || `<tr><td colspan="6">暂无素材。</td></tr>`}</tbody>
        </table>
      </div>
    </section>`;
};

renderAgent = function finalCompactAgent() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  const currentChat = document.getElementById("agentChat")?.innerHTML;
  agent.innerHTML = `
    <div class="agent-head">
      <div class="agent-head-title"><span class="avatar" style="width:28px;height:28px;font-size:13px">AI</span><span>小可 Agent</span></div>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="localStorage.setItem('xiaoke_agent_provider', this.value);renderAgent()">${restoredProviderOptions()}</select>
        <select class="agent-response-mode" id="agentResponseMode" title="回答深度" onchange="event.stopPropagation();setAgentResponseMode(this.value)">
          <option value="concise" ${getAgentResponseMode() === "concise" ? "selected" : ""}>精简回答</option>
          <option value="professional" ${getAgentResponseMode() === "professional" ? "selected" : ""}>专业研报</option>
        </select>
        <button class="config-btn" onclick="event.stopPropagation();openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="event.stopPropagation();toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles">
      <div class="role-card"><strong>投资主脑</strong><span>行情 / 档案 / 风险</span></div>
      <div class="role-card"><strong>素材主脑</strong><span>视频 / 评论 / 互动</span></div>
      <div class="role-card"><strong>记忆主脑</strong><span>复盘 / 偏好 / 规则</span></div>
      <div class="role-card"><strong>系统主脑</strong><span>错误诊断 / 维护</span></div>
    </div>
    <div class="agent-tabs">
      ${["投资主脑","素材检索","三脑复盘","查看证据","记住这条","路由规则","诊断"].map((name, i) => `<button class="${i === 0 ? "primary" : ""}" onclick='event.stopPropagation();agentQuickAsk(${JSON.stringify(name)})'>${name}</button>`).join("")}
      <button onclick="event.stopPropagation();openAgentReportHistory()">研报历史</button>
    </div>
    <div class="agent-chat" id="agentChat">${currentChat || restoredAgentBubble("你问股票时，我会先识别标的、同步行情，检索视频、评论互动、复盘和记忆，再按数据前提、核心矛盾、观察条件与风险边界回答。投资问答不检索书籍。", "bot", "小可课堂 / 投资知识库")}</div>
    <div class="agent-input">
      <input id="agentInput" placeholder="例如：模型先生怎么看中际旭创？分析寒武纪和光模块..." onkeydown="if(event.key==='Enter') sendAgentMessage()">
      <button onclick="sendAgentMessage()">发送</button>
    </div>`;
};

// Last-write-wins patch: the file contains older compatibility overrides above.
// Keep the final UI contract here so late legacy blocks cannot overwrite it.
watchGroupPreviewHtml = function xiaokeLastWatchGroupPreview(group, path = []) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const stocks = restoredPreviewStocks(group, 3, path);
  return `<div class="watch-group-preview">
    <div>${childCount} 分支 · ${total} 标的</div>
    ${stocks.map(item => {
      const quote = xiaokeQuoteParts(item);
      return `<button class="watch-preview-row" onclick='event.stopPropagation();filterByStock(${JSON.stringify(item.name || "")})'>
        <b>${escapeHtml(item.name || "未命名")}<i class="dot ${item.status === "warn" ? "warn" : ""}"></i></b>
        ${quote.price || quote.pctText ? `<div class="quote-line ${quote.cls}"><b>${escapeHtml(quote.price || "-")}</b><span>${escapeHtml([quote.change, quote.pctText].filter(Boolean).join("  "))}</span></div>` : ""}
        <div class="watch-meta">${escapeHtml([item.hitCount ? `${item.hitCount}次` : "0次", item.sector || item.group || group.name || "", item.relatedCount != null ? `相关 ${item.relatedCount} 条` : ""].filter(Boolean).join("  "))}</div>
        <p class="watch-desc">${escapeHtml(item.desc || item.note || "新增关注标的，等待后续补充观察逻辑。")}</p>
      </button>`;
    }).join("")}
    <button class="small-btn" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button>
  </div>`;
};

filteredVideos = function xiaokeLastFilteredVideos() {
  const q = finalCleanSearchQuery();
  const active = allVideoTags().find(tag => tag.name === state.activeTag || tag.originalName === state.activeTag) || allVideoTags()[0] || { type: "all", name: "全部" };
  const names = [active.name, active.originalName, finalTagLabel(active)].filter(Boolean);
  return restoredAllLibraryVideos().filter(video => {
    const text = typeof finalVideoText === "function"
      ? finalVideoText(video)
      : [video.title, video.topic, video.focus, video.transcript, video.author, ...videoGroupsFor(video.id)].join(" ");
    const isAll = !active || active.type === "all" || names.includes("全部") || names.includes("全部视频");
    const byTag = isAll || (active.type === "source" ? isModelTeacherVideo(video) : names.some(name => text.includes(name)));
    const bySearch = !q || text.toLowerCase().includes(q);
    return byTag && bySearch;
  }).sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return quickVideoTitle(a).localeCompare(quickVideoTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
};

renderLibrary = function xiaokeLastRenderLibrary() {
  state.view = "library";
  restoredRenderShell();
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

showDetailTab = function xiaokeLastShowDetailTab(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => {
    const text = btn.textContent || "";
    const active = (tab === "transcript" && text.includes("转录")) || (tab === "comments" && text.includes("评论")) || (tab === "interaction" && text.includes("互动")) || (tab === "analysis" && text.includes("AI"));
    btn.classList.toggle("active", active);
  });
  if (tab === "analysis") return void (box.innerHTML = analysisHtml(video));
  if (tab === "comments") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">高赞评论</div><div class="date">优先自动抓抖音原链接；失败时可以手动导入，页面不会卡死。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoComments()">手动导入</button></div></div>${finalCommentListHtml(finalVideoComments(video), "暂无高赞评论。点“自动抓取抖音”，没有原链接时再手动导入。")}</section>`;
    return;
  }
  if (tab === "interaction") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">博主互动</div><div class="date">展示博主回复、点赞互动等高价值反馈。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoInteractions()">手动导入</button></div></div>${finalCommentListHtml(finalVideoInteractions(video), "暂无博主互动数据。")}</section>`;
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录正文</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。先点上方“语音转文字”，或把文字粘贴到转写框里。")}</p></section>`;
};

renderStockProfiles = async function xiaokeLastStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">自动从腾讯行情、东方财富财务、巨潮公告取数；公告和财务只保留短摘要。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillVisibleStockProfiles()">自动补全本页</button>
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderStockProfiles)">刷新行情</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>`;
  main.innerHTML = `${header}<section class="panel"><div class="date">正在同步行情、公告和财务摘要...</div></section>`;
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles)
    .filter(row => !/指数|大盘/.test([row.item?.sector, row.item?.group, row.item?.groupChain, row.item?.name, row.profile?.sector].join(" ")))
    .slice(0, 80);
  const briefMap = await restoredBriefMapForRows(rows);
  rows.forEach(row => {
    const keys = [row.key, row.item?.quoteKey, row.item?.name, row.profile?.key, row.profile?.name].filter(Boolean).map(key => String(key).toLowerCase());
    row.brief = keys.map(key => briefMap.get(key)).find(Boolean) || row.brief || {};
  });
  main.innerHTML = `
    ${header}
    <section class="panel">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(restoredStockProfileCard).join("") || `<div class="panel">暂无股票档案。</div>`}
    </section>`;
};

renderAgent = function xiaokeLastCompactAgent() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  const currentChat = document.getElementById("agentChat")?.innerHTML;
  agent.innerHTML = `
    <div class="agent-head">
      <div class="agent-head-title"><span class="avatar" style="width:28px;height:28px;font-size:13px">AI</span><span>小可 Agent</span></div>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="localStorage.setItem('xiaoke_agent_provider', this.value);renderAgent()">${restoredProviderOptions()}</select>
        <button class="config-btn" onclick="event.stopPropagation();openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="event.stopPropagation();toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles">
      <div class="role-card"><strong>投资主脑</strong><span>行情 / 档案 / 风险</span></div>
      <div class="role-card"><strong>素材主脑</strong><span>视频 / 书籍 / 评论</span></div>
      <div class="role-card"><strong>记忆主脑</strong><span>复盘 / 偏好 / 规则</span></div>
      <div class="role-card"><strong>系统主脑</strong><span>错误诊断 / 维护</span></div>
    </div>
    <div class="agent-tabs">
      ${["投资主脑","素材检索","三脑复盘","查看证据","记住这条","路由规则","诊断"].map((name, i) => `<button class="${i === 0 ? "primary" : ""}" onclick='event.stopPropagation();agentQuickAsk(${JSON.stringify(name)})'>${name}</button>`).join("")}
    </div>
    <div class="agent-chat" id="agentChat">${currentChat || restoredAgentBubble("你问股票时，我会先识别标的、同步行情、检索视频/书籍/记忆，再按数据前提、市场阶段、核心矛盾、观察清单、风险边界回答。", "bot", "小可课堂 / 投资知识库")}</div>
    <div class="agent-input">
      <input id="agentInput" placeholder="例如：模型先生怎么看中际旭创？分析寒武纪和光模块..." onkeydown="if(event.key==='Enter') sendAgentMessage()">
      <button onclick="sendAgentMessage()">发送</button>
    </div>`;
};

document.addEventListener("click", event => {
  const button = event.target && event.target.closest ? event.target.closest("#topChips button") : null;
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  restoredRouteTopChip(button.textContent || "");
}, true);

window.addEventListener("hashchange", restoredRouteHash);

function restoredStartHashRouter() {
  if (window.__xiaokeHashRouterStarted) return;
  window.__xiaokeHashRouterStarted = true;
  window.__xiaokeLastHash = String(location.hash || "");
  setInterval(() => {
    const current = String(location.hash || "");
    if (current === window.__xiaokeLastHash) return;
    window.__xiaokeLastHash = current;
    restoredRouteHash();
  }, 200);
}

restoredStartHashRouter();

libraryVideos = function restoredLibraryVideos() {
  const deleted = typeof isVideoDeleted === "function" ? isVideoDeleted : () => false;
  return (state.videos || []).filter(video => video && video.id && !deleted(video.id));
};

const restoredScanLocalVideos = scanLocalVideos;
scanLocalVideos = async function restoredScanLocalVideosWithLibraryRefresh() {
  const result = await restoredScanLocalVideos();
  try {
    if (typeof finalVideoSearchCache !== "undefined" && typeof finalVideoSearchCache.clear === "function") finalVideoSearchCache.clear();
  } catch {}
  if (state.view === "library" || state.view === "dashboard") {
    restoredRenderShell();
    render();
  }
  return result;
};

function restoredLocalFileToVideo(file, index = 0) {
  const id = "local_" + (file.sourceId || file.filename || index);
  const title = file.title || String(file.filename || "本地视频").replace(/\.[^.]+$/, "");
  const topic = file.topic || file.focus || "模型先生";
  return {
    id,
    title,
    topic,
    date: file.publishedAt || String(file.mtime || new Date().toISOString()).slice(0, 10),
    author: file.author || "模型先生",
    likes: Number(file.likes || 0),
    comments: Number(file.comments || 0),
    shares: Number(file.shares || 0),
    collects: Number(file.collects || 0),
    videoUrl: file.url || "",
    thumbnail: file.thumbnail || "",
    originalUrl: file.originalUrl || "",
    transcript: file.transcript || "本地视频已导入，可继续补转写、AI 分析和复盘。",
    focus: file.focus || topic,
    advice: file.advice || "先保留原始素材，再做结构化复盘。",
    risk: file.risk || "仅作为复盘素材，不构成买卖依据。",
    philosophy: file.philosophy || "素材先沉淀，再反复验证。",
    confidence: file.confidence || "待补充",
    duration: Number(file.duration || 0),
    filename: file.filename || "",
    local: true,
    userAdded: true,
    sizeLabel: file.sizeLabel || ""
  };
}

async function restoredImportLocalVideosNow() {
  try {
    const response = await fetch("/api/local-videos", { cache: "no-store" });
    if (!response.ok) {
      if (document.body) document.body.dataset.localVideoRestoreCount = "http-" + response.status;
      return 0;
    }
    const data = await response.json();
    if (document.body) document.body.dataset.localVideoRestoreShape = Array.isArray(data.videos) ? "videos" : Object.keys(data || {}).join(",");
    const files = Array.isArray(data.videos) ? data.videos : [];
    files.forEach((file, index) => {
      const nextVideo = restoredLocalFileToVideo(file, index);
      const existing = state.videos.find(video => video.id === nextVideo.id);
      if (existing) Object.assign(existing, nextVideo);
      else state.videos.push(nextVideo);
    });
    try {
      if (typeof finalVideoSearchCache !== "undefined" && typeof finalVideoSearchCache.clear === "function") finalVideoSearchCache.clear();
    } catch {}
    if (document.body) document.body.dataset.localVideoRestoreCount = String(files.length);
    return files.length;
  } catch {
    if (document.body) document.body.dataset.localVideoRestoreCount = "error";
    return 0;
  }
}

const restoredRenderLibraryBase = renderLibrary;
renderLibrary = function restoredRenderLibraryWithLocalFallback() {
  if ((state.videos || []).length < 50 && !window.__xiaokeRestoringLocalVideos) {
    window.__xiaokeRestoringLocalVideos = true;
    restoredImportLocalVideosNow().then(() => {
      window.__xiaokeRestoringLocalVideos = false;
      restoredRenderShell();
      restoredRenderLibraryBase();
    });
  }
  return restoredRenderLibraryBase();
};

function restoredAllLibraryVideos() {
  const deleted = typeof isVideoDeleted === "function" ? isVideoDeleted : () => false;
  return (state.videos || []).filter(video => video && video.id && !deleted(video.id));
}

if (typeof compactPlainText === "undefined") {
  var compactPlainText = function restoredCompactPlainText(value = "", limit = 120) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    return text.length > limit ? text.slice(0, Math.max(0, limit - 1)) + "…" : text;
  };
}

if (typeof uniqueClean === "undefined") {
  var uniqueClean = function restoredUniqueClean(items = []) {
    const seen = new Set();
    return (items || []).map(item => String(item || "").trim()).filter(item => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    });
  };
}

if (typeof analysisModel === "undefined") {
  var analysisModel = function restoredAnalysisModel(video = {}, savedText = "", structured = null) {
    if (structured && typeof structured === "object") return structured;
    const text = String(savedText || video.transcript || video.advice || "");
    return {
      summary: compactPlainText(text || video.title || "暂无结构化分析", 160),
      targets: video.focus || video.topic || "待补充",
      advice: video.advice || "先沉淀素材，再结合行情和复盘验证。",
      risk: video.risk || "仅作复盘辅助，不构成买卖依据。",
      philosophy: video.philosophy || "记录、验证、修正，再回到市场。",
      confidence: video.confidence || "待补充"
    };
  };
}

function restoredQuoteForItem(item = {}) {
  const quotes = state.indexQuotes || {};
  return quotes[item.quoteKey] || quotes[item.name] || quotes[String(item.quoteKey || "").toLowerCase()] || null;
}

function restoredPctText(value) {
  const pct = Number(value);
  if (!Number.isFinite(pct)) return "-";
  return `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

function restoredGroupStocks(group = {}) {
  const rows = [];
  function visit(node) {
    (node.items || []).forEach(item => rows.push(item));
    (node.children || []).forEach(visit);
  }
  visit(group);
  return rows;
}

function restoredGroupPct(group = {}) {
  const values = restoredGroupStocks(group)
    .map(item => restoredQuoteForItem(item))
    .map(quote => quote ? Number(quote.pct) : NaN)
    .filter(Number.isFinite);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function restoredTopGroups() {
  return readWatchGroups()
    .map((group, index) => {
      const pct = restoredGroupPct(group);
      const stocks = restoredGroupStocks(group);
      const branchNames = (group.children || []).map(child => child.name).filter(Boolean);
      const score = (Number.isFinite(pct) ? pct * 10 : 0) + stocks.length + branchNames.length * 3;
      return { group, index, pct, stocks, branchNames, score };
    })
    .filter(row => row.stocks.length > 0 && !/指数|大盘/.test(row.group.name))
    .sort((a, b) => b.score - a.score);
}

function restoredShortFinancial(item = {}) {
  const parts = [
    item.financialReportDate ? String(item.financialReportDate).replace(/^20/, "") : "",
    item.revenue ? `营收${item.revenue}` : "",
    item.netProfit ? `净利${item.netProfit}` : "",
    item.roe !== undefined && item.roe !== "" ? `ROE${item.roe}%` : ""
  ].filter(Boolean);
  return compactPlainText(parts.join(" "), 20) || "财务待补";
}

function restoredShortAnnouncement(item = {}) {
  const ann = (item.latestAnnouncements || [])[0] || {};
  return compactPlainText(ann.summary || ann.title || item.latestAnnouncement || "", 20) || "公告待同步";
}

async function restoredBriefMapForRows(rows = []) {
  const keys = uniqueClean(rows.map(row => row.key || row.item?.quoteKey || row.item?.name).filter(Boolean)).slice(0, 36);
  if (!keys.length) return new Map();
  const data = await finalTimeout(
    fetch("/api/stock-brief?keys=" + encodeURIComponent(keys.join(",")) + "&announcements=1&announcementLimit=1&announcementText=1&announcementTextLimit=800")
      .then(response => response.json()),
    5000,
    null
  );
  const map = new Map();
  if (data && data.success && Array.isArray(data.items)) {
    data.items.forEach(item => {
      [item.key, item.name, item.localName].filter(Boolean).forEach(key => map.set(String(key).toLowerCase(), item));
    });
  }
  return map;
}

renderDashboard = function restoredCleanDashboard() {
  state.view = "dashboard";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const videos = restoredAllLibraryVideos();
  const recent = videos.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 6);
  const groups = restoredTopGroups().slice(0, 6);
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">小可课堂看板</div>
        <div class="date">先看素材、板块强弱和股票档案；复杂功能放到独立页面，主页面保持清楚可用。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openVideoLibrary()">打开素材库</button>
        <button class="small-btn" onclick="openSectorStrength()">板块强弱</button>
        <button class="small-btn" onclick="openStockProfiles()">股票档案</button>
      </div>
    </section>
    <section class="pipeline-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:12px">
      ${finalMetricCell("素材总数", videos.length)}
      ${finalMetricCell("关注标的", flattenWatchlist().length)}
      ${finalMetricCell("板块分组", readWatchGroups().length)}
      ${finalMetricCell("当前状态", "可用")}
    </section>
    <section class="dash-grid" style="margin-top:12px">
      <div class="panel">
        <div class="panel-title">板块涨跌</div>
        <div class="sector-branch-list">
          ${groups.map(row => `<div onclick="openSectorDirectory([${row.index}])" style="cursor:pointer"><b>${escapeHtml(row.group.name)}</b><span>${escapeHtml(restoredPctText(row.pct))}</span><em>${escapeHtml(row.branchNames.slice(0, 4).join("、") || `${row.stocks.length}只标的`)}</em></div>`).join("") || `<div><b>暂无板块</b><span>-</span><em>先导入产业链</em></div>`}
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">最新素材</div>
        <div class="mini-list">
          ${recent.map(video => `<button class="mini-row" onclick='state.currentVideoId=${JSON.stringify(video.id)};renderDetail()'><b>${escapeHtml(getVideoDetailTitle(video))}</b><span>${escapeHtml(video.date || "-")}</span></button>`).join("")}
        </div>
      </div>
    </section>
  `;
};

renderDetail = function restoredCleanDetail() {
  state.view = "detail";
  renderTopChips();
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  const main = document.getElementById("main");
  if (!main) return;
  if (!video) return renderLibrary();
  const title = getVideoDetailTitle(video);
  const openUrl = video.documentUrl || video.originalUrl || "";
  const media = video.videoUrl
    ? `<video src="${video.videoUrl}" controls playsinline></video>`
    : `<div class="fallback-poster"><div style="font-size:48px">${video.isDocument ? "书" : "链"}</div><div>${escapeHtml(title)}</div>${openUrl ? `<button class="open-btn" style="max-width:220px;margin-top:16px" onclick='window.open(${JSON.stringify(openUrl)}, "_blank")'>打开原文</button>` : ""}</div>`;
  main.innerHTML = `
    <section class="detail">
      <div class="player">${media}</div>
      <div class="detail-main">
        <button class="small-btn" onclick="state.view='library';renderLibrary()">← 返回素材库</button>
        <h1 class="detail-title">${escapeHtml(title)}</h1>
        <div class="detail-meta"><span>${escapeHtml(video.author || "-")}</span><span>赞 ${video.likes || 0}</span><span>评 ${video.comments || 0}</span><span>转 ${video.shares || 0}</span><span>${escapeHtml(video.date || "-")}</span></div>
        <div class="tabs"><button class="tab" onclick="showDetailTab('transcript')">转录/互动</button><button class="tab active" onclick="showDetailTab('analysis')">AI分析</button></div>
        <div id="detailContent">${analysisHtml(video)}</div>
      </div>
    </section>
  `;
};

openDetail = function restoredOpenDetail(id) {
  state.currentVideoId = id;
  state.view = "detail";
  renderDetail();
};

renderSectorStrength = function restoredSimpleSectorStrength() {
  state.view = "sectorStrength";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const rows = restoredTopGroups();
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">板块强弱</div>
        <div class="date">这里只排板块分类：看涨跌幅、标的数量和细分分类；点板块进入具体个股。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderSectorStrength)">刷新涨跌</button>
        <button class="small-btn" onclick="openVideoGroupManager()">导入产业链</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-title">板块分类排序</div>
      <div class="stock-table-wrap">
        <table class="stock-table">
          <thead><tr><th>排序</th><th>板块</th><th>涨跌幅</th><th>标的数</th><th>细分分类</th><th>操作</th></tr></thead>
          <tbody>
            ${rows.map((row, index) => {
              const pct = Number(row.pct);
              const cls = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
              return `<tr>
                <td>${index + 1}</td>
                <td><b>${escapeHtml(row.group.name)}</b></td>
                <td class="${cls}">${escapeHtml(restoredPctText(row.pct))}</td>
                <td>${row.stocks.length}</td>
                <td>${escapeHtml((row.branchNames.length ? row.branchNames : ["未细分"]).slice(0, 8).join("、"))}</td>
                <td><button class="small-btn" onclick="openSectorDirectory([${row.index}])">打开细分</button></td>
              </tr>`;
            }).join("") || `<tr><td colspan="6">暂无板块，先导入产业链或添加关注分组。</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
};

function restoredStockProfileCard(row = {}) {
  const item = row.item || {};
  const profile = row.profile || {};
  const brief = row.brief || {};
  const name = item.name || profile.name || brief.localName || brief.name || row.key || "未命名";
  const key = brief.key || profile.key || row.key || item.quoteKey || "";
  const quote = brief.price != null ? brief : restoredQuoteForItem(item) || {};
  const pct = Number(quote.pct);
  const quoteClass = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
  return `
    <article class="decision-card">
      <div class="metadata-head">
        <div>
          <h3 style="margin:0 0 5px">${escapeHtml(name)}</h3>
          <div class="date">${escapeHtml(key || "未匹配代码")} · ${escapeHtml(profile.sector || item.sector || item.group || "未分类")}</div>
        </div>
        <div class="quote-line ${quoteClass}">
          <b>${escapeHtml(quote.price == null ? "-" : quote.price)}</b>
          <span>${escapeHtml(restoredPctText(quote.pct))}</span>
        </div>
      </div>
      <div class="stock-metric-grid">
        ${stockMetricCell("PE", brief.pe ?? profile.pe)}
        ${stockMetricCell("PB", brief.pb ?? profile.pb)}
        ${stockMetricCell("市值", brief.marketCap ?? profile.marketCap)}
        ${stockMetricCell("ROE", brief.roe ?? profile.roe, (brief.roe || profile.roe) ? "%" : "")}
      </div>
      <p style="margin:8px 0 0;color:#cfd6e4;line-height:1.65">财务：${escapeHtml(restoredShortFinancial({ ...profile, ...brief }))}</p>
      <p style="margin:4px 0 0;color:#cfd6e4;line-height:1.65">公告：${escapeHtml(restoredShortAnnouncement({ ...profile, ...brief }))}</p>
      <div class="stock-card-actions">
        <button class="small-btn" onclick='openStockProfileEditor(${JSON.stringify({ name, key, sector: profile.sector || item.sector || "" })})'>补/改档案</button>
        <button class="small-btn" onclick='showToast(${JSON.stringify("公告：" + restoredShortAnnouncement({ ...profile, ...brief }))})'>简要公告</button>
        <button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("用股票档案、公告和财务简要分析" + name)}, "investment", true)'>问 Agent</button>
      </div>
    </article>
  `;
}

renderStockProfiles = async function restoredSimpleStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">每张卡只显示最短财务和公告摘要，避免铺满屏幕；需要补数据再点按钮。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderStockProfiles)">刷新行情</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
  `;
  main.innerHTML = `${header}<section class="panel"><div class="date">正在同步公告/财务短摘要...</div></section>`;
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles)
    .filter(row => !/指数|大盘/.test([row.item?.sector, row.item?.group, row.item?.groupChain, row.item?.name, row.profile?.sector].join(" ")))
    .slice(0, 60);
  const briefMap = await restoredBriefMapForRows(rows);
  rows.forEach(row => {
    const keys = [row.key, row.item?.quoteKey, row.item?.name].filter(Boolean).map(key => String(key).toLowerCase());
    row.brief = keys.map(key => briefMap.get(key)).find(Boolean) || row.brief || {};
  });
  main.innerHTML = `
    ${header}
    <section class="panel">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(restoredStockProfileCard).join("") || `<div class="panel">暂无股票档案。</div>`}
    </section>
  `;
};

showStockAnnouncements = function restoredShowStockAnnouncements(query = "") {
  showToast("公告：" + compactPlainText(String(query || "请先补股票代码"), 20));
};

filteredVideos = function restoredFilteredVideosFromFullLibrary() {
  const q = String(state.search || "").trim().toLowerCase();
  const active = (allVideoTags().find(tag => tag.name === state.activeTag || tag.originalName === state.activeTag) || { type: "all", name: "全部" });
  const names = [active.name, active.originalName, finalTagLabel(active)].filter(Boolean);
  return restoredAllLibraryVideos().filter(video => {
    const text = typeof finalVideoText === "function"
      ? finalVideoText(video)
      : [video.title, video.topic, video.focus, video.transcript, video.author, ...videoGroupsFor(video.id)].join(" ");
    const isAll = !active || active.type === "all" || names.includes("全部") || names.includes("全部视频");
    const byTag = isAll || (active.type === "source" ? isModelTeacherVideo(video) : names.some(name => text.includes(name)));
    const bySearch = !q || text.toLowerCase().includes(q);
    return byTag && bySearch;
  }).sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return quickVideoTitle(a).localeCompare(quickVideoTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
};

renderLibrary = function restoredRenderLibraryClean() {
  if (document.body) document.body.dataset.cleanRenderLibrary = "called";
  state.view = "library";
  try {
    restoredRenderShell();
  } catch (error) {
    if (document.body) document.body.dataset.cleanShellError = String(error && error.message || error).slice(0, 120);
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  const visible = videos.slice(0, state.libraryLimit || 60);
  if (document.body) {
    document.body.dataset.cleanRenderTotal = String(total);
    document.body.dataset.cleanRenderFiltered = String(videos.length);
    document.body.dataset.cleanRenderVisible = String(visible.length);
  }
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="state.libraryLimit+=60;renderLibrary()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

videoCardHtml = function restoredClickableVideoCard(v) {
  const title = quickVideoTitle(v);
  const href = `?view=detail&id=${encodeURIComponent(v.id)}`;
  const media = v.thumbnail
    ? `<img src="${escapeHtml(v.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover">`
    : v.videoUrl ? `<video src="${escapeHtml(v.videoUrl)}" muted preload="metadata"></video>` : `<div class="poster">${v.isDocument ? "书" : "链"}</div>`;
  const badge = v.isMetadata ? "元数据" : v.local ? "本地" : v.isDocument ? "书籍" : "样例";
  const groups = typeof videoGroupsFor === "function" ? videoGroupsFor(v.id).slice(0, 2) : [];
  return `
    <a class="video-card" data-video-id="${escapeHtml(v.id)}" href="${escapeHtml(href)}" style="text-decoration:none;color:inherit">
      <div class="thumb">${media}<span class="play">${v.isMetadata ? "↗" : "▶"}</span></div>
      <div class="vc-body">
        <h3>${escapeHtml(title)}</h3>
        <div class="metrics"><span>赞 <strong>${escapeHtml(v.likes || 0)}</strong></span><span>评 ${escapeHtml(v.comments || 0)}</span><span>转 ${escapeHtml(v.shares || 0)}</span></div>
        <div class="date" style="margin-top:7px">${escapeHtml(badge)} · ${escapeHtml(v.date || "-")}</div>
        ${groups.length ? `<div class="video-group-row">${groups.map(name => `<span class="video-group-badge">${escapeHtml(name)}</span>`).join("")}</div>` : ""}
      </div>
    </a>
  `;
};

init = async function finalRestoredInit() {
  if (document.body) document.body.dataset.finalRestoredInit = "started";
  state.videos = [...sampleVideos, ...readUserVideos()];
  try {
    const params = new URLSearchParams(location.search || "");
    const view = params.get("view");
    const tag = params.get("tag");
    const id = params.get("id");
    if (view) state.view = view;
    if (id) state.currentVideoId = id;
    if (tag) {
      state.activeTag = tag;
      state.search = "";
      state.view = "library";
    }
  } catch {}
  restoredRenderShell();
  render();
  tickClock();
  if (!window.__xiaokeClockStarted) {
    window.__xiaokeClockStarted = true;
    setInterval(tickClock, 1000 * 30);
  }
  setupAutoRefresh();
  await Promise.allSettled([
    scanMetadataVideos(),
    restoredImportLocalVideosNow(),
    scanLocalDocuments(),
    refreshMarketIndexes()
  ]);
  if (document.body) document.body.dataset.finalRestoredInit = "done";
  if (document.body) {
    document.body.dataset.finalStateVideos = String((state.videos || []).length);
    try {
      document.body.dataset.finalLibraryVideos = String(libraryVideos().length);
    } catch {
      document.body.dataset.finalLibraryVideos = "error";
    }
  }
  try {
    restoredRenderShell();
  } catch (error) {
    if (document.body) document.body.dataset.finalShellError = String(error && error.message || error).slice(0, 120);
  }
  const shouldRenderLibrary = state.view === "library" || String(location.search || "").includes("tag=");
  if (document.body) document.body.dataset.finalRenderBranch = shouldRenderLibrary ? "library" : String(state.view || "default");
  if (shouldRenderLibrary) {
    state.view = "library";
    renderLibrary();
  } else {
    render();
  }
};

function restoredAnalysisCardHtml(tone = "blue", title = "", body = "") {
  const cls = tone === "red" ? "analysis-card red" : tone === "green" ? "analysis-card green" : tone === "gold" ? "analysis-card gold" : "analysis-card blue";
  const text = body == null ? "" : String(body);
  return `<section class="${cls}"><h3>${escapeHtml(title || "分析")}</h3><p>${formatAiText ? formatAiText(text) : escapeHtml(text).replace(/\n/g, "<br>")}</p></section>`;
}

analysisCardHtml = restoredAnalysisCardHtml;

analysisHtml = function restoredStableAnalysisHtml(video = {}) {
  const savedText = readVideoAnalyses()[video.id] || video.analysis || "";
  const structured = readStructuredAnalyses()[video.id] || null;
  const model = analysisModel(video, savedText, structured);
  const title = getVideoDetailTitle(video);
  const transcript = getVideoDetailTranscript(video);
  const links = videoLinksFor(video.id);
  const linkedText = uniqueClean([...(links.stocks || []), ...(links.sectors || []), ...(links.groups || []), video.topic, video.focus].filter(Boolean)).join(" / ") || "待补充";
  const insufficient = !savedText && !structured && String(transcript || "").trim().length < 30;
  return `
    <div class="analysis-actions">
      <button class="open-btn" style="width:auto;padding:0 14px" onclick="generateAiForCurrent()">生成 AI 分析</button>
      <button class="small-btn" onclick="saveCurrentAsPrinciple()">沉淀原则</button>
      <button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("结合素材分析：" + title)}, "investment", true)'>问 Agent</button>
      ${video.documentUrl || video.originalUrl ? `<button class="small-btn" onclick='window.open(${JSON.stringify(video.documentUrl || video.originalUrl)}, "_blank")'>打开原文</button>` : ""}
    </div>
    ${insufficient ? restoredAnalysisCardHtml("blue", "先补充正文/转录", `这条素材目前主要只有标题：${title}。补充视频转录、PDF/Word 摘要或读书笔记后，分析会更准。`) : ""}
    ${restoredAnalysisCardHtml("green", "关注标的", model.targets || model.focus || linkedText || "待识别")}
    ${restoredAnalysisCardHtml("blue", "核心观点", model.summary || transcript || title || "暂无内容")}
    ${restoredAnalysisCardHtml("blue", "观点提炼", model.opinion || model.viewpoint || model.summary || "先把素材正文补齐，再提炼观点。")}
    ${restoredAnalysisCardHtml("green", "股票/板块关联", linkedText)}
    ${restoredAnalysisCardHtml("blue", "操作建议", model.advice || "只作为复盘观察，不直接形成买卖指令。")}
    ${restoredAnalysisCardHtml("red", "风险边界", model.risk || "缺少直接证据时，不做确定性判断。")}
    ${restoredAnalysisCardHtml("gold", "哲学/心法", model.philosophy || "记录、验证、修正，再回到市场。")}
  `;
};

showDetailTab = function restoredShowDetailTab(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => btn.classList.remove("active"));
  const index = tab === "analysis" ? 1 : 0;
  const btn = document.querySelectorAll(".tabs .tab")[index];
  if (btn) btn.classList.add("active");
  if (tab === "analysis") {
    box.innerHTML = analysisHtml(video);
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录/互动</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。可先补充文字，再重新分析。")}</p></section>`;
};

function restoredDashboardTopItems(limit = 10) {
  return flattenWatchlist()
    .map(item => ({ ...item, related: relatedVideoCount(item.name || ""), quote: restoredQuoteForItem(item) }))
    .sort((a, b) => Number(b.count || b.related || 0) - Number(a.count || a.related || 0))
    .slice(0, limit);
}

function restoredDashboardBars() {
  const rows = restoredDashboardTopItems(10);
  const max = Math.max(1, ...rows.map(row => Number(row.count || row.related || 0)));
  return rows.map(row => {
    const value = Number(row.count || row.related || 0);
    return `<div class="bar"><span>${escapeHtml(row.name || "-")}</span><i><em style="width:${Math.max(6, value / max * 100)}%"></em></i><b>${value}</b></div>`;
  }).join("") || `<div class="date">暂无热门标的。</div>`;
}

function restoredSectorRows(limit = 8) {
  try {
    return sectorRows().slice(0, limit);
  } catch {
    return tags.filter(t => t.type === "sector").slice(0, limit).map(t => ({ name: t.name, count: tagCount(t), tag: t }));
  }
}

function restoredDashboardFeedHtml(video) {
  const title = getVideoDetailTitle(video);
  const model = analysisModel(video, readVideoAnalyses()[video.id] || "", readStructuredAnalyses()[video.id] || null);
  const badges = uniqueClean([model.confidence === "high" ? "高置信" : "", video.topic, video.focus].filter(Boolean)).slice(0, 2);
  return `<article class="feed-card" onclick='openDetail(${JSON.stringify(video.id)})' style="cursor:pointer">
    <div class="date">${escapeHtml(video.date || "-")}</div>
    <h3>${escapeHtml(title)}</h3>
    <div class="tagline">${badges.map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
    <a href="javascript:void(0)">查看详情 →</a>
  </article>`;
}

function restoredMetadataRows(videos = []) {
  return videos.slice(0, 8).map(video => {
    const model = analysisModel(video, readVideoAnalyses()[video.id] || "", readStructuredAnalyses()[video.id] || null);
    return `<tr onclick='openDetail(${JSON.stringify(video.id)})'>
      <td>${escapeHtml(video.date || "-")}</td>
      <td>${escapeHtml(getVideoDetailTitle(video))}</td>
      <td>${escapeHtml(video.topic || video.focus || "模型先生")}</td>
      <td>${escapeHtml(`${video.likes || 0}赞 / ${video.comments || 0}评`)}</td>
      <td><span class="status-badge ${readStructuredAnalyses()[video.id] ? "ok" : "warn"}">${readStructuredAnalyses()[video.id] ? "已分析" : "待 AI"}</span></td>
      <td><button class="small-btn" onclick='event.stopPropagation();openDetail(${JSON.stringify(video.id)})'>进入</button></td>
    </tr>`;
  }).join("");
}

renderDashboard = function restoredOldStyleDashboard() {
  state.view = "dashboard";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const videos = restoredAllLibraryVideos();
  const structured = readStructuredAnalyses();
  const linked = readVideoLinks();
  const targetCount = Math.max(19, flattenWatchlist().filter(item => !/指数|大盘/.test(item.sector || item.group || "")).length || 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = videos.filter(video => String(video.date || "") === today).length;
  const highCount = videos.filter(video => (structured[video.id] || {}).confidence === "high" || video.confidence === "high").length;
  const riskCount = videos.filter(video => /风险|回避|谨慎|高位|追高/.test([video.title, video.transcript, JSON.stringify(structured[video.id] || {})].join(" "))).length;
  const linkedCount = Object.values(linked || {}).filter(item => uniqueClean([...(item.stocks || []), ...(item.sectors || []), ...(item.groups || [])]).length).length;
  const recent = videos.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 4);
  const rows = videos.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 8);
  const sectorItems = restoredSectorRows(8);
  main.innerHTML = `
    <section class="stats">
      <button class="stat" onclick="openStockProfiles()"><div><b>${targetCount}</b><span>关注标的</span></div></button>
      <button class="stat" onclick="openVideoLibrary()"><div><b>${videos.length}</b><span>分析视频</span></div></button>
      <button class="stat" onclick="openModelFramework()"><div><b>309</b><span>投资分析</span></div></button>
    </section>
    <section class="signal-grid">
      <button class="signal-card" onclick="openDailyReview()"><strong>今日新增观点</strong><b>${todayCount}</b><span>按视频日期统计，方便每天复盘。</span></button>
      <button class="signal-card" onclick="openPipelineCenter()"><strong>高置信度视频</strong><b>${highCount}</b><span>置信度 8 分以上，优先沉淀为笔记。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>风险预警视频</strong><b>${riskCount}</b><span>含风险、回避、追高等提示。</span></button>
      <button class="signal-card" onclick="openVideoLibrary()"><strong>待复核视频</strong><b>${Math.max(0, videos.length - Object.keys(structured || {}).length)}</b><span>未 AI 分析或低置信内容。</span></button>
      <button class="signal-card" onclick="openPipelineCenter()"><strong>已关联素材</strong><b>${linkedCount}</b><span>已进入标的/板块知识库。</span></button>
    </section>
    <section class="dash-grid">
      <div class="panel">
        <div class="panel-title">热门标的 TOP10</div>
        <div class="bars">${restoredDashboardBars()}</div>
      </div>
      <div class="panel">
        <div class="metadata-head" style="margin-bottom:8px"><div class="panel-title">行业分布 TOP8</div><button class="small-btn" onclick="openVideoGroupManager()">编辑</button></div>
        <div class="donut-wrap">
          <div class="donut"></div>
          <div class="legend">${sectorItems.map((row, i) => `<div onclick='filterByTag(${JSON.stringify(row.tag?.name || row.name)})'><span class="sw" style="background:${["#3c82f6","#8d5cf6","#19c98b","#f5a623","#ef4444","#22c3d6","#ec4899","#84cc16"][i]}"></span>${escapeHtml(row.name)}(${row.count})</div>`).join("")}</div>
        </div>
      </div>
    </section>
    <section class="feed">${recent.map(restoredDashboardFeedHtml).join("")}</section>
    <section class="panel" style="margin-top:12px">
      <div class="metadata-head">
        <div><div class="panel-title">最近评价</div><div class="date">用来替代零散的抖音元数据表：看哪些视频已转录、哪些还要 AI 分析。</div></div>
        <button class="small-btn" onclick="openVideoLibrary()">打开素材库</button>
      </div>
      <div class="metadata-table-wrap">
        <table class="metadata-table">
          <thead><tr><th>日期</th><th>视频标题</th><th>题材</th><th>互动</th><th>AI</th><th>操作</th></tr></thead>
          <tbody>${restoredMetadataRows(rows) || `<tr><td colspan="6">暂无素材。</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
};

function restoredPreviewStocks(group = {}, limit = 3) {
  const all = typeof groupStockItems === "function" ? groupStockItems(group) : restoredGroupStocks(group);
  const previewMap = typeof readWatchPreviewMap === "function" ? readWatchPreviewMap() : {};
  const key = typeof pathValue === "function" ? pathValue(arguments[2] || []) : "";
  const pickedNames = Array.isArray(previewMap[key]) ? previewMap[key] : [];
  const picked = pickedNames.length ? pickedNames.map(name => all.find(item => item.name === name)).filter(Boolean) : all.slice(0, limit);
  return picked.length ? picked : all.slice(0, limit);
}

watchGroupPreviewHtml = function restoredWatchGroupPreviewHtml(group, path = []) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const stocks = restoredPreviewStocks(group, 3, path);
  return `<div class="watch-group-preview">
    <div>${childCount} 分支 · ${total} 标的</div>
    ${stocks.map(item => `<button class="mini-watch-stock" onclick='event.stopPropagation();filterByStock(${JSON.stringify(item.name || "")})'>
      <span><b>${escapeHtml(item.name || "未命名")}</b><i class="dot ${item.status === "warn" ? "warn" : ""}"></i></span>
      ${quoteHtml(item) || `<em>${escapeHtml(item.quoteKey || item.sector || group.name || "未匹配行情")}</em>`}
    </button>`).join("")}
    <button class="small-btn" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button>
  </div>`;
};

function restoredProviderOptions() {
  const selected = localStorage.getItem("xiaoke_agent_provider") || "auto";
  const providers = [
    ["auto", "小可协作（自动分工）"],
    ["workbuddy", "WorkBuddy/自定义"],
    ["doubao", "豆包"],
    ["codebuddy", "CodeBuddy CLI"],
    ["openai", "OpenAI-compatible"]
  ];
  return providers.map(([id, name]) => `<option value="${id}" ${selected === id ? "selected" : ""}>${name}</option>`).join("");
}

function restoredAgentBubble(text, cls = "bot", route = "") {
  return `<div class="bubble ${cls}">${route ? `<span class="route">${escapeHtml(route)}</span>` : ""}${typeof formatAiText === "function" ? formatAiText(text) : escapeHtml(text)}</div>`;
}

renderAgent = function restoredCleanAgent() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  const currentChat = document.getElementById("agentChat")?.innerHTML;
  agent.innerHTML = `
    <div class="agent-head">
      <span>小可 Agent</span>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="localStorage.setItem('xiaoke_agent_provider', this.value);renderAgent()">${restoredProviderOptions()}</select>
        <span class="agent-status">自动分工：投资→WorkBuddy / 内容→豆包 / 系统→Codex</span>
        <button class="auto-btn" onclick="event.stopPropagation();showToast('自动分工已开启')">自动分工</button>
        <button class="config-btn" onclick="event.stopPropagation();openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="event.stopPropagation();toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles">
      <div class="role-card ready"><strong>小可课堂</strong><span>投资知识库 / 素材检索</span></div>
      <div class="role-card ready"><strong>WorkBuddy</strong><span>投资主脑 / 自定义模型</span></div>
      <div class="role-card ready"><strong>豆包</strong><span>内容总结 / 文档提炼</span></div>
      <div class="role-card ready"><strong>Codex</strong><span>系统维护 / 开发修复</span></div>
    </div>
    <div class="agent-tabs">
      ${["投资主脑","内容主脑","系统主脑","三脑复盘","查看证据","路由规则","诊断"].map((name, i) => `<button class="${i === 0 ? "primary" : ""}" onclick='event.stopPropagation();agentQuickAsk(${JSON.stringify(name)})'>${name}</button>`).join("")}
    </div>
    <div class="agent-chat" id="agentChat">${currentChat || restoredAgentBubble("你问股票时，我会先识别标的、同步行情、检索视频/书籍/记忆，再按数据前提、市场阶段、核心矛盾、观察清单、风险边界回答。", "bot", "小可课堂 / 投资知识库")}</div>
    <div class="agent-input">
      <input id="agentInput" placeholder="例如：模型先生怎么看中际旭创？分析寒武纪和光模块..." onkeydown="if(event.key==='Enter') sendAgentMessage()">
      <button onclick="sendAgentMessage()">发送</button>
    </div>
  `;
};

toggleAgent = function restoredToggleAgent() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  agent.classList.toggle("open");
  if (agent.classList.contains("open")) renderAgent();
};

function restoredCustomSectorBoards() {
  try {
    const rows = JSON.parse(localStorage.getItem("xiaoke_custom_sector_boards_v1") || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function saveRestoredCustomSectorBoards(rows) {
  localStorage.setItem("xiaoke_custom_sector_boards_v1", JSON.stringify(rows || []));
}

addCustomSectorBoard = function restoredAddCustomSectorBoard() {
  const name = prompt("板块/ETF 名称，例如：科创芯片ETF、CPO、机器人");
  if (!name) return;
  const pct = prompt("今日涨跌幅，例如：+1.23（没有可留空）", "");
  const source = prompt("数据来源，例如：东方财富板块/手动录入/QMT", "手动录入");
  const rows = restoredCustomSectorBoards();
  rows.push({ id: Date.now(), name: name.trim(), pct, source, children: "", note: "" });
  saveRestoredCustomSectorBoards(rows);
  renderSectorStrength();
};

editCustomSectorBoard = function restoredEditCustomSectorBoard(id) {
  const rows = restoredCustomSectorBoards();
  const row = rows.find(item => String(item.id) === String(id));
  if (!row) return;
  row.name = prompt("板块/ETF 名称", row.name) || row.name;
  row.pct = prompt("今日涨跌幅", row.pct || "") ?? row.pct;
  row.source = prompt("数据来源", row.source || "手动录入") || row.source;
  saveRestoredCustomSectorBoards(rows);
  renderSectorStrength();
};

renderSectorStrength = function restoredEditableSectorStrength() {
  state.view = "sectorStrength";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const normalRows = restoredTopGroups().map(row => ({ ...row, type: "group", source: "本地关注标的平均涨跌", name: row.group.name }));
  const customRows = restoredCustomSectorBoards().map(row => ({
    type: "custom",
    id: row.id,
    name: row.name,
    pct: Number(String(row.pct || "").replace("%", "")),
    stocks: [],
    branchNames: row.children ? String(row.children).split(/[、,，\s]+/).filter(Boolean) : ["自定义/ETF"],
    source: row.source || "手动录入"
  }));
  const rows = [...normalRows, ...customRows].sort((a, b) => (Number.isFinite(Number(b.pct)) ? Number(b.pct) : -999) - (Number.isFinite(Number(a.pct)) ? Number(a.pct) : -999));
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">板块强弱</div>
        <div class="date">这里只排板块分类。涨跌幅当前来自“本地关注标的平均涨跌”或你手动录入的东方财富/ETF数据；后续可接东方财富板块接口。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderSectorStrength)">刷新本地行情</button>
        <button class="small-btn" onclick="addCustomSectorBoard()">+自定义板块/ETF</button>
        <button class="small-btn" onclick="openVideoGroupManager()">导入产业链</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-title">板块分类排序</div>
      <div class="date" style="margin-bottom:10px">排序依据：涨跌幅优先，其次标的数量和细分数量。每行都标明来源，避免把推测当成数据。</div>
      <div class="stock-table-wrap">
        <table class="stock-table">
          <thead><tr><th>排序</th><th>板块</th><th>涨跌幅</th><th>标的数</th><th>细分分类</th><th>来源</th><th>操作</th></tr></thead>
          <tbody>
            ${rows.map((row, index) => {
              const pct = Number(row.pct);
              const cls = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
              return `<tr>
                <td>${index + 1}</td>
                <td><b>${escapeHtml(row.name)}</b></td>
                <td class="${cls}">${escapeHtml(restoredPctText(row.pct))}</td>
                <td>${row.stocks ? row.stocks.length : 0}</td>
                <td>${escapeHtml((row.branchNames || ["未细分"]).slice(0, 10).join("、"))}</td>
                <td>${escapeHtml(row.source || "待补来源")}</td>
                <td>${row.type === "group" ? `<button class="small-btn" onclick="openSectorDirectory([${row.index}])">打开细分</button>` : `<button class="small-btn" onclick="editCustomSectorBoard(${JSON.stringify(row.id)})">编辑</button>`}</td>
              </tr>`;
            }).join("") || `<tr><td colspan="7">暂无板块，先导入产业链或添加自定义板块。</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
};

function restoredFrameworkSources(keywords = []) {
  const words = keywords.map(word => String(word || "").trim()).filter(Boolean);
  return restoredAllLibraryVideos().filter(video => {
    const text = [getVideoDetailTitle(video), getVideoDetailTranscript(video), video.topic, video.focus].join(" ");
    return words.some(word => text.includes(word));
  }).slice(0, 4).map(video => `${getVideoDetailTitle(video)}（${video.date || "无日期"}）`);
}

function restoredFrameworkRules() {
  const defaults = [
    { id: "quality", title: "质变", keywords: ["质变", "变化", "催化"], note: "先找事情是否正在发生变化，再看变化是否被市场确认。", source: "本地视频/书籍关键词命中" },
    { id: "trend", title: "趋势", keywords: ["趋势", "主线", "顺势"], note: "主线向上时顺势观察，弱势时降低预期。", source: "本地视频/复盘规则" },
    { id: "buy", title: "买点", keywords: ["买点", "低吸", "回踩", "分歧"], note: "只在分歧、回踩、承接出现时观察，不追一致高潮。", source: "本地视频/手动策略" },
    { id: "wait", title: "等待", keywords: ["等待", "耐心", "守株待兔"], note: "看不懂时等待，让市场给二次确认。", source: "本地视频/手动策略" },
    { id: "risk", title: "风控", keywords: ["风险", "回避", "高位", "止损"], note: "风险边界比结论更重要，先定义错了怎么办。", source: "本地视频/手动策略" },
    { id: "position", title: "仓位", keywords: ["仓位", "加仓", "减仓", "试错"], note: "不确定时小仓试错，确认后再考虑提高仓位。", source: "我的策略/复盘规则" },
    { id: "execution", title: "交易执行", keywords: ["执行", "纪律", "复盘"], note: "每次操作都要记录假设、结果和修正。", source: "每日复盘/手动规则" }
  ];
  try {
    const saved = JSON.parse(localStorage.getItem("xiaoke_framework_rules_v1") || "[]");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  return defaults;
}

function saveRestoredFrameworkRules(rows) {
  localStorage.setItem("xiaoke_framework_rules_v1", JSON.stringify(rows || []));
}

editFrameworkRule = function restoredEditFrameworkRule(id) {
  const rows = restoredFrameworkRules();
  const row = rows.find(item => item.id === id);
  if (!row) return;
  row.title = prompt("标题", row.title) || row.title;
  row.keywords = (prompt("关键词，用顿号或逗号分隔", (row.keywords || []).join("、")) || "").split(/[、,，\s]+/).filter(Boolean);
  row.note = prompt("原则内容", row.note || "") || row.note;
  row.source = prompt("出处/来源", row.source || "手动规则") || row.source;
  saveRestoredFrameworkRules(rows);
  renderModelFramework();
};

renderModelFramework = function restoredEditableModelFramework() {
  state.view = "modelFramework";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const rows = restoredFrameworkRules();
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">分类依据：关键词命中次数、最近素材、手动规则。每条都显示出处；没有出处就标“手动规则/待补来源”。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openAgentWithQuestion('按当前素材总结模型先生框架', 'investment', true)">让 Agent 总结</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="decision-grid">
      ${rows.map(row => {
        const sources = restoredFrameworkSources(row.keywords || []);
        return `<article class="decision-card">
          <div class="decision-kicker"><span>${escapeHtml((row.keywords || []).join(" / "))}</span><button class="decision-chip" data-framework-edit="${escapeHtml(row.id)}">编辑</button></div>
          <h3>${escapeHtml(row.title)}</h3>
          <p style="line-height:1.7;color:#dce6f5">${escapeHtml(row.note || "")}</p>
          <div class="date" style="line-height:1.6">出处：${escapeHtml(sources.join("；") || row.source || "手动规则/待补来源")}</div>
        </article>`;
      }).join("")}
    </section>
    <section class="panel">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="side-note big" style="width:100%;min-height:160px" placeholder="例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(localStorage.getItem("xiaoke_manual_framework_note") || "")}</textarea>
      <div class="analysis-actions"><button class="small-btn" onclick="localStorage.setItem('xiaoke_manual_framework_note', this.closest('.panel').querySelector('textarea').value);showToast('已保存')">保存</button></div>
    </section>
  `;
};

openModelFramework = function restoredOpenModelFrameworkFinal() {
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  state.view = "modelFramework";
  restoredRenderShell();
  renderModelFramework();
};

function finalMiniWatchQuote(item = {}) {
  const quote = restoredQuoteForItem(item) || {};
  const price = quote.price == null || quote.price === "" ? "" : String(quote.price);
  const pct = Number(quote.pct);
  const pctText = Number.isFinite(pct) ? `${pct > 0 ? "+" : ""}${pct.toFixed(2)}%` : "";
  const cls = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
  if (!price && !pctText) return `<em>${escapeHtml(item.quoteKey || item.sector || item.group || "未匹配行情")}</em>`;
  return `<em class="${cls}" style="font-style:normal">${escapeHtml(price)} ${escapeHtml(pctText)}</em>`;
}

watchGroupPreviewHtml = function finalWatchGroupPreviewHtml(group, path = []) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const stocks = restoredPreviewStocks(group, 3, path);
  return `<div class="watch-group-preview">
    <div>${childCount} 分支 · ${total} 标的</div>
    ${stocks.map(item => `<button class="mini-watch-stock" onclick='event.stopPropagation();filterByStock(${JSON.stringify(item.name || "")})'>
      <span><b>${escapeHtml(item.name || "未命名")}</b><i class="dot ${item.status === "warn" ? "warn" : ""}"></i></span>
      ${finalMiniWatchQuote(item)}
    </button>`).join("")}
    <button class="small-btn" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button>
  </div>`;
};

restoredBriefMapForRows = async function finalBriefMapForRows(rows = []) {
  const keys = uniqueClean(rows.map(row => row.key || row.item?.quoteKey || row.item?.name || row.profile?.key || row.profile?.name).filter(Boolean)).slice(0, 80);
  const map = new Map();
  if (!keys.length) return map;
  const chunks = [];
  for (let i = 0; i < keys.length; i += 10) chunks.push(keys.slice(i, i + 10));
  await Promise.all(chunks.map(async chunk => {
    const data = await finalTimeout(
      fetch("/api/stock-brief?keys=" + encodeURIComponent(chunk.join(",")) + "&announcements=1&announcementLimit=1&announcementText=1&announcementTextLimit=800")
        .then(response => response.json()),
      16000,
      null
    );
    if (data && data.success && Array.isArray(data.items)) {
      data.items.forEach(item => {
        [item.key, item.name, item.localName].filter(Boolean).forEach(key => map.set(String(key).toLowerCase(), item));
      });
    }
  }));
  return map;
};

restoredShortFinancial = function finalShortFinancial(item = {}) {
  const parts = [
    item.financialReportDate ? String(item.financialReportDate).replace(/^20/, "") : "",
    item.revenue ? `营收${item.revenue}` : "",
    item.netProfit ? `净利${item.netProfit}` : "",
    item.roe !== undefined && item.roe !== "" ? `ROE${item.roe}%` : ""
  ].filter(Boolean);
  const text = compactPlainText(parts.join(" "), 20);
  return text || compactPlainText(item.financialSummary || item.profileNote || item.note || "", 20) || "财务待补";
};

restoredShortAnnouncement = function finalShortAnnouncement(item = {}) {
  const ann = (item.latestAnnouncements || [])[0] || {};
  return compactPlainText(ann.summary || ann.title || item.latestAnnouncement || item.announcementSummary || "", 20) || "公告待同步";
};

function finalReadVideoSideData(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function finalSaveVideoSideData(key, data) {
  localStorage.setItem(key, JSON.stringify(data || {}));
}

function finalParseSideRows(text = "") {
  return String(text || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, index) => ({ user: `@${index + 1}`, text: line, likes: "", time: "" }));
}

function finalVideoComments(video = {}) {
  const saved = finalReadVideoSideData("xiaoke_video_hot_comments_v1")[video.id];
  const raw = saved || video.hotComments || video.topComments || video.commentsList || [];
  if (Array.isArray(raw)) return raw.map((row, index) => typeof row === "string" ? { user: `@${index + 1}`, text: row } : row).slice(0, 20);
  return finalParseSideRows(raw).slice(0, 20);
}

function finalVideoInteractions(video = {}) {
  const saved = finalReadVideoSideData("xiaoke_video_author_interactions_v1")[video.id];
  const raw = saved || video.authorInteractions || video.bloggerInteractions || video.interactions || [];
  if (Array.isArray(raw)) return raw.map((row, index) => typeof row === "string" ? { user: `@${index + 1}`, text: row } : row).slice(0, 20);
  return finalParseSideRows(raw).slice(0, 20);
}

function importCurrentVideoComments() {
  const video = (state.videos || []).find(item => item.id === state.currentVideoId);
  if (!video) return;
  const text = prompt("粘贴高赞评论，每行一条。后续如果接抖音评论接口，这里会自动填。", "");
  if (text == null) return;
  const data = finalReadVideoSideData("xiaoke_video_hot_comments_v1");
  data[video.id] = finalParseSideRows(text);
  finalSaveVideoSideData("xiaoke_video_hot_comments_v1", data);
  showDetailTab("comments");
}

function importCurrentVideoInteractions() {
  const video = (state.videos || []).find(item => item.id === state.currentVideoId);
  if (!video) return;
  const text = prompt("粘贴博主回复/互动，每行一条。", "");
  if (text == null) return;
  const data = finalReadVideoSideData("xiaoke_video_author_interactions_v1");
  data[video.id] = finalParseSideRows(text);
  finalSaveVideoSideData("xiaoke_video_author_interactions_v1", data);
  showDetailTab("interaction");
}

function finalCommentListHtml(rows = [], emptyText = "暂无评论数据。可以先手动导入，后续再接抖音评论采集。") {
  if (!rows.length) return `<section class="panel"><div class="panel-title">暂无数据</div><p class="date">${escapeHtml(emptyText)}</p></section>`;
  return `<div class="comment-list">${rows.map((row, index) => `<article class="comment-card">
    <div class="comment-meta"><b>${escapeHtml(row.user || row.author || `@${index + 1}`)}</b><span>${escapeHtml(row.region || row.time || "")}</span><span>${row.likes ? `❤ ${escapeHtml(row.likes)}` : ""}</span></div>
    <p>${escapeHtml(row.text || row.content || row.comment || "")}</p>
    ${row.reply ? `<div class="author-reply">博主回复：${escapeHtml(row.reply)}</div>` : ""}
  </article>`).join("")}</div>`;
}

generateAiForCurrent = function finalGenerateAiForCurrent() {
  const id = state.currentVideoId;
  if (!id) return showToast("先打开一条视频");
  return generateVideoAIAnalysis(id, true);
};

renderDetail = function finalVideoDetailWithTabs() {
  state.view = "detail";
  renderTopChips();
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  const main = document.getElementById("main");
  if (!main) return;
  if (!video) return renderLibrary();
  const title = getVideoDetailTitle(video);
  const openUrl = video.documentUrl || video.originalUrl || "";
  const media = video.videoUrl
    ? `<video src="${video.videoUrl}" controls playsinline></video>`
    : `<div class="fallback-poster"><div style="font-size:48px">${video.isDocument ? "书" : "链"}</div><div>${escapeHtml(title)}</div>${openUrl ? `<button class="open-btn" style="max-width:220px;margin-top:16px" onclick='window.open(${JSON.stringify(openUrl)}, "_blank")'>打开原文</button>` : ""}</div>`;
  main.innerHTML = `
    <section class="detail">
      <div class="player">${media}</div>
      <div class="detail-main">
        <button class="small-btn" onclick="state.view='library';renderLibrary()">← 返回素材库</button>
        <h1 class="detail-title">${escapeHtml(title)}</h1>
        <div class="detail-meta"><span>${escapeHtml(video.author || "-")}</span><span>赞 ${video.likes || 0}</span><span>评 ${video.comments || 0}</span><span>转 ${video.shares || 0}</span><span>${escapeHtml(video.date || "-")}</span></div>
        ${detailTextPanel(video)}
        <div class="analysis-actions">
          <button class="small-btn" onclick="syncCurrentVideoTitle('${video.id}')">抓取标题</button>
          <button class="small-btn" onclick="syncVideoTitleFromFrame('${video.id}')">识别画面标题</button>
          <button class="small-btn" onclick="transcribeVideo('${video.id}')">语音转文字</button>
          <button class="open-btn" style="width:auto;padding:0 14px" onclick="generateVideoAIAnalysis('${video.id}', true)">生成 AI 分析</button>
        </div>
        <div class="tabs">
          <button class="tab" onclick="showDetailTab('transcript')">转录</button>
          <button class="tab" onclick="showDetailTab('comments')">高赞评论</button>
          <button class="tab" onclick="showDetailTab('interaction')">博主互动</button>
          <button class="tab active" onclick="showDetailTab('analysis')">AI分析</button>
        </div>
        <div id="detailContent">${analysisHtml(video)}</div>
      </div>
    </section>
  `;
};

showDetailTab = function finalShowDetailTab(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => {
    const text = btn.textContent || "";
    const active = (tab === "transcript" && text.includes("转录")) || (tab === "comments" && text.includes("评论")) || (tab === "interaction" && text.includes("互动")) || (tab === "analysis" && text.includes("AI"));
    btn.classList.toggle("active", active);
  });
  if (tab === "analysis") return void (box.innerHTML = analysisHtml(video));
  if (tab === "comments") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">高赞评论</div><div class="date">只展示评论摘要，作为情绪和反馈参考。</div></div><button class="small-btn" onclick="importCurrentVideoComments()">导入评论</button></div>${finalCommentListHtml(finalVideoComments(video), "暂无高赞评论。先点“导入评论”手动补，后续再接采集接口。")}</section>`;
    return;
  }
  if (tab === "interaction") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">博主互动</div><div class="date">记录博主点赞、回复和关键互动。</div></div><button class="small-btn" onclick="importCurrentVideoInteractions()">导入互动</button></div>${finalCommentListHtml(finalVideoInteractions(video), "暂无博主互动数据。")}</section>`;
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录正文</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。先点上方“语音转文字”，或把文字粘贴到转写框里。")}</p></section>`;
};

renderStockProfiles = async function finalStockProfilesWithBriefs() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">每张卡只显示最短财务和公告摘要；公告最多 20 字，避免铺满屏幕。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderStockProfiles)">刷新行情</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>`;
  main.innerHTML = `${header}<section class="panel"><div class="date">正在同步公告/财务短摘要...</div></section>`;
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles)
    .filter(row => !/指数|大盘/.test([row.item?.sector, row.item?.group, row.item?.groupChain, row.item?.name, row.profile?.sector].join(" ")))
    .slice(0, 60);
  const briefMap = await restoredBriefMapForRows(rows);
  rows.forEach(row => {
    const keys = [row.key, row.item?.quoteKey, row.item?.name, row.profile?.key, row.profile?.name].filter(Boolean).map(key => String(key).toLowerCase());
    row.brief = keys.map(key => briefMap.get(key)).find(Boolean) || row.brief || {};
  });
  main.innerHTML = `
    ${header}
    <section class="panel">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(restoredStockProfileCard).join("") || `<div class="panel">暂无股票档案。</div>`}
    </section>`;
};

renderModelFramework = function finalModelFrameworkEditable() {
  state.view = "modelFramework";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const rows = restoredFrameworkRules();
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">模型先生框架</div>
        <div class="date">分类依据：关键词命中次数、最近素材、手动规则。每条都显示出处；没有出处就标“手动规则/待补来源”。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openAgentWithQuestion('按当前素材总结模型先生框架', 'investment', true)">让 Agent 总结</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="decision-grid">
      ${rows.map(row => {
        const sources = restoredFrameworkSources(row.keywords || []);
        return `<article class="decision-card">
          <div class="decision-kicker"><span>${escapeHtml((row.keywords || []).join(" / "))}</span><button class="decision-chip" data-framework-edit="${escapeHtml(row.id)}">编辑</button></div>
          <h3>${escapeHtml(row.title)}</h3>
          <p style="line-height:1.7;color:#dce6f5">${escapeHtml(row.note || "")}</p>
          <div class="date" style="line-height:1.6">出处：${escapeHtml(sources.join("；") || row.source || "手动规则/待补来源")}</div>
        </article>`;
      }).join("")}
    </section>
    <section class="panel">
      <div class="panel-title">手动沉淀原则</div>
      <textarea class="side-note big" style="width:100%;min-height:160px" placeholder="例如：只在分歧后看承接，不在一致高潮追高。">${escapeHtml(localStorage.getItem("xiaoke_manual_framework_note") || "")}</textarea>
      <div class="analysis-actions"><button class="small-btn" onclick="localStorage.setItem('xiaoke_manual_framework_note', this.closest('.panel').querySelector('textarea').value);showToast('已保存')">保存</button></div>
    </section>`;
};

openModelFramework = function finalOpenModelFramework() {
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  state.view = "modelFramework";
  restoredRenderShell();
  renderModelFramework();
};

document.addEventListener("click", event => {
  const editButton = event.target && event.target.closest ? event.target.closest("[data-framework-edit]") : null;
  if (!editButton) return;
  event.preventDefault();
  event.stopPropagation();
  editFrameworkRule(editButton.getAttribute("data-framework-edit"));
});

function xiaokeTrueFinalCss() {
  if (document.getElementById("xiaoke_true_final_css")) return;
  const style = document.createElement("style");
  style.id = "xiaoke_true_final_css";
  style.textContent = `
    .watch-group-preview{display:grid;gap:8px}
    .watch-preview-row{display:block;width:100%;text-align:left;background:transparent;border:0;border-radius:6px;padding:0;color:inherit;cursor:pointer}
    .watch-preview-row:hover b{color:#fff}
    .watch-preview-row b{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:#e9f2ff}
    .watch-preview-row .quote-line{display:flex;gap:7px;align-items:center;font-weight:800;margin-top:3px}
    .watch-preview-row .quote-line b{font-size:15px}
    .watch-preview-row .watch-meta{font-size:11px;color:#8ea0ba;line-height:1.55;margin-top:2px}
    .watch-preview-row .watch-desc{font-size:11px;color:#95a5bd;line-height:1.55;margin:2px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .watch-item .stock-actions{margin-left:auto;display:inline-flex;gap:4px}
    .watch-item .stock-actions button{border:0;border-radius:5px;background:#1f2a3c;color:#bed2f4;font-size:11px;padding:2px 5px;cursor:pointer}
    .agent-head-title{display:flex;align-items:center;gap:8px;font-weight:800}
    .agent-roles{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
    .agent-tabs{display:flex;gap:8px;overflow:auto;padding-bottom:6px}
    .sector-source-note{font-size:12px;color:#8ea0ba;line-height:1.7;margin-top:8px}
    .stock-card-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
    .video-grid{align-items:start}
  `;
  document.head.appendChild(style);
}

function xiaokeBoardExclude(name = "") {
  return /交易系统|投资哲学|宏观周期|书籍|全部|大盘|指数|我的策略|每日复盘|能力中心|管理分组/i.test(String(name || ""));
}

async function xiaokeFetchSectorQuoteMap(names = []) {
  const clean = uniqueClean((names || []).filter(name => name && !xiaokeBoardExclude(name))).slice(0, 80);
  if (!clean.length) return new Map();
  try {
    const res = await fetch("/api/sector-quotes?names=" + encodeURIComponent(clean.join(",")));
    const data = await res.json().catch(() => ({}));
    const map = new Map();
    (data.items || []).forEach(item => {
      if (item && item.query) map.set(item.query, item);
      if (item && item.name) map.set(item.name, item);
    });
    return map;
  } catch {
    return new Map();
  }
}

restoredRenderRightPane = function xiaokeTrueFinalRightPane() {
  const pane = document.getElementById("rightPane");
  if (!pane) return;
  let themeTags = [];
  let boardRows = [];
  try {
    themeTags = allVideoTags().filter(t => t.type !== "all" && t.type !== "source" && !xiaokeBoardExclude(t.name)).slice(0, 10);
  } catch {}
  try {
    boardRows = restoredTopGroups().filter(row => !xiaokeBoardExclude(row.group?.name)).slice(0, 8);
  } catch {}
  pane.innerHTML = `
    <div class="profile"><div class="avatar"><img src="assets/xiaoke-icon-64.png" alt=""></div><div><b>小可课堂</b><span>投资课堂 · 认知复盘</span></div></div>
    <div class="side-section"><button class="open-btn" onclick="openFeatureList()">查看功能清单</button></div>
    <textarea class="side-note quote-note" oninput="saveSidebarQuote(this.value)">${escapeHtml(typeof sidebarQuoteText === "function" ? sidebarQuoteText() : "静等花开，自律人生")}</textarea>
    <div class="side-section">
      <div class="side-title">主题笔记</div>
      <div class="tag-cloud">${themeTags.map(t => `<button class="tag" onclick='filterByTag(${JSON.stringify(t.name)})'>${escapeHtml(finalTagLabel(t))}</button>`).join("") || `<span class="date">暂无主题</span>`}</div>
    </div>
    <div class="side-section">
      <div class="side-title">题材/产业分布</div>
      <div class="tag-cloud">${boardRows.map(row => `<button class="tag mid" onclick='openSectorDirectory([${row.index}])'>${escapeHtml(row.group.name)}(${countGroupItems(row.group)})</button>`).join("") || `<span class="date">暂无产业分组</span>`}</div>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">每日任务</div>
      <textarea class="side-note big" id="dailyTaskBox" oninput="saveRightNote('task', this.value)" placeholder="直接写今天要做的事：复盘视频、补行情代码、整理长鑫产业链...">${escapeHtml(localStorage.getItem(DAILY_TASK_KEY) || "")}</textarea>
    </div>
    <div class="side-section workbench-section">
      <div class="side-title">今日关注</div>
      <textarea class="side-note" id="dailyFocusBox" oninput="saveRightNote('focus', this.value)" placeholder="例如：长鑫存储、光模块、科创芯片、大盘风险...">${escapeHtml(localStorage.getItem(DAILY_FOCUS_KEY) || "")}</textarea>
    </div>`;
};

xiaokeQuoteParts = function xiaokeTrueFinalQuoteParts(item = {}) {
  const quote = restoredQuoteForItem(item) || item || {};
  const priceNum = Number(quote.price);
  const changeNum = Number(quote.change);
  const pctNum = Number(quote.pct);
  const price = Number.isFinite(priceNum) ? priceNum.toFixed(priceNum >= 100 ? 2 : 2).replace(/\.00$/, "") : "";
  const change = Number.isFinite(changeNum) ? `${changeNum > 0 ? "+" : ""}${changeNum.toFixed(2)}` : "";
  const pctText = Number.isFinite(pctNum) ? `${pctNum > 0 ? "+" : ""}${pctNum.toFixed(2)}%` : "";
  const cls = Number.isFinite(pctNum) ? (pctNum >= 0 ? "up" : "down") : "flat";
  return { price, change, pctText, cls };
};

function xiaokeTrueFinalWatchItem(item = {}, group = {}, groupIndex = 0, itemIndex = 0) {
  const quote = xiaokeQuoteParts(item);
  return `<div class="watch-item" onclick="filterByStock(${JSON.stringify(item.name || "")})">
    <div class="wi-head">
      <span>${escapeHtml(item.name || "未命名")}</span><span class="dot ${item.status === "warn" ? "warn" : ""}"></span>
      <span class="stock-actions" onclick="event.stopPropagation()">
        <button onclick="editStockTarget([${groupIndex}], ${itemIndex}); event.stopPropagation()">改</button>
        <button onclick="deleteStockTarget([${groupIndex}], ${itemIndex}); event.stopPropagation()">删</button>
      </span>
    </div>
    ${quote.price || quote.pctText ? `<div class="quote-line ${quote.cls}"><b>${escapeHtml(quote.price || "-")}</b><span>${escapeHtml(quote.change)}</span><span>${escapeHtml(quote.pctText)}</span></div>` : `<div class="quote-missing">未填行情代码</div>`}
    <div class="wi-sub"><span>${Number(item.count || 0)}次</span><span>${escapeHtml(item.sector || group.name || "")}</span><span>相关 ${relatedVideoCount(item.name || "")} 条</span></div>
    <div class="wi-desc">${escapeHtml(relatedVideoDigest(item.name || "") || item.desc || "新增关注标的，等待后续补充观察逻辑。")}</div>
  </div>`;
}

renderWatchlistPane = function xiaokeTrueFinalWatchlistPane() {
  const groups = readWatchGroups();
  const total = groups.reduce((sum, group) => sum + countGroupItems(group), 0);
  const pane = document.getElementById("leftPane");
  if (!pane) return;
  pane.innerHTML = `
    <div class="left-head">
      <div><div class="left-title">关注标的</div><div class="left-count">${total} 个标的</div></div>
      <button class="add-stock" onclick="openStockModal()">+添加</button>
    </div>
    ${groups.map((group, groupIndex) => {
      const collapsed = isWatchGroupCollapsed(group, [groupIndex]);
      return `<section class="watch-group">
        <div class="group-title-row">
          <button class="group-title" onclick="openSectorDirectory([${groupIndex}])">
            <span>${escapeHtml(group.name || "未命名分组")}</span><em>${countGroupItems(group)}</em>
          </button>
          <button class="group-toggle" title="${collapsed ? "展开" : "收起"}" onclick="event.stopPropagation();toggleWatchGroup([${groupIndex}])">${collapsed ? "+" : "-"}</button>
        </div>
        ${collapsed ? watchGroupPreviewHtml(group, [groupIndex]) : ""}
        <div class="group-items ${collapsed ? "collapsed" : ""}" id="watch_group_${groupIndex}">
          ${(collapsed ? [] : (group.items || []).slice(0, 40)).map((item, itemIndex) => xiaokeTrueFinalWatchItem(item, group, groupIndex, itemIndex)).join("")}
        </div>
      </section>`;
    }).join("")}
    <button class="compare" onclick="showToast('对比分析已准备好')">对比分析 (0/4)</button>
  `;
};

watchGroupPreviewHtml = function xiaokeTrueFinalWatchGroupPreview(group, path = []) {
  const total = countGroupItems(group);
  const childCount = (group.children || []).length;
  const stocks = restoredPreviewStocks(group, 3, path);
  return `<div class="watch-group-preview">
    <div>${childCount} 分支 · ${total} 标的</div>
    ${stocks.map(item => {
      const quote = xiaokeQuoteParts(item);
      return `<button class="watch-preview-row" onclick='event.stopPropagation();filterByStock(${JSON.stringify(item.name || "")})'>
        <b>${escapeHtml(item.name || "未命名")}<i class="dot ${item.status === "warn" ? "warn" : ""}"></i></b>
        ${quote.price || quote.pctText ? `<div class="quote-line ${quote.cls}"><b>${escapeHtml(quote.price || "-")}</b><span>${escapeHtml([quote.change, quote.pctText].filter(Boolean).join("  "))}</span></div>` : ""}
        <div class="watch-meta">${escapeHtml([item.hitCount ? `${item.hitCount}次` : "0次", item.sector || item.group || group.name || "", item.relatedCount != null ? `相关 ${item.relatedCount} 条` : ""].filter(Boolean).join("  "))}</div>
        <p class="watch-desc">${escapeHtml(item.desc || item.note || "新增关注标的，等待后续补充观察逻辑。")}</p>
      </button>`;
    }).join("")}
    <button class="small-btn" onclick="event.stopPropagation();setWatchGroupPreviewItems([${path.join(",")}])">选择显示</button>
  </div>`;
};

filteredVideos = function xiaokeTrueFinalFilteredVideos() {
  const q = finalCleanSearchQuery();
  const active = allVideoTags().find(tag => tag.name === state.activeTag || tag.originalName === state.activeTag) || allVideoTags()[0] || { type: "all", name: "全部" };
  const names = [active.name, active.originalName, finalTagLabel(active)].filter(Boolean);
  return restoredAllLibraryVideos().filter(video => {
    const text = typeof finalVideoText === "function"
      ? finalVideoText(video)
      : [video.title, video.topic, video.focus, video.transcript, video.author, ...videoGroupsFor(video.id)].join(" ");
    const isAll = !active || active.type === "all" || names.includes("全部") || names.includes("全部视频");
    const byTag = isAll || (active.type === "source" ? isModelTeacherVideo(video) : names.some(name => text.includes(name)));
    const bySearch = !q || text.toLowerCase().includes(q);
    return byTag && bySearch;
  }).sort((a, b) => {
    if (state.sort === "likes") return Number(b.likes || 0) - Number(a.likes || 0);
    if (state.sort === "title") return quickVideoTitle(a).localeCompare(quickVideoTitle(b), "zh-Hans");
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
};

renderLibrary = function xiaokeTrueFinalRenderLibrary() {
  state.view = "library";
  restoredRenderShell();
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

showDetailTab = function xiaokeTrueFinalShowDetailTab(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => {
    const text = btn.textContent || "";
    const active = (tab === "transcript" && text.includes("转录")) || (tab === "comments" && text.includes("评论")) || (tab === "interaction" && text.includes("互动")) || (tab === "analysis" && text.includes("AI"));
    btn.classList.toggle("active", active);
  });
  if (tab === "analysis") return void (box.innerHTML = analysisHtml(video));
  if (tab === "comments") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">高赞评论</div><div class="date">优先自动抓抖音原链接；失败时可以手动导入，页面不会卡死。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoComments()">手动导入</button></div></div>${finalCommentListHtml(finalVideoComments(video), "暂无高赞评论。点“自动抓取抖音”，没有原链接时再手动导入。")}</section>`;
    return;
  }
  if (tab === "interaction") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">博主互动</div><div class="date">展示博主回复、点赞互动等高价值反馈。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoInteractions()">手动导入</button></div></div>${finalCommentListHtml(finalVideoInteractions(video), "暂无博主互动数据。")}</section>`;
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录正文</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。先点上方“语音转文字”，或把文字粘贴到转写框里。")}</p></section>`;
};

renderStockProfiles = async function xiaokeTrueFinalStockProfiles() {
  state.view = "stockProfiles";
  renderTopChips();
  const main = document.getElementById("main");
  if (!main) return;
  const header = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">股票档案</div>
        <div class="date">自动从腾讯行情、东方财富财务、巨潮公告取数；公告和财务只保留短摘要。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="openStockProfileEditor({})">新增档案</button>
        <button class="small-btn" onclick="autoFillVisibleStockProfiles()">自动补全本页</button>
        <button class="small-btn" onclick="refreshMarketIndexes().then(renderStockProfiles)">刷新行情</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>`;
  main.innerHTML = `${header}<section class="panel"><div class="date">正在同步行情、公告和财务摘要...</div></section>`;
  const profiles = await finalSafeFetchStockProfiles();
  const rows = finalBuildStockProfileRows(profiles)
    .filter(row => !/指数|大盘/.test([row.item?.sector, row.item?.group, row.item?.groupChain, row.item?.name, row.profile?.sector].join(" ")))
    .slice(0, 80);
  const briefMap = await restoredBriefMapForRows(rows);
  rows.forEach(row => {
    const keys = [row.key, row.item?.quoteKey, row.item?.name, row.profile?.key, row.profile?.name].filter(Boolean).map(key => String(key).toLowerCase());
    row.brief = keys.map(key => briefMap.get(key)).find(Boolean) || row.brief || {};
  });
  main.innerHTML = `
    ${header}
    <section class="panel">
      <div class="panel-title">快速建档</div>
      <div class="library-search-row" style="margin:0">
        <label class="library-search"><span>搜索</span><input id="stockProfileSearchInput" placeholder="输入股票名或代码"></label>
        <button class="open-btn" style="width:auto;padding:0 16px" onclick="searchAndSaveStockProfile()">搜索并建立档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
      </div>
    </section>
    <section class="stock-profile-grid" style="margin-top:12px">
      ${rows.map(restoredStockProfileCard).join("") || `<div class="panel">暂无股票档案。</div>`}
    </section>`;
};

const XIAOKE_AGENT_SIZE_KEY = "xiaoke_agent_size_v1";
const XIAOKE_AGENT_LAYOUT_KEY = "xiaoke_agent_layout_v1";

function setAgentSize(size = "normal") {
  const current = localStorage.getItem(XIAOKE_AGENT_SIZE_KEY) || "normal";
  const requested = size === "fullscreen" && current === "fullscreen" ? "normal" : size;
  const next = ["small", "normal", "large", "fullscreen", "custom"].includes(requested) ? requested : "normal";
  localStorage.setItem(XIAOKE_AGENT_SIZE_KEY, next);
  if (next !== "custom") localStorage.removeItem(XIAOKE_AGENT_LAYOUT_KEY);
  applyAgentSize();
}

function applyAgentSize() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  const size = localStorage.getItem(XIAOKE_AGENT_SIZE_KEY) || "normal";
  agent.classList.toggle("agent-small", size === "small");
  agent.classList.toggle("agent-large", size === "large");
  agent.classList.toggle("agent-fullscreen", size === "fullscreen");
  ["left", "top", "right", "bottom", "width", "height"].forEach(key => agent.style[key] = "");
  if (size === "custom") {
    try {
      const layout = JSON.parse(localStorage.getItem(XIAOKE_AGENT_LAYOUT_KEY) || "{}");
      const width = Math.min(Number(layout.width || 680), window.innerWidth - 16);
      const height = Math.min(Number(layout.height || 620), window.innerHeight - 16);
      const left = Math.max(8, Math.min(Number(layout.left || 8), window.innerWidth - width - 8));
      const top = Math.max(8, Math.min(Number(layout.top || 8), window.innerHeight - height - 8));
      Object.assign(agent.style, { left: `${left}px`, top: `${top}px`, right: "auto", bottom: "auto", width: `${width}px`, height: `${height}px` });
    } catch {}
  }
  ensureAgentResizeObserver();
}

function saveAgentLayout() {
  const agent = document.getElementById("agent");
  if (!agent || agent.classList.contains("agent-fullscreen")) return;
  const rect = agent.getBoundingClientRect();
  localStorage.setItem(XIAOKE_AGENT_SIZE_KEY, "custom");
  localStorage.setItem(XIAOKE_AGENT_LAYOUT_KEY, JSON.stringify({ left: rect.left, top: rect.top, width: rect.width, height: rect.height }));
}

function startAgentDrag(event) {
  if (event.button !== 0 || event.target.closest("button,select,input")) return;
  const agent = document.getElementById("agent");
  if (!agent || agent.classList.contains("agent-fullscreen")) return;
  event.preventDefault();
  const rect = agent.getBoundingClientRect();
  const startX = event.clientX;
  const startY = event.clientY;
  Object.assign(agent.style, { left: `${rect.left}px`, top: `${rect.top}px`, right: "auto", bottom: "auto", width: `${rect.width}px`, height: `${rect.height}px` });
  agent.classList.remove("agent-small", "agent-large");
  const move = moveEvent => {
    const left = Math.max(0, Math.min(rect.left + moveEvent.clientX - startX, window.innerWidth - agent.offsetWidth));
    const top = Math.max(0, Math.min(rect.top + moveEvent.clientY - startY, window.innerHeight - agent.offsetHeight));
    agent.style.left = `${left}px`;
    agent.style.top = `${top}px`;
  };
  const stop = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    saveAgentLayout();
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop, { once: true });
}

function ensureAgentResizeObserver() {
  const agent = document.getElementById("agent");
  if (!agent || window.__xiaokeAgentResizeTarget === agent) return;
  if (window.__xiaokeAgentResizeObserver) window.__xiaokeAgentResizeObserver.disconnect();
  let timer = null;
  window.__xiaokeAgentResizeObserver = new ResizeObserver(() => {
    if (!agent.classList.contains("open") || agent.classList.contains("agent-fullscreen")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (agent.style.width && agent.style.height) saveAgentLayout();
    }, 250);
  });
  window.__xiaokeAgentResizeObserver.observe(agent);
  window.__xiaokeAgentResizeTarget = agent;
}

function xiaokeCompactAgentAnswer(value = "") {
  const raw = String(value || "").replace(/\r/g, "").trim();
  if (!raw) return "暂无有效回答。";
  const seen = new Set();
  const lines = raw.split(/\n+/).map(line => line.trim()).filter(Boolean).filter(line => {
    const key = line.replace(/^[#*\-\d.、\s]+/, "").replace(/\s+/g, "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
  const compact = lines.join("\n");
  return compact.length > 520 ? compact.slice(0, 519).replace(/[，,；;：:\s]+$/, "") + "…" : compact;
}

function xiaokeProfessionalAgentAnswer(value = "", briefs = [], evidence = []) {
  const raw = String(value || "").replace(/\r/g, "").trim();
  const required = ["核心观点", "基本面分析", "技术位置", "观察与应对", "风险提示", "来源与覆盖"];
  if (raw && required.filter(title => raw.includes(title)).length >= 5) {
    const supplement = xiaokeTrackingMarkdown(briefs, window.currentAgentPeerBriefs || [], window.currentAgentChangeSnapshot);
    const qualitySupplement = xiaokeResearchQualityMarkdown(window.currentAgentResearchQuality, window.currentAgentScenarioMatrix);
    return `${raw}${/同行横向|版本变化|较上次/.test(raw) ? "" : `\n\n${supplement}`}${/资料完备度|条件情景|偏强情景/.test(raw) ? "" : `\n\n${qualitySupplement}`}`.slice(0, 9000);
  }
  const item = briefs[0] || {};
  const technical = item.technical || {};
  const name = item.localName || item.name || item.key || "当前标的";
  const grossMargin = Number(item.grossMargin);
  const netMargin = Number(item.netMargin);
  const pe = Number(item.pe);
  const qualityNotes = [
    Number.isFinite(grossMargin) && grossMargin < 10 ? `毛利率 ${grossMargin}% 偏低，商业模式定价能力需要谨慎验证` : "",
    Number.isFinite(netMargin) && netMargin < 3 ? `净利率 ${netMargin}% 偏低，利润安全垫较薄` : "",
    Number.isFinite(pe) && pe > 100 ? `PE ${pe} 倍处于高估值区，业绩兑现要求较高` : ""
  ].filter(Boolean);
  const coreView = qualityNotes.length
    ? `${name}当前更适合作为风险复盘和等待确认标的。${qualityNotes.join("；")}。${technical.trend ? `技术结构为${technical.trend}。` : ""}`
    : `${name}当前数据尚不足以形成高置信度结论，先按财务质量、估值和技术结构继续观察。`;
  const metrics = [
    item.financialReportDate && `财报期 ${item.financialReportDate}`,
    item.revenue && `营收 ${item.revenue}`,
    item.netProfit && `归母净利 ${item.netProfit}`,
    item.revenueGrowth !== undefined && item.revenueGrowth !== "" && `营收同比 ${item.revenueGrowth}%`,
    item.profitGrowth !== undefined && item.profitGrowth !== "" && `利润同比 ${item.profitGrowth}%`,
    item.grossMargin !== undefined && item.grossMargin !== "" && `毛利率 ${item.grossMargin}%`,
    item.netMargin !== undefined && item.netMargin !== "" && `净利率 ${item.netMargin}%`,
    item.roe !== undefined && item.roe !== "" && `ROE ${item.roe}%`,
    item.pe && `PE ${item.pe}`,
    item.pb && `PB ${item.pb}`,
    item.marketCap && `市值 ${item.marketCap}`
  ].filter(Boolean);
  const direct = evidence.some(entry => String(entry.title || entry.name || "").includes(name));
  return [
    `# ${name} 投资分析`,
    "## 1. 核心观点",
    coreView,
    "## 2. 基本面分析",
    metrics.length ? metrics.map(metric => `- ${metric}`).join("\n") : "- 本轮未取得有效财务字段，需要补齐财务数据后复核。",
    xiaokeTrackingMarkdown(briefs, window.currentAgentPeerBriefs || [], window.currentAgentChangeSnapshot),
    xiaokeResearchQualityMarkdown(window.currentAgentResearchQuality, window.currentAgentScenarioMatrix),
    "## 3. 技术位置与多周期趋势",
    technical.asOf ? `- 数据日期：${technical.asOf}；趋势：${technical.trend}；MA5/20/60：${technical.ma5}/${technical.ma20}/${technical.ma60}。\n- 5/20/60日表现：${signedText(technical.return5, "%")} / ${signedText(technical.return20, "%")} / ${signedText(technical.return60, "%")}；20日区间 ${technical.low20}-${technical.high20}，位置 ${technical.position20}%。\n- 短期（1-3个月）：先看能否收复 MA20(${technical.ma20}) 并改善量能。\n- 中期（3-12个月）：只有站稳 MA60(${technical.ma60}) 且财务趋势改善，才视为结构转强。\n- 长期（1年以上）：取决于盈利质量与商业模式是否发生可验证变化。` : "- 历史日线未取得，暂不判断技术趋势。",
    "## 4. 观察与应对",
    technical.asOf ? `- 当前判断：${technical.trend}，等待价格与量能共同确认。\n- 确认条件：有效站上 ${technical.high20}，且量能比高于 1.2。\n- 失效条件：跌破 ${technical.low20}，或持续位于 MA20(${technical.ma20}) 下方。` : "- 数据不足，先补齐历史日线和最新公告。",
    "## 5. 风险提示",
    "- 估值、盈利质量、题材退潮和技术结构破位均可能推翻当前判断；缺失字段不作正向推断。",
    "## 6. 来源与覆盖",
    `- 行情：${item.quoteSource || item.source || "未取得"}；财务：${item.financialSource || "未取得"}；技术：${technical.source || "未取得"}。`,
    `- 本地知识库：${direct ? "检索到与该标的直接相关的素材，仍需核对原文语境。" : "未检索到模型先生直接讨论该标的的强证据，本报告属于公开数据 + 投资框架推断。"}`,
    "- 仅用于研究复盘，不构成确定性买卖指令。"
  ].join("\n\n").slice(0, 9000);
}

function xiaokeTrackingMarkdown(briefs = [], peers = [], snapshot = null) {
  const primary = briefs[0] || {};
  const peerLines = peers.length ? peers.slice(0, 4).map(item => `- ${item.localName || item.name || item.key}：PE ${metricValueText(item.pe)}，毛利率 ${metricValueText(item.grossMargin, "%")}，净利率 ${metricValueText(item.netMargin, "%")}，ROE ${metricValueText(item.roe, "%")}`).join("\n") : "- 未建立同行样本：关注分组中没有同板块且数据可核验的标的。";
  const primaryLine = primary.localName || primary.name || primary.key ? `- 本标的：${primary.localName || primary.name || primary.key}，PE ${metricValueText(primary.pe)}，毛利率 ${metricValueText(primary.grossMargin, "%")}，净利率 ${metricValueText(primary.netMargin, "%")}，ROE ${metricValueText(primary.roe, "%")}` : "";
  let changes = "- 首次分析，本次建立财务与公告基线。";
  if (snapshot && !snapshot.baseline) {
    const finance = snapshot.financialChanges?.length ? snapshot.financialChanges.slice(0, 6).map(item => `${item.label} ${item.previous}→${item.current}`).join("；") : "财务字段未发现变化";
    const news = snapshot.newAnnouncements?.length ? snapshot.newAnnouncements.slice(0, 3).map(item => `${item.date || "-"} ${item.title || "公告"}`).join("；") : "未发现新增公告";
    changes = `- 较上次研报：${finance}。\n- 公告增量：${news}。${snapshot.newRiskTags?.length ? `新增风险标签：${snapshot.newRiskTags.join("、")}。` : ""}`;
  }
  return `### 同行横向与版本变化\n${primaryLine}\n${peerLines}\n${changes}`;
}

function xiaokeResearchQualityMarkdown(quality, scenarios) {
  if (!quality) return "### 研究质量与条件情景\n- 当前未形成可评分的数据包，结论只能作为资料整理。";
  const checks = quality.checks.map(row => `- ${row.label}：${row.score}/${row.max}（${row.note}）`).join("\n");
  const gaps = quality.missing.length ? quality.missing.join("；") : "无显著缺口";
  const rows = (scenarios?.rows || []).map(row => `- **${row.name}**：${row.condition}；${row.fundamental}；${row.action}。`).join("\n");
  return `### 研究质量与条件情景\n- 资料完备度：${quality.score}/100（${quality.grade}级）。该分数只衡量资料质量，不代表上涨概率或投资评级。\n${checks}\n- 待补缺口：${gaps}。\n${rows || "- 数据不足，暂不生成情景推演。"}`;
}

function xiaokeAgentInlineMarkdown(value = "") {
  return escapeHtml(String(value || ""))
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function xiaokeAgentAnswerHtml(value = "", responseMode = "concise") {
  if (responseMode !== "professional") return `<div class="agent-answer-compact">${escapeHtml(value).replace(/\n/g, "<br>")}</div>`;
  const lines = String(value || "").replace(/\r/g, "").split("\n");
  const output = [];
  let listOpen = false;
  const closeList = () => {
    if (listOpen) output.push("</ul>");
    listOpen = false;
  };
  lines.forEach(line => {
    const text = line.trim();
    if (!text) {
      closeList();
      return;
    }
    const heading = text.match(/^(#{1,4})\s*(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length <= 1 ? "h2" : "h3";
      output.push(`<${level}>${xiaokeAgentInlineMarkdown(heading[2])}</${level}>`);
      return;
    }
    const bullet = text.match(/^(?:[-*•]|\d+[.、])\s*(.+)$/);
    if (bullet) {
      if (!listOpen) output.push("<ul>");
      listOpen = true;
      output.push(`<li>${xiaokeAgentInlineMarkdown(bullet[1])}</li>`);
      return;
    }
    closeList();
    output.push(`<p>${xiaokeAgentInlineMarkdown(text)}</p>`);
  });
  closeList();
  return `<article class="agent-professional-report">${output.join("")}</article>`;
}

const XIAOKE_AGENT_REPORTS_KEY = "xiaoke_agent_professional_reports_v1";

function readAgentReports() {
  try {
    const rows = JSON.parse(localStorage.getItem(XIAOKE_AGENT_REPORTS_KEY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeAgentReports(rows = []) {
  localStorage.setItem(XIAOKE_AGENT_REPORTS_KEY, JSON.stringify(rows.slice(0, 60)));
}

function agentReportStockName(report = {}) {
  return (report.stockBriefs || []).map(item => item.localName || item.name || item.key).filter(Boolean).join("、") || agentClip(report.user || "未命名研报", 24);
}

function saveAgentReportRecord(turn = window.lastAgentTurn, silent = false) {
  if (!turn || !turn.assistant) {
    if (!silent) showToast("当前没有可保存的专业研报");
    return null;
  }
  const rows = readAgentReports();
  const id = turn.reportId || `report_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const record = {
    id,
    user: turn.user || "",
    assistant: turn.assistant || "",
    route: turn.route || "",
    at: turn.at || new Date().toISOString(),
    stockBriefs: turn.stockBriefs || [],
    peerBriefs: turn.peerBriefs || [],
    changeSnapshot: turn.changeSnapshot || null,
    researchQuality: turn.researchQuality || null,
    scenarioMatrix: turn.scenarioMatrix || null,
    evidence: (turn.evidence || []).slice(0, 8).map(item => ({ id: item.id, title: item.title, date: item.date, type: item.type }))
  };
  const next = [record, ...rows.filter(item => item.id !== id)];
  try {
    writeAgentReports(next);
    turn.reportId = id;
    if (!silent) showToast("专业研报已保存");
    return record;
  } catch (error) {
    if (!silent) showToast("保存失败：浏览器存储空间不足");
    return null;
  }
}

function saveCurrentAgentReport() {
  saveAgentReportRecord(window.lastAgentTurn, false);
}

function exportAgentReport(reportId = "") {
  const report = (reportId ? readAgentReports().find(item => item.id === reportId) : null) || window.lastAgentTurn;
  if (!report || !report.assistant) return showToast("没有可导出的专业研报");
  const name = agentReportStockName(report).replace(/[\\/:*?"<>|]/g, "-");
  const markdown = [
    `# ${name} · 小可专业研报`,
    `生成时间：${new Date(report.at || Date.now()).toLocaleString()}`,
    `问题：${report.user || "-"}`,
    `模型路由：${report.route || "-"}`,
    "",
    report.assistant,
    "",
    "---",
    "仅用于研究复盘，不构成确定性买卖指令。"
  ].join("\n\n");
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}-专业研报-${String(report.at || "").slice(0, 10) || todayString()}.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function xiaokeReportMetricRows(report = {}) {
  const item = (report.stockBriefs || [])[0] || {};
  const technical = item.technical || {};
  return {
    现价: item.price,
    涨跌幅: item.pct === undefined ? undefined : `${item.pct}%`,
    PE: item.pe,
    PB: item.pb,
    毛利率: item.grossMargin === undefined ? undefined : `${item.grossMargin}%`,
    净利率: item.netMargin === undefined ? undefined : `${item.netMargin}%`,
    ROE: item.roe === undefined ? undefined : `${item.roe}%`,
    营收: item.revenue,
    归母净利: item.netProfit,
    营收同比: item.revenueGrowth === undefined ? undefined : `${item.revenueGrowth}%`,
    利润同比: item.profitGrowth === undefined ? undefined : `${item.profitGrowth}%`,
    财报期: item.financialReportDate,
    公告数: (item.latestAnnouncements || []).length,
    MA20: technical.ma20,
    MA60: technical.ma60,
    "20日位置": technical.position20 === undefined ? undefined : `${technical.position20}%`,
    数据日期: technical.asOf || item.updatedAt || "-"
  };
}

function agentReportCompareHtml(reportId) {
  const rows = readAgentReports();
  const current = rows.find(item => item.id === reportId);
  if (!current) return "";
  const stock = agentReportStockName(current);
  const previous = rows.find(item => item.id !== reportId && agentReportStockName(item) === stock && String(item.at || "") < String(current.at || ""));
  if (!previous) return `<div class="agent-report-compare"><b>${escapeHtml(stock)}</b><p>这是该标的第一份研报，下一次分析后即可生成版本对比。</p></div>`;
  const nowMetrics = xiaokeReportMetricRows(current);
  const oldMetrics = xiaokeReportMetricRows(previous);
  const metricRows = Object.keys(nowMetrics).map(key => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(oldMetrics[key] ?? "-")}</td><td>${escapeHtml(nowMetrics[key] ?? "-")}</td></tr>`).join("");
  return `<div class="agent-report-compare"><b>${escapeHtml(stock)} · 版本对比</b><p>${escapeHtml(new Date(previous.at).toLocaleString())} → ${escapeHtml(new Date(current.at).toLocaleString())}</p><table><thead><tr><th>指标</th><th>上次</th><th>本次</th></tr></thead><tbody>${metricRows}</tbody></table></div>`;
}

function renderAgentReportHistory(compareId = "") {
  const body = document.getElementById("agentReportModalBody");
  if (!body) return;
  const rows = readAgentReports();
  body.innerHTML = rows.length ? `<div class="agent-report-list">${rows.map(report => `
    <div class="agent-report-row">
      <div class="agent-report-row-head">
        <div><h3>${escapeHtml(agentReportStockName(report))}</h3><p>${escapeHtml(new Date(report.at).toLocaleString())} · ${escapeHtml(report.route || "-")}</p></div>
        <div class="agent-report-row-actions">
          <button class="small-btn" onclick="viewAgentReport('${report.id}')">查看</button>
          <button class="small-btn" onclick="renderAgentReportHistory('${report.id}')">对比上次</button>
          <button class="small-btn" onclick="exportAgentReport('${report.id}')">导出</button>
          <button class="small-btn danger" onclick="deleteAgentReport('${report.id}')">删除</button>
        </div>
      </div>
      <p>${escapeHtml(agentClip(report.user, 120))}</p>
    </div>`).join("")}</div>${compareId ? agentReportCompareHtml(compareId) : ""}` : `<div class="empty-state"><b>还没有专业研报</b><p>切换到“专业研报”并提问后会自动归档。</p></div>`;
}

function openAgentReportHistory() {
  renderAgentReportHistory();
  document.getElementById("agentReportModal")?.classList.add("open");
}

function closeAgentReportHistory() {
  document.getElementById("agentReportModal")?.classList.remove("open");
}

function viewAgentReport(reportId) {
  const report = readAgentReports().find(item => item.id === reportId);
  if (!report) return;
  closeAgentReportHistory();
  const agent = document.getElementById("agent");
  if (agent && !agent.classList.contains("open")) toggleAgent();
  const chat = document.getElementById("agentChat");
  if (chat) {
    chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">历史专业研报 · ${escapeHtml(new Date(report.at).toLocaleString())}</span>${xiaokeAgentAnswerHtml(report.assistant, "professional")}${xiaokeAgentReportActionsHtml("professional", report.id)}</div>`);
    chat.scrollTop = chat.scrollHeight;
  }
}

function deleteAgentReport(reportId) {
  writeAgentReports(readAgentReports().filter(item => item.id !== reportId));
  renderAgentReportHistory();
}

function xiaokeAgentReportActionsHtml(responseMode = "concise", reportId = "") {
  if (responseMode !== "professional") return "";
  return `<div class="agent-report-actions"><button class="primary" onclick="saveCurrentAgentReport()">保存研报</button><button onclick="exportAgentReport('${reportId || ""}')">导出 Markdown</button><button onclick="openAgentReportHistory()">历史版本</button>${reportId ? `<button onclick="openAgentReportHistory();renderAgentReportHistory('${reportId}')">对比上次</button>` : ""}</div>`;
}

function xiaokeCompactStockSummaryHtml(briefs = []) {
  if (!briefs.length) return "";
  return `<div class="agent-compact-stocks">${briefs.slice(0, 4).map(item => {
    const name = item.localName || item.name || item.key || "标的";
    const price = Number.isFinite(Number(item.price)) ? Number(item.price).toFixed(2) : "待同步";
    const pct = Number.isFinite(Number(item.pct)) ? signedText(Number(item.pct), "%") : "";
    return `<span><b>${escapeHtml(name)}</b> ${escapeHtml(price)} ${escapeHtml(pct)}</span>`;
  }).join("")}</div>`;
}

function xiaokeAgentPrecisionSnapshotHtml(briefs = []) {
  const rows = briefs.filter(item => item.technical).slice(0, 3);
  if (!rows.length) return `<div class="agent-precision-empty">历史日线暂不可用，本轮只能做资料复盘，不能判断技术位置。</div>`;
  return `<div class="agent-precision-grid">${rows.map(item => {
    const t = item.technical;
    const tone = /偏强/.test(t.trend) ? "good" : /偏弱/.test(t.trend) ? "warn" : "";
    const confirm = `有效站上 ${t.high20}，且量能比高于 1.2`;
    const invalid = `跌破 ${t.low20}，或持续位于 MA20(${t.ma20}) 下方`;
    return `<section class="agent-precision-card">
      <div class="agent-precision-head"><b>${escapeHtml(item.localName || item.name || item.key || "标的")}</b><span class="${tone}">${escapeHtml(t.trend)}</span></div>
      <div class="agent-precision-metrics"><span>MA5 <b>${t.ma5}</b></span><span>MA20 <b>${t.ma20}</b></span><span>MA60 <b>${t.ma60}</b></span><span>量能 <b>${t.volumeRatio}</b></span></div>
      <p>5/20/60日：${signedText(t.return5, "%")} / ${signedText(t.return20, "%")} / ${signedText(t.return60, "%")}；20日位置 ${t.position20}%</p>
      <p><strong>确认：</strong>${escapeHtml(confirm)}</p><p><strong>失效：</strong>${escapeHtml(invalid)}</p>
      <small>${escapeHtml(t.asOf || "-")} · ${escapeHtml(t.source || "历史日线")}</small>
    </section>`;
  }).join("")}</div>`;
}

function agentPeerMetricRank(rows = [], current = {}, key = "", lowerBetter = false) {
  const available = rows.filter(item => Number.isFinite(Number(item[key])));
  if (!Number.isFinite(Number(current[key])) || available.length < 2) return "-";
  available.sort((a, b) => lowerBetter ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]));
  return `${available.findIndex(item => agentBriefIdentity(item) === agentBriefIdentity(current)) + 1}/${available.length}`;
}

function xiaokeAgentTrackingSnapshotHtml(briefs = [], peers = [], snapshot = null) {
  const primary = briefs[0];
  if (!primary || (!peers.length && !snapshot)) return "";
  const all = [primary, ...peers];
  const peerTable = peers.length ? `
    <div class="agent-tracking-table-wrap"><table class="agent-tracking-table">
      <thead><tr><th>同行样本</th><th>PE</th><th>毛利率</th><th>净利率</th><th>ROE</th><th>营收同比</th><th>利润同比</th></tr></thead>
      <tbody>${all.map((item, index) => `<tr class="${index === 0 ? "is-primary" : ""}"><td>${escapeHtml(item.localName || item.name || item.key || "-")}${index === 0 ? "（本标的）" : ""}</td><td>${escapeHtml(metricValueText(item.pe))}</td><td>${escapeHtml(metricValueText(item.grossMargin, "%"))}</td><td>${escapeHtml(metricValueText(item.netMargin, "%"))}</td><td>${escapeHtml(metricValueText(item.roe, "%"))}</td><td>${escapeHtml(metricValueText(item.revenueGrowth, "%"))}</td><td>${escapeHtml(metricValueText(item.profitGrowth, "%"))}</td></tr>`).join("")}</tbody>
    </table></div>
    <p class="agent-tracking-ranks">本标的排名：PE（低优先）${agentPeerMetricRank(all, primary, "pe", true)} · 毛利率 ${agentPeerMetricRank(all, primary, "grossMargin")} · 净利率 ${agentPeerMetricRank(all, primary, "netMargin")} · ROE ${agentPeerMetricRank(all, primary, "roe")}</p>` : `<p class="agent-tracking-empty">关注分组中没有可核验的同板块同行，未强行拼接无关公司。</p>`;
  const changeHtml = snapshot?.baseline
    ? `<p class="agent-tracking-baseline">首次分析：已建立财务与公告基线，下次研报将自动标出变化。</p>`
    : `<div class="agent-change-grid">
        <div><b>财务变化</b>${snapshot?.financialChanges?.length ? `<ul>${snapshot.financialChanges.slice(0, 6).map(item => `<li>${escapeHtml(item.label)}：${escapeHtml(item.previous)} → ${escapeHtml(item.current)}</li>`).join("")}</ul>` : `<p>与上次快照相比未发现字段变化。</p>`}</div>
        <div><b>新增公告 / 风险</b>${snapshot?.newAnnouncements?.length ? `<ul>${snapshot.newAnnouncements.slice(0, 3).map(item => `<li>${escapeHtml(item.date || "-")} ${escapeHtml(agentClip(item.title || "公告", 42))}</li>`).join("")}</ul>` : `<p>未发现新增公告。</p>`}${snapshot?.newRiskTags?.length ? `<p class="warn">新增标签：${escapeHtml(snapshot.newRiskTags.join("、"))}</p>` : ""}</div>
      </div>`;
  return `<details class="agent-tracking-snapshot" open><summary>同行比较与版本变化</summary><div class="agent-tracking-body">${peerTable}${changeHtml}<small>比较口径：同一关注板块、相同可用字段；缺失值不计入排名。财务与公告变化以本地上一份专业研报为基线。</small></div></details>`;
}

function xiaokeAgentResearchGateHtml(quality, scenarios) {
  if (!quality) return "";
  const gradeClass = quality.grade === "A" ? "grade-a" : quality.grade === "B" ? "grade-b" : quality.grade === "C" ? "grade-c" : "grade-d";
  const checks = quality.checks.map(row => `<div class="research-check"><span>${escapeHtml(row.label)}</span><b>${row.score}/${row.max}</b><small>${escapeHtml(row.note)}</small></div>`).join("");
  const scenarioRows = (scenarios?.rows || []).map(row => `<tr><th>${escapeHtml(row.name)}</th><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.fundamental)}</td><td>${escapeHtml(row.action)}</td></tr>`).join("");
  return `<details class="agent-research-gate" open>
    <summary><span>研究质量门槛</span><b class="${gradeClass}">${quality.score}/100 · ${quality.grade}级</b></summary>
    <div class="research-gate-body">
      <p class="research-score-note">只衡量资料是否足以支撑研究，不是股票评分，也不代表上涨概率。</p>
      <div class="research-check-grid">${checks}</div>
      ${quality.missing.length ? `<p class="research-gaps"><strong>待补缺口：</strong>${escapeHtml(quality.missing.join("；"))}</p>` : `<p class="research-gaps good">当前主要数据链完整，仍需人工核验原始公告。</p>`}
      ${scenarioRows ? `<div class="research-scenario-wrap"><table class="research-scenario-table"><thead><tr><th>情景</th><th>触发条件</th><th>基本面验证</th><th>研究动作</th></tr></thead><tbody>${scenarioRows}</tbody></table></div>` : ""}
      <small>情景用于后续验证，不是价格预测；条件未兑现时不提前下结论。</small>
    </div>
  </details>`;
}

renderAgent = function xiaokeTrueFinalCompactAgent() {
  const agent = document.getElementById("agent");
  if (!agent) return;
  const currentChat = document.getElementById("agentChat")?.innerHTML;
  agent.innerHTML = `
    <div class="agent-head" onpointerdown="startAgentDrag(event)" title="拖动这里可移动窗口">
      <div class="agent-head-title"><span class="avatar" style="width:28px;height:28px;font-size:13px">AI</span><span>小可 Agent</span></div>
      <div class="agent-tools">
        <select class="agent-model" id="agentProvider" onchange="localStorage.setItem('xiaoke_agent_provider', this.value);renderAgent()">${restoredProviderOptions()}</select>
        <select class="agent-response-mode" id="agentResponseMode" title="回答深度" onchange="event.stopPropagation();setAgentResponseMode(this.value)">
          <option value="concise" ${getAgentResponseMode() === "concise" ? "selected" : ""}>精简回答</option>
          <option value="professional" ${getAgentResponseMode() === "professional" ? "selected" : ""}>专业研报</option>
        </select>
        <button class="agent-size-btn" aria-label="缩小" title="缩小" onclick="event.stopPropagation();setAgentSize('small')"><span>−</span></button>
        <button class="agent-size-btn" aria-label="放大" title="放大" onclick="event.stopPropagation();setAgentSize('large')"><span>＋</span></button>
        <button class="agent-size-btn" aria-label="全屏" title="全屏 / 退出全屏" onclick="event.stopPropagation();setAgentSize('fullscreen')"><span>⛶</span></button>
        <button class="agent-size-btn" aria-label="复位" title="恢复默认位置和大小" onclick="event.stopPropagation();setAgentSize('normal')"><span>↺</span></button>
        <button class="config-btn" onclick="event.stopPropagation();openAgentConfig()">配置</button>
        <button class="icon-btn" onclick="event.stopPropagation();toggleAgent()">&times;</button>
      </div>
    </div>
    <div class="agent-roles">
      <div class="role-card"><strong>投资主脑</strong><span>行情 / 档案 / 风险</span></div>
      <div class="role-card"><strong>素材主脑</strong><span>视频 / 评论 / 互动</span></div>
      <div class="role-card"><strong>记忆主脑</strong><span>复盘 / 偏好 / 规则</span></div>
      <div class="role-card"><strong>系统主脑</strong><span>错误诊断 / 维护</span></div>
    </div>
    <div class="agent-tabs">
      ${["投资主脑","素材检索","三脑复盘","查看证据","记住这条","路由规则","诊断"].map((name, i) => `<button class="${i === 0 ? "primary" : ""}" onclick='event.stopPropagation();agentQuickAsk(${JSON.stringify(name)})'>${name}</button>`).join("")}
      <button onclick="event.stopPropagation();openAgentReportHistory()">研报历史</button>
    </div>
    <div class="agent-chat" id="agentChat">${currentChat || restoredAgentBubble("你问股票时，我会先识别标的、同步行情，检索视频、评论互动、复盘和记忆，再按数据前提、核心矛盾、观察条件与风险边界回答。投资问答不检索书籍。", "bot", "小可课堂 / 投资知识库")}</div>
    <div class="agent-input">
      <input id="agentInput" placeholder="例如：模型先生怎么看中际旭创？分析寒武纪和光模块..." onkeydown="if(event.key==='Enter') sendAgentMessage()">
      <button onclick="sendAgentMessage()">发送</button>
      <span class="agent-resize-note" title="拖动右下角调整大小"></span>
    </div>`;
  applyAgentSize();
};

function xiaokeSectorLocalPct(row = {}) {
  const values = (row.stocks || []).map(item => Number((restoredQuoteForItem(item) || {}).pct)).filter(Number.isFinite);
  if (!values.length) return Number(row.pct);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function xiaokeSectorBranchNames(group = {}) {
  const names = (group.children || []).map(child => child.name).filter(Boolean);
  return names.length ? names : ["未细分"];
}

renderSectorStrength = async function xiaokeTrueFinalSectorStrength() {
  state.view = "sectorStrength";
  restoredRenderShell();
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">板块强弱</div>
        <div class="date">这里只排板块分类，不铺具体股票；点“打开细分”再看细分和个股。涨跌幅优先取东方财富板块，取不到再用本地关注标的平均涨跌。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="renderSectorStrength()">刷新排序</button>
        <button class="small-btn" onclick="addCustomSectorBoard()">+自定义板块/ETF</button>
        <button class="small-btn" onclick="openVideoGroupManager()">导入产业链</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel"><div class="date">正在同步东方财富板块涨跌幅...</div></section>`;
  const groupRows = restoredTopGroups()
    .filter(row => row.group && !xiaokeBoardExclude(row.group.name))
    .map(row => ({
      type: "group",
      index: row.index,
      name: row.group.name,
      group: row.group,
      stocks: row.stocks || [],
      branchNames: xiaokeSectorBranchNames(row.group),
      localPct: xiaokeSectorLocalPct(row),
      source: "本地关注标的平均涨跌"
    }));
  const customRows = restoredCustomSectorBoards().map(row => ({
    type: "custom",
    id: row.id,
    name: row.name,
    group: null,
    stocks: [],
    branchNames: row.children ? String(row.children).split(/[、,，\s]+/).filter(Boolean) : ["自定义/ETF"],
    localPct: Number(String(row.pct || "").replace("%", "")),
    manualSource: row.source || "手动录入"
  }));
  const quoteMap = await xiaokeFetchSectorQuoteMap([...groupRows, ...customRows].map(row => row.name));
  const rows = [...groupRows, ...customRows].map(row => {
    const quote = quoteMap.get(row.name);
    const eastPct = Number(quote?.pct);
    return {
      ...row,
      pct: Number.isFinite(eastPct) ? eastPct : row.localPct,
      source: Number.isFinite(eastPct) ? "东方财富板块" : (row.manualSource || row.source || "本地关注标的平均涨跌"),
      eastName: quote?.name || ""
    };
  }).sort((a, b) => {
    const ap = Number.isFinite(Number(a.pct)) ? Number(a.pct) : -999;
    const bp = Number.isFinite(Number(b.pct)) ? Number(b.pct) : -999;
    return bp - ap || (b.stocks?.length || 0) - (a.stocks?.length || 0);
  });
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">板块强弱</div>
        <div class="date">只排板块分类；点击板块进入细分个股。来源已标明，避免把本地估算当成外部行情。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="renderSectorStrength()">刷新排序</button>
        <button class="small-btn" onclick="addCustomSectorBoard()">+自定义板块/ETF</button>
        <button class="small-btn" onclick="openVideoGroupManager()">导入产业链</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-title">板块分类排序</div>
      <div class="date" style="margin-bottom:10px">排序：涨跌幅优先，其次标的数量。细分只展示分类名，不在这里展开股票。</div>
      <div class="stock-table-wrap">
        <table class="stock-table">
          <thead><tr><th>排序</th><th>板块</th><th>涨跌幅</th><th>标的数</th><th>细分分类</th><th>来源</th><th>操作</th></tr></thead>
          <tbody>${rows.map((row, index) => {
            const pct = Number(row.pct);
            const cls = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
            const action = row.type === "group"
              ? `<button class="small-btn" onclick="openSectorDirectory([${row.index}])">打开细分</button>`
              : `<button class="small-btn" onclick="editCustomSectorBoard(${JSON.stringify(row.id)})">编辑</button>`;
            return `<tr>
              <td>${index + 1}</td>
              <td><b>${escapeHtml(row.name)}</b>${row.eastName && row.eastName !== row.name ? `<div class="date">匹配：${escapeHtml(row.eastName)}</div>` : ""}</td>
              <td class="${cls}">${escapeHtml(restoredPctText(row.pct))}</td>
              <td>${row.stocks?.length || 0}</td>
              <td>${escapeHtml((row.branchNames || ["未细分"]).slice(0, 8).join("、"))}</td>
              <td>${escapeHtml(row.source || "待补来源")}</td>
              <td>${action}</td>
            </tr>`;
          }).join("") || `<tr><td colspan="7">暂无板块，先导入产业链或添加自定义板块。</td></tr>`}</tbody>
        </table>
      </div>
      <div class="sector-source-note">说明：东方财富只提供标准行业/概念板块名，导入的自定义产业链可能无法一一匹配，未匹配时会显示本地关注标的平均涨跌或手动录入。</div>
    </section>`;
};

const XIAOKE_STRATEGY_RULES_KEY = "xiaoke_strategy_rules_v1";
const XIAOKE_STRATEGY_RESULT_KEY = "xiaoke_strategy_screen_result_v1";
const XIAOKE_STRATEGY_VERSIONS_KEY = "xiaoke_strategy_versions_v1";

function defaultStrategyRules() {
  return {
    market: "all", excludeSt: true, priceMin: 3, priceMax: 200, pctMin: -3, pctMax: 8,
    turnoverMin: 1, turnoverMax: 15, peMin: 0, peMax: 80, pbMax: 10,
    marketCapMin: 50, marketCapMax: "", amountMin: 1, pct60Min: -20, pct60Max: 60,
    roeMin: 5, grossMarginMin: 15, revenueGrowthMin: 0, profitGrowthMin: 0, debtRatioMax: 70,
    sortBy: "strategyScore", limit: 50
  };
}

function readStrategyRules() {
  try { return { ...defaultStrategyRules(), ...(JSON.parse(localStorage.getItem(XIAOKE_STRATEGY_RULES_KEY) || "{}") || {}) }; }
  catch { return defaultStrategyRules(); }
}

function saveStrategyRules(rules) {
  localStorage.setItem(XIAOKE_STRATEGY_RULES_KEY, JSON.stringify(rules || {}));
}

function updateStrategyRule(key, value, type = "number") {
  const rules = readStrategyRules();
  rules[key] = type === "boolean" ? Boolean(value) : type === "text" ? String(value) : (value === "" ? "" : Number(value));
  saveStrategyRules(rules);
}

function strategyRuleInput(key, label, value, unit = "") {
  return `<label class="strategy-rule-field"><span>${escapeHtml(label)}</span><div><input type="number" step="any" value="${escapeHtml(value)}" oninput="updateStrategyRule('${key}',this.value)">${unit ? `<em>${escapeHtml(unit)}</em>` : ""}</div></label>`;
}

function strategyPreset(name) {
  const common = { market: "all", excludeSt: true, limit: 50, sortBy: "strategyScore" };
  if (name === "quality") return { ...common, priceMin: 3, priceMax: 300, pctMin: -5, pctMax: 8, turnoverMin: .5, turnoverMax: 15, peMin: 0, peMax: 60, pbMax: 8, marketCapMin: 80, marketCapMax: "", amountMin: 1, pct60Min: -15, pct60Max: 60, roeMin: 10, grossMarginMin: 20, revenueGrowthMin: 0, profitGrowthMin: 5, debtRatioMax: 65 };
  if (name === "momentum") return { ...common, priceMin: 3, priceMax: 300, pctMin: 0, pctMax: 9.5, turnoverMin: 2, turnoverMax: 20, peMin: 0, peMax: 120, pbMax: 15, marketCapMin: 50, marketCapMax: "", amountMin: 3, pct60Min: 10, pct60Max: 80, roeMin: 3, grossMarginMin: 10, revenueGrowthMin: -5, profitGrowthMin: -10, debtRatioMax: 75 };
  if (name === "value") return { ...common, priceMin: 2, priceMax: 200, pctMin: -5, pctMax: 5, turnoverMin: .2, turnoverMax: 10, peMin: 0, peMax: 25, pbMax: 3, marketCapMin: 100, marketCapMax: "", amountMin: .5, pct60Min: -25, pct60Max: 35, roeMin: 8, grossMarginMin: 15, revenueGrowthMin: -5, profitGrowthMin: 0, debtRatioMax: 65 };
  return defaultStrategyRules();
}

function applyStrategyPreset(name) {
  saveStrategyRules(strategyPreset(name));
  renderStrategy();
}

function readStrategyScreenResult() {
  try { return JSON.parse(localStorage.getItem(XIAOKE_STRATEGY_RESULT_KEY) || "null"); } catch { return null; }
}

function readStrategyVersions() {
  try {
    const rows = JSON.parse(localStorage.getItem(XIAOKE_STRATEGY_VERSIONS_KEY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeStrategyVersions(rows = []) {
  localStorage.setItem(XIAOKE_STRATEGY_VERSIONS_KEY, JSON.stringify(rows.slice(0, 30)));
}

function saveCurrentStrategyVersion() {
  const now = new Date();
  const fallbackName = `策略 ${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  const name = String(prompt("版本名称", fallbackName) || "").trim();
  if (!name) return;
  const version = {
    id: `strategy_${Date.now()}`,
    name,
    createdAt: now.toISOString(),
    strategy: readStrategy(),
    rules: readStrategyRules(),
    result: readStrategyScreenResult()
  };
  writeStrategyVersions([version, ...readStrategyVersions()]);
  showToast("策略版本已保存");
  renderStrategy();
}

function restoreStrategyVersion(id) {
  const version = readStrategyVersions().find(item => item.id === id);
  if (!version) return showToast("未找到策略版本");
  localStorage.setItem(STRATEGY_KEY, JSON.stringify(version.strategy || defaultStrategy()));
  saveStrategyRules(version.rules || defaultStrategyRules());
  if (version.result) localStorage.setItem(XIAOKE_STRATEGY_RESULT_KEY, JSON.stringify(version.result));
  showToast(`已恢复：${version.name}`);
  renderStrategy();
}

function deleteStrategyVersion(id) {
  writeStrategyVersions(readStrategyVersions().filter(item => item.id !== id));
  renderStrategy();
}

function strategyVersionDiff(version = {}) {
  const current = readStrategyRules();
  const old = version.rules || {};
  const keys = [...new Set([...Object.keys(current), ...Object.keys(old)])];
  const changed = keys.filter(key => String(current[key] ?? "") !== String(old[key] ?? ""));
  if (!changed.length) return "与当前结构化规则一致";
  return changed.slice(0, 8).map(key => `${key}: ${old[key] ?? "空"} → ${current[key] ?? "空"}`).join("；") + (changed.length > 8 ? `；另有${changed.length - 8}项` : "");
}

function strategyVersionsHtml() {
  const rows = readStrategyVersions();
  if (!rows.length) return `<div class="empty-state"><b>尚未保存策略版本</b><p>调整规则前先保存一个版本，后续才能复盘规则变化。</p></div>`;
  return `<div class="strategy-version-list">${rows.map(item => `<article><div><b>${escapeHtml(item.name)}</b><span>${escapeHtml(new Date(item.createdAt).toLocaleString())}</span><p>${escapeHtml(strategyVersionDiff(item))}</p></div><div class="table-actions"><button class="small-btn" onclick='restoreStrategyVersion(${JSON.stringify(item.id)})'>恢复</button><button class="small-btn danger" onclick='deleteStrategyVersion(${JSON.stringify(item.id)})'>删除</button></div></article>`).join("")}</div>`;
}

function strategyResultCoverage(result = readStrategyScreenResult()) {
  const rows = result?.items || [];
  const fields = ["price", "pct", "amount", "turnoverRate", "pe", "pb", "marketCap", "roe", "grossMargin", "revenueGrowth", "profitGrowth", "debtRatio", "pct60"];
  if (!rows.length) return 0;
  const present = rows.reduce((sum, item) => sum + fields.filter(field => item[field] !== null && item[field] !== undefined && item[field] !== "" && Number.isFinite(Number(item[field]))).length, 0);
  return Math.round(present / (rows.length * fields.length) * 100);
}

function investmentDataQualityHtml(data = {}) {
  if (!data.success) return `<div class="empty-state danger"><b>质量检测失败</b><p>${escapeHtml(data.error || "未知错误")}</p></div>`;
  const market = data.market || {};
  const sectors = data.sectors || {};
  const methodology = data.methodology || {};
  const resultCoverage = strategyResultCoverage();
  return `<div class="quality-score-row"><div class="quality-grade"><span>数据质量</span><b>${escapeHtml(data.grade || "-")}</b><em>${Number(data.score || 0)}分</em></div>
    <div><span>A股覆盖</span><b>${Number(market.count || 0)}只</b><small>${escapeHtml(market.source || "-")}</small></div>
    <div><span>行情完整率</span><b>${Number(market.quoteCoverage || 0)}%</b><small>策略候选 ${resultCoverage}%</small></div>
    <div><span>财务完整率</span><b>${Number(market.financialCoverage || 0)}%</b><small>缺失字段必须复核</small></div>
    <div><span>趋势完整率</span><b>${Number(market.trendCoverage || 0)}%</b><small>60日/年内</small></div>
    <div><span>板块覆盖</span><b>${Number(sectors.count || 0)}个</b><small>${escapeHtml(sectors.source || "-")}</small></div></div>
    <div class="quality-meta"><span>行情更新：${escapeHtml(market.updatedAt ? new Date(market.updatedAt).toLocaleString() : "无")}</span><span>板块更新：${escapeHtml(sectors.updatedAt ? new Date(sectors.updatedAt).toLocaleString() : "无")}</span><span>QMT：${data.qmt?.online ? "在线" : "离线/未更新"}</span></div>
    <div class="quality-methodology"><b>交易口径</b><span>${escapeHtml(methodology.adjustment || "复权方式待确认")}</span><span>${escapeHtml(methodology.suspension || "停牌处理待确认")}</span><span>${escapeHtml(methodology.limit || "涨跌停处理待确认")}</span><span>${escapeHtml(methodology.delisting || "退市处理待确认")}</span><span>${escapeHtml(methodology.universe || "历史股票池待确认")}</span></div>
    ${(data.warnings || []).length ? `<div class="quality-warning-list">${data.warnings.map(item => `<p>${escapeHtml(item)}</p>`).join("")}</div>` : ""}`;
}

async function loadInvestmentDataQuality() {
  const box = document.getElementById("investmentDataQuality");
  if (!box) return;
  box.innerHTML = `<div class="strategy-running"><b>正在核验数据质量...</b><span>检查行情覆盖、财务完整度、趋势字段和板块缓存。</span></div>`;
  try {
    const response = await fetch(`/api/investment-data-quality?t=${Date.now()}`, { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "检测失败");
    box.innerHTML = investmentDataQualityHtml(data);
  } catch (error) {
    box.innerHTML = investmentDataQualityHtml({ success: false, error: error.message });
  }
}

function strategyNumber(value, digits = 2, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  const number = Number(value);
  return Number.isFinite(number) ? `${number.toFixed(digits).replace(/\.00$/, "")}${suffix}` : "-";
}

function strategyFieldEvidenceHtml(item = {}) {
  const labels = {
    price: "现价", pct: "日涨跌", amount: "成交额", turnoverRate: "换手率", pe: "PE", pb: "PB", marketCap: "市值",
    roe: "ROE", grossMargin: "毛利率", netMargin: "净利率", revenueGrowth: "营收增速", profitGrowth: "利润增速", debtRatio: "负债率",
    pct20: "20日趋势", pct60: "60日趋势", pct120: "120日趋势"
  };
  const meta = item.fieldMeta || {};
  const rows = Object.keys(labels).map(key => {
    const row = meta[key] || {};
    const value = item[key];
    const valueText = value === null || value === undefined || value === "" || !Number.isFinite(Number(value)) ? "缺失" : strategyNumber(value, 2, ["pct","turnoverRate","roe","grossMargin","netMargin","revenueGrowth","profitGrowth","debtRatio","pct20","pct60","pct120"].includes(key) ? "%" : "");
    return `<tr><td>${escapeHtml(labels[key])}</td><td>${escapeHtml(valueText)}</td><td>${escapeHtml(row.source || "未记录")}</td><td>${escapeHtml(row.asOf || "-")}</td><td>${row.cached ? "缓存" : "实时/请求时"}</td><td>${row.status === "missing" ? escapeHtml(row.missingReason || "上游未返回") : "可用"}</td></tr>`;
  }).join("");
  const control = item.tradingControl || {};
  return `<details class="strategy-field-evidence"><summary>字段证据</summary><div class="stock-table-wrap"><table class="stock-table"><thead><tr><th>字段</th><th>数值</th><th>来源</th><th>数据日期</th><th>缓存</th><th>状态/缺失原因</th></tr></thead><tbody>${rows}</tbody></table></div><div class="strategy-control-notes"><span>复权：${escapeHtml(control.adjustment || "待确认")}</span><span>交易状态：${escapeHtml(control.suspensionStatus || "待确认")}</span><span>涨跌停：${escapeHtml(control.limitStatus || "待确认")}</span><span>退市风险：${escapeHtml(control.delistingRisk || "待确认")}</span><span>${escapeHtml(control.pointInTimeUniverse || "历史股票池待补")}</span></div></details>`;
}

function strategyScreenResultHtml(data) {
  if (!data?.items?.length) return `<div class="empty-state"><b>还没有筛选结果</b><p>编辑规则后点击“运行 A 股筛选”。</p></div>`;
  const audited = data.audit?.verified || data.items.filter(item => item.auditStatus === "verified").length;
  return `${data.cached ? `<div class="strategy-cache-warning">当前使用最近成功缓存；实时接口恢复后可点击“刷新数据并筛选”。</div>` : ""}<div class="strategy-result-head"><div><b>命中 ${data.items.length} / 全市场 ${data.universeCount || "-"}</b><span>${escapeHtml(new Date(data.asOf || Date.now()).toLocaleString())} · ${escapeHtml(data.source || "")}${audited ? ` · 已深度复核 ${audited} 只` : ""}</span></div><div class="table-actions"><button class="small-btn primary" onclick="auditStrategyCandidates()">深度复核候选</button><button class="small-btn" onclick="exportStrategyScreenCsv()">导出 CSV</button></div></div>
    <div class="stock-table-wrap"><table class="stock-table strategy-screen-table"><thead><tr><th>排序</th><th>股票</th><th>策略分</th><th>复核</th><th>现价/日涨幅</th><th>20/60/120日</th><th>PE/PB</th><th>ROE/毛利</th><th>营收/利润增速</th><th>成交额/换手</th><th>命中理由</th><th>操作</th></tr></thead><tbody>${data.items.map((item, index) => `<tr>
      <td>${index + 1}</td><td><b>${escapeHtml(item.name)}</b><div class="date">${escapeHtml(item.code)} · ${escapeHtml(item.market)}</div></td>
      <td><b class="strategy-score-pill">${strategyNumber(item.strategyScore,0)}</b></td>
      <td>${item.auditStatus === "verified" ? `<span class="strategy-audit-ok">已复核 ${strategyNumber(item.auditCoverage,0,"%")}</span><div class="date">${escapeHtml(item.reportDate || item.historyEnd || "")}</div>${strategyFieldEvidenceHtml(item)}` : item.auditStatus === "failed" ? `<span class="strategy-audit-fail">失败</span><div class="date">${escapeHtml(item.auditError || "")}</div>` : `<span class="strategy-audit-wait">待复核</span>`}</td>
      <td>${strategyNumber(item.price)}<div class="${Number(item.pct) >= 0 ? "up" : "down"}">${strategyNumber(item.pct,2,"%")}</div></td>
      <td><span class="${Number(item.pct20) >= 0 ? "up" : "down"}">${strategyNumber(item.pct20,2,"%")}</span> / <span class="${Number(item.pct60) >= 0 ? "up" : "down"}">${strategyNumber(item.pct60,2,"%")}</span> / <span class="${Number(item.pct120) >= 0 ? "up" : "down"}">${strategyNumber(item.pct120,2,"%")}</span></td>
      <td>${strategyNumber(item.pe)} / ${strategyNumber(item.pb)}</td><td>${strategyNumber(item.roe,2,"%")} / ${strategyNumber(item.grossMargin,2,"%")}</td>
      <td>${strategyNumber(item.revenueGrowth,2,"%")} / ${strategyNumber(item.profitGrowth,2,"%")}</td><td>${strategyNumber(item.amount,2,"亿")} / ${strategyNumber(item.turnoverRate,2,"%")}</td>
      <td>${escapeHtml((item.reasons || []).join("；") || "满足全部硬规则")}</td><td><div class="table-actions"><button class="small-btn" onclick='addStockComparePoolItem(${JSON.stringify(item.name)})'>加入对比</button><button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("用专业研报模式分析" + item.name + "，并核验筛选规则")},"investment",true)'>研报</button></div></td>
    </tr>`).join("")}</tbody></table></div><p class="strategy-disclaimer">策略分用于候选排序，不代表上涨概率或投资评级。筛选结果需要结合公告、财报原文、板块位置和回测复核。</p>`;
}

async function auditStrategyCandidates() {
  const current = readStrategyScreenResult();
  if (!current?.items?.length) return showToast("请先运行 A 股筛选");
  const box = document.getElementById("strategyScreenResult");
  if (box) box.innerHTML = `<div class="strategy-running"><b>正在深度复核 ${current.items.length} 只候选...</b><span>分批补财务摘要与 20/60/120 日历史趋势；只处理候选，避免全市场请求导致卡顿。</span></div>`;
  try {
    const response = await fetch("/api/a-share-candidate-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: current.items, rules: readStrategyRules(), options: { concurrency: 4 } })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "候选深度复核失败");
    const next = {
      ...current,
      items: data.items || [],
      asOf: data.asOf || new Date().toISOString(),
      source: data.source || current.source,
      audit: { verified: data.verified || 0, failed: data.failed || 0, coverage: data.coverage || 0, auditedCount: data.auditedCount || current.items.length }
    };
    localStorage.setItem(XIAOKE_STRATEGY_RESULT_KEY, JSON.stringify(next));
    if (box) box.innerHTML = strategyScreenResultHtml(next);
    loadInvestmentDataQuality();
    showToast(`深度复核完成：${next.audit.verified} 成功，${next.audit.failed} 失败，完整度 ${next.audit.coverage}%`);
  } catch (error) {
    if (box) box.innerHTML = `<div class="strategy-cache-warning">深度复核失败：${escapeHtml(error.message)}。已保留原筛选结果。</div>${strategyScreenResultHtml(current)}`;
  }
}

async function runAShareStrategy(force = false) {
  const box = document.getElementById("strategyScreenResult");
  if (box) box.innerHTML = `<div class="strategy-running"><b>正在扫描 A 股全市场...</b><span>同步行情、估值和财务快照后按规则过滤，请稍候。</span></div>`;
  try {
    const response = await fetch("/api/a-share-screen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rules: readStrategyRules(), force }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "A 股筛选失败");
    localStorage.setItem(XIAOKE_STRATEGY_RESULT_KEY, JSON.stringify(data));
    if (box) box.innerHTML = strategyScreenResultHtml(data);
    showToast(`筛选完成：${data.items.length} 只候选`);
  } catch (error) {
    const cached = readStrategyScreenResult();
    if (box) box.innerHTML = cached?.items?.length
      ? `<div class="strategy-cache-warning">实时刷新失败：${escapeHtml(error.message)}。以下保留上次成功结果。</div>${strategyScreenResultHtml(cached)}`
      : `<div class="empty-state danger"><b>筛选失败</b><p>${escapeHtml(error.message)}</p></div>`;
  }
}

function exportStrategyScreenCsv() {
  const data = readStrategyScreenResult();
  if (!data?.items?.length) return showToast("没有可导出的筛选结果");
  const columns = ["排序","代码","名称","市场","策略分","复核状态","完整度","现价","日涨幅","20日涨幅","60日涨幅","120日涨幅","PE","PB","ROE","毛利率","营收增速","利润增速","负债率","成交额亿","换手率","财务来源","财报期","历史来源","历史截止日","复权","停牌检查","涨跌停检查","历史股票池提示","命中理由"];
  const rows = data.items.map((item,index) => [index+1,item.code,item.name,item.market,item.strategyScore,item.auditStatus,item.auditCoverage,item.price,item.pct,item.pct20,item.pct60,item.pct120,item.pe,item.pb,item.roe,item.grossMargin,item.revenueGrowth,item.profitGrowth,item.debtRatio,item.amount,item.turnoverRate,item.financialSource,item.reportDate,item.historySource,item.historyEnd,item.tradingControl?.adjustment,item.tradingControl?.suspensionStatus,item.tradingControl?.limitStatus,item.tradingControl?.pointInTimeUniverse,(item.reasons||[]).join("；")]);
  const csv = [columns,...rows].map(row => row.map(value => `"${String(value ?? "").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `A股策略筛选-${todayString()}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 500);
}

const XIAOKE_NATURAL_SCREEN_QUERY_KEY = "xiaoke_natural_screen_query_v1";
const XIAOKE_NATURAL_SCREEN_RESULT_KEY = "xiaoke_natural_screen_result_v1";

function defaultNaturalStockQuery() {
  return "排除ST，股价大于5元，量比大于1.5，换手率大于3%，MACD金叉，KDJ金叉，RSI6小于70，站上20日线";
}

function readNaturalStockQuery() {
  return localStorage.getItem(XIAOKE_NATURAL_SCREEN_QUERY_KEY) || defaultNaturalStockQuery();
}

function saveNaturalStockQuery(value) {
  localStorage.setItem(XIAOKE_NATURAL_SCREEN_QUERY_KEY, String(value || ""));
}

function readNaturalScreenResult() {
  try { return JSON.parse(localStorage.getItem(XIAOKE_NATURAL_SCREEN_RESULT_KEY) || "null"); }
  catch { return null; }
}

function naturalConditionLabel(condition = {}) {
  const fields = {
    price: "现价", pct: "当日涨幅", turnoverRate: "换手率", volumeRatio: "量比", amount: "成交额", marketCap: "市值",
    pe: "PE", pb: "PB", roe: "ROE", grossMargin: "毛利率", netMargin: "净利率", revenueGrowth: "营收增速", profitGrowth: "利润增速", debtRatio: "负债率",
    return5: "5日涨幅", return10: "10日涨幅", return20: "20日涨幅", return60: "60日涨幅",
    pct5: "5日涨幅", pct10: "10日涨幅", pct20: "20日涨幅", pct60: "60日涨幅", ma5: "MA5", ma10: "MA10", ma20: "MA20", ma60: "MA60",
    rsi6: "RSI6", rsi12: "RSI12", rsi24: "RSI24", k: "K", d: "D", j: "J", dif: "DIF", dea: "DEA", macd: "MACD",
    bollUpper: "BOLL上轨", bollMid: "BOLL中轨", bollLower: "BOLL下轨", bollWidth: "BOLL宽度",
    yesterdayClose: "昨日收盘价", yesterdayTurnoverRate: "昨日换手率", yesterdayPct: "昨日涨幅",
    low2: "2日最低价", low2x08: "2日最低价*0.8", low30: "30日最低价", high60: "60日最高价", low60: "60日最低价",
    limitUpCount3: "3日涨停次数", limitUpCount5: "5日涨停次数", limitUpCount7: "7日涨停次数", limitUpCount10: "10日涨停次数", limitUpCount20: "20日涨停次数",
    auctionAmount: "竞价金额", volumeRatioTodayYesterday: "今日9:25量比/昨日量比", historicalAuctionPct: "历史9:25涨跌幅",
    macdGoldenCross: "MACD金叉", macdDeadCross: "MACD死叉", kdjGoldenCross: "KDJ金叉", kdjDeadCross: "KDJ死叉",
    macdPositive: "MACD红柱", macdNegative: "MACD绿柱", maBull: "均线多头", maBear: "均线空头",
    aboveMa5: "站上5日线", aboveMa10: "站上10日线", aboveMa20: "站上20日线", aboveMa60: "站上60日线",
    belowMa5: "跌破5日线", belowMa10: "跌破10日线", belowMa20: "跌破20日线", belowMa60: "跌破60日线",
    aboveBollUpper: "突破BOLL上轨", aboveBollMid: "站上BOLL中轨", belowBollLower: "跌破BOLL下轨",
    high20: "20日新高", low20: "20日新低", volumeExpansion: "放量", volumeContraction: "缩量"
  };
  const ops = { gt: ">", gte: ">=", lt: "<", lte: "<=", eq: "=" };
  const valueLabel = (field, value) => {
    const number = Number(value);
    if ((field === "amount" || field === "marketCap") && Number.isFinite(number)) {
      return Math.abs(number) >= 1 ? `${strategyNumber(number)}亿` : `${strategyNumber(number * 10000)}万`;
    }
    return strategyNumber(value);
  };
  if (condition.type === "excludeSt") return "排除 ST / 退市";
  if (condition.type === "unsupported") return `需分时数据：${fields[condition.field] || condition.label || condition.field || "条件"}`;
  if (condition.type === "formula") {
    if (condition.field === "low2x08LtLow30") return "2日最低价*0.8 < 30日最低价";
    return condition.label || "公式条件";
  }
  if (condition.type === "signal") return fields[condition.field] || condition.field || "技术信号";
  if (condition.type === "cross") return `MA${condition.fast}${condition.direction === "up" ? "上穿" : "下穿"}MA${condition.slow}`;
  if (condition.type === "range") return `${fields[condition.field] || condition.field} ${valueLabel(condition.field, condition.min)} 到 ${valueLabel(condition.field, condition.max)}`;
  if (condition.type === "compare") return `${fields[condition.field] || condition.field} ${ops[condition.op] || condition.op} ${valueLabel(condition.field, condition.value)}`;
  return condition.field || "条件";
}

function naturalScreenResultHtml(data) {
  if (!data) return `<div class="empty-state"><b>还没有自然语言筛选结果</b><p>输入类似“量比大于1.5，MACD金叉，站上20日线”，点击智能解析并选股。</p></div>`;
  if (!data.success) return `<div class="empty-state danger"><b>自然语言筛选失败</b><p>${escapeHtml(data.error || "请调整条件后重试。")}</p></div>`;
  const conditions = data.parsed?.conditions || [];
  const unparsed = data.parsed?.unparsed || [];
  const warnings = Array.isArray(data.warnings) ? data.warnings.filter(Boolean) : [];
  const items = data.items || [];
  const meta = `全市场 ${data.universeCount || 0} 只 · 基础命中 ${data.baseMatchedCount || 0} 只 · 技术扫描 ${data.technicalScannedCount || 0} 只 · 最终命中 ${data.matchedCount || items.length} 只`;
  const chips = conditions.map(condition => `<span class="strategy-score-pill">${escapeHtml(naturalConditionLabel(condition))}</span>`).join("");
  const warn = unparsed.length ? `<div class="strategy-cache-warning">未完全识别：${escapeHtml(unparsed.join("；"))}。可以改成“字段 + 大于/小于 + 数值”，例如“量比大于1.5”。</div>` : "";
  const sourceWarn = warnings.length ? `<div class="strategy-cache-warning">${warnings.map(item => escapeHtml(item)).join("<br>")}</div>` : "";
  if (!items.length) {
    return `<div class="strategy-result-head"><div><b>没有命中股票</b><span>${escapeHtml(meta)}</span></div><button class="small-btn" onclick="exportNaturalScreenCsv()">导出 CSV</button></div><div class="natural-condition-list">${chips || "未识别条件"}</div>${warn}${sourceWarn}<div class="empty-state"><b>条件过严或技术扫描范围过小</b><p>可以放宽 RSI、MACD/KDJ 金叉，或把技术扫描上限调到 500。</p></div>`;
  }
  return `<div class="strategy-result-head"><div><b>自然语言命中 ${items.length} 只</b><span>${escapeHtml(meta)} · ${escapeHtml(data.source || "")} · ${escapeHtml(data.technicalSource || "")}</span></div><div class="table-actions"><button class="small-btn" onclick="exportNaturalScreenCsv()">导出 CSV</button><button class="small-btn" onclick="runNaturalStockScreenFrontend(true)">刷新重跑</button></div></div>
    <div class="natural-condition-list">${chips}</div>${warn}${sourceWarn}
    <div class="stock-table-wrap"><table class="stock-table strategy-screen-table natural-screen-table"><thead><tr><th>排序</th><th>股票</th><th>现价/涨幅</th><th>量比/换手</th><th>均线</th><th>MACD</th><th>KDJ</th><th>RSI</th><th>BOLL</th><th>20/60日</th><th>来源</th><th>操作</th></tr></thead><tbody>${items.map((item, index) => {
      const t = item.technical || {};
      const pctClass = Number(item.pct) >= 0 ? "up" : "down";
      const macdText = t.macdGoldenCross ? "金叉" : t.macdDeadCross ? "死叉" : `${strategyNumber(t.dif)} / ${strategyNumber(t.dea)}`;
      const kdjText = t.kdjGoldenCross ? "金叉" : t.kdjDeadCross ? "死叉" : `${strategyNumber(t.k)} / ${strategyNumber(t.d)} / ${strategyNumber(t.j)}`;
      const reasons = (item.matchReasons || []).slice(0, 5).map(reason => `<span class="strategy-score-pill">${escapeHtml(reason)}</span>`).join("");
      return `<tr>
        <td>${index + 1}</td>
        <td><b>${escapeHtml(item.name)}</b><div class="date">${escapeHtml(item.code)} · ${escapeHtml(item.market || "")}</div>${reasons ? `<div class="natural-condition-list compact">${reasons}</div>` : ""}</td>
        <td>${strategyNumber(item.price)}<div class="${pctClass}">${strategyNumber(item.pct, 2, "%")}</div></td>
        <td>${strategyNumber(item.volumeRatio ?? t.volumeRatio5)}<div class="date">${strategyNumber(item.turnoverRate, 2, "%")}</div></td>
        <td>5:${strategyNumber(t.ma5)}<br>10:${strategyNumber(t.ma10)}<br>20:${strategyNumber(t.ma20)}<br>60:${strategyNumber(t.ma60)}</td>
        <td>${escapeHtml(macdText)}<div class="date">${strategyNumber(t.macd)}</div></td>
        <td>${escapeHtml(kdjText)}</td>
        <td>6:${strategyNumber(t.rsi6)}<br>12:${strategyNumber(t.rsi12)}<br>24:${strategyNumber(t.rsi24)}</td>
        <td>上:${strategyNumber(t.bollUpper)}<br>中:${strategyNumber(t.bollMid)}<br>下:${strategyNumber(t.bollLower)}</td>
        <td>${strategyNumber(item.pct20, 2, "%")} / ${strategyNumber(item.pct60, 2, "%")}<div class="date">20高:${strategyNumber(t.high20)} 20低:${strategyNumber(t.low20)}</div></td>
        <td><div class="date">${escapeHtml(item.source || data.source || "")}</div><div class="date">${escapeHtml(t.asOf || data.asOf || "")}</div></td>
        <td><div class="table-actions"><button class="small-btn" onclick='addStockComparePoolItem(${JSON.stringify(item.name)})'>加入对比</button><button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("按专业研报模式分析" + item.name + "，并解释它为什么命中自然语言选股条件：" + (data.query || ""))}, "investment", true)'>研报</button></div></td>
      </tr>`;
    }).join("")}</tbody></table></div>
    <p class="strategy-disclaimer">说明：基础条件全市场过滤；MACD/KDJ/RSI/BOLL/均线等历史指标默认扫描成交额靠前候选，避免一次性请求全市场日线导致卡死。需要更精确的全市场技术选股，下一步应建立本地日线仓库。</p>`;
}

function applyNaturalScreenExample(text) {
  const input = document.getElementById("naturalStockQuery");
  if (input) input.value = text;
  saveNaturalStockQuery(text);
  showToast("已填入示例条件");
}

async function runNaturalStockScreenFrontend(force = false) {
  const query = String(document.getElementById("naturalStockQuery")?.value || "").trim();
  if (!query) return showToast("请输入选股条件");
  saveNaturalStockQuery(query);
  const scanLimit = Number(document.getElementById("naturalScreenLimit")?.value || 240);
  const box = document.getElementById("naturalScreenResult");
  if (box) box.innerHTML = `<div class="strategy-running"><b>正在解析并筛选...</b><span>先全市场过滤基础条件，再分批计算 MACD / KDJ / RSI / BOLL / 均线，避免页面卡死。</span></div>`;
  try {
    const response = await fetch("/api/a-share-natural-screen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, options: { scanLimit, limit: 80, concurrency: 6, force } })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "自然语言选股失败");
    localStorage.setItem(XIAOKE_NATURAL_SCREEN_RESULT_KEY, JSON.stringify(data));
    if (box) box.innerHTML = naturalScreenResultHtml(data);
    showToast(`自然语言筛选完成：${data.items?.length || 0} 只`);
  } catch (error) {
    const failed = { success: false, error: error.message };
    localStorage.setItem(XIAOKE_NATURAL_SCREEN_RESULT_KEY, JSON.stringify(failed));
    if (box) box.innerHTML = naturalScreenResultHtml(failed);
  }
}

function exportNaturalScreenCsv() {
  const data = readNaturalScreenResult();
  if (!data?.items?.length) return showToast("没有可导出的自然语言筛选结果");
  const columns = ["排序","代码","名称","市场","现价","涨跌幅","量比","换手率","MA5","MA10","MA20","MA60","DIF","DEA","MACD","K","D","J","RSI6","RSI12","RSI24","BOLL上轨","BOLL中轨","BOLL下轨","20日涨幅","60日涨幅","来源"];
  const rows = data.items.map((item, index) => {
    const t = item.technical || {};
    return [index + 1, item.code, item.name, item.market, item.price, item.pct, item.volumeRatio ?? t.volumeRatio5, item.turnoverRate, t.ma5, t.ma10, t.ma20, t.ma60, t.dif, t.dea, t.macd, t.k, t.d, t.j, t.rsi6, t.rsi12, t.rsi24, t.bollUpper, t.bollMid, t.bollLower, item.pct20, item.pct60, `${item.source || ""} ${item.technicalSource || ""}`];
  });
  const csv = [columns, ...rows].map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `自然语言选股-${todayString()}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function strategyCompactBox(field, title, value) {
  return `<label class="strategy-compact-box"><span>${escapeHtml(title)}</span><textarea oninput="saveStrategyField('${field}',this.value)">${escapeHtml(value || "")}</textarea></label>`;
}

renderStrategy = function xiaokeProfessionalStrategyWorkbench() {
  state.view = "strategy";
  restoredRenderShell();
  const data = readStrategy();
  const rules = readStrategyRules();
  const result = readStrategyScreenResult();
  const naturalQuery = readNaturalStockQuery();
  const naturalResult = readNaturalScreenResult();
  const naturalExamples = [
    "昨日换手率大于5%，昨日收盘价小于10元，今日量比大于1.7，排除ST",
    "2日内区间最低价*0.8小于30日区间最低价，7日内涨停次数大于0次，20日新高",
    "MACD金叉，KDJ金叉，RSI6小于70，BOLL中轨上方，5日线上穿20日线",
    "今日量比从大到小排名，成交额大于3亿，60日涨幅在0到60%",
    "今日竞价金额大于180万，今日9:25量比/昨日量比大于1.7，排除ST"
  ];
  document.getElementById("main").innerHTML = `
    <section class="review-head panel"><div><div class="panel-title">专业投资策略工作台</div><div class="date">自由文本记录交易哲学；结构化规则负责全 A 股筛选。先筛候选，再用公告、研报、回测和 Agent 复核。</div></div><div class="review-actions"><button class="small-btn" onclick="saveCurrentStrategyVersion()">保存策略版本</button><button class="small-btn" onclick="loadInvestmentDataQuality()">刷新质量</button><button class="small-btn" onclick="runAShareStrategy(true)">刷新数据并筛选</button><button class="small-btn" onclick="renderDashboard()">返回看板</button></div></section>
    <section class="panel" style="margin-bottom:12px"><div class="metadata-head"><div><div class="panel-title">数据质量中心</div><div class="date">先判断数据能不能支持结论，再讨论候选排名。</div></div></div><div id="investmentDataQuality"></div></section>
    <section class="panel natural-screen-panel" style="margin-bottom:12px"><div class="metadata-head"><div><div class="panel-title">同花顺式自然语言选股</div><div class="date">直接输入“量比、MACD、KDJ、RSI、BOLL、5/10/20/60日线”等条件，系统先解析再筛选。</div></div><div class="table-actions"><label class="date">技术扫描上限 <select id="naturalScreenLimit" class="small-select"><option value="120">120</option><option value="240" selected>240</option><option value="500">500</option></select> 只</label><button class="small-btn primary" onclick="runNaturalStockScreenFrontend()">智能解析并选股</button></div></div>
      <textarea id="naturalStockQuery" class="strategy-textarea natural-query-textarea" oninput="saveNaturalStockQuery(this.value)" placeholder="例如：股价大于5元，量比大于1.5，MACD金叉，KDJ金叉，RSI6小于70，站上20日线">${escapeHtml(naturalQuery)}</textarea>
      <div class="strategy-rule-toolbar">${naturalExamples.map(text => `<button class="small-btn" onclick='applyNaturalScreenExample(${JSON.stringify(text)})'>${escapeHtml(text)}</button>`).join("")}</div>
      <div id="naturalScreenResult">${naturalScreenResultHtml(naturalResult)}</div>
    </section>
    <section class="strategy-workbench-grid">
      <div class="panel"><div class="metadata-head"><div><div class="panel-title">A 股筛选规则</div><div class="date">所有空白字段表示不限制；策略分只排序，不代替硬规则。</div></div><select class="small-select" onchange="if(this.value)applyStrategyPreset(this.value)"><option value="">应用预设</option><option value="quality">质量成长</option><option value="momentum">趋势动量</option><option value="value">低估值质量</option><option value="default">均衡策略</option></select></div>
        <div class="strategy-rule-toolbar"><label><span>市场</span><select onchange="updateStrategyRule('market',this.value,'text')"><option value="all" ${rules.market==='all'?'selected':''}>全部A股</option><option value="主板" ${rules.market==='主板'?'selected':''}>主板</option><option value="创业板" ${rules.market==='创业板'?'selected':''}>创业板</option><option value="科创板" ${rules.market==='科创板'?'selected':''}>科创板</option><option value="北交所" ${rules.market==='北交所'?'selected':''}>北交所</option></select></label><label class="strategy-check"><input type="checkbox" ${rules.excludeSt!==false?'checked':''} onchange="updateStrategyRule('excludeSt',this.checked,'boolean')">排除 ST / 退市</label><label><span>排序</span><select onchange="updateStrategyRule('sortBy',this.value,'text')"><option value="strategyScore" ${rules.sortBy==='strategyScore'?'selected':''}>综合策略分</option><option value="pct" ${rules.sortBy==='pct'?'selected':''}>当日涨幅</option><option value="pct60" ${rules.sortBy==='pct60'?'selected':''}>60日强度</option><option value="roe" ${rules.sortBy==='roe'?'selected':''}>ROE</option><option value="profitGrowth" ${rules.sortBy==='profitGrowth'?'selected':''}>利润增速</option><option value="amount" ${rules.sortBy==='amount'?'selected':''}>成交额</option><option value="pe" ${rules.sortBy==='pe'?'selected':''}>PE从低到高</option></select></label></div>
        <div class="strategy-rule-grid">${strategyRuleInput('priceMin','最低股价',rules.priceMin,'元')}${strategyRuleInput('priceMax','最高股价',rules.priceMax,'元')}${strategyRuleInput('pctMin','当日最低涨幅',rules.pctMin,'%')}${strategyRuleInput('pctMax','当日最高涨幅',rules.pctMax,'%')}${strategyRuleInput('turnoverMin','最低换手率',rules.turnoverMin,'%')}${strategyRuleInput('turnoverMax','最高换手率',rules.turnoverMax,'%')}${strategyRuleInput('amountMin','最低成交额',rules.amountMin,'亿')}${strategyRuleInput('marketCapMin','最低市值',rules.marketCapMin,'亿')}${strategyRuleInput('marketCapMax','最高市值',rules.marketCapMax,'亿')}${strategyRuleInput('peMin','最低PE',rules.peMin,'倍')}${strategyRuleInput('peMax','最高PE',rules.peMax,'倍')}${strategyRuleInput('pbMax','最高PB',rules.pbMax,'倍')}${strategyRuleInput('roeMin','最低ROE',rules.roeMin,'%')}${strategyRuleInput('grossMarginMin','最低毛利率',rules.grossMarginMin,'%')}${strategyRuleInput('revenueGrowthMin','最低营收增速',rules.revenueGrowthMin,'%')}${strategyRuleInput('profitGrowthMin','最低利润增速',rules.profitGrowthMin,'%')}${strategyRuleInput('debtRatioMax','最高负债率',rules.debtRatioMax,'%')}${strategyRuleInput('pct60Min','60日最低涨幅',rules.pct60Min,'%')}${strategyRuleInput('pct60Max','60日最高涨幅',rules.pct60Max,'%')}${strategyRuleInput('limit','最多结果',rules.limit,'只')}</div>
        <button class="open-btn strategy-run-btn" onclick="runAShareStrategy()">运行 A 股筛选</button>
      </div>
      <div class="panel strategy-manual"><div class="panel-title">策略正文</div><textarea class="strategy-textarea main" oninput="saveStrategyField('main',this.value)">${escapeHtml(data.main || "")}</textarea><div class="strategy-mini-grid">${strategyCompactBox('entry','入场条件',data.entry)}${strategyCompactBox('risk','风险规则',data.risk)}${strategyCompactBox('position','仓位规则',data.position)}${strategyCompactBox('forbid','禁做清单',data.forbid)}</div></div>
    </section>
    <section class="panel" style="margin-top:12px"><div class="panel-title">策略筛选结果</div><div id="strategyScreenResult">${strategyScreenResultHtml(result)}</div></section>
    <section class="panel" style="margin-top:12px"><div class="metadata-head"><div><div class="panel-title">策略版本与审计</div><div class="date">保存规则、策略正文和当时筛选结果；恢复版本不会删除其他历史版本。</div></div><button class="small-btn" onclick="saveCurrentStrategyVersion()">+保存当前版本</button></div>${strategyVersionsHtml()}</section>`;
  setTimeout(() => loadInvestmentDataQuality(), 0);
};

const XIAOKE_SECTOR_SNAPSHOTS_KEY = "xiaoke_sector_daily_snapshots_v1";

function xiaokeSectorStrengthScore(row = {}) {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const hasTrend = row.pct60 !== null && row.pct60 !== undefined && Number.isFinite(Number(row.pct60));
  const hasBreadth = row.upCount !== null && row.upCount !== undefined && row.downCount !== null && row.downCount !== undefined && Number.isFinite(Number(row.upCount)) && Number.isFinite(Number(row.downCount));
  const total = hasBreadth ? Number(row.upCount) + Number(row.downCount) : 0;
  const breadth = total > 0 ? Number(row.upCount) / total * 100 : null;
  const daily = (clamp(row.pct, -5, 5) + 5) / 10 * 35;
  const trend = hasTrend ? (clamp(row.pct60, -30, 60) + 30) / 90 * 30 : 0;
  const breadthScore = breadth !== null ? breadth / 100 * 25 : 0;
  const leader = (clamp(row.leaderPct, -5, 20) + 5) / 25 * 10;
  if (!hasTrend || breadth === null) {
    const fallbackDaily = (clamp(row.pct, -5, 5) + 5) / 10 * 75;
    const fallbackLeader = (clamp(row.leaderPct, -5, 20) + 5) / 25 * 25;
    return { score: Math.round(fallbackDaily + fallbackLeader), breadth: null, scoreMode: "当日涨幅75% + 领涨股25%（来源未提供60日与市场宽度）" };
  }
  return { score: Math.round(daily + trend + breadthScore + leader), breadth: Math.round(breadth), scoreMode: "当日涨幅35% + 60日趋势30% + 市场宽度25% + 领涨股10%" };
}

function readSectorSnapshots() {
  try { const rows = JSON.parse(localStorage.getItem(XIAOKE_SECTOR_SNAPSHOTS_KEY) || "[]"); return Array.isArray(rows) ? rows : []; }
  catch { return []; }
}

function saveSectorSnapshot(rows = []) {
  if (!rows.length) return;
  const date = todayString();
  const snapshots = readSectorSnapshots();
  const snapshot = { date, at: new Date().toISOString(), items: rows.slice(0, 100).map((row, index) => ({ name: row.name, code: row.code, rank: index + 1, pct: row.pct, pct60: row.pct60, score: row.score, breadth: row.breadth, leader: row.leader })) };
  localStorage.setItem(XIAOKE_SECTOR_SNAPSHOTS_KEY, JSON.stringify([snapshot, ...snapshots.filter(item => item.date !== date)].slice(0, 40)));
}

function xiaokeSectorRole(row = {}, rank = 0) {
  if (rank > 0 && rank <= 10 && Number(row.pct) > 0) return "主线";
  if (rank > 0 && rank <= 25) return "次主线";
  if (rank > 0 && rank <= 40) return "观察";
  if (!rank && row.score >= 80 && Number(row.pct) > 0 && row.breadth >= 60) return "主线";
  if (!rank && row.score >= 65 && Number(row.pct) >= 0) return "次主线";
  if (!rank && row.score >= 45) return "观察";
  return "偏弱";
}

function xiaokeSectorRankDelta(name, rank) {
  const previous = readSectorSnapshots().find(item => item.date !== todayString());
  const old = previous?.items?.find(item => item.name === name);
  if (!old) return { text: "新", cls: "flat" };
  const delta = Number(old.rank) - Number(rank);
  return { text: delta > 0 ? `↑${delta}` : delta < 0 ? `↓${Math.abs(delta)}` : "—", cls: delta > 0 ? "up" : delta < 0 ? "down" : "flat" };
}

function sectorTrajectory(name, currentRank, row = {}) {
  const history = readSectorSnapshots().filter(item => item.date !== todayString()).slice(0, 5);
  const previous = history.map(snapshot => snapshot.items?.find(item => item.name === name)).filter(Boolean);
  const oldRank = previous[0]?.rank || null;
  const rankDelta = oldRank ? oldRank - currentRank : null;
  const pct = Number(row.pct);
  let phase = "新观察";
  let reason = "缺少前序快照，先观察持续性";
  if (oldRank) {
    if (currentRank <= 10 && oldRank > 25) { phase = "启动"; reason = `由第${oldRank}升至第${currentRank}`; }
    else if (currentRank <= 10 && oldRank <= 10 && pct >= 3) { phase = "加速"; reason = "高位延续且当日强度扩张"; }
    else if (currentRank <= 10 && oldRank <= 15) { phase = "延续"; reason = "连续处于主线区"; }
    else if (currentRank <= 25 && oldRank <= 10) { phase = "分歧"; reason = `由主线回落至第${currentRank}`; }
    else if (currentRank > 25 && oldRank <= 25) { phase = "退潮"; reason = `排名由${oldRank}降至${currentRank}`; }
    else if (rankDelta > 5) { phase = "升温"; reason = `排名提升${rankDelta}位`; }
    else if (rankDelta < -5) { phase = "降温"; reason = `排名下降${Math.abs(rankDelta)}位`; }
    else { phase = "震荡"; reason = "排名变化不大"; }
  }
  return { phase, reason, oldRank, rankDelta };
}

function sectorSnapshotHistoryHtml() {
  const rows = readSectorSnapshots().slice(0, 7);
  if (!rows.length) return `<div class="date">尚未形成每日快照。</div>`;
  return `<div class="sector-history-strip">${rows.map(row => `<div><b>${escapeHtml(row.date)}</b><span>${(row.items || []).slice(0, 3).map(item => `${item.rank}.${item.name}`).join(" · ")}</span></div>`).join("")}</div>`;
}

async function xiaokeFetchAllSectorRanking(force = false) {
  const response = await fetch(`/api/sector-quotes${force ? `?t=${Date.now()}` : ""}`, { cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.error || "板块行情获取失败");
  return (data.items || []).map(row => ({ ...row, ...xiaokeSectorStrengthScore(row) })).sort((a,b) => b.score - a.score || Number(b.pct) - Number(a.pct));
}

async function xiaokeAutoRefreshDailySectorSnapshot() {
  const today = todayString();
  if (readSectorSnapshots().some(item => item.date === today)) return;
  try { const rows = await xiaokeFetchAllSectorRanking(); saveSectorSnapshot(rows); } catch {}
}

function sectorCachedRankingHtml(errorMessage = "") {
  const snapshot = readSectorSnapshots()[0];
  if (!snapshot?.items?.length) return `<section class="panel"><div class="panel-title">板块榜暂不可用</div><p>${escapeHtml(errorMessage || "尚无成功快照")}</p><button class="small-btn" onclick="renderSectorStrength()">重新尝试</button></section>`;
  const rows = snapshot.items.slice(0, 40);
  return `<section class="review-head panel"><div><div class="panel-title">每日板块强弱</div><div class="date">实时接口暂不可用，正在展示 ${escapeHtml(snapshot.date)} 的最近成功快照。</div></div><div class="review-actions"><button class="small-btn" onclick="renderSectorStrength()">刷新今日榜</button><button class="small-btn" onclick="renderDashboard()">返回看板</button></div></section>
    <section class="panel"><div class="strategy-cache-warning">${escapeHtml(errorMessage)}</div><div class="stock-table-wrap"><table class="stock-table sector-prof-table"><thead><tr><th>排名</th><th>板块</th><th>强度</th><th>当日</th><th>60日</th><th>宽度</th><th>领涨股</th></tr></thead><tbody>${rows.map(row => `<tr><td>${row.rank}</td><td><b>${escapeHtml(row.name)}</b></td><td>${row.score}</td><td class="${Number(row.pct)>=0?'up':'down'}">${strategyNumber(row.pct,2,'%')}</td><td class="${Number(row.pct60)>=0?'up':'down'}">${strategyNumber(row.pct60,2,'%')}</td><td>${row.breadth}%</td><td>${escapeHtml(row.leader || '-')}</td></tr>`).join("")}</tbody></table></div></section>`;
}

renderSectorStrength = async function xiaokeProfessionalSectorStrength() {
  state.view = "sectorStrength";
  restoredRenderShell();
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `<section class="review-head panel"><div><div class="panel-title">每日板块强弱</div><div class="date">正在同步东方财富行业/概念板块，计算日强度、60日趋势、市场宽度和领涨股。</div></div><button class="small-btn" onclick="renderDashboard()">返回看板</button></section><section class="panel"><div class="strategy-running"><b>正在生成今日板块榜...</b><span>只做客观排序，不把排名直接等同于买卖信号。</span></div></section>`;
  try {
    const rows = await xiaokeFetchAllSectorRanking(true);
    saveSectorSnapshot(rows);
    const topRows = rows.slice(0, 40);
    const scoreNote = topRows[0]?.scoreMode || "按可用行情字段计算";
    const sourceNote = [...new Set(topRows.map(row => row.source).filter(Boolean))].join(" / ") || "板块行情";
    const myGroups = restoredTopGroups().filter(row => row.group && !xiaokeBoardExclude(row.group.name));
    const quoteMap = await xiaokeFetchSectorQuoteMap(myGroups.map(row => row.group.name));
    main.innerHTML = `
      <section class="review-head panel"><div><div class="panel-title">每日板块强弱</div><div class="date">强度分 = ${escapeHtml(scoreNote)}。数据源：${escapeHtml(sourceNote)}。排名用于发现主线和变化，不是买入建议。</div></div><div class="review-actions"><button class="small-btn" onclick="renderSectorStrength()">刷新今日榜</button><button class="small-btn" onclick="addCustomSectorBoard()">+自定义板块/ETF</button><button class="small-btn" onclick="openVideoGroupManager()">管理产业链</button><button class="small-btn" onclick="renderDashboard()">返回看板</button></div></section>
      <section class="sector-market-summary">${["主线","次主线","观察","偏弱"].map(role => { const group=topRows.filter((row,index)=>xiaokeSectorRole(row,index+1)===role); return `<div><span>${role}</span><b>${group.length}</b><small>${group.slice(0,3).map(row=>row.name).join("、") || "暂无"}</small></div>`; }).join("")}</section>
      <section class="panel"><div class="metadata-head"><div><div class="panel-title">全市场板块强度榜</div><div class="date">共同步 ${rows.length} 个标准板块；显示前40名。</div></div><span class="video-group-badge">${todayString()} 快照已保存</span></div>
        <div class="stock-table-wrap"><table class="stock-table sector-prof-table"><thead><tr><th>排名</th><th>层级</th><th>阶段</th><th>板块</th><th>强度</th><th>当日</th><th>60日</th><th>上涨/下跌</th><th>宽度</th><th>领涨股</th><th>领涨幅</th><th>成交额</th></tr></thead><tbody>${topRows.map((row,index)=>{ const delta=xiaokeSectorRankDelta(row.name,index+1); const role=xiaokeSectorRole(row,index+1); const trajectory=sectorTrajectory(row.name,index+1,row); const breadthText=row.breadth===null||row.breadth===undefined?'-':`${row.breadth}%`; const advanceText=row.upCount===null||row.upCount===undefined||row.downCount===null||row.downCount===undefined?'-':`${row.upCount} / ${row.downCount}`; return `<tr><td><b>${index+1}</b> <span class="${delta.cls}">${delta.text}</span></td><td><span class="sector-role ${role==='主线'?'main':role==='次主线'?'secondary':role==='偏弱'?'weak':''}">${role}</span></td><td><span class="sector-phase phase-${escapeHtml(trajectory.phase)}">${escapeHtml(trajectory.phase)}</span><div class="date">${escapeHtml(trajectory.reason)}</div></td><td><b>${escapeHtml(row.name)}</b><div class="date">${escapeHtml(row.code)}</div></td><td><b>${row.score}</b></td><td class="${Number(row.pct)>=0?'up':'down'}">${strategyNumber(row.pct,2,'%')}</td><td>${strategyNumber(row.pct60,2,'%')}</td><td>${advanceText}</td><td>${breadthText}</td><td>${escapeHtml(row.leader || '-')}</td><td class="${Number(row.leaderPct)>=0?'up':'down'}">${strategyNumber(row.leaderPct,2,'%')}</td><td>${strategyNumber(Number(row.amount)/100000000,1,'亿')}</td></tr>`;}).join("")}</tbody></table></div></section>
      <section class="panel" style="margin-top:12px"><div class="panel-title">最近7次板块快照</div>${sectorSnapshotHistoryHtml()}</section>
      <section class="panel" style="margin-top:12px"><div class="panel-title">我的产业链映射</div><div class="date" style="margin-bottom:10px">把你的关注分组映射到标准板块；点击打开细分个股。</div><div class="sector-rank-grid">${myGroups.map(row=>{ const quote=quoteMap.get(row.group.name); return `<article class="sector-rank-card"><div class="sector-rank-head"><b>${escapeHtml(row.group.name)}</b><span>${quote?.pct===undefined?'未匹配':strategyNumber(quote.pct,2,'%')}</span></div><p>${escapeHtml(xiaokeSectorBranchNames(row.group).slice(0,6).join('、'))}</p><div class="date">${escapeHtml(quote?.source || '本地产业链')}</div><button class="small-btn" onclick="openSectorDirectory([${row.index}])">打开细分</button></article>`;}).join("") || '<div class="date">暂无产业链分组。</div>'}</div></section>`;
  } catch (error) {
    main.innerHTML = sectorCachedRankingHtml(error.message);
  }
};

setTimeout(() => xiaokeAutoRefreshDailySectorSnapshot(), 2600);

restoredStockProfileCard = function xiaokeTrueFinalStockProfileCard(row = {}) {
  const item = row.item || {};
  const profile = row.profile || {};
  const brief = row.brief || {};
  const name = item.name || profile.name || brief.localName || brief.name || row.key || "未命名";
  const key = brief.key || profile.key || row.key || item.quoteKey || "";
  const quote = brief.price != null ? brief : restoredQuoteForItem(item) || {};
  const pct = Number(quote.pct);
  const quoteClass = Number.isFinite(pct) ? (pct >= 0 ? "up" : "down") : "flat";
  const financial = restoredShortFinancial({ ...profile, ...brief });
  const announcement = restoredShortAnnouncement({ ...profile, ...brief });
  return `
    <article class="decision-card">
      <div class="metadata-head">
        <div>
          <h3 style="margin:0 0 5px">${escapeHtml(name)}</h3>
          <div class="date">${escapeHtml(key || "未匹配代码")} · ${escapeHtml(profile.sector || item.sector || item.group || "未分类")}</div>
        </div>
        <div class="quote-line ${quoteClass}">
          <b>${escapeHtml(quote.price == null ? "-" : Number(quote.price).toFixed(2).replace(/\.00$/, ""))}</b>
          <span>${escapeHtml(restoredPctText(quote.pct))}</span>
        </div>
      </div>
      <div class="stock-metric-grid">
        ${stockMetricCell("PE", brief.pe ?? profile.pe)}
        ${stockMetricCell("PB", brief.pb ?? profile.pb)}
        ${stockMetricCell("市值", brief.marketCap ?? profile.marketCap)}
        ${stockMetricCell("ROE", brief.roe ?? profile.roe, (brief.roe || profile.roe) ? "%" : "")}
      </div>
      <p style="margin:8px 0 0;color:#cfd6e4;line-height:1.65">财务：${escapeHtml(compactPlainText(financial, 20))}</p>
      <p style="margin:4px 0 0;color:#cfd6e4;line-height:1.65">公告：${escapeHtml(compactPlainText(announcement, 20))}</p>
      <div class="stock-card-actions">
        <button class="small-btn" onclick='openStockProfileEditor(${JSON.stringify({ name, key, sector: profile.sector || item.sector || "" })})'>自动补档案</button>
        <button class="small-btn" onclick='showToast(${JSON.stringify("公告：" + compactPlainText(announcement, 36))})'>简要公告</button>
        <button class="small-btn" onclick='openAgentWithQuestion(${JSON.stringify("用股票档案、公告和财务简要分析" + name)}, "investment", true)'>问 Agent</button>
      </div>
    </article>`;
};

renderShell = function xiaokeTrueFinalRenderShell() {
  xiaokeTrueFinalCss();
  renderTopChips();
  restoredRenderLeftPane();
  restoredRenderRightPane();
  if (typeof renderAgent === "function") renderAgent();
};

restoredRenderShell = renderShell;

restoredSectorRows = function xiaokeTrueFinalDashboardSectorRows(limit = 8) {
  try {
    return sectorRows().filter(row => row && !xiaokeBoardExclude(row.name || row.tag?.name)).slice(0, limit);
  } catch {
    return tags.filter(t => t.type === "sector" && !xiaokeBoardExclude(t.name)).slice(0, limit).map(t => ({ name: t.name, count: tagCount(t), tag: t }));
  }
};

function xiaokeFixDashboardLabels() {
  const main = document.getElementById("main");
  if (!main || state.view !== "dashboard") return;
  [...main.querySelectorAll(".panel-title")].forEach(node => {
    if ((node.textContent || "").includes("行业分布")) node.textContent = "题材/产业分布 TOP8";
  });
}

const xiaokeDashboardAfterLocalRestore = renderDashboard;
renderDashboard = function xiaokeTrueFinalDashboardWithLocalRestore() {
  if ((state.videos || []).length < 50 && !window.__xiaokeRestoringLocalVideos) {
    window.__xiaokeRestoringLocalVideos = true;
    const main = document.getElementById("main");
    restoredRenderShell();
    if (main) {
      main.innerHTML = `<section class="panel"><div class="panel-title">正在恢复本地视频素材</div><div class="date">首次打开会扫描本地目录，完成后自动恢复看板。</div></section>`;
    }
    restoredImportLocalVideosNow().then(() => {
      window.__xiaokeRestoringLocalVideos = false;
      xiaokeDashboardAfterLocalRestore();
      xiaokeFixDashboardLabels();
    }).catch(() => {
      window.__xiaokeRestoringLocalVideos = false;
      xiaokeDashboardAfterLocalRestore();
      xiaokeFixDashboardLabels();
    });
    return;
  }
  const result = xiaokeDashboardAfterLocalRestore();
  xiaokeFixDashboardLabels();
  return result;
};

xiaokeTrueFinalCss();

exposeXiaokeGlobals();

window.openDetail = openDetail;
window.renderDetail = renderDetail;
window.uniqueClean = uniqueClean;
window.showDetailTab = showDetailTab;
window.generateAiForCurrent = generateAiForCurrent;
window.importCurrentVideoComments = importCurrentVideoComments;
window.importCurrentVideoInteractions = importCurrentVideoInteractions;
window.fetchCurrentVideoComments = fetchCurrentVideoComments;
window.transcribeVideo = transcribeVideo;
window.startVideoBackgroundQueue = startVideoBackgroundQueue;
window.loadMoreLibraryVideos = loadMoreLibraryVideos;
window.autoFillVisibleStockProfiles = autoFillVisibleStockProfiles;
window.renderStockProfiles = renderStockProfiles;
window.renderModelFramework = renderModelFramework;
window.openModelFramework = openModelFramework;
globalThis.openDetail = openDetail;
globalThis.renderDetail = renderDetail;
globalThis.renderDashboard = renderDashboard;
globalThis.renderLibrary = renderLibrary;
globalThis.toggleAgent = toggleAgent;
globalThis.openModelFramework = openModelFramework;
globalThis.renderSectorStrength = renderSectorStrength;
globalThis.addCustomSectorBoard = addCustomSectorBoard;
globalThis.editCustomSectorBoard = editCustomSectorBoard;
globalThis.editFrameworkRule = editFrameworkRule;

function xiaokeVideoDouyinUrl(video = {}) {
  const raw = video.originalUrl || video.shareUrl || video.sourceUrl || video.webpageUrl || "";
  if (/douyin\.com|v\.douyin|iesdouyin/i.test(raw)) return raw;
  const id = String(video.sourceId || video.id || "").match(/\d{10,}/);
  return id ? `https://www.douyin.com/video/${id[0]}` : "";
}

async function xiaokeFetchDouyinStatus(quiet = false) {
  try {
    const response = await fetch("/api/douyin-capture-status", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "读取抖音抓取状态失败");
    state.douyinCaptureStatus = data;
    return data;
  } catch (error) {
    if (!quiet) showToast(error.message || "读取抖音抓取状态失败");
    return null;
  }
}

async function startDouyinCookieLogin() {
  showToast("正在打开抖音专用登录窗口...");
  try {
    const response = await fetch("/api/douyin-cookie-login", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "启动登录窗口失败");
    state.douyinCaptureStatus = data.status || state.douyinCaptureStatus;
    showToast("已打开专用抖音窗口，请在那个窗口登录；登录后点刷新状态");
    if (state.view === "library") renderLibrary();
    clearTimeout(state.douyinCookieTimer);
    state.douyinCookieTimer = setTimeout(() => pollDouyinCookieStatus(true), 3500);
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查 Edge 是否安装"));
  }
}

async function pollDouyinCookieStatus(forceRender = false) {
  const status = await xiaokeFetchDouyinStatus(true);
  if (forceRender && state.view === "library") renderLibrary();
  if (status && !status.cookiesReady && status.cookieJob && status.cookieJob.status === "running") {
    clearTimeout(state.douyinCookieTimer);
    state.douyinCookieTimer = setTimeout(() => pollDouyinCookieStatus(true), 3500);
  } else if (status && status.cookiesLoginReady) {
    showToast("抖音 cookies 已就绪，可以抓高赞评论和博主互动了");
  } else if (status && status.cookiesReady) {
    showToast("只检测到普通抖音 cookies，还没有有效登录态；请在专用抖音窗口完成登录/验证码。");
  }
}

function xiaokeDouyinStatusHtml() {
  const job = state.douyinSyncJob || (state.douyinCaptureStatus && state.douyinCaptureStatus.sync) || null;
  const status = state.douyinCaptureStatus || null;
  if ((!job || !job.status || job.status === "idle") && status) {
    const cookieText = status.cookiesLoginReady
      ? "登录 cookies 已就绪"
      : (status.cookiesReady ? "只有普通 cookies，缺少登录态/可能仍有验证码" : "未检测到 cookies.txt，自动抓评论/互动可能失败");
    const tone = status.cookiesLoginReady ? "var(--green)" : "var(--gold)";
    const cookieJob = status.cookieJob || {};
    const jobText = cookieJob.status && cookieJob.status !== "idle" ? ` · ${escapeHtml(cookieJob.status)}：${escapeHtml(cookieJob.message || "")}` : "";
    return `<section class="panel" style="border-color:${tone};margin-bottom:12px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">抖音抓取状态</div>
          <div class="date">${escapeHtml(cookieText)} · 已保存评论 ${Number(status.savedCommentVideos || 0)} 条视频 · 已保存互动 ${Number(status.savedInteractionVideos || 0)} 条视频${jobText}</div>
        </div>
        <div class="review-actions">
          ${status.cookiesLoginReady ? "" : `<button class="small-btn" onclick="startDouyinCookieLogin()">打开登录窗口/导出Cookies</button>`}
          <button class="small-btn" onclick="pollDouyinCookieStatus(true)">刷新状态</button>
        </div>
      </div>
      <div class="date">注意：这里需要项目打开的“专用抖音窗口”登录并完成验证码；普通浏览器标签已登录，不一定能被本地脚本读取。当前 cookie 数：${Number(status.cookieCount || 0)}，登录字段：${escapeHtml((status.cookieLoginNames || []).join(", ") || "无")}。</div>
    </section>`;
  }
  if (!job || !job.status || job.status === "idle") return "";
  const color = job.status === "failed" ? "var(--red)" : (job.status === "done" ? "var(--green)" : "var(--gold)");
  const errors = (job.errors || []).slice(-2).map(row => `<div class="date">${escapeHtml(row.error || "")}</div>`).join("");
  return `<section class="panel" style="border-color:${color};margin-bottom:12px">
    <div class="metadata-head">
      <div><div class="panel-title">抖音同步：${escapeHtml(job.status)}</div><div class="date">进度 ${Number(job.done || 0)} / ${Number(job.total || 0)}，已保存 ${Number(job.saved || 0)}，失败 ${Number(job.failed || 0)}${job.current ? ` · ${escapeHtml(job.current)}` : ""}</div></div>
      <button class="small-btn" onclick="pollDouyinSyncStatus(true)">刷新进度</button>
    </div>
    ${errors}
  </section>`;
}

async function pollDouyinSyncStatus(forceRender = false) {
  try {
    const response = await fetch("/api/douyin-sync-status", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "读取同步状态失败");
    state.douyinSyncJob = data.job || { status: "idle" };
    if (forceRender && state.view === "library") renderLibrary();
    if (state.douyinSyncJob.status === "running") {
      clearTimeout(state.douyinSyncTimer);
      state.douyinSyncTimer = setTimeout(() => pollDouyinSyncStatus(true), 3500);
    } else if (forceRender && state.douyinSyncJob.status === "done") {
      showToast("抖音同步完成，正在刷新素材库");
      if (typeof restoredImportLocalVideosNow === "function") await restoredImportLocalVideosNow();
      else if (typeof scanLocalVideos === "function") await scanLocalVideos();
      if (state.view === "library") renderLibrary();
    }
    return state.douyinSyncJob;
  } catch (error) {
    showToast(error.message || "读取同步状态失败");
    return null;
  }
}

async function startDouyinBloggerSync() {
  const url = prompt("粘贴抖音博主主页、合集或单条视频链接。会后台低频下载/更新，不会卡住页面。", localStorage.getItem("xiaoke_last_douyin_sync_url") || "");
  if (!url) return;
  localStorage.setItem("xiaoke_last_douyin_sync_url", url.trim());
  const limitText = prompt("本次最多同步多少条？建议先填 10，稳定后再扩大。", localStorage.getItem("xiaoke_last_douyin_sync_limit") || "10");
  if (limitText == null) return;
  const limit = Math.max(1, Math.min(100, Number(limitText) || 10));
  localStorage.setItem("xiaoke_last_douyin_sync_limit", String(limit));
  const withComments = confirm("是否同时抓取每条视频的高赞评论/博主互动？会更慢，但后续分析更完整。");
  showToast("已提交抖音后台同步任务");
  try {
    const response = await fetch("/api/douyin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim(), limit, download: true, comments: withComments })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "启动同步失败");
    state.douyinSyncJob = data.job;
    if (state.view === "library") renderLibrary();
    pollDouyinSyncStatus(true);
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查链接/cookies"));
  }
}

async function fetchCurrentVideoComments() {
  const video = (state.videos || []).find(item => item.id === state.currentVideoId);
  if (!video) return;
  const url = xiaokeVideoDouyinUrl(video);
  if (!url) {
    showToast("这条素材没有抖音原链接或作品ID，不能自动抓评论");
    return;
  }
  const status = await xiaokeFetchDouyinStatus(true);
  if (status && !status.cookiesLoginReady) {
    showToast("未检测到有效登录 cookies。会尝试浏览器兜底；失败时请打开登录窗口并完成验证码/登录。");
  }
  showToast("正在抓取抖音高赞评论/博主互动，可能需要几十秒...");
  try {
    const response = await fetch("/api/douyin-comments?limit=80&videoId=" + encodeURIComponent(video.id) + "&url=" + encodeURIComponent(url));
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error([data.error, data.detail, data.hint].filter(Boolean).join(" | ") || "抓取失败");
    const commentsStore = finalReadVideoSideData("xiaoke_video_hot_comments_v1");
    const interactionsStore = finalReadVideoSideData("xiaoke_video_author_interactions_v1");
    commentsStore[video.id] = (data.comments || []).slice(0, 50);
    interactionsStore[video.id] = (data.interactions || []).slice(0, 30);
    finalSaveVideoSideData("xiaoke_video_hot_comments_v1", commentsStore);
    finalSaveVideoSideData("xiaoke_video_author_interactions_v1", interactionsStore);
    showToast(`已抓取高赞评论 ${commentsStore[video.id].length} 条，博主互动 ${interactionsStore[video.id].length} 条`);
    showDetailTab((interactionsStore[video.id] || []).length ? "interaction" : "comments");
  } catch (error) {
    showToast("评论抓取失败：" + (error.message || "抖音可能需要 cookies"));
  }
}

const xiaokeDouyinBaseRenderLibrary = renderLibrary;
renderLibrary = function xiaokeDouyinRenderLibrary() {
  state.view = "library";
  restoredRenderShell();
  if (!state.douyinCaptureStatus) {
    xiaokeFetchDouyinStatus(true).then(() => {
      if (state.view === "library") renderLibrary();
    });
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return xiaokeDouyinBaseRenderLibrary();
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="startDouyinBloggerSync()">同步博主视频</button>
        <button class="small-btn" onclick="xiaokeFetchDouyinStatus().then(()=>renderLibrary())">抓取状态</button>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${xiaokeDouyinStatusHtml()}
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

showDetailTab = function xiaokeDouyinShowDetailTab(tab) {
  const box = document.getElementById("detailContent");
  const video = (state.videos || []).find(item => item.id === state.currentVideoId) || restoredAllLibraryVideos()[0];
  if (!box || !video) return;
  document.querySelectorAll(".tabs .tab").forEach(btn => {
    const text = btn.textContent || "";
    const active = (tab === "transcript" && text.includes("转录")) || (tab === "comments" && text.includes("评论")) || (tab === "interaction" && text.includes("互动")) || (tab === "analysis" && text.includes("AI"));
    btn.classList.toggle("active", active);
  });
  if (tab === "analysis") return void (box.innerHTML = analysisHtml(video));
  if (tab === "comments") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">高赞评论</div><div class="date">自动抓取公开高赞评论；失败时看提示更新 cookies。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoComments()">手动导入</button></div></div>${finalCommentListHtml(finalVideoComments(video), "暂无高赞评论。点“自动抓取抖音”，如果提示登录态失效就先更新 cookies。")}</section>`;
    return;
  }
  if (tab === "interaction") {
    box.innerHTML = `<section class="panel"><div class="metadata-head"><div><div class="panel-title">博主互动</div><div class="date">优先识别博主回复；平台不开放的点赞互动会标记为空。</div></div><div class="review-actions"><button class="small-btn" onclick="fetchCurrentVideoComments()">自动抓取抖音</button><button class="small-btn" onclick="importCurrentVideoInteractions()">手动导入</button></div></div>${finalCommentListHtml(finalVideoInteractions(video), "暂无博主互动。可能是博主未回复，或抖音限制了回复接口。")}</section>`;
    return;
  }
  const transcript = getVideoDetailTranscript(video);
  box.innerHTML = `<section class="panel"><div class="panel-title">转录正文</div><p style="white-space:pre-wrap;line-height:1.8;color:#dce6f5">${escapeHtml(transcript || "暂无转录。先点上方“语音转文字”，或把文字粘贴到转写框里。")}</p></section>`;
};

globalThis.showDetailTab = showDetailTab;
globalThis.generateAiForCurrent = generateAiForCurrent;
globalThis.importCurrentVideoComments = importCurrentVideoComments;
globalThis.importCurrentVideoInteractions = importCurrentVideoInteractions;
globalThis.fetchCurrentVideoComments = fetchCurrentVideoComments;
globalThis.xiaokeFetchDouyinStatus = xiaokeFetchDouyinStatus;
globalThis.startDouyinCookieLogin = startDouyinCookieLogin;
globalThis.pollDouyinCookieStatus = pollDouyinCookieStatus;
globalThis.startDouyinBloggerSync = startDouyinBloggerSync;
globalThis.pollDouyinSyncStatus = pollDouyinSyncStatus;
globalThis.transcribeVideo = transcribeVideo;
globalThis.startVideoBackgroundQueue = startVideoBackgroundQueue;
globalThis.loadMoreLibraryVideos = loadMoreLibraryVideos;
globalThis.autoFillVisibleStockProfiles = autoFillVisibleStockProfiles;

const XIAOKE_LIBRARY_BULK_JOB_KEY = "xiaoke_library_bulk_job_v2";
const xiaokeOriginalPollDouyinSyncStatus = pollDouyinSyncStatus;

function xiaokeReadBulkJob() {
  try {
    return JSON.parse(localStorage.getItem(XIAOKE_LIBRARY_BULK_JOB_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function xiaokeWriteBulkJob(patch = {}) {
  const next = { ...xiaokeReadBulkJob(), ...patch, updatedAt: new Date().toISOString() };
  localStorage.setItem(XIAOKE_LIBRARY_BULK_JOB_KEY, JSON.stringify(next));
  state.libraryBulkJob = next;
  return next;
}

function xiaokeVideoIdKeys(video = {}) {
  const values = [
    video.id,
    video.sourceId,
    video.awemeId,
    video.originalUrl,
    video.shareUrl,
    video.sourceUrl,
    video.webpageUrl,
    xiaokeVideoDouyinUrl(video)
  ].filter(Boolean).map(item => String(item));
  values.forEach(item => {
    const match = item.match(/\d{10,}/);
    if (match) values.push(match[0]);
  });
  return uniqueClean(values);
}

async function xiaokeMergeDouyinSideDataFromServer() {
  try {
    const response = await fetch("/api/douyin-side-data", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "读取抖音侧数据失败");
    const commentStore = finalReadVideoSideData("xiaoke_video_hot_comments_v1");
    const interactionStore = finalReadVideoSideData("xiaoke_video_author_interactions_v1");
    let merged = 0;
    (state.videos || []).forEach(video => {
      const keys = xiaokeVideoIdKeys(video);
      const comments = keys.map(key => data.comments && data.comments[key]).find(Array.isArray);
      const interactions = keys.map(key => data.interactions && data.interactions[key]).find(Array.isArray);
      if (comments && comments.length && !commentStore[video.id]) {
        commentStore[video.id] = comments.slice(0, 50);
        merged += 1;
      }
      if (interactions && interactions.length && !interactionStore[video.id]) {
        interactionStore[video.id] = interactions.slice(0, 30);
        merged += 1;
      }
    });
    finalSaveVideoSideData("xiaoke_video_hot_comments_v1", commentStore);
    finalSaveVideoSideData("xiaoke_video_author_interactions_v1", interactionStore);
    return merged;
  } catch (error) {
    return 0;
  }
}

function xiaokeVideoQualityFlags(video = {}) {
  const title = quickVideoTitle(video);
  const transcript = getVideoDetailTranscript(video);
  const hasTranscript = !isEmptyTranscript(transcript) && String(transcript || "").trim().length > 30;
  const hasAnalysis = Boolean(readVideoAnalyses()[video.id] || readStructuredAnalyses()[video.id]);
  const hasComments = finalVideoComments(video).length > 0 || finalVideoInteractions(video).length > 0;
  const hasSource = Boolean(xiaokeVideoDouyinUrl(video) || video.videoUrl || video.documentUrl || video.originalUrl);
  return {
    title,
    hasTranscript,
    hasAnalysis,
    hasComments,
    hasSource,
    labels: [
      hasTranscript ? "" : "待转写",
      hasAnalysis ? "" : "待AI",
      hasComments ? "" : "待评论",
      hasSource ? "" : "缺来源"
    ].filter(Boolean)
  };
}

function editVideoRecord(id) {
  const video = (state.videos || []).find(item => String(item.id) === String(id));
  if (!video) return showToast("没有找到这条视频");
  const title = prompt("视频标题", quickVideoTitle(video) || "");
  if (title == null) return;
  const date = prompt("日期，例如 2026-06-13", video.date || "");
  if (date == null) return;
  const likes = prompt("点赞数，只填数字或 1.2万 这种", video.likes || "");
  if (likes == null) return;
  const comments = prompt("评论数，只填数字", video.comments || "");
  if (comments == null) return;
  const url = prompt("抖音原链接/视频链接，可留空", video.originalUrl || video.shareUrl || video.sourceUrl || "");
  if (url == null) return;
  video.title = title.trim() || video.title || "";
  video.topic = video.topic || video.title;
  video.date = date.trim() || video.date || "";
  video.likes = likes.trim() || video.likes || 0;
  video.comments = comments.trim() || video.comments || 0;
  if (url.trim()) video.originalUrl = url.trim();
  saveUserVideos(state.videos || []);
  showToast("视频信息已保存");
  if (state.view === "library") renderLibrary();
  if (state.view === "detail") renderDetail();
}

async function xiaokeGenerateVideoAIQuiet(video = {}, force = false) {
  if (!video.id) return false;
  if (!force && readVideoAnalyses()[video.id]) return false;
  let provider = localStorage.getItem(AGENT_PROVIDER_KEY) || "workbuddy";
  if (provider === "auto") provider = "workbuddy";
  let answer = "";
  try {
    answer = await callAgentProvider(provider, buildVideoAnalysisPrompt(video));
  } catch {
    answer = await callAgentProvider("mock", buildVideoAnalysisPrompt(video));
    answer = "当前大模型调用失败，先用本地分析占位：\n\n" + answer;
  }
  saveVideoAnalysis(video.id, answer);
  return true;
}

function xiaokeStoreCommentResult(video, data = {}) {
  const commentsStore = finalReadVideoSideData("xiaoke_video_hot_comments_v1");
  const interactionsStore = finalReadVideoSideData("xiaoke_video_author_interactions_v1");
  if (Array.isArray(data.comments) && data.comments.length) commentsStore[video.id] = data.comments.slice(0, 50);
  if (Array.isArray(data.interactions) && data.interactions.length) interactionsStore[video.id] = data.interactions.slice(0, 30);
  finalSaveVideoSideData("xiaoke_video_hot_comments_v1", commentsStore);
  finalSaveVideoSideData("xiaoke_video_author_interactions_v1", interactionsStore);
}

async function xiaokeFetchVideoCommentsQuiet(video = {}, force = false) {
  const url = xiaokeVideoDouyinUrl(video);
  if (!url) return { skipped: true, reason: "没有抖音链接" };
  if (!force && (finalVideoComments(video).length || finalVideoInteractions(video).length)) {
    return { skipped: true, reason: "已有评论/互动" };
  }
  const response = await fetch("/api/douyin-comments?limit=80&videoId=" + encodeURIComponent(video.id) + "&url=" + encodeURIComponent(url));
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error([data.error, data.detail, data.hint].filter(Boolean).join(" | ") || "评论抓取失败");
  xiaokeStoreCommentResult(video, data);
  return { comments: (data.comments || []).length, interactions: (data.interactions || []).length };
}

fetchCurrentVideoComments = async function xiaokeFinalFetchCurrentVideoComments() {
  const video = (state.videos || []).find(item => String(item.id) === String(state.currentVideoId));
  if (!video) return showToast("没有找到当前视频");
  const url = xiaokeVideoDouyinUrl(video);
  if (!url) {
    showToast("这条视频缺少抖音原链接。点素材卡片“改”，补原链接后再抓评论。");
    return;
  }
  await xiaokeFetchDouyinStatus(true);
  showToast("正在抓取高赞评论/博主互动；失败不会影响转写和 AI。");
  try {
    const result = await xiaokeFetchVideoCommentsQuiet(video, true);
    showToast(`已抓取评论 ${Number(result.comments || 0)} 条，互动 ${Number(result.interactions || 0)} 条`);
    showDetailTab(Number(result.interactions || 0) ? "interaction" : "comments");
  } catch (error) {
    showToast("评论抓取失败：" + (error.message || "抖音限制了本次访问，请稍后重试"));
    showDetailTab("comments");
  }
};

function xiaokeBulkStatusHtml() {
  const job = state.libraryBulkJob || xiaokeReadBulkJob();
  if (!job || !job.status || job.status === "idle") return "";
  const color = job.status === "failed" ? "var(--red)" : (job.status === "done" ? "var(--green)" : "var(--gold)");
  const lastError = (job.errors || []).slice(-1)[0];
  return `<section class="panel" style="border-color:${color};margin-bottom:12px">
    <div class="metadata-head">
      <div>
        <div class="panel-title">批量补全：${escapeHtml(job.status)}</div>
        <div class="date">进度 ${Number(job.done || 0)} / ${Number(job.total || 0)} · 评论 ${Number(job.comments || 0)} · 互动 ${Number(job.interactions || 0)} · AI ${Number(job.ai || 0)} · 跳过 ${Number(job.skipped || 0)}${job.current ? ` · ${escapeHtml(job.current)}` : ""}</div>
      </div>
      <div class="review-actions">
        ${job.status === "running" ? `<button class="small-btn" onclick="cancelLibraryFullSync()">停止</button>` : ""}
        <button class="small-btn" onclick="renderLibrary()">刷新</button>
      </div>
    </div>
    ${lastError ? `<div class="date" style="color:#ff9bad">最近失败：${escapeHtml(lastError.title || "")} ${escapeHtml(lastError.error || "")}</div>` : ""}
  </section>`;
}

function cancelLibraryFullSync() {
  window.__xiaokeCancelLibraryFullSync = true;
  xiaokeWriteBulkJob({ status: "cancelled", current: "" });
  showToast("已停止批量补全队列");
  if (state.view === "library") renderLibrary();
}

async function runLibraryFullSyncQueue(targets = [], options = {}) {
  window.__xiaokeCancelLibraryFullSync = false;
  xiaokeWriteBulkJob({
    status: "running",
    total: targets.length,
    done: 0,
    comments: 0,
    interactions: 0,
    ai: 0,
    skipped: 0,
    errors: [],
    current: ""
  });
  if (state.view === "library") renderLibrary();
  for (const video of targets) {
    if (window.__xiaokeCancelLibraryFullSync) break;
    const title = quickVideoTitle(video);
    const job = xiaokeReadBulkJob();
    xiaokeWriteBulkJob({ current: title });
    if (options.comments !== false) {
      try {
        const result = await xiaokeFetchVideoCommentsQuiet(video, Boolean(options.forceComments));
        const currentJob = xiaokeReadBulkJob();
        if (result && !result.skipped) {
          xiaokeWriteBulkJob({
            comments: Number(currentJob.comments || 0) + Number(result.comments || 0),
            interactions: Number(currentJob.interactions || 0) + Number(result.interactions || 0)
          });
        } else {
          xiaokeWriteBulkJob({ skipped: Number(currentJob.skipped || 0) + 1 });
        }
      } catch (error) {
        const next = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(next.errors || []), { id: video.id, title, step: "comments", error: String(error.message || error).slice(0, 260) }].slice(-20)
        });
      }
    }
    if (options.ai !== false) {
      try {
        const made = await xiaokeGenerateVideoAIQuiet(video, Boolean(options.forceAi));
        if (made) xiaokeWriteBulkJob({ ai: Number(xiaokeReadBulkJob().ai || 0) + 1 });
      } catch (error) {
        const next = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(next.errors || []), { id: video.id, title, step: "ai", error: String(error.message || error).slice(0, 260) }].slice(-20)
        });
      }
    }
    const next = xiaokeReadBulkJob();
    xiaokeWriteBulkJob({ done: Number(next.done || 0) + 1 });
    if (state.view === "library" && (Number(next.done || 0) % 4 === 0)) renderLibrary();
    await new Promise(resolve => setTimeout(resolve, Number(options.delayMs || 1200)));
  }
  const finalStatus = window.__xiaokeCancelLibraryFullSync ? "cancelled" : "done";
  xiaokeWriteBulkJob({ status: finalStatus, current: "", finishedAt: new Date().toISOString() });
  window.__xiaokeCancelLibraryFullSync = false;
  await xiaokeMergeDouyinSideDataFromServer();
  if (state.view === "library") renderLibrary();
  showToast(finalStatus === "done" ? "批量补全完成" : "批量补全已停止");
}

function startLibraryFullSync(options = {}) {
  const running = xiaokeReadBulkJob().status === "running";
  if (running) return showToast("已有批量任务在运行，先停止或等待完成");
  const all = filteredVideos();
  if (!all.length) return showToast("当前筛选没有视频");
  let max = Number(options.max || 0);
  if (!options.auto) {
    const text = prompt(`本次处理多少条？当前筛选 ${all.length} 条。建议先 50；输入 all 处理全部。`, "50");
    if (text == null) return;
    max = /^all|全部$/i.test(String(text).trim()) ? all.length : Number(text || 50);
  }
  max = Math.max(1, Math.min(all.length, Number(max || all.length)));
  const targets = all.slice(0, max);
  showToast(`开始后台补全 ${targets.length} 条：评论/互动/AI`);
  runLibraryFullSyncQueue(targets, { comments: true, ai: true, delayMs: options.delayMs || 1200 });
}

pollDouyinSyncStatus = async function xiaokePollDouyinSyncStatus(forceRender = false) {
  const job = await xiaokeOriginalPollDouyinSyncStatus(forceRender);
  if (job && job.status === "done") {
    const merged = await xiaokeMergeDouyinSideDataFromServer();
    if (merged && forceRender) showToast(`已合并抖音评论/互动 ${merged} 组`);
    if (state.xiaokeRunAiAfterDouyinSync) {
      state.xiaokeRunAiAfterDouyinSync = false;
      startLibraryFullSync({ auto: true, max: Math.min(Number(job.saved || job.total || 20), 50), delayMs: 1000 });
    }
  }
  return job;
};

startDouyinBloggerSync = async function xiaokeSafeBloggerSync() {
  const url = prompt("粘贴抖音博主主页、合集或单条视频链接。后台限量同步，避免一次拉 3000 条。", localStorage.getItem("xiaoke_last_douyin_sync_url") || "");
  if (!url) return;
  localStorage.setItem("xiaoke_last_douyin_sync_url", url.trim());
  const limitText = prompt("本次最多同步多少条最新视频？建议 10-20，最多 50。", localStorage.getItem("xiaoke_last_douyin_sync_limit") || "20");
  if (limitText == null) return;
  const limit = Math.max(1, Math.min(50, Number(limitText) || 20));
  localStorage.setItem("xiaoke_last_douyin_sync_limit", String(limit));
  showToast("已提交抖音后台同步：视频 + 高赞评论 + 博主互动；完成后会自动补 AI");
  try {
    const response = await fetch("/api/douyin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim(), limit, download: true, comments: true })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "启动同步失败");
    state.douyinSyncJob = data.job;
    state.xiaokeRunAiAfterDouyinSync = true;
    if (state.view === "library") renderLibrary();
    pollDouyinSyncStatus(true);
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查链接/cookies"));
  }
};

videoCardHtml = function xiaokeManagedVideoCardHtml(video = {}) {
  const quality = xiaokeVideoQualityFlags(video);
  const idArg = JSON.stringify(video.id);
  const media = video.thumbnail
    ? `<img src="${escapeHtml(video.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover">`
    : video.videoUrl ? `<video src="${escapeHtml(video.videoUrl)}" muted preload="metadata"></video>` : `<div class="poster">${video.isDocument ? "书" : "链"}</div>`;
  const badge = video.isMetadata ? "元数据" : video.local ? "本地" : video.isDocument ? "书籍" : "样例";
  const groups = typeof videoGroupsFor === "function" ? videoGroupsFor(video.id).slice(0, 2) : [];
  return `
    <article class="video-card" data-video-id="${escapeHtml(video.id)}" onclick='openDetail(${idArg})'>
      <div class="thumb">${media}<span class="play">${video.isMetadata ? "↗" : "▶"}</span></div>
      <div class="vc-body">
        <div class="metadata-head" style="align-items:flex-start;gap:8px">
          <h3 style="margin:0;min-width:0">${escapeHtml(quality.title)}</h3>
          <div class="review-actions" style="flex:0 0 auto;gap:4px">
            <button class="mini-btn" title="编辑" onclick='event.stopPropagation();editVideoRecord(${idArg})'>改</button>
            <button class="mini-btn danger-btn" title="删除" onclick='event.stopPropagation();deleteVideo(${idArg})'>删</button>
          </div>
        </div>
        <div class="metrics"><span>赞 <strong>${escapeHtml(video.likes || 0)}</strong></span><span>评 ${escapeHtml(video.comments || 0)}</span><span>转 ${escapeHtml(video.shares || 0)}</span></div>
        <div class="date" style="margin-top:7px">${escapeHtml(badge)} · ${escapeHtml(video.date || "-")}</div>
        ${quality.labels.length ? `<div class="video-group-row">${quality.labels.map(label => `<span class="video-group-badge">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
        ${groups.length ? `<div class="video-group-row">${groups.map(name => `<span class="video-group-badge">${escapeHtml(name)}</span>`).join("")}</div>` : ""}
      </div>
    </article>
  `;
};

renderLibrary = function xiaokeManagedLibraryRender() {
  state.view = "library";
  restoredRenderShell();
  if (!state.douyinCaptureStatus) {
    xiaokeFetchDouyinStatus(true).then(() => {
      if (state.view === "library") renderLibrary();
    });
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="startDouyinBloggerSync()">自动同步博主</button>
        <button class="small-btn" onclick="startLibraryFullSync()">同步全部评论/互动/AI</button>
        <button class="small-btn" onclick="Promise.all([pollDouyinCookieStatus(true),pollDouyinSyncStatus(true)]).then(()=>renderLibrary())">抓取状态</button>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${xiaokeDouyinStatusHtml()}
    ${xiaokeBulkStatusHtml()}
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

globalThis.editVideoRecord = editVideoRecord;
globalThis.startLibraryFullSync = startLibraryFullSync;
globalThis.cancelLibraryFullSync = cancelLibraryFullSync;
globalThis.xiaokeMergeDouyinSideDataFromServer = xiaokeMergeDouyinSideDataFromServer;
globalThis.startDouyinBloggerSync = startDouyinBloggerSync;
globalThis.pollDouyinSyncStatus = pollDouyinSyncStatus;
globalThis.renderLibrary = renderLibrary;
globalThis.videoCardHtml = videoCardHtml;

const XIAOKE_DEFAULT_BLOGGER_NAME = "模型先生";
const XIAOKE_DOUYIN_BLOGGER_URL_KEY = "xiaoke_last_douyin_sync_url";
const XIAOKE_DOUYIN_SYNC_LIMIT_KEY = "xiaoke_last_douyin_sync_limit";

function xiaokeTodayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function xiaokeHasVideoAI(video = {}) {
  return Boolean(readVideoAnalyses()[video.id] || readStructuredAnalyses()[video.id]);
}

function xiaokeNeedsBulkWork(video = {}, options = {}) {
  const commentsEnabled = options.comments !== false;
  const aiEnabled = options.ai !== false;
  const sourceUrl = xiaokeVideoDouyinUrl(video);
  const missingComments = commentsEnabled && Boolean(sourceUrl) && !finalVideoComments(video).length && !finalVideoInteractions(video).length;
  const missingAi = aiEnabled && !xiaokeHasVideoAI(video);
  return Boolean(missingComments || missingAi);
}

function xiaokeSelectBulkTargets(videos = [], options = {}) {
  const force = Boolean(options.force || options.forceComments || options.forceAi);
  if (force) return videos.slice();
  return videos.filter(video => xiaokeNeedsBulkWork(video, options));
}

function configureDouyinBloggerSource() {
  const current = localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "";
  const next = prompt(`设置「${XIAOKE_DEFAULT_BLOGGER_NAME}」抖音主页/合集链接。\n\n这里只保存一次，之后点“自动同步博主”会直接使用。`, current);
  if (next == null) return;
  const url = next.trim();
  if (!url) {
    localStorage.removeItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY);
    showToast("已清空博主来源链接");
    if (state.view === "library") renderLibrary();
    return;
  }
  if (!/^https?:\/\//i.test(url) || !/douyin\.com|iesdouyin\.com/i.test(url)) {
    showToast("请粘贴抖音主页、合集或视频链接；只填“模型先生”无法稳定抓取。");
    return;
  }
  localStorage.setItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY, url);
  showToast("已保存模型先生抖音来源链接");
  if (state.view === "library") renderLibrary();
}

startDouyinBloggerSync = async function xiaokeSafeBloggerSyncV2(options = {}) {
  let url = (localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "").trim();
  if (!url) {
    configureDouyinBloggerSource();
    url = (localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "").trim();
    if (!url) return;
  }
  const limit = Math.max(1, Math.min(50, Number(options.limit || localStorage.getItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY) || 20)));
  localStorage.setItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY, String(limit));
  showToast(`已提交「${XIAOKE_DEFAULT_BLOGGER_NAME}」后台同步：最多 ${limit} 条，完成后补评论/互动/AI`);
  try {
    const response = await fetch("/api/douyin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, limit, download: true, comments: true })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "启动同步失败");
    state.douyinSyncJob = data.job;
    state.xiaokeRunAiAfterDouyinSync = true;
    if (state.view === "library") renderLibrary();
    pollDouyinSyncStatus(true);
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查链接/cookies"));
  }
};

function createManualVideoRecord() {
  const title = prompt("新增视频标题", "");
  if (title == null) return;
  const cleanTitle = title.trim() || "手动新增视频";
  const url = prompt("抖音原链接/视频链接（可留空，后续可点“改”补）", "");
  if (url == null) return;
  const date = prompt("日期，例如 2026-06-14", xiaokeTodayString());
  if (date == null) return;
  const groupsText = prompt("加入哪些板块/分组？多个用逗号分隔，例如：有色金属, 光模块", state.activeTag && state.activeTag !== "全部" ? state.activeTag : "");
  if (groupsText == null) return;
  const transcript = prompt("转写/备注（可留空）", "");
  if (transcript == null) return;
  const id = `manual_${Date.now()}`;
  const video = {
    id,
    title: cleanTitle,
    topic: cleanTitle,
    author: XIAOKE_DEFAULT_BLOGGER_NAME,
    date: (date || "").trim() || xiaokeTodayString(),
    likes: 0,
    comments: 0,
    shares: 0,
    originalUrl: (url || "").trim(),
    transcript: transcript.trim(),
    userAdded: true,
    local: false
  };
  state.videos = [video, ...(state.videos || [])];
  saveUserVideos(state.videos);
  const groups = uniqueClean(String(groupsText || "").split(/[，,、/]+/));
  if (groups.length) {
    const assignments = readVideoAssignments();
    assignments[id] = groups;
    saveVideoAssignments(assignments);
    saveVideoGroups([...readVideoGroups(), ...groups]);
  }
  clearVideoRuntimeCache(id);
  renderTopChips();
  renderLibrary();
  showToast("已新增到素材库");
}

function xiaokeVideoGroupControls(video = {}) {
  const groups = videoGroupsFor(video.id);
  const badges = groups.slice(0, 4).map(name => `
    <button class="video-group-badge" title="从这个分组移除" onclick='event.stopPropagation();removeVideoFromGroup(${JSON.stringify(video.id)}, ${JSON.stringify(name)})'>${escapeHtml(name)} ×</button>
  `).join("");
  return `<div class="video-group-row">${badges}<button class="video-add-group" onclick='event.stopPropagation();addVideoToGroup(${JSON.stringify(video.id)})'>+板块</button></div>`;
}

videoCardHtml = function xiaokeManagedVideoCardHtmlV2(video = {}) {
  const quality = xiaokeVideoQualityFlags(video);
  const idArg = JSON.stringify(video.id);
  const media = video.thumbnail
    ? `<img src="${escapeHtml(video.thumbnail)}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover">`
    : video.videoUrl ? `<video src="${escapeHtml(video.videoUrl)}" muted preload="none"></video>` : `<div class="poster">${video.isDocument ? "书" : "链"}</div>`;
  const badge = video.isMetadata ? "元数据" : video.local ? "本地" : video.isDocument ? "书籍" : "样例";
  return `
    <article class="video-card" data-video-id="${escapeHtml(video.id)}" onclick='openDetail(${idArg})'>
      <div class="thumb">${media}<span class="play">${video.isMetadata ? "↗" : "▶"}</span></div>
      <div class="vc-body">
        <div class="metadata-head" style="align-items:flex-start;gap:8px">
          <h3 style="margin:0;min-width:0">${escapeHtml(quality.title)}</h3>
          <div class="review-actions" style="flex:0 0 auto;gap:4px">
            <button class="mini-btn" title="编辑标题/链接" onclick='event.stopPropagation();editVideoRecord(${idArg})'>改</button>
            <button class="mini-btn danger-btn" title="删除素材" onclick='event.stopPropagation();deleteVideo(${idArg})'>删</button>
          </div>
        </div>
        <div class="metrics"><span>赞 <strong>${escapeHtml(video.likes || 0)}</strong></span><span>评 ${escapeHtml(video.comments || 0)}</span><span>转 ${escapeHtml(video.shares || 0)}</span></div>
        <div class="date" style="margin-top:7px">${escapeHtml(badge)} · ${escapeHtml(video.date || "-")}</div>
        ${quality.labels.length ? `<div class="video-group-row">${quality.labels.map(label => `<span class="video-group-badge">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
        ${xiaokeVideoGroupControls(video)}
      </div>
    </article>
  `;
};

xiaokeBulkStatusHtml = function xiaokeBulkStatusHtmlV2() {
  const job = state.libraryBulkJob || xiaokeReadBulkJob();
  if (!job || !job.status || job.status === "idle") return "";
  const color = job.status === "failed" ? "var(--red)" : (job.status === "done" ? "var(--green)" : "var(--gold)");
  const lastError = (job.errors || []).slice(-1)[0];
  const canResume = ["cancelled", "failed", "done"].includes(job.status);
  return `<section class="panel" style="border-color:${color};margin-bottom:12px">
    <div class="metadata-head">
      <div>
        <div class="panel-title">批量补全：${escapeHtml(job.status)}</div>
        <div class="date">进度 ${Number(job.done || 0)} / ${Number(job.total || 0)} · 评论 ${Number(job.comments || 0)} · 互动 ${Number(job.interactions || 0)} · AI ${Number(job.ai || 0)} · 跳过 ${Number(job.skipped || 0)}${job.current ? ` · ${escapeHtml(job.current)}` : ""}</div>
      </div>
      <div class="review-actions">
        ${job.status === "running" ? `<button class="small-btn" onclick="cancelLibraryFullSync()">暂停</button>` : ""}
        ${canResume ? `<button class="small-btn" onclick="resumeLibraryFullSync()">继续未完成</button>` : ""}
        ${canResume ? `<button class="small-btn" onclick="startLibraryFullSync({force:true})">强制重跑当前筛选</button>` : ""}
        <button class="small-btn" onclick="renderLibrary()">刷新</button>
      </div>
    </div>
    ${lastError ? `<div class="date" style="color:#ff9bad">最近失败：${escapeHtml(lastError.title || "")} ${escapeHtml(lastError.error || "")}</div>` : ""}
  </section>`;
};

runLibraryFullSyncQueue = async function runLibraryFullSyncQueueV2(targets = [], options = {}) {
  window.__xiaokeCancelLibraryFullSync = false;
  xiaokeWriteBulkJob({
    status: "running",
    total: targets.length,
    done: 0,
    comments: 0,
    interactions: 0,
    ai: 0,
    skipped: 0,
    errors: [],
    completedIds: [],
    targetIds: targets.map(item => item.id),
    current: ""
  });
  if (state.view === "library") renderLibrary();
  for (const video of targets) {
    if (window.__xiaokeCancelLibraryFullSync) break;
    const title = quickVideoTitle(video);
    xiaokeWriteBulkJob({ current: title });
    const sourceUrl = xiaokeVideoDouyinUrl(video);
    const needsComments = options.forceComments || (options.comments !== false && sourceUrl && !finalVideoComments(video).length && !finalVideoInteractions(video).length);
    const needsAi = options.forceAi || (options.ai !== false && !xiaokeHasVideoAI(video));
    if (!needsComments && !needsAi) {
      const currentJob = xiaokeReadBulkJob();
      xiaokeWriteBulkJob({ skipped: Number(currentJob.skipped || 0) + 1 });
    }
    if (needsComments) {
      try {
        const result = await xiaokeFetchVideoCommentsQuiet(video, Boolean(options.forceComments));
        const currentJob = xiaokeReadBulkJob();
        if (result && !result.skipped) {
          xiaokeWriteBulkJob({
            comments: Number(currentJob.comments || 0) + Number(result.comments || 0),
            interactions: Number(currentJob.interactions || 0) + Number(result.interactions || 0)
          });
        } else {
          xiaokeWriteBulkJob({ skipped: Number(currentJob.skipped || 0) + 1 });
        }
      } catch (error) {
        const next = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(next.errors || []), { id: video.id, title, step: "comments", error: String(error.message || error).slice(0, 260) }].slice(-20)
        });
      }
    }
    if (needsAi) {
      try {
        const made = await xiaokeGenerateVideoAIQuiet(video, Boolean(options.forceAi));
        if (made) xiaokeWriteBulkJob({ ai: Number(xiaokeReadBulkJob().ai || 0) + 1 });
      } catch (error) {
        const next = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(next.errors || []), { id: video.id, title, step: "ai", error: String(error.message || error).slice(0, 260) }].slice(-20)
        });
      }
    }
    const next = xiaokeReadBulkJob();
    xiaokeWriteBulkJob({
      done: Number(next.done || 0) + 1,
      completedIds: [...new Set([...(next.completedIds || []), video.id])]
    });
    if (state.view === "library" && (Number(next.done || 0) % 4 === 0)) renderLibrary();
    await new Promise(resolve => setTimeout(resolve, Number(options.delayMs || 1200)));
  }
  const finalStatus = window.__xiaokeCancelLibraryFullSync ? "cancelled" : "done";
  xiaokeWriteBulkJob({ status: finalStatus, current: "", finishedAt: new Date().toISOString() });
  window.__xiaokeCancelLibraryFullSync = false;
  await xiaokeMergeDouyinSideDataFromServer();
  if (state.view === "library") renderLibrary();
  showToast(finalStatus === "done" ? "批量补全完成" : "批量补全已暂停，可点继续未完成");
};

startLibraryFullSync = function startLibraryFullSyncV2(options = {}) {
  const running = xiaokeReadBulkJob().status === "running";
  if (running) return showToast("已有批量任务在运行，先暂停或等待完成");
  const all = filteredVideos();
  if (!all.length) return showToast("当前筛选没有视频");
  const force = Boolean(options.force);
  let max = Number(options.max || 0);
  if (!options.auto) {
    const defaultText = force ? "20" : "50";
    const text = prompt(`本次处理多少条？当前筛选 ${all.length} 条。默认只处理未完成；输入 all 处理全部可处理项。`, defaultText);
    if (text == null) return;
    max = /^all|全部$/i.test(String(text).trim()) ? all.length : Number(text || defaultText);
  }
  const candidates = xiaokeSelectBulkTargets(all, { comments: true, ai: true, force, forceComments: force, forceAi: force });
  if (!candidates.length) return showToast("当前筛选没有需要补全的视频；如需重跑请点强制重跑。");
  max = Math.max(1, Math.min(candidates.length, Number(max || candidates.length)));
  const targets = candidates.slice(0, max);
  showToast(`开始后台补全 ${targets.length} 条：跳过已完成项，只处理缺评论/互动/AI的视频`);
  runLibraryFullSyncQueue(targets, { comments: true, ai: true, forceComments: force, forceAi: force, delayMs: options.delayMs || 1200 });
};

function resumeLibraryFullSync() {
  const job = xiaokeReadBulkJob();
  const completed = new Set(job.completedIds || []);
  const targetIds = Array.isArray(job.targetIds) ? job.targetIds : [];
  let pool = targetIds.length
    ? targetIds.map(id => (state.videos || []).find(video => video.id === id)).filter(Boolean)
    : filteredVideos();
  pool = pool.filter(video => !completed.has(video.id));
  const targets = xiaokeSelectBulkTargets(pool, { comments: true, ai: true });
  if (!targets.length) return startLibraryFullSync({ auto: true, max: 50 });
  showToast(`继续补全 ${targets.length} 条未完成视频`);
  runLibraryFullSyncQueue(targets, { comments: true, ai: true, delayMs: 1200 });
}

renderLibrary = function xiaokeManagedLibraryRenderV2() {
  state.view = "library";
  restoredRenderShell();
  if (!state.douyinCaptureStatus) {
    xiaokeFetchDouyinStatus(true).then(() => {
      if (state.view === "library") renderLibrary();
    });
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const bloggerUrl = localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "";
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="createManualVideoRecord()">+新增视频</button>
        <button class="small-btn" onclick="configureDouyinBloggerSource()">设置博主来源</button>
        <button class="small-btn" onclick="startDouyinBloggerSync()">自动同步博主</button>
        <button class="small-btn" onclick="startLibraryFullSync()">同步全部评论/互动/AI</button>
        <button class="small-btn" onclick="Promise.all([pollDouyinCookieStatus(true),pollDouyinSyncStatus(true)]).then(()=>renderLibrary())">抓取状态</button>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${bloggerUrl ? `<section class="panel" style="margin-bottom:12px"><div class="date">当前博主来源：${escapeHtml(compactPlainText(bloggerUrl, 120))}</div></section>` : ""}
    ${xiaokeDouyinStatusHtml()}
    ${xiaokeBulkStatusHtml()}
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

globalThis.configureDouyinBloggerSource = configureDouyinBloggerSource;
globalThis.createManualVideoRecord = createManualVideoRecord;
globalThis.resumeLibraryFullSync = resumeLibraryFullSync;
globalThis.startLibraryFullSync = startLibraryFullSync;
globalThis.runLibraryFullSyncQueue = runLibraryFullSyncQueue;
globalThis.xiaokeBulkStatusHtml = xiaokeBulkStatusHtml;
globalThis.startDouyinBloggerSync = startDouyinBloggerSync;
globalThis.addVideoToGroup = addVideoToGroup;
globalThis.removeVideoFromGroup = removeVideoFromGroup;
globalThis.videoCardHtml = videoCardHtml;
globalThis.renderLibrary = renderLibrary;

function xiaokeBulkJobPercent(job = {}) {
  const total = Math.max(0, Number(job.total || 0));
  if (!total) return 0;
  return Math.min(100, Math.round((Number(job.done || 0) / total) * 100));
}

function xiaokeBulkNeedText(video = {}) {
  const needs = [];
  if (xiaokeVideoDouyinUrl(video) && !finalVideoComments(video).length && !finalVideoInteractions(video).length) needs.push("评论/互动");
  if (!xiaokeHasVideoAI(video)) needs.push("AI");
  if (!needs.length) return "已完整";
  return needs.join("、");
}

function xiaokeBulkStatusFor(video = {}, job = {}) {
  const completed = new Set(job.completedIds || []);
  const errors = (job.errors || []).filter(row => row.id === video.id);
  if (errors.length) return "有错误";
  if (completed.has(video.id)) return "已处理";
  if (!xiaokeNeedsBulkWork(video, { comments: true, ai: true })) return "已完整";
  return "待处理";
}

function clearLibraryBulkJob() {
  localStorage.removeItem(XIAOKE_LIBRARY_BULK_JOB_KEY);
  state.libraryBulkJob = { status: "idle" };
  showToast("已清空批量队列记录");
  openLibraryBulkQueue();
}

function openLibraryBulkQueue() {
  state.view = "libraryBulkQueue";
  restoredRenderShell();
  const job = state.libraryBulkJob || xiaokeReadBulkJob();
  const targetIds = Array.isArray(job.targetIds) ? job.targetIds : [];
  const rows = (targetIds.length
    ? targetIds.map(id => (state.videos || []).find(video => video.id === id)).filter(Boolean)
    : xiaokeSelectBulkTargets(filteredVideos(), { comments: true, ai: true })).slice(0, 120);
  const byError = new Map((job.errors || []).map(row => [row.id, row]));
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">批量补全队列</div>
        <div class="date">用于查看评论/互动/AI 补全进度。默认跳过已完成素材，避免重复识别。</div>
      </div>
      <div class="review-actions">
        ${job.status === "running" ? `<button class="small-btn" onclick="cancelLibraryFullSync();openLibraryBulkQueue()">暂停</button>` : ""}
        <button class="open-btn" onclick="resumeLibraryFullSync()">继续未完成</button>
        <button class="small-btn" onclick="startLibraryFullSync()">同步当前筛选未完成</button>
        <button class="small-btn" onclick="clearLibraryBulkJob()">清空记录</button>
        <button class="small-btn" onclick="renderLibrary()">返回素材库</button>
      </div>
    </section>
    <section class="panel">
      <div class="metadata-head">
        <div>
          <div class="panel-title">当前状态：${escapeHtml(job.status || "idle")}</div>
          <div class="date">进度 ${Number(job.done || 0)} / ${Number(job.total || 0)} · 评论 ${Number(job.comments || 0)} · 互动 ${Number(job.interactions || 0)} · AI ${Number(job.ai || 0)} · 跳过 ${Number(job.skipped || 0)}</div>
        </div>
        <span class="pill">${xiaokeBulkJobPercent(job)}%</span>
      </div>
      <div style="height:8px;background:#101722;border-radius:999px;overflow:hidden;margin-top:14px">
        <div style="width:${xiaokeBulkJobPercent(job)}%;height:100%;background:linear-gradient(90deg,var(--green),#4b8dff)"></div>
      </div>
    </section>
    <section class="panel">
      <div class="metadata-head">
        <div>
          <div class="panel-title">队列明细</div>
          <div class="date">${rows.length ? `显示 ${rows.length} 条` : "没有历史队列；可以返回素材库发起一次同步。"}</div>
        </div>
      </div>
      ${rows.length ? `<div class="table-wrap"><table>
        <thead><tr><th>视频</th><th>状态</th><th>还缺什么</th><th>板块</th><th>最近错误</th></tr></thead>
        <tbody>
          ${rows.map(video => {
            const error = byError.get(video.id);
            return `<tr>
              <td><b>${escapeHtml(quickVideoTitle(video))}</b><br><span class="date">${escapeHtml(video.date || "-")}</span></td>
              <td>${escapeHtml(xiaokeBulkStatusFor(video, job))}</td>
              <td>${escapeHtml(xiaokeBulkNeedText(video))}</td>
              <td>${videoGroupsFor(video.id).slice(0, 3).map(escapeHtml).join(" / ") || "-"}</td>
              <td>${error ? escapeHtml(String(error.error || "").slice(0, 80)) : "-"}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table></div>` : ""}
    </section>
  `;
}

function bulkAssignFilteredVideosToGroup() {
  const videos = filteredVideos();
  if (!videos.length) return showToast("当前筛选没有视频");
  const existing = [...new Set([...tags.filter(t => t.type === "sector").map(t => sectorDisplayName(t)), ...readVideoGroups()])];
  const defaultGroup = state.activeTag && state.activeTag !== "全部" ? state.activeTag : (existing[0] || "");
  const groupName = prompt(`把当前筛选的 ${videos.length} 条视频加入哪个板块/分组？\n\n可填已有分组，也可新建，例如：有色金属 / 光模块 / 交易系统`, defaultGroup);
  if (!groupName) return;
  const clean = groupName.trim();
  if (!clean) return;
  if (!confirm(`确认把当前筛选的 ${videos.length} 条视频全部加入「${clean}」吗？`)) return;
  const assignments = readVideoAssignments();
  videos.forEach(video => {
    assignments[video.id] = [...new Set([...(assignments[video.id] || []), clean])];
  });
  saveVideoAssignments(assignments);
  saveVideoGroups([...readVideoGroups(), clean]);
  renderTopChips();
  renderLibrary();
  showToast(`已批量加入「${clean}」：${videos.length} 条`);
}

renderLibrary = function xiaokeManagedLibraryRenderV3() {
  state.view = "library";
  restoredRenderShell();
  if (!state.douyinCaptureStatus) {
    xiaokeFetchDouyinStatus(true).then(() => {
      if (state.view === "library") renderLibrary();
    });
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const bloggerUrl = localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "";
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="createManualVideoRecord()">+新增视频</button>
        <button class="small-btn" onclick="bulkAssignFilteredVideosToGroup()">批量分组</button>
        <button class="small-btn" onclick="openLibraryBulkQueue()">队列详情</button>
        <button class="small-btn" onclick="configureDouyinBloggerSource()">设置博主来源</button>
        <button class="small-btn" onclick="startDouyinBloggerSync()">自动同步博主</button>
        <button class="small-btn" onclick="startLibraryFullSync()">同步全部评论/互动/AI</button>
        <button class="small-btn" onclick="Promise.all([pollDouyinCookieStatus(true),pollDouyinSyncStatus(true)]).then(()=>renderLibrary())">抓取状态</button>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${bloggerUrl ? `<section class="panel" style="margin-bottom:12px"><div class="date">当前博主来源：${escapeHtml(compactPlainText(bloggerUrl, 120))}</div></section>` : ""}
    ${xiaokeDouyinStatusHtml()}
    ${xiaokeBulkStatusHtml()}
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

globalThis.openLibraryBulkQueue = openLibraryBulkQueue;
globalThis.clearLibraryBulkJob = clearLibraryBulkJob;
globalThis.bulkAssignFilteredVideosToGroup = bulkAssignFilteredVideosToGroup;
globalThis.renderLibrary = renderLibrary;

const XIAOKE_BLOGGER_SOURCES_KEY = "xiaoke_douyin_blogger_sources_v2";
const XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY = "xiaoke_active_douyin_blogger_source_v2";

function xiaokeExtractDouyinUrls(text = "") {
  return [...new Set(String(text || "")
    .match(/https?:\/\/[^\s"'<>，。；、)）]+/gi) || [])]
    .map(url => url.replace(/[，。；、]+$/, ""))
    .filter(url => /douyin\.com|iesdouyin\.com/i.test(url));
}

function xiaokeReadBloggerSources() {
  try {
    const rows = JSON.parse(localStorage.getItem(XIAOKE_BLOGGER_SOURCES_KEY) || "[]");
    if (Array.isArray(rows) && rows.length) return rows.filter(row => row && row.name);
  } catch {}
  const oldUrl = localStorage.getItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY) || "";
  return oldUrl ? [{ id: "blogger_legacy", name: XIAOKE_DEFAULT_BLOGGER_NAME, url: oldUrl, note: "旧来源迁移" }] : [];
}

function xiaokeSaveBloggerSources(rows = []) {
  const clean = rows
    .map(row => ({
      id: row.id || ("blogger_" + Date.now() + "_" + Math.random().toString(36).slice(2)),
      name: String(row.name || XIAOKE_DEFAULT_BLOGGER_NAME).trim(),
      url: String(row.url || "").trim(),
      sampleUrl: String(row.sampleUrl || "").trim(),
      note: String(row.note || "").trim(),
      updatedAt: new Date().toISOString()
    }))
    .filter(row => row.name);
  localStorage.setItem(XIAOKE_BLOGGER_SOURCES_KEY, JSON.stringify(clean));
  const firstLinked = clean.find(row => row.url || row.sampleUrl);
  if (firstLinked) localStorage.setItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY, firstLinked.url || firstLinked.sampleUrl);
  return clean;
}

function xiaokeBloggerSourceLines() {
  const rows = xiaokeReadBloggerSources();
  if (!rows.length) return `${XIAOKE_DEFAULT_BLOGGER_NAME}  `;
  return rows.map(row => [row.name, row.url || row.sampleUrl || "", row.note || ""].filter(Boolean).join("  ")).join("\n");
}

function xiaokeParseBloggerSourceInput(text = "") {
  const lines = String(text || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);
  const rows = [];
  for (const line of lines) {
    const urls = xiaokeExtractDouyinUrls(line);
    const url = urls[0] || "";
    const nameText = url ? line.replace(url, "").replace(/[:：\-—|]+/g, " ").trim() : line;
    const name = (nameText || XIAOKE_DEFAULT_BLOGGER_NAME).replace(/\s+/g, " ").slice(0, 30);
    rows.push({
      id: "blogger_" + Date.now() + "_" + rows.length,
      name,
      url,
      sampleUrl: /\/video\//i.test(url) ? url : "",
      note: url && /\/video\//i.test(url) ? "单条视频链接，只能同步这一条；建议后续补主页/合集链接" : ""
    });
  }
  if (!rows.length) rows.push({ id: "blogger_" + Date.now(), name: XIAOKE_DEFAULT_BLOGGER_NAME, url: "", sampleUrl: "", note: "待补抖音主页或合集链接" });
  return rows;
}

function xiaokeBloggerLinkKind(row = {}) {
  const raw = String(row.url || row.sampleUrl || "").trim();
  if (!raw) return "待补链接";
  if (/\/video\//i.test(raw) || /modal_id=|aweme_id=/i.test(raw)) return "单条视频";
  if (/collection|playlist|mix|series/i.test(raw)) return "合集";
  if (/\/user\/|sec_uid|user\/self|@/i.test(raw)) return "主页";
  if (/v\.douyin\.com/i.test(raw)) return "短链";
  return "抖音链接";
}

function xiaokeBloggerSourceRowHtml(row = {}, index = 0) {
  const linked = Boolean(row.url || row.sampleUrl);
  const kind = xiaokeBloggerLinkKind(row);
  const activeId = localStorage.getItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY);
  const checked = row.id === activeId || (!activeId && linked && index === 0) ? "checked" : "";
  const linkValue = row.url || row.sampleUrl || "";
  return `<div class="source-manager-row" data-id="${escapeHtml(row.id || ("blogger_draft_" + index))}" style="display:grid;grid-template-columns:34px minmax(110px,160px) minmax(280px,1fr) 86px 92px;gap:10px;align-items:stretch;margin-bottom:10px">
    <label class="mini-stat" style="display:flex;align-items:center;justify-content:center;min-height:52px;padding:0"><input type="radio" name="xiaokeActiveBloggerSource" ${checked}></label>
    <input class="pill-input source-name" value="${escapeHtml(row.name || XIAOKE_DEFAULT_BLOGGER_NAME)}" placeholder="博主名">
    <textarea class="source-url" rows="2" placeholder="粘贴抖音主页、合集、单条视频链接，或完整分享文案" style="min-height:52px">${escapeHtml(linkValue)}</textarea>
    <div class="mini-stat" style="min-height:52px;padding:8px 10px"><strong>${escapeHtml(kind)}</strong><span>${linked ? "可同步" : "只保存名称"}</span></div>
    <div style="display:flex;gap:6px;align-items:center;justify-content:flex-end">
      <button class="small-btn" onclick="xiaokeSyncBloggerFromManager(this)">同步</button>
      <button class="danger-btn" onclick="xiaokeRemoveBloggerSourceRow(this)">删</button>
    </div>
  </div>`;
}

function xiaokeReadBloggerSourceRowsFromModal() {
  const rows = [];
  document.querySelectorAll("#xiaokeBloggerSourceRows .source-manager-row").forEach((row, index) => {
    const name = row.querySelector(".source-name")?.value?.trim() || XIAOKE_DEFAULT_BLOGGER_NAME;
    const input = row.querySelector(".source-url")?.value?.trim() || "";
    const extracted = xiaokeExtractDouyinUrls(input)[0] || (/douyin\.com|iesdouyin\.com/i.test(input) ? input : "");
    const isVideo = /\/video\//i.test(extracted) || /modal_id=|aweme_id=/i.test(extracted);
    rows.push({
      id: row.dataset.id && !row.dataset.id.startsWith("blogger_draft_") ? row.dataset.id : ("blogger_" + Date.now() + "_" + index),
      name,
      url: isVideo ? "" : extracted,
      sampleUrl: isVideo ? extracted : "",
      note: extracted ? (isVideo ? "单条视频链接，只能同步这一条；建议后续补主页/合集链接" : "") : "待补抖音主页或合集链接",
      active: Boolean(row.querySelector('input[name="xiaokeActiveBloggerSource"]')?.checked)
    });
  });
  return rows;
}

function openBloggerSourceManager() {
  const existing = document.getElementById("xiaokeBloggerSourceModal");
  if (existing) existing.remove();
  const rows = xiaokeReadBloggerSources();
  const bodyRows = (rows.length ? rows : [{ id: "blogger_draft_0", name: XIAOKE_DEFAULT_BLOGGER_NAME, url: "", sampleUrl: "", note: "" }])
    .map((row, index) => xiaokeBloggerSourceRowHtml(row, index))
    .join("");
  document.body.insertAdjacentHTML("beforeend", `<div id="xiaokeBloggerSourceModal" class="modal" style="display:flex;align-items:center;justify-content:center;z-index:9999">
    <div class="modal-card" style="width:min(980px,94vw);max-height:88vh;overflow:auto">
      <div class="metadata-head" style="margin-bottom:14px">
        <div>
          <div class="panel-title">博主来源管理</div>
          <div class="date">可以保存多个博主。自动同步必须有抖音主页、合集或单条视频链接；只填“模型先生”只能作为名称保存。</div>
        </div>
        <button class="small-btn" onclick="xiaokeCloseBloggerSourceManager()">关闭</button>
      </div>
      <section class="panel" style="margin-bottom:12px">
        <div class="panel-title">批量粘贴解析</div>
        <textarea id="xiaokeBloggerSourcePaste" rows="4" placeholder="可粘贴多行：模型先生 https://www.douyin.com/user/...&#10;也可以粘贴抖音分享文案，系统会提取里面的链接。" style="margin-top:8px"></textarea>
        <div class="analysis-actions" style="justify-content:flex-start;margin-top:10px">
          <button class="small-btn" onclick="xiaokeParseBloggerPasteIntoManager()">从粘贴内容添加</button>
          <button class="small-btn" onclick="xiaokeAddBloggerSourceRow()">+ 新增一行</button>
        </div>
      </section>
      <section class="panel">
        <div class="metadata-head" style="margin-bottom:10px">
          <div>
            <div class="panel-title">已保存来源</div>
            <div class="date">勾选当前同步源后保存。主页/合集适合长期同步，单条视频只补单条。</div>
          </div>
        </div>
        <div id="xiaokeBloggerSourceRows">${bodyRows}</div>
      </section>
      <div class="analysis-actions" style="justify-content:flex-end;margin-top:14px">
        <button class="small-btn" onclick="xiaokeCloseBloggerSourceManager()">取消</button>
        <button class="open-btn" style="width:auto;padding:0 22px" onclick="xiaokeSaveBloggerSourceManager()">保存来源</button>
      </div>
    </div>
  </div>`);
}

function xiaokeCloseBloggerSourceManager() {
  document.getElementById("xiaokeBloggerSourceModal")?.remove();
}

function xiaokeAddBloggerSourceRow(row = {}) {
  const container = document.getElementById("xiaokeBloggerSourceRows");
  if (!container) return;
  const index = container.querySelectorAll(".source-manager-row").length;
  container.insertAdjacentHTML("beforeend", xiaokeBloggerSourceRowHtml({
    id: row.id || ("blogger_draft_" + Date.now() + "_" + index),
    name: row.name || "",
    url: row.url || "",
    sampleUrl: row.sampleUrl || "",
    note: row.note || ""
  }, index));
}

function xiaokeRemoveBloggerSourceRow(button) {
  const row = button?.closest?.(".source-manager-row");
  const container = document.getElementById("xiaokeBloggerSourceRows");
  if (!row || !container) return;
  if (container.querySelectorAll(".source-manager-row").length <= 1) {
    row.querySelector(".source-name").value = "";
    row.querySelector(".source-url").value = "";
    return;
  }
  row.remove();
}

function xiaokeParseBloggerPasteIntoManager() {
  const input = document.getElementById("xiaokeBloggerSourcePaste");
  const rows = xiaokeParseBloggerSourceInput(input?.value || "");
  rows.forEach(row => xiaokeAddBloggerSourceRow(row));
  if (input) input.value = "";
}

function xiaokeSaveBloggerSourceManager() {
  const rowsWithActive = xiaokeReadBloggerSourceRowsFromModal();
  const rows = xiaokeSaveBloggerSources(rowsWithActive);
  const activeRow = rowsWithActive.find(row => row.active && (row.url || row.sampleUrl));
  if (activeRow) localStorage.setItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY, activeRow.id);
  const linked = rows.filter(row => row.url || row.sampleUrl).length;
  showToast(linked ? `已保存 ${rows.length} 个博主来源，其中 ${linked} 个可同步` : "已保存博主名称；还需要补抖音主页/合集/视频链接后才能同步");
  xiaokeCloseBloggerSourceManager();
  if (state.view === "library") renderLibrary();
}

function xiaokeSyncBloggerFromManager(button) {
  const rowId = button?.closest?.(".source-manager-row")?.dataset?.id;
  xiaokeSaveBloggerSourceManager();
  const rows = xiaokeReadBloggerSources();
  const source = rows.find(row => row.id === rowId) || rows.find(row => row.url || row.sampleUrl);
  if (!source || !(source.url || source.sampleUrl)) {
    showToast("这一行还没有可同步链接，请先补抖音主页、合集或视频链接。");
    return;
  }
  syncDouyinBloggerSource(source.id);
}

function configureDouyinBloggerSource() {
  openBloggerSourceManager();
}

function xiaokeLinkedBloggerSources() {
  return xiaokeReadBloggerSources().filter(row => row.url || row.sampleUrl);
}

function xiaokeSetActiveBloggerSource(id) {
  localStorage.setItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY, id);
  if (state.view === "library") renderLibrary();
}

async function syncDouyinBloggerSource(id) {
  const rows = xiaokeReadBloggerSources();
  const source = rows.find(row => row.id === id) || rows.find(row => row.url || row.sampleUrl);
  if (!source || !(source.url || source.sampleUrl)) {
    showToast("这个博主还没有可同步链接，请先点“设置博主来源”补主页/合集/视频链接。");
    return;
  }
  localStorage.setItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY, source.id);
  const url = source.url || source.sampleUrl;
  localStorage.setItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY, url);
  return startDouyinBloggerSync({ sourceId: source.id, url });
}

startDouyinBloggerSync = async function xiaokeSafeBloggerSyncV3(options = {}) {
  let rows = xiaokeReadBloggerSources();
  if (!rows.length) {
    configureDouyinBloggerSource();
    rows = xiaokeReadBloggerSources();
  }
  const activeId = options.sourceId || localStorage.getItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY);
  const source = rows.find(row => row.id === activeId && (row.url || row.sampleUrl))
    || rows.find(row => row.url || row.sampleUrl);
  if (!source) {
    showToast("请先设置博主来源：昵称可以保存，但自动同步必须有抖音主页、合集或视频链接。");
    configureDouyinBloggerSource();
    return;
  }
  const url = String(options.url || source.url || source.sampleUrl || "").trim();
  const extracted = xiaokeExtractDouyinUrls(url)[0] || url;
  if (!/douyin\.com|iesdouyin\.com/i.test(extracted)) {
    showToast("没有识别到抖音链接；可以复制分享文案，系统会自动提取里面的链接。");
    return;
  }
  const limit = Math.max(1, Math.min(50, Number(options.limit || localStorage.getItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY) || 20)));
  localStorage.setItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY, String(limit));
  localStorage.setItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY, extracted);
  showToast(`已提交「${source.name || XIAOKE_DEFAULT_BLOGGER_NAME}」后台同步：最多 ${/\/video\//i.test(extracted) ? 1 : limit} 条`);
  try {
    const response = await fetch("/api/douyin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: extracted, limit, download: true, comments: true })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "启动同步失败");
    state.douyinSyncJob = data.job;
    state.xiaokeRunAiAfterDouyinSync = true;
    if (state.view === "library") renderLibrary();
    pollDouyinSyncStatus(true);
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查链接/cookies"));
  }
};

function xiaokeBloggerSourcesHtml() {
  const rows = xiaokeReadBloggerSources();
  const activeId = localStorage.getItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY);
  if (!rows.length) return "";
  const linkedCount = rows.filter(row => row.url || row.sampleUrl).length;
  const activeSource = rows.find(row => row.id === activeId) || rows.find(row => row.url || row.sampleUrl) || rows[0];
  return `<section class="panel" style="margin-bottom:12px">
    <div class="metadata-head">
      <div>
        <div class="panel-title">博主来源</div>
        <div class="date">已保存 ${rows.length} 个来源，${linkedCount} 个可同步。当前：${escapeHtml(activeSource?.name || "未选择")} · ${escapeHtml(xiaokeBloggerLinkKind(activeSource || {}))}</div>
      </div>
      <div class="analysis-actions" style="margin:0">
        <button class="small-btn" onclick="configureDouyinBloggerSource()">管理来源</button>
        ${activeSource && (activeSource.url || activeSource.sampleUrl) ? `<button class="open-btn" style="width:auto;padding:0 16px" onclick='syncDouyinBloggerSource(${JSON.stringify(activeSource.id)})'>同步当前</button>` : ""}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:10px">
      ${rows.map(row => {
        const linked = Boolean(row.url || row.sampleUrl);
        const active = row.id === activeId || (!activeId && linked);
        return `<div class="mini-stat" style="display:block;min-height:78px;border-color:${active ? "rgba(23,209,154,.55)" : "rgba(64,76,102,.55)"}">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <strong>${escapeHtml(row.name)}</strong>
            <span class="${linked ? "status-done" : "status-pending"}">${linked ? "可同步" : "待补链接"}</span>
          </div>
          <div class="date" style="margin-top:6px">${escapeHtml(xiaokeBloggerLinkKind(row))}${row.note ? " · " + escapeHtml(row.note).slice(0, 28) : ""}</div>
          <div class="analysis-actions" style="justify-content:flex-start;margin-top:8px">
            <button class="small-btn" onclick='xiaokeSetActiveBloggerSource(${JSON.stringify(row.id)})'>设为当前</button>
            ${linked ? `<button class="small-btn" onclick='syncDouyinBloggerSource(${JSON.stringify(row.id)})'>同步</button>` : ""}
          </div>
        </div>`;
      }).join("")}
    </div>
  </section>`;
}

function xiaokeAutoGroupRules() {
  return [
    { group: "有色金属", words: ["有色", "铜", "铝", "黄金", "金属", "紫金", "洛阳钼", "铜价", "铝价", "贵金属"] },
    { group: "光模块", words: ["光模块", "cpo", "光通信", "光芯片", "光库", "新易盛", "中际旭创", "天孚通信", "华工科技", "光迅"] },
    { group: "科创芯片", words: ["芯片", "半导体", "科创", "存储", "晶圆", "封测", "eda", "中芯", "寒武纪", "长江存储", "立昂微", "北方华创"] },
    { group: "创新药", words: ["创新药", "医药", "药明", "恒瑞", "临床", "biotech", "cxO", "医疗"] },
    { group: "商业航天", words: ["商业航天", "卫星", "火箭", "航天", "低空", "军工", "北斗"] },
    { group: "交易系统", words: ["交易", "买点", "卖点", "止损", "回撤", "仓位", "纪律", "复盘", "主线", "分歧", "低吸", "追高", "模式", "心法"] },
    { group: "投资哲学", words: ["哲学", "辩证", "矛盾", "必然", "偶然", "质变", "量变", "认识", "规律", "方法论"] },
    { group: "宏观周期", words: ["宏观", "周期", "美元", "利率", "货币", "通胀", "经济", "汇率", "地产"] },
    { group: "机器人", words: ["机器人", "人形", "特斯拉机器人", "减速器", "执行器", "传感器"] },
    { group: "AI应用", words: ["ai应用", "人工智能", "大模型", "算力", "智能体", "agent", "豆包", "应用"] }
  ];
}

function xiaokeVideoTextForGrouping(video = {}) {
  const analysis = readVideoAnalyses()[video.id] || {};
  const structured = readStructuredAnalyses()[video.id] || {};
  return [
    video.title,
    video.topic,
    video.focus,
    video.description,
    video.transcript,
    video.author,
    JSON.stringify(analysis),
    JSON.stringify(structured),
    ...videoGroupsFor(video.id)
  ].filter(Boolean).join(" ").toLowerCase();
}

function xiaokeInferVideoGroups(video = {}, maxGroups = 3) {
  const text = xiaokeVideoTextForGrouping(video);
  const candidates = [];
  const existingNames = [...new Set([
    ...tags.filter(tag => tag.type === "sector").map(tag => sectorDisplayName(tag)),
    ...readVideoGroups()
  ].filter(Boolean))];
  for (const name of existingNames) {
    const clean = String(name || "").trim();
    if (clean && text.includes(clean.toLowerCase())) candidates.push({ group: clean, score: 6, source: "已有分组名命中" });
  }
  for (const rule of xiaokeAutoGroupRules()) {
    let score = 0;
    const hitWords = [];
    for (const word of rule.words) {
      const w = String(word).toLowerCase();
      if (w && text.includes(w)) {
        score += w.length >= 4 ? 3 : 2;
        hitWords.push(word);
      }
    }
    if (score > 0) candidates.push({ group: rule.group, score, source: hitWords.slice(0, 4).join("、") });
  }
  if (video.isDocument && /书|pdf|word|文档|原理|战论|哲学/.test(text)) candidates.push({ group: "书籍", score: 5, source: "文档/书籍" });
  return candidates
    .sort((a, b) => b.score - a.score)
    .filter((item, index, arr) => arr.findIndex(other => other.group === item.group) === index)
    .slice(0, maxGroups);
}

function xiaokeAutoGroupDraftRows() {
  const videos = filteredVideos();
  return videos.map((video, index) => {
    const inferred = xiaokeInferVideoGroups(video, 3);
    const existing = videoGroupsFor(video.id);
    const names = [...new Set([...inferred.map(item => item.group), ...existing])];
    return {
      index,
      video,
      inferred,
      existing,
      names,
      checked: inferred.length > 0
    };
  });
}

function xiaokeAutoGroupConfidence(row) {
  if (!row.inferred.length) return "未命中";
  const score = row.inferred.reduce((sum, item) => sum + Number(item.score || 0), 0);
  if (score >= 12) return "高";
  if (score >= 6) return "中";
  return "低";
}

function xiaokeAutoGroupPreviewHtml(rows) {
  const matched = rows.filter(row => row.inferred.length).length;
  return `
    <div id="xiaokeAutoGroupModal" class="modal open" style="display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:9999">
      <div class="modal-card" style="width:min(1180px,92vw);max-height:86vh;overflow:hidden;display:flex;flex-direction:column">
        <div class="metadata-head" style="gap:12px">
          <div>
            <div class="panel-title">自动分类入板块</div>
            <div class="date">当前筛选 ${rows.length} 条，识别命中 ${matched} 条。先检查归属，再一次写入；一条视频可进入多个板块。</div>
          </div>
          <div class="analysis-actions">
            <button class="small-btn" onclick="xiaokeAutoGroupSelectAll(true)">全选命中</button>
            <button class="small-btn" onclick="xiaokeAutoGroupSelectAll(false)">全不选</button>
            <button class="small-btn" onclick="xiaokeCloseAutoGroupPreview()">取消</button>
            <button class="open-btn" onclick="xiaokeApplyAutoGroupPreview()">写入板块</button>
          </div>
        </div>
        <div style="margin-top:12px;overflow:auto;border:1px solid #263244;border-radius:8px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="background:#1b202b;color:#dbeafe;text-align:left">
                <th style="padding:10px;width:54px">选择</th>
                <th style="padding:10px;width:30%">视频</th>
                <th style="padding:10px;width:28%">识别依据</th>
                <th style="padding:10px">写入板块，可编辑</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => {
                const title = compactPlainText(quickVideoTitle(row.video), 54);
                const source = row.inferred.length
                  ? row.inferred.map(item => `${item.group}：${item.source || "关键词"}`).join("；")
                  : "未命中关键词，可手动填写板块";
                const names = row.names.join("，");
                return `<tr style="border-top:1px solid #263244">
                  <td style="padding:10px;vertical-align:top">
                    <input type="checkbox" id="autoGroupCheck_${row.index}" ${row.checked ? "checked" : ""}>
                    <div class="date" style="margin-top:6px">${xiaokeAutoGroupConfidence(row)}</div>
                  </td>
                  <td style="padding:10px;vertical-align:top">
                    <strong>${escapeHtml(title)}</strong>
                    <div class="date">${escapeHtml(row.video.date || "")} · ${escapeHtml(row.video.author || row.video.source || "")}</div>
                    ${row.existing.length ? `<div class="date">已有：${escapeHtml(row.existing.join(" / "))}</div>` : ""}
                  </td>
                  <td style="padding:10px;vertical-align:top;color:#aeb6c6;line-height:1.55">${escapeHtml(source)}</td>
                  <td style="padding:10px;vertical-align:top">
                    <input class="search-input" id="autoGroupInput_${row.index}" value="${escapeHtml(names)}" placeholder="例如：有色金属，光模块，交易系统">
                  </td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
        <div class="date" style="margin-top:10px">提示：自动识别主要看标题、转写、AI分析、已有标签和关键词规则。识别不准时，直接在右侧输入框改成你想要的板块。</div>
      </div>
    </div>`;
}

function xiaokeCloseAutoGroupPreview() {
  const modal = document.getElementById("xiaokeAutoGroupModal");
  if (modal) modal.remove();
}

function xiaokeAutoGroupSelectAll(flag) {
  const rows = state.xiaokeAutoGroupDraft || [];
  rows.forEach(row => {
    const checkbox = document.getElementById(`autoGroupCheck_${row.index}`);
    if (checkbox) checkbox.checked = flag ? row.inferred.length > 0 : false;
  });
}

function autoAssignFilteredVideosToGroups() {
  const rows = xiaokeAutoGroupDraftRows();
  if (!rows.length) return showToast("当前筛选没有视频");
  state.xiaokeAutoGroupDraft = rows;
  xiaokeCloseAutoGroupPreview();
  document.body.insertAdjacentHTML("beforeend", xiaokeAutoGroupPreviewHtml(rows));
}

function xiaokeApplyAutoGroupPreview() {
  const rows = state.xiaokeAutoGroupDraft || [];
  if (!rows.length) return xiaokeCloseAutoGroupPreview();
  const assignments = readVideoAssignments();
  const allGroups = new Set(readVideoGroups());
  let changed = 0;
  let selected = 0;
  rows.forEach(row => {
    const checkbox = document.getElementById(`autoGroupCheck_${row.index}`);
    if (!checkbox || !checkbox.checked) return;
    const input = document.getElementById(`autoGroupInput_${row.index}`);
    const names = uniqueClean(String(input ? input.value : "")
      .split(/[，,、/]+/)
      .map(item => item.trim()));
    if (!names.length) return;
    selected += 1;
    const before = assignments[row.video.id] || [];
    const next = [...new Set([...before, ...names])];
    if (next.length !== before.length) changed += 1;
    assignments[row.video.id] = next;
    names.forEach(name => allGroups.add(name));
  });
  if (!selected) return showToast("还没有勾选要写入的视频");
  saveVideoAssignments(assignments);
  saveVideoGroups([...allGroups]);
  xiaokeCloseAutoGroupPreview();
  renderTopChips();
  renderLibrary();
  showToast(`已写入 ${selected} 条视频，新增/更新 ${changed} 条板块归属`);
}

function manualMultiAssignFilteredVideosToGroups() {
  const videos = filteredVideos();
  if (!videos.length) return showToast("当前筛选没有视频");
  const existing = [...new Set([...tags.filter(t => t.type === "sector").map(t => sectorDisplayName(t)), ...readVideoGroups()])];
  const groupText = prompt(`手动多选分组：把当前筛选 ${videos.length} 条视频加入哪些板块？\n\n多个用逗号分隔，可填已有或新建。\n例如：有色金属, 光模块, 交易系统`, existing.slice(0, 3).join(", "));
  if (!groupText) return;
  const groups = uniqueClean(String(groupText).split(/[，,、/]+/));
  if (!groups.length) return;
  if (!confirm(`确认把当前筛选的 ${videos.length} 条视频加入：${groups.join(" / ")}？`)) return;
  const assignments = readVideoAssignments();
  videos.forEach(video => {
    assignments[video.id] = [...new Set([...(assignments[video.id] || []), ...groups])];
  });
  saveVideoAssignments(assignments);
  saveVideoGroups([...readVideoGroups(), ...groups]);
  renderTopChips();
  renderLibrary();
  showToast(`已加入 ${groups.length} 个分组：${videos.length} 条`);
}

renderLibrary = function xiaokeManagedLibraryRenderV4() {
  state.view = "library";
  restoredRenderShell();
  if (!state.douyinCaptureStatus) {
    xiaokeFetchDouyinStatus(true).then(() => {
      if (state.view === "library") renderLibrary();
    });
  }
  const videos = filteredVideos();
  const total = restoredAllLibraryVideos().length;
  state.libraryLimit = Math.max(60, Number(state.libraryLimit || 60));
  const visible = videos.slice(0, state.libraryLimit);
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <div class="video-head">
      <div>
        <div class="panel-title" style="margin:0">视频素材库</div>
        <div class="date">显示 ${visible.length} / 筛选 ${videos.length} / 共 ${total} 个视频 · 当前筛选：${escapeHtml(state.activeTag || "全部")}</div>
      </div>
      <div class="library-actions">
        <select class="small-select" onchange="setSort(this.value)">
          <option value="date" ${state.sort === "date" ? "selected" : ""}>按日期</option>
          <option value="likes" ${state.sort === "likes" ? "selected" : ""}>按点赞</option>
          <option value="title" ${state.sort === "title" ? "selected" : ""}>按标题</option>
        </select>
        <button class="small-btn" onclick="createManualVideoRecord()">+新增视频</button>
        <button class="open-btn" onclick="autoAssignFilteredVideosToGroups()">自动分类入板块</button>
        <button class="small-btn" onclick="manualMultiAssignFilteredVideosToGroups()">手动多选分组</button>
        <button class="small-btn" onclick="openLibraryBulkQueue()">队列详情</button>
        <button class="small-btn" onclick="configureDouyinBloggerSource()">设置博主来源</button>
        <button class="small-btn" onclick="startDouyinBloggerSync()">自动同步博主</button>
        <button class="small-btn" onclick="startLibraryFullSync()">同步全部评论/互动/AI</button>
        <button class="small-btn" onclick="Promise.all([pollDouyinCookieStatus(true),pollDouyinSyncStatus(true)]).then(()=>renderLibrary())">抓取状态</button>
        <button class="small-btn" onclick="openImport()">导入</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </div>
    ${xiaokeBloggerSourcesHtml()}
    ${xiaokeDouyinStatusHtml()}
    ${xiaokeBulkStatusHtml()}
    ${librarySearchHtml()}
    ${videos.length
      ? `<section class="video-grid">${visible.map(videoCardHtml).join("")}</section>${videos.length > visible.length ? `<div class="analysis-actions"><button class="small-btn" onclick="loadMoreLibraryVideos()">加载更多</button></div>` : ""}`
      : `<section class="panel" style="max-width:360px"><div class="panel-title">暂无匹配视频</div><p style="color:#aeb6c6;line-height:1.7">当前搜索或分类没有结果。先清空搜索，或切回全部视频。</p><button class="open-btn" style="width:auto;padding:0 18px" onclick="clearVideoFilters()">清空筛选</button></section>`}
  `;
};

Object.assign(globalThis, {
  configureDouyinBloggerSource,
  openBloggerSourceManager,
  xiaokeCloseBloggerSourceManager,
  xiaokeAddBloggerSourceRow,
  xiaokeRemoveBloggerSourceRow,
  xiaokeParseBloggerPasteIntoManager,
  xiaokeSaveBloggerSourceManager,
  xiaokeSyncBloggerFromManager,
  syncDouyinBloggerSource,
  xiaokeSetActiveBloggerSource,
  startDouyinBloggerSync,
  autoAssignFilteredVideosToGroups,
  xiaokeApplyAutoGroupPreview,
  xiaokeCloseAutoGroupPreview,
  xiaokeAutoGroupSelectAll,
  manualMultiAssignFilteredVideosToGroups,
  renderLibrary
});

const XIAOKE_DAILY_CHECKIN_KEY = "xiaoke_daily_checkins_v1";

function xiaokeCheckinToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function xiaokeReadCheckins() {
  try {
    const value = JSON.parse(localStorage.getItem(XIAOKE_DAILY_CHECKIN_KEY) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function xiaokeSaveCheckins(data = {}) {
  localStorage.setItem(XIAOKE_DAILY_CHECKIN_KEY, JSON.stringify(data));
}

function xiaokeDefaultTaskText() {
  const saved = String(localStorage.getItem(DAILY_TASK_KEY) || "").trim();
  if (saved) return saved;
  return [
    "毛泽东思想20页",
    "股市趋势分析，越多越好",
    "八段锦10分钟",
    "模型视频学习，优先完成板块分析",
    "辩证唯物主义原理20页",
    "板块排行，寻找规律，验证规律，每日复盘"
  ].join("\n");
}

function xiaokeParseCheckinTasks(text = "") {
  const cleaned = String(text || "")
    .replace(/\r/g, "\n")
    .split(/\n|；|;/)
    .map(line => line.replace(/^\s*[-*•\d.、)）]+/, "").trim())
    .filter(Boolean);
  return uniqueClean(cleaned).slice(0, 20);
}

function xiaokeDefaultCheckin(date = xiaokeCheckinToday()) {
  const taskText = xiaokeDefaultTaskText();
  const tasks = xiaokeParseCheckinTasks(taskText).map(title => ({ id: "task_" + Math.random().toString(36).slice(2), title, done: false }));
  return {
    date,
    tasks,
    focus: localStorage.getItem(DAILY_FOCUS_KEY) || "",
    market: "",
    study: "",
    body: "",
    review: "",
    tomorrow: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function xiaokeGetCheckin(date = xiaokeCheckinToday()) {
  const store = xiaokeReadCheckins();
  if (!store[date]) {
    store[date] = xiaokeDefaultCheckin(date);
    xiaokeSaveCheckins(store);
  }
  return store[date];
}

function xiaokePutCheckin(date, patch = {}) {
  const store = xiaokeReadCheckins();
  const current = store[date] || xiaokeDefaultCheckin(date);
  store[date] = { ...current, ...patch, date, updatedAt: new Date().toISOString() };
  xiaokeSaveCheckins(store);
  return store[date];
}

function xiaokeCheckinProgress(item = {}) {
  const tasks = Array.isArray(item.tasks) ? item.tasks : [];
  const done = tasks.filter(task => task.done).length;
  return { done, total: tasks.length, pct: tasks.length ? Math.round(done / tasks.length * 100) : 0 };
}

function xiaokeDateOffset(date, offsetDays) {
  const d = new Date(date + "T00:00:00");
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function xiaokeCheckinStreak() {
  const store = xiaokeReadCheckins();
  let date = xiaokeCheckinToday();
  let count = 0;
  while (store[date] && xiaokeCheckinProgress(store[date]).done > 0) {
    count += 1;
    date = xiaokeDateOffset(date, -1);
  }
  return count;
}

function xiaokeCheckinCalendarHtml(selectedDate) {
  const store = xiaokeReadCheckins();
  const today = xiaokeCheckinToday();
  const cells = [];
  for (let i = 41; i >= 0; i -= 1) {
    const date = xiaokeDateOffset(today, -i);
    const item = store[date];
    const progress = xiaokeCheckinProgress(item || {});
    const cls = [
      "checkin-day",
      date === today ? "today" : "",
      date === selectedDate ? "active" : "",
      progress.pct >= 100 ? "done" : progress.pct > 0 ? "partial" : ""
    ].filter(Boolean).join(" ");
    cells.push(`<button class="${cls}" onclick='openDailyCheckin(${JSON.stringify(date)})'>
      <b>${Number(date.slice(-2))}</b>
      <span>${progress.total ? progress.pct + "%" : ""}</span>
    </button>`);
  }
  return `<div class="checkin-calendar">
    <div class="checkin-weekdays">${["一", "二", "三", "四", "五", "六", "日"].map(day => `<span>${day}</span>`).join("")}</div>
    <div class="checkin-days">${cells.join("")}</div>
  </div>`;
}

function xiaokeCheckinTaskHtml(date, task, index) {
  return `<label class="checkin-task ${task.done ? "done" : ""}">
    <input type="checkbox" ${task.done ? "checked" : ""} onchange='toggleCheckinTask(${JSON.stringify(date)},${index},this.checked)'>
    <span contenteditable="true" onblur='updateCheckinTaskTitle(${JSON.stringify(date)},${index},this.innerText)'>${escapeHtml(task.title || "未命名任务")}</span>
    <button class="small-btn danger-btn" onclick='deleteCheckinTask(${JSON.stringify(date)},${index})'>删</button>
  </label>`;
}

function xiaokeCheckinTextArea(date, field, value, placeholder) {
  return `<textarea oninput='updateCheckinField(${JSON.stringify(date)},${JSON.stringify(field)},this.value)' placeholder="${escapeHtml(placeholder)}">${escapeHtml(value || "")}</textarea>`;
}

function xiaokeCheckinSummary(item = {}) {
  const p = xiaokeCheckinProgress(item);
  const parts = [
    `任务 ${p.done}/${p.total}`,
    item.focus ? `关注：${item.focus}` : "",
    item.market ? `市场：${item.market}` : "",
    item.review ? `结论：${item.review}` : ""
  ].filter(Boolean);
  return parts.join("\n");
}

function openDailyCheckin(date = xiaokeCheckinToday()) {
  state.view = "dailyCheckin";
  state.checkinDate = date || xiaokeCheckinToday();
  try {
    history.replaceState(null, "", `?view=dailyCheckin&date=${encodeURIComponent(state.checkinDate)}`);
  } catch {}
  renderDailyCheckin();
}

function renderDailyCheckin() {
  state.view = "dailyCheckin";
  const date = state.checkinDate || xiaokeCheckinToday();
  const item = xiaokeGetCheckin(date);
  const progress = xiaokeCheckinProgress(item);
  renderTopChips();
  document.getElementById("main").innerHTML = `
    <section class="review-head panel checkin-hero">
      <div>
        <div class="panel-title">每日打卡</div>
        <div class="date">先打卡，再复盘。任务从右侧“每日任务”自动拆分，也可以在这里直接修改。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="syncCheckinTasksFromSidebar()">同步右侧任务</button>
        <button class="small-btn" onclick="addCheckinTask()">+任务</button>
        <button class="small-btn" onclick="copyCheckinToDailyReview()">沉淀到每日复盘</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="checkin-layout">
      <div class="panel checkin-calendar-panel">
        <div class="checkin-stats">
          <div><b>${progress.pct}%</b><span>今日完成</span></div>
          <div><b>${progress.done}/${progress.total}</b><span>任务</span></div>
          <div><b>${xiaokeCheckinStreak()}</b><span>连续天数</span></div>
        </div>
        ${xiaokeCheckinCalendarHtml(date)}
      </div>
      <div class="panel checkin-main-panel">
        <div class="daily-card-head">
          <input class="daily-date-input" type="date" value="${escapeHtml(date)}" onchange="openDailyCheckin(this.value)">
          <div class="date">当天完成一项也会点亮日历；全部完成显示满格。</div>
        </div>
        <div class="checkin-task-list">
          ${(item.tasks || []).map((task, index) => xiaokeCheckinTaskHtml(date, task, index)).join("") || `<div class="empty-review">暂无任务，点“同步右侧任务”或“+任务”。</div>`}
        </div>
      </div>
    </section>
    <section class="panel checkin-notes">
      <div class="daily-card-grid">
        <label><b>今日关注</b>${xiaokeCheckinTextArea(date, "focus", item.focus, "今天重点看哪些票、板块、风险？")}</label>
        <label><b>盘面观察</b>${xiaokeCheckinTextArea(date, "market", item.market, "指数、主线、强弱、情绪、异常信号。")}</label>
        <label><b>学习记录</b>${xiaokeCheckinTextArea(date, "study", item.study, "读了什么、看了哪些视频、沉淀了什么概念。")}</label>
        <label><b>身体/纪律</b>${xiaokeCheckinTextArea(date, "body", item.body, "八段锦、运动、作息、是否冲动交易。")}</label>
        <label><b>今日复盘结论</b>${xiaokeCheckinTextArea(date, "review", item.review, "今天最重要的结论：哪些规律被验证，哪些被推翻。")}</label>
        <label><b>明日计划</b>${xiaokeCheckinTextArea(date, "tomorrow", item.tomorrow, "明天只盯哪些条件，触发后怎么做。")}</label>
      </div>
    </section>
  `;
}

function updateCheckinField(date, field, value) {
  xiaokePutCheckin(date, { [field]: value });
}

function toggleCheckinTask(date, index, done) {
  const item = xiaokeGetCheckin(date);
  const tasks = Array.isArray(item.tasks) ? [...item.tasks] : [];
  if (!tasks[index]) return;
  tasks[index] = { ...tasks[index], done: !!done };
  xiaokePutCheckin(date, { tasks });
  renderDailyCheckin();
}

function updateCheckinTaskTitle(date, index, title) {
  const item = xiaokeGetCheckin(date);
  const tasks = Array.isArray(item.tasks) ? [...item.tasks] : [];
  if (!tasks[index]) return;
  tasks[index] = { ...tasks[index], title: String(title || "").trim() || "未命名任务" };
  xiaokePutCheckin(date, { tasks });
}

function deleteCheckinTask(date, index) {
  const item = xiaokeGetCheckin(date);
  const tasks = (item.tasks || []).filter((_, i) => i !== index);
  xiaokePutCheckin(date, { tasks });
  renderDailyCheckin();
}

function addCheckinTask() {
  const date = state.checkinDate || xiaokeCheckinToday();
  const title = prompt("新增任务", "复盘今天最强板块并写一句规律");
  if (!title) return;
  const item = xiaokeGetCheckin(date);
  const tasks = [...(item.tasks || []), { id: "task_" + Date.now(), title: title.trim(), done: false }];
  xiaokePutCheckin(date, { tasks });
  renderDailyCheckin();
}

function syncCheckinTasksFromSidebar() {
  const date = state.checkinDate || xiaokeCheckinToday();
  const titles = xiaokeParseCheckinTasks(xiaokeDefaultTaskText());
  const item = xiaokeGetCheckin(date);
  const old = new Map((item.tasks || []).map(task => [task.title, task]));
  const tasks = titles.map(title => old.get(title) || { id: "task_" + Math.random().toString(36).slice(2), title, done: false });
  xiaokePutCheckin(date, { tasks, focus: item.focus || localStorage.getItem(DAILY_FOCUS_KEY) || "" });
  showToast("已按右侧每日任务同步打卡清单");
  renderDailyCheckin();
}

function copyCheckinToDailyReview() {
  const date = state.checkinDate || xiaokeCheckinToday();
  const item = xiaokeGetCheckin(date);
  const rows = readDailyReviews();
  const summary = xiaokeCheckinSummary(item);
  const existing = rows.find(row => row.date === date && row.mode === "checkin");
  const next = {
    id: existing ? existing.id : "review_checkin_" + Date.now(),
    mode: "checkin",
    date,
    target: item.focus || "每日打卡",
    action: "复盘",
    position: "",
    price: "",
    reason: [item.market, item.study, item.body].filter(Boolean).join("\n\n"),
    result: summary,
    lesson: [item.review, item.tomorrow].filter(Boolean).join("\n\n")
  };
  saveDailyReviews(existing ? rows.map(row => row.id === existing.id ? next : row) : [next, ...rows]);
  showToast("已沉淀到每日复盘");
}

function xiaokeDailyCheckinStylePatch() {
  if (document.getElementById("xiaoke-daily-checkin-style")) return;
  const style = document.createElement("style");
  style.id = "xiaoke-daily-checkin-style";
  style.textContent = `
    .checkin-layout{display:grid;grid-template-columns:380px minmax(0,1fr);gap:12px;margin-bottom:12px}
    .checkin-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
    .checkin-stats div{background:rgba(90,157,255,.08);border:1px solid rgba(90,157,255,.14);border-radius:8px;padding:12px}
    .checkin-stats b{display:block;color:#fff;font-size:22px}.checkin-stats span{color:#8fa0b9;font-size:12px}
    .checkin-weekdays,.checkin-days{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
    .checkin-weekdays span{text-align:center;color:#738096;font-size:12px;font-weight:800}
    .checkin-day{height:48px;border-radius:8px;border:1px solid rgba(255,255,255,.08);background:#111821;color:#aeb8ca;display:grid;align-content:center;gap:2px}
    .checkin-day b{font-size:14px}.checkin-day span{font-size:10px;color:#8795aa}
    .checkin-day.partial{border-color:rgba(255,176,64,.45);background:rgba(255,176,64,.08)}
    .checkin-day.done{border-color:rgba(25,201,139,.55);background:rgba(25,201,139,.12);color:#dfffee}
    .checkin-day.today{box-shadow:0 0 0 1px rgba(90,157,255,.45) inset}
    .checkin-day.active{outline:2px solid rgba(80,153,255,.75)}
    .checkin-task-list{display:grid;gap:8px}
    .checkin-task{display:grid;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:8px;padding:10px;border-radius:8px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07)}
    .checkin-task input{width:16px;height:16px}.checkin-task span{outline:0;color:#eef3fb;line-height:1.5}
    .checkin-task.done span{text-decoration:line-through;color:#7f8da3}
    .checkin-notes{margin-top:12px}
    @media(max-width:980px){.checkin-layout{grid-template-columns:1fr}.checkin-stats b{font-size:18px}}
  `;
  document.head.appendChild(style);
}

const xiaokePreviousRenderTopChips = renderTopChips;
renderTopChips = function xiaokeDailyCheckinTopChips() {
  const chips = document.getElementById("topChips");
  if (!chips) return;
  const systemChips = [
    ["我的策略", "strategy"],
    ["每日复盘", "dailyReview"],
    ["每日打卡", "dailyCheckin"],
    ["板块强弱", "sectorStrength"],
    ["模型框架", "modelFramework"],
    ["股票档案", "stockProfiles"],
    ["能力中心", "pipelineCenter"],
    ["管理分组", "videoGroupManager"]
  ].map(([label, view]) => `<a class="${state.view === view ? "chip active review-chip" : "chip review-chip"}" style="display:inline-flex;align-items:center;text-decoration:none" href="?view=${view}">${label}</a>`).join("");
  const seenTags = new Set();
  const uniqueTags = allVideoTags().filter(tag => {
    const key = String(tag.name || tag.originalName || "").trim().toLowerCase();
    if (!key || seenTags.has(key)) return false;
    seenTags.add(key);
    return true;
  });
  const tagChips = uniqueTags.map(tag => {
    const name = tag.name || tag.originalName || "";
    const label = finalTagLabel(tag);
    const count = tagCount(tag);
    const cls = name === state.activeTag ? "chip active" : tag.type === "sector" && count > 15 ? "chip gold" : "chip";
    return `<a class="${cls}" title="${escapeHtml(label)}（${count}条）" style="display:inline-flex;align-items:center;text-decoration:none" href="?tag=${encodeURIComponent(name)}">${escapeHtml(label)}(${count})</a>`;
  }).join("");
  chips.innerHTML = systemChips + tagChips;
};

function scrollTopChips(direction = 1) {
  const chips = document.getElementById("topChips");
  if (!chips) return;
  chips.scrollBy({ left: Number(direction || 1) * Math.max(240, chips.clientWidth * 0.72), behavior: "smooth" });
}

const xiaokePreviousRender = render;
render = function xiaokeDailyCheckinRender() {
  xiaokeDailyCheckinStylePatch();
  if (state.view === "dailyCheckin") return renderDailyCheckin();
  return xiaokePreviousRender();
};

const xiaokePreviousRestoredRouteTopChip = typeof restoredRouteTopChip === "function" ? restoredRouteTopChip : null;
restoredRouteTopChip = function xiaokeDailyCheckinRouteTopChip(label) {
  const text = String(label || "").replace(/\(\d+\)\s*$/, "").trim();
  if (text === "每日打卡") return openDailyCheckin();
  return xiaokePreviousRestoredRouteTopChip ? xiaokePreviousRestoredRouteTopChip(label) : filterByTag(text || "全部");
};

const xiaokePreviousRestoredRouteHash = typeof restoredRouteHash === "function" ? restoredRouteHash : null;
restoredRouteHash = function xiaokeDailyCheckinRouteHash() {
  const hash = String(location.hash || "").replace(/^#/, "");
  if (hash === "view=dailyCheckin") {
    openDailyCheckin();
    return true;
  }
  return xiaokePreviousRestoredRouteHash ? xiaokePreviousRestoredRouteHash() : false;
};

const xiaokePreviousInit = init;
init = async function xiaokeDailyCheckinInit() {
  await xiaokePreviousInit();
  const params = new URLSearchParams(location.search || "");
  if (params.get("view") === "dailyCheckin") openDailyCheckin(params.get("date") || xiaokeCheckinToday());
};

Object.assign(globalThis, {
  openDailyCheckin,
  renderDailyCheckin,
  updateCheckinField,
  toggleCheckinTask,
  updateCheckinTaskTitle,
  deleteCheckinTask,
  addCheckinTask,
  syncCheckinTasksFromSidebar,
  copyCheckinToDailyReview
});

// Stable background queue: resumable, mode-aware, and skips work that is already complete.
function xiaokeBulkModeOptions(mode = "all") {
  const value = String(mode || "all");
  if (value === "comments") return { mode: value, comments: true, ai: false, label: "评论/互动" };
  if (value === "ai") return { mode: value, comments: false, ai: true, label: "AI分析" };
  return { mode: "all", comments: true, ai: true, label: "评论/互动/AI" };
}

function xiaokeBulkModeLabel(jobOrMode = "all") {
  return xiaokeBulkModeOptions(typeof jobOrMode === "string" ? jobOrMode : jobOrMode.mode).label;
}

function xiaokeBulkNormalizeStatus(status = "") {
  if (status === "cancelled") return "paused";
  return status || "idle";
}

function xiaokeBulkBuildTargets(videos = [], options = {}) {
  const force = Boolean(options.force || options.forceComments || options.forceAi);
  const rows = [];
  const stats = { total: videos.length, skippedComplete: 0, skippedNoWork: 0, skippedNoSource: 0 };
  for (const video of videos) {
    const sourceUrl = xiaokeVideoDouyinUrl(video);
    const needsComments = options.comments !== false && Boolean(sourceUrl) && !finalVideoComments(video).length && !finalVideoInteractions(video).length;
    const needsAi = options.ai !== false && !xiaokeHasVideoAI(video);
    if (!force && !needsComments && !needsAi) {
      stats.skippedComplete += 1;
      continue;
    }
    if (options.comments !== false && !sourceUrl && options.ai === false) {
      stats.skippedNoSource += 1;
      continue;
    }
    rows.push(video);
  }
  stats.selected = rows.length;
  return { targets: rows, stats };
}

function xiaokeBulkReadTargetPool(job = {}) {
  const targetIds = Array.isArray(job.targetIds) ? job.targetIds : [];
  if (!targetIds.length) return filteredVideos();
  return targetIds.map(id => (state.videos || []).find(video => video.id === id)).filter(Boolean);
}

function xiaokeBulkProgressHtml(job = {}) {
  const total = Math.max(0, Number(job.total || 0));
  const done = Math.max(0, Number(job.done || 0));
  const percent = total ? Math.min(100, Math.round(done / total * 100)) : 0;
  return `<div style="height:7px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden;margin-top:10px">
    <div style="height:100%;width:${percent}%;background:linear-gradient(90deg,#19c98b,#5099ff)"></div>
  </div>`;
}

cancelLibraryFullSync = function cancelLibraryFullSyncStable() {
  window.__xiaokeCancelLibraryFullSync = true;
  const job = xiaokeReadBulkJob();
  xiaokeWriteBulkJob({ status: "paused", current: "", pausedAt: new Date().toISOString(), mode: job.mode || "all" });
  showToast("已暂停批量队列，稍后可继续未完成");
  if (state.view === "library") renderLibrary();
  if (state.view === "libraryBulkQueue") openLibraryBulkQueue();
};

runLibraryFullSyncQueue = async function runLibraryFullSyncQueueStable(targets = [], options = {}) {
  const modeConfig = xiaokeBulkModeOptions(options.mode || "all");
  const previous = options.resume ? xiaokeReadBulkJob() : {};
  const completed = new Set(options.resume ? (previous.completedIds || []) : []);
  const targetIds = Array.isArray(options.targetIds) && options.targetIds.length
    ? options.targetIds
    : targets.map(video => video.id).filter(Boolean);
  const baseTotal = Math.max(targetIds.length, targets.length);
  window.__xiaokeCancelLibraryFullSync = false;
  xiaokeWriteBulkJob({
    status: "running",
    mode: modeConfig.mode,
    total: baseTotal,
    done: completed.size,
    comments: options.resume ? Number(previous.comments || 0) : 0,
    interactions: options.resume ? Number(previous.interactions || 0) : 0,
    ai: options.resume ? Number(previous.ai || 0) : 0,
    skipped: options.resume ? Number(previous.skipped || 0) : 0,
    errors: options.resume ? (previous.errors || []) : [],
    completedIds: [...completed],
    targetIds,
    current: "",
    startedAt: options.resume ? previous.startedAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  if (state.view === "library") renderLibrary();
  if (state.view === "libraryBulkQueue") openLibraryBulkQueue();

  for (const video of targets) {
    if (!video || !video.id) continue;
    if (window.__xiaokeCancelLibraryFullSync) break;
    if (completed.has(video.id) && !options.force) continue;
    const title = quickVideoTitle(video);
    xiaokeWriteBulkJob({ current: title });
    const sourceUrl = xiaokeVideoDouyinUrl(video);
    const needsComments = Boolean(options.forceComments) || (modeConfig.comments && Boolean(sourceUrl) && !finalVideoComments(video).length && !finalVideoInteractions(video).length);
    const needsAi = Boolean(options.forceAi) || (modeConfig.ai && !xiaokeHasVideoAI(video));
    let hadError = false;
    let didWork = false;

    if (!needsComments && !needsAi) {
      const job = xiaokeReadBulkJob();
      completed.add(video.id);
      xiaokeWriteBulkJob({
        skipped: Number(job.skipped || 0) + 1,
        done: completed.size,
        completedIds: [...completed]
      });
      continue;
    }

    if (needsComments) {
      try {
        const result = await xiaokeFetchVideoCommentsQuiet(video, Boolean(options.forceComments));
        const job = xiaokeReadBulkJob();
        if (result && !result.skipped) {
          didWork = true;
          xiaokeWriteBulkJob({
            comments: Number(job.comments || 0) + Number(result.comments || 0),
            interactions: Number(job.interactions || 0) + Number(result.interactions || 0)
          });
        } else {
          xiaokeWriteBulkJob({ skipped: Number(job.skipped || 0) + 1 });
        }
      } catch (error) {
        hadError = true;
        const job = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(job.errors || []), { id: video.id, title, step: "comments", error: String(error.message || error).slice(0, 260), at: new Date().toISOString() }].slice(-50)
        });
      }
    }

    if (needsAi) {
      try {
        const made = await xiaokeGenerateVideoAIQuiet(video, Boolean(options.forceAi));
        if (made) {
          didWork = true;
          xiaokeWriteBulkJob({ ai: Number(xiaokeReadBulkJob().ai || 0) + 1 });
        }
      } catch (error) {
        hadError = true;
        const job = xiaokeReadBulkJob();
        xiaokeWriteBulkJob({
          errors: [...(job.errors || []), { id: video.id, title, step: "ai", error: String(error.message || error).slice(0, 260), at: new Date().toISOString() }].slice(-50)
        });
      }
    }

    const stillNeeds = xiaokeNeedsBulkWork(video, { comments: modeConfig.comments, ai: modeConfig.ai });
    if (!hadError || !stillNeeds || didWork) completed.add(video.id);
    xiaokeWriteBulkJob({ done: completed.size, completedIds: [...completed] });
    if (state.view === "library" && completed.size % 3 === 0) renderLibrary();
    if (state.view === "libraryBulkQueue" && completed.size % 3 === 0) openLibraryBulkQueue();
    await new Promise(resolve => setTimeout(resolve, Number(options.delayMs || 1200)));
  }

  const paused = Boolean(window.__xiaokeCancelLibraryFullSync);
  const latest = xiaokeReadBulkJob();
  const failed = Array.isArray(latest.errors) && latest.errors.length;
  const status = paused ? "paused" : failed && completed.size < Number(latest.total || 0) ? "failed" : "done";
  xiaokeWriteBulkJob({ status, current: "", finishedAt: new Date().toISOString(), done: completed.size, completedIds: [...completed] });
  window.__xiaokeCancelLibraryFullSync = false;
  await xiaokeMergeDouyinSideDataFromServer();
  if (state.view === "library") renderLibrary();
  if (state.view === "libraryBulkQueue") openLibraryBulkQueue();
  showToast(status === "done" ? "批量补全完成" : status === "paused" ? "批量补全已暂停，可继续未完成" : "批量补全有失败项，可更新登录后继续未完成");
};

function startLibraryFullSyncMode(mode = "all", options = {}) {
  const running = xiaokeReadBulkJob().status === "running";
  if (running) return showToast("已有批量任务在运行，先暂停或等待完成");
  const modeConfig = xiaokeBulkModeOptions(mode);
  const all = filteredVideos();
  if (!all.length) return showToast("当前筛选没有视频");
  const force = Boolean(options.force);
  const build = xiaokeBulkBuildTargets(all, {
    comments: modeConfig.comments,
    ai: modeConfig.ai,
    force,
    forceComments: force && modeConfig.comments,
    forceAi: force && modeConfig.ai
  });
  if (!build.targets.length) return showToast(`当前筛选没有需要补全的${modeConfig.label}；已跳过完整素材 ${build.stats.skippedComplete} 条`);
  const defaultMax = force ? 20 : build.targets.length;
  const max = Math.max(1, Math.min(build.targets.length, Number(options.max || defaultMax)));
  const targets = build.targets.slice(0, max);
  showToast(`开始后台补全 ${targets.length} 条${modeConfig.label}，已完成的会自动跳过`);
  return runLibraryFullSyncQueue(targets, {
    mode: modeConfig.mode,
    comments: modeConfig.comments,
    ai: modeConfig.ai,
    forceComments: force && modeConfig.comments,
    forceAi: force && modeConfig.ai,
    force,
    delayMs: options.delayMs || 1200
  });
}

startLibraryFullSync = function startLibraryFullSyncStable(options = {}) {
  return startLibraryFullSyncMode("all", options);
};

resumeLibraryFullSync = function resumeLibraryFullSyncStable() {
  const job = xiaokeReadBulkJob();
  const status = xiaokeBulkNormalizeStatus(job.status);
  if (status === "running") return showToast("批量队列正在运行");
  const modeConfig = xiaokeBulkModeOptions(job.mode || "all");
  const completed = new Set(job.completedIds || []);
  const pool = xiaokeBulkReadTargetPool(job).filter(video => !completed.has(video.id));
  const build = xiaokeBulkBuildTargets(pool, { comments: modeConfig.comments, ai: modeConfig.ai });
  if (!build.targets.length) {
    xiaokeWriteBulkJob({ status: "done", current: "", done: Number(job.total || completed.size), completedIds: [...completed] });
    if (state.view === "library") renderLibrary();
    if (state.view === "libraryBulkQueue") openLibraryBulkQueue();
    return showToast("这个队列已经没有未完成素材");
  }
  showToast(`继续 ${build.targets.length} 条未完成${modeConfig.label}`);
  return runLibraryFullSyncQueue(build.targets, {
    resume: true,
    mode: modeConfig.mode,
    comments: modeConfig.comments,
    ai: modeConfig.ai,
    targetIds: Array.isArray(job.targetIds) ? job.targetIds : build.targets.map(video => video.id),
    delayMs: 1200
  });
};

xiaokeBulkStatusHtml = function xiaokeBulkStatusHtmlStable() {
  const job = xiaokeReadBulkJob();
  const status = xiaokeBulkNormalizeStatus(job.status);
  if (!status || status === "idle") return "";
  const errors = Array.isArray(job.errors) ? job.errors : [];
  const lastError = errors[errors.length - 1];
  const canResume = ["paused", "cancelled", "failed", "done"].includes(status);
  const modeLabel = xiaokeBulkModeLabel(job);
  return `<section class="panel" style="margin-bottom:12px;border-color:${status === "running" ? "rgba(25,201,139,.45)" : "rgba(255,176,64,.45)"}">
    <div class="metadata-head">
      <div>
        <div class="panel-title">批量补全：${escapeHtml(status)} · ${escapeHtml(modeLabel)}</div>
        <div class="date">进度 ${Number(job.done || 0)} / ${Number(job.total || 0)} · 评论 ${Number(job.comments || 0)} · 互动 ${Number(job.interactions || 0)} · AI ${Number(job.ai || 0)} · 跳过 ${Number(job.skipped || 0)}${job.current ? ` · 正在处理：${escapeHtml(job.current)}` : ""}</div>
      </div>
      <div class="review-actions">
        ${status === "running" ? `<button class="small-btn" onclick="cancelLibraryFullSync()">暂停</button>` : ""}
        ${canResume ? `<button class="small-btn" onclick="resumeLibraryFullSync()">继续未完成</button>` : ""}
        <button class="small-btn" onclick="startLibraryFullSyncMode('comments')">只补评论/互动</button>
        <button class="small-btn" onclick="startLibraryFullSyncMode('ai')">只补AI</button>
        <button class="small-btn" onclick="startLibraryFullSyncMode('all')">全量补缺</button>
        <button class="small-btn" onclick="openLibraryBulkQueue()">队列详情</button>
        <button class="small-btn" onclick="renderLibrary()">刷新</button>
      </div>
    </div>
    ${xiaokeBulkProgressHtml(job)}
    ${lastError ? `<div class="date" style="color:#ff9bad;margin-top:8px">最近失败：${escapeHtml(lastError.title || "")} ${escapeHtml(lastError.error || "")}</div>` : ""}
  </section>`;
};

const xiaokePreviousOpenLibraryBulkQueue = typeof openLibraryBulkQueue === "function" ? openLibraryBulkQueue : null;
openLibraryBulkQueue = function openLibraryBulkQueueStable() {
  state.view = "libraryBulkQueue";
  restoredRenderShell();
  const job = xiaokeReadBulkJob();
  const status = xiaokeBulkNormalizeStatus(job.status);
  const rows = xiaokeBulkReadTargetPool(job).slice(0, 160);
  const completed = new Set(job.completedIds || []);
  const errorsById = new Map((job.errors || []).map(row => [row.id, row]));
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">批量补全队列</div>
        <div class="date">按素材缺口补评论/互动/AI。已完成素材自动跳过，失败项保留，更新抖音登录后可继续。</div>
      </div>
      <div class="review-actions">
        ${status === "running" ? `<button class="small-btn" onclick="cancelLibraryFullSync()">暂停</button>` : `<button class="small-btn" onclick="resumeLibraryFullSync()">继续未完成</button>`}
        <button class="small-btn" onclick="startLibraryFullSyncMode('comments')">只补评论/互动</button>
        <button class="small-btn" onclick="startLibraryFullSyncMode('ai')">只补AI</button>
        <button class="small-btn" onclick="startLibraryFullSyncMode('all')">全量补缺</button>
        <button class="small-btn" onclick="clearLibraryBulkJob()">清空记录</button>
        <button class="small-btn" onclick="renderLibrary()">返回素材库</button>
      </div>
    </section>
    ${xiaokeBulkStatusHtml()}
    <section class="panel">
      <div class="panel-title">队列明细</div>
      <div class="date">显示前 ${rows.length} 条。状态为“待处理”的素材会在继续时执行；已完成不会重复跑。</div>
      <div style="overflow:auto;margin-top:10px">
        <table class="review-table">
          <thead><tr><th>状态</th><th>标题</th><th>需要补什么</th><th>失败原因</th></tr></thead>
          <tbody>
            ${rows.map(video => {
              const error = errorsById.get(video.id);
              const statusText = error ? "失败待重试" : completed.has(video.id) ? "已完成" : xiaokeNeedsBulkWork(video, { comments: (job.mode || "all") !== "ai", ai: (job.mode || "all") !== "comments" }) ? "待处理" : "已完整";
              return `<tr>
                <td>${escapeHtml(statusText)}</td>
                <td>${escapeHtml(compactPlainText(quickVideoTitle(video), 42))}</td>
                <td>${escapeHtml(xiaokeBulkNeedText(video))}</td>
                <td>${error ? escapeHtml(String(error.error || "").slice(0, 120)) : "-"}</td>
              </tr>`;
            }).join("") || `<tr><td colspan="4">暂无队列记录。请回素材库启动补全。</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
};

Object.assign(globalThis, {
  cancelLibraryFullSync,
  runLibraryFullSyncQueue,
  startLibraryFullSync,
  startLibraryFullSyncMode,
  resumeLibraryFullSync,
  xiaokeBulkStatusHtml,
  openLibraryBulkQueue
});

const XIAOKE_BLOGGER_SYNC_QUEUE_KEY = "xiaoke_douyin_blogger_sync_queue_v3";

function xiaokeReadBloggerSyncQueue() {
  try {
    const value = JSON.parse(localStorage.getItem(XIAOKE_BLOGGER_SYNC_QUEUE_KEY) || "[]");
    return Array.isArray(value) ? value.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function xiaokeSaveBloggerSyncQueue(ids = []) {
  const clean = uniqueClean((ids || []).map(id => String(id || "").trim()).filter(Boolean));
  localStorage.setItem(XIAOKE_BLOGGER_SYNC_QUEUE_KEY, JSON.stringify(clean));
  return clean;
}

function xiaokeSourceUrlFromRow(source = {}) {
  const raw = String(source.url || source.sampleUrl || "").trim();
  return xiaokeExtractDouyinUrls(raw)[0] || raw;
}

function xiaokeLooksLikeDouyinUrl(value = "") {
  return /^https?:\/\//i.test(String(value || "")) && /douyin\.com|iesdouyin\.com/i.test(String(value || ""));
}

function xiaokeSourceVideoCandidates(limit = 10) {
  return restoredAllLibraryVideos()
    .map(video => ({
      name: video.author || XIAOKE_DEFAULT_BLOGGER_NAME,
      url: typeof xiaokeVideoDouyinUrl === "function" ? xiaokeVideoDouyinUrl(video) : "",
      title: quickVideoTitle(video),
      date: video.date || ""
    }))
    .filter(item => xiaokeLooksLikeDouyinUrl(item.url))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, limit);
}

function xiaokeHydrateBloggerSourcesFromVideos() {
  const rows = xiaokeReadBloggerSources();
  const hasLinked = rows.some(row => xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)));
  if (hasLinked) return rows;
  const candidates = xiaokeSourceVideoCandidates(3);
  if (!candidates.length) return rows;
  const next = rows.length ? rows.slice() : [{ id: "source_" + Date.now(), name: XIAOKE_DEFAULT_BLOGGER_NAME, url: "", sampleUrl: "", note: "", active: true }];
  const first = next[0];
  first.sampleUrl = first.sampleUrl || candidates[0].url;
  first.note = first.note || `从已有素材自动发现：${compactPlainText(candidates[0].title, 24)}`;
  first.active = true;
  xiaokeSaveBloggerSources(next);
  localStorage.setItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY, first.id);
  return next;
}

function xiaokeBloggerSyncLimit() {
  return Math.max(1, Math.min(50, Number(localStorage.getItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY) || 20)));
}

function xiaokeSetBloggerSyncLimit(value) {
  localStorage.setItem(XIAOKE_DOUYIN_SYNC_LIMIT_KEY, String(Math.max(1, Math.min(50, Number(value) || 20))));
}

function xiaokeFindActiveBloggerSource(options = {}) {
  const rows = xiaokeHydrateBloggerSourcesFromVideos();
  const activeId = options.sourceId || localStorage.getItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY);
  return rows.find(row => row.id === activeId && xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)))
    || rows.find(row => xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)))
    || null;
}

async function xiaokeStartDouyinCookieWindow() {
  try {
    const response = await fetch("/api/douyin-cookie-login", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "无法打开抖音登录窗口");
    state.douyinCaptureStatus = data.status || state.douyinCaptureStatus;
    showToast("已打开专用抖音登录窗口。请在那个窗口登录并完成验证码，然后回素材库刷新状态。");
    if (state.view === "library") renderLibrary();
    clearTimeout(state.douyinCookieTimer);
    state.douyinCookieTimer = setTimeout(() => pollDouyinCookieStatus(true), 3500);
  } catch (error) {
    showToast("打开登录窗口失败：" + (error.message || "请检查 Edge/浏览器环境"));
  }
}

async function xiaokeStartDouyinSourceSync(source, options = {}) {
  if (!source) {
    showToast("还没有可同步的博主来源。请点“设置博主来源”，粘贴抖音主页、合集或任意作品链接。");
    configureDouyinBloggerSource();
    return null;
  }
  const url = xiaokeSourceUrlFromRow(source);
  if (!xiaokeLooksLikeDouyinUrl(url)) {
    showToast(`「${source.name || XIAOKE_DEFAULT_BLOGGER_NAME}」缺少抖音链接。只填昵称无法抓取，请补主页/合集/作品链接。`);
    configureDouyinBloggerSource();
    return null;
  }
  const limit = Math.max(1, Math.min(50, Number(options.limit || source.limit || xiaokeBloggerSyncLimit())));
  xiaokeSetBloggerSyncLimit(limit);
  localStorage.setItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY, source.id);
  localStorage.setItem(XIAOKE_DOUYIN_BLOGGER_URL_KEY, url);
  showToast(`已提交「${source.name || XIAOKE_DEFAULT_BLOGGER_NAME}」同步：最多 ${/\/video\//i.test(url) ? 1 : limit} 条，后台低频执行。`);
  try {
    const response = await fetch("/api/douyin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, limit, download: true, comments: true })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || data.detail || "启动同步失败");
    state.douyinSyncJob = data.job;
    state.xiaokeRunAiAfterDouyinSync = true;
    if (state.view === "library") renderLibrary();
    pollDouyinSyncStatus(true);
    return data.job;
  } catch (error) {
    showToast("启动失败：" + (error.message || "请检查链接、cookies 或抖音验证码"));
    return null;
  }
}

syncDouyinBloggerSource = function syncDouyinBloggerSourceStable(id) {
  const rows = xiaokeHydrateBloggerSourcesFromVideos();
  const source = rows.find(row => row.id === id) || rows.find(row => xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)));
  return xiaokeStartDouyinSourceSync(source);
};

startDouyinBloggerSync = function startDouyinBloggerSyncStable(options = {}) {
  const source = xiaokeFindActiveBloggerSource(options);
  return xiaokeStartDouyinSourceSync(source, options);
};

function xiaokeSyncAllBloggerSources() {
  const rows = xiaokeHydrateBloggerSourcesFromVideos().filter(row => xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)));
  if (!rows.length) {
    showToast("还没有可同步来源。请先在“设置博主来源”里粘贴抖音主页、合集或作品链接。");
    configureDouyinBloggerSource();
    return;
  }
  xiaokeSaveBloggerSyncQueue(rows.map(row => row.id));
  xiaokeStartNextBloggerSourceInQueue();
}

async function xiaokeStartNextBloggerSourceInQueue() {
  const queue = xiaokeReadBloggerSyncQueue();
  if (!queue.length) return;
  if (state.douyinSyncJob && state.douyinSyncJob.status === "running") return;
  const rows = xiaokeReadBloggerSources();
  const nextId = queue.shift();
  xiaokeSaveBloggerSyncQueue(queue);
  const source = rows.find(row => row.id === nextId);
  if (!source || !xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(source))) {
    setTimeout(xiaokeStartNextBloggerSourceInQueue, 500);
    return;
  }
  await xiaokeStartDouyinSourceSync(source, { limit: xiaokeBloggerSyncLimit() });
}

const xiaokePreviousPollDouyinSyncStatusStable = typeof pollDouyinSyncStatus === "function" ? pollDouyinSyncStatus : null;
pollDouyinSyncStatus = async function pollDouyinSyncStatusStable(forceRender = false) {
  const job = xiaokePreviousPollDouyinSyncStatusStable ? await xiaokePreviousPollDouyinSyncStatusStable(forceRender) : null;
  const status = job || state.douyinSyncJob || {};
  if (status && status.status && status.status !== "running" && xiaokeReadBloggerSyncQueue().length) {
    setTimeout(xiaokeStartNextBloggerSourceInQueue, 1200);
  }
  return status;
};

function xiaokeBloggerSourcesHtmlStable() {
  const rows = xiaokeHydrateBloggerSourcesFromVideos();
  const queue = xiaokeReadBloggerSyncQueue();
  const activeId = localStorage.getItem(XIAOKE_ACTIVE_BLOGGER_SOURCE_KEY);
  const linkedRows = rows.filter(row => xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row)));
  const activeSource = rows.find(row => row.id === activeId) || linkedRows[0] || rows[0];
  const sourceCards = rows.map(row => {
    const linked = xiaokeLooksLikeDouyinUrl(xiaokeSourceUrlFromRow(row));
    const active = row.id === activeId || (!activeId && activeSource && row.id === activeSource.id);
    return `<div class="mini-stat" style="display:block;min-height:86px;border-color:${active ? "rgba(23,209,154,.65)" : "rgba(64,76,102,.55)"}">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
        <strong>${escapeHtml(row.name || XIAOKE_DEFAULT_BLOGGER_NAME)}</strong>
        <span class="${linked ? "status-done" : "status-pending"}">${linked ? "可同步" : "待补链接"}</span>
      </div>
      <div class="date" style="margin-top:6px">${escapeHtml(xiaokeBloggerLinkKind(row))}${row.note ? " · " + escapeHtml(compactPlainText(row.note, 28)) : ""}</div>
      <div class="analysis-actions" style="justify-content:flex-start;margin-top:8px">
        <button class="small-btn" onclick='xiaokeSetActiveBloggerSource(${JSON.stringify(row.id)})'>设为当前</button>
        ${linked ? `<button class="small-btn" onclick='syncDouyinBloggerSource(${JSON.stringify(row.id)})'>同步</button>` : `<button class="small-btn" onclick="configureDouyinBloggerSource()">补链接</button>`}
      </div>
    </div>`;
  }).join("");
  return `<section class="panel" style="margin-bottom:12px">
    <div class="metadata-head">
      <div>
        <div class="panel-title">博主来源</div>
        <div class="date">已保存 ${rows.length} 个来源，${linkedRows.length} 个可同步。只保存“模型先生”昵称不能定位主页，必须至少有一个主页/合集/作品链接。</div>
      </div>
      <div class="analysis-actions" style="margin:0">
        <label class="date" style="display:flex;align-items:center;gap:6px">每个来源最多
          <input class="small-input" style="width:64px" type="number" min="1" max="50" value="${xiaokeBloggerSyncLimit()}" onchange="xiaokeSetBloggerSyncLimit(this.value)">
          条
        </label>
        <button class="small-btn" onclick="configureDouyinBloggerSource()">设置博主来源</button>
        <button class="small-btn" onclick="xiaokeStartDouyinCookieWindow()">打开登录窗口</button>
        ${linkedRows.length ? `<button class="open-btn" style="width:auto;padding:0 16px" onclick="startDouyinBloggerSync()">同步当前</button><button class="small-btn" onclick="xiaokeSyncAllBloggerSources()">同步全部来源</button>` : ""}
      </div>
    </div>
    ${rows.length ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin-top:10px">${sourceCards}</div>` : `<div class="empty-review" style="margin-top:10px">还没有来源。点“设置博主来源”，粘贴模型先生主页、合集或任意视频链接。以后会记住，不用重复填。</div>`}
    ${queue.length ? `<div class="date" style="margin-top:8px">同步队列剩余 ${queue.length} 个来源，当前任务完成后自动继续。</div>` : ""}
  </section>`;
}

xiaokeBloggerSourcesHtml = xiaokeBloggerSourcesHtmlStable;

function xiaokeApplyAutoGroupsDirect(videos = filteredVideos(), options = {}) {
  const onlyMissing = options.onlyMissing !== false;
  const assignments = readVideoAssignments();
  const allGroups = new Set(readVideoGroups());
  let matched = 0;
  let changed = 0;
  videos.forEach(video => {
    const existing = assignments[video.id] || [];
    if (onlyMissing && existing.length) return;
    const inferred = xiaokeInferVideoGroups(video, 3).map(item => item.group);
    if (!inferred.length) return;
    matched += 1;
    const next = [...new Set([...existing, ...inferred])];
    if (next.length !== existing.length) changed += 1;
    assignments[video.id] = next;
    next.forEach(name => allGroups.add(name));
  });
  saveVideoAssignments(assignments);
  saveVideoGroups([...allGroups]);
  xiaokeCloseAutoGroupPreview();
  renderTopChips();
  if (state.view === "library") renderLibrary();
  showToast(`自动归档完成：识别 ${matched} 条，更新 ${changed} 条。已有人工分组默认保留。`);
}

const xiaokePreviousAutoGroupPreviewHtmlStable = typeof xiaokeAutoGroupPreviewHtml === "function" ? xiaokeAutoGroupPreviewHtml : null;
xiaokeAutoGroupPreviewHtml = function xiaokeAutoGroupPreviewHtmlStable(rows) {
  const html = xiaokePreviousAutoGroupPreviewHtmlStable ? xiaokePreviousAutoGroupPreviewHtmlStable(rows) : "";
  return html.replace(
    '<button class="open-btn" onclick="xiaokeApplyAutoGroupPreview()">写入板块</button>',
    '<button class="small-btn" onclick="xiaokeApplyAutoGroupsDirect(filteredVideos(), { onlyMissing: true })">自动写入未分组</button><button class="small-btn" onclick="xiaokeApplyAutoGroupsDirect(filteredVideos(), { onlyMissing: false })">重新写入当前筛选</button><button class="open-btn" onclick="xiaokeApplyAutoGroupPreview()">按表格写入</button>'
  );
};

function xiaokeManualGroupModalHtml(rows) {
  const existingGroups = uniqueClean([...readVideoGroups(), ...tags.filter(t => t.type === "sector").map(t => sectorDisplayName(t))]).slice(0, 80);
  return `<div id="xiaokeManualGroupModal" class="modal open" style="display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:9999">
    <div class="modal-card" style="width:min(1180px,92vw);max-height:86vh;overflow:hidden;display:flex;flex-direction:column">
      <div class="metadata-head">
        <div>
          <div class="panel-title">手动多选分组</div>
          <div class="date">勾选需要调整的视频，右侧填板块；不会影响未勾选素材。常用板块：${escapeHtml(existingGroups.slice(0, 12).join(" / "))}</div>
        </div>
        <div class="analysis-actions">
          <button class="small-btn" onclick="xiaokeManualGroupSelectAll(true)">全选</button>
          <button class="small-btn" onclick="xiaokeManualGroupSelectAll(false)">全不选</button>
          <button class="small-btn" onclick="xiaokeCloseManualGroupModal()">取消</button>
          <button class="open-btn" onclick="xiaokeApplyManualGroupModal()">写入所选</button>
        </div>
      </div>
      <div style="margin-top:12px;overflow:auto;border:1px solid #263244;border-radius:8px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="background:#1b202b;color:#dbeafe;text-align:left"><th style="padding:10px;width:56px">选择</th><th style="padding:10px;width:34%">视频</th><th style="padding:10px;width:24%">已有板块</th><th style="padding:10px">追加板块</th></tr></thead>
          <tbody>${rows.map((video, index) => {
            const current = videoGroupsFor(video.id);
            const suggest = xiaokeInferVideoGroups(video, 3).map(item => item.group).join("，");
            return `<tr style="border-top:1px solid #263244">
              <td style="padding:10px;vertical-align:top"><input type="checkbox" id="manualGroupCheck_${index}"></td>
              <td style="padding:10px;vertical-align:top"><strong>${escapeHtml(compactPlainText(quickVideoTitle(video), 56))}</strong><div class="date">${escapeHtml(video.date || "")} · ${escapeHtml(video.author || video.source || "")}</div></td>
              <td style="padding:10px;vertical-align:top;color:#aeb6c6">${escapeHtml(current.join(" / ") || "-")}</td>
              <td style="padding:10px;vertical-align:top"><input class="search-input" id="manualGroupInput_${index}" value="${escapeHtml(suggest)}" placeholder="例如：有色金属，光模块"></td>
            </tr>`;
          }).join("")}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function xiaokeCloseManualGroupModal() {
  const modal = document.getElementById("xiaokeManualGroupModal");
  if (modal) modal.remove();
}

function xiaokeManualGroupSelectAll(flag) {
  (state.xiaokeManualGroupRows || []).forEach((_, index) => {
    const checkbox = document.getElementById(`manualGroupCheck_${index}`);
    if (checkbox) checkbox.checked = Boolean(flag);
  });
}

function xiaokeApplyManualGroupModal() {
  const rows = state.xiaokeManualGroupRows || [];
  const assignments = readVideoAssignments();
  const allGroups = new Set(readVideoGroups());
  let selected = 0;
  rows.forEach((video, index) => {
    const checkbox = document.getElementById(`manualGroupCheck_${index}`);
    if (!checkbox || !checkbox.checked) return;
    const input = document.getElementById(`manualGroupInput_${index}`);
    const groups = uniqueClean(String(input ? input.value : "").split(/[，,、/]+/));
    if (!groups.length) return;
    selected += 1;
    assignments[video.id] = [...new Set([...(assignments[video.id] || []), ...groups])];
    groups.forEach(group => allGroups.add(group));
  });
  if (!selected) return showToast("请先勾选要调整的视频");
  saveVideoAssignments(assignments);
  saveVideoGroups([...allGroups]);
  xiaokeCloseManualGroupModal();
  renderTopChips();
  renderLibrary();
  showToast(`已给 ${selected} 条视频追加板块`);
}

manualMultiAssignFilteredVideosToGroups = function manualMultiAssignFilteredVideosToGroupsStable() {
  const rows = filteredVideos();
  if (!rows.length) return showToast("当前筛选没有视频");
  state.xiaokeManualGroupRows = rows.slice(0, 300);
  xiaokeCloseManualGroupModal();
  document.body.insertAdjacentHTML("beforeend", xiaokeManualGroupModalHtml(state.xiaokeManualGroupRows));
};

function xiaokeAutoClassifyAllVideos() {
  xiaokeApplyAutoGroupsDirect(restoredAllLibraryVideos(), { onlyMissing: true });
}

Object.assign(globalThis, {
  xiaokeSetBloggerSyncLimit,
  xiaokeStartDouyinCookieWindow,
  syncDouyinBloggerSource,
  startDouyinBloggerSync,
  xiaokeSyncAllBloggerSources,
  xiaokeApplyAutoGroupsDirect,
  xiaokeCloseManualGroupModal,
  xiaokeManualGroupSelectAll,
  xiaokeApplyManualGroupModal,
  manualMultiAssignFilteredVideosToGroups,
  xiaokeAutoClassifyAllVideos
});

let xiaokeAgentSending = false;

async function sendAgentMessage() {
  const input = document.getElementById("agentInput");
  const button = document.querySelector(".agent-input button");
  if (!input || !String(input.value || "").trim()) return;
  if (xiaokeAgentSending) {
    showToast("Agent 正在回答，请稍候");
    return;
  }
  xiaokeAgentSending = true;
  if (button) {
    button.disabled = true;
    button.textContent = "发送中";
  }
  try {
    if (typeof sendAgent !== "function") throw new Error("Agent 发送入口未加载");
    await sendAgent();
  } catch (error) {
    const chat = document.getElementById("agentChat");
    if (chat) chat.insertAdjacentHTML("beforeend", `<div class="bubble bot"><span class="route">系统提示</span>${escapeHtml(error.message || "发送失败，请检查模型配置")}</div>`);
    showToast("Agent 发送失败：" + (error.message || "请检查配置"));
  } finally {
    xiaokeAgentSending = false;
    const nextButton = document.querySelector(".agent-input button");
    if (nextButton) {
      nextButton.disabled = false;
      nextButton.textContent = "发送";
    }
  }
}

const XIAOKE_MATERIAL_PIPELINE_KEY = "xiaoke_material_pipeline_job_v1";

function xiaokeReadMaterialPipeline() {
  try {
    const value = JSON.parse(localStorage.getItem(XIAOKE_MATERIAL_PIPELINE_KEY) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function xiaokeWriteMaterialPipeline(patch = {}) {
  const next = { ...xiaokeReadMaterialPipeline(), ...patch, updatedAt: new Date().toISOString() };
  localStorage.setItem(XIAOKE_MATERIAL_PIPELINE_KEY, JSON.stringify(next));
  return next;
}

function xiaokeMaterialPipelineTargets() {
  return restoredAllLibraryVideos().filter(video => !xiaokeIsBookDocument(video)).filter(video => {
    const missingTranscript = Boolean(video.videoUrl) && !getVideoDetailTranscript(video);
    const missingAi = !xiaokeHasVideoAI(video);
    return missingTranscript || missingAi;
  });
}

function pauseProfessionalMaterialPipeline() {
  window.__xiaokeProfessionalPipelinePaused = true;
  xiaokeWriteMaterialPipeline({ status: "paused" });
  showToast("素材补全队列已暂停，可继续未完成");
}

async function runProfessionalMaterialPipeline(targets = []) {
  if (window.__xiaokeProfessionalPipelineRunning) return;
  window.__xiaokeProfessionalPipelineRunning = true;
  window.__xiaokeProfessionalPipelinePaused = false;
  const stored = xiaokeReadMaterialPipeline();
  const previous = ["paused", "running"].includes(stored.status) ? stored : {};
  const completed = new Set(previous.completedIds || []);
  let transcriptDone = Number(previous.transcriptDone || 0);
  let aiDone = Number(previous.aiDone || 0);
  let failed = Number(previous.failed || 0);
  xiaokeWriteMaterialPipeline({
    status: "running",
    total: targets.length,
    targetIds: targets.map(video => video.id),
    completedIds: [...completed],
    transcriptDone,
    aiDone,
    failed,
    startedAt: previous.startedAt || new Date().toISOString(),
    current: ""
  });
  if (state.view === "library") renderLibrary();
  for (const video of targets) {
    if (window.__xiaokeProfessionalPipelinePaused) break;
    if (completed.has(video.id)) continue;
    const title = quickVideoTitle(video);
    xiaokeWriteMaterialPipeline({ current: title });
    let itemFailed = false;
    if (video.videoUrl && !getVideoDetailTranscript(video)) {
      const transcript = await transcribeVideo(video.id);
      if (transcript) transcriptDone += 1;
      else itemFailed = true;
    }
    if (!xiaokeHasVideoAI(video)) {
      try {
        const result = await xiaokeGenerateVideoAIQuiet(video, false);
        if (result) aiDone += 1;
      } catch {
        itemFailed = true;
      }
    }
    if (itemFailed) failed += 1;
    if (!itemFailed) completed.add(video.id);
    xiaokeWriteMaterialPipeline({
      completedIds: [...completed],
      done: completed.size,
      transcriptDone,
      aiDone,
      failed,
      current: title
    });
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  const paused = window.__xiaokeProfessionalPipelinePaused;
  xiaokeWriteMaterialPipeline({ status: paused ? "paused" : "done", current: "", finishedAt: paused ? "" : new Date().toISOString() });
  window.__xiaokeProfessionalPipelineRunning = false;
  if (!paused) showToast(`素材补全完成：转写 ${transcriptDone}，AI ${aiDone}，失败 ${failed}`);
  if (state.view === "library") renderLibrary();
}

function startProfessionalMaterialPipeline(options = {}) {
  if (window.__xiaokeProfessionalPipelineRunning) return showToast("素材补全队列正在运行");
  const allTargets = xiaokeMaterialPipelineTargets();
  const previous = xiaokeReadMaterialPipeline();
  const completed = options.restart ? new Set() : new Set(previous.completedIds || []);
  const targets = allTargets.filter(video => !completed.has(video.id));
  if (!targets.length) {
    xiaokeWriteMaterialPipeline({
      status: "done",
      current: "",
      total: 0,
      done: 0,
      completedIds: [],
      targetIds: [],
      transcriptDone: 0,
      aiDone: 0,
      failed: 0,
      finishedAt: new Date().toISOString()
    });
    showToast("所有可处理素材都已有转写或 AI 分析");
    return;
  }
  if (options.restart) localStorage.removeItem(XIAOKE_MATERIAL_PIPELINE_KEY);
  runProfessionalMaterialPipeline(targets);
}

function xiaokeMaterialPipelineStatusHtml() {
  const job = xiaokeReadMaterialPipeline();
  if (!job.status || job.status === "idle") return "";
  return `<section class="panel" style="margin-bottom:12px;border-color:${job.status === "running" ? "var(--gold)" : "rgba(23,209,154,.45)"}">
    <div class="metadata-head">
      <div><div class="panel-title">转写与 AI 队列：${escapeHtml(job.status)}</div><div class="date">进度 ${Number(job.done || 0)}/${Number(job.total || 0)} · 转写 ${Number(job.transcriptDone || 0)} · AI ${Number(job.aiDone || 0)} · 失败 ${Number(job.failed || 0)}${job.current ? ` · ${escapeHtml(job.current)}` : ""}</div></div>
      <div class="review-actions">${job.status === "running" ? `<button class="small-btn" onclick="pauseProfessionalMaterialPipeline()">暂停</button>` : `<button class="small-btn" onclick="startProfessionalMaterialPipeline()">继续未完成</button>`}</div>
    </div>
  </section>`;
}

const xiaokePreviousLibrarySearchHtmlPipeline = librarySearchHtml;
librarySearchHtml = function xiaokeLibrarySearchHtmlPipeline() {
  return xiaokePreviousLibrarySearchHtmlPipeline().replace(
    '<button class="small-btn" onclick="startVideoBackgroundQueue(\'analysis\')">后台 AI 分析</button>',
    '<button class="small-btn" onclick="startVideoBackgroundQueue(\'analysis\')">后台 AI 分析</button><button class="open-btn" style="width:auto;padding:0 14px" onclick="startProfessionalMaterialPipeline()">补全转写 + AI</button>'
  ) + xiaokeMaterialPipelineStatusHtml();
};

// Final guards for check-in navigation, document queues, startup sync and local placeholders.
function xiaokeIsBookDocument(video = {}) {
  const haystack = [video.title, video.filename, video.topic, video.focus, video.author, video.mimeType, video.type]
    .map(value => String(value || "").toLowerCase()).join(" ");
  return Boolean(video.isDocument || video.documentUrl || /\.pdf\b|\.docx?\b|\.epub\b|书籍|本地文档|pdf文档/.test(haystack));
}

function xiaokeLooksGarbledTitle(value = "") {
  const text = String(value || "");
  return /(妯″瀷|瑙嗛|寰呯‘|绱犳潗|鏍囬|鏈湴|锝|鈥|銆)/.test(text) || text.includes("�");
}

function xiaokeIsDisposableLocalPlaceholder(video = {}) {
  if (!video.local && !video.userAdded) return false;
  const title = String(video.title || "").trim();
  const generic = /^(本地视频已导入|本地视频|待识别标题)$/i.test(title)
    || title.includes("本地视频已导入");
  const duration = Number(video.duration || video.durationSeconds || 0);
  const emptyMetrics = !Number(video.likes || 0) && !Number(video.comments || 0) && !Number(video.shares || 0);
  return generic && emptyMetrics && (!duration || duration <= 16);
}

const xiaokeRestoredAllLibraryVideosBase = restoredAllLibraryVideos;
restoredAllLibraryVideos = function restoredAllLibraryVideosClean() {
  return xiaokeRestoredAllLibraryVideosBase().filter(video => !xiaokeIsDisposableLocalPlaceholder(video));
};

const xiaokeLibraryVideosBase = libraryVideos;
libraryVideos = function libraryVideosClean() {
  return xiaokeLibraryVideosBase().filter(video => !xiaokeIsDisposableLocalPlaceholder(video));
};

const xiaokeVideoCardDisplayTitleBase = videoCardDisplayTitle;
videoCardDisplayTitle = function videoCardDisplayTitleClean(video = {}) {
  const title = xiaokeVideoCardDisplayTitleBase(video);
  if (!xiaokeLooksGarbledTitle(title)) return title;
  const filename = String(video.filename || "").replace(/\.[^.]+$/, "").trim();
  return filename && !xiaokeLooksGarbledTitle(filename) ? filename : "待识别标题";
};

const xiaokeNeedsBulkWorkBase = xiaokeNeedsBulkWork;
xiaokeNeedsBulkWork = function xiaokeNeedsBulkWorkWithoutDocuments(video = {}, options = {}) {
  return !xiaokeIsBookDocument(video) && xiaokeNeedsBulkWorkBase(video, options);
};

const xiaokeRunLibraryFullSyncQueueBase = runLibraryFullSyncQueue;
runLibraryFullSyncQueue = function runLibraryFullSyncQueueWithoutDocuments(targets = [], options = {}) {
  const cleanTargets = (targets || []).filter(video => !xiaokeIsBookDocument(video));
  const cleanIds = new Set(cleanTargets.map(video => video.id));
  return xiaokeRunLibraryFullSyncQueueBase(cleanTargets, {
    ...options,
    targetIds: Array.isArray(options.targetIds) ? options.targetIds.filter(id => cleanIds.has(id)) : undefined
  });
};

function xiaokeCheckinMonthShift(delta) {
  const selected = state.checkinDate || xiaokeCheckinToday();
  const base = new Date(`${state.checkinMonth || selected.slice(0, 7)}-01T00:00:00`);
  base.setMonth(base.getMonth() + Number(delta || 0));
  state.checkinMonth = base.toISOString().slice(0, 7);
  renderDailyCheckin();
}

function xiaokeCheckinGoToday() {
  const today = xiaokeCheckinToday();
  state.checkinMonth = today.slice(0, 7);
  openDailyCheckin(today);
}

const xiaokeOpenDailyCheckinBase = openDailyCheckin;
openDailyCheckin = function openDailyCheckinWithMonth(date = xiaokeCheckinToday()) {
  state.checkinMonth = String(date || xiaokeCheckinToday()).slice(0, 7);
  return xiaokeOpenDailyCheckinBase(date);
};

xiaokeCheckinCalendarHtml = function xiaokeCheckinCalendarMonthHtml(selectedDate) {
  const store = xiaokeReadCheckins();
  const today = xiaokeCheckinToday();
  const month = state.checkinMonth || String(selectedDate || today).slice(0, 7);
  const first = new Date(`${month}-01T00:00:00`);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const dateObject = new Date(start);
    dateObject.setDate(start.getDate() + index);
    const date = dateObject.toISOString().slice(0, 10);
    const progress = xiaokeCheckinProgress(store[date] || {});
    const cls = ["checkin-day", date.slice(0, 7) !== month ? "muted" : "", date === today ? "today" : "", date === selectedDate ? "active" : "", progress.pct >= 100 ? "done" : progress.pct > 0 ? "partial" : ""].filter(Boolean).join(" ");
    cells.push(`<button class="${cls}" onclick='openDailyCheckin(${JSON.stringify(date)})'><b>${dateObject.getDate()}</b><span>${progress.total ? progress.pct + "%" : ""}</span></button>`);
  }
  return `<div class="checkin-calendar">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:2px 0 10px">
      <button class="small-btn" onclick="xiaokeCheckinMonthShift(-1)">上月</button>
      <strong>${escapeHtml(month.replace("-", "年"))}月</strong>
      <div style="display:flex;gap:6px"><button class="small-btn" onclick="xiaokeCheckinGoToday()">今天</button><button class="small-btn" onclick="xiaokeCheckinMonthShift(1)">下月</button></div>
    </div>
    <div class="checkin-weekdays">${["一", "二", "三", "四", "五", "六", "日"].map(day => `<span>${day}</span>`).join("")}</div>
    <div class="checkin-days">${cells.join("")}</div>
  </div>`;
};

const XIAOKE_STARTUP_SYNC_SESSION_KEY = "xiaoke_startup_blogger_sync_v1";
async function xiaokeSyncBloggerOnceOnStartup() {
  if (sessionStorage.getItem(XIAOKE_STARTUP_SYNC_SESSION_KEY)) return;
  sessionStorage.setItem(XIAOKE_STARTUP_SYNC_SESSION_KEY, new Date().toISOString());
  await new Promise(resolve => setTimeout(resolve, 2200));
  const source = xiaokeFindActiveBloggerSource();
  if (!source) return;
  try {
    const response = await fetch("/api/douyin-sync-status", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (data.job && data.job.status === "running") return;
  } catch {}
  xiaokeStartDouyinSourceSync(source, { limit: xiaokeBloggerSyncLimit() });
}

function xiaokeRepairLegacyBackgroundJobs() {
  const videosById = new Map(restoredAllLibraryVideos().map(video => [video.id, video]));
  const job = xiaokeReadBulkJob();
  if (job && job.status) {
    const targetIds = (job.targetIds || []).filter(id => {
      const video = videosById.get(id);
      return video && !xiaokeIsBookDocument(video);
    });
    const targetSet = new Set(targetIds);
    const completedIds = (job.completedIds || []).filter(id => targetSet.has(id));
    const errors = (job.errors || []).filter(row => targetSet.has(row.id));
    const updatedAt = new Date(job.updatedAt || job.startedAt || 0).getTime();
    const staleRunning = job.status === "running" && (!updatedAt || Date.now() - updatedAt > 120000);
    xiaokeWriteBulkJob({
      targetIds,
      completedIds,
      errors,
      total: targetIds.length,
      done: Math.min(completedIds.length, targetIds.length),
      status: targetIds.length ? (staleRunning ? "paused" : job.status) : "done",
      current: staleRunning ? "" : (job.current || "")
    });
  }
  const material = xiaokeReadMaterialPipeline();
  if (material && material.status === "running") {
    const updatedAt = new Date(material.updatedAt || material.startedAt || 0).getTime();
    if (!updatedAt || Date.now() - updatedAt > 120000) xiaokeWriteMaterialPipeline({ status: "paused", current: "" });
  }
}

setTimeout(xiaokeSyncBloggerOnceOnStartup, 1200);
setTimeout(xiaokeRepairLegacyBackgroundJobs, 2600);

Object.assign(globalThis, {
  sendAgentMessage,
  scrollTopChips,
  setAgentResponseMode,
  saveCurrentAgentReport,
  exportAgentReport,
  openAgentReportHistory,
  closeAgentReportHistory,
  renderAgentReportHistory,
  viewAgentReport,
  deleteAgentReport,
  setAgentSize,
  startAgentDrag,
  applyAgentSize,
  startProfessionalMaterialPipeline,
  pauseProfessionalMaterialPipeline,
  xiaokeCheckinMonthShift,
  xiaokeCheckinGoToday,
  xiaokeSyncBloggerOnceOnStartup,
  xiaokeRepairLegacyBackgroundJobs
});

window.addEventListener("click", e => {
  if (e.target.id === "importModal") closeImport();
  if (e.target.id === "stockModal") closeStockModal();
  if (e.target.id === "agentReportModal") closeAgentReportHistory();
  if (e.target.closest && e.target.closest("#agent,#rightPane,#leftPane,#topChips,input,textarea,select,.agent,.fab,.modal")) return;
  const card = e.target && e.target.closest ? e.target.closest(".video-card[data-video-id]") : null;
  if (card && !e.target.closest("button")) {
    e.preventDefault();
    openDetail(card.dataset.videoId);
    try {
      history.replaceState(null, "", `?view=detail&id=${encodeURIComponent(card.dataset.videoId)}`);
    } catch {}
  }
});

function xiaokeDataScreeningExamples() {
  return [
    "昨日换手率大于5%，昨日收盘价小于10元，今日量比大于1.7，排除ST",
    "2日内区间最低价*0.8小于30日区间最低价，7日内涨停次数大于0次，20日新高",
    "MACD金叉，KDJ金叉，RSI6小于70，BOLL中轨上方，5日线上穿20日线",
    "今日量比从大到小排名，成交额大于3亿，60日涨幅在0到60%",
    "今日竞价金额大于180万，今日9:25量比/昨日量比大于1.7，排除ST"
  ];
}

function xiaokeStrategyRulesPanelHtml(rules) {
  return `
    <div class="metadata-head">
      <div>
        <div class="panel-title">A 股筛选规则</div>
        <div class="date">空白字段表示不限制；文字筛选适合快速表达，结构化规则适合复用。</div>
      </div>
      <select class="small-select" onchange="if(this.value)applyStrategyPreset(this.value)">
        <option value="">应用预设</option>
        <option value="quality">质量成长</option>
        <option value="momentum">趋势动量</option>
        <option value="value">低估值质量</option>
        <option value="default">均衡策略</option>
      </select>
    </div>
    <div class="strategy-rule-toolbar">
      <label><span>市场</span><select onchange="updateStrategyRule('market',this.value,'text')"><option value="all" ${rules.market==='all'?'selected':''}>全部A股</option><option value="主板" ${rules.market==='主板'?'selected':''}>主板</option><option value="创业板" ${rules.market==='创业板'?'selected':''}>创业板</option><option value="科创板" ${rules.market==='科创板'?'selected':''}>科创板</option><option value="北交所" ${rules.market==='北交所'?'selected':''}>北交所</option></select></label>
      <label class="strategy-check"><input type="checkbox" ${rules.excludeSt!==false?'checked':''} onchange="updateStrategyRule('excludeSt',this.checked,'boolean')">排除 ST / 退市</label>
      <label><span>排序</span><select onchange="updateStrategyRule('sortBy',this.value,'text')"><option value="strategyScore" ${rules.sortBy==='strategyScore'?'selected':''}>综合策略分</option><option value="pct" ${rules.sortBy==='pct'?'selected':''}>当日涨幅</option><option value="pct60" ${rules.sortBy==='pct60'?'selected':''}>60日强度</option><option value="roe" ${rules.sortBy==='roe'?'selected':''}>ROE</option><option value="profitGrowth" ${rules.sortBy==='profitGrowth'?'selected':''}>利润增速</option><option value="amount" ${rules.sortBy==='amount'?'selected':''}>成交额</option><option value="pe" ${rules.sortBy==='pe'?'selected':''}>PE从低到高</option></select></label>
    </div>
    <div class="strategy-rule-grid">
      ${strategyRuleInput('priceMin','最低股价',rules.priceMin,'元')}
      ${strategyRuleInput('priceMax','最高股价',rules.priceMax,'元')}
      ${strategyRuleInput('pctMin','当日最低涨幅',rules.pctMin,'%')}
      ${strategyRuleInput('pctMax','当日最高涨幅',rules.pctMax,'%')}
      ${strategyRuleInput('turnoverMin','最低换手率',rules.turnoverMin,'%')}
      ${strategyRuleInput('turnoverMax','最高换手率',rules.turnoverMax,'%')}
      ${strategyRuleInput('amountMin','最低成交额',rules.amountMin,'亿')}
      ${strategyRuleInput('marketCapMin','最低市值',rules.marketCapMin,'亿')}
      ${strategyRuleInput('marketCapMax','最高市值',rules.marketCapMax,'亿')}
      ${strategyRuleInput('peMin','最低PE',rules.peMin,'倍')}
      ${strategyRuleInput('peMax','最高PE',rules.peMax,'倍')}
      ${strategyRuleInput('pbMax','最高PB',rules.pbMax,'倍')}
      ${strategyRuleInput('roeMin','最低ROE',rules.roeMin,'%')}
      ${strategyRuleInput('grossMarginMin','最低毛利率',rules.grossMarginMin,'%')}
      ${strategyRuleInput('revenueGrowthMin','最低营收增速',rules.revenueGrowthMin,'%')}
      ${strategyRuleInput('profitGrowthMin','最低利润增速',rules.profitGrowthMin,'%')}
      ${strategyRuleInput('debtRatioMax','最高负债率',rules.debtRatioMax,'%')}
      ${strategyRuleInput('pct60Min','60日最低涨幅',rules.pct60Min,'%')}
      ${strategyRuleInput('pct60Max','60日最高涨幅',rules.pct60Max,'%')}
      ${strategyRuleInput('limit','最多结果',rules.limit,'只')}
    </div>
    <button class="open-btn strategy-run-btn" onclick="runAShareStrategy()">运行 A 股筛选</button>
  `;
}

function openDataScreening() {
  state.view = "dataScreening";
  state.search = "";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  if (typeof restoredNavigate === "function") return restoredNavigate("dataScreening", renderDataScreening);
  renderDataScreening();
}

function renderDataScreening() {
  state.view = "dataScreening";
  restoredRenderShell();
  const rules = readStrategyRules();
  const result = readStrategyScreenResult();
  const naturalQuery = readNaturalStockQuery();
  const naturalResult = readNaturalScreenResult();
  const examples = xiaokeDataScreeningExamples();
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">数据筛选</div>
        <div class="date">这里专门做同花顺式条件选股、数据质量检查和候选列表；股票档案看证据，量化工作台做回测验证。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="loadInvestmentDataQuality()">刷新质量</button>
        <button class="small-btn" onclick="runNaturalStockScreenFrontend(true)">刷新并筛选</button>
        <button class="small-btn" onclick="openStockProfiles()">打开股票档案</button>
        <button class="small-btn" onclick="openQuantWorkbenchWindow()">打开量化工作台</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="panel" style="margin-bottom:12px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">数据质量中心</div>
          <div class="date">先判断数据是否足够支撑筛选，再看候选排名。</div>
        </div>
      </div>
      <div id="investmentDataQuality"></div>
    </section>
    <section class="panel natural-screen-panel" style="margin-bottom:12px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">同花顺式自然语言选股</div>
          <div class="date">输入 MACD、KDJ、RSI、BOLL、量比、5/10/20/60日线、换手率、竞价金额等条件。</div>
        </div>
        <div class="table-actions">
          <label class="date">技术扫描上限 <select id="naturalScreenLimit" class="small-select"><option value="120">120</option><option value="240" selected>240</option><option value="500">500</option></select> 只</label>
          <button class="small-btn primary" onclick="runNaturalStockScreenFrontend()">智能解析并选股</button>
        </div>
      </div>
      <textarea id="naturalStockQuery" class="strategy-textarea natural-query-textarea" oninput="saveNaturalStockQuery(this.value)" placeholder="例如：昨日换手率大于5%，今日量比大于1.7，竞价金额大于180万，排除ST">${escapeHtml(naturalQuery)}</textarea>
      <div class="strategy-rule-toolbar">${examples.map(text => `<button class="small-btn" onclick='applyNaturalScreenExample(${JSON.stringify(text)})'>${escapeHtml(text)}</button>`).join("")}</div>
      <div id="naturalScreenResult">${naturalScreenResultHtml(naturalResult)}</div>
    </section>
    <section class="panel" style="margin-bottom:12px">${xiaokeStrategyRulesPanelHtml(rules)}</section>
    <section class="panel" style="margin-top:12px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">筛选结果</div>
          <div class="date">候选股可以继续进入股票档案补证据，或者送到量化工作台做验证。</div>
        </div>
        <button class="small-btn" onclick="exportNaturalScreenCsv()">导出自然语言结果</button>
      </div>
      <div id="strategyScreenResult">${strategyScreenResultHtml(result)}</div>
    </section>
  `;
  setTimeout(() => loadInvestmentDataQuality(), 0);
}

renderStrategy = function xiaokeManualStrategyPage() {
  state.view = "strategy";
  restoredRenderShell();
  const data = readStrategy();
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = `
    <section class="review-head panel">
      <div>
        <div class="panel-title">我的策略</div>
        <div class="date">长期可编辑的交易策略手册：记录你的主线判断、仓位规则、风险边界和禁做事项。</div>
      </div>
      <div class="review-actions">
        <button class="small-btn" onclick="saveCurrentStrategyVersion()">保存策略版本</button>
        <button class="small-btn" onclick="localStorage.removeItem(STRATEGY_KEY);renderStrategy()">恢复默认</button>
        <button class="small-btn" onclick="openDataScreening()">打开数据筛选</button>
        <button class="small-btn" onclick="renderDashboard()">返回看板</button>
      </div>
    </section>
    <section class="strategy-grid">
      <div class="panel strategy-main">
        <div class="panel-title">策略正文</div>
        <textarea class="strategy-textarea main" oninput="saveStrategyField('main', this.value)">${escapeHtml(data.main || "")}</textarea>
      </div>
      <div class="strategy-side">
        ${strategyBox("entry", "入场条件", data.entry)}
        ${strategyBox("risk", "风险规则", data.risk)}
        ${strategyBox("position", "仓位规则", data.position)}
        ${strategyBox("forbid", "禁做清单", data.forbid)}
      </div>
    </section>
    <section class="panel" style="margin-top:12px">
      <div class="metadata-head">
        <div>
          <div class="panel-title">策略版本与审计</div>
          <div class="date">保存策略正文、规则和当时的筛选结果，方便以后复盘当时为什么这么判断。</div>
        </div>
        <button class="small-btn" onclick="saveCurrentStrategyVersion()">+保存当前版本</button>
      </div>
      ${strategyVersionsHtml()}
    </section>
  `;
};

const xiaokeDataScreeningPreviousRenderTopChips = renderTopChips;
renderTopChips = function xiaokeDataScreeningTopChips() {
  const chips = document.getElementById("topChips");
  if (!chips) return;
  const systemChips = [
    ["我的策略", "strategy"],
    ["数据筛选", "dataScreening"],
    ["每日复盘", "dailyReview"],
    ["每日打卡", "dailyCheckin"],
    ["板块强弱", "sectorStrength"],
    ["模型框架", "modelFramework"],
    ["股票档案", "stockProfiles"],
    ["能力中心", "pipelineCenter"],
    ["管理分组", "videoGroupManager"]
  ].map(([label, view]) => `<a class="${state.view === view ? "chip active review-chip" : "chip review-chip"}" style="display:inline-flex;align-items:center;text-decoration:none" href="?view=${view}">${label}</a>`).join("");
  const seenTags = new Set();
  const uniqueTags = allVideoTags().filter(tag => {
    const key = String(tag.name || tag.originalName || "").trim().toLowerCase();
    if (!key || seenTags.has(key)) return false;
    seenTags.add(key);
    return true;
  });
  const tagChips = uniqueTags.map(tag => {
    const name = tag.name || tag.originalName || "";
    const label = finalTagLabel(tag);
    const count = tagCount(tag);
    const cls = name === state.activeTag ? "chip active" : tag.type === "sector" && count > 15 ? "chip gold" : "chip";
    return `<a class="${cls}" title="${escapeHtml(label)}（${count}条）" style="display:inline-flex;align-items:center;text-decoration:none" href="?tag=${encodeURIComponent(name)}">${escapeHtml(label)}(${count})</a>`;
  }).join("");
  chips.innerHTML = systemChips + tagChips;
};

const xiaokeDataScreeningPreviousRender = render;
render = function xiaokeDataScreeningRender() {
  if (typeof xiaokeDailyCheckinStylePatch === "function") xiaokeDailyCheckinStylePatch();
  if (state.view === "dataScreening") return renderDataScreening();
  return xiaokeDataScreeningPreviousRender();
};

const xiaokeDataScreeningPreviousRestoredRouteTopChip = typeof restoredRouteTopChip === "function" ? restoredRouteTopChip : null;
restoredRouteTopChip = function xiaokeDataScreeningRouteTopChip(label) {
  const text = String(label || "").replace(/\(\d+\)\s*$/, "").trim();
  if (text === "数据筛选") return openDataScreening();
  return xiaokeDataScreeningPreviousRestoredRouteTopChip ? xiaokeDataScreeningPreviousRestoredRouteTopChip(label) : filterByTag(text || "全部");
};

const xiaokeDataScreeningPreviousRestoredRouteHash = typeof restoredRouteHash === "function" ? restoredRouteHash : null;
restoredRouteHash = function xiaokeDataScreeningRouteHash() {
  const hash = String(location.hash || "").replace(/^#/, "");
  if (hash === "view=dataScreening") {
    openDataScreening();
    return true;
  }
  return xiaokeDataScreeningPreviousRestoredRouteHash ? xiaokeDataScreeningPreviousRestoredRouteHash() : false;
};

const xiaokeDataScreeningPreviousInit = init;
init = async function xiaokeDataScreeningInit() {
  await xiaokeDataScreeningPreviousInit();
  const params = new URLSearchParams(location.search || "");
  if (params.get("view") === "dataScreening") openDataScreening();
};

Object.assign(globalThis, {
  openDataScreening,
  renderDataScreening
});

init();


































