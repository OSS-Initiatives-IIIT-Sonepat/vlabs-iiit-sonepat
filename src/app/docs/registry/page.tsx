import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Registry & Renderer — VLabs Docs',
  description: 'How COMPONENT_REGISTRY works and how to add entries to it.',
};

export default function RegistryPage() {
  return (
    <Prose>
      <DocEyebrow>Adding Components</DocEyebrow>
      <h1>Registry &amp; renderer</h1>

      <p>
        <code>LabScene.tsx</code> contains a single data structure that connects
        component type strings to their geometry builders:
      </p>

      <pre>{`const COMPONENT_REGISTRY: Record<string, BuildFn> = {
  breadboard: () => buildBreadboard(COLS),
  'xor-gate': (inst) => buildDip14(inst.mountedAt.col, 'XOR'),
  resistor:   (inst) => {
    const r = inst as Extract<ComponentInstance, { type: 'resistor' }>;
    return buildResistor(hole(r.mountedAt.col, r.mountedAt.row), ..., r.ohms);
  },
  // ...
};`}</pre>

      <p>
        The renderer dispatches through it:
      </p>

      <pre>{`function buildInstance(inst: ComponentInstance, all: ComponentInstance[]) {
  const builder = COMPONENT_REGISTRY[inst.type];
  return builder ? builder(inst, all) : null;
}`}</pre>

      <p>
        If a type has no entry, <code>buildInstance</code> returns <code>null</code> and
        the component is silently skipped. This is how "pending" types work — they're
        valid in the schema but invisible until a builder is added.
      </p>

      <hr />

      <h2>The BuildFn signature</h2>

      <pre>{`type BuildFn = (
  inst: ComponentInstance,
  all:  ComponentInstance[],
) => THREE.Group | null;`}</pre>

      <p>
        The <code>all</code> parameter is the full component list. Wires need it to
        look up where other components are mounted (to resolve IC pin positions, for
        example). Most non-wire builders ignore it.
      </p>

      <h2>Casting safely inside a registry entry</h2>

      <p>
        The registry value receives <code>ComponentInstance</code> (the union). To
        access type-specific fields, cast using <code>Extract</code>:
      </p>

      <pre>{`'led': (inst) => {
  const l = inst as Extract<ComponentInstance, { type: 'led' }>;
  //    ↑ now l.color and l.mountedAt are typed
  return buildLed(
    hole(l.mountedAt.col,     l.mountedAt.row),
    hole(l.mountedAt.col + 1, l.mountedAt.row),
    l.color,
  );
},`}</pre>

      <Callout $tone="info">
        <strong>Why not use a switch?</strong>
        <p>
          A switch in the renderer couples every component type to a single
          function. The registry decouples them: each type's builder can live in
          a separate file, be imported independently, and be added or removed
          without touching any existing case. It also makes the set of renderable
          types machine-readable — you can iterate <code>Object.keys(COMPONENT_REGISTRY)</code>
          to know what's supported.
        </p>
      </Callout>

      <h2>Wires and the two-argument form</h2>

      <p>
        Wires are the only type that uses the second <code>all</code> argument,
        because resolving an IC pin or passive lead requires finding the referenced
        component's position:
      </p>

      <pre>{`wire: (inst, all) => {
  const w = inst as Extract<ComponentInstance, { type: 'wire' }>;
  const from = resolvePin(w.from, all);   // ← needs all
  const to   = resolvePin(w.to,   all);
  if (!from || !to) return null;          // graceful: bad ref = no wire
  return buildWire(from, to, w.color);
},`}</pre>

      <h2>Adding a new entry — checklist</h2>

      <ol>
        <li>Type variant added to <code>ComponentInstance</code> in <code>types.ts</code></li>
        <li>Geometry builder written in <code>geometry/</code> and exported from <code>geometry/index.ts</code></li>
        <li>Builder imported at the top of <code>LabScene.tsx</code></li>
        <li>One new key added to <code>COMPONENT_REGISTRY</code></li>
        <li>
          Optional: <code>Standalone</code> variant for the showcase card
          (<code>buildXxxStandalone()</code>)
        </li>
      </ol>

      <DocNav>
        <DocNavLink as={Link} href="/docs/geometry" data-dir="prev">Writing geometry</DocNavLink>
        <DocNavLink as={Link} href="/docs/circuits" data-dir="next">Circuit schema</DocNavLink>
      </DocNav>
    </Prose>
  );
}
