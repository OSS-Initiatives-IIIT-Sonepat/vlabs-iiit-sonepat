import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { textLabel } from "@/components/shared/primitives";

// ═══════════════════════════════════════════════════════════════════════════════
// DIODE — DO-35 Glass Signal Diode (1N4148), DO-41 Rectifier (1N4007),
//         and DO-35 Glass Zener Diode (1N4733A) with vibrant colors & crisp edges
// ═══════════════════════════════════════════════════════════════════════════════

export const DIODE_PIN_ANODE = "diode-anode";
export const DIODE_PIN_CATHODE = "diode-cathode";

export type DiodeType = "1N4148" | "1N4007" | "zener";

interface DiodeSpec {
  label: string;
  bodyLength: number;
  bodyRadius: number;
  glass: boolean;
  bodyColor: number;
  bandColor: number;
}

const DIODE_SPECS: Record<DiodeType, DiodeSpec> = {
  "1N4148": {
    label: "1N4148",
    bodyLength: PITCH * 1.75,
    bodyRadius: PITCH * 0.28,
    glass: true,
    bodyColor: 0xf05a24, // bright fiery orange-amber DO-35 glass package
    bandColor: 0x141414, // jet-black cathode ring
  },
  "1N4007": {
    label: "1N4007",
    bodyLength: PITCH * 2.05,
    bodyRadius: PITCH * 0.34,
    glass: false,
    bodyColor: 0x22262e, // dark DO-41 epoxy package
    bandColor: 0xdce4ee, // bright silver cathode ring
  },
  zener: {
    label: "1N4733A",
    bodyLength: PITCH * 1.85,
    bodyRadius: PITCH * 0.28,
    glass: true,
    bodyColor: 0xe23e28, // bright crimson-orange Zener glass package
    bandColor: 0x141414, // black cathode ring
  },
};

function buildDiodePackageMesh(spec: DiodeSpec): THREE.Group {
  const grp = new THREE.Group();
  const { bodyLength, bodyRadius: r, bodyColor, bandColor, label } = spec;

  const bodyMat = new THREE.MeshBasicMaterial({ color: bodyColor });
  const cylGeo = new THREE.CylinderGeometry(r, r, bodyLength, 20);
  cylGeo.rotateZ(Math.PI / 2);
  grp.add(new THREE.Mesh(cylGeo, bodyMat));
  grp.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(cylGeo, 25), M.edge()),
  );

  // Cathode polarity band on the right (+X) end
  const bandW = bodyLength * 0.2;
  const bandGeo = new THREE.CylinderGeometry(
    r + 0.006,
    r + 0.006,
    bandW,
    20,
  );
  bandGeo.rotateZ(Math.PI / 2);
  const bandMat = new THREE.MeshBasicMaterial({ color: bandColor });
  const band = new THREE.Mesh(bandGeo, bandMat);
  band.position.x = bodyLength / 2 - bandW * 0.72;
  grp.add(band);
  const bandEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(bandGeo, 25),
    M.edge(),
  );
  bandEdge.position.copy(band.position);
  grp.add(bandEdge);

  // Crisp part label on top of the diode body
  const lbl = textLabel(label, bodyLength * 0.74, r * 1.35, {
    textColor: "#ffffff",
    fontSize: 42,
    bold: true,
  });
  if (lbl) {
    lbl.rotation.x = -Math.PI / 2;
    lbl.position.set(-bodyLength * 0.08, r + 0.016, 0);
    grp.add(lbl);
  }

  return grp;
}

function buildAxialDiodeLead(
  bodyEnd: THREE.Vector3,
  holePos: THREE.Vector3,
  leadR: number,
): THREE.Mesh {
  const bottom = new THREE.Vector3(
    holePos.x,
    TOP_Y - BOARD_H * 0.35,
    holePos.z,
  );
  const holeEntry = new THREE.Vector3(
    holePos.x,
    TOP_Y + PITCH * 0.05,
    holePos.z,
  );
  const corner = new THREE.Vector3(holePos.x, bodyEnd.y, holePos.z);

  const curve = new THREE.CatmullRomCurve3([
    bodyEnd,
    bodyEnd.clone().lerp(corner, 0.72),
    corner,
    holeEntry,
    bottom,
  ]);
  return new THREE.Mesh(
    new THREE.TubeGeometry(curve, 16, leadR, 8, false),
    M.gold(),
  );
}

// ── Mounted Diode ───────────────────────────────────────────────────────────
export function buildDiode(
  anodePos: THREE.Vector3,
  cathodePos: THREE.Vector3,
  type: DiodeType = "1N4148",
): THREE.Group {
  const root = new THREE.Group();
  const spec = DIODE_SPECS[type];
  const cx = (anodePos.x + cathodePos.x) / 2;
  const cz = (anodePos.z + cathodePos.z) / 2;
  const spanX = cathodePos.x - anodePos.x;
  const spanZ = cathodePos.z - anodePos.z;
  const angle = Math.atan2(spanZ, spanX);

  const bodyY = TOP_Y + PITCH * 0.32;
  const pkg = buildDiodePackageMesh(spec);
  pkg.rotation.y = -angle;
  pkg.position.set(cx, bodyY, cz);
  root.add(pkg);

  const halfLen = spec.bodyLength / 2;
  const endAnode = new THREE.Vector3(
    cx - Math.cos(angle) * halfLen,
    bodyY,
    cz - Math.sin(angle) * halfLen,
  );
  const endCathode = new THREE.Vector3(
    cx + Math.cos(angle) * halfLen,
    bodyY,
    cz + Math.sin(angle) * halfLen,
  );

  const leadR = PITCH * 0.052;
  root.add(buildAxialDiodeLead(endAnode, anodePos, leadR));
  root.add(buildAxialDiodeLead(endCathode, cathodePos, leadR));

  // Named pin anchors
  const aAnchor = new THREE.Object3D();
  aAnchor.name = DIODE_PIN_ANODE;
  aAnchor.position.copy(anodePos);
  root.add(aAnchor);

  const cAnchor = new THREE.Object3D();
  cAnchor.name = DIODE_PIN_CATHODE;
  cAnchor.position.copy(cathodePos);
  root.add(cAnchor);

  return root;
}

// ── Standalone Normal Diode ─────────────────────────────────────────────────
export function buildDiodeStandalone(
  type: "1N4148" | "1N4007" = "1N4148",
): THREE.Group {
  const root = new THREE.Group();
  const spec = DIODE_SPECS[type];
  root.add(buildDiodePackageMesh(spec));

  const leadLen = PITCH * 1.5;
  const leadGeo = new THREE.CylinderGeometry(
    PITCH * 0.06,
    PITCH * 0.06,
    leadLen,
    10,
  );
  leadGeo.rotateZ(Math.PI / 2);

  for (const sign of [-1, 1]) {
    const lead = new THREE.Mesh(leadGeo, M.gold());
    lead.position.x = sign * (spec.bodyLength / 2 + leadLen / 2);
    root.add(lead);
  }

  return root;
}

// ── Standalone Zener Diode ──────────────────────────────────────────────────
export function buildZenerDiodeStandalone(): THREE.Group {
  const root = new THREE.Group();
  const spec = DIODE_SPECS["zener"];
  root.add(buildDiodePackageMesh(spec));

  const leadLen = PITCH * 1.5;
  const leadGeo = new THREE.CylinderGeometry(
    PITCH * 0.06,
    PITCH * 0.06,
    leadLen,
    10,
  );
  leadGeo.rotateZ(Math.PI / 2);

  for (const sign of [-1, 1]) {
    const lead = new THREE.Mesh(leadGeo, M.gold());
    lead.position.x = sign * (spec.bodyLength / 2 + leadLen / 2);
    root.add(lead);
  }

  return root;
}

// ── Mounted Zener Diode ─────────────────────────────────────────────────────
export function buildZenerDiode(
  anodePos: THREE.Vector3,
  cathodePos: THREE.Vector3,
): THREE.Group {
  return buildDiode(anodePos, cathodePos, "zener");
}
