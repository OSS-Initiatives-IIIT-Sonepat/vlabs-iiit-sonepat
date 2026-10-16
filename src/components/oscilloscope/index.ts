import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ═══════════════════════════════════════════════════════════════════════════════
// OSCILLOSCOPE (CRO) — Dual-Trace Benchtop Oscilloscope with vibrant colors
// ═══════════════════════════════════════════════════════════════════════════════

export const OSCILLOSCOPE_CH1_ANCHOR = "socket-ch1";
export const OSCILLOSCOPE_GND_ANCHOR = "socket-gnd";

const P = PITCH;
const BODY_W = P * 6.4;
const BODY_H = P * 4.0;
const BODY_D = P * 4.2;
const FOOT_H = P * 0.2;
const CASE_Y = FOOT_H + BODY_H / 2;
const FRONT_Z = BODY_D / 2 + 0.025;

const SCREEN_W = BODY_W * 0.5;
const SCREEN_H = BODY_H * 0.68;
const SCREEN_X = -BODY_W * 0.19;
const SCREEN_Y = CASE_Y - P * 0.04;

function buildCrtScreen(readingText = "4.2 Vpp, 1 kHz"): THREE.Group {
  const grp = new THREE.Group();

  // Deep hood bezel around CRT
  const hood = solidBox(
    SCREEN_W + P * 0.2,
    SCREEN_H + P * 0.2,
    P * 0.12,
    new THREE.MeshBasicMaterial({ color: 0x161a20 }),
  );
  hood.position.z = P * 0.04;
  grp.add(hood);

  // Phosphor CRT glass
  const phosphor = new THREE.Mesh(
    new THREE.BoxGeometry(SCREEN_W, SCREEN_H, P * 0.04),
    new THREE.MeshBasicMaterial({ color: 0x072818 }),
  );
  phosphor.position.z = P * 0.08;
  grp.add(phosphor);

  // 10×8 Graticule grid
  const gridZ = P * 0.105;
  const gridPts: THREE.Vector3[] = [];
  const cols = 10;
  const rows = 8;

  for (let c = 1; c < cols; c++) {
    const x = -SCREEN_W / 2 + (SCREEN_W / cols) * c;
    gridPts.push(
      new THREE.Vector3(x, -SCREEN_H / 2, gridZ),
      new THREE.Vector3(x, SCREEN_H / 2, gridZ),
    );
  }
  for (let r = 1; r < rows; r++) {
    const y = -SCREEN_H / 2 + (SCREEN_H / rows) * r;
    gridPts.push(
      new THREE.Vector3(-SCREEN_W / 2, y, gridZ),
      new THREE.Vector3(SCREEN_W / 2, y, gridZ),
    );
  }

  grp.add(
    new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(gridPts),
      new THREE.LineBasicMaterial({ color: 0x1d6b42 }),
    ),
  );

  // Bright phosphor trace; its shape follows the reading text.
  const shape = traceShape(readingText);
  const wavePts: THREE.Vector3[] = [];
  const N = shape === "sine" ? 80 : 240;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = -SCREEN_W * 0.46 + SCREEN_W * 0.92 * t;
    const y = traceY(shape, t) * SCREEN_H * 0.26;
    wavePts.push(new THREE.Vector3(x, y, gridZ + 0.008));
  }
  const waveCurve =
    shape === "sine"
      ? new THREE.CatmullRomCurve3(wavePts)
      : new THREE.CatmullRomCurve3(wavePts, false, "centripetal", 0);
  const waveTube = new THREE.TubeGeometry(waveCurve, N, P * 0.022, 6, false);
  grp.add(
    new THREE.Mesh(
      waveTube,
      new THREE.MeshBasicMaterial({ color: 0x48ff88 }),
    ),
  );

  // Digital on-screen readout banner
  const rLabel = textLabel(readingText, SCREEN_W * 0.9, P * 0.26, {
    textColor: "#78ffac",
    fontSize: 32,
    bold: true,
  });
  if (rLabel) {
    rLabel.position.set(0, -SCREEN_H * 0.39, gridZ + 0.012);
    grp.add(rLabel);
  }

  const chLabel = textLabel("CH1: 1V/div   0.2ms/div", SCREEN_W * 0.9, P * 0.22, {
    textColor: "#ffd84d",
    fontSize: 26,
    bold: true,
  });
  if (chLabel) {
    chLabel.position.set(0, SCREEN_H * 0.4, gridZ + 0.012);
    grp.add(chLabel);
  }

  return grp;
}

type TraceShape = "sine" | "square" | "rc" | "flat";

function traceShape(reading: string): TraceShape {
  const r = reading.toLowerCase();
  if (/no signal|^\s*$|\boff\b/.test(r)) return "flat";
  if (/charg|τ|tau|exponential/.test(r)) return "rc";
  if (/square|switch/.test(r)) return "square";
  return "sine";
}

/** Normalised trace height in [-1, 1] at horizontal position t ∈ [0, 1]. */
function traceY(shape: TraceShape, t: number): number {
  const cycles = 2.5;
  const phase = (t * cycles) % 1;
  switch (shape) {
    case "flat":
      return 0;
    case "square":
      return phase < 0.5 ? 1 : -1;
    case "rc": {
      // Half-period = 5τ, so the capacitor fully charges and discharges.
      const k = 10;
      return phase < 0.5
        ? 1 - 2 * Math.exp(-k * phase)
        : -1 + 2 * Math.exp(-k * (phase - 0.5));
    }
    default:
      return Math.sin(t * Math.PI * 5);
  }
}

function buildScopeKnob(
  x: number,
  y: number,
  z: number,
  radius: number,
  angleDeg: number,
  label: string,
  accentHex = 0x3b82f6,
): THREE.Group {
  const grp = new THREE.Group();

  const skirt = solidCyl(
    radius * 1.15,
    0.02,
    new THREE.MeshBasicMaterial({ color: 0x262c36 }),
    16,
  );
  skirt.rotation.x = Math.PI / 2;
  skirt.position.set(x, y, z + 0.01);
  grp.add(skirt);

  const depth = P * 0.16;
  const body = solidCyl(
    radius,
    depth,
    new THREE.MeshBasicMaterial({ color: 0xcfd6de }),
    16,
  );
  body.rotation.x = Math.PI / 2;
  body.position.set(x, y, z + depth / 2 + 0.012);
  grp.add(body);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.014, 14),
    new THREE.MeshBasicMaterial({ color: accentHex }),
  );
  cap.rotation.x = Math.PI / 2;
  cap.position.set(x, y, z + depth + 0.016);
  grp.add(cap);

  const rad = THREE.MathUtils.degToRad(angleDeg);
  const ptr = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, radius * 0.55, 0.018),
    M.white(),
  );
  ptr.rotation.z = -rad;
  ptr.position.set(
    x + Math.sin(rad) * radius * 0.35,
    y + Math.cos(rad) * radius * 0.35,
    z + depth + 0.018,
  );
  grp.add(ptr);

  const lbl = textLabel(label, P * 0.9, P * 0.22, {
    textColor: "#f0f4f8",
    fontSize: 26,
    bold: true,
  });
  if (lbl) {
    lbl.position.set(x, y - radius - P * 0.18, z + 0.01);
    grp.add(lbl);
  }

  return grp;
}

function buildBncConnector(
  x: number,
  y: number,
  z: number,
  label: string,
  anchorName: string,
  ringHex: number,
): THREE.Group {
  const grp = new THREE.Group();

  const ring = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.19, P * 0.19, 0.02, 16),
    new THREE.MeshBasicMaterial({ color: ringHex }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y, z + 0.01);
  grp.add(ring);

  const bLen = P * 0.26;
  const barrel = solidCyl(P * 0.13, bLen, M.silver(), 14);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(x, y, z + bLen / 2 + 0.015);
  grp.add(barrel);

  const pin = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.03, P * 0.03, bLen + 0.02, 8),
    M.gold(),
  );
  pin.rotation.x = Math.PI / 2;
  pin.position.set(x, y, z + bLen / 2 + 0.02);
  grp.add(pin);

  const lbl = textLabel(label, P * 0.72, P * 0.22, {
    textColor: "#f0f4f8",
    fontSize: 26,
    bold: true,
  });
  if (lbl) {
    lbl.position.set(x, y + P * 0.28, z + 0.012);
    grp.add(lbl);
  }

  const anchor = new THREE.Object3D();
  anchor.name = anchorName;
  anchor.position.set(x, y, z + bLen + 0.025);
  grp.add(anchor);

  return grp;
}

export function buildOscilloscope(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  readingText = "4.2 Vpp, 1 kHz",
): THREE.Group {
  const root = new THREE.Group();
  root.userData.isInstrumentBody = true;

  // Rubber feet
  const footGeo = new THREE.BoxGeometry(P * 0.5, FOOT_H, P * 0.65);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, M.dark());
      foot.position.set(
        sx * (BODY_W * 0.4),
        FOOT_H / 2,
        sz * (BODY_D * 0.36),
      );
      root.add(foot);
    }
  }

  // Main instrument enclosure & front panel with crisp edges
  const chassis = solidBox(
    BODY_W,
    BODY_H,
    BODY_D,
    new THREE.MeshBasicMaterial({ color: 0x262e38 }),
  );
  chassis.position.set(0, CASE_Y, 0);
  root.add(chassis);

  const panel = solidBox(
    BODY_W * 0.97,
    BODY_H * 0.94,
    0.04,
    new THREE.MeshBasicMaterial({ color: 0x3b4d63 }),
  );
  panel.position.set(0, CASE_Y, BODY_D / 2 + 0.008);
  root.add(panel);

  // Top title banner
  const title = textLabel(
    "DUAL-TRACE OSCILLOSCOPE  20 MHz",
    BODY_W * 0.62,
    P * 0.26,
    {
      textColor: "#f0f4f8",
      fontSize: 30,
      bold: true,
    },
  );
  if (title) {
    title.position.set(-BODY_W * 0.14, CASE_Y + BODY_H * 0.4, FRONT_Z + 0.012);
    root.add(title);
  }

  // CRT Screen
  const crt = buildCrtScreen(readingText);
  crt.position.set(SCREEN_X, SCREEN_Y, FRONT_Z);
  root.add(crt);

  // Control knobs
  const col1X = BODY_W * 0.16;
  const col2X = BODY_W * 0.35;
  const row1Y = CASE_Y + BODY_H * 0.22;
  const row2Y = CASE_Y - BODY_H * 0.04;

  root.add(
    buildScopeKnob(col1X, row1Y, FRONT_Z, P * 0.26, -30, "VOLTS/DIV", 0xe8ac18),
  );
  root.add(
    buildScopeKnob(col2X, row1Y, FRONT_Z, P * 0.28, 20, "TIME/DIV", 0x228be6),
  );
  root.add(
    buildScopeKnob(col1X, row2Y, FRONT_Z, P * 0.2, 0, "V.POS", 0x3b424c),
  );
  root.add(
    buildScopeKnob(col2X, row2Y, FRONT_Z, P * 0.2, 15, "TRIG LVL", 0x22b44c),
  );

  // BNC inputs (CH1 & GND)
  const bncY = CASE_Y - BODY_H * 0.33;
  root.add(
    buildBncConnector(
      col1X,
      bncY,
      FRONT_Z,
      "CH1 IN",
      OSCILLOSCOPE_CH1_ANCHOR,
      0xf0b400,
    ),
  );
  root.add(
    buildBncConnector(
      col2X,
      bncY,
      FRONT_Z,
      "⏚ GND",
      OSCILLOSCOPE_GND_ANCHOR,
      0x1a1c20,
    ),
  );

  // Power button
  const pwrX = -BODY_W * 0.41;
  const pwrY = bncY;
  const pwrBtn = solidCyl(P * 0.11, P * 0.08, M.red(), 14);
  pwrBtn.rotation.x = Math.PI / 2;
  pwrBtn.position.set(pwrX, pwrY, FRONT_Z + 0.02);
  root.add(pwrBtn);

  const pwrLed = new THREE.Mesh(
    new THREE.SphereGeometry(P * 0.055, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0x38ff68 }),
  );
  pwrLed.position.set(pwrX + P * 0.24, pwrY, FRONT_Z + 0.015);
  root.add(pwrLed);

  root.position.copy(mountPos);
  return root;
}

export function buildOscilloscopeStandalone(): THREE.Group {
  const root = buildOscilloscope(new THREE.Vector3(0, 0, 0));
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}
