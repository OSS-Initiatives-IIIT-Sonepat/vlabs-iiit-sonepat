import Link from 'next/link';
import { Prose, DocEyebrow, Callout, DocNav, DocNavLink } from '@/sections/docs/doc-primitives';

export const metadata = {
  title: 'Writing Geometry — VLabs Docs',
  description: 'How to write a Three.js geometry builder for a new component type.',
};

export default function GeometryPage() {
  return (
    <Prose>
      <DocEyebrow>Adding Components</DocEyebrow>
      <h1>Writing geometry</h1>

      <p>
        A geometry builder is a pure TypeScript function that returns a
        <code> THREE.Group</code>. It receives the component's position data and
        returns a fully-formed 3D mesh — no React, no hooks, no side effects.
      </p>

      <hr />

      <h2>The three-file edit</h2>

      <p>Adding a new renderable component type requires exactly three changes:</p>

      <ol>
        <li>
          <strong>Add the variant to <code>types.ts</code></strong> —
          extends the <code>ComponentInstance</code> discriminated union.
        </li>
        <li>
          <strong>Write the geometry builder</strong> —
          in <code>geometry/extra-components.ts</code> (or a new file).
        </li>
        <li>
          <strong>Add one registry entry to <code>LabScene.tsx</code></strong> —
          maps the type string to the builder function.
        </li>
      </ol>

      <p>The renderer itself never changes. That's the point of the registry.</p>

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
  | { id: string; type: '7seg-display'; mountedAt: MountPoint; digits?: number }
  //                      ↑ new`}</pre>

      <h2>Step 2 — Write the geometry builder</h2>

      <p>
        Add a function to <code>src/labs/geometry/extra-components.ts</code>.
        Follow the established style exactly:
      </p>

      <pre>{`// src/labs/geometry/extra-components.ts

import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y } from '../coords';
import { M } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── 7-SEGMENT DISPLAY ─────────────────────────────────────────────────────
// board(mountCol, mountRow)  — placed at exact hole position
// standalone()               — centred at origin for showcase cards

export function build7SegDisplay(
  mountPos: THREE.Vector3,
): THREE.Group {
  const root = new THREE.Group();

  // Body
  const body = solidBox(PITCH * 3.2, PITCH * 4.8, PITCH * 0.5, M.dark());
  body.position.set(mountPos.x, TOP_Y + PITCH * 2.4, mountPos.z);
  root.add(body);

  // Segment outlines (seven rectangles — a through g)
  const SEG_W = PITCH * 1.1, SEG_H = PITCH * 0.22;
  const segPositions = [
    // [x_offset, y_offset, rotate90]
    [0,  PITCH * 2.0, false],   // a — top horizontal
    [ PITCH * 0.6,  PITCH * 1.2, true],  // b — top-right vertical
    [ PITCH * 0.6, -PITCH * 0.2, true],  // c — bot-right vertical
    [0, -PITCH * 1.0, false],   // d — bottom horizontal
    [-PITCH * 0.6, -PITCH * 0.2, true],  // e — bot-left vertical
    [-PITCH * 0.6,  PITCH * 1.2, true],  // f — top-left vertical
    [0,  PITCH * 0.4, false],   // g — middle horizontal
  ];

  for (const [dx, dy, rot] of segPositions) {
    const sw = rot ? SEG_H : SEG_W;
    const sh = rot ? SEG_W : SEG_H;
    const seg = solidBox(sw, sh, PITCH * 0.06, M.hex(0xd63b2a));
    seg.position.set(
      mountPos.x + (dx as number),
      TOP_Y + PITCH * 2.4 + (dy as number),
      mountPos.z + PITCH * 0.28,
    );
    root.add(seg);
  }

  // Leads (one per pin — DIP footprint, 5 pins per side)
  const leadH = PITCH * 1.8 + BOARD_H * 0.6;
  for (let i = 0; i < 5; i++) {
    const lx = mountPos.x + (i - 2) * PITCH;
    const lead = new THREE.Mesh(
      new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH, 6),
      M.gold(),
    );
    lead.position.set(lx, TOP_Y - BOARD_H * 0.3 + leadH / 2, mountPos.z);
    root.add(lead);
  }

  return root;
}

export function build7SegDisplayStandalone(): THREE.Group {
  // Re-use board variant, pass origin position
  return build7SegDisplay(new THREE.Vector3(0, 0, 0));
}`}</pre>

      <h3>Geometry style rules</h3>

      <ul>
        <li>Use only Three.js primitives: <code>BoxGeometry</code>, <code>CylinderGeometry</code>, <code>SphereGeometry</code>, <code>TorusGeometry</code>.</li>
        <li>No <code>.glb</code> files, no textures, no external assets.</li>
        <li>White/cream fill + black wireframe edges — use <code>M.white()</code>, <code>M.cream()</code>, <code>M.dark()</code>.</li>
        <li>Leads always use <code>M.gold()</code>.</li>
        <li>Body height expressed in <code>PITCH</code> multiples (<code>PITCH = 0.18</code> units ≈ 2.54mm).</li>
        <li>Position relative to <code>TOP_Y</code> (the breadboard surface). Leads hang below into the board.</li>
        <li>Both variants: board-mounted (takes <code>THREE.Vector3</code> hole positions) and <code>Standalone</code> (centred at origin for display cards).</li>
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
centreAtOrigin(group)        // recentres a group's bounding box at (0,0,0)`}</pre>

      <h2>Step 3 — Export the builder</h2>

      <p>
        Add the export to <code>src/labs/geometry/index.ts</code>:
      </p>

      <pre>{`// src/labs/geometry/index.ts
export {
  // ... existing exports ...
  build7SegDisplay,
  build7SegDisplayStandalone,
} from './extra-components';`}</pre>

      <h2>Step 4 — Add the registry entry</h2>

      <p>
        Open <code>src/labs/LabScene.tsx</code> and add one entry to
        <code> COMPONENT_REGISTRY</code>:
      </p>

      <pre>{`// src/labs/LabScene.tsx

import { build7SegDisplay, /* ... */ } from './geometry/index';

const COMPONENT_REGISTRY: Record<string, BuildFn> = {
  // ... existing entries ...

  '7seg-display': (inst) => {
    const d = inst as Extract<ComponentInstance, { type: '7seg-display' }>;
    return build7SegDisplay(hole(d.mountedAt.col, d.mountedAt.row));
  },
};`}</pre>

      <Callout $tone="tip">
        <strong>That's the entire change to the renderer</strong>
        <p>
          One import and one object entry. The renderer's <code>buildInstance</code>
          function is generic — it calls <code>COMPONENT_REGISTRY[inst.type]</code>
          and returns whatever the builder gives back. No switch statement, no
          fallthrough, no case to forget.
        </p>
      </Callout>

      <DocNav>
        <DocNavLink as={Link} href="/docs/components" data-dir="prev">Component types</DocNavLink>
        <DocNavLink as={Link} href="/docs/registry" data-dir="next">Registry & renderer</DocNavLink>
      </DocNav>
    </Prose>
  );
}
