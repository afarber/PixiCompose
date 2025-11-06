import * as PIXI from 'pixi.js';
import { compose } from '../src/core/compose';
import { h } from '../src/core/vnode';
import { Column } from '../src/components/Column';
import { Row } from '../src/components/Row';
import { Grid } from '../src/components/Grid';
import { Text } from '../src/components/Text';
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
                Drawer,
                { side: 'left', isOpen: true },
                h(Text, { text: 'Drawer content' })
            )
        ),
    app
);
