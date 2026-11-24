import { dipHole, type DipChip } from "@/components/dev-boards/dip-chips";
import { hole, LONG_COLS, TOP_Y } from "@/labs/coords";
import { type StepMarker } from "@/labs/LabScene";
import {
  type ComponentInstance,
  type IcPin,
  type LedColor,
  type PinRef,
  type RailPin,
  type Row,
  type TiePin,
  type WireColor,
} from "@/labs/types";

// ── The chip bench of the 8051 and PIC18 experiments ─────────────────────
// A long breadboard with a 5 V bench supply on its top rails, the chip seated
// across the centre gap with pin 1 in column 3, and the chip's minimal system
// built from real parts:
//
//  8051 (AT89S52): VCC (40) and EA (31) to +5 V, GND (20) to ground, an
//    11.0592 MHz crystal on XTAL1/XTAL2 (19/18) with a 22 pF capacitor from
//    each to ground, and a power-on reset on RST (9): 10 µF to +5 V and
//    10 kΩ to ground.
//  PIC18F4550: VDD (11, 32) and VSS (12, 31) with a 100 nF capacitor across
//    each pair, MCLR (1) pulled up to +5 V through 10 kΩ. It runs from its
//    internal oscillator, so it needs no crystal.
//
// Columns 3 to 30 hold the chip and its minimal system; the parts of each
// experiment go in columns 34 to 58. Both rails of the board carry the
// supply: two jumpers at the right end join the top rails to the bottom ones.

type Part = ComponentInstance;

export const BOARD = "bb";
const CHIP_COL = 3;

export const tie = (col: number, row: Row): TiePin => ({
  board: BOARD,
  col,
  row,
});
export const rail = (r: RailPin["rail"], col: number): RailPin => ({
  board: BOARD,
  rail: r,
  col,
});
/** A chip pin, `reach` holes away from its leg (1 is the hole next to it). */
export const pin = (ic: string, name: string, reach = 1): IcPin => ({
  ic,
  pin: reach === 1 ? name : `${name}:${reach}`,
});
export const wire = (
  id: string,
  color: WireColor,
  from: PinRef,
  to: PinRef,
): Part => ({ id, type: "wire", color, from, to });
export const resistor = (
  id: string,
  ohms: number,
  col: number,
  row: Row,
): Part => ({
  id,
  type: "resistor",
  ohms,
  mountedAt: { board: BOARD, col, row },
});
/** `uf` in microfarads (22 pF is 22e-6). */
export const capacitor = (
  id: string,
  uf: number,
  col: number,
  row: Row,
): Part => ({
  id,
  type: "capacitor",
  capacitance: uf,
  mountedAt: { board: BOARD, col, row },
});
export const led = (
  id: string,
  color: LedColor,
  col: number,
  row: Row,
): Part => ({
  id,
  type: "led",
  color,
  mountedAt: { board: BOARD, col, row },
});

// ── Supply ───────────────────────────────────────────────────────────────

export const SUPPLY_PARTS: Part[] = [
  { id: BOARD, type: "long-breadboard" },
  {
    id: "psu",
    type: "dc-jack",
    label: "5 V",
    mountedAt: { board: BOARD, col: 1, row: "a" },
    terminals: [rail("vcc_top", 1), rail("gnd_top", 2)],
  },
  wire("w_rail_v", "red", rail("vcc_top", 59), rail("vcc_bot", 59)),
  wire("w_rail_g", "black", rail("gnd_top", 60), rail("gnd_bot", 60)),
];
export const SUPPLY = ["bb", "psu", "w_rail_v", "w_rail_g"];

const chipPart = (chip: DipChip, id = "u1", col = CHIP_COL): Part => ({
  id,
  type: "dip-mcu",
  chip,
  mountedAt: { board: BOARD, col, row: "e" },
});

// ── 8051 minimal system ──────────────────────────────────────────────────

export const SYS_8051_PARTS: Part[] = [
  chipPart("at89s52"),
  // Supply.
  wire("w_vcc", "red", pin("u1", "VCC"), rail("vcc_top", 3)),
  wire("w_ea", "red", pin("u1", "EA"), rail("vcc_top", 12)),
  wire("w_gnd", "black", pin("u1", "GND", 2), rail("gnd_bot", 22)),
  // Clock.
  {
    id: "x1",
    type: "crystal",
    mhz: 11.0592,
    mountedAt: { board: BOARD, col: 20, row: "j" },
  },
  capacitor("c_x1", 22e-6, 21, "h"),
  wire("w_x2", "white", pin("u1", "XTAL2"), tie(24, "h")),
  capacitor("c_x2", 22e-6, 24, "i"),
  wire("w_x2g", "black", tie(25, "h"), rail("gnd_bot", 25)),
  // Power-on reset.
  wire("w_rst", "yellow", pin("u1", "RST"), tie(27, "h")),
  resistor("r_rst", 10000, 27, "i"),
  wire("w_rst_g", "black", tie(30, "h"), rail("gnd_bot", 30)),
  capacitor("c_rst", 10, 26, "j"),
  wire("w_rst_v", "red", tie(26, "i"), rail("vcc_bot", 26)),
];
export const CHIP = ["u1"];
export const POWER_8051 = ["w_vcc", "w_ea", "w_gnd"];
export const CLOCK_8051 = ["x1", "c_x1", "w_x2", "c_x2", "w_x2g"];
export const RESET_8051 = ["w_rst", "r_rst", "w_rst_g", "c_rst", "w_rst_v"];
export const SYSTEM_8051 = [
  ...CHIP,
  ...POWER_8051,
  ...CLOCK_8051,
  ...RESET_8051,
];

// ── PIC18F4550 minimal system ────────────────────────────────────────────

export const SYS_PIC_PARTS: Part[] = [
  chipPart("pic18f4550"),
  wire("w_vdd", "red", pin("u1", "VDD"), rail("vcc_bot", 13)),
  wire("w_vss", "black", pin("u1", "VSS"), rail("gnd_bot", 14)),
  capacitor("c_dec1", 0.1, 13, "j"),
  wire("w_vdd2", "red", pin("u1", "VDD2"), rail("vcc_top", 11)),
  wire("w_vss2", "black", pin("u1", "VSS2"), rail("gnd_top", 12)),
  capacitor("c_dec2", 0.1, 11, "a"),
  wire("w_mclr", "yellow", pin("u1", "MCLR"), tie(27, "h")),
  resistor("r_mclr", 10000, 27, "i"),
  wire("w_mclr_v", "red", tie(30, "h"), rail("vcc_bot", 30)),
];
export const POWER_PIC = [
  "w_vdd",
  "w_vss",
  "c_dec1",
  "w_vdd2",
  "w_vss2",
  "c_dec2",
];
export const RESET_PIC = ["w_mclr", "r_mclr", "w_mclr_v"];
export const SYSTEM_PIC = [...CHIP, ...POWER_PIC, ...RESET_PIC];

// ── LEDs on port pins ────────────────────────────────────────────────────
// Channel k sits in the top bank: a resistor in row c from column 34 + 5k and
// an LED whose anode meets its right leg.
//  - Source (PIC18): the port pin drives the 330 Ω resistor and the cathode
//    goes to ground. A HIGH pin lights the LED.
//  - Sink (8051): the 470 Ω resistor's free end goes to +5 V and the cathode
//    to the port pin. A LOW pin lights the LED. An 8051 pin sinks about
//    10 mA, but its HIGH level is only a weak pull-up, too weak for an LED.

const LED_COLORS: LedColor[] = ["red", "yellow", "green", "blue"];
const WIRE_COLORS: WireColor[] = ["orange", "yellow", "green", "blue"];

export function ledChannel(
  k: number,
  from: IcPin,
  ids = { wire: `w_led${k}`, r: `r${k}`, led: `led${k}`, k: `w_k${k}` },
  mode: "source" | "sink" = "source",
): Part[] {
  const c = 34 + 5 * k;
  if (mode === "sink")
    return [
      resistor(ids.r, 470, c, "c"),
      led(ids.led, LED_COLORS[k % 4], c + 3, "c"),
      wire(ids.k, "red", tie(c, "a"), rail("vcc_top", c)),
      wire(ids.wire, WIRE_COLORS[k % 4], from, tie(c + 4, "a")),
    ];
  return [
    wire(ids.wire, WIRE_COLORS[k % 4], from, tie(c, "a")),
    resistor(ids.r, 330, c, "c"),
    led(ids.led, LED_COLORS[k % 4], c + 3, "c"),
    wire(
      ids.k,
      "black",
      { led: ids.led, end: "cathode" },
      rail("gnd_top", c + 4),
    ),
  ];
}
export const ledIds = (k: number) => [
  `w_led${k}`,
  `r${k}`,
  `led${k}`,
  `w_k${k}`,
];

// ── Pointers for the tours ───────────────────────────────────────────────

/** Arrow down onto a chip leg (`reach` 0) or a hole beside it. */
export function markPin(chip: DipChip, name: string, reach = 0): StepMarker {
  const h = dipHole(chip, CHIP_COL, name, reach);
  const p = hole(h.col, h.row, LONG_COLS);
  return { pos: [p.x, TOP_Y + (reach ? 0.02 : 0.42), p.z], dir: [0, -1, 0] };
}

/** Arrow down onto any breadboard hole. */
export function markHole(col: number, row: Row, lift = 0.02): StepMarker {
  const p = hole(col, row, LONG_COLS);
  return { pos: [p.x, TOP_Y + lift, p.z], dir: [0, -1, 0] };
}
