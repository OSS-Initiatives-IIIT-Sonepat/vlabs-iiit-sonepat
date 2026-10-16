import { type ComponentInstance } from "@/labs/types";

/**
 * 74HC138 3-to-8 decoder on a long breadboard, IC at column 20.
 *
 * Pin columns (top side, row d):    A0 20  A1 21  A2 22  E2' 23  E3' 24  E1 25  Y7 26  GND 27
 * Pin columns (bottom side, row g): VCC 20 Y0 21  Y1 22  Y2 23   Y3 24   Y4 25  Y5 26  Y6 27
 *
 * Outputs are active LOW, so each LED is wired as a current sink:
 * +5 V rail → 330 Ω → LED anode, LED cathode → Yn. The selected output lights its LED.
 * Chains sit at columns 32, 38, 44 and 50 (resistor k..k+3, LED anode k+3, cathode k+4):
 * Y0–Y3 on the top bank, Y4–Y7 on the bottom bank.
 */
const CHAIN_COLS = [32, 38, 44, 50];

function outputChain(n: number): ComponentInstance[] {
  const top = n < 4;
  const k = CHAIN_COLS[n % 4];
  const rail = top ? "vcc_top" : "vcc_bot";
  return [
    { id: `r_y${n}`, type: "resistor", ohms: 330, mountedAt: { board: "bb", col: k, row: top ? "c" : "h" } },
    { id: `led_y${n}`, type: "led", color: top ? "red" : "green", mountedAt: { board: "bb", col: k + 3, row: top ? "b" : "i" } },
    {
      id: `w_y${n}_vcc`,
      type: "wire",
      color: "red",
      from: { board: "bb", rail, col: k },
      to: { component: `r_y${n}`, end: "p1" },
    },
    {
      id: `w_y${n}_out`,
      type: "wire",
      color: top ? "yellow" : "green",
      from: { led: `led_y${n}`, end: "cathode" },
      to: { ic: "dec", pin: `y${n}` },
    },
  ];
}

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

  { id: "dec", type: "decoder-3to8", mountedAt: { board: "bb", col: 20, row: "e" } },
  { id: "w_dec_vcc", type: "wire", color: "red", from: { ic: "dec", pin: "vcc" }, to: { board: "bb", rail: "vcc_bot", col: 19 } },
  { id: "w_dec_gnd", type: "wire", color: "black", from: { ic: "dec", pin: "gnd" }, to: { board: "bb", rail: "gnd_top", col: 28 } },

  // ---------------- Enables ----------------
  { id: "w_en1_vcc", type: "wire", color: "red", from: { ic: "dec", pin: "e1" }, to: { board: "bb", rail: "vcc_top", col: 25 } },
  { id: "w_en1_gnd", type: "wire", color: "black", from: { ic: "dec", pin: "e1" }, to: { board: "bb", rail: "gnd_top", col: 25 } },
  { id: "w_en2_gnd", type: "wire", color: "black", from: { ic: "dec", pin: "e2" }, to: { board: "bb", rail: "gnd_top", col: 23 } },
  { id: "w_en3_gnd", type: "wire", color: "black", from: { ic: "dec", pin: "e3" }, to: { board: "bb", rail: "gnd_top", col: 24 } },

  // ---------------- Address inputs (A0 = LSB) ----------------
  { id: "w_a0_dec", type: "wire", color: "orange", from: { board: "bb", col: 10, row: "a" }, to: { ic: "dec", pin: "a0" } },
  { id: "w_a1_dec", type: "wire", color: "blue", from: { board: "bb", col: 9, row: "a" }, to: { ic: "dec", pin: "a1" } },
  { id: "w_a2_dec", type: "wire", color: "purple", from: { board: "bb", col: 8, row: "a" }, to: { ic: "dec", pin: "a2" } },

  ...Array.from({ length: 8 }, (_, n) => outputChain(n)).flat(),
];
