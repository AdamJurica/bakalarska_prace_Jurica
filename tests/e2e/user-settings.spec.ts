import { expect, test } from '@playwright/test';
import { MyAccountPage } from '../../pages/MyAccountPage';

test('E2E - Změna uživatelských nastavení', async ({ page }) => {
  const accountPage = new MyAccountPage(page);

  await accountPage.navigate();
  expect(await accountPage.getHTMLStatus()).toBe(200);

  await accountPage.login();
  await accountPage.modifyAccountSettings();
});
