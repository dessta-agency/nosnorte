# BackToTop

## Responsibility

Fixed control that scrolls the page smoothly back to the top after the visitor has scrolled further down.

## When to use

Render once in the locale layout so it is available on every page.

## When not to use

Do not add per-page copies. Do not use for in-section anchors — prefer normal links/`id` targets.

## Behaviour

- Client Component (`"use client"`).
- Fixed to the bottom-right corner.
- Compact circular control (`h-11`) with a soft dark (`secondary`) fill and `/icons/top.png` (white artwork via `mix-blend-screen`).
- Hidden until scroll passes most of a viewport (~85% of `window.innerHeight`), then fades in.
- Click runs `window.scrollTo({ top: 0, behavior: "smooth" })`.
- Accessible name from `common.back_to_top`.
