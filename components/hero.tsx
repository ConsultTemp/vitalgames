"use client"
import { useState, useEffect, useRef } from "react"
import video from "../app/assets/classev.png"
export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative w-full overflow-visible pt-24 mb-24">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="px-4 md:px-24 relative z-20">
        <div className="flex flex-col h-[80vh] md:h-[90vh] justify-center">
          <div className="w-full md:w-3/5 mt-12 md:mt-24 relative">
            <div>
              <p className="text-gray-400 text-xs">Powered by Vital Games</p>
              <h1 className="text-6xl md:text-[120px] text-white mt-4 dharma" style={{ height: "fit-content" }}>MANHATTAN</h1>
              <p className="text-white text-lg mt-2">Il nostro nuovo multigames</p>
              <div className="inline-block text-vitalYellow text-sm font-medium rounded mt-4">
                Coming soon...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video container - positioned to overlap with text */}
      <div className="absolute inset-0 z-5">
        <div className="relative w-full h-full aspect-video overflow-hidden">
          <video
            ref={videoRef}
            src="https://files.catbox.moe/3k1ebz.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  )
}
