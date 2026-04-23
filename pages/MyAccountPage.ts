import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object pro stránku "Můj účet".
 */
export class MyAccountPage extends BasePage {
  /**
   * Otevře stránku uživatelského účtu.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/index.php/muj-ucet/');
  }

  /**
   * Ověří dostupnost sekcí pro přihlášení a registraci nepřihlášeného uživatele.
   */
  async checkLoginSectionsVisibility(): Promise<void> {
    const sections = ['.woocommerce-form-register', '.woocommerce-form-login'];

    for (const selector of sections) {
      const element = this.page.locator(selector).first();
      await expect(element).toBeVisible();
    }
  }

  /**
   * Ověří dostupnost klíčových sekcí v administraci účtu po přihlášení.
   */
  async checkAccountSectionsVisibility(): Promise<void> {
    const sections = [
      '.woocommerce-MyAccount-navigation-link--orders',
      '.woocommerce-MyAccount-navigation-link--edit-account',
    ];

    for (const selector of sections) {
      const element = this.page.locator(selector).first();
      await expect(element).toBeVisible();
    }
  }

  /**
   * Upraví základní údaje profilu a ověří úspěšné uložení změn.
   */
  async modifyAccountSettings(): Promise<void> {
    await this.page.click('.woocommerce-MyAccount-navigation-link--edit-account');
    await this.page.waitForLoadState('load');
    await this.page.click('#account_first_name');
    await this.page.keyboard.type('Test', { delay: 15 });
    await this.page.click('#account_last_name');
    await this.page.keyboard.type('User', { delay: 15 });
    await this.page.click('button[name="save_account_details"]');
    await this.page.waitForLoadState('load');

    const successBanner = this.page.locator('.wc-block-components-notice-banner.is-success');
    await expect(
      successBanner,
      'Success banner se nezobrazil po uložení uživatelských údajů.'
    ).toBeVisible({ timeout: 10000 });
  }

  /**
   * Ověří, že se při chybném přihlášení zobrazí chyba
   * nebo uživatel zůstane na přihlašovacím formuláři.
   */
  async checkLoginFail(): Promise<void> {
    const errorMessage = this.page.locator('.wc-block-components-notice-banner.is-error');

    await expect(errorMessage).toBeVisible({ timeout: 10000 }).catch(async () => {
      const loginForm = this.page.locator('.woocommerce-form-login');
      await expect(loginForm).toBeVisible();
    });
  }
}
