(function () {
  const DEFAULT_SYMBOLS = "中际旭创, 新易盛, sh688256";

  function injectQuantStyle() {
    if (document.getElementById("quantWorkspaceStyle")) return;
    const style = document.createElement("style");
    style.id = "quantWorkspaceStyle";
    style.textContent = `
      body.quant-body{overflow:auto}
      body.quant-body .app{height:auto;min-height:100vh;grid-template-columns:0 minmax(0,1fr) 0;grid-template-rows:48px 56px minmax(0,1fr)}
      body.quant-body .left,body.quant-body .right{display:none!important}
      body.quant-body .main{grid-column:1/-1;max-width:1680px;width:100%;margin:0 auto;padding:18px 24px 96px}
      .quant-hero{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;background:linear-gradient(135deg,rgba(25,201,139,.13),rgba(60,130,246,.08) 52%,rgba(18,24,31,.9));border-color:rgba(25,201,139,.22)}
      .quant-hero h1{margin:4px 0 8px;font-size:28px;letter-spacing:0}.quant-hero p{margin:0;color:#aeb6c6;line-height:1.65;max-width:840px}
      .quant-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.quant-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;margin-top:12px}
      .quant-workflow .library-search-row{flex-wrap:wrap;overflow:visible}.quant-search{width:min(680px,100%);flex:1 1 420px}.quant-result{margin-top:12px;line-height:1.65}
      .quant-note .decision-card{min-height:112px}.quant-page-chip{border-color:rgba(25,201,139,.35);color:#a8f5d4;background:rgba(25,201,139,.12)}
      .quant-param{height:36px;width:78px;border-radius:6px;background:#252630;border:1px solid #353742;color:#dce0e8;padding:0 9px;outline:0}
      .quant-param:focus{border-color:rgba(25,201,139,.48);background:#202733}.quant-param::placeholder{color:#7f8799}
      @media(max-width:1180px){.quant-grid{grid-template-columns:1fr}.quant-hero{flex-direction:column}.quant-actions{justify-content:flex-start}}
    `;
    document.head.appendChild(style);
  }

  function seedInput() {
    try {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) return q;
      if (typeof readStockComparePool === "function") {
        const pool = readStockComparePool();
        if (pool.length) return pool.join(", ");
      }
    } catch {}
    return DEFAULT_SYMBOLS;
  }

  function qEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function renderPredictionBacktestFallback(data = {}) {
    const items = data.items || [];
    if (!items.length) return `<div class="date">没有预测回测结果。</div>`;
    const rows = items.map(item => {
      if (item.error) {
        return `<tr><td><b>${qEscape(item.name || item.key)}</b><div class="date">${qEscape(item.key || "")}</div></td><td colspan="8" style="color:#fca5a5">${qEscape(item.error)}</td></tr>`;
      }
      const latest = item.latestPrediction || {};
      const tone = Number(item.hitRate || 0) >= 58 ? "good" : Number(item.hitRate || 0) >= 52 ? "warn" : "danger";
      return `
        <tr>
          <td><b>${qEscape(item.name || item.key)}</b><div class="date">${qEscape(item.key || "")}</div></td>
          <td><span class="decision-chip ${tone}">${qEscape(item.hitRate ?? 0)}%</span><div class="date">${qEscape(item.predictedCount || 0)} 次方向预测</div></td>
          <td>${qEscape(item.upHitRate ?? 0)}%</td>
          <td>${qEscape(item.downHitRate ?? 0)}%</td>
          <td>${qEscape(item.falsePositiveRate ?? 0)}%</td>
          <td>${qEscape(item.avgPredictedUpReturn ?? 0)}%</td>
          <td><b>${qEscape(latest.directionText || "震荡/无明确优势")}</b><div class="date">置信 ${qEscape(latest.confidence ?? "-")} / ${qEscape(latest.date || "-")}</div></td>
          <td>${qEscape(item.horizon || "-")} 日 / ±${qEscape(item.threshold || "-")}%</td>
          <td>${qEscape(item.conclusion || "-")}</td>
        </tr>
      `;
    }).join("");
    const best = items.filter(item => !item.error).sort((a, b) => Number(b.hitRate || 0) - Number(a.hitRate || 0))[0];
    return `
      <div class="panel" style="margin:0 0 10px;background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.22)">
        <div class="panel-title" style="margin-bottom:6px">预测回测结论</div>
        <div style="line-height:1.75">${best ? `历史方向命中率相对较高：<b style="color:#bfdbfe">${qEscape(best.name || best.key)}</b>，命中率 ${qEscape(best.hitRate)}%。` : "暂无可排序结果。"}这里验证的是“信号有没有预测优势”，不是验证一套买卖交易能赚多少钱。</div>
      </div>
      <div style="overflow:auto">
        <table class="review-table">
          <thead><tr><th>标的</th><th>方向命中率</th><th>看涨命中</th><th>看弱命中</th><th>看涨误报</th><th>看涨后均值</th><th>最新预测</th><th>窗口</th><th>判断</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="date" style="margin-top:8px">数据来源：${qEscape(data.source || "历史日线")}。${qEscape(data.note || "")}</div>
    `;
  }

  async function runPredictionBacktestFallback() {
    const input = document.getElementById("backtestInput");
    const result = document.getElementById("predictionBacktestResult");
    const raw = input ? input.value.trim() : "";
    if (!raw) {
      if (typeof showToast === "function") showToast("先输入股票");
      return;
    }
    const days = document.getElementById("backtestDays")?.value || "260";
    const horizon = document.getElementById("predictionHorizon")?.value || "10";
    const threshold = document.getElementById("predictionThreshold")?.value || "";
    if (result) result.innerHTML = "正在做预测回测：逐日只使用当时以前的数据验证未来方向...";
    try {
      const params = { keys: raw, days, horizon };
      if (threshold) params.threshold = threshold;
      const response = await fetch("/api/prediction-backtest?" + new URLSearchParams(params).toString());
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.error || "预测回测失败");
      window.__xiaokeLastPredictionBacktest = data;
      if (result) result.innerHTML = renderPredictionBacktestFallback(data);
    } catch (error) {
      if (result) result.innerHTML = `<span style="color:#fca5a5">${qEscape(error.message || "预测回测失败")}</span>`;
      if (typeof showToast === "function") showToast(error.message || "预测回测失败");
    }
  }

  window.runPredictionBacktestFromInput = window.runPredictionBacktestFromInput || runPredictionBacktestFallback;

  function renderQuantPage() {
    injectQuantStyle();
    document.body.classList.add("quant-body");
    try { if (typeof state !== "undefined") state.view = "quantWorkspace"; } catch {}
    const main = document.getElementById("main");
    if (!main || typeof stockComparePresetButtonsHtml !== "function") {
      setTimeout(renderQuantPage, 300);
      return;
    }
    const top = document.getElementById("topChips");
    if (top) {
      top.innerHTML = [
        `<button class="chip quant-page-chip" onclick="renderQuantPage()">量化工作台</button>`,
        `<button class="chip" onclick="window.location.href='index.html?nocache=' + Date.now()">返回主看板</button>`,
        `<button class="chip" onclick="showDataSourceHealth()">数据源状态</button>`,
        `<button class="chip" onclick="syncQmtBridgeCodes()">同步 QMT</button>`
      ].join("");
    }
    const brand = document.querySelector(".brand span");
    if (brand) brand.textContent = "小可课堂 · 量化工作台";
    const back = document.querySelector(".brand .back");
    if (back) back.onclick = () => { window.location.href = "index.html?nocache=" + Date.now(); };
    const seed = escapeHtml(seedInput());
    main.innerHTML = `
      <section class="panel quant-hero">
        <div>
          <div class="date">小可课堂 · QMT / 证据链 / 回测</div>
          <h1>量化工作台</h1>
          <p>把多股对比、轻量回测、轮动评分、风控仓位和参数矩阵集中到一个独立窗口。主看板保持清爽，这里专心跑验证。</p>
        </div>
        <div class="quant-actions">
          <button class="small-btn" onclick="window.location.href='index.html?nocache=' + Date.now()">返回主看板</button>
          <button class="small-btn" onclick="showDataSourceHealth()">刷新数据源</button>
          <button class="small-btn" onclick="syncQmtBridgeCodes()">同步 QMT</button>
          <button class="open-btn" style="width:auto;padding:0 16px" onclick="runQuantReportFromInput()">一键量化报告</button>
        </div>
      </section>
      <section class="panel" id="institutionalProbePanel" style="display:block;margin-top:12px">
        <div class="panel-title">数据源与 QMT 桥接</div>
        <div class="date">正在读取 QMT 桥接、腾讯行情、东方财富财务和公告状态...</div>
      </section>
      <section class="panel quant-workflow" style="margin-top:12px">
        <div class="metadata-head"><div><div class="panel-title">多股证据链对比</div><div class="date">先比较行情、财务、公告风险和本地素材，再决定是否进入回测。</div></div><button class="small-btn" onclick="openAgentWithQuestion('请解读这次多股对比：' + (document.getElementById('stockCompareInput')?.value || '中际旭创, 新易盛') + '，说明证据来源、风险边界和观察条件。', 'investment', true)">问 Agent</button></div>
        <div class="library-search-row" style="margin:8px 0 0"><label class="library-search quant-search"><span>⇄</span><input id="stockCompareInput" value="${seed}" placeholder="输入多个股票：中际旭创, 新易盛, sh688256"></label><button class="open-btn" style="width:auto;padding:0 16px" onclick="compareStocksFromInput()">生成对比</button><button class="open-btn" style="width:auto;padding:0 16px" onclick="compareStocksWithBacktest()">对比+回测</button><button class="small-btn" onclick="addStockCompareInputToPool()">加入对比池</button><button class="small-btn" onclick="fillStockCompareInputFromPool()">载入对比池</button></div>
        <div id="stockComparePool" class="video-group-row" style="margin-top:10px"></div>${stockComparePresetButtonsHtml()}<div id="stockCompareResult" class="date quant-result">等待输入标的。</div>
      </section>
      <section class="quant-grid">
        <section class="panel quant-workflow"><div class="metadata-head"><div><div class="panel-title">轻量回测验证</div><div class="date">验证均线交叉、突破、预测信号等观察条件，只作为复盘假设。参数可编辑，空阈值会按预测周期自动取值。</div></div><button class="small-btn" onclick="openAgentWithQuestion('请解读最近一次回测和预测回测结果：哪些标的只是回测好看，哪些观察条件更值得跟踪？必须说明数据源和局限。', 'investment', true)">问 Agent</button></div><div class="library-search-row" style="margin:8px 0 0"><label class="library-search quant-search"><span>↗</span><input id="backtestInput" value="${seed}" placeholder="输入股票：中际旭创, 新易盛, sh688256"></label><select id="backtestStrategy" class="small-btn" style="height:36px"><option value="ma_cross">均线交叉</option><option value="breakout">区间突破</option></select><input id="backtestShort" class="quant-param" type="number" value="5" min="2" max="60" title="短均线" placeholder="短均"><input id="backtestLong" class="quant-param" type="number" value="20" min="3" max="250" title="长均线" placeholder="长均"><input id="backtestLookback" class="quant-param" type="number" value="20" min="5" max="250" title="突破观察周期" placeholder="突破"><input id="backtestStopLoss" class="quant-param" type="number" value="8" min="0" max="50" step="0.5" title="止损百分比" placeholder="止损%"><select id="backtestDays" class="small-btn" style="height:36px"><option value="260">近一年</option><option value="520">近两年</option><option value="780">近三年</option></select><select id="predictionHorizon" class="small-btn" style="height:36px"><option value="3">预测 3 日</option><option value="5">预测 5 日</option><option value="10" selected>预测 10 日</option><option value="20">预测 20 日</option></select><input id="predictionThreshold" class="quant-param" type="number" min="0.5" max="15" step="0.1" title="预测命中阈值，留空自动" placeholder="阈值%"><button class="open-btn" style="width:auto;padding:0 16px" onclick="runBacktestFromInput()">运行回测</button><button class="small-btn" onclick="runPredictionBacktestFromInput()">预测回测</button><button class="small-btn" onclick="runBacktestOptimizationFromInput()">参数优化</button><button class="small-btn" onclick="runBacktestWalkforwardFromInput()">样本外验证</button><button class="small-btn" onclick="runPortfolioBacktestFromInput()">组合回测</button><button class="small-btn" onclick="fillBacktestInputFromComparePool()">载入对比池</button></div><div id="backtestResult" class="date quant-result">等待输入标的。</div><div id="predictionBacktestResult" class="date quant-result"></div><div id="backtestOptimizeResult" class="date quant-result"></div><div id="backtestWalkforwardResult" class="date quant-result"></div><div id="portfolioBacktestResult" class="date quant-result"></div></section>
        <section class="panel quant-workflow"><div class="metadata-head"><div><div class="panel-title">量化轮动与风控</div><div class="date">把候选池转成轮动评分、仓位约束、历史轮动回测和参数矩阵。</div></div><button class="small-btn" onclick="openAgentWithQuestion('请解读最近一次量化轮动、风控仓位和复盘报告，说明哪些可进入观察池，哪些只是回测好看。', 'investment', true)">问 Agent</button></div><div class="library-search-row" style="margin:8px 0 0"><label class="library-search quant-search"><span>↻</span><input id="quantInput" value="${seed}" placeholder="输入股票：中际旭创, 新易盛, sh688256"></label><select id="quantTopN" class="small-btn" style="height:36px"><option value="3">选前 3</option><option value="5" selected>选前 5</option><option value="8">选前 8</option></select><select id="quantRiskBudget" class="small-btn" style="height:36px"><option value="18">稳健回撤 18%</option><option value="25" selected>标准回撤 25%</option><option value="35">进攻回撤 35%</option></select><select id="quantRebalancePeriod" class="small-btn" style="height:36px"><option value="weekly">周度轮动</option><option value="monthly" selected>月度轮动</option><option value="quarterly">季度轮动</option></select><button class="open-btn" style="width:auto;padding:0 16px" onclick="runQuantRotationFromInput()">轮动评分</button><button class="small-btn" onclick="runQuantRiskPlanFromInput()">风控仓位</button><button class="small-btn" onclick="runQuantRotationBacktestFromInput()">历史轮动回测</button><button class="small-btn" onclick="runQuantRotationMatrixFromInput()">参数矩阵</button><button class="small-btn" onclick="runQuantReportFromInput()">量化报告</button><button class="small-btn" onclick="fillQuantInputFromComparePool()">载入对比池</button></div><div id="quantRotationResult" class="date quant-result">等待输入标的。</div><div id="quantRiskPlanResult" class="date quant-result"></div><div id="quantRotationBacktestResult" class="date quant-result"></div><div id="quantRotationMatrixResult" class="date quant-result"></div><div id="quantReportResult" class="date quant-result"></div></section>
      </section>
      <section class="panel quant-note" style="margin-top:12px"><div class="panel-title">使用顺序</div><div class="decision-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin:0"><div class="decision-card"><h3>1. 同步数据</h3><p class="date">先确认 QMT 桥接在线，必要时同步关注标的。</p></div><div class="decision-card"><h3>2. 多股对比</h3><p class="date">看证据链和公告风险，筛掉明显缺证据的标的。</p></div><div class="decision-card"><h3>3. 回测验证</h3><p class="date">运行单标的、组合、样本外和参数优化。</p></div><div class="decision-card"><h3>4. 轮动报告</h3><p class="date">最后生成量化报告，让 Agent 解释局限和观察条件。</p></div></div></section>
    `;
    if (typeof renderStockComparePool === "function") renderStockComparePool();
    if (typeof showDataSourceHealth === "function") setTimeout(() => showDataSourceHealth(), 100);
  }

  window.renderQuantPage = renderQuantPage;
  window.addEventListener("load", () => [300, 900, 1800, 3200].forEach(delay => setTimeout(renderQuantPage, delay)));
})();
