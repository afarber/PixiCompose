/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { Button } from '../Button';
import { h } from '../../core/vnode';

describe('Button component', () => {
    describe('VNode creation', () => {
        it('should create a Button VNode with text', () => {
            const button = Button({ text: 'Click Me' });

            expect(button.type).toBe('Button');
            expect(button.props?.text).toBe('Click Me');
        });

        it('should create a Button VNode with onClick handler', () => {
            const onClick = jest.fn();
            const button = Button({ text: 'Click Me', onClick });

            expect(button.props?.onClick).toBe(onClick);
        });

        it('should create a Button VNode with filled variant by default', () => {
            const button = Button({ text: 'Button' });

            expect(button.props?.variant).toBeUndefined(); // Uses default in reconciler
        });

        it('should create a Button VNode with tonal variant', () => {
            const button = Button({ text: 'Button', variant: 'tonal' });

            expect(button.props?.variant).toBe('tonal');
        });

        it('should create a Button VNode with disabled state', () => {
            const button = Button({ text: 'Button', disabled: true });

            expect(button.props?.disabled).toBe(true);
        });

        it('should create a Button VNode with custom colors', () => {
            const colors = {
                normal: { bg: 0xff0000, text: 0xffffff },
            };
            const button = Button({ text: 'Button', colors });

            expect(button.props?.colors).toBe(colors);
        });

        it('should create a Button VNode with custom dimensions', () => {
            const button = Button({ text: 'Button', width: 200, height: 50 });

            expect(button.props?.width).toBe(200);
            expect(button.props?.height).toBe(50);
        });

        it('should create a Button VNode with position', () => {
            const button = Button({ text: 'Button', x: 100, y: 200 });

            expect(button.props?.x).toBe(100);
            expect(button.props?.y).toBe(200);
        });
    });

    describe('Props interface', () => {
        it('should accept all valid props', () => {
            const onClick = jest.fn();
            const colors = {
                normal: { bg: 0xff0000, text: 0xffffff },
                hovered: { bg: 0xcc0000, text: 0xffffff },
                pressed: { bg: 0x990000, text: 0xffffff },
                disabled: { bg: 0x999999, text: 0x666666 },
            };

            const button = Button({
                text: 'Full Props',
                onClick,
                variant: 'tonal',
                disabled: false,
                colors,
                width: 150,
                height: 45,
                x: 50,
                y: 100,
            });

            expect(button.props).toEqual({
                text: 'Full Props',
                onClick,
                variant: 'tonal',
                disabled: false,
                colors,
                width: 150,
                height: 45,
                x: 50,
                y: 100,
            });
        });

        it('should handle minimal props', () => {
            const button = Button({ text: 'Minimal' });

            expect(button.props).toEqual({
                text: 'Minimal',
            });
        });
    });

    describe('Integration with h function', () => {
        it('should be compatible with h function', () => {
            const button1 = Button({ text: 'Button 1' });
            const button2 = h('Button', { text: 'Button 2' });

            expect(button1.type).toBe(button2.type);
            expect(button1.props?.text).toBe('Button 1');
            expect(button2.props?.text).toBe('Button 2');
        });
    });

    describe('Variant types', () => {
        it('should accept filled variant', () => {
            const button = Button({ text: 'Filled', variant: 'filled' });

            expect(button.props?.variant).toBe('filled');
        });

        it('should accept tonal variant', () => {
            const button = Button({ text: 'Tonal', variant: 'tonal' });

            expect(button.props?.variant).toBe('tonal');
        });
    });

    describe('Color configuration', () => {
        it('should accept partial color overrides', () => {
            const colors = {
                normal: { bg: 0xff0000, text: 0xffffff },
            };
            const button = Button({ text: 'Button', colors });

            expect(button.props?.colors?.normal).toEqual({ bg: 0xff0000, text: 0xffffff });
        });

        it('should accept full color configuration', () => {
            const colors = {
                normal: { bg: 0xff0000, text: 0xffffff },
                hovered: { bg: 0xee0000, text: 0xffffff },
                pressed: { bg: 0xdd0000, text: 0xffffff },
                disabled: { bg: 0x999999, text: 0x666666 },
            };
            const button = Button({ text: 'Button', colors });

            expect(button.props?.colors).toEqual(colors);
        });
    });

    describe('Event handlers', () => {
        it('should store onClick handler', () => {
            const onClick = jest.fn();
            const button = Button({ text: 'Button', onClick });

            expect(button.props?.onClick).toBe(onClick);
            expect(typeof button.props?.onClick).toBe('function');
        });

        it('should work without onClick handler', () => {
            const button = Button({ text: 'Button' });

            expect(button.props?.onClick).toBeUndefined();
        });
    });
});
