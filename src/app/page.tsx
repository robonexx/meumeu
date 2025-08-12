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
import Moonlight from './components/Moonlight';

const Para25 = (
  <ParagraphWord>
    <p>
      Seven full moons have come and gone, <br />
      since the night our fates were drawn.
      <br />
      A spark beneath that silver light,
      <br />
      ignited stars within our night.
      <br />
      <br />
      The magnetism between us, so rare, <br />
      like sun and moon in cosmic flare.
      <br /> Light and shadow intertwined,
      <br /> your soul and mine, forever aligned.
      <br />
      <br />
      You bring warmth into my chest,
      <br /> joy that makes my spirit rest. <br />I wish to keep on dancing
      through,
      <br /> each full moon’s glow with love so true.
      <br />
      <br />
      Until this earthly life shall end,
      <br /> and into realms unknown we’ll wend.
      <br /> For even there, beneath new skies,
      <br /> I’ll seek your light in endless highs.
      <br />
      <br />
      So if one night you look above, <br />
      and feel a pull,
      <br /> a whispered shove,
      <br /> it’s just the universe, <br />
      reminding you: our bond is timeless, pure, and true.
      <br />
      And in this cycle,
      <br /> round and round, our love, like moonlight, will always be found❤️
    </p>
  </ParagraphWord>
);

const para1 = (
  <ParagraphWord>
    <p>
      Din <span className='specialWord'>röst</span> är den särskilda
      <span className='specialWord'> platsen</span> där min
      <span className='specialWord'> själ</span> minns hur man
      <span className='specialWord'> andas</span>
    </p>
  </ParagraphWord>
);

const para2 = (
  <ParagraphWord>
    <p>
      Att vara med dig känns som en <span className='specialWord'>dröm, </span>
      men varje blick, varje <span className='specialWord'>andetag,</span>
      påminner mig om att det är <span className='specialWord'>verkligt. </span>
      Och kanske är det just det som gör det skrämmande – inte för att jag
      tvivlar, utan för att det{' '}
      <span className='specialWord'>känns så rätt, </span>
      <span className='specialWord'>så äkta, </span>som något jag längtat efter
      utan att veta om det.
      <br />
      Jag öppnade mitt <span className='specialWord'>hjärta, </span>
      darrande men redo, och <span className='specialWord'>du mötte mig, </span>
      inte med rädsla, utan
      <span className='specialWord'> med ditt eget vidöppna. </span>
      Nu ger vi varandra det som livet så sällan skänker
      <br />
      <span className='specialWord'>kärlek som ser, </span>
      <br />
      <span className='specialWord'>kärlek som känns, </span>
      <br />
      <span className='specialWord'>kärlek som viskar: </span>
      <br />
      ”I mitt hjärta väljer jag dig”
    </p>
  </ParagraphWord>
);

const para3 = (
  <ParagraphWord>
    <p>
      Först fyllde du mina morgnar med{' '}
      <span className='specialWord'>kärlek, </span>
      bara genom att finnas i mina <span className='specialWord'>
        tankar.{' '}
      </span>{' '}
      <br />
      Sen gav du mig <span className='specialWord'>din tid, </span>
      inte för att du behövde, utan för att du
      <span className='specialWord'> ville vara nära mig. </span>
      Du mötte mig där jag var, och just då kände jag den stilla kraften i att{' '}
      <span className='specialWord'>bli vald. </span> <br />
      Du inspirerar mig att växa som man, partner och människa. <br />
      Med din kärlek växer det som redan fanns inom mig, men blir så mycket{' '}
      <span className='specialWord'>starkare, </span>
      <span className='specialWord'>klarare, </span>
      <span className='specialWord'>levande. </span>
      <br />
      Tack för att du är just
      <span className='specialWord'> du. ❤️</span>
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
    <main className='w-full h-full font-[family-name:var(--font-geist-sans)] relative'>
      <div className='underlay'></div>
      {/* <div className='overlay'>
        <Moonlight />
      </div> */}
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
     {/*  <div className='fullmoon7'>{Para25}</div> */}

      <div className='meumeu'>
        <section>
          <motion.h2
            ref={ref1}
            initial={{ opacity: 0, x: -50 }}
            animate={inView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Minha <span>Lua</span> 🌕
          </motion.h2>
        </section>
        <section className='body2'>
          <Body2 />
        </section>
        <section>
          <motion.h2
            ref={ref2}
            initial={{ opacity: 0, x: 50 }}
            animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Du kom in i mitt liv som från en <span>dröm</span> mitt hjärta ❤️
          </motion.h2>
          <Body1 />
        </section>
      </div>
      <section>{para1}</section>

      <section>
        <motion.h2
          ref={ref3}
          initial={{ opacity: 0, y: 100 }}
          animate={inView3 ? { opacity: 1, x: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Minun <span>rakkaani</span> ❤️
        </motion.h2>
        <Body3 />
      </section>
      <section>{para2}</section>
      <section>{para3}</section>

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
    </main>
  );
}
