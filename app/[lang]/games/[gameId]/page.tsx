import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { games } from "@/lib/allgamesmap"
import { multigames } from "@/lib/multigames"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import GameContent from "@/components/games/game-content"
import Script from "next/script"

type Params = Promise<{ lang: Locale; gameId: string }>

export async function generateStaticParams() {
  const paths: { lang: Locale; gameId: string }[] = []
  const languages: Locale[] = ["it", "en", "es"]

  languages.forEach((lang) => {
    // Add all multigames
    multigames.forEach((multigame) => {
      paths.push({
        lang,
        gameId: multigame.slug,
      })
    })
    // Add all games
    games.forEach((game) => {
      paths.push({
        lang,
        gameId: game.slug,
      })
    })
  })

  return paths
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const dict = await getDictionary(params.lang)

  // Check if it's a multigame
  const multigame = multigames.find((m) => m.slug === params.gameId)
  
  // Check if it's an allgame
  const allgame = games.find((g) => g.slug === params.gameId)

  if (multigame) {
    const translatedDescription =
      dict.home?.multigames?.descriptions?.[multigame.slug as keyof typeof dict.home.multigames.descriptions] ||
      multigame.description

    return {
      title: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
      description: translatedDescription,
      keywords: [
        `${multigame.title} multigame`,
        `${multigame.title} AWP`,
        `${multigame.title} Vitalgames`,
        `${multigame.title} slot machine`,
      ].join(", "),
      alternates: {
        canonical: `https://www.vitalgamesdigital.com/${params.lang}/games/${params.gameId}`,
        languages: {
          "en-US": `/en/games/${params.gameId}`,
          "it-IT": `/it/games/${params.gameId}`,
          "es-ES": `/es/games/${params.gameId}`,
        },
      },
      openGraph: {
        title: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
        description: translatedDescription,
        type: "website",
        url: `https://www.vitalgamesdigital.com/${params.lang}/games/${params.gameId}`,
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
    }
  }

  if (allgame) {
    const titles = {
      it: `${allgame.name} | Slot Machine Innovativa | Vitalgames`,
      en: `${allgame.name} | Innovative Slot Machine | Vitalgames`,
      es: `${allgame.name} | Máquina Tragamonedas Innovadora | Vitalgames`,
    }

    const descriptions = {
      it: `Scopri ${allgame.name}, slot machine innovativa di Vitalgames con grafica HD, bonus game emozionanti e jackpot. Disponibile in versione AWP, VLT e online.`,
      en: `Discover ${allgame.name}, innovative slot machine by Vitalgames with HD graphics, exciting bonus games and jackpots. Available in AWP, VLT and online versions.`,
      es: `Descubre ${allgame.name}, máquina tragamonedas innovadora de Vitalgames con gráficos HD, emocionantes juegos bonus y jackpots. Disponible en versiones AWP, VLT y online.`,
    }

    return generateAdvancedSEOMetadata("gameDetail", params.lang, {
      title: titles[params.lang],
      description: descriptions[params.lang],
      keywords: [`${allgame.name} slot machine`, `${allgame.name} Vitalgames`],
      image: allgame.coverImage?.src || allgame.mainImage?.src,
      additionalImages: allgame.images?.slice(0, 3).map((img) => img.src) || [],
      gameData: allgame,
    })
  }

  return {
    title: "Game Not Found | Vitalgames",
    description: "The requested game could not be found.",
  }
}

export default async function GamePage(props: { params: Params }) {
  const params = await props.params
  const dict = await getDictionary(params.lang)

  // Check if it's a multigame
  const multigame = multigames.find((m) => m.slug === params.gameId)
  
  // Check if it's an allgame
  const allgame = games.find((g) => g.slug === params.gameId)

  if (!multigame && !allgame) {
    notFound()
  }

  // Generate schema for multigame
  if (multigame) {
    const translatedDescription =
      dict.home?.multigames?.descriptions?.[multigame.slug as keyof typeof dict.home.multigames.descriptions] ||
      multigame.description

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": ["Product", "Game"],
      "@id": `https://www.vitalgamesdigital.com/${params.lang}/games/${params.gameId}`,
      name: multigame.title,
      description: translatedDescription,
      category: "AWP Multigame System",
      brand: {
        "@type": "Brand",
        name: "Vitalgames",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Vitalgames",
        url: "https://www.vitalgamesdigital.com",
        logo: "https://www.vitalgamesdigital.com/logo.png",
      },
      image: [
        {
          "@type": "ImageObject",
          url: `https://www.vitalgamesdigital.com${multigame.mainImage.src}`,
          width: 1200,
          height: 630,
          caption: `${multigame.title} - Sistema multigame AWP`,
        },
      ],
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://www.vitalgamesdigital.com/${params.lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Games",
            item: `https://www.vitalgamesdigital.com/${params.lang}/games`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: multigame.title,
            item: `https://www.vitalgamesdigital.com/${params.lang}/games/${params.gameId}`,
          },
        ],
      },
    }

    return (
      <>
        <Script
          id={`multigame-${params.gameId}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <GameContent gameId={params.gameId} lang={params.lang} />
      </>
    )
  }

  // Generate schema for allgame
  if (allgame) {
    const gameSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Game",
          "@id": `https://www.vitalgamesdigital.com/${params.lang}/games/${allgame.slug}#game`,
          name: allgame.name,
          description: allgame.description || `${allgame.name} - Innovative slot machine by Vitalgames`,
          gamePlatform: ["AWP", "VLT", "Online"],
          genre: "Slot Machine",
          image: [allgame.coverImage?.src || allgame.mainImage?.src],
          url: `https://www.vitalgamesdigital.com/${params.lang}/games/${allgame.slug}`,
          provider: {
            "@type": "Organization",
            name: "Vitalgames",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://www.vitalgamesdigital.com/${params.lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Games",
                item: `https://www.vitalgamesdigital.com/${params.lang}/games`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: allgame.name,
                item: `https://www.vitalgamesdigital.com/${params.lang}/games/${allgame.slug}`,
              },
            ],
          },
        },
      ],
    }

    return (
      <>
        <Script
          id={`game-${params.gameId}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(gameSchema),
          }}
        />
        <GameContent gameId={params.gameId} lang={params.lang} />
      </>
    )
  }

  return null
}





