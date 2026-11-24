import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, tie } from "../_board";

/**
 * D flip-flop with the 74HC74 (flip-flop 1, rising-edge triggered).
 *   pin 1 = 1CLR', 2 = 1D, 3 = 1CLK, 4 = 1PRE', 5 = 1Q, 6 = 1Q'
 * CLR' and PRE' are tied HIGH. Inputs: D at col 1, CLK at col 2. IC at col 8.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("dff1", "dff", 8),
  tie("w_clr_vcc", { ic: "dff1", pin: "clr_bar" }, "vcc", 8),
  tie("w_set_vcc", { ic: "dff1", pin: "set_bar" }, "vcc", 11),

  input("w_d_dff1", 1, "a", { ic: "dff1", pin: "in" }, "blue"),
  input("w_clk_dff1", 2, "a", { ic: "dff1", pin: "clk" }, "yellow"),

  ...lamp("q", { ic: "dff1", pin: "out" }, 18, "green", "w_q_out", "w_q_gnd"),
  ...lamp(
    "qbar",
    { ic: "dff1", pin: "q_bar" },
    23,
    "red",
    "w_qbar_out",
    "w_qbar_gnd",
    "orange",
  ),
];
