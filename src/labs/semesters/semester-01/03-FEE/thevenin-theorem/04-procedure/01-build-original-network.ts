import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/thevenin-theorem-schematics";
export const step: SceneProcedureStep = {
  schematic,
  label: "Build the original network.",
  body: "Connect R1 (1 k$\\Omega$) in series with R2 (2.2 k$\\Omega$) across V_s = 9 V. Output terminals A-B: A is at the junction of R1 and R2, B is ground. Leave A-B open (no load yet).",
  show: ["bb", "r1", "r2"],
};
