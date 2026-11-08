import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Place R2.",
  body: "Insert the 2.2 kΩ resistor in row c, columns 12 to 15. Jumper R1's right lead to R2's left lead, and R2's right lead to ground. The join is node A. Ground is node B.",
  show: ["bb", "psu", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd"],
  highlight: "r2",
  readings: { psu: "9.00 V" },
  schematic,
};
