import Link from 'next/link';
import { Prose, DocEyebrow, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Circuit Schema — VLabs Docs',
  description: 'The full Circuit type, its fields, and how to structure a circuit definition.',
};

export default function CircuitsPage() {
  return (
    <Prose>
      <DocEyebrow>Building Circuits</DocEyebrow>
      <h1>Circuit schema</h1>

      <p>
        A circuit is a plain TypeScript object conforming to the <code>Circuit</code> type.
        It lives in its own file, imports no renderer code, and can be generated entirely
        by an AI given the component reference.
      </p>

      <hr />

      <h2>The Circuit type</h2>

      <pre>{`type Circuit = {
  id:          string;           // kebab-case, unique — used as the URL slug
  title:       string;           // display name
  description: string;           // 2–3 sentences: what it does, which gates it uses
  components:  ComponentInstance[];
  steps:       Step[];
  truthTable?: TruthTable;       // optional
};`}</pre>

      <h2>Minimal working example</h2>

      <pre>{`import { type Circuit } from '@/labs/types';

export const SrLatch: Circuit = {
  id: 'sr-latch',
  title: 'SR Latch',
  description:
    'A Set-Reset latch built from two cross-coupled NAND gates. ' +
    'S=0 sets Q HIGH, R=0 resets Q LOW.',

  components: [
    { id: 'bb',    type: 'breadboard' },
    { id: 'nand1', type: 'nand-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'nand2', type: 'nand-gate', mountedAt: { board: 'bb', col: 14, row: 'e' } },
    { id: 'w_q',   type: 'wire', color: 'green',
      from: { ic: 'nand1', pin: 'Y' }, to: { ic: 'nand2', pin: 'A' } },
    { id: 'w_qn',  type: 'wire', color: 'yellow',
      from: { ic: 'nand2', pin: 'Y' }, to: { ic: 'nand1', pin: 'B' } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'Your build surface.', show: ['bb'] },
    { title: 'Place NAND gates',     body: 'Two cross-coupled gates make memory.',
      show: ['bb', 'nand1', 'nand2'], highlight: 'nand1' },
    { title: 'Cross-couple outputs', body: 'Q feeds back to NAND2 input; Q-bar to NAND1.',
      show: ['bb', 'nand1', 'nand2', 'w_q', 'w_qn'], highlight: 'w_q' },
  ],
};`}</pre>

      <h2>id</h2>

      <p>
        kebab-case string, unique across all circuits. Used as the route slug:
        <code> /labs/sr-latch</code>. Must match the folder name
        <code> src/labs/circuits/sr-latch/</code>.
      </p>

      <h2>components</h2>

      <p>
        An array of <code>ComponentInstance</code> values. Order doesn't matter for
        rendering — the renderer iterates all of them. Conventional order:
      </p>

      <ol>
        <li>Breadboard</li>
        <li>ICs (left to right)</li>
        <li>Passives (resistors, capacitors)</li>
        <li>LEDs</li>
        <li>Input wires</li>
        <li>Signal wires</li>
        <li>Ground wires</li>
      </ol>

      <p>
        See <Link href="/docs/components">Component types</Link> for every supported
        type and its fields.
      </p>

      <h2>steps</h2>

      <p>
        An ordered array of <code>Step</code> values that define the assembly walkthrough.
        See <Link href="/docs/steps">Steps &amp; highlighting</Link> for the full step
        authoring guide.
      </p>

      <h2>truthTable (optional)</h2>

      <pre>{`truthTable: {
  inputs:  ['A', 'B'],
  outputs: ['Sum', 'Carry'],
  rows: [
    { inputs: { A:0, B:0 }, outputs: { Sum:0, Carry:0 } },
    { inputs: { A:0, B:1 }, outputs: { Sum:1, Carry:0 } },
    { inputs: { A:1, B:0 }, outputs: { Sum:1, Carry:0 } },
    { inputs: { A:1, B:1 }, outputs: { Sum:0, Carry:1 } },
  ],
}`}</pre>

      <p>
        Drives the truth table panel in the lab UI. Input/output keys must be
        consistent with <code>activeInputs</code> keys in the steps.
        Omit entirely for circuits without a meaningful truth table.
      </p>

      <h2>Registering a new circuit</h2>

      <pre>{`// src/labs/circuits/index.ts

import { SrLatch } from './sr-latch';   // ← new import

export const ALL_CIRCUITS: Circuit[] = [
  HalfAdder,
  // ...
  SrLatch,   // ← push here
];

export { /* ..., */ SrLatch };           // ← re-export`}</pre>

      <DocNav>
        <DocNavLink as={Link} href="/docs/registry" data-dir="prev">Registry &amp; renderer</DocNavLink>
        <DocNavLink as={Link} href="/docs/pins" data-dir="next">Pin references</DocNavLink>
      </DocNav>
    </Prose>
  );
}
