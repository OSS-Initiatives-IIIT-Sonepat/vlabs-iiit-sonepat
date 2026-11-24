import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * BCD to Excess-3 code converter on four ICs.
 *
 *   W = A + B·(C + D)     X = B ⊕ (C + D)     Y = (C ⊕ D)'     Z = D'
 *
 *   74HC32 (or_cd)  : gate 1  T = C + D        gate 2  W = A + B·T
 *   74HC08 (and_b_t): gate 1  B·T
 *   74HC86 (xor_x)  : gate 1  X = B ⊕ T        gate 2  C ⊕ D
 *   74HC04 (not_y)  : gate 1  Y = (C ⊕ D)'     gate 2  Z = D'
 *
 * Inputs A, B, C, D at cols 2, 4, 6, 8. ICs at cols 10, 18, 26, 34.
 * Indicators W, X, Y, Z at cols 41, 46, 51, 56.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("or_cd", "or-quad", 10),
  ...ic("and_b_t", "and-quad", 18),
  ...ic("xor_x", "xor-quad", 26),
  ...ic("not_y", "not-hex", 34),

  // BCD inputs
  input("w_a_or_w", 2, "a", { ic: "or_cd", pin: "2A" }, "red"),
  input("w_b_and", 4, "a", { ic: "and_b_t", pin: "1A" }, "orange"),
  input("w_b_xor", 4, "b", { ic: "xor_x", pin: "1A" }, "orange"),
  input("w_c_or", 6, "a", { ic: "or_cd", pin: "1A" }, "blue"),
  input("w_c_xor", 6, "b", { ic: "xor_x", pin: "2A" }, "blue"),
  input("w_d_or", 8, "a", { ic: "or_cd", pin: "1B" }, "white"),
  input("w_d_xor", 8, "b", { ic: "xor_x", pin: "2B" }, "white"),
  input("w_d_not", 8, "c", { ic: "not_y", pin: "2A" }, "white"),

  // Internal signals
  link(
    "w_or_cd_to_and",
    { ic: "or_cd", pin: "1Y" },
    { ic: "and_b_t", pin: "1B" },
  ),
  link(
    "w_or_cd_to_xor",
    { ic: "or_cd", pin: "1Y:2" },
    { ic: "xor_x", pin: "1B" },
  ),
  link(
    "w_and_to_or_w",
    { ic: "and_b_t", pin: "1Y" },
    { ic: "or_cd", pin: "2B" },
  ),
  link(
    "w_xor_cd_to_not_y",
    { ic: "xor_x", pin: "2Y" },
    { ic: "not_y", pin: "1A" },
  ),

  // Outputs W (MSB) … Z (LSB)
  ...lamp("w", { ic: "or_cd", pin: "2Y" }, 41, "red", "w_w_to_r", "w_gnd_w"),
  ...lamp("x", { ic: "xor_x", pin: "1Y" }, 46, "yellow", "w_x_to_r", "w_gnd_x"),
  ...lamp("y", { ic: "not_y", pin: "1Y" }, 51, "green", "w_y_to_r", "w_gnd_y"),
  ...lamp("z", { ic: "not_y", pin: "2Y" }, 56, "blue", "w_z_to_r", "w_gnd_z"),
];
