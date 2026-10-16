import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const step: SceneProcedureStep = {
  label: "Measure R_N (Norton resistance).",
  schematic,
  body: "Remove the ammeter. Switch off and disconnect the supply; replace with a short-circuit jumper. Measure resistance between A and B with the ohmmeter. With supply shorted, $R_N = R_1 \\| R_2 \\approx 688\\,\\Omega$. Record measured value.",
  show: ["bb", "r1", "r2"],
};
