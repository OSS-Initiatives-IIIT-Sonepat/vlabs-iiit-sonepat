import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/06-full-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Place the load resistor across the output",
  body: "Mount the 1 kΩ load resistor between the positive node and ground. This is where you'll read the pulsating DC output before any filtering is added.",
  show: [
    "bb",
    "ac_src",
    "d1",
    "d2",
    "w_a1_d1",
    "w_a2_d2",
    "d3",
    "d4",
    "w_neg_d3",
    "w_d3_a1",
    "w_neg_d4",
    "w_d4_a2",
    "w_d1_pos",
    "w_d2_pos",
    "r_load",
    "w_pos_rload",
    "w_rload_neg",
  ],
  highlight: "r_load",
  supplyVoltage: 12,
  schematic,
};
