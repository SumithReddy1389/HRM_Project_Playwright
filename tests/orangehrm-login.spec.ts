import { test, expect } from "@playwright/test";
import { OrangeHRMLoginPage } from "../pages/OrangeHRMLoginPage";

test("OrangeHRM Admin login with valid credentials", async ({ page }) => {
    const loginPage = new OrangeHRMLoginPage(page);
    await loginPage.openUrl("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await loginPage.login("Admin", "admin123");

  // Assert successful login by checking for Admin dashboard element
  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});
