/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';
import * as PIXI from 'pixi.js';

export type ScaleMode = 'fit' | 'fill' | 'stretch' | 'none';

export interface ImageStyle {
    tint?: number;
    alpha?: number;
    blendMode?: number;
    roundPixels?: boolean;
    visible?: boolean;
}

export interface ImageProps {
    src?: string;
    texture?: PIXI.Texture;
    x?: number;
    y?: number;
    rotation?: number;
    anchor?: number | { x: number; y: number };
    width?: number;
    height?: number;
    scale?: number | { x: number; y: number };
    scaleMode?: ScaleMode;
    style?: ImageStyle;
    eventMode?: 'static' | 'dynamic' | 'none';
    cursor?: string;
    onClick?: () => void;
}

export const Image = (props: ImageProps, ...children: any[]) =>
    h('Image', props, ...children);
