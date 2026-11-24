import { type ComponentInstance } from "@/labs/types";

/**
 * CE amplifier, voltage-divider bias (BC547, +12 V).
 *
 * BC547 flat face front, legs C-B-E in cols 14-15-16 (row e).
 * Each part plugs into the strip it shares with the transistor, so only
 * the supply returns and the two coupling paths need jumpers.
 *
 *   col 11 : RC top    (VCC)          col 12 : R1 top (VCC)
 *   col 14 : collector  RC, C2 jumper  col 15 : base   R1, R2, C1 jumper
 *   col 16 : emitter    RE, CE         col 17 : CE (−) → GND
 *   col 18 : R2 bottom → GND           col 19 : RE bottom → GND
 *   cols 7-8 : C1 (+ to base, − to function generator)
 *   cols 21-25 : C2 (+ from collector) → output col 22 → RL → GND
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

  { id: "q1", type: "npn-bjt", mountedAt: { board: "bb", col: 15, row: "e" } },

  // Bias network
  {
    id: "r1",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 12, row: "a" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "rc",
    type: "resistor",
    ohms: 4700,
    mountedAt: { board: "bb", col: 11, row: "b" },
  },
  {
    id: "re",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 16, row: "a" },
  },
  {
    id: "ce",
    type: "capacitor",
    capacitance: 47,
    mountedAt: { board: "bb", col: 16, row: "b" },
  },

  // Coupling and load
  {
    id: "c1",
    type: "capacitor",
    capacitance: 10,
    mountedAt: { board: "bb", col: 7, row: "c" },
  },
  {
    id: "c2",
    type: "capacitor",
    capacitance: 10,
    mountedAt: { board: "bb", col: 21, row: "c" },
  },
  {
    id: "rl",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 22, row: "b" },
  },

  // Supply and ground jumpers
  {
    id: "w_vcc_r1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 12 },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_vcc_rc",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 11 },
    to: { component: "rc", end: "p1" },
  },
  {
    id: "w_r2_gnd",
    type: "wire",
    color: "black",
    from: { component: "r2", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 18 },
  },
  {
    id: "w_re_gnd",
    type: "wire",
    color: "black",
    from: { component: "re", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 19 },
  },
  {
    id: "w_ce_gnd",
    type: "wire",
    color: "black",
    from: { component: "ce", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 17 },
  },
  {
    id: "w_rl_gnd",
    type: "wire",
    color: "black",
    from: { component: "rl", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 25 },
  },

  // Signal jumpers
  {
    id: "w_c1_base",
    type: "wire",
    color: "orange",
    from: { component: "c1", end: "p1" },
    to: { ic: "q1", pin: "B" },
  },
  {
    id: "w_col_c2",
    type: "wire",
    color: "green",
    from: { ic: "q1", pin: "C" },
    to: { component: "c2", end: "p1" },
  },

  // Instruments
  {
    id: "vm",
    type: "voltmeter",
    label: "V_CE",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 14, row: "a" },
      { board: "bb", col: 16, row: "c" },
    ],
  },
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 8, row: "a" },
      { board: "bb", rail: "gnd_top", col: 8 },
    ],
  },
  {
    id: "cro",
    type: "oscilloscope",
    probes: [
      { board: "bb", col: 22, row: "a" },
      { board: "bb", rail: "gnd_top", col: 22 },
    ],
  },
];
