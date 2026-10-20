# ProductOptionsModal

## Responsibility

Product options dialog built on `Modal`, aligned with a product-detail style layout: large image, title, reference, availability, price or on-request copy, quantity, optional color choices, and a product information section.

## When to use

Opened from `ProductCard` when the product has additional options and the visitor chooses “View options”.

## Props

- `product`: product data to display (including optional `sku`, `unit`, `colorOptions`).
- `isOpen` / `onClose`: dialog visibility control.
- `onRequestInfo`: optional callback for the “Request information” link (typically closes options and opens `ProductInquiryModal`).

## Layout

- Two columns on large screens: image left, details right.
- Color options are always visible as selectable chips (not a dropdown or accordion).
- “Product information” lists SKU, brand, and unit without row dividers.
- “Request information” is a primary text link below quantity.

## Notes

- Client Component (`"use client"`).
- Does not own catalog or cart state; quantity/color selection is UI-only until a real order flow exists.
- Uses a wider modal (`max-w-5xl`) with the dialog title visually hidden; the product title is the accessible name.
- Quantity/color selection resets each time the dialog opens.
