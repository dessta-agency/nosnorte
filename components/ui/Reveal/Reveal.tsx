"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type RevealVariant = "fade" | "fade-up";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animation style when entering the viewport. Defaults to `fade-up`. */
  variant?: RevealVariant;
  /** Extra delay before the enter transition starts, in milliseconds. */
  delayMs?: number;
  /** Fraction of the element that must be visible to trigger (0–1). */
  threshold?: number;
};

const HIDDEN_BY_VARIANT: Record<RevealVariant, string> = {
  fade: "opacity-0",
  "fade-up": "opacity-0 translate-y-4",
};

const VISIBLE_BY_VARIANT: Record<RevealVariant, string> = {
  fade: "opacity-100",
  "fade-up": "opacity-100 translate-y-0",
};

/**
 * Reveals children once when they enter the viewport.
 * Honours `prefers-reduced-motion` via Tailwind `motion-reduce` utilities.
 */
export function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delayMs = 0,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const stateClass = visible
    ? VISIBLE_BY_VARIANT[variant]
    : HIDDEN_BY_VARIANT[variant];

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${stateClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
