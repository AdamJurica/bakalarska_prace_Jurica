import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object pro checkout a dokončení objednávky.
 */
export class CheckoutPage extends BasePage {
  /**
   * Otevře stránku pokladny.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/index.php/pokladna/');
  }

  /**
   * Vyplní objednávkový formulář testovacími údaji,
   * zvolí dopravu a platbu a odešle objednávku.
   */
  async fillCheckoutDetails(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Křestní jméno' }).fill('Test');
    await this.page.getByRole('textbox', { name: 'Příjmení' }).fill('Testový');
    await this.page.getByRole('textbox', { name: 'Ulice a č.p.' }).fill('Testovací 123');
    await this.page.getByRole('textbox', { name: 'Město' }).fill('Testovice');
    await this.page.getByRole('textbox', { name: 'PSČ' }).fill('12345');
    await this.page.getByRole('textbox', { name: 'E-mailová adresa' }).fill('test@test.com');
    await this.page.getByRole('textbox', { name: 'Telefon' }).fill('123456789');

    await this.page.getByRole('radio', { name: 'Česká Pošta: 79,00 Kč' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('radio', { name: 'Dobírka' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Objednávka zavazující k platbě' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Ověří zobrazení potvrzení po úspěšném odeslání objednávky.
   */
  async verifyOrder(): Promise<void> {
    const expectedText = 'Děkujeme za testovací objednávku.';
    const locator = this.page.getByText(expectedText);

    await expect(
      locator,
      `Očekávaný text "${expectedText}" se nezobrazil po dokončení objednávky.`
    ).toBeVisible({ timeout: 10000 });
  }
}
