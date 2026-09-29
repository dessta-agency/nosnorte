# IconButton

## Responsibility

Circular, icon-only action button (carousel navigation, compact actions). Renders as a `<button>` or, when `href` is provided, as a Next.js `Link`.

## When to use

Use when the control is icon-only and circular (e.g. carousel next/previous). Prefer `Button` when the control has a text label.

## Props

- `icon`: required `ReactNode` centered inside the circle.
- `aria-label`: required accessible name (icon-only controls must expose a name).
- `href`: when set, renders as a `Link`; otherwise as a native `<button>`.
- `className`: extra classes merged with the base styles.
- Remaining props are passed through to the underlying element.

## Visual

- Solid `primary` background, white icon content.
- Fixed size (`h-14 w-14`, larger on `md+`).
- Hover darkens the background and shifts the icon slightly; always uses `cursor-pointer`.

## Usage

```tsx
import { IconButton } from "@/components/ui/IconButton/IconButton";

<IconButton
  aria-label="Seguinte"
  icon={
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {/* arrow path */}
    </svg>
  }
/>
```
