import { test } from '../fixtures/test';

test('user can open the docs intro page', async ({ docsPage }) => {
  // Arrange
  await docsPage.open();

  // Assert
  await docsPage.expectIntroPage();
});