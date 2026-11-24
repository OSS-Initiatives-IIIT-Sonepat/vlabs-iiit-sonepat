import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, lamp, link } from "../_board";

/**
 * 4-bit ripple-carry adder from discrete gates (five ICs, all four gates of each used).
 *
 * Bit i uses gate i+1 of every IC:
 *   xor_p (74HC86)  P_i = A_i ⊕ B_i        and_g (74HC08)  G_i = A_i · B_i
 *   xor_s (74HC86)  S_i = P_i ⊕ C_i        and_p (74HC08)  T_i = P_i · C_i
 *   or_c  (74HC32)  C_{i+1} = G_i + T_i    C_0 = Cin, C_4 = Cout
 *
 * Inputs (top bank): Cin col 1, A0/B0 cols 2/3, A1/B1 4/5, A2/B2 6/7, A3/B3 8/9.
 * ICs at cols 11, 19, 27, 35, 43. Indicators S0…S3, Cout at cols 52–76.
 */
const XP = "xor_p";
const AG = "and_g";
const XS = "xor_s";
const AP = "and_p";
const OC = "or_c";

const bits: ComponentInstance[] = [0, 1, 2, 3].flatMap(
  (i): ComponentInstance[] => {
    const g = i + 1;
    const aCol = 2 + 2 * i;
    const bCol = 3 + 2 * i;
    const carry: ComponentInstance[] =
      i === 0
        ? [
            input("w_cin_xs0", 1, "a", { ic: XS, pin: "1B" }, "orange"),
            input("w_cin_ap0", 1, "b", { ic: AP, pin: "1B" }, "orange"),
          ]
        : [
            link(
              `w_c_xs${i}`,
              { ic: OC, pin: `${i}Y` },
              { ic: XS, pin: `${g}B` },
            ),
            link(
              `w_c_ap${i}`,
              { ic: OC, pin: `${i}Y:2` },
              { ic: AP, pin: `${g}B` },
            ),
          ];
    return [
      input(`w_a${i}_xp`, aCol, "a", { ic: XP, pin: `${g}A` }, "red"),
      input(`w_a${i}_ag`, aCol, "b", { ic: AG, pin: `${g}A` }, "red"),
      input(`w_b${i}_xp`, bCol, "a", { ic: XP, pin: `${g}B` }, "blue"),
      input(`w_b${i}_ag`, bCol, "b", { ic: AG, pin: `${g}B` }, "blue"),
      link(
        `w_p_xs${i}`,
        { ic: XP, pin: `${g}Y` },
        { ic: XS, pin: `${g}A` },
        "white",
      ),
      link(
        `w_p_ap${i}`,
        { ic: XP, pin: `${g}Y:2` },
        { ic: AP, pin: `${g}A` },
        "white",
      ),
      ...carry,
      link(
        `w_g_oc${i}`,
        { ic: AG, pin: `${g}Y` },
        { ic: OC, pin: `${g}A` },
        "purple",
      ),
      link(
        `w_t_oc${i}`,
        { ic: AP, pin: `${g}Y` },
        { ic: OC, pin: `${g}B` },
        "purple",
      ),
    ];
  },
);

export const components: ComponentInstance[] = [
  ...board({ wide: true }),

  ...ic(XP, "xor-quad", 11),
  ...ic(AG, "and-quad", 19),
  ...ic(XS, "xor-quad", 27),
  ...ic(AP, "and-quad", 35),
  ...ic(OC, "or-quad", 43),

  ...bits,

  ...lamp("s0", { ic: XS, pin: "1Y" }, 52, "green", "w_s0_r", "w_gnd_s0"),
  ...lamp("s1", { ic: XS, pin: "2Y" }, 57, "green", "w_s1_r", "w_gnd_s1"),
  ...lamp("s2", { ic: XS, pin: "3Y" }, 62, "green", "w_s2_r", "w_gnd_s2"),
  ...lamp("s3", { ic: XS, pin: "4Y" }, 67, "green", "w_s3_r", "w_gnd_s3"),
  ...lamp(
    "cout",
    { ic: OC, pin: "4Y" },
    72,
    "yellow",
    "w_cout_r",
    "w_gnd_cout",
    "yellow",
  ),
];
