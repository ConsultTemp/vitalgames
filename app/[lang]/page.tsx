import type { Metadata } from "next"
import Hero from "@/components/hero"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { productTypes, generateAdvancedSEOMetadata } from "@/lib/seo-config"
import GameCards from "@/components/home/game-cards"
import CabinetSection from "@/components/home/cabinet-section"
import AgeRestrictions from "@/components/home/age-restrictions"
import Multigames from "@/components/home/multigames"
import ManhattanLanding from "@/components/home/manhatta"
import { GameCarousel } from "@/components/home/game-carousel"
import WinningTechnology from "@/components/home/winning-technology"
import Partners from "@/components/home/partners"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  // Usa la funzione SEO avanzata
  const advancedSEO = generateAdvancedSEOMetadata("home", params.lang, {
    image: "/fleethero.jpg",
  })

  return {
    ...advancedSEO,
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        "en-US": "/en",
        "it-IT": "/it",
        "ar-SA": "/ar",
      },
    },
    openGraph: {
      ...advancedSEO.openGraph,
      url: `https://www.vitalgamesdigital.com/${params.lang}`,
      locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
      images: [
        {
          url: "/fleethero.jpg",
          width: 1200,
          height: 630,
          alt: "Vitalgames - Produttore di Slot Machine dal 1996",
        },
        {
          url: "/images/slot-machines-showcase.jpg",
          width: 1200,
          height: 630,
          alt: "Collezione Slot Machine Vitalgames",
        },
        {
          url: "/images/vlt-collection.jpg",
          width: 1200,
          height: 630,
          alt: "Sistemi VLT Vitalgames",
        },
      ],
    },
    twitter: {
      ...advancedSEO.twitter,
      images: ["/fleethero.jpg"],
      creator: "@VitalgamesOfficial",
      site: "@VitalgamesOfficial",
    },
  }
}

export default async function Home(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)
  const products = productTypes[params.lang as keyof typeof productTypes]

  return (
    <>
      {/* JSON-LD Scripts moved to client component for better hydration */}
      {/* <HomeJsonLdScripts lang={params.lang} products={products} /> */}

      <div className="bg-black">
        <Hero />
        <ManhattanLanding />
        <Multigames />
        <div className="cabinet-bg">
          <CabinetSection />
        </div>
        <GameCarousel />
        <GameCards />
        <div className="technology-bg">
          <WinningTechnology />
        </div>
        <Partners />
        <AgeRestrictions />
      </div>
    </>
  )
}
