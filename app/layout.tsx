import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
    default: "Prateek Srivastava - Full Stack Developer & AI Enthusiast",
    template: "%s | Prateek Srivastava",
  },
  description:
    "Experienced full-stack developer specializing in React, Node.js, and innovative product development. Building impactful digital solutions with modern technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "AI Enthusiast",
    "Web Development",
    "Software Engineer",
    "JavaScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Prateek Srivastava" }],
  creator: "Prateek Srivastava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Prateek Srivastava - Full Stack Developer & AI Enthusiast",
    description:
      "Experienced full-stack developer specializing in React, Node.js, and innovative product development.",
    siteName: "Prateek Srivastava Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prateek Srivastava - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prateek Srivastava - Full Stack Developer & AI Enthusiast",
    description:
      "Experienced full-stack developer specializing in React, Node.js, and innovative product development.",
    images: ["/og-image.jpg"],
    creator: "@prateeksrivastava",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning
      >
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
