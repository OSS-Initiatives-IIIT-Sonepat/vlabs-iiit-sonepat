import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Connect V2 and join the grounds.",
  body: "Clip the second supply across the bottom rails and set it to 6.00 V. Join the two blue rails with one black jumper so both negatives share ground. V2 reads 6.00 V.",
  show: ["bb", "psu1", "psu2", "w_gnd_link"],
  highlight: "psu2",
  readings: { psu1: "9.00 V", psu2: "6.00 V" },
  schematic,
};
