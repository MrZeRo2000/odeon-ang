import { test, expect, Page } from '@playwright/test';

// Regression coverage for the OnPush migration: PrimeNG tables here are driven by
// signals wrapping an Observable data source (toSignal + Subject/service reload
// trigger) instead of `xxx$ | async`. A field reassignment from a lifecycle hook
// (the old pattern) silently renders zero rows under OnPush with no console error,
// so "table has rows" is the only signal that actually catches a regression.

async function expectTableRows(page: Page, hashRoute: string, minRows = 1) {
  await page.goto(`/#/${hashRoute}`);
  await expect(page.locator('app-loading')).toHaveCount(0, { timeout: 15000 });
  const rows = page.locator('table tbody tr');
  await expect(rows.first()).toBeVisible({ timeout: 15000 });
  expect(await rows.count()).toBeGreaterThanOrEqual(minRows);
}

test.describe('table rendering (signal-backed data sources)', () => {
  test('artists table renders rows', async ({ page }) => {
    await expectTableRows(page, 'artists');
  });

  test('lyrics table renders rows', async ({ page }) => {
    await expectTableRows(page, 'lyrics');
  });

  test('dvorigins table renders rows', async ({ page }) => {
    await expectTableRows(page, 'dvorigins');
  });

  test('dvcategories table renders rows', async ({ page }) => {
    await expectTableRows(page, 'dvcategories');
  });

  test('dvproducts table renders rows', async ({ page }) => {
    await expectTableRows(page, 'dvproducts');
  });

  test('artifacts (music) table renders rows', async ({ page }) => {
    await expectTableRows(page, 'artifacts');
  });

  test('media-files and tracks tables render rows for the first artifact', async ({ page }) => {
    test.setTimeout(60000); // three sequential table loads; the artifacts table alone can take ~20s
    await expectTableRows(page, 'artifacts');
    const firstId = await page.locator('table tbody tr').first().locator('td').first().innerText();

    await expectTableRows(page, `media-files/${firstId.trim()}`);
    await expectTableRows(page, `tracks/${firstId.trim()}`);
  });
});
