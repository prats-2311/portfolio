"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Use environment variable or provided measurement ID
  const GA_MEASUREMENT_ID =
    measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: 'Prateek Srivastava - Software Developer',
            custom_map: {
              'custom_parameter_1': 'developer_portfolio',
              'custom_parameter_2': 'prateek_srivastava'
            }
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      event_category: "Portfolio",
      event_label: "Prateek Srivastava",
      ...parameters,
    });
  }
};
