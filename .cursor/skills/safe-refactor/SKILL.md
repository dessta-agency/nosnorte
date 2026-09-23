---
name: safe-refactor
description: Refactor existing code while preserving current behaviour, public interfaces, and user experience unless a specific behavioural change is explicitly requested.
disable-model-invocation: true
---

# Safe Refactor

## Goal

Improve the internal structure or maintainability of existing code without unintentionally changing behaviour.

Preserving behaviour is the default priority.

## Investigation

Before modifying code:

1. Follow all active project rules and documentation requirements.

2. Inspect the complete area affected by the proposed refactor.

3. Understand the current responsibilities and behaviour.

4. Identify:

   - Inputs
   - Outputs
   - Props
   - Public interfaces
   - State
   - Side effects
   - API interactions
   - Dependencies
   - Consumers
   - Relevant hooks
   - Relevant utilities
   - Relevant tests

5. Search for other consumers of anything that may be changed, moved, renamed, or extracted.

6. Identify the behavioural invariants that must remain unchanged.

## Refactor Plan

Before making significant structural changes, determine:

- What is being changed
- Why the refactor is useful
- What behaviour must remain unchanged
- Which files or consumers can be affected

Avoid broad refactors when a smaller change achieves the same objective.

## Implementation

During the refactor:

1. Preserve existing behaviour unless the user explicitly requests otherwise.

2. Preserve existing public APIs when practical.

3. Avoid unrelated cleanup.

4. Avoid changing UI or UX.

5. Avoid changing business logic.

6. Avoid introducing new dependencies.

7. Prefer existing project patterns over new abstractions.

8. Extract abstractions only when they remove meaningful duplication or clarify responsibility.

9. Do not create generic abstractions for hypothetical future requirements.

10. Keep naming consistent with the existing codebase.

11. Update all affected consumers when moving, renaming, or changing shared code.

## Validation

After the refactor:

1. Compare the resulting behaviour with the behaviour identified before the refactor.

2. Run relevant existing tests when available.

3. Check TypeScript errors.

4. Check linting when tooling is available.

5. Verify affected user flows when appropriate.

6. Check for broken imports or consumers.

7. Check for dead code left behind by the refactor.

8. Check for duplicated logic that the refactor intended to remove.

9. Ensure no temporary code or debugging statements remain.

Never claim behaviour was preserved unless it was reasonably validated.

## Documentation

Update documentation only when the refactor changes:

- Architecture
- Established patterns
- Public interfaces
- Relevant technical conventions

Do not update documentation for purely internal implementation changes that do not affect documented concepts.

## Output

Provide a concise summary containing:

- What was refactored
- Why
- What behaviour was preserved
- Validation performed
- Any relevant risk or limitation