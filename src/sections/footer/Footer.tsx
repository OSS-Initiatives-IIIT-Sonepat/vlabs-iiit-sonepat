import { DiscordMark, GitHubMark, VLabsLogo } from "@/icons";
import { Container } from "@/ui";

// ── Colours (explicit — no scheme variables) ──────────────────────────────────
const RULE = "rgba(0,0,0,0.08)";

// ── Component ─────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="w-full bg-[#0f0e0d] pt-[calc(var(--spacing-base)*20)]">
      <div
        className={[
          "relative mx-auto w-full max-w-[1280px] bg-white",
          "border border-[rgba(0,0,0,0.08)] border-b-0",
          "[clip-path:polygon(32px_0%,100%_0%,100%_100%,0%_100%,0%_32px)]",
          "px-[calc(var(--spacing-base)*6)]",
          "min-[921px]:px-[calc(var(--spacing-base)*10)]",
        ].join(" ")}
      >
        {/* Notch corner accent line */}
        <svg
          aria-hidden
          className="absolute left-0 top-0 pointer-events-none"
          fill="none"
          height="33"
          width="33"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 1 L1 32" stroke={RULE} strokeWidth="1" />
        </svg>

        <div
          className={[
            "grid gap-[calc(var(--spacing-base)*12)] grid-cols-1",
            "pt-[calc(var(--spacing-base)*12)] pb-[calc(var(--spacing-base)*10)]",
            "min-[921px]:items-start min-[921px]:gap-[calc(var(--spacing-base)*8)]",
            "min-[921px]:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]",
            "min-[921px]:pt-[calc(var(--spacing-base)*14)] min-[921px]:pb-[calc(var(--spacing-base)*12)]",
          ].join(" ")}
        >
          {/* Brand */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)] max-w-[300px]">
            <VLabsLogo sizePx={30} />
            <p className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] leading-[1.65] m-0">
              Virtual ECE labs — explore components, build circuits, and learn
              electronics through interactive 3D.
            </p>
            <div className="flex gap-[calc(var(--spacing-base)*2)] mt-[calc(var(--spacing-base)*1)]">
              <a
                aria-label="GitHub"
                className={[
                  "inline-flex items-center justify-center w-9 h-9 no-underline",
                  "border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*1)]",
                  "text-[#6b6a68]",
                  "transition-[border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:border-[rgba(0,0,0,0.20)] hover:text-[#111110]",
                ].join(" ")}
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHubMark size={16} />
              </a>
              <a
                aria-label="Discord"
                className={[
                  "inline-flex items-center justify-center w-9 h-9 no-underline",
                  "border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*1)]",
                  "text-[#6b6a68]",
                  "transition-[border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:border-[rgba(0,0,0,0.20)] hover:text-[#111110]",
                ].join(" ")}
                href="https://discord.gg/5MaJbxFnm"
                rel="noopener noreferrer"
                target="_blank"
              >
                <DiscordMark size={16} />
              </a>
            </div>
          </div>

          {/* Labs */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)]">
            <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] m-0 uppercase">
              Labs
            </p>
            <div className="flex flex-col gap-[calc(var(--spacing-base)*3)]">
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/labs/half-adder"
              >
                Half Adder
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/labs/full-adder"
              >
                Full Adder
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/labs/sr-latch"
              >
                SR Latch
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/labs/logic-gates"
              >
                Logic Gates
              </a>
            </div>
          </div>

          {/* Components */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)]">
            <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] m-0 uppercase">
              Components
            </p>
            <div className="flex flex-col gap-[calc(var(--spacing-base)*3)]">
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/components/breadboard"
              >
                Breadboard
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/components/resistors"
              >
                Resistors
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/components/capacitors"
              >
                Capacitors
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/components/leds"
              >
                LEDs
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/components/ics-gates"
              >
                ICs &amp; Gates
              </a>
            </div>
          </div>

          {/* Project */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)]">
            <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] m-0 uppercase">
              Project
            </p>
            <div className="flex flex-col gap-[calc(var(--spacing-base)*3)]">
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/blog"
              >
                Blog
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="/community"
              >
                Community
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub ↗
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="https://discord.gg/5MaJbxFnm"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord ↗
              </a>
              <a
                className="text-[#6b6a68] font-[family-name:var(--font-sans),sans-serif] text-[15px] no-underline w-fit transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#111110]"
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat/blob/master/CONTRIBUTING.md"
                rel="noopener noreferrer"
                target="_blank"
              >
                Contributing ↗
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(0,0,0,0.08)]" />

        <div
          className={[
            "flex flex-col items-center justify-between",
            "gap-[calc(var(--spacing-base)*4)]",
            "pb-[calc(var(--spacing-base)*10)] pt-[calc(var(--spacing-base)*6)]",
            "min-[921px]:flex-row min-[921px]:gap-0",
          ].join(" ")}
        >
          <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[13px] m-0">
            © 2026 vlabs — open source ECE labs
          </p>
          {/* <span
            className={[
              'inline-flex items-center gap-[calc(var(--spacing-base)*2)]',
              'border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*5)]',
              'text-[#a8a7a4] font-[family-name:var(--font-mono),monospace] text-[11px]',
              'tracking-[0.04em] px-[calc(var(--spacing-base)*3)] py-[calc(var(--spacing-base)*1)]',
            ].join(' ')}
          >
            <span className="block shrink-0 h-1.5 w-1.5 rounded-full bg-[#3a8a4a]" />
            Open source
          </span> */}
        </div>
      </div>
    </footer>
  );
}
