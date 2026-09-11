import { test, expect } from '@playwright/test';

// Regression guard for the Angular compiler bug documented in ANGULAR_VERSION_PIN.md:
// on Angular 22.1.0, PrimeNG's p-multi-select column filter crashed with
// `ReferenceError: scrollerOptions_r16 is not defined` the moment its panel rendered
// an option. Opening the panel and asserting zero console/page errors is the only way
// to catch this — the app still builds cleanly on the broken compiler version.
test('Genre column p-multi-select filter opens without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/#/artists');
  await expect(page.locator('app-loading')).toHaveCount(0, { timeout: 15000 });
  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15000 });

  const genreHeader = page.getByRole('columnheader').filter({ hasText: 'Genre' });
  await genreHeader.getByRole('button', { name: 'Show Filter Menu' }).click();

  const multiselect = page.locator('p-multiselect, p-multi-select');
  await multiselect.locator('.p-multiselect-label, .p-multiselect-dropdown').first().click();

  const panel = page.locator('.p-multiselect-overlay, .p-multiselect-panel, [data-pc-section="panel"]');
  await expect(panel).toBeVisible({ timeout: 5000 });
  await expect(panel.getByRole('option').first()).toBeVisible({ timeout: 5000 });

  expect(errors).toEqual([]);
});
