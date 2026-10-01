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

## Behaviour

- Client Component (`"use client"`).
- Clicking a tile opens the shared `Modal` with a large contained image.
- Tile corner radius and gap share `GALLERY_MEDIA_RADIUS` / `GALLERY_MEDIA_GAP` with `EnvironmentsGallery`.
- Images live under `public/images/showroom/`.
