import * as THREE from "three";
import {
  buildArduinoUnoStandalone,
  UNO_PARTS,
} from "@/components/dev-boards/arduino-uno";
import {
  buildEsp32DevkitStandalone,
  ESP_PARTS,
} from "@/components/dev-boards/esp32-devkit";
import {
  buildDipChip,
  dipPinLocal,
  type DipChip,
} from "@/components/dev-boards/dip-chips";
import { DEV_BOARDS, unoAt, DEV_MM } from "@/components/dev-boards/pinouts";
import { type TopViewBoard } from "@/labs/lab-content.types";

// The labelled top view of each board and chip: which model to draw and
// where each label points. Positions are in the model's own frame (x right,
// z toward the viewer), so they follow the 3D model exactly.

export type Side = "left" | "right" | "top" | "bottom";
export type Callout = {
  label: string;
  side: Side;
  /** Point the leader ends on. */
  at: { x: number; z: number };
  /** Optional box drawn around the part, centred on `at`. */
  box?: { w: number; d: number };
};

const MM = DEV_MM;

function devPin(kind: "arduino-uno" | "esp32-devkit", name: string) {
  const p = DEV_BOARDS[kind].pins.find((q) => q.name === name);
  if (!p) throw new Error(`${kind} has no pin ${name}`);
  return { x: p.x, z: p.z };
}

/** The midpoint of two pins, and a box around the run between them. */
function span(
  a: { x: number; z: number },
  b: { x: number; z: number },
  pad = 1.6 * MM,
) {
  return {
    at: { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 },
    box: { w: Math.abs(a.x - b.x) + pad * 2, d: Math.abs(a.z - b.z) + pad * 2 },
  };
}

function unoCallouts(): Callout[] {
  const P = (n: string) => devPin("arduino-uno", n);
  const P_ = UNO_PARTS;
  return [
    {
      label: "Reset button",
      side: "left",
      at: P_.resetButton,
      box: { w: 7 * MM, d: 7 * MM },
    },
    {
      label: "USB socket (power + upload)",
      side: "left",
      at: P_.usb,
      box: { w: 16 * MM, d: 12.5 * MM },
    },
    {
      label: "ATmega16U2 (USB to serial)",
      side: "left",
      at: unoAt(780, 1290),
      box: { w: 6 * MM, d: 6 * MM },
    },
    {
      label: "Voltage regulator (5 V)",
      side: "left",
      at: P_.regulator,
      box: { w: 7 * MM, d: 7 * MM },
    },
    {
      label: "DC jack (7 to 12 V)",
      side: "left",
      at: P_.powerJack,
      box: { w: 14 * MM, d: 9 * MM },
    },
    { label: "Analog reference (AREF)", side: "top", at: P("AREF") },
    { label: "Ground (GND)", side: "top", at: P("GND") },
    {
      label: "Digital I/O pins 2 to 13",
      side: "top",
      ...span(P("D13"), P("D2")),
    },
    { label: "TX → 1", side: "top", at: P("D1") },
    { label: "RX ← 0", side: "top", at: P("D0") },
    {
      label: "On-board LED (pin 13)",
      side: "right",
      at: P_.pinLed,
      box: { w: 3 * MM, d: 2 * MM },
    },
    {
      label: "Power LED (ON)",
      side: "right",
      at: P_.powerLed,
      box: { w: 3 * MM, d: 2 * MM },
    },
    {
      label: "ICSP header (ATmega328P)",
      side: "right",
      at: P_.icsp,
      box: { w: 6 * MM, d: 8.5 * MM },
    },
    {
      label: "ATmega328P (the microcontroller)",
      side: "right",
      at: P_.chip,
      box: { w: 36 * MM, d: 9 * MM },
    },
    {
      label: "16 MHz crystal",
      side: "right",
      at: P_.crystal,
      box: { w: 12 * MM, d: 5 * MM },
    },
    { label: "IOREF", side: "bottom", at: P("IOREF") },
    { label: "RESET pin", side: "bottom", at: P("RESET") },
    { label: "3.3 V out", side: "bottom", at: P("3V3") },
    { label: "5 V out", side: "bottom", at: P("5V") },
    { label: "Ground pins", side: "bottom", ...span(P("GND2"), P("GND3")) },
    { label: "VIN (input)", side: "bottom", at: P("VIN") },
    {
      label: "Analog inputs A0 to A5",
      side: "bottom",
      ...span(P("A0"), P("A5")),
    },
  ];
}

function espCallouts(): Callout[] {
  const P = (n: string) => devPin("esp32-devkit", n);
  const E = ESP_PARTS;
  return [
    {
      label: "Micro-USB (power + upload)",
      side: "left",
      at: E.usb,
      box: { w: 6 * MM, d: 8 * MM },
    },
    {
      label: "EN button (reset)",
      side: "left",
      at: E.enButton,
      box: { w: 4.5 * MM, d: 4.5 * MM },
    },
    {
      label: "BOOT button",
      side: "left",
      at: E.bootButton,
      box: { w: 4.5 * MM, d: 4.5 * MM },
    },
    { label: "5V pin (from USB)", side: "top", at: P("5V") },
    { label: "GND", side: "top", at: P("GND") },
    { label: "GPIO pins", side: "top", ...span(P("GPIO13"), P("GPIO32")) },
    {
      label: "Input-only GPIO34 to 39",
      side: "top",
      ...span(P("GPIO35"), P("GPIO36")),
    },
    { label: "EN pin", side: "top", at: P("EN") },
    { label: "3V3 pin (3.3 V out)", side: "top", at: P("3V3") },
    {
      label: "ESP-WROOM-32 (CPU, Wi-Fi, BT)",
      side: "right",
      at: E.module,
      box: { w: 25.5 * MM, d: 18 * MM },
    },
    {
      label: "Flash pins: do not use",
      side: "bottom",
      ...span(P("GPIO6"), P("GPIO8")),
    },
    { label: "GPIO2 (S2)", side: "bottom", at: P("GPIO2") },
    {
      label: "AMS1117 regulator (3.3 V)",
      side: "bottom",
      at: E.regulator,
      box: { w: 7 * MM, d: 4 * MM },
    },
    {
      label: "USB-to-serial chip",
      side: "bottom",
      at: E.usbChip,
      box: { w: 5 * MM, d: 5 * MM },
    },
    {
      label: "Power LED",
      side: "bottom",
      at: E.powerLed,
      box: { w: 2.5 * MM, d: 2 * MM },
    },
    {
      label: "TX0 / RX0 (GPIO1, GPIO3)",
      side: "bottom",
      ...span(P("GPIO3"), P("GPIO1")),
    },
    { label: "GND", side: "bottom", at: P("GND4") },
  ];
}

function chipCallouts(chip: DipChip): Callout[] {
  const P = (n: string) => dipPinLocal(chip, n);
  const notch = P(chip === "at89s52" ? "P1.0" : "MCLR");
  const pin1 = {
    label: "Pin 1 (dot) and the notch",
    side: "left" as const,
    at: { x: notch.x - 1.2 * MM, z: notch.z - 2 * MM },
  };
  if (chip === "at89s52")
    return [
      pin1,
      {
        label: "P1.0 to P1.7 (pins 1 to 8)",
        side: "bottom",
        ...span(P("P1.0"), P("P1.7")),
      },
      { label: "RST (9)", side: "bottom", at: P("RST") },
      {
        label: "P3.0 to P3.7 (10 to 17)",
        side: "bottom",
        ...span(P("P3.0"), P("P3.7")),
      },
      {
        label: "XTAL2, XTAL1 (18, 19)",
        side: "bottom",
        ...span(P("XTAL2"), P("XTAL1")),
      },
      { label: "GND (20)", side: "bottom", at: P("GND") },
      { label: "VCC (40)", side: "top", at: P("VCC") },
      {
        label: "P0.0 to P0.7 (39 to 32)",
        side: "top",
        ...span(P("P0.0"), P("P0.7")),
      },
      { label: "EA (31)", side: "top", at: P("EA") },
      {
        label: "ALE, PSEN (30, 29)",
        side: "top",
        ...span(P("ALE"), P("PSEN")),
      },
      {
        label: "P2.7 to P2.0 (28 to 21)",
        side: "top",
        ...span(P("P2.7"), P("P2.0")),
      },
    ];
  return [
    pin1,
    { label: "MCLR (1)", side: "bottom", at: P("MCLR") },
    {
      label: "RA0 to RA5 (2 to 7)",
      side: "bottom",
      ...span(P("RA0"), P("RA5")),
    },
    {
      label: "RE0 to RE2 (8 to 10)",
      side: "bottom",
      ...span(P("RE0"), P("RE2")),
    },
    { label: "VDD, VSS (11, 12)", side: "bottom", ...span(P("VDD"), P("VSS")) },
    {
      label: "OSC1, OSC2 (13, 14)",
      side: "bottom",
      ...span(P("OSC1"), P("OSC2")),
    },
    {
      label: "RC0 to RC2, CCP1 (15 to 17)",
      side: "bottom",
      ...span(P("RC0"), P("RC2")),
    },
    { label: "RD0, RD1 (19, 20)", side: "bottom", ...span(P("RD0"), P("RD1")) },
    {
      label: "RB7 to RB0 (40 to 33)",
      side: "top",
      ...span(P("RB7"), P("RB0")),
    },
    { label: "VDD, VSS (32, 31)", side: "top", ...span(P("VDD2"), P("VSS2")) },
    {
      label: "RD7 to RD4 (30 to 27)",
      side: "top",
      ...span(P("RD7"), P("RD4")),
    },
    {
      label: "RC7 to RC4 (26 to 23)",
      side: "top",
      ...span(P("RC7"), P("RC4")),
    },
    { label: "RD3, RD2 (22, 21)", side: "top", ...span(P("RD3"), P("RD2")) },
  ];
}

export function topViewOf(board: TopViewBoard): {
  model: THREE.Group;
  callouts: Callout[];
  title: string;
} {
  switch (board) {
    case "arduino-uno":
      return {
        model: buildArduinoUnoStandalone(),
        callouts: unoCallouts(),
        title: "Arduino Uno R3, top view",
      };
    case "esp32-devkit":
      return {
        model: buildEsp32DevkitStandalone(),
        callouts: espCallouts(),
        title: "ESP32-DevKitC (38 pins), top view",
      };
    case "at89s52":
      return {
        model: buildDipChip("at89s52"),
        callouts: chipCallouts("at89s52"),
        title: "AT89S52 (8051), top view",
      };
    case "pic18f4550":
      return {
        model: buildDipChip("pic18f4550"),
        callouts: chipCallouts("pic18f4550"),
        title: "PIC18F4550, top view",
      };
  }
}
