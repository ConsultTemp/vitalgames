"use client"

import { useState } from "react"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { useLanguage } from "@/components/language-provider"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import transfer from '../public/transfer.png'
import events from '../public/events1.png'
import diplomatic from '../public/diplomatic.png'
import hotel from '../public/hotel.png'
import company from '../public/company.png'

type Service = {
  id: string
  title: string
  description: string
  image: string | StaticImageData
  link: string
}

export default function Services({ dictionary }: { dictionary: any }) {
  const { lang } = useLanguage()
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  

  const services: Service[] = [
    {
      id: "transfer-ncc",
      title: dictionary.items[0].title,
      description: dictionary.items[0].description,
      image: transfer,
      link: `/${lang}/services/transfer-ncc`,
    },
    {
      id: "events",
      title: dictionary.items[1].title,
      description: dictionary.items[1].description,
      image: events,
      link: `/${lang}/services/events`,
    },
    {
      id: "diplomatic",
      title: dictionary.items[2].title,
      description: dictionary.items[2].description,
      image: diplomatic,
      link: `/${lang}/services/diplomatic`,
    },
    {
      id: "luxury-hotels",
      title: dictionary.items[3].title,
      description: dictionary.items[3].description,
      image: hotel,
      link: `/${lang}/services/luxury-hotels`,
    },
    {
      id: "business",
      title: dictionary.items[4].title,
      description: dictionary.items[4].description,
      image: company,
      link: `/${lang}/services/business`,
    },
  ]

  return (
    <section className="pt-20 border-0">
      <div className="container mx-auto px-8 ">
        <h2 className="text-3xl mb-12 text-center atacama">
          {dictionary.title} <span className="text-red-700 atacama-italic">{dictionary.titleHighlight}</span>
        </h2>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-0">
              {services.map((service) => (
                <CarouselItem key={service.id} className="pl-0 md:basis-1/2 lg:basis-1/3">
                  <div
                    className="h-80 relative overflow-hidden"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredService === service.id ? "scale-110" : "scale-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay base with semi-transparent background for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* Dark overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-black/60 transition-opacity duration-700 ${
                        hoveredService === service.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    {/* Centered container with title, description and button */}
                    <div className="absolute inset-0 flex items-center justify-center p-5">
                      <div className="text-center px-6 w-full z-10">
                        <h3 className="text-white text-left text-2xl mb-0 atacama">{service.title}</h3>

                        {/* Description and button that appear only on hover */}
                        <div
                          className={`mt-4 transition-all duration-700 ${hoveredService === service.id ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"} text-left`}
                        >
                          <p className="text-white mb-6 text-xs w-3/4">{service.description}</p>
                          <Link
                            href={service.link}
                            className="bg-transparent border border-1 border-white text-white px-6 py-2 inline-block hover:bg-white hover:text-black transition-colors duration-200"
                          >
                            {dictionary.learnMore}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="h-36 bg-gradient-to-b from-white to-black border-0"></div>
    </section>
  )
}
