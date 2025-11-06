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
            h(Button, {
                text: 'Click me',
                x: 100,
                y: 160,
                onClick: () => alert('Clicked!'),
            })
        ),
    app
);
