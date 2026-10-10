import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// OSCILLOSCOPE / CRO
// Bench oscilloscope with screen, controls and probe inputs
// ─────────────────────────────────────────────────────────────────────────────

const BODY_W = PITCH * 5.2;
const BODY_H = PITCH * 3.6;
const BODY_D = PITCH * 2.2;

const SCREEN_W = BODY_W * 0.55;
const SCREEN_H = BODY_H * 0.62;

const KNOB_R = PITCH * 0.13;
const KNOB_DEPTH = PITCH * 0.1;

const BUTTON_R = PITCH * 0.075;

/** Names of the anchor objects LabScene uses to start the probe cables. */
export const OSCILLOSCOPE_CH1_ANCHOR = "socket-ch1";
export const OSCILLOSCOPE_GND_ANCHOR = "socket-gnd";

function buildScreen(): THREE.Group {
  const screen = new THREE.Group();

  // Outer bezel
  const bezel = solidBox(
    SCREEN_W + PITCH * 0.18,
    SCREEN_H + PITCH * 0.18,
    PITCH * 0.12,
    M.dark(),
  );

  bezel.position.set(0, 0, BODY_D / 2 + PITCH * 0.08);

  screen.add(bezel);

  // Display
  const display = solidBox(SCREEN_W, SCREEN_H, PITCH * 0.06, M.green());

  display.position.set(0, 0, BODY_D / 2 + PITCH * 0.15);

  screen.add(display);

  // Grid lines
  const gridMaterial = new THREE.MeshBasicMaterial({
    color: "#183c28",
  });

  const gridThickness = PITCH * 0.012;

  const verticalCount = 10;
  const horizontalCount = 8;

  for (let i = 1; i < verticalCount; i++) {
    const x = -SCREEN_W / 2 + (SCREEN_W / verticalCount) * i;

    const line = solidBox(gridThickness, SCREEN_H, PITCH * 0.015, gridMaterial);

    line.position.set(x, 0, BODY_D / 2 + PITCH * 0.19);

    screen.add(line);
  }

  for (let i = 1; i < horizontalCount; i++) {
    const y = -SCREEN_H / 2 + (SCREEN_H / horizontalCount) * i;

    const line = solidBox(SCREEN_W, gridThickness, PITCH * 0.015, gridMaterial);

    line.position.set(0, y, BODY_D / 2 + PITCH * 0.19);

    screen.add(line);
  }

  // Simple waveform
  const points: THREE.Vector3[] = [];

  const segments = 48;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = -SCREEN_W * 0.43 + SCREEN_W * 0.86 * t;

    const y = Math.sin(t * Math.PI * 4) * SCREEN_H * 0.22;

    points.push(new THREE.Vector3(x, y, BODY_D / 2 + PITCH * 0.23));
  }

  const waveformGeometry = new THREE.BufferGeometry().setFromPoints(points);

  const waveformMaterial = new THREE.LineBasicMaterial({
    color: "#eeeeee",
  });

  const waveform = new THREE.Line(waveformGeometry, waveformMaterial);

  screen.add(waveform);

  return screen;
}

function buildKnob(x: number, y: number, labelText: string): THREE.Group {
  const group = new THREE.Group();

  const knob = solidCyl(KNOB_R, KNOB_DEPTH, M.dark(), 20);

  knob.rotation.x = Math.PI / 2;

  knob.position.set(x, y, BODY_D / 2 + PITCH * 0.16);

  group.add(knob);

  const indicator = solidBox(
    PITCH * 0.025,
    KNOB_R * 0.65,
    PITCH * 0.025,
    M.cream(),
  );

  indicator.position.set(x, y + KNOB_R * 0.28, BODY_D / 2 + PITCH * 0.23);

  group.add(indicator);

  const label = textLabel(labelText, PITCH * 0.55, PITCH * 0.22, {
    textColor: "#eeeeee",
    fontSize: 24,
  });

  if (label) {
    label.position.set(x, y - KNOB_R * 1.65, BODY_D / 2 + PITCH * 0.17);

    group.add(label);
  }

  return group;
}

function buildInput(x: number, labelText: string): THREE.Group {
  const group = new THREE.Group();

  const socket = solidCyl(PITCH * 0.14, PITCH * 0.12, M.dark(), 20);

  socket.rotation.x = Math.PI / 2;

  socket.position.set(x, BODY_H * 0.18, BODY_D / 2 + PITCH * 0.12);

  group.add(socket);

  const contact = solidCyl(PITCH * 0.055, PITCH * 0.13, M.metal(), 16);

  contact.rotation.x = Math.PI / 2;

  contact.position.set(x, BODY_H * 0.18, BODY_D / 2 + PITCH * 0.18);

  group.add(contact);

  const label = textLabel(labelText, PITCH * 0.42, PITCH * 0.22, {
    textColor: "#eeeeee",
    fontSize: 24,
  });

  if (label) {
    label.position.set(
      x,
      BODY_H * 0.18 + PITCH * 0.34,
      BODY_D / 2 + PITCH * 0.16,
    );

    group.add(label);
  }

  return group;
}

export function buildOscilloscope(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
): THREE.Group {
  const root = new THREE.Group();

  // ── Main body ───────────────────────────────────────────────────────────

  const body = solidBox(BODY_W, BODY_H, BODY_D, M.dark());

  body.position.set(0, BODY_H / 2, 0);

  root.add(body);

  // ── Top front label ─────────────────────────────────────────────────────

  const title = textLabel("OSCILLOSCOPE", PITCH * 1.55, PITCH * 0.28, {
    textColor: "#eeeeee",
    fontSize: 30,
  });

  if (title) {
    title.position.set(0, BODY_H * 0.93, BODY_D / 2 + PITCH * 0.1);

    root.add(title);
  }

  // ── Screen ───────────────────────────────────────────────────────────────

  const screen = buildScreen();

  screen.position.set(-BODY_W * 0.14, BODY_H * 0.5, 0);

  root.add(screen);

  // ── Control knobs ───────────────────────────────────────────────────────

  const controls = [
    {
      x: BODY_W * 0.3,
      y: BODY_H * 0.72,
      label: "VOLTS",
    },
    {
      x: BODY_W * 0.42,
      y: BODY_H * 0.72,
      label: "TIME",
    },
    {
      x: BODY_W * 0.3,
      y: BODY_H * 0.48,
      label: "POS",
    },
    {
      x: BODY_W * 0.42,
      y: BODY_H * 0.48,
      label: "LEVEL",
    },
  ];

  for (const control of controls) {
    root.add(buildKnob(control.x, control.y, control.label));
  }

  // ── Channel input ───────────────────────────────────────────────────────

  root.add(buildInput(BODY_W * 0.3, "CH1"));

  // ── Ground input ─────────────────────────────────────────────────────────

  root.add(buildInput(BODY_W * 0.42, "GND"));

  // ── Probe cable anchors (invisible) ─────────────────────────────────────
  // LabScene reads the world position of these to start the CH1 / GND cables.

  const ch1Anchor = new THREE.Object3D();
  ch1Anchor.name = OSCILLOSCOPE_CH1_ANCHOR;
  ch1Anchor.position.set(
    BODY_W * 0.3,
    BODY_H * 0.18,
    BODY_D / 2 + PITCH * 0.22,
  );
  root.add(ch1Anchor);

  const gndAnchor = new THREE.Object3D();
  gndAnchor.name = OSCILLOSCOPE_GND_ANCHOR;
  gndAnchor.position.set(
    BODY_W * 0.42,
    BODY_H * 0.18,
    BODY_D / 2 + PITCH * 0.22,
  );
  root.add(gndAnchor);

  // ── Power button ─────────────────────────────────────────────────────────

  const power = solidCyl(BUTTON_R, PITCH * 0.08, M.red(), 16);

  power.rotation.x = Math.PI / 2;

  power.position.set(BODY_W * 0.42, BODY_H * 0.22, BODY_D / 2 + PITCH * 0.15);

  root.add(power);

  const powerLabel = textLabel("POWER", PITCH * 0.55, PITCH * 0.22, {
    textColor: "#eeeeee",
    fontSize: 22,
  });

  if (powerLabel) {
    powerLabel.position.set(
      BODY_W * 0.42,
      BODY_H * 0.22 - PITCH * 0.28,
      BODY_D / 2 + PITCH * 0.16,
    );

    root.add(powerLabel);
  }

  // ── Feet ────────────────────────────────────────────────────────────────

  const footGeometry = new THREE.BoxGeometry(
    PITCH * 0.5,
    PITCH * 0.25,
    PITCH * 0.7,
  );

  const leftFoot = new THREE.Mesh(footGeometry, M.dark());

  const rightFoot = new THREE.Mesh(footGeometry, M.dark());

  leftFoot.position.set(-BODY_W * 0.38, -PITCH * 0.08, 0);

  rightFoot.position.set(BODY_W * 0.38, -PITCH * 0.08, 0);

  root.add(leftFoot);
  root.add(rightFoot);

  root.position.copy(mountPos);

  return root;
}

export function buildOscilloscopeStandalone(): THREE.Group {
  const root = buildOscilloscope(new THREE.Vector3(0, 0, 0));

  root.position.y = TOP_Y + BOARD_H * 0.04;

  return root;
}
