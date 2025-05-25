// Advanced caching system for Vitalgames
import { unstable_cache } from "next/cache"
import { memoryCache } from "./memory-cache"

// Cache configuration
export const CACHE_TAGS = {
  GAMES: "games",
  MULTIGAMES: "multigames",
  VLT: "vlt",
  DICTIONARY: "dictionary",
  SEO: "seo",
  STATIC: "static",
} as const

export const CACHE_DURATIONS = {
  STATIC: 60 * 60 * 24 * 7, // 7 days
  DYNAMIC: 60 * 60 * 2, // 2 hours
  DICTIONARY: 60 * 60 * 24, // 24 hours
  SEO: 60 * 60 * 12, // 12 hours
  GAMES: 60 * 60 * 6, // 6 hours
} as const

// Cache wrapper function
export function createCachedFunction<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyPrefix: string,
  tags: string[],
  revalidate: number = CACHE_DURATIONS.DYNAMIC,
) {
  return unstable_cache(fn, [keyPrefix], {
    tags,
    revalidate,
  })
}

// Specific cache functions for different data types
export const cachedGetDictionary = createCachedFunction(
  async (locale: string) => {
    const { getDictionary } = await import("@/lib/dictionary")
    return getDictionary(locale as any)
  },
  "dictionary",
  [CACHE_TAGS.DICTIONARY],
  CACHE_DURATIONS.DICTIONARY,
)

export const cachedGetGames = createCachedFunction(
  async () => {
    const { games } = await import("@/lib/allgamesmap")
    return games
  },
  "games",
  [CACHE_TAGS.GAMES],
  CACHE_DURATIONS.GAMES,
)

export const cachedGetMultigames = createCachedFunction(
  async () => {
    const { multigames } = await import("@/lib/multigames")
    return multigames
  },
  "multigames",
  [CACHE_TAGS.MULTIGAMES],
  CACHE_DURATIONS.GAMES,
)

export const cachedGetGame = createCachedFunction(
  async (gameSlug: string) => {
    const games = await cachedGetGames()
    return games.find((g) => g.slug === gameSlug)
  },
  "game",
  [CACHE_TAGS.GAMES],
  CACHE_DURATIONS.GAMES,
)

export const cachedGetMultigame = createCachedFunction(
  async (multigameSlug: string) => {
    const multigames = await cachedGetMultigames()
    return multigames.find((m) => m.slug === multigameSlug)
  },
  "multigame",
  [CACHE_TAGS.MULTIGAMES],
  CACHE_DURATIONS.GAMES,
)

// SEO data caching
export const cachedGenerateSEOMetadata = createCachedFunction(
  async (pageType: string, locale: string, customData?: any) => {
    const { generateAdvancedSEOMetadata } = await import("@/lib/seo-config")
    return generateAdvancedSEOMetadata(pageType as any, locale as any, customData)
  },
  "seo-metadata",
  [CACHE_TAGS.SEO],
  CACHE_DURATIONS.SEO,
)

// Static content caching
export const cachedGetStaticContent = createCachedFunction(
  async (contentType: string, locale: string) => {
    // This would fetch static content like hero images, company info, etc.
    return {
      contentType,
      locale,
      lastUpdated: new Date().toISOString(),
    }
  },
  "static-content",
  [CACHE_TAGS.STATIC],
  CACHE_DURATIONS.STATIC,
)

// Cache invalidation utilities
export async function revalidateCache(tags: string[]) {
  const { revalidateTag } = await import("next/cache")
  tags.forEach((tag) => revalidateTag(tag))
}

export async function revalidateAllCache() {
  await revalidateCache(Object.values(CACHE_TAGS))
}

// Browser cache utilities
export const browserCache = {
  set: (key: string, data: any, ttl = 300000) => {
    if (typeof window === "undefined") return

    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }

    try {
      localStorage.setItem(`vitalgames_cache_${key}`, JSON.stringify(item))
    } catch (error) {
      console.warn("Failed to set browser cache:", error)
    }
  },

  get: (key: string) => {
    if (typeof window === "undefined") return null

    try {
      const item = localStorage.getItem(`vitalgames_cache_${key}`)
      if (!item) return null

      const parsed = JSON.parse(item)
      if (Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(`vitalgames_cache_${key}`)
        return null
      }

      return parsed.data
    } catch (error) {
      console.warn("Failed to get browser cache:", error)
      return null
    }
  },

  clear: () => {
    if (typeof window === "undefined") return

    Object.keys(localStorage)
      .filter((key) => key.startsWith("vitalgames_cache_"))
      .forEach((key) => localStorage.removeItem(key))
  },
}
 