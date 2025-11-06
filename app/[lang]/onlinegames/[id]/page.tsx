"use client"

import { useState, use } from "react"
import type { Locale } from "@/i18n-config"
import { onlineGames } from "@/lib/onlinegames"
import { notFound, useRouter } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { ArrowLeft, ExternalLink, AlertTriangle } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

interface OnlineGamePageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export default function OnlineGamePage({ params }: OnlineGamePageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { dictionary: dict, lang } = useLanguage()
  const [isAgeVerificationOpen, setIsAgeVerificationOpen] = useState(true)
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  
  const gameId = parseInt(resolvedParams.id)
  const game = onlineGames.find(g => g.id === gameId)

  const handleAgeConfirmation = () => {
    setIsAgeVerificationOpen(false)
    setIsAgeVerified(true)
  }

  const handleAgeDecline = () => {
    setIsAgeVerificationOpen(false)
    router.push(`/${resolvedParams.lang}/onlinegames`)
  }

  if (!game) {
    notFound()
  }

  // Game schema
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.title,
    description: `${game.title} - ${game.description}. Free online slot machine demo by Vitalgames`,
    gameItem: {
      "@type": "Thing",
      name: "Online Slot Machine",
    },
    gamePlatform: ["Web Browser", "Mobile", "Desktop"],
    genre: "Slot Machine",
    image: game.image?.src,
    provider: {
      "@type": "Organization",
      "@id": "https://www.vitalgamesdigital.com/#organization",
      name: "Vitalgames",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      category: "Free Online Game",
      price: "0",
      priceCurrency: "EUR",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://www.vitalgamesdigital.com/${resolvedParams.lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Giochi Online",
          item: `https://www.vitalgamesdigital.com/${resolvedParams.lang}/onlinegames`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: game.title,
          item: `https://www.vitalgamesdigital.com/${resolvedParams.lang}/onlinegames/${game.id}`,
        },
      ],
    },
  }

  return (
    <>
      <Script
        id="game-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema),
        }}
      />

      <main className="bg-black">

        {/* Game iframe container */}
        {isAgeVerified && (
          <section className="flex-1 py-4 px-6 md:py-16 md:px-12 lg:px-16">
            <div className="flex justify-center items-start md:items-center min-h-[calc(100vh-120px)]">
              <div className="w-full max-w-5xl mx-auto">
                <div 
                  className="rounded-xl shadow-2xl relative overflow-hidden" 
                  style={{ 
                    backgroundColor: '#1f2937',
                    borderRadius: '0.75rem'
                  }}
                >
                  {/* Desktop: più basso e stretto, Mobile: più alto */}
                    <div 
                      className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] relative overflow-hidden"
                      style={{
                        borderRadius: '0.75rem'
                      }}
                    >
                      <iframe
                        src={game.demoLink}
                        title={`${game.title} - Demo gratuita`}
                        className="w-full h-full border-0"
                        allow="fullscreen; autoplay; encrypted-media"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                        style={{ 
                          transform: 'scale(1.03)',
                          transformOrigin: 'center',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                  {/* Overlay per forzare i bordi arrotondati */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: '0.75rem',
                      boxShadow: 'inset 0 0 0 2px rgba(31, 41, 55, 1)',
                      zIndex: 10
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Placeholder quando l'età non è verificata */}
        {!isAgeVerified && !isAgeVerificationOpen && (
          <section className="flex-1 py-4 px-6 md:py-16 md:px-12 lg:px-16">
            <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
              <div className="text-center text-white">
                <AlertTriangle className="w-16 h-16 text-vitalYellow mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verifica dell'età richiesta</h2>
                <p className="text-gray-400">È necessario verificare l'età per accedere a questo contenuto.</p>
              </div>
            </div>
          </section>
        )}

        {/* Age Verification Modal */}
        <Dialog open={isAgeVerificationOpen} onOpenChange={setIsAgeVerificationOpen}>
          <DialogContent className="max-w-[90%] sm:max-w-md bg-black text-white rounded-sm">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                <AlertTriangle className="h-6 w-6 text-vitalYellow" />
              </div>
              <DialogTitle className="text-xl font-bold text-white">
                {dict.ageVerificationModal.title}
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-left">
                {dict.ageVerificationModal.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button 
                onClick={handleAgeConfirmation} 
                className="bg-vitalYellow text-black hover:bg-gray-100 font-medium"
              >
                {dict.ageVerificationModal.confirm}
              </Button>
              <Button
                variant="outline"
                onClick={handleAgeDecline}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                {dict.ageVerificationModal.decline}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
