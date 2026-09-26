import { Body } from "@/ui";
import { Container } from "@/ui/Container";

import { CardShape } from "../three-cards/CardShape";
import { CircuitModel } from "./CircuitModel";
import { type ExploreExperiment } from "./explore.data";

type Props = { featured: ExploreExperiment & { category: string } };

export function ExploreHero({ featured }: Props) {
  return (
    <section className="pt-[calc(var(--spacing-base)*10)] pb-[calc(var(--spacing-base)*7)]">
      <Container>
        {/* Centered content column — background stays full-width */}
        <div className="max-w-[860px] mx-auto">
          <div
            className={[
              "grid items-stretch gap-[calc(var(--spacing-base)*7)] grid-cols-1",
              "min-[921px]:gap-[calc(var(--spacing-base)*10)] min-[921px]:grid-cols-[1fr_320px]",
            ].join(" ")}
          >
            {/* Left: heading flush-top, rules + body flush-bottom */}
            <div className="flex flex-col justify-between">
              <div>
                <h1
                  className={[
                    "text-[var(--ink)]",
                    "font-[family-name:var(--font-inria),serif]",
                    "font-light tracking-[-0.07em] leading-[1.15] max-w-[22ch]",
                  ].join(" ")}
                  style={{
                    fontSize: "clamp(1.35rem, 0.85rem + 2.1vw, 2.1rem)",
                  }}
                >
                  Explore all the tools you want here, watch all tutorials step
                  by step, enjoy your 3D experience.
                </h1>
              </div>

              <div className="flex flex-col">
                <div
                  className="border-t border-dashed border-[var(--divider)] h-0 w-full"
                  aria-hidden
                />
                <div className="py-[calc(var(--spacing-base)*4)] max-w-[52ch]">
                  <Body size="sm" muted>
                    Browse every circuit, component, and lab organised by
                    semester. Each card ships with a live 3D scene you can drag
                    and rotate — no installation required.
                  </Body>
                </div>
                <div
                  className="border-t border-dashed border-[var(--divider)] h-0 w-full"
                  aria-hidden
                />
              </div>
            </div>

            {/* Right: featured card */}
            <div className="relative flex flex-col gap-[calc(var(--spacing-base)*2)] isolate overflow-hidden p-[calc(var(--spacing-base)*3)] pb-0 pt-[calc(var(--spacing-base)*3)]">
              <CardShape />
              <p className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[0.8rem] font-medium leading-[1.3] m-0">
                Try {featured.title}
              </p>
              <div
                className="border-t border-dotted border-[var(--divider)] h-0 w-full"
                aria-hidden
              />
              <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[0.75rem] leading-[1.85] m-0">
                {featured.description}
              </p>
              <div className="flex-1 h-[200px] -mx-[calc(var(--spacing-base)*3)] overflow-hidden">
                <CircuitModel circuitId={featured.circuitId} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
