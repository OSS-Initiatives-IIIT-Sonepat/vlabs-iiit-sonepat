import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Replace R with 4.7 kΩ and measure τ again.",
  body: "Switch off the generator output, remove the 10 kΩ resistor and insert the 4.7 kΩ resistor in the same holes (row c, columns 5 to 8). Switch the output on again. The new time constant is $\\tau = 4700 \\times 0.1\\times10^{-6} = 0.47$ ms, so the curves are about twice as steep. Change the time base to 0.2 ms/div and measure the time to reach 3.16 V.",
  show: ["bb", "r_4k7", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "r_4k7",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Charging: Vc = 3.16 V at τ ≈ 0.47 ms",
  },
};
