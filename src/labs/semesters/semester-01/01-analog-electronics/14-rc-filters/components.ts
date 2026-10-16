import { type ComponentInstance } from "@/labs/types";

/**
 * RC low-pass (left) and high-pass (right) filters, R = 1 kΩ, C = 0.1 µF.
 *
 * Column map (top bank, rows a–e share a column):
 *   5–8    r_lp  (row c)       8–9   c_lp (row a) → p2 to ground
 *   16–17  c_hp  (row c)       17–20 r_hp (row b) → p2 to ground
 * The output node of each filter is the shared column (8 and 17), which is
 * where the CRO probe sits.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "fg_lp",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { component: "r_lp", end: "p1" }, //            OUTPUT -> R
      { board: "bb", rail: "gnd_top", col: 3 }, //    GND
    ],
  },
  {
    id: "scope_lp",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 8, row: "d" }, //           CH1 -> Vo (across C)
      { board: "bb", rail: "gnd_top", col: 11 }, //   GND
    ],
  },
  {
    id: "fg_hp",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { component: "c_hp", end: "p1" }, //            OUTPUT -> C
      { board: "bb", rail: "gnd_top", col: 14 }, //   GND
    ],
  },
  {
    id: "scope_hp",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", col: 17, row: "d" }, //          CH1 -> Vo (across R)
      { board: "bb", rail: "gnd_top", col: 23 }, //   GND
    ],
  },

  // ---------------- Low-pass filter ----------------
  { id: "r_lp", type: "resistor", ohms: 1000, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "c_lp", type: "capacitor", capacitance: 0.1, mountedAt: { board: "bb", col: 8, row: "a" } },
  {
    id: "w_clp_gnd",
    type: "wire",
    color: "black",
    from: { component: "c_lp", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 9 },
  },

  // ---------------- High-pass filter ----------------
  { id: "c_hp", type: "capacitor", capacitance: 0.1, mountedAt: { board: "bb", col: 16, row: "c" } },
  { id: "r_hp", type: "resistor", ohms: 1000, mountedAt: { board: "bb", col: 17, row: "b" } },
  {
    id: "w_rhp_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_hp", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 21 },
  },
];
