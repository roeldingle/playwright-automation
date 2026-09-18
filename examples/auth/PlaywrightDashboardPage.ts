/**
 * ARCHITECTURE EXAMPLE ONLY
 *
 * Demonstrates a Page Object for an authenticated dashboard.
 *
 * This example is not part of the executable Playwright suite
 * because the current test target does not provide the modeled
 * /dashboard application.
 */

import { Locator, Page } from '@playwright/test';

export class PlaywrightDashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'Dashboard',
    });

    this.profileButton = page.getByRole('button', {
      name: 'Profile',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }

  async openProfile(): Promise<void> {
    await this.profileButton.click();
  }
}