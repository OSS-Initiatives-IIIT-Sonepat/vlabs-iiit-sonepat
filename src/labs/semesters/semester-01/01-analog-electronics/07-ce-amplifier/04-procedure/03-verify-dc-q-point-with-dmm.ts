import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Verify DC Q-point with DMM.",
  body: "With no AC signal applied, use the DMM to measure: V_B (base to GND), V_E (emitter to GND), V_C (collector to GND). Calculate V_CE = V_C − V_E and I_C = (V_CC − V_C) / R_C. Compare with your theoretical Q-point. If V_CE < 1 V, the transistor is saturated — check connections and resistor values.",
  show: [
    "bb",
    "psu",
    "q1",
    "r1",
    "r2",
    "rc",
    "re",
    "ce",
    "c1",
    "c2",
    "rl",
    "w_vcc_r1",
    "w_vcc_rc",
    "w_r2_gnd",
    "w_re_gnd",
    "w_ce_gnd",
    "w_rl_gnd",
    "w_c1_base",
    "w_col_c2",
    "vm",
  ],
  readings: { psu: "12.00 V", vm: "9.78 V" },
};
