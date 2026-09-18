import { z } from 'zod';

export const userResponseSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email(),
    role: z.enum(['user', 'admin', 'support']),
  })
  .strict();