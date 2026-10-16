import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const step: SceneProcedureStep = {
  label: "Build the original network.",
  schematic,
  body: "Connect the same voltage-divider network as in the Thevenin experiment: R1 (1 k$\\Omega$) in series with R2 (2.2 k$\\Omega$) across 9 V, with output terminals A and B. Verify with a voltmeter that $V_{oc} \\approx 6.19\\,\\text{V}$.",
  show: ["bb", "r1", "r2"],
};
