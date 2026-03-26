# run.ps1 for ResQLink-Web
# Usage:
#   .\run.ps1              # npm run dev with .env.dev
#   .\run.ps1 -Mode dev    # explicit dev
#   .\run.ps1 -Mode release # build production bundle
#   .\run.ps1 -Mode preview # npm run preview using prod env

param(
    [ValidateSet("dev","release","prod","build","preview")]
    [string]$Mode = "dev",
    [string[]]$NpmArgs
)

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptRoot

function Apply-Env([string]$Path) {
    if (-not (Test-Path $Path)) {
        Write-Error "Missing $Path. Cannot continue."
        exit 1
    }
    Copy-Item $Path ".env" -Force
}

$invokeBuild = $false

switch ($Mode) {
    "dev" {
        Apply-Env ".env.dev"
        npm run dev @NpmArgs
        exit $LASTEXITCODE
    }
    "preview" {
        Apply-Env ".env.prod"
        npm run preview @NpmArgs
        exit $LASTEXITCODE
    }
    "release" { $invokeBuild = $true }
    "prod"    { $invokeBuild = $true }
    "build"   { $invokeBuild = $true }
    default {
        Write-Host "➡️  npm run $Mode $($NpmArgs -join ' ')" -ForegroundColor Yellow
        npm run $Mode @NpmArgs
        exit $LASTEXITCODE
    }
}

if ($invokeBuild) {
    $buildScript = Join-Path $scriptRoot "scripts\build-prod.ps1"
    & $buildScript
    exit $LASTEXITCODE
}
