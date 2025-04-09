"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import img from '../public/placeholder.svg'
import tour from '../public/tour.png'
import lake from '../public/lake.png'
import lounge from '../public/lounge.png'
export default function Experiences({ dictionary }: { dictionary: any }) {
  const { lang } = useLanguage()

  const experiences = [
    {
      id: "maranello",
      title: dictionary.items[0].title,
      description: dictionary.items[0].description,
      image: tour,
      link: `/${lang}/experiences/maranello`,
    },
    {
      id: "como",
      title: dictionary.items[1].title,
      description: dictionary.items[1].description,
      image: lake,
      link: `/${lang}/experiences/como`,
    },
    {
      id: "vip-lounge",
      title: dictionary.items[2].title,
      description: dictionary.items[2].description,
      image: lounge,
      link: `/${lang}/experiences/vip-lounge`,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8">
        <h2 className="text-center text-2xl mb-2 atacama">
          <span className="text-red-700 atacama-italic">{dictionary.titleHighlight}</span> {dictionary.title}
        </h2>
        <p className="text-sm text-center text-darkGray mb-12">{dictionary.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex flex-col">
              <div className="relative h-64 mb-4 overflow-hidden">
                <Image
                  src={exp.image || "/placeholder.svg"}
                  alt={exp.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
              <p className="text-black font-light text-sm mb-4 flex-grow">{exp.description}</p>
              <Link href={exp.link} className="text-sm font-light text-darkGray hover:text-black">
                {dictionary.experienceBy} Patty Car
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

