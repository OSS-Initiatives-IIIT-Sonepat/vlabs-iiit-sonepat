import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, tie } from "../_board";

/**
 * SR latch with the 74HC279 (latch 1). Inputs are active-LOW.
 *   pin 1 = 1R', pin 2 = 1S1', pin 3 = 1S2' (tied HIGH, unused), pin 4 = 1Q
 * Inputs: S' at col 1, R' at col 2. IC at col 8.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("sr1", "sr-latch", 8),
  tie("w_s2_vcc", { ic: "sr1", pin: "s_2" }, "vcc", 10),

  input("w_sbar_sr1", 1, "a", { ic: "sr1", pin: "s" }, "blue"),
  input("w_rbar_sr1", 2, "a", { ic: "sr1", pin: "r" }, "orange"),

  ...lamp("q", { ic: "sr1", pin: "q" }, 18, "green", "w_q_out", "w_q_gnd"),
];
