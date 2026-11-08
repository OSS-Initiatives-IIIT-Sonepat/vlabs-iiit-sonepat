import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Place R1.",
  body: "Insert the 1 kΩ resistor in row c, columns 8 to 11, and jumper the top red rail to its left lead.",
  show: ["bb", "psu1", "psu2", "w_gnd_link", "r1", "w_v1_r1"],
  highlight: "r1",
  readings: { psu1: "9.00 V", psu2: "6.00 V" },
  schematic,
};
