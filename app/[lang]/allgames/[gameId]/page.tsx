import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { games } from "@/lib/allgamesmap"
import { multigames } from "@/lib/multigames"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Multigame from "./game-of"
import SmoothReveal from "@/components/smooth-reveal"

type Params = Promise<{ lang: Locale; gameId: string }>

export async function generateStaticParams() {
  const paths: { lang: Locale; gameId: string }[] = []

  const languages: Locale[] = ["it", "en", "es"]

  languages.forEach((lang) => {
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
  const game = games.find((g) => g.slug === params.gameId)

  if (!game) {
    return {
      title: "Game Not Found | Vitalgames",
      description: "The requested game could not be found.",
    }
  }

  const titles = {
    it: `${game.name} | Slot Machine Innovativa | Vitalgames`,
    en: `${game.name} | Innovative Slot Machine | Vitalgames`,
    es: `${game.name} | Máquina Tragamonedas Innovadora | Vitalgames`,
  }

  const descriptions = {
    it: `Scopri ${game.name}, slot machine innovativa di Vitalgames con grafica HD, bonus game emozionanti e jackpot. Disponibile in versione AWP, VLT e online. ${game.description || ""}`,
    en: `Discover ${game.name}, innovative slot machine by Vitalgames with HD graphics, exciting bonus games and jackpots. Available in AWP, VLT and online versions. ${game.description || ""}`,
    es: `Descubre ${game.name}, máquina tragamonedas innovadora de Vitalgames con gráficos HD, emocionantes juegos bonus y jackpots. Disponible en versiones AWP, VLT y online. ${game.description || ""}`,
  }

  const keywords = {
    it: [
      `${game.name} slot machine`,
      `${game.name} Vitalgames`,
      `slot machine ${game.name}`,
      `gioco ${game.name}`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `slot ${game.name} Italia`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} gratis`,
      `${game.name} demo`,
      "slot machine innovativa",
      "slot machine HD",
      "slot machine bonus",
      "slot machine jackpot",
      "Vitalgames slot",
      "produttore slot machine",
      "slot machine Italia",
      "slot machine legali",
    ],
    en: [
      `${game.name} slot machine`,
      `${game.name} Vitalgames`,
      `${game.name} slot game`,
      `${game.name} game`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `${game.name} slot Italy`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} free`,
      `${game.name} demo`,
      "innovative slot machine",
      "HD slot machine",
      "bonus slot machine",
      "jackpot slot machine",
      "Vitalgames slots",
      "slot machine manufacturer",
      "Italian slot machines",
      "legal slot machines",
    ],
    es: [
      `${game.name} máquina tragamonedas`,
      `${game.name} Vitalgames`,
      `tragamonedas ${game.name}`,
      `juego ${game.name}`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `${game.name} tragamonedas Italia`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} gratis`,
      `${game.name} demo`,
      "máquina tragamonedas innovadora",
      "máquina tragamonedas HD",
      "máquina tragamonedas bonus",
      "máquina tragamonedas jackpot",
      "Vitalgames tragamonedas",
      "fabricante máquinas tragamonedas",
      "máquinas tragamonedas Italia",
      "máquinas tragamonedas legales",
    ],
  }

  return generateAdvancedSEOMetadata("gameDetail", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: game.coverImage?.src || game.mainImage?.src,
    additionalImages: game.images?.slice(0, 3).map((img) => img.src) || [],
    gameData: game,
  })
}

export default async function GamePage(props: { params: Params }) {
  const params = await props.params
  const dict = await getDictionary(params.lang)
  const game = games.find((g) => g.slug === params.gameId)

  if (!game) {
    notFound()
  }

  // Generate comprehensive game schema
  const gameSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Main game schema
      {
        "@type": "Game",
        "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#game`,
        name: game.name,
        description:
          game.description ||
          `${game.name} - Innovative slot machine by Vitalgames with HD graphics and exciting bonus features`,
        gameItem: {
          "@type": "Thing",
          name: "Slot Machine",
        },
        gamePlatform: ["AWP", "VLT", "Online"],
        genre: "Slot Machine",
        image: [game.coverImage?.src || game.mainImage?.src, ...(game.images?.slice(0, 5).map((img) => img.src) || [])],
        url: `https://vitalgames.com/${params.lang}/allgames/${game.slug}`,
        provider: {
          "@type": "Organization",
          "@id": "https://vitalgames.com/#organization",
          name: "Vitalgames",
          url: "https://vitalgames.com",
        },
        manufacturer: {
          "@type": "Organization",
          "@id": "https://vitalgames.com/#organization",
          name: "Vitalgames",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Gaming Equipment",
          seller: {
            "@type": "Organization",
            "@id": "https://vitalgames.com/#organization",
            name: "Vitalgames",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1",
        },
      },
      // Product schema
      {
        "@type": "Product",
        "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#product`,
        name: `${game.name} Slot Machine`,
        description: `Professional ${game.name} slot machine by Vitalgames. Available in AWP, VLT and online versions with HD graphics and bonus features.`,
        brand: {
          "@type": "Brand",
          name: "Vitalgames",
        },
        manufacturer: {
          "@type": "Organization",
          "@id": "https://vitalgames.com/#organization",
          name: "Vitalgames",
        },
        category: "Gaming Equipment",
        image: game.coverImage?.src || game.mainImage?.src,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Gaming Equipment",
        },
      },
      // Breadcrumb schema
      {
        "@type": "BreadcrumbList",
        "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: game.name,
            item: `https://vitalgames.com/${params.lang}/allgames/${game.slug}`,
          },
        ],
      },
      // WebPage schema
      {
        "@type": "WebPage",
        "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#webpage`,
        url: `https://vitalgames.com/${params.lang}/allgames/${game.slug}`,
        name: `${game.name} | Vitalgames`,
        description: game.description || `${game.name} slot machine by Vitalgames`,
        inLanguage: params.lang,
        isPartOf: {
          "@id": "https://vitalgames.com/#website",
        },
        breadcrumb: {
          "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#breadcrumb`,
        },
        mainEntity: {
          "@id": `https://vitalgames.com/${params.lang}/allgames/${game.slug}#game`,
        },
      },
    ],
  }

  return (
    <>
      <Script
        id={`game-${game.slug}-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema),
        }}
      />

      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <header className="relative w-full">
          <div className="relative w-full h-[80vh]">
            {/* Mobile image */}
            <Image
              src={game.mobileBg || game.coverImage || game.mainImage}
              alt={`${game.name} - Slot machine innovativa Vitalgames versione mobile`}
              fill
              className="object-cover block md:hidden"
              priority
            />
            {/* Desktop image */}
            <Image
              src={game.coverImage || game.mainImage}
              alt={`${game.name} - Slot machine innovativa Vitalgames con grafica HD e bonus game`}
              fill
              className="object-cover hidden md:block"
              priority
            />
            <div className="absolute inset-0" />
            <div className="absolute left-0 top-16 md:top-0 h-full w-full md:w-1/2 p-4 pt-8 md:p-12 flex flex-col items-center md:items-start justify-start md:justify-center text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-white dharma">{game.name}</h1>
              <p className="text-xs text-white mt-2 max-w-xl">
                {dict.allGamesDescriptions[game.slug]}</p>
            </div> 
          </div>
        </header>

        {/* Gallery Section */}
        <section
          className="max-w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 md:pt-12 overflow-hidden h-fit pb-0"
          aria-labelledby="gallery-heading"
        >
          <h2 id="gallery-heading" className="sr-only">
            Galleria immagini {game.name}
          </h2>
          <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]">
            <div className="flex animate-infinite-scroll -ml-[1000px] sm:-ml-[1500px] md:-ml-[2000px]">
              {/* Left side images */}
              {game.images?.map((image, index) => (
                <div
                  key={`left-${index}`}
                  className="flex-shrink-0 h-[125px] sm:h-[145px] md:h-[375px] mx-2 sm:mx-3 md:mx-4 h-full"
                >
                  <div className="bg-[#171717] rounded-xl  p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                    <div className="relative h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${game.name} - Screenshot ${index + 1} della slot machine con interfaccia di gioco e simboli`}
                        className="h-full w-auto object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Center images */}
              {game.images?.map((image, index) => (
                <div
                  key={`center-${index}`}
                  className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[500px] mx-2 sm:mx-3 md:mx-4 h-full"
                >
                  <div className="bg-[#171717] rounded-xl p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${game.name} - Screenshot ${index + 1} della slot machine con interfaccia di gioco e simboli`}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Right side images */}
              {game.images?.map((image, index) => (
                <div
                  key={`right-${index}`}
                  className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[500px] mx-2 sm:mx-3 md:mx-4 h-full"
                >
                  <div className="bg-[#171717] rounded-xl p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${game.name} - Screenshot ${index + 1} della slot machine con interfaccia di gioco e simboli`}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Multigame />

        {/* RECOMMENDED GAMES SECTION */}
        <section className="relative overflow-visible" aria-labelledby="recommended-heading">
          {/* Background with gradient and logo pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-transparent">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="container mx-auto px-4">
              <div className="mb-8 w-full flex flex-col items-start">
                <SmoothReveal>
                  <h2
                    id="recommended-heading"
                    className="text-start dharma text-4xl md:text-6xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap"
                  >
                    {dict.allGames.recommended.title || "Ti potrebbero interessare anche"}
                  </h2>
                </SmoothReveal>
              </div>

              <div>
                <div className="absolute left-0 right-0 top-[0%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 md:gap-6">
                  {multigames.slice(0, 5).map((multigame) => (
                    <SmoothReveal key={multigame.id}>
                      <article>
                        <Link
                          href={`/${params.lang}/awp-multigames/${multigame.slug}`}
                          className="block group rounded-lg overflow-hidden"
                          aria-label={`Scopri ${multigame.title} - Sistema multigame Vitalgames`}
                        >
                          <Image
                            src={multigame.mainImage || "/placeholder.svg"}
                            alt={`${multigame.title} - Sistema multigame Vitalgames con multiple slot machine`}
                            width={1080}
                            height={1196}
                            className="w-full h-auto object-contain rounded-lg"
                            loading="lazy"
                          />
                        </Link>
                      </article>
                    </SmoothReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
