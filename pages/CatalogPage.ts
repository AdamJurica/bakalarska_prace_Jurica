import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object pro katalog produktů.
 */
export class CatalogPage extends BasePage {
  /**
   * Otevře stránku katalogu.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/index.php/obchod/');
  }

  /**
   * Ověří, že katalog obsahuje alespoň jeden produkt
   * a všechny načtené karty produktů jsou viditelné.
   */
  async checkProductsVisibility(): Promise<void> {
    const products = this.page.locator('.wc-block-product');
    const count = await products.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(products.nth(i)).toBeVisible();
    }
  }
}
