import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. The blue rail will be the centre-tap return. The primary stays on the mains, off this board.",
  show: ["bb"],
  schematic,
};
