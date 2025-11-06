#!/bin/bash
set -e

COVERAGE_THRESHOLD=20

echo "Running tests with coverage..."
npm run test:coverage -- --silent

COVERAGE_FILE="coverage/coverage-summary.json"

if [ ! -f "$COVERAGE_FILE" ]; then
    echo "ERROR: Coverage file not found"
    exit 1
fi

# Extract coverage percentage (using node to parse JSON)
COVERAGE=$(node -p "
const coverage = require('./$COVERAGE_FILE');
const total = coverage.total;
Math.floor(total.lines.pct);
")

echo ""
echo "Coverage Report:"
echo "  Lines: ${COVERAGE}%"
echo "  Threshold: ${COVERAGE_THRESHOLD}%"

if [ "$COVERAGE" -lt "$COVERAGE_THRESHOLD" ]; then
    echo ""
    echo "ERROR: Coverage ${COVERAGE}% is below threshold ${COVERAGE_THRESHOLD}%"
    echo "HTML Report: file://$(pwd)/coverage/index.html"
    exit 1
else
    echo ""
    echo "Coverage check: PASSED"
    exit 0
fi
