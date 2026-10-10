import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Add the emitter series resistor R_E.",
  body: "Mount the 470 Ω resistor R_E at column 17 (it spans columns 17 to 20) and join the emitter column (14) to its left lead with a white wire. R_E limits the emitter current so the forward-biased emitter junction is not damaged.",
  show: ["bb", "q1", "w_base_gnd", "r_e", "w_e_re"],
  highlight: "r_e",
};
