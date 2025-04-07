// countdown.js

// 启动 Deno 服务器
Deno.serve(async (req) => {
  const url = new URL(req.url);

  // 解析查询参数
  const targetDateStr = url.searchParams.get("date") || "2016-01-01";
  const title = url.searchParams.get("title") || "目标";
  const now = new Date();

  // 设置时区为中国上海（+8），默认 Date 是 UTC，所以要加偏移
  const targetDate = new Date(targetDateStr + "T00:00:00+08:00");

  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const isFuture = diffDays >= 0;

  const days = Math.abs(diffDays);
  const titlea = isFuture ? `距离${title}还有` : `距离${title}已过`;
  const color = isFuture ? "#2196F3" : "#fe6b00";

  // 构造 SVG
  const svg = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-lg">
  <rect x="10" y="10" width="380" height="280" rx="15" fill="white"></rect>
  <rect x="10" y="10" width="380" height="60" rx="15" fill="${color}"></rect>
  <rect x="10" y="50" width="380" height="20" fill="${color}"></rect>
  <text x="200" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${titlea}</text>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#333333" text-anchor="middle" dominant-baseline="middle">${days}</text>
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="18" fill="#999999" text-anchor="middle" dominant-baseline="middle">目标日:${targetDateStr}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
});
