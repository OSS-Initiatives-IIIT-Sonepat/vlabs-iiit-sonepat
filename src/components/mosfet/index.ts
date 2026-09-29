import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ── MOSFET — 2N7000 (TO-92) ─────────────────────────────────────────────────
// Small N-channel enhancement MOSFET in TO-92 package.
// Three inline leads: Drain, Gate, Source.
//
// Mounted form: sits vertically over breadboard holes.
// Standalone form: centered at origin for apparatus cards.

export function buildMosfetStandalone(label = "2N7000"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const R = P * 0.75;
  const H = P * 2.2;

  // Package body group
  const bodyGrp = new THREE.Group();

  // Rounded back (half cylinder)
  const backGeo = new THREE.CylinderGeometry(
    R,
    R,
    H,
    18,
    1,
    false,
    Math.PI / 2,
    Math.PI,
  );
  const backMesh = new THREE.Mesh(backGeo, M.dark());
  backMesh.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(backGeo, 20), M.edge()),
  );
  bodyGrp.add(backMesh);

  // Flat front face
  const frontGeo = new THREE.BoxGeometry(R * 2, H, R * 0.4);
  const frontMesh = new THREE.Mesh(frontGeo, M.dark());
  frontMesh.position.set(0, 0, R * 0.16);
  frontMesh.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(frontGeo), M.edge()),
  );
  bodyGrp.add(frontMesh);

  // Beveled top cap
  const capGeo = new THREE.CylinderGeometry(
    R * 0.88,
    R,
    P * 0.22,
    18,
    1,
    false,
    Math.PI / 2,
    Math.PI,
  );
  const capMesh = new THREE.Mesh(capGeo, M.dark());
  capMesh.position.set(0, H / 2 + P * 0.11, 0);
  bodyGrp.add(capMesh);

  // Model label (2N7000)
  const codeLabel = textLabel(label, R * 1.8, H * 0.32, {
    textColor: "#d0d0d0",
    fontSize: 44,
    bold: true,
  });
  if (codeLabel) {
    codeLabel.position.set(0, H * 0.12, R * 0.37);
    bodyGrp.add(codeLabel);
  }

  // Type sub-label (N-CH)
  const typeLabel = textLabel("N-CH", R * 1.2, H * 0.2, {
    textColor: "#70a0d0",
    fontSize: 32,
    bold: true,
  });
  if (typeLabel) {
    typeLabel.position.set(0, -H * 0.2, R * 0.37);
    bodyGrp.add(typeLabel);
  }

  bodyGrp.position.y = H * 0.25;
  root.add(bodyGrp);

  // Three leads: Drain, Gate, Source (spacing PITCH * 0.6)
  // Pinout for 2N7000: Source, Gate, Drain (or D-G-S)
  const leadLen = P * 2.6;
  const leadR = P * 0.07;
  const pinSpacing = P * 0.6;
  const pinLabels = ["S", "G", "D"];

  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * pinSpacing;
    const lead = solidCyl(leadR, leadLen, M.silver(), 8);
    lead.position.set(x, bodyGrp.position.y - H / 2 - leadLen / 2 + P * 0.05, 0);
    root.add(lead);

    const pLabel = textLabel(pinLabels[i], P * 0.4, P * 0.3, {
      textColor: "#666666",
      fontSize: 36,
      bold: true,
    });
    if (pLabel) {
      pLabel.position.set(x, bodyGrp.position.y - H / 2 - P * 0.25, R * 0.2);
      root.add(pLabel);
    }
  }

  return root;
}

export function buildMosfet(
  mountPos?: THREE.Vector3,
  label = "2N7000",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const pos = mountPos ?? new THREE.Vector3(0, TOP_Y, 0);

  const model = buildMosfetStandalone(label);
  const H = P * 2.2;
  const leadH = H * 0.45 + BOARD_H * 0.5;

  model.position.set(pos.x, pos.y + leadH, pos.z);
  root.add(model);

  return root;
}
