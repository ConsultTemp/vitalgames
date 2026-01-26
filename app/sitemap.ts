import { generateCompleteSitemap } from "@/lib/sitemap-generator"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries = generateCompleteSitemap()

  return sitemapEntries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: entry.alternates,
  }))
}
