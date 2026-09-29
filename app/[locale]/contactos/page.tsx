import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/features/Contact/ContactForm";
import { ContactHours } from "@/components/features/Contact/ContactHours";
import { ContactInfo } from "@/components/features/Contact/ContactInfo";
import { GoogleMap } from "@/components/features/Contact/GoogleMap";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("contactos") };
}

export default async function ContactosPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contacts" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <PageHero
        eyebrow={tCommon("company_name")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/others/location.jpg"
      />

      <PageContainer>
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-stretch">
            <div className="min-h-0 lg:h-full">
              <ContactForm />
            </div>
            <div className="flex flex-col gap-10">
              <ContactInfo />
              <ContactHours />
            </div>
            <div className="lg:col-span-2">
              <GoogleMap />
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  );
}
