import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/kirchhoff-laws-schematics";

export const step: SceneProcedureStep = {
  label: "Build the resistor network.",
  body:
    "Connect R1 (1 k$\\Omega$) from node A to the positive terminal of V1 (set to 9 V), " +
    "R2 (2.2 k$\\Omega$) from node A to V2 (set to 6 V), " +
    "and R3 (3.3 k$\\Omega$) from node A to the common ground rail. " +
    "Both supply negatives share the same ground rail. " +
    "This creates node A where three branch currents meet — the KCL verification point.",
  show: ["bb", "r1", "r2", "r3", "led1"],
  schematic,
};
