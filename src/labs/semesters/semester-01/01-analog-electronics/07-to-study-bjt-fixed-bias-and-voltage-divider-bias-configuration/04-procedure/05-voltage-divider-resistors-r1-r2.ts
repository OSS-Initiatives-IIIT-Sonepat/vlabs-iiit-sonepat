import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Assemble the voltage divider bias network with resistors R1 and R2.",
  body:
    "Mount the upper divider resistor $R_1 = 100\\text{ k}\\Omega$ at column 15 (row c) and the lower divider resistor " +
    "$R_2 = 10\\text{ k}\\Omega$ at column 18 (row h). " +
    "Connect red wire w_vcc_r1 from VCC to $R_1$ pin 1, orange jumper wire w_r1_r2 linking $R_1$ pin 2 (col 18) to $R_2$ pin 1 across the gap, " +
    "and black wire w_r2_gnd connecting $R_2$ pin 2 to ground rail. " +
    "The divider junction establishes a firm base bias voltage $V_B = V_{CC}\\frac{R_2}{R_1 + R_2} \\approx 1.09\\text{ V}$.",
  show: [
    "bb",
    "psu",
    "r_b",
    "w_vcc_rb",
    "r_c1",
    "w_vcc_rc1",
    "q1",
    "w_rb_base",
    "w_rc1_col",
    "w_q1_gnd",
    "dmm",
    "r1",
    "r2",
    "w_vcc_r1",
    "w_r1_r2",
    "w_r2_gnd",
  ],
  highlight: "r1",
};
