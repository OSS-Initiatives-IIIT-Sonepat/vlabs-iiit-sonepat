import Link from 'next/link';
import { Prose, DocEyebrow, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'TypeScript Types — VLabs Docs',
  description: 'Full TypeScript type reference for the VLabs lab system.',
};

export default function TypesPage() {
  return (
    <Prose>
      <DocEyebrow>Reference</DocEyebrow>
      <h1>TypeScript types</h1>

      <p>
        All types live in <code>src/labs/types.ts</code>. Import them from
        <code> @/labs/types</code>.
      </p>

      <hr />

      <h2>Row</h2>
      <pre>{`type Row = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';`}</pre>

      <h2>PinRef variants</h2>
      <pre>{`type TiePin     = { board: string; col: number; row: Row };
type RailPin    = { board: string; rail: 'vcc_top'|'gnd_top'|'vcc_bot'|'gnd_bot'; col: number };
type IcPin      = { ic: string; pin: 'A'|'B'|'Y'|'1A'|'1B'|'1Y'|'2A'|'2B'|'2Y' };
type PassivePin = { component: string; end: 'p1'|'p2' };
type LedPin     = { led: string; end: 'anode'|'cathode' };

type PinRef = TiePin | RailPin | IcPin | PassivePin | LedPin;`}</pre>

      <h2>MountPoint</h2>
      <pre>{`type MountPoint = { board: string; col: number; row: Row };`}</pre>

      <h2>Color enumerations</h2>
      <pre>{`type LedColor  = 'red' | 'green' | 'yellow' | 'blue';
type WireColor = 'red' | 'black' | 'yellow' | 'green' | 'blue' | 'orange' | 'white';`}</pre>

      <h2>ComponentInstance</h2>
      <pre>{`type ComponentInstance =
  | { id: string; type: 'breadboard' }
  | { id: string; type: 'wire';        from: PinRef; to: PinRef; color: WireColor }
  | { id: string; type: 'resistor';    ohms: number;        mountedAt: MountPoint }
  | { id: string; type: 'capacitor';   capacitance: number; mountedAt: MountPoint }
  | { id: string; type: 'led';         color: LedColor;     mountedAt: MountPoint }
  | { id: string; type: 'xor-gate';    mountedAt: MountPoint }
  | { id: string; type: 'and-gate';    mountedAt: MountPoint }
  | { id: string; type: 'or-gate';     mountedAt: MountPoint }
  | { id: string; type: 'not-gate';    mountedAt: MountPoint }
  | { id: string; type: 'nand-gate';   mountedAt: MountPoint }
  | { id: string; type: 'nor-gate';    mountedAt: MountPoint }
  | { id: string; type: 'potentiometer'; mountedAt: MountPoint }
  | { id: string; type: 'push-button';   mountedAt: MountPoint }
  | { id: string; type: 'switch';        mountedAt: MountPoint }
  | { id: string; type: 'battery';       mountedAt: MountPoint }
  | { id: string; type: 'dc-jack';       mountedAt: MountPoint };`}</pre>

      <h2>Step</h2>
      <pre>{`type Step = {
  title:        string;
  body:         string;
  show:         string[];               // cumulative component ids
  highlight?:   string;                // id to spotlight
  activeInputs?: Record<string, 0|1>;  // I/O panel state
};`}</pre>

      <h2>TruthTable</h2>
      <pre>{`type TruthTableRow = {
  inputs:  Record<string, 0 | 1>;
  outputs: Record<string, 0 | 1>;
};

type TruthTable = {
  inputs:  string[];
  outputs: string[];
  rows:    TruthTableRow[];
};`}</pre>

      <h2>Circuit</h2>
      <pre>{`type Circuit = {
  id:          string;
  title:       string;
  description: string;
  components:  ComponentInstance[];
  steps:       Step[];
  truthTable?: TruthTable;
};`}</pre>

      <h2>BuildFn (LabScene internal)</h2>
      <pre>{`// src/labs/LabScene.tsx — not exported, but useful for extension:
type BuildFn = (
  inst: ComponentInstance,
  all:  ComponentInstance[],
) => THREE.Group | null;`}</pre>

      <DocNav>
        <DocNavLink as={Link} href="/docs/columns" data-dir="prev">Column layout guide</DocNavLink>
        <DocNavLink as={Link} href="/docs/constraints" data-dir="next">Constraints &amp; rules</DocNavLink>
      </DocNav>
    </Prose>
  );
}
