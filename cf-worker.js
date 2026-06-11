/**
 * Cloudflare Workers — 抖音视频代理 v3
 * 原生解析：直接调用抖音官方接口获取无水印视频，不依赖第三方API
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const shareUrl = url.searchParams.get('url');

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': '*', 'Access-Control-Max-Age': '86400' }});
    }

    if (!shareUrl) {
      return new Response('Missing ?url=', { status: 400, headers: { 'Access-Control-Allow-Origin': '*' }});
    }

    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';

    // Step 1: 跟随短链重定向，获取真实URL
    let realUrl = shareUrl;
    try {
      const r1 = await fetch(shareUrl, { redirect: 'manual', headers: { 'User-Agent': ua }});
      const loc = r1.headers.get('Location');
      if (loc) {
        realUrl = new URL(loc, shareUrl).href;
      }
    } catch(e) {}

    // Step 2: 从真实URL提取video_id
    let videoId = null;
    const idPatterns = [/\/video\/(\d+)/i, /\/note\/(\d+)/i, /modal_id=(\d+)/i, /video_id=(\d+)/i, /item_id=(\d+)/i];
    for (const p of idPatterns) {
      const m = realUrl.match(p);
      if (m) { videoId = m[1]; break; }
    }

    if (!videoId) {
      // 如果还是提取不到，尝试从短链响应体的script中提取
      try {
        const r2 = await fetch(shareUrl, { redirect: 'follow', headers: { 'User-Agent': ua }});
        const html = await r2.text();
        const m2 = html.match(/video[_-]?id[=:]?\s*["']?(\d+)/i) || html.match(/item[_-]?id[=:]?\s*["']?(\d+)/i);
        if (m2) videoId = m2[1];
      } catch(e) {}
    }

    if (!videoId) {
      return new Response(JSON.stringify({ error: '无法提取视频ID', realUrl }), {
        status: 400, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }});
    }

    // Step 3: 调用抖音官方API获取视频信息
    let videoUrl = null;
    try {
      const apiUrl = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}&dytk=`;
      const apiResp = await fetch(apiUrl, {
        headers: {
          'User-Agent': ua,
          'Referer': 'https://www.douyin.com/',
          'Accept': 'application/json',
        }
      });

      if (apiResp.ok) {
        const data = await apiResp.json();
        const item = data.item_list && data.item_list[0];
        if (item && item.video) {
          // 获取无水印地址
          videoUrl = item.video.play_addr_h264
            ? item.video.play_addr_h264.url_list[0]
            : item.video.play_addr.url_list[0];

          // 替换wm为无水印标识
          if (videoUrl) {
            videoUrl = videoUrl.replace('playwm', 'play');
            videoUrl = videoUrl.replace('watermark=1', 'watermark=0');
          }
        }
      }
    } catch(e) {}

    // Step 4: 如果原生解析失败，回退到第三方API
    if (!videoUrl) {
      const fallbacks = [
        { name: 'xhus', fn: async () => {
          const r = await fetch(`http://api.xhus.cn/api/douyin?url=${encodeURIComponent(shareUrl)}`, { headers: { 'User-Agent': ua }});
          const d = await r.json();
          if (d.code === 200 && d.data && d.data.url) return d.data.url;
          throw new Error('xhus');
        }},
        { name: 'vvhan', fn: async () => {
          const r = await fetch(`https://api.vvhan.com/api/douyin/video?url=${encodeURIComponent(shareUrl)}`);
          const d = await r.json();
          if (d.success && d.video) return d.video;
          throw new Error('vvhan');
        }},
        { name: 'douyinwtf', fn: async () => {
          const r = await fetch(`https://api.douyin.wtf/api?url=${encodeURIComponent(shareUrl)}`);
          const d = await r.json();
          if (d.video_data && d.video_data.nwm_video_url) return d.video_data.nwm_video_url;
          throw new Error('douyinwtf');
        }},
      ];

      for (const fb of fallbacks) {
        try {
          videoUrl = await fb.fn();
          if (videoUrl) break;
        } catch(e) { continue; }
      }
    }

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: '所有解析方式均失败', videoId, realUrl }), {
        status: 502, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }});
    }

    // Step 5: 代理转发视频流
    try {
      const videoResp = await fetch(videoUrl, {
        headers: {
          'User-Agent': ua,
          'Referer': 'https://www.douyin.com/',
          'Accept': '*/*',
          'Accept-Encoding': 'identity',
        },
        redirect: 'follow',
      });

      if (!videoResp.ok) {
        return new Response(`Video upstream error: ${videoResp.status}`, { status: 502, headers: { 'Access-Control-Allow-Origin': '*' }});
      }

      const headers = new Headers();
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Type', videoResp.headers.get('Content-Type') || 'video/mp4');
      headers.set('Cache-Control', 'public, max-age=3600');
      headers.set('Accept-Ranges', 'bytes');
      const cl = videoResp.headers.get('Content-Length');
      if (cl) headers.set('Content-Length', cl);

      return new Response(videoResp.body, { status: 200, headers });
    } catch(e) {
      return new Response('Stream error: ' + e.message, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' }});
    }
  }
};
