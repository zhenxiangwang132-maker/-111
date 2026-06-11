@echo off
chcp 65001 >nul
echo ========================================
echo   模型先生 · 本地视频模式启动器
echo ========================================
echo.
echo  1. 把 .mp4 / .mov / .webm 等视频文件
echo     放进本目录的 videos\ 文件夹里
echo.
echo  2. 本脚本会自动识别所有视频
echo     并用浏览器打开看板
echo.
echo  3. 抖音分享链接需要本机解析；
echo     如果抖音提示需要 cookies，请先在 Edge/Chrome 打开抖音确认能播放。
echo.
echo ========================================
echo.

node "%~dp0local-server.js"

if errorlevel 1 (
  echo.
  echo [错误] Node.js 未安装或无法运行。
  echo 请安装 Node.js: https://nodejs.org
  echo.
  pause
)
