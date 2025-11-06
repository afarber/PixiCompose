# Contributing

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/PixiCompose.git
cd PixiCompose
npm install
npm run build
npm test
```

## Project Structure

```
src/
├── core/               # VNode system, compose, reconciler
│   └── __tests__/     # Unit tests
└── components/         # Built-in components
    └── __tests__/     # Unit tests
examples/               # HTML demos
tests/browser/          # Playwright tests
```

## Adding a Component

1. Create `src/components/YourComponent.ts`:
```typescript
/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h, VNode } from '../core/vnode.js';

export interface YourComponentProps {
    x?: number;
    y?: number;
}

export function YourComponent(props: YourComponentProps, ...children: VNode[]): VNode {
    return h('YourComponent', props, ...children);
}
```

2. Add rendering in `src/core/reconciler.ts`:
```typescript
case 'YourComponent': {
    const container = new PIXI.Container();
    // Create PixiJS objects
    return container;
}
```

3. Export from `src/index.ts`:
```typescript
export { YourComponent } from './components/YourComponent.js';
export type { YourComponentProps } from './components/YourComponent.js';
```

4. Add unit tests in `src/components/__tests__/YourComponent.test.ts`

## Development

```bash
npm run dev              # Run basic example
npm run dev:layout       # Run layout example
npm run lint:fix         # Fix style issues
npm run typecheck        # Check types
npm test                 # Run unit tests
npm run test:browser     # Run browser tests
```

## Pre-commit Hook

Automatically runs on commit:
- Copyright header check
- ESLint (auto-fixes)
- TypeScript type check

## Pull Request

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and add tests
3. Run all checks: `npm run lint && npm run typecheck && npm test && npm run build`
4. Commit with clear message: "Add YourComponent with hover support"
5. Push and create PR

CI will run all checks automatically.

## Architecture Notes

- **Center-pivot buttons**: Buttons use center pivot (`width/2, height/2`) for rotation. Layouts compensate using `_buttonWidth`/`_buttonHeight` properties.
- **Layout algorithms**: See `layoutList()` and `layoutGrid()` in `reconciler.ts`
- **Test pattern**: Use `__tests__/` subdirectories (PixiJS pattern)
