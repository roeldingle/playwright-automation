import { z } from 'zod';
import { userResponseSchema } from '../schemas/user-response.schema';

export type UserResponse =
  z.infer<typeof userResponseSchema>;