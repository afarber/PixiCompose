/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface ColumnProps {
    spacing?: number;
    padding?: number;
    align?: 'left' | 'center' | 'right';
    x?: number;
    y?: number;
}

export const Column = (props: ColumnProps, ...children: any[]) =>
    h('Column', props, ...children);
