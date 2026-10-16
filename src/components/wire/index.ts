import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M, WIRE_HEX } from "@/components/shared/materials";

// ═══════════════════════════════════════════════════════════════════════════════
// WIRE & INSTRUMENT CABLE SYSTEM — Vibrant colors & crisp connector boots
// ═══════════════════════════════════════════════════════════════════════════════

export type ConnectorType =
  | "dupont"
  | "banana"
  | "bnc"
  | "probe"
  | "alligator"
  | "bare";

function buildJumperPinTip(pos: THREE.Vector3, colorHex: number): THREE.Group {
  const grp = new THREE.Group();

  // Metallic pin tip descending into the breadboard hole
  const pinH = PITCH * 0.34 + BOARD_H * 0.35;
  const pinGeo = new THREE.CylinderGeometry(
    PITCH * 0.048,
    PITCH * 0.04,
    pinH,
    10,
  );
  const pin = new THREE.Mesh(pinGeo, M.gold());
  pin.position.set(pos.x, TOP_Y + PITCH * 0.14 - pinH / 2, pos.z);
  grp.add(pin);

  // Dark thermoplastic crimp collar / ferrule sitting flush on TOP_Y
  const collarH = PITCH * 0.24;
  const collarGeo = new THREE.CylinderGeometry(
    PITCH * 0.115,
    PITCH * 0.125,
    collarH,
    12,
  );
  const collarMat = new THREE.MeshBasicMaterial({ color: 0x1e2024 });
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.position.set(pos.x, TOP_Y + collarH / 2, pos.z);
  grp.add(collar);

  // Colored strain-relief boot above the collar
  const sleeveH = PITCH * 0.12;
  const sleeveGeo = new THREE.CylinderGeometry(
    PITCH * 0.095,
    PITCH * 0.115,
    sleeveH,
    12,
  );
  const sleeveMat = new THREE.MeshBasicMaterial({ color: colorHex });
  const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
  sleeve.position.set(pos.x, TOP_Y + collarH + sleeveH / 2, pos.z);
  grp.add(sleeve);

  return grp;
}

// ── Breadboard Jumper Wire ──────────────────────────────────────────────────
export function buildWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  colorName = "red",
): THREE.Group {
  const root = new THREE.Group();
  const hexColor = WIRE_HEX[colorName.toLowerCase()] ?? 0xe03424;
  const wireMat = new THREE.MeshBasicMaterial({ color: hexColor });

  root.add(buildJumperPinTip(from, hexColor));
  root.add(buildJumperPinTip(to, hexColor));

  const dist = from.distanceTo(to);
  const startExitY = TOP_Y + PITCH * 0.34;
  const archH = Math.min(PITCH * 2.1, Math.max(PITCH * 0.72, dist * 0.24));

  const p0 = new THREE.Vector3(from.x, startExitY, from.z);
  const p3 = new THREE.Vector3(to.x, startExitY, to.z);
  const p1 = new THREE.Vector3(
    from.x + (to.x - from.x) * 0.18,
    TOP_Y + archH,
    from.z + (to.z - from.z) * 0.18,
  );
  const p2 = new THREE.Vector3(
    to.x - (to.x - from.x) * 0.18,
    TOP_Y + archH,
    to.z - (to.z - from.z) * 0.18,
  );

  const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
  const wireR = PITCH * 0.082;
  const tubeGeo = new THREE.TubeGeometry(curve, 32, wireR, 10, false);
  root.add(new THREE.Mesh(tubeGeo, wireMat));

  return root;
}

function buildBoardProbeEnd(pos: THREE.Vector3, colorHex: number): THREE.Group {
  const grp = new THREE.Group();

  const needleH = PITCH * 0.4 + BOARD_H * 0.35;
  const needleGeo = new THREE.CylinderGeometry(
    PITCH * 0.045,
    PITCH * 0.032,
    needleH,
    10,
  );
  const needle = new THREE.Mesh(needleGeo, M.gold());
  needle.position.set(pos.x, TOP_Y + PITCH * 0.16 - needleH / 2, pos.z);
  grp.add(needle);

  const bootH = PITCH * 0.48;
  const bootGeo = new THREE.CylinderGeometry(
    PITCH * 0.105,
    PITCH * 0.145,
    bootH,
    12,
  );
  const bootMat = new THREE.MeshBasicMaterial({ color: colorHex });
  const boot = new THREE.Mesh(bootGeo, bootMat);
  boot.position.set(pos.x, TOP_Y + bootH / 2 + PITCH * 0.02, pos.z);
  grp.add(boot);

  const ringGeo = new THREE.CylinderGeometry(
    PITCH * 0.15,
    PITCH * 0.15,
    PITCH * 0.08,
    12,
  );
  const ring = new THREE.Mesh(ringGeo, M.dark());
  ring.position.set(pos.x, TOP_Y + PITCH * 0.12, pos.z);
  grp.add(ring);

  return grp;
}

function buildInstrumentPlugBoot(
  pos: THREE.Vector3,
  colorHex: number,
): THREE.Group {
  const grp = new THREE.Group();
  const bootLen = PITCH * 0.46;
  const bootGeo = new THREE.CylinderGeometry(
    PITCH * 0.12,
    PITCH * 0.09,
    bootLen,
    12,
  );
  bootGeo.rotateX(Math.PI / 2);
  const bootMat = new THREE.MeshBasicMaterial({ color: colorHex });
  const boot = new THREE.Mesh(bootGeo, bootMat);
  boot.position.set(pos.x, pos.y, pos.z + bootLen * 0.45);
  grp.add(boot);
  return grp;
}

// ── Instrument Cable (PSU / DMM / FG / CRO → Breadboard) ────────────────────
export function buildInstrumentCable(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: string | number = "red",
  options: {
    fromConnector?: ConnectorType;
    toConnector?: ConnectorType;
    arcHeight?: number;
  } = {},
): THREE.Group {
  const root = new THREE.Group();
  const hexColor =
    typeof color === "number"
      ? color
      : (WIRE_HEX[color.toLowerCase()] ?? 0xe03424);

  const cableMat = new THREE.MeshBasicMaterial({ color: hexColor });

  root.add(buildInstrumentPlugBoot(from, hexColor));
  root.add(buildBoardProbeEnd(to, hexColor));

  const p0 = new THREE.Vector3(from.x, from.y, from.z + PITCH * 0.42);
  const p3 = new THREE.Vector3(to.x, TOP_Y + PITCH * 0.46, to.z);

  const dz = Math.max(PITCH * 2.0, Math.abs(p3.z - p0.z));
  const lift = options.arcHeight ?? PITCH * 1.35;

  const p1 = new THREE.Vector3(
    p0.x + (p3.x - p0.x) * 0.25,
    Math.max(p0.y + PITCH * 0.35, TOP_Y + lift * 0.65),
    p0.z + dz * 0.42,
  );
  const p2 = new THREE.Vector3(
    p3.x,
    TOP_Y + lift + PITCH * 0.65,
    p3.z - Math.min(PITCH * 0.8, dz * 0.18),
  );

  const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
  const wireR = PITCH * 0.088;
  const tubeGeo = new THREE.TubeGeometry(curve, 36, wireR, 10, false);
  root.add(new THREE.Mesh(tubeGeo, cableMat));

  return root;
}

// ── Standalone Wire & Banana Cable (for Apparatus Viewer) ───────────────────
export function buildWireStandalone(colorName = "red"): THREE.Group {
  const from = new THREE.Vector3(-PITCH * 2, 0, 0);
  const to = new THREE.Vector3(PITCH * 2, 0, 0);
  return buildWire(from, to, colorName);
}

export function buildBananaCableStandalone(color = "red"): THREE.Group {
  const from = new THREE.Vector3(-PITCH * 2.5, PITCH * 0.5, -PITCH * 1.2);
  const to = new THREE.Vector3(PITCH * 2.5, TOP_Y, PITCH * 1.2);
  return buildInstrumentCable(from, to, color);
}
