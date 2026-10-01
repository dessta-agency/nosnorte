# EnvironmentsGallery

## Responsibility

Ambientes listing gallery: category filters plus an editorial asymmetric image grid of environments, each linking to its detail page.

## When to use

Use on the Ambientes listing page inside `Container`, below `EnvironmentsIntro`.

## When not to use

- Do not use for the Showroom photo masonry — that uses `ShowroomGallery`.
- Do not use for uniform product grids — prefer a regular CSS grid / `ProductsGrid`.

## Layout

- Header: section eyebrow + title on the left; category filters on the right (stacked on small screens).
- Filters sit on a continuous gray bottom rule (`border-border/60`). The active filter uses a primary (red) underline on top of that rule.
- Grid (large screens): 4 columns, repeating every 6 items:
  1. Tall left tile (`row-span-2`)
  2. Wide top-middle tile (`col-span-2`)
  3. Top-right tile
  4–6. Bottom row: two middle tiles + bottom-right tile
- On smaller screens the grid collapses to 1–2 columns without those spans.
- Cards share `GALLERY_MEDIA_RADIUS` (`rounded-lg`) and `GALLERY_MEDIA_GAP` with `ShowroomGallery`. Overlay copy (category, name, excerpt) is unchanged.

## Behaviour

- Client Component (`"use client"`).
- Filters: All, Bathroom, Interiors, Exteriors (`AmbienteFilterId`). Filtering is client-side over the items passed from the page.
- Optional initial filter from the page query (`?categoria=`).

## Props

- `eyebrow` / `title` / `emptyLabel` — section copy.
- `filters` — `{ id, label }[]`.
- `items` — `AmbienteListItem[]` (slug, category, labels, cover, href, etc.).
- `initialFilter` (optional) — defaults to `"all"`.
