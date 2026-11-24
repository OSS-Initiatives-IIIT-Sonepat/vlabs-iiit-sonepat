import { type ComponentInstance } from "@/labs/types";

/**
 * BJT biasing: fixed bias (Phase A, left) and voltage-divider bias
 * (Phase B, right), +12 V. Each BC547 has its flat face front, legs C-B-E.
 * Resistors plug into the strip they share with a transistor leg, so the
 * only jumpers are supply and ground returns.
 *
 * Phase A, q_a legs C-B-E at cols 6-7-8:
 *   R_B  cols 4-7  (VCC jumper at col 4, other end on the base)
 *   R_C1 cols 3-6  (VCC through the I_C ammeter at col 3)
 *   emitter col 8 → GND jumper
 *
 * Phase B, q_b legs C-B-E at cols 19-20-21:
 *   R1   cols 17-20 (VCC jumper at col 17)   R2 cols 20-23 (GND jumper)
 *   R_C2 cols 16-19 (VCC through the I_C ammeter at col 16)
 *   R_E  cols 21-24 (GND jumper)
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    label: "+12 V",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },

  // ── Phase A: fixed bias ───────────────────────────────────────
  { id: "q_a", type: "npn-bjt", mountedAt: { board: "bb", col: 7, row: "e" } },
  {
    id: "r_b",
    type: "resistor",
    ohms: 470000,
    mountedAt: { board: "bb", col: 4, row: "a" },
  },
  {
    id: "r_c1",
    type: "resistor",
    ohms: 4700,
    mountedAt: { board: "bb", col: 3, row: "b" },
  },
  {
    id: "w_vcc_rb",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 4 },
    to: { component: "r_b", end: "p1" },
  },
  {
    id: "w_ea_gnd",
    type: "wire",
    color: "black",
    from: { ic: "q_a", pin: "E" },
    to: { board: "bb", rail: "gnd_top", col: 8 },
  },
  {
    id: "dmm",
    type: "ammeter",
    label: "I_C (A)",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 3 },
      { board: "bb", col: 3, row: "a" },
    ],
  },
  {
    id: "vm_a",
    type: "voltmeter",
    label: "V_CE (A)",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 6, row: "a" },
      { board: "bb", col: 8, row: "a" },
    ],
  },

  // ── Phase B: voltage-divider bias ─────────────────────────────
  { id: "q_b", type: "npn-bjt", mountedAt: { board: "bb", col: 20, row: "e" } },
  {
    id: "r1",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 17, row: "a" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 20, row: "c" },
  },
  {
    id: "r_c2",
    type: "resistor",
    ohms: 4700,
    mountedAt: { board: "bb", col: 16, row: "b" },
  },
  {
    id: "r_e",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 21, row: "a" },
  },
  {
    id: "w_vcc_r1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 17 },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_r2_gnd",
    type: "wire",
    color: "black",
    from: { component: "r2", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 23 },
  },
  {
    id: "w_re_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_e", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 24 },
  },
  {
    id: "dmm_b",
    type: "ammeter",
    label: "I_C (B)",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 16 },
      { board: "bb", col: 16, row: "a" },
    ],
  },
  {
    id: "vm_b",
    type: "voltmeter",
    label: "V_CE (B)",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 19, row: "a" },
      { board: "bb", col: 21, row: "c" },
    ],
  },
];
