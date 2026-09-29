"use client";

import Image from "next/image";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel: string;
  nextLabel: string;
  pageLabel: string;
};

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel,
  nextLabel,
  pageLabel,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const baseButtonClass =
    "inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg border font-sans text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label={pageLabel}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`${baseButtonClass} border-border bg-background px-3 text-secondary hover:border-muted hover:bg-gray-light hover:text-foreground`}
        aria-label={previousLabel}
      >
        <Image
          src="/icons/arrowleft.png"
          alt=""
          width={16}
          height={16}
          className="shrink-0"
        />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`${pageLabel} ${page}`}
            className={`${baseButtonClass} ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border bg-background text-secondary hover:border-muted hover:bg-gray-light hover:text-foreground"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`${baseButtonClass} border-border bg-background px-3 text-secondary hover:border-muted hover:bg-gray-light hover:text-foreground`}
        aria-label={nextLabel}
      >
        <Image
          src="/icons/arrowright.png"
          alt=""
          width={16}
          height={16}
          className="shrink-0"
        />
      </button>
    </nav>
  );
}
