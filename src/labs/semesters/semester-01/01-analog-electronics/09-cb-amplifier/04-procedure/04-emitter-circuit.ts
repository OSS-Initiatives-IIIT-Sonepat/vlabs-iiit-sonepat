import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert R_E (1 kΩ) and the I_E ammeter.",
  body: "Insert R_E from the emitter strip (col 13) to col 16, row c. Set a DMM to DC mA and connect it **in series** between col 16 (+ lead) and col 19 (− lead), where V_EE (−) arrives. No jumper is needed: R_E shares the emitter's column.",
  show: ["bb", "psu", "psu_ee", "q1", "w_base_gnd", "r_e", "am_e"],
  highlight: "r_e",
};
