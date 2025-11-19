'use client';
import { motion, useInView } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { getMoonPhase } from '@/scripts/moon';
import { initSky } from '@/scripts/sky';
import ParagraphWord from './components/animations/ParagraphWord';
import Body1 from './components/Body1';
import Body2 from './components/Body2';
import Body3 from './components/Body3';
import './page.scss';
import Showcase from './components/Showcase.jsx';
import Performance from './components/Performance.jsx';
import SolarSystem from './components/SolarSystem';
import MoonCanvas from './components/MoonCanvas';

const para1 = (
  <ParagraphWord>
    <p>
      Du <span className='specialWord'>har</span> blivit mitt allt,
      <span className='specialWord'> ditt hjärta </span> är där
      <span className='specialWord'> min själ</span> kan vila
      <span className='specialWord'> där jag andas</span>
    </p>
  </ParagraphWord>
);

const para2 = (
  <ParagraphWord>
    <p>
      Med dig känns allt <span className='specialWord'>enkelt </span>, som om
      världen äntligen hittat sin plats. Vi gömmer oss inte längre, våra hem
      står öppna, våra liv sammanflätade.
      <br />
      Du har din plats i mitt, jag i ditt, och mellan oss finns inte längre en
      osäkerhet, bara den stilla vissheten om att vi hör hemma här och hos{' '}
      <span className='specialWord'>varandra. </span>
      <br />
      Vi har lagt nycklarna i varandras händer, inte bara till våra dörrar utan
      till våra <span className='specialWord'>hjärtan. </span>
      <br />
      Våra barn vet om oss, vi blir sakta mer och mer en del i varandras vardag.
      <br />
      Du och jag har byggt något som inte behöver döljas, något som står stadigt
      även när livet skakar.
      <br />
      För varje dag du ser på mig blir världen lite mjukare, och jag tänker...
      <span className='specialWord'> det här är hemma. </span>
    </p>
  </ParagraphWord>
);

const para3 = (
  <ParagraphWord>
    <p>
      ☀️🌕♏♉
      <br />
      <br />
      The Sun in <span className='specialWord'>Scorpio,</span>
      <br />
      The Moon in <span className='specialWord'>Taurus.</span>
      <br />
      Fire and earth in cosmic flow,
      <br />
      two souls bound, true love now shown.
      <br />
      <br />
      A few full moons have come and gone,
      <br />
      yet still our light keeps shining on.
      <br />
      Stronger now, both calm and free,
      <br />
      rooted deep in our destiny.
      <br />
      <br />
      You, my Moon so soft, <span className='specialWord'>divine,</span>
      <br />
      your glow forever mirrors mine.
      <br />
      And I, your Sun in endless flight,
      <br />
      chasing your soul through day and night.
      <br />
      <br />
      This love’s no spark that fades or dies,
      <br />
      it’s written high across the skies.
      <br />
      For we, like stars, are born to stay —
      <br />
      two hearts, one orbit, night and day.
      <span className='specialWord'> ❤️</span>
    </p>
  </ParagraphWord>
);

const radius = 60; // radius of circle
const duration = 4; // seconds

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

  const [showFullMoon7, setShowFullMoon7] = useState(false);

  const ref1 = useRef(null);
  const inView1 = useInView(ref1, { once: true });

  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { once: true });

  const ref3 = useRef(null);
  const inView3 = useInView(ref3, { once: true });

  const ref4 = useRef(null);
  const inView4 = useInView(ref4, { once: true });

  const ref5 = useRef(null);
  const inView5 = useInView(ref5, { once: true });

  const ref6 = useRef(null);
  const inView6 = useInView(ref6, { once: true });

  const ref7 = useRef(null);
  const inView7 = useInView(ref7, { once: true });

  const ref8 = useRef(null);
  const inView8 = useInView(ref8, { once: true });

  /* useEffect(() => {
    initSky();
    const today = new Date();
    const currentMoon = getMoonPhase(today);
    setMoonPhase(currentMoon);
  }, []); */

  useEffect(() => {
    initSky();

    const now = new Date();

    // Read Stockholm-local Y/M/D safely (no string parsing hacks)
    const parts = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Europe/Stockholm',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(now);

    const getNum = (type: string) =>
      Number(parts.find((p) => p.type === type)?.value);

    const year = getNum('year');
    const month = getNum('month'); // 1–12
    const day = getNum('day');

    setShowFullMoon7(year === 2025 && month === 9 && day === 7);

    // (Optional) keep your moon image in sync; using "now" is fine,
    // or use the Stockholm date anchored at midnight UTC for consistency:
    setMoonPhase(getMoonPhase(now));
    // or: setMoonPhase(getMoonPhase(new Date(Date.UTC(year, month - 1, day))));
  }, []);

  return (
    <main className='font-[family-name:var(--font-geist-sans)] relative'>
      <div className='underlay'></div>
      {/* <MoonCanvas />
      <SolarSystem /> */}
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
      <section className='h-screen relative flex flex-col items-center justify-center text-white '>
        <div className='imageHolder'>
          {moonPhase.src && (
            <img
              src={moonPhase.src}
              alt={moonPhase.phase}
              className={moonPhase.waning ? 'waning' : ''}
            />
          )}
        </div>
      </section>

      {/* <div className='meumeu'>

      </div> */}
    {/*   <section>{para3}</section> */}

      {/*       <section>
        <motion.h2
          ref={ref3}
          initial={{ opacity: 0, y: 100 }}
          animate={inView3 ? { opacity: 1, x: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Minun <span>rakkaani</span> ❤️
        </motion.h2>
          <Body3 />
      </section> */}
     {/*  <section>{para1}</section>
      <section>{para2}</section> */}

      <div className='bottom'>
        <h2>
          Você é minha lua{' '}
          <motion.span
            ref={ref5}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={
              inView5
                ? {
                    x: [0, 70, 140, 70, 0],
                    y: [0, -70, 0, 70, 0],
                    rotate: [0, 90, 180, 270, 360],
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 4,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            🌕
          </motion.span>
        </h2>

        <h2>
          E eu sou seu sol{' '}
          <motion.span
            ref={ref5}
            initial={{ x: 140, y: 0, rotate: 0, opacity: 0 }}
            animate={
              inView5
                ? {
                    x: [140, 70, 0, 70, 140, 0],
                    y: [0, 70, 0, -70, 0],
                    rotate: [0, 90, 180, 270, 360],
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 4,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            ☀️
          </motion.span>
        </h2>

        <p>
          <motion.span
            ref={ref6}
            initial={{ opacity: 0 }}
            animate={inView6 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 3.6, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
          <motion.span
            ref={ref7}
            initial={{ opacity: 0 }}
            animate={inView7 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 3.8, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
          <motion.span
            ref={ref8}
            initial={{ opacity: 0 }}
            animate={inView8 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 4, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
        </p>
      </div>

      {/* <div className='w-screen h-screen relative pointer-events-none mt-20'>
        <video
          src='/videos/meumeu.mp4'
          loop
          muted
          autoPlay
          playsInline
          className='mx-auto sm:w-screen md:w-fit'
        />
      </div> */}
    </main>
  );
}
