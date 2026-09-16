import { z } from 'zod';

const environmentSchema = z.enum([
  'dev',
  'qa',
  'staging'
]);

export const environment = environmentSchema.parse(
  process.env.TEST_ENV ?? 'qa'
);

const environments = {
  dev: {
    baseURL: 'https://dev.example.com',
    apiURL: 'https://api.dev.example.com'
  },

  qa: {
    baseURL: 'https://qa.example.com',
    apiURL: 'https://api.qa.example.com'
  },

  staging: {
    baseURL: 'https://staging.example.com',
    apiURL: 'https://api.staging.example.com'
  }
};

export const config = environments[environment];