/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { test, expect } from '@playwright/test';

test.describe('Column Example', () => {
    test('should load and render column example', async ({ page }) => {
        await page.goto('/examples/column.html');

        // Wait for canvas to be present
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Check page title
        await expect(page).toHaveTitle(/Column/);
    });

    test('should render column components correctly', async ({ page }) => {
        await page.goto('/examples/column.html');

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

    test('should handle window resize', async ({ page }) => {
        await page.goto('/examples/column.html');

        // Wait for initial render
        await page.waitForTimeout(1000);

        // Resize window
        await page.setViewportSize({ width: 800, height: 600 });
        await page.waitForTimeout(500);

        // Verify canvas is still visible
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();
    });
});
