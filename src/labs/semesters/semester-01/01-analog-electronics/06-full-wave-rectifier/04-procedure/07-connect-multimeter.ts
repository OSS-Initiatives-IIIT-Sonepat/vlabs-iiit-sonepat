import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/06-full-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Connect the multimeter across the load",
  body: "Clip the multimeter probes across the load resistor — positive node to ground — to read the average DC output voltage.",
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
    "c1",
    "w_pos_c1",
    "w_c1_neg",
    "dmm",
  ],
  highlight: "dmm",
  supplyVoltage: 12,
  readings: { dmm: "~15.6 V DC" },
  schematic,
};
