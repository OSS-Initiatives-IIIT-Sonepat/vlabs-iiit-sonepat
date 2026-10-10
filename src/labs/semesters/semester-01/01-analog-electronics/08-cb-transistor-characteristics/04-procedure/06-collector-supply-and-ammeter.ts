import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the collector supply V_CC and the collector milliammeter.",
  body: "Connect the collector supply $V_{CC}$ (0-12 V) with its positive terminal on the top supply rail and its negative terminal on the ground rail. Use a red wire from the supply rail to column 8. Place the second milliammeter between column 8 (+) and the collector column 11 (-) to read the collector current $I_C$. The collector is now positive with respect to the base, so the collector-base junction is reverse biased. Keep $V_{CC}$ at 0 V for now.",
  show: [
    "bb",
    "q1",
    "w_base_gnd",
    "r_e",
    "w_e_re",
    "psu_ee",
    "am_ie",
    "dmm",
    "w_vcc",
    "psu_cc",
    "am_ic",
  ],
  highlight: "am_ic",
};
