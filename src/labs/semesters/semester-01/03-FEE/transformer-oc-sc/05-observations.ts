import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Open-circuit test on the 115 V winding. Short-circuit test on the 230 V winding, with the 115 V winding shorted. Wattmeter readings are recorded with the voltmeter and ammeter.",
  ],
  table: {
    headers: ["Test", "V (V)", "I (A)", "W (W)", "Result"],
    rows: [
      ["Open circuit", "115", "0.20", "10.0", "R0 = 1.32 kΩ, X0 = 639 Ω"],
      ["Short circuit", "10.0", "1.00", "8.0", "R01 = 8 Ω, X01 = 6 Ω"],
    ],
  },
};
