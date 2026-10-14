import Link from "next/link";
import {
  Prose,
  DocEyebrow,
  Callout,
  DocNav,
  DocNavLink,
} from "@/sections/docs/doc-primitives";

export const metadata = {
  title: "Writing Geometry — VLabs Docs",
  description:
    "How to write a Three.js geometry builder for a new component type.",
};

export default function GeometryPage() {
  return (
    <Prose>
      <DocEyebrow>Adding Components</DocEyebrow>
      <h1>Writing geometry</h1>

      <p>
        A geometry builder is a pure TypeScript function that returns a
        <code> THREE.Group</code>. It receives the component&apos;s position
        data and returns a fully-formed 3D mesh — no React, no hooks, no side
        effects.
      </p>

      <hr />

      <h2>The three-step process</h2>

      <p>Adding a new renderable component type requires three changes:</p>

      <ol>
        <li>
          <strong>
            Add the variant to <code>src/labs/types.ts</code>
          </strong>{" "}
          — extends the <code>ComponentInstance</code> discriminated union.
        </li>
        <li>
          <strong>
            Create a component folder in <code>src/components/</code>
          </strong>{" "}
          — write the geometry builder and export it.
        </li>
        <li>
          <strong>
            Add one registry entry to <code>LabScene.tsx</code>
          </strong>{" "}
          — maps the type string to the builder function.
        </li>
      </ol>

      <p>
        The renderer itself never changes. That&apos;s the point of the
        registry.
      </p>

      <hr />

      <h2>Step 1 — Add the type variant</h2>

      <p>
        Open <code>src/labs/types.ts</code> and add a new branch to
        <code> ComponentInstance</code>:
      </p>

      <pre>{`// src/labs/types.ts

export type ComponentInstance =
  | { id: string; type: 'breadboard' }
  // ... existing types ...
  | { id: string; type: 'relay'; mountedAt: MountPoint; coilVoltage?: number }
  //                      ↑ new`}</pre>

      <h2>Step 2 — Create the component folder</h2>

      <p>
        Create a new folder under <code>src/components/</code> following the
        established pattern. Each component folder has an <code>index.ts</code>{" "}
        that exports both the board-mounted and standalone builder functions:
      </p>

      <pre>{`src/components/
  relay/
    index.ts    ← exports buildRelay() and buildRelayStandalone()`}</pre>

      <p>Here&apos;s an example builder:</p>

      <pre>{`// src/components/relay/index.ts

import * as THREE from 'three';
import { PITCH, TOP_Y, BOARD_H } from '@/labs/coords';
import { M, solidBox, solidCyl, centreAtOrigin } from '@/components/shared';

// ── RELAY ──────────────────────────────────────────────────────────────────
// board(mountPos)   — placed at exact hole position
// standalone()      — centred at origin for showcase cards

export function buildRelay(
  mountPos: THREE.Vector3,
): THREE.Group {
  const root = new THREE.Group();

  // Body — dark housing
  const body = solidBox(PITCH * 4, PITCH * 3, PITCH * 2.5, M.dark());
  body.position.set(mountPos.x + PITCH, TOP_Y + PITCH * 1.5, mountPos.z);
  root.add(body);

  // Coil indicator
  const coil = solidCyl(PITCH * 0.6, PITCH * 2.2, M.hex(0x8b4513));
  coil.position.set(mountPos.x + PITCH, TOP_Y + PITCH * 1.5, mountPos.z);
  root.add(coil);

  // Leads (4 pins)
  const leadH = PITCH * 1.8 + BOARD_H * 0.6;
  for (let i = 0; i < 4; i++) {
    const lx = mountPos.x + (i - 1) * PITCH;
    const lead = new THREE.Mesh(
      new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH, 6),
      M.gold(),
    );
    lead.position.set(lx, TOP_Y - BOARD_H * 0.3 + leadH / 2, mountPos.z);
    root.add(lead);
  }

  return root;
}

export function buildRelayStandalone(): THREE.Group {
  const g = buildRelay(new THREE.Vector3(0, 0, 0));
  centreAtOrigin(g);
  return g;
}`}</pre>

      <h3>Geometry style rules</h3>

      <ul>
        <li>
          Use only Three.js primitives: <code>BoxGeometry</code>,{" "}
          <code>CylinderGeometry</code>, <code>SphereGeometry</code>,{" "}
          <code>TorusGeometry</code>.
        </li>
        <li>
          No <code>.glb</code> files, no textures, no external assets.
        </li>
        <li>
          White/cream fill + black wireframe edges — use <code>M.white()</code>,{" "}
          <code>M.cream()</code>, <code>M.dark()</code>.
        </li>
        <li>
          Leads always use <code>M.gold()</code>.
        </li>
        <li>
          Body height expressed in <code>PITCH</code> multiples (
          <code>PITCH = 0.18</code> units ≈ 2.54mm).
        </li>
        <li>
          Position relative to <code>TOP_Y</code> (the breadboard surface).
          Leads hang below into the board.
        </li>
        <li>
          Both variants: board-mounted (takes <code>THREE.Vector3</code> hole
          positions) and <code>Standalone</code> (centred at origin for display
          cards).
        </li>
      </ul>

      <h3>Available material helpers</h3>

      <pre>{`M.white()     // #ffffff fill
M.gray()      // #c8c8c8 fill
M.dark()      // #141414 fill
M.cream()     // #f5e6c8 fill (resistor body)
M.capblue()   // #1a4a7a fill (capacitor body)
M.gold()      // #d4a017 fill (leads)
M.silver()    // #c0c0c0 fill
M.edge()      // black EdgesGeometry material (wireframe)
M.hex(0xrrggbb)  // arbitrary fill colour`}</pre>

      <h3>Available primitive helpers</h3>

      <pre>{`solidBox(w, h, d, mat)       // box mesh + edge lines
solidCyl(r, h, mat, seg=14)  // cylinder mesh + edge lines
textLabel(text, w, h, opts)  // canvas-texture plane (SSR-safe, returns null on server)
centreAtOrigin(group)        // recentres a group's bounding box at (0,0,0)
instrumentWire(from, to)     // probe wire between two Vector3 points`}</pre>

      <h2>Step 3 — Export the builder</h2>

      <p>
        Add the export to <code>src/components/index.ts</code>:
      </p>

      <pre>{`// src/components/index.ts
export { buildRelay, buildRelayStandalone } from './relay';`}</pre>

      <h2>Step 4 — Add the registry entry</h2>

      <p>
        Open <code>src/labs/LabScene.tsx</code> and add one entry to
        <code> COMPONENT_REGISTRY</code>:
      </p>

      <pre>{`// src/labs/LabScene.tsx

import { buildRelay, /* ... */ } from '@/components';

const COMPONENT_REGISTRY: Record<string, BuildFn> = {
  // ... existing entries ...

  'relay': (inst) => {
    const d = inst as Extract<ComponentInstance, { type: 'relay' }>;
    return buildRelay(hole(d.mountedAt.col, d.mountedAt.row));
  },
};`}</pre>

      <Callout $tone="tip">
        <strong>That&apos;s the entire change to the renderer</strong>
        <p>
          One import and one object entry. The renderer&apos;s{" "}
          <code>buildInstance</code>
          function is generic — it calls{" "}
          <code>COMPONENT_REGISTRY[inst.type]</code>
          and returns whatever the builder gives back. No switch statement, no
          fallthrough, no case to forget.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/components" data-dir="prev">
          Component types
        </DocNavLink>
        <DocNavLink as={Link} href="/docs/registry" data-dir="next">
          Registry &amp; renderer
        </DocNavLink>
      </DocNav>
    </Prose>
  );
}
