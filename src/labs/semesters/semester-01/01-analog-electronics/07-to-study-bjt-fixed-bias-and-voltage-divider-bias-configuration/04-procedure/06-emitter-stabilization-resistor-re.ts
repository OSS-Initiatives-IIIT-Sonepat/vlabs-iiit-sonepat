import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Mount second BC547 NPN transistor Q2, collector resistor R_C2, and emitter resistor R_E.",
  body:
    "Insert second BC547 NPN transistor Q2 at column 20 (row e). Connect orange wire w_div_base from the $R_1$-$R_2$ divider junction (col 18) to Q2 Base (col 20). " +
    "Mount collector resistor $R_{C2} = 4.7\\text{ k}\\Omega$ at column 19 (row c), wiring pin 1 to VCC (w_vcc_rc2) and pin 2 to Q2 Collector at col 19 (w_rc2_col). " +
    "Mount emitter resistor $R_E = 1\\text{ k}\\Omega$ at column 21 (row h), connecting pin 1 to Q2 Emitter at col 21 (w_em_re) and pin 2 to ground rail (w_re_gnd). " +
    "Emitter resistor $R_E$ introduces negative current feedback to stabilize the quiescent Q-point against temperature fluctuations.",
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
    "q2",
    "r_c2",
    "r_e",
    "w_div_base",
    "w_vcc_rc2",
    "w_rc2_col",
    "w_em_re",
    "w_re_gnd",
  ],
  highlight: "q2",
};
