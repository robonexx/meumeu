'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './CurrentMoonPhase3D.module.scss';

const SYNODIC_MONTH = 29.53058867;
const NEW_MOON_REFERENCE_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);
const DAY = 1000 * 60 * 60 * 24;

type MoonInfo = {
  age: number;
  phase: number;
  illumination: number;
  name: string;
  nextFullMoon: Date;
};

function getMoonName(age: number) {
  if (age < 1.84566) return 'New Moon';
  if (age < 5.53699) return 'Waxing Crescent';
  if (age < 9.22831) return 'First Quarter';
  if (age < 12.91963) return 'Waxing Gibbous';
  if (age < 16.61096) return 'Full Moon';
  if (age < 20.30228) return 'Waning Gibbous';
  if (age < 23.99361) return 'Last Quarter';
  if (age < 27.68493) return 'Waning Crescent';
  return 'New Moon';
}

function calculateMoonInfo(date = new Date()): MoonInfo {
  const daysSinceReference = (date.getTime() - NEW_MOON_REFERENCE_UTC) / DAY;
  const rawAge = ((daysSinceReference % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const phase = rawAge / SYNODIC_MONTH;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  const fullMoonAge = SYNODIC_MONTH / 2;
  const daysUntilFullMoon = rawAge <= fullMoonAge
    ? fullMoonAge - rawAge
    : SYNODIC_MONTH - rawAge + fullMoonAge;

  return {
    age: rawAge,
    phase,
    illumination,
    name: getMoonName(rawAge),
    nextFullMoon: new Date(date.getTime() + daysUntilFullMoon * DAY),
  };
}

function formatStockholmDate(date: Date, includeTime = false) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Stockholm',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export default function CurrentMoonPhase3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const moonInfo = useMemo(() => calculateMoonInfo(now ?? new Date()), [now]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/moon.png');
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(1.48, 96, 96);
    const material = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 1,
      metalness: 0,
      bumpMap: moonTexture,
      bumpScale: 0.045,
    });

    const moon = new THREE.Mesh(geometry, material);
    moon.rotation.y = -0.65;
    moon.rotation.x = 0.12;
    scene.add(moon);

    const ambient = new THREE.AmbientLight(0xb8b2ff, 0.34);
    scene.add(ambient);

    const phaseAngle = moonInfo.phase * Math.PI * 2;
    const light = new THREE.DirectionalLight(0xfff0d1, 3.35);
    light.position.set(Math.sin(phaseAngle) * 4, 1.1, Math.cos(phaseAngle) * 4);
    scene.add(light);

    const rimLight = new THREE.PointLight(0xb9a6ff, 1.8, 10);
    rimLight.position.set(-2.6, -1.4, 2.5);
    scene.add(rimLight);

    const stars = new THREE.BufferGeometry();
    const starCount = 170;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = -Math.random() * 4 - 1;
    }
    stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.012, transparent: true, opacity: 0.78 });
    const starField = new THREE.Points(stars, starMaterial);
    scene.add(starField);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      moon.rotation.y += 0.0019;
      starField.rotation.z += 0.00045;
      renderer.render(scene, camera);
    };

    const resize = () => {
      if (!mount) return;
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      moonTexture.dispose();
      stars.dispose();
      starMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [moonInfo.phase]);

  return (
    <section className={styles.moonPanel} aria-label='Current moon phase'>
      <div className={styles.canvasWrap} ref={mountRef} />
      <div className={styles.infoCard}>
        <span className={styles.eyebrow}>Current moon phase</span>
        <h2>{moonInfo.name}</h2>
        <div className={styles.metaGrid}>
          <div>
            <span>Date / time</span>
            <strong>{now ? formatStockholmDate(now, true) : 'Loading...'}</strong>
          </div>
          <div>
            <span>Illumination</span>
            <strong>{Math.round(moonInfo.illumination * 100)}%</strong>
          </div>
          <div>
            <span>Moon age</span>
            <strong>{moonInfo.age.toFixed(1)} days</strong>
          </div>
          <div>
            <span>Next full moon</span>
            <strong>{formatStockholmDate(moonInfo.nextFullMoon)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
