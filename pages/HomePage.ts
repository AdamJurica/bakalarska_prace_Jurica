import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object pro veřejnou domovskou stránku e-shopu.
 */
export class HomePage extends BasePage {
  /**
   * Otevře domovskou stránku aplikace.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Ověří přítomnost hlavních obsahových bloků na homepage.
   */
  async checkSectionsVisibility(): Promise<void> {
    const sections = ['main', 'footer', '.wp-block-heading', '.wc-blocks-header-pattern'];

    for (const selector of sections) {
      const element = this.page.locator(selector).first();
      await expect(element).toBeVisible();
    }
  }
}
