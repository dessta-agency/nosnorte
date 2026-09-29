"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/features/ProductCard/ProductCard";
import { ProductsHeader } from "@/components/features/ProductsHeader/ProductsHeader";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import type { Product, ProductFiltersState, SortOption } from "@/types/product";

const PAGE_SIZE = 30;

type ProductsGridProps = {
  products: Product[];
  filters: ProductFiltersState;
  isLoading: boolean;
  error: string | null;
  sidebar?: ReactNode;
};

function matchesSearch(product: Product, query: string) {
  if (!query.trim()) return true;
  const normalized = query.trim().toLowerCase();
  return (
    product.title.toLowerCase().includes(normalized) ||
    product.description.toLowerCase().includes(normalized) ||
    (product.brand ?? "").toLowerCase().includes(normalized) ||
    product.category.toLowerCase().includes(normalized)
  );
}

function matchesFilters(product: Product, filters: ProductFiltersState) {
  if (product.price < filters.priceMin || product.price > filters.priceMax) {
    return false;
  }

  if (
    filters.categories.length > 0 &&
    !filters.categories.includes(product.category)
  ) {
    return false;
  }

  if (
    filters.brands.length > 0 &&
    !filters.brands.includes(product.brand ?? "")
  ) {
    return false;
  }

  // Remaining checkbox filters are UI-only mocks for DummyJSON
  return true;
}

function sortProducts(products: Product[], sort: SortOption) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    case "relevance":
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}

export function ProductsGrid({
  products,
  filters,
  isLoading,
  error,
  sidebar,
}: ProductsGridProps) {
  const t = useTranslations("products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const matched = products.filter(
      (product) =>
        matchesFilters(product, filters) && matchesSearch(product, search)
    );
    return sortProducts(matched, sort);
  }, [products, filters, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "relevance", label: t("sort_options.relevance") },
    { value: "price-asc", label: t("sort_options.price_asc") },
    { value: "price-desc", label: t("sort_options.price_desc") },
    { value: "newest", label: t("sort_options.newest") },
  ];

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSort(value);
    setPage(1);
  }, []);

  const resultsContent = (() => {
    if (isLoading) {
      return (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-surface p-8">
          <p className="font-sans text-sm text-muted">{t("loading")}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-surface p-8">
          <p className="font-sans text-sm text-error">{error}</p>
        </div>
      );
    }

    if (pageProducts.length === 0) {
      return (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-surface p-8">
          <p className="font-sans text-sm text-muted">{t("no_results")}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {pageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          previousLabel={t("previous_page")}
          nextLabel={t("next_page")}
          pageLabel={t("page")}
        />
      </div>
    );
  })();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      {!isLoading && !error ? (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div
            className="hidden w-full max-w-70 shrink-0 lg:block"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <ProductsHeader
              resultsLabel={t("results_count", {
                count: filteredProducts.length,
              })}
              searchValue={search}
              onSearchChange={handleSearchChange}
              searchPlaceholder={t("search_placeholder")}
              sortValue={sort}
              onSortChange={handleSortChange}
              sortAriaLabel={t("sort_by")}
              sortOptions={sortOptions}
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {sidebar}
        <div className="min-w-0 flex-1">{resultsContent}</div>
      </div>
    </div>
  );
}
