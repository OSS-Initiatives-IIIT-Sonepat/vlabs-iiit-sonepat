import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, tie } from "../_board";

/**
 * JK flip-flop with the 74HC76 (flip-flop 1, falling-edge triggered).
 *   pin 1 = 1CLK, 2 = 1PRE', 3 = 1CLR', 4 = 1J, 5 = VCC
 *   pin 16 = 1K, 15 = 1Q, 14 = 1Q', 13 = GND
 * Note the 7476 supply pins: VCC is pin 5 and GND is pin 13.
 * PRE' and CLR' are tied HIGH. Inputs: J col 1, K col 2, CLK col 3, T col 4.
 * T mode: the T column feeds both J and K (shown instead of the J and K wires).
 */
export const components: ComponentInstance[] = [
  ...board({ gndLink: true }),

  ...ic("jk1", "jk-ff", 8),
  tie("w_set_vcc", { ic: "jk1", pin: "set" }, "vcc", 9),
  tie("w_clr_vcc", { ic: "jk1", pin: "clr" }, "vcc", 10),

  input("w_j_jk1", 1, "a", { ic: "jk1", pin: "j" }, "blue"),
  input("w_k_jk1", 2, "a", { ic: "jk1", pin: "k" }, "orange"),
  input("w_clk_jk1", 3, "a", { ic: "jk1", pin: "clk" }, "yellow"),

  // T mode
  input("w_t_jk1", 4, "a", { ic: "jk1", pin: "j:2" }, "purple"),
  input("w_t_k_jk1", 4, "b", { ic: "jk1", pin: "k:2" }, "purple"),

  ...lamp("q", { ic: "jk1", pin: "q" }, 18, "green", "w_q_out", "w_q_gnd"),
  ...lamp(
    "qbar",
    { ic: "jk1", pin: "q_bar" },
    23,
    "yellow",
    "w_qbar_out",
    "w_qbar_gnd",
    "orange",
  ),
];
