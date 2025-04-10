"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function CookieBanner() {
  const { lang, dictionary } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookie-consent")
    if (!cookieChoice) {
      setShowBanner(true)
    }

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  if (!showBanner) return null

  // Mobile version using Dialog
  if (isMobile) {
    return (
      <Dialog open={showBanner} onOpenChange={setShowBanner}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-lg overflow-hidden bg-white">
            <DialogTitle></DialogTitle>
          <div className="bg-red-700 p-4 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">{dictionary.cookieBanner?.title || "Cookie Policy"}</h2>
            
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-700 mb-4">
              {dictionary.cookieBanner?.description ||
                "Questo sito utilizza i cookie per migliorare la tua esperienza. Continuando a utilizzare questo sito, accetti l'uso dei cookie."}
            </p>

            <div className={`overflow-hidden transition-all duration-300 ${showDetails ? "max-h-96" : "max-h-0"}`}>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-semibold mb-2 text-black text-sm">Tipi di cookie utilizzati:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Cookie tecnici:</span> Essenziali per il funzionamento del sito web.
                  </li>
                  <li>
                    <span className="font-medium">Cookie analitici:</span> Utilizzati per raccogliere dati aggregati
                    sull'uso del sito.
                  </li>
                  <li>
                    <span className="font-medium">Cookie di profilazione:</span> Utilizzati per personalizzare la
                    pubblicità.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <button onClick={toggleDetails} className="text-red-700 underline hover:text-red-800 text-sm">
                {showDetails ? "Nascondi dettagli" : "Mostra dettagli"}
              </button>
              <Link href={`/${lang}/privacy`} className="text-red-700 underline hover:text-red-800 text-sm">
                {dictionary.cookieBanner?.learnMoreLink || "Maggiori informazioni"}
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleAccept}
                className="w-full py-3 bg-red-700 text-white font-medium hover:bg-red-800 transition-colors text-center"
              >
                {dictionary.cookieBanner?.acceptButton || "Accetta tutti"}
              </button>
              <button
                onClick={handleReject}
                className="w-full py-3 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors text-center"
              >
                {dictionary.cookieBanner?.rejectButton || "Rifiuta"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Desktop version
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-red-700 shadow-xl">
      <div className="container mx-auto max-w-6xl p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold mb-3 text-black">{dictionary.cookieBanner?.title || "Cookie Policy"}</h2>
            <p className="text-base text-gray-700 mb-4">
              {dictionary.cookieBanner?.description ||
                "Questo sito utilizza i cookie per migliorare la tua esperienza. Continuando a utilizzare questo sito, accetti l'uso dei cookie."}
            </p>

            <div className={`overflow-hidden transition-all duration-300 ${showDetails ? "max-h-96" : "max-h-0"}`}>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-semibold mb-2 text-black">Tipi di cookie utilizzati:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>
                    <span className="font-medium">Cookie tecnici:</span> Essenziali per il funzionamento del sito web,
                    come quelli per mantenere la sessione dell'utente attiva durante la navigazione.
                  </li>
                  <li>
                    <span className="font-medium">Cookie analitici:</span> Utilizzati per raccogliere dati aggregati
                    sull'uso del sito web (es. Google Analytics).
                  </li>
                  <li>
                    <span className="font-medium">Cookie di profilazione:</span> Utilizzati per personalizzare la
                    pubblicità e inviare contenuti promozionali in linea con gli interessi dell'utente.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={toggleDetails} className="text-red-700 underline hover:text-red-800 text-sm">
                {showDetails ? "Nascondi dettagli" : "Mostra dettagli"}
              </button>
              <Link href={`/${lang}/privacy`} className="text-red-700 underline hover:text-red-800 text-sm">
                {dictionary.cookieBanner?.learnMoreLink || "Maggiori informazioni"}
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-red-700 text-white font-medium hover:bg-red-800 transition-colors min-w-[150px] text-center"
            >
              {dictionary.cookieBanner?.acceptButton || "Accetta tutti"}
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors min-w-[150px] text-center"
            >
              {dictionary.cookieBanner?.rejectButton || "Rifiuta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
