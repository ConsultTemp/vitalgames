import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import type { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo-config"
import BookingForm from "@/components/booking-form"
import fleetHero from '../../../public/fleethero.jpg'
import fleetHighlight from '../../../public/fleetpar.png'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Import fleet images
import mercedesEClass from "../../../public/classee.png"
import mercedesSClass from "../../../public/classes.png"
import mercedesVClass from "../../../public/classev.png"
import mercedesSprinter from "../../../public/sprinter.png"
import teslaModelS from "../../../public/models.png"
import fiatDucato from "../../../public/ducato.png"

// Map vehicle names to their images
const vehicleImages: Record<string, any> = {
  "Mercedes Benz E-Class": mercedesEClass,
  "Mercedes Benz S-Class": mercedesSClass,
  "Mercedes Benz V-Class": mercedesVClass,
  "Mercedes Benz Sprinter": mercedesSprinter,
  "Tesla Model S": teslaModelS,
  "Fiat Ducato": fiatDucato,
}

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata | null> {
  let params = await props.params
  if (!params || !params.lang) {
    params = { lang: 'it' }
  }
  const dictionary = await getDictionary(params.lang)
  const seoData = generateSEOMetadata("services", params.lang)

  return {
    title: `${dictionary.fleet.title} | Patty Car`,
    description: dictionary.fleet.description,
    keywords: [...seoData.keywords],
    alternates: {
      canonical: `/${params.lang}/fleet`,
      languages: {
        "en-US": "/en/fleet",
        "it-IT": "/it/fleet",
        "ar-SA": "/ar/fleet",
      },
    },
    openGraph: {
      title: `${dictionary.fleet.title} | Patty Car`,
      description: dictionary.fleet.description,
      url: `https://pattycar.com/${params.lang}/fleet`,
      siteName: "Patty Car",
      locale: params.lang === "it" ? "it_IT" : params.lang === "en" ? "en_US" : "ar_SA",
      type: "website",
      images: [
        {
          url: "/fleethero.jpg",
          width: 1200,
          height: 630,
          alt: `${dictionary.fleet.title} - Patty Car`,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' }, 
        { url: '/logopatty.png' }
      ],
      apple: { url: '/favicon.ico' },
      shortcut: { url: '/favicon.ico' }
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.fleet.title} | Patty Car`,
      description: dictionary.fleet.description,
      images: ["/images/fleet/hero.jpg"],
    },
  }
}

export default async function FleetPage(props: { params: Params }) {
  let params = await props.params
  if (!params || !params.lang) {
    params = { lang: 'it' }
  }
  const dictionary = await getDictionary(params.lang)
  const fleet = dictionary.fleet
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src={fleetHero || "/placeholder.svg"}
            alt={fleet.title}
            fill
            priority
            className="object-cover brightness-75"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-black/30 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white pt-24">

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-light my-6 atacama">{fleet.title}</h1>
            <p className="text-sm md:text-sm font-light">{fleet.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-darkGray">{fleet.description}</p>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-10 mx-12 text-left atacama">
            <span className="mr-2">{fleet.fleetTitle}</span>
            <span className="text-red-700 atacama-italic">{fleet.fleetTitleHighlight}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
            {fleet.vehicles.map((vehicle: any, index: number) => (
              <div key={index} className="flex flex-col p-12">
                <div className="relative w-full h-48 mb-4 flex items-center justify-center">
                  <Image
                    src={vehicleImages[vehicle.name] || "/placeholder.svg"}
                    alt={vehicle.name}
                    fill
                    className="object-contain max-h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl text-center font-light border-b border-b-1 vorder-b-darkGray pb-4">{vehicle.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Section with Image */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <p className="text-lg atacama text-darkGray leading-relaxed mb-6">{fleet.highlight.text}</p>
            </div>
            <div className="w-full md:w-1/2 relative h-96">
              <Image
                src={fleetHighlight || "/placeholder.svg"}
                alt={fleet.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <BookingForm dictionary={dictionary.booking} />
    </>
  )
}
