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
import CookieBanner from "@/components/cookie-banner"

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

      <body className={`${inter.className} antialiased`}>
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
                <main id="main-content">
                  {children}
                  </main>
                <Footer />
                <CookieBanner lang={lang} />
              </div>
            </LanguageProvider>
          </PerformanceProvider>
        </div>
      </body>
    </html>
  )
}
