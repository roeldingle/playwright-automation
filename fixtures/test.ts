import { test as base } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';
import { PlaywrightDocsPage } from '../pages/PlaywrightDocsPage';

type Fixtures = {
  homePage: PlaywrightHomePage;
  docsPage: PlaywrightDocsPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new PlaywrightHomePage(page);
    await use(homePage);
  },

  docsPage: async ({ page }, use) => {
    const docsPage = new PlaywrightDocsPage(page);
    await use(docsPage);
  },
});

export { expect } from '@playwright/test';