"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  "aria-label"?: string;
  debounceMs?: number;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  debounceMs = 300,
  className = "",
}: SearchBarProps) {
  const inputId = useId();
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (next: string) => {
    setLocalValue(next);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(next);
    }, debounceMs);
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel ?? placeholder}
      </label>
      <Image
        src="/icons/search.png"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 object-contain"
        aria-hidden
      />
      <input
        id={inputId}
        type="search"
        value={localValue}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background py-2.5 pr-3 pl-10 font-sans text-sm text-foreground placeholder:text-muted transition-colors hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
    </div>
  );
}
