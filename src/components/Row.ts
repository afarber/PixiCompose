/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface RowProps {
    spacing?: number;
    padding?: number;
    align?: 'top' | 'center' | 'bottom';
    x?: number;
    y?: number;
}

export const Row = (
    props: RowProps,
    ...children: any[]
) => h('Row', props, ...children);
