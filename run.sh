#!/bin/bash
# run.sh for ResQLink-Web
# Usage:
#   ./run.sh            # npm run dev
#   ./run.sh dev        # same as default
#   ./run.sh release    # build production bundle
#   ./run.sh preview    # npm run preview

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

if [ ! -f ".env" ]; then
  echo "❌ Missing .env. Copy .env.example and fill in your credentials."
  exit 1
fi

MODE="${1:-dev}"
shift || true

case "$MODE" in
  dev)
    npm run dev "$@"
    ;;
  release|prod|build)
    echo "🚀 npm run build"
    npm run build
    echo "🏁 Web production build complete."
    ;;
  preview)
    npm run preview "$@"
    ;;
  *)
    npm run "$MODE" "$@"
    ;;
esac
