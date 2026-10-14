"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "@/icons";
import { useState } from "react";

import { semanticColor, typeRampDeclarations } from "@/tokens";
import { EceViewer } from "@/labs/previews/EceViewer";
import { Body, Eyebrow, IconButton, MarkedDivider } from "@/ui";

import { type TestimonialRecord } from "./testimonials.data";

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: readonly TestimonialRecord[];
}) {
  const t = useTranslations("home.testimonials");
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const hasPrevious = index > 0;
  const hasNext = index < total - 1;
  const current = testimonials[index];

  // Pre-extract type ramp values
  const headingMdFontSize =
    typeRampDeclarations("headingMd").match(/font-size:\s*(.+?);/)?.[1];
  const headingMdLineHeight = typeRampDeclarations("headingMd").match(
    /line-height:\s*(.+?);/,
  )?.[1];

  return (
    <div
      className="grid grid-cols-1 relative gap-y-[calc(var(--spacing-base)*6)] z-0 min-[921px]:items-stretch min-[921px]:gap-x-[calc(var(--spacing-base)*15)] min-[921px]:grid-cols-[auto_auto_minmax(0,1fr)] min-[921px]:gap-y-0"
      aria-label="Testimonials"
      aria-roledescription="carousel"
      role="region"
    >
      {/* LeftColumn */}
      <div className="items-center gap-x-[calc(var(--spacing-base)*4)] grid grid-cols-[auto_1fr] min-[921px]:grid-cols-1 min-[921px]:grid-rows-[auto_auto] min-[921px]:gap-y-[calc(var(--spacing-base)*12)]">
        {/* CounterSlot */}
        <div className="order-1 min-[921px]:order-2">
          <p
            className="font-[var(--font-sans),sans-serif] font-light whitespace-nowrap min-[921px]:text-center"
            style={{
              fontSize: headingMdFontSize,
              lineHeight: headingMdLineHeight,
            }}
            aria-live="polite"
          >
            {index + 1}/{total}
          </p>
        </div>
        {/* VisualSlot */}
        <div
          className="self-start justify-self-start order-2 h-[279px] w-[198px] min-[921px]:h-[476px] min-[921px]:order-1 min-[921px]:w-[336px]"
          data-illustration="battery"
        >
          <EceViewer kind="battery" background="#f7f6f3" />
        </div>
      </div>

      {/* SeparatorSlot */}
      <div
        className="w-full min-[921px]:h-full min-[921px]:w-auto"
        style={
          {
            "--marked-divider-line": semanticColor.lineStrong,
          } as React.CSSProperties
        }
      >
        <MarkedDivider />
      </div>

      {/* RightColumn */}
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-w-0 gap-y-[calc(var(--spacing-base)*6)] min-[921px]:py-[calc(var(--spacing-base)*8)] min-[921px]:gap-y-[calc(var(--spacing-base)*14)]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        {/* QuoteStack */}
        <div className="grid">
          {testimonials.map((testimonial, testimonialIndex) => (
            <div
              className="[grid-area:1/1] opacity-0 pointer-events-none translate-y-[8px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] invisible data-[active]:opacity-100 data-[active]:pointer-events-auto data-[active]:translate-y-0 data-[active]:visible"
              data-active={testimonialIndex === index ? "" : undefined}
              key={testimonial.author.name}
            >
              <p
                className="font-[var(--font-sans),sans-serif] font-light text-wrap-balance"
                style={{
                  fontSize: headingMdFontSize,
                  lineHeight: headingMdLineHeight,
                }}
              >
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
        {/* FooterRow */}
        <div className="items-start self-end grid grid-cols-1 gap-y-[calc(var(--spacing-base)*4)] min-[921px]:items-center min-[921px]:grid-cols-[auto_1fr]">
          {/* NavGroup */}
          <div className="gap-x-[calc(var(--spacing-base)*2)] grid grid-flow-col justify-start order-2 min-[921px]:order-1">
            <IconButton
              ariaLabel={t("navigation.previous")}
              disabled={!hasPrevious}
              onClick={() => hasPrevious && setIndex(index - 1)}
              sizePx={48}
            >
              <ArrowLeft sizePx={14} />
            </IconButton>
            <IconButton
              ariaLabel={t("navigation.next")}
              disabled={!hasNext}
              onClick={() => hasNext && setIndex(index + 1)}
              sizePx={48}
            >
              <ArrowRight sizePx={14} />
            </IconButton>
          </div>
          {/* AuthorBlock */}
          <div className="grid grid-cols-1 justify-items-start order-1 gap-y-[calc(var(--spacing-base)*1)] text-left min-[921px]:justify-self-end min-[921px]:order-2">
            <Body size="sm" weight="medium">
              {current.author.name}
            </Body>
            <Body muted size="xs">
              {current.author.designation}
            </Body>
          </div>
        </div>
      </div>
    </div>
  );
}
