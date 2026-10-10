import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Calculate the percentage error and shut down.",
  body: "For every row of the observation table calculate the percentage error = |theoretical gain − measured gain| / |theoretical gain| × 100. Note the phase relationship of each circuit. Finally reduce the function generator amplitude to zero, switch off the power supply, the function generator and the oscilloscope, and remove the circuit from the breadboard.",
  show: [
    "bb",
    "opamp1",
    "psu",
    "fg",
    "r_1",
    "r_f",
    "scope",
    "vm",
    "w_fg_in",
    "w_pin6_rf",
    "w_rf_pin2",
    "w_pin7_vcc",
    "w_pin4_gnd",
    "w_out_scope",
    "w_fg_noninv",
    "w_r1_pin2",
    "w_r1_gnd",
  ],
};
