import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { probeWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";

// ─────────────────────────────────────────────────────────────────────────────
// AMMETER / MILLIAMMETER — Analogue + Digital 0–100 mA bench panel meter
// ─────────────────────────────────────────────────────────────────────────────

export const AMMETER_POS_ANCHOR = "ammeter-pos";
export const AMMETER_NEG_ANCHOR = "ammeter-neg";

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

function parseNeedleAngle(displayValue?: string): number {
  const startAngle = -Math.PI * 0.67;
  const endAngle = Math.PI * 0.67;
  if (!displayValue || displayValue === "--") return -Math.PI * 0.42;
  const num = parseFloat(displayValue.replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(num)) return -Math.PI * 0.42;
  const maxScale = Math.abs(num) > 10 ? 100 : 10;
  const t = Math.min(1, Math.max(0, Math.abs(num) / maxScale));
  return -(startAngle + (endAngle - startAngle) * t);
}

function makeNeedle(length: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(
    NEEDLE_WIDTH,
    length,
    NEEDLE_WIDTH * 0.55,
  );
  const needle = new THREE.Mesh(geometry, M.red());
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

function buildDial(displayValue = "--"): THREE.Group {
  const dial = new THREE.Group();

  const faceGeometry = new THREE.CylinderGeometry(
    DIAL_R,
    DIAL_R,
    PITCH * 0.08,
    48,
  );
  const face = new THREE.Mesh(faceGeometry, M.white());
  face.rotation.x = Math.PI / 2;
  dial.add(face);

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

  const values = [0, 25, 50, 75, 100];
  values.forEach((value, index) => {
    const t = index / (values.length - 1);
    const angle = startAngle + (endAngle - startAngle) * t;
    const radius = DIAL_R * 0.53;
    const label = textLabel(String(value), PITCH * 0.55, PITCH * 0.28, {
      textColor: "#18202c",
      fontSize: 32,
      bold: true,
    });
    if (!label) return;
    label.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      PITCH * 0.085,
    );
    dial.add(label);
  });

  const unitLabel = textLabel("mA", PITCH * 0.9, PITCH * 0.42, {
    textColor: "#18202c",
    fontSize: 40,
    bold: true,
  });
  if (unitLabel) {
    unitLabel.position.set(0, DIAL_R * 0.2, PITCH * 0.09);
    dial.add(unitLabel);
  }

  if (displayValue && displayValue !== "--") {
    const valLbl = textLabel(displayValue, PITCH * 1.4, PITCH * 0.34, {
      textColor: "#16a34a",
      fontSize: 34,
      bold: true,
    });
    if (valLbl) {
      valLbl.position.set(0, -DIAL_R * 0.38, PITCH * 0.1);
      dial.add(valLbl);
    }
  }

  const needle = makeNeedle(NEEDLE_LENGTH);
  needle.rotation.z = parseNeedleAngle(displayValue);
  needle.position.z = PITCH * 0.13;
  dial.add(needle);

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
  anchorName: string,
): THREE.Group {
  const group = new THREE.Group();
  const terminalY = BODY_H * 0.18;
  const frontZ = BODY_D / 2;

  const socket = solidCyl(
    TERMINAL_R * 1.35,
    TERMINAL_DEPTH * 0.55,
    M.dark(),
    24,
  );
  socket.rotation.x = Math.PI / 2;
  socket.position.set(x, terminalY, frontZ + PITCH * 0.015);
  group.add(socket);

  const post = solidCyl(TERMINAL_R, TERMINAL_DEPTH, terminalMaterial, 24);
  post.rotation.x = Math.PI / 2;
  post.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.28);
  group.add(post);

  const contact = solidCyl(
    TERMINAL_R * 0.3,
    TERMINAL_DEPTH * 0.14,
    M.silver(),
    16,
  );
  contact.rotation.x = Math.PI / 2;
  contact.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.43);
  group.add(contact);

  const anchor = new THREE.Object3D();
  anchor.name = anchorName;
  anchor.position.set(x, terminalY, frontZ + TERMINAL_DEPTH * 0.52);
  group.add(anchor);

  const label = textLabel(labelText, PITCH * 0.48, PITCH * 0.28, {
    textColor: labelText === "+" ? "#ff5252" : "#f8fafc",
    fontSize: 32,
    bold: true,
  });
  if (label) {
    label.position.set(
      x,
      terminalY + TERMINAL_R * 1.7,
      frontZ + TERMINAL_DEPTH * 0.5,
    );
    group.add(label);
  }

  return group;
}

export function buildAmmeter(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  displayValue = "--",
): THREE.Group {
  const root = new THREE.Group();
  root.userData.isInstrumentBody = true;

  const body = solidBox(BODY_W, BODY_H, BODY_D, M.blue());
  body.position.set(0, BODY_H / 2, 0);
  root.add(body);

  const bezel = solidBox(FACE_W, FACE_H, PITCH * 0.18, M.dark());
  bezel.position.set(0, BODY_H * 0.59, BODY_D / 2 + PITCH * 0.08);
  root.add(bezel);

  const dial = buildDial(displayValue);
  dial.position.set(0, BODY_H * 0.6, BODY_D / 2 + PITCH * 0.19);
  root.add(dial);

  const rangeLabel = textLabel(
    displayValue && displayValue !== "--" ? displayValue : "0–100 mA",
    PITCH * 1.45,
    PITCH * 0.32,
    {
      textColor: "#facc15",
      fontSize: 30,
      bold: true,
    },
  );
  if (rangeLabel) {
    rangeLabel.position.set(0, BODY_H * 0.16, BODY_D / 2 + PITCH * 0.11);
    root.add(rangeLabel);
  }

  const titleLabel = textLabel("MILLIAMMETER", PITCH * 1.85, PITCH * 0.3, {
    textColor: "#ffffff",
    fontSize: 30,
    bold: true,
  });
  if (titleLabel) {
    titleLabel.position.set(0, BODY_H * 0.09, BODY_D / 2 + PITCH * 0.11);
    root.add(titleLabel);
  }

  root.add(
    buildTerminal(-BODY_W * 0.27, "+", M.red(), AMMETER_POS_ANCHOR),
    buildTerminal(BODY_W * 0.27, "−", M.dark(), AMMETER_NEG_ANCHOR),
  );

  const footGeometry = new THREE.BoxGeometry(
    PITCH * 0.42,
    PITCH * 0.16,
    PITCH * 0.65,
  );
  const leftFoot = new THREE.Mesh(footGeometry, M.dark());
  const rightFoot = new THREE.Mesh(footGeometry, M.dark());
  leftFoot.position.set(-BODY_W * 0.36, PITCH * 0.08, 0);
  rightFoot.position.set(BODY_W * 0.36, PITCH * 0.08, 0);
  root.add(leftFoot, rightFoot);

  root.position.copy(mountPos);
  return root;
}

export function buildAmmeterStandalone(): THREE.Group {
  const root = buildAmmeter(new THREE.Vector3(0, 0, 0));
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}

export function buildAmmeterSide(
  position: "left" | "right" | number = "right",
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
  displayValue = "--",
): THREE.Group {
  const model = buildAmmeter(new THREE.Vector3(0, 0, 0), displayValue);

  const slot =
    typeof position === "number"
      ? position
      : position === "right"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos, scale } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.userData.isInstrumentBody = true;
  wrapper.add(model);
  wrapper.scale.setScalar(scale);
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);
  root.updateMatrixWorld(true);

  if (targets) {
    const posObj = model.getObjectByName(AMMETER_POS_ANCHOR);
    const negObj = model.getObjectByName(AMMETER_NEG_ANCHOR);
    const originPos = posObj
      ? posObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x - 0.15, slotPos.y + 0.25, slotPos.z + 0.15);
    const originNeg = negObj
      ? negObj.getWorldPosition(new THREE.Vector3())
      : new THREE.Vector3(slotPos.x + 0.15, slotPos.y + 0.25, slotPos.z + 0.15);

    root.add(probeWire(originPos, targets.probe1, 0xe52420));
    root.add(probeWire(originNeg, targets.probe2, 0x20242c));
  }

  return root;
}
