import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrangeHRMLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  
  get usernameField() {
    return this.page.locator("input[name='username']");
  }

  get passwordField() {
    return this.page.locator("input[name='password']");
  }

  get loginButton() {
    return this.page.locator("button[type='submit']");
  }

  // login method is now inherited from BasePage
}
