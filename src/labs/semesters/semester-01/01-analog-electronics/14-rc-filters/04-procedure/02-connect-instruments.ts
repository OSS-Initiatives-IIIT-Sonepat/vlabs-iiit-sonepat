import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the function generator and the CRO.",
  body: "Connect the function generator output to the free end of R (column 5) and its ground lead to the ground rail. Connect CRO channel 1 to the output node (column 8) and its ground clip to the ground rail. Set the generator to a 100 Hz sine wave of 2 V peak-to-peak. At this frequency the capacitor reactance (about 15.9 kΩ) is far larger than R, so the output is almost equal to the input: about 2.0 V peak-to-peak.",
  show: ["bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp"],
  highlight: "fg_lp",
  readings: {
    fg_lp: "100 Hz, 2 Vpp",
    scope_lp: "Vo ≈ 2.00 Vpp at 100 Hz",
  },
};
