"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import OptimizedVideo from "../../components/OptimizedVideo"

interface IntroVideoProps {
  videoUrl?: string
  onComplete?: () => void
  fadeOutDuration?: number
}

export default function IntroVideo({
  videoUrl = "https://files.catbox.moe/mwyvxd.mp4",
  onComplete,
  fadeOutDuration = 1000,
}: IntroVideoProps) {
  const [hasSeenVideo, setHasSeenVideo] = useState<boolean | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Gestione del fade out quando il video finisce
  const handleVideoEnd = useCallback(() => {
    setIsFading(true)

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setHasSeenVideo(true)
      onComplete?.()
    }, fadeOutDuration)
  }, [fadeOutDuration, onComplete])

  // Effetto per la gestione client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Effetto per il controllo della sessione
  useEffect(() => {
    if (!isClient) return

    try {
      const videoSeen = sessionStorage.getItem("videoSeen")

      if (!videoSeen) {
        sessionStorage.setItem("videoSeen", "true")
        setHasSeenVideo(false) // Mostra il video
      } else {
        setHasSeenVideo(true) // Non mostrare il video
      }
    } catch (error) {
      setHasSeenVideo(false) // Fallback: mostra il video
    }
  }, [isClient])

  // Cleanup degli effetti
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [])

  // Non renderizzare se non siamo client-side o se il video è già stato visto
  if (!isClient || hasSeenVideo === null || hasSeenVideo === true) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <OptimizedVideo
        src={videoUrl}
        containerClassName="w-screen h-screen"
        className="w-screen h-screen object-cover"
        autoPlay={true}
        loop={false}
        muted={true}
        playsInline={true}
        priority={true}
        quality="high"
        onEnded={handleVideoEnd}
      />
    </div>
  )
}
