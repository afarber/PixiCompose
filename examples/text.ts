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
import { Column } from '../src/components/Column';

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
            h(Text, { text: 'Text Variants Demo', x: 50, y: 30, variant: 'title' }),
            h(
                Column,
                { x: 50, y: 100, spacing: 40 },
                h(Text, { text: 'Body Variant (default)', variant: 'body' }),
                h(Text, { text: 'Heading Variant', variant: 'heading' }),
                h(Text, { text: 'Title Variant', variant: 'title' }),
                h(Text, { text: 'Caption Variant', variant: 'caption' }),
                h(Text, {
                    text: 'Custom Styled Text',
                    style: {
                        fontSize: 20,
                        fill: 0xFF5722,
                        fontWeight: 'bold',
                        fontStyle: 'italic'
                    }
                }),
                h(Text, {
                    text: 'Text with Stroke',
                    style: {
                        fontSize: 24,
                        fill: 0xFFFFFF,
                        stroke: 0x000000,
                        strokeThickness: 4
                    }
                }),
                h(Text, {
                    text: 'This is a long text that demonstrates word wrapping functionality when the text exceeds a certain width limit.',
                    style: {
                        fontSize: 16,
                        fill: 0xFFFFFF,
                        wordWrap: true,
                        wordWrapWidth: 400
                    }
                })
            ),
            h(Text, {
                text: 'Rotated Text (45°)',
                x: 600,
                y: 300,
                rotation: Math.PI / 4,
                style: { fontSize: 20, fill: 0x4CAF50 }
            }),
            h(
                Column,
                { x: 600, y: 100, spacing: 30 },
                h(Text, {
                    text: 'Left Aligned',
                    style: { fontSize: 18, fill: 0xFFFFFF, align: 'left' }
                }),
                h(Text, {
                    text: 'Center Aligned',
                    style: { fontSize: 18, fill: 0xFFFFFF, align: 'center' }
                }),
                h(Text, {
                    text: 'Right Aligned',
                    style: { fontSize: 18, fill: 0xFFFFFF, align: 'right' }
                }),
                h(Text, {
                    text: 'Letter Spacing',
                    style: { fontSize: 18, fill: 0xFFFFFF, letterSpacing: 5 }
                }),
                h(Text, {
                    text: 'Different Font',
                    style: { fontSize: 18, fill: 0xFFFFFF, fontFamily: 'Arial, sans-serif' }
                })
            )
        ),
    app
);
