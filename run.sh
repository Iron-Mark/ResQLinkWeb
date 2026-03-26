#!/bin/bash
# run.sh for ResQLink-Web
# Usage:
#   ./run.sh            # npm run dev with .env.dev
#   ./run.sh dev        # same as default
#   ./run.sh release    # build production bundle (npm run build w/ .env.prod)
#   ./run.sh preview    # npm run preview using prod env

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

apply_env() {
  local source_file="$1"
  if [ ! -f "$source_file" ]; then
    echo "❌ Missing $source_file. Cannot continue."
    exit 1
  fi
  cp "$source_file" .env
}

MODE="${1:-dev}"
shift || true

case "$MODE" in
  dev)
    apply_env ".env.dev"
    npm run dev "$@"
    ;;
  release|prod|build)
    "$SCRIPT_DIR/scripts/build-prod.sh"
    ;;
  preview)
    apply_env ".env.prod"
    npm run preview "$@"
    ;;
  *)
    npm run "$MODE" "$@"
    ;;
esac
