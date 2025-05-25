import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Image from "next/image"
import Link from "next/link"
import SmoothReveal from "@/components/smooth-reveal"
import VideoHero from "@/components/VideoHero"
import FloatingImage from "@/components/bg-image-component"
import sevens from "../../../public/seven.png"
import bar from "../../../public/bar.png"

// Import multigame images
import casinoroyale from "@/public/multigames-cards/CASINO ROYALE_Converted.jpg"
import diamante from "@/public/multigames-cards/DIAMANTE_Converted.jpg"
import goldenclub from "@/public/multigames-cards/GOLDEN CLUB ORO_Converted.jpg"
import piggygold from "@/public/multigames-cards/PIGGY GOLD MULTIGAME_Converted.jpg"
import rubino from "@/public/multigames-cards/RUBINO_Converted.jpg"
import zaffiro from "@/public/multigames-cards/ZAFFIRO_Converted.jpg"
import circus from "@/public/multigames-cards/CIRCUS_Converted.jpg"
import champions from "@/public/multigames-cards/CHAMPIONS.png"
import luckyslot from "@/public/multigames-cards/lucky_slot.png"
import fortuneultralink from "@/public/multigames/Multigames/Fortune Ultralink/fortune_ultralink.jpg"
import manhattan from "@/public/multigames/Multigames/Manhattan/MANHATTAN.jpg"

const multigames = [
  {
    id: 14,
    slug: "manhattan",
    title: "Manhattan",
    image: manhattan,
    description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
    category: "Sport",
    gameCount: 8,
    features: ["Tema calcio", "8 giochi", "Sistema sportivo", "Grafica HD"],
  },
  {
    id: 10,
    slug: "champions",
    title: "Champions",
    image: champions,
    description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
    category: "Sport",
    gameCount: 8,
    features: ["Tema calcio", "8 giochi", "Sistema sportivo", "Jackpot progressivo"],
  },
  {
    id: 13,
    slug: "fortune-ultralink",
    title: "Fortune Ultralink",
    image: fortuneultralink,
    description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
    category: "Casino",
    gameCount: 10,
    features: ["Tema casinò", "10 giochi", "Jackpot progressivo", "Interfaccia elegante"],
  },
  {
    id: 2,
    slug: "diamante",
    title: "Diamante Multigame",
    image: diamante,
    description: "La nostra soluzione premium con 12 giochi esclusivi, grafica HD e funzionalità bonus avanzate.",
    category: "Premium",
    gameCount: 12,
    features: ["12 giochi esclusivi", "Grafica HD", "Bonus avanzati", "Soluzione premium"],
  },
  {
    id: 4,
    slug: "piggy-gold",
    title: "Piggy Gold Multigame",
    image: piggygold,
    description: "Divertente sistema con 10 giochi a tema denaro e fortuna, perfetto per un pubblico giovane.",
    category: "Fortuna",
    gameCount: 10,
    features: ["Tema denaro", "10 giochi", "Pubblico giovane", "Grafica divertente"],
  },
  {
    id: 1,
    slug: "casino-royale",
    title: "Casino Royale",
    image: casinoroyale,
    description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
    category: "Casino",
    gameCount: 10,
    features: ["Tema casinò classico", "10 giochi", "Jackpot progressivo", "Interfaccia elegante"],
  },
  {
    id: 8,
    slug: "circus",
    title: "Circus",
    image: circus,
    description: "Sistema divertente con 10 giochi a tema circo, perfetto per un pubblico giovane e dinamico.",
    category: "Divertimento",
    gameCount: 10,
    features: ["Tema circo", "10 giochi", "Pubblico giovane", "Sistema dinamico"],
  },
  {
    id: 5,
    slug: "rubino",
    title: "Rubino",
    image: rubino,
    description: "Multigame con 6 giochi premium, grafica vibrante e funzionalità bonus esclusive.",
    category: "Premium",
    gameCount: 6,
    features: ["6 giochi premium", "Grafica vibrante", "Bonus esclusivi", "Alta qualità"],
  },
  {
    id: 6,
    slug: "zaffiro",
    title: "Zaffiro",
    image: zaffiro,
    description:
      "Sistema elegante con 8 giochi a tema gemme, effetti visivi spettacolari e alta percentuale di vincita.",
    category: "Gemme",
    gameCount: 8,
    features: ["Tema gemme", "8 giochi", "Effetti spettacolari", "Alta percentuale vincita"],
  },
  {
    id: 3,
    slug: "golden-club",
    title: "Golden Club",
    image: goldenclub,
    description: "Esperienza VIP con 8 giochi selezionati, tema lussuoso e meccaniche di gioco innovative.",
    category: "VIP",
    gameCount: 8,
    features: ["Esperienza VIP", "8 giochi selezionati", "Tema lussuoso", "Meccaniche innovative"],
  },
  {
    id: 12,
    slug: "lucky-slot",
    title: "Lucky Slot",
    image: luckyslot,
    description: "Sistema con 8 giochi a tema fortuna, grafica accattivante e funzionalità bonus esclusive.",
    category: "Fortuna",
    gameCount: 8,
    features: ["Tema fortuna", "8 giochi", "Grafica accattivante", "Bonus esclusivi"],
  },
]

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
      canonical: `https://vitalgames.com/${lang}/awp-multigames`,
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
  const dict = await getDictionary(lang)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.awpMultigames.page.title,
    description: dict.awpMultigames.page.subtitle,
    url: `https://vitalgames.com/${lang}/awp-multigames`,
    mainEntity: {
      "@type": "ItemList",
      name: "AWP Multigames Collection",
      description: "Collezione completa di sistemi multigame AWP per bar e sale giochi",
      numberOfItems: multigames.length,
      itemListElement: multigames.map((game, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `https://vitalgames.com/${lang}/awp-multigames/${game.slug}`,
          name: game.title,
          description: game.description,
          category: `AWP Multigame ${game.category}`,
          brand: {
            "@type": "Brand",
            name: "Vitalgames",
            url: "https://vitalgames.com",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Vitalgames",
            url: "https://vitalgames.com",
          },
          image: {
            "@type": "ImageObject",
            url: `https://vitalgames.com${game.image.src}`,
            width: 1080,
            height: 1196,
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            seller: {
              "@type": "Organization",
              name: "Vitalgames",
            },
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Numero Giochi",
              value: game.gameCount,
            },
            {
              "@type": "PropertyValue",
              name: "Categoria",
              value: game.category,
            },
            {
              "@type": "PropertyValue",
              name: "Tipo",
              value: "AWP Multigame",
            },
          ],
        },
      })),
    },
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
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Vitalgames",
      url: "https://vitalgames.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vitalgames.com/logo.png",
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="w-screen">
        <header>
          <VideoHero
            title={dict.awpMultigames.page.title}
            subtitle={dict.awpMultigames.page.subtitle}
            videoUrl="https://files.catbox.moe/bpgqmj.mp4"
          />
        </header>

        <main>
          {/* MULTIGAMES CARDS SECTION */}
          <section
            className="relative bg-black pt-16 flex flex-col items-center overflow-visible"
            aria-labelledby="multigames-heading"
          >
            {/* Side gradients */}
            <div
              className="absolute top-[60%] -translate-y-1/2 left-0 w-[500px] h-[1200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at left center, rgba(255, 196, 0, 0.35) 0%, rgba(255, 196, 0, 0.2) 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-[40%] -translate-y-1/2 right-0 w-[500px] h-[1200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at right center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36 overflow-visible">
              <div
                className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible"
                aria-hidden="true"
              >
                {/* Floating decorative elements */}
                <div className="absolute top-[-100px] w-96 md:w-96 h-96 md:h-96 left-[-150px] animate-float-slow rotate-10">
                  <FloatingImage
                    src={bar || "/placeholder.svg"}
                    alt=""
                    className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]"
                  />
                </div>
                <div className="absolute bottom-0 w-40 md:w-96 h-40 md:h-96 right-[-50px] md:right-0 animate-float-slow rotate-10">
                  <FloatingImage
                    src={sevens || "/placeholder.svg"}
                    alt=""
                    className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]"
                  />
                </div>
              </div>

              <h1 id="multigames-heading" className="sr-only">
                Collezione AWP Multigames Vitalgames
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                {multigames.map((game) => (
                  <article key={game.id} className="transition-all duration-300">
                    <SmoothReveal>
                      <Link
                        href={`/${lang}/awp-multigames/${game.slug}`}
                        className="w-full block group rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
                        aria-label={`Scopri ${game.title} - ${game.description}`}
                      >
                        <div className="w-full h-full relative">
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={`${game.title} - Sistema multigame AWP con ${game.gameCount} giochi`}
                            className="object-cover w-full h-full"
                            width={1080}
                            height={1196}
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </SmoothReveal>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* RECOMMENDED GAMES SECTION */}
          <section className="relative overflow-visible" aria-labelledby="recommended-heading">
            {/* Background with gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-transparent"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="container mx-auto px-4">
                <div className="mb-8 w-full flex flex-col items-start">
                  <SmoothReveal>
                    <h2
                      id="recommended-heading"
                      className="text-start dharma text-3xl md:text-5xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap"
                    >
                      {dict.awpMultigames.page.section.title}
                    </h2>
                  </SmoothReveal>
                </div>

                <div>
                  <div
                    className="absolute left-0 right-0 top-[0%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {multigames.slice(0, 5).map((game) => (
                      <SmoothReveal key={game.id}>
                        <Link
                          href={`/${lang}/awp-multigames/${game.slug}`}
                          className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative"
                          aria-label={`Vai a ${game.title}`}
                        >
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={`${game.title} - ${game.description}`}
                            className="object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-105"
                            width={1080}
                            height={1196}
                            loading="lazy"
                          />
                        </Link>
                      </SmoothReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
