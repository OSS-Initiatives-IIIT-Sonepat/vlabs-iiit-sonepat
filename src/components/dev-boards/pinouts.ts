import * as THREE from "three";
import { BOARD_W, PITCH, TOP_Y } from "@/labs/coords";
import { BENCH_Y } from "@/components/shared/bench-layout";

// ── Named-pin parts on the bench ──────────────────────────────────────────
// Development boards (Arduino Uno, ESP32, 8051 and PIC18 trainers) and
// bench chips (ADC0804, seven-segment display) sit on the bench beside the
// breadboard. Each has named pins. A wire reaches a pin with
// `{ dev: '<part id>', pin: '<name>' }`. The pin table below is the single
// source of truth: the builder draws the pins from it and LabScene resolves
// wire ends from it, so the two can never disagree.
//
// Coordinates are local to the part's centre, in world units (one 0.1" pitch
// = PITCH). x runs across the part, z runs from the top edge (-z) to the
// bottom edge (+z). Pins sit on the top surface.

export type DevBoardKind =
  | "arduino-uno"
  | "esp32-devkit"
  | "mcu-8051"
  | "pic18f4550"
  | "adc0804"
  | "seg7";
export type DevSide = "left" | "right";

export type DevPinSpec = { name: string; x: number; z: number };

export type DevBoardSpec = {
  /** Body size (x, z) in world units. */
  w: number;
  d: number;
  pins: DevPinSpec[];
  /** Height of the pin tops above the bench, when not the default header. */
  pinTopY?: number;
  /** Gap to the breadboard; wider where a power plug needs room. */
  sideGap?: number;
};

export const DEV_PITCH = PITCH;
/** Height of the PCB or body above the bench surface. */
export const DEV_PCB_H = 0.12;
/** Height of the pin tops above the PCB surface. */
export const DEV_HEADER_H = 0.22;
/** Gap between the breadboard edge and a side-mounted part. */
const SIDE_GAP = 0.9;

// Arduino Uno R3: 2.7" x 2.1" (2700 x 2100 mil). Header positions are the
// R3 shield layout, in mil from the bottom-left corner of the top view (USB
// on the left, digital header along the back edge). UNO_MIL converts a mil to
// world units; one 100 mil pitch is exactly PITCH.
const UNO_W = 5.94;
const UNO_D = 4.62;
export const UNO_MIL = UNO_W / 2700;
/** Uno top-view mil coordinates to board-local (x, z). */
export function unoAt(mx: number, my: number): { x: number; z: number } {
  return { x: mx * UNO_MIL - UNO_W / 2, z: UNO_D / 2 - my * UNO_MIL };
}
/** Female header height on the Uno (8.5 mm), from the PCB top. */
export const UNO_HEADER_H = 0.74;
const unoPin = (name: string, mx: number, my: number): DevPinSpec => ({
  name,
  ...unoAt(mx, my),
});
const unoPins: DevPinSpec[] = [
  // Digital D0-D7 (8-pin header), D0 at the right end.
  ...Array.from({ length: 8 }, (_, i) => unoPin(`D${i}`, 2600 - 100 * i, 2000)),
  // Digital D8-D13, then GND, AREF, SDA, SCL (10-pin header). The 160 mil gap
  // between D7 and D8 is the famous Uno offset.
  ...Array.from({ length: 6 }, (_, i) =>
    unoPin(`D${i + 8}`, 1740 - 100 * i, 2000),
  ),
  unoPin("GND", 1140, 2000),
  unoPin("AREF", 1040, 2000),
  unoPin("SDA", 940, 2000),
  unoPin("SCL", 840, 2000),
  // Power header (8-pin) along the front edge.
  unoPin("NC", 1260, 100),
  unoPin("IOREF", 1360, 100),
  unoPin("RESET", 1460, 100),
  unoPin("3V3", 1560, 100),
  unoPin("5V", 1660, 100),
  unoPin("GND2", 1760, 100),
  unoPin("GND3", 1860, 100),
  unoPin("VIN", 1960, 100),
  // Analog A0-A5 (6-pin header).
  ...Array.from({ length: 6 }, (_, i) => unoPin(`A${i}`, 2160 + 100 * i, 100)),
];

// ESP32-DevKitC (38-pin) with an ESP-WROOM-32 module: 54.4 x 27.9 mm, two
// rows of 19 pins 1.0" apart, pins pointing down so the board stands on them.
// Long axis along x: micro-USB at the -x end, the module antenna at +x.
// Each pin has a functional name (GPIO2, GND, ...) used by wires, and the
// short label printed next to it on the board (S2, GND, ...).
/** World units per millimetre. */
export const DEV_MM = DEV_PITCH / 2.54;
const ESP_W = 54.4 * DEV_MM;
const ESP_D = 27.9 * DEV_MM;
/** PCB bottom above the bench: the board stands on its 8.5 mm pins. */
export const ESP_LIFT = 8.5 * DEV_MM;
export const ESP_PCB_H = 1.6 * DEV_MM;
/** Pin rows are 25.4 mm apart, so each sits 12.7 mm from the centre line. */
export const ESP_ROW = 12.7 * DEV_MM;
// Back row (-z) and front row (+z), left (USB end) to right (antenna end).
const espBack: [string, string][] = [
  ["5V", "5V"],
  ["GND", "GND"],
  ["GPIO10", "SD3"],
  ["GPIO9", "SD2"],
  ["GPIO13", "S13"],
  ["GND2", "GND"],
  ["GPIO12", "S12"],
  ["GPIO14", "S14"],
  ["GPIO27", "S27"],
  ["GPIO26", "S26"],
  ["GPIO25", "S25"],
  ["GPIO33", "S33"],
  ["GPIO32", "S32"],
  ["GPIO35", "S35"],
  ["GPIO34", "S34"],
  ["GPIO39", "SN"],
  ["GPIO36", "SP"],
  ["EN", "EN"],
  ["3V3", "3V3"],
];
const espFront: [string, string][] = [
  ["GPIO6", "CLK"],
  ["GPIO7", "SD0"],
  ["GPIO8", "SD1"],
  ["GPIO15", "S15"],
  ["GPIO2", "S2"],
  ["GPIO0", "S0"],
  ["GPIO4", "S4"],
  ["GPIO16", "S16"],
  ["GPIO17", "S17"],
  ["GPIO5", "S5"],
  ["GPIO18", "S18"],
  ["GPIO19", "S19"],
  ["GND3", "GND"],
  ["GPIO21", "S21"],
  ["GPIO3", "RXD"],
  ["GPIO1", "TXD"],
  ["GPIO22", "S22"],
  ["GPIO23", "S23"],
  ["GND4", "GND"],
];
/** Silkscreen label for each ESP32 pin name. */
export const ESP_LABELS: Record<string, string> = Object.fromEntries([
  ...espBack,
  ...espFront,
]);
const espPins: DevPinSpec[] = [
  ...espBack.map(([name], i) => ({
    name,
    x: (i - 9) * DEV_PITCH,
    z: -ESP_ROW,
  })),
  ...espFront.map(([name], i) => ({
    name,
    x: (i - 9) * DEV_PITCH,
    z: ESP_ROW,
  })),
];

// Trainer boards: a 40-pin chip in the middle, with port headers around it.
// Left and right columns are one port each, the top and bottom rows are the
// other two. The power strip sits in the top-right and bottom-right corners.
const TRAINER_W = 6.0;
const TRAINER_D = 4.6;
const ROW_Z = TRAINER_D / 2 - 0.35; // top and bottom rows
const COL_X = TRAINER_W / 2 - 0.35; // left and right columns
const span8 = (i: number) => -0.77 + i * DEV_PITCH; // 8 pins, centred

const mcu8051Pins: DevPinSpec[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `P1.${i}`,
    x: -COL_X,
    z: span8(i),
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `P3.${i}`,
    x: COL_X,
    z: span8(i),
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `P0.${i}`,
    x: span8(i),
    z: -ROW_Z,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `P2.${i}`,
    x: span8(i),
    z: ROW_Z,
  })),
  { name: "VCC", x: 1.3, z: -ROW_Z },
  { name: "GND", x: 1.6, z: -ROW_Z },
  { name: "RST", x: 1.9, z: -ROW_Z },
  { name: "XTAL1", x: 1.3, z: ROW_Z },
  { name: "XTAL2", x: 1.6, z: ROW_Z },
];

const pic18Pins: DevPinSpec[] = [
  ...Array.from({ length: 6 }, (_, i) => ({
    name: `RA${i}`,
    x: -COL_X,
    z: -0.55 + i * DEV_PITCH,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `RB${i}`,
    x: COL_X,
    z: span8(i),
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `RC${i}`,
    x: span8(i),
    z: -ROW_Z,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `RD${i}`,
    x: span8(i),
    z: ROW_Z,
  })),
  { name: "VDD", x: 1.3, z: -ROW_Z },
  { name: "VSS", x: 1.6, z: -ROW_Z },
  { name: "MCLR", x: 1.9, z: -ROW_Z },
];

// ADC0804 in a DIP-20: pins 1–10 down the left, 11–20 up the right.
const ADC_W = 1.5;
const ADC_D = 2.6;
const adcNames = [
  "CS",
  "RD",
  "WR",
  "CLKIN",
  "INTR",
  "VINP",
  "VINN",
  "AGND",
  "VREF2",
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
];
const adcPins: DevPinSpec[] = adcNames.map((name, i) => {
  if (i < 10) return { name, x: -0.66, z: -0.99 + i * DEV_PITCH };
  const k = i - 10;
  return { name, x: 0.66, z: 0.99 - k * DEV_PITCH };
});

// Seven-segment display: nine pins in a row along the near edge.
const SEG_W = 2.0;
const SEG_D = 1.3;
const segNames = ["a", "b", "c", "d", "e", "f", "g", "dp", "com"];
const segPins: DevPinSpec[] = segNames.map((name, i) => ({
  name,
  x: -0.88 + i * DEV_PITCH,
  z: SEG_D / 2 - 0.2,
}));

export const DEV_BOARDS: Record<DevBoardKind, DevBoardSpec> = {
  "arduino-uno": {
    w: UNO_W,
    d: UNO_D,
    pins: unoPins,
    pinTopY: DEV_PCB_H / 2 + UNO_HEADER_H,
    sideGap: 2.4,
  },
  "esp32-devkit": {
    w: ESP_W,
    d: ESP_D,
    pins: espPins,
    pinTopY: ESP_LIFT + ESP_PCB_H,
    sideGap: 1.9,
  },
  "mcu-8051": { w: TRAINER_W, d: TRAINER_D, pins: mcu8051Pins },
  pic18f4550: { w: TRAINER_W, d: TRAINER_D, pins: pic18Pins },
  adc0804: { w: ADC_W, d: ADC_D, pins: adcPins },
  seg7: { w: SEG_W, d: SEG_D, pins: segPins },
};

/**
 * Part centre on the bench for a given side of the breadboard. `zOffset`
 * moves the part along the bench (for two displays on the same side).
 */
export function devBoardCentre(
  kind: DevBoardKind,
  side: DevSide,
  zOffset = 0,
): THREE.Vector3 {
  const { w, sideGap = SIDE_GAP } = DEV_BOARDS[kind];
  const sign = side === "left" ? -1 : 1;
  const x = sign * (BOARD_W / 2 + sideGap + w / 2);
  return new THREE.Vector3(x, BENCH_Y, zOffset);
}

/**
 * World position of a named pin, or null when the part has no pin of that
 * name. Used by LabScene to resolve `{ dev, pin }` wire ends.
 */
export function devPinWorld(
  kind: DevBoardKind,
  side: DevSide,
  pinName: string,
  zOffset = 0,
): THREE.Vector3 | null {
  const board = DEV_BOARDS[kind];
  const spec = board.pins.find((p) => p.name === pinName);
  if (!spec) return null;
  const centre = devBoardCentre(kind, side, zOffset);
  return new THREE.Vector3(
    centre.x + spec.x,
    centre.y + (board.pinTopY ?? DEV_PCB_H + DEV_HEADER_H),
    centre.z + spec.z,
  );
}

export const DEV_TOP_Y = TOP_Y;
