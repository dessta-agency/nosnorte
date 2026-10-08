import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvironmentsGallery } from "@/components/features/Ambientes/EnvironmentsGallery";
import { EnvironmentsIntro } from "@/components/features/Ambientes/EnvironmentsIntro";
import { Container } from "@/components/layout/Container/Container";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  AMBIENTE_CATALOG,
  getAmbienteCopyKey,
} from "@/constants/ambiente-copy";
import {
  getAmbienteIntroCards,
  getAmbientes,
} from "@/constants/ambientes";
import {
  AMBIENTE_CATEGORY_IDS,
  type AmbienteFilterId,
  type AmbienteListItem,
} from "@/types/ambiente";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export const dynamic = "force-dynamic";

type AmbientesPageProps = LocalePageProps & {
  searchParams: Promise<{ categoria?: string }>;
};

function resolveFilter(value: string | undefined): AmbienteFilterId {
  if (
    value &&
    (AMBIENTE_CATEGORY_IDS as readonly string[]).includes(value)
  ) {
    return value as AmbienteFilterId;
  }
  return "all";
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("ambientes") };
}

export default async function AmbientesPage({
  params,
  searchParams,
}: AmbientesPageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ambientes" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const query = await searchParams;
  const initialFilter = resolveFilter(query.categoria);
  const ambientes = getAmbientes();

  const galleryItems: AmbienteListItem[] = ambientes.map((ambiente, index) => {
    const copyKey = getAmbienteCopyKey(ambiente.slug);
    const n = index + 1;

    return {
      slug: ambiente.slug,
      category: ambiente.category,
      categoryLabel: t(`gallery.filters.${ambiente.category}`),
      name:
        copyKey === "auto"
          ? t("items.auto.name", { n })
          : t(`items.${copyKey}.name`),
      excerpt:
        copyKey === "auto"
          ? t("items.auto.excerpt")
          : t(`items.${copyKey}.excerpt`),
      coverImage: ambiente.coverImage,
      imageAlt:
        copyKey === "auto"
          ? t("items.auto.image_alt", { n })
          : t(`items.${copyKey}.image_alt`),
      span: ambiente.span ?? 1,
      href: `/ambientes/${ambiente.slug}`,
    };
  });

  const introCards = getAmbienteIntroCards().map((card) => ({
    id: card.id,
    title: t(`intro_cards.${card.messageKey}.title`),
    subtitle: t(`intro_cards.${card.messageKey}.subtitle`),
    image: card.image,
  }));

  const filters =
    AMBIENTE_CATEGORY_IDS.length > 1
      ? [
          { id: "all" as const, label: t("gallery.filters.all") },
          ...AMBIENTE_CATEGORY_IDS.map((id) => ({
            id,
            label: t(`gallery.filters.${id}`),
          })),
        ]
      : [];

  const heroEntry = AMBIENTE_CATALOG[2] ?? AMBIENTE_CATALOG[0];
  const heroBackground = heroEntry
    ? `/images/showroom/${heroEntry.fileName}`
    : "/images/backgrounds/background.png";

  return (
    <>
      <PageHero
        eyebrow={tCommon("company_name")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage={heroBackground}
      />

      <main>
        <Reveal>
          <EnvironmentsIntro
            eyebrow={t("categories.eyebrow")}
            title={t("categories.title")}
            description={t("categories.description")}
            ctaLabel={t("categories.cta")}
            ctaHref="#galeria"
            cards={introCards}
          />
        </Reveal>

        <Container className="mt-4 min-h-[50vh] pb-16">
          <EnvironmentsGallery
            key={initialFilter}
            eyebrow={t("gallery.eyebrow")}
            title={t("gallery.title")}
            emptyLabel={t("gallery.empty")}
            filters={filters}
            items={galleryItems}
            initialFilter={initialFilter}
          />
        </Container>
      </main>
    </>
  );
}
