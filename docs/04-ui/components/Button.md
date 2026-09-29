# Button

## Responsibility

Reusable call-to-action button with five visual variants, optional leading icon, optional trailing arrow, and support for rendering as a native `<button>` or a Next.js `Link`.

## When to use

Use for primary and secondary actions across the site (hero CTAs, section CTAs, forms) instead of ad-hoc `<button>` or `<a>` markup.

## Props

- `variant`: `"primary"` | `"outline"` | `"light"` | `"dark"` | `"secondary"`. Defaults to `"primary"`.
  - `primary` — solid brand red, white text (main actions)
  - `outline` — white background, brand red border and text (secondary actions)
  - `light` — light gray background, dark text; pair with `startIcon` (contact-style actions)
  - `dark` — solid black/foreground, white text (high-contrast actions)
  - `secondary` — light gray background, dark text; pair with `startIcon` (downloads / complementary actions)
- `startIcon`: optional `ReactNode` rendered before the label (typical for `light` / `secondary`).
- `showArrow`: when `true`, renders a trailing arrow that shifts on hover (typical for `primary` / `outline` / `dark`). Defaults to `false`.
- `href`: when set, renders as a `Link`; otherwise as a native `<button>`.
- `className`: extra classes merged with the base styles.
- Remaining props are passed through to the underlying element.

## Hover

- `primary` / `dark`: background fill sweeps left to right (`primary-hover` on `primary`, `secondary` on `dark`).
- `outline`: fills with `primary`; text and arrow become white.
- `light` / `secondary`: shadow elevates (`hover:shadow-md`).
- Always uses `cursor-pointer`.

## Usage

```tsx
import { Button } from "@/components/ui/Button/Button";

<Button variant="primary" showArrow>
  Showroom
</Button>

<Button variant="outline" showArrow href="/marcas">
  Marcas
</Button>

<Button variant="light" startIcon={<LocationIcon />}>
  Pedir Orçamento
</Button>

<Button variant="dark" showArrow href="/contactos">
  Contactos
</Button>

<Button variant="secondary" startIcon={<DownloadIcon />}>
  Ficha Técnica
</Button>
```

## Notes

- Used by `HeroCarousel` for hero slide CTAs (`variant="primary"`, `showArrow`).
- Uses design tokens (`primary`, `secondary`, `foreground`, `gray-light`); do not hardcode brand colors when adding variants.
