import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container/Container";
import { LanguageSwitcher } from "@/components/layout/Footer/LanguageSwitcher";
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_INFO_LINKS,
} from "@/constants/contacts";
import { Link } from "@/i18n/navigation";
import { getCurrentYear } from "@/utils/date";

const infoLinkClassName =
  "text-sm text-footer-text transition-colors hover:text-footer-text-secondary";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto bg-footer-bg">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex items-center justify-center">
            <Image
              src="/logos/LogoWhite.svg"
              alt="Nós-Norte"
              width={220}
              height={72}
              className="h-16 w-auto sm:h-20"
            />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-start text-left">
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-footer-text-secondary uppercase">
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
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-footer-text-secondary uppercase">
                {t("contacts")}
              </h2>
              <ul className="flex flex-col gap-5">
                {FOOTER_CONTACT_ITEMS.map(({ labelKey, icon, details }) => (
                  <li key={labelKey} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-footer-icon-bg">
                      <Image
                        src={icon}
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-footer-text-secondary">
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
                          muted ? "text-xs text-footer-text-muted" : "text-sm text-footer-text",
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
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <div
            className="w-[95%] border-t border-footer-border"
            aria-hidden="true"
          />
          <div className="flex w-[88%] flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
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
