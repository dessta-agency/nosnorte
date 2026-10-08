# HeroCarousel

## Responsibility

Homepage hero: full-bleed image slides with overlay, eyebrow, title, description, and CTA, using the shared `Carousel` and `Button` (`variant="primary"`, `showArrow`).

## When to use

Use as the primary visual on the home page (`app/[locale]/page.tsx`).

## When not to use

Do not wrap in `PageContainer` or `Container` — the hero must stay full-bleed. Do not reuse as a generic in-page carousel; compose `Carousel` instead.

## Layout

- Height is `calc(100dvh - 5.5rem)` so the hero fills the viewport below the unscrolled navbar (`pt-2` + `h-20`).
- Content is left-aligned over a left/bottom gradient overlay.
- Horizontal text inset uses `FULL_BLEED_HERO_INSET` (`constants/layout.ts`) — the same inset as `PageHero`. Keep them in sync.
- Images live under `public/images/home/`.
- The first slide image uses `priority` (eager LCP load). Later slides stay lazy so they do not compete with the initial paint.

## Internationalization

- Copy comes from the `hero.slides` message namespace (`eyebrow`, `title`, `description`, `cta`).
- CTA destinations live in `SLIDES_DATA` (`href`): slide 1 → `/produtos`, slide 2 → `/ambientes`, slide 3 → `/showroom`.
- Titles and related display text use `font-display` (DM Serif Display).
