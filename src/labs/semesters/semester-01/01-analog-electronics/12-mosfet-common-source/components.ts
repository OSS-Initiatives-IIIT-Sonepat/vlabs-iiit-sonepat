import { type ComponentInstance } from "@/labs/types";

/**
 * MOSFET common source amplifier (2N7000).
 *
 * 2N7000 flat face front, legs S-G-D at cols 10-11-12 (row c).
 *   R_G  (100 kΩ) cols 8-11 : col 8 ← V_GG (+), other end on the gate
 *   R_D  (1 kΩ)   cols 9-12 : col 9 ← V_DD through the I_D ammeter, other end on the drain
 *   C_out (1 µF)  cols 12-13: + on the drain, − on the output column 13
 *   R_L  (10 kΩ)  cols 13-16: output → col 16 → GND
 *   C_in (1 µF)   cols 5-6  : + jumpered to the gate, − to the function generator
 *   source col 10 → GND
 * Both supplies return to the top GND rail.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // --- Bench instruments ---
  {
    id: "psu",
    type: "dc-jack",
    label: "V_DD",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 2 },
      { board: "bb", rail: "gnd_top", col: 2 },
    ],
  },
  {
    id: "vgg",
    type: "dc-jack",
    label: "V_GG",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", col: 8, row: "b" },
      { board: "bb", rail: "gnd_top", col: 4 },
    ],
  },
  {
    id: "am_d",
    type: "ammeter",
    mountedAt: { board: "bb", col: 30, row: "a" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 9 },
      { board: "bb", col: 9, row: "a" },
    ],
  },
  {
    id: "vm_gs",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 11, row: "d" },
      { board: "bb", col: 10, row: "d" },
    ],
  },
  {
    id: "vm_ds",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "h" },
    probes: [
      { board: "bb", col: 12, row: "e" },
      { board: "bb", col: 10, row: "e" },
    ],
  },
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 6, row: "a" },
      { board: "bb", rail: "gnd_top", col: 6 },
    ],
  },
  {
    id: "cro",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 20, row: "e" },
    probes: [
      { board: "bb", col: 13, row: "b" },
      { board: "bb", rail: "gnd_top", col: 14 },
    ],
  },

  // --- Active device ---
  { id: "m1", type: "n-mosfet", mountedAt: { board: "bb", col: 11, row: "c" } },

  // --- Passives ---
  {
    id: "r_g",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 8, row: "a" },
  },
  {
    id: "r_d",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 9, row: "b" },
  },
  {
    id: "r_l",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 13, row: "a" },
  },
  {
    id: "c_in",
    type: "capacitor",
    capacitance: 1,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },
  {
    id: "c_out",
    type: "capacitor",
    capacitance: 1,
    mountedAt: { board: "bb", col: 12, row: "d" },
  },

  // --- Wires ---
  {
    id: "w_src_gnd",
    type: "wire",
    color: "black",
    from: { ic: "m1", pin: "S" },
    to: { board: "bb", rail: "gnd_top", col: 10 },
  },
  {
    id: "w_cin_gate",
    type: "wire",
    color: "blue",
    from: { component: "c_in", end: "p1" },
    to: { ic: "m1", pin: "G" },
  },
  {
    id: "w_rl_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_l", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 16 },
  },
];
