import { type ComponentInstance } from "@/labs/types";

/**
 * Maximum power transfer. Vs = 9 V, Rs = 100 Ω.
 * The load is one of 47 Ω, 100 Ω, 220 Ω, all in the same holes.
 * The ammeter is the only link from Rs to the load.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "psu",
    type: "dc-jack",
    label: "Vs",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 3 },
      { board: "bb", rail: "gnd_top", col: 3 },
    ],
  },
  {
    id: "rs",
    type: "resistor",
    ohms: 100,
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "w_v_rs",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 6 },
    to: { component: "rs", end: "p1" },
  },
  {
    id: "rl100",
    type: "resistor",
    ohms: 100,
    mountedAt: { board: "bb", col: 16, row: "c" },
  },
  {
    id: "rl47",
    type: "resistor",
    ohms: 47,
    mountedAt: { board: "bb", col: 16, row: "c" },
  },
  {
    id: "rl220",
    type: "resistor",
    ohms: 220,
    mountedAt: { board: "bb", col: 16, row: "c" },
  },
  {
    id: "w_rl_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 19, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 19 },
  },
  {
    id: "am",
    type: "ammeter",
    label: "IL",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 9, row: "a" },
      { board: "bb", col: 16, row: "a" },
    ],
  },
  {
    id: "vm",
    type: "voltmeter",
    label: "VL",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 16, row: "e" },
      { board: "bb", rail: "gnd_top", col: 24 },
    ],
  },
];
