import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { textLabel } from "@/components/shared/primitives";

// ═══════════════════════════════════════════════════════════════════════════════
// RESISTOR — Axial 1/4W through-hole resistor with vibrant colors & crisp edges
// ═══════════════════════════════════════════════════════════════════════════════

export const RESISTOR_PIN_P1 = "resistor-p1";
export const RESISTOR_PIN_P2 = "resistor-p2";

const BAND_HEX: Record<number, number> = {
  0: 0x1a1a1a, // black
  1: 0x9c4814, // brown
  2: 0xe62e22, // red
  3: 0xf57c18, // orange
  4: 0xffd700, // yellow
  5: 0x22b44c, // green
  6: 0x2270d8, // blue
  7: 0x8e2de2, // violet
  8: 0x80848c, // grey
  9: 0xffffff, // white
};

function bandMat(digit: number): THREE.Material {
  const color = BAND_HEX[digit] ?? 0x1a1a1a;
  return new THREE.MeshBasicMaterial({ color });
}

function goldBandMat(): THREE.Material {
  return new THREE.MeshBasicMaterial({ color: 0xe8ac18 });
}

function resistorBands(
  ohms: number,
): [THREE.Material, THREE.Material, THREE.Material, THREE.Material] {
  let mult = 0;
  let val = Math.max(1, Math.round(ohms));
  while (val >= 100) {
    val = Math.round(val / 10);
    mult++;
  }
  while (val < 10 && mult > 0) {
    val *= 10;
    mult--;
  }

  const d1 = Math.floor(val / 10);
  const d2 = val % 10;

  return [bandMat(d1), bandMat(d2), bandMat(mult), goldBandMat()];
}

function buildDogBoneGeometry(
  totalLen: number,
  waistR: number,
): THREE.LatheGeometry {
  const halfL = totalLen / 2;
  const capR = waistR * 1.18;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0.001, -halfL),
    new THREE.Vector2(capR * 0.72, -halfL),
    new THREE.Vector2(capR, -halfL * 0.86),
    new THREE.Vector2(capR, -halfL * 0.56),
    new THREE.Vector2(waistR, -halfL * 0.38),
    new THREE.Vector2(waistR, halfL * 0.38),
    new THREE.Vector2(capR, halfL * 0.56),
    new THREE.Vector2(capR, halfL * 0.86),
    new THREE.Vector2(capR * 0.72, halfL),
    new THREE.Vector2(0.001, halfL),
  ];
  return new THREE.LatheGeometry(pts, 24);
}

function buildResistorBodyMesh(
  bodyLen: number,
  waistR: number,
  ohms: number,
): THREE.Group {
  const grp = new THREE.Group();

  // Warm tan-cream ceramic coating with crisp silhouette outline
  const lacquerMat = new THREE.MeshBasicMaterial({ color: 0xf3e2ba });
  const bodyGeo = buildDogBoneGeometry(bodyLen, waistR);
  bodyGeo.rotateZ(Math.PI / 2);
  grp.add(new THREE.Mesh(bodyGeo, lacquerMat));
  grp.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 28), M.edge()),
  );

  // 4 IEC color bands
  const bands = resistorBands(ohms);
  const bandX = [-0.28, -0.11, 0.06, 0.28].map((f) => f * bodyLen);
  const bandRadii = [
    waistR * 1.13,
    waistR * 1.03,
    waistR * 1.03,
    waistR * 1.13,
  ];
  const bandW = bodyLen * 0.088;

  for (let i = 0; i < 4; i++) {
    const r = bandRadii[i];
    const bGeo = new THREE.CylinderGeometry(r, r, bandW, 20);
    bGeo.rotateZ(Math.PI / 2);
    const bm = new THREE.Mesh(bGeo, bands[i]);
    bm.position.x = bandX[i];
    grp.add(bm);
  }

  // Value text on top of body
  const ohmText =
    ohms >= 1_000_000
      ? `${+(ohms / 1_000_000).toFixed(1)}MΩ`
      : ohms >= 1000
        ? `${+(ohms / 1000).toFixed(1)}kΩ`
        : `${ohms}Ω`;

  const lbl = textLabel(ohmText, bodyLen * 0.78, waistR * 1.35, {
    textColor: "#222222",
    fontSize: 42,
    bold: true,
  });
  if (lbl) {
    lbl.rotation.x = -Math.PI / 2;
    lbl.position.set(0, waistR * 1.22, 0);
    grp.add(lbl);
  }

  return grp;
}

export function buildAxialLead(
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
  const geo = new THREE.TubeGeometry(curve, 18, leadR, 8, false);
  return new THREE.Mesh(geo, M.gold());
}

// ── Board-placed Resistor ───────────────────────────────────────────────────
export function buildResistor(
  lead1: THREE.Vector3,
  lead2: THREE.Vector3,
  ohms = 330,
): THREE.Group {
  const root = new THREE.Group();
  const midX = (lead1.x + lead2.x) / 2;
  const midZ = (lead1.z + lead2.z) / 2;
  const spanX = lead2.x - lead1.x;
  const spanZ = lead2.z - lead1.z;
  const span = Math.sqrt(spanX * spanX + spanZ * spanZ);
  const angle = Math.atan2(spanZ, spanX);

  const waistR = PITCH * 0.28;
  const bodyLen = span * 0.62;
  const bodyY = TOP_Y + PITCH * 0.34;

  const bodyHolder = buildResistorBodyMesh(bodyLen, waistR, ohms);
  bodyHolder.rotation.y = -angle;
  bodyHolder.position.set(midX, bodyY, midZ);
  root.add(bodyHolder);

  const halfLen = bodyLen * 0.48;
  const bodyEndL = new THREE.Vector3(
    midX - Math.cos(angle) * halfLen,
    bodyY,
    midZ - Math.sin(angle) * halfLen,
  );
  const bodyEndR = new THREE.Vector3(
    midX + Math.cos(angle) * halfLen,
    bodyY,
    midZ + Math.sin(angle) * halfLen,
  );

  const leadR = PITCH * 0.055;
  root.add(buildAxialLead(bodyEndL, lead1, leadR));
  root.add(buildAxialLead(bodyEndR, lead2, leadR));

  // Named pin anchors
  const p1Anchor = new THREE.Object3D();
  p1Anchor.name = RESISTOR_PIN_P1;
  p1Anchor.position.copy(lead1);
  root.add(p1Anchor);

  const p2Anchor = new THREE.Object3D();
  p2Anchor.name = RESISTOR_PIN_P2;
  p2Anchor.position.copy(lead2);
  root.add(p2Anchor);

  return root;
}

// ── Standalone Resistor (for Apparatus / Component Viewer) ──────────────────
export function buildResistorStandalone(ohms = 330): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const waistR = P * 0.34;
  const bodyLen = P * 2.8;

  root.add(buildResistorBodyMesh(bodyLen, waistR, ohms));

  const leadLen = P * 1.8;
  const leadGeo = new THREE.CylinderGeometry(P * 0.06, P * 0.06, leadLen, 10);
  leadGeo.rotateZ(Math.PI / 2);

  for (const sign of [-1, 1]) {
    const lead = new THREE.Mesh(leadGeo, M.gold());
    lead.position.x = sign * (bodyLen / 2 + leadLen / 2 - P * 0.08);
    root.add(lead);
  }

  return root;
}
