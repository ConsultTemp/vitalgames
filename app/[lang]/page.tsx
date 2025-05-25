import type { Metadata } from "next"
import Hero from "@/components/hero"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { productTypes, generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"
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
    image: "/fleethero.jpg"
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
      url: `https://vitalgames.com/${params.lang}`,
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

  console.log(products)

  return (
    <>
      {/* Schema prodotti avanzato */}
      <Script
        id="home-products-schema-advanced"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Prodotti Vitalgames",
            description: "Collezione completa di slot machine, VLT e sistemi multigame",
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                "@id": `https://vitalgames.com/${params.lang}/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`,
                name: product.name,
                description: product.description,
                brand: {
                  "@type": "Brand",
                  name: "Vitalgames",
                  logo: "https://vitalgames.com/logovital.svg",
                },
                manufacturer: {
                  "@type": "Organization",
                  "@id": "https://vitalgames.com/#organization",
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
                image: `https://vitalgames.com/images/${product.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/InStock",
                  priceCurrency: "EUR",
                  seller: {
                    "@id": "https://vitalgames.com/#organization",
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
            })),
          }),
        }}
      />

      {/* Schema LocalBusiness per Milano */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://vitalgames.com/#localbusiness",
            name: "Vitalgames",
            image: "https://vitalgames.com/images/vitalgames-headquarters.jpg",
            url: "https://vitalgames.com",
            telephone: "+39-02-12345678",
            email: "info@vitalgames.com",
            priceRange: "€€€",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Via Milano 123",
              addressLocality: "Milano",
              addressRegion: "MI",
              postalCode: "20100",
              addressCountry: "IT",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 45.4642,
              longitude: 9.19,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
            sameAs: [
              "https://www.facebook.com/vitalgames",
              "https://www.instagram.com/vitalgames_official",
              "https://www.linkedin.com/company/vitalgames",
            ],
            areaServed: {
              "@type": "Country",
              name: "Italy",
            },
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 45.4642,
                longitude: 9.19,
              },
              geoRadius: "1000000",
            },
          }),
        }}
      />

      {/* Schema VideoObject per hero video */}
      <Script
        id="video-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Vitalgames - Innovazione nel Gaming dal 1996",
            description: "Scopri la collezione di slot machine, VLT e sistemi multigame Vitalgames",
            thumbnailUrl: "https://vitalgames.com/images/video-thumbnail.jpg",
            uploadDate: "2024-01-01",
            duration: "PT2M30S",
            contentUrl: "https://vitalgames.com/videos/hero-video.mp4",
            embedUrl: "https://vitalgames.com/embed/hero-video",
            publisher: {
              "@id": "https://vitalgames.com/#organization",
            },
          }),
        }}
      />

      {/* Schema Review per testimonial */}
      <Script
        id="reviews-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@id": "https://vitalgames.com/#organization",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Organization",
              name: "Gaming Industry Magazine",
            },
            reviewBody:
              "Vitalgames rappresenta l'eccellenza italiana nel settore delle slot machine e VLT. Qualità, innovazione e affidabilità dal 1996.",
          }),
        }}
      />

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
