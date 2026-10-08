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

---

## 2026-10-01 — Ambientes intro cards bleed to the right edge

### Context

The Ambientes intro needs slanted category cards beside the section copy, with the row ending flush against the viewport’s right edge. Constraining that row inside `PageContainer` / `Container` prevented a true right-edge bleed.

### Decision

- Keep `EnvironmentsIntro` outside `PageContainer` / `Container` (below `PageHero`), similar to other full-bleed sections.
- Support multiple intro cards from data (`AMBIENTE_INTRO_CARDS`).
- The **last** card has no right-side diagonal cut and grows to the viewport right edge. With three category cards, that is the third card.

### Consequences

- Ambientes body sections (gallery) stay in `Container`; only the intro bleeds.
- Adding or removing intro cards keeps the same last-card bleed rule.
- See [EnvironmentsIntro](../04-ui/components/EnvironmentsIntro.md).

---

## 2026-10-01 — Ambientes gallery editorial grid

### Context

A uniform 3-column card grid did not match the intended Ambientes gallery composition (tall left tile, wide top-middle tile, stacked right column).

### Decision

Use a repeating 4-column CSS Grid block of six tiles on large screens: position 0 spans two rows, position 1 spans two columns, positions 2–5 fill the remaining cells. Filters use a continuous gray baseline with a primary underline on the active item.

### Consequences

- Gallery layout is index-based (`index % 6`), independent of the older `span` field on ambiente mock data for this view.
- Card chrome stays simple (`rounded-lg` via `GALLERY_MEDIA_RADIUS`); content overlay is unchanged.
- See [EnvironmentsGallery](../04-ui/components/EnvironmentsGallery.md).

---

## 2026-10-08 — Ambientes curated catalog vs Showroom filesystem discovery

### Context

Showroom and Ambientes share bathroom photography in `public/images/showroom/`, but Ambientes needs stable URLs and curated titles while Showroom should reflect every file in the folder.

### Decision

- Showroom lists images via `getShowroomImages()` (filesystem auto-discovery).
- Ambientes lists entries from `AMBIENTE_CATALOG` (numeric `id`, `copyKey`, `fileName`). Detail routes use `/ambientes/{id}`.
- Materials on Ambientes detail are display-only (no product links).

### Consequences

- Adding or removing showroom files updates Showroom only; Ambientes requires a catalog edit.
- See [ShowroomGallery](../04-ui/components/ShowroomGallery.md), [EnvironmentsGallery](../04-ui/components/EnvironmentsGallery.md), and [Limitations](../00-overview/LIMITATIONS.md).

---

## 2026-10-08 — Per-tile Reveal on galleries (not whole-grid)

### Context

Wrapping an entire gallery grid in a scroll `Reveal` left a blank white block below the hero until the visitor scrolled. Ambientes and Showroom still need a slow enter as tiles come into view.

### Decision

- Animate each gallery tile with `Reveal` inside the grid.
- Ambientes: every tile scroll-reveals (`durationMs={2200}`, `threshold={0.2}`).
- Showroom: first three tiles use `immediate`; later tiles use the same slow scroll enter.
- Do not wrap the whole above-the-fold gallery in a non-immediate `Reveal`.

### Consequences

- Hero-adjacent tiles stay visible on first paint where `immediate` is used.
- See [Reveal](../04-ui/components/Reveal.md).

---

## 2026-10-08 — Shared media hover tokens

### Context

Ambientes, Showroom, and product cards needed the same light hover feedback. Per-feature hover styles would drift apart (different scales, image zooms, or lift shadows).

### Decision

- Reuse `MEDIA_HOVER_CARD` (slight card scale) and optional `MEDIA_HOVER_MEDIA` (image darkening, no zoom) from `constants/layout.ts`.
- Apply card scale on the outer wrapper; darkening on the covering image.

### Consequences

- One place to tune hover intensity for all adopting surfaces.
- See [Style Guide](../03-standards/STYLE_GUIDE.md), [EnvironmentsGallery](../04-ui/components/EnvironmentsGallery.md), [ShowroomGallery](../04-ui/components/ShowroomGallery.md), and [ProductCard](../04-ui/components/ProductCard.md).
