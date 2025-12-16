import { test, expect } from "@playwright/test"
import { OrangeHRMLoginPage } from "../pages/OrangeHRMLoginPage";
import { OrangeHRMAdminPage } from "../pages/OrangeHRMAdminPage";
import adminUsers from "../testdata/adminUsers.json";

test("Add new Admin user in OrangeHRM", async ({ page }) => {
  // Login as Admin using BasePage method

  const adminPage = new OrangeHRMAdminPage(page);
  await adminPage.openUrl("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await adminPage.login("Admin", "admin123");
  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();

  // Add Admin user from test data
  await adminPage.navigateToAdmin();
  await expect(page.locator('h6:has-text("Admin")')).toBeVisible();

  const user = adminUsers[0];
  await adminPage.addAdminUser(user);

  // Assert user is added (search for username in the list)
  await expect( page.getByRole('row', { name: adminPage.usernameWithTimestamp })).toBeVisible();
});
