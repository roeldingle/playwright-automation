import { z } from 'zod';

export const createUserRequestSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  birth_date: z.number().int().min(1).max(31),
  birth_month: z.number().int().min(1).max(12),
  birth_year: z.number().int().min(1),
  company: z.string().min(1).optional(),
  address1: z.string().min(1),
  address2: z.string().min(1).optional(),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  zipcode: z.string().min(1),
  mobile_number: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['user', 'admin', 'support']),
});