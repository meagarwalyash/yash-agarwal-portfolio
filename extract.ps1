$svg = [System.IO.File]::ReadAllText("midday logo.png.svg")
$index = $svg.IndexOf("base64,")
if ($index -gt 0) {
    $base64Start = $index + 7
    $quoteIndex = $svg.IndexOf('"', $base64Start)
    $base64Str = $svg.Substring($base64Start, $quoteIndex - $base64Start)
    $bytes = [Convert]::FromBase64String($base64Str)
    [System.IO.File]::WriteAllBytes("midday_logo_clean.png", $bytes)
    Write-Host "SUCCESS: Extracted clean Mid-Day PNG image!"
} else {
    Write-Host "Base64 not found in SVG file."
}
