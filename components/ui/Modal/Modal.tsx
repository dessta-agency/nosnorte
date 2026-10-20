"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeLabel: string;
  className?: string;
  hideTitle?: boolean;
  /** Transparent panel for media lightboxes (no surface fill, border, or shadow). */
  variant?: "default" | "media";
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const MODAL_EXIT_MS = 220;

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeLabel,
  className = "",
  hideTitle = false,
  variant = "default",
}: ModalProps) {
  const isMedia = variant === "media";
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const exitMs = prefersReducedMotion ? 0 : MODAL_EXIT_MS;
    const timeout = window.setTimeout(() => {
      setIsMounted(false);
    }, exitMs);
    return () => window.clearTimeout(timeout);
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (!isMounted) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMounted, onClose]);

  if (!isMounted || typeof document === "undefined") {
    return null;
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const overlayMotion = prefersReducedMotion
    ? "transition-none"
    : isVisible
      ? "transition-opacity duration-300 ease-out"
      : "transition-opacity duration-200 ease-in";

  const panelMotion = prefersReducedMotion
    ? "transition-none"
    : isVisible
      ? "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      : "transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,1,1)]";

  const overlayState = isVisible ? "opacity-100" : "opacity-0";
  const panelState = isVisible
    ? "translate-y-0 scale-100 opacity-100"
    : "translate-y-3 scale-[0.96] opacity-0";

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 ${overlayMotion} ${overlayState}`}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={
          isMedia
            ? `relative w-fit max-w-full p-0 outline-none ${panelMotion} ${panelState} ${className}`
            : `relative w-full max-w-2xl rounded-xl border border-border bg-surface p-6 shadow-lg outline-none ${panelMotion} ${panelState} ${className}`
        }
      >
        <div
          className={`mb-4 flex items-start justify-between gap-4 ${
            hideTitle ? "mb-0 justify-end" : ""
          } ${isMedia ? "absolute top-2 right-2 z-10 mb-0 sm:top-3 sm:right-3" : ""}`}
        >
          <h2
            id={titleId}
            className={
              hideTitle
                ? "sr-only"
                : "font-sans text-lg font-semibold text-foreground"
            }
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className={
              isMedia
                ? "shrink-0 cursor-pointer rounded-md bg-black/40 p-1.5 font-sans text-white transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                : "shrink-0 cursor-pointer rounded-md p-1.5 font-sans text-primary transition-colors hover:bg-primary/10 hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
