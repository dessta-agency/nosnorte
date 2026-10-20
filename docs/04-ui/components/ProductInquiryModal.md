# ProductInquiryModal

## Responsibility

Dialog for requesting product information: name, email, and optional message fields, validation, and temporary submit feedback until email integration exists.

## When to use

Opened from `ProductCard` when the visitor clicks the product card, or from `ProductOptionsModal` via the “Request information” link.

## Props

- `product`: product used for display copy and future email context.
- `isOpen` / `onClose`: dialog visibility control.

## Behaviour

- Validates required name and email (email format). Message is optional.
- Submit is UI-only (simulated delay); no backend or email yet.
- Form state resets each time the dialog opens.
- Shows the product name in the description.

## Notes

- Client Component (`"use client"`).
- Built on shared `Modal` and `Button`.
- Copy comes from the `products` message namespace (`inquiry_*` keys).
