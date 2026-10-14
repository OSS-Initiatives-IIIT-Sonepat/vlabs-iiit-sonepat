import Link from "next/link";
import {
  Prose,
  DocEyebrow,
  Callout,
  DocNav,
  DocNavLink,
} from "@/sections/docs/doc-primitives";

export const metadata = {
  title: "Steps & Highlighting — VLabs Docs",
  description:
    "How to author step-by-step circuit assembly with highlights and I/O state.",
};

export default function StepsPage() {
  return (
    <Prose>
      <DocEyebrow>Building Circuits</DocEyebrow>
      <h1>Steps &amp; highlighting</h1>

      <p>
        Steps drive the assembly walkthrough UI. Each step controls which
        components are visible, which one is spotlighted, and what input state
        to display.
      </p>

      <pre>{`type Step = {
  title:          string;
  body:           string;
  show:           string[];             // cumulative — all visible ids at this step
  highlight?:     string;               // id of the component to spotlight
  activeInputs?:  Record<string, 0|1>;  // drives the digital I/O panel
  supplyVoltage?: number;               // drives analog supply UI
  readings?:      Record<string, string>; // displays on instruments (e.g. '1.5 V')
  ledBrightness?: Record<string, number>; // sets analog LED brightness (0 to 1)
};`}</pre>

      <hr />

      <h2>show — cumulative visibility</h2>

      <p>
        <code>show</code> lists every component <em>id</em> that should be
        visible at this step. It is <strong>cumulative</strong> — each
        step&apos;s array includes all ids from the previous step plus the new
        ones. You never shrink it.
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
          Every id in a step&apos;s <code>show[]</code> must also appear in all
          subsequent steps. Removing an id mid-sequence makes components pop in
          and out, which breaks the assembly narrative. Note: When using the{" "}
          <code>CB</code> fluent builder, the <code>show()</code> method handles
          this cumulative tracking automatically.
        </p>
      </Callout>

      <h2>highlight — spotlighting a component</h2>

      <p>
        The optional <code>highlight</code> field points to one component id.
        The renderer pulses or accentuates that component to draw the
        student&apos;s attention to what was just added.
      </p>

      <ul>
        <li>Use it on the step that first introduces a component.</li>
        <li>Point it at a wire to highlight a connection just made.</li>
        <li>
          In the final &quot;test&quot; step, point it at the LED that should
          light up.
        </li>
        <li>Omit it when you&apos;re revealing many things at once.</li>
      </ul>

      <h2>activeInputs — Digital I/O state</h2>

      <p>
        The optional <code>activeInputs</code> map drives the input/output
        display panel, showing which inputs are HIGH or LOW in digital logic
        experiments.
      </p>

      <pre>{`activeInputs: { A: 1, B: 1 }   // both HIGH`}</pre>

      <p>
        Keys must exactly match the keys in <code>truthTable.inputs</code> if a
        truth table is defined.
      </p>

      <h2>Analog States: supplyVoltage, readings, ledBrightness</h2>

      <p>For analog electronics, use the analog-specific fields:</p>

      <ul>
        <li>
          <strong>
            <code>supplyVoltage</code>
          </strong>
          : Displays the current voltage supplied to the circuit (e.g.{" "}
          <code>5.0</code>).
        </li>
        <li>
          <strong>
            <code>readings</code>
          </strong>
          : A map of instrument <code>id</code>s to their display strings (e.g.{" "}
          <code>
            {"{"} vm1: '4.85 V' {"}"}
          </code>
          ).
        </li>
        <li>
          <strong>
            <code>ledBrightness</code>
          </strong>
          : A map of LED <code>id</code>s to their brightness values from 0.0 to
          1.0 (e.g.{" "}
          <code>
            {"{"} led1: 0.8 {"}"}
          </code>
          ).
        </li>
      </ul>

      <pre>{`{
  title: 'Measure Forward Voltage',
  body: 'At 5V supply, the diode drops about 0.7V.',
  show: [/* ... */],
  supplyVoltage: 5,
  readings: { dmm1: '0.71 V' },
  ledBrightness: { led1: 0.95 },
}`}</pre>

      <h2>Step count guidelines</h2>

      <ul>
        <li>
          Aim for <strong>5–7 steps</strong> per circuit.
        </li>
        <li>
          First step: always just <code>['bb']</code>.
        </li>
        <li>
          Last step: <code>show</code> contains every component id including all
          wires.
        </li>
        <li>
          Don&apos;t split individual wires into separate steps — batch related
          wires together.
        </li>
        <li>
          Do split ICs onto their own steps when explaining their logic
          function.
        </li>
      </ul>

      <DocNav>
        <DocNavLink as={Link} href="/docs/pins" data-dir="prev">
          Pin references
        </DocNavLink>
        <DocNavLink as={Link} href="/docs/columns" data-dir="next">
          Column layout guide
        </DocNavLink>
      </DocNav>
    </Prose>
  );
}
