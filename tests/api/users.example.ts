import { test, expect } from '../../fixtures/test';
import { standardUser } from '../../data/users';

test(
  'user can be created through the API',
  async ({ usersApi }) => {

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