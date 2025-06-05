import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { multigames } from "@/lib/multigames"
import { multigames as multigamesCards } from "@/lib/multigames"
import { notFound } from "next/navigation"
import GameSection from "./awp-hero"
import FloatingImage from "@/components/bg-image-component"
import sevens from "../../../../public/seven.png"
import bar from "../../../../public/bar.png"
import cherry from "../../../../public/cherry.png"
import campana from "../../../../public/campana.png"
import star1 from "../../../../public/star1.png"
import diamante1 from "../../../../public/diamond.png"
import squalo from "../../../../public/squalo.png"
import coin2 from "../../../../public/coin2.png"

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

  // FIXED: Safe access to descriptions
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
  const dict = await getDictionary(lang)

  const multigame = multigames.find((m) => m.slug === gameId)

  if (!multigame) {
    notFound()
  }

  // FIXED: Safe access to descriptions
  const translatedDescription =
    dict.home?.multigames?.descriptions?.[multigame.slug as keyof typeof dict.home.multigames.descriptions] ||
    multigame.description

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Product", "Game"],
    "@id": `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
    name: multigame.title,
    description: translatedDescription,
    category: "AWP Multigame System",
    brand: {
      "@type": "Brand",
      name: "Vitalgames",
      url: "https://www.vitalgamesdigital.com",
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
      ...multigame.games.slice(0, 5).map((game) => ({
        "@type": "ImageObject",
        url: `https://www.vitalgamesdigital.com${game.mainImage.src}`,
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
          item: `https://www.vitalgamesdigital.com/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AWP Multigames",
          item: `https://www.vitalgamesdigital.com/${lang}/awp-multigames`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: multigame.title,
          item: `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
        },
      ],
    },
    mainEntity: {
      "@type": "WebPage",
      "@id": `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
      name: `${multigame.title} | Sistema Multigame AWP | Vitalgames`,
      description: translatedDescription,
      url: `https://www.vitalgamesdigital.com/${lang}/awp-multigames/${gameId}`,
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: "main",
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-black">
        <header className="h-fit">
          <GameSection
            imageUrl={multigame.mainImage}
            videoUrl={multigame.video && typeof multigame.video === 'string' && multigame.video.trim() !== '' ? multigame.video : undefined}
            title={multigame.title}
            description={translatedDescription}
          />
        </header>

        <main className="px-4 ">
          {/* GAMES CARDS SECTION */}
          <section className="py-8 md:py-12  relative" aria-labelledby="games-heading">
            {/* Floating Images Overlay */}
            <div className="absolute inset-0 overflow-visible z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-[30%] left-[-32px] w-32 md:w-48 h-32 md:h-48 animate-float-slow rotate-12 opacity-80">
                <FloatingImage src={cherry || "/placeholder.svg"} alt="" className="w-full h-full" />
              </div>
              {/* Destra */}
              <div className="absolute top-[12%] right-[-40px] w-40 md:w-64 h-40 md:h-64 animate-float-slow rotate-12">
                <FloatingImage src={campana || "/placeholder.svg"} alt="" className="w-full h-full" />
              </div>
              <div className="absolute top-[45%] right-[-48px] w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 animate-float-slow rotate-3 opacity-80">
                <FloatingImage src={diamante1 || "/placeholder.svg"} alt="" className="w-full h-full" />
              </div>
              <div className="absolute bottom-[20px] right-[-32px] w-40 md:w-56 lg:w-72 h-40 md:h-56 lg:h-72 animate-float-slow-reverse rotate-12 opacity-70">
                <FloatingImage src={squalo || "/placeholder.svg"} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16 xl:px-24 space-y-16 relative z-10">
              <h1 className="text-5xl dharmalight text-white mb-16">
                {dict.includedGamesIn} {multigame.title}
              </h1>

              {multigame.games.map((game, index) => {
                // Neon color palette
                const neonColors = [
                  "#39FF14", // verde neon
                  "#FF00FF", // fucsia neon
                  "#00FFFF", // blu elettrico (azzurro neon)
                  "#FFFF00", // giallo neon
                  "#FF073A"  // rosso neon
                ];
                const neon = neonColors[index % neonColors.length];
                return (
                  <article
                    key={index}
                    className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} last:mb-0 rounded-2xl items-center mb-8`}
                  >
                    <div className="h-full md:w-2/5 lg:w-[55%] relative flex items-center justify-center">
                      {/* Ombra esterna */}
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none
                          ${index % 2 === 1
                            ? "right-[-100px] md:right-[-140px]"
                            : "left-[-100px] md:left-[-140px]"}
                          `}
                        aria-hidden="true"
                        style={{
                          width: "590px",
                          height: "540px",
                          overflow: "visible",
                          borderRadius: "50px",
                          zIndex: 20,
                          display: "block",
                          background: index % 2 === 1
                            ? `radial-gradient(circle at 100% 50%, ${neon}4D 0%, ${neon}1F 25%, ${neon}00 45%, ${neon}00 100%)`
                            : `radial-gradient(circle at 0% 50%, ${neon}4D 0%, ${neon}1F 25%, ${neon}00 45%, ${neon}00 100%)`
                        }}
                      />
                      <Image
                        src={game.mainImage || "/placeholder.svg"}
                        alt={`${game.name} - Slot machine inclusa nel sistema ${multigame.title}`}
                        className="h-full w-full object-cover rounded-lg relative z-30"
                        width={400}
                        height={400}
                        loading="lazy"
                      />
                    </div>
                    <div className="text-left md:text-left p-3 px-0 md:p-6 w-full flex flex-col items-center">
                      <div className="w-[100%] md:w-[65%] rounded-xl  p-3 px-0 md:p-4 md:px-0 w-full gap-6 flex flex-col justify-center items-start relative z-30">
                        <h2 className="text-5xl md:text-7xl text-white dharma w-full text-left">{game.name}</h2>
                        <p className="text-gray-400 text-left w-full text-base md:mx-0 mb-2 text-[#989898]">
                          {dict.allGamesDescriptions?.[game.slug]}
                        </p>
                        <Link href={`/${lang}/allgames/${game.slug}`} className="flex flex-col items-start">
                          <Button
                            variant="default"
                            className="bg-transparent text-white border border-white px-6 py-6 rounded-full hover:opacity-80 text-base"
                            aria-label={`Gioca ora a ${game.name}`}
                          >
                            {dict.common.buttons.playNow}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* RECOMMENDED GAMES */}
          <section className="pt-16 bg-black" aria-labelledby="recommended-games-heading">
            <div className="px-4 md:px-8 lg:px-16 xl:px-24">
              <h2
                id="recommended-games-heading"
                className="text-3xl md:text-4xl text-white mb-4 dharma text-left"
              >
                {dict.allGames.recommended.otherMultigames}
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                {Array.isArray(multigame.recommended) && multigame.recommended
                  .slice(0, 3)
                  .map((game, index) => {
                    const multigame = multigamesCards.find((m) => m.slug === game)
                    return multigame?.id ? (
                      <article key={index} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                        <Link
                          href={`/${lang}/awp-multigames/${multigame.slug}`}
                          aria-label={`Scopri ${multigame.title} - Sistema multigame AWP`}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <Image
                              src={multigame.mainImage || "/placeholder.svg"}
                              alt={`${multigame.title} - Sistema multigame AWP alternativo`}
                              className="w-full h-auto"
                              loading="lazy"
                            />
                          </div>
                        </Link>
                      </article>
                    ) : null
                  })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}