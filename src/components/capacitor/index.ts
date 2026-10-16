import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { textLabel } from "@/components/shared/primitives";

// ═══════════════════════════════════════════════════════════════════════════════
// CAPACITOR — Vibrant Ceramic Disc (< 1 µF) & Radial Electrolytic (>= 1 µF)
// ═══════════════════════════════════════════════════════════════════════════════

export const CAPACITOR_PIN_P1 = "capacitor-p1";
export const CAPACITOR_PIN_P2 = "capacitor-p2";

/**
 * Builds a dipped ceramic disc capacitor (used for values < 1 µF such as 0.1 µF / 104).
 */
function buildCeramicDiscBody(
  discR: number,
  capacitance: number,
): THREE.Group {
  const grp = new THREE.Group();

  const ochreMat = new THREE.MeshBasicMaterial({
    color: 0xf08c28, // bright terracotta-orange dipped ceramic disc
  });

  // Lenticular disc body (flattened cylinder + domes + crisp outline)
  const rimT = discR * 0.34;
  const cylGeo = new THREE.CylinderGeometry(discR, discR, rimT, 24);
  cylGeo.rotateX(Math.PI / 2);
  grp.add(new THREE.Mesh(cylGeo, ochreMat));
  grp.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(cylGeo, 25), M.edge()),
  );

  for (const sign of [-1, 1]) {
    const domeGeo = new THREE.SphereGeometry(discR, 24, 12);
    domeGeo.scale(1, 1, 0.22);
    const dome = new THREE.Mesh(domeGeo, ochreMat);
    dome.position.z = sign * (rimT * 0.45);
    grp.add(dome);
  }

  // Two small dipped epoxy "pants" around the top of the leads
  for (const sx of [-1, 1]) {
    const legCoatGeo = new THREE.CylinderGeometry(
      discR * 0.16,
      discR * 0.09,
      discR * 0.38,
      12,
    );
    const legCoat = new THREE.Mesh(legCoatGeo, ochreMat);
    legCoat.position.set(sx * discR * 0.48, -discR * 0.92, 0);
    grp.add(legCoat);
  }

  // Printed EIA code ("104" for 0.1 µF) + value on the front face
  const codeText =
    capacitance <= 0.001
      ? "102"
      : capacitance <= 0.01
        ? "103"
        : capacitance <= 0.15
          ? "104"
          : "474";

  const codeLbl = textLabel(codeText, discR * 1.4, discR * 0.72, {
    textColor: "#1a1410",
    fontSize: 44,
    bold: true,
  });
  if (codeLbl) {
    codeLbl.position.set(0, discR * 0.12, rimT * 0.45 + discR * 0.24);
    grp.add(codeLbl);
  }

  const valStr = `${capacitance}µF`;
  const valLbl = textLabel(valStr, discR * 1.35, discR * 0.52, {
    textColor: "#2a1e14",
    fontSize: 32,
    bold: true,
  });
  if (valLbl) {
    valLbl.position.set(0, -discR * 0.34, rimT * 0.45 + discR * 0.24);
    grp.add(valLbl);
  }

  return grp;
}

/**
 * Builds a radial aluminum electrolytic capacitor can (used for values >= 1 µF).
 */
function buildElectrolyticCanBody(
  R: number,
  H: number,
  capacitance: number,
): THREE.Group {
  const grp = new THREE.Group();

  const sleeveMat = new THREE.MeshBasicMaterial({ color: 0x1d4fa0 });
  const stripeMat = new THREE.MeshBasicMaterial({ color: 0xdce4ee });

  const lowerH = H * 0.62;
  const upperH = H * 0.28;
  const grooveH = H - lowerH - upperH;

  // Lower sleeve
  const lowerGeo = new THREE.CylinderGeometry(R, R, lowerH, 24);
  const lower = new THREE.Mesh(lowerGeo, sleeveMat);
  lower.position.y = -H / 2 + lowerH / 2;
  grp.add(lower);
  const lowerEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(lowerGeo, 25),
    M.edge(),
  );
  lowerEdge.position.copy(lower.position);
  grp.add(lowerEdge);

  // Crimp waist groove
  const grooveGeo = new THREE.CylinderGeometry(R * 0.88, R * 0.88, grooveH, 24);
  const groove = new THREE.Mesh(grooveGeo, sleeveMat);
  groove.position.y = -H / 2 + lowerH + grooveH / 2;
  grp.add(groove);

  // Upper sleeve above crimp
  const upperGeo = new THREE.CylinderGeometry(R, R, upperH, 24);
  const upper = new THREE.Mesh(upperGeo, sleeveMat);
  upper.position.y = H / 2 - upperH / 2;
  grp.add(upper);
  const upperEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(upperGeo, 25),
    M.edge(),
  );
  upperEdge.position.copy(upper.position);
  grp.add(upperEdge);

  // Rubber bung at bottom
  const crimpGeo = new THREE.CylinderGeometry(R * 0.9, R * 0.84, H * 0.05, 20);
  const crimp = new THREE.Mesh(crimpGeo, M.dark());
  crimp.position.y = -H / 2;
  grp.add(crimp);

  // Brushed aluminum top vent disc with K-score safety lines
  const topDiscGeo = new THREE.CylinderGeometry(
    R * 0.86,
    R * 0.86,
    H * 0.025,
    24,
  );
  const topDisc = new THREE.Mesh(topDiscGeo, M.silver());
  topDisc.position.y = H / 2 + H * 0.005;
  grp.add(topDisc);

  const scoreMat = new THREE.LineBasicMaterial({ color: 0x333840 });
  const scorePts = [
    new THREE.Vector3(-R * 0.65, H / 2 + H * 0.02, 0),
    new THREE.Vector3(R * 0.65, H / 2 + H * 0.02, 0),
    new THREE.Vector3(0, H / 2 + H * 0.02, 0),
    new THREE.Vector3(R * 0.45, H / 2 + H * 0.02, R * 0.48),
    new THREE.Vector3(0, H / 2 + H * 0.02, 0),
    new THREE.Vector3(R * 0.45, H / 2 + H * 0.02, -R * 0.48),
  ];
  grp.add(
    new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(scorePts),
      scoreMat,
    ),
  );

  // Vertical polarity stripe on the negative (+X) side
  const stripeArc = Math.PI * 0.34;
  const stripeGeo = new THREE.CylinderGeometry(
    R + 0.004,
    R + 0.004,
    H * 0.94,
    12,
    1,
    true,
    Math.PI / 2 - stripeArc / 2,
    stripeArc,
  );
  grp.add(new THREE.Mesh(stripeGeo, stripeMat));

  for (const yFrac of [-0.26, 0.04, 0.32]) {
    const minus = new THREE.Mesh(
      new THREE.BoxGeometry(0.012, H * 0.13, R * 0.18),
      M.dark(),
    );
    minus.position.set(R + 0.006, H * yFrac, 0);
    grp.add(minus);
  }

  // Value & voltage markings facing +Z
  const valText =
    capacitance >= 1000 ? `${capacitance / 1000}mF` : `${capacitance}µF`;
  const valL = textLabel(valText, R * 1.6, H * 0.25, {
    textColor: "#f0f6ff",
    fontSize: 42,
    bold: true,
  });
  if (valL) {
    valL.position.set(0, H * 0.06, R + 0.008);
    grp.add(valL);
  }

  const vL = textLabel("25V", R * 1.25, H * 0.16, {
    textColor: "#c8dcf4",
    fontSize: 32,
  });
  if (vL) {
    vL.position.set(0, -H * 0.2, R + 0.008);
    grp.add(vL);
  }

  return grp;
}

// ── Board-placed Capacitor ──────────────────────────────────────────────────
export function buildCapacitor(
  lead1: THREE.Vector3,
  lead2: THREE.Vector3,
  capacitance = 100,
): THREE.Group {
  const root = new THREE.Group();
  const cx = (lead1.x + lead2.x) / 2;
  const cz = (lead1.z + lead2.z) / 2;
  const spanX = lead2.x - lead1.x;
  const spanZ = lead2.z - lead1.z;
  const angle = Math.atan2(spanZ, spanX);

  const isCeramic = capacitance > 0 && capacitance < 1;
  const leadR = PITCH * 0.05;

  if (isCeramic) {
    const discR = PITCH * 0.62;
    const bodyY = TOP_Y + discR + PITCH * 0.52;

    const disc = buildCeramicDiscBody(discR, capacitance);
    disc.rotation.y = -angle;
    disc.position.set(cx, bodyY, cz);
    root.add(disc);

    const legTopOffset = discR * 0.48;
    const top1 = new THREE.Vector3(
      cx - Math.cos(angle) * legTopOffset,
      bodyY - discR * 0.85,
      cz - Math.sin(angle) * legTopOffset,
    );
    const top2 = new THREE.Vector3(
      cx + Math.cos(angle) * legTopOffset,
      bodyY - discR * 0.85,
      cz + Math.sin(angle) * legTopOffset,
    );

    for (const [topPt, holePt] of [
      [top1, lead1],
      [top2, lead2],
    ] as const) {
      const curve = new THREE.CatmullRomCurve3([
        topPt,
        new THREE.Vector3(holePt.x, TOP_Y + PITCH * 0.18, holePt.z),
        new THREE.Vector3(holePt.x, TOP_Y - BOARD_H * 0.35, holePt.z),
      ]);
      root.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 14, leadR, 8, false),
          M.gold(),
        ),
      );
    }
  } else {
    const R = PITCH * 0.52;
    const H = PITCH * 1.55;
    const bodyY = TOP_Y + H / 2 + PITCH * 0.22;

    const can = buildElectrolyticCanBody(R, H, capacitance);
    can.rotation.y = -angle;
    can.position.set(cx, bodyY, cz);
    root.add(can);

    for (const holePt of [lead1, lead2]) {
      const leadH = PITCH * 0.3 + BOARD_H * 0.45;
      const leadGeo = new THREE.CylinderGeometry(leadR, leadR, leadH, 10);
      const lm = new THREE.Mesh(leadGeo, M.gold());
      lm.position.set(
        holePt.x,
        TOP_Y + PITCH * 0.22 - leadH / 2,
        holePt.z,
      );
      root.add(lm);
    }
  }

  // Named pin anchors
  const p1Anchor = new THREE.Object3D();
  p1Anchor.name = CAPACITOR_PIN_P1;
  p1Anchor.position.copy(lead1);
  root.add(p1Anchor);

  const p2Anchor = new THREE.Object3D();
  p2Anchor.name = CAPACITOR_PIN_P2;
  p2Anchor.position.copy(lead2);
  root.add(p2Anchor);

  return root;
}

// ── Standalone Capacitor (for Apparatus / Component Viewer) ─────────────────
export function buildCapacitorStandalone(capacitance = 100): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const isCeramic = capacitance > 0 && capacitance < 1;

  if (isCeramic) {
    const discR = P * 0.95;
    const disc = buildCeramicDiscBody(discR, capacitance);
    disc.position.y = P * 0.4;
    root.add(disc);

    const leadLen = P * 1.8;
    const leadGeo = new THREE.CylinderGeometry(P * 0.055, P * 0.055, leadLen, 10);
    for (const sx of [-1, 1]) {
      const lead = new THREE.Mesh(leadGeo, M.gold());
      lead.position.set(
        sx * discR * 0.48,
        P * 0.4 - discR * 0.9 - leadLen / 2,
        0,
      );
      root.add(lead);
    }
  } else {
    const R = P * 0.68;
    const H = P * 2.2;
    const can = buildElectrolyticCanBody(R, H, capacitance);
    can.position.y = P * 0.3;
    root.add(can);

    const aLeadGeo = new THREE.CylinderGeometry(P * 0.06, P * 0.06, P * 1.7, 10);
    const aLead = new THREE.Mesh(aLeadGeo, M.gold());
    aLead.position.set(-P * 0.32, P * 0.3 - H / 2 - P * 0.8, 0);
    root.add(aLead);

    const cLeadGeo = new THREE.CylinderGeometry(P * 0.06, P * 0.06, P * 1.4, 10);
    const cLead = new THREE.Mesh(cLeadGeo, M.gold());
    cLead.position.set(P * 0.32, P * 0.3 - H / 2 - P * 0.65, 0);
    root.add(cLead);
  }

  return root;
}
