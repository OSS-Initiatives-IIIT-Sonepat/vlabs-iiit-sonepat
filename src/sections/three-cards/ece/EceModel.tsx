'use client';

import dynamic from 'next/dynamic';
import { type EceKind } from './EceScene';

export type { EceKind };

// Three.js must not run on the server
export const EceModel = dynamic(
  () => import('./EceScene').then((m) => m.EceScene),
  { ssr: false },
);
