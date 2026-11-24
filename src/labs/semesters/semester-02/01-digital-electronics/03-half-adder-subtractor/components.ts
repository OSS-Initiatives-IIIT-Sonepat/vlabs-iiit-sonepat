import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * Half Adder + Half Subtractor on three ICs.
 *
 *   Sum = Diff = A ⊕ B     74HC86 gate 1 (xor1)
 *   Carry      = A · B     74HC08 gate 1 (and1)
 *   Borrow     = A' · B    74HC08 gate 2 (and1), A' from 74HC04 gate 1 (not1)
 *
 * Inputs A (col 2) and B (col 4). ICs at cols 8, 18, 28.
 * Indicators at cols 44, 49, 54: 330 Ω then LED, cathode to GND.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("xor1", "xor-quad", 8),
  ...ic("and1", "and-quad", 18),
  ...ic("not1", "not-hex", 28),

  // Input A (red): XOR, Carry AND, NOT
  input("w_a_xor", 2, "a", { ic: "xor1", pin: "1A" }, "red"),
  input("w_a_and", 2, "b", { ic: "and1", pin: "1A" }, "red"),
  input("w_a_not", 2, "c", { ic: "not1", pin: "1A" }, "red"),

  // Input B (blue): XOR, Carry AND, Borrow AND
  input("w_b_xor", 4, "a", { ic: "xor1", pin: "1B" }, "blue"),
  input("w_b_and", 4, "b", { ic: "and1", pin: "1B" }, "blue"),
  input("w_b_and2", 4, "c", { ic: "and1", pin: "2B" }, "blue"),

  // A' → Borrow AND (white)
  link(
    "w_not_and2",
    { ic: "not1", pin: "1Y" },
    { ic: "and1", pin: "2A" },
    "white",
  ),

  // Outputs
  ...lamp(
    "sd",
    { ic: "xor1", pin: "1Y" },
    44,
    "green",
    "w_xor_r",
    "w_gnd_sd",
    "green",
  ),
  ...lamp(
    "c",
    { ic: "and1", pin: "1Y" },
    49,
    "yellow",
    "w_and_r",
    "w_gnd_c",
    "yellow",
  ),
  ...lamp(
    "b",
    { ic: "and1", pin: "2Y" },
    54,
    "red",
    "w_and2_r",
    "w_gnd_b",
    "orange",
  ),
];
