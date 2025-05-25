import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import Image from "next/image"
import VideoHero from "@/components/VideoHero"
import AllGamesList from "@/components/allgames/allgameslist"
import { games } from "@/lib/allgamesmap"
import Link from "next/link"
import casinoroyaleHover from "../../../public/multigames-cards/CASINO ROYALE_Converted.jpg"
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
    id: 3,
    slug: "fortune-ultralink",
    title: "Fortune Ultralink",
    image: fortuneUltralink,
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
    it: "Tutti i Giochi | Slot Machine, VLT e Multigame | Vitalgames",
    en: "All Games | Slot Machines, VLTs and Multigames | Vitalgames",
    es: "Todos los Juegos | Máquinas Tragamonedas, VLT y Multijuegos | Vitalgames",
  }

  const descriptions = {
    it: "Esplora la collezione completa di slot machine Vitalgames: oltre 100 giochi AWP, VLT e multigame con temi innovativi. Scopri le nostre slot più popolari con jackpot, bonus game e grafica HD.",
    en: "Explore Vitalgames' complete slot machine collection: over 100 AWP, VLT and multigame titles with innovative themes. Discover our most popular slots with jackpots, bonus games and HD graphics.",
    es: "Explora la colección completa de máquinas tragamonedas Vitalgames: más de 100 títulos AWP, VLT y multijuego con temas innovadores. Descubre nuestras tragamonedas más populares con jackpots, juegos bonus y gráficos HD.",
  }

  const keywords = {
    it: [
      "slot machine Vitalgames",
      "tutti i giochi slot",
      "collezione slot machine",
      "giochi AWP",
      "giochi VLT",
      "multigame Vitalgames",
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

  return generateAdvancedSEOMetadata("allGames", params.lang, {
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

export default async function AllGamesPage(props: { params: Params }) {
  const params = await props.params
  const dict = await getDictionary(params.lang)

  // Generate comprehensive schema for all games
  const allGamesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Main page schema
      {
        "@type": "CollectionPage",
        "@id": `https://vitalgames.com/${params.lang}/allgames#page`,
        url: `https://vitalgames.com/${params.lang}/allgames`,
        name: dict.allGames.hero.title,
        description: dict.allGames.hero.subtitle,
        inLanguage: params.lang,
        isPartOf: {
          "@id": "https://vitalgames.com/#website",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `https://vitalgames.com/${params.lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: dict.allGames.hero.title,
              item: `https://vitalgames.com/${params.lang}/allgames`,
            },
          ],
        },
      },
      // Games collection schema
      {
        "@type": "ItemList",
        "@id": `https://vitalgames.com/${params.lang}/allgames#games`,
        name: "Vitalgames Slot Machine Collection",
        description: "Complete collection of slot machines, VLTs and multigames by Vitalgames",
        numberOfItems: games.length,
        itemListElement: games.map((game, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Game",
            "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#game`,
            name: game.name,
            description: game.description || `${game.name} - Innovative slot machine by Vitalgames`,
            gameItem: {
              "@type": "Thing",
              name: "Slot Machine",
            },
            gamePlatform: ["AWP", "VLT", "Online"],
            genre: "Slot Machine",
            image: game.coverImage?.src || game.mainImage?.src,
            url: `https://vitalgames.com/${params.lang}/allgames/${game.slug}`,
            provider: {
              "@type": "Organization",
              "@id": "https://vitalgames.com/#organization",
              name: "Vitalgames",
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              category: "Gaming Equipment",
            },
          },
        })),
      },
      // Organization reference
      {
        "@type": "Organization",
        "@id": "https://vitalgames.com/#organization",
        name: "Vitalgames",
        url: "https://vitalgames.com",
        logo: "https://vitalgames.com/logo.png",
      },
    ],
  }

  return (
    <>
      <Script
        id="allgames-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allGamesSchema),
        }}
      />

      <main className="bg-black">
        <header>
          <VideoHero
            title={dict.allGames.hero.title}
            subtitle={dict.allGames.hero.subtitle}
            videoUrl="https://files.catbox.moe/gdaic4.mp4"
          />
        </header>

        <section aria-labelledby="games-list-heading">
          <h2 id="games-list-heading" className="sr-only">
            {dict.allGames.hero.title}
          </h2>
          <AllGamesList />
        </section>

        {/* RECOMMENDED GAMES */}
        <section className="relative min-h-[50vh]" aria-labelledby="recommended-games-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#007bff]/50 to-transparent pointer-events-none" />
          <div className="px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
            <h2
              id="recommended-games-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-8 text-center dharma"
            >
              {dict.allGames.recommended.title || "Recommended Games"}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
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
