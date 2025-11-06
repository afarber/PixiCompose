/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { Row } from '../Row';
import { h } from '../../core/vnode';

describe('Row component', () => {
    describe('VNode creation', () => {
        it('should create a Row VNode', () => {
            const row = Row({});

            expect(row.type).toBe('Row');
        });

        it('should create a Row VNode with children', () => {
            const child = h('Box', {});
            const row = Row({}, child);

            expect(row.children).toHaveLength(1);
        });

        it('should create a Row VNode with spacing', () => {
            const row = Row({ spacing: 20 });

            expect(row.props?.spacing).toBe(20);
        });

        it('should create a Row VNode with position', () => {
            const row = Row({ x: 100, y: 200 });

            expect(row.props?.x).toBe(100);
            expect(row.props?.y).toBe(200);
        });

        it('should create a Row VNode with multiple children', () => {
            const child1 = h('Box', {});
            const child2 = h('Box', {});
            const child3 = h('Box', {});
            const row = Row({}, child1, child2, child3);

            expect(row.children).toHaveLength(3);
        });
    });

    describe('Props interface', () => {
        it('should accept all valid props together', () => {
            const row = Row({
                spacing: 15,
                padding: 10,
                align: 'center',
                x: 50,
                y: 75
            });

            expect(row.props?.spacing).toBe(15);
            expect(row.props?.padding).toBe(10);
            expect(row.props?.align).toBe('center');
            expect(row.props?.x).toBe(50);
            expect(row.props?.y).toBe(75);
        });

        it('should accept minimal props (no props)', () => {
            const row = Row({});

            expect(row.props).toBeDefined();
        });

        it('should accept only spacing', () => {
            const row = Row({ spacing: 25 });

            expect(row.props?.spacing).toBe(25);
            expect(row.props?.padding).toBeUndefined();
            expect(row.props?.align).toBeUndefined();
        });
    });

    describe('Alignment types', () => {
        it('should accept align: top', () => {
            const row = Row({ align: 'top' });

            expect(row.props?.align).toBe('top');
        });

        it('should accept align: center', () => {
            const row = Row({ align: 'center' });

            expect(row.props?.align).toBe('center');
        });

        it('should accept align: bottom', () => {
            const row = Row({ align: 'bottom' });

            expect(row.props?.align).toBe('bottom');
        });
    });

    describe('Spacing and padding', () => {
        it('should accept spacing property', () => {
            const row = Row({ spacing: 25 });

            expect(row.props?.spacing).toBe(25);
        });

        it('should accept padding property', () => {
            const row = Row({ padding: 20 });

            expect(row.props?.padding).toBe(20);
        });

        it('should accept both spacing and padding', () => {
            const row = Row({ spacing: 10, padding: 15 });

            expect(row.props?.spacing).toBe(10);
            expect(row.props?.padding).toBe(15);
        });

        it('should accept zero spacing', () => {
            const row = Row({ spacing: 0 });

            expect(row.props?.spacing).toBe(0);
        });

        it('should accept zero padding', () => {
            const row = Row({ padding: 0 });

            expect(row.props?.padding).toBe(0);
        });
    });

    describe('Integration with h function', () => {
        it('should be compatible with h() function', () => {
            const row = h(Row, { spacing: 10 });

            expect(row.type).toBe(Row);
            expect(row.props?.spacing).toBe(10);
        });

        it('should be compatible with h() function and children', () => {
            const child = h('Box', {});
            const row = h(Row, { spacing: 10 }, child);

            expect(row.type).toBe(Row);
            expect(row.children).toHaveLength(1);
        });
    });

    describe('Positioning', () => {
        it('should accept x position', () => {
            const row = Row({ x: 150 });

            expect(row.props?.x).toBe(150);
        });

        it('should accept y position', () => {
            const row = Row({ y: 250 });

            expect(row.props?.y).toBe(250);
        });

        it('should accept both x and y position', () => {
            const row = Row({ x: 100, y: 200 });

            expect(row.props?.x).toBe(100);
            expect(row.props?.y).toBe(200);
        });
    });
});
