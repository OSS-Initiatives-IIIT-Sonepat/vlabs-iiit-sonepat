import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Identify the passive components.",
  body: "Mount R1 (330 Ω: orange, orange, brown), R2 (1 kΩ: brown, black, red) and the 0.1 µF capacitor C1. Passive components cannot amplify; they only resist, store or release energy.",
  show: ["bb", "psu", "r1", "r2", "c1"],
  highlight: "r1",
};
