import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "R = 1 kΩ, C = 0.1 µF, theoretical fc = 1591 Hz. Vin = 2 V peak-to-peak sine wave, held constant at every frequency. Gain (dB) = 20 log₁₀(Vo / Vin). Expected values are given for comparison; record the measured Vo and phase in the empty columns.",
    "Plot gain (dB) against frequency on semi-log paper for both filters and read the frequency at which each curve crosses −3 dB. This is the measured cut-off frequency.",
  ],
  table: {
    headers: [
      "f (Hz)",
      "LPF expected Vo (V pp)",
      "LPF measured Vo (V pp)",
      "LPF gain (dB)",
      "LPF phase (°)",
      "HPF expected Vo (V pp)",
      "HPF measured Vo (V pp)",
      "HPF gain (dB)",
      "HPF phase (°)",
    ],
    rows: [
      ["100", "2.00", "", "−0.02", "−3.6", "0.13", "", "−24.0", "+86.4"],
      ["500", "1.91", "", "−0.41", "−17.4", "0.60", "", "−10.5", "+72.6"],
      ["1000", "1.69", "", "−1.44", "−32.1", "1.06", "", "−5.5", "+57.9"],
      ["1591", "1.41", "", "−3.01", "−45.0", "1.41", "", "−3.01", "+45.0"],
      ["3000", "0.94", "", "−6.6", "−62.1", "1.77", "", "−1.08", "+27.9"],
      ["5000", "0.61", "", "−10.4", "−72.3", "1.91", "", "−0.42", "+17.7"],
      ["10000", "0.31", "", "−16.1", "−81.0", "1.98", "", "−0.11", "+9.0"],
      ["20000", "0.16", "", "−22.0", "−85.5", "1.99", "", "−0.03", "+4.5"],
    ],
  },
};
