import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Compute theoretical values and compare.",
  body:
    "Using known resistor values and supply voltages, calculate theoretical branch currents " +
    "via simultaneous KCL/KVL equations (or nodal analysis). " +
    "Compare with measured values. Calculate percentage error for each branch current " +
    "and each loop voltage. Summarise findings to confirm both laws.",
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
