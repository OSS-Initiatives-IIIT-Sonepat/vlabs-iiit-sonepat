import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Pin References — VLabs Docs',
  description: 'Every PinRef variant — the typed wire endpoint system explained.',
};

export default function PinsPage() {
  return (
    <Prose>
      <DocEyebrow>Building Circuits</DocEyebrow>
      <h1>Pin references</h1>

      <p>
        Every wire has a <code>from</code> and a <code>to</code> — both are
        <code> PinRef</code> objects. There are no string-based coordinates.
        The renderer resolves each <code>PinRef</code> to a <code>THREE.Vector3</code>
        at build time.
      </p>

      <pre>{`type PinRef =
  | TiePin      // a specific breadboard hole
  | RailPin     // a power-rail hole
  | IcPin       // a named pin on a mounted IC
  | PassivePin  // p1 or p2 lead on a resistor or capacitor
  | LedPin;     // anode or cathode of an LED`}</pre>

      <hr />

      <h2>TiePin — breadboard hole</h2>

      <pre>{`{ board: 'bb', col: 3, row: 'a' }`}</pre>

      <table>
        <thead><tr><th>Field</th><th>Values</th></tr></thead>
        <tbody>
          <tr><td><code>board</code></td><td>The <code>id</code> of the breadboard component (always <code>'bb'</code>)</td></tr>
          <tr><td><code>col</code></td><td>1–30</td></tr>
          <tr><td><code>row</code></td><td><code>'a'</code> through <code>'j'</code></td></tr>
        </tbody>
      </table>

      <p>
        Rows <code>a–e</code> are the top half (above the centre gap).
        Rows <code>f–j</code> are the bottom half. ICs straddle the gap, with pins
        landing in row <code>e</code> (top) and row <code>f</code> (bottom).
      </p>

      <h2>RailPin — power rail</h2>

      <pre>{`{ board: 'bb', rail: 'gnd_top', col: 1 }
{ board: 'bb', rail: 'vcc_top', col: 1 }
{ board: 'bb', rail: 'gnd_bot', col: 1 }
{ board: 'bb', rail: 'vcc_bot', col: 1 }`}</pre>

      <table>
        <thead><tr><th>rail value</th><th>Physical rail</th></tr></thead>
        <tbody>
          <tr><td><code>'gnd_top'</code></td><td>Blue (−) rail, top of board</td></tr>
          <tr><td><code>'vcc_top'</code></td><td>Red (+) rail, top of board</td></tr>
          <tr><td><code>'gnd_bot'</code></td><td>Blue (−) rail, bottom of board</td></tr>
          <tr><td><code>'vcc_bot'</code></td><td>Red (+) rail, bottom of board</td></tr>
        </tbody>
      </table>

      <Callout $tone="info">
        <strong>Always ground LED cathodes</strong>
        <p>
          Every LED cathode must connect to a ground rail. Use a unique column per
          wire to avoid overlap: <code>gnd_top col:1</code>, <code>col:2</code>, etc.
        </p>
      </Callout>

      <h2>IcPin — named IC pin</h2>

      <pre>{`{ ic: 'xor1', pin: 'A' }   // input A  → col+0, row e
{ ic: 'xor1', pin: 'B' }   // input B  → col+1, row e
{ ic: 'xor1', pin: 'Y' }   // output Y → col+2, row e

// Dual-gate ICs (two gates per package):
{ ic: 'nand1', pin: '1A' }  // gate 1 input A  → col+0
{ ic: 'nand1', pin: '1B' }  // gate 1 input B  → col+1
{ ic: 'nand1', pin: '1Y' }  // gate 1 output   → col+2
{ ic: 'nand1', pin: '2A' }  // gate 2 input A  → col+3
{ ic: 'nand1', pin: '2B' }  // gate 2 input B  → col+4
{ ic: 'nand1', pin: '2Y' }  // gate 2 output   → col+5`}</pre>

      <p>
        The <code>ic</code> field references the <code>id</code> of a gate component.
        The resolver looks up that component's <code>mountedAt.col</code> and adds the
        appropriate column offset.
      </p>

      <table>
        <thead><tr><th>Pin name</th><th>Offset from mountedAt.col</th><th>Row</th></tr></thead>
        <tbody>
          <tr><td><code>A</code> / <code>1A</code></td><td>+0</td><td>e</td></tr>
          <tr><td><code>B</code> / <code>1B</code></td><td>+1</td><td>e</td></tr>
          <tr><td><code>Y</code> / <code>1Y</code></td><td>+2</td><td>e</td></tr>
          <tr><td><code>2A</code></td><td>+3</td><td>e</td></tr>
          <tr><td><code>2B</code></td><td>+4</td><td>e</td></tr>
          <tr><td><code>2Y</code></td><td>+5</td><td>e</td></tr>
        </tbody>
      </table>

      <h2>PassivePin — resistor or capacitor lead</h2>

      <pre>{`{ component: 'r1', end: 'p1' }   // left lead  → mountedAt.col
{ component: 'r1', end: 'p2' }   // right lead → mountedAt.col + 3`}</pre>

      <p>
        <code>component</code> references the <code>id</code> of a resistor or
        capacitor. <code>p1</code> is the left lead (at <code>mountedAt.col</code>),
        <code> p2</code> is the right lead (at <code>col+3</code>).
      </p>

      <h2>LedPin — LED anode / cathode</h2>

      <pre>{`{ led: 'led1', end: 'anode' }    // anode   → mountedAt.col
{ led: 'led1', end: 'cathode' }  // cathode → mountedAt.col + 1`}</pre>

      <p>
        <code>led</code> references the <code>id</code> of an LED component.
        Always wire the <strong>anode</strong> (positive) to the signal chain and the
        <strong> cathode</strong> (negative) to ground.
      </p>

      <h2>Common wiring pattern</h2>

      <p>The standard output chain is: IC output → resistor p1 → resistor p2 → LED anode → LED cathode → ground rail.</p>

      <pre>{`// IC output → resistor
{ id: 'w_out', type: 'wire', color: 'green',
  from: { ic: 'xor1', pin: 'Y' },
  to:   { component: 'r_sum', end: 'p1' } },

// Resistor → LED
{ id: 'w_led', type: 'wire', color: 'green',
  from: { component: 'r_sum', end: 'p2' },
  to:   { led: 'led_sum', end: 'anode' } },

// LED cathode → ground
{ id: 'w_gnd', type: 'wire', color: 'black',
  from: { led: 'led_sum', end: 'cathode' },
  to:   { board: 'bb', rail: 'gnd_top', col: 1 } },`}</pre>

      <DocNav>
        <DocNavLink as={Link} href="/docs/circuits" data-dir="prev">Circuit schema</DocNavLink>
        <DocNavLink as={Link} href="/docs/steps" data-dir="next">Steps & highlighting</DocNavLink>
      </DocNav>
    </Prose>
  );
}
