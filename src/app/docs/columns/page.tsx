import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Column Layout Guide — VLabs Docs',
  description: 'How to place components on the breadboard without column collisions.',
};

export default function ColumnsPage() {
  return (
    <Prose>
      <DocEyebrow>Building Circuits</DocEyebrow>
      <h1>Column layout guide</h1>

      <p>
        The breadboard has 30 usable columns. Components occupy contiguous column
        ranges. Overlapping ranges cause visual clipping and broken wire connections.
      </p>

      <hr />

      <h2>Zone map</h2>

      <pre>{`cols  1– 3   input tie-points (A, B, Cin, Bin…)
cols  4–10   first IC  (7 cols + 2 gap = 9 total)
cols 11–17   second IC
cols 18–24   third IC  (if needed)
cols 22–25   first  resistor + LED pair
cols 26–29   second resistor + LED pair
col  30      do not use — board edge`}</pre>

      <Callout $tone="warn">
        <strong>ICs and output pairs can overlap in column numbers</strong>
        <p>
          The ICs live on rows <code>e/f</code>. Resistors and LEDs live on row
          <code> c</code>. They share the same column range but use different rows,
          so they don't collide. Follow the row conventions below.
        </p>
      </Callout>

      <h2>Row conventions</h2>

      <table>
        <thead><tr><th>Row(s)</th><th>Used for</th></tr></thead>
        <tbody>
          <tr><td><code>a, b</code></td><td>Input wires (tie-points for A, B, Cin…)</td></tr>
          <tr><td><code>c</code></td><td>Resistors and LEDs (output chain)</td></tr>
          <tr><td><code>d</code></td><td>Spare / interconnects</td></tr>
          <tr><td><code>e</code></td><td>IC top-side pins (always use for gate mountedAt)</td></tr>
          <tr><td><code>f–j</code></td><td>IC bottom-side pins (auto-managed by the DIP geometry)</td></tr>
        </tbody>
      </table>

      <h2>IC spacing rules</h2>

      <p>
        Each IC occupies exactly 7 columns (it has 7 pins per side on a DIP-14
        package). Leave at least 2 columns of clearance between ICs.
      </p>

      <pre>{`IC1 at col 5  → occupies cols 5–11
IC2 at col 14 → occupies cols 14–20  (2-col gap between 11 and 14 ✓)
IC3 at col 23 → occupies cols 23–29  (2-col gap between 20 and 23 ✓)`}</pre>

      <h2>Resistor + LED pair spacing</h2>

      <p>
        A resistor spans <strong>col → col+3</strong>.
        Its LED must be at <strong>col+2</strong> (not col+1 — that's the resistor's
        right lead, col+4 is the LED's right-of-anode).
      </p>

      <pre>{`// First output pair at col 22 / row c:
{ id: 'r_sum',   type: 'resistor', ohms: 330, mountedAt: { board:'bb', col:22, row:'c' } }
//   occupies cols 22–25 (col+3)

{ id: 'led_sum', type: 'led', color: 'green', mountedAt: { board:'bb', col:24, row:'c' } }
//   anode at col 24, cathode at col 25
//   note: resistor p2 is at col 25, LED anode is col 24 — wire them together

// Second output pair at col 26 / row c:
{ id: 'r_carry', type: 'resistor', ohms: 330, mountedAt: { board:'bb', col:26, row:'c' } }
{ id: 'led_carry', type: 'led', color:'yellow', mountedAt: { board:'bb', col:28, row:'c' } }`}</pre>

      <h2>Checking for overlaps before writing</h2>

      <p>
        Before placing a component, write out the column ranges of all existing
        components and verify there's no overlap on the same row:
      </p>

      <pre>{`// Quick range check (same row = potential collision):
// row e:  IC1 cols 5–11,  IC2 cols 14–20
// row c:  R1  cols 22–25, LED1 cols 24–25, R2 cols 26–29, LED2 cols 28–29
//
// row c has LED1 anode at 24 and R1 p2 at 25 — different holes, no collision ✓`}</pre>

      <h2>Complex circuits with 3+ ICs</h2>

      <p>
        For circuits needing three or more ICs (e.g. a full adder with three gates),
        shift the resistor + LED pairs to the far right:
      </p>

      <pre>{`cols  4–10   IC1
cols 12–18   IC2
cols 20–26   IC3
cols 22–25   R1 + LED1   (row c — no conflict with IC3 on row e) ✓
cols 26–29   R2 + LED2   (row c)`}</pre>

      <DocNav>
        <DocNavLink as={Link} href="/docs/steps" data-dir="prev">Steps &amp; highlighting</DocNavLink>
        <DocNavLink as={Link} href="/docs/types" data-dir="next">TypeScript types</DocNavLink>
      </DocNav>
    </Prose>
  );
}
