import * as THREE from "three";
import { BOARD_H, PITCH, Z } from "@/labs/coords";
import {
  add,
  block,
  decal,
  mat,
  outline,
  roundedRect,
} from "@/components/dev-boards/cad";

// ── Microcontrollers and an ADC seated on the breadboard ──────────────────
// A DIP chip straddles the centre gap of the breadboard, notch to the left.
// Pin 1 is the bottom-left pin (the row nearer the viewer) and the numbers run
// anticlockwise: 1 to n/2 along the bottom from left to right, then n/2 + 1
// to n along the top from right to left.
//
// A 600-mil chip (the 40-pin 8051 and PIC18F4550) is too wide for rows e and
// f: its legs land in rows d and g, leaving three free holes (a to c, h to j)
// in every column for wires. A 300-mil chip (the 20-pin ADC0804) sits in rows
// e and f, the usual way.
//
// A printed pin-label sticker on top of each chip names every pin, as people
// do on the bench, so a learner can find the pin a step names.

const MM = PITCH / 2.54;

export type DipChip = "at89s52" | "pic18f4550" | "adc0804";

type DipSpec = {
  /** Pin names, index 0 is pin 1. These are the names wires refer to. */
  pins: string[];
  /** 600-mil package (legs in rows d and g) rather than 300-mil (e and f). */
  wide: boolean;
  /** Part number and date-code lines printed on the sticker. */
  marking: [string, string];
  /** Name shown in the inspector. */
  display: string;
};

const p0 = ["P0.7", "P0.6", "P0.5", "P0.4", "P0.3", "P0.2", "P0.1", "P0.0"];
const range = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${prefix}${i}`);

export const DIP_CHIPS: Record<DipChip, DipSpec> = {
  at89s52: {
    pins: [
      ...range("P1.", 8),
      "RST",
      ...range("P3.", 8),
      "XTAL2",
      "XTAL1",
      "GND",
      ...range("P2.", 8),
      "PSEN",
      "ALE",
      "EA",
      ...p0,
      "VCC",
    ],
    wide: true,
    marking: ["AT89S52", "24PU 8051"],
    display: "8051 microcontroller (AT89S52)",
  },
  pic18f4550: {
    pins: [
      "MCLR",
      ...range("RA", 6),
      ...range("RE", 3),
      "VDD",
      "VSS",
      "OSC1",
      "OSC2",
      "RC0",
      "RC1",
      "RC2",
      "VUSB",
      "RD0",
      "RD1",
      "RD2",
      "RD3",
      "RC4",
      "RC5",
      "RC6",
      "RC7",
      "RD4",
      "RD5",
      "RD6",
      "RD7",
      "VSS2",
      "VDD2",
      ...range("RB", 8),
    ],
    wide: true,
    marking: ["PIC18F4550", "I/P"],
    display: "PIC18F4550 microcontroller",
  },
  adc0804: {
    pins: [
      "CS",
      "RD",
      "WR",
      "CLKIN",
      "INTR",
      "VIN+",
      "VIN-",
      "AGND",
      "VREF/2",
      "DGND",
      "DB7",
      "DB6",
      "DB5",
      "DB4",
      "DB3",
      "DB2",
      "DB1",
      "DB0",
      "CLKR",
      "VCC",
    ],
    wide: false,
    marking: ["ADC0804", "LCN"],
    display: "ADC0804 analog-to-digital converter",
  },
};

/** Sticker text for a pin: the second VDD/VSS pair reads as VDD/VSS. */
function stickerName(name: string): string {
  return name === "VDD2" ? "VDD" : name === "VSS2" ? "VSS" : name;
}

/** 1-based pin number of a named pin, or 0. */
export function dipPinNumber(chip: DipChip, pin: string): number {
  return DIP_CHIPS[chip].pins.indexOf(pin) + 1;
}

const WIDE_ROWS = { top: ["d", "c", "b", "a"], bottom: ["g", "h", "i", "j"] };
const NARROW_ROWS = {
  top: ["e", "d", "c", "b", "a"],
  bottom: ["f", "g", "h", "i", "j"],
};

/**
 * Breadboard hole of a pin (`reach` 0) or of the free hole `reach` rows away
 * from it in the same column, which is where a wire to that pin goes.
 * `col` is the column of pin 1.
 */
export function dipHole(
  chip: DipChip,
  col: number,
  pin: string,
  reach = 1,
): { col: number; row: string } {
  const spec = DIP_CHIPS[chip];
  const n = dipPinNumber(chip, pin);
  if (!n) throw new Error(`${chip} has no pin "${pin}"`);
  const half = spec.pins.length / 2;
  const rows = spec.wide ? WIDE_ROWS : NARROW_ROWS;
  const max = rows.top.length - 1;
  const r = Math.max(0, Math.min(max, reach));
  return n <= half
    ? { col: col + n - 1, row: rows.bottom[r] }
    : { col: col + spec.pins.length - n, row: rows.top[r] };
}

/** Distance between the two leg rows, in world units. */
function rowGap(spec: DipSpec): number {
  return spec.wide ? Z["g"] - Z["d"] : Z["f"] - Z["e"];
}

/** Centre of the chip in the breadboard plane, relative to the pin-1 column. */
export function dipCentreOffset(chip: DipChip): { x: number; z: number } {
  const spec = DIP_CHIPS[chip];
  const half = spec.pins.length / 2;
  const zTop = spec.wide ? Z["d"] : Z["e"];
  return { x: ((half - 1) * PITCH) / 2, z: zTop + rowGap(spec) / 2 };
}

const C = {
  body: 0x2a2b30,
  bodyTop: 0x313238,
  leg: 0xc9cdd2,
  sticker: "#fbfbf8",
  ink: "#1d1f24",
  muted: "#5b616b",
};

/**
 * The chip, centred on the origin of the breadboard plane: y = 0 is the board
 * surface and the legs go into the holes below it. Long axis along x, pin 1
 * at -x, +z.
 */
export function buildDipChip(chip: DipChip): THREE.Group {
  const spec = DIP_CHIPS[chip];
  const n = spec.pins.length;
  const half = n / 2;
  const root = new THREE.Group();
  root.userData.componentType = "dip-mcu";

  const gap = rowGap(spec);
  // Body ends 2 mm (wide) or 1.6 mm (narrow) beyond the outer legs.
  const L = (half - 1) * PITCH + (spec.wide ? 4 : 3.2) * MM;
  const W = spec.wide ? gap - 1.3 * MM : gap - 3.0 * MM;
  const seat = 0.7 * MM; // body bottom above the board
  const H = 3.6 * MM;
  const lowerH = H * 0.45;

  // Body: a lower half and a slightly smaller upper half, like the parting
  // line of a moulded package.
  block(root, 0, 0, seat, L, lowerH, W, C.body, 0.32);
  const inset = 0.25 * MM;
  const upper = add(
    root,
    new THREE.ExtrudeGeometry(
      roundedRect(L - inset * 2, W - inset * 2, 0.5 * MM),
      {
        depth: H - lowerH,
        bevelEnabled: false,
      },
    ),
    mat(C.bodyTop, 0.32),
    0,
    seat + lowerH,
    0,
  );
  upper.rotation.x = -Math.PI / 2;
  upper.position.y = seat + lowerH;
  const topY = seat + H;

  // Legs: a shoulder out of the body, a wide upper leg, a narrow tip into the
  // hole.
  const legMat = mat(C.leg, 0.45, 0.4);
  const shoulderY = seat + lowerH * 0.55;
  const legW = 1.5 * MM;
  const tipW = 0.5 * MM;
  const t = 0.26 * MM;
  const shoulderGeo = new THREE.BoxGeometry(legW, t, (gap - W) / 2 + t);
  const upperLegH = shoulderY - 0.9 * MM;
  const upperLegGeo = new THREE.BoxGeometry(legW, upperLegH, t);
  const tipH = 0.9 * MM + BOARD_H * 0.45;
  const tipGeo = new THREE.BoxGeometry(tipW, tipH, t);
  for (let i = 0; i < half; i++) {
    const x = -((half - 1) * PITCH) / 2 + i * PITCH;
    for (const side of [-1, 1]) {
      const zRow = (side * gap) / 2;
      const zMid = side * (W / 2 + (gap - W) / 4);
      const s = add(root, shoulderGeo, legMat, x, shoulderY, zMid);
      s.userData.noOutline = true;
      const u = add(
        root,
        upperLegGeo,
        legMat,
        x,
        0.9 * MM + upperLegH / 2,
        zRow,
      );
      u.userData.noOutline = true;
      const tip = add(root, tipGeo, legMat, x, 0.9 * MM - tipH / 2, zRow);
      tip.userData.noOutline = true;
    }
  }

  // Pin-label sticker over the top face, with the notch and the pin-1 dot.
  const SW = L - inset * 2;
  const SD = W - inset * 2;
  const sticker = decal(
    (ctx, cw, ch) => {
      const px = cw / SW; // canvas px per world unit
      ctx.fillStyle = C.sticker;
      ctx.fillRect(0, 0, cw, ch);
      ctx.strokeStyle = "#c8cbd0";
      ctx.lineWidth = Math.max(1, px * 0.15 * MM);
      ctx.strokeRect(0, 0, cw, ch);
      // Notch: half circle cut from the left end.
      ctx.fillStyle = "#3a3b40";
      ctx.beginPath();
      ctx.arc(0, ch / 2, px * 1.6 * MM, -Math.PI / 2, Math.PI / 2);
      ctx.fill();
      // Pin-1 dot.
      ctx.beginPath();
      ctx.arc(px * 2.1 * MM, ch - px * 2.2 * MM, px * 0.7 * MM, 0, Math.PI * 2);
      ctx.fill();
      // Pin names, rotated, one per pin along each long edge.
      const font = Math.min(px * 0.62 * PITCH, ch * 0.105);
      ctx.fillStyle = C.ink;
      ctx.font = `600 ${font}px Helvetica, Arial, sans-serif`;
      ctx.textBaseline = "middle";
      const cx = (i: number) =>
        (SW / 2 - ((half - 1) * PITCH) / 2 + i * PITCH) * px;
      for (let i = 0; i < half; i++) {
        // Bottom edge: pins 1..half, reading upward from the edge.
        ctx.save();
        ctx.translate(cx(i), ch - px * 0.5 * MM);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "left";
        ctx.fillText(stickerName(spec.pins[i]), 0, 0);
        ctx.restore();
        // Top edge: pins n..half+1, reading downward from the edge.
        ctx.save();
        ctx.translate(cx(i), px * 0.5 * MM);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "right";
        ctx.fillText(stickerName(spec.pins[n - 1 - i]), 0, 0);
        ctx.restore();
      }
      // Part number in the middle.
      ctx.textAlign = "center";
      ctx.fillStyle = C.ink;
      ctx.font = `800 ${ch * 0.16}px Helvetica, Arial, sans-serif`;
      ctx.fillText(spec.marking[0], cw / 2, ch * 0.47);
      ctx.fillStyle = C.muted;
      ctx.font = `600 ${ch * 0.085}px Helvetica, Arial, sans-serif`;
      ctx.fillText(spec.marking[1], cw / 2, ch * 0.6);
    },
    SW,
    SD,
    spec.wide ? 900 : 1100,
  );
  if (sticker) {
    sticker.position.set(0, topY + 0.002, 0);
    root.add(sticker);
  }
  outline(root);
  return root;
}

/** The chip for the apparatus slider: lifted so its legs stand on y = 0. */
export function buildDipChipStandalone(chip: DipChip): THREE.Group {
  const g = new THREE.Group();
  const chipG = buildDipChip(chip);
  chipG.position.y = 0.9 * MM + BOARD_H * 0.45;
  g.add(chipG);
  return g;
}

// ── Quartz crystal (HC-49/S) ───────────────────────────────────────────────
// Low-profile metal can with two legs one hole apart. Built with its legs at
// (-PITCH/2, 0) and (+PITCH/2, 0) of the breadboard plane.

export function buildCrystal(mhz: number): THREE.Group {
  const root = new THREE.Group();
  root.userData.componentType = "crystal";
  const L = 11.4 * MM;
  const D = 4.7 * MM;
  const H = 3.6 * MM;
  const lift = 0.8 * MM;
  // Base flange and can.
  const flange = add(
    root,
    new THREE.ExtrudeGeometry(roundedRect(L + 0.4 * MM, D + 0.4 * MM, D / 2), {
      depth: 0.5 * MM,
      bevelEnabled: false,
    }),
    mat(0xb9bec6, 0.45, 0.35),
    0,
    lift,
    0,
  );
  flange.rotation.x = -Math.PI / 2;
  const can = add(
    root,
    new THREE.ExtrudeGeometry(roundedRect(L, D, D / 2 - 0.05 * MM), {
      depth: H - 0.5 * MM,
      bevelEnabled: true,
      bevelSize: 0.25 * MM,
      bevelThickness: 0.25 * MM,
      bevelSegments: 2,
    }),
    mat(0xd9dde2, 0.5, 0.3),
    0,
    lift + 0.5 * MM,
    0,
  );
  can.rotation.x = -Math.PI / 2;
  const label = decal(
    (ctx, W, Hc) => {
      ctx.fillStyle = "#3b3f46";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Hc * 0.42}px Helvetica, Arial, sans-serif`;
      ctx.fillText(String(mhz), W / 2, Hc * 0.5);
    },
    L * 0.7,
    D * 0.6,
    1600,
  );
  if (label) {
    label.position.set(0, lift + H + 0.25 * MM + 0.002, 0);
    root.add(label);
  }
  const legGeo = new THREE.CylinderGeometry(
    0.22 * MM,
    0.22 * MM,
    lift + BOARD_H * 0.45,
    8,
  );
  for (const s of [-1, 1]) {
    const leg = add(
      root,
      legGeo,
      mat(0xc9cdd2, 0.45, 0.4),
      (s * PITCH) / 2,
      (lift - BOARD_H * 0.45) / 2,
      0,
    );
    leg.userData.noOutline = true;
  }
  outline(root);
  return root;
}

/** A pin's leg in the chip's own frame (as built by buildDipChip). */
export function dipPinLocal(
  chip: DipChip,
  pin: string,
): { x: number; z: number } {
  const spec = DIP_CHIPS[chip];
  const n = dipPinNumber(chip, pin);
  if (!n) throw new Error(`${chip} has no pin "${pin}"`);
  const half = spec.pins.length / 2;
  const x0 = -((half - 1) * PITCH) / 2;
  const gap = rowGap(spec);
  return n <= half
    ? { x: x0 + (n - 1) * PITCH, z: gap / 2 }
    : { x: x0 + (spec.pins.length - n) * PITCH, z: -gap / 2 };
}
