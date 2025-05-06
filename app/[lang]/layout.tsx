import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { companyData } from "@/lib/seo-config"
import Script from "next/script"
import type { Locale } from "@/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/lib/dictionary"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Vitalgames | Produttore di Slot Machine dal 1996",
    template: "%s | Vitalgames",
  },
  description:
    "Dal 1996, Vitalgames è leader nella produzione di slot machine, VLT e sistemi multigame in Italia. Soluzioni di gioco innovative per bar, sale giochi e piattaforme online.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logovital.svg" }],
    apple: { url: "/favicon.ico" },
    shortcut: { url: "/favicon.ico" },
  },
  keywords: [
    "slot machine",
    "VLT",
    "AWP",
    "multigame",
    "produttore slot machine",
    "giochi da casinò",
    "macchinette da gioco",
    "cabinet slot",
  ],
  authors: [{ name: "Vitalgames" }],
  creator: "Vitalgames",
  publisher: "Vitalgames",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vitalgames.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "it-IT": "/it",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    title: "Vitalgames | Produttore di Slot Machine dal 1996",
    description:
      "Dal 1996, Vitalgames è leader nella produzione di slot machine, VLT e sistemi multigame in Italia. Soluzioni di gioco innovative per bar, sale giochi e piattaforme online.",
    url: "https://vitalgames.com",
    siteName: "Vitalgames",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/fleethero.jpg",
        width: 1200,
        height: 630,
        alt: "Vitalgames - Produttore di Slot Machine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalgames | Produttore di Slot Machine dal 1996",
    description:
      "Dal 1996, Vitalgames è leader nella produzione di slot machine, VLT e sistemi multigame in Italia. Soluzioni di gioco innovative per bar, sale giochi e piattaforme online.",
    images: ["/fleethero.jpg"],
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
      me: ["info@vitalgames.com"],
    },
  },
  generator: "Vitalgames",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

type Params = Promise<{ lang: Locale }>

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale } | Params
}) {
  // Gestisci params come Promise se necessario
  const resolvedParams = "then" in params ? await params : params

  // Controllo di sicurezza
  if (!resolvedParams || !resolvedParams.lang) {
    return <>{children}</>
  }

  const lang = resolvedParams.lang
  const dictionary = await getDictionary(lang)

  return (
    <div>
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
        <link rel="preload" as="image" href="/fleethero.jpg" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://vitalgames.com",
              name: "Vitalgames",
              url: "https://vitalgames.com",
              logo: "https://vitalgames.com/images/logovital.svg",
              foundingDate: "1996",
              description: "Produttore italiano di slot machine, VLT e sistemi multigame dal 1996.",
              address: {
                "@type": "PostalAddress",
                streetAddress: companyData.address.streetAddress,
                addressLocality: companyData.address.addressLocality,
                addressRegion: companyData.address.addressRegion,
                postalCode: companyData.address.postalCode,
                addressCountry: companyData.address.addressCountry,
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: companyData.telephone,
                email: companyData.email,
                contactType: "customer service",
              },
              sameAs: [
                "https://www.facebook.com/vitalgames",
                "https://www.instagram.com/vitalgames_official",
                "https://www.linkedin.com/company/vitalgames",
              ],
            }),
          }}
        />
      </head> */}
      <div className="w-screen">
        <LanguageProvider lang={lang} dictionary={dictionary}>
          <div className="w-screen overflow-x-hidden">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </div>
    </div>
  )
}
