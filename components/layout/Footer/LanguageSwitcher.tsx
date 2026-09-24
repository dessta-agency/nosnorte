"use client";

import { useLocale } from "next-intl";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  label: string;
};

export function LanguageSwitcher({ label }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-4" aria-label={label}>
      {locales.map((lang) => {
        const isActive = lang === locale;

        return (
          <li key={lang}>
            <Link
              href={pathname}
              locale={lang}
              className={[
                "font-bold transition-colors hover:text-footer-text-secondary",
                isActive ? "text-footer-text-secondary underline" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "true" : undefined}
            >
              {localeLabels[lang]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
