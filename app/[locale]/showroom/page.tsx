import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ShowroomGallery,
  type ShowroomImage,
} from "@/components/features/Showroom/ShowroomGallery";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";
import { getShowroomImages } from "@/utils/showroom-images";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("showroom") };
}

export default async function ShowroomPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "showroom" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const showroomFiles = getShowroomImages();

  const images: ShowroomImage[] = showroomFiles.map((image) => ({
    src: image.src,
    span: image.span,
    alt: t("gallery.image_alt", { n: image.id }),
  }));

  return (
    <>
      <PageHero
        eyebrow={tCommon("company_name")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/backgrounds/showroom.jpg"
      />

      <PageContainer>
        <section className="py-12 md:py-16">
          <ShowroomGallery
            images={images}
            closeLabel={t("gallery.image_modal_close")}
            previousLabel={t("gallery.image_modal_previous")}
            nextLabel={t("gallery.image_modal_next")}
          />
        </section>
      </PageContainer>
    </>
  );
}
