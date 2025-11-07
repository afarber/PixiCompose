/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { h, VNode } from '../vnode';

describe('h function', () => {
    it('should create VNode with type and props', () => {
        const vnode = h('Box', { x: 10, y: 20 });

        expect(vnode.type).toBe('Box');
        expect(vnode.props).toEqual({ x: 10, y: 20 });
        expect(vnode.children).toEqual([]);
    });

    it('should create VNode with children', () => {
        const child1 = h('Text', { text: 'Hello' });
        const child2 = h('Text', { text: 'World' });
        const parent = h('Box', {}, child1, child2);

        expect(parent.children).toHaveLength(2);
        expect(parent.children?.[0]).toBe(child1);
        expect(parent.children?.[1]).toBe(child2);
    });

    it('should handle function components', () => {
        const Component = (props: any) => h('Box', props);
        const vnode = h(Component, { x: 100 });

        expect(typeof vnode.type).toBe('function');
        expect(vnode.props).toEqual({ x: 100 });
    });

    it('should handle empty props', () => {
        const vnode = h('Box');

        expect(vnode.type).toBe('Box');
        expect(vnode.props).toBeUndefined();
        expect(vnode.children).toEqual([]);
    });

    it('should handle nested children', () => {
        const grandchild = h('Text', { text: 'Nested' });
        const child = h('Box', {}, grandchild);
        const parent = h('Box', {}, child);

        expect(parent.children).toHaveLength(1);
        expect(parent.children?.[0]).toBe(child);
        expect(child.children).toHaveLength(1);
        expect(child.children?.[0]).toBe(grandchild);
    });
});

describe('VNode type', () => {
    it('should allow string types', () => {
        const vnode: VNode = {
            type: 'Box',
            props: {},
            children: [],
        };

        expect(vnode.type).toBe('Box');
    });

    it('should allow function types', () => {
        const Component = () => h('Box');
        const vnode: VNode = {
            type: Component,
            props: {},
            children: [],
        };

        expect(typeof vnode.type).toBe('function');
    });
});
