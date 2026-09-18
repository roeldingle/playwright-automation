import { test, expect } from '../../fixtures/test';

test('user can navigate to Playwright documentation', {
  tag: '@regression',
}, async ({ homePage, page }) => {

  // Arrange
  await homePage.goto();

  // Act
  await homePage.clickGetStarted();

  // Assert
  await expect(page).toHaveURL(/.*intro/);
});