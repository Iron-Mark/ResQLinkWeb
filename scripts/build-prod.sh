#!/bin/bash
# build-prod.sh — builds Vite site with production env, then restores dev config.

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
WEB_ROOT="$( cd "$SCRIPT_DIR/.." &> /dev/null && pwd )"
cd "$WEB_ROOT"

if [ ! -f ".env.prod" ]; then
  echo "❌ Missing .env.prod. Cannot continue."
  exit 1
fi

restore_env() {
  if [ -f ".env.dev" ]; then
    cp .env.dev .env
    echo "↩️  Restored .env.dev → .env"
  fi
}
trap restore_env EXIT

cp .env.prod .env
echo "✅ Using production config from .env.prod"

echo "🚀 npm run build"
npm run build

echo "🏁 Web production build complete."
