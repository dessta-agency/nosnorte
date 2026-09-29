"use client";

import { useId } from "react";

type PriceRangeFilterProps = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
  minLabel: string;
  maxLabel: string;
  currencySymbol?: string;
  step?: number;
};

const THUMB_STYLES = [
  "appearance-none",
  "pointer-events-none",
  "absolute inset-0 h-6 w-full cursor-pointer bg-transparent",
  "[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent",
  "[&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent",
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10",
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
  "[&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm",
  "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10",
  "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
  "[&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:shadow-sm",
  "focus-visible:outline-none",
  "[&::-webkit-slider-thumb]:focus-visible:outline [&::-webkit-slider-thumb]:focus-visible:outline-2",
  "[&::-webkit-slider-thumb]:focus-visible:outline-offset-2 [&::-webkit-slider-thumb]:focus-visible:outline-primary",
].join(" ");

function formatPrice(value: number, currencySymbol: string) {
  return `${currencySymbol}${value.toLocaleString("pt-PT")}`;
}

export function PriceRangeFilter({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
  minLabel,
  maxLabel,
  currencySymbol = "€",
  step = 1,
}: PriceRangeFilterProps) {
  const minId = useId();
  const maxId = useId();
  const range = max - min || 1;
  const minPercent = ((valueMin - min) / range) * 100;
  const maxPercent = ((valueMax - min) / range) * 100;

  const handleMinChange = (raw: string) => {
    const next = Number(raw);
    if (Number.isNaN(next)) return;
    onChange(Math.min(next, valueMax), valueMax);
  };

  const handleMaxChange = (raw: string) => {
    const next = Number(raw);
    if (Number.isNaN(next)) return;
    onChange(valueMin, Math.max(next, valueMin));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 font-sans text-sm">
        <span className="font-medium text-foreground">
          {formatPrice(valueMin, currencySymbol)}
        </span>
        <span className="text-muted" aria-hidden>
          —
        </span>
        <span className="font-medium text-foreground">
          {formatPrice(valueMax, currencySymbol)}
        </span>
      </div>

      <div className="relative h-6 px-0.5">
        <div
          className="absolute top-1/2 right-0.5 left-0.5 h-1 -translate-y-1/2 rounded-full bg-gray-light"
          aria-hidden
        />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `calc(${minPercent}% + 2px)`,
            width: `calc(${maxPercent - minPercent}% )`,
          }}
          aria-hidden
        />

        <input
          id={minId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(event) => handleMinChange(event.target.value)}
          aria-label={minLabel}
          className={`${THUMB_STYLES} z-1`}
        />
        <input
          id={maxId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(event) => handleMaxChange(event.target.value)}
          aria-label={maxLabel}
          className={`${THUMB_STYLES} z-2`}
        />
      </div>
    </div>
  );
}
