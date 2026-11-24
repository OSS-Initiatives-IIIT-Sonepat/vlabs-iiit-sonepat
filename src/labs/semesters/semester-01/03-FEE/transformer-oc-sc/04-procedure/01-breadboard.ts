import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. The transformer is a $230/115\\,\\mathrm{V}$, $230\\,\\mathrm{VA}$ unit. P1 and P2 are the $230\\,\\mathrm{V}$ winding. S1 and S2 are the $115\\,\\mathrm{V}$ winding.",
  show: ["bb"],
  schematic,
};
