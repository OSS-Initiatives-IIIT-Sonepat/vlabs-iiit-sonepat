import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/full-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Observe the rectified output",
  body: "With the full circuit assembled, compare the two conditions: without C1, the multimeter/scope shows a pulsating waveform at twice the AC input frequency. With C1 connected, the waveform flattens out close to the peak voltage, with only a small ripple remaining — this is the filtered DC supply.",
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
  supplyVoltage: 12,
  readings: { dmm: "15.6 V DC (ripple ≈ 3%)" },
  schematic,
};
