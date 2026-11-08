import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. V1 will feed the top red rail and V2 the bottom red rail. The load is R3, from the common node down to ground.",
  show: ["bb"],
  schematic,
};
