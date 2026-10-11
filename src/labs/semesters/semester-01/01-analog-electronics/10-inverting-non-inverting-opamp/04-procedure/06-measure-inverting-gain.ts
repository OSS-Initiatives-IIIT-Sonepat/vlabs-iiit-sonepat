import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply the input and measure the inverting gain.",
  body: "Set the function generator to a sine wave of 1 kHz and increase its amplitude until CH1 shows 1 V peak-to-peak (2 divisions at 0.5 V/div). Set CH2 to 2 V/div. CH2 shows a sine wave of about 10 V peak-to-peak that is inverted with respect to the input: Vo reaches its positive peak when Vin reaches its negative peak. Record Vin, Vo and the phase shift (180°) in the observation table and calculate the gain Av = Vo / Vin, with a negative sign.",
  show: [
    "bb",
    "opamp1",
    "psu",
    "fg",
    "r_in",
    "r_f",
    "scope",
    "vm",
    "w_fg_in",
    "w_rin_pin2",
    "w_pin6_rf",
    "w_rf_pin2",
    "w_pin3_gnd",
    "w_pin7_vcc",
    "w_pin4_gnd",
    "w_out_scope",
  ],
};
