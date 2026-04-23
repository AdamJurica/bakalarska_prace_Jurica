import { BasePage } from './BasePage';

/**
 * Jednoduchý page object pro ověření dostupnosti administrace WordPressu.
 */
export class AdminPage extends BasePage {
  /**
   * Otevře administrační rozhraní.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/wp-admin');
  }
}
