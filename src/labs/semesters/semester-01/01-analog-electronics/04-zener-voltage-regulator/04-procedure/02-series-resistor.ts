import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/04-zener-voltage-regulator";

export const step: SceneProcedureStep = {
  label: "Mount the series resistor Rs.",
  body: "Insert the 330 Ω resistor Rs on the breadboard (columns 4 to 7, row c). Connect its left lead (column 4) to the positive supply rail with the red wire. Rs limits the current drawn from the supply and drops the difference between Vin and Vout.",
  show: ["bb", "psu", "rs", "w_vcc_rs"],
  highlight: "rs",
  supplyVoltage: 0,
  schematic,
};
