type SkeletonProps = {
  className?: string;
};

/**
 * Neutral loading placeholder block. Compose with className for size and shape.
 */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-light ${className}`}
      aria-hidden
    />
  );
}
