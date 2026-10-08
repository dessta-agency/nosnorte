"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductFiltersSkeleton } from "@/components/features/ProductFilters/ProductFiltersSkeleton";
import { CheckboxFilter } from "@/components/ui/CheckboxFilter/CheckboxFilter";
import { FilterSection } from "@/components/ui/FilterSection/FilterSection";
import { PriceRangeFilter } from "@/components/ui/PriceRangeFilter/PriceRangeFilter";
import {
  PRODUCT_CERTIFICATION_IDS,
  PRODUCT_COLOR_IDS,
  PRODUCT_DIAMETER_IDS,
  PRODUCT_FALLBACK_BRAND_IDS,
  PRODUCT_FALLBACK_CATEGORY_IDS,
  PRODUCT_FINISH_IDS,
  PRODUCT_FORMAT_IDS,
  PRODUCT_LENGTH_IDS,
  PRODUCT_MATERIAL_IDS,
  PRODUCT_PACKAGING_IDS,
  PRODUCT_SIZE_IDS,
  PRODUCT_THICKNESS_IDS,
  PRODUCT_VOLUME_IDS,
  PRODUCT_WARRANTY_IDS,
  PRODUCT_WIDTH_IDS,
} from "@/constants/product-filters";
import type { FilterOption, ProductFiltersState } from "@/types/product";

type ProductFiltersProps = {
  value: ProductFiltersState;
  onChange: (value: ProductFiltersState) => void;
  categoryOptions?: FilterOption[];
  brandOptions?: FilterOption[];
  priceMinBound?: number;
  priceMaxBound?: number;
  isLoading?: boolean;
};

type CheckboxFilterKey = Exclude<
  keyof ProductFiltersState,
  "priceMin" | "priceMax"
>;

function FilterIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

function mapOptions<T extends string>(
  ids: readonly T[],
  getLabel: (id: T) => string
): FilterOption[] {
  return ids.map((id) => ({ id, label: getLabel(id) }));
}

function FiltersPanelContent({
  state,
  onFilterChange,
  onPriceChange,
  onClear,
  hasActiveFilters,
  categoryOptions,
  brandOptions,
  priceMinBound,
  priceMaxBound,
}: {
  state: ProductFiltersState;
  onFilterChange: (key: CheckboxFilterKey, ids: string[]) => void;
  onPriceChange: (min: number, max: number) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  categoryOptions: FilterOption[];
  brandOptions: FilterOption[];
  priceMinBound: number;
  priceMaxBound: number;
}) {
  const t = useTranslations("products.filters");

  const checkboxSections: {
    key: CheckboxFilterKey;
    title: string;
    name: string;
    options: FilterOption[];
  }[] = [
    {
      key: "brands",
      title: t("brands"),
      name: "brands",
      options: brandOptions,
    },
    {
      key: "warranties",
      title: t("warranty"),
      name: "warranties",
      options: mapOptions(PRODUCT_WARRANTY_IDS, (id) =>
        t(`warranty_options.${id}`),
      ),
    },
    {
      key: "finishes",
      title: t("finish"),
      name: "finishes",
      options: mapOptions(PRODUCT_FINISH_IDS, (id) =>
        t(`finish_options.${id}`),
      ),
    },
    {
      key: "certifications",
      title: t("certifications"),
      name: "certifications",
      options: mapOptions(PRODUCT_CERTIFICATION_IDS, (id) =>
        t(`certification_options.${id}`),
      ),
    },
    {
      key: "thicknesses",
      title: t("thickness"),
      name: "thicknesses",
      options: mapOptions(PRODUCT_THICKNESS_IDS, (id) =>
        t(`thickness_options.${id}`),
      ),
    },
    {
      key: "diameters",
      title: t("diameter"),
      name: "diameters",
      options: mapOptions(PRODUCT_DIAMETER_IDS, (id) =>
        t(`diameter_options.${id}`),
      ),
    },
    {
      key: "colors",
      title: t("color"),
      name: "colors",
      options: mapOptions(PRODUCT_COLOR_IDS, (id) => t(`color_options.${id}`)),
    },
    {
      key: "widths",
      title: t("width"),
      name: "widths",
      options: mapOptions(PRODUCT_WIDTH_IDS, (id) => t(`width_options.${id}`)),
    },
    {
      key: "lengths",
      title: t("length"),
      name: "lengths",
      options: mapOptions(PRODUCT_LENGTH_IDS, (id) => t(`length_options.${id}`)),
    },
    {
      key: "materials",
      title: t("material"),
      name: "materials",
      options: mapOptions(PRODUCT_MATERIAL_IDS, (id) =>
        t(`material_options.${id}`),
      ),
    },
    {
      key: "volumes",
      title: t("volume"),
      name: "volumes",
      options: mapOptions(PRODUCT_VOLUME_IDS, (id) => t(`volume_options.${id}`)),
    },
    {
      key: "packagings",
      title: t("packaging"),
      name: "packagings",
      options: mapOptions(PRODUCT_PACKAGING_IDS, (id) =>
        t(`packaging_options.${id}`),
      ),
    },
    {
      key: "formats",
      title: t("format"),
      name: "formats",
      options: mapOptions(PRODUCT_FORMAT_IDS, (id) => t(`format_options.${id}`)),
    },
    {
      key: "sizes",
      title: t("size"),
      name: "sizes",
      options: mapOptions(PRODUCT_SIZE_IDS, (id) => t(`size_options.${id}`)),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-primary" />
          <h2 className="font-sans text-base font-semibold tracking-wide text-foreground">
            {t("title")}
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer font-sans text-xs font-semibold tracking-wide text-primary transition-colors hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("clear_all")}
          </button>
        )}
      </div>

      <FilterSection
        title={t("categories")}
        defaultOpen
        activeCount={state.categories.length}
      >
        <CheckboxFilter
          name="categories"
          options={categoryOptions}
          selectedIds={state.categories}
          onChange={(ids) => onFilterChange("categories", ids)}
        />
      </FilterSection>

      <FilterSection
        title={t("price_range")}
        defaultOpen
        activeCount={
          state.priceMin !== priceMinBound || state.priceMax !== priceMaxBound
            ? 1
            : 0
        }
      >
        <PriceRangeFilter
          min={priceMinBound}
          max={priceMaxBound}
          valueMin={state.priceMin}
          valueMax={state.priceMax}
          onChange={onPriceChange}
          minLabel={t("min_price")}
          maxLabel={t("max_price")}
        />
      </FilterSection>

      {checkboxSections.map((section) => (
        <FilterSection
          key={section.key}
          title={section.title}
          activeCount={state[section.key].length}
        >
          <CheckboxFilter
            name={section.name}
            options={section.options}
            selectedIds={state[section.key]}
            onChange={(ids) => onFilterChange(section.key, ids)}
          />
        </FilterSection>
      ))}
    </>
  );
}

function countSelectedFilters(
  value: ProductFiltersState,
  priceMinBound: number,
  priceMaxBound: number
) {
  const checkboxCount =
    value.categories.length +
    value.brands.length +
    value.warranties.length +
    value.finishes.length +
    value.certifications.length +
    value.thicknesses.length +
    value.diameters.length +
    value.colors.length +
    value.widths.length +
    value.lengths.length +
    value.materials.length +
    value.volumes.length +
    value.packagings.length +
    value.formats.length +
    value.sizes.length;

  const priceActive =
    value.priceMin !== priceMinBound || value.priceMax !== priceMaxBound ? 1 : 0;

  return checkboxCount + priceActive;
}

export function ProductFilters({
  value,
  onChange,
  categoryOptions,
  brandOptions,
  priceMinBound = 0,
  priceMaxBound = 500,
  isLoading = false,
}: ProductFiltersProps) {
  const t = useTranslations("products.filters");
  const panelId = useId();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const resolvedCategoryOptions =
    categoryOptions && categoryOptions.length > 0
      ? categoryOptions
      : PRODUCT_FALLBACK_CATEGORY_IDS.map((id) => ({
          id,
          label: t(`category_options.${id}`),
        }));

  const resolvedBrandOptions =
    brandOptions && brandOptions.length > 0
      ? brandOptions
      : PRODUCT_FALLBACK_BRAND_IDS.map((id) => ({
          id,
          label: t(`brand_options.${id}`),
        }));

  const activeFilterCount = countSelectedFilters(
    value,
    priceMinBound,
    priceMaxBound
  );
  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = useCallback(() => {
    onChange({
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
      priceMin: priceMinBound,
      priceMax: priceMaxBound,
    });
  }, [onChange, priceMinBound, priceMaxBound]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileOpen]);

  const panelContent = isLoading ? (
    <ProductFiltersSkeleton />
  ) : (
    <FiltersPanelContent
      state={value}
      onFilterChange={(key, ids) => onChange({ ...value, [key]: ids })}
      onPriceChange={(priceMin, priceMax) =>
        onChange({ ...value, priceMin, priceMax })
      }
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
      categoryOptions={resolvedCategoryOptions}
      brandOptions={resolvedBrandOptions}
      priceMinBound={priceMinBound}
      priceMaxBound={priceMaxBound}
    />
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          disabled={isLoading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-sans text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-muted hover:bg-gray-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          aria-expanded={isMobileOpen}
          aria-controls={panelId}
        >
          <FilterIcon className="h-4 w-4 text-primary" />
          {t("title")}
          {!isLoading && activeFilterCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-sans text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          ) : null}
        </button>
      </div>

      <aside
        className="hidden w-full max-w-70 shrink-0 self-start rounded-xl border border-border bg-surface shadow-sm lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
        aria-label={t("title")}
        aria-busy={isLoading || undefined}
      >
        <div className="p-5">{panelContent}</div>
      </aside>

      {isMobileOpen && !isLoading ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-foreground/40"
            aria-label={t("close")}
            onClick={() => setIsMobileOpen(false)}
          />
          <aside
            id={panelId}
            className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-surface shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
          >
            <div className="flex items-center justify-end border-b border-border px-4 py-3">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-secondary transition-colors hover:bg-gray-light hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={t("close")}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{panelContent}</div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
