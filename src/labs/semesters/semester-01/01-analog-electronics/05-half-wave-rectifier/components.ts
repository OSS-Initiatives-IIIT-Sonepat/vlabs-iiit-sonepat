import { type ComponentInstance } from "@/labs/types";

/**
 * Half-Wave Rectifier
 * ---------------------------------------------------------------
 * AC source -> D1 (1N4007) -> load resistor R_L -> back to ground rail.
 * C1 is added later as a parallel filter capacitor across R_L to
 * demonstrate ripple reduction.
 *
 * Column plan:
 *   col 1      ac_src (dc-jack stand-in for transformer/AC supply)
 *   col 1 (b)  dmm    (potentiometer stand-in for bench multimeter)
 *   col 5      vcc_top / gnd_top rail taps for ac_src terminals
 *   col 8–11   d1     (diode, 1N4007)
 *   col 13–16  r1     (resistor, load)
 *   col 18–19  c1     (capacitor, filter — added in a later step)
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // AC input source (transformer secondary / function generator).
  // terminals[] wire the jack's own +/- leads straight to the rails.
  {
    id: "ac_src",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 5 },
      { board: "bb", rail: "gnd_top", col: 5 },
    ],
  },

  // D1 — rectifying diode (1N4007).
  {
    id: "d1",
    type: "diode",
    model: "1N4007",
    mountedAt: { board: "bb", col: 8, row: "c" },
  },

  // R_L — load resistor across which the rectified output is read.
  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 13, row: "c" },
  },

  // Bench multimeter, probing across R_L (p1 = input side, p2 = ground side).
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 13, row: "c" },
      { board: "bb", col: 16, row: "c" },
    ],
  },

  // C1 — filter capacitor, wired in parallel with R_L (added mid-procedure).
  {
    id: "c1",
    type: "capacitor",
    capacitance: 100,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },

  // Wires
  {
    id: "w_src_d1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 5 },
    to: { component: "d1", end: "p1" },
  },
  {
    id: "w_d1_r1",
    type: "wire",
    color: "white",
    from: { component: "d1", end: "p2" },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_r1_gnd",
    type: "wire",
    color: "black",
    from: { component: "r1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 5 },
  },
  {
    id: "w_c1_top",
    type: "wire",
    color: "white",
    from: { component: "c1", end: "p1" },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_c1_bot",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" },
    to: { component: "r1", end: "p2" },
  },
];
