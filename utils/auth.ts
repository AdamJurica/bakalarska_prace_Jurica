/**
 * Sestaví HTTP Basic Authorization hlavičku pro WooCommerce API.
 *
 * @returns Objekt s autorizační hlavičkou použitelný v Playwright requestech.
 */
export function getWooAuthHeader(): Record<string, string> {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  return {
    Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`,
  };
}
