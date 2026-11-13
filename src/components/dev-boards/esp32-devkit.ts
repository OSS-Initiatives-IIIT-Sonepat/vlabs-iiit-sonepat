import * as THREE from "three";
import {
  DEV_BOARDS,
  DEV_MM,
  DEV_PITCH,
  ESP_LABELS,
  ESP_LIFT,
  ESP_PCB_H,
  ESP_ROW,
} from "@/components/dev-boards/pinouts";
import {
  add,
  block,
  decal,
  mat,
  outline,
  post,
  roundedRect,
} from "@/components/dev-boards/cad";

// ── ESP32-DevKitC (38-pin, ESP-WROOM-32) ───────────────────────────────────
// Built on the bench (local y = 0 is the bench top). The board stands on its
// downward pins, so its PCB sits ESP_LIFT above the bench. Long axis along x:
// micro-USB at the -x end, the module antenna at the +x end. Pin positions come
// from DEV_BOARDS["esp32-devkit"]; the labels are the S-numbers printed on the
// real board.

const { w, d, pins } = DEV_BOARDS["esp32-devkit"];
const MM = DEV_MM;
const PITCH = DEV_PITCH;
const PCB_BOT = ESP_LIFT;
const TOP = ESP_LIFT + ESP_PCB_H; // PCB top surface

// Colours sampled from a render of the board.
const C = {
  pcb: 0x1c1d20,
  pcbEdge: 0xb38b5c,
  gold: 0xd9b04a,
  spacer: 0x18181a,
  module: 0x161618,
  shield: 0xd9dce0,
  usb: 0xd4d8dd,
  button: 0xc8ccd1,
  buttonCap: 0xe3e5e8,
  ic: 0x1d1d20,
  tantalum: 0xe3a632,
  tantalumBand: 0x8a5a1c,
  smdTan: 0xbfa27a,
  smdEnd: 0xc9cdd2,
  red: 0xd8352a,
};

/** Where things are, board-local (x, z). */
export const ESP_PARTS = {
  usb: { x: -w / 2 + 2.0 * MM, z: 0 },
  enButton: { x: -w / 2 + 5.0 * MM, z: -7.6 * MM },
  bootButton: { x: -w / 2 + 5.0 * MM, z: 7.6 * MM },
  regulator: { x: -12.5 * MM, z: -4.6 * MM },
  usbChip: { x: -8.0 * MM, z: 2.6 * MM },
  module: { x: w / 2 - 12.75 * MM, z: 0 },
  powerLed: { x: -1.5 * MM, z: 6.2 * MM },
} as const;

/** Height of the PCB top above the bench. */
export const ESP_TOP_Y = TOP;

/** Where the micro-USB plug enters, board-local. The opening faces -x. */
export const ESP_PORTS = {
  usb: { x: -w / 2 - 1.0 * MM, y: TOP + 1.3 * MM, z: 0 },
} as const;

function pcb(root: THREE.Group) {
  const shape = roundedRect(w, d, 1.2 * MM);
  for (const [hx, hz] of [
    [-w / 2 + 2.6 * MM, -d / 2 + 2.6 * MM],
    [w / 2 - 2.6 * MM, -d / 2 + 2.6 * MM],
    [-w / 2 + 2.6 * MM, d / 2 - 2.6 * MM],
    [w / 2 - 2.6 * MM, d / 2 - 2.6 * MM],
  ] as const) {
    const hole = new THREE.Path();
    hole.absarc(hx, -hz, 1.25 * MM, 0, Math.PI * 2, false);
    shape.holes.push(hole);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: ESP_PCB_H,
    bevelEnabled: false,
    curveSegments: 16,
  });
  geo.rotateX(-Math.PI / 2);
  add(root, geo, [mat(C.pcb, 0.25, 0.5), mat(C.pcbEdge, 0.4)], 0, PCB_BOT, 0);
}

/** Two rows of downward pins on black spacers: the board stands on these. */
function pinRows(root: THREE.Group) {
  for (const z of [-ESP_ROW, ESP_ROW]) {
    block(
      root,
      0,
      z,
      PCB_BOT - 2.5 * MM,
      19 * PITCH,
      2.5 * MM,
      2.5 * MM,
      C.spacer,
      0.2,
    );
  }
  for (const p of pins) {
    // Square gold pin from the bench up through the spacer to the PCB.
    block(root, p.x, p.z, 0, 0.64 * MM, PCB_BOT, 0.64 * MM, C.gold, 0.5);
  }
}

/** Silkscreen: gold pads, pin labels and part markings, one decal. */
function silkscreen(root: THREE.Group) {
  const pxPerUnit = 380;
  const sheet = decal(
    (ctx, W, H) => {
      const X = (x: number) => (x + w / 2) * pxPerUnit;
      const Y = (z: number) => (z + d / 2) * pxPerUnit;
      const u = pxPerUnit * MM; // px per mm
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "middle";
      for (const p of pins) {
        // Gold annular pad around each pin.
        ctx.fillStyle = "#d9b04a";
        ctx.beginPath();
        ctx.arc(X(p.x), Y(p.z), 0.85 * u, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6e5520";
        ctx.fillRect(X(p.x) - 0.32 * u, Y(p.z) - 0.32 * u, 0.64 * u, 0.64 * u);
        // Label, rotated, reading inward from the pad.
        ctx.save();
        ctx.fillStyle = "#f2f2f2";
        ctx.font = `700 ${0.95 * u}px Helvetica, Arial, sans-serif`;
        const inward = p.z < 0 ? 1 : -1;
        ctx.translate(X(p.x), Y(p.z) + inward * 1.2 * u);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = inward > 0 ? "right" : "left";
        ctx.fillText(ESP_LABELS[p.name] ?? p.name, 0, 0);
        ctx.restore();
      }
      // Button and LED outlines.
      ctx.strokeStyle = "#f2f2f2";
      ctx.lineWidth = 0.18 * u;
      for (const b of [ESP_PARTS.enButton, ESP_PARTS.bootButton]) {
        ctx.strokeRect(X(b.x) - 3.0 * u, Y(b.z) - 2.4 * u, 6.0 * u, 4.8 * u);
      }
      ctx.fillStyle = "#f2f2f2";
      ctx.font = `700 ${1.2 * u}px Helvetica, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        "EN",
        X(ESP_PARTS.enButton.x) + 4.6 * u,
        Y(ESP_PARTS.enButton.z),
      );
      ctx.fillText(
        "BOOT",
        X(ESP_PARTS.bootButton.x) + 5.2 * u,
        Y(ESP_PARTS.bootButton.z),
      );
    },
    w,
    d,
    pxPerUnit,
  );
  if (sheet) {
    sheet.position.set(0, TOP + 0.003, 0);
    root.add(sheet);
  }
}

/** ESP-WROOM-32 module: black carrier, silver shield, PCB antenna. */
function wroom(root: THREE.Group) {
  const c = ESP_PARTS.module;
  const L = 25.5 * MM;
  const Wd = 18.0 * MM;
  const left = c.x - L / 2;
  const carrierH = 0.8 * MM;
  block(root, c.x, c.z, TOP, L, carrierH, Wd, C.module, 0.2);
  const ctop = TOP + carrierH;
  // Castellated gold pads along both long edges and the inner end.
  for (let i = 0; i < 14; i++) {
    const px = left + 1.5 * MM + i * 1.27 * MM;
    for (const s of [-1, 1]) {
      block(
        root,
        px,
        c.z + s * (Wd / 2 - 0.45 * MM),
        ctop,
        0.9 * MM,
        0.04 * MM,
        0.9 * MM,
        C.gold,
        0.5,
      );
    }
  }
  for (let i = 0; i < 10; i++) {
    const pz = c.z - 5.7 * MM + i * 1.27 * MM;
    block(
      root,
      left + 0.45 * MM,
      pz,
      ctop,
      0.9 * MM,
      0.04 * MM,
      0.9 * MM,
      C.gold,
      0.5,
    );
  }
  // Metal shield over the chip, with its markings.
  const shieldL = 17.6 * MM;
  const shieldW = 16.0 * MM;
  const shieldH = 2.4 * MM;
  const sx = left + 1.2 * MM + shieldL / 2;
  block(root, sx, c.z, ctop, shieldL, shieldH, shieldW, C.shield, 0.5);
  const mark = decal(
    (ctx, W, H) => {
      const k = W / 17.6; // px per mm on the shield
      ctx.fillStyle = "#3a3c40";
      ctx.strokeStyle = "#3a3c40";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      // Wi-Fi mark and model name.
      ctx.lineWidth = 0.35 * k;
      for (const r of [0.8, 1.5, 2.2]) {
        ctx.beginPath();
        ctx.arc(2.6 * k, 3.6 * k, r * k, -Math.PI * 0.75, -Math.PI * 0.25);
        ctx.stroke();
      }
      ctx.font = `700 ${1.5 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ESP-WROOM-32", 5.2 * k, 2.6 * k);
      // Regulatory marks.
      ctx.font = `700 ${2.4 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("CE", 8.2 * k, 6.6 * k);
      ctx.lineWidth = 0.3 * k;
      ctx.beginPath();
      ctx.arc(4.4 * k, 6.6 * k, 1.3 * k, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = `700 ${1.2 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("FCC ID:2AC7Z-ESPWROOM32", 2.0 * k, 12.6 * k);
      ctx.fillText("R  211-161007", 6.0 * k, 10.0 * k);
      ctx.beginPath();
      ctx.arc(1.4 * k, 9.6 * k, 0.35 * k, 0, Math.PI * 2);
      ctx.fill();
    },
    shieldL,
    shieldW,
  );
  if (mark) {
    // Text reads along the board, top of the text toward the back row.
    mark.position.set(sx, ctop + shieldH + 0.003, c.z);
    root.add(mark);
  }
  // PCB antenna: a meander trace on the carrier beyond the shield.
  const antL = L - shieldL - 1.6 * MM;
  const ant = decal(
    (ctx, W, H) => {
      ctx.strokeStyle = "#4a3f2a";
      ctx.lineWidth = Math.max(2, W * 0.03);
      ctx.beginPath();
      const steps = 6;
      for (let i = 0; i <= steps; i++) {
        const y = H * 0.15 + (i / steps) * H * 0.7;
        ctx.moveTo(W * 0.15, y);
        ctx.lineTo(W * 0.85, y);
      }
      ctx.stroke();
    },
    antL,
    Wd * 0.9,
  );
  if (ant) {
    ant.position.set(c.x + L / 2 - antL / 2 - 0.3 * MM, ctop + 0.003, c.z);
    root.add(ant);
  }
}

/** Micro-USB receptacle: silver shell with the trapezoid opening. */
function microUsb(root: THREE.Group) {
  const L = 5.9 * MM; // along x, overhangs the left edge by 1 mm
  const Wd = 7.5 * MM;
  const H = 2.6 * MM;
  const front = -w / 2 - 1.0 * MM;
  const prof = new THREE.Shape();
  prof.moveTo(-Wd / 2, 0);
  prof.lineTo(Wd / 2, 0);
  prof.lineTo(Wd / 2, H);
  prof.lineTo(-Wd / 2, H);
  prof.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-2.7 * MM, 0.4 * MM);
  hole.lineTo(2.7 * MM, 0.4 * MM);
  hole.lineTo(3.4 * MM, 2.2 * MM);
  hole.lineTo(-3.4 * MM, 2.2 * MM);
  hole.closePath();
  prof.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(prof, {
    depth: L,
    bevelEnabled: false,
  });
  geo.rotateY(Math.PI / 2);
  add(root, geo, mat(C.usb, 0.5, 0.4), front, TOP, 0);
  // Dark back of the opening and the contact tongue.
  block(
    root,
    front + 4.5 * MM,
    0,
    TOP + 0.4 * MM,
    0.2 * MM,
    1.8 * MM,
    6.8 * MM,
    0x2c2d31,
    0.2,
  );
  block(
    root,
    front + 2.6 * MM,
    0,
    TOP + 1.2 * MM,
    3.8 * MM,
    0.5 * MM,
    4.2 * MM,
    0x26262a,
    0.2,
  );
}

/** Tactile push-button: grey body with a round cap. */
function button(root: THREE.Group, at: { x: number; z: number }) {
  block(root, at.x, at.z, TOP, 5.2 * MM, 1.6 * MM, 3.8 * MM, C.button, 0.45);
  post(root, at.x, at.z, TOP + 1.6 * MM, 1.25 * MM, 0.8 * MM, C.buttonCap, 20);
}

/** Small IC with a printed marking on top. */
function markedChip(
  root: THREE.Group,
  at: { x: number; z: number },
  sx: number,
  sz: number,
  h: number,
  lines: string[],
) {
  block(root, at.x, at.z, TOP, sx, h, sz, C.ic, 0.22);
  const mark = decal(
    (ctx, W, H) => {
      ctx.fillStyle = "#d4d6da";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const size = H / (lines.length + 1.2);
      ctx.font = `700 ${size}px Helvetica, Arial, sans-serif`;
      lines.forEach((t, i) => ctx.fillText(t, W / 2, size * (i + 1.1)));
    },
    sx * 0.9,
    sz * 0.9,
  );
  if (mark) {
    mark.position.set(at.x, TOP + h + 0.003, at.z);
    root.add(mark);
  }
}

/** Two-terminal SMD part along x. */
function smd(
  root: THREE.Group,
  x: number,
  z: number,
  body: number,
  L = 1.6 * MM,
) {
  const W = L / 2;
  block(root, x, z, TOP, L * 0.6, 0.5 * MM, W, body, 0.35);
  for (const s of [-1, 1]) {
    block(root, x + s * L * 0.4, z, TOP, L * 0.2, 0.5 * MM, W, C.smdEnd, 0.5);
  }
}

export function buildEsp32DevkitStandalone(): THREE.Group {
  const root = new THREE.Group();

  pcb(root);
  pinRows(root);
  wroom(root);
  microUsb(root);
  button(root, ESP_PARTS.enButton);
  button(root, ESP_PARTS.bootButton);

  // AMS1117 3.3 V regulator (SOT-223): body, three legs and the wide tab.
  const reg = ESP_PARTS.regulator;
  markedChip(root, reg, 6.5 * MM, 3.5 * MM, 1.6 * MM, [
    "AMS1117",
    "3.3V DN811",
  ]);
  for (let i = -1; i <= 1; i++) {
    block(
      root,
      reg.x + i * 2.3 * MM,
      reg.z + 2.6 * MM,
      TOP,
      0.7 * MM,
      0.3 * MM,
      1.6 * MM,
      C.smdEnd,
      0.5,
    );
  }
  block(
    root,
    reg.x,
    reg.z - 2.6 * MM,
    TOP,
    3.0 * MM,
    0.3 * MM,
    1.6 * MM,
    C.smdEnd,
    0.5,
  );

  // CP2102 USB-to-serial bridge (QFN) and its pin-1 dot.
  markedChip(root, ESP_PARTS.usbChip, 5.0 * MM, 5.0 * MM, 0.9 * MM, [
    "SILABS",
    "CP2102",
    "DCF05E",
    "1433+",
  ]);
  post(
    root,
    ESP_PARTS.usbChip.x - 2.0 * MM,
    ESP_PARTS.usbChip.z - 2.0 * MM,
    TOP + 0.9 * MM,
    0.3 * MM,
    0.02 * MM,
    0xf2f2f2,
    12,
  );

  // Tantalum capacitors: orange body with a darker polarity band.
  for (const x of [-6.5 * MM, -3.0 * MM]) {
    const z = -6.6 * MM;
    block(root, x, z, TOP, 3.5 * MM, 1.9 * MM, 2.8 * MM, C.tantalum, 0.45);
    block(
      root,
      x - 1.2 * MM,
      z,
      TOP + 1.9 * MM,
      0.8 * MM,
      0.02 * MM,
      2.8 * MM,
      C.tantalumBand,
      0.3,
    );
  }

  // Red power LED.
  block(
    root,
    ESP_PARTS.powerLed.x,
    ESP_PARTS.powerLed.z,
    TOP,
    1.6 * MM,
    0.7 * MM,
    0.8 * MM,
    C.red,
    0.6,
  );

  // SOT-23 transistors for the auto-reset circuit.
  for (const [x, z] of [
    [0.4 * MM, 2.2 * MM],
    [1.6 * MM, 5.6 * MM],
  ] as const) {
    block(root, x, z, TOP, 2.9 * MM, 1.0 * MM, 1.3 * MM, C.ic, 0.22);
  }

  // Small resistors and capacitors.
  const parts: [number, number, number][] = [
    [-2.0, -2.0, 0x1d1d20],
    [-2.0, -0.4, C.smdTan],
    [-2.0, 1.2, 0x1d1d20],
    [-4.5, 5.6, C.smdTan],
    [-6.8, 6.4, 0x1d1d20],
    [-14.0, 2.6, C.smdTan],
    [-14.0, 4.4, 0x1d1d20],
    [-17.0, -2.4, C.smdTan],
    [-17.0, 2.4, C.smdTan],
    [-9.5, -1.4, 0x1d1d20],
    [-0.5, -4.6, C.smdTan],
    [-0.5, 4.0, 0x1d1d20],
  ];
  for (const [x, z, body] of parts) smd(root, x * MM, z * MM, body);

  silkscreen(root);
  outline(root);
  return root;
}
