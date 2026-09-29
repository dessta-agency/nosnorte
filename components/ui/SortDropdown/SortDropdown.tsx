"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import type { SortOption } from "@/types/product";

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  options: { value: SortOption; label: string }[];
  className?: string;
  "aria-label"?: string;
};

export function SortDropdown({
  value,
  onChange,
  options,
  className = "",
  "aria-label": ariaLabel,
}: SortDropdownProps) {
  const selectId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full min-w-0 sm:w-auto sm:min-w-72 ${className}`}
    >
      <button
        id={selectId}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-border bg-background py-2.5 pr-3 pl-3 font-sans text-sm text-foreground transition-colors hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="truncate text-left">{selectedLabel}</span>
        <Image
          src={isOpen ? "/icons/slideup.png" : "/icons/slidedown.png"}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          aria-hidden
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={selectId}
          className="absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-background py-1 shadow-md"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`flex w-full cursor-pointer px-3 py-2.5 text-left font-sans text-sm transition-colors hover:bg-gray-light ${
                    isSelected
                      ? "font-semibold text-primary"
                      : "text-foreground"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
