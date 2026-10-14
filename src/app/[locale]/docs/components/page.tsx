import Link from "next/link";
import {
  Prose,
  DocEyebrow,
  Callout,
  DocNav,
  DocNavLink,
} from "@/sections/docs/doc-primitives";

export const metadata = {
  title: "Component Types — VLabs Docs",
  description:
    "Every renderable component type, its TypeScript shape, and placement rules.",
};

export default function ComponentsPage() {
  return (
    <Prose>
      <DocEyebrow>Adding Components</DocEyebrow>
      <h1>Component types</h1>

      <p>
        Every physical part in a circuit is a <code>ComponentInstance</code> — a
        discriminated union typed on the <code>type</code> field. The renderer
        dispatches through <code>COMPONENT_REGISTRY</code> keyed on that string.
      </p>

      <p>
        Each component type has its own folder under{" "}
        <code>src/components/</code> containing the geometry builder. All types
        below are <strong>fully renderable</strong> with 3D geometry.
      </p>

      <hr />

      <h2>Boards</h2>
      <pre>{`{ id: 'bb', type: 'breadboard' }
{ id: 'bb', type: 'long-breadboard' }`}</pre>
      <p>
        Always the first component. <code>breadboard</code> renders a 30-column
        solderless breadboard. <code>long-breadboard</code> renders an extended
        version with more tie-points.
      </p>

      <h2>Logic gates (DIP-14)</h2>
      <p>
        All gate types render as a DIP-14 IC package straddling the centre gap.
        Each occupies <strong>7 consecutive columns</strong>.
      </p>
      <pre>{`{ id: 'xor1',    type: 'xor-gate',    mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'and1',    type: 'and-gate',    mountedAt: { board: 'bb', col: 12, row: 'e' } }
{ id: 'or1',     type: 'or-gate',     mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'not1',    type: 'not-gate',    mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nand1',   type: 'nand-gate',   mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'nor1',    type: 'nor-gate',    mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'xnor1',   type: 'xnor-gate',   mountedAt: { board: 'bb', col: 5,  row: 'e' } }
{ id: 'buf1',    type: 'buffer-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } }`}</pre>

      <h2>Passives</h2>

      <h3>Resistor</h3>
      <pre>{`{ id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } }`}</pre>
      <p>
        Renders as a horizontal cylinder with four colour-coded bands. Spans{" "}
        <strong>col → col+3</strong>. Leads: <code>p1</code> (left) and{" "}
        <code>p2</code> (right).
      </p>

      <h3>Capacitor</h3>
      <pre>{`{ id: 'c1', type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 5, row: 'c' } }`}</pre>
      <p>
        Electrolytic capacitor. Spans <strong>col → col+1</strong>. Leads:{" "}
        <code>p1</code> and <code>p2</code>.
      </p>

      <h3>Potentiometer</h3>
      <pre>{`{ id: 'pot1', type: 'potentiometer', mountedAt: { board: 'bb', col: 1, row: 'b' },
  probes: [pinRef1, pinRef2] }`}</pre>
      <p>
        Variable resistor with optional probe wire targets for instrument
        connections.
      </p>

      <h2>LEDs &amp; Displays</h2>

      <h3>LED</h3>
      <pre>{`{ id: 'led1', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 24, row: 'c' } }`}</pre>
      <p>
        Colors: <code>&apos;red&apos;</code>, <code>&apos;green&apos;</code>,{" "}
        <code>&apos;yellow&apos;</code>, <code>&apos;blue&apos;</code>,{" "}
        <code>&apos;white&apos;</code>. Spans{" "}
        <strong>col (anode) → col+1 (cathode)</strong>.
      </p>

      <h3>7-Segment Display</h3>
      <pre>{`{ id: 'seg1', type: '7seg-display', mountedAt: { board: 'bb', col: 10, row: 'e' } }`}</pre>

      <h2>Semiconductors</h2>

      <h3>Diode</h3>
      <pre>{`{ id: 'd1', type: 'diode', mountedAt: { board: 'bb', col: 5, row: 'c' } }`}</pre>

      <h3>Zener Diode</h3>
      <pre>{`{ id: 'z1', type: 'zener', vz: 5.1, mountedAt: { board: 'bb', col: 5, row: 'c' } }`}</pre>

      <h3>BJT (NPN / PNP)</h3>
      <pre>{`{ id: 'q1', type: 'npn-bjt', mountedAt: { board: 'bb', col: 10, row: 'c' } }
{ id: 'q2', type: 'pnp-bjt', mountedAt: { board: 'bb', col: 15, row: 'c' } }`}</pre>

      <h3>MOSFET</h3>
      <pre>{`{ id: 'm1', type: 'n-mosfet', mountedAt: { board: 'bb', col: 10, row: 'c' } }
{ id: 'm2', type: 'p-mosfet', mountedAt: { board: 'bb', col: 15, row: 'c' } }`}</pre>

      <h3>Op-Amp</h3>
      <pre>{`{ id: 'oa1', type: 'op-amp', mountedAt: { board: 'bb', col: 5, row: 'e' } }`}</pre>

      <h2>Switches &amp; Buttons</h2>
      <pre>{`{ id: 'btn1', type: 'push-button', mountedAt: { board: 'bb', col: 2, row: 'c' } }
{ id: 'sw1',  type: 'switch',      mountedAt: { board: 'bb', col: 3, row: 'c' } }
{ id: 'dip1', type: 'dip-switch',  poles: 4, mountedAt: { board: 'bb', col: 5, row: 'e' } }`}</pre>

      <h2>Power</h2>
      <pre>{`{ id: 'bat1', type: 'battery',  mountedAt: { board: 'bb', col: 1, row: 'a' },
  terminals: [pinRef_pos, pinRef_neg] }
{ id: 'dc1',  type: 'dc-jack', mountedAt: { board: 'bb', col: 1, row: 'a' },
  terminals: [pinRef_pos, pinRef_neg] }`}</pre>

      <h2>Instruments</h2>
      <pre>{`{ id: 'amm1', type: 'ammeter',  ... }   // rendered (src/components/ammeter)
{ id: 'vm1',  type: 'voltmeter', ... }  // rendered (src/components/voltmeter)
{ id: 'dmm1', type: 'multimeter', ... } // rendered (src/components/multimeter)
{ id: 'osc1', type: 'oscilloscope', ... }       // rendered (src/components/oscilloscope)
{ id: 'fg1',  type: 'function-generator', ... } // rendered (src/components/function-generator)
{ id: 'la1',  type: 'logic-analyser', ... }     // rendered (src/components/logic-analyser)`}</pre>

      <h2>Other</h2>
      <pre>{`{ id: 'xfm1', type: 'transformer', ... } // rendered (src/components/transformer)
{ id: 'mcu1', type: 'mcu-trainer', ... } // rendered (src/components/mcu-trainer)`}</pre>

      <h2>Wire</h2>
      <pre>{`{ id: 'w1', type: 'wire', color: 'red',
  from: { board: 'bb', col: 3, row: 'a' },
  to:   { ic: 'xor1', pin: 'A' } }`}</pre>
      <p>
        Renders as an arced bezier tube between two <code>PinRef</code>{" "}
        endpoints. See <Link href="/docs/pins">Pin references</Link> for every
        endpoint type.
      </p>

      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Convention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&apos;red&apos;</code>
            </td>
            <td>VCC / Input A</td>
          </tr>
          <tr>
            <td>
              <code>&apos;blue&apos;</code>
            </td>
            <td>Input B</td>
          </tr>
          <tr>
            <td>
              <code>&apos;orange&apos;</code>
            </td>
            <td>Input C / Cin / Bin</td>
          </tr>
          <tr>
            <td>
              <code>&apos;white&apos;</code>
            </td>
            <td>Internal signal</td>
          </tr>
          <tr>
            <td>
              <code>&apos;green&apos;</code>
            </td>
            <td>Sum / primary output</td>
          </tr>
          <tr>
            <td>
              <code>&apos;yellow&apos;</code>
            </td>
            <td>Carry / Borrow output</td>
          </tr>
          <tr>
            <td>
              <code>&apos;purple&apos;</code>
            </td>
            <td>Alternate signal</td>
          </tr>
          <tr>
            <td>
              <code>&apos;black&apos;</code>
            </td>
            <td>Ground</td>
          </tr>
        </tbody>
      </table>

      <Callout $tone="info">
        <strong>Standalone builders</strong>
        <p>
          Every component type also has a <code>buildXxxStandalone()</code>{" "}
          variant (e.g. <code>buildLedStandalone(&apos;red&apos;)</code>) used
          by the showcase cards on the landing page and the{" "}
          <code>EceComponentViewer</code>. Write one alongside the board-mounted
          version.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/video-tutorial" data-dir="prev">
          Video tutorial
        </DocNavLink>
        <DocNavLink as={Link} href="/docs/geometry" data-dir="next">
          Writing geometry
        </DocNavLink>
      </DocNav>
    </Prose>
  );
}
