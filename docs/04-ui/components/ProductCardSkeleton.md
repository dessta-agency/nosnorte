# ProductCardSkeleton

## Responsibility

Loading placeholder that mirrors `ProductCard` layout (image area, text lines, CTA) while the products catalog fetch is in progress.

## When to use

Use inside the products grid when `isLoading` is true. Built from the shared `Skeleton` UI primitive.

## Notes

- Not interactive; parent should expose `role="status"` and an accessible loading label.
