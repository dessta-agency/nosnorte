import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvironmentDetailView } from "@/components/features/Ambientes/EnvironmentDetailView";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { getAmbienteCopyKey } from "@/constants/ambiente-copy";
import {
  getAllAmbienteSlugs,
  getAmbienteBySlug,
  getAmbientes,
} from "@/constants/ambientes";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export const dynamic = "force-dynamic";

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
  const ambientes = getAmbientes();
  const index = ambientes.findIndex((ambiente) => ambiente.slug === slug);

  if (index < 0) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "ambientes" });
  const copyKey = getAmbienteCopyKey(slug);
  const title =
    copyKey === "auto"
      ? t("items.auto.name", { n: index + 1 })
      : t(`items.${copyKey}.name`);

  return { title };
}

export default async function AmbienteDetailPage({
  params,
}: AmbienteDetailPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const ambientes = getAmbientes();
  const index = ambientes.findIndex((ambiente) => ambiente.slug === slug);
  const ambiente = index >= 0 ? ambientes[index] : getAmbienteBySlug(slug);

  if (!ambiente || index < 0) {
    notFound();
  }

  const n = index + 1;
  const copyKey = getAmbienteCopyKey(ambiente.slug);
  const t = await getTranslations({ locale, namespace: "ambientes" });
  const itemNamespace =
    copyKey === "auto"
      ? "ambientes.items.auto"
      : (`ambientes.items.${copyKey}` as const);
  const tItem = await getTranslations({
    locale,
    namespace: itemNamespace,
  });

  const materials = ambiente.products.map((product) => ({
    typeLabel: t(`product_types.${product.type}`),
    name: tItem(`materials.${product.materialKey}` as "materials.pavimento"),
  }));

  const imageAlt =
    copyKey === "auto" ? tItem("image_alt", { n }) : tItem("image_alt");
  const name = copyKey === "auto" ? tItem("name", { n }) : tItem("name");
  const galleryImages = ambiente.images
    .filter((src) => src !== ambiente.coverImage)
    .map((src, galleryIndex) => ({
      src,
      alt: `${imageAlt} ${galleryIndex + 2}`,
    }));

  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden md:min-h-[64vh]">
        <Image
          src={ambiente.coverImage}
          alt={imageAlt}
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
            name={name}
            categoryLabel={t(`gallery.filters.${ambiente.category}`)}
            description={tItem("description")}
            materialsTitle={t("detail.materials_title")}
            materials={materials}
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
