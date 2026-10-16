import { type ComponentInstance } from "@/labs/types";

/**
 * 74HC148 8-to-3 priority encoder on a long breadboard, IC at column 20.
 *
 * Board columns used by the simulator's pin map (top side row d / bottom side row g):
 *   top:    I4 20  I5 21  I6 22  I7 23  EI' 24  A2 25  A1 26  GND 27
 *   bottom: VCC 20 A0 21  GS' 22 EO' 23 I3 24   I2 25  I1 26  I0 27
 *
 * Every output is active LOW and sinks an LED from +5 V through 330 Ω, so a lit
 * LED marks a LOW output. Chains: A2, A1 on the top bank at columns 32 and 38;
 * A0, GS', EO' on the bottom bank at columns 32, 38 and 44.
 */
const OUTPUT_CHAINS = [
  { pin: "a2", top: true, col: 32, color: "red" },
  { pin: "a1", top: true, col: 38, color: "red" },
  { pin: "a0", top: false, col: 32, color: "red" },
  { pin: "gs", top: false, col: 38, color: "yellow" },
  { pin: "eo", top: false, col: 44, color: "green" },
] as const;

const INPUT_TIES = [
  { n: 7, col: 8, row: "a" },
  { n: 6, col: 9, row: "a" },
  { n: 5, col: 10, row: "a" },
  { n: 4, col: 11, row: "a" },
  { n: 3, col: 8, row: "j" },
  { n: 2, col: 9, row: "j" },
  { n: 1, col: 10, row: "j" },
  { n: 0, col: 11, row: "j" },
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
  { id: "w_vcc_link", type: "wire", color: "red", from: { board: "bb", rail: "vcc_top", col: 4 }, to: { board: "bb", rail: "vcc_bot", col: 4 } },
  { id: "w_gnd_link", type: "wire", color: "black", from: { board: "bb", rail: "gnd_top", col: 5 }, to: { board: "bb", rail: "gnd_bot", col: 5 } },

  { id: "enc", type: "encoder-8to3", mountedAt: { board: "bb", col: 20, row: "e" } },
  { id: "w_enc_vcc", type: "wire", color: "red", from: { ic: "enc", pin: "vcc" }, to: { board: "bb", rail: "vcc_bot", col: 19 } },
  { id: "w_enc_gnd", type: "wire", color: "black", from: { ic: "enc", pin: "gnd" }, to: { board: "bb", rail: "gnd_top", col: 28 } },

  // ---------------- Enable input ----------------
  { id: "w_ei_gnd", type: "wire", color: "black", from: { ic: "enc", pin: "ei" }, to: { board: "bb", rail: "gnd_top", col: 24 } },
  { id: "w_ei_vcc", type: "wire", color: "red", from: { ic: "enc", pin: "ei" }, to: { board: "bb", rail: "vcc_top", col: 24 } },

  // ---------------- Data inputs I0–I7 ----------------
  ...INPUT_TIES.map(
    (t): ComponentInstance => ({
      id: `w_i${t.n}_enc`,
      type: "wire",
      color: t.n >= 4 ? "orange" : "blue",
      from: { board: "bb", col: t.col, row: t.row },
      to: { ic: "enc", pin: `i${t.n}` },
    }),
  ),

  // ---------------- Output LEDs (current sinks) ----------------
  ...OUTPUT_CHAINS.flatMap((c): ComponentInstance[] => [
    { id: `r_${c.pin}`, type: "resistor", ohms: 330, mountedAt: { board: "bb", col: c.col, row: c.top ? "c" : "h" } },
    { id: `led_${c.pin}`, type: "led", color: c.color, mountedAt: { board: "bb", col: c.col + 3, row: c.top ? "b" : "i" } },
    {
      id: `w_${c.pin}_vcc`,
      type: "wire",
      color: "red",
      from: { board: "bb", rail: c.top ? "vcc_top" : "vcc_bot", col: c.col },
      to: { component: `r_${c.pin}`, end: "p1" },
    },
    {
      id: `w_${c.pin}_out`,
      type: "wire",
      color: "yellow",
      from: { led: `led_${c.pin}`, end: "cathode" },
      to: { ic: "enc", pin: c.pin },
    },
  ]),
];
