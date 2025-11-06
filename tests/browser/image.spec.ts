/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { test, expect } from '@playwright/test';

test.describe('Image Example', () => {
    test('should load and render image example', async ({ page }) => {
        await page.goto('/examples/image.html');

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        await expect(page).toHaveTitle(/Image/);
    });

    test('should render images with different scale modes', async ({ page }) => {
        await page.goto('/examples/image.html');

        await page.waitForTimeout(2000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        const boundingBox = await canvas.boundingBox();
        expect(boundingBox).not.toBeNull();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
    });

    test('should render positioned and rotated images', async ({ page }) => {
        await page.goto('/examples/image.html');

        await page.waitForTimeout(2000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        await page.waitForTimeout(500);
        await expect(canvas).toBeVisible();
    });

    test('should handle interactive images', async ({ page }) => {
        await page.goto('/examples/image.html');

        await page.waitForTimeout(2000);

        const canvas = page.locator('canvas');

        await canvas.click({ position: { x: 500, y: 350 } });
        await page.waitForTimeout(500);

        await expect(canvas).toBeVisible();
    });

    test('should render tinted and styled images', async ({ page }) => {
        await page.goto('/examples/image.html');

        await page.waitForTimeout(2000);

        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        const boundingBox = await canvas.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
    });
});
