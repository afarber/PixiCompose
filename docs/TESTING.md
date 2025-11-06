# Testing

## Running Tests

```bash
npm test                    # Jest unit tests
npm run test:browser        # Playwright browser tests (requires: npx playwright install)
npm run test:coverage       # Coverage report (20% minimum)
```

## Test Organization

Unit tests use `__tests__/` subdirectories following PixiJS pattern:
```
src/core/__tests__/vnode.test.ts
src/components/__tests__/Button.test.ts
```

Browser tests in `tests/browser/*.spec.ts` test actual rendering across Chromium, Firefox, and WebKit.

## Pre-commit Checks

Husky runs automatically on commit:
1. Copyright headers
2. ESLint (with auto-fix)
3. TypeScript type check

## CI Pipeline

GitHub Actions runs on every push/PR:
- Unit tests (24 tests)
- Browser tests (27 tests, PR only)
- Build verification

See `.github/workflows/ci.yml` for details.
