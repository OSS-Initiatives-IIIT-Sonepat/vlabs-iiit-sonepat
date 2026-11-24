import { type ComponentInstance } from "@/labs/types";

import { B, board, ic, input, lamp, link } from "../_board";

/**
 * Binary ⇄ Gray code converters, one 74HC86 each.
 *
 * Binary → Gray (top bank): inputs B3…B0 at cols 2–5 (rows a–e), IC xor1 at col 7.
 *   G3 = B3   G2 = B3 ⊕ B2   G1 = B2 ⊕ B1   G0 = B1 ⊕ B0
 *   LEDs G3…G0 at cols 23, 28, 33, 38 (top bank).
 *
 * Gray → Binary (bottom bank): inputs G3…G0 at cols 2–5 (rows f–j), IC xor_gb at col 15.
 *   B3 = G3   B2 = G3 ⊕ G2   B1 = B2 ⊕ G1   B0 = B1 ⊕ G0   (cascaded XORs)
 *   LEDs B3…B0 at cols 23, 28, 33, 38 (bottom bank).
 */
export const components: ComponentInstance[] = [
  ...board({ gndLink: true }),

  ...ic("xor1", "xor-quad", 7),
  ...ic("xor_gb", "xor-quad", 15),

  // ── Binary → Gray ──────────────────────────────────────────────
  input("w_b3_xor1", 2, "a", { ic: "xor1", pin: "1A" }, "red"),
  input("w_b2_xor1", 3, "a", { ic: "xor1", pin: "1B" }, "orange"),
  input("w_b2_xor2", 3, "b", { ic: "xor1", pin: "2A" }, "orange"),
  input("w_b1_xor2", 4, "a", { ic: "xor1", pin: "2B" }, "blue"),
  input("w_b1_xor3", 4, "b", { ic: "xor1", pin: "3A" }, "blue"),
  input("w_b0_xor3", 5, "a", { ic: "xor1", pin: "3B" }, "white"),

  // G3 = B3 straight from the input column to its resistor
  ...lamp(
    "g3",
    { board: B, col: 2, row: "b" },
    23,
    "red",
    "w_b3_g3",
    "w_gnd_g3",
    "red",
  ),
  ...lamp(
    "g2",
    { ic: "xor1", pin: "1Y" },
    28,
    "yellow",
    "w_xor1_to_r",
    "w_gnd_g2",
  ),
  ...lamp(
    "g1",
    { ic: "xor1", pin: "2Y" },
    33,
    "green",
    "w_xor2_to_r",
    "w_gnd_g1",
  ),
  ...lamp(
    "g0",
    { ic: "xor1", pin: "3Y" },
    38,
    "blue",
    "w_xor3_to_r",
    "w_gnd_g0",
  ),

  // ── Gray → Binary ──────────────────────────────────────────────
  input("w_g3_gb1", 2, "g", { ic: "xor_gb", pin: "1A" }, "red"),
  input("w_g2_gb1", 3, "g", { ic: "xor_gb", pin: "1B" }, "orange"),
  input("w_g1_gb2", 4, "g", { ic: "xor_gb", pin: "2B" }, "blue"),
  input("w_g0_gb3", 5, "g", { ic: "xor_gb", pin: "3B" }, "white"),
  link("w_gb_b2_b1", { ic: "xor_gb", pin: "1Y" }, { ic: "xor_gb", pin: "2A" }),
  link("w_gb_b1_b0", { ic: "xor_gb", pin: "2Y" }, { ic: "xor_gb", pin: "3A" }),

  // B3 = G3 straight from the input column to its resistor
  ...lamp(
    "b3",
    { board: B, col: 2, row: "h" },
    23,
    "red",
    "w_g3_b3",
    "w_gnd_b3",
    "red",
    "bot",
  ),
  ...lamp(
    "b2",
    { ic: "xor_gb", pin: "1Y:2" },
    28,
    "yellow",
    "w_gb1_to_r",
    "w_gnd_b2",
    "green",
    "bot",
  ),
  ...lamp(
    "b1",
    { ic: "xor_gb", pin: "2Y:2" },
    33,
    "green",
    "w_gb2_to_r",
    "w_gnd_b1",
    "green",
    "bot",
  ),
  ...lamp(
    "b0",
    { ic: "xor_gb", pin: "3Y" },
    38,
    "blue",
    "w_gb3_to_r",
    "w_gnd_b0",
    "green",
    "bot",
  ),
];
