# PixiCompose

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

## Built-in Components

PixiCompose currently includes the following foundational UI components:

-   Container – Basic layout and grouping element

-   Text – Renders text labels using Pixi’s text objects

-   Button – Simple text-based button with click handler

-   VerticalList – Stacks children vertically with spacing

-   HorizontalList – Aligns children horizontally with spacing

-   Grid – Lays out children in a grid by row and column

-   Drawer – A side panel (left, top, right, or bottom) with a translucent backdrop

## Quick Start Example

```javascript
import * as PIXI from 'pixi.js';
import { compose } from 'pixicompose/core/compose';
import { h } from 'pixicompose/core/vnode';
import { Container, Text, Button, VerticalList } from 'pixicompose/components';

const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

compose(
    () =>
        h(
            Container,
            {},
            h(Text, { text: 'Hello PixiCompose!', x: 100, y: 100 }),
            h(
                VerticalList,
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
