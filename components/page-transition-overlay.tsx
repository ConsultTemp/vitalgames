"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import Lottie from "lottie-react"
import animationData from "@/public/animations/caricamento-vital.json"

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
    }, 1500)

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
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
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
