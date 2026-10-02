const SECTION_PLACEHOLDERS = 8;

/**
 * Invisible layout reservation for the filters panel while catalog data loads.
 * Keeps approximate height without a visible skeleton.
 */
export function ProductFiltersSkeleton() {
  return (
    <div aria-hidden className="flex flex-col">
      <div className="pb-4">
        <div className="h-5" />
      </div>
      {Array.from({ length: SECTION_PLACEHOLDERS }, (_, index) => (
        <div key={index} className="py-4">
          <div className="h-4" />
        </div>
      ))}
    </div>
  );
}
