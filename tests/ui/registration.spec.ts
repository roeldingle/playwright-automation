import { test } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('User can register a new account', {
  tag: '@smoke',
}, async ({ accountApi, registrationPage }) => {
  // Generate a unique email for the test to avoid conflicts with existing accounts
  const user = {
    ...standardUser,
    email: `john.${Date.now()}@example.com`,
  };

  try {
    await registrationPage.open();
    await registrationPage.startRegistration(user);
    await registrationPage.completeRegistration(user);
    await registrationPage.expectAccountCreated();
  } finally {
    // Ensure that the account is deleted after the test, even if it fails
    await accountApi.deleteAccount(user);
  }
});
