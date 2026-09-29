import { getTranslations } from "next-intl/server";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { BUSINESS_HOURS } from "@/constants/contacts";
import { SURFACE_CARD } from "@/constants/layout";

export async function ContactHours() {
  const t = await getTranslations("contacts.info");

  return (
    <div className={`${SURFACE_CARD} p-6 md:p-8`}>
      <SectionEyebrow>{t("hours_eyebrow")}</SectionEyebrow>
      <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
        {t("hours_title")}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-8 font-sans text-sm text-secondary sm:grid-cols-2 sm:gap-10">
        <div className="space-y-5">
          <div>
            <p className="font-medium text-foreground">{t("weekdays")}</p>
            <p className="mt-1">
              {t("morning", {
                start: BUSINESS_HOURS.weekdays.morning.start,
                end: BUSINESS_HOURS.weekdays.morning.end,
              })}{" "}
              |{" "}
              {t("afternoon", {
                start: BUSINESS_HOURS.weekdays.afternoon.start,
                end: BUSINESS_HOURS.weekdays.afternoon.end,
              })}
            </p>
          </div>

          <div>
            <p className="font-medium text-foreground">{t("saturday")}</p>
            <p className="mt-1">
              {t("morning", {
                start: BUSINESS_HOURS.saturday.morning.start,
                end: BUSINESS_HOURS.saturday.morning.end,
              })}
            </p>
          </div>
        </div>

        <div>
          <p className="font-medium text-foreground">{t("closed_title")}</p>
          <ul className="mt-2 list-none space-y-1 p-0">
            {BUSINESS_HOURS.closedKeys.map((key) => (
              <li key={key}>{t(`closed_items.${key}`)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
