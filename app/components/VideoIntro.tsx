'use client'

import { useState } from "react"

export default function VideoIntro({ children }: { children: React.ReactNode }) {
  const [showVideo, setShowVideo] = useState(true)

  return (
    <>
      {showVideo ? (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            onEnded={() => setShowVideo(false)}
          >
            <source src="https://files.catbox.moe/mwyvxd.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        children
      )}
    </>
  )
} 