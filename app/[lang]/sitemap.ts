import type { MetadataRoute } from "next"
import { i18n } from "@/i18n-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pattycar.com"
  const lastModified = new Date()

  // Define all routes with their priorities and change frequencies
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/experiences", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  // Service-specific routes
  const serviceRoutes = [
    { path: "/services/transfer-ncc", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/events", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/diplomatic", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/luxury-hotels", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/business", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  // Experience-specific routes
  const experienceRoutes = [
    { path: "/experiences/maranello", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/experiences/como", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/experiences/vip-lounge", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  // Combine all routes
  const allRoutes = [...routes, ...serviceRoutes, ...experienceRoutes]

  // Create sitemap entries for all routes in all languages
  const entries = i18n.locales.flatMap((locale) => {
    return allRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  })

  return entries
}

