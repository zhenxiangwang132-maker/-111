const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const PROFILE_DIR = path.join(ROOT, "douyin_edge_profile");
const OUT_FILE = path.join(ROOT, "cookies.txt");
const PORT = 9222;
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
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

async function main() {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  console.log("Opening Edge. Please log in to Douyin in the new browser window.");
  console.log("After the Douyin page is fully logged in, return here and press Enter.");

  const edge = spawn(EDGE, [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    "--no-first-run",
    "--new-window",
    "https://www.douyin.com"
  ], { detached: true, stdio: "ignore" });
  edge.unref();

  await new Promise(resolve => process.stdin.once("data", resolve));

  let version;
  for (let i = 0; i < 30; i++) {
    try {
      version = await getJson(`http://127.0.0.1:${PORT}/json/version`);
      break;
    } catch {
      await wait(500);
    }
  }
  if (!version || !version.webSocketDebuggerUrl) {
    throw new Error("Could not connect to Edge debugging port.");
  }

  const tabs = await getJson(`http://127.0.0.1:${PORT}/json`);
  const page = tabs.find(tab => (tab.url || "").includes("douyin.com")) || tabs[0];
  if (!page || !page.id) throw new Error("Could not find a Douyin tab.");

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
  const allCookies = result.result && result.result.cookies ? result.result.cookies : [];
  const douyinCookies = allCookies.filter(cookie => /douyin|bytedance|toutiao|iesdouyin/i.test(cookie.domain || ""));
  if (!douyinCookies.length) throw new Error("No Douyin cookies found. Please make sure you are logged in.");

  const content = [
    "# Netscape HTTP Cookie File",
    "# Generated locally for mm_app. Keep this file private.",
    ...douyinCookies.map(toNetscapeCookie)
  ].join("\n") + "\n";
  fs.writeFileSync(OUT_FILE, content, "utf8");
  console.log(`Saved ${douyinCookies.length} cookies to ${OUT_FILE}`);
  ws.close();
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
