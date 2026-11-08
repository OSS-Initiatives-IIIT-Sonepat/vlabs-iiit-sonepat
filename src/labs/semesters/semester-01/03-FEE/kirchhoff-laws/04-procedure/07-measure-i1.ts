import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure I1.",
  body: "Lift the red jumper into R1 and put the I1 ammeter in its place, from the top red rail to the left lead of R1. It reads 2.33 mA, into node A.",
  show: [
    "bb",
    "psu1",
    "psu2",
    "w_gnd_link",
    "r1",
    "am1",
    "r2",
    "w_v2_r2",
    "w_node",
    "r3",
    "w_node_r3",
    "w_r3_gnd",
  ],
  highlight: "am1",
  readings: { psu1: "9.00 V", psu2: "6.00 V", am1: "2.33 mA" },
  schematic,
};
