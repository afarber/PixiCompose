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
        el = createText(props);
        break;

    case 'Button':
        el = createButton(props);
        break;

    case 'Image':
        el = createImage(props, children);
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
    const padding = props.padding ?? 0;
    const align = props.align ?? (direction === 'vertical' ? 'left' : 'top');

    console.log(`[Layout ${direction}] spacing=${spacing}, padding=${padding}, align=${align}`);

    const renderedChildren = children.map((childVNode, index) => {
        const child = render(childVNode);
        const childWidth = (child as any)._buttonWidth ?? (child as any)._imageWidth ?? (child as any)._textWidth ?? child.width ?? 0;
        const childHeight = (child as any)._buttonHeight ?? (child as any)._imageHeight ?? (child as any)._textHeight ?? child.height ?? 0;
        console.log(`[Layout ${direction}] child ${index}: type=${child.constructor.name}, width=${childWidth}, height=${childHeight}, anchor=(${child.anchor?.x ?? 'none'}, ${child.anchor?.y ?? 'none'}), pivot=(${child.pivot?.x ?? 0}, ${child.pivot?.y ?? 0})`);
        return { child, width: childWidth, height: childHeight };
    });

    let maxCrossSize = 0;
    if (direction === 'horizontal') {
        maxCrossSize = Math.max(...renderedChildren.map(({ height }) => height), 0);
    } else {
        maxCrossSize = Math.max(...renderedChildren.map(({ width }) => width), 0);
    }

    let offset = padding;

    for (const { child, width, height } of renderedChildren) {
        const anchorX = (child.anchor ? child.anchor.x : 0);
        const anchorY = (child.anchor ? child.anchor.y : 0);
        const pivotX = (child.pivot ? child.pivot.x : 0);
        const pivotY = (child.pivot ? child.pivot.y : 0);

        if (direction === 'vertical') {
            // For vertical layout, position so the top edge is at offset
            // If anchor is 0, position is at top edge, so y = offset
            // If anchor is 0.5, position is at center, so to place top edge at offset, y = offset + height/2
            // If anchor is 1, position is at bottom edge, so to place top edge at offset, y = offset + height
            // General formula: y = offset + height * anchorY + pivotY
            child.y = offset + height * anchorY + pivotY;

            if (align === 'left') {
                // Position so left edge is at padding
                child.x = padding + width * anchorX + pivotX;
            } else if (align === 'center') {
                child.x = padding + (maxCrossSize / 2);
            } else if (align === 'right') {
                // Position so right edge is at padding + maxCrossSize
                child.x = padding + maxCrossSize - width * (1 - anchorX) + pivotX;
            }

            console.log(`[Layout ${direction}] positioned child at (${child.x}, ${child.y}), offset was ${offset}, anchorY=${anchorY}, height=${height}`);
            offset += height + spacing;
        } else {
            // For horizontal layout, position so the left edge is at offset
            child.x = offset + width * anchorX + pivotX;

            if (align === 'top') {
                // Position so top edge is at padding
                child.y = padding + height * anchorY + pivotY;
            } else if (align === 'center') {
                child.y = padding + (maxCrossSize / 2);
            } else if (align === 'bottom') {
                // Position so bottom edge is at padding + maxCrossSize
                child.y = padding + maxCrossSize - height * (1 - anchorY) + pivotY;
            }

            console.log(`[Layout ${direction}] positioned child at (${child.x}, ${child.y}), offset was ${offset}, anchorX=${anchorX}, width=${width}`);
            offset += width + spacing;
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
        const childWidth = (child as any)._buttonWidth ?? (child as any)._imageWidth ?? (child as any)._textWidth ?? child.width ?? 0;
        const childHeight = (child as any)._buttonHeight ?? (child as any)._imageHeight ?? (child as any)._textHeight ?? child.height ?? 0;
        return { child, width: childWidth, height: childHeight };
    });

    // Calculate uniform cell size based on largest child
    const maxWidth = Math.max(...renderedChildren.map(({ width }) => width));
    const maxHeight = Math.max(...renderedChildren.map(({ height }) => height));

    renderedChildren.forEach(({ child, width, height }, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        const anchorX = (child.anchor ? child.anchor.x : 0);
        const anchorY = (child.anchor ? child.anchor.y : 0);
        const pivotX = (child.pivot ? child.pivot.x : 0);
        const pivotY = (child.pivot ? child.pivot.y : 0);
        // Position at cell location, adjusting for anchor and pivot
        child.x = col * (maxWidth + spacing) + width * anchorX + pivotX;
        child.y = row * (maxHeight + spacing) + height * anchorY + pivotY;
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

function createText(props: any) {
    const variantStyles = {
        body: { fontSize: 16, fill: 0xFFFFFF },
        heading: { fontSize: 24, fill: 0xFFFFFF, fontWeight: 'bold' },
        title: { fontSize: 32, fill: 0xFFFFFF, fontWeight: 'bold' },
        caption: { fontSize: 12, fill: 0xCCCCCC }
    };

    let baseStyle: any = {};

    if (props.variant && variantStyles[props.variant as keyof typeof variantStyles]) {
        baseStyle = { ...variantStyles[props.variant as keyof typeof variantStyles] };
    } else {
        baseStyle = { fill: 0xFFFFFF };
    }

    const mergedStyle = { ...baseStyle, ...(props.style || {}) };

    const el = new PIXI.Text({ text: props.text || '', style: mergedStyle });

    (el as any)._textWidth = el.width;
    (el as any)._textHeight = el.height;

    return el;
}

function createImage(props: any, children: any[]) {
    const texture = props.texture || props.src;
    if (!texture) {
        console.error('Image requires either src or texture prop');
        return new PIXI.Container();
    }

    let sprite: PIXI.Sprite;

    if (props.src && typeof props.src === 'string') {
        const targetWidth = props.width || props.scaleMode ? 100 : undefined;
        const targetHeight = props.height || props.scaleMode ? 100 : undefined;

        sprite = new PIXI.Sprite(PIXI.Texture.EMPTY);

        if (targetWidth) sprite.width = targetWidth;
        if (targetHeight) sprite.height = targetHeight;

        PIXI.Assets.load(props.src).then((loadedTexture) => {
            sprite.texture = loadedTexture;

            if (props.scaleMode && (props.width || props.height)) {
                applyScaleMode(sprite, props.scaleMode, props.width, props.height);
            } else {
                if (props.width) sprite.width = props.width;
                if (props.height) sprite.height = props.height;
                if (props.scale !== undefined) {
                    if (typeof props.scale === 'number') {
                        sprite.scale.set(props.scale, props.scale);
                    } else {
                        sprite.scale.set(props.scale.x, props.scale.y);
                    }
                }
            }

            (sprite as any)._imageWidth = sprite.width;
            (sprite as any)._imageHeight = sprite.height;
        }).catch((error) => {
            console.error('Failed to load image:', props.src, error);
        });
    } else {
        sprite = PIXI.Sprite.from(texture);
    }

    if (props.anchor !== undefined) {
        if (typeof props.anchor === 'number') {
            sprite.anchor.set(props.anchor, props.anchor);
        } else {
            sprite.anchor.set(props.anchor.x, props.anchor.y);
        }
    } else {
        sprite.anchor.set(0.5, 0.5);
    }

    if (!props.src || typeof props.src !== 'string') {
        if (props.scaleMode && (props.width || props.height)) {
            applyScaleMode(sprite, props.scaleMode, props.width, props.height);
        } else {
            if (props.width) sprite.width = props.width;
            if (props.height) sprite.height = props.height;
            if (props.scale !== undefined) {
                if (typeof props.scale === 'number') {
                    sprite.scale.set(props.scale, props.scale);
                } else {
                    sprite.scale.set(props.scale.x, props.scale.y);
                }
            }
        }
    }

    const style = props.style || {};
    if (style.tint !== undefined) sprite.tint = style.tint;
    if (style.alpha !== undefined) sprite.alpha = style.alpha;
    if (style.visible !== undefined) sprite.visible = style.visible;
    if (style.blendMode !== undefined) sprite.blendMode = style.blendMode;
    if (style.roundPixels !== undefined) sprite.roundPixels = style.roundPixels;

    for (const child of children) {
        sprite.addChild(render(child));
    }

    if (props.onClick) {
        sprite.eventMode = props.eventMode || 'static';
        sprite.cursor = props.cursor || 'pointer';
        sprite.on('pointertap', props.onClick);
    } else if (props.eventMode) {
        sprite.eventMode = props.eventMode;
        if (props.cursor) sprite.cursor = props.cursor;
    }

    if (props.src && typeof props.src === 'string') {
        const initialWidth = props.width || (props.scaleMode ? 100 : 26);
        const initialHeight = props.height || (props.scaleMode ? 100 : 37);
        (sprite as any)._imageWidth = initialWidth;
        (sprite as any)._imageHeight = initialHeight;
    } else {
        (sprite as any)._imageWidth = sprite.width;
        (sprite as any)._imageHeight = sprite.height;
    }

    return sprite;
}

function applyScaleMode(
    sprite: PIXI.Sprite,
    mode: string,
    targetWidth?: number,
    targetHeight?: number
) {
    const texture = sprite.texture;
    const textureWidth = texture.width;
    const textureHeight = texture.height;

    if (!targetWidth && !targetHeight) return;

    const tw = targetWidth || textureWidth;
    const th = targetHeight || textureHeight;

    switch (mode) {
    case 'fit': {
        const scaleX = tw / textureWidth;
        const scaleY = th / textureHeight;
        const scale = Math.min(scaleX, scaleY);
        sprite.scale.set(scale, scale);
        break;
    }
    case 'fill': {
        const scaleX = tw / textureWidth;
        const scaleY = th / textureHeight;
        const scale = Math.max(scaleX, scaleY);
        sprite.scale.set(scale, scale);
        break;
    }
    case 'stretch': {
        sprite.width = tw;
        sprite.height = th;
        break;
    }
    case 'none':
    default:
        break;
    }
}
