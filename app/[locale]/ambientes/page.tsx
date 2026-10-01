import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvironmentsGallery } from "@/components/features/Ambientes/EnvironmentsGallery";
import { EnvironmentsIntro } from "@/components/features/Ambientes/EnvironmentsIntro";
import { Container } from "@/components/layout/Container/Container";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { AMBIENTE_INTRO_CARDS, AMBIENTES } from "@/constants/ambientes";
import {
  AMBIENTE_CATEGORY_IDS,
  type AmbienteFilterId,
  type AmbienteListItem,
} from "@/types/ambiente";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

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

  const galleryItems: AmbienteListItem[] = AMBIENTES.map((ambiente) => ({
    slug: ambiente.slug,
    category: ambiente.category,
    categoryLabel: t(`gallery.filters.${ambiente.category}`),
    name: t(`items.${ambiente.slug}.name`),
    excerpt: t(`items.${ambiente.slug}.excerpt`),
    coverImage: ambiente.coverImage,
    imageAlt: t(`items.${ambiente.slug}.image_alt`),
    span: ambiente.span ?? 1,
    href: `/ambientes/${ambiente.slug}`,
  }));

  const introCards = AMBIENTE_INTRO_CARDS.map((card) => ({
    id: card.id,
    title: t(`intro_cards.${card.categoryId}.title`),
    subtitle: t(`intro_cards.${card.categoryId}.subtitle`),
    image: card.image,
  }));

  const filters = [
    { id: "all" as const, label: t("gallery.filters.all") },
    ...AMBIENTE_CATEGORY_IDS.map((id) => ({
      id,
      label: t(`gallery.filters.${id}`),
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow={tCommon("company_name")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/showroom/3.jpg"
      />

      <main>
        <EnvironmentsIntro
          eyebrow={t("categories.eyebrow")}
          title={t("categories.title")}
          description={t("categories.description")}
          ctaLabel={t("categories.cta")}
          ctaHref="#galeria"
          cards={introCards}
        />

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
