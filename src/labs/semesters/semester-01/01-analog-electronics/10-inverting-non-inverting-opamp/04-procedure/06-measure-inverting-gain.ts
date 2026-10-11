import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply the input and measure the inverting gain.",
  body: "Set the function generator to a 1 kHz sine wave of 1 V peak-to-peak. The output is a sine wave of about 10 V peak-to-peak that is inverted with respect to the input: Vo reaches its positive peak when Vin reaches its negative peak. Record Vin, Vo and the phase shift (180°) in the observation table and calculate the gain Av = Vo / Vin with a negative sign.",
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
    fg_inv: "1 kHz, 1 Vpp",
    scope_inv: "Vo ≈ 10 Vpp, 180° out of phase with Vin",
  },
};
