import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),

  TEST_ENV: z.enum([
    'qa',
    'staging',
  ]),

  TEST_USERNAME: z.string().min(1),

  TEST_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse(process.env);