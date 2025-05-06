'use client'
import React, { useEffect, useState } from 'react';

export function BackgroundGradient() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getScrollPercentage = () => {
    return Math.min(Math.max(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight), 0), 1);
  };

  // Funzione per generare il gradient dinamico
  const getDynamicGradient = () => {
    const scrollPercentage = getScrollPercentage();
    
    // Array di colori per il gradient - dalla palette scura blu
    const startColors = [
      '#010208', // Blu-nero profondo
      '#020510', // Blu notte leggero
      '#040b20', // Blu profondo
      '#061130', // Blu notte più definito
      '#081740', // Blu freddo scuro
      '#0a1d50', // Indaco profondo
      '#040f28', // Blu molto scuro
      '#010518'  // Quasi nero con accenno blu/verde
    ];
    
    const endColors = [
      '#020510', // Blu notte leggero
      '#030818', // Blu navy scuro
      '#050e28', // Blu petrolio scuro
      '#071438', // Blu più vivido ma scuro
      '#091a48', // Blu-indaco molto scuro
      '#061430', // Blu navy scuro
      '#020a20', // Blu-verde acqua scurissimo
      '#030818'  // Blu navy scuro
    ];
    
    // Calcola indici per i colori di inizio e fine
    const colorArrayLength = startColors.length - 1;
    const startColorIndex = Math.floor(scrollPercentage * colorArrayLength);
    const endColorIndex = Math.floor(scrollPercentage * colorArrayLength);
    
    // Prendi colori correnti e successivi per l'interpolazione
    const startColor1 = startColors[startColorIndex];
    const startColor2 = startColors[Math.min(startColorIndex + 1, colorArrayLength)];
    const endColor1 = endColors[endColorIndex];
    const endColor2 = endColors[Math.min(endColorIndex + 1, colorArrayLength)];
    
    // Calcola il fattore di interpolazione locale
    const localFactor = (scrollPercentage * colorArrayLength) % 1;
    
    // Funzione per interpolare tra due colori
    const interpolateColor = (color1: string, color2: string, factor: number) => {
      if (!color1 || !color2) {
        return '#000000'; // fallback sicuro
      }

      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * factor);
      const g = Math.round(g1 + (g2 - g1) * factor);
      const b = Math.round(b1 + (b2 - b1) * factor);

      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    // Interpola i colori
    const finalStartColor = interpolateColor(startColor1, startColor2, localFactor);
    const finalEndColor = interpolateColor(endColor1, endColor2, localFactor);
    
    // Genera l'angolo del gradiente basato sullo scroll
    // Fa ruotare il gradiente di 360 gradi durante lo scroll
    const angle = Math.floor(scrollPercentage * 360);
    
    // Ritorna il gradient CSS completo
    return {
      gradient: `linear-gradient(${angle}deg, ${finalStartColor} 0%, ${finalEndColor} 100%)`,
      angle: angle
    };
  };

  // Genera l'effetto di luce riflessa
  const getLightEffect = () => {
    const scrollPercentage = getScrollPercentage();
    
    // Utilizziamo le funzioni trigonometriche per creare movimenti fluidi
    const sinValue = Math.sin(scrollPercentage * Math.PI * 2);
    const cosValue = Math.cos(scrollPercentage * Math.PI * 2);
    
    // L'effetto luce è un gradient radiale che segue un percorso ellittico
    const lightX = 50 + sinValue * 40; // Posizione X tra 10% e 90%
    const lightY = 50 + cosValue * 40; // Posizione Y tra 10% e 90%
    
    // Intensità della luce che varia con lo scroll
    const lightIntensity = 0.15 + Math.abs(sinValue) * 0.1;
    
    // Dimensione dell'effetto luce che pulsa leggermente
    const lightSize = 30 + Math.abs(sinValue) * 15;
    
    // Genera un secondo effetto luce più piccolo che si muove in modo indipendente
    const secondaryLightX = 50 + cosValue * 25;
    const secondaryLightY = 50 + sinValue * 25;
    const secondaryLightSize = 15 + Math.abs(cosValue) * 10;
    const secondaryLightIntensity = 0.1 + Math.abs(cosValue) * 0.05;
    
    // Effetto principale di luce
    const mainLight = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, ${lightIntensity}) 0%, transparent ${lightSize}%)`;
    
    // Effetto secondario di luce
    const secondaryLight = `radial-gradient(circle at ${secondaryLightX}% ${secondaryLightY}%, rgba(180, 210, 255, ${secondaryLightIntensity}) 0%, transparent ${secondaryLightSize}%)`;
    
    return { mainLight, secondaryLight };
  };

  

  // Ottieni tutti gli effetti
  const { gradient, angle } = getDynamicGradient();
  const { mainLight, secondaryLight } = getLightEffect();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden"
      style={{
        background: ` ${mainLight}, ${secondaryLight}, ${gradient}`,
        backgroundBlendMode: 'overlay, screen, screen, normal',
        transition: 'background 0.3s ease-out',
      }}
    />
  );
}

export default BackgroundGradient;