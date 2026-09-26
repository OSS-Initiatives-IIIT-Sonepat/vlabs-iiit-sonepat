import { type ReactNode } from "react";
import { Prose, Callout } from "@/sections/docs/doc-primitives";

function L({ href, children }: { href: string; children: ReactNode }) {
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

// ── Inline stat card ──────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-[calc(var(--spacing-base)*1)] p-[calc(var(--spacing-base)*5)] bg-[#f7f6f3] rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)]">
      <span
        className="font-[family-name:var(--font-sans),sans-serif] font-light tracking-[-0.04em] text-[var(--ink)]"
        style={{
          fontSize: "clamp(2rem, 1.5rem + 2vw, 2.75rem)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </span>
      <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[14px] leading-[1.5]">
        {label}
      </span>
    </div>
  );
}

export function PostWhyOpenSource() {
  return (
    <Prose>
      <p>
        There is a version of this post that leads with statistics — the number
        of colleges that can't afford well-stocked electronics labs, the
        percentage of engineering students who share a single oscilloscope
        between twelve people, the cost of replacing components that students
        burn through in a semester. Those numbers exist, and they're not good.
        But they're not why we built VLabs in the open.
      </p>

      <p>
        We built it in the open because the problem isn't one institution's
        problem. And a solution that lives behind a login wall — licensed, paid,
        proprietary — can only ever fix it for the people who can afford the
        license.
      </p>

      <h2>The access problem is real and specific</h2>

      <p>
        A well-funded electronics lab has enough hardware for every student to
        work independently. It has function generators, digital oscilloscopes,
        bench power supplies, component drawers that are restocked every
        semester. Students can stay late, run experiments twice, make mistakes
        without consequence.
      </p>

      <p>
        That's not the reality at most institutions. Labs are shared. Hardware
        breaks and takes weeks to replace on a procurement timeline. One burned
        IC can stall an entire lab session. A student who misses the session
        can't come back and redo it — the lab slot is gone, the equipment is
        booked, and the TA has moved on.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-[calc(var(--spacing-base)*3)] my-[calc(var(--spacing-base)*8)] not-prose">
        <Stat
          value="70+"
          label="lab experiments available on VLabs, zero hardware needed"
        />
        <Stat
          value="4"
          label="semesters of ECE curriculum covered, from Ohm's Law to 8085 assembly"
        />
        <Stat
          value="₹0"
          label="cost to any student, anywhere, on any device with a browser"
        />
        <Stat
          value="Dec 2026"
          label="libre license expiry — free to use, modify, and distribute until then"
        />
      </div>

      <p>
        Virtual labs don't replace physical labs. A student who has only ever
        seen a breadboard on a screen is still going to fumble the first time
        they hold one. That's fine — that's expected. What virtual labs do is
        remove the <em>prerequisite failure modes</em>. You come to the physical
        lab having already routed the circuit mentally, having already seen
        where each wire goes, having already watched what happens when you flip
        the power. The physical session becomes confirmation and refinement, not
        first contact.
      </p>

      <h2>Why open source specifically</h2>

      <p>
        When we started VLabs, there was already a virtual lab platform:{" "}
        <L href="https://www.vlab.co.in/">Virtual Labs by IIT Kharagpur</L>.
        It's a significant effort. But it's 2D, has no voice modules, and can't
        show a student which wire physically goes where on a real breadboard.
        The experience is closer to reading a textbook with diagrams than to
        doing a lab.
      </p>

      <p>
        We could have built a better version and kept it proprietary. Charged
        institutions a subscription. Raised a round. There's a startup in that
        direction.
      </p>

      <p>
        We chose not to, for a specific reason: the students who need this most
        are at institutions that can't pay for it. If access to good virtual
        labs requires a budget line item, then we've reproduced the exact
        inequality we're trying to fix — just moved it one layer up, from
        hardware to software.
      </p>

      <Callout $tone="tip">
        <strong>MIT License — permanently open source</strong>
        <p>
          VLabs is free to use, modify, and redistribute permanently under the
          MIT License. Non-profit, student-led, and fully open — no expiry
          dates, no restrictions.
        </p>
      </Callout>

      <h2>The architecture of contribution</h2>

      <p>
        Open source without a contribution path is just public code. Anyone can
        read it; almost no one adds to it. We thought carefully about this.
      </p>

      <p>
        The VLabs codebase is deliberately structured so that a student who
        knows their electronics — but has never written Three.js — can add a
        complete missing experiment. The 3D renderer is separate from the
        experiment data. The circuit layout, the procedure steps, the theory
        content — all of that lives in plain TypeScript data files with no
        rendering logic. An AI coding assistant, guided by a student who
        understands the circuit, can generate a full lab definition in one
        session.
      </p>

      <p>
        This matters because the people who will notice missing experiments —
        who will know that the full-wave rectifier procedure has a wrong step,
        or that the Thevenin theorem lab is missing an observation table — are
        UG students. They're the domain experts. They shouldn't need to be
        full-stack engineers to fix what they know is wrong.
      </p>

      <h2>What we ask in return</h2>

      <p>
        Nothing, if you're a student using it. Use it, learn from it, share it.
      </p>

      <p>
        If you find something missing or incorrect, and you have ten minutes and
        a willingness to ask an AI agent for help writing TypeScript data files
        — open a PR. The{" "}
        <L href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat/blob/master/CONTRIBUTING.md">
          CONTRIBUTING.md
        </L>{" "}
        and{" "}
        <L href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat/blob/master/src/labs/COMPONENTS.md">
          COMPONENTS.md
        </L>{" "}
        exist precisely so you don't need to understand the whole codebase to
        contribute to it.
      </p>

      <p>
        If you're an institution that wants to adopt VLabs, adapt it, or build
        on it — it's yours to do that with. That's the point.
      </p>
    </Prose>
  );
}
