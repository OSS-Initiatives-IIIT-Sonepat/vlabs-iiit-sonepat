import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply the input and measure the non-inverting gain.",
  body: "With the function generator amplitude at zero, switch on the supply and confirm that the output at pin 6 is close to 0 V. Set the function generator to a sine wave of 1 kHz and increase its amplitude until CH1 shows 1 V peak-to-peak. CH2 shows a sine wave of about 11 V peak-to-peak that is in phase with the input: both waveforms reach their positive and negative peaks at the same instants. Record Vin, Vo and the phase shift (0°) in the observation table and calculate the gain Av = Vo / Vin.",
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
