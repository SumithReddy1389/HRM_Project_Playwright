
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrangeHRMAdminPage extends BasePage {

  async filterByUsername(username: string) {
    await this.navigateToAdmin();
    await this.page.getByRole("textbox").nth(1).fill(username);
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/admin/users") && response.status() === 200
      ),
      this.page.getByRole("button", { name: "Search" }).click(),
    ]);
  }

  async verifyFilteredResults(type: string) {
    const usernames = this.page
      .locator("div.oxd-table-cell")
      .getByText(type);
    const count = await usernames.count();
    // expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await usernames.nth(i).innerText()).toBe(type);
    }
  }

  async filterByEmployeeName(employeeName: string) {
    await this.navigateToAdmin();
    await this.employeeNameInput.fill(employeeName);
    await this.page.getByRole("option").first().click();
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/admin/users") && response.status() === 200
      ),
      this.page.getByRole("button", { name: "Search" }).click(),
    ]);
  }

  async verifyFilteredEmployeeName(employeeName: string) {
    const empNames = this.page
      .locator("div.oxd-table-cell")
      .getByText(employeeName);
    const count = await empNames.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await empNames.nth(i).innerText()).toBe(employeeName);
    }
  }

  async filterByStatus(status: string) {
    await this.navigateToAdmin();
    await this.page.getByText('-- Select --').nth(1).click();
    await this.page.getByRole("option", { name: status }).click();
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/admin/users") && response.status() === 200
      ),
      this.page.getByRole("button", { name: "Search" }).click(),
    ]);
  }

  async verifyFilteredStatus(status: string) {
    const statuses = this.page.locator("div.oxd-table-cell").getByText(status);
    const count = await statuses.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await statuses.nth(i).innerText()).toBe(status);
    }
  }
  usernameWithTimestamp: string;

  constructor(page: Page) {
    super(page);
    this.usernameWithTimestamp = "";
  }

  get adminMenu() {
    return this.page.locator('a[href*="admin/viewAdminModule"]');
  }

  get addButton() {
    return this.page.locator('button:has-text("Add")');
  }

  get userRoleDropdown() {
    // Clickable element for User Role dropdown ("-- Select --")
    return this.page
      .locator('div.oxd-select-text:has-text("-- Select --")')
      .first();
  }

  get employeeNameInput() {
    return this.page.getByRole("textbox", { name: "Type for hints..." });
  }

  get statusDropdown() {
    // Clickable element for Status dropdown ("-- Select --")
    return this.page.getByText("-- Select --");
  }

  get usernameInput() {
    return this.page.getByRole("textbox").nth(2);
  }

  get passwordInput() {
    return this.page.getByRole("textbox").nth(3);
  }

  get confirmPasswordInput() {
    return this.page.getByRole("textbox").nth(4);
  }

  get saveButton() {
    return this.page.getByRole("button", { name: "Save" });
  }

  async navigateToAdmin() {
    await this.adminMenu.click();
  }

  async addAdminUser({
    userRole,
    employeeName,
    status,
    username,
    password,
  }: {
    userRole: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
  }) {
    this.usernameWithTimestamp = `${username}${Date.now()}`;

    await this.addButton.click();

    await this.page.waitForSelector('h6:has-text("Add User")');
    await this.userRoleDropdown.waitFor({ state: "visible" });
    await this.userRoleDropdown.click();
    await this.page
      .locator('div[role="option"]:has-text("' + userRole + '")')
      .click();

    await this.employeeNameInput.fill("f");
    await this.page.getByRole("option").nth(1).click();

    await this.statusDropdown.click();
    await this.page.getByRole("option", { name: status }).click();

    console.log(`Creating user with username: ${username}${Date.now()}`);
    await this.usernameInput.fill(this.usernameWithTimestamp);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.saveButton.click();
  }

  // Add filterByRole as a method in OrangeHRMAdminPage
  async filterByRolePOM(role: string) {
    await this.navigateToAdmin();
    await expect(this.page.locator('h6:has-text("Admin")')).toBeVisible();
    await this.userRoleDropdown.click();
    await this.page.locator(`div[role="option"]:has-text("${role}")`).click();

    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/admin/users") && response.status() === 200
      ),
      await this.page.getByRole("button", { name: "Search" }).click(),
    ]);
  }

    async editUser(username: string, newEmployeeName?: string, newStatus?: string) {
    await this.filterByUsername(username);
    // Click the edit button for the first user in the filtered results
    await this.page.locator('i.oxd-icon.bi-pencil-fill').first().click();
    await this.page.waitForSelector('h6:has-text("Edit User")');
    if (newEmployeeName) {
      await this.employeeNameInput.fill(newEmployeeName);
      await this.page.getByRole('option').first().click();
    }
    if (newStatus) {
      await this.statusDropdown.nth(1).click();
      await this.page.getByRole('option', { name: newStatus }).click();
    }
    await this.saveButton.click();
    // Optionally, wait for a success message or check updated values
  }
}
