'use client';

import { useState, useEffect } from 'react';
import Splash from '../app/components/splash';

export default function ClientAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(localStorage.getItem('authenticated') === 'true');
  }, []);

  if (!authenticated) return <Splash />;
  return <>{children}</>;
}
