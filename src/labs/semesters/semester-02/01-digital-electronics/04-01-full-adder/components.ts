import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * Full adder on three ICs.
 *
 *   74HC86 (xor1): gate 1  x = A ⊕ B          gate 2  Sum = x ⊕ Cin
 *   74HC08 (and1): gate 1  A · B              gate 2  Cin · x
 *   74HC32 (or1) : gate 1  Cout = A·B + Cin·x
 *
 * Inputs A (col 2), B (col 4), Cin (col 6). ICs at cols 8, 18, 28.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("xor1", "xor-quad", 8),
  ...ic("and1", "and-quad", 18),
  ...ic("or1", "or-quad", 28),

  // First half adder: A, B → XOR gate 1 and AND gate 1
  input("w_a_xor1", 2, "a", { ic: "xor1", pin: "1A" }, "red"),
  input("w_a_and1", 2, "b", { ic: "and1", pin: "1A" }, "red"),
  input("w_b_xor1", 4, "a", { ic: "xor1", pin: "1B" }, "blue"),
  input("w_b_and1", 4, "b", { ic: "and1", pin: "1B" }, "blue"),

  // Second half adder: x = A ⊕ B and Cin → XOR gate 2 and AND gate 2
  link(
    "w_x1_xor2",
    { ic: "xor1", pin: "1Y" },
    { ic: "xor1", pin: "2A" },
    "white",
  ),
  link(
    "w_x1_and2",
    { ic: "xor1", pin: "1Y:2" },
    { ic: "and1", pin: "2A" },
    "white",
  ),
  input("w_cin_xor2", 6, "a", { ic: "xor1", pin: "2B" }, "orange"),
  input("w_cin_and2", 6, "b", { ic: "and1", pin: "2B" }, "orange"),

  // Carry: OR of the two AND terms
  link("w_and1_or1", { ic: "and1", pin: "1Y" }, { ic: "or1", pin: "1A" }),
  link("w_and2_or1", { ic: "and1", pin: "2Y" }, { ic: "or1", pin: "1B" }),

  // Outputs
  ...lamp(
    "sum",
    { ic: "xor1", pin: "2Y" },
    38,
    "green",
    "w_xor2_r",
    "w_gnd_sum",
  ),
  ...lamp(
    "cout",
    { ic: "or1", pin: "1Y" },
    43,
    "yellow",
    "w_or1_r",
    "w_gnd_cout",
    "yellow",
  ),
];
