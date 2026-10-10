import { type ComponentInstance } from "@/labs/types";

/**
 * MOSFET common source amplifier (2N7000)
 *
 * Top rails    : V_DD (psu, + on vcc_top, - on gnd_top)
 * Bottom rails : V_GG (vgg, + on vcc_bot, - on gnd_bot) - grounds linked by w_gnd_link
 *
 * Column map (row c unless noted):
 *   2-5   r_g (100k)        gate bias resistor
 *   6-7   c_in (1 uF)       input coupling capacitor
 *   10-12 m1 (G, D, S)      2N7000
 *   15-18 r_d (1k)          drain resistor
 *   20-21 c_out (1 uF)      output coupling capacitor
 *   24-27 r_l (10k)         load resistor
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // --- Bench instruments (no wires: use terminals / probes) ---
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
    id: "vgg",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", rail: "vcc_bot", col: 2 },
      { board: "bb", rail: "gnd_bot", col: 2 },
    ],
  },
  {
    id: "am_d",
    type: "ammeter",
    mountedAt: { board: "bb", col: 30, row: "a" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 15 }, // + (series in, from V_DD)
      { board: "bb", col: 15, row: "a" }, //          - (series out, to R_D)
    ],
  },
  {
    id: "vm_gs",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 10, row: "d" }, //          + gate
      { board: "bb", rail: "gnd_top", col: 10 }, //   - ground
    ],
  },
  {
    id: "vm_ds",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "h" },
    probes: [
      { board: "bb", col: 11, row: "d" }, //          + drain
      { board: "bb", rail: "gnd_top", col: 11 }, //   - ground
    ],
  },
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 6, row: "a" }, //           OUTPUT -> c_in
      { board: "bb", rail: "gnd_top", col: 6 }, //    GND
    ],
  },
  {
    id: "cro",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 20, row: "e" },
    probes: [
      { board: "bb", col: 21, row: "a" }, //          CH1 -> output after c_out
      { board: "bb", rail: "gnd_top", col: 21 }, //   GND
    ],
  },

  // --- Active device ---
  {
    id: "m1",
    type: "n-mosfet",
    mountedAt: { board: "bb", col: 10, row: "c" }, // G=10, D=11, S=12
  },

  // --- Passives ---
  {
    id: "r_g",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 2, row: "c" },
  },
  {
    id: "r_d",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "r_l",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 24, row: "c" },
  },
  {
    id: "c_in",
    type: "capacitor",
    capacitance: 1,
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "c_out",
    type: "capacitor",
    capacitance: 1,
    mountedAt: { board: "bb", col: 20, row: "c" },
  },

  // --- Wires ---
  {
    id: "w_gnd_link",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 8 },
    to: { board: "bb", rail: "gnd_bot", col: 8 },
  },
  {
    id: "w_src_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 12, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },
  {
    id: "w_rd_drain",
    type: "wire",
    color: "green",
    from: { component: "r_d", end: "p2" },
    to: { board: "bb", col: 11, row: "b" },
  },
  {
    id: "w_vgg_rg",
    type: "wire",
    color: "orange",
    from: { board: "bb", rail: "vcc_bot", col: 3 },
    to: { component: "r_g", end: "p1" },
  },
  {
    id: "w_rg_gate",
    type: "wire",
    color: "orange",
    from: { component: "r_g", end: "p2" },
    to: { board: "bb", col: 10, row: "a" },
  },
  {
    id: "w_cin_gate",
    type: "wire",
    color: "blue",
    from: { component: "c_in", end: "p2" },
    to: { board: "bb", col: 10, row: "b" },
  },
  {
    id: "w_drain_cout",
    type: "wire",
    color: "yellow",
    from: { board: "bb", col: 11, row: "a" },
    to: { component: "c_out", end: "p1" },
  },
  {
    id: "w_cout_rl",
    type: "wire",
    color: "yellow",
    from: { component: "c_out", end: "p2" },
    to: { component: "r_l", end: "p1" },
  },
  {
    id: "w_rl_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_l", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 27 },
  },
];
