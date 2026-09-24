# Decisions Log

Technical decisions with lasting impact on architecture or conventions.

---

## 2026-09-24 — next-intl with locale-prefixed routes

### Context

The site must support Portuguese, English, Spanish, and French, with language switching from the footer.

### Decision

Use `next-intl` with App Router `[locale]` segments, `localePrefix: 'always'`, Portuguese as the default locale, and Portuguese route slugs kept across languages. Translation copy lives in `messages/{locale}.json`.

### Consequences

- URLs always include a locale prefix (`/pt/...`, `/en/...`, …).
- In-app navigation must use `@/i18n/navigation` to preserve locale.
- New user-visible copy requires updates in all four message files.
- Locale negotiation runs through `proxy.ts` (Next.js 16).

---

## 2026-09-24 — Proportional layout width

### Context

Fixed max-widths and Tailwind’s breakpoint `container` produced uneven side spacing: too much margin on large screens, almost none on smaller ones.

### Decision

Use a proportional viewport width for the shared layout `Container` (currently 96% of the viewport), with no max-width cap, so side spacing stays consistent across screen sizes. Navbar and page content both use this `Container`.

### Consequences

- Navbar and pages stay horizontally aligned.
- Side margins scale with the viewport.
- Changing the proportion updates the whole site grid in one place (`Container`).

---

## 2026-09-24 — Embla Carousel for homepage hero

### Context

The homepage needs a full-bleed image carousel with autoplay, loop, dots, and a slide counter. No carousel dependency was present yet.

### Decision

Use Embla Carousel (`embla-carousel-react` + `embla-carousel-autoplay`) via a reusable `Carousel` UI component and a homepage-specific `HeroCarousel` feature. The home page does not use `PageContainer` so the hero stays edge-to-edge. Hero height is `calc(100dvh - 5.5rem)` to fit below the unscrolled navbar without vertical overflow.

### Consequences

- Carousel behaviour is shared; homepage content and copy stay in `HeroCarousel` and `hero` messages.
- Full-bleed heroes must stay outside `PageContainer` / `Container`.
- Slide count for dots/counter is derived from React children for reliable mount sync.
