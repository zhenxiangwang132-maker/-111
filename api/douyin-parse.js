// Vercel Serverless: 抖音视频解析代理
// 接收抖音分享链接，返回无水印视频直链
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url parameter' });

  const apis = [
    // API 1: tenapi.cn
    async () => {
      const r = await fetch(`https://tenapi.cn/v2/videodown?url=${encodeURIComponent(url)}`);
      const d = await r.json();
      if (d.code === 200 && d.data && d.data.url) {
        return { videoUrl: d.data.url, title: d.data.title || '', cover: d.data.cover || '' };
      }
      throw new Error('tenapi');
    },
    // API 2: pearktrue
    async () => {
      const r = await fetch(`https://api.pearktrue.cn/api/video/douyin/?url=${encodeURIComponent(url)}`);
      const d = await r.json();
      if (d.code === 200 && d.data && d.data.video_url) {
        return { videoUrl: d.data.video_url, title: d.data.title || '', cover: d.data.cover || '' };
      }
      throw new Error('pearktrue');
    },
    // API 3: douyin.wtf
    async () => {
      const r = await fetch(`https://api.douyin.wtf/api?url=${encodeURIComponent(url)}`);
      const d = await r.json();
      if (d.video_data && d.video_data.nwm_video_url) {
        return { videoUrl: d.video_data.nwm_video_url, title: d.desc || '', cover: d.video_data.cover || '' };
      }
      throw new Error('douyinwtf');
    }
  ];

  for (const fn of apis) {
    try {
      const result = await fn();
      return res.json({ success: true, ...result });
    } catch (e) { continue; }
  }

  return res.status(500).json({ error: 'All parse APIs failed' });
};
