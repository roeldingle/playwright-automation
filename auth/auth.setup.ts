import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'TEST_USERNAME and TEST_PASSWORD are required'
    );
  }

  await page.getByLabel('Email').fill(username);
  await page.getByLabel('Password').fill(password);

  await page
    .getByRole('button', { name: 'Login' })
    .click();

  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  });
});