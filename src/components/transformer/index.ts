import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// STEP-DOWN TRANSFORMER — centre-tapped, small encapsulated PCB-mount type
// (e.g. 230 V → 12-0-12 V, 2 VA)
//
//   Top view (label readable, up = -Z):
//
//        P1                    S1
//         ●   ┌───────────┐    ●
//             │ STEP-DOWN │
//             │ 230V/12-0-12V     ●  CT
//             │   2 VA    │
//         ●   └───────────┘    ●
//        P2                    S2
//
//   Primary   (230 V AC) : P1, P2        — left side, 2 pins
//   Secondary (12-0-12 V): S1, CT, S2    — right side, 3 pins, CT = centre tap
//
// Small part: about 38 × 30 × 29 mm. Origin = centre of the base plate's
// bottom face. +Y up (label on top), pins point to -Y.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real dimensions (mm) ────────────────────────────────────────────────────
const BODY_L = 38; // X
const BODY_W = 30; // Z
const BODY_H = 29; // Y, total height including the base plate
const BASE_T = 2; // base plate thickness
const BASE_EXTRA = 2; // base plate sticks out this much more than the body
const LIP_T = 1.2; // raised rim around the top

// Pins
const PIN_S = 0.8;
const LEAD_BELOW = 4.5;
const ROW_X = 15.24; // pin rows at x = ±15.24 (0.6" apart on each side of centre)

const PRIMARY = [
  { text: "P1", z: -2.54 },
  { text: "P2", z: 2.54 },
];
const SECONDARY = [
  { text: "S1", z: -5.08 },
  { text: "CT", z: 0 },
  { text: "S2", z: 5.08 },
];

/** Lay a textLabel flat on the top face (readable from above). */
function lay(label: THREE.Object3D) {
  label.rotation.x = -Math.PI / 2;
  return label;
}

function makePin(x: number, z: number): THREE.Object3D {
  const len = BASE_T + LEAD_BELOW; // starts at the base plate top
  const pin = solidBox(PIN_S * MM, len * MM, PIN_S * MM, M.metal());
  pin.position.set(x * MM, ((BASE_T - LEAD_BELOW) / 2) * MM, z * MM);
  return pin;
}

/**
 * @param secondary  Secondary rating printed on the label
 * @param rating     Power rating printed on the label
 * @param scale      Uniform scale (1 = real size)
 */
export function buildTransformer(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  secondary = "12-0-12V",
  rating = "2 VA",
  scale = 1,
): THREE.Group {
  const root = new THREE.Group();

  // ── Materials ────────────────────────────────────────────────────────────
  const epoxyMat = new THREE.MeshBasicMaterial({ color: 0x222834 });
  const stickerMat = new THREE.MeshBasicMaterial({ color: 0xf4f1ea });

  // ── Base plate + case ────────────────────────────────────────────────────
  const base = solidBox(
    (BODY_L + BASE_EXTRA) * MM,
    BASE_T * MM,
    (BODY_W + BASE_EXTRA) * MM,
    M.dark(),
  );
  base.position.set(0, (BASE_T / 2) * MM, 0);
  root.add(base);

  const bodyH = BODY_H - BASE_T;
  const body = solidBox(BODY_L * MM, bodyH * MM, BODY_W * MM, M.dark());
  body.position.set(0, (BASE_T + bodyH / 2) * MM, 0);
  root.add(body);

  // Raised rim around the top edge
  const lip = solidBox(
    (BODY_L + 0.8) * MM,
    LIP_T * MM,
    (BODY_W + 0.8) * MM,
    M.dark(),
  );
  lip.position.set(0, (BODY_H - LIP_T / 2) * MM, 0);
  root.add(lip);

  // Epoxy fill, slightly raised inside the rim
  const epoxy = solidBox(
    (BODY_L - 4) * MM,
    0.3 * MM,
    (BODY_W - 4) * MM,
    epoxyMat,
  );
  epoxy.position.set(0, (BODY_H + 0.15) * MM, 0);
  root.add(epoxy);

  const epoxyTop = BODY_H + 0.3;

  // ── Label sticker ────────────────────────────────────────────────────────
  const sticker = solidBox(20 * MM, 0.15 * MM, 13 * MM, stickerMat);
  sticker.position.set(0, (epoxyTop + 0.075) * MM, 0);
  root.add(sticker);

  const textY = (epoxyTop + 0.15 + 0.02) * MM;

  const addText = (
    text: string,
    z: number,
    w: number,
    h: number,
    color = "#111111",
  ) => {
    const label = textLabel(text, w * MM, h * MM, {
      textColor: color,
      fontSize: 40,
    });
    if (!label) return;
    lay(label);
    label.position.set(0, textY, z * MM);
    root.add(label);
  };

  addText("STEP-DOWN", -3.8, 16, 2.6);
  addText(`230V / ${secondary}`, 0, 18.5, 3.2);
  addText(rating, 3.8, 10, 2.8);

  // ── Pins ─────────────────────────────────────────────────────────────────
  for (const p of PRIMARY) root.add(makePin(-ROW_X, p.z));
  for (const s of SECONDARY) root.add(makePin(ROW_X, s.z));

  // ── Pin names printed on the epoxy, beside each pin ──────────────────────
  const addPinLabel = (text: string, x: number, z: number) => {
    const label = textLabel(text, 4 * MM, 2.8 * MM, {
      textColor: "#cccccc",
      fontSize: 48,
    });
    if (!label) return;
    lay(label);
    label.position.set(x * MM, (epoxyTop + 0.02) * MM, z * MM);
    root.add(label);
  };

  for (const p of PRIMARY) addPinLabel(p.text, -ROW_X + 2.4, p.z);
  for (const s of SECONDARY) addPinLabel(s.text, ROW_X - 2.4, s.z);

  root.scale.setScalar(scale);
  root.position.copy(mountPos);
  return root;
}

/** Longest edge of the standalone model, in world units (small on purpose). */
const STANDALONE_LENGTH = 1.2;

export function buildTransformerStandalone(): THREE.Group {
  // Fixed small size, independent of PITCH, centred on the origin for the viewer.
  const s = STANDALONE_LENGTH / ((BODY_L + BASE_EXTRA) * MM);
  const root = buildTransformer(
    new THREE.Vector3(0, 0, 0),
    "12-0-12V",
    "2 VA",
    s,
  );
  root.position.y = -((BODY_H - LEAD_BELOW) / 2) * MM * s;
  return root;
}
