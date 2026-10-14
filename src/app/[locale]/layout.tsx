import localFont from "next/font/local";
import { Inria_Serif } from "next/font/google";
import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import "../globals.css";

const hostGrotesk = localFont({
  src: "../../../public/fonts/host-grotesk-latin-variable.woff2",
  weight: "300 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

const aleo = localFont({
  src: "../../../public/fonts/aleo-latin-300.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
});

const azeretMono = localFont({
  src: "../../../public/fonts/azeret-mono-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
});

const vt323 = localFont({
  src: "../../../public/fonts/vt323-latin-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-retro",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../../../public/fonts/inter-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-product",
  display: "swap",
});

const inriaSerif = Inria_Serif({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inria",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${hostGrotesk.variable} ${aleo.variable} ${azeretMono.variable} ${vt323.variable} ${inter.variable} ${inriaSerif.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
