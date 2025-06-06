import type { Locale } from "@/i18n-config"

/**
 * Safely extracts the lang parameter from params
 * Returns the default locale if params or params.lang is undefined
 */
export function getSafeLocale(params: any): Locale {
  if (!params || !params.lang) {
    // Return default locale if params or params.lang is undefined
    return "it" as Locale
  }

  return params.lang as Locale
}
