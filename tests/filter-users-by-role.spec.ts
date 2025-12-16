import { test, expect, Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import { OrangeHRMLoginPage } from "../pages/OrangeHRMLoginPage";
import { OrangeHRMAdminPage } from "../pages/OrangeHRMAdminPage";

// Test to filter users by role (Admin/ESS) from User Management

test.describe("User Management - Filter by Role", () => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  let adminPage: OrangeHRMAdminPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new OrangeHRMLoginPage(page);
    adminPage = new OrangeHRMAdminPage(page);
    await allure.epic("OrangeHRM Application");
    await allure.feature("User Management");
    await allure.story("Testcases to filter users by role");

    await allure.step("Login to OrangeHRM Application", async () => {
      await loginPage.openUrl(url);
      await loginPage.login("Admin", "admin123");
      await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
    });
  });

  test.only("Filter users by ESS role", async ({ page }) => {
    await allure.step("Filtering users by ESS role", async () => {
      await adminPage.filterByRolePOM("ESS");
      const screenshotPath = await page.screenshot({
        path: `screenshots/FilterByESSRole.png`,
        fullPage: true,
      });
      await allure.attachment(
        "ESS Filter Screenshot",
        screenshotPath,
        "image/png"
      );
    });
    await allure.logStep("Filtering users by ESS role");
    await allure.step("Verifying the filtered results", async () => {
      await adminPage.verifyFilteredResults("ESS");
      const screenshotPath = await page.screenshot({
        path: `screenshots/VerifyESSResults.png`,
        fullPage: true,
      });
      await allure.attachment(
        "ESS Results Screenshot",
        screenshotPath,
        "image/png"
      );
    });
  });

  test("Filter users by Admin role", async ({ page }) => {
    await adminPage.filterByRolePOM("Admin");
    const screenshotPath = await page.screenshot({
      path: `screenshots/FilterByAdminRole.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Admin Filter Screenshot",
      screenshotPath,
      "image/png"
    );
    await allure.step("Verifying the filtered results", async () => {
      await adminPage.verifyFilteredResults("Admin");
      const screenshotPath2 = await page.screenshot({
        path: `screenshots/VerifyAdminResults.png`,
        fullPage: true,
      });
      await allure.attachment(
        "Admin Results Screenshot",
        screenshotPath2,
        "image/png"
      );
    });
  });

  test("Filter users by Username", async ({ page }) => {
    const username = "Admin";
    await adminPage.filterByUsername(username);
    const screenshotPath = await page.screenshot({
      path: `screenshots/FilterByUsername.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Username Filter Screenshot",
      screenshotPath,
      "image/png"
    );
    await adminPage.verifyFilteredResults(username);
    const screenshotPath2 = await page.screenshot({
      path: `screenshots/VerifyUsernameResults.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Username Results Screenshot",
      screenshotPath2,
      "image/png"
    );
  });

  test("Filter users by Employee Name", async ({ page }) => {
    const employeeName = "A8DCo 4Ys 010Z";
    await adminPage.filterByEmployeeName(employeeName);
    const screenshotPath = await page.screenshot({
      path: `screenshots/FilterByEmployeeName.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Employee Name Filter Screenshot",
      screenshotPath,
      "image/png"
    );
    await adminPage.verifyFilteredResults(employeeName);
    const screenshotPath2 = await page.screenshot({
      path: `screenshots/VerifyEmployeeNameResults.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Employee Name Results Screenshot",
      screenshotPath2,
      "image/png"
    );
  });

  test("Filter users by Status", async ({ page }) => {
    const status = "Enabled";
    await adminPage.filterByStatus(status);
    const screenshotPath = await page.screenshot({
      path: `screenshots/FilterByStatus.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Status Filter Screenshot",
      screenshotPath,
      "image/png"
    );
    await adminPage.verifyFilteredResults(status);
    const screenshotPath2 = await page.screenshot({
      path: `screenshots/VerifyStatusResults.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Status Results Screenshot",
      screenshotPath2,
      "image/png"
    );
  });

  test("Edit user details", async ({ page }) => {
    const username = "Admin"; // Use a valid username present in the system
    const newStatus = "Disabled";
    await adminPage.editUser(username, undefined, newStatus);
    const screenshotPath = await page.screenshot({
      path: `screenshots/EditUser.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Edit User Screenshot",
      screenshotPath,
      "image/png"
    );
    // Re-filter and verify the status is updated
    await adminPage.filterByUsername(username);
    await adminPage.verifyFilteredResults(newStatus);
    const screenshotPath2 = await page.screenshot({
      path: `screenshots/VerifyEditUser.png`,
      fullPage: true,
    });
    await allure.attachment(
      "Verify Edit User Screenshot",
      screenshotPath2,
      "image/png"
    );
  });
});
