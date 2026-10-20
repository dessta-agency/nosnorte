# Modal

## Responsibility

Reusable accessible dialog overlay: title, close control, focus management, Escape to close, overlay click to close, and body scroll lock.

## When to use

Use for focused secondary flows that need attention without leaving the page (for example product options).

## When not to use

Do not use for simple tooltips, dropdowns, or inline expand/collapse. Prefer lighter patterns when a full dialog is unnecessary.

## Props

- `isOpen`: whether the dialog is visible.
- `onClose`: called on Escape, overlay click, or close button.
- `title`: dialog heading (used for `aria-labelledby`).
- `closeLabel`: accessible name for the close button.
- `children`: dialog body content.
- `className`: optional extra classes on the dialog panel (e.g. wider max-width).
- `hideTitle`: when `true`, keeps the title for accessibility (`sr-only`) and shows only the close control.
- `variant`: `"default"` (surface panel) or `"media"` (transparent panel for image lightboxes).

## Behaviour

- Renders into `document.body` via a portal.
- Traps Tab focus inside the dialog while open.
- Restores focus to the previously focused element on close.
- Locks `document.body` scroll while open.
- Enter/exit motion: overlay fades; panel fades with a slight scale and upward settle. Exit keeps the portal mounted briefly so the close animation can finish. Honours `prefers-reduced-motion`.
- Default close control uses brand primary red at `h-6 w-6` (slightly larger than body icons). Media variant keeps a light X on a dark chip for contrast on photos.

## Notes

- Client Component (`"use client"`).
- Used by `ProductOptionsModal` and `ShowroomGallery`.
- Keep the component mounted while `isOpen` becomes `false` so the exit animation can run (do not unmount the parent solely because the dialog closed).
