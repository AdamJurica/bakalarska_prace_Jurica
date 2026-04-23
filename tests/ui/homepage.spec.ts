import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('UI - homepage', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  expect(await homePage.getHTMLStatus()).toBe(200);

  await homePage.checkSectionsVisibility();
  await homePage.checkImageVisibility('.attachment-post-thumbnail');
});
