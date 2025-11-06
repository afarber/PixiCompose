#!/bin/bash
set -e

echo "Checking copyright headers..."

MISSING_FILES=()

# Find all .ts files, excluding node_modules, dist, and build directories
while IFS= read -r file; do
    if ! grep -q "SPDX-License-Identifier: MIT" "$file"; then
        MISSING_FILES+=("$file")
    fi
done < <(find src examples -type f -name "*.ts" 2>/dev/null)

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "Copyright headers: OK"
    exit 0
else
    echo "ERROR: The following files are missing copyright headers:"
    for file in "${MISSING_FILES[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "Required header format:"
    cat LICENSE-HEADER.txt
    echo ""
    echo "Please add the missing MIT license header!"
    exit 1
fi
