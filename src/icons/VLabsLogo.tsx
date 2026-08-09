import NextImage from 'next/image';

export type VLabsLogoProps = {
  sizePx?: number;
};

// VLabs logo loaded from public/vlabs-logo.svg.
// Uses next/image so it gets proper sizing and caching.
export function VLabsLogo({ sizePx = 40 }: VLabsLogoProps) {
  return (
    <NextImage
      alt="vlabs"
      height={sizePx}
      priority
      src="/vlabs-logo.svg"
      width={sizePx}
    />
  );
}
