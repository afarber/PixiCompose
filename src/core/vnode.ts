/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

export type VNode = {
    type: string | Function;
    props?: Record<string, any>;
    children?: VNode[];
};

export function h(type: VNode['type'], props?: any, ...children: any[]): VNode {
    return { type, props, children };
}
