import { test, expect } from '@playwright/test';

// The Artist column filter (p-column-filter + p-multi-select) must survive navigating
// away from the artifacts table and back (stateStorage="session").
const artifacts = [
  { id: 1, title: 'A1', year: 2000, duration: 1, artist: { id: 1, artistName: 'Alpha' }, artifactType: { id: 1, name: 'MP3' }, tags: [] },
  { id: 2, title: 'B1', year: 2001, duration: 1, artist: { id: 2, artistName: 'Beta' }, artifactType: { id: 1, name: 'MP3' }, tags: [] },
  { id: 3, title: 'C1', year: 2002, duration: 1, artist: { id: 3, artistName: 'Gamma' }, artifactType: { id: 1, name: 'MP3' }, tags: [] },
];

test('Artist column filter is restored after navigating away and back', async ({ page }) => {
  await page.route('**/odeon-int-wss/api/**', (route) => {
    const url = route.request().url();
    const body = url.includes('/artifact/table') ? artifacts : [];
    return route.fulfill({ json: body, headers: { 'access-control-allow-origin': '*' } });
  });

  await page.goto('/#/artifacts');
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(3, { timeout: 15000 });

  const header = page.getByRole('columnheader').filter({ hasText: 'Artist Name' });
  await header.getByRole('button', { name: 'Show Filter Menu' }).click();
  await page.locator('p-multi-select .p-multiselect-label, p-multi-select .p-multiselect-dropdown').first().click();
  await page.getByRole('option', { name: 'Alpha' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(rows).toHaveCount(1);

  await rows.first().click();
  await page.getByRole('button', { name: 'Tracks' }).click();
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForTimeout(1500);
  await expect(rows).toHaveCount(1);
  await header.getByRole('button', { name: 'Show Filter Menu' }).click();
  await expect(page.locator('p-multi-select').first()).toContainText('Alpha');
  await expect(rows).toHaveCount(1);
});
