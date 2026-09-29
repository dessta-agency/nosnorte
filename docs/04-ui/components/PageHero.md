# PageHero

## Responsibility

Shared full-bleed page hero for content pages: background image, gradient overlays, eyebrow, title, and subtitle.

## When to use

Use at the top of content pages (History, Contacts, Showroom, and similar) that need an edge-to-edge hero above body sections wrapped in `PageContainer`.

## When not to use

- Do not use on the homepage — that uses `HeroCarousel`.
- Do not wrap in `PageContainer` or `Container`.
- Do not invent a different horizontal inset — use `FULL_BLEED_HERO_INSET` so spacing matches `HeroCarousel`.

## Layout

- Stays full-bleed; text uses `FULL_BLEED_HERO_INSET` from `constants/layout.ts` (same as the homepage carousel).
- On the page: render `PageHero` first, then wrap remaining sections in `PageContainer`.

## Props

- `title` / `subtitle` — required copy (from page message namespaces).
- `eyebrow` (optional) — typically `common.company_name`.
- `backgroundImage` (optional) — defaults to `/images/backgrounds/background.png`; each page passes its own image.
