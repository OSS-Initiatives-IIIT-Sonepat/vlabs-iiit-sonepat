import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Fit R1 and Rf for the non-inverting amplifier (R1 = 10 kΩ, Rf = 100 kΩ).",
  body: "Fit the 10 kΩ resistor R1 on the left of the second IC. Connect one end of R1 to the ground rail (black wire) and the other end to pin 2 (orange wire). Fit the 100 kΩ feedback resistor Rf on the lower half to the right of the IC. Connect pin 6 to the left end of Rf (green wire) and the right end of Rf back to pin 2 (purple wire). Pin 3 is left free for the input signal.",
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
    "fg_inv",
    "scope_inv",
    "op_non",
    "w_non_pin7",
    "w_non_pin4",
    "r_1",
    "r_f_non",
    "w_r1_gnd",
    "w_r1_pin2",
    "w_non_pin6_rf",
    "w_non_rf_pin2",
  ],
  highlight: "r_f_non",
};
