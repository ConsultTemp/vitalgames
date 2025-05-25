"use client"
import { useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        video.muted = true
        video.volume = 0
        await video.play()
      } catch (error) {
        // Riprova dopo mezzo secondo
        setTimeout(async () => {
          try {
            await video.play()
          } catch (e) {
            // Se fallisce ancora, pazienza
          }
        }, 500)
      }
    }

    const handleCanPlay = () => {
      setVideoLoaded(true)
      tryPlay()
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', () => setVideoLoaded(true))
    
    // Carica il video
    video.load()

    return () => {
      video?.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  // Handler per primo click che sblocca autoplay mobile
  const handleFirstClick = () => {
    const video = videoRef.current
    if (video && video.paused) {
      video.play().catch(() => {})
    }
  }

  return (
    <section className="relative w-full h-screen bg-black" onClick={handleFirstClick}>
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src="https://files.catbox.moe/1bluzo.mp4"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        
        {!videoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <div className="inline-block text-yellow-400 text-sm font-medium rounded">
          Coming soon...
        </div>
      </div>
    </section>
  )
}