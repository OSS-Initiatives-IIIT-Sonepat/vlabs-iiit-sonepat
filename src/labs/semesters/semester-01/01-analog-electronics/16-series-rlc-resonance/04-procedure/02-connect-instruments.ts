import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the generator and the CRO across R.",
  body: "Connect the function generator output to the free end of the inductor (column 5) and its ground lead to the ground rail. Connect CRO channel 1 to column 9 (the top of R) and its ground clip to the ground rail. VR = I × R, so this trace shows the circuit current. Set the generator to a 1 kHz sine wave of 2 V peak-to-peak. Far below resonance XC (about 1.59 kΩ) dominates, so VR is only about 0.13 V peak-to-peak and the current leads the voltage.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "1 kHz, 2 Vpp",
    scope: "VR ≈ 0.13 Vpp, I leads V",
  },
};
