import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/full-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Add the filter capacitor",
  body: "Place the 100 µF capacitor in parallel with the load resistor. It charges toward the peak of each pulse and discharges slowly through the load, smoothing the pulsating DC into a much steadier voltage with a small residual ripple.",
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
  ],
  highlight: "c1",
  supplyVoltage: 12,
  schematic,
};
