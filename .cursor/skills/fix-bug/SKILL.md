---
name: fix-bug
description: Investigate and fix a bug by tracing the affected flow, identifying the root cause, applying the smallest safe correction, and validating against regressions.
disable-model-invocation: true
---

# Fix Bug

## Goal

Identify the root cause of the reported bug before changing code and implement the smallest safe correction.

Do not apply speculative fixes.

## Investigation

1. Follow all active project rules and documentation requirements.

2. Understand:

   - Expected behaviour
   - Actual behaviour
   - Conditions under which the bug occurs

3. Inspect the affected component, page, or feature.

4. Trace the relevant flow as necessary, including:

   - Props
   - State
   - Hooks
   - Effects
   - Event handlers
   - API calls
   - Services
   - Context or global state
   - Parent components
   - Child components
   - Utilities
   - Types
   - Data transformations

5. Inspect related implementations when useful for comparison.

6. Identify the root cause before modifying code.

7. Distinguish the root cause from symptoms produced by the root cause.

8. Do not change code merely because it appears suspicious.

## Fix

Once the root cause has been identified:

1. Implement the smallest safe correction.

2. Keep the fix within the affected scope.

3. Do not perform unrelated refactors.

4. Preserve existing behaviour outside the bug scenario.

5. Reuse existing project patterns.

6. Do not introduce new dependencies unless explicitly approved.

## Validation

After applying the fix:

1. Verify the original bug scenario.

2. Verify the expected behaviour.

3. Check closely related scenarios for regressions.

4. Check TypeScript errors.

5. Check linting when tooling is available.

6. Run relevant existing tests when appropriate.

7. If the bug affects UI behaviour and browser tools are available, reproduce and verify the behaviour in the application when practical.

8. Ensure no temporary debugging code remains.

Never claim that the bug is fixed unless the relevant behaviour was actually validated.

## Documentation

Follow the project's documentation rules.

Update documentation only when the fix changes documented behaviour, architecture, conventions, or relevant technical information.

Routine bug fixes should not create unnecessary decision records.

## Output

After completing the work, provide a concise explanation containing:

- Root cause
- Fix applied
- Validation performed

Mention unresolved uncertainty only if it materially affects confidence in the fix.