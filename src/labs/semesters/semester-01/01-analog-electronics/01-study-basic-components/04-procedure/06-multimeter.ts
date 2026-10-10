import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure with the multimeter.",
  body: "Set the multimeter to the DC voltage range (20 V). Connect the red probe to the R1 input side and the black probe to the R1 output side, in parallel with R1. Note the reading: voltage across R1 = 5 V minus the LED drop, so the current is I = V / 330.",
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
  ],
  highlight: "dmm",
  supplyVoltage: 5.0,
  readings: { dmm: "2.9 V" },
  ledBrightness: { led1: 0.6 },
};
