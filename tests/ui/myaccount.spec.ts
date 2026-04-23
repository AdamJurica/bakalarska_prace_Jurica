import { expect, test } from '@playwright/test';
import { MyAccountPage } from '../../pages/MyAccountPage';

test('UI - stránka můj účet', async ({ page }) => {
  const accountPage = new MyAccountPage(page);

  await accountPage.navigate();
  expect(await accountPage.getHTMLStatus()).toBe(200);

  await accountPage.checkLoginSectionsVisibility();
  await accountPage.login();
  await accountPage.checkAccountSectionsVisibility();
});
