# Style Guide

UI/UX guidelines for visual and behavioral consistency across the interface.

## Language

- Present user-facing text in Portuguese, consistent with the application language (`pt`).

## Design Tokens

- Use semantic color tokens (`primary`, `error`, `success`, etc.) — never hardcoded hex values or arbitrary colors in components.

- Apply tokens by role:
  - `primary` — main actions, links, and key highlights
  - `secondary` — secondary actions and subtle backgrounds
  - `muted` — secondary text and placeholders
  - `success` / `error` / `warning` — user feedback only, not decoration
  - `background` / `foreground` — base page colors
  - `border` — borders and dividers

- Customize token values in `app/globals.css` to match each project's visual identity.

- Use `font-sans` for body text and `font-mono` for code; customize font families in `globals.css` per project.

## Layout and Hierarchy

- Use one primary heading (`h1`) per page or main view.

- Follow heading levels in order; do not skip levels for visual styling alone.

- Keep page structure semantic: wrap primary content in `main`, with clear separation between layout regions (header, content, footer) when they exist.

- Align related content consistently within a page; avoid mixing unrelated alignment patterns in the same section.

## Spacing and Visual Consistency

- Keep spacing between similar elements consistent across the interface.

- Use the same visual weight for elements with the same role (e.g. all primary actions share the same emphasis).

- Reuse existing component categories (`ui`, `layout`, `forms`, `features`) for recurring interface patterns instead of creating one-off variants.

## Interactive States

- Interactive elements must have clearly distinct states: default, hover, focus, and disabled.

- Disabled elements must look inactive and must not appear actionable.

- Loading states must be visible while an action or content is in progress.

- Error and empty states must be explicit; do not leave users on a blank or unchanged screen without explanation.

## User Feedback

- Confirm successful actions with clear, concise feedback placed near the action that triggered them.

- Show errors close to the affected field, control, or section — not only at the top of the page.

- Validation messages must state what went wrong and what the user should do next.

- Do not rely on color alone to communicate success, error, or required status.

## Accessibility

- Ensure text and interactive elements have sufficient contrast against their background.

- All interactive elements must have a visible focus state.

- Interactive elements must be operable by keyboard where applicable.

- Provide accessible names for controls and images (labels, `alt` text, or equivalent context).
