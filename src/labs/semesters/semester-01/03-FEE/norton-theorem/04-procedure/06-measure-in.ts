import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Measure IN.",
  body: "Remove the voltmeter. Connect the ammeter from node A straight to ground. That short is the Norton current: IN = 9.00 mA. R2 is bypassed, so the current is 9 V / 1 kΩ.",
  show: ["bb", "psu", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd", "am_sc"],
  highlight: "am_sc",
  readings: { psu: "9.00 V", am_sc: "9.00 mA" },
  schematic,
};
