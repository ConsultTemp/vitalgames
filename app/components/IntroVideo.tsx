"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import OptimizedVideo from "../../components/OptimizedVideo"

interface IntroVideoProps {
  videoUrl?: string
  mobileVideoUrl?: string
  onComplete?: () => void
  fadeOutDuration?: number
}

export default function IntroVideo({
  videoUrl = "0dac21e83263ea993143b4815bd5dc43", // ⚠️ Cambia con l'ID Cloudflare
  mobileVideoUrl = "91b585031374ff0479cd52adee927aa5",
  onComplete,
  fadeOutDuration = 1000,
}: IntroVideoProps) {
  const [hasSeenVideo, setHasSeenVideo] = useState<boolean | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleVideoEnd = useCallback(() => {
    if (isFading) return // Evita doppio trigger
    
    setIsFading(true)

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setHasSeenVideo(true)
      onComplete?.()
    }, fadeOutDuration)
  }, [fadeOutDuration, onComplete, isFading])

  // Callback chiamato quando l'iframe è caricato
  const handleIframeLoad = useCallback(() => {
    if (isFading) return

    // Cancella eventuali timer precedenti
    if (autoFadeTimeoutRef.current) {
      clearTimeout(autoFadeTimeoutRef.current)
    }

    // Avvia il timer dei 3.1 secondi da quando l'iframe è caricato
    // (stima approssimativa di quando il video inizia)
    autoFadeTimeoutRef.current = setTimeout(() => {
      handleVideoEnd()
    }, 3100) // 3.1 secondi dal caricamento iframe
  }, [isFading, handleVideoEnd])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
      const videoSeen = sessionStorage.getItem("videoSeen")
      if (!videoSeen) {
        sessionStorage.setItem("videoSeen", "true")
        setHasSeenVideo(false)
      } else {
        setHasSeenVideo(true)
      }
    } catch {
      setHasSeenVideo(false)
    }
  }, [isClient])

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
      if (autoFadeTimeoutRef.current) {
        clearTimeout(autoFadeTimeoutRef.current)
      }
    }
  }, [])

  if (!isClient || hasSeenVideo === null || hasSeenVideo === true) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <OptimizedVideo
        ratio="intro"
        containerClassName="w-screen"
        className="w-screen object-cover"
        videoId={videoUrl}
        mobileId={mobileVideoUrl}
        onIframeLoad={handleIframeLoad}
      />
    </div>
  )
}