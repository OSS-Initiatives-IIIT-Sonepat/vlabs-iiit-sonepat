import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y, Z, COLS, colToX } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ── DIP SWITCH (2 / 4 / 6 / 8-POLE) ─────────────────────────────────────────
// Multi-pole Dual In-line Package (DIP) slide switch in red housing.
// Supports 2, 4, 6, 8 (or custom) pole counts.
//
// Mounted form: straddles the breadboard centre gap.
// Standalone form: centered at origin for apparatus cards.

export function buildDipSwitchStandalone(poles = 4): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const validPoles = Math.max(2, Math.min(16, poles));
  const bodyW = (validPoles - 1) * P + P * 1.0;
  const bodyH = P * 1.15;
  const bodyD = P * 2.2;

  // Red DIP switch body
  const body = solidBox(bodyW, bodyH, bodyD, M.hex(0xb82820));
  root.add(body);

  // Recessed slide channel on top
  const chanW = bodyW * 0.92;
  const chanD = bodyD * 0.65;
  const channel = solidBox(chanW, 0.02, chanD, M.dark());
  channel.position.set(0, bodyH / 2 + 0.005, 0);
  root.add(channel);

  // "ON" marking on the body side
  const onText = textLabel("ON ▶", P * 1.5, P * 0.45, {
    textColor: "#ffffff",
    fontSize: 32,
    bold: true,
  });
  if (onText) {
    onText.rotation.x = -Math.PI / 2;
    onText.position.set(-bodyW / 2 + P * 0.65, bodyH / 2 + 0.015, -bodyD * 0.4);
    root.add(onText);
  }

  // Individual white switch actuators and pole numbers
  const pinGeo = new THREE.BoxGeometry(P * 0.17, P * 0.72, P * 0.17);
  for (let i = 0; i < validPoles; i++) {
    const x = -((validPoles - 1) / 2) * P + i * P;

    // Switch actuator (white slider button)
    // Alternate state for realistic appearance: even = ON (shifted to -Z), odd = OFF (shifted to +Z)
    const isEven = i % 2 === 0;
    const zOffset = isEven ? -P * 0.18 : P * 0.18;

    const slider = solidBox(P * 0.48, P * 0.38, P * 0.38, M.white());
    slider.position.set(x, bodyH / 2 + P * 0.18, zOffset);
    root.add(slider);

    // Pole number label (1, 2, ..., N)
    const numText = textLabel(String(i + 1), P * 0.5, P * 0.35, {
      textColor: "#ffffff",
      fontSize: 28,
      bold: true,
    });
    if (numText) {
      numText.rotation.x = -Math.PI / 2;
      numText.position.set(x, bodyH / 2 + 0.015, bodyD * 0.4);
      root.add(numText);
    }

    // DIP pins on both sides
    for (const zSign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(x, -bodyH / 2 - P * 0.26, zSign * (bodyD / 2 + P * 0.12));
      root.add(pin);
    }
  }

  return root;
}

export function buildDipSwitch(
  startCol = 5,
  poles = 4,
  cols = COLS,
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const validPoles = Math.max(2, Math.min(16, poles));

  const bodyX =
    (colToX(startCol, cols) + colToX(startCol + validPoles - 1, cols)) / 2;
  const bodyZ = (Z["e"] + Z["f"]) / 2;
  const bodyW = (validPoles - 1) * P + P * 1.0;
  const bodyD = Math.abs(Z["f"] - Z["e"]) * 0.72;
  const bodyH = P * 1.15;

  const model = buildDipSwitchStandalone(validPoles);
  model.position.set(bodyX, TOP_Y + bodyH / 2, bodyZ);
  root.add(model);

  return root;
}
