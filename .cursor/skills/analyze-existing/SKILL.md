---
name: analyze-existing
description: Analyze an existing page, component, feature, or implementation to understand how it works and retain that context for a follow-up task.
disable-model-invocation: true
---

# Analyze Existing Implementation

## Goal

Understand an existing implementation deeply enough to use it as context for a subsequent task.

This is an analysis-only workflow.

Do not modify code.

## Workflow

1. Follow all active project rules and documentation requirements.

2. Locate the page, component, feature, or implementation specified by the user.

3. Inspect the target implementation and only the connected files necessary to understand how it works.

4. Understand the relevant implementation details, including when applicable:

   - Component structure
   - Props
   - Types
   - Local state
   - Hooks
   - Context or global state
   - Data flow
   - API calls and services
   - Event handlers
   - Side effects
   - Child components
   - Parent dependencies
   - Utilities
   - Styling
   - Loading, error, and empty states
   - Relevant business logic

5. Inspect similar or related implementations only when they help explain the target implementation.

6. Identify which parts of the implementation are reusable or establish a project pattern.

7. Do not refactor, fix, improve, or modify anything during this workflow.

8. Do not produce a summary of the implementation unless the user explicitly requests one.

9. Retain the gathered context for the user's next instruction in the current conversation.

## Output

When the analysis is complete, respond only with a short confirmation that the implementation has been understood.

Do not provide an unsolicited explanation or summary.