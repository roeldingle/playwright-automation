import { z } from 'zod';

export const automationExerciseCreateAccountRequestSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    title: z.string().min(1),
    birth_date: z.string().min(1),
    birth_month: z.string().min(1),
    birth_year: z.string().min(1),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    company: z.string(),
    address1: z.string().min(1),
    address2: z.string(),
    country: z.string().min(1),
    zipcode: z.string().min(1),
    state: z.string().min(1),
    city: z.string().min(1),
    mobile_number: z.string().min(1),
  })
  .strict();

export const automationExerciseDeleteAccountRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export const automationExerciseAccountResponseSchema = z
  .object({
    responseCode: z.number().int().positive(),
    message: z.string().min(1),
  })
  .strict();
