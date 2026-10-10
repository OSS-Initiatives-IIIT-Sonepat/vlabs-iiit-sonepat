import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the second NOR gate",
  body: "Insert the second NOR gate to the right of the first. This gate will produce the complementary output Q̄. Power it the same way as the first gate.",
  show: ["bb", "psu", "nor1", "nor2"],
  highlight: "nor2",
};
