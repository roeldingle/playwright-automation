import { type Locator, type Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly getStartedLink: Locator;

  constructor(private readonly page: Page) {

    const header = page.getByRole('banner'); // sample resilient locator

    this.getStartedLink = header.getByRole('link', {
      name: 'Get started'
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}