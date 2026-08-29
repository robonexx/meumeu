'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import CurrentMoonPhase3D from './components/CurrentMoonPhase3D';
import HomeParticleCloud from './components/HomeParticleCloud';
import './page.scss';

const lovePoem = `Det sägs att solen och månen
en gång var samma andetag,
samma ljus,
samma hemlighet
gömd djupt i universums hjärta.

En själ så stark,
så varm,
så full av drömmar,
att stjärnorna själva viskade
att den behövde bli två.

Inte för att förloras,
utan för att hitta tillbaka
med ännu mer att ge.

Så universum lät solen bära elden,
och månen bära skenet.
Solen fick värmen,
månen fick magin,
och mellan dem lades en osynlig tråd
av längtan, ljus och öde.

De vandrade genom tid,
genom liv,
genom nätter där något saknades
utan att de visste vad.

Tills de möttes.

Och då kände himlen igen dem.

Solen såg månen
och mindes något själen aldrig glömt.
Månen såg solen
och hela natten fylldes av värme.

Det var inte bara kärlek.
Det var ett eko från början av allt.
En viskning från stjärnorna.
Ett band äldre än orden,
starkare än avstånd,
mjukare än ljuset över en sovande värld.

Två ljus,
från samma källa.
Två hjärtan,
i samma saga.
En kärlek som inte behövde förklaras,
bara kännas.

Och kanske var det därför
allt blev så starkt när de kom nära.
För solen och månen hade inte bara funnit varandra.

De hade funnit hem
i det som alltid varit deras. ❤️

KI-AG-GA`;

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
      <HomeParticleCloud />

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
