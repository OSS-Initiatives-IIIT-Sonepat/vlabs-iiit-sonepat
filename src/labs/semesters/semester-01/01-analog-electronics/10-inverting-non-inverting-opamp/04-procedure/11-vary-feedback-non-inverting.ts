import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Repeat the non-inverting amplifier for Rf = 47 kΩ and 22 kΩ.",
  body: "Switch off the supply, replace Rf by 47 kΩ and keep R1 = 10 kΩ. Switch on the supply, adjust the function generator until CH1 shows 1 V peak-to-peak, set the CH2 volts/div for a convenient display and record Vo in the observation table. Repeat with Rf = 22 kΩ. For each value compare the measured gain with 1 + Rf / R1.",
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
