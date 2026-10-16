import { type ComponentInstance } from "@/labs/types";

/**
 * 74HC161 synchronous 4-bit counter on a long breadboard, IC at column 16.
 *
 *   top (row d):    CLR' 16  CLK 17  D0 18  D1 19  D2 20  D3 21  ENP 22  GND 23
 *   bottom (row g): VCC 16   Q0 17   Q1 18  Q2 19  Q3 20  RCO 21 ENT 22  LD' 23
 *
 * A 74HC00 at column 5 provides LD' = (Q3·Q0)' for the MOD-10 part.
 * Output LEDs (active HIGH, Q → 330 Ω → LED → GND) sit on the bottom bank at
 * columns 30, 36, 42, 48 (Q0–Q3) and 54 (RCO).
 */
const OUTPUTS = [
  { pin: "q0", col: 30, color: "red" },
  { pin: "q1", col: 36, color: "red" },
  { pin: "q2", col: 42, color: "red" },
  { pin: "q3", col: 48, color: "red" },
  { pin: "rco", col: 54, color: "yellow" },
] as const;

export const components: ComponentInstance[] = [
  { id: "bb", type: "long-breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 2 },
      { board: "bb", rail: "gnd_top", col: 2 },
    ],
  },
  {
    id: "fg",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { ic: "cnt", pin: "clk" }, //                   OUTPUT -> CLK
      { board: "bb", rail: "gnd_top", col: 13 }, //   GND
    ],
  },
  { id: "w_vcc_link", type: "wire", color: "red", from: { board: "bb", rail: "vcc_top", col: 3 }, to: { board: "bb", rail: "vcc_bot", col: 3 } },
  { id: "w_gnd_link", type: "wire", color: "black", from: { board: "bb", rail: "gnd_top", col: 4 }, to: { board: "bb", rail: "gnd_bot", col: 4 } },

  { id: "cnt", type: "counter-4bit-sync", mountedAt: { board: "bb", col: 16, row: "e" } },
  { id: "w_cnt_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "vcc" }, to: { board: "bb", rail: "vcc_bot", col: 15 } },
  { id: "w_cnt_gnd", type: "wire", color: "black", from: { ic: "cnt", pin: "gnd" }, to: { board: "bb", rail: "gnd_top", col: 24 } },

  // ---------------- Control inputs ----------------
  { id: "w_clr_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "clr_bar" }, to: { board: "bb", rail: "vcc_top", col: 16 } },
  { id: "w_clr_gnd", type: "wire", color: "black", from: { ic: "cnt", pin: "clr_bar" }, to: { board: "bb", rail: "gnd_top", col: 15 } },
  { id: "w_enp_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "enp" }, to: { board: "bb", rail: "vcc_top", col: 22 } },
  { id: "w_ent_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "ent" }, to: { board: "bb", rail: "vcc_bot", col: 22 } },
  { id: "w_ld_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "ld_bar" }, to: { board: "bb", rail: "vcc_bot", col: 23 } },
  ...[0, 1, 2, 3].map(
    (n): ComponentInstance => ({
      id: `w_d${n}_gnd`,
      type: "wire",
      color: "black",
      from: { ic: "cnt", pin: `d${n}` },
      to: { board: "bb", rail: "gnd_top", col: 18 + n },
    }),
  ),

  // ---------------- Output LEDs ----------------
  ...OUTPUTS.flatMap((o): ComponentInstance[] => [
    { id: `r_${o.pin}`, type: "resistor", ohms: 330, mountedAt: { board: "bb", col: o.col, row: "h" } },
    { id: `led_${o.pin}`, type: "led", color: o.color, mountedAt: { board: "bb", col: o.col + 3, row: "i" } },
    {
      id: `w_${o.pin}_r`,
      type: "wire",
      color: o.pin === "rco" ? "yellow" : "green",
      from: { ic: "cnt", pin: o.pin },
      to: { component: `r_${o.pin}`, end: "p1" },
    },
    {
      id: `w_${o.pin}_gnd`,
      type: "wire",
      color: "black",
      from: { led: `led_${o.pin}`, end: "cathode" },
      to: { board: "bb", rail: "gnd_bot", col: o.col + 4 },
    },
  ]),

  // ---------------- MOD-10 decode: LD' = (Q3·Q0)' ----------------
  { id: "nand", type: "nand-gate", mountedAt: { board: "bb", col: 5, row: "e" } },
  { id: "w_nand_vcc", type: "wire", color: "red", from: { ic: "nand", pin: "VCC" }, to: { board: "bb", rail: "vcc_bot", col: 5 } },
  { id: "w_nand_gnd", type: "wire", color: "black", from: { ic: "nand", pin: "GND" }, to: { board: "bb", rail: "gnd_top", col: 11 } },
  { id: "w_q3_nand", type: "wire", color: "blue", from: { ic: "cnt", pin: "q3" }, to: { ic: "nand", pin: "1A" } },
  { id: "w_q0_nand", type: "wire", color: "purple", from: { ic: "cnt", pin: "q0" }, to: { ic: "nand", pin: "1B" } },
  { id: "w_ld_nand", type: "wire", color: "orange", from: { ic: "nand", pin: "1Y" }, to: { ic: "cnt", pin: "ld_bar" } },
];
