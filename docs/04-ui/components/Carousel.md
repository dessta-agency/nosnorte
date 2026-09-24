# Carousel

## Responsibility

Reusable full-width carousel built with Embla Carousel: autoplay, loop, center dots, and a slide counter.

## When to use

Use for any multi-slide horizontal carousel that needs the shared controls and behaviour.

## When not to use

Do not use for static single images or non-carousel galleries. Prefer simpler markup when interaction is unnecessary.

## Behaviour

- Autoplay delay is configurable (default 5s); loop is optional.
- Dots sit at the bottom centre; the counter (`01 / 03`) sits at the bottom right.
- Slide count comes from React children, not Embla’s snap list, so the counter and dots stay in sync after mount.
- Touch/swipe is provided by Embla.

## Notes

- Client Component (`"use client"`).
- Depends on `embla-carousel-react` and `embla-carousel-autoplay`.
