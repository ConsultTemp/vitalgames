"use client"
import { useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Listener per quando il video inizia davvero
    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handleCanPlay = () => {
      setShowVideo(true)
      // Tentativo aggressivo di play
      video.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay blocked:", error.name)
        // Non mostriamo errori, il video è pronto per il click
      })
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('canplay', handleCanPlay)

    // Listener globale per QUALSIASI interazione che sblocca l'audio
    let userInteracted = false
    const handleAnyInteraction = () => {
      if (!userInteracted && video && video.paused) {
        userInteracted = true
        video.play().catch(() => {})
        // Rimuovi listener dopo primo utilizzo
        document.removeEventListener('touchstart', handleAnyInteraction)
        document.removeEventListener('click', handleAnyInteraction)
        document.removeEventListener('scroll', handleAnyInteraction)
      }
    }

    document.addEventListener('touchstart', handleAnyInteraction, { passive: true })
    document.addEventListener('click', handleAnyInteraction)
    document.addEventListener('scroll', handleAnyInteraction, { passive: true })

    return () => {
      video?.removeEventListener('play', handlePlay)
      video?.removeEventListener('canplay', handleCanPlay)
      document.removeEventListener('touchstart', handleAnyInteraction)
      document.removeEventListener('click', handleAnyInteraction)
      document.removeEventListener('scroll', handleAnyInteraction)
    }
  }, [])

  return (
    <section className="relative w-full h-fit bg-black overflow-hidden">
      <div className="relative w-full h-full">
        {/* Poster image che simula il video */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            style={{
              backgroundImage: `linear-gradient(45deg, 
                rgba(15, 23, 42, 0.8) 0%, 
                rgba(30, 41, 59, 0.6) 50%, 
                rgba(15, 23, 42, 0.9) 100%
              )`
            }}
          >
            {/* Effetto movimento simulato */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        )}

        {/* Video vero */}
        <video
          ref={videoRef}
          src={isMobile ? "https://files.catbox.moe/8oznbj.webm" : "https://files.catbox.moe/9muvk1.webm"}
          className={`w-full transition-opacity duration-1000 ${
            showVideo && isPlaying ? 'opacity-100' : 'opacity-0'
          } ${isMobile ? 'h-auto' : 'h-full object-cover'}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />

      </div>

    

      {/* Subtle hint - solo sui mobile */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
        <div className="text-transparent text-xs text-center animate-bounce">
          Tap anywhere to start
        </div>
      </div>
    </section>
  )
}