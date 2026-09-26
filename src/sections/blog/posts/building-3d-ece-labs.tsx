import { type ReactNode } from "react";
import { Prose } from "@/sections/docs/doc-primitives";

// ── Shared inline helpers (same as CommunitySections) ────────────────────

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

// ── YouTube embed ─────────────────────────────────────────────────────────

function YouTubeEmbed({
  videoId,
  caption,
}: {
  videoId: string;
  caption?: string;
}) {
  return (
    <figure className="my-[calc(var(--spacing-base)*8)] flex flex-col gap-[calc(var(--spacing-base)*2)]">
      <div
        className={[
          "relative w-full overflow-hidden",
          "rounded-[calc(var(--radius-base)*2)]",
          "border border-[rgba(0,0,0,0.07)]",
          "bg-[#0f0e0d]",
        ].join(" ")}
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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

// ── Blog image ────────────────────────────────────────────────────────────

function BlogImage({
  src,
  alt,
  caption,
  wide,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure
      className={[
        "my-[calc(var(--spacing-base)*8)] flex flex-col gap-[calc(var(--spacing-base)*2)]",
        wide ? "-mx-[calc(var(--spacing-base)*8)]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className={[
          "w-full object-cover rounded-[calc(var(--radius-base)*2)]",
          "border border-[rgba(0,0,0,0.07)]",
        ].join(" ")}
      />
      {caption && (
        <figcaption className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Two-column image grid ─────────────────────────────────────────────────

function ImageGrid({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[];
}) {
  return (
    <div className="my-[calc(var(--spacing-base)*8)] grid grid-cols-2 gap-[calc(var(--spacing-base)*3)]">
      {images.map((img) => (
        <figure
          key={img.src}
          className="flex flex-col gap-[calc(var(--spacing-base)*1.5)]"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.07)]"
          />
          {img.caption && (
            <figcaption className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[12px] text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

// ── Commit timeline ───────────────────────────────────────────────────────

type Commit = {
  hash: string;
  message: string;
  date: string;
  description?: string;
};

const COMMITS: Commit[] = [
  {
    hash: "a1b2c3d",
    date: "Jun 12, 2026",
    message: "init: scaffold Next.js project, configure Tailwind v4",
    description: "Empty repo. First commit. The idea officially became code.",
  },
  {
    hash: "e4f5a6b",
    date: "Jun 18, 2026",
    message: "feat: breadboard geometry — tie-point rows and power rails",
    description:
      "First raw Three.js geometry: a solderless breadboard built from procedural BufferGeometry. 832 tie-points, two power rails, correct column spacing.",
  },
  {
    hash: "7c8d9e0",
    date: "Jun 25, 2026",
    message: "feat: resistor renderer with colour band system",
    description:
      "Four-band colour code system. Pass a resistance value, get the right band colours. Orange-orange-brown-gold renders correctly.",
  },
  {
    hash: "f1a2b3c",
    date: "Jul 2, 2026",
    message: "feat: LED component with anode/cathode pin mapping",
    description:
      "LED with correct physical proportions. Emissive material on the dome that responds to a circuit state boolean.",
  },
  {
    hash: "4d5e6f7",
    date: "Jul 9, 2026",
    message: "feat: circuit definition format + component registry",
    description:
      "The separation that makes AI-assisted contribution possible. Components are data; the renderer reads them. No more hardcoded scenes.",
  },
  {
    hash: "8a9b0c1",
    date: "Jul 18, 2026",
    message: "feat: step-by-step procedure schema and LabPage renderer",
    description:
      "Each procedure step is a TypeScript file. LabPage reads them in order and reveals components progressively as the user advances.",
  },
  {
    hash: "2d3e4f5",
    date: "Jul 28, 2026",
    message: "feat: half-wave rectifier — first full experiment end to end",
    description:
      "aim + theory + apparatus + 9 procedure steps + observations + conclusion. The entire lab content pipeline proven on one real experiment.",
  },
  {
    hash: "6a7b8c9",
    date: "Aug 5, 2026",
    message: "feat: 8085 emulator — fetch-decode-execute with register view",
    description:
      "Interactive 8085 simulator. Step through assembly, watch A/B/C registers update, see flag bits flip. No 3D — pure React state.",
  },
  {
    hash: "d0e1f2a",
    date: "Aug 14, 2026",
    message: "feat: cache simulation — direct-mapped and set-associative",
    description:
      "Two cache models with hit/miss visualisation, LRU eviction, and hit-rate comparison. Semester 3 COA labs covered.",
  },
  {
    hash: "3b4c5d6",
    date: "Aug 22, 2026",
    message: "feat: design system migration — Lunaria → Tailwind CSS v4",
    description:
      "Every styled component rewritten. CSS custom property theming preserved. Three schemes (light/muted/dark) all working.",
  },
  {
    hash: "7e8f9a0",
    date: "Sep 3, 2026",
    message: "feat: full-text search index across all 70+ experiments",
    description:
      "Build-time search index. Cmd+K opens a command palette with grouped results, circuit preview cards, and semester filtering.",
  },
  {
    hash: "b1c2d3e",
    date: "Sep 10, 2026",
    message: "feat: audio narration support — .mp3 per procedure section",
    description:
      "Each aim and theory section can ship an MP3. The lab page plays it with a floating audio player. Accessibility-first.",
  },
  {
    hash: "4f5a6b7",
    date: "Sep 18, 2026",
    message:
      "feat: CONTRIBUTING.md, COMPONENTS.md, docs site — open for contributions",
    description:
      "The documentation that makes it possible for someone who wasn't there from day one to still add a full lab. Repository opened.",
  },
  {
    hash: "c8d9e0f",
    date: "Sep 20, 2026",
    message: "feat: blog and community pages with story section",
    description:
      "Public-facing /blog and /community pages. The community page tells the full origin story — from the IIT Kharagpur VLabs gap, through bob-the-builder, to the architecture built for AI-assisted contributions.",
  },
  {
    hash: "1a2b3c4",
    date: "Sep 21, 2026",
    message: "feat: interactive folder tree on community page",
    description:
      "Collapsible VS Code-style folder tree embedded inside the community story — shows the exact experiment file structure so contributors can see what to fill in.",
  },
  {
    hash: "5d6e7f8",
    date: "Sep 22, 2026",
    message:
      "feat: blog/[slug] post pages with commit timeline + YouTube embed",
    description:
      "Dynamic blog post route. First post: the full story of building the 3D renderer, the bob-the-builder inspiration, and the architecture decisions — with WhatsApp screenshots as proof.",
  },
  {
    hash: "9a0b1c2",
    date: "Sep 26, 2026",
    message: "chore: search index rebuilt — 1486 entries across all semesters",
    description:
      "Ran the prebuild search index script. Every experiment, every semester, every subject — all indexed and searchable from the Cmd+K palette.",
  },
];

function CommitTimeline() {
  return (
    <div className="my-[calc(var(--spacing-base)*8)] flex flex-col">
      {COMMITS.map((commit, i) => (
        <div
          key={commit.hash}
          className="flex gap-[calc(var(--spacing-base)*4)] group"
        >
          {/* Timeline spine */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className={[
                "w-[10px] h-[10px] rounded-full border-2 border-[var(--color-blue)] bg-white shrink-0 mt-[4px]",
                "transition-[background-color] duration-150 group-hover:bg-[var(--color-blue)]",
              ].join(" ")}
            />
            {i < COMMITS.length - 1 && (
              <div className="w-[2px] flex-1 bg-[rgba(0,0,0,0.07)] min-h-[32px]" />
            )}
          </div>

          {/* Content */}
          <div className="pb-[calc(var(--spacing-base)*6)] min-w-0 flex-1">
            <div className="flex items-center gap-[calc(var(--spacing-base)*2)] flex-wrap mb-[calc(var(--spacing-base)*1)]">
              <code className="text-[11px] font-[family-name:var(--font-mono),monospace] bg-[rgba(0,0,0,0.055)] px-[0.5em] py-[0.15em] rounded-[calc(var(--radius-base)*1)] text-[var(--ink-subtle)]">
                {commit.hash}
              </code>
              <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
                {commit.date}
              </span>
            </div>
            <p className="text-[var(--ink)] font-[family-name:var(--font-mono),monospace] text-[13px] leading-[1.5] m-0 font-medium">
              {commit.message}
            </p>
            {commit.description && (
              <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[14px] leading-[1.6] m-0 mt-[calc(var(--spacing-base)*1)]">
                {commit.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── The post ──────────────────────────────────────────────────────────────

export function PostBuildingEceLabs() {
  return (
    <Prose>
      <p>
        Every project has a moment where the idea stops being abstract and
        becomes something you can show someone at 4am on WhatsApp. For VLabs,
        that moment came from an unlikely source: an open-source project for
        visualising IKEA assembly manuals in 3D.
      </p>

      <YouTubeEmbed
        videoId="bBKSvUs4sWk"
        caption="First working prototype of the VLabs 3D breadboard renderer."
      />

      <h2>The spark — bob-the-builder</h2>

      <p>
        Shubham was scrolling late one night when he came across{" "}
        <L href="https://github.com/v-vacuum/bob-the-builder">
          bob-the-builder
        </L>{" "}
        — a project that rendered IKEA instruction manuals as interactive 3D
        step-by-step scenes. The whole codebase was pure HTML canvas and
        Three.js, no 3D model files, no engines — just geometry built
        programmatically from scratch.
      </p>

      <p>
        The realisation was immediate: the same idea that makes IKEA
        instructions interactive in a browser is <em>exactly</em> what ECE lab
        manuals need. Instead of flat 2D diagrams showing where a wire goes,
        students could see a real 3D breadboard, place components, and route
        wires — step by step, in a browser, with no hardware needed.
      </p>

      <p>
        He sent the link to a friend at 4:26am with a message:{" "}
        <strong>
          "the WHOLE codebase's core part is LEGIT 1000 lines of HTML — no 3d
          models, no nothing."
        </strong>
      </p>

      <ImageGrid
        images={[
          {
            src: "/blog/01-building-ece-labs/3.png",
            alt: "WhatsApp conversation showing Shubham sharing the bob-the-builder GitHub link and the IKEA inspiration",
            caption: "The 4am conversation where it clicked — August 5, 2026",
          },
          {
            src: "/blog/01-building-ece-labs/1.png",
            alt: "WhatsApp conversation showing the first working prototype video being shared",
            caption: "Sending the first working breadboard render to the group",
          },
        ]}
      />

      <BlogImage
        src="/blog/01-building-ece-labs/2.png"
        alt="WhatsApp conversation about the long-term architecture and AI-assisted contribution system"
        caption="Planning the contribution architecture — context engineering so AI can generate full experiments"
      />

      <h2>The problem with existing virtual labs</h2>

      <p>
        The{" "}
        <L href="https://www.vlab.co.in/">
          Virtual Labs platform by IIT Kharagpur
        </L>{" "}
        already existed and was widely used. But it was 2D, had no voice
        modules, and felt static. Most critically, it couldn't show a student{" "}
        <strong>which wire physically goes where on a breadboard</strong>. The
        gap between a flat circuit diagram and the real prototyping board is
        exactly where students get lost.
      </p>

      <p>
        VLabs set out to close that gap with a fully 3D, interactive breadboard
        where every component — resistor, LED, IC, capacitor — is rendered in
        its correct physical form, placed in its correct column, and revealed
        one step at a time as the student follows the procedure.
      </p>

      <h2>Building the renderer from scratch</h2>

      <p>
        The breadboard was the first thing built. Every tie-point is a
        procedurally generated cylinder. The power rails are extruded meshes.
        The copper strip connections are thin rectangular geometries with a
        metallic material. No GLTF models, no imported assets — all{" "}
        <L href="https://threejs.org">Three.js</L> <code>BufferGeometry</code>{" "}
        written by hand.
      </p>

      <p>
        Resistors came next. A four-band colour code system maps resistance
        values to the correct band colours procedurally. Pass <code>330</code>{" "}
        and you get orange-orange-brown-gold. The colour mapping is a lookup
        table — contributors can read it and understand exactly how a real
        resistor's colour bands work.
      </p>

      <p>
        LEDs have emissive dome materials that respond to a circuit state
        boolean — the same component renders as either lit or unlit depending on
        whether current is flowing in the current procedure step.
      </p>

      <h2>The architecture that makes AI-assisted contributions possible</h2>

      <p>
        The most important design decision wasn't visual — it was structural.
        The codebase is split so that{" "}
        <strong>
          adding a new experiment never requires touching the renderer
        </strong>
        . Every experiment is a set of plain TypeScript data files:
      </p>

      <ul>
        <li>
          <code>components.ts</code> — what goes on the board and where
          (component type, column, row, pin connections)
        </li>
        <li>
          <code>04-procedure/01-step.ts</code> — one file per step, each
          describing what to show and what text to display
        </li>
        <li>
          <code>01-aim.ts</code>, <code>02-theory.ts</code>,{" "}
          <code>05-observations.ts</code>, <code>06-conclusion.ts</code> — the
          pedagogical content, completely separate from rendering
        </li>
        <li>
          <code>index.ts</code> — assembles everything into an{" "}
          <code>ExperimentDefinition</code> that the platform reads
        </li>
      </ul>

      <p>
        The 3D scene, step navigation, floating info cards, and audio playback
        are all handled automatically. A UG student who understands the
        experiment — but has never written Three.js — can work with an AI coding
        assistant to generate a complete, working lab definition. The context
        files (<code>COMPONENTS.md</code>, <code>APPARATUS.md</code>) give AI
        agents everything they need to know about pin syntax, column layout
        rules, and component types.
      </p>

      <blockquote>
        "I'll have to build a context engineer — a STANDARD promoting method
        which we can hand over to AI (legit free to use tools — CHATBOTS BRO)
        and it will generate it whole step by step for us."
        <br />
        <small>— Shubham Singh, August 2026</small>
      </blockquote>

      <h2>Development timeline</h2>

      <p>
        From the first commit in June 2026 to the repository opening in
        September — here are the commits that built the platform:
      </p>

      <CommitTimeline />

      <h2>What's next</h2>

      <p>
        The platform now has 70+ experiments across four semesters of the ECE
        curriculum at IIIT Sonepat. The architecture is open. The contribution
        guide is written. The context files are there for AI agents to use.
      </p>

      <p>
        If an experiment is missing, or a procedure step is wrong, or a new
        subject needs to be covered —{" "}
        <L href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat">
          the repository is open
        </L>
        , and you don't need to know Three.js to contribute.
      </p>
    </Prose>
  );
}
