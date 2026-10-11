import { type ComponentInstance } from "@/labs/types";

/**
 * Inverting + non-inverting amplifier, built side by side on ONE long breadboard
 * so that nothing has to be removed between the two halves of the experiment.
 *
 * Rails (all instruments connect through terminals/probes, no instrument wires):
 *   vcc_bot = +12 V     gnd_top / gnd_bot = 0 V (linked)     vcc_top = -12 V
 *
 * LM741 (DIP-8) pin -> column for an IC mounted at column C, row e:
 *   upper half : pin1=C   pin2=C+1  pin3=C+2  pin4=C+3   (inputs, V-)
 *   lower half : pin8=C   pin7=C+1  pin6=C+2  pin5=C+3   (V+, output)
 * Inputs and V- therefore go UP to the top rails, V+ and the output go DOWN.
 *
 * Column map
 *   1-4     bench supply terminals + ground link
 *   8-11    r_in  (10k)          15-18  op_inv (LM741)      19-22  r_f_inv (100k, row h)
 *   34-37   r_1   (10k)          42-45  op_non (LM741)      46-49  r_f_non (100k, row h)
 * No resistor lead sits in an IC column, so no part shorts onto an IC pin strip.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "long-breadboard" },

  // ---------------- Bench instruments (terminals / probes only) ----------------
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_bot", col: 2 }, // + : +12 V
      { board: "bb", rail: "gnd_bot", col: 2 }, // - : common 0 V
    ],
  },
  {
    id: "psu_neg",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", rail: "gnd_top", col: 2 }, // + : common 0 V
      { board: "bb", rail: "vcc_top", col: 2 }, // - : -12 V
    ],
  },
  {
    id: "fg_inv",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { component: "r_in", end: "p1" }, //            OUTPUT -> Rin
      { board: "bb", rail: "gnd_top", col: 5 }, //    GND
    ],
  },
  {
    id: "scope_inv",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { ic: "op_inv", pin: "6" }, //                  CH1 -> output
      { board: "bb", rail: "gnd_top", col: 21 }, //   GND
    ],
  },
  {
    id: "fg_non",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { ic: "op_non", pin: "3" }, //                  OUTPUT -> non-inverting input
      { board: "bb", rail: "gnd_top", col: 40 }, //   GND
    ],
  },
  {
    id: "scope_non",
    type: "oscilloscope",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { ic: "op_non", pin: "6" }, //                  CH1 -> output
      { board: "bb", rail: "gnd_top", col: 52 }, //   GND
    ],
  },

  // ---------------- Inverting amplifier (left) ----------------
  {
    id: "op_inv",
    type: "op-amp",
    mountedAt: { board: "bb", col: 15, row: "e" },
  },
  {
    id: "r_in",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 8, row: "c" },
  },
  {
    id: "r_f_inv",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 19, row: "h" },
  },

  // ---------------- Non-inverting amplifier (right) ----------------
  {
    id: "op_non",
    type: "op-amp",
    mountedAt: { board: "bb", col: 42, row: "e" },
  },
  {
    id: "r_1",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 34, row: "c" },
  },
  {
    id: "r_f_non",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 46, row: "h" },
  },

  // ---------------- Common ground link ----------------
  {
    id: "w_gnd_link",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 3 },
    to: { board: "bb", rail: "gnd_bot", col: 3 },
  },

  // ---------------- Inverting amplifier wiring ----------------
  {
    id: "w_inv_pin7",
    type: "wire",
    color: "red",
    from: { ic: "op_inv", pin: "7" },
    to: { board: "bb", rail: "vcc_bot", col: 16 },
  },
  {
    id: "w_inv_pin4",
    type: "wire",
    color: "white",
    from: { ic: "op_inv", pin: "4" },
    to: { board: "bb", rail: "vcc_top", col: 18 },
  },
  {
    id: "w_inv_pin3",
    type: "wire",
    color: "black",
    from: { ic: "op_inv", pin: "3" },
    to: { board: "bb", rail: "gnd_top", col: 17 },
  },
  {
    id: "w_rin_pin2",
    type: "wire",
    color: "orange",
    from: { component: "r_in", end: "p2" },
    to: { ic: "op_inv", pin: "2" },
  },
  {
    id: "w_inv_pin6_rf",
    type: "wire",
    color: "green",
    from: { ic: "op_inv", pin: "6" },
    to: { component: "r_f_inv", end: "p1" },
  },
  {
    id: "w_inv_rf_pin2",
    type: "wire",
    color: "purple",
    from: { component: "r_f_inv", end: "p2" },
    to: { ic: "op_inv", pin: "2" },
  },

  // ---------------- Non-inverting amplifier wiring ----------------
  {
    id: "w_non_pin7",
    type: "wire",
    color: "red",
    from: { ic: "op_non", pin: "7" },
    to: { board: "bb", rail: "vcc_bot", col: 43 },
  },
  {
    id: "w_non_pin4",
    type: "wire",
    color: "white",
    from: { ic: "op_non", pin: "4" },
    to: { board: "bb", rail: "vcc_top", col: 45 },
  },
  {
    id: "w_r1_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_1", end: "p1" },
    to: { board: "bb", rail: "gnd_top", col: 34 },
  },
  {
    id: "w_r1_pin2",
    type: "wire",
    color: "orange",
    from: { component: "r_1", end: "p2" },
    to: { ic: "op_non", pin: "2" },
  },
  {
    id: "w_non_pin6_rf",
    type: "wire",
    color: "green",
    from: { ic: "op_non", pin: "6" },
    to: { component: "r_f_non", end: "p1" },
  },
  {
    id: "w_non_rf_pin2",
    type: "wire",
    color: "purple",
    from: { component: "r_f_non", end: "p2" },
    to: { ic: "op_non", pin: "2" },
  },
];
