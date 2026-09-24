import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/constants/navigation";

export function useLocalizedNavigation() {
  const t = useTranslations("navigation");

  return NAV_LINKS.map(({ href, translationKey }) => ({
    href,
    label: t(translationKey),
  }));
}
