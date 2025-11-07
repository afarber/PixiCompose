/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface GridProps {
    columns: number;
    spacing?: number;
    x?: number;
    y?: number;
}

export const Grid = (props: GridProps, ...children: any[]) =>
    h('Grid', props, ...children);
