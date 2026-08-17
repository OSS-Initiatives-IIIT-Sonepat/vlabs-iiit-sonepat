'use client';

import dynamic from 'next/dynamic';

// Three.js must not run on the server side
export const CircuitModel = dynamic(
  () => import('./CircuitScene').then((m) => m.CircuitScene),
  { ssr: false },
);
