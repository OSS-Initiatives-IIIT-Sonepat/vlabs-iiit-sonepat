import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Cross-couple the gates",
  body: "Connect the output of gate 1 (Q) to input B of gate 2, and the output of gate 2 (Q̄) to input B of gate 1. This feedback loop is what makes the circuit remember its state.",
  show: ["bb", "psu", "nor1", "nor2", "w_fb1", "w_fb2"],
  highlight: "w_fb1",
};
