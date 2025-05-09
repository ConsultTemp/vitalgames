import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { productTypes, generateSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import HeroAllgames from "@/components/allgames/hero"
import AllGamesList from "@/components/allgames/allgameslist"
import { games } from "@/lib/allgamesmap"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
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

export default function Home(props: { params: { lang: Locale } }) {
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
                url: `https://vitalgames.com/${props.params.lang}/allgames/${game.slug}`,
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
        <HeroAllgames />
        <AllGamesList />
      </div>
    </>
  )
}
