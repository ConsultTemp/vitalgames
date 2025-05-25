import { generateCompleteSitemap, generateSitemapXML } from "@/lib/sitemap-generator"
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

// Generate additional category-specific sitemaps
export async function GET() {
  const sitemap = generateCompleteSitemap()
  const xml = generateSitemapXML(sitemap)

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
