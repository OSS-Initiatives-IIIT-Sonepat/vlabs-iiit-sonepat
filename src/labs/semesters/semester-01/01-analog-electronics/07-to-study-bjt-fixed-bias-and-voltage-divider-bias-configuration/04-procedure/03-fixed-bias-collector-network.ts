import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the BC547 NPN transistor Q1 and collector resistor R_C1.",
  body:
    "Mount collector resistor $R_{C1} = 4.7\\text{ k}\\Omega$ at column 7 (row c) and wire its terminal p1 to VCC via red wire w_vcc_rc1. " +
    "Insert the BC547 NPN transistor Q1 at column 10 (row e), where middle lead is Base (col 10), left lead is Collector (col 9), and right lead is Emitter (col 11). " +
    "Connect orange wire w_rb_base from $R_B$ to Base (col 10), green wire w_rc1_col from $R_{C1}$ to Collector (col 9), " +
    "and black wire w_q1_gnd from Emitter (col 11) directly to the ground rail (gnd_top).",
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
  ],
  highlight: "q1",
};
