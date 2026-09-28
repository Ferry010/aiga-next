#!/usr/bin/env bash
# Regenerate the forwardable one-pager PDFs from the /one-pager pages.
# Usage: start the dev server, then: bash scripts/one-pagers.sh [base-url]
set -euo pipefail
BASE="${1:-http://localhost:3000}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for p in teamtraining masterclass; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=8000 \
    --print-to-pdf="public/downloads/aiga-$p.pdf" "$BASE/one-pager/$p" 2>/dev/null
  echo "wrote public/downloads/aiga-$p.pdf"
done
