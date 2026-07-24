$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:3000/")
$http.Start()
Write-Host "Server running at http://localhost:3000/"

while ($http.IsListening) {
    $context = $http.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = Join-Path (Get-Location) $request.Url.LocalPath
    if ((Test-Path $localPath -PathType Container) -or ($request.Url.LocalPath -eq "/")) {
        $localPath = Join-Path (Get-Location) "index.html"
    }

    if (Test-Path $localPath) {
        $bytes = [System.IO.File]::ReadAllBytes($localPath)
        if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
        elseif ($localPath.EndsWith(".js")) { $response.ContentType = "text/javascript" }
        elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
    }
    $response.OutputStream.Close()
}
