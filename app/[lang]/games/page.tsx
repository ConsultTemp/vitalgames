import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import VideoHero from "@/components/VideoHero"
import GamesSearch from "@/components/games/games-search"
import { PageTransitionOverlay } from "@/components/page-transition-overlay"
import { games } from "@/lib/allgamesmap"
import { multigames } from "@/lib/multigames"
import { onlineGames } from "@/lib/onlinegames"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const titles = {
    it: "Tutti i Giochi | Slot Machine, VLT, Multigame e Online | Vitalgames",
    en: "All Games | Slot Machines, VLTs, Multigames and Online | Vitalgames",
    es: "Todos los Juegos | Máquinas Tragamonedas, VLT, Multijuegos y Online | Vitalgames",
  }

  const descriptions = {
    it: "Esplora la collezione completa di Vitalgames: slot machine AWP, VLT, sistemi multigame e giochi online. Oltre 100 titoli con temi innovativi, jackpot e grafica HD.",
    en: "Explore Vitalgames' complete collection: AWP slot machines, VLTs, multigame systems and online games. Over 100 titles with innovative themes, jackpots and HD graphics.",
    es: "Explora la colección completa de Vitalgames: máquinas tragamonedas AWP, VLT, sistemas multijuego y juegos online. Más de 100 títulos con temas innovadores, jackpots y gráficos HD.",
  }

  const keywords = {
    it: [
      "slot machine Vitalgames",
      "tutti i giochi slot",
      "collezione slot machine",
      "giochi AWP",
      "giochi VLT",
      "multigame Vitalgames",
      "giochi online Vitalgames",
      "slot machine temi",
      "slot machine jackpot",
      "slot machine bonus",
      "giochi da casinò",
      "slot machine bar",
      "slot machine sala giochi",
      "slot machine online",
      "produttore slot machine",
      "slot machine Italia",
      "slot machine Milano",
      "slot machine certificate",
      "slot machine legali",
    ],
    en: [
      "Vitalgames slot machines",
      "all slot games",
      "slot machine collection",
      "AWP games",
      "VLT games",
      "Vitalgames multigames",
      "Vitalgames online games",
      "themed slot machines",
      "jackpot slot machines",
      "bonus slot machines",
      "casino games",
      "bar slot machines",
      "arcade slot machines",
      "online slot machines",
      "slot machine manufacturer",
      "Italian slot machines",
      "Milan slot machines",
      "certified slot machines",
      "legal slot machines",
    ],
    es: [
      "máquinas tragamonedas Vitalgames",
      "todos los juegos tragamonedas",
      "colección máquinas tragamonedas",
      "juegos AWP",
      "juegos VLT",
      "multijuegos Vitalgames",
      "juegos online Vitalgames",
      "máquinas tragamonedas temáticas",
      "máquinas tragamonedas jackpot",
      "máquinas tragamonedas bonus",
      "juegos casino",
      "máquinas tragamonedas bar",
      "máquinas sala juego",
      "máquinas tragamonedas online",
      "fabricante máquinas tragamonedas",
      "máquinas tragamonedas Italia",
      "máquinas tragamonedas Milán",
      "máquinas certificadas",
      "máquinas legales",
    ],
  }

  return generateAdvancedSEOMetadata("games", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: "/allgames-hero.jpg",
    additionalImages: [
      "/images/slot-collection-1.jpg",
      "/images/vlt-collection.jpg",
      "/images/multigame-collection.jpg",
    ],
  })
}

export default async function GamesPage(props: { params: Params }) {
  const params = await props.params
  const dict = await getDictionary(params.lang)

  // Generate comprehensive schema for all games
  const allGamesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Main page schema
      {
        "@type": "CollectionPage",
        "@id": `https://www.vitalgamesdigital.com/${params.lang}/games#page`,
        url: `https://www.vitalgamesdigital.com/${params.lang}/games`,
        name: dict.allGames?.hero?.title || "All Games",
        description: dict.allGames?.hero?.subtitle || "Complete game collection",
        inLanguage: params.lang,
        isPartOf: {
          "@id": "https://www.vitalgamesdigital.com/#website",
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
              name: "All Games",
              item: `https://www.vitalgamesdigital.com/${params.lang}/games`,
            },
          ],
        },
      },
      // Organization reference
      {
        "@type": "Organization",
        "@id": "https://www.vitalgamesdigital.com/#organization",
        name: "Vitalgames",
        url: "https://www.vitalgamesdigital.com",
        logo: "https://www.vitalgamesdigital.com/logo.png",
      },
    ],
  }

  // Sort games to put coming soon games first
  const sortedAllGames = [...games].sort((a, b) => {
    if (a.isComingSoon && !b.isComingSoon) return -1
    if (!a.isComingSoon && b.isComingSoon) return 1
    return 0
  })

  return (
    <>
      <Script
        id="games-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allGamesSchema),
        }}
      />
      <PageTransitionOverlay />

      <main className="bg-black">
        <header>
          <VideoHero
            title={dict.allGames?.hero?.title || "All Games"}
            subtitle={dict.allGames?.hero?.subtitle || "Complete game collection"}
            videoUrl="c07afde42ff64ee4a56f5fdd41a57122"
            mobileVideoUrl="2882a8027280f1e3603708b425071eeb"
          />
        </header>

        <GamesSearch
          multigames={multigames}
          allGames={sortedAllGames}
          onlineGames={onlineGames}
          lang={params.lang}
          dict={dict}
        />
      </main>
    </>
  )
}

