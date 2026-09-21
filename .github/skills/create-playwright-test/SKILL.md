---
name: create-playwright-test
description: Create a new Playwright TypeScript UI or API test using this repository's page-object, fixture, test-data, schema, and validation conventions.
---

# Create a Playwright Test

Use this skill whenever adding a new automated test to this repository.

## Required instructions

Before making changes, read and follow the repository's canonical instructions:

- [../../copilot-instructions.md](../../copilot-instructions.md)

Those instructions take precedence over this skill. In particular, preserve strict
TypeScript, deterministic independent tests, semantic locators, fixture-based
dependency injection, explicit cleanup, and targeted validation.

## Repository architecture

Place code in the established directory:

- `tests/ui/` — UI behavior tests
- `tests/api/` — API behavior tests
- `pages/` — reusable UI page objects
- `fixtures/test.ts` — shared Playwright fixtures
- `api/` — reusable API clients
- `models/` — TypeScript request and response types
- `schemas/` — Zod runtime validation
- `test-data/` — reusable data and factories

## Workflow

1. Inspect the existing tests, page objects, fixtures, test data, schemas, and
   configuration related to the behavior.
2. Do not invent selectors, endpoints, URLs, response shapes, or application
   behavior. Confirm them from the application or existing repository code.
3. Add or reuse a page object for UI behavior. Follow the existing page-object
   shape:

   ```typescript
   import { expect, type Locator, type Page } from '@playwright/test';

   export class ExamplePage {
     readonly page: Page;
     readonly heading: Locator;

     constructor(page: Page) {
       this.page = page;
       this.heading = page.getByRole('heading', { name: /example/i });
     }

     async open(): Promise<void> {
       await this.page.goto('/example');
     }

     async expectExamplePage(): Promise<void> {
       await expect(this.page).toHaveURL(/.*example/);
       await expect(this.heading).toBeVisible();
     }
   }
   ```

4. Register new page objects in `fixtures/test.ts` and consume them from tests.
   Do not instantiate page objects directly inside a test.
5. Keep test data separate from test behavior. Use existing data or a factory,
   and generate unique values for records created by the test.
6. Write the test in Arrange → Act → Assert order. Keep the test focused on one
   business behavior.
7. Clean up resources owned by the test. Prefer a `try/finally` block when
   cleanup must happen even after an assertion fails.
8. Use locators in this order:
   role → label → placeholder → text → test id → CSS/XPath only when necessary.
9. Use Playwright auto-waiting and web-first assertions. Never use
   `page.waitForTimeout()` for synchronization.

## UI test template

```typescript
import { test } from '../../fixtures/test';
import { standardUser } from '../../test-data/users';

test('user can complete the example behavior', {
  tag: '@regression',
}, async ({ examplePage }) => {
  const user = {
    ...standardUser,
    email: `example.${Date.now()}@example.com`,
  };

  // Arrange
  await examplePage.open();

  // Act
  await examplePage.performBehavior(user);

  // Assert
  await examplePage.expectBehaviorCompleted();
});
```

Adapt the fixture and data names to the behavior under test. Do not copy this
template if an existing test pattern is more appropriate.

## API test requirements

- Use an existing API client or add one under `api/`.
- Keep request and response types under `models/`.
- Treat API JSON as `unknown` until it is validated with the relevant Zod schema.
- Do not expose passwords, tokens, or other secrets in logs or response models.

## Validation

Run the smallest relevant checks after implementation:

```powershell
npm run typecheck
npx playwright test --list
npx playwright test tests/ui/<new-test>.spec.ts --project=chromium
```

For API tests, run the corresponding targeted test instead. Report failures
honestly; do not hide them with retries, arbitrary waits, or broad catches.

Before finishing, verify:

- The test uses the shared fixture pattern.
- The test is independent and safe for parallel execution.
- Selectors and URLs are supported by the target application.
- No secrets or environment-specific values are committed.
- Owned resources are cleaned up.
- Type-checking and the targeted test pass.
