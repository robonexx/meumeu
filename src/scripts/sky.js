// scripts/sky.js
import { gsap } from 'gsap';
// scripts/sky.js
export function initSky() {
  const STAR_COUNT = 140;
  const MIN_DUR = 0.5;
  const MAX_DUR = 1.0;
  const DARK_BG =
    'linear-gradient(99.9deg, rgb(30, 23, 32) 21.2%, rgb(39, 13, 62) 84.8%)';
  const SUNSET_BG = 'linear-gradient(to right, #241e2e, #0e0624)';

  const rand = (min, max) => min + Math.random() * (max - min);

  const stars = buildStars(STAR_COUNT);
  wireButtons();

  function buildStars(count) {
    const host = getUnderlay();
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.style.top = Math.random() * 100 + '%';
      s.style.left = Math.random() * 100 + '%';
      s.style.animation = `star-blink ${rand(2, 6)}s ease-in-out infinite`;
      frag.appendChild(s);
    }

    host.appendChild(frag);
    return host.querySelectorAll('.star');
  }

  function getUnderlay() {
    let u = document.querySelector('.underlay');
    if (!u) {
      u = document.createElement('div');
      u.className = 'underlay';
      document.body.prepend(u);
    }
    return u;
  }

  function wireButtons() {
    document.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('mouseenter', () => swapBg(DARK_BG, '#ededed80'));
      btn.addEventListener('touchstart', () => swapBg(DARK_BG, '#ededed80'));
      btn.addEventListener('mouseleave', () => swapBg(SUNSET_BG, '#18181880'));
      btn.addEventListener('touchend', () => swapBg(SUNSET_BG, '#18181880'));
    });
  }

  function swapBg(gradient, h1Colour) {
    document.body.style.background = gradient;
    const h1 = document.querySelector('h1');
    if (h1) h1.style.color = h1Colour;
  }
}
