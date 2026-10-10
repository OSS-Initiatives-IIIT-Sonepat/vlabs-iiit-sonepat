import { type ComponentInstance } from "@/labs/types";

/**
 * Half-Wave Rectifier
 * ---------------------------------------------------------------
 * Circuit Architecture (exact match to apparatus):
 * - Step-Down Transformer (transformer):
 *     Placed on the workbench beside the breadboard.
 *     Secondary terminal S1 feeds Diode D1 anode via red wire (w_ac1_d1).
 *     Secondary return / center tap terminal feeds common ground rail via black wire (w_ac_gnd).
 * - Semiconductor Rectifier Diode D1 (1N4007):
 *     Mounted at col 8, row c (anode at col 8, cathode at col 11).
 * - Load Resistor R_load (1 kΩ):
 *     Mounted at col 14, row c (spans col 14 -> 17).
 *     Terminal p1 receives rectified positive half-cycles from D1 cathode.
 *     Terminal p2 returns to the top ground rail (gnd_top) via w_load_gnd.
 * - Electrolytic Filter Capacitor C1 (100 µF):
 *     Mounted at col 19, row c in parallel across R_load.
 * - Digital Multimeter (dmm):
 *     Measures unfiltered and filtered DC output voltage across R_load.
 * - Cathode Ray Oscilloscope (cro):
 *     Displays input AC and rectified/filtered output waveforms across R_load.
 */

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Step-down transformer placed separately on the bench beside the breadboard
  {
    id: "transformer",
    type: "transformer",
  },

  // Semiconductor Rectifier Diode D1 (1N4007 silicon diode, spans col 8 -> 11)
  {
    id: "d1",
    type: "diode",
    mountedAt: { board: "bb", col: 8, row: "c" },
  },

  // Load resistor R_load (1 kΩ, spans col 14 -> 17)
  {
    id: "r_load",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 14, row: "c" },
  },

  // Filter capacitor C1 (100 µF, spans col 19 -> 20)
  {
    id: "c1",
    type: "capacitor",
    capacitance: 100,
    mountedAt: { board: "bb", col: 19, row: "c" },
  },

  // Digital Multimeter (DMM) measuring rectified DC voltage across R_load
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 14, row: "c" }, // R_load positive side
      { board: "bb", rail: "gnd_top", col: 17 }, // Ground side
    ],
  },

  // Cathode Ray Oscilloscope (CRO) displaying output waveforms
  {
    id: "cro",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { board: "bb", col: 14, row: "b" }, // CH1 probe
      { board: "bb", rail: "gnd_top", col: 17 }, // GND reference
    ],
  },

  // Secondary return to ground rail (black lead from transformer CT terminal to top ground rail)
  {
    id: "w_ac_gnd",
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

  // D1 cathode (p2) to R_load input (p1)
  {
    id: "w_d1_load",
    type: "wire",
    color: "yellow",
    from: { component: "d1", end: "p2" },
    to: { component: "r_load", end: "p1" },
  },

  // R_load return (p2) to ground rail
  {
    id: "w_load_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_load", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 17 },
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
    to: { board: "bb", rail: "gnd_top", col: 20 },
  },
];
