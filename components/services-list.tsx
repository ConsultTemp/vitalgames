"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

type Service = {
  name: string
  description: string
  keywords: string[]
}

export default function ServicesList({ services, dictionary }: { services: Service[]; dictionary: any }) {
  const { lang } = useLanguage()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl mb-12 text-center">
          {dictionary.title} <span className="text-red-700">{dictionary.titleHighlight}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <article key={index} className="flex flex-col">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=${service.name}`}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>
              <h2 className="text-2xl mb-3">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.keywords.slice(0, 3).map((keyword, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 text-sm text-gray-700">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={`/${lang}/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="mt-auto bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors self-start"
              >
                {dictionary.learnMore}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

