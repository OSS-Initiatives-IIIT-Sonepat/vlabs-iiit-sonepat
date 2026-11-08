import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";

export const step: SceneProcedureStep = {
  label: "Place the load R3.",
  body: "Insert the 3.3 kΩ load in row c, columns 18 to 21. Jumper node N to its left lead and its right lead to ground.",
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
    "r3",
    "w_node_r3",
    "w_r3_gnd",
  ],
  highlight: "r3",
  readings: { psu1: "9.00 V", psu2: "6.00 V" },
  schematic,
};
