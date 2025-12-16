import { test, expect } from "@playwright/test";
import { OrangeHRMLoginPage } from "../pages/OrangeHRMLoginPage";

test("OrangeHRM Admin login with valid credentials", async ({ page }) => {
    const loginPage = new OrangeHRMLoginPage(page);
    await loginPage.openUrl("/");

    await loginPage.login(process.env.USERNAME || "Admin", process.env.PASSWORD || "admin123");

  // Assert successful login by checking for Admin dashboard element
  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});
