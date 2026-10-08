# EnvironmentsIntro

## Responsibility

Ambientes page intro: section copy on the left and a row of slanted bathroom-style cards on the right, ending with a full-width separator line.

## When to use

Use on the Ambientes listing page, directly below `PageHero` and **outside** `PageContainer` / `Container`, so the card row can bleed to the viewport’s right edge.

## When not to use

- Do not wrap in `PageContainer` or `Container`.
- Do not reuse for the gallery or detail views — those use `EnvironmentsGallery` and `EnvironmentDetailView`.

## Layout

- Text column aligns to the shared proportional grid (`w-[90%]` / `ml-[5%]`, same idea as `Container`).
- Cards sit in a horizontal row with a shared parallelogram clip (diagonal cuts). Neighbouring cards overlap slightly so only a thin gap remains between diagonals.
- A full-width separator (`bg-border/60`, same token strength as `SURFACE_CARD` borders) sits flush under the cards.
- Remaining page sections (gallery) stay inside `Container` below this intro.

## Cards

- Multiple intro cards are supported (data-driven via `getAmbienteIntroCards()` + `ambientes.intro_cards` messages). Cards use bathroom style keys (`contemporanea`, `spa`, `suite`) and the first entries from `AMBIENTE_CATALOG` (same showroom media folder).
- Each card shows number, separator line, title, and subtitle over a cover image (no arrow icon).
- Card text is left-aligned at the bottom inside the parallelogram safe zone. Horizontal text inset uses rem values matched to the diagonal cut. A min-height inner block with top alignment keeps numbers (01, 02, …) aligned across cards; typography scales with card width via container queries.
- **Fixed rem diagonal (not %):** every card uses the same absolute cut in rem (`2.75` / `3.25` / `3.75` / `4.32` across height breakpoints). That keeps the slant angle identical on every card and every width — including intermediate viewports and the wider last card. Overlap uses the matching rem minus a `0.25rem` gap.
- Cards share space with `flex-1` and can shrink so the row never overflows left over the section title. Non-last cards cap at `24rem` / `26rem` (`xl`).
- **Last card rule:** no right-side diagonal cut; from `lg` it may grow to the row’s right edge. Its left cut still uses the same rem as the siblings.

## Props

- `eyebrow` / `title` / `description` / `ctaLabel` / `ctaHref` — intro copy and gallery anchor CTA.
- `cards` — `{ id, title, subtitle, image }[]` resolved on the page from constants + i18n.
