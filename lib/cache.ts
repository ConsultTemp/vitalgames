import { unstable_cache } from "next/cache"
import type { Locale } from "@/i18n-config"

// Simple memory cache
const cache = new Map<string, { data: any; expires: number }>()

export const memoryCache = {
  get: (key: string) => {
    const item = cache.get(key)
    if (!item || Date.now() > item.expires) {
      cache.delete(key)
      return null
    }
    return item.data
  },

  set: (key: string, data: any, ttl: number) => {
    cache.set(key, {
      data,
      expires: Date.now() + ttl,
    })
  },

  clear: () => cache.clear(),
}

// FIXED: Proper dictionary caching
export const cachedGetDictionary = unstable_cache(
  async (locale: Locale) => {
    console.log(`Loading dictionary for locale: ${locale}`)

    try {
      // Direct imports - NO dynamic bullshit
      switch (locale) {
        case "en":
          return (await import("@/dictionaries/en.json")).default
        case "it":
          return (await import("@/dictionaries/it.json")).default
        case "es":
          return (await import("@/dictionaries/es.json")).default
        default:
          console.warn(`Unknown locale ${locale}, falling back to en`)
          return (await import("@/dictionaries/en.json")).default
      }
    } catch (error) {
      console.error(`Failed to load dictionary for ${locale}:`, error)
      // Fallback to English
      return (await import("@/dictionaries/en.json")).default
    }
  },
  ["dictionary"],
  {
    tags: ["dictionary"],
    revalidate: 86400, // 24 hours
  },
)
