import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageGallery } from "@/components/features/History/ImageGallery";
import { MissionCard } from "@/components/features/History/MissionCard";
import { Timeline } from "@/components/features/History/Timeline";
import { ValueCard } from "@/components/features/History/ValueCard";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

const MILESTONE_KEYS = ["1989", "1995", "2004", "2009"] as const;
const MISSION_IMAGE = "/images/others/mission.jpg";

const PROJECT_IMAGES = [
  "/images/home/image1.jpg",
  "/images/home/image2.jpg",
  "/images/home/image3.jpg",
] as const;

const INTERNATIONAL_IMAGES = [
  "/images/home/image3.jpg",
  "/images/home/image1.jpg",
  "/images/home/image2.jpg",
] as const;

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("historia") };
}

export default async function HistoriaPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "historia" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const milestones = MILESTONE_KEYS.map((key) => ({
    year: t(`timeline.milestones.${key}.year`),
    title: t(`timeline.milestones.${key}.title`),
    description: t(`timeline.milestones.${key}.description`),
  }));

  return (
    <>
      <PageHero
        eyebrow={tCommon("company_name")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/others/mission.jpg"
      />

      <PageContainer>
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
              {t("what_we_do.title")}
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-secondary md:text-lg">
              {t("what_we_do.description")}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="grid items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.55fr)]">
            <div className="relative z-0 self-stretch lg:translate-x-3">
              <div className="relative overflow-hidden rounded-2xl lg:my-8 lg:rounded-r-none lg:[clip-path:polygon(0_0,100%_0,calc(100%-5rem)_100%,0_100%)]">
                <MissionCard
                  eyebrow={t("mission.eyebrow")}
                  title={t("mission.title")}
                  description={t("mission.description")}
                  image={MISSION_IMAGE}
                />
              </div>
            </div>

            <div className="relative z-10 lg:-ml-20">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl bg-border/70 lg:rounded-l-none lg:[clip-path:polygon(5rem_0,100%_0,100%_100%,0_100%)]"
              />
              <div className="relative m-px grid gap-8 rounded-[calc(1rem-1px)] bg-surface px-6 py-14 shadow-[0_2px_12px_rgb(0_0_0/0.08)] sm:grid-cols-3 sm:gap-0 md:px-8 md:py-20 lg:rounded-l-none lg:rounded-r-[calc(1rem-1px)] lg:pl-20 lg:[clip-path:polygon(5rem_0,100%_0,100%_100%,0_100%)]">
                <div className="sm:pr-6 md:pr-8">
                  <ValueCard
                    icon="advice"
                    title={t("values.technical_advice.title")}
                    description={t("values.technical_advice.description")}
                  />
                </div>
                <div className="sm:px-6 md:px-8">
                  <ValueCard
                    icon="diversity"
                    title={t("values.diversity.title")}
                    description={t("values.diversity.description")}
                  />
                </div>
                <div className="sm:pl-6 md:pl-8">
                  <ValueCard
                    icon="delivery"
                    title={t("values.delivery.title")}
                    description={t("values.delivery.description")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <Timeline
            title={t("timeline.title")}
            description={t("timeline.description")}
            milestones={milestones}
          />
        </section>

        <section className="pb-12 md:pb-16">
          <ImageGallery
            images={PROJECT_IMAGES.map((src, index) => ({
              src,
              alt: `${t("gallery.projects_caption")} ${index + 1}`,
              caption: `${t("gallery.projects_caption")} ${index + 1}`,
            }))}
          />
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
              {t("internationalization.title")}
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-secondary md:text-lg">
              {t("internationalization.description")}
            </p>
          </div>
          <div className="mt-10">
            <ImageGallery
              images={INTERNATIONAL_IMAGES.map((src, index) => ({
                src,
                alt: `${t("gallery.international_caption")} ${index + 1}`,
                caption: `${t("gallery.international_caption")} ${index + 1}`,
              }))}
            />
          </div>
        </section>
      </PageContainer>
    </>
  );
}
