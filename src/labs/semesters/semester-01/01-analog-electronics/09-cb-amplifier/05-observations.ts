import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Transistor: BC547 NPN, base grounded. $V_{CC} = 9\\,\\text{V}$, $V_{EE}$ varied. $R_E = 1\\,\\text{k}\\Omega$, $R_C = 4.7\\,\\text{k}\\Omega$. $I_C$ is kept below 1.5 mA so the collector stays reverse-biased ($V_{CB} > 0$).",
    "Measured $\\alpha = I_C / I_E \\approx 0.988$ (theoretical: $\\alpha = \\beta/(1+\\beta) = 200/201 \\approx 0.995$). Output characteristics are very flat for $V_{CB} > 0.5\\,\\text{V}$, confirming high output impedance.",
  ],
  table: {
    headers: [
      "$V_{EB}$ (V)",
      "$I_E$ (mA)",
      "$I_C$ (mA)",
      "$\\alpha = I_C/I_E$",
    ],
    rows: [
      [0.5, "0.00", "0.00", "—"],
      [0.55, "0.06", "0.06", "0.983"],
      [0.6, "0.28", "0.27", "0.964"],
      [0.62, "0.52", "0.51", "0.981"],
      [0.65, "1.05", "1.04", "0.990"],
      [0.67, "1.45", "1.43", "0.986"],
    ],
  },
};
