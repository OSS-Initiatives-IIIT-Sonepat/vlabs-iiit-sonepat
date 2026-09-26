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

export function PostLunariaToTailwind() {
  return (
    <Prose>
      <p>
        When VLabs adopted the initial scaffolding from{" "}
        <L href="https://twenty.com/">Twenty CRM</L>'s open-source codebase,
        it came with a styling system built on{" "}
        <L href="https://github.com/callstack/linaria">Linaria</L> — a
        zero-runtime CSS-in-JS library. The component styles were written as
        tagged template literals, colocated with JSX, and extracted at build
        time. It's a solid system. It just wasn't ours, and it wasn't built
        for what we were doing with it.
      </p>

      <p>
        VLabs runs on{" "}
        <L href="https://nextjs.org">Next.js</L> 16 with the App Router.
        Linaria has historically had friction with RSC (React Server
        Components) and the App Router's streaming model. Beyond the technical
        mismatch, there was a simpler reason: the rest of the codebase we were
        writing used Tailwind utilities, and maintaining two styling systems in
        one repo is a tax that compounds fast — every new contributor has to
        learn both, and every component lives in a slightly different mental
        model.
      </p>

      <p>
        The decision was made: migrate the entire inherited component library
        from Linaria to{" "}
        <L href="https://tailwindcss.com">Tailwind CSS v4</L>. All of it, in
        one pass.
      </p>

      <h2>The scope</h2>

      <p>
        The inherited code covered roughly 60+ component files — buttons,
        headings, section shells, cards, the navigation system, testimonial
        carousels, footer, tokens, and the full design system layer (colour
        schemes, spacing scale, type ramp). Every one of those files had
        Linaria <code>css</code> or <code>styled</code> calls that needed to
        become Tailwind class strings.
      </p>

      <p>
        On top of the mechanical rewrite, the design identity needed updating.
        Twenty CRM's visual language is clean but it's a CRM product —
        professional, neutral, enterprise. VLabs needed to feel like an
        educational lab tool: the same structural rigour, different personality.
        New colours, new type choices, new token names.
      </p>

      <h2>How it was done</h2>

      <Callout $tone="info">
        <strong>Tool used</strong>
        <p>
          OpenCode CLI with Claude Opus 4.6 via Amazon Bedrock. The entire
          migration ran as a single long agentic session — reading files,
          rewriting them, verifying TypeScript, iterating on broken builds.
        </p>
      </Callout>

      <p>
        The migration was handed to an AI coding agent with a clear brief:
        convert every Linaria styled call to a Tailwind class string, preserve
        the CSS custom property theming system (the scheme variables —
        <code>--surface</code>, <code>--ink</code>, <code>--ink-muted</code>,
        etc.), and keep TypeScript compiling clean throughout. The agent worked
        file by file, reading the Linaria output, mapping it to equivalent
        Tailwind v4 utilities, and rewriting.
      </p>

      <p>
        What couldn't be expressed in utility classes — deeply nested child
        selectors, prose typography, scheme-switching via{" "}
        <code>data-scheme</code> attributes — was moved into{" "}
        <code>globals.css</code> as plain CSS using Tailwind's{" "}
        <code>@layer</code> directive. This is the right call: Tailwind is a
        utility system, not a replacement for every possible CSS pattern.
      </p>

      <h2>What went well</h2>

      <ul>
        <li>
          <strong>The token system translated cleanly.</strong> CSS custom
          properties like <code>var(--color-blue)</code> and{" "}
          <code>var(--spacing-base)</code> work natively inside Tailwind's
          arbitrary value syntax — <code>bg-[var(--color-blue)]</code>,{" "}
          <code>p-[calc(var(--spacing-base)*4)]</code>. No token system
          rewrite needed, just new syntax around the same variables.
        </li>
        <li>
          <strong>The scheme-switching architecture survived intact.</strong>{" "}
          The three colour schemes (light, muted, dark) work by swapping CSS
          custom properties on <code>data-scheme</code> attribute selectors in{" "}
          <code>globals.css</code>. Tailwind doesn't touch those selectors —
          they live in plain CSS and work exactly as before.
        </li>
        <li>
          <strong>TypeScript compilation stayed clean.</strong> Because Tailwind
          classes are plain strings, there's no type layer to maintain. The
          codebase went from complex Linaria type inference to simple{" "}
          <code>string[]</code> arrays joined with <code>.join(" ")</code>.
        </li>
        <li>
          <strong>Build times dropped noticeably.</strong> Linaria's
          babel-based extraction added meaningful overhead to both dev and
          production builds. Tailwind v4's CSS-first engine is significantly
          faster.
        </li>
      </ul>

      <h2>What broke</h2>

      <ul>
        <li>
          <strong>Dynamic class generation.</strong> Linaria allowed fully
          dynamic styles — interpolate any JavaScript expression into the CSS.
          Tailwind's JIT engine requires class names to be statically
          detectable. A handful of components needed refactoring to use CSS
          custom properties for the dynamic parts instead of fully dynamic
          class strings.
        </li>
        <li>
          <strong>Complex pseudo-selector chains.</strong> Some Linaria styles
          used deeply nested{" "}
          <code>{"&:hover > span > svg"}</code> chains that
          don't have clean Tailwind equivalents. These moved to scoped{" "}
          <code>&lt;style&gt;</code> blocks inside the component, which is the
          documented escape hatch for exactly this case.
        </li>
        <li>
          <strong>First-pass class verbosity.</strong> Tailwind class strings
          for complex layout components are long. The agent occasionally
          generated strings that were functionally correct but harder to read
          than the original Linaria. A second pass consolidated these into
          arrays with comments.
        </li>
      </ul>

      <h2>The result</h2>

      <p>
        A fully migrated component library with no Linaria dependency, a
        consistent Tailwind v4 utility pattern throughout, and a custom design
        identity built on top of the token system. The total time from decision
        to working build was a single day. The total cost was around $50 in
        API credits.
      </p>

      <p>
        Whether that's expensive or cheap depends on what you compare it to. A
        manual migration of this scope — reading Linaria output, mapping
        properties, handling edge cases, keeping TypeScript happy — would have
        taken days. The agent made mistakes, but they were the kind of mistakes
        that are fast to catch and fix, not the kind that hide in production.
      </p>

      <p>
        The migration also made it easier for contributors. Tailwind is
        something most frontend developers already know. Linaria is not.
        Lowering the barrier to understanding how a component is styled is
        worth something on an open-source project.
      </p>
    </Prose>
  );
}
