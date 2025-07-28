'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './Hero.module.scss';

const Hero = () => {
  const heroRef = useRef(null);
  const instaRef = useRef(null);
  const title2Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(heroRef.current, {
      opacity: 1,
      duration: 0.6,
      height: 'calc(100svh - 160px)',
      ease: 'power3.out',
    });
    tl.to(instaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
    tl.to(title2Ref.current, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
    tl.to(buttonRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className={styles.abouthero} ref={heroRef}>
      <div className={styles.name} ref={instaRef}>
        {' '}
        <p>Minun Rakkaani</p>
      </div>
      <div className={styles.header}>
        <div className={styles.title} ref={title2Ref}>
          <span className={styles.text}>Meu coração, minha lua,</span> <br />
          Quando você não está, sinto sua falta.
          <br />
          <span className={styles.text}>Quero te abraçar, te beijar,</span>
          <br />E nunca mais te deixar.
        </div>

        <Link href='/gallery/#photos'>
          <button className={styles.btn} ref={buttonRef}>
            Gallery
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
