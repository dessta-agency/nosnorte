import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductsCatalog } from "@/components/features/ProductsCatalog/ProductsCatalog";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("produtos") };
}

export default async function ProdutosPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <PageContainer>
      <Reveal>
        <ProductsCatalog />
      </Reveal>
    </PageContainer>
  );
}
