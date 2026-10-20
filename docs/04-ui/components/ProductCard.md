# ProductCard

## Responsibility

Product grid card: image, brand, title, reference, optional more-options info, availability badge, price or on-request copy, and optional “View options” CTA. Clicking the card opens a product information request dialog.

## When to use

Use inside the products catalog grid to present a single product.

## Content rules

- Image sits in an inner light area inside a white card (no image border).
- Uses the shared media hover (`MEDIA_HOVER_CARD` + `MEDIA_HOVER_MEDIA`): slight card scale-up and image darkening on hover/focus.
- Availability is either **in stock** (green badge) or **on order** (amber badge, `#AD7225`).
- “More options” is informational only (not clickable).
- Clicking the card (keyboard: Enter/Space) opens `ProductInquiryModal`.
- Without options: no action button (card click still opens inquiry).
- With options: outline CTA “View options” opens `ProductOptionsModal` and does not open inquiry (`stopPropagation`).

## Notes

- Client Component (`"use client"`).
- Copy comes from the `products` message namespace.
- Icon: `/icons/arrowright_black.png` (view options CTA only).
