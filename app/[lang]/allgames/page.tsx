'use client'
import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { productTypes, generateSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import Image from "next/image"
import VideoHero from "@/components/VideoHero"
import AllGamesList from "@/components/allgames/allgameslist"
import { games } from "@/lib/allgamesmap"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import casinoroyaleHover from "../../../public/multigames-cards/CASINO ROYALE_Converted.jpg"
import diamanteHover from "../../../public/multigames-cards/DIAMANTE_Converted.jpg"
import luckySlot from "../../../public/multigames-cards/lucky_slot.png"
import fortuneUltralink from "../../../public/fortune_ultralink.png"
import { use } from 'react'
import FloatingImage from "@/components/bg-image-component"
import campana from '../../../public/campana.png'

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

type PageParams = {
  lang: Locale
}

async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const seoData = generateSEOMetadata("allGames", params.lang)

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: `/${params.lang}/allgames`,
      languages: {
        "en-US": "/en/allgames",
        "it-IT": "/it/allgames",
        "ar-SA": "/ar/allgames",
      },
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `https://vitalgames.com/${params.lang}/allgames`,
      siteName: "Vitalgames",
      locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
      type: "website",
      images: [
        {
          url: "/allgames-hero.jpg",
          width: 1200,
          height: 630,
          alt: "Vitalgames - Tutti i Giochi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: ["/images/twitter-allgames.jpg"],
      creator: "@VitalgamesOfficial",
      site: "@VitalgamesOfficial",
    },
  }
}

export default function Home(props: { params: Promise<PageParams> }) {
  const { dictionary: dict } = useLanguage()
  const params = use(props.params)
  
  return (
    <>
      <Script
        id="allgames-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: games.map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Game",
                name: game.name,
                description: game.description,
                gameItem: {
                  "@type": "Thing",
                  name: "Slot Machine",
                },
                gamePlatform: ["AWP", "VLT", "Online"],
                genre: "Slot Machine",
                image: game.coverImage.src || game.mainImage.src,
                url: `https://vitalgames.com/${params.lang}/allgames/${game.slug}`,
                provider: {
                  "@type": "Organization",
                  name: "Vitalgames",
                  url: "https://vitalgames.com",
                },
              },
            })),
          }),
        }}
      />
      <div className="bg-black">
        <VideoHero 
          title={dict.allGames.hero.title}
          subtitle={dict.allGames.hero.subtitle}
          videoUrl="https://files.catbox.moe/gdaic4.mp4"
        />
        
        <AllGamesList />
         {/* RECOMMENDED GAMES */}
         <section className="relative min-h-[50vh]">
         
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#007bff]/50 to-transparent pointer-events-none" />
                <div className="px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center dharma">Recommended Games</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        {multigames
                            .slice(0, 3)
                            .map((game, index) => (
                            <div key={index} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                                <Link href={`/awp-multigames/${game.slug}`}>
                                    <div className="rounded-lg overflow-hidden">
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-auto"
                                            width={400}
                                            height={300}
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
      </div>
    </>
  )
}
