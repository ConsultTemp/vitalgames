"use client"

import { useState, use, useRef, useEffect } from "react"
import type { Locale } from "@/i18n-config"
import { onlineGames } from "@/lib/onlinegames"
import { notFound } from "next/navigation"
import Script from "next/script"
import { Maximize, Minimize, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnlineGamePageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export default function OnlineGamePage({ params }: OnlineGamePageProps) {
  const resolvedParams = use(params)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  
  const gameId = parseInt(resolvedParams.id)
  const game = onlineGames.find(g => g.id === gameId)

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenActive = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isFullscreenActive)
    }

    // Aggiungi listener per tutti i prefissi browser
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  const handleFullscreen = async (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    if (!gameContainerRef.current) {
      console.error('Game container ref not available')
      return
    }

    try {
      const element = gameContainerRef.current
      const doc = document as any
      
      // Verifica se è già in fullscreen
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      )

      if (!isCurrentlyFullscreen) {
        // Entra in fullscreen
        const elem = element as any
        if (element.requestFullscreen) {
          await element.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen()
        } else {
          console.error('Fullscreen API not supported')
          alert('Fullscreen non supportato dal tuo browser')
        }
      } else {
        // Esci da fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen()
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
      // Non mostrare alert per errori comuni come ESC premuto dall'utente
      if (error instanceof Error && !error.message.includes('user')) {
        console.error('Fullscreen error details:', error)
      }
    }
  }

  if (!game) {
    notFound()
  }

  if (!game.demoLink) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gioco non disponibile</h1>
          <p>Il gioco richiesto non è disponibile al momento.</p>
        </div>
      </div>
    )
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

      <div className="bg-black h-[80vh]">
        {/* Game iframe container */}
        <section className="flex-1 py-24 px-6 md:py-32 md:px-12 lg:px-16 h-[80vh]">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
              {/* Bottone fullscreen sotto il gioco */}
              {!isFullscreen && (
                <div className="flex w-full justify-center flex-shrink-0">
                  <Button
                    onClick={handleFullscreen}
                    className="w-full bg-vitalYellow text-black hover:bg-gray-100 font-medium flex items-center gap-2 !py-1 text-xs rounded-none h-8"
                  >
                    <Maximize className="w-3 h-3" />
                    Fullscreen
                  </Button>
                </div>
              )}
              <div 
                ref={gameContainerRef}
                className="rounded-xl shadow-2xl relative overflow-visible flex-1 w-full" 
                style={{ 
                  backgroundColor: '#1f2937',
                  borderRadius: '0.75rem',
                  height: isFullscreen ? '90vh' : '100%',
                  minHeight: isFullscreen ? '90vh' : 'calc(100vh - 200px)'
                }}
              >
                {/* Bottone in alto a destra - dentro il contenitore fullscreen */}
                {isFullscreen && (
                  <button
                    onClick={handleFullscreen}
                    className="absolute top-4 right-4 bg-vitalYellow text-black hover:bg-gray-100 font-medium flex items-center justify-center rounded-full w-12 h-12 p-0 shadow-lg z-[99999]"
                    aria-label="Esci da Fullscreen"
                    style={{ zIndex: 99999 }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                {/* Desktop: più basso e stretto, Mobile: più alto */}
                <div 
                  className="h-full w-full relative overflow-hidden"
                  style={{
                    borderRadius: '0.75rem'
                  }}
                >
                  <iframe
                    src={game.demoLink}
                    title={`${game.title} - Demo gratuita`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    style={{ 
                      transformOrigin: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                
                
              </div>
              
              
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
