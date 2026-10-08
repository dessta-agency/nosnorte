# Style Guide

UI/UX guidelines for visual and behavioral consistency across the interface.

## Language

- Present user-facing text in Portuguese, consistent with the application language (`pt`).

## Design Tokens

- Use semantic color tokens (`primary`, `error`, `success`, etc.) — never hardcoded hex values or arbitrary colors in components.

- Apply tokens by role:
  - `primary` — main actions, links, and key highlights
  - `primary-hover` — darker primary for hover fills on brand CTAs
  - `secondary` — secondary actions and subtle backgrounds
  - `muted` — secondary text and placeholders
  - `gray-light` — light gray surfaces (e.g. `Button` light/secondary variants)
  - `surface` — optional near-white panel token (`hsl(0 0% 99%)`); prefer `background` for pure white panels
  - `success` / `error` / `warning` — user feedback only, not decoration
  - `background` / `foreground` — base page colors
  - `border` — borders and dividers
  - `footer-bg` / `footer-border` / `footer-text` / `footer-text-secondary` / `footer-text-muted` / `footer-icon-bg` — footer surface, copy, and icon circles

- Customize token values in `app/globals.css` to match each project's visual identity.

- Use `font-sans` for body text (Manrope); use `font-display` for display titles (DM Serif Display). Customize font families in `globals.css` per project.

## Layout and Hierarchy

- **Shared content grid:** Navbar, Footer, and `PageContainer` all use `Container`. They must stay horizontally aligned — do not introduce different side widths or paddings for chrome vs page content.
- **PageContainer is required** on every page except the homepage. The homepage is the only route that may omit it (full-bleed `HeroCarousel` only).
- Full-bleed heroes (e.g. `HeroCarousel`, `PageHero`) stay outside `PageContainer` / `Container` so media can go edge-to-edge.
- **Full-bleed hero text inset:** Homepage carousel and page heroes of the same kind must share the same horizontal content spacing (`FULL_BLEED_HERO_INSET` in `constants/layout.ts`). Do not invent a separate inset per hero.
- **Surface cards:** Bordered surface panels (product cards, contact sections, etc.) must reuse `SURFACE_CARD` from `constants/layout.ts` for radius, border, and fill. Compose with local padding and interaction styles; do not redefine the card chrome per feature.
- **Gallery media tiles:** Ambientes and Showroom gallery tiles must share `GALLERY_MEDIA_RADIUS` and `GALLERY_MEDIA_GAP` from `constants/layout.ts`, even when grid and behaviour differ.
- **Media hover:** Interactive media tiles/cards (Ambientes, Showroom, product cards, and similar) reuse `MEDIA_HOVER_CARD` from `constants/layout.ts` on the outer tile/card wrapper. Optional image darkening uses `MEDIA_HOVER_MEDIA` on the covering image (no zoom). Do not invent a separate scale/lift per feature.
- On pages with a full-bleed hero plus body content: render the hero outside `PageContainer`, then wrap the remaining sections in `PageContainer`.
- Use `Container` whenever other chrome or sections must align to the shared grid.
- Use `font-display` for large display titles (hero headlines); use `font-sans` for body and UI chrome.
- Use one primary heading (`h1`) per page or main view.

- Follow heading levels in order; do not skip levels for visual styling alone.

- Keep page structure semantic: wrap primary content in `main`, with clear separation between layout regions (header, content, footer) when they exist.

- Align related content consistently within a page; avoid mixing unrelated alignment patterns in the same section.

## Spacing and Visual Consistency

- Keep spacing between similar elements consistent across the interface.

- Use the same visual weight for elements with the same role (e.g. all primary actions share the same emphasis).

- Reuse existing component categories (`ui`, `layout`, `forms`, `features`) for recurring interface patterns instead of creating one-off variants.

## Interactive States

- Interactive elements must have clearly distinct states: default, hover, focus, and disabled.

- Disabled elements must look inactive and must not appear actionable.

- Loading states must be visible while an action or content is in progress.

- Error and empty states must be explicit; do not leave users on a blank or unchanged screen without explanation.

## User Feedback

- Confirm successful actions with clear, concise feedback placed near the action that triggered them.

- Show errors close to the affected field, control, or section — not only at the top of the page.

- Validation messages must state what went wrong and what the user should do next.

- Do not rely on color alone to communicate success, error, or required status.

## Accessibility

- Ensure text and interactive elements have sufficient contrast against their background.

- All interactive elements must have a visible focus state.

- Interactive elements must be operable by keyboard where applicable.

- Provide accessible names for controls and images (labels, `alt` text, or equivalent context).
