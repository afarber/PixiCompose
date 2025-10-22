import * as PIXI from 'pixi.js';
import { compose } from '../src/core/compose';
import { h } from '../src/core/vnode';
import { Container } from '../src/components/Container';
import { Text } from '../src/components/Text';
import { Button } from '../src/components/Button';

const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

compose(
    () =>
        h(
            Container,
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
