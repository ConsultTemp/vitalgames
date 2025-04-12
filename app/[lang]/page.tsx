import type { Metadata } from "next"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Clients from "@/components/clients"
import Experiences from "@/components/experiences"
import BookingForm from "@/components/booking-form"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { serviceTypes, generateSEOMetadata } from "@/lib/seo-config"
import Script from "next/script"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props:{ params: Params }): Promise<Metadata> {
  //const dictionary = await getDictionary(params.lang)
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
      url: `https://pattycar.com/${params.lang}`,
      siteName: "Patty Car",
      locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
      type: "website",
      images: [
        {
          url: "/fleethero.jpg",
          width: 1200,
          height: 630,
          alt: "Patty Car - Luxury Car Service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: ["/images/twitter-home.jpg"],
      creator: "@PattyCarMilano",
      site: "@PattyCarMilano",
    },
  }
}

export default async function Home(props:{ params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)
  const services = serviceTypes[params.lang as keyof typeof serviceTypes]

  return (
    <>
      <Script
        id="home-services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            /* itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.name,
                description: service.description,
                provider: {
                  "@type": "LocalBusiness",
                  name: "Patty Car",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Milano",
                    addressRegion: "MI",
                    addressCountry: "IT",
                  },
                },
                url: `https://pattycar.com/${params.lang}/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`,
              },
            })), */
          }),
        }}
      />
      <Hero dictionary={dictionary.hero} />
      <Services dictionary={dictionary.services} />
      <About dictionary={dictionary.about} />
      {/* <Clients dictionary={dictionary.clients} /> */}
      <Experiences dictionary={dictionary.experiences} />
      <BookingForm dictionary={dictionary.booking} />
    </>
  )
}

