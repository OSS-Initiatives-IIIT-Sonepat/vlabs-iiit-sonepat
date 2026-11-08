import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Connect the supply.",
  body: "Clip the supply across the top rails and set it to 9.00 V.",
  show: ["bb", "psu"],
  highlight: "psu",
  readings: { psu: "9.00 V" },
  schematic,
};
