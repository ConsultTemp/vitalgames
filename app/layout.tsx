import type React from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { enhancedCompanyData, generateComprehensiveSchema, gameKeywords } from "@/lib/seo-config"
import Script from "next/script"
import IntroVideo from "./components/IntroVideo"

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })

export const metadata: Metadata = {
  title: {
    default: "Vitalgames | Produttore Leader Slot Machine, VLT e Multigame dal 1996",
    template: "%s | Vitalgames - Leader Gaming Equipment Italia",
  },
  description: "🎰 Dal 1996, Vitalgames è il leader italiano nella produzione di slot machine, VLT e sistemi multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Sede Milano. ✅ Qualità garantita",
  keywords: [
    // Primary keywords
    "slot machine",
    "VLT",
    "AWP",
    "multigame",
    "produttore slot machine",
    "slot machine Italia",
    "giochi da casinò",
    "macchinette da gioco",
    "cabinet slot",
    "gaming equipment",
    // Location-specific
    "slot machine Milano",
    "produttore slot machine Italia",
    "VLT Italia",
    "slot machine Lombardia",
    // Brand-specific
    "Vitalgames",
    "slot machine certificate ADM",
    "slot machine legali Italia",
    // Product-specific
    "cabinet VLT",
    "AWP multigame",
    "slot machine bar",
    "slot machine sala giochi",
    // Technical
    "produzione slot machine",
    "gaming machines manufacturer",
    "casino equipment Italy"
  ],
  authors: [
    { name: "Vitalgames", url: "https://vitalgames.com" },
    { name: "Vitalgames Team" },
    { name: "Gaming Equipment Experts" }
  ],
  creator: "Vitalgames S.r.l.",
  publisher: "Vitalgames S.r.l.",
  generator: "Next.js - Vitalgames",
  applicationName: "Vitalgames",
  referrer: "origin-when-cross-origin",
  category: "Gaming Equipment Manufacturing",
  classification: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vitalgames.com"),
  alternates: {
    canonical: "https://vitalgames.com",
    languages: {
      "it-IT": "https://vitalgames.com/it",
      "en-US": "https://vitalgames.com/en",
      "es-ES": "https://vitalgames.com/es",
      "x-default": "https://vitalgames.com/it",
    },
    types: {
      "application/rss+xml": "https://vitalgames.com/rss.xml",
    },
  },
  openGraph: {
    title: "Vitalgames | Leader Produzione Slot Machine, VLT e Multigame dal 1996",
    description: "🎰 Dal 1996, Vitalgames è il leader italiano nella produzione di slot machine, VLT e sistemi multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Sede Milano.",
    url: "https://vitalgames.com",
    siteName: "Vitalgames",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://vitalgames.com/images/og-vitalgames-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Vitalgames - Leader Slot Machine Italia dal 1996",
        type: "image/jpeg",
      },
      {
        url: "https://vitalgames.com/images/og-vitalgames-logo.png",
        width: 800,
        height: 600,
        alt: "Vitalgames Logo - Produttore Slot Machine",
        type: "image/png",
      },
      {
        url: "https://vitalgames.com/images/og-vitalgames-products.jpg",
        width: 1200,
        height: 630,
        alt: "Slot Machine VLT AWP Multigame Vitalgames",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalgames | Leader Slot Machine Italia dal 1996",
    description: "🎰 Produttore leader di slot machine, VLT e multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Milano.",
    images: ["https://vitalgames.com/images/twitter-vitalgames-hero.jpg"],
    creator: "@VitalgamesOfficial",
    site: "@VitalgamesOfficial",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  verification: {
    google: "vitalgames-google-verification-code",
    yandex: "vitalgames-yandex-verification-code",
    yahoo: "vitalgames-yahoo-verification-code",
    other: {
      "msvalidate.01": "vitalgames-bing-verification-code",
      "facebook-domain-verification": "vitalgames-facebook-verification",
      "pinterest-site-verification": "vitalgames-pinterest-verification",
      "yandex-verification": "vitalgames-yandex-verification",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1a365d",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Vitalgames",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-startup-640x1136.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-startup-750x1334.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  other: {
    "google-site-verification": "vitalgames-google-verification-code",
    "msvalidate.01": "vitalgames-bing-verification-code",
    "yandex-verification": "vitalgames-yandex-verification-code",
    "facebook-domain-verification": "vitalgames-facebook-verification",
    "pinterest-site-verification": "vitalgames-pinterest-verification",
    "theme-color": "#1a365d",
    "msapplication-TileColor": "#1a365d",
    "msapplication-config": "/browserconfig.xml",
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string }
}) {
  const lang = params?.lang || i18n.defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Preload Critical Assets */}
        <link rel="preload" as="image" href="/images/vitalgames-hero.jpg" />
        <link rel="preload" as="image" href="/images/vitalgames-logo.svg" />
        <link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossOrigin="anonymous" />

        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate rendering */
            body { margin: 0; font-family: Inter, system-ui; }
            .hero-section { min-height: 100vh; background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); }
            .loading-spinner { display: none; }
          `
        }} />





        {/* Critical Resource Hints */}
        <link rel="prefetch" href="/images/slot-machines-gallery.jpg" />
        <link rel="prefetch" href="/images/vlt-cabinets.jpg" />
        <link rel="prefetch" href="/images/multigames-systems.jpg" />

        {/* Canonical and Hreflang will be handled by individual pages */}
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Vai al contenuto principale
        </a>

        <div className="intro-video-wrapper">
          <IntroVideo />
        </div>
        <main id="main-content">
          {children}
        </main>

      </body>
    </html>
  )
}
