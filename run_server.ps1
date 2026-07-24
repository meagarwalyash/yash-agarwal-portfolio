# Powershell Native HTTP Local Server
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "🚀 Local Server running at http://localhost:$port/"
} catch {
    Write-Host "Server already listening or port occupied."
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $localFile = Join-Path (Get-Location) $path.TrimStart('/')
        
        if (Test-Path $localFile -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            if ($localFile.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($localFile.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($localFile.EndsWith(".jpg") -or $localFile.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($localFile.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($localFile.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {
        # Continue loop on client disconnect
    }
}
