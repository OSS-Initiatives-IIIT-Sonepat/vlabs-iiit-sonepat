import { type ComponentInstance } from "@/labs/types";

/**
 * Series RLC: FG → L → C → R → ground, CRO across R (VR is proportional to I).
 *
 * Column map (top bank):
 *   5–8   l1 (row c)      8–9  c1 (row a)      9–12  r1 (row c), p2 to ground
 * Column 8 joins L and C, column 9 joins C and R (the CRO node).
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "fg",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { component: "l1", end: "p1" }, //              OUTPUT -> L
      { board: "bb", rail: "gnd_top", col: 3 }, //    GND
    ],
  },
  {
    id: "scope",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 9, row: "d" }, //           CH1 -> VR
      { board: "bb", rail: "gnd_top", col: 15 }, //   GND
    ],
  },
  {
    id: "vm_c",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 8, row: "e" }, //           + L–C node
      { board: "bb", col: 9, row: "e" }, //           − C–R node
    ],
  },

  { id: "l1", type: "inductor", henrys: 0.01, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "c1", type: "capacitor", capacitance: 0.1, mountedAt: { board: "bb", col: 8, row: "a" } },
  { id: "r1", type: "resistor", ohms: 100, mountedAt: { board: "bb", col: 9, row: "c" } },
  {
    id: "w_r_gnd",
    type: "wire",
    color: "black",
    from: { component: "r1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },
];
