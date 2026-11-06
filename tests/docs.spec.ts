
import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation Website', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display Playwright in homepage title', async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('should navigate to documentation intro', async ({ page }) => {
        await page.getByRole('link', { name: 'Get started' }).click();

        await expect(page).toHaveURL(/\/docs\/intro/);
    });

    test('should display Installation heading', async ({ page }) => {
        await page.getByRole('link', { name: 'Get started' }).click();

        await expect(
            page.getByRole('heading', { name: 'Installation' })
        ).toBeVisible();
    });
  
    test('should search for locators and display results', async ({ page }) => {
        await page.getByRole('button', { name: 'Search (Control+k)' }).click();

        const searchBox = page.getByRole('searchbox', { name: 'Search' });

        await searchBox.fill('locators');

        const result = page.getByRole('link', {
            name: 'Locators',
            exact: true
        });

        await expect(result).toBeVisible();
        await result.click();

        await expect(page).toHaveURL(/\/docs\/locators/);

        await expect(
            page.getByRole('heading', { name: 'Quick Guide' })
        ).toBeVisible();
    });


});
