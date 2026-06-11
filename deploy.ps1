$token = "cfut_v4UjhadkxzPVhjxcG2iHNbR4pEWs6AAeNmElUahWd9b43eb3"
$accountId = "86da45da49c4d2366c71988db91266d5"
$workerName = "wzx"
$scriptPath = "C:\WatchlistApp\mm_app\cf-worker.js"

$boundary = [System.Guid]::NewGuid().ToString()
$scriptContent = [System.IO.File]::ReadAllText($scriptPath)

# Build multipart form body for ES Module
$body = @"
--$boundary
Content-Disposition: form-data; name="main_module"; filename="worker.js"
Content-Type: application/javascript+module

$scriptContent
--$boundary--
"@

$bytes = [System.Text.Encoding]::UTF8.GetBytes($body)

$uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/workers/scripts/$workerName"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "multipart/form-data; boundary=$boundary"
}

try {
    $resp = Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body $bytes -ContentType "multipart/form-data; boundary=$boundary"
    Write-Output "SUCCESS: $($resp.success)"
    Write-Output "URL: https://$workerName.zhenxiangwang132.workers.dev"
} catch {
    Write-Output "FAILED: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Output "Response: $responseBody"
    }
}
