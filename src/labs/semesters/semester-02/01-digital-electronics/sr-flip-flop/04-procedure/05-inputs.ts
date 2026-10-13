import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the S and R inputs",
  body: "Connect S (red wire) to the free input A of gate 2 and R (blue wire) to the free input A of gate 1. Keep both inputs at 0 for now.",
  show: ["bb", "psu", "nor1", "nor2", "w_fb1", "w_fb2", "w_s", "w_r"],
  highlight: "w_s",
  activeInputs: { S: 0, R: 0 },
};
