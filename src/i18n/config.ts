export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

export const localeLabels: Record<Locale, { native: string; english: string }> =
  {
    en: {
      native: "English",
      english: "English",
    },
    hi: {
      native: "हिन्दी",
      english: "Hindi",
    },
  };
