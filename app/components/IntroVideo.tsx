"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface IntroVideoProps {
  videoUrl?: string
  onComplete?: () => void
  fadeOutDuration?: number
}

export default function IntroVideo({ 
  videoUrl = "https://files.catbox.moe/mwyvxd.mp4",
  onComplete,
  fadeOutDuration = 1000
}: IntroVideoProps) {
  const [hasSeenVideo, setHasSeenVideo] = useState<boolean | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Gestione quando il video è pronto per il fade in
  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true)
  }, [])
  
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
      const videoSeen = sessionStorage.getItem('videoSeen')
      
      if (!videoSeen) {
        sessionStorage.setItem('videoSeen', 'true')
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
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-screen h-screen object-cover transition-opacity duration-500 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onCanPlay={handleVideoCanPlay}
        onEnded={handleVideoEnd}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  )
}