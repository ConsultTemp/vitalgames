"use client"
import { useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [playAttempted, setPlayAttempted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoLoaded(true)
      if (!playAttempted) {
        setPlayAttempted(true)
        // Tentativo di play con timeout per mobile
        setTimeout(() => {
          video.play().catch((error) => {
            console.warn("Video autoplay failed:", error)
            // Su mobile spesso fallisce, ma il video sarà comunque pronto
          })
        }, 100)
      }
    }

    const handleLoadedData = () => {
      setVideoLoaded(true)
    }

    // Event listeners per il caricamento
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)

    // Forza il caricamento
    video.load()

    // Tentativo immediato se già caricato
    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video?.removeEventListener('canplay', handleCanPlay)
      video?.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [playAttempted])

  // Gestore click per dispositivi che richiedono interazione utente
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src="https://files.catbox.moe/1bluzo.mp4"
          className={`w-full h-full object-cover cursor-pointer transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onClick={handleVideoClick}
          // Attributi aggiuntivi per mobile
          webkit-playsinline="true"
          x5-playsinline="true"
        />
        
        {/* Loading placeholder */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Tap to play hint per mobile (solo se video non in play) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
            Tap to play/pause
          </div>
        </div>
      </div>

      {/* Coming soon text - positioned at bottom left */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="inline-block text-vitalYellow text-sm font-medium rounded">
          Coming soon...
        </div>
      </div>
    </section>
  )
}