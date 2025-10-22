import { VNode } from './vnode';

export function render(vnode: VNode): any {
    if (typeof vnode.type === 'function') {
        return render((vnode.type as Function)(vnode.props || {}));
    }

    const { type, props = {}, children = [] } = vnode;
    const PIXI = require('pixi.js');

    let el: any;

    switch (type) {
    case 'Drawer':
        el = createDrawer(props, children);
        break;

    case 'Container':
        el = new PIXI.Container();
        break;

    case 'Text':
        el = new PIXI.Text(props.text || '', props.style || {});
        break;

    case 'Button':
        el = new PIXI.Container();
        const label = new PIXI.Text(
            props.text || 'Button',
            props.style || {}
        );
        label.eventMode = 'static';
        label.on('pointerdown', props.onClick);
        el.addChild(label);
        break;

    case 'Sprite':
        el = PIXI.Sprite.from(props.texture || props.src || '');
        break;

    case 'VerticalList':
        el = layoutList(children, props, 'vertical');
        break;

    case 'HorizontalList':
        el = layoutList(children, props, 'horizontal');
        break;

    case 'Grid':
        el = layoutGrid(children, props);
        break;

    default:
        throw new Error('Unknown element: ' + type);
    }

    if ('x' in props) el.x = props.x;
    if ('y' in props) el.y = props.y;

    return el;
}

function layoutList(
    children: any[],
    props: any,
    direction: 'vertical' | 'horizontal'
) {
    const PIXI = require('pixi.js');
    const container = new PIXI.Container();
    const spacing = props.spacing ?? 10;

    let offset = 0;
    for (const childVNode of children) {
        const child = render(childVNode);
        if (direction === 'vertical') {
            child.y = offset;
            offset += (child.height ?? 0) + spacing;
        } else {
            child.x = offset;
            offset += (child.width ?? 0) + spacing;
        }
        container.addChild(child);
    }
    return container;
}

function layoutGrid(children: any[], props: any) {
    const PIXI = require('pixi.js');
    const container = new PIXI.Container();
    const { columns = 2, spacing = 10 } = props;

    children.forEach((childVNode, i) => {
        const child = render(childVNode);
        const row = Math.floor(i / columns);
        const col = i % columns;
        child.x = col * ((child.width ?? 0) + spacing);
        child.y = row * ((child.height ?? 0) + spacing);
        container.addChild(child);
    });

    return container;
}

function createDrawer(props: any, children: any[]) {
    const PIXI = require('pixi.js');
    const container = new PIXI.Container();

    const backdrop = new PIXI.Graphics();
    backdrop.beginFill(0x000000, props.backdropAlpha ?? 0.5);
    backdrop.drawRect(0, 0, 800, 600); // TODO: dynamic sizing later
    backdrop.endFill();

    const panel = new PIXI.Container();
    const content = children.map((c: any) => render(c));
    content.forEach((node: any) => panel.addChild(node));

    const side = props.side ?? 'left';
    const size = props.size ?? 200;

    switch (side) {
    case 'right':
        panel.x = 800 - size;
        break;
    case 'top':
        panel.y = 0;
        break;
    case 'bottom':
        panel.y = 600 - size;
        break;
    default:
        panel.x = 0; // left
    }

    if (props.isOpen) {
        container.addChild(backdrop);
        container.addChild(panel);
    }

    return container;
}
