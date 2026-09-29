# PageContainer

## Responsibility

Wraps each page’s main content with the shared layout grid and consistent top spacing, aligned with the navbar.

## When to use

Use as the root wrapper for page content on **every page except the homepage**, so content aligns with the navbar and footer via the shared `Container` grid.

## When not to use

- Do not use on the homepage when the only content is the full-bleed `HeroCarousel`.
- Do not wrap full-bleed heroes (`HeroCarousel`, `PageHero`) inside `PageContainer` — keep those outside and put body sections inside `PageContainer`.

## Notes

- Provides consistent top and bottom spacing for standard page content.
- Side spacing comes from `Container`; changing `Container` updates navbar, footer, and all `PageContainer` pages together.
