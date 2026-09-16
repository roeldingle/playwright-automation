import { test as base } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';
import { PlaywrightDocsPage } from '../pages/PlaywrightDocsPage';
import { UsersApi } from '../api/UsersApi';

type Fixtures = {
  homePage: PlaywrightHomePage;
  docsPage: PlaywrightDocsPage;
  usersApi: UsersApi;
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

  usersApi: async ({ request }, use) => {
    const usersApi = new UsersApi(request);
    await use(usersApi);
  }
});

export { expect } from '@playwright/test';