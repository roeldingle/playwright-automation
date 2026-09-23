---
name: playwright-check
description: Validate modified Playwright and TypeScript automation code with type checking, test discovery, targeted tests, and a reliability review.
---

# Playwright Check

Use this skill whenever Playwright or TypeScript automation code is modified.

## Required instructions

Before reviewing or validating changes, read and follow the repository's
canonical instructions:

- [../../copilot-instructions.md](../../copilot-instructions.md)

Preserve strict TypeScript, deterministic independent tests, semantic locators,
fixture-based dependency injection, explicit cleanup, runtime contract
validation, and CI-compatible commands.

## Workflow

1. Inspect the complete change set.
   - Review modified files and their surrounding architecture.
   - Check related page objects, fixtures, API clients, models, schemas,
     configuration, and test data.
   - Do not limit the review to the changed lines when a change affects shared
     behavior.
2. Run the required validation commands whenever Playwright or TypeScript
   automation code changed:

   ```powershell
   npx tsc --noEmit
   npx playwright test --list
   ```

   Report command failures explicitly. Do not hide failures with retries,
   arbitrary waits, broad catches, or skipped tests.
3. Determine the smallest relevant Playwright test suite from the changed
   behavior.
   - Prefer a directly affected test file or focused project/tag selection.
   - For page-object, fixture, API-client, schema, or configuration changes,
     include the tests that consume the changed shared component.
   - Run the targeted suite with the repository's configured Playwright
     projects when applicable.
4. Review the changes for the checklist below.
5. Produce a final PASS/FAIL validation report.

## Review checklist

### Test reliability and design

- Locators use the strongest available semantic strategy:
  role, label, placeholder, text, test id, then CSS/XPath only when necessary.
- No `page.waitForTimeout()` is used for synchronization.
- Assertions are web-first and verify observable behavior with Playwright
  assertions such as `toBeVisible`, `toHaveText`, or `toHaveURL`.
- Tests are independent, deterministic, parallel-safe, and clean up resources
  they own.
- Fixtures are used at the correct scope and provide dependency injection
  rather than hiding lifecycle logic in tests.
- Page Object responsibilities remain in page objects; tests express business
  behavior rather than implementation details.
- Changes do not introduce timing assumptions, shared mutable state, order
  dependence, unnecessary retries, or other flaky-test risks.

### API and data contracts

- Existing API clients and shared helpers are reused; duplicated HTTP behavior
  is not added.
- API JSON remains `unknown` until it is validated with the appropriate runtime
  schema.
- Compile-time models and runtime schemas stay aligned.
- Endpoints, response shapes, selectors, URLs, and application behavior are
  confirmed from repository code rather than invented.

### Security and delivery

- No credentials, tokens, passwords, session data, or environment-specific
  secrets are committed or logged.
- Configuration continues to work in CI, including the Node version,
  dependency installation, browser projects, environment variables, and
  non-interactive commands.
- Changes preserve the existing test and fixture architecture and do not add
  machine-specific assumptions.

## Final report format

End with a concise report using this structure:

```text
Playwright validation: PASS | FAIL

TypeScript:
- npx tsc --noEmit: PASS | FAIL

Test discovery:
- npx playwright test --list: PASS | FAIL

Relevant suite:
- Command: <exact command>
- Result: PASS | FAIL | NOT RUN

Review:
- Unstable locators: None | <finding>
- waitForTimeout: None | <finding>
- Missing web-first assertions: None | <finding>
- Test isolation: PASS | FAIL | <finding>
- Fixture usage: PASS | FAIL | <finding>
- Page Object boundaries: PASS | FAIL | <finding>
- API client duplication: None | <finding>
- Runtime schema validation: PASS | FAIL | <finding>
- Secrets: None | <finding>
- CI compatibility: PASS | FAIL | <finding>
- Flaky-test risks: None | <finding>

Unresolved risks:
- None | <risk>
```

Use `FAIL` if a required command fails, the relevant suite fails, or a
blocking checklist issue is found. If a relevant suite cannot be run, mark it
`NOT RUN`, explain why, and mark the overall validation `FAIL` unless the
repository's configuration clearly makes that suite unavailable by design.
