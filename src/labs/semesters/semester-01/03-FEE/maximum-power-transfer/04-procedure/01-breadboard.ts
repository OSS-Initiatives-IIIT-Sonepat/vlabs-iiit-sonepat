import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Place the breadboard.",
  body: "Place the breadboard. The source resistance is $R_s = 100\\,\\Omega$ and the supply will be $V_s = 9\\,\\mathrm{V}$.",
  show: ["bb"],
  schematic,
};
