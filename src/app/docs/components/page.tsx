import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Component Types — VLabs Docs',
  description: 'Every renderable component type, its TypeScript shape, and placement rules.',
};

export default function ComponentsPage() {
  return (
    <Prose>
      <DocEyebrow>Adding Components</DocEyebrow>
      <h1>Component types</h1>

      <p>
        Every physical part in a circuit is a <code>ComponentInstance</code> — a
        discriminated union typed on the <code>type</code> field. The renderer dispatches
        through <code>COMPONENT_REGISTRY</code> keyed on that string.
      </p>

      <p>
        The types below are currently <strong>renderable</strong> (a geometry builder
        exists). Types listed as "pending" are declared in the union but return
        <code> null</code> from the registry until a builder is written.
      </p>

      <hr />

      <h2>Breadboard</h2>
      <p>Always the first component. There is exactly one per circuit.</p>
      <pre>{`{ id: 'bb', type: 'breadboard' }`}</pre>
      <p>
        Renders a 30-column solderless breadboard with power rails, tie-point hole grid,
        and centre gap. The <code>id</code> is referenced by all <code>TiePin</code> and
        <code> RailPin</code> wire endpoints.
      </p>

      <h2>Logic gates (DIP-14)</h2>
      <p>
        All six gate types render as a DIP-14 IC package straddling the centre gap.
        Each occupies <strong>7 consecutive columns</strong>.
      </p>
      <pre>{`{ id: 'xor1',  type: 'xor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'and1',  type: 'and-gate',  mountedAt: { board: 'bb', col: 12, row: 'e' } }
{ id: 'or1',   type: 'or-gate',   mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'not1',  type: 'not-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nand1', type: 'nand-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nor1',  type: 'nor-gate',  mountedAt: { board: 'bb', col: 5,  row: 'e' } }`}</pre>

      <table>
        <thead>
          <tr><th>Field</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td><code>row</code></td><td>Always <code>'e'</code> — the IC straddles rows e/f</td></tr>
          <tr><td><code>col</code></td><td>Left edge column. Pins land in cols N through N+6.</td></tr>
          <tr><td>Spacing</td><td>Leave at least 2 columns between ICs (next IC at col+9 minimum)</td></tr>
        </tbody>
      </table>

      <h2>Resistor</h2>
      <pre>{`{ id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } }`}</pre>
      <p>
        Renders as a horizontal cylinder with four colour-coded bands and an ohm label.
        Spans <strong>col → col+3</strong> (4 columns). Leads connect to <code>p1</code>
        (left, col) and <code>p2</code> (right, col+3).
      </p>

      <table>
        <thead>
          <tr><th>Field</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td><code>ohms</code></td><td>Any number. Drives the band colours and label.</td></tr>
          <tr><td><code>row</code></td><td><code>'c'</code> recommended to stay clear of IC rows.</td></tr>
        </tbody>
      </table>

      <h2>LED</h2>
      <pre>{`{ id: 'led1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } }
{ id: 'led2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'c' } }
{ id: 'led3', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 24, row: 'c' } }
{ id: 'led4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 27, row: 'c' } }`}</pre>
      <p>
        Spans <strong>col (anode) → col+1 (cathode)</strong>. Always place after its
        current-limiting resistor. Place LED at col N+2 when resistor is at col N.
      </p>

      <h2>Capacitor</h2>
      <pre>{`{ id: 'c1', type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 5, row: 'c' } }`}</pre>
      <p>
        Renders as an electrolytic capacitor (blue cylinder with polarity stripe and
        value label). Spans <strong>col → col+1</strong>. Leads connect to <code>p1</code>
        and <code>p2</code>.
      </p>

      <h2>Wire</h2>
      <pre>{`{ id: 'w1', type: 'wire', color: 'red',
  from: { board: 'bb', col: 3, row: 'a' },
  to:   { ic: 'xor1', pin: 'A' } }`}</pre>
      <p>
        Renders as an arced bezier tube between two <code>PinRef</code> endpoints.
        See <Link href="/docs/pins">Pin references</Link> for every endpoint type.
      </p>

      <table>
        <thead>
          <tr><th>Color</th><th>Convention</th></tr>
        </thead>
        <tbody>
          <tr><td><code>'red'</code></td><td>Input A</td></tr>
          <tr><td><code>'blue'</code></td><td>Input B</td></tr>
          <tr><td><code>'orange'</code></td><td>Input C / Cin / Bin</td></tr>
          <tr><td><code>'white'</code></td><td>Internal signal</td></tr>
          <tr><td><code>'green'</code></td><td>Sum / primary output</td></tr>
          <tr><td><code>'yellow'</code></td><td>Carry / Borrow output</td></tr>
          <tr><td><code>'black'</code></td><td>Ground</td></tr>
        </tbody>
      </table>

      <h2>Pending types (not yet rendered)</h2>

      <p>
        These are declared in the <code>ComponentInstance</code> union and accepted by
        the type system, but the registry returns <code>null</code> for them — they
        simply won't appear in the 3D scene. To make them visible, write a geometry
        builder and add a registry entry. See{' '}
        <Link href="/docs/geometry">Writing geometry</Link>.
      </p>

      <table>
        <thead>
          <tr><th>Type string</th><th>Physical part</th></tr>
        </thead>
        <tbody>
          <tr><td><code>'potentiometer'</code></td><td>Variable resistor / trimmer</td></tr>
          <tr><td><code>'push-button'</code></td><td>Momentary tactile switch</td></tr>
          <tr><td><code>'switch'</code></td><td>SPDT toggle switch</td></tr>
          <tr><td><code>'battery'</code></td><td>9V battery clip</td></tr>
          <tr><td><code>'dc-jack'</code></td><td>Barrel power connector</td></tr>
        </tbody>
      </table>

      <Callout $tone="info">
        <strong>Standalone builders</strong>
        <p>
          Every component type also has a <code>buildXxxStandalone()</code> variant
          (e.g. <code>buildLedStandalone('red')</code>) used by the showcase cards on
          the landing page. Write one alongside the board-mounted version.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/quickstart" data-dir="prev">Quickstart</DocNavLink>
        <DocNavLink as={Link} href="/docs/geometry" data-dir="next">Writing geometry</DocNavLink>
      </DocNav>
    </Prose>
  );
}
