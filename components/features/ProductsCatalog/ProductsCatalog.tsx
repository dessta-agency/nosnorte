"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/components/features/ProductFilters/ProductFilters";
import { ProductsGrid } from "@/components/features/ProductsGrid/ProductsGrid";
import type {
  FilterOption,
  Product,
  ProductFiltersState,
  ProductsApiResponse,
} from "@/types/product";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";
const DEFAULT_PRICE_MAX = 500;

function createInitialFilters(priceMax = DEFAULT_PRICE_MAX): ProductFiltersState {
  return {
    categories: [],
    brands: [],
    warranties: [],
    finishes: [],
    certifications: [],
    thicknesses: [],
    diameters: [],
    colors: [],
    widths: [],
    lengths: [],
    materials: [],
    volumes: [],
    packagings: [],
    formats: [],
    sizes: [],
    priceMin: 0,
    priceMax,
  };
}

function formatOptionLabel(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function enrichProduct(
  product: Product,
  formatDimensionOptions: (count: number) => string,
  colorLabels: { gray: string; white: string },
  unitLabel: string
): Product {
  const hasOptions = product.id % 3 === 0;

  return {
    ...product,
    reference: String(product.id).padStart(8, "0").toUpperCase(),
    additionalOptions: hasOptions
      ? formatDimensionOptions(2 + (product.id % 4))
      : undefined,
    availabilityStatus: product.id % 2 === 0 ? "in_stock" : "on_order",
    priceOnRequest: product.id % 2 === 0,
    sku: `SKU_${String(product.id).padStart(4, "0")}`,
    unit: unitLabel,
    colorOptions: hasOptions
      ? [
          { id: "gray", label: colorLabels.gray },
          { id: "white", label: colorLabels.white },
        ]
      : undefined,
  };
}

function extractOptions(
  products: Product[],
  key: "category" | "brand"
): FilterOption[] {
  const values = new Set<string>();

  for (const product of products) {
    const value = product[key];
    if (value?.trim()) values.add(value);
  }

  return Array.from(values)
    .sort((a, b) => a.localeCompare(b))
    .map((id) => ({ id, label: formatOptionLabel(id) }));
}

export function ProductsCatalog() {
  const t = useTranslations("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFiltersState>(
    createInitialFilters()
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setError(null);

      try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = (await response.json()) as ProductsApiResponse;
        if (cancelled) return;

        const loaded = (data.products ?? []).map((product) =>
          enrichProduct(
            product,
            (count) => t("options_count", { count }),
            {
              gray: t("color_options.gray"),
              white: t("color_options.white"),
            },
            t("unit_bag")
          )
        );
        setProducts(loaded);

        const maxPrice = loaded.reduce(
          (max, product) => Math.max(max, product.price),
          DEFAULT_PRICE_MAX
        );
        const roundedMax = Math.ceil(maxPrice);

        setFilters(createInitialFilters(roundedMax));
      } catch {
        if (!cancelled) {
          setError(t("error"));
          setProducts([]);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [t]);

  const categoryOptions = useMemo(
    () => extractOptions(products, "category"),
    [products]
  );

  const brandOptions = useMemo(
    () => extractOptions(products, "brand"),
    [products]
  );

  const priceBounds = useMemo(() => {
    if (products.length === 0) {
      return { min: 0, max: DEFAULT_PRICE_MAX };
    }

    const max = Math.ceil(
      products.reduce((current, product) => Math.max(current, product.price), 0)
    );

    return { min: 0, max: Math.max(max, 1) };
  }, [products]);

  const handleFiltersChange = useCallback((next: ProductFiltersState) => {
    setFilters(next);
  }, []);

  return (
    <ProductsGrid
      products={products}
      filters={filters}
      error={error}
      sidebar={
        <ProductFilters
          value={filters}
          onChange={handleFiltersChange}
          categoryOptions={categoryOptions}
          brandOptions={brandOptions}
          priceMinBound={priceBounds.min}
          priceMaxBound={priceBounds.max}
        />
      }
    />
  );
}
