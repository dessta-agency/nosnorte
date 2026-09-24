import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";

export type { Locale } from "@/i18n/config";
export { defaultLocale, localeLabels, localeNames, locales } from "@/i18n/config";

export type LocaleParams = {
  locale: string;
};

export type LocalePageProps = {
  params: Promise<LocaleParams>;
};

export async function resolveLocale(
  params: Promise<LocaleParams>
): Promise<Locale> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}
