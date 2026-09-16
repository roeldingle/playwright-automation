import type { CreateUserRequest } from '../api/schemas/user.schema';

export const standardUser: CreateUserRequest = {
  email: 'john@example.com',
  password: 'Password123',
  role: 'user'
};

export const adminUser: CreateUserRequest = {
  email: 'admin@example.com',
  password: 'AdminPassword123',
  role: 'admin'
};

export const supportUser: CreateUserRequest = {
  email: 'support@example.com',
  password: 'SupportPassword123',
  role: 'support'
};