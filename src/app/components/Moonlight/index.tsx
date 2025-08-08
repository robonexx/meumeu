"use client";

import { useEffect, useRef } from "react";
import styles from "./Moonlight.module.scss";

export default function Moonlight() {
  const bgRef = useRef<HTMLImageElement | null>(null);
  const moonRef = useRef<HTMLImageElement | null>(null);
  const mountainRef = useRef<HTMLImageElement | null>(null);
  const roadRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const value = window.scrollY;

      // translate for better perf vs changing top/left
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${value * 0.5}px)`;
      }
      if (moonRef.current) {
        moonRef.current.style.transform = `translateX(${value * -0.5}px)`;
      }
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translateY(${value * -0.15}px)`;
      }
      if (roadRef.current) {
        roadRef.current.style.transform = `translateY(${value * 0.15}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${value * 1}px)`;
      }
    };

    // run once in case user isn't at top
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <img
          ref={bgRef}
          src="https://i.postimg.cc/C5qnCdY9/bg.jpg"
          alt="Background"
          className={styles.layer}
        />
        <img
          ref={moonRef}
          src="https://i.postimg.cc/F1XdTmHz/moon.png"
          alt="Moon"
          className={styles.layer}
        />
        <img
          ref={mountainRef}
          src="https://i.postimg.cc/ZKNM7hcS/mountain.png"
          alt="Mountain"
          className={styles.layer}
        />
        <img
          ref={roadRef}
          src="https://i.postimg.cc/qvdZWZbC/road.png"
          alt="Road"
          className={`${styles.layer} ${styles.road}`}
        />
        <h2 ref={textRef} className={styles.text}>Meu Meu </h2>
      </section>
    </div>
  );
}
