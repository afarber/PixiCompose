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

To run linting and type checking:

```bash
npm run lint         # Check code style
npm run lint:fix     # Auto-fix code style issues
npm run typecheck    # Run TypeScript type checking
```

## Built-in Components

PixiCompose currently includes the following foundational UI components:

-   Box – Basic layout and grouping element

-   Text – Renders text labels using Pixi's text objects

-   Button – Interactive button with variants (filled, tonal), state management (normal, hovered, pressed, disabled), and customizable colors

-   Column – Stacks children vertically with spacing

-   Row – Aligns children horizontally with spacing

-   Grid – Lays out children in a grid by row and column

-   Drawer – A side panel (left, top, right, or bottom) with a translucent backdrop

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
    hello: true
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

## Button API

The Button component supports multiple variants, interactive states, and customizable styling.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `'Button'` | Button label text |
| `onClick` | `() => void` | `undefined` | Click handler function |
| `variant` | `'filled' \| 'tonal'` | `'filled'` | Button style variant |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `colors` | `StateColors` | See below | State-specific colors |
| `width` | `number` | `120` | Button width in pixels |
| `height` | `number` | `40` | Button height in pixels |
| `x` | `number` | `0` | X position |
| `y` | `number` | `0` | Y position |

### Variants

- **Filled**: Bold solid background (high emphasis) - default blue with white text
- **Tonal**: Lighter tinted background (medium emphasis) - light blue with dark blue text

### States

Buttons automatically respond to user interaction:
- **Normal**: Default state
- **Hovered**: Mouse over the button
- **Pressed**: Mouse button down
- **Disabled**: Non-interactive state

### Custom Colors

Use the `colors` prop to customize button appearance for each state:

```javascript
h(Button, {
    text: 'Custom Button',
    colors: {
        normal: { bg: 0xFF5722, text: 0xFFFFFF },
        hovered: { bg: 0xE64A19, text: 0xFFFFFF },
        pressed: { bg: 0xD84315, text: 0xFFFFFF },
        disabled: { bg: 0xCCCCCC, text: 0x999999 }
    },
    onClick: () => console.log('Clicked!')
})
```

### Examples

```javascript
h(Button, {
    text: 'Click Me',
    onClick: () => alert('Hello!')
})

h(Button, {
    text: 'Tonal Button',
    variant: 'tonal',
    onClick: () => console.log('Tonal clicked')
})

h(Button, {
    text: 'Disabled',
    disabled: true
})

h(Button, {
    text: 'Large Button',
    width: 200,
    height: 60
})
```
