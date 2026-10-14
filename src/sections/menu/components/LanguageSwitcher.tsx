"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeLabels, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        Language:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--ink)] transition-colors hover:border-[var(--border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabels[loc].native}
          </option>
        ))}
      </select>
    </div>
  );
}
