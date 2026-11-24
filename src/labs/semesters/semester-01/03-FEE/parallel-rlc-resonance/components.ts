import { type ComponentInstance } from "@/labs/types";

/**
 * Parallel RLC. L = 10 mH and R share columns 10–13, so they are in parallel.
 * C sits at columns 16–17 and is tied across the same nodes.
 * The line ammeter is the only path from the generator to the tank.
 * am_c replaces w_node_c when the capacitor branch current is measured.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "fg",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { board: "bb", col: 4, row: "a" },
      { board: "bb", rail: "gnd_top", col: 4 },
    ],
  },
  {
    id: "scope",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 10, row: "e" },
      { board: "bb", rail: "gnd_top", col: 20 },
    ],
  },
  {
    id: "am",
    type: "ammeter",
    label: "I",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 4, row: "c" },
      { board: "bb", col: 10, row: "b" },
    ],
  },
  {
    id: "am_c",
    type: "ammeter",
    label: "IC",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", col: 10, row: "d" },
      { board: "bb", col: 16, row: "a" },
    ],
  },
  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "r470",
    type: "resistor",
    ohms: 470,
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "l1",
    type: "inductor",
    henrys: 0.01,
    mountedAt: { board: "bb", col: 10, row: "a" },
  },
  {
    id: "c1",
    type: "capacitor",
    capacitance: 0.1,
    mountedAt: { board: "bb", col: 16, row: "c" },
  },
  {
    id: "c22",
    type: "capacitor",
    capacitance: 0.22,
    mountedAt: { board: "bb", col: 16, row: "c" },
  },
  {
    id: "w_tank_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 13, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },
  {
    id: "w_c_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 17, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 17 },
  },
  {
    id: "w_node_c",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 10, row: "d" },
    to: { board: "bb", col: 16, row: "e" },
  },
];
