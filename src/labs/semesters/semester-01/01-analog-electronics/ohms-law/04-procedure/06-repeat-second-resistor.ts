import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/ohms-law-schematics";

export const step: SceneProcedureStep = {
  label: "Repeat with second resistor.",
  body:
    "Replace the 1 k$\\Omega$ resistor with a second resistor of different value (e.g., 2.2 k$\\Omega$) " +
    "and repeat measurements for the same voltage steps. " +
    "Having two data sets allows comparison of slopes and reinforces that $R$ is a material/geometry " +
    "property independent of the applied voltage.",
  show: [
    "bb",
    "r1",
    "led1",
    "w_vcc",
    "w_r1_led",
    "w_gnd",
    "w_vm_pos",
    "w_vm_neg",
  ],
  schematic,
};
