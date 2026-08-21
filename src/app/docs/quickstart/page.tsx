import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Quickstart — VLabs Docs',
  description: 'Add your first circuit to VLabs in under 5 minutes.',
};

export default function QuickstartPage() {
  return (
    <Prose>
      <DocEyebrow>Getting Started</DocEyebrow>
      <h1>Quickstart</h1>

      <p>
        This guide adds a new circuit to VLabs from scratch. You'll write a circuit
        definition, register it, and see it live — no renderer changes needed.
      </p>

      <Callout $tone="info">
        <strong>Prerequisites</strong>
        <p>
          Node.js 18+, the repo cloned, <code>npm install</code> run, and
          <code> npm run dev</code> running on <code>localhost:3003</code>.
        </p>
      </Callout>

      <h2>Step 1 — Create the circuit file</h2>

      <p>
        Every circuit lives in its own folder under <code>src/labs/circuits/</code>.
        Create <code>src/labs/circuits/sr-latch/index.ts</code>:
      </p>

      <pre>{`import { type Circuit } from '@/labs/types';

export const SrLatch: Circuit = {
  id: 'sr-latch',
  title: 'SR Latch',
  description:
    'A Set-Reset latch built from two cross-coupled NAND gates. ' +
    'S=0 sets the output HIGH, R=0 resets it LOW. ' +
    'Both HIGH = hold state; both LOW = forbidden.',

  components: [
    { id: 'bb',    type: 'breadboard' },
    { id: 'nand1', type: 'nand-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'nand2', type: 'nand-gate', mountedAt: { board: 'bb', col: 14, row: 'e' } },

    // Cross-coupling wires
    { id: 'w_q',   type: 'wire', color: 'green',
      from: { ic: 'nand1', pin: 'Y' }, to: { ic: 'nand2', pin: 'A' } },
    { id: 'w_qn',  type: 'wire', color: 'yellow',
      from: { ic: 'nand2', pin: 'Y' }, to: { ic: 'nand1', pin: 'B' } },

    // Input wires
    { id: 'w_s',   type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'nand1', pin: 'A' } },
    { id: 'w_r',   type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'nand2', pin: 'B' } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'Your build surface. Columns share a node across the tie-point rows.',
      show: ['bb'],
    },
    {
      title: 'Place NAND gate 1 (Set side)',
      body: 'The 74HC00 NAND gate at column 5. This side holds the Q output.',
      show: ['bb', 'nand1'],
      highlight: 'nand1',
    },
    {
      title: 'Place NAND gate 2 (Reset side)',
      body: 'The second NAND gate at column 14. This side holds the Q-bar output.',
      show: ['bb', 'nand1', 'nand2'],
      highlight: 'nand2',
    },
    {
      title: 'Wire inputs S and R',
      body: 'Red = S (Set), Blue = R (Reset). Tie to columns 2 and 3.',
      show: ['bb', 'nand1', 'nand2', 'w_s', 'w_r'],
    },
    {
      title: 'Cross-couple the outputs',
      body: 'Q feeds back into NAND2 input A. Q-bar feeds back into NAND1 input B. This feedback creates memory.',
      show: ['bb', 'nand1', 'nand2', 'w_s', 'w_r', 'w_q', 'w_qn'],
      highlight: 'w_q',
    },
  ],
};`}</pre>

      <h2>Step 2 — Register the circuit</h2>

      <p>
        Open <code>src/labs/circuits/index.ts</code> and add two lines:
      </p>

      <pre>{`import { SrLatch } from './sr-latch';   // ← add import

export const ALL_CIRCUITS: Circuit[] = [
  HalfAdder,
  FullAdder,
  // ... existing circuits
  SrLatch,   // ← add here
];

export {
  HalfAdder, FullAdder, /* ... */,
  SrLatch,   // ← and here
};`}</pre>

      <h2>Step 3 — Done</h2>

      <p>
        The circuit appears automatically in the explore page sidebar and gets its own
        step-by-step page at <code>/labs/sr-latch</code>. No other changes needed.
      </p>

      <Callout $tone="tip">
        <strong>Generate with AI instead</strong>
        <p>
          Paste <code>src/labs/COMPONENTS.md</code> into Claude and say
          "Generate an SR latch circuit". Save the output directly to step 1's file path.
          The AI knows the full schema, pin reference syntax, and column layout rules.
        </p>
      </Callout>

      <h2>What if my component type doesn't exist yet?</h2>

      <p>
        If you need a part that isn't in the registry (e.g. a 7-segment display), you
        need to add geometry for it first. See{' '}
        <Link href="/docs/geometry">Writing geometry</Link> and{' '}
        <Link href="/docs/registry">Registry &amp; renderer</Link>.
      </p>

      <DocNav>
        <DocNavLink as={Link} href="/docs" data-dir="prev">Overview</DocNavLink>
        <DocNavLink as={Link} href="/docs/components" data-dir="next">Component types</DocNavLink>
      </DocNav>
    </Prose>
  );
}
