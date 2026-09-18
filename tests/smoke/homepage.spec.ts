import { test, expect } from '../../fixtures/test';

test('Playwright homepage loads', {
  tag: '@smoke'
}, async ({ page }) => {

  // Arrange + Act
  await page.goto('/');

  // Assert
  await expect(page).toHaveTitle(/Playwright/);
});