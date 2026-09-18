import { z } from 'zod';
import { createUserRequestSchema } from '../schemas/user-request.schema';

export type CreateUserRequest =
  z.infer<typeof createUserRequestSchema>;