import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvironmentDetailView } from "@/components/features/Ambientes/EnvironmentDetailView";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  getAllAmbienteSlugs,
  getAmbienteBySlug,
} from "@/constants/ambientes";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

type AmbienteDetailPageProps = LocalePageProps & {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllAmbienteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AmbienteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const ambiente = getAmbienteBySlug(slug);

  if (!ambiente) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `ambientes.items.${ambiente.slug}`,
  });
  return { title: t("name") };
}

export default async function AmbienteDetailPage({
  params,
}: AmbienteDetailPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const ambiente = getAmbienteBySlug(slug);
  if (!ambiente) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "ambientes" });
  const tItem = await getTranslations({
    locale,
    namespace: `ambientes.items.${ambiente.slug}`,
  });

  const materials = ambiente.products.map((product) => ({
    typeLabel: t(`product_types.${product.type}`),
    name: tItem(`materials.${product.materialKey}` as "materials.pavimento"),
    href: product.href,
  }));

  const galleryImages = ambiente.images
    .filter((src) => src !== ambiente.coverImage)
    .map((src, index) => ({
      src,
      alt: `${tItem("image_alt")} ${index + 2}`,
    }));

  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden md:min-h-[64vh]">
        <Image
          src={ambiente.coverImage}
          alt={tItem("image_alt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </section>

      <PageContainer>
        <Reveal>
          <EnvironmentDetailView
            name={tItem("name")}
            categoryLabel={t(`gallery.filters.${ambiente.category}`)}
            description={tItem("description")}
            materialsTitle={t("detail.materials_title")}
            materials={materials}
            viewProductLabel={t("detail.view_product")}
            galleryTitle={t("detail.gallery_title")}
            galleryImages={galleryImages}
            backLabel={t("detail.back")}
            backHref="/ambientes"
          />
        </Reveal>
      </PageContainer>
    </>
  );
}
