import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDocsPage {
  readonly page: Page;
  readonly introHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.introHeading = page.getByRole('heading', { name: /intro/i });
  }

  async open(): Promise<void> {
    await this.page.goto('/docs/intro');
  }

  async expectIntroPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*docs\/intro/);
    await expect(this.introHeading).toBeVisible();
  }
}