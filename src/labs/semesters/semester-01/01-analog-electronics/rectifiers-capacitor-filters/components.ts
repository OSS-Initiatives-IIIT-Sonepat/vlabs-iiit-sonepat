import { type ComponentInstance } from "@/labs/types";

// Full-wave bridge (4 × 1N4007) with a swappable filter capacitor.
// Same board layout as 06-full-wave-rectifier:
//   a1 = (col 3, row a), a2 = (col 4, row b)  AC terminals
//   pos = (col 21, row a)                     bridge (+) output
//   neg = gnd_top rail                        bridge (−) return
// Diodes span col (anode) → col+3 (cathode): D1 5–8, D2 9–12, D3 13–16, D4 17–20.

const bridgeDiode = (id: string, col: number): ComponentInstance => ({
  id,
  type: "diode",
  model: "1N4007",
  mountedAt: { board: "bb", col, row: "c" },
});

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "ac_src",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", col: 3, row: "a" },
      { board: "bb", col: 4, row: "b" },
    ],
  },

  bridgeDiode("d1", 5),
  bridgeDiode("d2", 9),
  bridgeDiode("d3", 13),
  bridgeDiode("d4", 17),

  {
    id: "r_load",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 22, row: "c" },
  },
  {
    id: "c1",
    type: "capacitor",
    capacitance: 10,
    mountedAt: { board: "bb", col: 26, row: "c" },
  },

  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 21, row: "a" },
      { board: "bb", rail: "gnd_top", col: 29 },
    ],
  },

  // Upper arm: a1 → D1 → pos, a2 → D2 → pos
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

  // Lower arm: neg → D3 → a1, neg → D4 → a2
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

  // Load and filter across pos/neg
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
    color: "green",
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
