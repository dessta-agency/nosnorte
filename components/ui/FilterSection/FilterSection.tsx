"use client";

import { useId, useState, type ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** Number of active options in this section; when > 0, title stays primary with a badge. */
  activeCount?: number;
};

export function FilterSection({
  title,
  children,
  defaultOpen = false,
  className = "",
  activeCount = 0,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const hasActiveFilters = activeCount > 0;

  return (
    <section className={`border-b border-border last:border-b-0 ${className}`}>
      <h3>
        <button
          type="button"
          className={`flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left font-sans text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            hasActiveFilters
              ? "text-primary"
              : "text-foreground hover:text-primary"
          }`}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <span className="truncate">{title}</span>
            {hasActiveFilters ? (
              <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 font-sans text-[0.65rem] leading-none font-semibold text-white tabular-nums">
                {activeCount}
              </span>
            ) : null}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
              hasActiveFilters ? "text-primary" : "text-muted"
            } ${isOpen ? "rotate-180" : "rotate-0"}`}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </h3>
      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: true as const } : {})}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
