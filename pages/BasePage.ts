import { expect, Page } from '@playwright/test';

/**
 * Sdílený základ pro všechny page objecty v testovacím projektu.
 * Zapouzdřuje opakovaně používané akce a společné kontroly.
 */
export class BasePage {
  /**
   * @param page Aktivní Playwright stránka předaná z testu.
   */
  constructor(public page: Page) {}

  /**
   * Vrátí HTTP status aktuálně otevřené stránky.
   * Hodí se pro jednoduchou kontrolu dostupnosti před dalšími asercemi.
   *
   * @returns HTTP status kód nebo `0`, pokud odpověď není dostupná.
   */
  async getHTMLStatus(): Promise<number> {
    const response = await this.page.goto(this.page.url());
    return response?.status() || 0;
  }

  /**
   * Ověří, že první nalezený obrázek podle zadaného selektoru je viditelný.
   *
   * @param selector CSS selektor cílového obrázku.
   */
  async checkImageVisibility(selector: string): Promise<void> {
    const image = this.page.locator(selector).first();
    await expect(image).toBeVisible();
  }

  /**
   * Přihlásí uživatele přes stránku "Můj účet".
   * Výchozí údaje odpovídají testovacímu účtu používanému v E2E scénářích.
   *
   * @param username Přihlašovací e-mail nebo uživatelské jméno.
   * @param password Heslo testovacího účtu.
   */
  async login(
    username: string = 'test1@test.cz',
    password: string = 'Heslo123'
  ): Promise<void> {
    await this.page.goto('/index.php/muj-ucet/');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('#username');
    await this.page.keyboard.type(username, { delay: 15 });
    await this.page.waitForTimeout(500);
    await this.page.click('#password');
    await this.page.keyboard.type(password, { delay: 15 });
    await this.page.waitForTimeout(500);
    await this.acceptCookies();
    await this.page.waitForTimeout(500);
    await this.page.click('button[name="login"]');
    await this.page.waitForLoadState('load');
  }

  /**
   * Zavře cookie lištu pouze v případě, že je na stránce aktuálně zobrazená.
   */
  async acceptCookies(): Promise<void> {
    const acceptButton = this.page.locator('button:has-text("PĹ™Ă­jmout")');

    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  }
}
