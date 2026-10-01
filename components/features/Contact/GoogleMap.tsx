import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { COMPANY_CONTACT } from "@/constants/contacts";
import { SURFACE_CARD } from "@/constants/layout";

export async function GoogleMap() {
  const t = await getTranslations("contacts.info");

  return (
    <div
      className={`${SURFACE_CARD} relative w-full overflow-hidden bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: "url(/images/backgrounds/map.png)" }}
    >
      <div className="relative z-10 p-4 md:p-5">
        <div className={`${SURFACE_CARD} max-w-md p-6 shadow-md md:p-8`}>
          <SectionEyebrow>{t("location_eyebrow")}</SectionEyebrow>
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            {t("location_title")}
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-secondary md:text-base">
            {t("location_description")}
          </p>
          <div className="mt-3 flex items-start gap-3 font-sans text-sm leading-relaxed">
            <span
              aria-hidden
              className="mt-0.5 block h-4 w-4 shrink-0 bg-primary"
              style={{
                maskImage: "url(/icons/location.png)",
                WebkitMaskImage: "url(/icons/location.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
            <address className="not-italic text-secondary md:text-base">
              <span className="block">{COMPANY_CONTACT.address.line1}</span>
              <span className="block">{COMPANY_CONTACT.address.line2}</span>
            </address>
          </div>
          <Button
            variant="outline"
            href={COMPANY_CONTACT.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
            startIcon={
              <span
                aria-hidden
                className="block h-4 w-4 bg-primary transition-colors duration-300 group-hover:bg-white"
                style={{
                  maskImage: "url(/icons/location.png)",
                  WebkitMaskImage: "url(/icons/location.png)",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            }
          >
            {t("view_map")}
          </Button>
        </div>
      </div>
    </div>
  );
}
