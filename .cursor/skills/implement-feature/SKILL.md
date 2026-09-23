---
name: implement-feature
description: Implement a frontend feature, component, page change, or behaviour while following the existing project architecture, patterns, and documentation.
disable-model-invocation: true
---

# Implement Feature

## Goal

Implement the requested feature using the smallest appropriate change while respecting the existing project architecture, patterns, components, and behaviour.

## Workflow

1. Follow all active project rules and documentation requirements.

2. Understand the requested behaviour and the affected area of the application.

3. Inspect the target page, component, or feature before modifying it.

4. Search the existing codebase for similar implementations when relevant.

5. Before creating something new, check whether the project already provides:

   - Components
   - Hooks
   - Utilities
   - Types
   - Services
   - API clients
   - Styling patterns
   - Layout patterns
   - State management patterns

6. Prefer reusing established implementations and patterns over creating new abstractions.

7. Determine the smallest set of files and changes required.

8. Implement the requested behaviour.

9. Do not introduce unrelated refactors or improvements.

10. Do not change existing behaviour outside the requested scope.

11. Do not introduce new dependencies unless explicitly approved by the user.

## UI Changes

When the task affects the UI:

1. Maintain consistency with the existing interface.
2. Preserve responsive behaviour.
3. Preserve accessibility.
4. Reuse existing design tokens and components.
5. Do not introduce subjective visual changes that were not requested.

If browser tools are available, verify the affected UI in the running application when practical.

## Validation

After implementation:

1. Review all modified files.
2. Check for TypeScript errors.
3. Check linting when tooling is available.
4. Run relevant existing tests when appropriate.
5. Verify the requested behaviour.
6. Check the affected area for obvious regressions.
7. Remove temporary debugging code.
8. Ensure no TODOs or incomplete implementation remain.

Never claim that something was tested or validated unless it was actually performed.

## Documentation

Follow the project's documentation rules.

If the implementation affects documented behaviour, architecture, conventions, or functionality, update the relevant documentation.

## Output

Provide a concise final response containing:

- What was implemented
- The main files or areas changed
- What validation was actually performed
- Any relevant unresolved issue or limitation

Do not provide unnecessary implementation commentary.