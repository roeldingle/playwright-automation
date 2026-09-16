import { z } from 'zod';

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['user', 'admin', 'support'])
});

export const userResponseSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email(),
    role: z.enum(['user', 'admin', 'support'])
  })
  .strict();

export type CreateUserRequest =
  z.infer<typeof createUserRequestSchema>;

export type UserResponse =
  z.infer<typeof userResponseSchema>;