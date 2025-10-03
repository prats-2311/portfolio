import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prats2311.tech"
  ),
  title: {
    default:
      "Prateek Srivastava - Software Developer | Angular, Next.js, Python Expert",
    template: "%s | Prateek Srivastava",
  },
  description:
    "Prateek Srivastava is an experienced Software Developer with 3+ years of expertise in Angular, Next.js, Python, and payment systems. Currently working at Amino Technology Limited, Delhi. Specialized in building scalable web applications and ERP solutions.",
  keywords: [
    "Prateek Srivastava",
    "Prateek Srivastava Software Developer",
    "Prateek Srivastava Delhi",
    "Prateek Srivastava Amino Technology",
    "Software Developer Delhi",
    "Angular Developer",
    "Next.js Developer",
    "Python Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "Payment Gateway Developer",
    "ERP Developer",
    "Web Development",
    "Software Engineer",
    "JavaScript",
    "Portfolio",
    "Prateek Srivastava Portfolio",
    "Bangalore Developer",
    "Sugoi Labs",
    "GoodsKart",
    "Logistics Developer",
  ],
  authors: [{ name: "Prateek Srivastava", url: "https://prats2311.tech" }],
  creator: "Prateek Srivastava",
  publisher: "Prateek Srivastava",
  alternates: {
    canonical: "https://prats2311.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prats2311.tech",
    title:
      "Prateek Srivastava - Software Developer | Angular, Next.js, Python Expert",
    description:
      "Prateek Srivastava is an experienced Software Developer with 3+ years of expertise in Angular, Next.js, Python, and payment systems. Currently working at Amino Technology Limited, Delhi.",
    siteName: "Prateek Srivastava - Software Developer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prateek Srivastava - Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prateek Srivastava - Software Developer | Angular, Next.js, Python Expert",
    description:
      "Prateek Srivastava is an experienced Software Developer with 3+ years of expertise in Angular, Next.js, Python, and payment systems.",
    images: ["/og-image.jpg"],
    creator: "@prateeksrivastava",
    site: "@prateeksrivastava",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
  classification: "Software Developer Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        <link rel="manifest" href="/manifest.json" />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Prateek Srivastava" />
        <meta name="designer" content="Prateek Srivastava" />
        <meta name="owner" content="Prateek Srivastava" />
        <meta name="url" content="https://prats2311.tech" />
        <meta name="identifier-URL" content="https://prats2311.tech" />
        <meta name="directory" content="submission" />
        <meta
          name="category"
          content="Software Development, Web Development, Technology"
        />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-title" content="Prateek Srivastava" />
        <meta name="application-name" content="Prateek Srivastava Portfolio" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi, India" />
        <meta name="geo.position" content="28.7041;77.1025" />
        <meta name="ICBM" content="28.7041, 77.1025" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning
      >
        <StructuredData />
        <GoogleAnalytics />
        <ThemeProvider
          defaultTheme="dark"
          storageKey="portfolio-theme"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
