"use client"
import { useEffect, useRef } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src="https://files.catbox.moe/1bluzo.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
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
