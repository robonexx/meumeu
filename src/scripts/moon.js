// /scripts/moon.js
import SunCalc from 'suncalc';

export const getMoonPhase = (date = new Date()) => {
  const { phase } = SunCalc.getMoonIllumination(date);

  const index = Math.floor(phase * 8 + 0.5) % 8;

  const phases = [
    { src: 'newmoon.png', phase: 'New Moon', waning: false },
    { src: 'waxingcrescent.png', phase: 'Waxing Crescent', waning: false },
    { src: 'firstquarter.png', phase: 'First Quarter', waning: false },
    { src: 'waxinggibbous.png', phase: 'Waxing Gibbous', waning: false },
    { src: 'fullmoon.png', phase: 'Full Moon', waning: false },
    { src: 'waninggibbous.png', phase: 'Waning Gibbous', waning: true },
    { src: 'lastquarter.png', phase: 'Last Quarter', waning: true },
    { src: 'waningcrescent.png', phase: 'Waning Crescent', waning: true },
  ];

  const p = phases[index];
  return {
    src: `https://raw.githubusercontent.com/tallulahh/moon-phase/main/${p.src}`,
    phase: p.phase,
    waning: p.waning,
  };
};

export const swedenFullMoons2025 = [
  '2025-01-14',
  '2025-02-12',
  '2025-03-14',
  '2025-04-13',
  '2025-05-12',
  '2025-06-11',
  '2025-07-10',
  '2025-08-09',
  '2025-09-07',
  '2025-10-07',
  '2025-11-05',
  '2025-12-05',
];
