import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const targetDateParam = params.get("date") ?? "2016-05-01";
    const title = params.get("title") ?? "目标";

    // 获取当前Asia/Shanghai的日期并转换为当天的0点
    const now = new Date();
    const shanghaiDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Shanghai" });
    const shanghaiCurrentDate = new Date(`${shanghaiDateStr}T00:00:00+08:00`);

    // 解析目标日期，确保为Asia/Shanghai时区的0点
    const targetDate = new Date(`${targetDateParam}T00:00:00+08:00`);
    if (isNaN(targetDate.getTime())) {
      throw new Error("无效的日期参数");
    }

    // 计算天数差异
    const diffTime = targetDate.getTime() - shanghaiCurrentDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let days, color, titlea;
    if (diffDays > 0) {
      titlea = `距离${title}还有`;
      color = "#2196F3";
      days = diffDays;
    } else {
      titlea = `距离${title}已过`;
      color = "#fe6b00";
      days = -diffDays;
    }

    const svg = `
<!-- 

    Daysmatter-image-api
    
    Made with Love by Wmz1024 [wang@mingze.de]

    Open Source on https://github.com/wmz1024/daysmatter-image-api

-->
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-lg">
  <rect x="10" y="10" width="380" height="280" rx="15" fill="white"></rect>
  <rect x="10" y="10" width="380" height="60" rx="15" fill="${color}"></rect>
  <rect x="10" y="50" width="380" height="20" fill="${color}"></rect>
  <text x="200" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${titlea}</text>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#333333" text-anchor="middle" dominant-baseline="middle">${days}</text>
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="18" fill="#999999" text-anchor="middle" dominant-baseline="middle">目标日:${targetDateParam}</text>
</svg>`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
});
