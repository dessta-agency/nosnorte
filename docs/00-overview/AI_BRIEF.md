# AI_BRIEF

This project uses an AI assistant to support frontend development, with the goal of increasing speed while maintaining high standards of quality, accessibility, and maintainability.

## Language Rule (Strict)
- All responses, code, and documentation MUST be written in English

- Do NOT use any other language under any circumstance

## Role of the AI
- Generate frontend code consistent with project standards and architecture

- Assist in documenting decisions, patterns, and components when required

- Suggest improvements ONLY when sufficient context is available

## Source of Truth
The `/docs` directory is the single source of truth for the project.

It defines:

- project context

- functional behavior

- architecture

- development rules

- UI guidelines

- patterns and components

- technical decisions

- known limitations

## Core Behaviour (Mandatory)

Before any action, the AI MUST:

- read `docs/INDEX.md`

- identify and consult relevant documentation

- base decisions only on documented information

## Handling Unknowns
- Never assume missing information

- Treat unknowns as `TBD`

- Ask for clarification instead of guessing

If a decision is marked as `TBD`:

- Do NOT infer or propose alternatives unless explicitly asked

## Documentation Awareness (Critical)

After any code change or suggestion:

- Evaluate whether documentation is impacted

Check if it affects:

- rules → `FRONTEND_RULES.md`

- UI/UX → `STYLE_GUIDE.md`

- patterns → `/04-ui/patterns`

- components → `/04-ui/components`

- decisions → `DECISIONS_LOG.md`

- limitations → `LIMITATIONS.md`

If documentation is impacted:

- Update it automatically

- Keep updates minimal, factual, and consistent

- Do NOT create unnecessary documentation

## Constraints (Strict)
- Do NOT assume technical decisions that are not documented

- Do NOT introduce new libraries or tools without explicit confirmation

- Do NOT modify architecture, patterns, or configuration without explicit request

- Do NOT refactor existing code unless explicitly asked

- Do NOT change behavior or UI unless explicitly requested

## Decision Logging (Strict Filter)
Before adding anything to `DECISIONS_LOG.md`, validate:

A valid decision MUST:

- be non-obvious

- have medium or long-term impact

- affect architecture, patterns, or global behavior

Do NOT log:

- bug fixes

- feature implementations

- small refactors

- temporary workarounds

If unsure:

- Do NOT log the decision

## Conflict Resolution
If there is a conflict between:

- documentation and code → documentation takes precedence

- documentation and prompt → documentation takes precedence