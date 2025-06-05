import { games } from "@/lib/allgamesmap"
import { multigames } from "@/lib/multigames"
import { i18n } from "@/i18n-config"

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
  alternates?: {
    languages: Record<string, string>
  }
}

// Generate comprehensive sitemap with all pages
export function generateCompleteSitemap(): SitemapEntry[] {
  const baseUrl = "https://www.vitalgamesdigital.com"
  const currentDate = new Date()
  const sitemap: SitemapEntry[] = []

  // Static pages with high priority
  const staticPages = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/vlt", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/awp-multigames", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/allgames", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/about-us", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
  ]

  // Add static pages for each locale
  staticPages.forEach((page) => {
    i18n.locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${page.path}`
      const alternates: Record<string, string> = {}

      // Generate hreflang alternates
      i18n.locales.forEach((altLocale) => {
        alternates[altLocale === "it" ? "it-IT" : altLocale === "en" ? "en-US" : "es-ES"] =
          `${baseUrl}/${altLocale}${page.path}`
      })
      alternates["x-default"] = `${baseUrl}/it${page.path}`

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: { languages: alternates },
      })
    })
  })

  // Add individual game pages
  games.forEach((game) => {
    i18n.locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/allgames/${game.slug}`
      const alternates: Record<string, string> = {}

      i18n.locales.forEach((altLocale) => {
        alternates[altLocale === "it" ? "it-IT" : altLocale === "en" ? "en-US" : "es-ES"] =
          `${baseUrl}/${altLocale}/allgames/${game.slug}`
      })
      alternates["x-default"] = `${baseUrl}/it/allgames/${game.slug}`

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates },
      })
    })
  })

  // Add multigame pages
  multigames.forEach((multigame) => {
    i18n.locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/multigame/${multigame.slug}`
      const alternates: Record<string, string> = {}

      i18n.locales.forEach((altLocale) => {
        alternates[altLocale === "it" ? "it-IT" : altLocale === "en" ? "en-US" : "es-ES"] =
          `${baseUrl}/${altLocale}/multigame/${multigame.slug}`
      })
      alternates["x-default"] = `${baseUrl}/it/multigame/${multigame.slug}`

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alternates },
      })
    })
  })

  // Add AWP multigame detail pages
  multigames.forEach((multigame) => {
    i18n.locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/awp-multigames/${multigame.slug}`
      const alternates: Record<string, string> = {}

      i18n.locales.forEach((altLocale) => {
        alternates[altLocale === "it" ? "it-IT" : altLocale === "en" ? "en-US" : "es-ES"] =
          `${baseUrl}/${altLocale}/awp-multigames/${multigame.slug}`
      })
      alternates["x-default"] = `${baseUrl}/it/awp-multigames/${multigame.slug}`

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alternates },
      })
    })
  })

  return sitemap.sort((a, b) => b.priority - a.priority)
}

// Generate category-specific sitemaps
export function generateCategorySitemap(category: "games" | "multigames" | "static"): SitemapEntry[] {
  const completeSitemap = generateCompleteSitemap()

  switch (category) {
    case "games":
      return completeSitemap.filter((entry) => entry.url.includes("/allgames/"))
    case "multigames":
      return completeSitemap.filter(
        (entry) => entry.url.includes("/multigame/") || entry.url.includes("/awp-multigames/"),
      )
    case "static":
      return completeSitemap.filter(
        (entry) =>
          !entry.url.includes("/allgames/") &&
          !entry.url.includes("/multigame/") &&
          !entry.url.includes("/awp-multigames/"),
      )
    default:
      return completeSitemap
  }
}

// Generate XML sitemap string
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const sitemapOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  const sitemapClose = "</urlset>"

  const urls = entries
    .map((entry) => {
      const alternateLinks = entry.alternates?.languages
        ? Object.entries(entry.alternates.languages)
            .map(([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`)
            .join("\n")
        : ""

      return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
${alternateLinks}
  </url>`
    })
    .join("\n")

  return `${xmlHeader}\n${sitemapOpen}\n${urls}\n${sitemapClose}`
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const baseUrl = "https://www.vitalgamesdigital.com"

  return `# Vitalgames Robots.txt - Elite SEO Configuration
User-agent: *
Allow: /

# High-priority pages for crawling
Allow: /it/
Allow: /en/
Allow: /es/
Allow: /it/vlt
Allow: /en/vlt
Allow: /es/vlt
Allow: /it/awp-multigames
Allow: /en/awp-multigames
Allow: /es/awp-multigames
Allow: /it/allgames
Allow: /en/allgames
Allow: /es/allgames

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: *.json$

# Block duplicate content
Disallow: /*?*
Disallow: /*#

# Allow important resources
Allow: /images/
Allow: /videos/
Allow: /*.css$
Allow: /*.js$

# Crawl delay for respectful crawling
Crawl-delay: 1

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-games.xml
Sitemap: ${baseUrl}/sitemap-multigames.xml
Sitemap: ${baseUrl}/sitemap-static.xml

# Additional sitemaps for different content types
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-videos.xml

# Google-specific directives
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing-specific directives  
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex-specific directives
User-agent: YandexBot
Allow: /
Crawl-delay: 2

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`
}
