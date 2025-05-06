'use client';

import { useEffect, useRef, useState } from 'react';

interface SmoothRevealProps {
  children: React.ReactNode;
  threshold?: number; // Quanto dell'elemento deve essere visibile per attivare l'animazione (0-1)
  delay?: number; // Ritardo dell'animazione in ms
  duration?: number; // Durata dell'animazione in ms
  direction?: 'up' | 'down' | 'left' | 'right'; // Direzione dell'animazione
  distance?: number; // Distanza dell'animazione in px
  className?: string;
}

export default function SmoothReveal({
  children,
  threshold = 0.5,
  delay = 0,
  duration = 800,
  direction = 'up',
  distance = 40,
  className = '',
}: SmoothRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una volta che l'elemento è diventato visibile, non serve più osservarlo
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  // Configurazione dello stile iniziale in base alla direzione
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.33, 1, 0.68, 1) ${delay}ms, 
                transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
}