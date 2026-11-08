import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. One supply feeds the top red rail. The blue rail is ground. This is the same divider used for Thevenin.",
  show: ["bb"],
  schematic,
};
