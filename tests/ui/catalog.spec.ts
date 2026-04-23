import { expect, test } from '@playwright/test';
import { CatalogPage } from '../../pages/CatalogPage';

test('UI - zobrazení­ katalogu produktů', async ({ page }) => {
  const catalogPage = new CatalogPage(page);

  await catalogPage.navigate();
  expect(await catalogPage.getHTMLStatus()).toBe(200);

  await catalogPage.checkProductsVisibility();
  await catalogPage.checkImageVisibility('.wp-block-image');
});
