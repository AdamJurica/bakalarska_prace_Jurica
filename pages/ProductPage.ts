import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object pro detail produktu.
 */
export class ProductPage extends BasePage {
  /**
   * Otevře detail produktu podle identifikátoru v URL.
   *
   * @param productId Identifikátor produktu použitý v cestě.
   */
  async navigate(productId: string): Promise<void> {
    await this.page.goto(`/index.php/product/${productId}`);
  }

  /**
   * Otevře detail produktu podle SEO slugu.
   *
   * @param slug SEO slug produktu.
   */
  async navigateToSlug(slug: string): Promise<void> {
    await this.page.goto(`/index.php/produkt/${slug}/`);
  }

  /**
   * Vrátí locator nadpisu produktu.
   */
  getProductHeading(): Locator {
    return this.page.getByRole('heading', { name: 'iPhone 12 128GB zelená' });
  }

  /**
   * Vrátí locator hlavního obrázku produktu.
   */
  getProductImage(): Locator {
    return this.page.locator('img').nth(3);
  }

  /**
   * Vrátí locator pole pro změnu množství.
   */
  getQuantitySpinbutton(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Množství' });
  }

  /**
   * Vrátí locator slevového štítku produktu.
   */
  getDiscountBadge(): Locator {
    return this.page.getByText('Sleva!');
  }

  /**
   * Vrátí locator tlačítka pro přidání produktu do košíku.
   */
  getAddToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Přidat do košíku' });
  }

  /**
   * Přidá aktuálně zobrazený produkt do košíku
   * a počká na dokončení síťové aktivity.
   */
  async addToCart(): Promise<void> {
    await this.getAddToCartButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
