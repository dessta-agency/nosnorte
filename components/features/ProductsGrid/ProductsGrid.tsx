"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/features/ProductCard/ProductCard";
import { ProductCardSkeleton } from "@/components/features/ProductCard/ProductCardSkeleton";
import { ProductsHeader } from "@/components/features/ProductsHeader/ProductsHeader";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import {
  matchesSelected,
  matchesSimulatedFilterAttributes,
} from "@/constants/product-filters";
import type { Product, ProductFiltersState, SortOption } from "@/types/product";

const PAGE_SIZE = 30;
const SKELETON_COUNT = 10;
/** Fade-out duration for products leaving the grid. */
const CARD_EXIT_MS = 280;
/** Enter animation duration for newly added products. */
const CARD_ENTER_MS = 420;
/** Stagger between newly entering cards. */
const CARD_STAGGER_MS = 45;
const CARD_STAGGER_MAX = 10;

type ProductsGridProps = {
  products: Product[];
  filters: ProductFiltersState;
  error: string | null;
  isLoading?: boolean;
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

  if (!matchesSelected(filters.categories, product.category)) {
    return false;
  }

  if (!matchesSelected(filters.brands, product.brand)) {
    return false;
  }

  return matchesSimulatedFilterAttributes(product.filterAttributes, filters);
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

function buildFiltersResetKey(filters: ProductFiltersState) {
  return [
    filters.priceMin,
    filters.priceMax,
    filters.categories.join("|"),
    filters.brands.join("|"),
    filters.warranties.join("|"),
    filters.finishes.join("|"),
    filters.certifications.join("|"),
    filters.thicknesses.join("|"),
    filters.diameters.join("|"),
    filters.colors.join("|"),
    filters.widths.join("|"),
    filters.lengths.join("|"),
    filters.materials.join("|"),
    filters.volumes.join("|"),
    filters.packagings.join("|"),
    filters.formats.join("|"),
    filters.sizes.join("|"),
  ].join("::");
}

export function ProductsGrid({
  products,
  filters,
  error,
  isLoading = false,
  sidebar,
}: ProductsGridProps) {
  const t = useTranslations("products");
  const tCommon = useTranslations("common");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<number>>(() => new Set());
  const [enteringIds, setEnteringIds] = useState<Set<number>>(() => new Set());
  const [enterOrder, setEnterOrder] = useState<Map<number, number>>(
    () => new Map(),
  );
  const isFirstResultsPass = useRef(true);
  const reduceMotionRef = useRef(false);
  const displayedProductsRef = useRef<Product[]>([]);
  const animationTimeoutsRef = useRef<number[]>([]);

  const filtersResetKey = useMemo(
    () => buildFiltersResetKey(filters),
    [filters],
  );
  const [pageFiltersKey, setPageFiltersKey] = useState(filtersResetKey);

  // Reset pagination when filters change (React-recommended adjust-during-render).
  if (pageFiltersKey !== filtersResetKey) {
    setPageFiltersKey(filtersResetKey);
    setPage(1);
  }

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    displayedProductsRef.current = displayedProducts;
  }, [displayedProducts]);

  useEffect(() => {
    return () => {
      for (const timeoutId of animationTimeoutsRef.current) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const matched = products.filter(
      (product) =>
        matchesFilters(product, filters) && matchesSearch(product, search),
    );
    return sortProducts(matched, sort);
  }, [products, filters, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const targetPageProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredProducts, currentPage],
  );

  const targetPageProductIds = useMemo(
    () => targetPageProducts.map((product) => product.id).join(","),
    [targetPageProducts],
  );

  useEffect(() => {
    for (const timeoutId of animationTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    animationTimeoutsRef.current = [];

    let cancelled = false;

    const schedule = (callback: () => void, delayMs: number) => {
      const timeoutId = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delayMs);
      animationTimeoutsRef.current.push(timeoutId);
    };

    // Defer state updates so this effect does not setState synchronously.
    schedule(() => {
      if (cancelled) return;

      if (isLoading || error) {
        setDisplayedProducts([]);
        setExitingIds(new Set());
        setEnteringIds(new Set());
        setEnterOrder(new Map());
        isFirstResultsPass.current = true;
        return;
      }

      const nextProducts = targetPageProducts;

      if (isFirstResultsPass.current) {
        isFirstResultsPass.current = false;
        setDisplayedProducts(nextProducts);
        setExitingIds(new Set());
        setEnteringIds(new Set());
        setEnterOrder(new Map());
        return;
      }

      if (reduceMotionRef.current) {
        setDisplayedProducts(nextProducts);
        setExitingIds(new Set());
        setEnteringIds(new Set());
        setEnterOrder(new Map());
        return;
      }

      const previousProducts = displayedProductsRef.current;
      const previousIds = new Set(
        previousProducts.map((product) => product.id),
      );
      const nextIds = new Set(nextProducts.map((product) => product.id));
      const leavingIds = previousProducts
        .filter((product) => !nextIds.has(product.id))
        .map((product) => product.id);
      const arrivingIds = nextProducts
        .filter((product) => !previousIds.has(product.id))
        .map((product) => product.id);

      const markEntering = (ids: number[]) => {
        if (ids.length === 0) return;
        setEnteringIds(new Set(ids));
        setEnterOrder(new Map(ids.map((id, index) => [id, index])));
        schedule(() => {
          setEnteringIds(new Set());
          setEnterOrder(new Map());
        }, CARD_ENTER_MS + CARD_STAGGER_MAX * CARD_STAGGER_MS);
      };

      if (leavingIds.length > 0) {
        setExitingIds(new Set(leavingIds));
        setEnteringIds(new Set());
        setEnterOrder(new Map());
        schedule(() => {
          setDisplayedProducts(targetPageProducts);
          setExitingIds(new Set());
          markEntering(
            targetPageProducts
              .filter((product) => !previousIds.has(product.id))
              .map((product) => product.id),
          );
        }, CARD_EXIT_MS);
        return;
      }

      if (arrivingIds.length > 0) {
        setDisplayedProducts(nextProducts);
        markEntering(arrivingIds);
        return;
      }

      setDisplayedProducts(nextProducts);
      setExitingIds(new Set());
      setEnteringIds(new Set());
      setEnterOrder(new Map());
    }, 0);

    return () => {
      cancelled = true;
      for (const timeoutId of animationTimeoutsRef.current) {
        window.clearTimeout(timeoutId);
      }
      animationTimeoutsRef.current = [];
    };
  }, [targetPageProductIds, targetPageProducts, isLoading, error]);

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
    if (error) {
      return (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-surface p-8">
          <p className="font-sans text-sm text-error">{error}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
        >
          <span className="sr-only">{tCommon("loading")}</span>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (displayedProducts.length === 0) {
      return (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-surface p-8">
          <p className="font-sans text-sm text-muted">{t("no_results")}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {displayedProducts.map((product) => {
            const isExiting = exitingIds.has(product.id);
            const isEntering = enteringIds.has(product.id);
            const enterIndex = enterOrder.get(product.id) ?? 0;

            return (
              <div
                key={product.id}
                className="motion-reduce:animate-none"
                style={
                  isExiting
                    ? {
                        animation: `products-grid-exit ${CARD_EXIT_MS}ms ease-out forwards`,
                      }
                    : isEntering
                      ? {
                          animation: `products-grid-enter ${CARD_ENTER_MS}ms ease-out both`,
                          animationDelay: `${Math.min(enterIndex, CARD_STAGGER_MAX) * CARD_STAGGER_MS}ms`,
                        }
                      : undefined
                }
              >
                <ProductCard product={product} />
              </div>
            );
          })}
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
      {!error ? (
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
              isLoading={isLoading}
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
