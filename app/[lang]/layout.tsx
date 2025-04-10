import type React from "react"
import "../globals.css"
import { i18n } from "@/i18n-config"
import type { Locale } from "@/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import { getDictionary } from "@/lib/dictionary"
import { LanguageProvider } from "@/components/language-provider"

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
    <LanguageProvider lang={lang} dictionary={dictionary}>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </LanguageProvider>
  )
}
