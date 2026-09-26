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

// ── X / Twitter embed ────────────────────────────────────────────────────
function XEmbed({
  tweetId,
  caption,
}: {
  tweetId: string;
  caption?: string;
}) {
  return (
    <figure className="my-[calc(var(--spacing-base)*8)] flex flex-col gap-[calc(var(--spacing-base)*2)] not-prose">
      <div className="overflow-hidden rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.07)]">
        <iframe
          src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=light&dnt=true`}
          className="w-full border-none"
          style={{ minHeight: 480 }}
          scrolling="no"
          title={`Tweet ${tweetId}`}
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Local video player ────────────────────────────────────────────────────
function LocalVideo({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-[calc(var(--spacing-base)*8)] flex flex-col gap-[calc(var(--spacing-base)*2)] not-prose">
      <div className="overflow-hidden rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.07)] bg-[#0f0e0d]">
        <video
          src={src}
          controls
          playsInline
          className="w-full max-h-[540px] object-contain"
        />
      </div>
      {caption && (
        <figcaption className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PostInteractiveProcedureSteps() {
  return (
    <Prose>
      <p>
        Every electronics lab experiment follows the same structure. It has
        been the same structure for decades: aim, theory, apparatus, procedure,
        observations, conclusion. That structure isn't arbitrary — it mirrors
        how a real engineer approaches a circuit. You state what you're trying
        to find out, understand the underlying theory, gather your components,
        follow the build steps, record what you see, and draw a conclusion.
      </p>

      <p>
        The challenge in making this interactive is that each section has
        different requirements. Theory needs formatted text and mathematical
        expressions. Procedure needs to be tightly coupled to the 3D scene —
        each step should reveal exactly the components relevant to that step,
        nothing more. Observations need structured tables. The whole thing
        needs audio narration for accessibility and independent study.
      </p>

      <p>
        Here is how we built it.
      </p>

      <h2>The data schema</h2>

      <p>
        The first decision was to keep content completely separate from
        rendering. Every section of every experiment is a TypeScript data file
        — a plain object with typed fields. The renderer reads these; it never
        has experiment-specific logic baked in.
      </p>

      <p>
        A procedure step looks like this:
      </p>

      <pre>{`// 04-procedure/01-place-the-breadboard.ts
export const step: ProcedureStep = {
  title: "Place the breadboard",
  body: "Your build surface. Columns share a node across the tie-point rows.",
  show: ["bb"],          // which component IDs to make visible
  highlight: "bb",       // which component gets the glow ring
};`}</pre>

      <p>
        The <code>show</code> array is cumulative — each step progressively
        reveals more of the circuit. By step 5, <code>show</code> contains all
        five components placed so far. The 3D scene reads this list and updates
        visibility accordingly, with no per-step renderer code needed.
      </p>

      <h2>Coupling the step to the 3D scene</h2>

      <p>
        This was the most interesting engineering problem. The 3D scene is a
        Three.js canvas. The procedure sidebar is a React component. They need
        to stay in sync: advancing a step should animate the new component into
        view, highlight it with a pulsing ring, and pan the camera to a good
        viewing angle.
      </p>

      <p>
        We solved this with a shared step index in React state, passed down to
        both the sidebar (which renders the step list) and the scene (which
        reads the current step's <code>show</code> and <code>highlight</code>
        fields). The scene subscribes to step changes via a ref callback and
        runs a Three.js animation — fade in the new component, scale it up
        briefly from 0.8 to 1.0, then glow the highlight ring.
      </p>

      <Callout $tone="info">
        <strong>Progressive disclosure</strong>
        <p>
          Students see exactly the components relevant to the current step.
          A half-wave rectifier has 9 procedure steps. At step 1, only the
          breadboard is visible. At step 4 (wire source to diode), the
          breadboard, AC source, and diode are all present — and the wire
          being placed is highlighted. The full circuit only appears at the
          final step.
        </p>
      </Callout>

      <h2>Early builds — first working prototypes</h2>

      <p>
        These clips from the{" "}
        <L href="https://x.com/shubhamm069">@shubhamm069</L> X account show
        the procedure step system at different stages of development.
      </p>

      <XEmbed
        tweetId="2102136391304098205"
        caption="First working step-by-step reveal — components appearing as the procedure advances."
      />

      <XEmbed
        tweetId="2103129086369661182"
        caption="Step highlighting with glow ring and camera positioning working together."
      />

      <XEmbed
        tweetId="2103546987098546300"
        caption="Full procedure flow — breadboard to complete half-wave rectifier circuit, step by step."
      />

      <h2>The floating info card</h2>

      <p>
        Below the 3D scene, a floating card shows the current step's title and
        body text. It fades and slides between steps. On mobile it sits below
        the scene; on desktop it overlaps the bottom edge of the canvas,
        anchored to the left.
      </p>

      <p>
        The step indicator — a row of dots, one per step, the current one
        filled — gives students a sense of progress without breaking their
        focus on the 3D scene. It was a small detail but noticeably improved
        completion rates in early testing.
      </p>

      <LocalVideo
        src="/blog/04-interactive-procedure-steps/demo-4.mp4"
        caption="The complete lab experience — sidebar navigation, 3D scene updates, floating card, and step indicator."
      />

      <h2>Audio narration</h2>

      <p>
        Each aim and theory section can ship a companion MP3 file. The naming
        convention is simple: a file at{" "}
        <code>
          public/semesters/semester-01/01-analog-electronics/half-wave-rectifier/01-aim.mp3
        </code>{" "}
        is automatically picked up and shown as a play button in the lab page
        header for that section. No configuration needed — the path convention
        is the configuration.
      </p>

      <p>
        The audio player is minimal — play/pause, a progress bar, current
        time. It doesn't autoplay. It doesn't interrupt the procedure. It's
        there for students who want to listen to an explanation before they
        start wiring, or who prefer audio over reading dense theory text.
      </p>

      <h2>Observations and conclusion</h2>

      <p>
        The observations section is a structured TypeScript object — a list of
        rows with expected value ranges, measurement fields, and pass/fail
        conditions. The renderer turns this into a table students can fill in.
        The conclusion is a short text block.
      </p>

      <p>
        Both are static content sections — they render below the 3D scene and
        the procedure navigator, in the theory view rather than the step view.
        The lab page has two modes: <em>theory mode</em> (aim, theory,
        apparatus, observations, conclusion — all static sections) and{" "}
        <em>procedure mode</em> (the interactive 3D step-by-step). Students
        can switch between them at any point.
      </p>

      <h2>Adding a new experiment</h2>

      <p>
        Because every section is a data file, adding a new experiment doesn't
        require any renderer changes. A contributor fills in the data files, the
        renderer handles the rest. A UG student with an AI coding assistant can
        generate a full experiment definition —{" "}
        <L href="/docs/quickstart">the quickstart guide</L> walks through the
        exact process.
      </p>
    </Prose>
  );
}
