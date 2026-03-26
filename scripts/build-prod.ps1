$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$webRoot = Split-Path -Parent $scriptRoot
Set-Location $webRoot

if (-not (Test-Path ".env.prod")) {
    Write-Error "Missing .env.prod. Cannot continue."
    exit 1
}

function Restore-Env {
    if (Test-Path ".env.dev") {
        Copy-Item ".env.dev" ".env" -Force
        Write-Host "↩️  Restored .env.dev -> .env" -ForegroundColor Cyan
    }
}

try {
    Copy-Item ".env.prod" ".env" -Force
    Write-Host "✅ Using production config from .env.prod" -ForegroundColor Green

    Write-Host "🚀 npm run build" -ForegroundColor Yellow
    npm run build
}
finally {
    Restore-Env
}

Write-Host "🏁 Web production build complete." -ForegroundColor Green
