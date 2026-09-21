import { expect, test } from '../../fixtures/test';
// import { mainMenuPages } from '../../config/navigation';

test('User can navigate through the main menu', {
  tag: '@smoke',
}, async ({ homePage, page }) => {

  // Mark as slow. If your config timeout is 30s, this test safely gets 90s.
  test.slow(); 

  // Arrange
  await homePage.goto();

  // Act
  await homePage.clickMainMenuItem("Home");

  // Assert
  await expect(page).toHaveTitle("Automation Exercise");

  // Act
  await homePage.clickMainMenuItem("Products");

  // Assert
  await expect(page).toHaveTitle(/- All Products/);

  // Act
  await homePage.clickMainMenuItem("Cart");

  // Assert
  await expect(page).toHaveTitle(/- Checkout/);

  // Act
  await homePage.clickMainMenuItem("Signup / Login");

  // Assert
  await expect(page).toHaveTitle(/- Signup \/ Login/);

  // Act
  await homePage.clickMainMenuItem("Test Cases");

  // Assert
  await expect(page).toHaveTitle(/- Test Cases/);

  // Act
  await homePage.clickMainMenuItem("API Testing");

  // Assert
  await expect(page).toHaveTitle(/API Testing/);

  // Act
  await homePage.clickMainMenuItem("Contact us");

  // Assert
  await expect(page).toHaveTitle(/- Contact Us/);



  // for (const menuPage of mainMenuPages) {

  //   // Mark as slow. If your config timeout is 30s, this test safely gets 90s.
  //   test.slow(); 

  //   console.log(`Testing navigation to: ${menuPage.name} - Expected title: ${menuPage.title}`);

  //   // Arrange
  //   await homePage.goto();

  //   await homePage.dismissIframeIfPresent();

  //   // Act
  //   await homePage.clickMainMenuItem(menuPage.name);

  //   // Assert
  //   await expect(page).toHaveTitle(menuPage.title);
  // }
});