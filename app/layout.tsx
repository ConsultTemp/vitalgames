import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { locationData } from "@/lib/seo-config"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Patty Car | Luxury Car Service",
    template: "%s | Patty Car",
  },
  description: "Viaggia con eleganza, comfort e puntualità con il nostro servizio di auto di lusso",
  keywords: [
    "luxury car",
    "car service",
    "transfer",
    "NCC",
    "chauffeur",
    "private driver",
    "airport transfer",
    "VIP transport",
  ],
  authors: [{ name: "Patty Car" }],
  creator: "Patty Car",
  publisher: "Patty Car",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pattycar.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "it-IT": "/it",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    title: "Patty Car | Luxury Car Service",
    description: "Viaggia con eleganza, comfort e puntualità con il nostro servizio di auto di lusso",
    url: "https://pattycar.com",
    siteName: "Patty Car",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Patty Car - Luxury Car Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patty Car | Luxury Car Service",
    description: "Viaggia con eleganza, comfort e puntualità con il nostro servizio di auto di lusso",
    images: ["/og-image.jpg"],
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
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["info@pattycar.com"],
    },
  },
  generator: "v0.dev",
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
  const lang = params?.lang || "it"

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/images/hero-background.jpg" />

        {/* Structured data for local business */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://pattycar.com",
              name: "Patty Car",
              image: "https://pattycar.com/images/patty-car-logo.jpg",
              url: "https://pattycar.com",
              telephone: locationData.telephone,
              email: locationData.email,
              priceRange: "€€€",
              address: {
                "@type": "PostalAddress",
                streetAddress: locationData.address.streetAddress,
                addressLocality: locationData.address.addressLocality,
                addressRegion: locationData.address.addressRegion,
                postalCode: locationData.address.postalCode,
                addressCountry: locationData.address.addressCountry,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: locationData.geo.latitude,
                longitude: locationData.geo.longitude,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              sameAs: [
                "https://www.facebook.com/pattycar",
                "https://www.instagram.com/pattycar_milano",
                "https://www.linkedin.com/company/patty-car",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
