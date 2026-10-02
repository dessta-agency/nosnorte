# ProductFiltersSkeleton

## Responsibility

Invisible layout reservation for the products filters panel while catalog data is loading. Keeps approximate sidebar height so the page does not jump when real filters appear.

## When to use

Use inside `ProductFilters` when `isLoading` is true.

## Notes

- Not a visible skeleton (no pulse / gray blocks) — only structural spacing and borders that match the loaded panel chrome.
- Not interactive; the mobile filters button is disabled while loading.
