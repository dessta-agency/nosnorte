"use client";

import type { ReactNode } from "react";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { SortDropdown } from "@/components/ui/SortDropdown/SortDropdown";
import type { SortOption } from "@/types/product";

type ProductsHeaderProps = {
  resultsLabel: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  sortAriaLabel: string;
  sortOptions: { value: SortOption; label: string }[];
  isLoading?: boolean;
};

export function ProductsHeader({
  resultsLabel,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  sortValue,
  onSortChange,
  sortAriaLabel,
  sortOptions,
  isLoading = false,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <p className="font-sans text-sm font-semibold text-foreground">
        {isLoading ? (
          <span className="inline-block h-5 w-28" aria-hidden />
        ) : (
          resultsLabel
        )}
      </p>

      <div
        className={`flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:max-w-none lg:justify-end ${
          isLoading ? "invisible pointer-events-none" : ""
        }`}
        aria-hidden={isLoading || undefined}
      >
        <SortDropdown
          value={sortValue}
          onChange={onSortChange}
          options={sortOptions}
          aria-label={sortAriaLabel}
        />
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 sm:min-w-56 lg:w-64 lg:flex-none"
        />
      </div>
    </div>
  );
}
