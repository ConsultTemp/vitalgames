"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import Lottie from "lottie-react"
import animationData from "@/public/animations/caricamentovital.json"

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Mostra overlay quando cambia pathname
    setShowOverlay(true)
    
    // Nascondi dopo 0.5 secondi - SEMPRE
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 950)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname]) // Si ri-esegue quando cambia pathname

  if (!mounted || !showOverlay) return null

  const overlayContent = (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh', // Usa dynamic viewport height per considerare la barra del browser
        minHeight: '100vh', // Fallback per browser che non supportano dvh
        pointerEvents: 'none',
      }}
    >
      {/* Area sicura che tiene conto della barra di ricerca del browser */}
      <div 
        className="w-full flex items-center justify-center"
        style={{
          height: '100%',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          // Area sicura centrale che ignora le barre del browser
          minHeight: 'calc(100dvh - 120px)', // Lascia spazio per le barre del browser
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px]">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  )

  return createPortal(overlayContent, document.body)
}
