'use client';

import { useEffect, useState } from 'react';
import CelestialPoemExperience from '../components/CelestialPoemExperience';

export default function SunPage() {
  const [isErika, setIsErika] = useState(false);

  useEffect(() => {
    setIsErika(localStorage.getItem('user') === process.env.NEXT_PUBLIC_ERIKA_USER);
  }, []);

  return (
    <CelestialPoemExperience
      category='sun'
      author='Erika'
      canEdit={isErika}
      introLabel='The Sun Page · letters back to the light'
      emptyTitle='The Sun is glowing'
      emptyText='Här vilar en gyllene plats för värme, svar och minnen som ännu väntar på att få börja lysa.'
    />
  );
}
