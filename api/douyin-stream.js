// Vercel Serverless: 抖音视频代理流式播放
// 流程：分享链接 → 解析直链 → 后端下载 → 流式转发给前端
// 绕过 CORS / Referer 防盗链

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const shareUrl = req.query.url;
  if (!shareUrl) return res.status(400).send('Missing url parameter');

  // ====== Step 1: 解析抖音链接获取真实视频URL ======
  const parseApis = [
    async () => {
      const r = await fetch(`https://tenapi.cn/v2/videodown?url=${encodeURIComponent(shareUrl)}`);
      const d = await r.json();
      if (d.code === 200 && d.data && d.data.url) {
        return { videoUrl: d.data.url, title: d.data.title || '' };
      }
      throw new Error('tenapi');
    },
    async () => {
      const r = await fetch(`https://api.pearktrue.cn/api/video/douyin/?url=${encodeURIComponent(shareUrl)}`);
      const d = await r.json();
      if (d.code === 200 && d.data && d.data.video_url) {
        return { videoUrl: d.data.video_url, title: d.data.title || '' };
      }
      throw new Error('pearktrue');
    },
    async () => {
      const r = await fetch(`https://api.douyin.wtf/api?url=${encodeURIComponent(shareUrl)}`);
      const d = await r.json();
      if (d.video_data && d.video_data.nwm_video_url) {
        return { videoUrl: d.video_data.nwm_video_url, title: d.desc || '' };
      }
      throw new Error('douyinwtf');
    }
  ];

  let videoUrl = null;
  let title = '';

  for (const fn of parseApis) {
    try {
      const result = await fn();
      videoUrl = result.videoUrl;
      title = result.title;
      break;
    } catch (e) { continue; }
  }

  if (!videoUrl) {
    return res.status(502).send('All parse APIs failed for this douyin link');
  }

  // ====== Step 2: 后端下载视频（模拟移动端请求，绕过防盗链）======
  try {
    const videoResp = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
        'Referer': 'https://www.douyin.com/',
        'Accept': '*/*',
        'Accept-Encoding': 'identity',
      },
      redirect: 'follow',
    });

    if (!videoResp.ok) {
      return res.status(502).send(`Video fetch failed: ${videoResp.status}`);
    }

    const contentLength = videoResp.headers.get('content-length');
    const contentType = videoResp.headers.get('content-type') || 'video/mp4';

    // Vercel Hobby 限制约 4.5MB，预留余量
    const MAX_SIZE = 4 * 1024 * 1024;
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return res.status(413).send(`Video too large (${(parseInt(contentLength)/1024/1024).toFixed(1)}MB > 4MB limit)`);
    }

    // Set streaming response headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Accept-Ranges', 'bytes');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    // Stream the video body to the client
    const reader = videoResp.body.getReader();
    let totalBytes = 0;

    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          break;
        }
        totalBytes += value.length;
        if (totalBytes > MAX_SIZE) {
          // Too large, abort
          reader.cancel();
          if (!res.headersSent) {
            res.status(413).send('Video exceeds size limit during streaming');
          }
          break;
        }
        res.write(value);
      }
    };

    await pump();

  } catch (e) {
    if (!res.headersSent) {
      res.status(500).send('Stream proxy error: ' + e.message);
    }
  }
};
