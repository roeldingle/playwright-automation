import { test, expect } from '@playwright/test';

test('user can open the Playwright documentation', async ({ page }) => {
  // Arrange
  await page.goto('/');

  // Act
  await page.getByRole('link', { name: 'Docs' }).click();

  // Assert
  await expect(page).toHaveURL(/.*docs/);
});