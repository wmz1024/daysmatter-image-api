<?php
header('Content-Type: image/svg+xml');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// 设置时区为中国时间
date_default_timezone_set('Asia/Shanghai');

// 获取参数
$targetDate = isset($_GET['date']) ? $_GET['date'] : '2016-01-01';
$titlea = '距离目标还有';
$title = isset($_GET['title']) ? $_GET['title'] : '目标';

// 计算天数差
$now = new DateTime();
$target = new DateTime($targetDate);
$interval = $target->diff($now);
$days = $interval->invert ? $interval->days : -$interval->days;

if($days > 0){
    $titlea= '距离'.$title.'还有';
    $color = '#2196F3';

}else{
    $titlea = '距离'.$title.'已过';
    $color = '#fe6b00';
    $days = abs($days);
}

// SVG模板
$svg = <<<SVG
<!-- 

    Daysmatter-image-api
    
    Made with Love by Wmz1024 [wang@mingze.de]

    Open Source on https://github.com/wmz1024/daysmatter-image-api

-->
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-lg"><rect x="10" y="10" width="380" height="280" rx="15" fill="white"></rect>
<rect x="10" y="10" width="380" height="60" rx="15" fill="{$color}"></rect><rect x="10" y="50" width="380" height="20" fill="{$color}"></rect>
<text x="200" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">{$titlea}</text>
<text x="200" y="150" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#333333" text-anchor="middle" dominant-baseline="middle">{$days}</text>
<text x="200" y="240" font-family="Arial, sans-serif" font-size="18" fill="#999999" text-anchor="middle" dominant-baseline="middle">目标日:{$targetDate}</text></svg>
SVG;

echo $svg; 
