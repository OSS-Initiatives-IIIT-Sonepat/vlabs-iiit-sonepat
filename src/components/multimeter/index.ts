import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { probeWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";

// ═══════════════════════════════════════════════════════════════════════════════
// DIGITAL MULTIMETER (DMM) — Vibrant UNI-T UT33D+ Style Bench Multimeter
// ═══════════════════════════════════════════════════════════════════════════════

export const DMM_TERMINAL_10A = "dmm-terminal-10a";
export const DMM_TERMINAL_COM = "dmm-terminal-com";
export const DMM_TERMINAL_VOHM = "dmm-terminal-vohm";

const P = PITCH;
const BW = P * 3.8;
const BH = P * 6.8;
const BD = P * 1.45;
const FRONT_Z = BD / 2 + 0.025;

function buildLcdPanel(displayValue: string): THREE.Group {
  const grp = new THREE.Group();
  const lcdW = BW * 0.78;
  const lcdH = BH * 0.22;

  const bezel = solidBox(lcdW + 0.05, lcdH + 0.05, 0.02, M.dark());
  grp.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(lcdW, lcdH, 0.024),
    new THREE.MeshBasicMaterial({ color: 0x9ec488 }),
  );
  screen.position.z = 0.008;
  grp.add(screen);

  const textStr =
    displayValue && displayValue !== "--" ? displayValue : "0.00 V";
  const valLbl = textLabel(textStr, lcdW * 0.92, lcdH * 0.72, {
    textColor: "#142210",
    fontSize: 52,
    bold: true,
  });
  if (valLbl) {
    valLbl.position.z = 0.024;
    grp.add(valLbl);
  }

  return grp;
}

function buildRotaryDial(): THREE.Group {
  const grp = new THREE.Group();
  const dialR = BW * 0.28;

  const ring = solidCyl(
    dialR * 1.12,
    0.022,
    new THREE.MeshBasicMaterial({ color: 0x1e2228 }),
    20,
  );
  ring.rotation.x = Math.PI / 2;
  grp.add(ring);

  const knob = solidCyl(
    dialR,
    0.05,
    new THREE.MeshBasicMaterial({ color: 0x323842 }),
    20,
  );
  knob.rotation.x = Math.PI / 2;
  knob.position.z = 0.02;
  grp.add(knob);

  const bar = solidBox(dialR * 0.24, dialR * 1.72, 0.035, M.gray());
  bar.rotation.z = THREE.MathUtils.degToRad(30);
  bar.position.z = 0.045;
  grp.add(bar);

  const ptr = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, dialR * 0.45, 0.04),
    M.white(),
  );
  const rad = THREE.MathUtils.degToRad(-30);
  ptr.rotation.z = -rad;
  ptr.position.set(
    Math.sin(rad) * dialR * 0.55,
    Math.cos(rad) * dialR * 0.55,
    0.048,
  );
  grp.add(ptr);

  const numTicks = 12;
  for (let i = 0; i < numTicks; i++) {
    const a = (i / numTicks) * Math.PI * 2;
    if (Math.cos(a) < -0.75) continue;
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(0.016, P * 0.11, 0.01),
      M.white(),
    );
    const tr = dialR * 1.26;
    tick.position.set(Math.sin(a) * tr, Math.cos(a) * tr, 0.012);
    tick.rotation.z = -a;
    grp.add(tick);
  }

  return grp;
}

function buildInputJack(
  x: number,
  y: number,
  z: number,
  colorHex: number,
  label: string,
  anchorName: string,
): THREE.Group {
  const grp = new THREE.Group();

  const collar = solidCyl(
    P * 0.17,
    0.04,
    new THREE.MeshBasicMaterial({ color: colorHex }),
    14,
  );
  collar.rotation.x = Math.PI / 2;
  collar.position.set(x, y, z + 0.02);
  grp.add(collar);

  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.1, P * 0.1, 0.045, 12),
    M.silver(),
  );
  sleeve.rotation.x = Math.PI / 2;
  sleeve.position.set(x, y, z + 0.024);
  grp.add(sleeve);

  const hole = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.065, P * 0.065, 0.05, 10),
    M.hole(),
  );
  hole.rotation.x = Math.PI / 2;
  hole.position.set(x, y, z + 0.026);
  grp.add(hole);

  const lbl = textLabel(label, P * 0.72, P * 0.22, {
    textColor: "#f0f4f8",
    fontSize: 28,
    bold: true,
  });
  if (lbl) {
    lbl.position.set(x, y + P * 0.28, z + 0.012);
    grp.add(lbl);
  }

  const anchor = new THREE.Object3D();
  anchor.name = anchorName;
  anchor.position.set(x, y, z + 0.04);
  grp.add(anchor);

  return grp;
}

export function buildIcMeterStandalone(displayValue = "0.00 V"): THREE.Group {
  const root = new THREE.Group();
  root.userData.isInstrumentBody = true;

  // Protective red rubberized holster with crisp edges
  const holster = solidBox(
    BW,
    BH,
    BD,
    new THREE.MeshBasicMaterial({ color: 0xd62828 }),
  );
  holster.position.y = BH / 2;
  root.add(holster);

  // Dark inner front panel
  const face = solidBox(
    BW * 0.88,
    BH * 0.92,
    0.03,
    new THREE.MeshBasicMaterial({ color: 0x22262e }),
  );
  face.position.set(0, BH / 2, BD / 2 + 0.005);
  root.add(face);

  // Brand header
  const brand = textLabel("UNI-T  UT33D+", BW * 0.75, P * 0.26, {
    textColor: "#f0f4f8",
    fontSize: 32,
    bold: true,
  });
  if (brand) {
    brand.position.set(0, BH * 0.9, FRONT_Z + 0.01);
    root.add(brand);
  }

  // LCD panel
  const lcd = buildLcdPanel(displayValue);
  lcd.position.set(0, BH * 0.73, FRONT_Z);
  root.add(lcd);

  // HOLD & Backlight buttons
  const holdBtn = solidBox(P * 0.56, P * 0.24, 0.035, M.yellow());
  holdBtn.position.set(-BW * 0.22, BH * 0.57, FRONT_Z + 0.012);
  root.add(holdBtn);

  const blBtn = solidBox(P * 0.56, P * 0.24, 0.035, M.blue());
  blBtn.position.set(BW * 0.22, BH * 0.57, FRONT_Z + 0.012);
  root.add(blBtn);

  // Rotary selector dial
  const dial = buildRotaryDial();
  dial.position.set(0, BH * 0.37, FRONT_Z);
  root.add(dial);

  // Three banana input jacks at bottom
  const jackY = BH * 0.11;
  root.add(
    buildInputJack(
      -BW * 0.26,
      jackY,
      FRONT_Z,
      0xe03424,
      "10A",
      DMM_TERMINAL_10A,
    ),
  );
  root.add(
    buildInputJack(0, jackY, FRONT_Z, 0x1a1c20, "COM", DMM_TERMINAL_COM),
  );
  root.add(
    buildInputJack(
      BW * 0.26,
      jackY,
      FRONT_Z,
      0xe03424,
      "VΩmA",
      DMM_TERMINAL_VOHM,
    ),
  );

  return root;
}

export function buildIcMeter(
  position: "left" | "right" | number = "right",
  displayValue: string = "0.00 V",
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  const model = buildIcMeterStandalone(displayValue);
  model.rotation.x = -0.22;

  const slot =
    typeof position === "number"
      ? position
      : position === "right"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.5);
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);
  root.updateMatrixWorld(true);

  if (targets) {
    const vohmObj = model.getObjectByName(DMM_TERMINAL_VOHM);
    const comObj = model.getObjectByName(DMM_TERMINAL_COM);

    const vohmWorld = vohmObj
      ? vohmObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x + 0.1, slotPos.y + 0.15, slotPos.z + 0.2);
    const comWorld = comObj
      ? comObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x, slotPos.y + 0.15, slotPos.z + 0.2);

    root.add(probeWire(vohmWorld, targets.probe1, 0xe03424));
    root.add(probeWire(comWorld, targets.probe2, 0x202226));
  }

  return root;
}
