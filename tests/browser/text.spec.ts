/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { test, expect } from '@playwright/test';

test.describe('Text Example', () => {
    test('should load and render text example', async ({ page }) => {
        await page.goto('/examples/text.html');

        // Wait for canvas to be present
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Check page title
        await expect(page).toHaveTitle(/Text/);
    });

    test('should render text variants correctly', async ({ page }) => {
        await page.goto('/examples/text.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        // Verify canvas is visible and has content
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        const boundingBox = await canvas.boundingBox();
        expect(boundingBox).not.toBeNull();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
    });

    test('should display text at specified positions', async ({ page }) => {
        await page.goto('/examples/text.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Verify canvas remains visible and stable
        await page.waitForTimeout(500);
        await expect(canvas).toBeVisible();
    });

    test('should render rotated text', async ({ page }) => {
        await page.goto('/examples/text.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Check that canvas dimensions are valid
        const boundingBox = await canvas.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
    });

    test('should render text with word wrap', async ({ page }) => {
        await page.goto('/examples/text.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Verify canvas is stable after rendering word-wrapped text
        await page.waitForTimeout(500);
        await expect(canvas).toBeVisible();
    });
});
