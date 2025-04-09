"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Locale } from "@/i18n-config"

type LanguageContextType = {
  lang: Locale
  dictionary: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  lang,
  dictionary,
}: {
  children: ReactNode
  lang: Locale
  dictionary: any
}) {
  return <LanguageContext.Provider value={{ lang, dictionary }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}

