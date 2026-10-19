import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { GoogleAnalytics } from "@/components/google-analytics";

const origin = "https://imperialinternationaltrade.com";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "Imperial International Trade | Rubber & Cotton Yarn Exporter", template: "%s" },
  description: "Imperial International Trade Private Limited connects international buyers with Butyl Reclaimed Rubber and cotton yarn sourced from India. Contact us for enquiries.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Imperial International Trade Private Limited", url: origin, title: "Imperial International Trade | Rubber & Cotton Yarn Exporter", description: "Connecting international buyers with Butyl Reclaimed Rubber and cotton yarn sourced from India." },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><GoogleAnalytics /><SiteHeader />{children}<SiteFooter /></body></html>;
}
