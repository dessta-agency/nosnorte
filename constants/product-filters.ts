/**
 * Shared product filter option ids (UI + DummyJSON enrichment simulation).
 */

export const PRODUCT_WARRANTY_IDS = ["years_3", "years_30"] as const;
export const PRODUCT_FINISH_IDS = [
  "matte",
  "gloss",
  "satin",
  "textured",
] as const;
export const PRODUCT_CERTIFICATION_IDS = [
  "ce",
  "iso9001",
  "fsc",
  "pefc",
] as const;
export const PRODUCT_THICKNESS_IDS = [
  "6mm",
  "8mm",
  "10mm",
  "12mm",
  "20mm",
] as const;
export const PRODUCT_DIAMETER_IDS = [
  "10mm",
  "15mm",
  "20mm",
  "32mm",
  "50mm",
] as const;
export const PRODUCT_COLOR_IDS = [
  "white",
  "beige",
  "gray",
  "black",
  "natural",
] as const;
export const PRODUCT_WIDTH_IDS = [
  "30cm",
  "45cm",
  "60cm",
  "90cm",
  "120cm",
] as const;
export const PRODUCT_LENGTH_IDS = [
  "60cm",
  "90cm",
  "120cm",
  "180cm",
  "240cm",
] as const;
export const PRODUCT_MATERIAL_IDS = [
  "ceramic",
  "porcelain",
  "wood",
  "stone",
  "metal",
  "glass",
] as const;
export const PRODUCT_VOLUME_IDS = ["1l", "5l", "10l", "15l", "20l"] as const;
export const PRODUCT_PACKAGING_IDS = [
  "unit",
  "box",
  "pallet",
  "pack",
] as const;
export const PRODUCT_FORMAT_IDS = [
  "square",
  "rectangular",
  "hexagonal",
  "plank",
] as const;
export const PRODUCT_SIZE_IDS = [
  "30x30",
  "45x45",
  "60x60",
  "90x90",
  "120x60",
] as const;

export const PRODUCT_FALLBACK_CATEGORY_IDS = [
  "ceramics",
  "paints",
  "woods",
  "sanitary",
  "flooring",
  "insulation",
  "hardware",
] as const;

export const PRODUCT_FALLBACK_BRAND_IDS = [
  "keraben",
  "cin",
  "roca",
  "cortarte",
  "sika",
] as const;

/** Optional simulated attrs — not every product has every characteristic. */
export type ProductFilterAttributes = {
  warranty?: (typeof PRODUCT_WARRANTY_IDS)[number];
  finish?: (typeof PRODUCT_FINISH_IDS)[number];
  certification?: (typeof PRODUCT_CERTIFICATION_IDS)[number];
  thickness?: (typeof PRODUCT_THICKNESS_IDS)[number];
  diameter?: (typeof PRODUCT_DIAMETER_IDS)[number];
  color?: (typeof PRODUCT_COLOR_IDS)[number];
  width?: (typeof PRODUCT_WIDTH_IDS)[number];
  length?: (typeof PRODUCT_LENGTH_IDS)[number];
  material?: (typeof PRODUCT_MATERIAL_IDS)[number];
  volume?: (typeof PRODUCT_VOLUME_IDS)[number];
  packaging?: (typeof PRODUCT_PACKAGING_IDS)[number];
  format?: (typeof PRODUCT_FORMAT_IDS)[number];
  size?: (typeof PRODUCT_SIZE_IDS)[number];
};

type SimulatedFilterState = {
  warranties: string[];
  finishes: string[];
  certifications: string[];
  thicknesses: string[];
  diameters: string[];
  colors: string[];
  widths: string[];
  lengths: string[];
  materials: string[];
  volumes: string[];
  packagings: string[];
  formats: string[];
  sizes: string[];
};

/** Maps filter state arrays → product attribute keys. */
export const SIMULATED_FILTER_FIELDS = [
  ["warranties", "warranty"],
  ["finishes", "finish"],
  ["certifications", "certification"],
  ["thicknesses", "thickness"],
  ["diameters", "diameter"],
  ["colors", "color"],
  ["widths", "width"],
  ["lengths", "length"],
  ["materials", "material"],
  ["volumes", "volume"],
  ["packagings", "packaging"],
  ["formats", "format"],
  ["sizes", "size"],
] as const satisfies ReadonlyArray<
  readonly [keyof SimulatedFilterState, keyof ProductFilterAttributes]
>;

type AttributeSpec = {
  key: keyof ProductFilterAttributes;
  ids: readonly string[];
  /** ~percent of products (beyond the guarantee set) that omit this attribute. */
  omitPercent: number;
  seedOffset: number;
};

const ATTRIBUTE_SPECS: readonly AttributeSpec[] = [
  { key: "warranty", ids: PRODUCT_WARRANTY_IDS, omitPercent: 20, seedOffset: 0 },
  { key: "finish", ids: PRODUCT_FINISH_IDS, omitPercent: 25, seedOffset: 1 },
  {
    key: "certification",
    ids: PRODUCT_CERTIFICATION_IDS,
    omitPercent: 25,
    seedOffset: 2,
  },
  { key: "thickness", ids: PRODUCT_THICKNESS_IDS, omitPercent: 30, seedOffset: 3 },
  { key: "diameter", ids: PRODUCT_DIAMETER_IDS, omitPercent: 30, seedOffset: 4 },
  { key: "color", ids: PRODUCT_COLOR_IDS, omitPercent: 25, seedOffset: 5 },
  { key: "width", ids: PRODUCT_WIDTH_IDS, omitPercent: 30, seedOffset: 6 },
  { key: "length", ids: PRODUCT_LENGTH_IDS, omitPercent: 30, seedOffset: 7 },
  { key: "material", ids: PRODUCT_MATERIAL_IDS, omitPercent: 25, seedOffset: 8 },
  { key: "volume", ids: PRODUCT_VOLUME_IDS, omitPercent: 25, seedOffset: 9 },
  {
    key: "packaging",
    ids: PRODUCT_PACKAGING_IDS,
    omitPercent: 20,
    seedOffset: 10,
  },
  { key: "format", ids: PRODUCT_FORMAT_IDS, omitPercent: 25, seedOffset: 11 },
  { key: "size", ids: PRODUCT_SIZE_IDS, omitPercent: 30, seedOffset: 12 },
];

function pickFrom<T extends string>(ids: readonly T[], seed: number): T {
  return ids[Math.abs(seed) % ids.length]!;
}

/**
 * Deterministic fake filter attributes for DummyJSON products.
 * - First `ids.length` products guarantee every option appears at least once.
 * - Remaining products may omit a characteristic (so filters exclude them).
 */
export function simulateProductFilterAttributes(
  productId: number,
): ProductFilterAttributes {
  const attrs: ProductFilterAttributes = {};

  for (const spec of ATTRIBUTE_SPECS) {
    // Guarantee coverage: product 1..N maps to each option once.
    if (productId >= 1 && productId <= spec.ids.length) {
      attrs[spec.key] = spec.ids[productId - 1] as never;
      continue;
    }

    // Other products: some omit this characteristic (hash independent of option index).
    const omitBucket =
      (productId * 31 + spec.seedOffset * 17) % 100;
    if (omitBucket < spec.omitPercent) {
      continue;
    }

    attrs[spec.key] = pickFrom(spec.ids, productId - 1) as never;
  }

  return attrs;
}

export function matchesSelected(
  selected: string[],
  value: string | undefined,
): boolean {
  if (selected.length === 0) return true;
  return value !== undefined && selected.includes(value);
}

export function matchesSimulatedFilterAttributes(
  attrs: ProductFilterAttributes | undefined,
  filters: SimulatedFilterState,
): boolean {
  const resolved = attrs ?? {};

  return SIMULATED_FILTER_FIELDS.every(([filterKey, attrKey]) =>
    matchesSelected(filters[filterKey], resolved[attrKey]),
  );
}
