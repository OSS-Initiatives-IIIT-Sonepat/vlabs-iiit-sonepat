import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Connect V1.",
  body: "Clip the first supply across the top rails and set it to 9.00 V. The display reads 9.00 V.",
  show: ["bb", "psu1"],
  highlight: "psu1",
  readings: { psu1: "9.00 V" },
  schematic,
};
