import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply a square wave and view Vc on the CRO.",
  body: "Select the square waveform on the function generator. Set the amplitude to 5 V peak-to-peak with a +2.5 V DC offset, so that the output switches between 0 V and 5 V, and set the frequency to 100 Hz (half-period 5 ms = 5τ). Connect the generator output to column 5 and CRO channel 1 to column 8, with both ground leads on the ground rail. Use DC coupling, 1 V/div and 1 ms/div. The trace shows the capacitor charging on each rising edge and discharging on each falling edge.",
  show: ["bb", "r_10k", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "fg",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Vc: exponential charge and discharge, 0–5 V",
  },
};
