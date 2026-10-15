import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/thevenin-theorem-schematics";
export const step: SceneProcedureStep = {
  schematic,
  label: "Measure R_th (Thevenin resistance).",
  body: "Switch off and disconnect the supply. Replace supply with a short-circuit jumper to kill the voltage source. Using the ohmmeter, measure resistance between A and B. With supply shorted, R1 and R2 are in parallel: $R_{th} = R_1 \\| R_2 = (R_1 R_2)/(R_1+R_2)$. Record and compare.",
  show: ["bb", "r1", "r2"],
};
