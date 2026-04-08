# run.ps1 for ResQLink-Web
# Usage:
#   .\run.ps1              # npm run dev
#   .\run.ps1 -Mode dev    # explicit dev
#   .\run.ps1 -Mode release # build production bundle
#   .\run.ps1 -Mode preview # npm run preview

param(
    [ValidateSet("dev","release","prod","build","preview")]
    [string]$Mode = "dev",
    [string[]]$NpmArgs
)

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptRoot

if (-not (Test-Path ".env")) {
    Write-Error "Missing .env. Copy .env.example and fill in your credentials."
    exit 1
}

switch ($Mode) {
    "dev" {
        npm run dev @NpmArgs
        exit $LASTEXITCODE
    }
    "preview" {
        npm run preview @NpmArgs
        exit $LASTEXITCODE
    }
    { $_ -in "release","prod","build" } {
        Write-Host "🚀 npm run build" -ForegroundColor Yellow
        npm run build
        Write-Host "🏁 Web production build complete." -ForegroundColor Green
        exit $LASTEXITCODE
    }
    default {
        Write-Host "➡️  npm run $Mode $($NpmArgs -join ' ')" -ForegroundColor Yellow
        npm run $Mode @NpmArgs
        exit $LASTEXITCODE
    }
}
