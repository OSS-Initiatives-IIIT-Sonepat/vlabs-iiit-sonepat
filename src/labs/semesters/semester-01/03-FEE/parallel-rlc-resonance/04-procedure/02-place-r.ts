import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Place the resistor.",
  body: "Insert $R = 1\\,\\mathrm{k}\\Omega$ in row c from column 10 to column 13.",
  show: ["bb", "r1"],
  highlight: "r1",
  schematic,
};
