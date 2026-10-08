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
  /** Enter transition duration in milliseconds. Defaults to `1000`. */
  durationMs?: number;
  /** Fraction of the element that must be visible to trigger (0–1). Defaults to `0` (any visible pixel). */
  threshold?: number;
  /**
   * Reveal on mount without waiting for scroll.
   * Use for primary page content that is already (or mostly) in view.
   */
  immediate?: boolean;
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
 * Reveals children once when they enter the viewport (or immediately when `immediate`).
 * Honours `prefers-reduced-motion` via Tailwind `motion-reduce` utilities.
 */
export function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delayMs = 0,
  durationMs = 1000,
  threshold = 0,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible when `immediate` so the first paint is not a blank/white block.
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;

    const node = ref.current;
    if (!node) return;

    let hasRevealed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasRevealed) return;
        hasRevealed = true;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold,
        // Expand the root so near-fold content reveals without a tiny scroll nudge.
        rootMargin: "0px 0px 20% 0px",
      },
    );

    observer.observe(node);

    const frame = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight * 1.2 && rect.bottom > 0) {
        if (hasRevealed) return;
        hasRevealed = true;
        setVisible(true);
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [threshold, immediate]);

  const stateClass = visible
    ? VISIBLE_BY_VARIANT[variant]
    : HIDDEN_BY_VARIANT[variant];

  const style: CSSProperties = {
    transitionDuration: `${durationMs}ms`,
    ...(delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
  };

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${stateClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
