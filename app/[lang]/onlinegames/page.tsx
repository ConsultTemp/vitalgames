import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import Image from "next/image"
import VideoHero from "@/components/VideoHero"
import AllOnlineGamesList from "@/components/onlinegames/allonlinegameslist"
import { onlineGames } from "@/lib/onlinegames"
import Link from "next/link"
import casinoroyaleHover from "../../../public/multigames-pagis/Card/casinoroyale.jpg"
import diamanteHover from "../../../public/multigames-cards/DIAMANTE_Converted.jpg"
import luckySlot from "../../../public/multigames-cards/lucky_slot.png"
import fortuneUltralink from "../../../public/fortune_ultralink.png"

export const multigames = [
  {
    id: 1,
    slug: "casino-royale",
    title: "Casino Royale",
    image: casinoroyaleHover,
  },
  {
    id: 2,
    slug: "diamante",
    title: "Diamante Multigame",
    image: diamanteHover,
  },
  {
    id: 4,
    slug: "lucky-slot",
    title: "Lucky Slot",
    image: luckySlot,
  },
]

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const titles = {
    it: "Giochi Online | Slot Machine Demo e Giochi Gratuiti | Vitalgames",
    en: "Online Games | Slot Machine Demos and Free Games | Vitalgames",
    es: "Juegos Online | Demos de Tragamonedas y Juegos Gratis | Vitalgames",
  }

  const descriptions = {
    it: "Gioca gratis alle slot machine Vitalgames online. Prova le nostre demo gratuite di slot AWP, VLT e multigame. Oltre 20 giochi disponibili con grafica HD e bonus game.",
    en: "Play Vitalgames slot machines online for free. Try our free demos of AWP slots, VLTs and multigames. Over 20 games available with HD graphics and bonus games.",
    es: "Juega gratis a las máquinas tragamonedas Vitalgames online. Prueba nuestras demos gratuitas de slots AWP, VLT y multijuegos. Más de 20 juegos disponibles con gráficos HD y juegos bonus.",
  }

  const keywords = {
    it: [
      "slot machine online gratis",
      "giochi slot demo",
      "slot machine Vitalgames online",
      "giochi online gratuiti",
      "demo slot machine",
      "slot machine senza deposito",
      "giochi AWP online",
      "giochi VLT online",
      "slot machine prova gratis",
      "casino online demo",
      "slot machine browser",
      "giochi slot HTML5",
      "slot machine mobile",
      "demo gratuita slot",
      "slot machine Italia online",
      "giochi casinò gratis",
      "slot machine senza registrazione",
      "prova slot machine",
    ],
    en: [
      "free online slot machines",
      "slot games demo",
      "Vitalgames online slots",
      "free online games",
      "slot machine demos",
      "no deposit slots",
      "AWP games online",
      "VLT games online",
      "free slot machine trial",
      "online casino demo",
      "browser slot machines",
      "HTML5 slot games",
      "mobile slot machines",
      "free slot demo",
      "Italian slots online",
      "free casino games",
      "no registration slots",
      "try slot machines",
    ],
    es: [
      "máquinas tragamonedas gratis online",
      "demos juegos slot",
      "slots online Vitalgames",
      "juegos online gratuitos",
      "demos máquinas tragamonedas",
      "slots sin depósito",
      "juegos AWP online",
      "juegos VLT online",
      "prueba gratis tragamonedas",
      "demo casino online",
      "tragamonedas navegador",
      "juegos slot HTML5",
      "tragamonedas móvil",
      "demo gratuita slots",
      "slots Italia online",
      "juegos casino gratis",
      "slots sin registro",
      "probar máquinas tragamonedas",
    ],
  }

  return generateAdvancedSEOMetadata("onlineGames", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: "/onlinegames-hero.jpg",
    additionalImages: [
      "/images/online-slot-collection-1.jpg",
      "/images/online-vlt-collection.jpg",
      "/images/online-multigame-collection.jpg",
    ],
  })
}

export default async function OnlineGamesPage(props: { params: Params }) {
  const params = await props.params
  const dict = await getDictionary(params.lang)

  // Generate comprehensive schema for all online games
  const allOnlineGamesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Main page schema
      {
        "@type": "CollectionPage",
        "@id": `https://www.vitalgamesdigital.com/${params.lang}/onlinegames#page`,
        url: `https://www.vitalgamesdigital.com/${params.lang}/onlinegames`,
        name: "Giochi Online Vitalgames",
        description: "Collezione completa di slot machine online gratuite e demo giocabili",
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
              name: "Giochi Online",
              item: `https://www.vitalgamesdigital.com/${params.lang}/onlinegames`,
            },
          ],
        },
      },
      // Games collection schema
      {
        "@type": "ItemList",
        "@id": `https://www.vitalgamesdigital.com/${params.lang}/onlinegames#games`,
        name: "Vitalgames Online Games Collection",
        description: "Complete collection of free online slot machines and demos by Vitalgames",
        numberOfItems: onlineGames.length,
        itemListElement: onlineGames.map((game, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Game",
            "@id": `${game.demoLink}#game`,
            name: game.title,
            description: `${game.title} - Free online slot machine demo by Vitalgames`,
            gameItem: {
              "@type": "Thing",
              name: "Online Slot Machine",
            },
            gamePlatform: ["Web Browser", "Mobile", "Desktop"],
            genre: "Slot Machine",
            image: game.image?.src,
            url: game.demoLink,
            provider: {
              "@type": "Organization",
              "@id": "https://www.vitalgamesdigital.com/#organization",
              name: "Vitalgames",
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              category: "Free Online Game",
              price: "0",
              priceCurrency: "EUR",
            },
          },
        })),
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

  return (
    <>
      <Script
        id="onlinegames-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allOnlineGamesSchema),
        }}
      />

      <main className="bg-black">
        <header>
          <VideoHero
            title={dict.home.onlineGames.hero.title}
            subtitle={dict.home.onlineGames.hero.subtitle}
            videoUrl="e760e202854b2e8f7869adac822d2232"
            mobileVideoUrl="f0c612958e0ee1f822a4011723ec8203"
          />
        </header>

        <section aria-labelledby="games-list-heading">
          <h2 id="games-list-heading" className="sr-only">
            {dict.home.onlineGames.hero.title}
          </h2>
          <AllOnlineGamesList lang={params.lang} />
        </section>

        {/* RECOMMENDED GAMES */}
        <section className="relative min-h-[50vh]" aria-labelledby="recommended-games-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#007bff]/50 to-transparent pointer-events-none" />
          <div className="px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
            <h2
              id="recommended-games-heading"
              className="text-lg md:text-2xl uppercase text-white font-hitmarker-text-bold mb-8"
            >
              Giochi Consigliati
            </h2>
            <div className="flex flex-col md:flex-row gap-1 md:gap-2">
              {multigames.slice(0, 3).map((game, index) => (
                <article key={game.id} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                  <Link
                    href={`/${params.lang}/awp-multigames/${game.slug}`}
                    aria-label={`Scopri ${game.title} - Sistema multigame Vitalgames`}
                  >
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={`${game.title} - Sistema multigame Vitalgames con multiple slot machine`}
                        className="w-full h-auto"
                        width={400}
                        height={300}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
