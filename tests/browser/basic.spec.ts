/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { test, expect } from '@playwright/test';

test.describe('Basic Example', () => {
    test('should load and render basic example', async ({ page }) => {
        // Capture all console messages
        const consoleMessages: Array<{ type: string; text: string }> = [];
        page.on('console', msg => {
            consoleMessages.push({ type: msg.type(), text: msg.text() });
        });

        // Capture page errors
        const pageErrors: string[] = [];
        page.on('pageerror', error => {
            pageErrors.push(error.message);
        });

        await page.goto('/examples/basic.html');

        // Wait for canvas to be present
        const canvas = page.locator('canvas');

        try {
            await expect(canvas).toBeVisible();
        } catch (error) {
            // Log all captured messages on failure
            console.log('=== Console Messages ===');
            consoleMessages.forEach(msg => console.log(`[${msg.type}]`, msg.text));
            console.log('=== Page Errors ===');
            pageErrors.forEach(err => console.log(err));
            throw error;
        }

        // Check page title
        await expect(page).toHaveTitle(/PixiCompose/);
    });

    test('should render PixiJS application', async ({ page }) => {
        await page.goto('/examples/basic.html');

        // Wait for PixiJS to initialize
        await page.waitForTimeout(1000);

        // Verify canvas is visible and has content
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();

        // Check that canvas has rendered something
        const boundingBox = await canvas.boundingBox();
        expect(boundingBox).not.toBeNull();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
    });
});
