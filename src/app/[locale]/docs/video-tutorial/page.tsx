import Link from "next/link";
import {
  Prose,
  DocEyebrow,
  Callout,
  DocNav,
  DocNavLink,
} from "@/sections/docs/doc-primitives";

export const metadata = {
  title: "Video Tutorial — VLabs Docs",
  description:
    "Watch a step-by-step video walkthrough of adding a new experiment to VLabs.",
};

export default function VideoTutorialPage() {
  return (
    <Prose>
      <DocEyebrow>Getting Started</DocEyebrow>
      <h1>Video tutorial</h1>

      <p>
        This screencast walks through the full process of adding a new
        experiment to VLabs — from creating the folder structure through to
        seeing it live in the browser.
      </p>

      <Callout $tone="info">
        <strong>Before watching</strong>
        <p>
          Read the <Link href="/docs/quickstart">Quickstart</Link> guide first
          to understand the concepts. The video demonstrates the same flow in
          real time.
        </p>
      </Callout>

      <h2>How to add an experiment</h2>

      {}
      <video
        controls
        preload="metadata"
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.08)",
          marginTop: "8px",
          marginBottom: "16px",
        }}
      >
        <source src="/how_to_add_experiment_vlabs.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2>What the video covers</h2>

      <ol>
        <li>
          <strong>Creating the experiment folder</strong> — folder structure
          under <code>src/labs/semesters/</code> with all six content sections
        </li>
        <li>
          <strong>Writing content sections</strong> — aim, theory, apparatus,
          procedure, observations, and conclusion files
        </li>
        <li>
          <strong>Defining the circuit</strong> — using the <code>CB</code>{" "}
          fluent builder or manual <code>Circuit</code> objects
        </li>
        <li>
          <strong>Registering in the catalog</strong> — adding the experiment to{" "}
          <code>semesters/catalog.ts</code>
        </li>
        <li>
          <strong>Testing locally</strong> — verifying the experiment appears in
          the explore page and renders correctly
        </li>
      </ol>

      <Callout $tone="tip">
        <strong>Tip: Use AI to speed up</strong>
        <p>
          You can paste <code>src/labs/COMPONENTS.md</code> and{" "}
          <code>src/labs/SKILLS.md</code> into Claude or another LLM and ask it
          to generate the entire experiment folder structure. Then just review,
          adjust, and register.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/quickstart" data-dir="prev">
          Quickstart
        </DocNavLink>
        <DocNavLink as={Link} href="/docs/components" data-dir="next">
          Component types
        </DocNavLink>
      </DocNav>
    </Prose>
  );
}
