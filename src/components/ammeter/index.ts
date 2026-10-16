import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import {
  solidBox,
  solidCyl,
  textLabel,
  centreAtOrigin,
} from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";

// ─────────────────────────────────────────────────────────────────────────────
// AMMETER / MILLIAMMETER
// Analogue 0–100 mA panel meter
// ─────────────────────────────────────────────────────────────────────────────

const BODY_W = PITCH * 4.8;
const BODY_H = PITCH * 4.0;
const BODY_D = PITCH * 1.35;

const FACE_W = BODY_W * 0.82;
const FACE_H = BODY_H * 0.68;

const DIAL_R = Math.min(FACE_W, FACE_H) * 0.4;

const NEEDLE_LENGTH = DIAL_R * 0.78;
const NEEDLE_WIDTH = PITCH * 0.055;

const TERMINAL_R = PITCH * 0.22;
const TERMINAL_DEPTH = PITCH * 0.2;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function makeNeedle(length: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(
    NEEDLE_WIDTH,
    length,
    NEEDLE_WIDTH * 0.55,
  );

  // BoxGeometry is centered by default.
  // Translate vertices upward so (0, 0, 0) is the bottom pivot.
  geometry.translate(0, length / 2, 0);

  const needle = new THREE.Mesh(geometry, M.dark());

  return needle;
}

function parseReadingValue(
  reading: string | number | undefined | null,
): number | null {
  if (reading === undefined || reading === null) return null;
  if (typeof reading === "number")
    return Number.isFinite(reading) ? reading : null;
  const str = String(reading).trim();
  if (!str || str === "--") return null;
  const match = str.match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!match) return null;
  const val = parseFloat(match[0]);
  return Number.isFinite(val) ? val : null;
}

function makeDialTick(
  angle: number,
  innerRadius: number,
  outerRadius: number,
  width: number,
): THREE.Mesh {
  const length = outerRadius - innerRadius;

  const geometry = new THREE.BoxGeometry(width, length, width * 0.7);

  const tick = new THREE.Mesh(geometry, M.dark());

  const radius = innerRadius + length / 2;

  tick.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);

  tick.rotation.z = -angle;

  return tick;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dial
// ─────────────────────────────────────────────────────────────────────────────

function buildDial(reading?: number | string): THREE.Group {
  const dial = new THREE.Group();

  // ── White analogue dial face ────────────────────────────────────────────

  const faceGeometry = new THREE.CylinderGeometry(
    DIAL_R,
    DIAL_R,
    PITCH * 0.08,
    48,
  );

  const face = new THREE.Mesh(faceGeometry, M.cream());

  // Cylinder axis is Y by default.
  // Rotate so circular face points toward +Z.
  face.rotation.x = Math.PI / 2;

  dial.add(face);

  // ── Scale markings ─────────────────────────────────────────────────────

  const startAngle = -Math.PI * 0.67;
  const endAngle = Math.PI * 0.67;

  const tickCount = 21;

  for (let i = 0; i < tickCount; i++) {
    const t = i / (tickCount - 1);

    const angle = startAngle + (endAngle - startAngle) * t;

    const major = i % 5 === 0;

    const tick = makeDialTick(
      angle,
      DIAL_R * (major ? 0.67 : 0.73),
      DIAL_R * 0.88,
      major ? PITCH * 0.045 : PITCH * 0.025,
    );

    tick.position.z = PITCH * 0.055;

    dial.add(tick);
  }

  // ── Scale numbers ──────────────────────────────────────────────────────

  const values = [0, 25, 50, 75, 100];

  values.forEach((value, index) => {
    const t = index / (values.length - 1);

    const angle = startAngle + (endAngle - startAngle) * t;

    const radius = DIAL_R * 0.53;

    const label = textLabel(String(value), PITCH * 0.55, PITCH * 0.28, {
      textColor: "#222222",
      fontSize: 32,
    });

    if (!label) return;

    label.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      PITCH * 0.085,
    );

    label.rotation.z = 0;

    dial.add(label);
  });

  // ── mA label ───────────────────────────────────────────────────────────

  const unitLabel = textLabel("mA", PITCH * 0.9, PITCH * 0.45, {
    textColor: "#222222",
    fontSize: 42,
  });

  if (unitLabel) {
    unitLabel.position.set(0, DIAL_R * 0.18, PITCH * 0.09);

    dial.add(unitLabel);
  }

  // ── Needle ──────────────────────────────────────────────────────────────

  const needle = makeNeedle(NEEDLE_LENGTH);

  const numVal = parseReadingValue(reading);
  const currentVal =
    numVal !== null
      ? numVal
      : typeof reading === "string" && reading.trim() === "--"
        ? 0
        : 25;

  const clampedVal = Math.max(0, Math.min(100, currentVal));
  const t = clampedVal / 100;
  const angle = startAngle + (endAngle - startAngle) * t;

  needle.position.set(0, 0, PITCH * 0.13);
  needle.rotation.z = -angle;

  dial.add(needle);

  // ── Centre pivot ────────────────────────────────────────────────────────

  const pivot = solidCyl(PITCH * 0.12, PITCH * 0.1, M.dark(), 12);

  pivot.rotation.x = Math.PI / 2;

  pivot.position.z = PITCH * 0.16;

  dial.add(pivot);

  return dial;
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal
// ─────────────────────────────────────────────────────────────────────────────

function buildTerminal(
  x: number,
  labelText: string,
  terminalMaterial: THREE.Material,
): THREE.Group {
  const group = new THREE.Group();

  const terminalY = BODY_H * 0.18;

  // Front surface of the body.
  const frontZ = BODY_D / 2;

  // ── Recessed socket ─────────────────────────────────────────────────────

  const socket = solidCyl(
    TERMINAL_R * 1.35,
    TERMINAL_DEPTH * 0.55,
    M.dark(),
    24,
  );

  socket.rotation.x = Math.PI / 2;

  socket.position.set(x, terminalY, frontZ + PITCH * 0.015);

  group.add(socket);

  // ── Coloured binding post ──────────────────────────────────────────────

  const post = solidCyl(TERMINAL_R, TERMINAL_DEPTH, terminalMaterial, 24);

  post.rotation.x = Math.PI / 2;

  post.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.28);

  group.add(post);

  // ── Centre contact ─────────────────────────────────────────────────────

  const contact = solidCyl(
    TERMINAL_R * 0.3,
    TERMINAL_DEPTH * 0.14,
    M.cream(),
    16,
  );

  contact.rotation.x = Math.PI / 2;

  contact.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.43);

  group.add(contact);

  // ── Polarity label ─────────────────────────────────────────────────────

  const label = textLabel(labelText, PITCH * 0.48, PITCH * 0.28, {
    textColor: labelText === "+" ? "#d32f2f" : "#222222",
    fontSize: 30,
  });

  if (label) {
    label.position.set(
      x,
      terminalY + TERMINAL_R * 1.7,
      frontZ + TERMINAL_DEPTH * 0.5,
    );

    label.rotation.z = 0;

    group.add(label);
  }

  return group;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main builder
// ─────────────────────────────────────────────────────────────────────────────

export function buildAmmeter(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  reading?: number | string,
): THREE.Group {
  const root = new THREE.Group();

  // ── Main black instrument body ─────────────────────────────────────────

  const body = solidBox(BODY_W, BODY_H, BODY_D, M.blue());

  /*
   * Bottom of the body = y 0
   * Top of the body    = y BODY_H
   */
  body.position.set(0, BODY_H / 2, 0);

  root.add(body);

  // ── Raised front bezel ─────────────────────────────────────────────────

  const bezel = solidBox(FACE_W, FACE_H, PITCH * 0.18, M.edge());

  bezel.position.set(0, BODY_H * 0.59, BODY_D / 2 + PITCH * 0.08);

  root.add(bezel);

  // ── Dial ────────────────────────────────────────────────────────────────

  const dial = buildDial(reading);

  dial.position.set(0, BODY_H * 0.6, BODY_D / 2 + PITCH * 0.19);

  root.add(dial);

  // ── Range marking ──────────────────────────────────────────────────────

  const rangeLabel = textLabel("0–100", PITCH * 1.15, PITCH * 0.32, {
    textColor: "#eeeeee",
    fontSize: 30,
  });

  if (rangeLabel) {
    rangeLabel.position.set(0, BODY_H * 0.16, BODY_D / 2 + PITCH * 0.11);

    root.add(rangeLabel);
  }

  // ── Instrument name ────────────────────────────────────────────────────

  const titleLabel = textLabel("MILLIAMMETER", PITCH * 1.75, PITCH * 0.3, {
    textColor: "#eeeeee",
    fontSize: 30,
  });

  if (titleLabel) {
    titleLabel.position.set(0, BODY_H * 0.1, BODY_D / 2 + PITCH * 0.11);

    root.add(titleLabel);
  }

  // ── Terminals ──────────────────────────────────────────────────────────

  const positiveTerminal = buildTerminal(-BODY_W * 0.27, "+", M.red());

  const negativeTerminal = buildTerminal(BODY_W * 0.27, "−", M.dark());

  root.add(positiveTerminal);
  root.add(negativeTerminal);

  // ── Mounting feet ──────────────────────────────────────────────────────

  const footGeometry = new THREE.BoxGeometry(
    PITCH * 0.42,
    PITCH * 0.25,
    PITCH * 0.65,
  );

  const leftFoot = new THREE.Mesh(footGeometry, M.dark());

  const rightFoot = new THREE.Mesh(footGeometry, M.dark());

  leftFoot.position.set(-BODY_W * 0.36, -PITCH * 0.08, 0);

  rightFoot.position.set(BODY_W * 0.36, -PITCH * 0.08, 0);

  root.add(leftFoot);
  root.add(rightFoot);

  // ── Position in the lab ────────────────────────────────────────────────

  root.position.copy(mountPos);

  return root;
}

// ─────────────────────────────────────────────────────────────────────────────
// Standalone preview
// ─────────────────────────────────────────────────────────────────────────────

export function buildAmmeterStandalone(reading?: number | string): THREE.Group {
  const root = buildAmmeter(new THREE.Vector3(0, 0, 0), reading ?? 25);
  return centreAtOrigin(root);
}

// ─────────────────────────────────────────────────────────────────────────────
// BENCH-PLACED AMMETER (stands behind the board like the PSU / DMM)
// ─────────────────────────────────────────────────────────────────────────────

export function buildAmmeterSide(
  position: "left" | "right" | number = "right",
  readingOrTargets?:
    string | number | { probe1: THREE.Vector3; probe2: THREE.Vector3 },
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  let displayVal: string | number | undefined;
  let actualTargets = targets;
  if (
    readingOrTargets &&
    typeof readingOrTargets === "object" &&
    "probe1" in readingOrTargets
  ) {
    actualTargets = readingOrTargets as {
      probe1: THREE.Vector3;
      probe2: THREE.Vector3;
    };
  } else if (readingOrTargets !== undefined) {
    displayVal = readingOrTargets as string | number;
  }

  const model = buildAmmeterStandalone(displayVal ?? "--");

  const slot =
    typeof position === "number"
      ? position
      : position === "right"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos, scale } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(scale);
  // Elevate so that the feet of the centered model sit on the bench (Y = 0)
  wrapper.position.set(slotPos.x, BODY_H * 0.5 * scale, slotPos.z);

  const root = new THREE.Group();
  root.add(wrapper);

  if (actualTargets) {
    const meterY = TOP_Y + PITCH * 0.5;
    const origin = new THREE.Vector3(slotPos.x, meterY, slotPos.z);
    root.add(instrumentWire(origin, actualTargets.probe1, 0xd63b2a));
    const origin2 = origin.clone();
    origin2.x -= 0.06;
    origin2.z += 0.05;
    root.add(instrumentWire(origin2, actualTargets.probe2, 0x202020));
  }

  return root;
}
