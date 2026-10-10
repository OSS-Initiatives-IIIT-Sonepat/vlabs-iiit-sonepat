import { type ComponentInstance } from "@/labs/types";

/**
 * Center-Tapped Full-Wave Rectifier
 * ---------------------------------------------------------------
 * Circuit Architecture (exact match to apparatus):
 * - Center-Tapped Step-Down Transformer (transformer):
 *     Placed on the workbench beside the breadboard.
 *     Secondary terminal S1 feeds Diode D1 anode via red wire (w_ac1_d1).
 *     Secondary center-tap (CT) returns to breadboard top ground rail via black wire (w_ct_gnd).
 *     Secondary terminal S2 feeds Diode D2 anode via blue wire (w_ac2_d2).
 * - Semiconductor Rectifier Diode D1 (1N4007):
 *     Mounted at col 8, row c (anode at col 8, cathode at col 11).
 * - Semiconductor Rectifier Diode D2 (1N4007):
 *     Mounted at col 13, row c (anode at col 13, cathode at col 16).
 * - Load Resistor R_load (1 kΩ):
 *     Mounted at col 18, row c (spans col 18 -> 21).
 *     Terminal p1 receives rectified pulses from both D1 and D2 cathodes.
 *     Terminal p2 returns to the common ground rail (gnd_top) via w_r_gnd.
 * - Electrolytic Filter Capacitor C1 (100 µF):
 *     Mounted at col 23, row c in parallel across R_load.
 * - Digital Multimeter (dmm):
 *     Measures unfiltered and filtered DC output voltage across R_load.
 * - Cathode Ray Oscilloscope (cro):
 *     Displays full-wave rectified output voltage waveforms across R_load.
 */

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Center-tapped step-down transformer placed separately on the bench beside the breadboard
  {
    id: "transformer",
    type: "transformer",
  },

  // Diode D1 — 1N4007 semiconductor rectifier diode (spans col 8 -> 11)
  {
    id: "d1",
    type: "diode",
    mountedAt: { board: "bb", col: 8, row: "c" },
  },

  // Diode D2 — 1N4007 semiconductor rectifier diode (spans col 13 -> 16)
  {
    id: "d2",
    type: "diode",
    mountedAt: { board: "bb", col: 13, row: "c" },
  },

  // Load resistor R_load (1 kΩ, spans col 18 -> 21)
  {
    id: "r_load",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },

  // Electrolytic filter capacitor C1 (100 µF, spans col 23 -> 24)
  {
    id: "c1",
    type: "capacitor",
    capacitance: 100,
    mountedAt: { board: "bb", col: 23, row: "c" },
  },

  // Digital Multimeter (DMM) measuring rectified DC voltage across R_load
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 18, row: "c" }, // R_load positive side
      { board: "bb", rail: "gnd_top", col: 21 }, // Ground side
    ],
  },

  // Cathode Ray Oscilloscope (CRO) displaying output waveforms
  {
    id: "cro",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { board: "bb", col: 18, row: "b" }, // CH1 probe
      { board: "bb", rail: "gnd_top", col: 21 }, // GND reference
    ],
  },

  // Center-tap to ground rail (black lead from transformer CT terminal to top ground rail)
  {
    id: "w_ct_gnd",
    type: "wire",
    color: "black",
    from: { component: "transformer", end: "ct" },
    to: { board: "bb", rail: "gnd_top", col: 5 },
  },

  // Secondary AC1 (red lead from transformer S1 terminal to Diode D1 anode)
  {
    id: "w_ac1_d1",
    type: "wire",
    color: "red",
    from: { component: "transformer", end: "s1" },
    to: { component: "d1", end: "p1" },
  },

  // Secondary AC2 (blue lead from transformer S2 terminal to Diode D2 anode)
  {
    id: "w_ac2_d2",
    type: "wire",
    color: "blue",
    from: { component: "transformer", end: "s2" },
    to: { component: "d2", end: "p1" },
  },

  // D1 cathode (p2) to R_load input (p1)
  {
    id: "w_d1_pos",
    type: "wire",
    color: "yellow",
    from: { component: "d1", end: "p2" },
    to: { component: "r_load", end: "p1" },
  },

  // D2 cathode (p2) to R_load input (p1)
  {
    id: "w_d2_pos",
    type: "wire",
    color: "yellow",
    from: { component: "d2", end: "p2" },
    to: { component: "r_load", end: "p1" },
  },

  // R_load return (p2) to ground rail
  {
    id: "w_r_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_load", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 21 },
  },

  // Filter capacitor C1 positive lead to R_load input (p1)
  {
    id: "w_c1_pos",
    type: "wire",
    color: "white",
    from: { component: "c1", end: "p1" },
    to: { component: "r_load", end: "p1" },
  },

  // Filter capacitor C1 negative lead to ground rail
  {
    id: "w_c1_gnd",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 24 },
  },
];
