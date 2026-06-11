# 部署 CF Worker 抖音代理 — 3分钟搞定

## 方式一：直接在网页部署（推荐）

1. 打开 https://dash.cloudflare.com
2. 左侧菜单 → **Workers 和 Pages**
3. 点 **创建应用程序** → **创建 Worker**
4. 随便起个名字（如 `douyin-proxy`）
5. 点 **编辑代码**，把下面内容全部删掉，粘贴 `cf-worker.js` 的全部代码
6. 点右上角 **部署**
7. 复制你得到的 URL（类似 `https://douyin-proxy.你的用户名.workers.dev`）

## 方式二：用 Wrangler 命令行

```bash
npx wrangler deploy --name douyin-proxy cf-worker.js
```

部署成功后终端会显示 URL。

## 然后在看板配置

1. 打开 https://mmapp-two.vercel.app
2. 左侧 🎬 视频 → 点 ⚙️ 按钮
3. 粘贴 CF Worker 地址 → 保存
4. 之后所有抖音视频都走 Cloudflare 代理，**无大小限制！**
