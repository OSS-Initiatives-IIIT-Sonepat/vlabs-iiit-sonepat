import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Place R1.",
  body: "Insert the 1 kΩ resistor in row c, columns 6 to 9, and jumper the red rail to its left lead.",
  show: ["bb", "psu", "r1", "w_v_r1"],
  highlight: "r1",
  readings: { psu: "9.00 V" },
  schematic,
};
