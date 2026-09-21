/*
This file is part of the Playwright Automation project.
It defines the AutomationExerciseHomePage class, which represents the home page of the Automation Exercise website.
The class provides methods to interact with the home page, such as navigating to the page and clicking on main menu items.
ref: /
*/

import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';

export class AutomationExerciseHomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly mainMenuLinks: Locator;
  readonly iframe: Locator;
  readonly iframeCloseButton: Locator;
  readonly overlayCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('banner');
    this.mainMenuLinks = this.header.getByRole('link');
    this.iframe = page.locator('iframe[title="Advertisement"]')
    this.iframeCloseButton = this.iframe.getByRole('button', { name: /close|dismiss|cancel/i });
    this.overlayCloseButton = this.page.getByText('Close', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async clickMainMenuItem(name: string): Promise<void> {
    // Dismiss any iframe overlay if present before clicking the main menu item
    await this.dismissIframeIfPresent();

    await this.mainMenuLinks
      .filter({ hasText: name })
      .first()
      .click({
        timeout: 30_000, // Set a timeout for the click action
      });
  }

  async dismissIframeIfPresent(): Promise<void> {
    const overlayCloseButton = this.overlayCloseButton.first();

    if (await overlayCloseButton.count() > 0 && await overlayCloseButton.isVisible()) {
      await overlayCloseButton.click();
    }

    const iframe = this.iframe.first();

    if (!(await iframe.isVisible())) {
      return;
    }

    console.log('Iframe is present and visible. Attempting to dismiss it.');

    const closeButton = this.iframeCloseButton.first();

    if (await closeButton.count() === 0 || !(await closeButton.isVisible())) {
      return;
    }

    await closeButton.click();

    await expect(iframe).toBeHidden().then(() => {
      console.log('Iframe has been dismissed successfully.');
    });
  }
}