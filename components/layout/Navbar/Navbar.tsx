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

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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

  const mobileLinkClassName = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return [
      "block rounded-md px-3 py-1.5 text-sm transition-colors",
      isActive
        ? "bg-primary font-semibold text-white"
        : "font-medium text-foreground hover:text-primary",
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
              aria-label={isMenuOpen ? tCommon("close_menu") : tCommon("open_menu")}
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
          id="mobile-nav"
          className={isMenuOpen ? "border-t border-border md:hidden" : "hidden"}
          aria-hidden={!isMenuOpen}
        >
          <Container>
            <ul className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map(({ href, translationKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={mobileLinkClassName(href)}
                    onClick={() => setOpenForPath(null)}
                  >
                    {t(translationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
    </header>
  );
}
