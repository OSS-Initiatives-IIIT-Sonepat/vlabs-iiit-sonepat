import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Sweep the frequency towards resonance.",
  body: "Keep Vin at 2 V peak-to-peak and raise the frequency in steps: 2 kHz, 3 kHz and 4 kHz. VR rises quickly because the net reactance XC − XL is getting smaller. At 3 kHz VR is about 0.56 V peak-to-peak. Record VR at each frequency and work out I = VR / R.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "3 kHz, 2 Vpp",
    scope: "VR ≈ 0.56 Vpp, I leads V",
  },
};
