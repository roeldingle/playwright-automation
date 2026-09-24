import { test as base } from '@playwright/test';
import { AutomationExerciseAccountApi } from '../api/AutomationExerciseAccountApi';
import { AutomationExerciseAccountPage } from '../pages/AutomationExerciseAccountPage';
import { AutomationExerciseRegistrationPage } from '../pages/AutomationExerciseRegistrationPage';

type Fixtures = {
  accountApi: AutomationExerciseAccountApi;
  accountPage: AutomationExerciseAccountPage;
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

  registrationPage: async ({ page }, use) => {
    const registrationPage = new AutomationExerciseRegistrationPage(page);
    await use(registrationPage);
  },
});

export { expect } from '@playwright/test';