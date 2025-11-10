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
  const [isMobile, setIsMobile] = useState(false)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  
  const gameId = parseInt(resolvedParams.id)
  const game = onlineGames.find(g => g.id === gameId)

  useEffect(() => {
    // Rileva se è mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (typeof window !== 'undefined' && window.innerWidth < 768)
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenActive = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isFullscreenActive)
      if (!isFullscreenActive) {
        document.body.style.overflow = ''
      }
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
      // Cleanup: ripristina overflow quando il componente viene smontato
      document.body.style.overflow = ''
    }
  }, [])

  // Nascondi la navbar quando è in fullscreen
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      if (isFullscreen) {
        header.style.display = 'none'
      } else {
        header.style.display = ''
      }
    }
    return () => {
      const header = document.querySelector('header')
      if (header) {
        header.style.display = ''
      }
    }
  }, [isFullscreen])

  const handleFullscreen = async (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    if (!gameContainerRef.current) {
      return
    }

    // Su mobile, usa fallback CSS invece dell'API fullscreen
    if (isMobile) {
      setIsFullscreen(!isFullscreen)
      // Previeni scroll del body quando è in fullscreen
      if (!isFullscreen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return
    }

    try {
      const element = gameContainerRef.current as any
      const doc = document as any
      
      // Verifica se è già in fullscreen
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      )

      if (!isCurrentlyFullscreen) {
        // Prova tutti i metodi fullscreen disponibili in sequenza
        try {
          await element.requestFullscreen()
        } catch (err1) {
          try {
            await element.webkitRequestFullscreen()
          } catch (err2) {
            try {
              await element.webkitEnterFullscreen()
            } catch (err3) {
              try {
                await element.mozRequestFullScreen()
              } catch (err4) {
                try {
                  await element.msRequestFullscreen()
                } catch (err5) {
                  // Se fallisce tutto, usa fallback CSS anche su desktop
                  setIsFullscreen(true)
                  document.body.style.overflow = 'hidden'
                }
              }
            }
          }
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
        document.body.style.overflow = ''
      }
    } catch (error: any) {
      // Se fallisce, usa fallback CSS
      setIsFullscreen(!isFullscreen)
      if (!isFullscreen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
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

      <div 
        className={`bg-black ${isFullscreen ? 'fixed inset-0' : 'h-[80vh]'}`}
        style={{ zIndex: isFullscreen ? 999999 : 'auto' }}
      >
        {/* Game iframe container */}
        <section 
          className={`flex-1 ${isFullscreen ? 'fixed inset-0 p-0' : 'py-24 px-6 md:py-32 md:px-12 lg:px-16 h-[80vh]'}`}
          style={{ zIndex: isFullscreen ? 999999 : 'auto' }}
        >
          <div className="flex justify-center items-center h-full">
            <div className={`w-full ${isFullscreen && isMobile ? 'h-full' : 'max-w-5xl mx-auto h-full'} flex flex-col`}>
              {/* Bottone fullscreen sotto il gioco */}
              {!isFullscreen && (
                <div className="flex w-full justify-center flex-shrink-0 px-[3px] md:px-0 mb-4">
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
                className={`rounded-xl shadow-2xl relative overflow-visible flex-1 w-full ${isFullscreen && isMobile ? 'rounded-none' : ''}`}
                style={{ 
                  backgroundColor: '#1f2937',
                  borderRadius: isFullscreen && isMobile ? '0' : '0.75rem',
                  height: isFullscreen ? (isMobile ? '100vh' : '90vh') : '100%',
                  minHeight: isFullscreen ? (isMobile ? '100vh' : '90vh') : 'calc(100vh - 200px)'
                }}
              >
                {/* Bottone in alto a destra - dentro il contenitore fullscreen */}
                {isFullscreen && (
                  <button
                    onClick={handleFullscreen}
                    className="absolute top-4 right-4 bg-vitalYellow text-black hover:bg-gray-100 font-medium flex items-center justify-center rounded-full w-12 h-12 p-0 shadow-lg"
                    aria-label="Esci da Fullscreen"
                    style={{ zIndex: 9999999 }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                {/* Desktop: più basso e stretto, Mobile: più alto */}
                <div 
                  className="h-full w-full relative overflow-hidden"
                  style={{
                    borderRadius: isFullscreen && isMobile ? '0' : '0.75rem'
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
