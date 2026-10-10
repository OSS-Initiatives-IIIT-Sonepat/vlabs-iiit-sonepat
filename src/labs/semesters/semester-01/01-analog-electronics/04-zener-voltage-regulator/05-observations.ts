import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Rs = 330 Ω, Zener diode Vz = 5.1 V (1N4733A). Expected values are calculated for an ideal 5.1 V Zener diode; your measured values may differ slightly because of the Zener tolerance and its dynamic resistance. Record the observed Vout in the blank column.",
    "Line regulation (RL = 1 kΩ): ΔVout / ΔVin × 100 % between Vin = 8 V and Vin = 12 V = ____ %.",
    "Load regulation (Vin = 10 V): (Vout at RL = 1 kΩ - Vout at RL = 500 Ω) / Vout at RL = 500 Ω × 100 % = ____ %.",
  ],
  table: {
    headers: [
      "S.No.",
      "Vin (V)",
      "RL (Ω)",
      "Expected Vout (V)",
      "Observed Vout (V)",
      "Zener diode state",
    ],
    rows: [
      ["1", "6", "1000", "4.51", "", "Not in breakdown"],
      ["2", "8", "1000", "5.10", "", "In breakdown (IZ ≈ 3.69 mA)"],
      ["3", "10", "1000", "5.10", "", "In breakdown (IZ ≈ 9.75 mA)"],
      ["4", "12", "1000", "5.10", "", "In breakdown (IZ ≈ 15.81 mA)"],
      [
        "5",
        "10",
        "500 (1 kΩ ∥ 1 kΩ)",
        "5.10",
        "",
        "In breakdown (IZ ≈ 4.65 mA)",
      ],
    ],
  },
};
