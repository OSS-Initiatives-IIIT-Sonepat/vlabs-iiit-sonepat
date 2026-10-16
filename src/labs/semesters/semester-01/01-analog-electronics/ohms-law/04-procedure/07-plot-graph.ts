import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/ohms-law";

export const step: SceneProcedureStep = {
  label: "Plot V-I graph and calculate slope.",
  body:
    "On graph paper (or a spreadsheet), plot $V$ (y-axis, volts) against $I$ (x-axis, mA). " +
    "Draw the best-fit straight line through the data points. " +
    "Calculate slope $\\Delta V / \\Delta I$ for each resistor (convert mA → A first). " +
    "Compare the experimental $R$ with the nominal value and compute the percentage error.",
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
