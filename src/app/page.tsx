'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import CurrentMoonPhase3D from './components/CurrentMoonPhase3D';
import './page.scss';

const lovePoem = `My beloved Moon,

before the first rose learned to bloom,
before the stars were sewn into the velvet sky,
there was a light wandering through eternity,
searching for the one it had always known.

And then there was you.

You are the Moon my soul remembers,
the silver flame in my midnight,
the quiet spell that turns darkness
into something beautiful.

And I,
your Sun,
was never made only to burn.
I was made to rise for you,
to warm your world,
to paint golden paths across the sky
so you would always know
how deeply you are loved.

So let the stars keep their secrets,
let the night hold its wonder,
let the heavens watch in silence…

I will always choose you
in every life,
under every sky,
as the Sun who loves his Moon
beyond forever.

Ki-áĝ-ĝa ❤️‍🔥
🌙❤️☀️`;

function AnimatedHomePoem() {
  const poemRef = useRef<HTMLParagraphElement | null>(null);
  const chars = useMemo(() => Array.from(lovePoem), []);

  useEffect(() => {
    const root = poemRef.current;
    if (!root) return;
    const letters = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-home-char="true"]'));

    gsap.set(letters, {
      opacity: 0,
      x: () => gsap.utils.random(-180, 180),
      y: () => gsap.utils.random(-120, 120),
      rotate: () => gsap.utils.random(-28, 28),
      filter: 'blur(10px)',
    });

    const tween = gsap.to(letters, {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: 'blur(0px)',
      duration: 1.45,
      ease: 'power3.out',
      stagger: { each: 0.004, from: 'random' },
      delay: .4,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <p ref={poemRef} className='homePoem' aria-label={lovePoem}>
      {chars.map((char, index) => {
        if (char === '\n') return <br key={`home-br-${index}`} />;
        if (char === ' ') return <span key={`home-sp-${index}`} className='homeSpace' aria-hidden='true' />;
        return (
          <span key={`home-${index}`} data-home-char='true' aria-hidden='true'>
            {char}
          </span>
        );
      })}
    </p>
  );
}

export default function Home() {
  return (
    <main className='homeExperience'>
      <div className='homeVideo' aria-hidden='true'>
        <video src='/sky.webm' muted autoPlay loop playsInline />
      </div>
      <div className='homeAurora' aria-hidden='true' />
      <div className='homeStars' aria-hidden='true' />

      <section className='homeHero'>
        <motion.div
          className='homeIntro'
          initial={{ opacity: 0, y: 34, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className='homeKicker'>The Sun writes to his Moon</span>
          <h1>Meu Meu</h1>
          <p className='homeLead'>A small universe for love, moonlight, memories and poems written from my soul to yours.</p>
        </motion.div>

        <CurrentMoonPhase3D />
      </section>

      <section className='homeLoveSection'>
        <div className='homeLoveCard'>
          <span className='homeKicker'>For my beloved Moon</span>
          <AnimatedHomePoem />
        </div>
      </section>
    </main>
  );
}
