import { type ComponentInstance } from "@/labs/types";

/**
 * 1-bit Full Adder — 60-column board.
 *
 *   Sum  = A XOR B XOR Cin        Cout = (A XOR B)·Cin + A·B
 *
 * Column map (each IC = 7 cols):
 *   cols 1-3     : input tie-points A (col 1), B (col 2), Cin (col 3)
 *   cols  5-11   : xor1   (A=5,  B=6,  Y=7)
 *   cols 14-20   : and1   (A=14, B=15, Y=16)
 *   cols 23-29   : xor2   (A=23, B=24, Y=25)
 *   cols 32-38   : and2   (A=32, B=33, Y=34)
 *   cols 41-47   : or1    (A=41, B=42, Y=43)
 *   cols 50-57   : output stage (resistor + LED pairs, row c)
 *
 * Power scheme:
 *   psu (dc-jack) terminals -> vcc_top col 1 / gnd_top col 1 (instrument: no wires)
 *   w_rail_link : vcc_top col 59 -> vcc_bot col 59, so the bottom rail carries +5 V
 *   Every gate sits on row e, so per netlist.ts registerDip14Logic():
 *     VCC = tie point (col c,   row f)   -> vcc_bot rail   [purple]
 *     GND = tie point (col c+6, row e)   -> gnd_top rail   [black]
 *   LED cathodes -> gnd_top at cols 53 / 57.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "long-breadboard" },

  // ── 5 V supply (instrument: uses terminals, never wires) ──────
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },
  {
    id: "xor1",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 5, row: "e" },
  },
  {
    id: "and1",
    type: "and-gate",
    mountedAt: { board: "bb", col: 14, row: "e" },
  },
  {
    id: "xor2",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 23, row: "e" },
  },
  {
    id: "and2",
    type: "and-gate",
    mountedAt: { board: "bb", col: 32, row: "e" },
  },
  {
    id: "or1",
    type: "or-gate",
    mountedAt: { board: "bb", col: 41, row: "e" },
  },
  {
    id: "r_sum",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 50, row: "c" },
  },
  {
    id: "led_sum",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 52, row: "c" },
  },
  {
    id: "r_cout",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 54, row: "c" },
  },
  {
    id: "led_cout",
    type: "led",
    color: "yellow",
    mountedAt: { board: "bb", col: 56, row: "c" },
  },
  {
    id: "w_a_xor1",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 1, row: "a" },
    to: { ic: "xor1", pin: "A" },
  },
  {
    id: "w_a_and1",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 1, row: "b" },
    to: { ic: "and1", pin: "A" },
  },
  {
    id: "w_b_xor1",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 2, row: "a" },
    to: { ic: "xor1", pin: "B" },
  },
  {
    id: "w_b_and1",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 2, row: "b" },
    to: { ic: "and1", pin: "B" },
  },
  {
    id: "w_x1_xor2",
    type: "wire",
    color: "white",
    from: { ic: "xor1", pin: "Y" },
    to: { ic: "xor2", pin: "A" },
  },
  {
    id: "w_x1_and2",
    type: "wire",
    color: "white",
    from: { ic: "xor1", pin: "Y" },
    to: { ic: "and2", pin: "B" },
  },
  {
    id: "w_cin_xor2",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "xor2", pin: "B" },
  },
  {
    id: "w_cin_and2",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 3, row: "b" },
    to: { ic: "and2", pin: "A" },
  },
  {
    id: "w_and1_or1",
    type: "wire",
    color: "white",
    from: { ic: "and1", pin: "Y" },
    to: { ic: "or1", pin: "A" },
  },
  {
    id: "w_and2_or1",
    type: "wire",
    color: "white",
    from: { ic: "and2", pin: "Y" },
    to: { ic: "or1", pin: "B" },
  },
  {
    id: "w_xor2_r",
    type: "wire",
    color: "green",
    from: { ic: "xor2", pin: "Y" },
    to: { component: "r_sum", end: "p1" },
  },
  {
    id: "w_r_led_sum",
    type: "wire",
    color: "green",
    from: { component: "r_sum", end: "p2" },
    to: { led: "led_sum", end: "anode" },
  },
  {
    id: "w_or1_r",
    type: "wire",
    color: "yellow",
    from: { ic: "or1", pin: "Y" },
    to: { component: "r_cout", end: "p1" },
  },
  {
    id: "w_r_led_cout",
    type: "wire",
    color: "yellow",
    from: { component: "r_cout", end: "p2" },
    to: { led: "led_cout", end: "anode" },
  },
  {
    id: "w_gnd_sum",
    type: "wire",
    color: "black",
    from: { led: "led_sum", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 53 },
  },
  {
    id: "w_gnd_cout",
    type: "wire",
    color: "black",
    from: { led: "led_cout", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 57 },
  },

  // ── Power distribution ────────────────────────────────────────
  // Link the top +5 V rail to the bottom rail so each gate's VCC pin (which
  // sits in the bottom half at row f) can reach the supply.
  {
    id: "w_rail_link",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_top", col: 59 },
    to: { board: "bb", rail: "vcc_bot", col: 59 },
  },

  // xor1 power
  {
    id: "w_vcc_xor1",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 5 },
    to: { board: "bb", col: 5, row: "f" },
  },
  {
    id: "w_gnd_xor1",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 11, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 11 },
  },

  // and1 power
  {
    id: "w_vcc_and1",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 14 },
    to: { board: "bb", col: 14, row: "f" },
  },
  {
    id: "w_gnd_and1",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 20, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 20 },
  },

  // xor2 power
  {
    id: "w_vcc_xor2",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 23 },
    to: { board: "bb", col: 23, row: "f" },
  },
  {
    id: "w_gnd_xor2",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 29, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 29 },
  },

  // and2 power
  {
    id: "w_vcc_and2",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 32 },
    to: { board: "bb", col: 32, row: "f" },
  },
  {
    id: "w_gnd_and2",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 38, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 38 },
  },

  // or1 power
  {
    id: "w_vcc_or1",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 41 },
    to: { board: "bb", col: 41, row: "f" },
  },
  {
    id: "w_gnd_or1",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 47, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 47 },
  },
];
