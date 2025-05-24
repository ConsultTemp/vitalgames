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
  const [shouldShowVideo, setShouldShowVideo] = useState(true) // Inizia sempre true per coprire tutto
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [videoCompleted, setVideoCompleted] = useState(false)
  
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
      setVideoCompleted(true)
      setShouldShowVideo(false)
      onComplete?.()
    }, fadeOutDuration)
  }, [fadeOutDuration, onComplete])
  
  // Effetto per controllare se mostrare il video
  useEffect(() => {
    try {
      const videoSeen = sessionStorage.getItem('videoSeen')
      
      if (videoSeen) {
        // Video già visto, nascondilo immediatamente
        setShouldShowVideo(false)
        setVideoCompleted(true)
      } else {
        // Prima volta, marca come visto
        sessionStorage.setItem('videoSeen', 'true')
      }
    } catch (error) {
      // Fallback: mostra il video
      console.warn('SessionStorage not available')
    }
  }, [])
  
  // Cleanup degli effetti
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [])
  
  // Se il video è completato, non renderizzare nulla
  if (videoCompleted || !shouldShowVideo) {
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