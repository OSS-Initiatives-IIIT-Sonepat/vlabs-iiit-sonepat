import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply a signal from the function generator.",
  body: "Select a sine wave, set the frequency to 1 kHz and the amplitude to 5 Vpp. Connect OUTPUT to R2 and GND to the common ground. R2 and C1 form an RC low-pass filter with cut-off about 1.59 kHz.",
  show: [
    "bb",
    "psu",
    "r1",
    "r2",
    "c1",
    "led1",
    "d1",
    "q1",
    "w_vcc",
    "w_r_led",
    "w_gnd1",
    "dmm",
    "fg1",
    "w_c_gnd",
  ],
  highlight: "fg1",
  supplyVoltage: 5.0,
  ledBrightness: { led1: 0.6 },
  readings: { dmm: "2.9 V", fg1: "1 kHz, 5 Vpp" },
};
