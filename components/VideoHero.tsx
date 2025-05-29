"use client"
import type React from "react"
import OptimizedVideo from "./OptimizedVideo"

interface VideoHeroProps {
  title: string
  subtitle: string
  videoUrl: string
}

const VideoHero: React.FC<VideoHeroProps> = ({ title, subtitle, videoUrl }) => {
  return (
    <div className="relative w-full">
      <div className="relative min-h-[44vh] w-full">
        <OptimizedVideo
          src={videoUrl}
          containerClassName="absolute inset-0"
          className="w-full h-full object-cover"
          objectPosition="center center"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          priority={true}
          overlay={true}
          overlayColor="black"
          overlayOpacity={30}
          gradient={true}
          gradientDirection="to-t"
        />

        <div className="absolute bottom-[-50px] left-0 right-0 p-8 md:p-12 z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-8xl dharmalight font-bold text-white">{title}</h1>
            <p className="text-sm font-light text-white/80 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoHero
