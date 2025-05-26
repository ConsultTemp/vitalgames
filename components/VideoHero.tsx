'use client'
import React, { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
    title: string;
    subtitle: string;
    videoUrl: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ title, subtitle, videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handleCanPlay = () => {
            setShowVideo(true);
            video.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.log("Autoplay blocked:", error.name);
            });
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('canplay', handleCanPlay);

        let userInteracted = false;
        const handleAnyInteraction = () => {
            if (!userInteracted && video && video.paused) {
                userInteracted = true;
                video.play().catch(() => {});
                document.removeEventListener('touchstart', handleAnyInteraction);
                document.removeEventListener('click', handleAnyInteraction);
                document.removeEventListener('scroll', handleAnyInteraction);
            }
        };

        document.addEventListener('touchstart', handleAnyInteraction, { passive: true });
        document.addEventListener('click', handleAnyInteraction);
        document.addEventListener('scroll', handleAnyInteraction, { passive: true });

        return () => {
            video?.removeEventListener('play', handlePlay);
            video?.removeEventListener('canplay', handleCanPlay);
            document.removeEventListener('touchstart', handleAnyInteraction);
            document.removeEventListener('click', handleAnyInteraction);
            document.removeEventListener('scroll', handleAnyInteraction);
        };
    }, []);

    return (
        <div className="relative w-full">
            <div className="relative min-h-[44vh] w-full">
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                            showVideo && isPlaying ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            objectPosition: 'center center'
                        }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-[-50px] left-0 right-0 p-8 md:p-12">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-4xl md:text-8xl dharmalight font-bold text-white">{title}</h1>
                        <p className="text-sm font-light text-white/80 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoHero; 