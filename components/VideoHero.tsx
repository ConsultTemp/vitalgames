"use client"
import type React from "react"
import OptimizedVideo from "./OptimizedVideo"

interface VideoHeroProps {
  title: string
  subtitle: string
  videoUrl: string,
  mobileVideoUrl?: string
}

const VideoHero: React.FC<VideoHeroProps> = ({ title, subtitle, videoUrl, mobileVideoUrl }) => {
  return (
    <div className="w-full">
      {/* Video a schermo pieno */}
      <div className="relative w-full">
        <OptimizedVideo
          videoId={videoUrl}
          mobileId={mobileVideoUrl ? mobileVideoUrl : ""}
          ratio="games"
          width="100vw"
          containerClassName="w-full"
          className="w-full h-full object-cover"
          overlay={true}
          overlayOpacity={0}
          overlayColor="transparent"
          gradient={true}
          gradientDirection="to-t"
        />

        {/* Testo sovrapposto - posizionato assolutamente per coprire il video */}
        <div className="absolute inset-0 flex items-end justify-center p-8 md:p-12 z-10">
          <div className="max-w-5xl text-center mb-8">
            <h1 className="text-4xl md:text-8xl dharmalight font-bold text-white">{title}</h1>
            <p className="text-sm font-light text-white/80 max-w-2xl mx-auto mt-4">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoHero