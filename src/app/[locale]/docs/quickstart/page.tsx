import Link from "next/link";
import {
  Prose,
  DocEyebrow,
  Callout,
  DocNav,
  DocNavLink,
} from "@/sections/docs/doc-primitives";

export const metadata = {
  title: "Quickstart — VLabs Docs",
  description: "Add your first experiment to VLabs in under 10 minutes.",
};

export default function QuickstartPage() {
  return (
    <Prose>
      <DocEyebrow>Getting Started</DocEyebrow>
      <h1>Quickstart</h1>

      <p>
        This guide walks you through adding a new experiment to VLabs from
        scratch. You&apos;ll create the experiment folder structure, write the
        content sections and circuit definition, register it in the catalog, and
        see it live.
      </p>

      <Callout $tone="info">
        <strong>Prerequisites</strong>
        <p>
          Node.js 18+, the repo cloned, <code>npm install</code> run, and
          <code> npm run dev</code> running on <code>localhost:3003</code>.
        </p>
      </Callout>

      <h2>Step 1 — Create the experiment folder</h2>

      <p>
        Each experiment lives in its own folder under a semester and subject
        directory in <code>src/labs/semesters/</code>. For example, to add an
        &quot;SR Latch&quot; experiment to Semester 2 / Sequential Logic:
      </p>

      <pre>{`src/labs/semesters/semester-02/04-sequential-logic/sr-latch/
  01-aim.ts
  02-theory.ts
  03-apparatus.ts
  04-procedure/
    index.ts
  05-observations.ts
  06-conclusion.ts
  components.ts        ← circuit definition
  index.ts             ← barrel export`}</pre>

      <h2>Step 2 — Write the content sections</h2>

      <p>
        Each section is a typed object imported from{" "}
        <code>@/labs/lab-content.types</code>:
      </p>

      <pre>{`// 01-aim.ts
import { type TheorySection } from '@/labs/lab-content.types';

export const aim: TheorySection = {
  id: 'aim',
  type: 'text',
  title: 'Aim',
  paragraphs: [
    'To build and verify an SR Latch using two cross-coupled NAND gates ' +
      'and observe the Set, Reset, and Hold states.',
  ],
};`}</pre>

      <h2>Step 3 — Write the circuit definition</h2>

      <p>
        Create <code>components.ts</code> with the circuit definition. You can
        use the fluent <code>CB</code> builder or write a manual{" "}
        <code>Circuit</code> object:
      </p>

      <pre>{`// components.ts — using the CB fluent builder
import { CB } from '@/labs/builder';

export const SrLatchCircuit = new CB(
  'sr-latch',
  'SR Latch',
  'A Set-Reset latch built from two cross-coupled NAND gates.',
)
  .board()
  .gate('nand1', 'nand-gate', 5)
  .gate('nand2', 'nand-gate', 14)
  .wire('w_q',  'green',  { ic: 'nand1', pin: 'Y' }, { ic: 'nand2', pin: 'A' })
  .wire('w_qn', 'yellow', { ic: 'nand2', pin: 'Y' }, { ic: 'nand1', pin: 'B' })
  .wire('w_s',  'red',    { board: 'bb', col: 2, row: 'a' }, { ic: 'nand1', pin: 'A' })
  .wire('w_r',  'blue',   { board: 'bb', col: 3, row: 'a' }, { ic: 'nand2', pin: 'B' })
  .step('Place the breadboard', 'Your build surface.').show('bb')
  .step('Place NAND gate 1', 'Set side — holds Q output.').show('nand1').highlight('nand1')
  .step('Place NAND gate 2', 'Reset side — holds Q̄ output.').show('nand2').highlight('nand2')
  .step('Wire inputs S and R', 'Red = S, Blue = R.').show('w_s', 'w_r')
  .step('Cross-couple outputs', 'Feedback creates memory.').show('w_q', 'w_qn').highlight('w_q')
  .build();`}</pre>

      <h2>Step 4 — Create the barrel export</h2>

      <p>
        The experiment&apos;s <code>index.ts</code> exports the circuit,
        content, and experiment definition:
      </p>

      <pre>{`// index.ts
import { type ExperimentDefinition } from '@/labs/experiments/types';
import { type LabContent } from '@/labs/lab-content.types';

import { aim } from './01-aim';
import { theory } from './02-theory';
import { apparatus } from './03-apparatus';
import { procedure } from './04-procedure';
import { observations } from './05-observations';
import { conclusion } from './06-conclusion';

export { SrLatchCircuit } from './components';

export const SrLatchContent: LabContent = {
  id: 'sr-latch',
  title: 'SR Latch',
  circuitId: 'sr-latch',
  sections: [aim, theory, apparatus, procedure, observations, conclusion],
};

export const srLatchExperiment: ExperimentDefinition = {
  id: 'sr-latch',
  title: 'SR Latch',
  description: 'A Set-Reset latch from two cross-coupled NAND gates.',
};`}</pre>

      <h2>Step 5 — Register in the catalog</h2>

      <p>
        Open <code>src/labs/semesters/catalog.ts</code> and add an import + an
        entry to the appropriate subject:
      </p>

      <pre>{`import {
  SrLatchCircuit,
  SrLatchContent,
  srLatchExperiment,
} from './semester-02/04-sequential-logic/sr-latch';

// Then add to the experiments array of the relevant subject:
fromBuilt(srLatchExperiment, SrLatchCircuit, SrLatchContent, [
  'sr latch', 'nand', 'memory', 'sequential',
]),`}</pre>

      <h2>Step 6 — Done</h2>

      <p>
        The experiment appears automatically in the explore page and gets its
        own full lab page with sidebar navigation, 3D scene, and all content
        sections. No other changes needed.
      </p>

      <Callout $tone="tip">
        <strong>Generate with AI instead</strong>
        <p>
          Paste <code>src/labs/COMPONENTS.md</code> into Claude and describe the
          experiment you want. It can generate the entire folder structure — all
          six content sections plus the circuit definition. Save the output to
          the experiment folder path and register in <code>catalog.ts</code>.
        </p>
      </Callout>

      <Callout $tone="tip">
        <strong>Watch the video tutorial</strong>
        <p>
          See <Link href="/docs/video-tutorial">the video walkthrough</Link> for
          a step-by-step screencast of adding an experiment.
        </p>
      </Callout>

      <h2>What if my component type doesn&apos;t exist yet?</h2>

      <p>
        If you need a part that isn&apos;t in the component library (e.g. a
        relay), you need to add geometry for it first. See{" "}
        <Link href="/docs/geometry">Writing geometry</Link> and{" "}
        <Link href="/docs/registry">Registry &amp; renderer</Link>.
      </p>

      <DocNav>
        <DocNavLink as={Link} href="/docs" data-dir="prev">
          Overview
        </DocNavLink>
        <DocNavLink as={Link} href="/docs/video-tutorial" data-dir="next">
          Video tutorial
        </DocNavLink>
      </DocNav>
    </Prose>
  );
}
