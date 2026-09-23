---
name: review-changes
description: Review the current code changes for correctness, regressions, maintainability, accessibility, consistency, and unnecessary complexity without modifying the code.
disable-model-invocation: true
---

# Review Changes

## Goal

Review the current implementation before it is considered complete.

This is a review-only workflow.

Do not modify code unless the user explicitly asks for fixes after the review.

## Scope

Focus primarily on the changes made for the current task.

Inspect surrounding code only when necessary to understand the impact of those changes.

Do not perform a general audit of the entire project unless explicitly requested.

## Workflow

1. Follow all active project rules and documentation requirements.

2. Identify the files and behaviour changed by the current task.

3. Understand the intended behaviour before evaluating the implementation.

4. Review the changes for:

   - Functional correctness
   - Behavioural regressions
   - Incorrect assumptions
   - Missing edge cases
   - Type safety
   - Unnecessary state or effects
   - Incorrect React patterns
   - Duplicated logic
   - Unnecessary abstractions
   - Existing utilities, hooks, or components that should have been reused
   - Dead or obsolete code
   - Temporary debugging code
   - Unused imports or variables
   - Error handling
   - Loading states
   - Empty states
   - Accessibility
   - Responsive behaviour
   - Visual consistency
   - Consistency with existing project architecture and conventions

5. Check whether the implementation introduced changes outside the requested scope.

6. Check whether documentation should have been updated according to the project rules.

7. When appropriate and available, inspect:

   - TypeScript errors
   - Lint results
   - Existing tests
   - Browser console errors
   - Relevant network failures

8. Do not invent theoretical problems with no realistic impact.

9. Prioritise concrete issues that can affect correctness, maintainability, user experience, or future development.

## Severity

Classify findings when useful as:

- Critical — likely to break functionality, data, or a core user flow.
- Important — meaningful bug, regression, accessibility problem, or maintainability issue.
- Minor — small improvement with limited impact.

Do not exaggerate severity.

## Output

If issues are found, report each issue with:

- Severity
- File or affected area
- Problem
- Why it matters
- Recommended correction

If no meaningful issues are found, state that clearly.

Do not modify the implementation during this workflow.
Do not produce positive commentary unless it provides useful technical context.