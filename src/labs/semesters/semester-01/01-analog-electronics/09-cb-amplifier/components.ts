import { type ComponentInstance } from "@/labs/types";

/**
 * Common-base amplifier, dual supply (BC547).
 *
 * The base is grounded. V_EE forward-biases the emitter through R_E; V_CC
 * reverse-biases the collector through R_C. The AC input reaches the
 * emitter through C_in and the output is taken at the collector.
 *
 * BC547 flat face front, legs C-B-E in cols 11-12-13 (row e).
 *   cols 8-11  : R_C, VCC end at col 8 fed through the I_C ammeter
 *   col 12     : base → GND jumper
 *   cols 13-16 : R_E, col 16 → I_E ammeter → V_EE (−) at col 19
 *   cols 21-22 : C_in (+ to the function generator, − jumpered to the emitter)
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    label: "V_CC",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },
  // Emitter supply: (+) to common ground, (−) to the emitter circuit.
  {
    id: "psu_ee",
    type: "dc-jack",
    label: "V_EE",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", rail: "gnd_top", col: 20 },
      { board: "bb", col: 19, row: "a" },
    ],
  },

  { id: "q1", type: "npn-bjt", mountedAt: { board: "bb", col: 12, row: "e" } },
  {
    id: "w_base_gnd",
    type: "wire",
    color: "black",
    from: { ic: "q1", pin: "B" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },

  {
    id: "r_e",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 13, row: "c" },
  },
  {
    id: "am_e",
    type: "ammeter",
    label: "I_E",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 16, row: "a" },
      { board: "bb", col: 19, row: "b" },
    ],
  },

  {
    id: "r_c",
    type: "resistor",
    ohms: 4700,
    mountedAt: { board: "bb", col: 8, row: "b" },
  },
  {
    id: "am_c",
    type: "ammeter",
    label: "I_C",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 7 },
      { board: "bb", col: 8, row: "a" },
    ],
  },

  {
    id: "c_in",
    type: "capacitor",
    capacitance: 10,
    mountedAt: { board: "bb", col: 21, row: "c" },
  },
  {
    id: "w_cin_e",
    type: "wire",
    color: "blue",
    from: { component: "c_in", end: "p2" },
    to: { ic: "q1", pin: "E" },
  },

  {
    id: "vm_eb",
    type: "voltmeter",
    label: "V_EB",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 12, row: "a" },
      { board: "bb", col: 13, row: "a" },
    ],
  },
  {
    id: "vm_cb",
    type: "voltmeter",
    label: "V_CB",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { board: "bb", col: 11, row: "a" },
      { board: "bb", col: 12, row: "b" },
    ],
  },

  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 21, row: "a" },
      { board: "bb", rail: "gnd_top", col: 21 },
    ],
  },
  {
    id: "cro",
    type: "oscilloscope",
    probes: [
      { board: "bb", col: 11, row: "c" },
      { board: "bb", rail: "gnd_top", col: 11 },
    ],
  },
];
