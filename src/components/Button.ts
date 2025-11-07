/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface ColorConfig {
    bg: number;
    text: number;
}

export interface StateColors {
    normal?: ColorConfig;
    hovered?: ColorConfig;
    pressed?: ColorConfig;
    disabled?: ColorConfig;
}

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'filled' | 'tonal';
    disabled?: boolean;
    colors?: StateColors;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

export const Button = (props: ButtonProps, ...children: any[]) =>
    h('Button', props, ...children);
