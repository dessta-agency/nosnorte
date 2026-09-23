---
name: write-tests
description: Add or update tests for an existing feature, component, hook, utility, or bug fix using the testing tools and patterns already established in the project.
disable-model-invocation: true
---

# Write Tests

## Goal

Add meaningful tests for the requested behaviour using the testing stack and conventions already established in the project.

Do not introduce a new testing framework or dependency.

## Investigation

1. Follow all active project rules and documentation requirements.

2. Identify the behaviour that needs to be tested.

3. Inspect the implementation before writing tests.

4. Identify the testing tools already configured in the project.

5. Inspect existing tests that are similar in scope or behaviour.

6. Follow established project patterns for:

   - Test location
   - File naming
   - Test structure
   - Rendering utilities
   - Mocking
   - Fixtures
   - API mocking
   - User interactions
   - Assertions
   - Setup and teardown

7. If no testing infrastructure exists for the requested type of test, do not install one automatically.

Report the limitation instead.

## Test Design

Prioritise behaviour over implementation details.

Test observable outcomes rather than internal implementation whenever possible.

Cover the scenarios that are meaningful for the requested functionality, such as:

- Expected successful behaviour
- Relevant user interactions
- Important conditional behaviour
- Relevant error states
- Relevant empty states
- Regression scenario for a fixed bug
- Important edge cases

Do not create tests purely to increase coverage.

Do not test framework or library behaviour that is outside the application's responsibility.

Avoid brittle tests that depend unnecessarily on:

- Internal component state
- Exact implementation structure
- CSS class names
- Arbitrary timing
- Unrelated DOM structure

Prefer accessible queries and user-visible behaviour for UI tests when supported by the existing test stack.

## Bug Fixes

When tests are requested for a bug fix:

1. Understand the original bug.
2. Add a regression test that would fail with the old behaviour.
3. Verify that it passes with the corrected implementation.
4. Add adjacent scenarios only when they provide meaningful protection.

## Validation

After writing tests:

1. Run the relevant test file or test subset when possible.
2. Fix failures caused by the new tests or implementation where appropriate.
3. Do not modify unrelated production code merely to make a test pass.
4. Check that tests are deterministic.
5. Check for unnecessary mocks.
6. Check for duplicated test setup that existing utilities already solve.

Never claim tests pass unless they were actually executed successfully.

## Output

Provide a concise summary containing:

- Tests added or changed
- Behaviours covered
- Test command executed
- Result of the test run
- Any relevant limitation

Do not report coverage percentages unless they were actually measured.