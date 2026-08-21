const DEFAULT_SITE_URL = 'https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat';

export const getSiteUrl = (): string => {
  const configured = process.env.NEXT_PUBLIC_WEBSITE_URL;
  if (configured === undefined || configured === '') return DEFAULT_SITE_URL;
  return configured.endsWith('/') ? configured.slice(0, -1) : configured;
};
