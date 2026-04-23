import { expect, test } from '@playwright/test';
import { getWooAuthHeader } from '../../utils/auth';

test('WooCommerce API - kontrola uživatelských objednávek', async ({ request }) => {
  const response = await request.get('/wp-json/wc/v3/orders', {
    headers: getWooAuthHeader(),
  });

  expect(response.status()).toBe(200);

  const orders = await response.json();
  expect(orders.length).toBeGreaterThan(0);
});
