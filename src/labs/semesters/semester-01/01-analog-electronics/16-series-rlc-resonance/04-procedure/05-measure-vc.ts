import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure the voltage across C at resonance.",
  body: "Keep the frequency at f0. Set the multimeter to AC volts and connect it across the capacitor (columns 8 and 9). It reads about 2.24 V rms, which is about 6.3 V peak-to-peak, roughly 3.2 times the 2 V input. This is the voltage magnification of a series resonant circuit: $V_C = Q \\times V_{in}$. The voltage across L is equal and opposite, so the two cancel.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope", "vm_c"],
  highlight: "vm_c",
  readings: {
    fg: "5.03 kHz, 2 Vpp",
    scope: "VR ≈ 2.00 Vpp (maximum), in phase",
    vm_c: "2.24 V AC",
  },
};
