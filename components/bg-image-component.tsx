'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FloatingImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

export default function FloatingImage({ src, alt, className = '' }: FloatingImageProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 0.7;
      const y = (event.clientY / innerHeight - 0.5) * 0.7;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const moveFactor = 20;

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translate(${position.x * moveFactor}px, ${position.y * moveFactor}px)`,
        transition: 'transform 0.1s ease-out',
        overflow: 'visible',
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover overflow-visible" sizes="100vw" />
    </div>
  );
}
