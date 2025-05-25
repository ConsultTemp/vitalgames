import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { generateAdvancedSEOMetadata, enhancedCompanyData } from "@/lib/seo-config"
import Script from "next/script"
import type { Locale } from "@/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/lib/dictionary"
import { LanguageProvider } from "@/components/language-provider"
import { PerformanceProvider } from "@/components/performance-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params

  return generateAdvancedSEOMetadata("home", lang, {
    image: "/fleethero.jpg"
  })
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
    <html lang={lang}>
      <head>
        {/* DNS Prefetch per performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect per risorse critiche */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload risorse critiche */}
        <link rel="preload" as="image" href="/fleethero.jpg" />
        <link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossOrigin="anonymous" />

        {/* Favicon completo */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/logovital.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Hreflang per SEO internazionale */}
        <link rel="alternate" hrefLang="it" href={`https://vitalgames.com/it`} />
        <link rel="alternate" hrefLang="en" href={`https://vitalgames.com/en`} />
        <link rel="alternate" hrefLang="ar" href={`https://vitalgames.com/ar`} />
        <link rel="alternate" hrefLang="x-default" href="https://vitalgames.com/it" />

        {/* Schema Organization avanzato */}
        <Script
          id="organization-schema-advanced"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://vitalgames.com/#organization",
              name: "Vitalgames",
              legalName: "Vitalgames S.r.l.",
              url: "https://vitalgames.com",
              logo: {
                "@type": "ImageObject",
                url: "https://vitalgames.com/logovital.svg",
                width: 300,
                height: 100,
              },
              foundingDate: "1996",
              description:
                "Produttore italiano leader di slot machine, VLT e sistemi multigame dal 1996. Innovazione e qualità nel settore gaming.",
              slogan: "Innovation in Gaming Since 1996",
              address: {
                "@type": "PostalAddress",
                streetAddress: enhancedCompanyData.address.streetAddress,
                addressLocality: enhancedCompanyData.address.addressLocality,
                addressRegion: enhancedCompanyData.address.addressRegion,
                postalCode: enhancedCompanyData.address.postalCode,
                addressCountry: enhancedCompanyData.address.addressCountry,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: enhancedCompanyData.geo.latitude,
                longitude: enhancedCompanyData.geo.longitude,
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: enhancedCompanyData.contact.telephone,
                  email: enhancedCompanyData.contact.email,
                  contactType: "customer service",
                  areaServed: "IT",
                  availableLanguage: ["Italian", "English"],
                },
                {
                  "@type": "ContactPoint",
                  email: "sales@vitalgames.com",
                  contactType: "sales",
                  areaServed: ["IT", "EU"],
                  availableLanguage: ["Italian", "English"],
                },
              ],
              sameAs: [
                "https://www.facebook.com/vitalgames",
                "https://www.instagram.com/vitalgames_official",
                "https://www.linkedin.com/company/vitalgames",
                "https://twitter.com/vitalgames_it",
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Slot Machine AWP",
                    category: "Gaming Equipment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "VLT Systems",
                    category: "Gaming Equipment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Multigame Cabinets",
                    category: "Gaming Equipment",
                  },
                },
              ],
              award: [
                "ADM Certified Manufacturer",
                "ISO 9001:2015 Quality Management",
                "Gaming Industry Excellence Award 2023",
              ],
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: "50-100",
              },
              industry: "Gaming Equipment Manufacturing",
              knowsAbout: [
                "Slot Machine Manufacturing",
                "VLT Development",
                "Gaming Software",
                "Cabinet Design",
                "Gaming Compliance",
                "ADM Regulations",
              ],
            }),
          }}
        />

        {/* Schema WebSite con SearchAction */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://vitalgames.com/#website",
              url: "https://vitalgames.com",
              name: "Vitalgames",
              description: "Produttore italiano di slot machine, VLT e sistemi multigame dal 1996",
              publisher: {
                "@id": "https://vitalgames.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://vitalgames.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: ["it-IT", "en-US", "ar-SA"],
            }),
          }}
        />

        {/* Schema BreadcrumbList */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `https://vitalgames.com/${lang}`,
                },
              ],
            }),
          }}
        />

        {/* Schema FAQ per domande comuni */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Cosa produce Vitalgames?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vitalgames produce slot machine AWP, sistemi VLT, multigame e cabinet per il settore gaming dal 1996.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vitalgames è certificata ADM?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì, Vitalgames è un produttore certificato ADM (Agenzia delle Dogane e dei Monopoli) per la produzione di apparecchi da gioco.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Dove ha sede Vitalgames?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vitalgames ha sede a Milano, Italia, e opera nel settore gaming dal 1996.",
                  },
                },
              ],
            }),
          }}
        />

      </head>

      <body className={inter.className}>
        {/* Skip to main content per accessibilità */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Salta al contenuto principale
        </a>

        <div className="w-screen">
          <PerformanceProvider>
            <LanguageProvider>
              <div className="w-screen overflow-x-hidden">
                <Header />
                <main id="main-content">{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </PerformanceProvider>
        </div>
      </body>
    </html>
  )
}
