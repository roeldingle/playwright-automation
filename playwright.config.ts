import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Total test budget
  timeout: 120_000,

  // Retry assertions
  expect: {
    timeout: 30_000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
    [
      'junit',
      {
        outputFile: 'test-results/junit.xml',
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',

    // Baseline for actions like .click()
    actionTimeout: 30_000,

    // Budget for page.goto()
    navigationTimeout: 60_000,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      }
    },
  ],
});