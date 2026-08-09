'use client';

import dynamic from 'next/dynamic';
export type { EceComponentKind } from './EceComponentViewer';

export const EceViewer = dynamic(
  () => import('./EceComponentViewer').then((m) => m.EceComponentViewer),
  { ssr: false },
);
