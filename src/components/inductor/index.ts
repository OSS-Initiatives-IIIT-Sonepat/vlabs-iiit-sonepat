import * as THREE from "three";
import { PITCH, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { textLabel } from "@/components/shared/primitives";
import { buildAxialLead } from "@/components/resistor";

// ═══════════════════════════════════════════════════════════════════════════════
// INDUCTOR — Axial ferrite-core choke with an enamelled copper winding
// ═══════════════════════════════════════════════════════════════════════════════

export const INDUCTOR_PIN_P1 = "inductor-p1";
export const INDUCTOR_PIN_P2 = "inductor-p2";

function formatHenrys(h: number): string {
  if (h >= 1) return `${+h.toFixed(2)}H`;
  if (h >= 1e-3) return `${+(h * 1e3).toFixed(1)}mH`;
  return `${+(h * 1e6).toFixed(0)}µH`;
}

function buildInductorBodyMesh(bodyLen: number, coreR: number, henrys: number): THREE.Group {
  const grp = new THREE.Group();

  const ferriteMat = new THREE.MeshBasicMaterial({ color: 0x3a3a40 });
  const coreGeo = new THREE.CylinderGeometry(coreR, coreR, bodyLen, 20);
  coreGeo.rotateZ(Math.PI / 2);
  grp.add(new THREE.Mesh(coreGeo, ferriteMat));
  grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(coreGeo, 28), M.edge()));

  // Flanged end caps hold the winding in place.
  const capGeo = new THREE.CylinderGeometry(coreR * 1.45, coreR * 1.45, bodyLen * 0.08, 20);
  capGeo.rotateZ(Math.PI / 2);
  for (const sign of [-1, 1]) {
    const cap = new THREE.Mesh(capGeo, ferriteMat);
    cap.position.x = sign * bodyLen * 0.46;
    grp.add(cap);
    grp.add(
      Object.assign(new THREE.LineSegments(new THREE.EdgesGeometry(capGeo, 28), M.edge()), {
        position: cap.position.clone(),
      }),
    );
  }

  // Copper winding as a tight helix between the flanges.
  const turns = 9;
  const windLen = bodyLen * 0.8;
  const windR = coreR * 1.12;
  const pts: THREE.Vector3[] = [];
  const steps = turns * 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3(-windLen / 2 + t * windLen, Math.cos(a) * windR, Math.sin(a) * windR));
  }
  const helix = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), steps, coreR * 0.16, 6, false);
  grp.add(new THREE.Mesh(helix, new THREE.MeshBasicMaterial({ color: 0xc8742c })));

  const lbl = textLabel(formatHenrys(henrys), bodyLen * 0.7, coreR * 1.3, {
    textColor: "#ffffff",
    fontSize: 42,
    bold: true,
  });
  if (lbl) {
    lbl.rotation.x = -Math.PI / 2;
    lbl.position.set(0, coreR * 1.5, 0);
    grp.add(lbl);
  }

  return grp;
}

// ── Board-placed Inductor ───────────────────────────────────────────────────
export function buildInductor(
  lead1: THREE.Vector3,
  lead2: THREE.Vector3,
  henrys = 0.01,
): THREE.Group {
  const root = new THREE.Group();
  const midX = (lead1.x + lead2.x) / 2;
  const midZ = (lead1.z + lead2.z) / 2;
  const spanX = lead2.x - lead1.x;
  const spanZ = lead2.z - lead1.z;
  const span = Math.sqrt(spanX * spanX + spanZ * spanZ);
  const angle = Math.atan2(spanZ, spanX);

  const coreR = PITCH * 0.24;
  const bodyLen = span * 0.6;
  const bodyY = TOP_Y + PITCH * 0.4;

  const body = buildInductorBodyMesh(bodyLen, coreR, henrys);
  body.rotation.y = -angle;
  body.position.set(midX, bodyY, midZ);
  root.add(body);

  const halfLen = bodyLen * 0.5;
  const endL = new THREE.Vector3(midX - Math.cos(angle) * halfLen, bodyY, midZ - Math.sin(angle) * halfLen);
  const endR = new THREE.Vector3(midX + Math.cos(angle) * halfLen, bodyY, midZ + Math.sin(angle) * halfLen);
  const leadR = PITCH * 0.055;
  root.add(buildAxialLead(endL, lead1, leadR));
  root.add(buildAxialLead(endR, lead2, leadR));

  const p1 = new THREE.Object3D();
  p1.name = INDUCTOR_PIN_P1;
  p1.position.copy(lead1);
  root.add(p1);
  const p2 = new THREE.Object3D();
  p2.name = INDUCTOR_PIN_P2;
  p2.position.copy(lead2);
  root.add(p2);

  return root;
}

// ── Standalone Inductor (for Apparatus / Component Viewer) ──────────────────
export function buildInductorStandalone(henrys = 0.01): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const bodyLen = P * 2.6;
  root.add(buildInductorBodyMesh(bodyLen, P * 0.3, henrys));

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
