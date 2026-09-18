import { z } from 'zod';

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['user', 'admin', 'support']),
});