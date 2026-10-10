import { type ComponentInstance } from "@/labs/types";

/**
 * NPN (BC547) common-base characteristics circuit.
 *
 * Breadboard column strips (rows a-e share a strip):
 *   col 8   : +V_CC node         -> milliammeter am_ic (+)
 *   col 11  : collector (C)      -> am_ic (-), voltmeter (+)
 *   col 12  : base (B) = GND     -> DMM (+), voltmeter (-)
 *   col 13  : emitter (E)        -> DMM (-), wire to R_E
 *   col 17-20: R_E (470 ohm)     -> am_ie (+) at col 20
 *   col 24  : -V_EE node         -> am_ie (-), V_EE supply (-)
 *
 * The BC547 is mounted with its base (middle lead) at col 12, so the three
 * leads fan into col 11 (C), 12 (B) and 13 (E) — one hole each.
 *
 * V_EE supply: (+) on GND rail (base), (-) on col 24, so the emitter sits
 * below the base (forward-biased E-B junction).
 * V_CC supply: (+) on vcc_top rail, (-) on gnd_top rail.
 * Instruments use terminals/probes only (no wire components).
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Transistor: base (middle lead) at col 12 -> C = col 11, B = col 12, E = col 13
  {
    id: "q1",
    type: "npn-bjt",
    mountedAt: { board: "bb", col: 12, row: "c" },
  },

  // Emitter series resistor, spans col 17 -> 20
  {
    id: "r_e",
    type: "resistor",
    ohms: 470,
    mountedAt: { board: "bb", col: 17, row: "c" },
  },

  // Base to common (ground) rail
  {
    id: "w_base_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 12, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },

  // Emitter to R_E
  {
    id: "w_e_re",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 13, row: "a" },
    to: { component: "r_e", end: "p1" },
  },

  // +V_CC rail to col 8
  {
    id: "w_vcc",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 8 },
    to: { board: "bb", col: 8, row: "a" },
  },

  // Emitter supply V_EE: [0] = + on GND rail (base), [1] = - on col 24
  {
    id: "psu_ee",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "gnd_top", col: 24 },
      { board: "bb", col: 24, row: "b" },
    ],
  },

  // Collector supply V_CC
  {
    id: "psu_cc",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 4 },
      { board: "bb", rail: "gnd_top", col: 4 },
    ],
  },

  // DMM across the E-B junction: + on base, - on emitter, reads V_EB
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 12, row: "d" },
      { board: "bb", col: 13, row: "b" },
    ],
  },

  // I_E milliammeter: + on R_E side (col 20), - on V_EE side (col 24)
  {
    id: "am_ie",
    type: "ammeter",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", col: 20, row: "a" },
      { board: "bb", col: 24, row: "a" },
    ],
  },

  // I_C milliammeter: + on V_CC node (col 8), - on collector (col 11)
  {
    id: "am_ic",
    type: "ammeter",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { board: "bb", col: 8, row: "b" },
      { board: "bb", col: 11, row: "a" },
    ],
  },

  // V_CB voltmeter: + on collector, - on base
  {
    id: "vm_cb",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 11, row: "b" },
      { board: "bb", col: 12, row: "b" },
    ],
  },
];
