"use client";

type AnalyticsArgument = [command: string, ...args: unknown[]];

declare global {
  interface Window {
    dataLayer?: AnalyticsArgument[];
    gtag?: (...args: AnalyticsArgument) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  window.dataLayer ??= [];
  window.gtag ??= (...args: AnalyticsArgument) => {
    window.dataLayer?.push(args);
  };

  if (parameters) {
    window.gtag("event", eventName, parameters);
  } else {
    window.gtag("event", eventName);
  }
}
