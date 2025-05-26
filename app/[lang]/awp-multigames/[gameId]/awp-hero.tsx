"use client"

import { useState, useRef } from "react"
import { Play } from "lucide-react"
import Image, { StaticImageData } from "next/image"

interface GameSectionProps {
    imageUrl: StaticImageData;
    videoUrl: string;
    title: string;
    description: string;
}

export default function GameSection({ imageUrl, videoUrl, title, description }: GameSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative w-full overflow-hidden text-white py-16">
      {/* Background image as actual img tag with lower z-index */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image src={imageUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        {/* Gradient overlay - CORREZIONE QUI */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black h-full"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 flex flex-col items-center">
        {/* Video section */}
        <div className="w-full max-w-4xl mb-12 relative rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            muted
            className="w-full object-cover"
            controls={isPlaying}
            onEnded={() => setIsPlaying(false)}
            poster={imageUrl.src}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center z-20"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* Text content */}
        <div className="text-center max-w-3xl">
          <p className="text-vitalYellow font-medium mb-2">Multigames</p>
          <h2 className="text-7xl md:text-8xl font-bold uppercase dharma">{title}</h2>
          <p className="text-gray-400 text-xs md:text-base max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
