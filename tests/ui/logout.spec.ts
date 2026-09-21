import { test } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('User can log out of an authenticated account', {
  tag: '@smoke',
}, async ({ accountApi, accountPage }) => {
  // Generate a unique email for the test to avoid conflicts with existing accounts
  const user = {
    ...standardUser,
    email: `logout.${Date.now()}@example.com`,
  };

  // Create the account using the API before attempting to log in
  await accountApi.createAccount(user);

  try {
    await accountPage.openLogin();
    await accountPage.login(user);
    await accountPage.expectLoggedInAs(user);
    await accountPage.logout();
  } finally {
    // Ensure that the account is deleted after the test, even if it fails
    await accountApi.deleteAccount(user);
  }
});
