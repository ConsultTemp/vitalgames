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
import { games } from "@/lib/allgames"
import { multigames } from "@/lib/multigames"

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
          category: `AWP Multigame ${game.slug}`,
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
            url: `https://vitalgames.com${game.coverImage}`,
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
            },
            {
              "@type": "PropertyValue",
              name: "Categoria",
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

      <div className="w-screen bg-black">
        <header>
          <VideoHero
            title={dict.awpMultigames.page.title}
            subtitle={dict.awpMultigames.page.subtitle}
            videoUrl="c3a44e7596a884d647b47061eb149065"
            mobileVideoUrl="de888b721a6b9a120f87d728e16d0168"
          />
        </header>

        <main>
          {/* MULTIGAMES CARDS SECTION */}
          <section
            className="relative bg-black pt-8 flex flex-col items-center overflow-visible"
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

            <div className="container mx-auto px-3 relative z-10 pb-12 md:pb-36 overflow-visible">
              <div
                className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible"
                aria-hidden="true"
              >
                <div className="absolute bottom-0 w-40 md:w-96 h-40 md:h-96 right-[-50px] md:right-0 animate-float-slow rotate-10 overflow-visible">
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

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
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
                            src={game.mainImage || "/placeholder.svg"}
                            alt={`${game.title} - Sistema multigame AWP con 5 giochi`}
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
            

            {/* Content */}
            <div className="relative z-10">
              <div className="container mx-auto px-3">
                <div className="mb-8 w-full flex flex-col items-start">
                  <SmoothReveal>
                    <h2
                      id="recommended-heading"
                      className="text-start dharmalight text-3xl md:text-5xl font-bold text-white whitespace-normal md:whitespace-nowrap"
                    >
                      {dict.awpMultigames.page.section.title}
                    </h2>
                  </SmoothReveal>
                </div>

                <div>
                  <div
                    className="absolute left-0 right-0 top-[0%] h-[50vh] bg-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-3 md:gap-4">
                    {games.slice(0, 5).map((game) => (
                      <SmoothReveal key={game.id}>
                        <Link
                          href={`/${lang}/allgames/${game.slug}`}
                          className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative"
                          aria-label={`Vai a ${game.title}`}
                        >
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={`${game.title}`}
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
