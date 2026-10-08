"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Show only after scrolling most of a viewport — not immediately on a small nudge.
 */
const SHOW_AFTER_VIEWPORTS = 0.85;

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("back_to_top")}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-5 bottom-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-secondary/80 shadow-sm backdrop-blur-sm transition-[opacity,transform,box-shadow,background-color] duration-300 ease-out hover:bg-secondary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:right-8 md:bottom-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Image
        src="/icons/top.png"
        alt=""
        width={32}
        height={32}
        className="block h-8 w-8 rounded-full mix-blend-screen"
        aria-hidden
      />
    </button>
  );
}
