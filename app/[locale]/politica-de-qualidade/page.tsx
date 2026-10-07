import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DecorativePageBackground } from "@/components/layout/DecorativePageBackground/DecorativePageBackground";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

const VECTOR_KEYS = ["1", "2", "3", "4"] as const;

const bodyTextClass = "text-base leading-relaxed text-secondary";
const listClass = "mt-4 space-y-3";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("quality_policy") };
}

export default async function QualityPolicyPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "quality_policy" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <PageContainer className="relative isolate min-h-full">
      <DecorativePageBackground />
      <article className="relative mx-auto max-w-5xl py-8 md:py-12">
        <Reveal>
          <header>
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {tCommon("company_name")}
            </p>
            <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h1>
            <p className={`mt-4 max-w-2xl ${bodyTextClass}`}>{t("intro")}</p>
          </header>
        </Reveal>

        <Reveal>
          <ul className={listClass}>
            {VECTOR_KEYS.map((key) => (
              <li key={key} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <p className={bodyTextClass}>{t(`vectors.${key}`)}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <section className="mt-8 md:mt-10">
            <h2 className={bodyTextClass}>{t("intentions_intro")}</h2>

            <ul className={listClass}>
              {VECTOR_KEYS.map((key) => (
                <li key={key} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <p className={bodyTextClass}>{t(`intentions.${key}`)}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </article>
    </PageContainer>
  );
}
