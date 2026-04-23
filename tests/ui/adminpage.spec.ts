import { expect, test } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';

test('UI - funkční stránka administrace', async ({ page }) => {
  const adminPage = new AdminPage(page);

  await adminPage.navigate();
  expect(await adminPage.getHTMLStatus()).toBe(200);
});
