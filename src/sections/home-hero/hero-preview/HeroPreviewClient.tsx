'use client';

import dynamic from 'next/dynamic';

export const HeroPreviewClient = dynamic(
  () => import('./HeroPreview').then((m) => m.HeroPreview),
  { ssr: false },
);
