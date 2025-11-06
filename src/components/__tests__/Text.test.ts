/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { Text } from '../Text';
import { h } from '../../core/vnode';

describe('Text component', () => {
    describe('VNode creation', () => {
        it('should create a Text VNode with text', () => {
            const text = Text({ text: 'Hello World' });

            expect(text.type).toBe('Text');
            expect(text.props?.text).toBe('Hello World');
        });

        it('should create a Text VNode with custom style', () => {
            const style = { fontSize: 20, fill: 0xFF0000 };
            const text = Text({ text: 'Styled', style });

            expect(text.props?.style).toBe(style);
        });

        it('should create a Text VNode with variant', () => {
            const text = Text({ text: 'Heading', variant: 'heading' });

            expect(text.props?.variant).toBe('heading');
        });

        it('should create a Text VNode with position', () => {
            const text = Text({ text: 'Positioned', x: 100, y: 200 });

            expect(text.props?.x).toBe(100);
            expect(text.props?.y).toBe(200);
        });

        it('should create a Text VNode with rotation', () => {
            const text = Text({ text: 'Rotated', rotation: Math.PI / 4 });

            expect(text.props?.rotation).toBe(Math.PI / 4);
        });
    });

    describe('Props interface', () => {
        it('should accept all valid props together', () => {
            const style = {
                fontSize: 24,
                fontFamily: 'Arial',
                fill: 0x00FF00,
                align: 'center' as const,
                fontWeight: 'bold' as const,
                fontStyle: 'italic' as const,
                lineHeight: 30,
                letterSpacing: 2,
                wordWrap: true,
                wordWrapWidth: 300,
                stroke: 0x000000,
                strokeThickness: 2
            };

            const text = Text({
                text: 'Full Props',
                style,
                variant: 'body',
                x: 50,
                y: 75,
                rotation: 0.5
            });

            expect(text.props?.text).toBe('Full Props');
            expect(text.props?.style).toBe(style);
            expect(text.props?.variant).toBe('body');
            expect(text.props?.x).toBe(50);
            expect(text.props?.y).toBe(75);
            expect(text.props?.rotation).toBe(0.5);
        });

        it('should accept minimal props (just text)', () => {
            const text = Text({ text: 'Minimal' });

            expect(text.props?.text).toBe('Minimal');
            expect(text.props?.style).toBeUndefined();
            expect(text.props?.variant).toBeUndefined();
        });
    });

    describe('Integration with h function', () => {
        it('should be compatible with h() function', () => {
            const text = h(Text, { text: 'Direct h()' });

            expect(text.type).toBe(Text);
            expect(text.props?.text).toBe('Direct h()');
        });
    });

    describe('Variant types', () => {
        it('should create Text with body variant', () => {
            const text = Text({ text: 'Body', variant: 'body' });

            expect(text.props?.variant).toBe('body');
        });

        it('should create Text with heading variant', () => {
            const text = Text({ text: 'Heading', variant: 'heading' });

            expect(text.props?.variant).toBe('heading');
        });

        it('should create Text with title variant', () => {
            const text = Text({ text: 'Title', variant: 'title' });

            expect(text.props?.variant).toBe('title');
        });

        it('should create Text with caption variant', () => {
            const text = Text({ text: 'Caption', variant: 'caption' });

            expect(text.props?.variant).toBe('caption');
        });
    });

    describe('Style configuration', () => {
        it('should accept fontSize and fill', () => {
            const style = { fontSize: 18, fill: 0xFF5722 };
            const text = Text({ text: 'Styled', style });

            expect(text.props?.style?.fontSize).toBe(18);
            expect(text.props?.style?.fill).toBe(0xFF5722);
        });

        it('should accept font family and weight', () => {
            const style = { fontFamily: 'Verdana', fontWeight: 'bold' as const };
            const text = Text({ text: 'Bold Verdana', style });

            expect(text.props?.style?.fontFamily).toBe('Verdana');
            expect(text.props?.style?.fontWeight).toBe('bold');
        });

        it('should accept word wrap configuration', () => {
            const style = { wordWrap: true, wordWrapWidth: 400 };
            const text = Text({ text: 'Wrapped Text', style });

            expect(text.props?.style?.wordWrap).toBe(true);
            expect(text.props?.style?.wordWrapWidth).toBe(400);
        });

        it('should accept stroke properties', () => {
            const style = { stroke: 0x000000, strokeThickness: 3 };
            const text = Text({ text: 'Stroked', style });

            expect(text.props?.style?.stroke).toBe(0x000000);
            expect(text.props?.style?.strokeThickness).toBe(3);
        });
    });

    describe('Style merging', () => {
        it('should allow variant with style overrides', () => {
            const style = { fill: 0xFF0000 };
            const text = Text({ text: 'Override', variant: 'heading', style });

            expect(text.props?.variant).toBe('heading');
            expect(text.props?.style?.fill).toBe(0xFF0000);
        });

        it('should not mutate the original style object', () => {
            const style = { fontSize: 20 };
            const styleCopy = { ...style };
            Text({ text: 'Test', style });

            expect(style).toEqual(styleCopy);
        });
    });
});
