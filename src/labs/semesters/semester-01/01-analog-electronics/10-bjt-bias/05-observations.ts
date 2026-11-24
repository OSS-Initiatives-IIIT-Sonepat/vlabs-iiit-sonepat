import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "$V_{CC} = 12\\,\\text{V}$, $R_B = 470\\,\\text{k}\\Omega$, $R_{C} = 4.7\\,\\text{k}\\Omega$, $R_1 = 100\\,\\text{k}\\Omega$, $R_2 = 10\\,\\text{k}\\Omega$, $R_E = 1\\,\\text{k}\\Omega$.",
    "Effect of $\\beta$ variation on Q-point stability. Two BC547 transistors with different $\\beta$ tested.",
  ],
  table: {
    headers: [
      "Configuration",
      "$\\beta$",
      "$I_C$ (mA)",
      "$V_{CE}$ (V)",
      "Region",
    ],
    rows: [
      ["Fixed Bias", "100", "2.37", "0.85", "Near saturation"],
      ["Fixed Bias", "200", "2.51", "0.20", "Saturated"],
      ["Fixed Bias", "300", "2.51", "0.20", "Saturated"],
      ["VDB", "100", "0.37", "10.1", "Active"],
      ["VDB", "200", "0.39", "9.8", "Active"],
      ["VDB", "300", "0.40", "9.7", "Active"],
    ],
  },
};
