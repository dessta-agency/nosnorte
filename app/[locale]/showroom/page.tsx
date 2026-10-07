import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ShowroomGallery,
  type ShowroomImage,
} from "@/components/features/Showroom/ShowroomGallery";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

const SHOWROOM_IMAGES_META = [
  { id: "1", src: "/images/showroom/1.jpg", span: 2 },
  { id: "2", src: "/images/showroom/2.jpg", span: 1 },
  { id: "3", src: "/images/showroom/3.jpg", span: 2 },
  { id: "4", src: "/images/showroom/4.jpg", span: 1 },
  { id: "5", src: "/images/showroom/5.jpg", span: 1 },
  { id: "6", src: "/images/showroom/6.jpg", span: 2 },
  { id: "7", src: "/images/showroom/7.jpg", span: 1 },
  { id: "8", src: "/images/showroom/8.jpg", span: 2 },
  { id: "9", src: "/images/showroom/9.jpg", span: 1 },
  { id: "10", src: "/images/showroom/10.jpg", span: 1 },
] as const;

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

  const images: ShowroomImage[] = SHOWROOM_IMAGES_META.map((image) => ({
    src: image.src,
    span: image.span,
    alt: t(`gallery.images.${image.id}.alt`),
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
        <Reveal>
          <section className="py-12 md:py-16">
            <ShowroomGallery
              images={images}
              closeLabel={t("gallery.image_modal_close")}
            />
          </section>
        </Reveal>
      </PageContainer>
    </>
  );
}
