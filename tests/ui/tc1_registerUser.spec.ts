import { test } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('Test Case 1: Register User', {
  tag: '@regression',
}, async ({ accountApi, homePage, registrationPage }) => {
  // Generate a unique email for the test to avoid conflicts with existing accounts
  const user = {
    ...standardUser,
    email: `john.${Date.now()}@example.com`,
  };

  try {
    await homePage.open();
    await homePage.expectVisible();
    await homePage.openSignupLogin();
    await registrationPage.startRegistration(user);
    await registrationPage.completeRegistration(user);
    await registrationPage.expectAccountCreated();
  } finally {
    // Ensure that the account is deleted after the test, even if it fails
    await accountApi.deleteAccount(user);
  }
});
