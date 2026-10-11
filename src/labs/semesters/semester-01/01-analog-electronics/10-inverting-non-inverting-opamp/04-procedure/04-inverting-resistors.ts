import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Fit Rin and Rf for the inverting amplifier (Rin = 10 kΩ, Rf = 100 kΩ).",
  body: "Fit the 10 kΩ input resistor Rin on the left of the IC and connect its right end to pin 2 (orange wire). Fit the 100 kΩ feedback resistor Rf on the lower half to the right of the IC. Connect pin 6 (output) to the left end of Rf (green wire) and the right end of Rf back to pin 2 (purple wire). Pin 2 is now the summing point that joins Rin and Rf.",
  show: [
    "bb",
    "op_inv",
    "psu",
    "psu_neg",
    "w_gnd_link",
    "w_inv_pin7",
    "w_inv_pin4",
    "w_inv_pin3",
    "r_in",
    "r_f_inv",
    "w_rin_pin2",
    "w_inv_pin6_rf",
    "w_inv_rf_pin2",
  ],
  highlight: "r_f_inv",
};
