import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";

// ── STEP-DOWN CENTRE-TAP TRANSFORMER ────────────────────────────────────────
// Laminated iron core transformer with primary winding (230 V, 2 terminals)
// and centre-tapped secondary winding (9 V – 0 V – 9 V, 3 terminals).
//
// Mounted form: placed beside the breadboard.
// Standalone form: centered at origin for apparatus cards.

export function buildTransformerStandalone(
  label = "STEP-DOWN TRANSFORMER",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const coreW = P * 6.5;
  const coreH = P * 5.4;
  const coreD = P * 4.6;

  // ── Laminated Iron Core (E-I stack) ───────────────────────────────────────
  // Outer magnetic core frame
  const coreFrame = solidBox(coreW, coreH, coreD * 0.45, M.hex(0x30353c));
  root.add(coreFrame);

  // Side laminations / brackets
  for (const sign of [-1, 1]) {
    const bracket = solidBox(
      coreW * 0.18,
      coreH * 1.04,
      coreD * 0.5,
      M.hex(0x40454d),
    );
    bracket.position.x = sign * (coreW * 0.42);
    root.add(bracket);

    // Mounting feet at the bottom
    const foot = solidBox(coreW * 0.28, P * 0.25, coreD * 0.9, M.hex(0x505560));
    foot.position.set(sign * (coreW * 0.44), -coreH / 2 - P * 0.12, 0);
    root.add(foot);

    // Mounting bolt holes
    for (const zSign of [-1, 1]) {
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(P * 0.12, P * 0.12, P * 0.3, 10),
        M.hole(),
      );
      hole.position.set(
        sign * (coreW * 0.44),
        -coreH / 2 - P * 0.12,
        zSign * (coreD * 0.3),
      );
      root.add(hole);
    }
  }

  // ── Central Coils / Winding Bobbin ────────────────────────────────────────
  // Plastic coil former / bobbin
  const bobbinW = coreW * 0.62;
  const bobbinH = coreH * 0.78;
  const bobbinD = coreD * 0.85;
  const bobbin = solidBox(bobbinW, bobbinH, bobbinD, M.hex(0x181818));
  root.add(bobbin);

  // Primary winding coil (copper / amber enamel wire wrap)
  const priW = bobbinW * 0.92;
  const priH = bobbinH * 0.88;
  const priD = bobbinD * 0.38;
  const priCoil = solidBox(priW, priH, priD, M.hex(0x9a4808));
  priCoil.position.z = -bobbinD * 0.22;
  root.add(priCoil);

  // Secondary winding coil (with centre tap)
  const secW = bobbinW * 0.92;
  const secH = bobbinH * 0.88;
  const secD = bobbinD * 0.38;
  const secCoil = solidBox(secW, secH, secD, M.hex(0xb05510));
  secCoil.position.z = bobbinD * 0.22;
  root.add(secCoil);

  // Yellow insulation tape wrap band around center of coils
  const tape = solidBox(bobbinW * 0.95, bobbinH * 0.92, bobbinD * 0.18, M.hex(0xd4a020));
  root.add(tape);

  // ── Primary Terminals (Left / Back side: 2 Terminals for 230 V AC) ───────
  const termGeo = new THREE.CylinderGeometry(P * 0.15, P * 0.15, P * 0.4, 12);
  const priTermX = -coreW * 0.52;
  for (let i = 0; i < 2; i++) {
    const ty = -coreH * 0.15 + i * coreH * 0.3;
    const term = new THREE.Mesh(termGeo, M.silver());
    term.rotation.z = Math.PI / 2;
    term.position.set(priTermX, ty, -bobbinD * 0.22);
    term.add(new THREE.LineSegments(new THREE.EdgesGeometry(termGeo), M.edge()));
    root.add(term);
  }

  const priLabel = textLabel("230V PRI", coreW * 0.5, P * 0.5, {
    textColor: "#e07020",
    fontSize: 32,
    bold: true,
  });
  if (priLabel) {
    priLabel.rotation.y = -Math.PI / 2;
    priLabel.position.set(priTermX - 0.05, 0, -bobbinD * 0.22);
    root.add(priLabel);
  }

  // ── Secondary Terminals (Right / Front side: 3 Terminals with Centre Tap) ─
  // Terminal 1: +9 V (top)
  // Terminal 2: 0 V Centre Tap (middle)
  // Terminal 3: -9 V (bottom)
  const secTermX = coreW * 0.52;
  const secLabels = ["9V", "CT (0V)", "9V"];
  const secColors = [0xd63b2a, 0x202020, 0xd63b2a]; // Red, Black, Red

  for (let i = 0; i < 3; i++) {
    const ty = coreH * 0.22 - i * coreH * 0.22;
    const term = new THREE.Mesh(termGeo, M.hex(secColors[i]));
    term.rotation.z = Math.PI / 2;
    term.position.set(secTermX, ty, bobbinD * 0.22);
    term.add(new THREE.LineSegments(new THREE.EdgesGeometry(termGeo), M.edge()));
    root.add(term);

    const tl = textLabel(secLabels[i], P * 1.5, P * 0.38, {
      textColor: i === 1 ? "#333333" : "#d63b2a",
      fontSize: 28,
      bold: true,
    });
    if (tl) {
      tl.rotation.y = Math.PI / 2;
      tl.position.set(secTermX + 0.05, ty, bobbinD * 0.22);
      root.add(tl);
    }
  }

  // ── Top Rating Plate ─────────────────────────────────────────────────────
  const plateW = coreW * 0.72;
  const plateD = coreD * 0.75;
  const plate = solidBox(plateW, 0.02, plateD, M.white());
  plate.position.set(0, coreH / 2 + 0.015, 0);
  root.add(plate);

  const topTitle = textLabel(label, plateW * 0.9, plateD * 0.35, {
    textColor: "#111111",
    fontSize: 34,
    bold: true,
  });
  if (topTitle) {
    topTitle.rotation.x = -Math.PI / 2;
    topTitle.position.set(0, coreH / 2 + 0.03, -plateD * 0.2);
    root.add(topTitle);
  }

  const specTitle = textLabel("SEC: 9V – 0 – 9V  500mA", plateW * 0.9, plateD * 0.3, {
    textColor: "#333333",
    fontSize: 28,
  });
  if (specTitle) {
    specTitle.rotation.x = -Math.PI / 2;
    specTitle.position.set(0, coreH / 2 + 0.03, plateD * 0.2);
    root.add(specTitle);
  }

  return root;
}

export function buildTransformer(
  position: "left" | "right" = "left",
  label = "STEP-DOWN TRANSFORMER",
): THREE.Group {
  const model = buildTransformerStandalone(label);
  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.22);

  const xSign = position === "right" ? 1 : -1;
  const posX = xSign * (BOARD_W / 2 - 1.2);
  const posZ = -(BOARD_D / 2 + 0.6);
  wrapper.position.set(posX, 0, posZ);

  const root = new THREE.Group();
  root.add(wrapper);
  return root;
}
