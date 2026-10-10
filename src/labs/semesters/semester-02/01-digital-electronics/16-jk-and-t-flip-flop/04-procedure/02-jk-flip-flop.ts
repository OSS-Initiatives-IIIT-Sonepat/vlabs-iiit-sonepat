import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the JK flip-flop",
  body: "Place the first JK flip-flop in the left section of the breadboard. This section will be used to verify J and K input combinations.",
  show: ["bb", "psu", "jk1", "j_in", "k_in", "clk_jk"],
  highlight: "jk1",
};
