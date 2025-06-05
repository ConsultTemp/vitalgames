import { generateRobotsTxt } from "@/lib/sitemap-generator"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/", "*.json$"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["AhrefsBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: [
      "https://www.vitalgamesdigital.com/sitemap.xml",
      "https://www.vitalgamesdigital.com/sitemap-games.xml",
      "https://www.vitalgamesdigital.com/sitemap-multigames.xml",
      "https://www.vitalgamesdigital.com/sitemap-static.xml",
    ],
  }
}

// Generate text version for better compatibility
export async function GET() {
  const robotsTxt = generateRobotsTxt()

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
