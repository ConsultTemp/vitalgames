import "server-only"
import type { Locale } from "@/i18n-config"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  it: () => import("@/dictionaries/it.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  // Check if the locale is valid, otherwise default to 'en'
  if (!locale || !dictionaries[locale]) {
    console.warn(`Dictionary for locale "${locale}" not found, using "en" as fallback`)
    return dictionaries.en()
  }
  return dictionaries[locale]()
}
