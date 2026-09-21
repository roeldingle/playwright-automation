/*
This file is part of the Playwright Automation project.
It defines the AutomationExerciseAccountPage class, which represents the account page or login/signup page of the Automation Exercise website.
The class provides methods to interact with the account page, such as logging in, logging out, and deleting an account.
ref: /login, /signup, /delete_account
*/
import { expect, type Locator, type Page } from '@playwright/test';
import type { CreateUserRequest } from '../models/user-request';

export class AutomationExerciseAccountPage {
  readonly page: Page;
  readonly loggedInUserText: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly accountDeletedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInUserText = page.getByText(/Logged in as/i);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.loginEmailInput = page
      .locator('.login-form')
      .getByRole('textbox', { name: 'Email Address' });
    this.loginPasswordInput = page
      .locator('.login-form')
      .getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.accountDeletedHeading = page.getByRole('heading', { name: 'Account Deleted!' });
  }

  async expectLoggedInAs(user: CreateUserRequest): Promise<void> {
    await expect(this.loggedInUserText).toContainText(user.name);
  }

  async openLogin(): Promise<void> {
    await this.page.goto('/login');
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async login(user: CreateUserRequest): Promise<void> {
    await this.loginEmailInput.fill(user.email);
    await this.loginPasswordInput.fill(user.password);
    await this.loginButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await expect(this.page).toHaveURL(/\/delete_account$/);
    await expect(this.accountDeletedHeading).toBeVisible();
  }
}
