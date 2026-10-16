import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// OP-AMP — LM741 (DIP-8, plastic dual in-line package)
//
//   Top view (notch on the left, text readable):
//
//        8    7    6    5
//      ┌─┴────┴────┴────┴─┐
//      ◖   LM741CN        │
//      └─┬────┬────┬────┬─┘
//        1    2    3    4
//
//   1 = Offset Null   5 = Offset Null
//   2 = IN−           6 = OUT
//   3 = IN+           7 = V+
//   4 = V−            8 = NC
//
// Origin = centre of the body's bottom face. +Y up (printed face on top),
// pins point to -Y, body length runs along X, pin rows run along Z.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real DIP-8 dimensions (mm) ──────────────────────────────────────────────
const BODY_L = 9.5; // along the pin rows (X)
const BODY_H = 3.3; // body height (Y)
const BODY_W = 6.35; // across the body (Z)
const ROW_SPACING = 7.62; // distance between the two pin rows (0.3")
const PIN_PITCH = 2.54;

// Pins
const PIN_W = 0.5; // shaft width
const PIN_T = 0.25; // pin thickness
const SHOULDER_W = 1.3; // wide shoulder just below the body
const STUB_Y = 1.0; // height where the pin leaves the body side
const SHOULDER_BOTTOM = -1.0;
const LEAD_BELOW = 3.5; // how far pins extend below the body bottom

// Pin-number printing on the body top
const PIN_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

/** Lay a textLabel flat on the top face (readable from above). */
function lay(label: THREE.Object3D) {
  label.rotation.x = -Math.PI / 2;
  return label;
}

/**
 * One bent DIP pin: horizontal stub out of the body side, then a wide
 * shoulder, then a narrow shaft pointing down.
 * side = +1 → front row (z+), -1 → back row (z-)
 */
function makePin(x: number, side: 1 | -1): THREE.Group {
  const g = new THREE.Group();

  const zInner = side * (BODY_W / 2 - 0.3); // starts slightly inside body
  const zOuter = side * (ROW_SPACING / 2 + PIN_T / 2);
  const stubLen = Math.abs(zOuter - zInner);

  // Horizontal stub
  const stub = solidBox(PIN_W * MM, PIN_T * MM, stubLen * MM, M.metal());
  stub.position.set(0, STUB_Y * MM, ((zInner + zOuter) / 2) * MM);
  g.add(stub);

  // Wide shoulder
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

  // Narrow shaft
  const shaftLenAbs = LEAD_BELOW - Math.abs(SHOULDER_BOTTOM);
  const shaft = solidBox(PIN_W * MM, shaftLenAbs * MM, PIN_T * MM, M.metal());
  shaft.position.set(
    0,
    (SHOULDER_BOTTOM - shaftLenAbs / 2) * MM,
    side * (ROW_SPACING / 2) * MM,
  );
  g.add(shaft);

  g.position.x = x * MM;
  return g;
}

export function buildOpAmp(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  partNumber = "LM741CN",
): THREE.Group {
  const root = new THREE.Group();

  // ── Plastic body ─────────────────────────────────────────────────────────
  const body = solidBox(BODY_L * MM, BODY_H * MM, BODY_W * MM, M.dark());
  body.position.set(0, (BODY_H / 2) * MM, 0);
  root.add(body);

  const topY = BODY_H * MM + 0.02 * MM;

  // ── Pin-1 notch: half-circle moulded into the left end ───────────────────
  const notchMat = new THREE.MeshBasicMaterial({ color: 0x3b4252 });
  const notch = new THREE.Mesh(
    new THREE.CircleGeometry(0.95 * MM, 32, -Math.PI / 2, Math.PI),
    notchMat,
  );
  notch.rotation.x = -Math.PI / 2;
  notch.position.set((-BODY_L / 2) * MM, topY, 0);
  root.add(notch);

  // ── Pin-1 dimple (ring) next to pin 1 ────────────────────────────────────
  const dimple = new THREE.Mesh(
    new THREE.TorusGeometry(0.45 * MM, 0.08 * MM, 8, 24),
    M.gold(),
  );
  dimple.rotation.x = -Math.PI / 2;
  dimple.position.set(-3.7 * MM, topY, 1.2 * MM);
  root.add(dimple);

  // ── Part marking ─────────────────────────────────────────────────────────
  const marking = textLabel(partNumber, 5.4 * MM, 1.9 * MM, {
    textColor: "#f8fafc",
    fontSize: 36,
    bold: true,
  });
  if (marking) {
    lay(marking);
    marking.position.set(0.4 * MM, topY, 0);
    root.add(marking);
  }

  // ── Pins ─────────────────────────────────────────────────────────────────
  // Notch on the left, text readable: pin 1 is bottom-left (front row),
  // pins 1→4 run left → right, pins 5→8 run right → left on the back row.
  for (let i = 0; i < 4; i++) {
    const xFront = (-1.5 + i) * PIN_PITCH; // pins 1..4
    const xBack = (1.5 - i) * PIN_PITCH; // pins 5..8
    root.add(makePin(xFront, 1));
    root.add(makePin(xBack, -1));
  }

  // ── Pin numbers printed on the body top, beside each pin ─────────────────
  for (let i = 0; i < 8; i++) {
    const front = i < 4;
    const x = front ? (-1.5 + i) * PIN_PITCH : (1.5 - (i - 4)) * PIN_PITCH;
    const z = front ? 2.45 : -2.45;

    const label = textLabel(PIN_LABELS[i], 1.6 * MM, 1.4 * MM, {
      textColor: "#bbbbbb",
      fontSize: 48,
    });
    if (!label) continue;

    lay(label);
    label.position.set(x * MM, topY, z * MM);
    root.add(label);
  }

  root.position.copy(mountPos);
  return root;
}

export function buildOpAmpStandalone(): THREE.Group {
  const root = buildOpAmp(new THREE.Vector3(0, 0, 0));
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}
