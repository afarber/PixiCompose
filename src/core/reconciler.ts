import { VNode } from './vnode.js';
import * as PIXI from 'pixi.js';

export function render(vnode: VNode): any {
    if (typeof vnode.type === 'function') {
        return render((vnode.type as Function)(vnode.props || {}, ...(vnode.children || [])));
    }

    const { type, props = {}, children = [] } = vnode;

    let el: any;

    switch (type) {
    case 'Drawer':
        el = createDrawer(props, children);
        break;

    case 'Container':
        el = new PIXI.Container();
        for (const child of children) {
            el.addChild(render(child));
        }
        break;

    case 'Text':
        const textStyle = props.style || {};
        if (!textStyle.fill) {
            textStyle.fill = 0xFFFFFF; // Default to white text
        }
        el = new PIXI.Text({ text: props.text || '', style: textStyle });
        break;

    case 'Button':
        el = new PIXI.Container();
        const buttonStyle = props.style || {};
        if (!buttonStyle.fill) {
            buttonStyle.fill = 0xFFFFFF; // Default to white text
        }
        const label = new PIXI.Text({
            text: props.text || 'Button',
            style: buttonStyle
        });
        label.eventMode = 'static';
        label.on('pointerdown', props.onClick);
        el.addChild(label);
        break;

    case 'Sprite':
        el = PIXI.Sprite.from(props.texture || props.src || '');
        for (const child of children) {
            el.addChild(render(child));
        }
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
    const container = new PIXI.Container();

    const width = props.width ?? window.innerWidth;
    const height = props.height ?? window.innerHeight;

    const backdrop = new PIXI.Graphics();
    backdrop.rect(0, 0, width, height);
    backdrop.fill({ color: 0x000000, alpha: props.backdropAlpha ?? 0.5 });

    const panel = new PIXI.Container();
    const content = children.map((c: any) => render(c));
    content.forEach((node: any) => panel.addChild(node));

    const side = props.side ?? 'left';
    const size = props.size ?? 200;

    switch (side) {
    case 'right':
        panel.x = width - size;
        break;
    case 'top':
        panel.y = 0;
        break;
    case 'bottom':
        panel.y = height - size;
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
