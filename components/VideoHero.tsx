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
        />

        {/* Testo sovrapposto - posizionato assolutamente per coprire il video */}
        <div className="absolute inset-0 flex items-end justify-center p-8 md:p-12 z-10 bg-transparent">
          <div className="max-w-5xl text-center">
            <h1 className="text-6xl font-hitmarker-black text-white uppercase">{title}</h1>
            <p className="text-md font-hitmarker-text-regular text-white/80 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoHero