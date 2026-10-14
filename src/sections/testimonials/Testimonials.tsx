"use client";

import { NotchedCardShape, SectionShell } from "@/ui";

import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { useTestimonialsData } from "./hooks/use-testimonials-data";

export function Testimonials() {
  const testimonials = useTestimonialsData();

  return (
    <SectionShell
      background={<NotchedCardShape />}
      fullBleedBackground
      rhythm="spacious"
      scheme="muted"
    >
      <TestimonialsCarousel testimonials={testimonials} />
    </SectionShell>
  );
}
