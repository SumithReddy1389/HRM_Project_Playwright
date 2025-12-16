import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openUrl(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.locator("input[name='username']").fill(username);
    await this.page.locator("input[name='password']").fill(password);
    await this.page.locator("button[type='submit']").click();
  }

  async isVisible(selector: string | Locator) {
    if (typeof selector === "string") {
      return await this.page.locator(selector).isVisible();
    }
    return await selector.isVisible();
  }

  async click(selector: string | Locator) {
    if (typeof selector === "string") {
      await this.page.locator(selector).click();
    } else {
      await selector.click();
    }
  }
}
