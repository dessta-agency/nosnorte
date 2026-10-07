import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DecorativePageBackground } from "@/components/layout/DecorativePageBackground/DecorativePageBackground";
import { PageContainer } from "@/components/layout/PageContainer/PageContainer";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import {
  CNPD_URL,
  PRIVACY_POLICY_CONTACT,
} from "@/constants/contacts";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";

const SECTION_KEYS = [
  "scope",
  "personal_data",
  "controller",
  "data_types",
  "collection",
  "purposes",
  "retention",
  "rights",
  "marketing",
  "security",
  "sharing",
  "complaints",
  "changes",
] as const;

const bodyTextClass = "text-base leading-relaxed text-secondary";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("privacy_policy") };
}

export default async function PrivacyPolicyPage({ params }: LocalePageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy_policy" });
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
            <p className="mt-3 text-lg font-medium text-foreground">{t("tagline")}</p>
            <p className="mt-2 text-sm text-muted">{t("last_updated")}</p>
            <p className={`mt-6 ${bodyTextClass}`}>{t("intro")}</p>
          </header>
        </Reveal>

        <Reveal>
          <section className="mt-8">
            <p className={bodyTextClass}>{t("contact_intro")}</p>
            <ul className="mt-4 space-y-2">
              <li className={bodyTextClass}>
                <span className="font-medium text-foreground">
                  {t("contact_email")}:{" "}
                </span>
                <a
                  href={PRIVACY_POLICY_CONTACT.email.mailto}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {PRIVACY_POLICY_CONTACT.email.address}
                </a>
              </li>
              <li className={bodyTextClass}>
                <span className="font-medium text-foreground">
                  {t("contact_address")}:{" "}
                </span>
                {PRIVACY_POLICY_CONTACT.address}
              </li>
              <li className={bodyTextClass}>
                <span className="font-medium text-foreground">
                  {t("contact_phone")}:{" "}
                </span>
                <a
                  href={PRIVACY_POLICY_CONTACT.phone.tel}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {PRIVACY_POLICY_CONTACT.phone.display}
                </a>
              </li>
            </ul>
          </section>
        </Reveal>

        <div className="mt-10 space-y-8">
          {SECTION_KEYS.map((key) => (
            <Reveal key={key}>
              <section>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className={bodyTextClass}>
                  {t(`sections.${key}.body`)}
                  {key === "complaints" ? (
                    <>
                      {" "}
                      <TextLink href={CNPD_URL} external>
                        {t("sections.complaints.link_label")}
                      </TextLink>
                    </>
                  ) : null}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </article>
    </PageContainer>
  );
}
