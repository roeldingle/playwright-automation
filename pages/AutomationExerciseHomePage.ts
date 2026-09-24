import { expect, type Locator, type Page } from '@playwright/test';

export class AutomationExerciseHomePage {
  readonly page: Page;
  readonly homeHeading: Locator;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeHeading = page.getByRole('heading', {
      name: 'Full-Fledged practice website for Automation Engineers',
    });
    this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/i });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.homeHeading).toBeVisible();
  }

  async openSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}
