"use client"
import OptimizedVideo from "./OptimizedVideo"

export default function HeroSection() {
  return (
    <section className="relative w-full h-fit bg-black overflow-hidden">
      <OptimizedVideo
        src="https://files.catbox.moe/9muvk1.webm"
        mobileSrc="https://files.catbox.moe/8oznbj.webm"
        containerClassName="w-full h-full"
        className="w-full h-full object-cover"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        priority={true}
        quality="high"
        overlay={false}
        fallbackComponent={
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            
          </div>
        }
      />
    </section>
  )
}
