# PixiCompose

[![CI](https://github.com/afarber/PixiCompose/actions/workflows/ci.yml/badge.svg)](https://github.com/afarber/PixiCompose/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![PixiJS](https://img.shields.io/badge/Powered%20by-PixiJS-orange.svg)](https://pixijs.com/)

**PixiCompose** is a declarative UI framework for [PixiJS](https://pixijs.com/), inspired by SwiftUI and Jetpack Compose.  
It enables developers to define interactive 2D interfaces using composable functions and reactive state, all written in TypeScript.  
The goal is to bring modern declarative UI design principles to the PixiJS ecosystem with a focus on simplicity, readability, and expressive composition.

---

## Features

-   Declarative syntax for PixiJS components
-   Composable functional API (inspired by SwiftUI and Jetpack Compose)
-   TypeScript-first design for type safety and strong typing
-   Simple to integrate with existing PixiJS projects
-   Full support for PixiJS v8
-   Planned support for reactive state and animations

---

## Installation

```bash
npm install pixicompose
```

or

```bash
yarn add pixicompose
```

You will also need PixiJS (v8 or later):

```bash
npm install pixi.js
```

To set up the project locally:

```bash
git clone https://github.com/afarber/pixicompose.git
cd pixicompose
npm install
npm run build
```

To run the examples:

```bash
npm run dev          # Opens basic.html example in your browser
npm run dev:layout   # Opens layout.html example in your browser
npm run dev:button   # Opens button.html example in your browser
```

## Quick Start Example

```javascript
import * as PIXI from 'pixi.js';
import { compose } from 'pixicompose/core/compose';
import { h } from 'pixicompose/core/vnode';
import { Box, Text, Button, Column } from 'pixicompose/components';

const app = new PIXI.Application();
await app.init({
    resizeTo: window,
    antialias: true,
    hello: true,
});
document.body.appendChild(app.canvas);

compose(
    () =>
        h(
            Box,
            {},
            h(Text, { text: 'Hello PixiCompose!', x: 100, y: 100 }),
            h(
                Column,
                { x: 100, y: 160, spacing: 10 },
                h(Button, {
                    text: 'Play',
                    onClick: () => alert('Play clicked!'),
                }),
                h(Button, {
                    text: 'Settings',
                    onClick: () => alert('Settings clicked!'),
                })
            )
        ),
    app
);
```

## Documentation

### Component Documentation

-   **Box Component** – Basic layout and grouping element
-   [Text Component](docs/TEXT.md) - Text rendering with styling options
-   [Image Component](docs/IMAGE.md) - Sprite and texture display
-   [Button Component](docs/BUTTON.md) - Interactive buttons with variants and states
-   [Column Component](docs/COLUMN.md) - Vertical layout container
-   [Row Component](docs/ROW.md) - Horizontal layout container
-   **Grid Component** – Lays out children in a grid by row and column
-   **Drawer Component** – A side panel (left, top, right, or bottom) with a translucent backdrop

### Development Guides

-   [Testing Guide](docs/TESTING.md) - How to run and write tests
-   [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute to PixiCompose
-   [Publishing Guide](docs/PUBLISHING.md) - How to publish releases (maintainers)
-   [GitHub Workflows](docs/GITHUB_WORKFLOWS.md) - CI/CD pipeline documentation

