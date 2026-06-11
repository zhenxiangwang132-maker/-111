$ErrorActionPreference = "SilentlyContinue"

$appDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "node"
$port = 3000
$url = "http://localhost:$port/index.html?nocache=$(Get-Date -Format 'yyyyMMddHHmmss')"

function Test-PortOpen {
  param([int]$Port)
  try {
    return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
  } catch {
    return $false
  }
}

if (-not (Test-PortOpen -Port $port)) {
  Start-Process -FilePath $node -ArgumentList "local-server.js" -WorkingDirectory $appDir -WindowStyle Hidden
  Start-Sleep -Seconds 2
}

Start-Process $url
