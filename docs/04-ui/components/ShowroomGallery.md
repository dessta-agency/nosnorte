# ShowroomGallery

## Responsibility

Masonry image gallery for the showroom page: asymmetric CSS grid of ambient photos with a modal preview.

## When to use

Use on the showroom page (or similar ambient galleries) inside `PageContainer`, below `PageHero`.

## When not to use

Do not use for uniform product grids — prefer a regular CSS grid or `ImageGallery`. Do not use for the homepage hero — that uses `HeroCarousel`.

## Props

- `images` — list of `{ src, alt, title?, span? }` where `span` controls masonry row height (`1`–`2`).
- `title` (optional) — section heading above the grid; omit for a gallery-only layout.
- `closeLabel` — accessible label for the image modal close control.
- `previousLabel` / `nextLabel` — accessible labels for lightbox navigation controls.

## Behaviour

- Client Component (`"use client"`).
- Each tile uses `Reveal`. The first three tiles use `immediate` (no scroll wait); later tiles use the same slow scroll enter as Ambientes (`durationMs={2200}`, `threshold={0.2}`).
- Clicking a tile opens the shared `Modal` (`variant="media"`) with a large contained image and no gray panel fill.
- Previous/next controls (and Left/Right arrow keys) cycle through gallery images when more than one image is present.
- Tile corner radius and gap share `GALLERY_MEDIA_RADIUS` / `GALLERY_MEDIA_GAP` with `EnvironmentsGallery`.
- Tiles use the shared media hover (`MEDIA_HOVER_CARD` + `MEDIA_HOVER_MEDIA`): slight card scale-up and image darkening on hover/focus.
- Images are discovered automatically from `public/images/showroom/` via `utils/showroom-images.ts`. Ambientes uses the same media folder but a curated catalog (`AMBIENTE_CATALOG`), not filesystem auto-discovery.
