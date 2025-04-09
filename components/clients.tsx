import Image from "next/image"

import rothschild from '../public/rothshild.svg'
import melia from '../public/melia.svg'
import allianz from '../public/allianz.svg'
import expo from '../public/expo.svg'
import olympics from '../public/olympics.svg'
import castrol from '../public/castrol.svg'

export default function Clients({ dictionary }: { dictionary: any }) {
  const clients = [
    { name: "Rothschild & Co", logo: rothschild },
    { name: "Melià", logo: melia },
    { name: "Allianz", logo: allianz },
    { name: "Expo 2015", logo: expo },
    { name: "Castrol", logo: castrol },
    { name: "Paris 2024", logo: olympics },
  ]

  return (
    <section className="pb-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm mb-8">{dictionary.title}</h3>
        <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client) => (
            <div key={client.name} className="w-32 h-40 flex flex-col items-center justify-center">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={120}
                height={60}
                className="w-full h-auto object-contain max-w-28 max-h-18 md:max-w-36"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

