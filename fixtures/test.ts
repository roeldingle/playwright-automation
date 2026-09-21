import { test as base } from '@playwright/test';
import { AutomationExerciseAccountApi } from '../api/AutomationExerciseAccountApi';
import { AutomationExerciseAccountPage } from '../pages/AutomationExerciseAccountPage';
import { AutomationExerciseRegistrationPage } from '../pages/AutomationExerciseRegistrationPage';
import { AutomationExerciseHomePage } from '../pages/AutomationExerciseHomePage';

type Fixtures = {
  accountApi: AutomationExerciseAccountApi;
  accountPage: AutomationExerciseAccountPage;
  homePage: AutomationExerciseHomePage;
  registrationPage: AutomationExerciseRegistrationPage;
};

export const test = base.extend<Fixtures>({
  accountApi: async ({ request }, use) => {
    const accountApi = new AutomationExerciseAccountApi(request);
    await use(accountApi);
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AutomationExerciseAccountPage(page);
    await use(accountPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new AutomationExerciseHomePage(page);
    await use(homePage);
  },

  registrationPage: async ({ page }, use) => {
    const registrationPage = new AutomationExerciseRegistrationPage(page);
    await use(registrationPage);
  },
});

export { expect } from '@playwright/test';