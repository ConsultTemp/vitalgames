import type React from "react"
import "../globals.css"
import { i18n } from "@/i18n-config"
import type { Locale } from "@/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/lib/dictionary"
import { LanguageProvider } from "@/components/language-provider"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <LanguageProvider lang={lang} dictionary={dictionary}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
