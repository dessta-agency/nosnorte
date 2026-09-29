# ProductCard

## Responsibility

Product grid card: image, brand, title, reference, optional more-options info, availability badge, price or on-request copy, and CTA.

## When to use

Use inside the products catalog grid to present a single product and its primary actions.

## Content rules

- Image sits in an inner light area inside a white card (no image border, no hover zoom).
- Availability is either **in stock** (green badge) or **on order** (amber badge, `#AD7225`).
- “More options” is informational only (not clickable).
- Without options: primary CTA “Add to order” with shop icon.
- On add, the button transitions progressively to green with “Added”, then returns to the default CTA after a short delay.
- With options: outline CTA “View options” opens `ProductOptionsModal`.

## Notes

- Client Component (`"use client"`).
- Copy comes from the `products` message namespace.
- Icons: `/icons/shop.png`, `/icons/arrowright_black.png`.
