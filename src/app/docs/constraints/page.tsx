import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Constraints & Rules — VLabs Docs',
  description: 'What the renderer expects — validation rules for circuit definitions.',
};

export default function ConstraintsPage() {
  return (
    <Prose>
      <DocEyebrow>Reference</DocEyebrow>
      <h1>Constraints &amp; rules</h1>

      <p>
        The renderer is permissive by design — invalid references return
        <code> null</code> and are silently skipped rather than throwing. But circuits
        that violate these rules will look wrong or incomplete. Treat them as hard
        requirements.
      </p>

      <hr />

      <h2>Component ids</h2>

      <ul>
        <li>Every <code>id</code> in <code>components[]</code> must be unique.</li>
        <li>Every <code>id</code> referenced in <code>show[]</code> or <code>highlight</code> must exist in <code>components[]</code>.</li>
        <li>Wire <code>from</code>/<code>to</code> that reference non-existent ids produce no wire (silent skip).</li>
      </ul>

      <h2>show[] — cumulative invariant</h2>

      <ul>
        <li>Each step's <code>show[]</code> must be a superset of the previous step's <code>show[]</code>.</li>
        <li>Never remove an id between steps.</li>
        <li>The final step's <code>show[]</code> must include every component id.</li>
        <li>First step's <code>show[]</code> must be <code>['bb']</code>.</li>
      </ul>

      <h2>IC placement</h2>

      <ul>
        <li>All gates use <code>row: 'e'</code>.</li>
        <li>Each IC occupies exactly 7 consecutive columns.</li>
        <li>Minimum 2-column gap between adjacent ICs.</li>
        <li>Do not place any component past column 30.</li>
      </ul>

      <h2>Resistor + LED pairing</h2>

      <ul>
        <li>Every LED must have a current-limiting resistor in series (330Ω typical).</li>
        <li>Resistor at col N → resistor p2 at col N+3 → LED anode at col N+2 (not N+4). The LED is placed 2 cols after the resistor start.</li>
        <li>LED cathode must always connect to a ground rail.</li>
      </ul>

      <Callout $tone="warn">
        <strong>The resistor → LED column arithmetic</strong>
        <p>
          Resistor at col 22 → <code>p1</code> at col 22, <code>p2</code> at col 25.
          LED at col 24 → anode at col 24, cathode at col 25.
          Wire: <code>resistor p2 (col 25) → LED anode (col 24)</code>. They share the
          same node because they're in the same column on the same row.
        </p>
      </Callout>

      <h2>Wires</h2>

      <ul>
        <li>Every wire must have a valid <code>from</code> and <code>to</code> — both must resolve to a position.</li>
        <li>Wires with unresolvable endpoints are silently dropped (no crash, but missing connections).</li>
        <li>Each ground return wire should use a unique <code>col</code> on the rail to avoid overlap.</li>
      </ul>

      <h2>truthTable</h2>

      <ul>
        <li>If present, <code>inputs</code> and <code>outputs</code> arrays must be non-empty.</li>
        <li>Every <code>row.inputs</code> key must be in the <code>inputs</code> array.</li>
        <li>Every <code>row.outputs</code> key must be in the <code>outputs</code> array.</li>
        <li><code>activeInputs</code> keys in steps must match <code>truthTable.inputs</code> keys exactly.</li>
      </ul>

      <h2>Validating before committing</h2>

      <p>
        There's no automated validator yet. Manual checklist:
      </p>

      <ol>
        <li>All ids in <code>show[]</code> exist in <code>components[]</code></li>
        <li>Column ranges of components on the same row don't overlap</li>
        <li>Every IC is on row <code>'e'</code> with 7-col spacing</li>
        <li>Every LED has a resistor and a ground wire</li>
        <li><code>show[]</code> only grows — never shrinks</li>
        <li>Last step's <code>show[]</code> contains all component ids</li>
        <li><code>activeInputs</code> keys match <code>truthTable.inputs</code></li>
      </ol>

      <Callout $tone="tip">
        <strong>Let AI validate for you</strong>
        <p>
          Paste the generated circuit into Claude and ask it to check against this
          constraints list. It will catch column collisions, missing ground wires,
          and non-cumulative show arrays.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/types" data-dir="prev">TypeScript types</DocNavLink>
        <span />
      </DocNav>
    </Prose>
  );
}
