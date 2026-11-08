import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Connect V1.",
  body: "Clip the first DC supply across the top rails. Positive on the red rail, negative on the blue rail. Set it to 9.00 V. The supply reads 9.00 V.",
  show: ["bb", "psu1"],
  highlight: "psu1",
  readings: { psu1: "9.00 V" },
  schematic,
};
