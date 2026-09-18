import {type APIRequestContext,expect} from '@playwright/test';
import { createUserRequestSchema } from '../schemas/user-request.schema';
import { userResponseSchema } from '../schemas/user-response.schema';
import type { CreateUserRequest } from '../models/user-request';
import type { UserResponse } from '../models/user-response';

export class UsersApi {
  
  constructor(private readonly request: APIRequestContext) {}

  async createUser(user: CreateUserRequest): Promise<UserResponse> {

    const requestData = createUserRequestSchema.parse(user);

    const response = await this.request.post('/users', {
      data: requestData
    });

    expect(response.ok()).toBeTruthy();

    const rawData: unknown = await response.json();

    return userResponseSchema.parse(rawData);
  }

  async getUser(id: number): Promise<UserResponse> {

    const response = await this.request.get(`/users/${id}`);

    expect(response.ok()).toBeTruthy();

    const rawData: unknown = await response.json();

    return userResponseSchema.parse(rawData);
  }

  async deleteUser(id: number): Promise<void> {

    const response = await this.request.delete(`/users/${id}`);

    expect(response.ok()).toBeTruthy();
  }
}