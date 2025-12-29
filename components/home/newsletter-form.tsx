"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"

export default function NewsletterForm() {
  const { dictionary: dict } = useLanguage()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementare invio newsletter
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="relative w-full bg-black py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mb-12 md:mb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Mobile: titolo sopra, resto sotto */}
        <div className="lg:hidden flex flex-col space-y-6">
          <h2 className="text-white text-5xl md:text-6xl font-bold dharma uppercase text-center">
            {((dict.home as any).newsletter as any)?.title || "JOIN THE MOVEMENT!!"}
          </h2>
          <div className="flex flex-col space-y-4">
            <p className="text-white text-xs md:text-sm text-center">
              {((dict.home as any).newsletter as any)?.description || ""}
            </p>
            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={((dict.home as any).newsletter as any)?.emailPlaceholder || "Email"}
                className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-vitalYellow transition-colors duration-300"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Desktop: titolo sinistra, resto destra */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold dharma uppercase">
              {((dict.home as any).newsletter as any)?.title || "JOIN THE MOVEMENT!!"}
            </h2>
          </div>
          <div className="flex flex-col space-y-6">
            <p className="text-white text-sm md:text-base">
              {((dict.home as any).newsletter as any)?.description || ""}
            </p>
            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={((dict.home as any).newsletter as any)?.emailPlaceholder || "Email"}
                className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-vitalYellow"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-vitalYellow transition-colors duration-300"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

