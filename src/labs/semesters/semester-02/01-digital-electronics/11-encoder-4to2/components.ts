import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * 4-to-2 priority encoder (I3 highest priority).
 *
 *   A (MSB) = I3 + I2               74HC32 gate 1
 *   B (LSB) = I3 + I1 · I2'         74HC04 gate 1 → 74HC08 gate 1 → 74HC32 gate 2
 *
 * I0 needs no gate: when only I0 is high both outputs are 0.
 * Inputs I1, I2, I3 at cols 2, 3, 4. ICs at cols 8, 16, 24.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("or_a", "or-quad", 8),
  ...ic("not_i2", "not-hex", 16),
  ...ic("and_m", "and-quad", 24),

  // A = I3 + I2
  input("w_i2_ora", 3, "a", { ic: "or_a", pin: "1A" }, "orange"),
  input("w_i3_ora", 4, "a", { ic: "or_a", pin: "1B" }, "red"),
  // m = I1 · I2'
  input("w_i2_not", 3, "b", { ic: "not_i2", pin: "1A" }, "orange"),
  input("w_i1_orb", 2, "a", { ic: "and_m", pin: "1A" }, "blue"),
  link(
    "w_ni2_and",
    { ic: "not_i2", pin: "1Y" },
    { ic: "and_m", pin: "1B" },
    "white",
  ),
  // B = I3 + m
  input("w_i3_orb", 4, "b", { ic: "or_a", pin: "2A" }, "red"),
  link("w_m_orb", { ic: "and_m", pin: "1Y" }, { ic: "or_a", pin: "2B" }),

  ...lamp("a", { ic: "or_a", pin: "1Y" }, 32, "red", "w_a_r", "w_gnd1"),
  ...lamp("b", { ic: "or_a", pin: "2Y" }, 37, "green", "w_b_r", "w_gnd2"),
];
