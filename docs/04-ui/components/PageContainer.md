# PageContainer

## Responsibility

Wraps each page’s main content with the shared layout grid and consistent top spacing, aligned with the navbar.

## When to use

Use as the root wrapper for page content that should align to the shared grid (`children` go inside it).

## When not to use

Do not use for full-bleed sections that must escape the shared grid (e.g. the homepage `HeroCarousel`). Keep those outside `PageContainer`.

## Notes

Temporarily uses a `1px solid black` border for layout construction; remove when layout work is done.
