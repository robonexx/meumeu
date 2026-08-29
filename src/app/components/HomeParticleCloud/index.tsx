'use client';

import { useEffect, useRef } from 'react';

type StarParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  drift: number;
};

type WordParticle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  phase: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  alpha: number;
};

export default function HomeParticleCloud() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    mount.appendChild(canvas);

    const stars: StarParticle[] = [];
    const wordParticles: WordParticle[] = [];
    const sparks: Spark[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let width = 0;
    let height = 0;
    let dpr = 1;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const createGalaxy = () => {
      stars.length = 0;
      const isMobile = width < 760;
      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const maxRadius = Math.min(width, height) * (isMobile ? 0.36 : 0.48);
      const particleCount = isMobile ? 520 : 1400;

      for (let i = 0; i < particleCount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.9) * maxRadius;

        const x = centerX + Math.cos(angle + radius * 0.04) * radius + (Math.random() - 0.5) * (isMobile ? 36 : 80);
        const y = centerY + Math.sin(angle + radius * 0.04) * radius * 0.8 + (Math.random() - 0.5) * (isMobile ? 28 : 60);

        stars.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: (isMobile ? 0.8 : 1.2) + Math.random() * (isMobile ? 1.1 : 1.8),
          alpha: Math.random() * 0.7 + 0.18,
          drift: Math.random() * 1.8 + 0.2,
        });
      }
    };

    const createWordParticles = () => {
      wordParticles.length = 0;

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const fontSize = Math.min(width, height) * 0.17;
      offscreen.width = width * 0.9;
      offscreen.height = height * 0.38;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.font = `700 ${fontSize}px Georgia, serif`;
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText('KI-AG-GA', offscreen.width * 0.5, offscreen.height * 0.52);

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;
      const step = 4;
      const offsetX = (width - offscreen.width) * 0.5;
      const offsetY = height * 0.28;

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const index = (y * offscreen.width + x) * 4;
          const alpha = imageData[index + 3];
          if (alpha > 32) {
            const px = offsetX + x;
            const py = offsetY + y;
            const scatter = 12 + Math.random() * 24;

            wordParticles.push({
              x: px + (Math.random() - 0.5) * scatter,
              y: py + (Math.random() - 0.5) * scatter,
              tx: px,
              ty: py,
              size: 1.3 + Math.random() * 1.7,
              alpha: 0.08 + Math.random() * 0.2,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    };

    const spawnSpark = (x: number, y: number) => {
      for (let i = 0; i < 8; i += 1) {
        sparks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.9,
          vy: -0.35 - Math.random() * 0.9,
          life: 30 + Math.random() * 26,
          size: 0.8 + Math.random() * 1.6,
          alpha: 0.35 + Math.random() * 0.5,
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 760) return;
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      spawnSpark(event.clientX, event.clientY);
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createGalaxy();
      createWordParticles();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);

    const getRevealProgress = () => {
      const section = document.querySelector('.homeLoveSection');
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const visible = clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight), 0, 1);
      return visible;
    };

    const render = (time: number) => {
      const t = time * 0.001;
      const reveal = getRevealProgress();
      const isMobile = width < 760;
      const parallaxX = (pointer.tx - width * 0.5) * (isMobile ? 0.02 : 0.07);
      const parallaxY = (pointer.ty - height * 0.5) * (isMobile ? 0.015 : 0.05);
      const windX = Math.sin(t * 0.75) * (isMobile ? 0.15 : 0.35) + (pointer.x - pointer.tx) * (isMobile ? 0.0015 : 0.006);
      const windY = Math.cos(t * 0.9) * (isMobile ? 0.14 : 0.28) + (pointer.y - pointer.ty) * (isMobile ? 0.0015 : 0.006);

      pointer.x += (pointer.tx - pointer.x) * (isMobile ? 0.015 : 0.04);
      pointer.y += (pointer.ty - pointer.y) * (isMobile ? 0.015 : 0.04);

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.52 + parallaxX,
        height * 0.45 + parallaxY,
        20,
        width * 0.52 + parallaxX,
        height * 0.45 + parallaxY,
        Math.max(width, height) * 0.75,
      );
      glow.addColorStop(0, 'rgba(255,255,255,0.08)');
      glow.addColorStop(0.25, 'rgba(200,200,200,0.06)');
      glow.addColorStop(1, 'rgba(5,5,8,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const orbitX = Math.cos(t * 0.25 * star.drift + i * 0.013) * 18;
        const orbitY = Math.sin(t * 0.2 * star.drift + i * 0.017) * 16;

        star.x += (star.vx + windX * 0.18) * 1.8;
        star.y += (star.vy + windY * 0.18) * 1.8;

        let finalX = star.x + orbitX + parallaxX * 0.45;
        let finalY = star.y + orbitY + parallaxY * 0.3;

        if (finalX < -60) finalX = width + 60;
        if (finalX > width + 60) finalX = -60;
        if (finalY < -60) finalY = height + 60;
        if (finalY > height + 60) finalY = -60;

        star.x = finalX - orbitX - parallaxX * 0.45;
        star.y = finalY - orbitY - parallaxY * 0.3;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        spark.x += spark.vx + windX * 0.6;
        spark.y += spark.vy + windY * 0.6;
        spark.life -= 1;
        spark.alpha *= 0.97;

        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${spark.alpha})`;
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const revealStrength = clamp((reveal - 0.08) / 0.92, 0, 1);

      for (let i = 0; i < wordParticles.length; i += 1) {
        const particle = wordParticles[i];
        const driftX = Math.sin(t * 0.9 + particle.phase) * (isMobile ? 0.8 : 1.5);
        const driftY = Math.cos(t * 1.15 + particle.phase) * (isMobile ? 0.7 : 1.3);

        const pivotX = particle.tx + parallaxX * 0.65 + driftX;
        const pivotY = particle.ty + parallaxY * 0.5 + driftY;
        const settle = 0.015 + revealStrength * (isMobile ? 0.065 : 0.09);

        particle.x += (pivotX - particle.x) * settle + windX * (isMobile ? 0.08 : 0.18);
        particle.y += (pivotY - particle.y) * settle + windY * (isMobile ? 0.08 : 0.18);

        const alpha = particle.alpha + revealStrength * 0.75;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(particle.x, particle.y, particle.size + revealStrength * (isMobile ? 0.35 : 0.7), 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.remove();
    };
  }, []);

  return <div ref={mountRef} className='homeParticleCloud' aria-hidden='true' />;
}
