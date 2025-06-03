"use client"
import OptimizedVideo from "./OptimizedVideo"

export default function HeroSection() {
  return (
    <section className="relative w-full bg-black">
      <OptimizedVideo
        ratio="hero"
        videoId="1882591ec6b6173e792aa38691a3e742"
        mobileId="0fd5f233bf57bdd4903b68cd63420efa"
        width="100vw"
        overlay={false}
      />
    </section>
  )
}