import type { Metadata } from "next"
import Hero from "@/components/hero"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { productTypes, generateSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
import GameCards from "@/components/home/game-cards"
import CabinetSection from "@/components/home/cabinet-section"
import MagicDiamonds from "@/components/home/magicdiamond"
import AgeRestrictions from "@/components/home/age-restrictions"
import Technology from "@/components/home/technology"
import Multigames from "@/components/home/multigames"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const seoData = generateSEOMetadata("home", params.lang)

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        "en-US": "/en",
        "it-IT": "/it",
        "ar-SA": "/ar",
      },
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `https://vitalgames.com/${params.lang}`,
      siteName: "Vitalgames",
      locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
      type: "website",
      images: [
        {
          url: "/fleethero.jpg",
          width: 1200,
          height: 630,
          alt: "Vitalgames - Produttore di Slot Machine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: ["/images/twitter-home.jpg"],
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
      <Script
        id="home-products-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                brand: {
                  "@type": "Brand",
                  name: "Vitalgames",
                },
                manufacturer: {
                  "@type": "Organization",
                  name: "Vitalgames",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Milano",
                    addressRegion: "MI",
                    addressCountry: "IT",
                  },
                },
                category: "Gaming Machines",
                url: `https://vitalgames.com/${params.lang}/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`,
              },
            })),
          }),
        }}
      />
      <Hero />
      <Multigames />
      <div className="cabinet-bg">
        <CabinetSection />
      </div>
      <MagicDiamonds />
      <GameCards />
      <AgeRestrictions />
      <Technology />
    </>
  )
}
