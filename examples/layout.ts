/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import * as PIXI from 'pixi.js';
import { compose } from '../src/core/compose';
import { h } from '../src/core/vnode';
import { Column } from '../src/components/Column';
import { Row } from '../src/components/Row';
import { Grid } from '../src/components/Grid';
import { Text } from '../src/components/Text';
import { Image } from '../src/components/Image';
import { Drawer } from '../src/components/Drawer';

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
            'Box',
            {},
            h(
                Column,
                { x: 50, y: 50, spacing: 20 },
                h(Text, { text: 'Item 1' }),
                h(Text, { text: 'Item 2' }),
                h(Text, { text: 'Item 3' })
            ),
            h(
                Row,
                { x: 300, y: 50, spacing: 15 },
                h(Text, { text: 'A' }),
                h(Text, { text: 'B' }),
                h(Text, { text: 'C' })
            ),
            h(
                Grid,
                { x: 50, y: 250, columns: 3, spacing: 20 },
                h(Text, { text: '1' }),
                h(Text, { text: '2' }),
                h(Text, { text: '3' }),
                h(Text, { text: '4' }),
                h(Text, { text: '5' }),
                h(Text, { text: '6' })
            ),
            h(
                Column,
                { x: 500, y: 50, spacing: 40 },
                h(Text, { text: 'Row Alignment Demo', variant: 'heading' }),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: top (default)', variant: 'caption' }),
                    h(
                        Row,
                        { spacing: 10, align: 'top' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 60,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 45,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: center', variant: 'caption' }),
                    h(
                        Row,
                        { spacing: 10, align: 'center' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 60,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 45,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'Align: bottom', variant: 'caption' }),
                    h(
                        Row,
                        { spacing: 10, align: 'bottom' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 30,
                            style: { tint: 0xFF0000 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 60,
                            style: { tint: 0x00FF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 45,
                            style: { tint: 0x0000FF }
                        })
                    )
                ),
                h(
                    Column,
                    { spacing: 10 },
                    h(Text, { text: 'With padding: 15', variant: 'caption' }),
                    h(
                        Row,
                        { spacing: 10, padding: 15, align: 'center' },
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 40,
                            style: { tint: 0xFFFF00 }
                        }),
                        h(Image, {
                            texture: PIXI.Texture.WHITE,
                            width: 30,
                            height: 40,
                            style: { tint: 0xFF00FF }
                        })
                    )
                )
            ),
            h(
                Drawer,
                { side: 'left', isOpen: true },
                h(Text, { text: 'Drawer content' })
            )
        ),
    app
);
