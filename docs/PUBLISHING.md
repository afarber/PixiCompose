# Publishing to NPM

## Prerequisites

1. Add `NPM_TOKEN` to GitHub repository secrets:
   - Generate token at npmjs.com → Account Settings → Access Tokens → Automation
   - Add to GitHub: Settings → Secrets and variables → Actions

## Release Process

```bash
# 1. Ensure main branch is clean and tests pass
git checkout main
git pull
npm test
npm run test:browser

# 2. Update version and create tag
npm version patch   # or minor/major
git push origin main
git push origin v1.0.0

# 3. GitHub Actions automatically:
#    - Runs all quality checks
#    - Publishes to NPM
#    - Creates GitHub release with auto-generated changelog from commits
```

## What Gets Published

Only these files (defined in `package.json` `files` array):
- `dist/` - Compiled JavaScript and TypeScript declarations
- `LICENSE`
- `README.md`

Test with: `npm pack` to see package contents.

## Tag Format

Must be: `v1.2.3` (semantic versioning with v prefix)

## Troubleshooting

- **Tag format error**: Use exact format `v1.2.3`
- **NPM 401 error**: Regenerate NPM_TOKEN
- **Tests fail**: Fix locally, delete tag, create new one:
  ```bash
  git tag -d v1.0.0
  git push origin :refs/tags/v1.0.0
  ```
