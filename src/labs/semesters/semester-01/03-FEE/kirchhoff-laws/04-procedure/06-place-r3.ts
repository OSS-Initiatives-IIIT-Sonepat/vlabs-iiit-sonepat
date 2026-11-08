import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Place R3 to ground.",
  body: "Insert the 3.3 kΩ resistor in row c, columns 18 to 21. Jumper column 11 to its left lead, and its right lead to the top ground rail. The three branches now meet at node A.",
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
