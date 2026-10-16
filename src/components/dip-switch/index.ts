import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// DIP SWITCH — 2 / 4 / 6 / 8-pole slide switch in a DIP package
//
//   Top view (ON side at the back, numbers at the front):
//
//        ┌──────────────────────────────┐
//        │ ON                           │   ← slider pushed up/back = ON
//        │ ▇▇  ┌─┐  ▇▇  ┌─┐   ...       │
//        │ ┌─┐ ▇▇   ┌─┐  ▇▇              │   ← slider pushed down/front = OFF
//        │  1    2    3    4   ...       │
//        └──┬────┬────┬────┬─────────────┘
//
//   Each slider i bridges the front-row pin i to the back-row pin directly
//   behind it. Pole spacing is 0.1" (2.54 mm), row spacing 0.3" (7.62 mm).
//
// Small part: an 8-pole switch is about 21 × 6.6 × 4 mm. Origin = centre of the
// body's bottom face. +Y up, pins point to -Y, body length runs along X.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real dimensions (mm) ────────────────────────────────────────────────────
const POLE_PITCH = 2.54;
const BODY_W = 6.6; // Z
const BODY_H = 4.0; // Y
const ROW_SPACING = 7.62; // distance between the two pin rows (0.3")

// Slots and sliders
const SLOT_W = 2.0;
const SLOT_L = 4.4;
const SLIDER_W = 1.6;
const SLIDER_L = 2.0;
const SLIDER_H = 0.9;

// Pins (same bent-leg style as the DIP IC)
const PIN_W = 0.5;
const PIN_T = 0.25;
const SHOULDER_W = 1.3;
const STUB_Y = 1.0;
const SHOULDER_BOTTOM = -1.0;
const LEAD_BELOW = 3.5;

type Poles = 2 | 4 | 6 | 8;

/** Lay a textLabel flat on the top face (readable from above). */
function lay(label: THREE.Object3D) {
  label.rotation.x = -Math.PI / 2;
  return label;
}

/**
 * One bent DIP pin: stub out of the body side, wide shoulder, narrow shaft.
 * side = +1 → front row (z+), -1 → back row (z-)
 */
function makePin(x: number, side: 1 | -1): THREE.Group {
  const g = new THREE.Group();

  const zInner = side * (BODY_W / 2 - 0.3);
  const zOuter = side * (ROW_SPACING / 2 + PIN_T / 2);
  const stubLen = Math.abs(zOuter - zInner);

  const stub = solidBox(PIN_W * MM, PIN_T * MM, stubLen * MM, M.metal());
  stub.position.set(0, STUB_Y * MM, ((zInner + zOuter) / 2) * MM);
  g.add(stub);

  const shoulderLen = STUB_Y + PIN_T / 2 - SHOULDER_BOTTOM;
  const shoulder = solidBox(
    SHOULDER_W * MM,
    shoulderLen * MM,
    PIN_T * MM,
    M.metal(),
  );
  shoulder.position.set(
    0,
    ((STUB_Y + PIN_T / 2 + SHOULDER_BOTTOM) / 2) * MM,
    side * (ROW_SPACING / 2) * MM,
  );
  g.add(shoulder);

  const shaftLen = LEAD_BELOW - Math.abs(SHOULDER_BOTTOM);
  const shaft = solidBox(PIN_W * MM, shaftLen * MM, PIN_T * MM, M.gray());
  shaft.position.set(
    0,
    (SHOULDER_BOTTOM - shaftLen / 2) * MM,
    side * (ROW_SPACING / 2) * MM,
  );
  g.add(shaft);

  g.position.x = x * MM;
  return g;
}

/**
 * @param poles      Number of switches: 2, 4, 6 or 8
 * @param states     true = ON for each pole, e.g. [true, false, false, true].
 *                   Missing entries are OFF.
 * @param bodyColor  Body colour (red is the classic one; blue is common too)
 * @param scale      Uniform scale (1 = real size)
 */
export function buildDipSwitch(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  poles: Poles = 8,
  states: boolean[] = [],
  bodyColor = "#b8312a",
  scale = 1,
): THREE.Group {
  const root = new THREE.Group();

  const bodyL = poles * POLE_PITCH + 0.4;
  const poleX = (i: number) => (i - (poles - 1) / 2) * POLE_PITCH;

  // ── Materials ────────────────────────────────────────────────────────────
  const bodyMat = new THREE.MeshBasicMaterial({ color: bodyColor });
  const slotMat = new THREE.MeshBasicMaterial({ color: 0x161a20 });
  const sliderMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

  // ── Body ─────────────────────────────────────────────────────────────────
  const body = solidBox(bodyL * MM, BODY_H * MM, BODY_W * MM, bodyMat);
  body.position.set(0, (BODY_H / 2) * MM, 0);
  root.add(body);

  const topY = BODY_H;

  // ── Slots + sliders ──────────────────────────────────────────────────────
  const travel = (SLOT_L - SLIDER_L) / 2; // how far a slider moves from centre

  for (let i = 0; i < poles; i++) {
    const x = poleX(i);
    const on = !!states[i];

    // Slot
    const slot = solidBox(SLOT_W * MM, 0.12 * MM, SLOT_L * MM, M.capblue());
    slot.position.set(x * MM, (topY + 0.06) * MM, 0);
    root.add(slot);

    // Slider: ON = back (-Z), OFF = front (+Z)
    const slider = solidBox(
      SLIDER_W * MM,
      SLIDER_H * MM,
      SLIDER_L * MM,
      M.blue(),
    );
    slider.position.set(
      x * MM,
      (topY + 0.12 + SLIDER_H / 2) * MM,
      (on ? -travel : travel) * MM,
    );
    root.add(slider);
  }

  // ── Printing: pole numbers at the front, "ON" at the back ────────────────
  const printY = (topY + 0.02) * MM;

  for (let i = 0; i < poles; i++) {
    const label = textLabel(String(i + 1), 1.8 * MM, 1.3 * MM, {
      textColor: "#f4f4f4",
      fontSize: 48,
    });
    if (!label) continue;
    lay(label);
    label.position.set(poleX(i) * MM, printY, 2.85 * MM);
    root.add(label);
  }

  const onLabel = textLabel("ON", 3.0 * MM, 1.3 * MM, {
    textColor: "#f4f4f4",
    fontSize: 48,
  });
  if (onLabel) {
    lay(onLabel);
    onLabel.position.set(poleX(0) * MM, printY, -2.85 * MM);
    root.add(onLabel);
  }

  // ── Pins: front row (z+) and back row (z-), one pair per pole ────────────
  for (let i = 0; i < poles; i++) {
    root.add(makePin(poleX(i), 1));
    root.add(makePin(poleX(i), -1));
  }

  root.scale.setScalar(scale);
  root.position.copy(mountPos);
  return root;
}

/** Longest edge of the standalone model, in world units (small on purpose). */
const STANDALONE_LENGTH = 1.2;

export function buildDipSwitchStandalone(poles: Poles = 8): THREE.Group {
  // Fixed small size, independent of PITCH, centred on the origin for the viewer.
  const s = STANDALONE_LENGTH / ((8 * POLE_PITCH + 0.4) * MM);
  const demo = Array.from({ length: poles }, (_, i) => i % 2 === 0);
  const root = buildDipSwitch(
    new THREE.Vector3(0, 0, 0),
    poles,
    demo,
    "#b8312a",
    s,
  );
  root.position.y = -((BODY_H + 1 - LEAD_BELOW) / 2) * MM * s;
  return root;
}
