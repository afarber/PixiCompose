#!/bin/bash
set -e

echo "Checking code style with ESLint..."

if npm run lint; then
    echo "Code style: OK"
    exit 0
else
    echo "ERROR: ESLint found issues"
    echo ""
    echo "To auto-fix issues, run:"
    echo "  npm run lint:fix"
    exit 1
fi
