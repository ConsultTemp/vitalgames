import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { multigames } from "@/lib/multigames"
import { redirect } from "next/navigation"

type Params = Promise<{ lang: Locale; gameId: string }>

// Generate static params for all multigames
export async function generateStaticParams() {
  const multigamesList = [
    "manhattan",
    "champions",
    "diamante",
    "piggy-gold",
    "casino-royale",
    "circus",
    "rubino",
    "zaffiro",
    "golden-club",
    "lucky-slot",
  ]

  const languages = ["en", "it", "es"]

  return languages.flatMap((lang) =>
    multigamesList.map((gameId) => ({
      lang,
      gameId,
    })),
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, gameId } = await params
  const dict = await getDictionary(lang)

  const multigame = multigames.find((m) => m.slug === gameId)

  if (!multigame) {
    return {
      title: "Multigame Non Trovato | Vitalgames",
      description: "Il multigame richiesto non è stato trovato.",
    }
  }

  const translatedDescription =
    dict.home?.multigames?.descriptions?.[multigame.slug as keyof typeof dict.home.multigames.descriptions] ||
    multigame.description

  const gameKeywords = [
    `${multigame.title} multigame`,
    `${multigame.title} AWP`,
    `${multigame.title} Vitalgames`,
    `${multigame.title} slot machine`,
    `${multigame.title} bar`,
    `${multigame.title} sala giochi`,
    `sistema multigame ${multigame.title}`,
    `cabinet ${multigame.title}`,
    `${multigame.title} Italia`,
    `${multigame.title} Milano`,
    ...multigame.games.map((game) => `${game.name} slot`),
    ...multigame.games.map((game) => `${game.name} gioco`),
  ]

  return {
    title: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
    description: translatedDescription,
    keywords: gameKeywords.join(", "),
    authors: [{ name: "Vitalgames" }],
    creator: "Vitalgames",
    publisher: "Vitalgames",
    alternates: {
      canonical: `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
      languages: {
        "en-US": `/en/awp-multigames/${gameId}`,
        "it-IT": `/it/awp-multigames/${gameId}`,
        "es-ES": `/es/awp-multigames/${gameId}`,
      },
    },
    openGraph: {
      title: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
      description: translatedDescription,
      type: "website",
      url: `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
      siteName: "Vitalgames",
      images: [
        {
          url: `https://www.vitalgamesdigital.com${multigame.mainImage.src}`,
          width: 1200,
          height: 630,
          alt: `${multigame.title} - Sistema multigame AWP Vitalgames`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
      description: translatedDescription,
      images: [`https://www.vitalgamesdigital.com${multigame.mainImage.src}`],
    },
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
  }
}

export default async function MultigamePage({ params }: { params: Params }) {
  const { lang, gameId } = await params
  
  // Redirect 301 permanente alla nuova rotta unificata
  redirect(`/${lang}/games/${gameId}`)
}
