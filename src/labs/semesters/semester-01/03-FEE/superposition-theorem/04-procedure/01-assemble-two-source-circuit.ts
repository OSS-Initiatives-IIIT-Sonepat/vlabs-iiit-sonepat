import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/superposition-theorem-schematics";
export const step: SceneProcedureStep = {
  schematic,
  label: "Assemble two-source circuit and measure total load current.",
  body: "Connect R1 (1 k$\\Omega$) from node N to V1 (9 V), R2 (2.2 k$\\Omega$) from node N to V2 (6 V), and $R_3$ (3.3 k$\\Omega$) from node N to GND. Insert ammeter in series with $R_3$ to measure $I_{total}$. Record the reading.",
  show: ["bb", "r1", "r2", "r_load", "led1"],
};
