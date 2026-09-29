# Container

## Responsibility

Centers content on a shared horizontal grid with proportional side spacing on every screen size.

## When to use

Wrap primary layout content (navbar inner content, page sections) that must align to the same horizontal grid.

## When not to use

Do not use for full-bleed backgrounds, edge-to-edge media, or elements that must span the full viewport. Keep full-bleed outside and place `Container` only around constrained content.

## Notes

- Side spacing stays proportional to the viewport (currently `w-[90%]` plus horizontal padding). Avoid a fixed max-width cap — it would break that proportion on large screens.
- Navbar, Footer, and `PageContainer` must all use this component so chrome and page content stay aligned.
- Full-bleed heroes do **not** use `Container` for their text; they use the shared hero inset (`FULL_BLEED_HERO_INSET`).
