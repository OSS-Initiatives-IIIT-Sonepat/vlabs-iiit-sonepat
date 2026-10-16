import { type ComponentInstance } from "@/labs/types";

/**
 * 74HC93 4-bit ripple counter on a long breadboard, IC at column 20.
 *
 *   top (row d):    CKB 20  R0(1) 21  R0(2) 22  GND 26
 *   bottom (row g): CKA 20  QD 22     QC 23     QB 24  VCC 25  QA 26
 *
 * Output LEDs (active HIGH, Q → 330 Ω → LED → GND) sit on the bottom bank at
 * columns 32, 38, 44, 50 (QA–QD).
 */
const OUTPUTS = [
  { pin: "qa", col: 32 },
  { pin: "qb", col: 38 },
  { pin: "qc", col: 44 },
  { pin: "qd", col: 50 },
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
      { ic: "cnt", pin: "clk_a" }, //                 OUTPUT -> CKA
      { board: "bb", rail: "gnd_top", col: 13 }, //   GND
    ],
  },
  { id: "w_vcc_link", type: "wire", color: "red", from: { board: "bb", rail: "vcc_top", col: 3 }, to: { board: "bb", rail: "vcc_bot", col: 3 } },
  { id: "w_gnd_link", type: "wire", color: "black", from: { board: "bb", rail: "gnd_top", col: 4 }, to: { board: "bb", rail: "gnd_bot", col: 4 } },

  { id: "cnt", type: "counter-4bit-async", mountedAt: { board: "bb", col: 20, row: "e" } },
  { id: "w_cnt_vcc", type: "wire", color: "red", from: { ic: "cnt", pin: "vcc" }, to: { board: "bb", rail: "vcc_bot", col: 25 } },
  { id: "w_cnt_gnd", type: "wire", color: "black", from: { ic: "cnt", pin: "gnd" }, to: { board: "bb", rail: "gnd_top", col: 27 } },

  // ---------------- Reset inputs ----------------
  { id: "w_r01_gnd", type: "wire", color: "black", from: { ic: "cnt", pin: "r01" }, to: { board: "bb", rail: "gnd_top", col: 21 } },
  { id: "w_r02_gnd", type: "wire", color: "black", from: { ic: "cnt", pin: "r02" }, to: { board: "bb", rail: "gnd_top", col: 22 } },
  { id: "w_r01_qb", type: "wire", color: "blue", from: { ic: "cnt", pin: "r01" }, to: { ic: "cnt", pin: "qb" } },
  { id: "w_r02_qd", type: "wire", color: "purple", from: { ic: "cnt", pin: "r02" }, to: { ic: "cnt", pin: "qd" } },

  // ---------------- QA → CKB cascade ----------------
  { id: "w_qa_clkb", type: "wire", color: "orange", from: { ic: "cnt", pin: "qa" }, to: { ic: "cnt", pin: "clk_b" } },

  // ---------------- Output LEDs ----------------
  ...OUTPUTS.flatMap((o): ComponentInstance[] => [
    { id: `r_${o.pin}`, type: "resistor", ohms: 330, mountedAt: { board: "bb", col: o.col, row: "h" } },
    { id: `led_${o.pin}`, type: "led", color: "red", mountedAt: { board: "bb", col: o.col + 3, row: "i" } },
    { id: `w_${o.pin}_r`, type: "wire", color: "green", from: { ic: "cnt", pin: o.pin }, to: { component: `r_${o.pin}`, end: "p1" } },
    {
      id: `w_${o.pin}_gnd`,
      type: "wire",
      color: "black",
      from: { led: `led_${o.pin}`, end: "cathode" },
      to: { board: "bb", rail: "gnd_bot", col: o.col + 4 },
    },
  ]),
];
