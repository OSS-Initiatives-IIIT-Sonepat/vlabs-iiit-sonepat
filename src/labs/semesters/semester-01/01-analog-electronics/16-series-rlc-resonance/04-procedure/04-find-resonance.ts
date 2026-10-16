import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Find the resonant frequency f0.",
  body: "Adjust the frequency slowly near 5 kHz until VR is at its maximum. This happens at about 5.03 kHz, where XL = XC ≈ 316 Ω and the reactances cancel. The impedance is just R, so VR equals the input (about 2.0 V peak-to-peak) and the current is in phase with the input voltage. Use CH2 on the generator output to confirm that the two traces are in phase. Record f0.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "5.03 kHz, 2 Vpp",
    scope: "VR ≈ 2.00 Vpp (maximum), in phase",
  },
};
