import { type ComponentInstance } from "@/labs/types";

// Full-wave BRIDGE rectifier.
// Input source (rendered as a generic supply stand-in) -> 4-diode bridge (1N4007)
// -> shared positive node -> load resistor (with DMM across it) -> filter capacitor -> gnd_top.
//
// Node map:
//   a1 = (bb, col 3, row a)   AC terminal 1
//   a2 = (bb, col 4, row b)   AC terminal 2
//   pos = (bb, col 21, row a) shared positive output node (D1 cathode + D2 cathode)
//   neg = gnd_top rail        shared negative/return node (D3 anode + D4 anode + load/cap return)
//
// Each diode spans 4 columns (anode at col, cathode at col+3):
//   D1 5–8, D2 9–12, D3 13–16, D4 17–20.

const bridgeDiode = (id: string, col: number): ComponentInstance => ({
  id,
  type: "diode",
  model: "1N4007",
  mountedAt: { board: "bb", col, row: "c" },
});

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Input source stand-in. Do NOT wire this with `type: 'wire'` —
  // its two terminals are wired straight into the board via `terminals`.
  {
    id: "ac_src",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", col: 3, row: "a" }, // a1
      { board: "bb", col: 4, row: "b" }, // a2
    ],
  },

  // D1: anode = a1, cathode -> pos
  bridgeDiode("d1", 5),
  // D2: anode = a2, cathode -> pos
  bridgeDiode("d2", 9),
  // D3: anode = neg, cathode -> a1
  bridgeDiode("d3", 13),
  // D4: anode = neg, cathode -> a2
  bridgeDiode("d4", 17),

  // Load resistor across the rectified output (spans col 22 -> 25).
  {
    id: "r_load",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 22, row: "c" },
  },

  // Filter/smoothing capacitor in parallel with the load (spans col 26 -> 27).
  {
    id: "c1",
    type: "capacitor",
    capacitance: 100,
    mountedAt: { board: "bb", col: 26, row: "c" },
  },

  // Bench multimeter across the load, reading the DC output voltage.
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 21, row: "a" }, // pos node
      { board: "bb", rail: "gnd_top", col: 29 }, // neg
    ],
  },

  // --- Upper bridge arm: a1 -> D1 -> pos, a2 -> D2 -> pos ---
  {
    id: "w_a1_d1",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 3, row: "a" },
    to: { component: "d1", end: "p1" },
  },
  {
    id: "w_a2_d2",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 4, row: "b" },
    to: { component: "d2", end: "p1" },
  },
  {
    id: "w_d1_pos",
    type: "wire",
    color: "orange",
    from: { component: "d1", end: "p2" },
    to: { board: "bb", col: 21, row: "a" },
  },
  {
    id: "w_d2_pos",
    type: "wire",
    color: "orange",
    from: { component: "d2", end: "p2" },
    to: { board: "bb", col: 21, row: "a" },
  },

  // --- Lower bridge arm: neg -> D3 -> a1, neg -> D4 -> a2 ---
  {
    id: "w_neg_d3",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 13 },
    to: { component: "d3", end: "p1" },
  },
  {
    id: "w_d3_a1",
    type: "wire",
    color: "red",
    from: { component: "d3", end: "p2" },
    to: { board: "bb", col: 3, row: "a" },
  },
  {
    id: "w_neg_d4",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 17 },
    to: { component: "d4", end: "p1" },
  },
  {
    id: "w_d4_a2",
    type: "wire",
    color: "blue",
    from: { component: "d4", end: "p2" },
    to: { board: "bb", col: 4, row: "b" },
  },

  // --- Load + filter across pos/neg ---
  {
    id: "w_pos_rload",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 21, row: "a" },
    to: { component: "r_load", end: "p1" },
  },
  {
    id: "w_rload_neg",
    type: "wire",
    color: "black",
    from: { component: "r_load", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 25 },
  },
  {
    id: "w_pos_c1",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 21, row: "a" },
    to: { component: "c1", end: "p1" },
  },
  {
    id: "w_c1_neg",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 27 },
  },
];
