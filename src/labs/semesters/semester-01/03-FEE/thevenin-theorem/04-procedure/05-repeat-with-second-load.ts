import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/thevenin-theorem-schematics";
export const step: SceneProcedureStep = {
  schematic,
  label: "Repeat verification with R_L = R4 (4.7 kΩ).",
  body: "Replace R3 with R4 (4.7 k$\\Omega$) in both the original circuit and the Thevenin equivalent. Measure $V_L$ and $I_L$ in each. Readings should match within ±2%, confirming the Thevenin equivalent is valid for any load value.",
  show: [
    "bb",
    "r1",
    "r2",
    "r_load",
    "w_vcc_r1",
    "w_r1_r2",
    "w_r2_gnd",
    "w_r2_rload",
    "w_rload_gnd",
  ],
};
