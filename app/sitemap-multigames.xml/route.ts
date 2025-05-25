import { generateCategorySitemap, generateSitemapXML } from "@/lib/sitemap-generator"

export async function GET() {
  const multigamesSitemap = generateCategorySitemap("multigames")
  const xml = generateSitemapXML(multigamesSitemap)

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
