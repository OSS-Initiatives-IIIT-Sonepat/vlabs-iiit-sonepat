import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure branch currents (KCL check).",
  body:
    "Switch on both supplies. Record $I_1$, $I_2$, $I_3$ from the three ammeters. " +
    "Compute the algebraic sum: $I_1 + I_2 - I_3$. " +
    "According to KCL this sum must equal zero. " +
    "A discrepancy $< 2\\%$ is acceptable due to meter accuracy and resistor tolerance.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "led1",
    "w_vcc_r1",
    "w_vcc_r2",
    "w_r2_nodeA",
    "w_nodeA_link",
    "w_nodeA_r3",
    "w_r3_led",
    "w_led_gnd",
  ],
  schematic,
};
