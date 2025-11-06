#!/bin/bash
set -e

echo "Checking TypeScript compilation..."

if npm run build; then
    echo "Build: OK"
    exit 0
else
    echo "ERROR: TypeScript compilation failed"
    exit 1
fi
