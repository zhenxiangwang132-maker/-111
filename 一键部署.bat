@echo off
chcp 65001 >nul
title ====== 抖音代理 Worker 部署 ======

echo.
echo =============================================
echo   抖音代理 Cloudflare Worker 一键部署
echo =============================================
echo.
echo   1. 打开浏览器：https://dash.cloudflare.com/profile/api-tokens
echo   2. 点「创建令牌」→ 选「编辑 Cloudflare Workers」模板
echo   3. 拉到最底下 → 点「创建令牌」
echo   4. 会显示一串 cfut_ 开头的 Token（只显示一次！）
echo   5. 复制后回到这里，粘贴，回车
echo.
set /p TOKEN="粘贴你的 CF Token 然后回车: "

echo.
echo 正在部署...

powershell -ExecutionPolicy Bypass -Command ^
"$token='%TOKEN%';" ^
"$accountId='86da45da49c4d2366c71988db91266d5';" ^
"$worker='wzx';" ^
"$js=[System.IO.File]::ReadAllText('C:\WatchlistApp\mm_app\cf-worker.js');" ^
"$boundary=[System.Guid]::NewGuid().ToString();" ^
"$body=\"--$boundary`r`nContent-Disposition: form-data; name=`\"main_module`\"; filename=`\"worker.js`\"`r`nContent-Type: application/javascript+module`r`n`r`n$js`r`n--$boundary--`r`n\";" ^
"$bytes=[Text.Encoding]::UTF8.GetBytes($body);" ^
"try{" ^
"  $r=Invoke-RestMethod -Uri \"https://api.cloudflare.com/client/v4/accounts/$accountId/workers/scripts/$worker\" -Method Put -Body $bytes -ContentType \"multipart/form-data; boundary=$boundary\" -Headers @{'Authorization'=\"Bearer $token\"};" ^
"  if($r.success){Write-Host '';Write-Host '✅ 部署成功！' -ForegroundColor Green;Write-Host '地址：https://wzx.zhenxiangwang132.workers.dev' -ForegroundColor Cyan}" ^
"  else{Write-Host '❌ 失败：'-NoNewline;Write-Host $r.errors[0].message -ForegroundColor Red}" ^
"}catch{" ^
"  $err=$_.Exception.Response;" ^
"  if($err){$reader=New-Object IO.StreamReader($err.GetResponseStream());Write-Host '❌ 错误：'$reader.ReadToEnd() -ForegroundColor Red}" ^
"  else{Write-Host '❌ 错误：'$_.Exception.Message -ForegroundColor Red}" ^
"}"

echo.
pause
