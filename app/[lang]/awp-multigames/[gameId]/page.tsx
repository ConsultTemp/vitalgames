import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { multigames } from "@/lib/multigames"
import { multigames as multigamesCards } from "@/components/home/multigames"
import { notFound } from "next/navigation"
import GameSection from "./awp-hero"

type Params = Promise<{ lang: Locale; gameId: string }>

// Generate static params for all multigames
export async function generateStaticParams() {
  const multigamesList = [
    "manhattan",
    "champions",
    "fortune-ultralink",
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

  type MultigameSlug = keyof typeof dict.home.multigames.descriptions
  const translatedDescription =
    dict.home.multigames.descriptions[multigame.slug as MultigameSlug] || multigame.description

  const seoData = generateAdvancedSEOMetadata(
    "awpMultigame",
    lang,
    {
      title: multigame.title,
      description: translatedDescription,
      gameData: {
        category: "AWP Multigame",
        features: [`${multigame.games.length} giochi`, "Sistema multigame", "AWP", "Bar e sale giochi"],
        images: [multigame.mainImage.src, ...multigame.games.slice(0, 3).map((g) => g.mainImage.src)],
      },
    }
  )

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
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords ? [...seoData.keywords, ...gameKeywords].join(", ") : gameKeywords.join(", "),
    authors: [{ name: "Vitalgames" }],
    creator: "Vitalgames", 
    publisher: "Vitalgames",
    alternates: {
      canonical: `https://vitalgames.com/${lang}/awp-multigames/${gameId}`,
      languages: {
        "en-US": `/en/awp-multigames/${gameId}`,
        "it-IT": `/it/awp-multigames/${gameId}`,
        "es-ES": `/es/awp-multigames/${gameId}`,
      },
    },
    openGraph: {
      ...seoData.openGraph,
      type: "video.other",
      images: [
        {
          url: `https://vitalgames.com${multigame.mainImage.src}`,
          width: 1200,
          height: 630,
          alt: `${multigame.title} - Sistema multigame AWP Vitalgames`,
        },
        ...multigame.games.slice(0, 3).map((game) => ({
          url: `https://vitalgames.com${game.mainImage.src}`,
          width: 800,
          height: 600,
          alt: `${game.name} - Gioco incluso in ${multigame.title}`,
        })),
      ],
    },
    twitter: {
      ...seoData.twitter,
      images: [`https://vitalgames.com${multigame.mainImage.src}`],
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
  const dict = await getDictionary(lang)

  const multigame = multigames.find((m) => m.slug === gameId)

  if (!multigame) {
    notFound()
  }

  type MultigameSlug = keyof typeof dict.home.multigames.descriptions
  const translatedDescription =
    dict.home.multigames.descriptions[multigame.slug as MultigameSlug] || multigame.description

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Product", "Game"],
    "@id": `https://vitalgames.com/${lang}/awp-multigames/${gameId}`,
    name: multigame.title,
    description: translatedDescription,
    category: "AWP Multigame System",
    brand: {
      "@type": "Brand",
      name: "Vitalgames",
      url: "https://vitalgames.com",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Vitalgames",
      url: "https://vitalgames.com",
      logo: "https://vitalgames.com/logo.png",
    },
    image: [
      {
        "@type": "ImageObject",
        url: `https://vitalgames.com${multigame.mainImage.src}`,
        width: 1200,
        height: 630,
        caption: `${multigame.title} - Sistema multigame AWP`,
      },
      ...multigame.games.slice(0, 5).map((game) => ({
        "@type": "ImageObject",
        url: `https://vitalgames.com${game.mainImage.src}`,
        width: 800,
        height: 600,
        caption: `${game.name} - Gioco incluso in ${multigame.title}`,
      })),
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: "Vitalgames",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Marco Rossi",
        },
        reviewBody: `Ottimo sistema multigame ${multigame.title}. Perfetto per il nostro bar, i clienti lo adorano!`,
      },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Numero Giochi Inclusi",
        value: multigame.games.length,
      },
      {
        "@type": "PropertyValue",
        name: "Tipo Sistema",
        value: "AWP Multigame",
      },
      {
        "@type": "PropertyValue",
        name: "Settore",
        value: "Bar e Sale Giochi",
      },
      {
        "@type": "PropertyValue",
        name: "Certificazione",
        value: "ADM Italiana",
      },
    ],
    gameItem: multigame.games.map((game) => ({
      "@type": "Game",
      name: game.name,
      description: game.subtitle,
      gamePlatform: "AWP",
      genre: "Slot Machine",
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://vitalgames.com/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AWP Multigames",
          item: `https://vitalgames.com/${lang}/awp-multigames`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: multigame.title,
          item: `https://vitalgames.com/${lang}/awp-multigames/${gameId}`,
        },
      ],
    },
    mainEntity: {
      "@type": "WebPage",
      "@id": `https://vitalgames.com/${lang}/awp-multigames/${gameId}`,
      name: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
      description: translatedDescription,
      url: `https://vitalgames.com/${lang}/awp-multigames/${gameId}`,
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: "main",
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div>
        <header>
          <GameSection
            imageUrl={multigame.mainImage}
            videoUrl={multigame.video}
            title={multigame.title}
            description={translatedDescription}
          />
        </header>

        <main>
          {/* GAMES CARDS SECTION */}
          <section className="py-8 md:py-12 bg-black" aria-labelledby="games-heading">
            <div className="px-4 md:px-8 lg:px-16 xl:px-24">
              <h1 id="games-heading" className="sr-only">
                Giochi inclusi in {multigame.title}
              </h1>

              {multigame.games.map((game, index) => (
                <article
                  key={index}
                  className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} last:mb-0 rounded-2xl items-center mb-8`}
                >
                  <div className="h-full md:w-2/5 lg:w-1/3 relative">
                    <Image
                      src={game.mainImage || "/placeholder.svg"}
                      alt={`${game.name} - Slot machine inclusa nel sistema ${multigame.title}`}
                      className="h-full w-full object-cover rounded-lg"
                      width={800}
                      height={600}
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center md:text-left p-3 md:p-6 md:w-3/5 lg:w-2/3">
                    <div className="rounded-xl bg-black/50 p-3 md:p-4 max-w-2xl mx-8">
                      <h2 className="text-6xl md:text-7xl font-bold text-white mb-3 md:mb-4 dharma">{game.name}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3 md:mb-4 max-w-xl mx-auto md:mx-0 text-[#989898]">
                        {game.subtitle}
                      </p>
                      <Link href={`/${lang}/allgames/${game.slug}`} className="inline-block">
                        <Button
                          variant="default"
                          className="bg-black text-white border border-white rounded-full hover:opacity-80"
                          aria-label={`Gioca ora a ${game.name}`}
                        >
                          {dict.common.buttons.playNow}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RECOMMENDED GAMES */}
          <section className="pt-16 bg-black" aria-labelledby="recommended-games-heading">
            <div className="px-4 md:px-8 lg:px-16 xl:px-24">
              <h2
                id="recommended-games-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center dharma"
              >
                Altri Multigames Consigliati
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                {multigamesCards
                  .filter((m) => m.slug !== multigame.slug)
                  .slice(0, 3)
                  .map((game, index) => (
                    <article key={index} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                      <Link
                        href={`/${lang}/awp-multigames/${game.slug}`}
                        aria-label={`Scopri ${game.title} - Sistema multigame AWP`}
                      >
                        <div className="rounded-lg overflow-hidden">
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={`${game.title} - Sistema multigame AWP alternativo`}
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
      </div>
    </>
  )
}
