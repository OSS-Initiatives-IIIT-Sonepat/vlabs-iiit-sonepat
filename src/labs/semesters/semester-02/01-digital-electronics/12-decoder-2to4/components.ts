import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * 2-to-4 decoder on two ICs (A = MSB, B = LSB).
 *
 *   74HC04 (not_a): gate 1  A'      gate 2  B'
 *   74HC08 (and0) : gate 1  Y0 = A'B'   gate 2  Y1 = A'B
 *                   gate 3  Y2 = AB'    gate 4  Y3 = AB
 *
 * Inputs A (col 1) and B (col 2). ICs at cols 8 and 16.
 */
const lampIds = (n: number) => ({ r: `r${n}`, led: `led${n}` });

export const components: ComponentInstance[] = [
  ...board(),

  ...ic("not_a", "not-hex", 8),
  ...ic("and0", "and-quad", 16),

  // A: inverter and the two AND gates that use A
  input("w_a_na", 1, "a", { ic: "not_a", pin: "1A" }, "red"),
  input("w_a_and2", 1, "b", { ic: "and0", pin: "3B" }, "red"),
  input("w_a_and3", 1, "c", { ic: "and0", pin: "4A" }, "red"),
  // B: inverter and the two AND gates that use B
  input("w_b_nb", 2, "a", { ic: "not_a", pin: "2A" }, "blue"),
  input("w_b_and1", 2, "b", { ic: "and0", pin: "2B" }, "blue"),
  input("w_b_and3", 2, "c", { ic: "and0", pin: "4B" }, "blue"),
  // A' and B'
  link(
    "w_na_and0",
    { ic: "not_a", pin: "1Y" },
    { ic: "and0", pin: "1A" },
    "white",
  ),
  link(
    "w_na_and1",
    { ic: "not_a", pin: "1Y:2" },
    { ic: "and0", pin: "2A" },
    "white",
  ),
  link("w_nb_and0", { ic: "not_a", pin: "2Y" }, { ic: "and0", pin: "1B" }),
  link("w_nb_and2", { ic: "not_a", pin: "2Y:2" }, { ic: "and0", pin: "3A" }),

  ...lamp(
    "y0",
    { ic: "and0", pin: "1Y" },
    24,
    "red",
    "w_y0_r",
    "w_g0",
    "green",
    "top",
    lampIds(0),
  ),
  ...lamp(
    "y1",
    { ic: "and0", pin: "2Y" },
    29,
    "yellow",
    "w_y1_r",
    "w_g1",
    "green",
    "top",
    lampIds(1),
  ),
  ...lamp(
    "y2",
    { ic: "and0", pin: "3Y" },
    34,
    "green",
    "w_y2_r",
    "w_g2",
    "green",
    "top",
    lampIds(2),
  ),
  ...lamp(
    "y3",
    { ic: "and0", pin: "4Y" },
    39,
    "blue",
    "w_y3_r",
    "w_g3",
    "green",
    "top",
    lampIds(3),
  ),
];
