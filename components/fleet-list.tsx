import Image from "next/image"
import { Users, Briefcase } from "lucide-react"
import type { Locale } from "@/i18n-config"

type Vehicle = {
  name: string
  description: string
  image: string
  passengers: string
  luggage: string
}

export default function FleetList({ vehicles, lang }: { vehicles: Vehicle[]; lang: Locale }) {
  const titles = {
    it: {
      title: "La Nostra Flotta",
      subtitle: "Scopri la nostra selezione di auto di lusso",
      passengers: "Passeggeri",
      luggage: "Bagagli",
    },
    en: {
      title: "Our Fleet",
      subtitle: "Discover our selection of luxury vehicles",
      passengers: "Passengers",
      luggage: "Luggage",
    },
    ar: {
      title: "أسطولنا",
      subtitle: "اكتشف مجموعتنا من السيارات الفاخرة",
      passengers: "الركاب",
      luggage: "الأمتعة",
    },
  }

  const text = titles[lang]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl mb-4 text-center">{text.title}</h1>
        <p className="text-center text-gray-600 mb-12">{text.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {vehicles.map((vehicle, index) => (
            <article key={index} className="flex flex-col hover-lift transition-all duration-500">
              <div className="relative h-64 mb-6 overflow-hidden image-zoom">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>
              <h2 className="text-2xl mb-3">{vehicle.name}</h2>
              <p className="text-gray-600 mb-6">{vehicle.description}</p>

              <div className="mt-auto flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={18} className="mr-2" />
                  <span className="text-sm">
                    {text.passengers}: {vehicle.passengers}
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase size={18} className="mr-2" />
                  <span className="text-sm">
                    {text.luggage}: {vehicle.luggage}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

