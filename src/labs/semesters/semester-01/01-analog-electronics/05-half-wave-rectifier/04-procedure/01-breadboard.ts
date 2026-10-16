import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Place the breadboard",
  body: "Place the 830-point breadboard on your workspace. This will host the rectifier circuit.",
  show: ["bb"],
  schematic,
};
