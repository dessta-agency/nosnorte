# Limitations

Known limitations and consciously accepted trade-offs.

## Product catalog data

- Product list data currently comes from DummyJSON (external mock API), not from a Nós-Norte catalog backend.
- Card fields such as reference, availability, “more options”, price-on-request, SKU, unit, and color options are enriched locally for UI purposes; they are not authoritative business data.
- Construction-oriented checkbox filters (warranty, finish, color, width, material, size, etc.) are simulated client-side via deterministic `filterAttributes` on each product (`constants/product-filters.ts`). Not every product has every attribute; each filter option is still assigned to enough products for non-empty results. Category, brand, and price still use DummyJSON fields. This is temporary until a real catalog API provides those attributes.

## Add to order

- “Add to order” only shows temporary UI feedback on the button. There is no cart, order persistence, or backend submission yet.

## Status badge color for “on order”

- The “on order” badge uses a fixed amber color (`#AD7225`) rather than a shared design token.

## Loading skeletons (Ambientes / Showroom)

- Content skeletons are implemented for the products catalog only, because it is the only surface with an async client fetch today.
- Ambientes and Showroom still resolve media on the server (catalog / filesystem), so their cards are present on first paint and do not need content skeletons yet.
- When those sections are wired to an async API/CMS, they must reuse `components/ui/Skeleton` and add feature-level tile/card skeletons (same pattern as `ProductCardSkeleton`). Leaving those galleries blank during fetch is not acceptable.

## Ambientes vs Showroom media

- Both features read images from `public/images/showroom/`.
- Showroom auto-discovers every image file in that folder.
- Ambientes uses a curated catalog (`AMBIENTE_CATALOG`: numeric id, copy key, file name). Adding or removing files does not change Ambientes until the catalog is updated.
- Ambientes detail materials are display-only (type + name). There is no “view product” link yet.
