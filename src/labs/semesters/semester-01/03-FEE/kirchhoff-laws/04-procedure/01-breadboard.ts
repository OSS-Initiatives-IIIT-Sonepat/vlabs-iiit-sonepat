import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard on the bench. The top red rail will be V1. The bottom red rail will be V2. Both blue rails are ground.",
  show: ["bb"],
  schematic,
};
