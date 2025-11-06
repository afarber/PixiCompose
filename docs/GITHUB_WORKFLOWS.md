# GitHub Workflows

## Workflow Structure

Modular design with reusable workflows in `.github/workflows/`:

### Reusable Workflows
- `_copyright.yml` - Check MIT license headers
- `_lint.yml` - ESLint check
- `_typecheck.yml` - TypeScript type check
- `_test.yml` - Jest unit tests
- `_test-browser.yml` - Playwright tests (Chromium, Firefox, WebKit)
- `_build.yml` - Compile TypeScript

### Orchestration Workflows
- `ci.yml` - Runs on push/PR to main
- `daily.yml` - Daily browser tests at 09:45 UTC
- `release.yml` - Triggered by version tags (v1.2.3)

## CI Pipeline

```
copyright + lint (parallel)
    ↓
typecheck + test (parallel)
    ↓
build
    ↓
test-browser (PR only)
```

## Release Workflow

When you push a tag like `v1.0.0`:
1. Validates tag format
2. Runs all quality checks
3. Builds project
4. Publishes to NPM (requires `NPM_TOKEN` secret)
5. Creates GitHub release with auto-generated changelog from git commits

## Permissions

- Most workflows: `contents: read`
- Release workflow: `contents: write` (for creating GitHub releases)
