/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { test, expect } from '@playwright/test';

test.describe('Button Example', () => {
    test('should load and render button example', async ({ page }) => {
        await page.goto('/examples/button.html');

        // Wait for canvas to be present
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Check page title
        await expect(page).toHaveTitle(/Button/);
    });

    test('should render button variants correctly', async ({ page }) => {
        await page.goto('/examples/button.html');

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

    test('should handle button interactions', async ({ page }) => {
        await page.goto('/examples/button.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        const canvas = page.locator('canvas');

        // Click on canvas to simulate button click
        await canvas.click({ position: { x: 400, y: 200 } });
        await page.waitForTimeout(500);

        // Verify canvas is still visible after interaction
        await expect(canvas).toBeVisible();
    });

    test('should handle hover state', async ({ page }) => {
        await page.goto('/examples/button.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        const canvas = page.locator('canvas');

        // Hover over canvas area where button might be
        await canvas.hover({ position: { x: 400, y: 200 } });
        await page.waitForTimeout(500);

        // Verify canvas is still visible
        await expect(canvas).toBeVisible();
    });
});
