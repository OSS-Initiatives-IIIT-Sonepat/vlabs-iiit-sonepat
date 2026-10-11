import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Input signal: sine wave, 1 kHz, 1 V peak-to-peak. Rin = R1 = 10 kΩ. Read Vo (peak-to-peak) from CH2 and the phase of Vo with respect to Vin from the two traces.",
    "Measured gain = Vo / Vin, written with a negative sign for the inverting amplifier because its output is inverted. Theoretical gain: Av = −Rf / Rin for the inverting amplifier and Av = 1 + Rf / R1 for the non-inverting amplifier. Percentage error = |theoretical gain − measured gain| / |theoretical gain| × 100.",
  ],
  table: {
    headers: [
      "Circuit",
      "Rin or R1 (kΩ)",
      "Rf (kΩ)",
      "Vin (V pp)",
      "Theoretical gain",
      "Measured Vo (V pp)",
      "Measured gain",
      "Phase (degrees)",
      "% error",
    ],
    rows: [
      ["Inverting", "10", "100", "1", "−10", "", "", "", ""],
      ["Inverting", "10", "47", "1", "−4.7", "", "", "", ""],
      ["Inverting", "10", "22", "1", "−2.2", "", "", "", ""],
      ["Non-inverting", "10", "100", "1", "11", "", "", "", ""],
      ["Non-inverting", "10", "47", "1", "5.7", "", "", "", ""],
      ["Non-inverting", "10", "22", "1", "3.2", "", "", "", ""],
    ],
  },
};
