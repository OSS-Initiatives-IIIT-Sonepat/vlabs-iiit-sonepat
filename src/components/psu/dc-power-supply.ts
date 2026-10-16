import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { probeWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";

// ═══════════════════════════════════════════════════════════════════════════════
// DC POWER SUPPLY — Regulated Benchtop Linear DC Power Supply (0–30V, 0–5A)
//   Vibrant crisp colors & world-space binding post wire anchors
// ═══════════════════════════════════════════════════════════════════════════════

export const PSU_TERMINAL_V_PLUS = "psu-terminal-vplus";
export const PSU_TERMINAL_GND = "psu-terminal-gnd";
export const PSU_TERMINAL_V_MINUS = "psu-terminal-vminus";

export interface PsuTerminalInfo {
  name: string;
  label: string;
  localPosition: THREE.Vector3;
  color: number;
}

const P = PITCH;
const BW = P * 6.8;
const BH = P * 4.4;
const BD = P * 4.8;
const FOOT_H = P * 0.22;
const CASE_Y = FOOT_H + BH / 2;
const FRONT_Z = BD / 2 + 0.025;

const TERM_Y = CASE_Y - BH * 0.3;
const TERM_Z = FRONT_Z + P * 0.28;
const TERM_X_PLUS = BW * 0.08;
const TERM_X_EARTH = BW * 0.23;
const TERM_X_MINUS = BW * 0.38;

function buildBindingPost(
  x: number,
  y: number,
  z: number,
  colorHex: number,
  label: string,
  anchorName?: string,
): THREE.Group {
  const grp = new THREE.Group();

  const base = solidCyl(P * 0.17, 0.03, M.dark(), 14);
  base.rotation.x = Math.PI / 2;
  base.position.set(x, y, z + 0.015);
  grp.add(base);

  const collar = solidCyl(
    P * 0.15,
    P * 0.22,
    new THREE.MeshBasicMaterial({ color: colorHex }),
    14,
  );
  collar.rotation.x = Math.PI / 2;
  collar.position.set(x, y, z + P * 0.12);
  grp.add(collar);

  const tip = solidCyl(P * 0.075, P * 0.08, M.gold(), 12);
  tip.rotation.x = Math.PI / 2;
  tip.position.set(x, y, z + P * 0.25);
  grp.add(tip);

  const hole = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.045, P * 0.045, P * 0.09, 10),
    M.hole(),
  );
  hole.rotation.x = Math.PI / 2;
  hole.position.set(x, y, z + P * 0.26);
  grp.add(hole);

  const lbl = textLabel(label, P * 0.42, P * 0.24, {
    textColor: "#f0f4f8",
    fontSize: 36,
    bold: true,
  });
  if (lbl) {
    lbl.position.set(x, y + P * 0.28, z + 0.012);
    grp.add(lbl);
  }

  if (anchorName) {
    const anchor = new THREE.Object3D();
    anchor.name = anchorName;
    anchor.position.set(x, y, z + P * 0.26);
    grp.add(anchor);
  }

  return grp;
}

function buildRotaryKnob(
  x: number,
  y: number,
  z: number,
  radius: number,
  angleDeg: number,
  label: string,
): THREE.Group {
  const grp = new THREE.Group();

  const skirt = solidCyl(
    radius * 1.12,
    0.025,
    new THREE.MeshBasicMaterial({ color: 0x3b424c }),
    18,
  );
  skirt.rotation.x = Math.PI / 2;
  skirt.position.set(x, y, z + 0.012);
  grp.add(skirt);

  const depth = P * 0.22;
  const body = solidCyl(
    radius,
    depth,
    new THREE.MeshBasicMaterial({ color: 0x22262c }),
    18,
  );
  body.rotation.x = Math.PI / 2;
  body.position.set(x, y, z + depth / 2 + 0.015);
  grp.add(body);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.52, radius * 0.52, 0.015, 16),
    M.silver(),
  );
  cap.rotation.x = Math.PI / 2;
  cap.position.set(x, y, z + depth + 0.02);
  grp.add(cap);

  const rad = THREE.MathUtils.degToRad(angleDeg);
  const ptr = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, radius * 0.55, 0.02),
    M.white(),
  );
  ptr.rotation.z = -rad;
  ptr.position.set(
    x + Math.sin(rad) * radius * 0.42,
    y + Math.cos(rad) * radius * 0.42,
    z + depth + 0.022,
  );
  grp.add(ptr);

  const lbl = textLabel(label, P * 1.15, P * 0.24, {
    textColor: "#e2e8f0",
    fontSize: 28,
    bold: true,
  });
  if (lbl) {
    lbl.position.set(x, y - radius - P * 0.2, z + 0.012);
    grp.add(lbl);
  }

  return grp;
}

export function buildDcPowerSupplyStandalone(
  voltageStr = "5.0",
  currentStr = "0.15",
): THREE.Group {
  const root = new THREE.Group();
  root.userData.isInstrumentBody = true;

  // Rubber feet
  const footGeo = new THREE.CylinderGeometry(P * 0.28, P * 0.32, FOOT_H, 14);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, M.dark());
      foot.position.set(
        sx * (BW * 0.4),
        FOOT_H / 2,
        sz * (BD * 0.36),
      );
      root.add(foot);
    }
  }

  // Enclosure & front bezel with crisp outlines
  const enclosure = solidBox(
    BW,
    BH,
    BD,
    new THREE.MeshBasicMaterial({ color: 0x262c36 }),
  );
  enclosure.position.set(0, CASE_Y, 0);
  root.add(enclosure);

  const bezel = solidBox(
    BW * 0.96,
    BH * 0.93,
    0.04,
    new THREE.MeshBasicMaterial({ color: 0x3b4d63 }),
  );
  bezel.position.set(0, CASE_Y, BD / 2 + 0.01);
  root.add(bezel);

  // Header
  const header = textLabel("DC POWER SUPPLY  0–30V", BW * 0.62, P * 0.28, {
    textColor: "#f0f4f8",
    fontSize: 32,
    bold: true,
  });
  if (header) {
    header.position.set(-BW * 0.12, CASE_Y + BH * 0.39, FRONT_Z + 0.012);
    root.add(header);
  }

  // Dual digital LED display window
  const winW = BW * 0.54;
  const winH = BH * 0.36;
  const winX = -BW * 0.16;
  const winY = CASE_Y + BH * 0.13;

  const winFrame = solidBox(
    winW + 0.04,
    winH + 0.04,
    0.025,
    new THREE.MeshBasicMaterial({ color: 0x12151a }),
  );
  winFrame.position.set(winX, winY, FRONT_Z + 0.008);
  root.add(winFrame);

  const winGlass = new THREE.Mesh(
    new THREE.BoxGeometry(winW, winH, 0.015),
    new THREE.MeshBasicMaterial({ color: 0x0a140e }),
  );
  winGlass.position.set(winX, winY, FRONT_Z + 0.018);
  root.add(winGlass);

  const powerOn = voltageStr !== "--" && voltageStr !== "0" && voltageStr !== "0.0";
  const vDisplay = powerOn
    ? `${voltageStr.replace(/V$/i, "")}V`
    : voltageStr === "--"
      ? "5.0V"
      : "0.0V";
  const cDisplay = powerOn ? `${currentStr}A` : "0.01A";

  const vLabel = textLabel(vDisplay, winW * 0.9, winH * 0.48, {
    textColor: "#38ff68",
    fontSize: 54,
    bold: true,
  });
  if (vLabel) {
    vLabel.position.set(winX, winY + winH * 0.2, FRONT_Z + 0.03);
    root.add(vLabel);
  }

  const aLabel = textLabel(cDisplay, winW * 0.85, winH * 0.38, {
    textColor: "#ff5c38",
    fontSize: 44,
    bold: true,
  });
  if (aLabel) {
    aLabel.position.set(winX, winY - winH * 0.22, FRONT_Z + 0.03);
    root.add(aLabel);
  }

  // Control knobs
  const knobY1 = CASE_Y + BH * 0.18;
  const knobY2 = CASE_Y - BH * 0.08;
  root.add(buildRotaryKnob(BW * 0.2, knobY1, FRONT_Z, P * 0.36, 25, "VOLTAGE"));
  root.add(buildRotaryKnob(BW * 0.38, knobY1, FRONT_Z, P * 0.32, -15, "CURRENT"));
  root.add(buildRotaryKnob(BW * 0.2, knobY2, FRONT_Z, P * 0.26, 0, "FINE V"));

  // Power switch & indicator LED
  const pwrX = -BW * 0.36;
  const pwrY = TERM_Y;
  const pwrBtn = solidBox(P * 0.52, P * 0.34, 0.045, M.red());
  pwrBtn.position.set(pwrX, pwrY, FRONT_Z + 0.02);
  root.add(pwrBtn);

  const pwrLed = new THREE.Mesh(
    new THREE.SphereGeometry(P * 0.08, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0x38ff68 }),
  );
  pwrLed.position.set(pwrX, pwrY + P * 0.28, FRONT_Z + 0.018);
  root.add(pwrLed);

  const pwrLbl = textLabel("POWER", P * 0.9, P * 0.22, {
    textColor: "#e2e8f0",
    fontSize: 28,
    bold: true,
  });
  if (pwrLbl) {
    pwrLbl.position.set(pwrX, pwrY - P * 0.28, FRONT_Z + 0.012);
    root.add(pwrLbl);
  }

  // Output binding posts (+, GND, −)
  root.add(
    buildBindingPost(
      TERM_X_PLUS,
      TERM_Y,
      FRONT_Z,
      0xe03424,
      "+",
      PSU_TERMINAL_V_PLUS,
    ),
  );
  root.add(
    buildBindingPost(
      TERM_X_EARTH,
      TERM_Y,
      FRONT_Z,
      0x22b44c,
      "⏚",
      PSU_TERMINAL_V_MINUS,
    ),
  );
  root.add(
    buildBindingPost(
      TERM_X_MINUS,
      TERM_Y,
      FRONT_Z,
      0x1f2226,
      "−",
      PSU_TERMINAL_GND,
    ),
  );

  return root;
}

export function getPsuTerminals(): PsuTerminalInfo[] {
  return [
    {
      name: PSU_TERMINAL_V_PLUS,
      label: "V+",
      localPosition: new THREE.Vector3(TERM_X_PLUS, TERM_Y, TERM_Z),
      color: 0xe03424,
    },
    {
      name: PSU_TERMINAL_GND,
      label: "GND",
      localPosition: new THREE.Vector3(TERM_X_MINUS, TERM_Y, TERM_Z),
      color: 0x202226,
    },
    {
      name: PSU_TERMINAL_V_MINUS,
      label: "EARTH",
      localPosition: new THREE.Vector3(TERM_X_EARTH, TERM_Y, TERM_Z),
      color: 0x22b44c,
    },
  ];
}

// ── Board-placed DC Power Supply ────────────────────────────────────────────
export function buildDcPowerSupply(
  position: "left" | "right" | number = "left",
  displayValue: string = "5.0",
  targets?: { vcc: THREE.Vector3; gnd: THREE.Vector3 },
): THREE.Group {
  const model = buildDcPowerSupplyStandalone(displayValue);

  const slot =
    typeof position === "number"
      ? position
      : position === "left"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.56);
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);
  root.updateMatrixWorld(true);

  if (targets) {
    const vPlusObj = model.getObjectByName(PSU_TERMINAL_V_PLUS);
    const gndObj = model.getObjectByName(PSU_TERMINAL_GND);

    const vPlusWorld = vPlusObj
      ? vPlusObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x + 0.1, slotPos.y + 0.25, slotPos.z + 0.4);
    const gndWorld = gndObj
      ? gndObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x + 0.3, slotPos.y + 0.25, slotPos.z + 0.4);

    root.add(probeWire(vPlusWorld, targets.vcc, 0xe03424));
    root.add(probeWire(gndWorld, targets.gnd, 0x202226));
  }

  return root;
}
