/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { Column } from '../Column';
import { h } from '../../core/vnode';

describe('Column component', () => {
    describe('VNode creation', () => {
        it('should create a Column VNode', () => {
            const column = Column({});

            expect(column.type).toBe('Column');
        });

        it('should create a Column VNode with children', () => {
            const child = h('Box', {});
            const column = Column({}, child);

            expect(column.children).toHaveLength(1);
        });

        it('should create a Column VNode with spacing', () => {
            const column = Column({ spacing: 20 });

            expect(column.props?.spacing).toBe(20);
        });

        it('should create a Column VNode with position', () => {
            const column = Column({ x: 100, y: 200 });

            expect(column.props?.x).toBe(100);
            expect(column.props?.y).toBe(200);
        });

        it('should create a Column VNode with multiple children', () => {
            const child1 = h('Box', {});
            const child2 = h('Box', {});
            const child3 = h('Box', {});
            const column = Column({}, child1, child2, child3);

            expect(column.children).toHaveLength(3);
        });
    });

    describe('Props interface', () => {
        it('should accept all valid props together', () => {
            const column = Column({
                spacing: 15,
                padding: 10,
                align: 'center',
                x: 50,
                y: 75
            });

            expect(column.props?.spacing).toBe(15);
            expect(column.props?.padding).toBe(10);
            expect(column.props?.align).toBe('center');
            expect(column.props?.x).toBe(50);
            expect(column.props?.y).toBe(75);
        });

        it('should accept minimal props (no props)', () => {
            const column = Column({});

            expect(column.props).toBeDefined();
        });

        it('should accept only spacing', () => {
            const column = Column({ spacing: 25 });

            expect(column.props?.spacing).toBe(25);
            expect(column.props?.padding).toBeUndefined();
            expect(column.props?.align).toBeUndefined();
        });
    });

    describe('Alignment types', () => {
        it('should accept align: left', () => {
            const column = Column({ align: 'left' });

            expect(column.props?.align).toBe('left');
        });

        it('should accept align: center', () => {
            const column = Column({ align: 'center' });

            expect(column.props?.align).toBe('center');
        });

        it('should accept align: right', () => {
            const column = Column({ align: 'right' });

            expect(column.props?.align).toBe('right');
        });
    });

    describe('Spacing and padding', () => {
        it('should accept spacing property', () => {
            const column = Column({ spacing: 25 });

            expect(column.props?.spacing).toBe(25);
        });

        it('should accept padding property', () => {
            const column = Column({ padding: 20 });

            expect(column.props?.padding).toBe(20);
        });

        it('should accept both spacing and padding', () => {
            const column = Column({ spacing: 10, padding: 15 });

            expect(column.props?.spacing).toBe(10);
            expect(column.props?.padding).toBe(15);
        });

        it('should accept zero spacing', () => {
            const column = Column({ spacing: 0 });

            expect(column.props?.spacing).toBe(0);
        });

        it('should accept zero padding', () => {
            const column = Column({ padding: 0 });

            expect(column.props?.padding).toBe(0);
        });
    });

    describe('Integration with h function', () => {
        it('should be compatible with h() function', () => {
            const column = h(Column, { spacing: 10 });

            expect(column.type).toBe(Column);
            expect(column.props?.spacing).toBe(10);
        });

        it('should be compatible with h() function and children', () => {
            const child = h('Box', {});
            const column = h(Column, { spacing: 10 }, child);

            expect(column.type).toBe(Column);
            expect(column.children).toHaveLength(1);
        });
    });

    describe('Positioning', () => {
        it('should accept x position', () => {
            const column = Column({ x: 150 });

            expect(column.props?.x).toBe(150);
        });

        it('should accept y position', () => {
            const column = Column({ y: 250 });

            expect(column.props?.y).toBe(250);
        });

        it('should accept both x and y position', () => {
            const column = Column({ x: 100, y: 200 });

            expect(column.props?.x).toBe(100);
            expect(column.props?.y).toBe(200);
        });
    });
});
