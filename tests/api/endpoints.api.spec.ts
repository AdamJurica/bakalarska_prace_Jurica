import { expect, test } from '@playwright/test';
import { getWooAuthHeader } from '../../utils/auth';

type ApiEndpoint = {
  name: string;
  url: string;
  auth: boolean;
};

test('WooCommerce API - dostupnost API endpointů', async ({ request }) => {
  const endpoints: ApiEndpoint[] = [
    {
      name: 'WordPress API',
      url: '/wp-json/',
      auth: false,
    },
    {
      name: 'Posts',
      url: '/wp-json/wp/v2/posts',
      auth: false,
    },
    {
      name: 'WooCommerce Products',
      url: '/wp-json/wc/v3/products',
      auth: true,
    },
    {
      name: 'WooCommerce Orders',
      url: '/wp-json/wc/v3/orders',
      auth: true,
    },
    {
      name: 'Store API Cart',
      url: '/wp-json/wc/store/cart',
      auth: false,
    },
  ];

  for (const endpoint of endpoints) {
    const options = endpoint.auth ? { headers: getWooAuthHeader() } : {};
    const response = await request.get(endpoint.url, options);

    console.log(`${endpoint.name}: ${response.status()}`);
    expect(response.status()).toBe(200);
  }
});
