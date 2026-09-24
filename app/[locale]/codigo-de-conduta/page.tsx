import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("code_of_conduct") };
}

export default async function CodeOfConductPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <PageContainer />;
}
