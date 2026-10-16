import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Measure V_th (open-circuit voltage).",
  body: "With A-B open, connect the voltmeter across A-B. Switch on supply. Voltmeter reads $V_{oc} = V_{th}$. For R1–R2 divider: $V_{th} = V_s \\times R_2/(R_1+R_2)$. Record and compare with theoretical.",
  show: ["bb", "r1", "r2", "w_vcc_r1", "w_r1_r2", "w_r2_gnd"],
};
