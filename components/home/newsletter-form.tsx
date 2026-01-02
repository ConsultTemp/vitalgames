"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../language-provider"

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
                className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-vitalYellow disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-vitalYellow transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            
            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-vitalYellow transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  )
}

