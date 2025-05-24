'use client'
import React from 'react';

interface VideoHeroProps {
    title: string;
    subtitle: string;
    videoUrl: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ title, subtitle, videoUrl }) => {
    return (
        <div className="relative w-full">
            <div className="relative min-h-[44vh] w-full">
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover"
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
                        <h1 className="text-4xl md:text-8xl dharma font-bold text-white">{title}</h1>
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