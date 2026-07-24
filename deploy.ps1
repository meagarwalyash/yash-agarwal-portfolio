# Auto-Deploy Helper Script for Yash Agarwal (MeAgarwalYash)
Write-Host "--------------------------------------------------" -ForegroundColor Yellow
Write-Host "🚀 Auto-Syncing & Deploying Website to meagarwalyash.com..." -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor Yellow

$gitPath = "C:\Users\lenovo\AppData\Local\GitHubDesktop\app-3.6.3\resources\app\git\cmd\git.exe"

# Re-build static output
if (Test-Path "index.html") {
    Copy-Item "index.html" "dist/index.html" -Force
}

# Stage, Commit, and Push
& $gitPath add .
& $gitPath commit -m "Auto-update website content"
& $gitPath push origin main

Write-Host ""
Write-Host "✅ SUCCESS: All desktop changes have been pushed to GitHub!" -ForegroundColor Green
Write-Host "🌐 GitHub Actions is now deploying your updates live to https://meagarwalyash.com (~30 sec)" -ForegroundColor Gold
Write-Host "--------------------------------------------------" -ForegroundColor Yellow
