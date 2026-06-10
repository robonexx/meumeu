'use client';

import { useEffect, useState } from 'react';
import CelestialPoemExperience from '../components/CelestialPoemExperience';

export default function MoonPage() {
  const [isRob, setIsRob] = useState(false);

  useEffect(() => {
    setIsRob(localStorage.getItem('user') === process.env.NEXT_PUBLIC_ROB_USER);
  }, []);

  return (
    <CelestialPoemExperience
      category='moon'
      author='Rob'
      canEdit={isRob}
      introLabel='The Moon Page · poems from the Sun'
      emptyTitle='The Moon is waiting'
      emptyText='Ännu vilar denna himmel i tystnad. Snart fylls den av ord, ljus och hemligheter skrivna från solen till månen.'
    />
  );
}
