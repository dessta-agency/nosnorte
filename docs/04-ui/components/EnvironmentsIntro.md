# EnvironmentsIntro

## Responsibility

Ambientes page intro: section copy on the left and a row of slanted category cards on the right, ending with a full-width separator line.

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

- Multiple intro cards are supported (data-driven via `AMBIENTE_INTRO_CARDS` + `ambientes.intro_cards` messages).
- Each card shows number, separator line, title, and subtitle over a cover image (no arrow icon).
- Card text is left-aligned at the bottom. A fixed-height inner block with top alignment keeps numbers (01, 02, …) on the same horizontal line across cards even when titles/subtitles wrap to different lengths.
- **Last card rule:** the last card in the row has no right-side diagonal cut and grows to the viewport’s right edge. With the current three category cards, that is the third card; if the count changes, the same rule still applies to whichever card is last.

## Props

- `eyebrow` / `title` / `description` / `ctaLabel` / `ctaHref` — intro copy and gallery anchor CTA.
- `cards` — `{ id, title, subtitle, image }[]` resolved on the page from constants + i18n.
