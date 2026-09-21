# Playwright + TypeScript Automation Instructions

## Core principles

- Use strict TypeScript and existing naming conventions.
- Keep tests independent, deterministic, and focused on business behavior.
- Prefer stable, semantic locators and web-first assertions.
- Reuse existing framework components before adding abstractions.
- Do not invent endpoints, selectors, or application behavior.
- Never hard-code credentials, tokens, or environment-specific URLs.

## Project architecture

Keep responsibilities clear and discoverable:

- `tests/` — business-focused tests
- `pages/` — reusable UI behavior and Page Objects
- `fixtures/` — dependency injection and lifecycle setup/cleanup
- `api/` — HTTP client layer and request logic
- `models/` — compile-time TypeScript types
- `schemas/` — runtime validation for JSON/contracts
- `test-data/` — reusable fixtures, factories, and generated data
- `config/` — environment setup and configuration
- `.github/` — CI workflow and Copilot instructions

## Test design standards

- Write tests in the Arrange → Act → Assert rhythm whenever possible.
- Prefer locators in this order: role → label → placeholder → text → test id → CSS/XPath as a last resort.
- Prefer Playwright's built-in auto-waiting and web-first assertions such as `toBeVisible()`, `toHaveText()`, and `toHaveURL()`.
- Never use `page.waitForTimeout()` as a normal synchronization mechanism.
- Wait for observable conditions, not arbitrary time.
- Keep API JSON as `unknown` until runtime validation.
- Validate response contracts where behavior depends on them.
- Use unique test data for parallel execution and clean up owned resources in `finally` blocks.
- Do not create cross-test dependencies or shared mutable state without explicit ownership and cleanup.

## Architecture rules

- Page Object = reusable UI behavior.
- Fixture = dependency injection and lifecycle management.
- API Client = HTTP behavior and response handling.
- Type = compile-time safety.
- Runtime schema = validation of actual runtime data.
- Use fixtures for setup and teardown; do not hide lifecycle logic inside a test.
- Keep test data generation separate from business assertions.
- Prefer API setup when UI setup is not part of the behavior under test.
- Keep tests readable and maintainable; avoid unnecessary abstraction.

## Reliability and debugging

- Do not hide flaky tests with retries or arbitrary waits.
- Favor stable locators and real observable conditions.
- Investigate root causes before increasing timeouts or adding retries.
- When a test fails, inspect the failing assertion, locator, runtime state, and network/API evidence.
- Use targeted validation after changes instead of broad, noisy test runs.

## Security and configuration

- Never commit secrets, passwords, tokens, or session data.
- Keep credentials in environment variables or CI secret management.
- Ignore committed secrets and local environment files such as `.env`, `.env.local`, `.playwright/.auth/`, and generated reports.
- Never log sensitive fields or auth data to console output or CI artifacts.
- Test authentication and authorization at backend boundaries, not just UI visibility.
- Do not expose passwords or sensitive request fields in response models.

## AI / Copilot guardrails

- Review the repository architecture before generating changes.
- Reuse existing Page Objects, fixtures, API clients, and test patterns.
- Prefer explicit reasoning over guesswork: explain why a locator, fixture scope, or abstraction was chosen.
- Do not accept generated code that invents selectors, endpoints, or application behavior.
- Treat AI as an assistant, not a replacement for engineering review.
- Validate generated changes with typecheck and targeted tests before considering them ready.

## Prompting pattern for AI-assisted work

Use this structure when asking Copilot to generate or review code:

- Context: Review the existing Playwright + TypeScript framework first.
- Constraints: Reuse Page Objects and fixtures; no `waitForTimeout`; stable semantic locators; independent, parallel-safe tests; do not invent selectors or endpoints.
- Task: Add or fix the behavior under test.
- Validation: Run `npm run typecheck`, `npx playwright test --list`, and relevant targeted tests. Report failures instead of hiding them.

## Required workflow

1. Analyze only.
   - Identify the current architecture, reusable components, reliability risks, and the smallest necessary change.
2. Implement.
   - Make the approved change using the existing framework patterns.
3. Validate.
   - Run `npm run typecheck` and the relevant targeted Playwright checks.
   - Summarize the files changed, validation performed, and any unresolved risks.

## Validation checklist

Before accepting AI-generated or hand-written changes, confirm all of the following:

- Strict TypeScript is maintained.
- Tests remain independent and deterministic.
- Semantic locators are used instead of brittle positional selectors.
- No arbitrary waits are used for synchronization.
- Page Objects and fixtures are reused appropriately.
- API behavior is separated from UI behavior.
- Runtime schemas validate important data contracts.
- Secrets remain out of source control and logs.
- Targeted validation passes and failures are surfaced honestly.
