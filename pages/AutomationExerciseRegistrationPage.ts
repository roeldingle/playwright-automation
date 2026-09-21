/*
This file is part of the Playwright Automation project.
It defines the AutomationExerciseRegistrationPage class, which represents the registration page of the Automation Exercise website.
The class provides methods to interact with the registration page, such as filling out the registration form and submitting it.
ref: /signup
*/
import { expect, type Locator, type Page } from '@playwright/test';
import type { CreateUserRequest } from '../models/user-request';

export class AutomationExerciseRegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly genderRadio: Locator;
  readonly passwordInput: Locator;
  readonly birthDaySelect: Locator;
  readonly birthMonthSelect: Locator;
  readonly birthYearSelect: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly phoneInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeading: Locator;
  readonly continueLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailInput = page
      .locator('.signup-form')
      .getByRole('textbox', { name: 'Email Address' });
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.genderRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.birthDaySelect = page.locator('#days');
    this.birthMonthSelect = page.locator('#months');
    this.birthYearSelect = page.locator('#years');
    this.firstnameInput = page.locator('#first_name');
    this.lastnameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.addressInput = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipInput = page.locator('#zipcode');
    this.phoneInput = page.locator('#mobile_number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedHeading = page.getByRole('heading', { name: 'Account Created!' });
    this.continueLink = page.getByRole('link', { name: 'Continue' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async startRegistration(user: CreateUserRequest): Promise<void> {
    await this.nameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
    await expect(this.page).toHaveURL(/\/signup$/);
  }

  async completeRegistration(user: CreateUserRequest): Promise<void> {
    await this.genderRadio.check();
    await this.passwordInput.fill(user.password);
    await this.birthDaySelect.selectOption(String(user.birth_date));
    await this.birthMonthSelect.selectOption(String(user.birth_month));
    await this.birthYearSelect.selectOption(String(user.birth_year));
    await this.firstnameInput.fill(user.firstname);
    await this.lastnameInput.fill(user.lastname);

    if (user.company) {
      await this.companyInput.fill(user.company);
    }

    await this.addressInput.fill(user.address1);
    if (user.address2) {
      await this.address2Input.fill(user.address2);
    }
    await this.countrySelect.selectOption({ label: user.country });
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipInput.fill(user.zipcode);
    await this.phoneInput.fill(user.mobile_number);
    await this.createAccountButton.click();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account_created$/);
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async continueAfterCreation(): Promise<void> {
    await this.continueLink.click();
    await expect(this.deleteAccountLink).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await expect(this.page).toHaveURL(/\/delete_account$/);
  }
}
