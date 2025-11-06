/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface TextStyle {
    fontSize?: number;
    fontFamily?: string;
    fill?: number | string;
    align?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder';
    fontStyle?: 'normal' | 'italic' | 'oblique';
    lineHeight?: number;
    letterSpacing?: number;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    stroke?: number | string;
    strokeThickness?: number;
}

export interface TextProps {
    text: string;
    style?: TextStyle;
    variant?: 'body' | 'heading' | 'title' | 'caption';
    x?: number;
    y?: number;
    rotation?: number;
}

export const Text = (props: TextProps, ...children: any[]) =>
    h('Text', props, ...children);
