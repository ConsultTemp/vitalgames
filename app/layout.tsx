import type React from "react"
import localFont from 'next/font/local'
import "./globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { enhancedCompanyData, generateComprehensiveSchema, gameKeywords } from "@/lib/seo-config"
import Script from "next/script"
import IntroVideo from "./components/IntroVideo"

const geist = localFont({
  src: [
    {
      path: '../fonts/Geist-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Geist-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Geist-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Geist-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Geist-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
})

const hitmarker = localFont({
  src: [
    {
      path: '../fonts/HitmarkerCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerCondensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerCondensed-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerCondensed-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-hitmarker',
  display: 'swap',
  preload: true,
})

const hitmarkerText = localFont({
  src: [
    {
      path: '../fonts/HitmarkerText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerText-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HitmarkerText-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hitmarker-text',
  display: 'swap',
  preload: true,
})

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
    { name: "Vitalgames", url: "https://www.vitalgamesdigital.com" },
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
  metadataBase: new URL("https://.vitalgamesdigital.com/"),
  alternates: {
    canonical: "https://www.vitalgamesdigital.com",
    languages: {
      "it-IT": "https://www.vitalgamesdigital.com/it",
      "en-US": "https://www.vitalgamesdigital.com/en",
      "es-ES": "https://www.vitalgamesdigital.com/es",
      "x-default": "https://www.vitalgamesdigital.com/it",
    },
    types: {
      "application/rss+xml": "https://www.vitalgamesdigital.com/rss.xml",
    },
  },
  openGraph: {
    title: "Vitalgames | Leader Produzione Slot Machine, VLT e Multigame dal 1996",
    description: "🎰 Dal 1996, Vitalgames è il leader italiano nella produzione di slot machine, VLT e sistemi multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Sede Milano.",
    url: "https://www.vitalgamesdigital.com",
    siteName: "Vitalgames",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://www.vitalgamesdigital.com/bgcabinet.png",
        width: 1200,
        height: 630,
        alt: "Vitalgames - Leader Slot Machine Italia dal 1996",
        type: "image/jpeg",
      },
      {
        url: "https://www.vitalgamesdigital.com/vital-logo.png",
        width: 800,
        height: 600,
        alt: "Vitalgames Logo - Produttore Slot Machine",
        type: "image/png",
      },
      {
        url: "https://www.vitalgamesdigital.com/bgcabinet.png",
        width: 1200,
        height: 630,
        alt: "Slot Machine VLT AWP Multigame Vitalgames",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalgames | Leader Slot Machine Italia dal 1996",
    description: "🎰 Produttore leader di slot machine, VLT e multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Milano.",
    images: ["https://www.vitalgamesdigital.com/vital-logo.png"],
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
    icon: "/favicon.ico",
  },
  other: {
    "google-site-verification": "vitalgames-google-verification-code",
    "msvalidate.01": "vitalgames-bing-verification-code",
    "yandex-verification": "vitalgames-yandex-verification-code",
    "facebook-domain-verification": "vitalgames-facebook-verification",
    "pinterest-site-verification": "vitalgames-pinterest-verification",
    "theme-color": "#1a365d",
    "msapplication-TileColor": "#1a365d",
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={i18n.defaultLocale} suppressHydrationWarning>
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
        <link rel="preload" as="image" href="/bgcabinet.png" />
        <link rel="preload" as="image" href="/logovital.svg" />

        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate rendering */
            body { margin: 0; font-family: var(--font-geist), system-ui, sans-serif; }
            .hero-section { min-height: 100vh; background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); }
            .loading-spinner { display: none; }
          `
        }} />







        {/* Canonical and Hreflang will be handled by individual pages */}
      </head>
      <body className={`${geist.variable} ${hitmarker.variable} ${hitmarkerText.variable} ${geist.className} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
      </body>
    </html>
  )
}
