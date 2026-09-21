import { test, expect } from '../../fixtures/test';

test('Homepage loads', {
  tag: '@smoke'
}, async ({ page }) => {

  // Arrange + Act
  await page.goto('/');

  // Assert
  await expect(page).toHaveTitle(/Automation Exercise/);
});