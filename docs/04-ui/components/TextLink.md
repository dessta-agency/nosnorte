# TextLink

## Responsibility

Inline text link with optional trailing icon, used for external or secondary navigation (e.g. “Ver no Google Maps”). Always navigates via `href`.

## When to use

Use for text-style links that sit in body copy or beside content, not as primary CTAs. Prefer `Button` for filled/outlined call-to-action controls.

## Props

- `href`: required destination URL or path.
- `external`: when `true`, opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) and shows the default external-link icon unless `endIcon` is provided.
- `endIcon`: optional custom trailing icon (`ReactNode`); overrides the default external icon when both are set.
- `children`: link label.
- `className`: extra classes merged with the base styles.
- Remaining anchor props are passed through.

## Visual

- Brand red text (`text-primary`), semibold.
- Underline appears on hover; always uses `cursor-pointer`.

## Usage

```tsx
import { TextLink } from "@/components/ui/TextLink/TextLink";

<TextLink href="https://maps.google.com" external>
  Ver no Google Maps
</TextLink>

<TextLink href="/ambientes" endIcon={<ArrowIcon />}>
  Ver ambientes
</TextLink>
```
