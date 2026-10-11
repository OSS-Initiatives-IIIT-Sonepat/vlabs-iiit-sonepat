import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the second LM741 and connect its power pins.",
  body: "Reduce the function generator amplitude to zero. On the right half of the breadboard fit a second LM741 for the non-inverting amplifier. Connect pin 7 to the +12 V rail (red wire) and pin 4 to the −12 V rail (white wire). Leave pins 1, 5 and 8 unconnected. The inverting amplifier stays in place; there is nothing to remove.",
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
  ],
  highlight: "op_non",
};
