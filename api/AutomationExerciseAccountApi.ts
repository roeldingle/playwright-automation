import { expect, type APIRequestContext } from '@playwright/test';
import type { CreateUserRequest } from '../models/user-request';
import type {
  AutomationExerciseAccountResponse,
  AutomationExerciseCreateAccountRequest,
  AutomationExerciseDeleteAccountRequest,
} from '../models/automation-exercise-account';
import {
  automationExerciseAccountResponseSchema,
  automationExerciseCreateAccountRequestSchema,
  automationExerciseDeleteAccountRequestSchema,
} from '../schemas/automation-exercise-account.schema';

export class AutomationExerciseAccountApi {
  constructor(private readonly request: APIRequestContext) {}

  async createAccount(user: CreateUserRequest): Promise<AutomationExerciseAccountResponse> {
    const { role: _role, ...accountData } = user;
    const requestData: AutomationExerciseCreateAccountRequest =
      automationExerciseCreateAccountRequestSchema.parse({
        ...accountData,
        birth_date: String(user.birth_date),
        birth_month: String(user.birth_month),
        birth_year: String(user.birth_year),
        company: user.company ?? '',
        address2: user.address2 ?? '',
      });

    const response = await this.request.post('/api/createAccount', {
      form: requestData,
    });

    expect([200, 201]).toContain(response.status());

    const rawData: unknown = await response.json();
    return automationExerciseAccountResponseSchema.parse(rawData);
  }

  async deleteAccount(user: CreateUserRequest): Promise<AutomationExerciseAccountResponse> {
    const requestData: AutomationExerciseDeleteAccountRequest =
      automationExerciseDeleteAccountRequestSchema.parse({
        email: user.email,
        password: user.password,
      });

    const response = await this.request.delete('/api/deleteAccount', {
      form: requestData,
    });

    expect(response.ok()).toBeTruthy();

    const rawData: unknown = await response.json();
    return automationExerciseAccountResponseSchema.parse(rawData);
  }
}
