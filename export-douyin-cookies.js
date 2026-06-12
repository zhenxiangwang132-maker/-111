const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const PROFILE_DIR = path.join(ROOT, "douyin_edge_profile");
const OUT_FILE = path.join(ROOT, "cookies.txt");
const JOB_FILE = path.join(ROOT, "douyin_cookie_job.json");
const PORT = 9222;
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const AUTO = process.argv.includes("--auto");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function writeJob(patch) {
  let current = {};
  try {
    current = JSON.parse(fs.readFileSync(JOB_FILE, "utf8"));
  } catch {
    current = {};
  }
  fs.writeFileSync(JOB_FILE, JSON.stringify({ ...current, ...patch, updatedAt: Date.now() }, null, 2), "utf8");
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    req.setTimeout(5000, () => req.destroy(new Error("Request timed out")));
    req.on("error", reject);
  });
}

function toNetscapeCookie(cookie) {
  const domain = cookie.domain || "";
  const includeSubdomains = domain.startsWith(".") ? "TRUE" : "FALSE";
  const pathValue = cookie.path || "/";
  const secure = cookie.secure ? "TRUE" : "FALSE";
  const expires = cookie.expires && cookie.expires > 0 ? Math.floor(cookie.expires) : 0;
  return [domain, includeSubdomains, pathValue, secure, expires, cookie.name, cookie.value].join("\t");
}

function isLoggedInCookie(cookie) {
  return /^(sessionid|sid_guard|uid_tt|passport_csrf_token|passport_auth_status|n_mh)$/i.test(cookie.name || "");
}

async function getDebugVersion() {
  for (let i = 0; i < 40; i++) {
    try {
      return await getJson(`http://127.0.0.1:${PORT}/json/version`);
    } catch {
      await wait(500);
    }
  }
  throw new Error("Could not connect to Edge debugging port.");
}

async function readDouyinCookies() {
  const version = await getDebugVersion();
  if (!version || !version.webSocketDebuggerUrl) {
    throw new Error("Could not connect to Edge debugging websocket.");
  }
  const tabs = await getJson(`http://127.0.0.1:${PORT}/json`);
  const page = tabs.find(tab => (tab.url || "").includes("douyin.com")) || tabs[0];
  if (!page || !page.webSocketDebuggerUrl) throw new Error("Could not find a Douyin tab.");

  const WebSocket = global.WebSocket || require("ws");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let seq = 1;
  const pending = new Map();
  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function send(method, params = {}) {
    const id = seq++;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise(resolve => pending.set(id, resolve));
  }

  const result = await send("Network.getAllCookies");
  ws.close();
  const allCookies = result.result && result.result.cookies ? result.result.cookies : [];
  return allCookies.filter(cookie => /douyin|bytedance|toutiao|iesdouyin/i.test(cookie.domain || ""));
}

function saveCookies(cookies) {
  const content = [
    "# Netscape HTTP Cookie File",
    "# Generated locally for mm_app. Keep this file private.",
    ...cookies.map(toNetscapeCookie)
  ].join("\n") + "\n";
  fs.writeFileSync(OUT_FILE, content, "utf8");
}

function openEdge() {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  const edge = spawn(EDGE, [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    "--no-first-run",
    "--new-window",
    "https://www.douyin.com"
  ], { detached: true, stdio: "ignore" });
  edge.unref();
}

async function exportOnce({ requireLogin }) {
  const cookies = await readDouyinCookies();
  const loggedIn = cookies.some(isLoggedInCookie);
  if (!cookies.length) throw new Error("No Douyin cookies found.");
  if (requireLogin && !loggedIn) throw new Error("Douyin login cookies not found yet.");
  saveCookies(cookies);
  return { count: cookies.length, loggedIn };
}

async function main() {
  writeJob({ status: "running", message: "Opening dedicated Douyin login window..." });
  openEdge();

  if (!AUTO) {
    console.log("A dedicated Edge window has opened. Log in to Douyin there, then press Enter here.");
    await new Promise(resolve => process.stdin.once("data", resolve));
    const result = await exportOnce({ requireLogin: false });
    writeJob({ status: "done", message: `Saved ${result.count} cookies.`, count: result.count, loggedIn: result.loggedIn });
    console.log(`Saved ${result.count} cookies to ${OUT_FILE}`);
    return;
  }

  const deadline = Date.now() + 5 * 60 * 1000;
  let lastError = "";
  while (Date.now() < deadline) {
    try {
      const result = await exportOnce({ requireLogin: true });
      writeJob({ status: "done", message: `Saved ${result.count} Douyin cookies.`, count: result.count, loggedIn: result.loggedIn });
      console.log(`Saved ${result.count} cookies to ${OUT_FILE}`);
      return;
    } catch (error) {
      lastError = error.message || String(error);
      writeJob({ status: "running", message: "Waiting for Douyin login in the dedicated Edge window...", lastError });
      await wait(2500);
    }
  }
  writeJob({ status: "failed", message: "Timed out waiting for Douyin login.", error: lastError });
  throw new Error("Timed out waiting for Douyin login.");
}

main().catch(error => {
  writeJob({ status: "failed", message: error.message || "Cookie export failed.", error: error.message || String(error) });
  console.error(error.message);
  process.exit(1);
});
