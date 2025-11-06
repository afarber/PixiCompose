#!/bin/bash
set -e

echo "Checking TypeScript types..."

if npm run typecheck; then
    echo "Type checking: OK"
    exit 0
else
    echo "ERROR: TypeScript type errors found"
    exit 1
fi
