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
  const [isPlaying, setIsPlaying] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Gestione quando il video è pronto per il fade in
  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true)
    const video = videoRef.current
    if (video) {
      video.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay blocked:", error.name)
      })
    }
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

  // Gestione autoplay con interazione utente
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
    }

    video.addEventListener('play', handlePlay)

    let userInteracted = false
    const handleAnyInteraction = () => {
      if (!userInteracted && video && video.paused) {
        userInteracted = true
        video.play().catch(() => {})
        document.removeEventListener('touchstart', handleAnyInteraction)
        document.removeEventListener('click', handleAnyInteraction)
        document.removeEventListener('scroll', handleAnyInteraction)
      }
    }

    document.addEventListener('touchstart', handleAnyInteraction, { passive: true })
    document.addEventListener('click', handleAnyInteraction)
    document.addEventListener('scroll', handleAnyInteraction, { passive: true })

    return () => {
      video.removeEventListener('play', handlePlay)
      document.removeEventListener('touchstart', handleAnyInteraction)
      document.removeEventListener('click', handleAnyInteraction)
      document.removeEventListener('scroll', handleAnyInteraction)
    }
  }, [])
  
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
        preload="metadata"
        className={`w-screen h-screen object-cover transition-opacity duration-500 ${
          videoLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onCanPlay={handleVideoCanPlay}
        onEnded={handleVideoEnd}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  )
}