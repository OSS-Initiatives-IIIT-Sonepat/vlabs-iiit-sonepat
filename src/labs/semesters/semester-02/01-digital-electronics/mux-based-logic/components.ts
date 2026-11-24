import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link, tie } from "../_board";

/**
 * 2:1 MUX from gates, used to realise AND, OR and XOR (select S = A).
 *
 *   Y = D0 · S' + D1 · S
 *   74HC04 (not1): gate 1  S' = A'          gate 2  B' (XOR only)
 *   74HC08 (and1): gate 1  D0 · S'          gate 2  D1 · S
 *   74HC32 (or1) : gate 1  Y
 *
 * Only the D0 / D1 jumpers change between functions:
 *   AND: D0 = 0 (w_d0_gnd),   D1 = B (w_b_and2)
 *   OR : D0 = B (w_b_d0),     D1 = 1 (w_vcc_d1)
 *   XOR: D0 = B (w_b_d0),     D1 = B' (w_b_not + w_nb_d1)
 * Inputs A (col 2) and B (col 4). ICs at cols 8, 16, 24.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("not1", "not-hex", 8),
  ...ic("and1", "and-quad", 16),
  ...ic("or1", "or-quad", 24),

  // The MUX itself (S = A)
  input("w_a_not", 2, "a", { ic: "not1", pin: "1A" }, "red"),
  input("w_a_and2", 2, "b", { ic: "and1", pin: "2A" }, "red"),
  link(
    "w_nota_and1",
    { ic: "not1", pin: "1Y" },
    { ic: "and1", pin: "1A" },
    "white",
  ),
  link("w_and1_or", { ic: "and1", pin: "1Y" }, { ic: "or1", pin: "1A" }),
  link("w_and2_or", { ic: "and1", pin: "2Y" }, { ic: "or1", pin: "1B" }),
  ...lamp("out", { ic: "or1", pin: "1Y" }, 32, "green", "w_out_r", "w_out_gnd"),

  // AND: D0 = 0, D1 = B
  tie("w_d0_gnd", { ic: "and1", pin: "1B" }, "gnd", 18),
  input("w_b_and2", 4, "a", { ic: "and1", pin: "2B" }, "blue"),

  // OR and XOR: D0 = B
  input("w_b_d0", 4, "b", { ic: "and1", pin: "1B" }, "blue"),
  // OR: D1 = 1
  tie("w_vcc_d1", { ic: "and1", pin: "2B" }, "vcc", 20),
  // XOR: D1 = B'
  input("w_b_not", 4, "c", { ic: "not1", pin: "2A" }, "blue"),
  link(
    "w_nb_d1",
    { ic: "not1", pin: "2Y" },
    { ic: "and1", pin: "2B" },
    "orange",
  ),
];

const MUX = [
  "bb",
  "psu",
  "w_rail_link",
  "not1",
  "w_vcc_not1",
  "w_gnd_not1",
  "and1",
  "w_vcc_and1",
  "w_gnd_and1",
  "or1",
  "w_vcc_or1",
  "w_gnd_or1",
  "w_a_not",
  "w_a_and2",
  "w_nota_and1",
  "w_and1_or",
  "w_and2_or",
  "r_out",
  "led_out",
  "w_out_r",
  "w_out_gnd",
];

/** Parts shown for the bare MUX and for each function. */
export const SHOW = {
  mux: MUX,
  and: [...MUX, "w_d0_gnd", "w_b_and2"],
  or: [...MUX, "w_b_d0", "w_vcc_d1"],
  xor: [...MUX, "w_b_d0", "w_b_not", "w_nb_d1"],
};
