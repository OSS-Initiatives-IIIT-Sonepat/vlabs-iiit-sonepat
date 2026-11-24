import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * Full subtractor on two ICs.
 *
 *   74HC86 (xor1): gate 1  x = A ⊕ B         gate 2  Diff = x ⊕ Bin
 *                  gate 3  t = B ⊕ Bin       gate 4  Bout = g ⊕ Bin
 *   74HC08 (and1): gate 1  g = x · t
 *
 * Inputs A (col 2), B (col 4), Bin (col 6). ICs at cols 8 and 18.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("xor1", "xor-quad", 8),
  ...ic("and1", "and-quad", 18),

  input("w_a_xor1", 2, "a", { ic: "xor1", pin: "1A" }, "red"),
  input("w_b_xor1", 4, "a", { ic: "xor1", pin: "1B" }, "blue"),
  input("w_b_xor3", 4, "b", { ic: "xor1", pin: "3A" }, "blue"),
  input("w_bin_xor2", 6, "a", { ic: "xor1", pin: "2B" }, "orange"),
  input("w_bin_xor3", 6, "b", { ic: "xor1", pin: "3B" }, "orange"),
  input("w_bin_xor4", 6, "c", { ic: "xor1", pin: "4B" }, "orange"),

  link(
    "w_x1_xor2",
    { ic: "xor1", pin: "1Y" },
    { ic: "xor1", pin: "2A" },
    "white",
  ),
  link(
    "w_x1_and1",
    { ic: "xor1", pin: "1Y:2" },
    { ic: "and1", pin: "1A" },
    "white",
  ),
  link(
    "w_t_and1",
    { ic: "xor1", pin: "3Y" },
    { ic: "and1", pin: "1B" },
    "white",
  ),
  link(
    "w_g_xor4",
    { ic: "and1", pin: "1Y" },
    { ic: "xor1", pin: "4A" },
    "white",
  ),

  ...lamp(
    "diff",
    { ic: "xor1", pin: "2Y" },
    28,
    "green",
    "w_xor2_r",
    "w_gnd_diff",
  ),
  ...lamp(
    "bout",
    { ic: "xor1", pin: "4Y" },
    33,
    "red",
    "w_xor4_r",
    "w_gnd_bout",
    "orange",
  ),
];
