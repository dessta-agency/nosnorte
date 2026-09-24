export const locales = ["pt", "en", "es", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
  fr: "FR",
};

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
};
