'use client';

import React, { useEffect, useState } from 'react';
import { getMoonPhase } from '@/scripts/moon';
import { initSky } from '@/scripts/sky';
import './page.scss';

// If you want, you can export this type from /scripts/moon.ts instead:
type MoonPhase = {
  src: string;
  phase: string;
  waning?: boolean;
};

export default function Home() {
  // Add waning to state if your moon returns it
  const [moonPhase, setMoonPhase] = useState<MoonPhase>({
    src: '',
    phase: '',
    waning: false,
  });

  useEffect(() => {
    // Init the sky animation (stars, meteors, etc.)
    initSky();

    // Set the current moon phase
    const today = new Date();
    // If you convert getMoonPhase to TS, type it as () => MoonPhase
    const currentMoon = getMoonPhase(today);
    setMoonPhase(currentMoon);
  }, []);

  return (
    <main className='w-full h-full font-[family-name:var(--font-geist-sans)]'>
      <div className='underlay'></div>
      <div className='svg'>
        <svg viewBox='0 0 201.33 202.05' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <linearGradient
              id='linearGradient12950'
              x1='125.3'
              x2='-73.179'
              y1='112.09'
              y2='229.18'
              gradientTransform='translate(-4.9976 -36.054)'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#f8f8f8' offset='0' />
              <stop stopColor='#7d7d7d' stopOpacity='0' offset='1' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Moon phase image */}
      <div className='imageHolder'>
        {moonPhase.src && (
          <img
            src={moonPhase.src}
            alt={moonPhase.phase}
            className={moonPhase.waning ? 'waning' : ''}
          />
        )}
      </div>

      <div className='video-bg'>
        <video autoPlay muted loop playsInline>
          <source src='/sky.webm' type='video/webm' />
        </video>
      </div>
    </main>
  );
}
