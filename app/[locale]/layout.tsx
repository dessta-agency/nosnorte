import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Serif_Display, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop/BackToTop";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { routing } from "@/i18n/routing";
import { resolveLocale, type LocalePageProps } from "@/types/i18n";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-serif-display",
});

type Props = LocalePageProps & {
  children: ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("site_title"),
      template: t("site_title_template"),
    },
    description: t("site_description"),
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${dmSerifDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <NextIntlClientProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
