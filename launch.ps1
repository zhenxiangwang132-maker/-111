# PowerShell - 启动看板服务器（稳定版）
# 使用 Python 内置 HTTP 服务器，不会崩溃

$port = 8765
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 杀掉旧进程
Get-NetTCPConnection -LocalPort $port -EA SilentlyContinue | % {
  Stop-Process -Id $_.OwningProcess -Force -EA 0
}
Start-Sleep 0.5

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  模型先生 · 自选股看板 v1.0" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan

# 获得本机IP（用于手机访问）
$ips = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
  $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.PrefixOrigin -ne 'WellKnown'
} | Select-Object -First 2

Write-Host ""
Write-Host "  📱 手机访问地址:" -ForegroundColor Green
foreach ($ip in $ips) {
  Write-Host "    http://$($ip.IPAddress):$port/index.html" -ForegroundColor White
}
Write-Host ""
Write-Host "  💻 电脑浏览器:" -ForegroundColor Green
Write-Host "    http://localhost:$port/index.html" -ForegroundColor White
Write-Host ""
Write-Host "  按 Ctrl+C 停止服务器" -ForegroundColor DarkGray
Write-Host ""

# 启动 Python HTTP 服务器
Set-Location $dir
python -m http.server $port
