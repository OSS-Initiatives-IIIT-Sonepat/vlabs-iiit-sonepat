import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";

// ─────────────────────────────────────────────────────────────────────────────
// VOLTMETER
// Analogue 0–15 V DC panel meter
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

function makeNeedle(length: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(
    NEEDLE_WIDTH,
    length,
    NEEDLE_WIDTH * 0.55,
  );

  const needle = new THREE.Mesh(geometry, M.dark());
  needle.position.y = length / 2;

  return needle;
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

function buildDial(): THREE.Group {
  const dial = new THREE.Group();

  // Dial face
  const faceGeometry = new THREE.CylinderGeometry(
    DIAL_R,
    DIAL_R,
    PITCH * 0.08,
    48,
  );

  const face = new THREE.Mesh(faceGeometry, M.cream());
  face.rotation.x = Math.PI / 2;

  dial.add(face);

  // Scale: 0 → 15 V
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

  // 0, 3.75, 7.5, 11.25, 15
  const values = [0, 3.75, 7.5, 11.25, 15];

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

  // Unit
  const unitLabel = textLabel("V DC", PITCH * 0.9, PITCH * 0.45, {
    textColor: "#222222",
    fontSize: 42,
  });

  if (unitLabel) {
    unitLabel.position.set(0, DIAL_R * 0.18, PITCH * 0.09);

    dial.add(unitLabel);
  }

  // Needle
  const needle = makeNeedle(NEEDLE_LENGTH);

  needle.rotation.z = -Math.PI * 0.42;
  needle.position.z = PITCH * 0.13;

  dial.add(needle);

  // Center pivot
  const pivot = solidCyl(PITCH * 0.12, PITCH * 0.1, M.dark(), 12);

  pivot.rotation.x = Math.PI / 2;
  pivot.position.z = PITCH * 0.16;

  dial.add(pivot);

  return dial;
}

function buildTerminal(
  x: number,
  labelText: string,
  terminalMaterial: THREE.Material,
): THREE.Group {
  const terminal = new THREE.Group();

  // Keep terminals on the front panel instead of below the body.
  const terminalY = BODY_H * 0.18;
  const frontZ = BODY_D / 2;

  // Recessed socket
  const socket = solidCyl(
    TERMINAL_R * 1.35,
    TERMINAL_DEPTH * 0.55,
    M.dark(),
    24,
  );

  socket.rotation.x = Math.PI / 2;

  socket.position.set(x, terminalY, frontZ + PITCH * 0.015);

  terminal.add(socket);

  // Colored terminal post
  const post = solidCyl(TERMINAL_R, TERMINAL_DEPTH, terminalMaterial, 24);

  post.rotation.x = Math.PI / 2;

  post.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.28);

  terminal.add(post);

  // Small metal contact in the center
  const contact = solidCyl(
    TERMINAL_R * 0.3,
    TERMINAL_DEPTH * 0.14,
    M.cream(),
    16,
  );

  contact.rotation.x = Math.PI / 2;

  contact.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.43);

  terminal.add(contact);

  // + / − label above terminal
  const label = textLabel(labelText, PITCH * 0.48, PITCH * 0.28, {
    textColor: "#222222",
    fontSize: 28,
  });

  if (label) {
    label.position.set(
      x,
      terminalY + TERMINAL_R * 1.7,
      frontZ + TERMINAL_DEPTH * 0.5,
    );

    terminal.add(label);
  }

  return terminal;
}

export function buildVoltmeter(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
): THREE.Group {
  const root = new THREE.Group();

  // Main body
  const body = solidBox(BODY_W, BODY_H, BODY_D, M.gray());

  body.position.set(0, BODY_H / 2, 0);

  root.add(body);

  // Front bezel
  const bezel = solidBox(FACE_W, FACE_H, PITCH * 0.18, M.edge());

  bezel.position.set(0, BODY_H * 0.59, BODY_D / 2 + PITCH * 0.08);

  root.add(bezel);

  // Dial
  const dial = buildDial();

  dial.position.set(0, BODY_H * 0.6, BODY_D / 2 + PITCH * 0.19);

  root.add(dial);

  // Range
  const rangeLabel = textLabel("0–15 V", PITCH * 1.15, PITCH * 0.32, {
    textColor: "#eeeeee",
    fontSize: 30,
  });

  if (rangeLabel) {
    rangeLabel.position.set(0, BODY_H * 0.16, BODY_D / 2 + PITCH * 0.11);

    root.add(rangeLabel);
  }

  // Instrument title
  const titleLabel = textLabel("VOLTMETER", PITCH * 1.65, PITCH * 0.3, {
    textColor: "#eeeeee",
    fontSize: 30,
  });

  if (titleLabel) {
    titleLabel.position.set(0, BODY_H * 0.1, BODY_D / 2 + PITCH * 0.11);

    root.add(titleLabel);
  }

  // Terminals
  const positiveTerminal = buildTerminal(-BODY_W * 0.27, "+", M.red());

  const negativeTerminal = buildTerminal(BODY_W * 0.27, "−", M.dark());

  root.add(positiveTerminal);
  root.add(negativeTerminal);

  // Feet
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

  root.position.copy(mountPos);

  return root;
}

export function buildVoltmeterStandalone(): THREE.Group {
  const root = buildVoltmeter(new THREE.Vector3(0, 0, 0));

  root.position.y = TOP_Y + BOARD_H * 0.04;

  return root;
}

// ─────────────────────────────────────────────────────────────────────────────
// BENCH-PLACED VOLTMETER (stands behind the board like the PSU / DMM)
// ─────────────────────────────────────────────────────────────────────────────

export function buildVoltmeterSide(
  position: "left" | "right" | number = "left",
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  const model = buildVoltmeterStandalone();

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
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);

  if (targets) {
    const meterY = TOP_Y + PITCH * 0.5;
    const origin = new THREE.Vector3(slotPos.x, meterY, slotPos.z);
    root.add(instrumentWire(origin, targets.probe1, 0xd63b2a));
    const origin2 = origin.clone();
    origin2.x -= 0.06;
    origin2.z += 0.05;
    root.add(instrumentWire(origin2, targets.probe2, 0x202020));
  }

  return root;
}
