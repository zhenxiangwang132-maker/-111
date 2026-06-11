@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo   抖音 cookies.txt 本机导出助手
echo ========================================
echo.
echo  1. 稍后会打开一个新的 Edge 抖音窗口
echo  2. 请你在窗口里手动登录抖音
echo  3. 确认能正常播放视频后，回到这个黑窗口按回车
echo  4. 程序会保存 cookies 到：
echo     %~dp0cookies.txt
echo.
echo  注意：cookies.txt 等同临时登录凭证，请不要发给别人。
echo.
pause
node "%~dp0export-douyin-cookies.js"
echo.
pause
