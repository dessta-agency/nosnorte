import {
  defaultLocale,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleName(locale: Locale): string {
  return localeNames[locale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];

  if (segment && isValidLocale(segment)) {
    return segment;
  }

  return defaultLocale;
}
