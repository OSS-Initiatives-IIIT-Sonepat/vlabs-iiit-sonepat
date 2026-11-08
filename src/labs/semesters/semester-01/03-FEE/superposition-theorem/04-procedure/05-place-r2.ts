import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Place R2 and join the node.",
  body: "Insert the 2.2 kΩ resistor in row h, columns 8 to 11. Jumper the bottom red rail to its left lead, and jumper column 11 between the two banks. Both free ends are now node N.",
  show: [
    "bb",
    "psu1",
    "psu2",
    "w_gnd_link",
    "r1",
    "w_v1_r1",
    "r2",
    "w_v2_r2",
    "w_node",
  ],
  highlight: "r2",
  readings: { psu1: "9.00 V", psu2: "6.00 V" },
  schematic,
};
