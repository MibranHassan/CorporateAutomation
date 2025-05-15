import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLoginPage(url: string) {
    await this.page.goto(url);
  }

  async login(userId: string, password: string) {
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.getByRole('textbox', { name: 'User ID' }).fill(userId);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async waitForHome(url: string) {
    await this.page.waitForURL(url);
  }
}
