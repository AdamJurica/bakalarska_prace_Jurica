import { expect, test } from '@playwright/test';
import { getWooAuthHeader } from '../../utils/auth';

test('WooCommerce API - kontrola produktů', async ({ request }) => {
  const response = await request.get('/wp-json/wc/v3/products', {
    headers: getWooAuthHeader(),
  });

  expect(response.status()).toBe(200);

  const products = await response.json();

  // Ověření, že endpoint vrací seznam produktů a není prázdný.
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
});
