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
import { Image } from '../src/components/Image';
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
            h(Text, { text: 'Image Component Demo', x: 50, y: 30, variant: 'title' }),
            h(
                Column,
                { x: 50, y: 100, spacing: 50 },
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Basic Image (Bunny)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png'
                    })
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Scale Mode: fit (200x100)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        width: 200,
                        height: 100,
                        scaleMode: 'fit'
                    })
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Scale Mode: fill (200x100)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        width: 200,
                        height: 100,
                        scaleMode: 'fill'
                    })
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Scale Mode: stretch (200x100)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        width: 200,
                        height: 100,
                        scaleMode: 'stretch'
                    })
                )
            ),
            h(
                Column,
                { x: 400, y: 100, spacing: 50 },
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Tinted Images (Texture.WHITE)', variant: 'caption' }),
                    h(
                        Row,
                        { spacing: 20 },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 50,
                            height: 50,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 50,
                            height: 50,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 50,
                            height: 50,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Rotated Bunny (45 degrees)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        rotation: Math.PI / 4,
                        width: 100,
                        height: 100,
                        scaleMode: 'fit'
                    })
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Interactive (click me!)', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        onClick: () => console.log('Image clicked!'),
                        cursor: 'pointer'
                    })
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Alpha: 0.5', variant: 'caption' }),
                    h(Image, {
                        src: 'https://pixijs.com/assets/bunny.png',
                        style: { alpha: 0.5 }
                    })
                )
            ),
            h(
                Column,
                { x: 700, y: 100, spacing: 30 },
                h(Text, { text: 'Different Anchors', variant: 'heading' }),
                h(
                    Column,
                    { spacing: 40 },
                    h(
                        Column,
                        { spacing: 10 },
                        h(Text, { text: 'Anchor: 0 (top-left)', variant: 'caption' }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 60,
                            anchor: 0,
                            style: { tint: 0xFF5722 }
                        })
                    ),
                    h(
                        Column,
                        { spacing: 10 },
                        h(Text, { text: 'Anchor: 0.5 (center, default)', variant: 'caption' }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 60,
                            anchor: 0.5,
                            style: { tint: 0x4CAF50 }
                        })
                    ),
                    h(
                        Column,
                        { spacing: 10 },
                        h(Text, { text: 'Anchor: 1 (bottom-right)', variant: 'caption' }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 60,
                            anchor: 1,
                            style: { tint: 0x2196F3 }
                        })
                    )
                )
            )
        ),
    app
);
