import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import { multigames } from "@/lib/multigames"
import { redirect } from "next/navigation"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const seoData = generateAdvancedSEOMetadata(
    "awpMultigames",
    lang,
    {
      title: dict.awpMultigames.page.title,
      description: dict.awpMultigames.page.subtitle,
      gameData: {
        category: "AWP Multigames",
        features: ["Sistemi multigame", "AWP", "Bar", "Sale giochi", "Multiple slot"],
      },
    }
  )

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: "Vitalgames" }],
    creator: "Vitalgames",
    publisher: "Vitalgames",
    alternates: {
      canonical: `https://www.vitalgamesdigital.com/${lang}/awp-multigames`,
      languages: {
        "en-US": "/en/awp-multigames",
        "it-IT": "/it/awp-multigames",
        "es-ES": "/es/awp-multigames",
      },
    },
    openGraph: seoData.openGraph,
    twitter: seoData.twitter,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }
}

export default async function AwpMultigamesPage({ params }: { params: Params }) {
  const { lang } = await params
  
  // Redirect 301 permanente alla nuova rotta unificata con query param
  redirect(`/${lang}/games?type=awp-multigames`)
}
