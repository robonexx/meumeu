'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import SunCalc from 'suncalc';
import styles from './CurrentMoonPhase3D.module.scss';

const { getMoonIllumination, getMoonPosition } = SunCalc;

type MoonPhase = {
  start: number;
  end: number;
  phase: string;
  emoji: string;
};

type MoonInfo = {
  phase: number;
  fraction: number;
  phaseName: string;
  emoji: string;
  distance: string;
  nextFullMoon: Date;
  earthshineIntensity: number;
  light: THREE.Vector3;
};

type PhaseEvent = {
  label: string;
  emoji: string;
  targetPhase: number;
  date: Date;
};

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const STOCKHOLM_LAT = 59.3293;
const STOCKHOLM_LON = 18.0686;

// Same baked visual settings as the moon-phase repo.
const DEFAULT_ROT_X_DEG = -72.4;
const DEFAULT_ROT_Y_DEG = 154;
const DEFAULT_ROT_Z_DEG = -71.3;
const MOON_BASE_ROTATION_Y = Math.PI / 2;
const DEFAULT_DISPLACEMENT_SCALE = 0.03;
const DEFAULT_DISPLACEMENT_BIAS = 0;
const MOON_BUMP_SCALE = 3;
const MOON_BLACK_POINT = 0.06;
const MOON_WHITE_POINT = 1.0;
const MOON_SATURATION = 1.0;
const MOON_VIBRANCE = -0.44;
const LIGHT_INTENSITY = 3.2;
const HEMISPHERE_LIGHT_INTENSITY = 0.003;
const CAMERA_FOV_DEG = 0.5;
const CAMERA_DISTANCE = 1040;
const CAMERA_DISTANCE_MOBILE = 1500;
const MOBILE_BREAKPOINT = 768;

const moonPhases: MoonPhase[] = [
  { start: 0.0, end: 0.02, phase: 'New Moon', emoji: '🌑' },
  { start: 0.02, end: 0.25, phase: 'Waxing Crescent', emoji: '🌒' },
  { start: 0.25, end: 0.27, phase: 'First Quarter', emoji: '🌓' },
  { start: 0.27, end: 0.5, phase: 'Waxing Gibbous', emoji: '🌔' },
  { start: 0.5, end: 0.52, phase: 'Full Moon', emoji: '🌕' },
  { start: 0.52, end: 0.75, phase: 'Waning Gibbous', emoji: '🌖' },
  { start: 0.75, end: 0.77, phase: 'Last Quarter', emoji: '🌗' },
  { start: 0.77, end: 1.0, phase: 'Waning Crescent', emoji: '🌘' },
];

const PHASE_EVENTS = [
  { label: 'New Moon', emoji: '🌑', targetPhase: 0.0 },
  { label: 'First Quarter', emoji: '🌓', targetPhase: 0.25 },
  { label: 'Full Moon', emoji: '🌕', targetPhase: 0.5 },
  { label: 'Last Quarter', emoji: '🌗', targetPhase: 0.75 },
];

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function phaseDistance(a: number, b: number) {
  const d = Math.abs(a - b);
  return Math.min(d, 1 - d);
}

function findNearestPhaseTime(center: Date, targetPhase: number, windowDays = 16) {
  const startMs = center.getTime() - windowDays * MS_PER_DAY;
  const endMs = center.getTime() + windowDays * MS_PER_DAY;
  const stepMs = MS_PER_HOUR;

  let bestTimeMs = startMs;
  let bestDist = Number.POSITIVE_INFINITY;

  for (let t = startMs; t <= endMs; t += stepMs) {
    const p = getMoonIllumination(new Date(t)).phase;
    const dist = phaseDistance(p, targetPhase);
    if (dist < bestDist) {
      bestDist = dist;
      bestTimeMs = t;
    }
  }

  let refineStep = stepMs / 2;
  for (let i = 0; i < 14; i++) {
    const left = bestTimeMs - refineStep;
    const right = bestTimeMs + refineStep;
    const pLeft = getMoonIllumination(new Date(left)).phase;
    const pRight = getMoonIllumination(new Date(right)).phase;
    const dLeft = phaseDistance(pLeft, targetPhase);
    const dRight = phaseDistance(pRight, targetPhase);

    if (dLeft < bestDist) {
      bestDist = dLeft;
      bestTimeMs = left;
    }
    if (dRight < bestDist) {
      bestDist = dRight;
      bestTimeMs = right;
    }
    refineStep /= 2;
  }

  return new Date(bestTimeMs);
}

function computePhaseEvents(center: Date): PhaseEvent[] {
  return PHASE_EVENTS.map((def) => ({
    ...def,
    date: findNearestPhaseTime(center, def.targetPhase),
  })).sort((a, b) => a.date.getTime() - b.date.getTime());
}

function nextFullMoon(center: Date) {
  const now = center.getTime();
  const events = computePhaseEvents(center);
  const upcoming = events.find((event) => event.label === 'Full Moon' && event.date.getTime() >= now);
  return upcoming?.date ?? findNearestPhaseTime(new Date(now + 15 * MS_PER_DAY), 0.5);
}

function formatDateTime(date: Date, includeTime = false) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' } : {}),
  }).format(date);
}

function getCameraDistance() {
  if (typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT) return CAMERA_DISTANCE_MOBILE;
  return CAMERA_DISTANCE;
}

function buildMoonInfo(date: Date): MoonInfo {
  const illumination = getMoonIllumination(date);
  const moonPos = getMoonPosition(date, STOCKHOLM_LAT, STOCKHOLM_LON);
  const phaseAge = Number(illumination.phase.toFixed(2));
  const currentPhase = moonPhases.find((phase) => phaseAge >= phase.start && phaseAge < phase.end) ?? moonPhases[0];

  // Direct port of the repo's phase-light calculation. This is what creates the visible dark side/terminator.
  const fraction = Math.min(1, Math.max(0, illumination.fraction));
  const phaseAngle = Math.acos(2 * fraction - 1);
  const earthshineIntensity = 0.035 * Math.pow(1 - fraction, 2.3);
  const limbAngle = illumination.angle - moonPos.parallacticAngle;
  const inPlane = Math.sin(phaseAngle);
  const lightDistance = 10;

  return {
    phase: illumination.phase,
    fraction,
    phaseName: currentPhase.phase,
    emoji: currentPhase.emoji,
    distance: Math.round(moonPos.distance).toLocaleString('sv-SE'),
    nextFullMoon: nextFullMoon(date),
    earthshineIntensity,
    light: new THREE.Vector3(
      -Math.sin(limbAngle) * inPlane * lightDistance,
      Math.cos(limbAngle) * inPlane * lightDistance,
      Math.cos(phaseAngle) * lightDistance,
    ),
  };
}

export default function CurrentMoonPhase3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const moonInfoRef = useRef<MoonInfo>(buildMoonInfo(new Date()));
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const moonInfo = useMemo(() => buildMoonInfo(now), [now]);

  useEffect(() => {
    moonInfoRef.current = moonInfo;
  }, [moonInfo]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV_DEG, 1, 0.1, 1600);
    camera.position.z = getCameraDistance();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/img/lroc_color_16bit_srgb_8k.webp');
    const displacementMap = textureLoader.load('/img/ldem_16_uint.webp');
    texture.colorSpace = THREE.SRGBColorSpace;
    displacementMap.colorSpace = THREE.NoColorSpace;

    const maxAniso = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
    texture.anisotropy = maxAniso;

    const geometry = new THREE.SphereGeometry(2, 96, 96);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      displacementMap,
      displacementScale: DEFAULT_DISPLACEMENT_SCALE,
      displacementBias: DEFAULT_DISPLACEMENT_BIAS,
      bumpMap: displacementMap,
      bumpScale: MOON_BUMP_SCALE,
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(0x332f3d),
      emissiveIntensity: moonInfoRef.current.earthshineIntensity,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uMoonBlackPoint = { value: MOON_BLACK_POINT };
      shader.uniforms.uMoonWhitePoint = { value: MOON_WHITE_POINT };
      shader.uniforms.uMoonSaturation = { value: MOON_SATURATION };
      shader.uniforms.uMoonVibrance = { value: MOON_VIBRANCE };

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        'uniform float uMoonBlackPoint;\nuniform float uMoonWhitePoint;\nuniform float uMoonSaturation;\nuniform float uMoonVibrance;\nvoid main() {'
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        [
          '#include <map_fragment>',
          'float denom = max(0.0001, (uMoonWhitePoint - uMoonBlackPoint));',
          'diffuseColor.rgb = clamp((diffuseColor.rgb - uMoonBlackPoint) / denom, 0.0, 1.0);',
          'vec3 c = diffuseColor.rgb;',
          'float maxc = max(c.r, max(c.g, c.b));',
          'float minc = min(c.r, min(c.g, c.b));',
          'float satAmount = maxc - minc;',
          'float vibFactor = clamp(1.0 + uMoonVibrance * (1.0 - satAmount), 0.0, 3.0);',
          'float satFinal = clamp(uMoonSaturation * vibFactor, 0.0, 3.0);',
          'float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));',
          'diffuseColor.rgb = mix(vec3(luma), c, satFinal);',
        ].join('\n')
      );
    };

    const moon = new THREE.Mesh(geometry, material);
    moon.rotation.set(
      degToRad(DEFAULT_ROT_X_DEG),
      MOON_BASE_ROTATION_Y + degToRad(DEFAULT_ROT_Y_DEG),
      degToRad(DEFAULT_ROT_Z_DEG),
    );
    scene.add(moon);

    const light = new THREE.DirectionalLight(0xffffff, LIGHT_INTENSITY);
    light.position.copy(moonInfoRef.current.light);
    light.target.position.set(0, 0, 0);
    scene.add(light.target);
    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, HEMISPHERE_LIGHT_INTENSITY);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    scene.add(hemiLight);

    const stars = new THREE.BufferGeometry();
    const starCount = 220;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = -Math.random() * 3 - 1;
    }
    stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.006, transparent: true, opacity: 0.58 });
    const starField = new THREE.Points(stars, starMaterial);
    scene.add(starField);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const current = moonInfoRef.current;
      light.position.copy(current.light);
      light.target.updateMatrixWorld();
      material.emissiveIntensity = current.earthshineIntensity;
      moon.rotation.set(
        degToRad(DEFAULT_ROT_X_DEG),
        MOON_BASE_ROTATION_Y + degToRad(DEFAULT_ROT_Y_DEG),
        degToRad(DEFAULT_ROT_Z_DEG),
      );
      starField.rotation.z += 0.0002;
      renderer.render(scene, camera);
    };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = getCameraDistance();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
      texture.dispose();
      displacementMap.dispose();
      stars.dispose();
      starMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section className={styles.moonPanel} aria-label='Aktuell månfas'>
      <div className={styles.canvasWrap} ref={mountRef} />
      <div className={styles.infoCard}>
        <span className={styles.eyebrow}>Aktuell månfas · svensk tid</span>
        <h2><span>{moonInfo.emoji}</span>{moonInfo.phaseName}</h2>
        <div className={styles.metaGrid}>
          <div>
            <span>Datum / tid</span>
            <strong>{formatDateTime(now, true)}</strong>
          </div>
          <div>
            <span>Upplyst</span>
            <strong>{(moonInfo.fraction * 100).toFixed(2)}%</strong>
          </div>
          <div>
            <span>Avstånd</span>
            <strong>{moonInfo.distance} km</strong>
          </div>
          <div>
            <span>Nästa fullmåne</span>
            <strong>{formatDateTime(moonInfo.nextFullMoon, true)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
