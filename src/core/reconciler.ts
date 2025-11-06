/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

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

    case 'Box':
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
        el = createButton(props);
        break;

    case 'Sprite':
        el = PIXI.Sprite.from(props.texture || props.src || '');
        for (const child of children) {
            el.addChild(render(child));
        }
        break;

    case 'Column':
        el = layoutList(children, props, 'vertical');
        break;

    case 'Row':
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
    if ('rotation' in props) el.rotation = props.rotation;

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

        // Get logical dimensions (stored for buttons, or use actual for other elements)
        const childWidth = (child as any)._buttonWidth ?? child.width ?? 0;
        const childHeight = (child as any)._buttonHeight ?? child.height ?? 0;

        if (direction === 'vertical') {
            // For vertical layout, position at offset plus half height if pivot is centered
            child.y = offset + (child.pivot ? child.pivot.y : 0);
            offset += childHeight + spacing;
        } else {
            // For horizontal layout, position at offset plus half width if pivot is centered
            child.x = offset + (child.pivot ? child.pivot.x : 0);
            offset += childWidth + spacing;
        }
        container.addChild(child);
    }
    return container;
}

function layoutGrid(children: any[], props: any) {
    const container = new PIXI.Container();
    const { columns = 2, spacing = 10 } = props;

    const renderedChildren = children.map((childVNode) => {
        const child = render(childVNode);
        // Get logical dimensions for consistent grid cell sizing
        const childWidth = (child as any)._buttonWidth ?? child.width ?? 0;
        const childHeight = (child as any)._buttonHeight ?? child.height ?? 0;
        return { child, width: childWidth, height: childHeight };
    });

    // Calculate uniform cell size based on largest child
    const maxWidth = Math.max(...renderedChildren.map(({ width }) => width));
    const maxHeight = Math.max(...renderedChildren.map(({ height }) => height));

    renderedChildren.forEach(({ child }, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        // Position at cell location, adjusting for pivot if element has one
        child.x = col * (maxWidth + spacing) + (child.pivot ? child.pivot.x : 0);
        child.y = row * (maxHeight + spacing) + (child.pivot ? child.pivot.y : 0);
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

function createButton(props: any) {
    const width = props.width ?? 120;
    const height = props.height ?? 40;
    const variant = props.variant ?? 'filled';
    const isDisabled = props.disabled ?? false;
    const buttonText = props.text ?? 'Button';

    const defaultColors = variant === 'filled'
        ? {
            normal: { bg: 0x007AFF, text: 0xFFFFFF },
            hovered: { bg: 0x0062CC, text: 0xFFFFFF },
            pressed: { bg: 0x004999, text: 0xFFFFFF },
            disabled: { bg: 0xCCCCCC, text: 0x999999 }
        }
        : {
            normal: { bg: 0xE5F1FF, text: 0x007AFF },
            hovered: { bg: 0xCCE4FF, text: 0x0062CC },
            pressed: { bg: 0xB3D7FF, text: 0x004999 },
            disabled: { bg: 0xF5F5F5, text: 0xCCCCCC }
        };

    const colors = {
        normal: { ...defaultColors.normal, ...(props.colors?.normal ?? {}) },
        hovered: { ...defaultColors.hovered, ...(props.colors?.hovered ?? {}) },
        pressed: { ...defaultColors.pressed, ...(props.colors?.pressed ?? {}) },
        disabled: { ...defaultColors.disabled, ...(props.colors?.disabled ?? {}) }
    };

    let currentState: 'normal' | 'hovered' | 'pressed' | 'disabled' = isDisabled ? 'disabled' : 'normal';

    const container = new PIXI.Container();
    const background = new PIXI.Graphics();
    const label = new PIXI.Text({
        text: buttonText,
        style: { fontSize: 16 }
    });

    // Set pivot to center so button rotates and scales from its center point
    container.pivot.set(width / 2, height / 2);

    // Define hit area for mouse interactions (full button rectangle)
    container.hitArea = new PIXI.Rectangle(0, 0, width, height);

    // Store logical dimensions for layout calculations (pivot shifts actual bounds)
    (container as any)._buttonWidth = width;
    (container as any)._buttonHeight = height;

    label.anchor.set(0.5, 0.5);
    label.x = width / 2;
    label.y = height / 2;

    function updateVisuals() {
        const currentColors = colors[currentState];

        background.clear();
        background.roundRect(0, 0, width, height, 8);
        background.fill({ color: currentColors.bg });

        label.style.fill = currentColors.text;

        if (currentState === 'pressed') {
            container.scale.set(0.95);
        } else {
            container.scale.set(1.0);
        }
    }

    updateVisuals();

    if (!isDisabled) {
        container.eventMode = 'static';
        container.cursor = 'pointer';

        container.on('pointerover', () => {
            if (currentState !== 'pressed') {
                currentState = 'hovered';
                updateVisuals();
            }
        });

        container.on('pointerout', () => {
            currentState = 'normal';
            updateVisuals();
        });

        container.on('pointerdown', () => {
            currentState = 'pressed';
            updateVisuals();
        });

        container.on('pointerup', () => {
            currentState = 'hovered';
            updateVisuals();
        });

        container.on('pointertap', () => {
            if (props.onClick) {
                props.onClick();
            }
        });
    }

    container.addChild(background);
    container.addChild(label);

    return container;
}
