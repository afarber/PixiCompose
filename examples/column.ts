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
import { Column } from '../src/components/Column';
import { Row } from '../src/components/Row';
import { Text } from '../src/components/Text';
import { Image } from '../src/components/Image';

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
            h(Text, { text: 'Column Alignment Demo', x: 50, y: 30, variant: 'title' }),
            h(
                Row,
                { x: 50, y: 100, spacing: 80 },
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: left (default)', variant: 'caption' }),
                    h(
                        Column,
                        { spacing: 10, align: 'left' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 30,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 45,
                            height: 30,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: center', variant: 'caption' }),
                    h(
                        Column,
                        { spacing: 10, align: 'center' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 30,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 45,
                            height: 30,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: right', variant: 'caption' }),
                    h(
                        Column,
                        { spacing: 10, align: 'right' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 60,
                            height: 30,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 45,
                            height: 30,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'With padding: 15', variant: 'caption' }),
                    h(
                        Column,
                        { spacing: 10, padding: 15, align: 'center' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 40,
                            height: 30,
                            style: { tint: 0xFFFF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 40,
                            height: 30,
                            style: { tint: 0xFF00FF }
                        })
                    )
                )
            )
        ),
    app
);
