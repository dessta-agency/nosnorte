# EnvironmentsGallery

## Responsibility

Ambientes listing gallery: editorial asymmetric image grid of bathroom environments, each linking to its detail page. Optional category filters when more than one category exists.

## When to use

Use on the Ambientes listing page inside `Container`, below `EnvironmentsIntro`.

## When not to use

- Do not use for the Showroom photo masonry — that uses `ShowroomGallery`.
- Do not use for uniform product grids — prefer a regular CSS grid / `ProductsGrid`.

## Layout

- Header: section eyebrow + title on the left; category filters on the right (stacked on small screens).
- Filters sit on a continuous gray bottom rule (`border-border/60`). The active filter uses a primary (red) underline on top of that rule. On small screens filters wrap with tighter horizontal spacing (`gap-x-4`); from `md` they use the wider desktop gap.
- Grid (large screens): 4 columns, repeating every 6 items:
  1. Tall left tile (`row-span-2`)
  2. Wide top-middle tile (`col-span-2`)
  3. Top-right tile
  4–6. Bottom row: two middle tiles + bottom-right tile
- On smaller screens the grid collapses to 1–2 columns without those spans.
- Cards share `GALLERY_MEDIA_RADIUS` (`rounded-lg`) and `GALLERY_MEDIA_GAP` with `ShowroomGallery`. Overlay copy (category, name, excerpt) is unchanged.
- Tiles use the shared media hover (`MEDIA_HOVER_CARD` on each list item): very slight card scale-up on hover/focus, without overlapping neighbours. The cover image uses `MEDIA_HOVER_MEDIA` for a slight darkening (no zoom).

## Behaviour

- Client Component (`"use client"`).
- Each grid tile uses `Reveal` so cards enter as they scroll into view (not one animation for the whole grid). Gallery tiles use a slower enter (`durationMs={2200}`, `threshold={0.2}`) with a light stagger.
- Filters (optional): when provided, client-side filtering over the items passed from the page (`AmbienteFilterId`). With a single bathroom category the listing page passes an empty filter list and the filter nav is hidden.
- Optional initial filter from the page query (`?categoria=`).

## Props

- `eyebrow` / `title` / `emptyLabel` — section copy.
- `filters` — `{ id, label }[]`.
- `items` — `AmbienteListItem[]` (slug as numeric id, category, labels, cover, href, etc.).
- `initialFilter` (optional) — defaults to `"all"`.

## Data notes

- Listing data comes from `AMBIENTE_CATALOG` (forced numeric ids + curated titles via `copyKey`), not from `getShowroomImages()`.
- Detail routes are `/ambientes/{id}` where `{id}` is the catalog numeric id (`1`, `2`, …).
