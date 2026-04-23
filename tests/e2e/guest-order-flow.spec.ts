import { test } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductPage } from '../../pages/ProductPage';

test('E2E - odeslání objednávky', async ({ page }) => {
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productPage.navigateToSlug('iphone-12-128gb-zelena');
  await productPage.addToCart();

  await checkoutPage.navigate();
  await checkoutPage.fillCheckoutDetails();
  await checkoutPage.verifyOrder();
});
