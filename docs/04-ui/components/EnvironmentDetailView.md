# EnvironmentDetailView

## Responsibility

Ambientes detail body: back link, title, description, materials list, and optional extra images.

## When to use

Use on the Ambientes detail page (`/ambientes/[id]`) inside `PageContainer`, below the full-bleed cover image.

## Props

- `name` / `categoryLabel` / `description` — header copy.
- `materialsTitle` / `materials` — list of `{ typeLabel, name }` (no product links).
- `galleryTitle` / `galleryImages` — optional extra images.
- `backLabel` / `backHref` — back navigation (typically “Voltar a ambientes” → `/ambientes`).

## Behaviour

- Back control shows `/icons/back.png` to the left of the label.
- Materials are display-only (type + name); there is no “view product” action.
