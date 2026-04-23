import { expect, test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test('UI - detail produktu', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.navigateToSlug('iphone-12-128gb-zelena');

  // Detail produktu má vykreslit základní nákupní prvky dostupné už při prvním načtení.
  await expect(productPage.getProductHeading()).toBeAttached();
  await expect(productPage.getProductHeading()).toBeVisible();
  await expect(productPage.getProductImage()).toBeAttached();
  await expect(productPage.getProductImage()).toBeVisible();
  await expect(productPage.getQuantitySpinbutton()).toBeAttached();
  await expect(productPage.getQuantitySpinbutton()).toBeVisible();
  await expect(productPage.getDiscountBadge()).toBeAttached();
  await expect(productPage.getDiscountBadge()).toBeVisible();
  await expect(productPage.getAddToCartButton()).toBeAttached();
  await expect(productPage.getAddToCartButton()).toBeVisible();
});
