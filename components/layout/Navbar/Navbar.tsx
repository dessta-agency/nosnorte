"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container/Container";
import { NAV_LINKS } from "@/constants/navigation";
import { Link, usePathname } from "@/i18n/navigation";

const SCROLL_THRESHOLD = 160;
const NAV_MOTION =
  "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Navbar() {
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const isMenuOpen = openForPath === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenForPath(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const activeHref = NAV_LINKS.find(({ href }) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href)
    )?.href;

    if (!activeHref || !navRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeLink = linkRefs.current.get(activeHref);
    if (!activeLink) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
      opacity: 1,
    });
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setOpenForPath((current) => (current === pathname ? null : pathname));
  }, [pathname]);

  const linkClassName = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return [
      "relative z-10 rounded-md px-3 py-1.5 text-sm transition-colors",
      isActive ? "font-semibold text-white" : "font-medium text-foreground hover:text-primary",
    ].join(" ");
  };

  const closeMenu = useCallback(() => {
    setOpenForPath(null);
  }, []);

  const mobileLinkClassName = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return [
      "block rounded-md px-4 py-3 text-lg transition-colors",
      isActive
        ? "bg-primary font-semibold text-white"
        : "font-medium text-foreground hover:bg-secondary hover:text-primary",
    ].join(" ");
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-background border-b",
        "transition-[padding,box-shadow,border-color]",
        NAV_MOTION,
        isScrolled
          ? "border-border/40 pt-0 shadow-sm"
          : "border-transparent pt-2 shadow-none",
      ].join(" ")}
    >
      <Container
        className={[
          "flex items-center justify-between",
          "transition-[height]",
          NAV_MOTION,
          isScrolled ? "h-18" : "h-20",
        ].join(" ")}
      >
          <nav
            className="flex w-full items-center justify-between"
            aria-label={tCommon("main_navigation")}
          >
            <Link href="/" className="shrink-0" aria-label={tCommon("home_aria_label")}>
              <Image
                src="/logos/LogoColor.svg"
                alt={tCommon("company_name")}
                width={200}
                height={56}
                className={[
                  "w-auto transition-[height,width,transform]",
                  NAV_MOTION,
                  isScrolled ? "h-12" : "h-14",
                ].join(" ")}
                priority
              />
            </Link>

            <ul ref={navRef} className="relative hidden items-center gap-4 md:flex lg:gap-5">
              <div
                className={[
                  "absolute rounded-md bg-primary transition-all",
                  NAV_MOTION,
                ].join(" ")}
                style={{
                  left: `${indicatorStyle.left}px`,
                  top: `${indicatorStyle.top}px`,
                  width: `${indicatorStyle.width}px`,
                  height: `${indicatorStyle.height}px`,
                  opacity: indicatorStyle.opacity,
                }}
                aria-hidden="true"
              />
              {NAV_LINKS.map(({ href, translationKey }) => (
                <li key={href}>
                  <Link
                    ref={(el) => {
                      if (el) linkRefs.current.set(href, el);
                      else linkRefs.current.delete(href);
                    }}
                    href={href}
                    className={linkClassName(href)}
                  >
                    {t(translationKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
              aria-label={tCommon("open_menu")}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={toggleMenu}
            >
              <Image
                src="/icons/menu.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </button>
          </nav>
        </Container>

        <div
          className={[
            "fixed inset-0 z-50 md:hidden",
            "transition-opacity duration-300 ease-out",
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label={tCommon("close_menu")}
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={closeMenu}
          />

          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={tCommon("main_navigation")}
            className={[
              "absolute inset-y-0 right-0 flex w-full flex-col bg-background",
              "shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMenuOpen ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link
                href="/"
                className="shrink-0"
                aria-label={tCommon("home_aria_label")}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <Image
                  src="/logos/LogoColor.svg"
                  alt={tCommon("company_name")}
                  width={160}
                  height={44}
                  className="h-11 w-auto"
                />
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2"
                aria-label={tCommon("close_menu")}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <Image
                  src="/icons/close.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label={tCommon("main_navigation")}>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map(({ href, translationKey }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={mobileLinkClassName(href)}
                      tabIndex={isMenuOpen ? 0 : -1}
                      onClick={closeMenu}
                    >
                      {t(translationKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
    </header>
  );
}
