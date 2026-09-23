import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Starter Kit",
    template: "%s | Starter Kit",
  },
  description: "TBD — replace with project description",
  // metadataBase: new URL("https://example.com"),
  // openGraph: {
  //   title: "Starter Kit",
  //   description: "TBD — replace with project description",
  //   siteName: "Starter Kit",
  //   locale: "pt_PT",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Starter Kit",
  //   description: "TBD — replace with project description",
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt">
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
