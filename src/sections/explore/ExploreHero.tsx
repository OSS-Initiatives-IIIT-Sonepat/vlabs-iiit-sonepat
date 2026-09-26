import { Body } from "@/ui";
import { Container } from "@/ui/Container";

import { CardShape } from "../three-cards/CardShape";
import { CircuitModel } from "./CircuitModel";
import { type ExploreExperiment } from "./explore.data";

// ── Component ─────────────────────────────────────────────────────────────
type Props = { featured: ExploreExperiment & { category: string } };

export function ExploreHero({ featured }: Props) {
  return (
    <section className="pt-[calc(var(--spacing-base)*14)] pb-[calc(var(--spacing-base)*10)]">
      <Container>
        <div
          className={[
            "grid items-stretch gap-[calc(var(--spacing-base)*10)] grid-cols-1",
            "min-[921px]:gap-[calc(var(--spacing-base)*14)] min-[921px]:grid-cols-[1fr_420px]",
          ].join(" ")}
        >
          {/* Left: heading flush-top, rules + body flush-bottom */}
          <div className="flex flex-col justify-between">
            <div>
              <h1
                className={[
                  "text-[var(--ink)]",
                  "font-[family-name:var(--font-inria),serif]",
                  "text-[clamp(1.75rem,1.1rem+2.8vw,2.75rem)]",
                  "font-light tracking-[-0.07em] leading-[1.15] max-w-[22ch]",
                ].join(" ")}
              >
                Explore all the tools you want here, watch all tutorials step by
                step, enjoy your 3D experience.
              </h1>
            </div>

            <div className="flex flex-col">
              <div
                className="border-t border-dashed border-[var(--divider)] h-0 w-full"
                aria-hidden
              />
              <div className="py-[calc(var(--spacing-base)*5)] max-w-[52ch]">
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

          {/* Right: featured card — larger, with 3D bleeding to bottom */}
          <div className="relative flex flex-col gap-[calc(var(--spacing-base)*3)] isolate overflow-hidden p-[calc(var(--spacing-base)*4)] pb-0 pt-[calc(var(--spacing-base)*4)]">
            <CardShape />
            <p className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[0.9rem] font-medium leading-[1.3] m-0">
              Try {featured.title}
            </p>
            <div
              className="border-t border-dotted border-[var(--divider)] h-0 w-full"
              aria-hidden
            />
            <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[0.8125rem] leading-[1.85] m-0">
              {featured.description}
            </p>
            <div className="flex-1 h-[260px] -mx-[calc(var(--spacing-base)*4)] overflow-hidden">
              <CircuitModel circuitId={featured.circuitId} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
