import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the select lines",
  body: "Connect S0 (red wire) to input 1A and S1 (blue wire) to input 1B. These two inputs choose which output is addressed.",
  show: ["bb", "psu", "dmx1", "w_s0", "w_s1"],
  highlight: "w_s0",
};
