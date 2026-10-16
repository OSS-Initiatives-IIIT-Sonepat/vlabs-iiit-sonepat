import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "L = 10 mH, C = 0.1 µF, R = 100 Ω, Vin = 2 V peak-to-peak (held constant). Current I = VR / R. Theoretical f0 = 5033 Hz, Q = 3.16, BW = 1592 Hz. Expected VR values are for an ideal inductor.",
    "Plot VR (or I) against frequency. Mark the peak (f0) and the two frequencies where VR = 0.707 × peak (f1 and f2). Calculate BW = f2 − f1 and Q = f0 / BW, and check that f0 ≈ √(f1 f2).",
  ],
  table: {
    headers: [
      "f (Hz)",
      "XL (Ω)",
      "XC (Ω)",
      "Expected VR (V pp)",
      "Measured VR (V pp)",
      "I = VR / R (mA pp)",
      "Phase of I",
    ],
    rows: [
      ["1000", "62.8", "1591.5", "0.13", "", "", "leads"],
      ["2000", "125.7", "795.8", "0.30", "", "", "leads"],
      ["3000", "188.5", "530.5", "0.56", "", "", "leads"],
      ["4000", "251.3", "397.9", "1.13", "", "", "leads"],
      ["4300 (f1)", "270.2", "370.1", "1.41", "", "", "leads 45°"],
      ["5033 (f0)", "316.2", "316.2", "2.00", "", "", "in phase"],
      ["5890 (f2)", "370.1", "270.2", "1.41", "", "", "lags 45°"],
      ["7000", "439.8", "227.4", "0.85", "", "", "lags"],
      ["8000", "502.7", "198.9", "0.63", "", "", "lags"],
      ["10000", "628.3", "159.2", "0.42", "", "", "lags"],
    ],
  },
};
