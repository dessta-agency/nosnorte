# FilterSection

## Responsibility

Collapsible filter group: section title button and expandable body for checkbox or range filters.

## When to use

Use inside product (or similar) filter sidebars to group related options.

## Props

- `title` — section heading.
- `children` — filter controls shown when expanded.
- `defaultOpen` — start expanded (default `false`).
- `activeCount` — number of active options in this section. When greater than `0`, the title stays `primary` (same as hover) and a centered count badge appears beside the title.
- `className` — optional extra classes on the section.

## Behaviour

- Client Component (`"use client"`).
- Toggle expands/collapses with a height transition; collapsed content is `inert`.
- Used by `ProductFilters` for categories, price, brands, and all simulated attribute groups.
