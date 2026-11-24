import { type ComponentInstance } from "@/labs/types";

/**
 * Centre-tapped full-wave rectifier.
 * Each half of the secondary is 12 V rms. CT is the load return.
 * D1 anode is on the S1 column, D2 anode on the S2 column.
 * Cathodes meet at column 22.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "t1",
    type: "transformer",
    label: "12-0-12 V",
    secondary: "12-0-12V",
    rating: "2 VA",
    mountedAt: { board: "bb", col: 2, row: "a" },
  },
  {
    id: "w_s1",
    type: "wire",
    color: "red",
    from: { transformer: "t1", pin: "S1" },
    to: { board: "bb", col: 6, row: "a" },
  },
  {
    id: "w_ct",
    type: "wire",
    color: "black",
    from: { transformer: "t1", pin: "CT" },
    to: { board: "bb", rail: "gnd_top", col: 16 },
  },
  {
    id: "w_s2",
    type: "wire",
    color: "blue",
    from: { transformer: "t1", pin: "S2" },
    to: { board: "bb", col: 14, row: "a" },
  },
  {
    id: "d1",
    type: "diode",
    model: "1N4007",
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "d2",
    type: "diode",
    model: "1N4007",
    mountedAt: { board: "bb", col: 14, row: "c" },
  },
  {
    id: "w_d1_pos",
    type: "wire",
    color: "orange",
    from: { component: "d1", end: "p2" },
    to: { board: "bb", col: 22, row: "a" },
  },
  {
    id: "w_d2_pos",
    type: "wire",
    color: "orange",
    from: { component: "d2", end: "p2" },
    to: { board: "bb", col: 22, row: "b" },
  },
  {
    id: "r_load",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 22, row: "c" },
  },
  {
    id: "w_rl_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 25, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 25 },
  },
  {
    id: "c1",
    type: "capacitor",
    capacitance: 100,
    mountedAt: { board: "bb", col: 26, row: "c" },
  },
  {
    id: "w_pos_c",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 22, row: "e" },
    to: { board: "bb", col: 26, row: "a" },
  },
  {
    id: "w_c_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 27, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 27 },
  },
  {
    id: "vm",
    type: "voltmeter",
    label: "Vdc",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { board: "bb", col: 22, row: "d" },
      { board: "bb", rail: "gnd_top", col: 28 },
    ],
  },
  {
    id: "scope",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 22, row: "e" },
      { board: "bb", rail: "gnd_top", col: 20 },
    ],
  },
];
