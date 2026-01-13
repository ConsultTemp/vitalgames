"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"
import Image from "next/image"

type SubmitStatus = "idle" | "success" | "error"

export default function NewsletterForm() {
  const { dictionary: dict } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const submitData = new FormData()
      submitData.append("email", email)
      submitData.append("_subject", "Nuova iscrizione newsletter")
      submitData.append("_captcha", "false")
      submitData.append("_template", "box")
      
      // Messaggio semplice con solo l'email
      const message = `Nuova iscrizione alla newsletter:\n\nEmail: ${email}`
      submitData.append("message", message)

      const response = await fetch("https://formsubmit.co/mattiavitalgames@gmail.com", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        setEmail("")
        // Reset del messaggio di successo dopo 5 secondi
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      } else {
        throw new Error("Errore nell'invio")
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Errore invio newsletter:", error)
      // Reset del messaggio di errore dopo 5 secondi
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full py-12 mb-12 md:mb-16">
      {/* Card con immagine di sfondo */}
      <div className="container mx-auto px-6">
        <div className="relative w-full rounded-2xl pt-8 pb-56 px-8 md:px-16 overflow-hidden border border-[#505050] hover:border-vitalYellow transition-all duration-300 group">
          {/* Immagine di sfondo */}
          <div className="absolute inset-0">
            {/* Mobile: join-mobile.png */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/join-mobile.png"
                alt="Join the movement"
                fill
                className="object-contain object-bottom transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
            {/* Desktop: join-the-movement.webp */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/join-the-movement.png"
                alt="Join the movement"
                fill
                className="object-cover object-bottom transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
            {/* Overlay scuro per leggibilità */}
            <div className="absolute inset-0 bg-black/60 hover:bg-black/20 transition-all duration-300 group-hover:bg-black/20"></div>
          </div>
          
          {/* Contenuto */}
          <div className="relative z-10">
            {/* Mobile: titolo sopra, resto sotto */}
            <div className="md:hidden flex flex-col space-y-6">
          <h2 className="text-white text-5xl md:text-6xl items-start justify-start font-hitmarker-black uppercase text-center">
            {((dict.home as any).newsletter as any)?.title || "JOIN THE MOVEMENT!!"}
          </h2>
          <div className="flex flex-col space-y-4">
            <p className="text-white text-sm text-center font-hitmarker-text-regular">
              {((dict.home as any).newsletter as any)?.description || ""}
            </p>
            
            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm text-center">
                ✅ {((dict.home as any).newsletter as any)?.successMessage || "Successfully subscribed!"}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm text-center">
                ❌ {((dict.home as any).newsletter as any)?.errorMessage || "An error occurred. Please try again."}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={((dict.home as any).newsletter as any)?.emailPlaceholder || "Email"}
                className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 !placeholder:font-hitmarker-text-regular !font-hitmarker-text-regular focus:outline-none focus:ring-2 focus:ring-vitalYellow disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-0 top-0 h-full w-12 bg-vitalYellow flex items-center justify-center text-black hover:bg-vitalYellow/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>

            {/* Desktop: titolo sinistra, resto destra */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-white text-7xl font-hitmarker-black uppercase">
              {((dict.home as any).newsletter as any)?.title || "JOIN THE MOVEMENT!!"}
            </h2>
          </div>
          <div className="flex flex-col space-y-6">
            <p className="text-white text-sm md:text-base font-hitmarker-text-regular">
              {((dict.home as any).newsletter as any)?.description || ""}
            </p>
            
            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm placeholder:font-hitmarker-text-regular font-hitmarker-text-regular">
                ✅ {((dict.home as any).newsletter as any)?.successMessage || "Successfully subscribed!"}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                ❌ {((dict.home as any).newsletter as any)?.errorMessage || "An error occurred. Please try again."}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={((dict.home as any).newsletter as any)?.emailPlaceholder || "Email"}
                className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-vitalYellow disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-0 top-0 h-full w-12 bg-vitalYellow flex items-center justify-center text-black hover:bg-vitalYellow/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}

