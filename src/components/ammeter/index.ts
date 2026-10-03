import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";

// ── ANALOG AMMETER / MILLIAMMETER (0–100 mA) ────────────────────────────────
// Dedicated laboratory bench-meter with analog scale, needle, and binding posts.
//
// Mounted form: placed beside the breadboard with connection probes.
// Standalone form: centered at origin for apparatus cards.

export function buildAmmeterStandalone(
  range = "0–100 mA",
  label = "MILLIAMMETER",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  // Meter housing: classic angled / desktop laboratory bench instrument
  const W = P * 6.6;
  const H = P * 6.2;
  const D = P * 4.2;

  // Base / Enclosure
  const housingMat = M.white();
  const housing = solidBox(W, H, D, housingMat);
  root.add(housing);

  // Meter face frame (recessed bezel on front face)
  const bezelW = W * 0.88;
  const bezelH = H * 0.58;
  const bezelD = 0.04;
  const bezel = solidBox(bezelW, bezelH, bezelD, M.dark());
  bezel.position.set(0, H * 0.14, D / 2 + bezelD / 2);
  root.add(bezel);

  // Dial scale plate (white face behind meter glass)
  const dialW = bezelW * 0.94;
  const dialH = bezelH * 0.92;
  const dialD = 0.02;
  const dial = solidBox(dialW, dialH, dialD, M.cream());
  dial.position.set(0, H * 0.14, D / 2 + bezelD + dialD / 2);
  root.add(dial);

  // Anti-parallax mirror strip
  const mirror = solidBox(dialW * 0.65, dialH * 0.1, 0.015, M.silver());
  mirror.position.set(0, H * 0.12, D / 2 + bezelD + dialD + 0.005);
  root.add(mirror);

  // Scale arc (curved segment of tick marks)
  const arcRadius = dialW * 0.42;
  const arcY = H * 0.05;
  const nTicks = 11; // 0, 10, 20, ..., 100
  for (let i = 0; i < nTicks; i++) {
    const frac = i / (nTicks - 1);
    // Angle from -42 deg to +42 deg
    const angle = (-42 + frac * 84) * (Math.PI / 180);
    const tickLen = i % 2 === 0 ? P * 0.35 : P * 0.2;
    const tickW = i % 2 === 0 ? 0.022 : 0.014;

    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(tickW, tickLen, 0.02),
      M.dark(),
    );
    const dist = arcRadius - tickLen / 2;
    tick.position.set(
      Math.sin(angle) * dist,
      arcY + Math.cos(angle) * dist,
      D / 2 + bezelD + dialD + 0.01,
    );
    tick.rotation.z = -angle;
    root.add(tick);
  }

  // Pointer / Needle (red analog meter needle)
  const needleLen = arcRadius * 1.02;
  const needle = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, needleLen, 0.025),
    M.red(),
  );
  // Deflected slightly to show realistic active zero / calibration point
  const defAngle = -32 * (Math.PI / 180);
  needle.rotation.z = defAngle;
  needle.position.set(
    (Math.sin(-defAngle) * needleLen) / 2,
    arcY + (Math.cos(-defAngle) * needleLen) / 2,
    D / 2 + bezelD + dialD + 0.015,
  );
  root.add(needle);

  // Pivot cap
  const pivot = solidCyl(P * 0.22, 0.05, M.dark(), 16);
  pivot.rotation.x = Math.PI / 2;
  pivot.position.set(0, arcY, D / 2 + bezelD + dialD + 0.02);
  root.add(pivot);

  // Zero-adjust screw
  const screw = solidCyl(P * 0.14, 0.04, M.gray(), 12);
  screw.rotation.x = Math.PI / 2;
  screw.position.set(0, H * 0.01, D / 2 + bezelD + dialD + 0.015);
  root.add(screw);

  // Labels on dial
  const unitLabel = textLabel("mA", dialW * 0.35, dialH * 0.22, {
    textColor: "#111111",
    fontSize: 52,
    bold: true,
  });
  if (unitLabel) {
    unitLabel.position.set(0, H * 0.22, D / 2 + bezelD + dialD + 0.02);
    root.add(unitLabel);
  }

  const rangeText = textLabel(range, dialW * 0.55, dialH * 0.16, {
    textColor: "#444444",
    fontSize: 34,
  });
  if (rangeText) {
    rangeText.position.set(0, H * 0.16, D / 2 + bezelD + dialD + 0.02);
    root.add(rangeText);
  }

  // Instrument title label on lower body
  const titleText = textLabel(label, W * 0.75, H * 0.14, {
    textColor: "#111111",
    fontSize: 38,
    bold: true,
  });
  if (titleText) {
    titleText.position.set(0, -H * 0.18, D / 2 + 0.01);
    root.add(titleText);
  }

  // Binding posts / Terminals on lower panel
  // Red = Positive, Black = Negative / Common
  const termGeo = new THREE.CylinderGeometry(P * 0.22, P * 0.22, 0.14, 16);
  const termHoleGeo = new THREE.CylinderGeometry(P * 0.08, P * 0.08, 0.16, 12);

  const termSpacing = P * 1.5;
  const termY = -H * 0.32;

  // Positive terminal (Red)
  const posPost = new THREE.Mesh(termGeo, M.red());
  posPost.rotation.x = Math.PI / 2;
  posPost.position.set(termSpacing, termY, D / 2 + 0.07);
  posPost.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(termGeo, 20), M.edge()),
  );
  root.add(posPost);

  const posHole = new THREE.Mesh(termHoleGeo, M.hole());
  posHole.rotation.x = Math.PI / 2;
  posHole.position.set(termSpacing, termY, D / 2 + 0.08);
  root.add(posHole);

  const posText = textLabel("+", P * 0.4, P * 0.4, {
    textColor: "#d63b2a",
    fontSize: 56,
    bold: true,
  });
  if (posText) {
    posText.position.set(termSpacing, termY + P * 0.4, D / 2 + 0.01);
    root.add(posText);
  }

  // Negative terminal (Black)
  const negPost = new THREE.Mesh(termGeo, M.dark());
  negPost.rotation.x = Math.PI / 2;
  negPost.position.set(-termSpacing, termY, D / 2 + 0.07);
  negPost.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(termGeo, 20), M.edge()),
  );
  root.add(negPost);

  const negHole = new THREE.Mesh(termHoleGeo, M.hole());
  negHole.rotation.x = Math.PI / 2;
  negHole.position.set(-termSpacing, termY, D / 2 + 0.08);
  root.add(negHole);

  const negText = textLabel("−", P * 0.4, P * 0.4, {
    textColor: "#222222",
    fontSize: 56,
    bold: true,
  });
  if (negText) {
    negText.position.set(-termSpacing, termY + P * 0.4, D / 2 + 0.01);
    root.add(negText);
  }

  return root;
}

export function buildAmmeter(
  position: "left" | "right" = "right",
  range = "0–100 mA",
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  const model = buildAmmeterStandalone(range);
  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.22);

  const xSign = position === "right" ? 1 : -1;
  const posX = xSign * (BOARD_W / 2 - 1.2);
  const posZ = -(BOARD_D / 2 + 0.6);
  wrapper.position.set(posX, 0, posZ);

  const root = new THREE.Group();
  root.add(wrapper);

  if (targets) {
    const origin1 = new THREE.Vector3(posX + 0.08, TOP_Y + 0.1, posZ);
    const origin2 = new THREE.Vector3(posX - 0.08, TOP_Y + 0.1, posZ);
    root.add(instrumentWire(origin1, targets.probe1, 0xd63b2a)); // Red (+)
    root.add(instrumentWire(origin2, targets.probe2, 0x202020)); // Black (-)
  }

  return root;
}
