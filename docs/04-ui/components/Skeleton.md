# Skeleton

## Responsibility

Reusable loading placeholder block. Compose with Tailwind size/shape classes to mirror upcoming content.

## When to use

Use while async content is loading and the final layout is known. Prefer feature-level compositions (e.g. `ProductCardSkeleton`) that assemble multiple `Skeleton` blocks to match a specific card or tile.

## Props

- `className`: size, radius, and layout utilities merged onto the base pulse styles.

## Usage

```tsx
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

<Skeleton className="h-4 w-2/3 rounded-md" />
```

## Notes

- Presentational only (`aria-hidden`). Loading announcements belong on the wrapping status region (e.g. `role="status"` + `common.loading`).
- Products catalog is the current consumer via `ProductCardSkeleton`. Results count, sort, search, and filters reserve layout space while loading without a visible skeleton pulse.
- When Ambientes and Showroom switch from static constants to an async API/CMS, they must reuse this primitive and add feature-level tile/card skeletons (same pattern as products). Do not leave those galleries blank during fetch.
