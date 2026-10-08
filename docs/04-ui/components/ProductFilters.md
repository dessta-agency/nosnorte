# ProductFilters

## Responsibility

Products catalog filter sidebar (and mobile drawer): categories, price range, brands, and construction-oriented attribute groups, plus clear-all.

## When to use

Pass as the `sidebar` of `ProductsGrid` from `ProductsCatalog`.

## Behaviour

- Client Component (`"use client"`).
- Desktop: sticky sidebar. Mobile: button opens a left drawer.
- Each group is a `FilterSection`. Active groups show a primary title and a count badge (`activeCount`).
- “Clear all” resets every checkbox group and the price range (no trash icon).
- While loading, shows `ProductFiltersSkeleton` and disables the mobile open control.
- Category/brand options come from loaded products when available; otherwise fallback construction ids. Other groups use shared ids from `constants/product-filters.ts`.

## Notes

- Filtering of simulated attributes is applied in `ProductsGrid` via `filterAttributes` on each product.
- See [FilterSection](FilterSection.md), [ProductFiltersSkeleton](ProductFiltersSkeleton.md), and [Limitations](../../00-overview/LIMITATIONS.md).
