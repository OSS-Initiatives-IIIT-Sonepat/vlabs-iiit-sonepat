import { type ComponentInstance } from "@/labs/types";

/**
 * BC547 low-side switch driving an LED from +5 V.
 *
 * BC547 mounted at column 15 (row c): collector col 14, base col 15, emitter col 16.
 * Column map (top bank):
 *   5–8    rc (330 Ω, row c)           13–14  led (row d), cathode on the collector
 *   12–15  rb_10k / rb_1m (row a), p2 on the base column
 * The input wire ties column 12 to +5 V (HIGH) or to ground (LOW).
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

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
    id: "vm_ce",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 14, row: "e" }, //          + collector
      { board: "bb", rail: "gnd_top", col: 18 }, //   − emitter / ground
    ],
  },
  {
    id: "vm_be",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 15, row: "e" }, //          + base
      { board: "bb", rail: "gnd_top", col: 19 }, //   − emitter / ground
    ],
  },

  { id: "q1", type: "npn-bjt", mountedAt: { board: "bb", col: 15, row: "c" } },
  {
    id: "w_e_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 16, row: "d" },
    to: { board: "bb", rail: "gnd_top", col: 17 },
  },

  // ---------------- Collector load ----------------
  { id: "rc", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "led", type: "led", color: "red", mountedAt: { board: "bb", col: 13, row: "d" } },
  {
    id: "w_vcc_rc",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 5 },
    to: { component: "rc", end: "p1" },
  },
  {
    id: "w_rc_led",
    type: "wire",
    color: "orange",
    from: { component: "rc", end: "p2" },
    to: { led: "led", end: "anode" },
  },

  // ---------------- Base drive ----------------
  { id: "rb_10k", type: "resistor", ohms: 10000, mountedAt: { board: "bb", col: 12, row: "a" } },
  { id: "rb_1m", type: "resistor", ohms: 1000000, mountedAt: { board: "bb", col: 12, row: "a" } },
  {
    id: "w_vin_low",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 12, row: "b" },
    to: { board: "bb", rail: "gnd_top", col: 11 },
  },
  {
    id: "w_vin_high",
    type: "wire",
    color: "yellow",
    from: { board: "bb", col: 12, row: "b" },
    to: { board: "bb", rail: "vcc_top", col: 11 },
  },
];
