import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y, Z, COLS, colToX } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ── OP-AMP — LM741 (DIP-8) ──────────────────────────────────────────────────
// 8-pin Dual In-line Package (DIP-8) operational amplifier.
// 4 pins per side (pins 1–4 and 5–8) with pin-1 notch and dot.
//
// Mounted form: straddles breadboard centre gap (rows e/f).
// Standalone form: centered at origin for apparatus cards.

const PIN_COUNT = 4; // 4 pins per side = DIP-8

export function buildOpAmpStandalone(label = "LM741"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const bodyW = (PIN_COUNT - 1) * P + P * 0.85;
  const bodyH = P * 1.3;
  const bodyD = P * 2.2;

  // DIP-8 body
  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  root.add(body);

  // Pin-1 notch (semicircle indent at left end)
  const notchGeo = new THREE.CylinderGeometry(
    P * 0.22,
    P * 0.22,
    bodyD * 0.35,
    14,
  );
  const notch = new THREE.Mesh(notchGeo, M.gray());
  notch.position.set(-bodyW / 2, bodyH * 0.25, 0);
  notch.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(notchGeo, 20), M.edge()),
  );
  root.add(notch);

  // Pin-1 indicator dot (circular dimple near pin 1 corner)
  const dotGeo = new THREE.CylinderGeometry(P * 0.1, P * 0.1, 0.02, 12);
  const dot = new THREE.Mesh(dotGeo, M.gray());
  dot.position.set(
    -bodyW / 2 + P * 0.35,
    bodyH / 2 + 0.005,
    -bodyD / 2 + P * 0.35,
  );
  root.add(dot);

  // 8 DIP pins (4 per side)
  const pinGeo = new THREE.BoxGeometry(P * 0.17, P * 0.72, P * 0.17);
  for (let i = 0; i < PIN_COUNT; i++) {
    const x = -((PIN_COUNT - 1) / 2) * P + i * P;
    for (const zSign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(
        x,
        -bodyH / 2 - P * 0.26,
        zSign * (bodyD / 2 + P * 0.12),
      );
      root.add(pin);
    }
  }

  // Top face labels
  const codeLabel = textLabel(label, bodyW * 0.85, bodyH * 0.48, {
    textColor: "#c0d0c0",
    fontSize: 46,
    bold: true,
  });
  if (codeLabel) {
    codeLabel.rotation.x = -Math.PI / 2;
    codeLabel.position.set(0, bodyH / 2 + 0.002, -bodyD * 0.12);
    root.add(codeLabel);
  }

  const descLabel = textLabel("OP-AMP", bodyW * 0.7, bodyH * 0.3, {
    textColor: "#7aaa8a",
    fontSize: 32,
  });
  if (descLabel) {
    descLabel.rotation.x = -Math.PI / 2;
    descLabel.position.set(0, bodyH / 2 + 0.003, bodyD * 0.22);
    root.add(descLabel);
  }

  return root;
}

export function buildOpAmp(
  startCol = 5,
  label = "LM741",
  cols = COLS,
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const pinPositions = Array.from({ length: PIN_COUNT }, (_, i) => ({
    ex: colToX(startCol + i, cols),
    ez: Z["e"],
    fx: colToX(startCol + i, cols),
    fz: Z["f"],
  }));

  const bodyX =
    (colToX(startCol, cols) + colToX(startCol + PIN_COUNT - 1, cols)) / 2;
  const bodyZ = (Z["e"] + Z["f"]) / 2;
  const bodyW = (PIN_COUNT - 1) * P + P * 0.85;
  const bodyD = Math.abs(Z["f"] - Z["e"]) * 0.72;
  const bodyH = P * 1.25;

  // Body
  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  body.position.set(bodyX, TOP_Y + bodyH / 2, bodyZ);
  root.add(body);

  // Pin-1 notch
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.2, P * 0.2, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(
    bodyX - bodyW / 2 + P * 0.25,
    TOP_Y + bodyH * 0.75,
    bodyZ,
  );
  root.add(notch);

  // Pins
  const pinH = bodyH * 0.45 + BOARD_H * 0.5;
  const pinGeo = new THREE.BoxGeometry(P * 0.17, pinH, P * 0.17);
  for (const p of pinPositions) {
    const pTop = new THREE.Mesh(pinGeo, M.silver());
    pTop.position.set(p.ex, TOP_Y - pinH / 2 + bodyH * 0.1, p.ez);
    root.add(pTop);
    const pBot = new THREE.Mesh(pinGeo, M.silver());
    pBot.position.set(p.fx, TOP_Y - pinH / 2 + bodyH * 0.1, p.fz);
    root.add(pBot);
  }

  // Label
  const codeL = textLabel(label, bodyW * 0.85, bodyH * 0.48, {
    textColor: "#c0d0c0",
    fontSize: 46,
    bold: true,
  });
  if (codeL) {
    codeL.rotation.x = -Math.PI / 2;
    codeL.position.set(bodyX, TOP_Y + bodyH + 0.002, bodyZ - bodyD * 0.12);
    root.add(codeL);
  }

  return root;
}
