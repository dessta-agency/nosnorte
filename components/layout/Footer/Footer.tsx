import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container/Container";
import { LanguageSwitcher } from "@/components/layout/Footer/LanguageSwitcher";
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_INFO_LINKS,
  FOOTER_SOCIAL_LINKS,
} from "@/constants/contacts";
import { Link } from "@/i18n/navigation";
import { getCurrentYear } from "@/utils/date";

const infoLinkClassName =
  "text-sm text-footer-text transition-colors hover:text-footer-text-secondary";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto bg-footer-bg">
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="flex items-center justify-center">
            <Image
              src="/logos/LogoWhite.svg"
              alt="Nós-Norte"
              width={220}
              height={72}
              className="h-14 w-auto sm:h-16"
            />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-start text-left">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-footer-text-secondary uppercase">
                {t("information")}
              </h2>
              <ul className="flex flex-col gap-2">
                {FOOTER_INFO_LINKS.map((item) => {
                  const label = t(item.translationKey);

                  if (!("href" in item) || !item.href) {
                    return (
                      <li key={item.translationKey}>
                        <span className="text-sm text-footer-text">{label}</span>
                      </li>
                    );
                  }

                  if ("external" in item && item.external) {
                    return (
                      <li key={item.translationKey}>
                        <a
                          href={item.href}
                          className={infoLinkClassName}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.translationKey}>
                      <Link href={item.href} className={infoLinkClassName}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-start text-left">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-footer-text-secondary uppercase">
                {t("contacts")}
              </h2>
              <ul className="flex flex-col gap-4">
                {FOOTER_CONTACT_ITEMS.map(({ labelKey, icon, details }) => (
                  <li key={labelKey} className="flex items-start gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-footer-icon-bg">
                      <Image
                        src={icon}
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-footer-text-secondary">
                        {t(labelKey)}
                      </span>
                      {details.map((detail) => {
                        const text =
                          "translationKey" in detail
                            ? t(detail.translationKey)
                            : detail.text;
                        const href = "href" in detail ? detail.href : undefined;
                        const muted = "muted" in detail && detail.muted;
                        const underline = "underline" in detail && detail.underline;
                        const className = [
                          muted ? "text-xs text-footer-text-muted" : "text-xs text-footer-text",
                          underline ? "underline" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        if (href) {
                          return (
                            <a
                              key={text}
                              href={href}
                              className={`${className} transition-colors hover:opacity-80`}
                              {...(href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            >
                              {text}
                            </a>
                          );
                        }

                        return (
                          <span key={text} className={className}>
                            {text}
                          </span>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-start text-left">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-footer-text-secondary uppercase">
                {t("follow_us")}
              </h2>
              <ul className="flex items-center gap-3">
                {FOOTER_SOCIAL_LINKS.map(({ labelKey, href, icon }) => (
                  <li key={labelKey}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(labelKey)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-footer-icon-bg transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={18}
                        height={18}
                        className="h-4.5 w-4.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div
            className="w-full border-t border-footer-border"
            aria-hidden="true"
          />
          <div className="flex w-full flex-col gap-4 py-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-left text-sm text-footer-text">
              {t("copyright", { year: getCurrentYear() })}
            </p>
            <div className="flex items-center gap-5 text-sm font-bold text-footer-text">
              <div
                className="h-4 w-px shrink-0 bg-footer-border"
                aria-hidden="true"
              />
              <LanguageSwitcher label={t("language")} />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
