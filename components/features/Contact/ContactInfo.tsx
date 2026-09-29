import { getTranslations } from "next-intl/server";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { COMPANY_CONTACT } from "@/constants/contacts";
import { SURFACE_CARD } from "@/constants/layout";

export async function ContactInfo() {
  const t = await getTranslations("contacts.info");
  const tFooter = await getTranslations("footer");

  const contactChannels = [
    {
      key: "email",
      label: tFooter("email"),
      icon: "/icons/email.png",
      primary: {
        text: COMPANY_CONTACT.email.address,
        href: COMPANY_CONTACT.email.mailto,
      },
    },
    {
      key: "phone",
      label: tFooter("phone"),
      icon: "/icons/phone.png",
      primary: {
        text: COMPANY_CONTACT.phone.display,
        href: COMPANY_CONTACT.phone.tel,
      },
      note: t("phone_note"),
    },
    {
      key: "whatsapp",
      label: tFooter("whatsapp"),
      icon: "/icons/whatsapp.png",
      primary: {
        text: COMPANY_CONTACT.whatsapp.display,
        href: COMPANY_CONTACT.whatsapp.url,
        external: true,
      },
      note: t("whatsapp_note"),
    },
    {
      key: "address",
      label: tFooter("address"),
      icon: "/icons/location.png",
      lines: [
        COMPANY_CONTACT.address.line1,
        COMPANY_CONTACT.address.line2,
      ],
      mapsLabel: t("view_map"),
      mapsHref: COMPANY_CONTACT.address.mapsUrl,
    },
  ] as const;

  return (
    <div className={`${SURFACE_CARD} p-6 md:p-8`}>
      <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
      <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
        {t("title")}
      </h2>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2">
        {contactChannels.map((channel) => (
          <li key={channel.key} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span
                aria-hidden
                className="block h-[18px] w-[18px] bg-primary"
                style={{
                  maskImage: `url(${channel.icon})`,
                  WebkitMaskImage: `url(${channel.icon})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-sm font-medium text-foreground">
                {channel.label}
              </p>

              {"primary" in channel && channel.primary ? (
                <a
                  href={channel.primary.href}
                  className="mt-0.5 block font-sans text-sm text-secondary transition-colors hover:text-primary"
                  {...("external" in channel.primary && channel.primary.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {channel.primary.text}
                </a>
              ) : null}

              {"note" in channel && channel.note ? (
                <p className="mt-0.5 font-sans text-xs text-muted">
                  ({channel.note})
                </p>
              ) : null}

              {"lines" in channel && channel.lines
                ? channel.lines.map((line) => (
                    <p
                      key={line}
                      className="font-sans text-sm text-secondary first:mt-0.5"
                    >
                      {line}
                    </p>
                  ))
                : null}

              {"mapsHref" in channel && channel.mapsHref ? (
                <a
                  href={channel.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-sans text-xs text-muted underline transition-colors hover:text-primary"
                >
                  {channel.mapsLabel}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
