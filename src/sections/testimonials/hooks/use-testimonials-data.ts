"use client";

import { useTranslations } from "next-intl";
import { type TestimonialRecord } from "../testimonials.data";

export function useTestimonialsData(): TestimonialRecord[] {
  const t = useTranslations("home.testimonials");

  return [
    {
      quote: t("quotes.0.text"),
      author: {
        name: t("quotes.0.author.name"),
        designation: t("quotes.0.author.designation"),
      },
    },
    {
      quote: t("quotes.1.text"),
      author: {
        name: t("quotes.1.author.name"),
        designation: t("quotes.1.author.designation"),
      },
    },
    {
      quote: t("quotes.2.text"),
      author: {
        name: t("quotes.2.author.name"),
        designation: t("quotes.2.author.designation"),
      },
    },
  ];
}
