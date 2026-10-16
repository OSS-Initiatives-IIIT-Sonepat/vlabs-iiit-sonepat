import { type ComponentInstance } from "@/labs/types";

/**
 * Series RC driven by a 0–5 V square wave, CRO across the capacitor.
 *
 * Column map (top bank):
 *   5–8   r_10k / r_4k7 (row c, only one is shown at a time)
 *   8–9   c1 (row a), p2 to ground
 * Column 8 is the capacitor node Vc.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "fg",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { board: "bb", col: 5, row: "d" }, //           OUTPUT -> R
      { board: "bb", rail: "gnd_top", col: 3 }, //    GND
    ],
  },
  {
    id: "scope",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 8, row: "d" }, //           CH1 -> Vc
      { board: "bb", rail: "gnd_top", col: 12 }, //   GND
    ],
  },

  { id: "r_10k", type: "resistor", ohms: 10000, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "r_4k7", type: "resistor", ohms: 4700, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "c1", type: "capacitor", capacitance: 0.1, mountedAt: { board: "bb", col: 8, row: "a" } },
  {
    id: "w_c_gnd",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 9 },
  },
];
