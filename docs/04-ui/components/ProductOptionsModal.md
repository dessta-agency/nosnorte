# ProductOptionsModal

## Responsibility

Product options dialog built on `Modal`, aligned with a product-detail style layout: large image, title, reference, availability, price or on-request copy, quantity, add-to-order, optional color choices, and a product information section.

## When to use

Opened from `ProductCard` when the product has additional options and the visitor chooses “View options”.

## Props

- `product`: product data to display (including optional `sku`, `unit`, `colorOptions`).
- `isOpen` / `onClose`: dialog visibility control.
- `onAddToOrder` / `isAdded`: optional add action and temporary “Added” state (shared with the card).

## Layout

- Two columns on large screens: image left, purchase details right.
- Color options are always visible as selectable chips (not a dropdown or accordion).
- “Product information” lists SKU, brand, and unit without row dividers.
- Add-to-order uses the same progressive green “Added” feedback as the card.

## Notes

- Client Component (`"use client"`).
- Does not own catalog or cart state; quantity/color selection and add feedback are UI-only until a real order flow exists.
- Uses a wider modal (`max-w-5xl`) with the dialog title visually hidden; the product title is the accessible name.
- Mounted only while open so quantity/color selection resets on each open.
