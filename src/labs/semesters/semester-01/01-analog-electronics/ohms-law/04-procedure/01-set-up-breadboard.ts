import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/ohms-law-schematics";

export const step: SceneProcedureStep = {
  label: "Set up the breadboard.",
  body:
    "Place the breadboard on a flat, insulated surface. " +
    "Identify the two power rails (+ and −) running along each long edge. " +
    "Connect the **positive** terminal of the regulated DC supply to the red (+) rail " +
    "and the **negative** terminal to the blue (−) rail. " +
    "Keep the supply switched **OFF** at this stage to avoid accidental short circuits.",
  show: ["bb"],
  schematic,
};
