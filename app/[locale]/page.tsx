import { setRequestLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/features/HeroCarousel/HeroCarousel";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export default async function Home({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return <HeroCarousel />;
}
