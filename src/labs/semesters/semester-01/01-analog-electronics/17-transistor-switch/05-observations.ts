import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "VCC = 5 V, Rc = 330 Ω, red LED. Ib = (Vin − VBE) / Rb. Ic = (VCC − VLED − VCE) / Rc, using VLED ≈ 1.9 V when the LED is fully on. Expected values are given for comparison.",
  ],
  table: {
    headers: [
      "Vin (V)",
      "Rb",
      "Expected VBE (V)",
      "Measured VBE (V)",
      "Expected VCE (V)",
      "Measured VCE (V)",
      "Ib (mA)",
      "Ic (mA)",
      "LED",
      "Region",
    ],
    rows: [
      ["0", "10 kΩ", "0", "", "5.0", "", "0", "0", "Off", "Cut-off"],
      ["5", "10 kΩ", "0.72", "", "0.1", "", "0.43", "9.1", "On", "Saturation"],
      ["5", "1 MΩ", "0.62", "", "≈ 3.0", "", "0.0043", "≈ 0.86", "Dim", "Active"],
    ],
  },
};
