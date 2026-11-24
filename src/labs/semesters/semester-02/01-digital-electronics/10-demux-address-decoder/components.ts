import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link, tie } from "../_board";

/**
 * 1-to-2 DEMUX used as an address decoder, on two ICs.
 *
 *   Y0 = I · S'   74HC08 gate 1 (pins 1, 2 → 3), S' from 74HC04 gate 1 (pin 1 → 2)
 *   Y1 = I · S    74HC08 gate 2 (pins 4, 5 → 6)
 *
 * The data input I is tied to +5 V (always enabled); the address S is the
 * tie column 2 (input A0). ICs at cols 8 and 16.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("not1", "not-hex", 8),
  ...ic("and1", "and-quad", 16),

  // S (A0) to the inverter and to AND gate 2 pin 5; S' to AND gate 1 pin 2
  input("w_a0_not", 2, "a", { ic: "not1", pin: "1A" }, "red"),
  input("w_a0_and2", 2, "b", { ic: "and1", pin: "2B" }, "red"),
  link(
    "w_na0_and1",
    { ic: "not1", pin: "1Y" },
    { ic: "and1", pin: "1B" },
    "white",
  ),
  // I tied HIGH on AND pins 1 and 4
  tie("w_en_and1", { ic: "and1", pin: "1A" }, "vcc", 16),
  tie("w_en_and2", { ic: "and1", pin: "2A" }, "vcc", 19),

  ...lamp("y0", { ic: "and1", pin: "1Y" }, 24, "green", "w_y0_r", "w_gnd1"),
  ...lamp("y1", { ic: "and1", pin: "2Y" }, 29, "red", "w_y1_r", "w_gnd2"),
];
