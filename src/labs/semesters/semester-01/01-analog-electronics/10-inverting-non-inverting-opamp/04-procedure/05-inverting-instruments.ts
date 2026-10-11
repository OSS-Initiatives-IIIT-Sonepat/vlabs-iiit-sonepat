import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the function generator and the oscilloscope, then power on.",
  body: "Connect the function generator output to the free end of Rin and its ground lead to the ground rail. Connect the oscilloscope input to the output at pin 6 and its ground clip to the ground rail. Set the oscilloscope to DC coupling and 0.2 ms/div. Keep the generator amplitude at zero and switch on the supply. With the multimeter confirm +12 V at pin 7 and −12 V at pin 4. The output at pin 6 should be close to 0 V; if it sits near a supply limit, switch off and recheck pin 3 and the feedback resistor Rf.",
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
  ],
  highlight: "scope_inv",
  readings: {
    psu: "+12 V",
    psu_neg: "−12 V",
    fg_inv: "0 V",
    scope_inv: "Vo ≈ 0 V (DC)",
  },
};
