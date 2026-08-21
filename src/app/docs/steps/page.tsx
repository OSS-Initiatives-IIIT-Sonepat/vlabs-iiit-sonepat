import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Steps & Highlighting — VLabs Docs',
  description: 'How to author step-by-step circuit assembly with highlights and I/O state.',
};

export default function StepsPage() {
  return (
    <Prose>
      <DocEyebrow>Building Circuits</DocEyebrow>
      <h1>Steps &amp; highlighting</h1>

      <p>
        Steps drive the assembly walkthrough UI. Each step controls which components
        are visible, which one is spotlighted, and what input state to display.
      </p>

      <pre>{`type Step = {
  title:        string;
  body:         string;
  show:         string[];              // cumulative — all visible ids at this step
  highlight?:   string;               // id of the component to spotlight
  activeInputs?: Record<string, 0|1>; // drives the I/O panel
};`}</pre>

      <hr />

      <h2>show — cumulative visibility</h2>

      <p>
        <code>show</code> lists every component <em>id</em> that should be visible at
        this step. It is <strong>cumulative</strong> — each step's array includes all
        ids from the previous step plus the new ones. You never shrink it.
      </p>

      <pre>{`steps: [
  // Step 1: only the breadboard
  { title: 'Place breadboard', body: '...', show: ['bb'] },

  // Step 2: breadboard + XOR gate
  { title: 'Place XOR gate', body: '...', show: ['bb', 'xor1'], highlight: 'xor1' },

  // Step 3: everything so far + AND gate
  { title: 'Place AND gate', body: '...', show: ['bb', 'xor1', 'and1'], highlight: 'and1' },

  // Last step: all component ids
  { title: 'Test A=1, B=1', body: '...',
    show: ['bb', 'xor1', 'and1', 'r_sum', 'led_sum', /* all wires... */],
    activeInputs: { A: 1, B: 1 } },
]`}</pre>

      <Callout $tone="warn">
        <strong>Never shrink show[]</strong>
        <p>
          Every id in a step's <code>show[]</code> must also appear in all subsequent
          steps. Removing an id mid-sequence makes components pop in and out, which
          breaks the assembly narrative.
        </p>
      </Callout>

      <h2>highlight — spotlighting a component</h2>

      <p>
        The optional <code>highlight</code> field points to one component id. The
        renderer pulses or accentuates that component to draw the student's attention
        to what was just added.
      </p>

      <ul>
        <li>Use it on the step that first introduces a component.</li>
        <li>Point it at a wire to highlight a connection just made.</li>
        <li>In the final "test" step, point it at the LED that should light up.</li>
        <li>Omit it when you're revealing many things at once.</li>
      </ul>

      <h2>activeInputs — I/O panel state</h2>

      <p>
        The optional <code>activeInputs</code> map drives the input/output display
        panel, showing which inputs are HIGH or LOW.
      </p>

      <pre>{`activeInputs: { A: 1, B: 1 }   // both HIGH`}</pre>

      <p>
        Keys must exactly match the keys in <code>truthTable.inputs</code> if a truth
        table is defined. Use it from the step where inputs are first wired through
        to the final test steps.
      </p>

      <h2>Step count guidelines</h2>

      <ul>
        <li>Aim for <strong>5–7 steps</strong> per circuit.</li>
        <li>First step: always just <code>['bb']</code>.</li>
        <li>Last step: <code>show</code> contains every component id including all wires.</li>
        <li>Don't split individual wires into separate steps — batch related wires together.</li>
        <li>Do split ICs onto their own steps when explaining their logic function.</li>
      </ul>

      <h2>Full step sequence example</h2>

      <pre>{`steps: [
  {
    title: 'Start with the breadboard',
    body: 'The solderless breadboard is your build surface.',
    show: ['bb'],
  },
  {
    title: 'Place the XOR gate',
    body: 'XOR output is HIGH only when inputs differ — A ≠ B. This produces Sum.',
    show: ['bb', 'xor1'],
    highlight: 'xor1',
  },
  {
    title: 'Place the AND gate',
    body: 'AND output is HIGH only when both inputs are HIGH. This produces Carry.',
    show: ['bb', 'xor1', 'and1'],
    highlight: 'and1',
  },
  {
    title: 'Wire inputs A and B',
    body: 'Red = A, Blue = B. Both gates share the same inputs.',
    show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and'],
    highlight: 'w_a_xor',
    activeInputs: { A: 0, B: 0 },
  },
  {
    title: 'Add resistors and output LEDs',
    body: '330Ω resistor in series with each LED limits current.',
    show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
           'r_sum', 'r_carry', 'led_sum', 'led_carry'],
    highlight: 'r_sum',
    activeInputs: { A: 0, B: 0 },
  },
  {
    title: 'Connect output wires and ground',
    body: 'Green: XOR → LED. Orange: AND → LED. Black: cathodes to ground rail.',
    show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
           'r_sum', 'r_carry', 'led_sum', 'led_carry',
           'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
           'w_sum_gnd', 'w_carry_gnd'],
    activeInputs: { A: 0, B: 0 },
  },
  {
    title: 'Test: A=1, B=1 → Sum=0, Carry=1',
    body: '1+1=10 in binary. XOR sees equal inputs → Sum=0. AND sees both HIGH → Carry=1.',
    show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
           'r_sum', 'r_carry', 'led_sum', 'led_carry',
           'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
           'w_sum_gnd', 'w_carry_gnd'],
    highlight: 'led_carry',
    activeInputs: { A: 1, B: 1 },
  },
],`}</pre>

      <DocNav>
        <DocNavLink as={Link} href="/docs/pins" data-dir="prev">Pin references</DocNavLink>
        <DocNavLink as={Link} href="/docs/columns" data-dir="next">Column layout guide</DocNavLink>
      </DocNav>
    </Prose>
  );
}
