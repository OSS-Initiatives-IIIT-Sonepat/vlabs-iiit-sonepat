import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link, tie } from "../_board";

/**
 * 4-bit subtractor A − B = A + B' + 1 on two ICs.
 *
 *   74HC86 (xor_b)    : gate n inverts B_n (other input tied HIGH: B ⊕ 1 = B')
 *   74HC283 (adder_sub): A + B' with C0 tied HIGH (the +1 of the 2's complement)
 *
 * Inputs A1…A4 at cols 2–5, B1…B4 at cols 6–9 (bit 1 = LSB).
 * ICs at cols 12 and 22. Indicators S1…S4, C4 at cols 32–56.
 */
const bitsIdx = [1, 2, 3, 4];

export const components: ComponentInstance[] = [
  ...board(),

  ...ic("xor_b", "xor-quad", 12),
  ...ic("adder_sub", "adder-4bit", 22),

  // B_n → XOR gate n, other XOR input tied HIGH, output B_n' → adder B_n
  ...bitsIdx.flatMap((n): ComponentInstance[] => [
    input(`w_b${n}_xor`, 5 + n, "a", { ic: "xor_b", pin: `${n}A` }, "blue"),
    tie(`w_vcc_xb${n}`, { ic: "xor_b", pin: `${n}B` }, "vcc", 11 + n),
    link(
      `w_xb${n}_adder`,
      { ic: "xor_b", pin: `${n}Y` },
      { ic: "adder_sub", pin: `b${n}` },
      "white",
    ),
  ]),

  // A_n → adder A_n
  ...bitsIdx.map((n) =>
    input(
      `w_a${n}_adder_sub`,
      1 + n,
      "a",
      { ic: "adder_sub", pin: `a${n}` },
      "red",
    ),
  ),

  // Carry-in = 1
  tie("w_c0_vcc", { ic: "adder_sub", pin: "c0" }, "vcc", 28),

  ...lamp(
    "s1",
    { ic: "adder_sub", pin: "s1" },
    32,
    "green",
    "w_s1_r",
    "w_s1_gnd",
  ),
  ...lamp(
    "s2",
    { ic: "adder_sub", pin: "s2" },
    37,
    "green",
    "w_s2_r",
    "w_s2_gnd",
  ),
  ...lamp(
    "s3",
    { ic: "adder_sub", pin: "s3" },
    42,
    "green",
    "w_s3_r",
    "w_s3_gnd",
  ),
  ...lamp(
    "s4",
    { ic: "adder_sub", pin: "s4" },
    47,
    "green",
    "w_s4_r",
    "w_s4_gnd",
  ),
  ...lamp(
    "c4",
    { ic: "adder_sub", pin: "c4" },
    52,
    "yellow",
    "w_c4_r",
    "w_c4_gnd",
    "yellow",
  ),
];
