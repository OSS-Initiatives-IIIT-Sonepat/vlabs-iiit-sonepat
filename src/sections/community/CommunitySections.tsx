import { type ReactNode } from "react";
import { GitHubMark, DiscordMark, ArrowUpRight } from "@/icons";
import {
  Body,
  Eyebrow,
  Heading,
  HeadingPair,
  SectionIntro,
  SectionShell,
  SectionStack,
  Button,
} from "@/ui";

import { COMMUNITY } from "./community.data";
import { FolderTree } from "./FolderTree";

// ── Helpers ───────────────────────────────────────────────────────────────

/** Inline link used inside story prose. */
function L({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="text-[var(--color-blue)] underline decoration-[var(--color-blue)]/30 underline-offset-[3px] hover:decoration-[var(--color-blue)] transition-[text-decoration-color] duration-150"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

/** Underlined emphasis — draws attention without being a link. */
function U({ children }: { children: ReactNode }) {
  return (
    <span className="underline decoration-[var(--ink-subtle)]/40 underline-offset-[3px]">
      {children}
    </span>
  );
}

/** A single prose paragraph. */
function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-base leading-[1.75] m-0">
      {children}
    </p>
  );
}

// ── Inline SVG icons for cards ────────────────────────────────────────────
function FigmaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

const CARD_ICONS: Record<string, ReactNode> = {
  github: <GitHubMark size={16} />,
  discord: <DiscordMark size={16} />,
  figma: <FigmaIcon size={16} />,
};

// ── Section 1: The story (blog-post narrative — top of page) ─────────────
function StorySection() {
  const { story } = COMMUNITY;
  return (
    <SectionShell scheme="light" rhythm="hero">
      <SectionStack>
        {/* Centered intro */}
        <SectionIntro className="items-center text-center">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <HeadingPair>
            <div className="max-w-[780px] mx-auto">
              <Heading as="h1" size="lg" weight="light">
                {story.heading}
              </Heading>
            </div>
          </HeadingPair>
        </SectionIntro>

        {/* Centered column for the whole post */}
        <div
          className={[
            "flex flex-col items-center gap-[calc(var(--spacing-base)*5)]",
            "max-w-[680px] w-full mx-auto",
          ].join(" ")}
        >
          {/* Author row */}
          <div className="flex items-center gap-[calc(var(--spacing-base)*3)]">
            {/* GitHub avatar */}
            <img
              src="https://github.com/FirePheonix.png"
              alt="Shubham Singh"
              width={44}
              height={44}
              className="rounded-full shrink-0 border border-[rgba(0,0,0,0.08)]"
            />
            <div className="flex flex-col gap-[calc(var(--spacing-base)*0.5)]">
              <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
                <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[15px] font-medium">
                  {story.author.name}
                </span>
                <a
                  className={[
                    "inline-flex items-center gap-[calc(var(--spacing-base)*1)]",
                    "text-[var(--ink-subtle)] font-[family-name:var(--font-mono),monospace] text-[12px]",
                    "no-underline hover:text-[var(--ink)]",
                    "transition-colors duration-150",
                  ].join(" ")}
                  href={story.author.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @{story.author.githubHandle}
                  <ArrowUpRight sizePx={7} />
                </a>
              </div>
              <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
                {story.author.role}
              </span>
            </div>
          </div>

          {/* Date pill */}
          <span
            className={[
              "inline-flex w-fit items-center gap-[calc(var(--spacing-base)*2)]",
              "border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*5)]",
              "text-[var(--ink-muted)] font-[family-name:var(--font-mono),monospace] text-[11px]",
              "tracking-[0.04em] px-[calc(var(--spacing-base)*3)] py-[calc(var(--spacing-base)*1)]",
            ].join(" ")}
          >
            <span className="block shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-blue)]" />
            {story.date}
          </span>

          {/* Divider */}
          <div
            className="border-t border-dashed border-[var(--divider)] h-0 w-full"
            aria-hidden
          />

          {/* ── Rich prose ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)] w-full">
            <P>
              There was already a virtual lab platform — the well-known{" "}
              <L href="https://www.vlab.co.in/">Virtual Labs by IIT Kharagpur</L>
              . But it was largely <U>2D</U>, had <U>no voice modules</U>, and
              felt monotonous. Most importantly, there was no way to teach
              students <U>which wire actually goes where on a real
              breadboard</U>. The disconnect between a flat diagram and a
              physical prototyping board was the gap nobody had closed.
            </P>

            <P>
              That gap became the starting point.{" "}
              <L href="https://github.com/FirePheonix">Shubham Singh</L>,
              president of the Technical Society at{" "}
              <U>IIIT Sonepat</U>, wanted to build something different — a{" "}
              <U>fully 3D, interactive lab</U> where students could see every
              component on a breadboard, route jumper wires with their own
              hands, and understand the physical layout before ever touching
              real hardware. What started as a breadboard renderer eventually
              evolved to cover <U>multiple ECE undergraduate
              experiments</U> across four semesters.
            </P>

            <P>
              In June 2026, Shubham created an empty repository under the{" "}
              <L href="https://github.com/OSS-Initiatives-IIIT-Sonepat">
                OSS-Initiatives organisation
              </L>{" "}
              and started writing code. There was no team, no funding, no
              formal backing — just a{" "}
              <L href="https://nextjs.org">Next.js</L> project, a{" "}
              <L href="https://threejs.org">Three.js</L> canvas, and a lot of
              caffeine.
            </P>

            <P>
              The first month was pure infrastructure: a{" "}
              <U>component geometry system</U> that could render breadboards,
              resistors, LEDs, and ICs from{" "}
              <U>raw Three.js primitives</U> — no GLTF models, no black-box
              libraries. Every pin, every copper strip, every colour band on a
              resistor is <U>procedurally generated</U>. The goal was for
              contributors to be able to read the code and understand exactly
              how a breadboard works, down to the geometry.
            </P>

            <P>
              By July, the <U>circuit engine</U> was taking shape. Components
              could be placed on a breadboard, wired together, and validated
              against a truth table. The lab content pipeline —{" "}
              <U>aim, theory, apparatus, procedure, observation,
              conclusion</U>{" "}
              — was formalised into a{" "}
              <U>type-safe schema</U> so that adding a new experiment meant
              filling in a data file, not writing new UI code.
            </P>

            <P>
              August brought simulations: the{" "}
              <L href="/labs/8085-add-sub-8bit">8085 emulator</L>, cache
              visualisations (
              <L href="/labs/cache-direct-mapped">direct-mapped</L> and{" "}
              <L href="/labs/cache-associative">set-associative</L>), an{" "}
              <L href="/labs/alu-simulation">ALU simulator</L>, and a simple{" "}
              <L href="/labs/cpu-design">CPU model</L>. These don&apos;t use
              3D — they&apos;re interactive React components with registers,
              memory maps, and step-by-step controls. The platform was
              starting to feel like <U>a real teaching tool</U>.
            </P>

            <P>
              The design system was another large piece. The initial
              scaffolding was adapted from{" "}
              <L href="https://twenty.com/">Twenty CRM&apos;s</L>{" "}
              <L href="https://github.com/twentyhq/twenty">
                open-source codebase
              </L>{" "}
              — their component architecture and layout patterns gave the
              project a head start. But the styling was in{" "}
              <U>Lunaria (CSS-in-JS)</U>, which didn&apos;t fit the stack, so
              Shubham migrated every component to{" "}
              <L href="https://tailwindcss.com">Tailwind CSS v4</L> and
              rebuilt the visual identity to match the project&apos;s own{" "}
              <L href="https://www.figma.com/design/8OKl25CDzj9DO9b0VCjEVq/Open-Source-Initiatives?node-id=0-1&t=3cuqh6GhRT47vFps-1">
                Figma design system
              </L>
              . By the end, the only thing left from the original code was the
              architectural inspiration — all in accordance with Twenty
              CRM&apos;s{" "}
              <L href="https://github.com/twentyhq/twenty?tab=License-1-ov-file">
                official license
              </L>
              .
            </P>

            <P>
              But there was a deeper idea behind the architecture. Shubham
              knew that <U>undergraduate students are not meant to be writing
              raw Three.js geometry by hand</U> — that&apos;s not a
              reasonable ask. The whole point was that a student who
              understands the experiment should be able to contribute it,
              even if they&apos;ve never touched a 3D renderer. So the
              codebase was deliberately structured around{" "}
              <U>plain data files</U>:
            </P>

            {/* ── Interactive folder tree ────────────────────────── */}
            <FolderTree />

            <P>
              Every experiment follows the same shape:{" "}
              <L href="/docs/components">components.ts</L> describes{" "}
              <U>what goes on the breadboard and where</U> — which row, which
              column, which pins connect. The{" "}
              <L href="/docs/steps">procedure folder</L> is a sequence of
              steps, each a small data file that says &quot;place this
              component here&quot; or &quot;wire pin A to pin B.&quot; The{" "}
              <L href="/docs/types">type system</L> enforces the structure, so
              you get errors at build time if something is missing.{" "}
              <U>No JSX, no rendering logic, no Three.js</U> — just
              structured TypeScript objects.
            </P>

            <P>
              The 3D scene, the wiring visualisation, the step navigation,
              the floating info cards — all of that is handled automatically
              by the platform&apos;s{" "}
              <L href="/docs/circuits">circuit engine</L> and{" "}
              <L href="/docs/registry">component registry</L>. Shubham built
              this architecture so that{" "}
              <U>a UG student, assisted by an AI agent, can add a complete
              missing experiment</U> — or fix a wrong procedure — without
              ever touching the renderer. If a lab is missing or a method is
              incorrect, a contributor just fills in the data files. AI tools
              like coding assistants can{" "}
              <U>generate entire lab definitions</U> when guided by a human
              who understands the experiment, making contributions accessible
              to students who know their electronics but don&apos;t know
              Three.js.
            </P>

            <P>
              By September 2026, VLabs had{" "}
              <U>70+ lab experiments across four semesters</U>, a full{" "}
              <U>search index</U>, audio narration support, and a{" "}
              <L href="/docs">documentation site</L> for contributors. The
              repository was ready to open up.
            </P>

            <P>
              <L href="https://github.com/FirePheonix">Shubham Singh</L>{" "}
              still maintains the project as president of the{" "}
              <U>Technical Society</U>, and all organisational decisions —
              roadmap, releases, repository rights — rest with whoever holds
              that seat. But the whole point of building in the open was to{" "}
              <U>make this bigger than one person</U>. Whether you&apos;re a
              student, an educator, or just someone who likes writing
              TypeScript and building 3D things —{" "}
              <U>you&apos;re welcome here</U>.
            </P>
          </div>

          {/* Divider */}
          <div
            className="border-t border-dashed border-[var(--divider)] h-0 w-full"
            aria-hidden
          />

          {/* Ownership callout */}
          <div className="bg-[#f7f6f3] rounded-[calc(var(--radius-base)*2)] p-[calc(var(--spacing-base)*5)] border-l-[3px] border-[var(--color-blue)] w-full">
            <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] m-0 uppercase mb-[calc(var(--spacing-base)*2)]">
              Repository ownership
            </p>
            <Body muted size="sm">
              {story.ownership}
            </Body>
          </div>

          {/* GitHub link */}
          <a
            className={[
              "inline-flex items-center gap-[calc(var(--spacing-base)*2)] w-fit",
              "bg-[#1c1c1c] text-white rounded-[calc(var(--radius-base)*2)]",
              "px-[calc(var(--spacing-base)*4)] py-[calc(var(--spacing-base)*2.5)]",
              "no-underline font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium",
              "transition-[background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:bg-[#333333]",
            ].join(" ")}
            href={story.author.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubMark size={14} />
            @{story.author.githubHandle}
            <ArrowUpRight sizePx={8} />
          </a>
        </div>
      </SectionStack>
    </SectionShell>
  );
}

// ── Section 2: About ──────────────────────────────────────────────────────
function AboutSection() {
  const { about } = COMMUNITY;
  return (
    <SectionShell scheme="muted">
      <SectionStack>
        <SectionIntro>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <HeadingPair>
            <div className="md:max-w-[921px]">
              <Heading as="h2" size="lg" weight="light">
                {about.heading}
              </Heading>
            </div>
            <div className="md:max-w-[571px]">
              <Body muted size="sm">
                {about.body}
              </Body>
            </div>
          </HeadingPair>
        </SectionIntro>

        {/* Bullet cards */}
        <div className="grid grid-cols-1 gap-[calc(var(--spacing-base)*4)] min-[768px]:grid-cols-2">
          {about.bullets.map((b) => (
            <div
              key={b.label}
              className={[
                "flex flex-col gap-[calc(var(--spacing-base)*3)]",
                "bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)]",
                "border border-[rgba(0,0,0,0.06)]",
                "p-[calc(var(--spacing-base)*5)]",
              ].join(" ")}
            >
              {/* Dot + label */}
              <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--color-blue)] shrink-0" />
                <h3 className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[15px] font-medium m-0">
                  {b.label}
                </h3>
              </div>
              <Body muted size="sm">
                {b.detail}
              </Body>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-[calc(var(--spacing-base)*3)]">
          <Button
            href={about.links.github}
            label="GitHub"
            variant="filled"
            size="regular"
          />
          <Button
            href={about.links.discord}
            label="Discord"
            variant="outlined"
            size="regular"
          />
          <Button
            href={about.links.contributing}
            label="Contributing Guide"
            variant="outlined"
            size="regular"
          />
        </div>
      </SectionStack>
    </SectionShell>
  );
}

// ── Section 3: Acknowledgments ────────────────────────────────────────────
function AcknowledgmentsSection() {
  const { acknowledgments } = COMMUNITY;
  return (
    <SectionShell scheme="light">
      <SectionStack>
        <SectionIntro>
          <Eyebrow>{acknowledgments.eyebrow}</Eyebrow>
          <HeadingPair>
            <div className="md:max-w-[921px]">
              <Heading as="h2" size="lg" weight="light">
                {acknowledgments.heading}
              </Heading>
            </div>
            <div className="md:max-w-[571px]">
              <Body muted size="sm">
                {acknowledgments.body}
              </Body>
            </div>
          </HeadingPair>
        </SectionIntro>

        <div className="grid grid-cols-1 gap-[calc(var(--spacing-base)*6)]">
          {acknowledgments.items.map((item) => (
            <div
              key={item.title}
              className={[
                "flex flex-col gap-[calc(var(--spacing-base)*4)]",
                "bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)]",
                "border border-[rgba(0,0,0,0.06)]",
                "p-[calc(var(--spacing-base)*6)]",
              ].join(" ")}
            >
              {/* Title */}
              <h3
                className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] font-medium tracking-[-0.02em] m-0"
                style={{
                  fontSize:
                    "clamp(1.125rem, 0.9415rem + 0.753vw, 1.375rem)",
                  lineHeight:
                    "clamp(1.5rem, 1.3165rem + 0.753vw, 1.75rem)",
                }}
              >
                {item.title}
              </h3>

              <div
                className="border-t border-dotted border-[var(--divider)] h-0 w-full"
                aria-hidden
              />

              <Body size="sm">{item.body}</Body>

              {/* Note (for Twenty CRM acknowledgment) */}
              {"note" in item && item.note && (
                <div className="bg-[#f7f6f3] rounded-[calc(var(--radius-base)*2)] p-[calc(var(--spacing-base)*4)] border-l-[3px] border-[var(--color-blue)]">
                  <Body muted size="sm">
                    {item.note}
                  </Body>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-[calc(var(--spacing-base)*3)]">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    className={[
                      "inline-flex items-center gap-[calc(var(--spacing-base)*1.5)]",
                      "text-[var(--color-blue)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium",
                      "no-underline",
                      "transition-[color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "hover:text-[#3529c8]",
                    ].join(" ")}
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ArrowUpRight sizePx={8} />
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* License note */}
          <div className="flex items-center gap-[calc(var(--spacing-base)*2)] text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>{acknowledgments.licenseNote}</span>
            <a
              className="text-[var(--color-blue)] no-underline hover:underline"
              href={acknowledgments.licenseLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              View license
            </a>
          </div>
        </div>
      </SectionStack>
    </SectionShell>
  );
}

// ── Section 4: Get involved ───────────────────────────────────────────────
function GetInvolvedSection() {
  const { getInvolved } = COMMUNITY;
  return (
    <SectionShell scheme="muted">
      <SectionStack>
        <SectionIntro>
          <Eyebrow>{getInvolved.eyebrow}</Eyebrow>
          <HeadingPair>
            <div className="md:max-w-[921px]">
              <Heading as="h2" size="lg" weight="light">
                {getInvolved.heading}
              </Heading>
            </div>
          </HeadingPair>
        </SectionIntro>

        <div className="grid grid-cols-1 gap-[calc(var(--spacing-base)*5)] min-[768px]:grid-cols-3">
          {getInvolved.cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              rel="noopener noreferrer"
              target="_blank"
              className={[
                "group flex flex-col gap-[calc(var(--spacing-base)*4)]",
                "bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)]",
                "border border-[rgba(0,0,0,0.06)]",
                "p-[calc(var(--spacing-base)*5)]",
                "no-underline text-inherit h-full",
                "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
              ].join(" ")}
            >
              {/* Icon */}
              <div
                className={[
                  "inline-flex items-center justify-center w-10 h-10",
                  "rounded-[calc(var(--radius-base)*2)]",
                  "border border-[rgba(0,0,0,0.08)]",
                  "text-[var(--ink)]",
                ].join(" ")}
              >
                {CARD_ICONS[card.icon]}
              </div>

              {/* Title */}
              <h3 className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[15px] font-medium m-0">
                {card.title}
              </h3>

              <Body muted size="sm">
                {card.body}
              </Body>

              <div
                className="border-t border-dotted border-[var(--divider)] h-0 w-full mt-auto"
                aria-hidden
              />

              <div className="flex items-center justify-between">
                <span className="text-[var(--color-blue)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium">
                  {card.linkLabel}
                </span>
                <span className="text-[var(--ink-subtle)] group-hover:text-[var(--color-blue)] transition-colors duration-200">
                  <ArrowUpRight sizePx={10} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </SectionStack>
    </SectionShell>
  );
}

// ── Composed export ───────────────────────────────────────────────────────
export function CommunitySections() {
  return (
    <>
      <StorySection />
      <AboutSection />
      <AcknowledgmentsSection />
      <GetInvolvedSection />
    </>
  );
}
