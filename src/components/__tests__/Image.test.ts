/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { Image } from '../Image';
import { h } from '../../core/vnode';

describe('Image component', () => {
    describe('VNode creation', () => {
        it('should create an Image VNode with src', () => {
            const image = Image({ src: 'photo.png' });

            expect(image.type).toBe('Image');
            expect(image.props?.src).toBe('photo.png');
        });

        it('should create an Image VNode with texture', () => {
            const texture = {} as any;
            const image = Image({ texture });

            expect(image.props?.texture).toBe(texture);
        });

        it('should create an Image VNode with children', () => {
            const child = h('Box', {});
            const image = Image({ src: 'photo.png' }, child);

            expect(image.children).toHaveLength(1);
        });

        it('should create an Image VNode with position', () => {
            const image = Image({ src: 'photo.png', x: 100, y: 200 });

            expect(image.props?.x).toBe(100);
            expect(image.props?.y).toBe(200);
        });

        it('should create an Image VNode with rotation', () => {
            const image = Image({ src: 'photo.png', rotation: Math.PI / 4 });

            expect(image.props?.rotation).toBe(Math.PI / 4);
        });
    });

    describe('Props interface', () => {
        it('should accept all valid props together', () => {
            const style = {
                tint: 0xFF0000,
                alpha: 0.5,
                blendMode: 1,
                roundPixels: true,
                visible: true
            };

            const image = Image({
                src: 'photo.png',
                x: 50,
                y: 75,
                rotation: 0.5,
                anchor: 0.5,
                width: 200,
                height: 150,
                scale: 2,
                scaleMode: 'fit',
                style,
                eventMode: 'static',
                cursor: 'pointer',
                onClick: () => {}
            });

            expect(image.props?.src).toBe('photo.png');
            expect(image.props?.x).toBe(50);
            expect(image.props?.y).toBe(75);
            expect(image.props?.rotation).toBe(0.5);
            expect(image.props?.anchor).toBe(0.5);
            expect(image.props?.width).toBe(200);
            expect(image.props?.height).toBe(150);
            expect(image.props?.scale).toBe(2);
            expect(image.props?.scaleMode).toBe('fit');
            expect(image.props?.style).toBe(style);
            expect(image.props?.eventMode).toBe('static');
            expect(image.props?.cursor).toBe('pointer');
            expect(image.props?.onClick).toBeDefined();
        });

        it('should accept minimal props (just src)', () => {
            const image = Image({ src: 'photo.png' });

            expect(image.props?.src).toBe('photo.png');
            expect(image.props?.style).toBeUndefined();
            expect(image.props?.scaleMode).toBeUndefined();
        });
    });

    describe('Integration with h function', () => {
        it('should be compatible with h() function', () => {
            const image = h(Image, { src: 'photo.png' });

            expect(image.type).toBe(Image);
            expect(image.props?.src).toBe('photo.png');
        });
    });

    describe('Scale mode types', () => {
        it('should accept scaleMode: fit', () => {
            const image = Image({ src: 'photo.png', scaleMode: 'fit' });

            expect(image.props?.scaleMode).toBe('fit');
        });

        it('should accept scaleMode: fill', () => {
            const image = Image({ src: 'photo.png', scaleMode: 'fill' });

            expect(image.props?.scaleMode).toBe('fill');
        });

        it('should accept scaleMode: stretch', () => {
            const image = Image({ src: 'photo.png', scaleMode: 'stretch' });

            expect(image.props?.scaleMode).toBe('stretch');
        });

        it('should accept scaleMode: none', () => {
            const image = Image({ src: 'photo.png', scaleMode: 'none' });

            expect(image.props?.scaleMode).toBe('none');
        });
    });

    describe('Transform properties', () => {
        it('should accept anchor as number', () => {
            const image = Image({ src: 'photo.png', anchor: 0.5 });

            expect(image.props?.anchor).toBe(0.5);
        });

        it('should accept anchor as object', () => {
            const anchor = { x: 0.5, y: 0.5 };
            const image = Image({ src: 'photo.png', anchor });

            expect(image.props?.anchor).toBe(anchor);
        });

        it('should accept scale as number', () => {
            const image = Image({ src: 'photo.png', scale: 2 });

            expect(image.props?.scale).toBe(2);
        });

        it('should accept scale as object', () => {
            const scale = { x: 2, y: 3 };
            const image = Image({ src: 'photo.png', scale });

            expect(image.props?.scale).toBe(scale);
        });
    });

    describe('Sizing properties', () => {
        it('should accept width and height', () => {
            const image = Image({ src: 'photo.png', width: 300, height: 200 });

            expect(image.props?.width).toBe(300);
            expect(image.props?.height).toBe(200);
        });

        it('should accept width with scaleMode', () => {
            const image = Image({
                src: 'photo.png',
                width: 300,
                scaleMode: 'fit'
            });

            expect(image.props?.width).toBe(300);
            expect(image.props?.scaleMode).toBe('fit');
        });
    });

    describe('Style configuration', () => {
        it('should accept tint property', () => {
            const style = { tint: 0xFF0000 };
            const image = Image({ src: 'photo.png', style });

            expect(image.props?.style?.tint).toBe(0xFF0000);
        });

        it('should accept alpha property', () => {
            const style = { alpha: 0.7 };
            const image = Image({ src: 'photo.png', style });

            expect(image.props?.style?.alpha).toBe(0.7);
        });

        it('should accept blendMode property', () => {
            const style = { blendMode: 2 };
            const image = Image({ src: 'photo.png', style });

            expect(image.props?.style?.blendMode).toBe(2);
        });

        it('should accept roundPixels property', () => {
            const style = { roundPixels: true };
            const image = Image({ src: 'photo.png', style });

            expect(image.props?.style?.roundPixels).toBe(true);
        });

        it('should accept visible property', () => {
            const style = { visible: false };
            const image = Image({ src: 'photo.png', style });

            expect(image.props?.style?.visible).toBe(false);
        });
    });

    describe('Interaction properties', () => {
        it('should accept onClick handler', () => {
            const onClick = jest.fn();
            const image = Image({ src: 'photo.png', onClick });

            expect(image.props?.onClick).toBe(onClick);
        });

        it('should accept eventMode', () => {
            const image = Image({ src: 'photo.png', eventMode: 'dynamic' });

            expect(image.props?.eventMode).toBe('dynamic');
        });

        it('should accept cursor', () => {
            const image = Image({ src: 'photo.png', cursor: 'pointer' });

            expect(image.props?.cursor).toBe('pointer');
        });
    });

    describe('Style merging', () => {
        it('should not mutate the original style object', () => {
            const style = { tint: 0xFF0000, alpha: 0.5 };
            const styleCopy = { ...style };
            Image({ src: 'photo.png', style });

            expect(style).toEqual(styleCopy);
        });
    });
});
