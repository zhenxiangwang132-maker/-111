@echo off
chcp 65001 >nul
setlocal
echo.
echo 小可课堂 - 配置 CodeBuddy CLI 密钥
echo.
echo 请在下面粘贴完整的 ck_ 开头访问密钥。
echo 这个密钥只会写入当前 Windows 用户环境变量，不会出现在聊天记录里。
echo.
set /p CODEBUDDY_KEY=CodeBuddy API Key: 
if "%CODEBUDDY_KEY%"=="" (
  echo 未输入密钥，已取消。
  pause
  exit /b 1
)
setx CODEBUDDY_API_KEY "%CODEBUDDY_KEY%" >nul
setx CODEBUDDY_INTERNET_ENVIRONMENT "internal" >nul
echo.
echo 已保存 CODEBUDDY_API_KEY 和 CODEBUDDY_INTERNET_ENVIRONMENT。
echo 请完全关闭并重新打开“小可课堂”，然后在小可 Agent 里选择 CodeBuddy CLI。
echo.
pause
