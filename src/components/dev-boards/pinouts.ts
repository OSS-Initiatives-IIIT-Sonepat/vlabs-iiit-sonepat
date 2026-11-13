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
};

export const DEV_PITCH = PITCH;
/** Height of the PCB or body above the bench surface. */
export const DEV_PCB_H = 0.12;
/** Height of the pin tops above the PCB surface. */
export const DEV_HEADER_H = 0.22;
/** Gap between the breadboard edge and a side-mounted part. */
const SIDE_GAP = 0.9;

// Arduino Uno R3: 2.7" x 2.1". Digital header along the far edge (D0 → D13,
// then GND), power header and the analog inputs along the near edge.
const UNO_W = 5.94;
const UNO_D = 4.62;
const unoPins: DevPinSpec[] = [
  ...Array.from({ length: 14 }, (_, i) => ({
    name: `D${i}`,
    x: -1.4 + i * DEV_PITCH,
    z: -UNO_D / 2 + 0.3,
  })),
  { name: "GND", x: -1.4 + 14 * DEV_PITCH, z: -UNO_D / 2 + 0.3 },
  { name: "3V3", x: -0.9, z: UNO_D / 2 - 0.3 },
  { name: "5V", x: -0.9 + DEV_PITCH, z: UNO_D / 2 - 0.3 },
  { name: "GND2", x: -0.9 + 2 * DEV_PITCH, z: UNO_D / 2 - 0.3 },
  { name: "GND3", x: -0.9 + 3 * DEV_PITCH, z: UNO_D / 2 - 0.3 },
  { name: "VIN", x: -0.9 + 4 * DEV_PITCH, z: UNO_D / 2 - 0.3 },
  ...Array.from({ length: 6 }, (_, i) => ({
    name: `A${i}`,
    x: 0.9 + i * DEV_PITCH,
    z: UNO_D / 2 - 0.3,
  })),
];

// ESP32 DevKit V1 (30-pin): two 15-pin headers down the long edges.
const ESP_W = 2.4;
const ESP_D = 4.6;
const espLeft = [
  "3V3",
  "EN",
  "GPIO36",
  "GPIO39",
  "GPIO34",
  "GPIO35",
  "GPIO32",
  "GPIO33",
  "GPIO25",
  "GPIO26",
  "GPIO27",
  "GPIO14",
  "GPIO12",
  "GND",
  "GPIO13",
];
const espRight = [
  "VIN",
  "GND",
  "GPIO15",
  "GPIO2",
  "GPIO4",
  "GPIO16",
  "GPIO17",
  "GPIO5",
  "GPIO18",
  "GPIO19",
  "GPIO21",
  "GPIO3",
  "GPIO1",
  "GPIO22",
  "GPIO23",
];
const espPins: DevPinSpec[] = [
  ...espLeft.map((name, i) => ({
    name,
    x: -0.99,
    z: -((espLeft.length - 1) * DEV_PITCH) / 2 + i * DEV_PITCH,
  })),
  ...espRight.map((name, i) => ({
    name,
    x: 0.99,
    z: -((espRight.length - 1) * DEV_PITCH) / 2 + i * DEV_PITCH,
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
  ...Array.from({ length: 8 }, (_, i) => ({ name: `P1.${i}`, x: -COL_X, z: span8(i) })),
  ...Array.from({ length: 8 }, (_, i) => ({ name: `P3.${i}`, x: COL_X, z: span8(i) })),
  ...Array.from({ length: 8 }, (_, i) => ({ name: `P0.${i}`, x: span8(i), z: -ROW_Z })),
  ...Array.from({ length: 8 }, (_, i) => ({ name: `P2.${i}`, x: span8(i), z: ROW_Z })),
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
  ...Array.from({ length: 8 }, (_, i) => ({ name: `RB${i}`, x: COL_X, z: span8(i) })),
  ...Array.from({ length: 8 }, (_, i) => ({ name: `RC${i}`, x: span8(i), z: -ROW_Z })),
  ...Array.from({ length: 8 }, (_, i) => ({ name: `RD${i}`, x: span8(i), z: ROW_Z })),
  { name: "VDD", x: 1.3, z: -ROW_Z },
  { name: "VSS", x: 1.6, z: -ROW_Z },
  { name: "MCLR", x: 1.9, z: -ROW_Z },
];

// ADC0804 in a DIP-20: pins 1–10 down the left, 11–20 up the right.
const ADC_W = 1.5;
const ADC_D = 2.6;
const adcNames = [
  "CS", "RD", "WR", "CLKIN", "INTR", "VINP", "VINN", "AGND", "VREF2", "DGND",
  "DB7", "DB6", "DB5", "DB4", "DB3", "DB2", "DB1", "DB0", "CLKR", "VCC",
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
  "arduino-uno": { w: UNO_W, d: UNO_D, pins: unoPins },
  "esp32-devkit": { w: ESP_W, d: ESP_D, pins: espPins },
  "mcu-8051": { w: TRAINER_W, d: TRAINER_D, pins: mcu8051Pins },
  "pic18f4550": { w: TRAINER_W, d: TRAINER_D, pins: pic18Pins },
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
  const { w } = DEV_BOARDS[kind];
  const sign = side === "left" ? -1 : 1;
  const x = sign * (BOARD_W / 2 + SIDE_GAP + w / 2);
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
  const spec = DEV_BOARDS[kind].pins.find((p) => p.name === pinName);
  if (!spec) return null;
  const centre = devBoardCentre(kind, side, zOffset);
  return new THREE.Vector3(
    centre.x + spec.x,
    centre.y + DEV_PCB_H + DEV_HEADER_H,
    centre.z + spec.z,
  );
}

export const DEV_TOP_Y = TOP_Y;
