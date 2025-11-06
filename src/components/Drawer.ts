/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h } from '../core/vnode.js';

export interface DrawerProps {
    side?: 'left' | 'right' | 'top' | 'bottom';
    size?: number;
    backdropAlpha?: number;
    isOpen?: boolean;
}

export const Drawer = (props: DrawerProps, ...children: any[]) =>
    h('Drawer', props, ...children);
