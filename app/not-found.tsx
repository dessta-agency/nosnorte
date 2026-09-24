import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold">{t("not_found_title")}</h1>
      <p className="text-muted">{t("not_found_description")}</p>
      <Link href="/" className="text-primary underline">
        {t("not_found_back_home")}
      </Link>
    </main>
  );
}
