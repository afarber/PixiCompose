/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import * as PIXI from 'pixi.js';
import { compose } from '../src/core/compose';
import { h } from '../src/core/vnode';
import { Box } from '../src/components/Box';
import { Text } from '../src/components/Text';
import { Button } from '../src/components/Button';
import { Column } from '../src/components/Column';
import { Row } from '../src/components/Row';

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
            h(Text, { text: 'Button States Demo', x: 50, y: 30, style: { fontSize: 24, fill: 0xFFFFFF } }),
            h(
                Column,
                { x: 50, y: 80, spacing: 20 },
                h(Text, { text: 'Filled Variant:', style: { fontSize: 18, fill: 0xFFFFFF } }),
                h(Button, {
                    text: 'Normal State',
                    x: 100,
                    onClick: () => console.log('Normal button clicked!')
                }),
                h(Button, {
                    text: 'Disabled State',
                    x: 100,
                    disabled: true
                }),
                h(Button, {
                    text: 'Custom Colors',
                    x: 100,
                    colors: {
                        normal: { bg: 0xFF5722, text: 0xFFFFFF },
                        hovered: { bg: 0xE64A19, text: 0xFFFFFF },
                        pressed: { bg: 0xD84315, text: 0xFFFFFF }
                    },
                    onClick: () => console.log('Custom button clicked!')
                })
            ),
            h(
                Column,
                { x: 300, y: 80, spacing: 20 },
                h(Text, { text: 'Tonal Variant:', style: { fontSize: 18, fill: 0xFFFFFF } }),
                h(Button, {
                    text: 'Normal Tonal',
                    x: 100,
                    variant: 'tonal',
                    onClick: () => console.log('Tonal button clicked!')
                }),
                h(Button, {
                    text: 'Disabled Tonal',
                    x: 100,
                    variant: 'tonal',
                    disabled: true
                }),
                h(Button, {
                    text: 'Custom Tonal',
                    x: 100,
                    variant: 'tonal',
                    colors: {
                        normal: { bg: 0xE1F5E1, text: 0x4CAF50 },
                        hovered: { bg: 0xC8E6C9, text: 0x388E3C },
                        pressed: { bg: 0xA5D6A7, text: 0x2E7D32 }
                    },
                    onClick: () => console.log('Custom tonal clicked!')
                })
            ),
            h(Text, { text: 'Different Sizes:', x: 50, y: 430, style: { fontSize: 18, fill: 0xFFFFFF } }),
            h(
                Row,
                { x: 200, y: 430, spacing: 30 },
                h(Button, {
                    text: 'Small',
                    width: 80,
                    height: 32,
                    onClick: () => console.log('Small button!')
                }),
                h(Button, {
                    text: 'Large',
                    width: 160,
                    height: 56,
                    onClick: () => console.log('Large button!')
                })
            ),
            h(Text, { text: 'Rotated Button (45°):', x: 50, y: 520, style: { fontSize: 18, fill: 0xFFFFFF } }),
            h(Button, {
                text: 'Rotated',
                x: 300,
                y: 570,
                rotation: Math.PI / 4,
                onClick: () => console.log('Rotated button clicked!')
            })
        ),
    app
);
