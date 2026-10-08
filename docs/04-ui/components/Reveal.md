# Reveal

## Responsibility

Scroll-triggered (or immediate) enter animation for page sections and gallery tiles. Reveals children once when they enter the viewport.

## When to use

- Wrap individual gallery tiles so content appears as the visitor scrolls (`EnvironmentsGallery`, `ShowroomGallery`).
- Wrap below-the-fold page sections that should fade/slide in once.
- Use `immediate` for content that must be visible on first paint (for example the first showroom tiles below the hero). Do **not** wrap an entire above-the-fold grid in a non-immediate `Reveal` — that leaves a blank/white block until scroll.

## When not to use

- Do not wrap a whole page’s primary content in one scroll `Reveal` when that content should be visible immediately after the hero.
- Do not use for micro-interactions (hover, focus, button feedback).

## Props

- `children` — content to reveal.
- `variant` — `"fade-up"` (default) or `"fade"`.
- `delayMs` — optional transition delay.
- `durationMs` — enter duration in ms (default `1000`). Gallery tiles typically use `2200`.
- `threshold` — intersection fraction `0`–`1` (default `0`). Gallery tiles typically use `0.2`.
- `immediate` — when `true`, content starts visible (no scroll wait).
- `className` — optional classes on the wrapper (e.g. `h-full` inside grid cells).

## Behaviour

- Client Component (`"use client"`).
- Uses `IntersectionObserver` once, then disconnects.
- Honours `prefers-reduced-motion` via Tailwind `motion-reduce` utilities.
