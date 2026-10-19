"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackAnalyticsEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!measurementId) return;

    function trackClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.toLowerCase().startsWith("mailto:")) {
        trackAnalyticsEvent("business_email_click");
      } else if (/^(https?:\/\/)?(www\.)?(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        trackAnalyticsEvent("whatsapp_click");
      } else if (link.matches("a.button[href^='/contact']")) {
        trackAnalyticsEvent("enquiry_cta_click", { cta_type: "enquiry" });
      }
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  useEffect(() => {
    if (!measurementId || !initialized || !pathname) return;
    trackAnalyticsEvent("page_view", { page_path: pathname });
  }, [initialized, pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive" onReady={() => setInitialized(true)}>
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });`}
      </Script>
    </>
  );
}
