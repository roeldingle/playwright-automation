import { test } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('User can log in with valid credentials', {
  tag: '@smoke',
}, async ({ accountApi, accountPage }) => {
  
  const user = {
    ...standardUser,
    email: `login.${Date.now()}@example.com`,
  };
  // Create the account using the API before attempting to log in
  await accountApi.createAccount(user);

  try {
    await accountPage.openLogin();
    await accountPage.login(user);
    await accountPage.expectLoggedInAs(user);
  } finally {
    // API acount deletion is done in the finally block to ensure cleanup even if the test fails
    await accountApi.deleteAccount(user);
  }
});
