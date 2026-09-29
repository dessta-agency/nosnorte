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

Use a proportional viewport width for the shared layout `Container` (currently 90% of the viewport plus horizontal padding), with no max-width cap, so side spacing stays consistent across screen sizes. Navbar, Footer, and `PageContainer` all use this `Container`.

### Consequences

- Navbar, Footer, and pages stay horizontally aligned.
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

---

## 2026-09-27 — PageContainer on all pages except home; shared full-bleed hero inset

### Context

Content pages, navbar, and footer must share one horizontal grid. Full-bleed heroes (homepage carousel and page heroes such as History) need a separate text inset that stays consistent with each other without breaking edge-to-edge media.

### Decision

- Require `PageContainer` on every page except the homepage.
- Keep full-bleed heroes outside `PageContainer`; wrap remaining page sections in `PageContainer`.
- Share one horizontal inset constant (`FULL_BLEED_HERO_INSET` in `constants/layout.ts`) across the homepage carousel and page heroes of the same kind.

### Consequences

- Navbar, Footer, and page body content stay aligned via `Container`.
- New full-bleed heroes must reuse `FULL_BLEED_HERO_INSET` instead of inventing custom side padding.
- The homepage remains the only route that may omit `PageContainer`.

---

## 2026-09-29 — Shared PageHero for content pages

### Context

History, Contacts, and Showroom each had a nearly identical full-bleed page hero component. The homepage hero remains a separate carousel (`HeroCarousel`).

### Decision

Introduce one shared `PageHero` UI component for content-page heroes. Keep `HeroCarousel` as the homepage-only hero. Pages pass copy and `backgroundImage`; layout and inset stay in `PageHero` + `FULL_BLEED_HERO_INSET`.

### Consequences

- New content pages with a static full-bleed hero reuse `PageHero` instead of adding page-specific hero components.
- Homepage continues to use `HeroCarousel` only.
- Feature folders no longer own duplicate page-hero markup.
