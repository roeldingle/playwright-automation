/**
 * ARCHITECTURE EXAMPLE ONLY
 *
 * Demonstrates typed API testing, runtime schema validation,
 * fixture-based API clients, assertions, and resource cleanup.
 *
 * This example is not part of the executable Playwright suite
 * because the current test target does not provide the /users API.
 */

import { test, expect } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('user can be created through the API', async ({ usersApi }) => {

    const createdUser =
      await usersApi.createUser(standardUser);

    try {
      expect(createdUser.id).toBeGreaterThan(0);

      expect(createdUser.email)
        .toBe(standardUser.email);

      expect(createdUser.role)
        .toBe(standardUser.role);

      expect(createdUser)
        .not.toHaveProperty('password');

    } finally {
      await usersApi.deleteUser(createdUser.id);
    }
  }
);