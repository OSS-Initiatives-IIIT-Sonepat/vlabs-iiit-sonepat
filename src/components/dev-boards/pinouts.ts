import * as THREE from "three";
import { BOARD_W, PITCH, TOP_Y } from "@/labs/coords";
import { BENCH_Y } from "@/components/shared/bench-layout";

// ── Development boards (Arduino Uno, ESP32 DevKit, ...) ────────────────────
// A development board sits on the bench beside the breadboard. Its header
// pins are named (`D13`, `GPIO2`, `5V`, …). A wire reaches a pin with
// `{ dev: '<board id>', pin: '<name>' }`. The pin table below is the single
// source of truth: the builder draws the headers from it and LabScene
// resolves wire ends from it, so the two can never disagree.
//
// Coordinates are local to the board's centre, in world units (one 0.1" pitch
// = PITCH). x runs across the board, z runs from the top edge (−z) to the
// bottom edge (+z). Pins sit on the header top surface.

export type DevBoardKind = "arduino-uno" | "esp32-devkit";
export type DevSide = "left" | "right";

export type DevPinSpec = { name: string; x: number; z: number };

export type DevBoardSpec = {
  /** Printed circuit board size (x, z) in world units. */
  w: number;
  d: number;
  pins: DevPinSpec[];
};

export const DEV_PITCH = PITCH;
/** Height of the PCB above the bench surface. */
export const DEV_PCB_H = 0.12;
/** Height of the header pin tops above the PCB surface. */
export const DEV_HEADER_H = 0.22;
/** Gap between the breadboard edge and a side-mounted board. */
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

export const DEV_BOARDS: Record<DevBoardKind, DevBoardSpec> = {
  "arduino-uno": { w: UNO_W, d: UNO_D, pins: unoPins },
  "esp32-devkit": { w: ESP_W, d: ESP_D, pins: espPins },
};

/** Board centre on the bench for a given side of the breadboard. */
export function devBoardCentre(kind: DevBoardKind, side: DevSide): THREE.Vector3 {
  const { w } = DEV_BOARDS[kind];
  const sign = side === "left" ? -1 : 1;
  const x = sign * (BOARD_W / 2 + SIDE_GAP + w / 2);
  return new THREE.Vector3(x, BENCH_Y, 0);
}

/**
 * World position of a named header pin, or null when the board has no pin of
 * that name. Used by LabScene to resolve `{ dev, pin }` wire ends.
 */
export function devPinWorld(
  kind: DevBoardKind,
  side: DevSide,
  pinName: string,
): THREE.Vector3 | null {
  const spec = DEV_BOARDS[kind].pins.find((p) => p.name === pinName);
  if (!spec) return null;
  const centre = devBoardCentre(kind, side);
  return new THREE.Vector3(
    centre.x + spec.x,
    centre.y + DEV_PCB_H + DEV_HEADER_H,
    centre.z + spec.z,
  );
}

export const DEV_TOP_Y = TOP_Y;
