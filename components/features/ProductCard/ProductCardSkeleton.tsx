import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { SURFACE_CARD } from "@/constants/layout";

/**
 * Loading placeholder that mirrors ProductCard layout (image, text, CTA).
 */
export function ProductCardSkeleton() {
  return (
    <div className={`flex h-full flex-col ${SURFACE_CARD} p-4 shadow-sm`}>
      <Skeleton className="mb-4 aspect-square w-full rounded-xl" />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="mt-1 h-5 w-24 rounded-full" />
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-border/40 pt-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
