// utils/testSetup.ts
import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../data/testData';

export const test = base.extend({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://172.20.3.151:7777/');
    await loginPage.login(credentials.userId, credentials.password);
    await page.waitForURL('http://172.20.3.151:7777/?page=home');
    await use(page);
  }
});

export const expect = baseExpect;
