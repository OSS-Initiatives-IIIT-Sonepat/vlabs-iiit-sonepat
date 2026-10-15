import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/half-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Place the breadboard",
  body: "Place the 830-point breadboard on your workspace. This will host the rectifier circuit.",
  show: ["bb"],
  schematic,
};
